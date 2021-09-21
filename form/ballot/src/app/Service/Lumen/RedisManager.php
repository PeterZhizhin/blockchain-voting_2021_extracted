<?php

namespace App\Service\Lumen;

use App\Service\DurationCounter;
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
        $durationCounter = DurationCounter::start();
        $connection = $this->connection();
        $result = $connection->{$method}(...$parameters);
        if (Utils::isCoroutineEnabled()) {
            app()->get('connection_pool')->getPool('redis')->return($connection);
        }
        app()['log']->info('Redis duration log', [
            'method' => $method,
            'action' => 'duration',
            'type' => 'redis',
            'sessionId' => app()['session.store']->getId(),
            'duration_ms' => $durationCounter->finish(),
        ]);
        return $result;
    }
}
