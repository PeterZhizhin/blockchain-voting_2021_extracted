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
        return new ConnectionPool($this->_defaultConfig(), $this->_amqpConnector(), $config);
    }

    public function buildAmqpPublisherWithConfirms(array $config): ConnectionPool {
        return new ConnectionPool($this->_defaultConfig(), $this->_amqpConnectorWithConfirms(), $config);
    }

    public function buildDatabase(): ConnectionPool {
        return new ConnectionPool($this->_defaultConfig(), $this->_databaseConnector(), []);
    }

    public function buildRedis(): ConnectionPool {
        return new ConnectionPool($this->_defaultConfig(), $this->_redisConnector(), []);
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
            'minActive' => 4,
            'maxActive' => 600,
        ];
    }
}
