<?php

namespace App\Component\ConnectionPool;

use App\Service\DurationCounter;
use Smf\ConnectionPool\ConnectionPool;

class Pool extends ConnectionPool {

    public $tag;
    
    protected function createConnection()
    {
        $durationCounter = DurationCounter::start();
        $this->connectionCount++;
        $connection = $this->connector->connect($this->connectionConfig);
        $connection->{static::KEY_LAST_ACTIVE_TIME} = time();
        app()['log']->channel('stderr')->info('Connection create duration', ['duration_ms' => $durationCounter->finish(), 'type' => $this->tag . '_create', 'action' => 'duration']);
        return $connection;
    }
}