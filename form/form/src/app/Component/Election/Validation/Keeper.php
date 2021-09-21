<?php

namespace App\Component\Election\Validation;

use App\Component\Election;

class Keeper {

    public function validate(Election\Setting\Entity\Setting $setting, $district) {
        $this->_validateAvailabilityForDistrict($setting, $district);
    }

    private function _validateAvailabilityForDistrict(Election\Setting\Entity\Setting  $setting, $district): void {
        if ($setting->getStartDate() !== null && $setting->getStartDate() > new \DateTime()) {
            throw new Exception\VotingHasNotStarted($setting->getStartDate(), $district);
        }
    }
}