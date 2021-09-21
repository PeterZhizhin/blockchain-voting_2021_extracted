<?php

namespace App\Component\Election\Setting;

use App\Component\Common\Cached;
use App\Component\Election\Setting\Entity\FormTemplateVars;
use App\Component\Election\Setting\Entity\Setting;
use App\Service;
use App\Service\DurationCounter;
use Illuminate\Support\Facades\Http;

class Keeper extends Cached {

    private const STATUS_ACTIVE = 3;

    private Service\Config\ConfigInterface $_config;

    public function __construct() {
        parent::__construct();
        $this->_config = Service\Config\PoolConfig::me()->conf('Arm');
    }

    /**
     * @return Entity\Setting[]
     */
    public function get(): array {
        $settingsData = parent::_get();
        return $this->_initSettings($settingsData);
    }

    public function getById($id): ?Entity\Setting {
        $settingsById = $this->allById();
        return $settingsById[$id] ?? null;
    }

    public function allById(): array {
        return Service\Utils::buildIndexByFunction($this->get(), function (Setting $setting) {
            return $setting->getVotingId();
        });
    }

    public function all(): array {
        $settingsData = parent::_get();
        return $this->_initSettings($settingsData, false);
    }

    /**
     * @return Entity\Setting[]
     */
    public function refreshSettings(): array {
        $this->_dropCache();
        return $this->get();
    }

    private function _initSettings(?array $data, bool $filterEmpty = true) {
        $result = [];
        foreach ($data as $datum) {
            $status = $datum['STATUS'] ?: null;
            if ($filterEmpty && ((int)$status !== self::STATUS_ACTIVE)) {
                continue;
            }
            $result[] = new Setting(
                $datum['ID'],
                $datum['EXT_ID'],
                $datum['TITLE'],
                $datum['SHORT_TITLE'],
                $datum['REF'] ?? null,
                $datum['PUBLIC_KEY'] ?? null,
                new \DateTime($datum['START_TIME']),
                new \DateTime($datum['END_TIME']),
                new \DateTime($datum['CREATE_DATE']),
                new \DateTime($datum['UPDATED_DATE'] ?? null),
                $status,
                $datum['APPROVED'] ?? null,
                $datum['IS_TEST'] ?? null,
                $datum['IS_REVOKE'] ?? null,
                $datum['MULTI_VOTE'] ?? null,
                $datum['MIN_COUNT_VOTE'] ?? null,
                $datum['MAX_COUNT_VOTE'] ?? null,
                $this->_initFormTempalateVars($datum['FORM'] ?? []),
                $this->_initLandingTemplateVars($datum['LANDING'] ?? []),
                $this->_inigMdmVars($datum)
            );
        }
        return $result;
    }

    protected function _cacheTime() {
        return 0;
    }

    private function _inigMdmVars(array $datum) {
        $mdmVars = new Entity\MdmVars();
        $mdmVars->url = $datum['MDM_SERVICE_URL'];
        $mdmVars->token = $datum['MDM_SERVICE_TOKEN'];
        $mdmVars->hmacSalt = $datum['MDM_GID_SERVICE_HMAC'];
        return $mdmVars;
    }

    private function _initLandingTemplateVars(array $landingTemplateData): Entity\LandingTemplateVars {
        return new Entity\LandingTemplateVars(
            $landingTemplateData['url'] ?? null,
            $landingTemplateData['buttonName'] ?? null,
            $landingTemplateData['text'] ?? null
        );
    }

    private function _initFormTempalateVars(array $formTemplateData): Entity\FormTemplateVars {
        return new FormTemplateVars(
            $formTemplateData['url'] ?? null,
            $formTemplateData['rules'] ?? null,
            $formTemplateData['manual'] ?? null,
            $formTemplateData['about'] ?? null,
            $formTemplateData['agreement'] ?? null,
            $formTemplateData['buttonName'] ?? null,
            $formTemplateData['errorMessage'] ?? null,
            $formTemplateData['messageBeforeVote'] ?? null,
        );
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

    protected function _cacheKey() {
        return 'settings';
    }

    protected function _validate($data) {
        return parent::_validate($data) && (int)$data['error'] === 0;
    }

    protected function _prepare($data) {
        return $data['data'];
    }
}
