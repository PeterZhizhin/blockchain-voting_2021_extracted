<?php

namespace App\Jobs;

use App\Service\Locator;
use App\Component\Election;
use App\Service\Utils;
use App\Exceptions\Base;

class RefreshSettings extends Job {

    public function handle() {
        /** @var Election\Facade */
        $electionComponent = Locator::get(Election\Facade::class);
        try {
            $electionComponent->refreshSettings();
        } catch (\Throwable $t) {
            app()['log']->critical('Refreshing settings failed', [
                'error' => $t instanceof Base ? $t->name() : get_class($t),
                'exception_class' => get_class($t),
                'message' => $t->getMessage(),
                'trace' => Utils::cutTrace($t),
            ]);
        }
    }
}