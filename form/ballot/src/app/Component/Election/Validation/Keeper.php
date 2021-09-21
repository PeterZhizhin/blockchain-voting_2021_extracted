<?php

namespace App\Component\Election\Validation;

use App\Component\Election\Exception;

class Keeper {

    public function validateVotingPeriod(\DateTime $startDate, \DateTime $endDate) {
        $now = new \DateTime();
        if ($now > $endDate) {
            throw new Exception\VotingIsOver();
        }
        if ($now < $startDate) {
            throw new Exception\VotingHasNotStarted();
        }
    }
}
