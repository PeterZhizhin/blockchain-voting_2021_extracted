<?php

namespace App\Exceptions;

use App\Exceptions;

class VotingHasNotStarted extends Exceptions\Base {

    /** @var \DateTime */
    private $_voteStartDate;

    private $_district;

    public function __construct(\DateTime $voteStartDate, $district) {
        parent::__construct('Голосование еще не началось');
        $this->_voteStartDate = $voteStartDate;
        $this->_district = $district;
    }

    public function getDistrict() {
        return $this->_district;
    }

    public function getVoteStartDate(): \DateTime {
        return $this->_voteStartDate;
    }
}