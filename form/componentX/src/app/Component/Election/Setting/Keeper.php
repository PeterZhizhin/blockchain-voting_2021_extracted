<?php

namespace App\Component\Election\Setting;

use App\Component\Common\Cached;
use App\Component\Election\Setting\Entity\Setting;
use Illuminate\Support\Facades\Http;
use App\Service;

class Keeper extends Cached {

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

    private function _initSettings(?array $data) {
        $result = [];
        foreach ($data as $datum) {
            $result[] = new Setting(
                $datum['ID'],
                $datum['MDM_GID_SERVICE_URL'],
                $datum['MDM_GID_SERVICE_TOKEN']
            );
        }
        return $result;
    }

    protected function _retrieveData(): array {
        $url = env('ARM_VOITING_URL');
        $system = env('ARM_VOITING_SYSTEM');
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'SYSTEM'       => $system,
            'SYSTEMTOKEN'  => env('ARM_VOITING_TOKEN'),
        ])->get($url)->json();
        app()['log']->info('Retrieved settings', ['action' => 'settings_request', 'url' => $url, 'system' => $system]);
        return $response;
    }

    protected function _cacheKey() {
        return 'settings';
    }

    protected function _cacheTime() {
        return 0;
    }

    protected function _validate($data) {
        return parent::_validate($data) && (int)$data['error'] === 0;
    }

    protected function _prepare($data) {
        return $data['data'];
    }
}
