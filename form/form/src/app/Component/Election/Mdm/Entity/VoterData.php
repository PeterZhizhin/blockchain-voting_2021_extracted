<?php


namespace App\Component\Election\Mdm\Entity;


class VoterData implements \JsonSerializable {

    private $_district;
    private $_random;
    private $_secureHash;
    private $_timeStamp;
    private $_requestId;

    public function __construct($_district, $_random, $_secureHash, $_timeStamp, $_requestId) {
        $this->_district = $_district;
        $this->_random = $_random;
        $this->_secureHash = $_secureHash;
        $this->_timeStamp = $_timeStamp;
        $this->_requestId = $_requestId;
    }

    public function getDistrict() {
        return $this->_district;
    }

    public function getRandom() {
        return $this->_random;
    }

    public function getSecureHash() {
        return $this->_secureHash;
    }

    public function getTimeStamp() {
        return $this->_timeStamp;
    }

    public function getRequestId() {
        return $this->_requestId;
    }

    public function setRequestId($requestId) {
        $this->_requestId = $requestId;
    }

    public function jsonSerialize(): array {
        return [
            'district'    => $this->getDistrict(),
            'random'      => $this->getRandom(),
            'secure_hash' => $this->getSecureHash(),
            'timestamp'   => $this->getTimeStamp(),
            'request_id'  => $this->getRequestId(),
        ];
    }

    public static function fromArray(array $data) {
        return new self($data['district'], $data['random'], $data['secure_hash'], $data['timestamp'], $data['request_id'] ?? null);
    }
}