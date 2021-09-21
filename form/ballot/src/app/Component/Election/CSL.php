<?php

namespace App\Component\Election;

use App\Service\Locator;

class CSL {

    public static function guidKeeper(): Guid\Keeper {
        return Locator::get(Guid\Keeper::class);
    }

    public static function settingsKeeper(): Setting\Keeper {
        return Locator::get(Setting\Keeper::class);
    }

    public static function validationKeeper(): Validation\Keeper {
        return Locator::get(Validation\Keeper::class);
    }

    public static function encryptionKeeper(): Encryption\Keeper {
        return Locator::get(Encryption\Keeper::class);
    }

    public static function keeper(): Keeper {
        return Locator::get(Keeper::class);
    }
}
