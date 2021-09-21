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

        $graylogConfig = config('graylog');

        if ($graylogConfig['transport'] === 'amqp' && env('LOG_CHANNEL') === 'graylog') {
            $graylogPool = $poolComponent->buildAmqpPublisherWithConfirms($graylogConfig['connstring']);
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