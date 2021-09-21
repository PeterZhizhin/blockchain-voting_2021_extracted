<?php

namespace App\Component\Cache;

use SwooleTW\Http\Server\Resetters\ResetterContract;
use Illuminate\Contracts\Container\Container;
use SwooleTW\Http\Server\Sandbox;
use App\Service\Locator;
use App\Component;

class Resetter implements ResetterContract {

    public function handle(Container $app, Sandbox $sandbox) {
        /** @var Component\Election\Setting\Keeper $setting */
        $setting = Locator::get(Component\Election\Setting\Keeper::class);
        $setting->clearLocalCache();
    }
}
