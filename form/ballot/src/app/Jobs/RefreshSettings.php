<?php

namespace App\Jobs;

use App\Service\Locator;
use App\Component\Election;
use App\Service\Utils;

class RefreshSettings extends Job {

    public function handle() {
        /** @var Election\Facade */
        $electionComponent = Locator::get(Election\Facade::class);
        try {
            $electionComponent->refreshSettings();
        } catch (\Throwable $t) {
            app()['log']->channel('stderr')->critical('Refreshing settings failed', ['exception_class' => get_class($t), 'exception_message' => $t->getMessage(), 'exception_trace' => Utils::cutTrace($t)]);
        }
    }
}