<?php

namespace App\Component\Election\Guid\Entity;

class Guid {

    private string $_id;
    private $_electionId;
    private $_districtId;
    private $_createDate;
    private $_sessionId;
    private $_isOpened;
    private $_mdmCypher;
    private $_expireDate;

    public function __construct(string $id, $electionId, $districtId, $createDate, $expireDate, string $sessionId, bool $isOpened = false, string $mdmCypher = '') {
        $this->_id         = $id;
        $this->_electionId = $electionId;
        $this->_districtId = $districtId;
        $this->_createDate = $createDate;
        $this->_expireDate = $expireDate;
        $this->_sessionId  = $sessionId;
        $this->_isOpened   = $isOpened;
        $this->_mdmCypher  = $mdmCypher;
    }

    public function getId(): string {
        return $this->_id;
    }

    public function getElectionId() {
        return $this->_electionId;
    }

    public function getDistrictId() {
        return $this->_districtId;
    }

    public function getCreateDate(): \DateTime {
        return $this->_createDate;
    }

    public function getExpireDate(): \DateTime {
        return $this->_expireDate;
    }

    public function getSessionId(): string {
        return $this->_sessionId;
    }

    public function isOpened(): bool {
        return $this->_isOpened;
    }

    public function mdmCypher(): string {
        return $this->_mdmCypher;
    }

    public function setOpened(): void {
        $this->_isOpened = true;
    }

    public function setSessionId(): void {
        $this->_sessionId = app()['session.store']->getId();
    }
}
