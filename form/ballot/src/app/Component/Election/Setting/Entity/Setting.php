<?php

namespace App\Component\Election\Setting\Entity;

class Setting implements \JsonSerializable {

    private $_votingId;

    private $_extId;

    private $_title;

    private $_shortTitle;

    private $_ref;

    private $_publicKey;

    private \DateTime $_startDate;

    private \DateTime $_endDate;

    private ?\DateTime $_createDate;

    private ?\DateTime $_updatedDate;

    private $_status;

    private $_approved;

    private $_isTest;

    private $_isRevoke;

    private $_multiVote;

    private $_minCountVote;

    private $_maxCountVote;

    private $_ballot;

    private SignatureData $_signatureData;

    /**
     * Setting constructor.
     * @param $votingId
     * @param $extId
     * @param $title
     * @param $shortTitle
     * @param $ref
     * @param $publicKey
     * @param \DateTime $startDate
     * @param \DateTime $endDate
     * @param ?\DateTime $createDate
     * @param \DateTime $updatedDate
     * @param $status
     * @param $approved
     * @param $isTest
     * @param $isRevoke
     * @param $multiVote
     * @param $minCountVote
     * @param $maxCountVote
     * @param $ballot
     * @param SignatureData $signatureData
     */
    public function __construct(
        $votingId,
        $extId,
        $title,
        $shortTitle,
        $ref,
        $publicKey,
        \DateTime $startDate,
        \DateTime $endDate,
        ?\DateTime $createDate,
        ?\DateTime $updatedDate,
        $status,
        $approved,
        $isTest,
        $isRevoke,
        $multiVote,
        $minCountVote,
        $maxCountVote,
        $ballot,
        SignatureData $signatureData
    )
    {
        $this->_votingId = $votingId;
        $this->_extId = $extId;
        $this->_title = $title;
        $this->_shortTitle = $shortTitle;
        $this->_ref = $ref;
        $this->_publicKey = $publicKey;
        $this->_startDate = $startDate;
        $this->_endDate = $endDate;
        $this->_createDate = $createDate;
        $this->_updatedDate = $updatedDate;
        $this->_status = $status;
        $this->_approved = $approved;
        $this->_isTest = $isTest;
        $this->_isRevoke = $isRevoke;
        $this->_multiVote = $multiVote;
        $this->_minCountVote = $minCountVote;
        $this->_maxCountVote = $maxCountVote;
        $this->_ballot = $ballot;
        $this->_signatureData = $signatureData;
    }

    public function getVotingId() {
        return $this->_votingId;
    }

    public function getExtId() {
        return $this->_extId;
    }

    public function getTitle() {
        return $this->_title;
    }

    public function getShortTitle() {
        return $this->_shortTitle;
    }

    public function getRef() {
        return $this->_ref;
    }

    public function getPublicKey() {
        return $this->_publicKey;
    }

    public function getStartDate(): \DateTime {
        return $this->_startDate;
    }

    public function getEndDate(): \DateTime {
        return $this->_endDate;
    }

    public function getCreateDate(): ?\DateTime {
        return $this->_createDate;
    }

    public function getUpdatedDate(): ?\DateTime {
        return $this->_updatedDate;
    }

    public function getSignatureData(): SignatureData {
        return $this->_signatureData;
    }

    public function getStatus() {
        return $this->_status;
    }

    public function getApproved() {
        return $this->_approved;
    }

    public function getIsTest() {
        return $this->_isTest;
    }

    public function getIsRevoke() {
        return $this->_isRevoke;
    }

    public function getMultiVote() {
        return $this->_multiVote;
    }

    public function getMinCountVote() {
        return $this->_minCountVote;
    }

    public function getMaxCountVote() {
        return $this->_maxCountVote;
    }

    public function getBallot() {
        return $this->_ballot;
    }

    public function jsonSerialize() {
        return [
            'votingId'     => $this->getVotingId(),
            'extId'        => $this->getExtId(),
            'title'        => $this->getTitle(),
            'shortTitle'   => $this->getShortTitle(),
            'ref'          => $this->getRef(),
            //'publicKey'  => $this->getPublicKey(),
            'startDate'    => $this->getStartDate(),
            'endDate'      => $this->getEndDate(),
            'createDate'   => $this->getCreateDate(),
            'updatedDate'  => $this->getUpdatedDate(),
            'status'       => $this->getStatus(),
            'approved'     => $this->getApproved(),
            'isTest'       => $this->getIsTest(),
            'isRevoke'     => $this->getIsRevoke(),
            'multiVote'    => $this->getMultiVote(),
            'minCountVote' => $this->getMinCountVote(),
            'maxCountVote' => $this->getMaxCountVote(),
            'ballot'       => $this->getBallot(),
        ];
    }
}
