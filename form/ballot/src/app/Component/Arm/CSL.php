<?php


namespace App\Component\Arm;

use App\Service\Locator;

class CSL {

    public static function notificationKeeper(): Notification\Keeper {
        return Locator::get(Notification\Keeper::class);
    }
}
