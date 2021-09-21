<?php

namespace App\Component\ConnectionPool;

use Smf\ConnectionPool\ConnectionPool;
use Smf\ConnectionPool\Connectors\ConnectorInterface;

class Pool extends ConnectionPool {

    protected $_maxLifeTime;
    protected $_configInitTimestamp;
    protected $_configurationClosure;

    public function __construct(array $poolConfig, ConnectorInterface $connector, array $connectionConfig, ?callable $configurationClosure = null) {
        $this->_maxLifeTime = $poolConfig['maxLifetime'];
        $this->_configInitTimestamp = time();
        $this->_configurationClosure = $configurationClosure;
        parent::__construct($poolConfig, $connector, $connectionConfig);
    }

    public function isExpired() {
        return time() - $this->_configInitTimestamp > $this->_maxLifeTime;
    }
}