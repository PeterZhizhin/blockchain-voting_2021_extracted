<?php

namespace App\Service\Lumen;

use App\Component;
use App\Service\Config\PoolConfig;
use App\Service\Utils;

class SwooleManager extends \SwooleTW\Http\Server\Manager {

    public function onWorkerStart($server) {
        parent::onWorkerStart($server);
        $this->_initPools();
    }

    public function onWorkerError() {
        sleep(1);
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
            $poolComponent->addPool('Arm', $armPool);
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
    }

    private function _closePools() {
        if (!$this->app || !Utils::isCoroutineEnabled()) return;
        $this->app->get('connection_pool')->closeConnectionPools();
    }
}