<?php

namespace App\Component\Arm;

use App\Component\Election;

class Facade {

    public function notifyBallotOpened(Election\Entity\Ballot $ballot) {
        CSL::notificationKeeper()->notifyBallotOpened($ballot);
    }

    public function notifyBallotOpenedRepeatedly(Election\Entity\Ballot $ballot) {
        CSL::notificationKeeper()->notifyBallotOpenedRepeatedly($ballot);
    }

    public function notifyBallotCreated(Election\Entity\Ballot $ballot) {
        CSL::notificationKeeper()->notifyBallotCreated($ballot);
    }

    public function notifyBallotSent(Election\Entity\Ballot $ballot) {
        CSL::notificationKeeper()->notifyBallotSent($ballot);
    }

    public function notifyBallotSkipped(Election\Entity\Ballot $ballot) {
        CSL::notificationKeeper()->notifyBallotSkipped($ballot);
    }
}
