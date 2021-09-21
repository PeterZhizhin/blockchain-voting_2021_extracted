<?php

namespace App\Component\Election\Exception;

use App\Exceptions;

class UserAlreadyVotedWithinLockPeriod extends Exceptions\Base {

    private \DateTime $_lockExpiresDateTime;

    public function __construct(\DateTime $_lockExpiresDateTime) {
        parent::__construct();
        $this->_lockExpiresDateTime = $_lockExpiresDateTime;
    }
    
    public function getLockOverDateTime(): \DateTime {
        return $this->_lockExpiresDateTime;
    }
}