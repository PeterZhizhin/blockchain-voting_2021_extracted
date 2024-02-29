<?php

namespace App\Jobs;

use App\Service\Locator;
use App\Component\Election;
use App\Service\Config\PoolConfig;
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

	$isTransactional = (bool)env('MDM_AMQP_TRANSACTIONAL', 0);
	$amqpConfig = PoolConfig::me()->get('Mgik')->get('amqp');
	$electionSettings = $electionComponent->getSettingsAll();
	$poolComponent = app()->get('connection_pool');
	app()['log']->info('Updated settings, ensuring AMPQ pools exist now...', ['ampqConfig' => $amqpConfig, 'electionSettings' => $electionSettings, 'isTransactional' => $isTransactional, 'poolComponent' => $poolComponent]);
	foreach ($electionSettings as $setting) {
	    $poolName = "mgik-{$setting->getVotingId()}";
	    try {
		$poolComponent->getPool($poolName);
                app()['log']->info('Pool found, do not create', ['pool_nane' => $poolName]);
	    } catch (\Throwable $t) {
                app()['log']->info('Haven not found the pool, creating one', ['pool_name' => $poolName, 'exception_class' => get_class($t), 'exception_message' => $t->getMessage(), 'exception_trace' => Utils::cutTrace($t)]);
	        $configWithQueue = $amqpConfig;
	        $configWithQueue['queue'] = "{$amqpConfig['queue']}-{$setting->getVotingId()}";
	        $configWithQueue['exchange'] = "{$amqpConfig['queue']}-exchange-{$setting->getVotingId()}";

	        $mgikPool = $isTransactional
                    ? $poolComponent->buildAmqpPublisher($configWithQueue)
		    : $poolComponent->buildAmqpPublisherWithConfirms($configWithQueue);

	        $mgikPool->init();
	        $poolComponent->addPool($poolName, $mgikPool);
	    }
        }
    }
}

