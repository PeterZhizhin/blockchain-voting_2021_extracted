<?php

namespace App\Component\Election;

use App\Component;
use App\Service;
use App\Service\Locator;
use Illuminate\Contracts\Cache\LockTimeoutException;
use Illuminate\Support\Facades\Cache;
use Illuminate\Database\ConnectionInterface;

class Keeper {

    private Guid\Keeper $_guidKeeper;
    private Setting\Keeper $_settingsKeeper;
    private Validation\Keeper $_validationKeeper;
    private Encryption\Keeper $_encryptionKeeper;
    private Component\Arm\Facade $_armComponent;
    private Service\Database $_databaseService;

    public function __construct() {
        $this->_guidKeeper       = CSL::guidKeeper();
        $this->_settingsKeeper   = CSL::settingsKeeper();
        $this->_validationKeeper = CSL::validationKeeper();
        $this->_encryptionKeeper = CSL::encryptionKeeper();
        $this->_armComponent     = Locator::get(Component\Arm\Facade::class);
        $this->_databaseService  = Locator::get(Service\Database::class);
    }

    public function getEncryptedGuid(array $votings): string {
        // Проверяем подписи формы и МДМ
        foreach ($votings as $voting) {
            $hashGroups = $voting['hash_groups'];
            $this->_validateHashGroups($hashGroups);
        }
        $settingsByIds = $this->_settingsKeeper->allById();
        // Генерируем новый шифр и сохраняем его в кэш
        $guids = $this->_guidKeeper->generateGuid($votings);
        $guidsCount = count($guids);
        foreach ($guids as $guid) {
            $setting = $settingsByIds[$guid->getElectionId()];
            $ballot = $this->_buildBallot($setting, $guid, $guidsCount);
            // Уведомляем кабинет председателя о создании шифра голосования
            $this->_armComponent->notifyBallotCreated($ballot);
        }
        // Шифруем сгенерированный гуид
        return $this->_encryptionKeeper->crypt($guids[0]->getId());
    }

    private function _buildBallot(Setting\Entity\Setting $setting, ?Guid\Entity\Guid $guid, int $guidsCount) {
        return new Entity\Ballot($setting, $guid, $guidsCount);
    }

    public function checkSign(string $electionHash) {
        $data = json_decode(base64_decode($electionHash), true);
        if (!$data) throw new \Exception('Unable to unpack');
        $this->_ensureFields(['hash', 'hash_hmac', 'guid'], $data);

        // Проверка подписи формы
        $hashHmac = $data['hash_hmac'];
        unset($data['hash_hmac']);
        $this->_encryptionKeeper->validateHmacHash($data, $hashHmac);

        $hash = $data['hash'];
        unset($data['hash']);
        $this->_encryptionKeeper->validateHash($data, $hash);
        // Расшифровка шифра доступа к бюллетеням
        return $this->_encryptionKeeper->decrypt($data['guid']);
    }

    /** @return Entity\Ballot[] */
    public function getBallots(string $guid): array {
        $ballots = [];
        // Получаем все бюллетени, доступные по шифру
        $guids = $this->_guidKeeper->getGuidsByVotingId($guid);
        $guidsCount = count($guids);
        $settingsById = $this->_settingsKeeper->allById();
        foreach ($guids as $votingId => $guid) {
            $settings = $settingsById[$votingId];
            $ballots[] = $this->_buildBallot($settings, $guid, $guidsCount);
        }
        return $ballots;
    }

    public function getBallot(string $guid, $votingId): ?Entity\Ballot {
        // Получаем список доступных по шифру бюллетеней
        $guids = $this->_guidKeeper->getGuidsByVotingId($guid);
        if (empty($guids)) {
            return null;
        }
        $guidsCount = count($guids);
        // Получаем либо следующий бюллетень из списка, либо запрошенный (в случае мобильного приложения)
        $guid = $votingId ? $guids[$votingId] ?? null : reset($guids);
        if (null === $guid) {
            return null;
        }
        // Проверяем, что пользователь не менял сессию с момента первого открытия бюллетеня
        if ($guid->isOpened() && $guid->getSessionId() !== app()['session.store']->getId()) {
            throw new Exception\AccessFromAnotherDevice();
        }
        $settings = $this->_settingsKeeper->getById($guid->getElectionId());
        // Проверяем, что голосование еще не закончилось
        $this->_validationKeeper->validateVotingPeriod($settings->getStartDate(), $settings->getEndDate());
        return $this->_buildBallot($settings, $guid, $guidsCount);
    }

