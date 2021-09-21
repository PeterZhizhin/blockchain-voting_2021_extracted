<?php

namespace App\Console\Commands;

use App\Component;
use Illuminate\Console\Command;
use App\Service\Locator;

class ExportGuidDataFromStorageToRedis extends Command
{

    protected $signature = "migrate:guid";
    protected $description = "Import guid data from postgres into redis";

    public function handle(): void {
        /** @var Component\Election\Facade */
        $electionComponent = Locator::get(Component\Election\Facade::class);
        $electionComponent->restoreGuids();
    }

}
