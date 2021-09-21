<?php

namespace App\Service\Lumen;

use App\Component;
use App\Service\Config\PoolConfig;
use App\Service\Locator;
use App\Service\Utils;

class SwooleManager extends \SwooleTW\Http\Server\Manager {

    public function onWorkerStart($server) {
        parent::onWorkerStart($server);
        $this->_initPools();
    }

    public function onWorkerError() {
        $this->_closePools();
    }

    public function onWorkerStop() {
        $this->_closePools();
    }

    private function _initPools() {
        if (!Utils::isCoroutineEnabled()) {
            return;
        }
        $this->app->singleton(Component\ConnectionPool\Facade::class, function () {
            return new Component\ConnectionPool\Facade();
        });
        $this->app->alias(Component\ConnectionPool\Facade::class, 'connection_pool');
        /** @var Component\ConnectionPool\Facade $poolComponent */
        $poolComponent = $this->app->get('connection_pool');
        $armConfig = PoolConfig::me()->get('Arm');
        $isTransactional = (bool)env('MDM_AMQP_TRANSACTIONAL', 0);

        if ($armConfig->get('transport') === 'amqp') {
            
            $armPool = $isTransactional
                ? $poolComponent->buildAmqpPublisher($armConfig->get('connstring'))
                : $poolComponent->buildAmqpPublisherWithConfirms($armConfig->get('connstring'));

            $armPool->init();
            $poolComponent->addPool('arm', $armPool);
        }

        $graylogConfig = config('graylog');

        if ($graylogConfig['transport'] === 'amqp') {

            $graylogPool = $isTransactional
                ? $poolComponent->buildAmqpPublisher($graylogConfig['connstring'])
                : $poolComponent->buildAmqpPublisherWithConfirms($graylogConfig['connstring']);

            $graylogPool->init();
            $poolComponent->addPool('graylog', $graylogPool);
        }

        $redisPool = $poolComponent->buildRedis();
        $redisPool->init();
        $poolComponent->addPool('redis', $redisPool);

        $databasePool = $poolComponent->buildDatabase();
        $databasePool->init();
        $poolComponent->addPool('database', $databasePool);

        /** @var Component\Election\Facade $electionComponent */
        $electionComponent = Locator::get(Component\Election\Facade::class);
        $amqpConfig = PoolConfig::me()->get('Mgik')->get('amqp');
        foreach ($electionComponent->getSettingsAll() as $setting) {
            $configWithQueue = $amqpConfig;
            $configWithQueue['queue'] = "{$amqpConfig['queue']}-{$setting->getVotingId()}";
            $configWithQueue['exchange'] = "{$amqpConfig['queue']}-exchange-{$setting->getVotingId()}";
            
            $mgikPool = $isTransactional
                ? $poolComponent->buildAmqpPublisher($configWithQueue)
                : $poolComponent->buildAmqpPublisherWithConfirms($configWithQueue);

            $mgikPool->init();
            $poolComponent->addPool("mgik-{$setting->getVotingId()}", $mgikPool);
        }
    }

    private function _closePools() {
        if (!$this->app || !Utils::isCoroutineEnabled()) return;
        $this->app->get('connection_pool')->closeConnectionPools();
    }
}
