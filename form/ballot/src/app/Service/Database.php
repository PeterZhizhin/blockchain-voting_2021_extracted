<?php

namespace App\Service;

use Smf\ConnectionPool\ConnectionPoolInterface;
use App\Component;
use App\Service;
use Illuminate;

class Database {

    private ConnectionPoolInterface $_connectionPool;

    public function __construct() {
        if (!Service\Utils::isCoroutineEnabled()) {
            return;
        }
        /** @var Component\ConnectionPool\Facade */
        $poolComponent = Locator::get(Component\ConnectionPool\Facade::class);
        $this->_connectionPool = $poolComponent->getPool('database');
    }

    public function execute(callable $function) {
        if (!Service\Utils::isCoroutineEnabled()) {
            return $this->_executeOld($function);
        }
        /** @var Illuminate\Database\ConnectionInterface */
        $connection = $this->_connectionPool->borrow();
        $durationCounter = DurationCounter::start();
        $result = $function($connection);
        app()['log']->channel('stderr')->info('Database duration log', [
            'action' => 'duration',
            'type' => 'database',
            'sessionId' => app()['session.store']->getId(),
            'duration_ms' => $durationCounter->finish(),
        ]);
        $this->_connectionPool->return($connection);
        return $result;
    }

    private function _executeOld(callable $function) {
        $connection = \DB::connection();
        return $function($connection);
    }
}