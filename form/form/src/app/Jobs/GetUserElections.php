<?php

namespace App\Jobs;

use App\Component;
use App\Component\Election\Mdm\Entity\VoterData;
use App\Service;
use App\Service\Config\PoolConfig;
use App\Service\Locator;

class GetUserElections extends TrackableJob
{

    private Component\Election\Facade $_electionComponent;
    private string $_ssoId;
    private string $_sessId;
    private $_district;

    public function __construct(string $ssoId) {
        $this->_electionComponent = Service\Locator::get(Component\Election\Facade::class);
        $this->_ssoId = $ssoId;
        $request = app()['request'];
        $this->_sessId = app()['session.store']->getId();
        $this->_district = $request->get('district') ?: $request->header('district');
    }

    protected function _handle(): array {
        app()['session.store']->setId($this->_sessId);
        /** @var Service\User */
        $userService = Locator::get(Service\User::class);
        $userService->initUserById($this->_ssoId);
        if ($this->_district) PoolConfig::me()->get('Mdm')->set('default_district_id', $this->_district);
        try {
            return $this->_electionComponent->getUserElections($this->_ssoId);
        } catch (Component\Election\Mdm\Exception\RevotingLimitExceeded $e) {
            return ['status' => 'error', 'data' => ['url' => '/limit']];
        }
    }

    protected function _prepareResult(array $result): array {
        if ($result['status'] ?? null === 'error') {
            return $result;
        }
        $res = [];
        foreach ($result as $electionId => $voterData) {
            $res["{$electionId}"] = VoterData::fromArray($voterData);
        }
        return $res;
    }

    protected function _key(): string {
        return "check_ballot_{$this->_ssoId}";
    }

    protected function _cacheTime(): int {
        return env('CHECK_BALLOT_TTL', 3600);
    }
}
