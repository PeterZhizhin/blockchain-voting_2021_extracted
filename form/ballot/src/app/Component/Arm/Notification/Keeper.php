<?php

namespace App\Component\Arm\Notification;

use App\Component\Election;

class Keeper {

    private $_armMgikLogger;

    public function __construct() {
        $this->_armMgikLogger = app()['log']->channel('arm');
    }

    public function notifyBallotOpened(Election\Entity\Ballot $ballot): void {
        $this->_notify($ballot, 'mgd_loaded', 'Загружен бюллетень');
    }

    public function notifyBallotCreated(Election\Entity\Ballot $ballot): void {
        $this->_notify($ballot, 'mgd_created', 'Создан бюллетень');
    }

    public function notifyBallotOpenedRepeatedly(Election\Entity\Ballot $ballot): void {
        $this->_notify($ballot, 'mgd_loaded_twice', 'Загружен повторно бюллетень');
    }

    public function notifyBallotSent(Election\Entity\Ballot $ballot): void {
        $this->_notify($ballot, 'mgd_sended', 'Отправлен бюллетень');
    }

    public function notifyBallotSkipped(Election\Entity\Ballot $ballot): void {
        $this->_notify($ballot, 'mgd_skipped', 'Пропущен бюллетень');
    }

    private function _notify(Election\Entity\Ballot $ballot, string $action, string $message) {
        $now = (new \DateTime())->getTimestamp();
        $guid = $ballot->getGuid();
        $data = [
            'action'     => $action,
            'guid'       => $guid->getId(),
            'voitingId'  => $ballot->getSettings()->getVotingId(),
            'sessid'     => app()['session.store']->getId(),
            'serverTime' => $now,
            'spendTime'  => $now - $guid->getCreateDate()->getTimestamp(),
            'district'   => $guid->getDistrictId(),
        ];
        $this->_armMgikLogger->info($message, $data);
        app()['log']->info($message, $data);
    }
}
