<?php

namespace App\Component\Election\Setting;

use App\Component\Common\Cached;
use App\Component\Election\Setting\Entity\Setting;
use App\Component\Election\Setting\Entity\SignatureData;
use App\Service;
use App\Service\DurationCounter;
use Illuminate\Support\Facades\Http;

class Keeper extends Cached {

    private const STATUS_ACTIVE = 3;

    private Service\Config\ConfigInterface $_config;

    public function __construct(Service\Curl $curl) {
        parent::__construct();
        $this->_curl = $curl;
        $this->_config = Service\Config\PoolConfig::me()->conf('Arm');
    }

    /**
     * @return Entity\Setting[]
     */
    public function get(): array {
        $settingsData = parent::_get();
        return $this->_initSettings($settingsData);
    }

    public function getAll(): array {
        $settingsData = parent::_get();
        return $this->_initSettings($settingsData, false);
    }

    public function getById($id): ?Entity\Setting {
        $settingsById = $this->allById();
        return $settingsById[$id] ?? null;
    }

    public function allById(): array {
        return Service\Utils::buildIndexByFunction($this->getAll(), function (Setting $setting) {
            return $setting->getVotingId();
        });
    }

    public function clearLocalCache(): void {
        $this->_cacheChain->clearLocalEngineCache();
    }

    /**
     * @return Entity\Setting[]
     */
    public function refreshSettings(): array {
        $data = $this->_init();
        return $this->_initSettings($data);
    }

    private function _initSettings(array $data, bool $isFilterInactive = true) {
        $result = [];
        foreach ($data as $datum) {
            $status = $datum['STATUS'] ?: null;
            if ($isFilterInactive && (int)$status !== self::STATUS_ACTIVE) {
                continue;
            }
            $result[] = new Setting(
                $datum['ID'],
                $datum['EXT_ID'],
                $datum['TITLE'] ?? null,
                $datum['SHORT_TITLE'] ?? '',
                $datum['REF'] ?? null,
                $datum['PUBLIC_KEY'],
                new \DateTime($datum['START_TIME']),
                new \DateTime($datum['END_TIME']),
                ($createDate = $datum['CREATE_DATE'] ?? null) ? new \DateTime($createDate) : null,
                ($updatedDate = $datum['UPDATED_DATE'] ?? null) ? new \DateTime($updatedDate) : null,
                $datum['STATUS'],
                $datum['APPROVED'] ?? null,
                $datum['IS_TEST'] ?? null,
                $datum['IS_REVOKE'] ?? null,
                $datum['MULTI_VOTE'] ?? null,
                $datum['MIN_COUNT_VOTE'],
                $datum['MAX_COUNT_VOTE'],
                $datum['BALLOT'],
                new SignatureData([]),
            );
        }
        return $result;
    }

    protected function _retrieveData(): array {
        $url = $this->_config->get('serviceVoiting/url');
        $system = $this->_config->get('serviceVoiting/system');
        $durationCounter = DurationCounter::start();
        try {
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
                'SYSTEM'       => $system,
                'SYSTEMTOKEN'  => "{$this->_config->get('serviceVoiting/token')}",
            ])->get($url)->throw()->json();
        } catch (\Throwable $t) {
            throw new Exception\ArmRequestFailed($t->getMessage());
        }
        
        app()['log']->info('Retrieved settings', ['action' => 'settings_request', 'url' => $url, 'system' => $system, 'duration_ms' => $durationCounter->finish()]);
        return $response;
    }

    protected function _table() {
        return 'p_settings';
    }

    protected function _ttl(): int {
        return -1;
    }

    protected function _fieldsMap(): array {
        return [
            'ID'             => 'id',
            'TITLE'          => 'title',
            'IS_TEST'        => 'is_test',
            '_STATUS'        => 'status_text',
            'PUBLIC_KEY'     => 'publicKey',
            'START_TIME'     => 'startTime',
            'END_TIME'       => 'endTime',
            'EXT_ID'         => 'extId',
            'STATUS'         => 'status',
            'REF'            => 'ballotRef',
            'MIN_COUNT_VOTE' => 'min_choices',
            'MAX_COUNT_VOTE' => 'max_choices',
            'BALLOT'         => 'ballot',
        ];
    }

    protected function _prepare($data) {
        return $data['data'];
    }
}
