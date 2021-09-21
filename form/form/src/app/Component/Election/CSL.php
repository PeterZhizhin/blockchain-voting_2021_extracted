<?php

namespace App\Component\Election;

use App\Service\Locator;

class CSL {

    public static function settingsKeeper(): Setting\Keeper {
        return Locator::get(Setting\Keeper::class);
    }

    public static function mdmKeeper(): Mdm\Keeper {
        return Locator::get(Mdm\Keeper::class);
    }

    public static function validationKeeper(): Validation\Keeper {
        return Locator::get(Validation\Keeper::class);
    }

    public static function keeper(): Keeper {
        return Locator::get(Keeper::class);
    }
}
