<?php

namespace App\Component\Election\Setting\Entity;

class LandingTemplateVars {

    private $_url;
    private $_buttonName;
    private $_text;

    public function __construct($_url, $_buttonName, $_text) {
        $this->_url = $_url;
        $this->_buttonName = $_buttonName;
        $this->_text = $_text;
    }

    public function getUrl() {
        return $this->_url;
    }

    public function getButtonName() {
        return $this->_buttonName;
    }

    public function getText() {
        return $this->_text;
    }
}
