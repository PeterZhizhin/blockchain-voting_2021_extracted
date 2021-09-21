<?php

namespace App\Component\ConnectionPool\Connector;

use Smf\ConnectionPool\Connectors\ConnectorInterface;

abstract class Base implements ConnectorInterface {

    final public function connect(array $config) {
        $iterations = (int)env('POOL_RECONNECT_COUNT', 5);
        while ($iterations-- > 0) {
            try {
                return $this->_connect($config);
            } catch (\Throwable $t) {
                sleep(1);
                $logParams = [
                    'action'            => 'retry',
                    'type'              => 'connection',
                    'iterations_left'   => $iterations, 
                    'message'           => $t->getMessage(), 
                    'exception_class'   => get_class($t),
                    'exception_message' => $t->getMessage(),
                ];
                app()['log']->error('Unable to make a connection instance', $logParams);
            }
        }
        throw $t;
    }

    abstract protected function _connect(array $config);
}