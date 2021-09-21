<?php

namespace App\Service\Lumen;

use App\Service\Utils;

class RedisManager extends \Illuminate\Redis\RedisManager {

    public function removeConnection($name = 'default') {
        unset($this->connections[$name]);
    }

    public function connection($name = null) {
        if (Utils::isCoroutineEnabled()) {
            return app()->get('connection_pool')->getPool('redis')->borrow();
        }
        return parent::connection($name);
    }

    public function __call($method, $parameters) {
        $connection = $this->connection();
        $result = $connection->{$method}(...$parameters);
        if (Utils::isCoroutineEnabled()) {
            app()->get('connection_pool')->getPool('redis')->return($connection);
        }
        return $result;
    }
}
