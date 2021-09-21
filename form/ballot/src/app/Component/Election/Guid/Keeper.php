<?php

namespace App\Component\Election\Guid;

use App\Component\Election\CSL;
use App\Component\Election;
use App\Service;
use App\Service\DurationCounter;
use Carbon\Carbon;
use Illuminate\Database\ConnectionInterface;
use Illuminate\Support\Facades\Http;

class Keeper {

    private const TABLE_NAME = 'p_guid';

    private Service\Utils $_utils;
    private Election\Setting\Keeper $_settingsKeeper;
    private Election\Encryption\Keeper $_encryptionKeeper;
    private Service\Database $_databaseService;

    public function __construct() {
        $this->_databaseService = Service\Locator::get(Service\Database::class);
        $this->_utils = Service\Locator::get(Service\Utils::class);
        $this->_settingsKeeper   = CSL::settingsKeeper();
        $this->_encryptionKeeper = CSL::encryptionKeeper();
    }

    public function restoreGuids(): void {
        $guids = $this->_databaseService->execute(function (ConnectionInterface $connection) {
            return array_map(function ($item) {
                $guidData = (array)$item;
                return $this->_buildGuid(
                    $guidData['guid'],
                    $guidData['vote_id'],
                    $guidData['district'],
                    new \DateTime($guidData['created_at']),
                    new \DateTime($guidData['vote_end']),
                    $guidData['session_id'],
                    $guidData['mdm_cypher'] ?? '',
                    false
                );
            }, $connection->table(self::TABLE_NAME)->get()->all());
        });
        $this->_storeInCache($guids);
    }

    /** @return Entity\Guid[] */
    public function generateGuid(array $votings): array {
        $electionId = $votings[0]['voting_id'];
        $setting = $this->_settingsKeeper->getById($electionId);
        if ($setting === null) {
            throw new Election\Exception\VotingDoesNotExist();
        }
        $guids = $this->_generateGuids($votings);
        $this->_persistGuids($guids);
        return $guids;
    }

    public function markOpened(Entity\Guid $guid): void {
        $guid->setOpened();
        $guid->setSessionId();
        $this->_updateGuid($guid);
    }

    public function getGuidsByVotingId(?string $id): ?array {
        if (empty($id)) {
            return [];
        }

        $guidData = Service\Cache::get($this->_cacheKey($id));
        if (empty($guidData) || !is_array($guidData)) {
            return [];
        }
        $guids = [];
        foreach ($guidData as $votingData) {
            $guids[$votingData['election_id']] = $this->_buildGuid(
                $votingData['id'],
                $votingData['election_id'],
                $votingData['district_id'],
                new \DateTime("@{$votingData['create_date']}"),
                new \DateTime("@{$votingData['end_date']}"),
                $votingData['session_id'],
                $votingData['mdm_cypher'],
                $votingData['is_opened']
            );
        }
        return $guids;
    }

    /** @var Entity\Guid[] $guids */
    private function _persistGuids(array $guids): void {
        $this->_storeInCache($guids);
        $this->_storeInDatabase($guids);
    }

    private function _updateGuid(Entity\Guid $guid): void {
        $this->_storeInCache([$guid]);
        $this->_updateInDatabase($guid, ['opened' => $guid->isOpened() ? 'true' : 'false', 'session_id' => app()['session.store']->getId()]);
    }

    public function removeGuid(Entity\Guid $guid): void {
        $this->_removeFromCache($guid);
        $this->_removeFromDatabase($guid);
    }

    private function _removeFromCache(Entity\Guid $guid): void {
        $guidData = Service\Cache::get($this->_cacheKey($guid->getId()));
        if (is_array($guidData)) {
            unset($guidData[$guid->getElectionId()]);
            Service\Cache::set($this->_cacheKey($guid->getId()), $guidData);
            return;
        }
        Service\Cache::delete($this->_cacheKey($guid->getId()));
    }

    /** @var Entity\Guid[] $guids */
    private function _storeInCache(array $guids): void {
        $durationCounter = DurationCounter::start();
        if (count($guids) === 0) return;
        $currentTtl = Service\Cache::ttl($this->_cacheKey($guids[0]->getId()));
        $ttl = $currentTtl > 1 ? $currentTtl : $this->_getGuidLifetimeInSeconds();
        $guidsGroupedByIdAndVotingId = $this->_utils->groupByFunctions($guids, [
            function (Entity\Guid $guid) {
                return $guid->getId();
            },
            function (Entity\Guid $guid) {
                return $guid->getElectionId();
            }
        ]);

        foreach ($guidsGroupedByIdAndVotingId as $id => $guidsGroupedByVotingId) {
            $cacheKey = $this->_cacheKey($id);
            $guidsData = Service\Cache::get($cacheKey) ?? [];
            foreach ($guidsGroupedByVotingId as $votingId => $guid) {
                $guidsData["{$votingId}"] = [
                    'id'          => $guid->getId(),
                    'election_id' => $guid->getElectionId(),
                    'district_id' => $guid->getDistrictId(),
                    'create_date' => $guid->getCreateDate()->getTimestamp(),
                    'end_date'    => $guid->getExpireDate()->getTimestamp(),
                    'session_id'  => $guid->getSessionId(),
                    'is_opened'   => (int)$guid->isOpened(),
                    'mdm_cypher'  => $guid->mdmCypher(),
                ];
            }
            Service\Cache::set($cacheKey, $guidsData, $ttl);
        }
        app()['log']->channel('stderr')->info('Store in cache duration', [
            'action' => 'duration',
            'type' => 'store_guid_cache',
            'duration_ms' => $durationCounter->finish(),
        ]);
    }