    public function vote(string $guid, $voteId, string $accountAddressBlock, string $keyVerificationHash, string $rawStoreBallotTx, string $rawTxHash) {
        // Устанавливаем атомарный замок на отправку голоса, исключает возможность одновременной отправки голоса по одному бюллетеню
        $lock = Cache::lock($guid, 20);
        try {
            $lock->block(10);
            $ballot = $this->getBallot($guid, $voteId);
            if ($ballot === null) throw new Exception\BallotDoesNotExist();
            $guid = $ballot->getGuid();
            $this->_persistBallot($guid, $accountAddressBlock, $keyVerificationHash, $rawStoreBallotTx, $rawTxHash);
            // Генерируем, кодируем и шифруем данные голоса
            $ballotData = $this->_buildGuidData($guid, $accountAddressBlock, $keyVerificationHash, $rawStoreBallotTx);
            $dataToEncrypt = json_encode($ballotData, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            $voteHash = $this->_encryptionKeeper->crypt($dataToEncrypt);
            // Ставим задачу на отправку бюллетеня
            $this->_assignTask($voteHash, $guid->getElectionId());
            // Удаляем бюллетень из доступных
            $this->_guidKeeper->removeGuid($guid);
        } catch (LockTimeoutException $e) {
            app()['log']->emergency('Was unable to aquire guid lock for 20 seconds', ['exception_message' => $e->getMessage()]);
        } finally {
            optional($lock)->release();
            return $ballot ?? null;
        }
    }

    // Метод пропуска бюллетеня
    public function skip(Entity\Ballot $ballot) {
        $guid = $ballot->getGuid();
        $this->_guidKeeper->removeGuid($guid);
    }

    public function buildInterval(Setting\Entity\Setting $setting): string {
        $monthMap = Service\Utils::monthMap();
        $startTimeStamp = $setting->getStartDate()->getTimestamp();
        $endTimeStamp = $setting->getEndDate()->getTimestamp();
        return $endTimeStamp - $startTimeStamp < 86400
            ? "с по ".($monthMap[date('m',$endTimeStamp)]).' '.date('Y').' года'
            : "с ".date('d',$startTimeStamp)." ".($monthMap[date('m',$startTimeStamp)])." по ".date('d',$endTimeStamp)." ".($monthMap[date('m',$endTimeStamp)]).' '.date('Y',$endTimeStamp).' года';
    }

    private function _assignTask(string $message, $votingId) {
        $data = ['json' => $message, 'vote_id' => $votingId];
        Service\Task\TaskManager::queueTask(0, 'Mgd2021', $data, ['execute_now' => true, 'store_in_buffer' => false, 'app_id' => 0]);
    }

    private function _validateHashGroups(array $hashGroups) {
        $hashGroupSecrets = [
            'mpgu' => env('FORM_SECRET'),
        ];
        if ($mdmSecret = env('MDM_SECRET')) {
            $hashGroupSecrets['mdm'] = $mdmSecret;
        }
        foreach ($hashGroupSecrets as $group => $secret) {
            $hashDataForGroup = $hashGroups[$group];
            $timestamp = $hashDataForGroup['timestamp'];
            $random    = $hashDataForGroup['random'];
            $hash      = $hashDataForGroup['hash'];
            if ($this->_isValidHash($timestamp, $random, $secret, $hash)) continue;
            throw new Exception\HashGroupsInvalid();
        }
    }

    private function _isValidHash($timestamp, $random, $secret, $hash) {
        return $this->_calculateHash($timestamp, $random, $secret) === $hash;
    }

    private function _calculateHash($timestamp, $random, $secret) {
        return hash('sha256', "{$timestamp}|{$random}|{$secret}");
    }

    private function _persistBallot(Guid\Entity\Guid $guid, string $accountAddressBlock, string $keyVerificationHash, string $rawStoreBallotTx, string $rawTxHash) {
        $this->_databaseService->execute(function (ConnectionInterface $connection) use ($guid, $rawStoreBallotTx, $keyVerificationHash, $accountAddressBlock, $rawTxHash) {
            $connection->table('p_ballot')->insert([
                'rawStoreBallotTx'    => $rawStoreBallotTx,
                'guid'                => $guid->getId(),
                'mdm_cypher'          => $guid->mdmCypher(),
                'district'            => $guid->getDistrictId(),
                'votingId'            => $guid->getElectionId(),
                'accountAddressBlock' => $accountAddressBlock,
                'keyVerificationHash' => $keyVerificationHash,
                'rawTxHash'           => $rawTxHash,
            ]);
        });
    }

    private function _buildGuidData(Guid\Entity\Guid $guid, string $accountAddressBlock, string $keyVerificationHash, string $rawStoreBallotTx): array {
        $date = new \DateTime();
        return [
            'voterAddress'        => $accountAddressBlock,
            'districtId'          => $guid->getDistrictId(),
            'keyVerificationHash' => $keyVerificationHash,
            'tx'                  => $rawStoreBallotTx,
            'encryptedGroupId'    => $guid->mdmCypher(),
            'voteDateTime'        => "{$date->getTimestamp()}.{$date->format('u')}",
        ];
    }

    private function _ensureFields(array $fields, array $data): void {
        foreach ($fields as $field) {
            $value = $data[$field] ?? null;
            if ($value) continue;
            throw new \Exception("Field {$field} is missing");
        }
    }
}
