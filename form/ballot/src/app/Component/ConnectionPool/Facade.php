<?php

namespace App\Component\ConnectionPool;

use App\Component\ConnectionPool\Connector\AmqpPublisher;
use App\Component\ConnectionPool\Connector\AmqpPublisherWithConfirms;
use App\Component\ConnectionPool\Connector\Database;
use App\Component\ConnectionPool\Connector\Redis;
use App\Service\Locator;
use Smf\ConnectionPool\ConnectionPool;

class Facade {

    private Keeper $_keeper;

    public function __construct() {
        $this->_keeper = Locator::get(Keeper::class);
    }

    public function buildAmqpPublisher(array $config): ConnectionPool {
        $amqpPool = new Pool($this->_defaultConfig(), $this->_amqpConnector(), $config);
        $amqpPool->tag = 'amqp';
        return $amqpPool;
    }

    public function buildAmqpPublisherWithConfirms(array $config): ConnectionPool {
        $amqpPool = new Pool($this->_defaultConfig(), $this->_amqpConnectorWithConfirms(), $config);
        $amqpPool->tag = 'amqp';
        return $amqpPool;
    }

    public function buildDatabase(): ConnectionPool {
        $dbPool = new Pool($this->_defaultConfig(), $this->_databaseConnector(), []);
        $dbPool->tag = 'db';
        return $dbPool;
    }

    public function buildRedis(): ConnectionPool {
        $redisPool = new Pool($this->_defaultConfig(), $this->_redisConnector(), []);
        $redisPool->tag = 'redis';
        return $redisPool;
    }

    public function closeConnectionPools() {
        $this->_keeper->closeConnectionPools();
    }

    public function addPool(string $key, ConnectionPool $pool) {
        $this->_keeper->addConnectionPool($key, $pool);
    }

    public function getPool(string $key) {
        return $this->_keeper->getConnectionPool($key);
    }

    private function _amqpConnector() {
        return new AmqpPublisher();
    }

    private function _amqpConnectorWithConfirms() {
        return new AmqpPublisherWithConfirms();
    }

    private function _databaseConnector() {
        return new Database();
    }

    private function _redisConnector() {
        return new Redis();
    }

    private function _defaultConfig(): array {
        return [
            'minActive'   => env('CONNECTION_POOL_MIN_ACTIVE', 4),
            'maxActive'   => 3000, // might be a bug here, implement exception handling within connection pool
            'maxWaitTime' => 5,
        ];
    }
}
