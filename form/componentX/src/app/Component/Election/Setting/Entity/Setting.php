<?php

namespace App\Component\Election\Setting\Entity;

class Setting {

    private $_votingId;
    private $_serviceUrl;
    private $_serviceToken;

    public function __construct($votingId, $serviceUrl, $serviceToken) {
        $this->_votingId = $votingId;
        $this->_serviceUrl = $serviceUrl;
        $this->_serviceToken = $serviceToken;
    }

    public function getVotingId() {
        return $this->_votingId;
    }

    public function getServiceUrl() {
        return $this->_serviceUrl;
    }

    public function getServiceToken() {
        return $this->_serviceToken;
    }
}
