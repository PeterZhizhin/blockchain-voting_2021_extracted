<?php

namespace App\Component\ConnectionPool\Connector;

use App\Service;

class Redis extends Base {

    protected function _connect(array $config) {
        /** @var Service\Lumen\RedisManager $manager */
        $manager = app()->get('redis');
        $connection = $manager->resolve();
        return $connection;
    }

    public function disconnect($connection) {
        $connection->disconnect();
    }

    public function isConnected($connection): bool {
        try {
            $connection->ping('all');
            return true;
        } catch (\Throwable $t) {
            app()['log']->error('Redis connection went away, ' . $t->getMessage(), ['error' => 'redis_reconnect']);
        }
        return false;
    }

    public function reset($connection, array $config) {
    }

    public function validate($connection): bool {
        return true;
    }
}