    private function _updateInDatabase(Entity\Guid $guid, array $fields): void {
        $fields['updated_at'] = Carbon::now();
        $this->_databaseService->execute(function (ConnectionInterface $connection) use ($guid, $fields) {
            $connection->table(self::TABLE_NAME)->where(['guid' => $guid->getId(), 'vote_id' => (string)$guid->getElectionId()])->update($fields);
        });
    }

    private function _removeFromDatabase(Entity\Guid $guid): void {
        $this->_databaseService->execute(function (ConnectionInterface $connection) use ($guid) {
            $connection->table(self::TABLE_NAME)->where(['guid' => $guid->getId(), 'vote_id' => (string)$guid->getElectionId()])->delete();
        });
    }

    /** @param Entity\Guid[] */
    private function _storeInDatabase(array $guids): void {
        $guidsToInsert = [];
        $settings = $this->_settingsKeeper->allById();
        foreach ($guids as $guid) {
            $setting = $settings[$guid->getElectionId()];
            $guidsToInsert[] = [
                'vote_id'     => $guid->getElectionId(),
                'vote_ext_id' => $setting->getExtId(),
                'guid'        => $guid->getId(),
                'district'    => $guid->getDistrictId(),
                'session_id'  => app()['session.store']->getId(),
                'vote_end'    => Carbon::createFromTimestamp($guid->getExpireDate()->getTimestamp()),
                'created_at'  => Carbon::now(),
                'mdm_cypher'  => $guid->mdmCypher(),
            ];
        }
        
        $this->_databaseService->execute(function (ConnectionInterface $connection) use ($guid, $guidsToInsert) {
            $connection->table(self::TABLE_NAME)->where(['guid' => $guid->getId()])->insert($guidsToInsert);
        });
    }

    /** @return Entity\Guid[] */
    private function _generateGuids(array $votings): array {
        $durationCounter = DurationCounter::start();
        if (count($votings) === 0) return [];
        while (true) {
            $guid = Service\Utils::create_guid();
            if (!$this->_isGuidExists($guid)) {
                break;
            }
        }
        $endDate = new \DateTime("+{$this->_getGuidLifetimeInSeconds()} seconds");
        $guids = [];
        foreach ($votings as $voting) {
            $electionId = $voting['voting_id'];
            $districtId = $voting['district'];
            $mdmCypherRaw = $voting['mdm_cypher'];
            $mdmCypher = $this->_decypherMdmCypher($mdmCypherRaw);
            $mdmCypherData = ['groupId' => $mdmCypher, 'random'  => Service\Utils::create_guid()];
            $mdmCypher = $this->_encryptionKeeper->crypt(json_encode($mdmCypherData));
            $guids[] = $this->_buildGuid(
                $guid,
                $electionId, 
                $districtId, 
                new \DateTime('now'), 
                $endDate, 
                app()['session.store']->getId(), 
                $mdmCypher
            );
        }
        app()['log']->channel('stderr')->info('Generate guids duration', [
            'action' => 'duration',
            'type' => 'generate_guids',
            'duration_ms' => $durationCounter->finish(),
        ]);
        return $guids;
    }

    private function _decypherMdmCypher(string $mdmCypher) {
        if ($mdmCypher === 'test-external-id') return $mdmCypher;
        $baseUrl = env('ENCRYPTOR_GID_HOST', 'encryptor-gid:8000');
        $url = "{$baseUrl}/api/encryption/decrypt";
        $data = ['base64body' => $mdmCypher];
        $headers = [
            'SYSTEM'       => env('ENCRYPTOR_GID_SYSTEM'),
            'SYSTEM-TOKEN' => env('ENCRYPTOR_GID_TOKEN'),
        ];
        $durationCounter = DurationCounter::start();
        $response = Http::withHeaders($headers)->post($url, $data)->throw()->json();
        app()['log']->info('Mdm gid decypher', ['duration_ms' => $durationCounter->finish(), 'action' => 'duration', 'type' => 'gid_decypher']);
        return $response['data']['result'];
    }

    private function _buildGuid(string $guid, $electionId, $districtId, \DateTime $createDate, \DateTime $expireDate, string $sessionId, string $mdmCypher, bool $isOpened = false) {
        return new Entity\Guid($guid, $electionId, $districtId, $createDate, $expireDate, $sessionId, $isOpened, $mdmCypher);
    }

    private function _isGuidExists(string $guid): bool {
        return Service\Cache::exists($this->_cacheKey($guid));
    }

    private function _cacheKey(string $guid) {
        return "g|{$guid}";
    }

    private function _getGuidLifetimeInSeconds(): int {
        return (int)env('BALLOT_LIFETIME_MIN', 60) * 60;
    }
}
