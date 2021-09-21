<?php

namespace App\Component\Election\Entity;

class UserElectionCheck {

    private bool $_isFinished;
    private ?array $_voterDataByElectionId = null;

    public function __construct(bool $isFinished, ?array $voterDataByElectionId = null) {
        $this->_isFinished = $isFinished;
        $this->_voterDataByElectionId = $voterDataByElectionId;
    }

    public function isFinished(): bool {
        return $this->_isFinished;
    }

    public function voterDataByElectionId(): ?array {
        return $this->_voterDataByElectionId;
    }
}