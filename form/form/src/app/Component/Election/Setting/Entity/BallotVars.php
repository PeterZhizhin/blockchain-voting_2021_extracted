<?php

namespace App\Component\Election\Setting\Entity;

class BallotVars {

    private $_url;
    private $_buttonName;

    public function __construct($_url, $_buttonName) {
        $this->_url = $_url;
        $this->_buttonName = $_buttonName;
    }

    public function getUrl() {
        return env('MGIK_ELECTION_HOST', $this->_url);
    }

    public function getButtonName() {
        return $this->_buttonName;
    }
}
