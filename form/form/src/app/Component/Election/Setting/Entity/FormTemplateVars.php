<?php

namespace App\Component\Election\Setting\Entity;

class FormTemplateVars {

    private $_url;
    private $_rules;
    private $_manual;
    private $_about;
    private $_agreement;
    private $_buttonName;
    private $_errorMessage;
    private $_messageBeforeVote;

    public function __construct($_url, $_rules, $_manual, $_about, $_agreement, $_buttonName, $_errorMessage, $_messageBeforeVote) {
        $this->_url = $_url;
        $this->_rules = $_rules;
        $this->_manual = $_manual;
        $this->_about = $_about;
        $this->_agreement = $_agreement;
        $this->_buttonName = $_buttonName;
        $this->_errorMessage = $_errorMessage;
        $this->_messageBeforeVote = $_messageBeforeVote;
    }

    public function getUrl() {
        return $this->_url;
    }

    public function getRules() {
        return $this->_rules;
    }

    public function getManual() {
        return $this->_manual;
    }

    public function getAbout() {
        return $this->_about;
    }

    public function getAgreement() {
        return $this->_agreement;
    }

    public function getButtonName() {
        return $this->_buttonName;
    }

    public function getErrorMessage() {
        return $this->_errorMessage;
    }

    public function getMessageBeforeVote() {
        return $this->_messageBeforeVote;
    }
}
