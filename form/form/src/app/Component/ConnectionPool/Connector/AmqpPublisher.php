<?php

namespace App\Component\ConnectionPool\Connector;

use App\Component;
use App\Service\Locator;

class AmqpPublisher extends Base {

    protected Component\Amqp\Facade $_amqpComponent;

    public function __construct() {
        $this->_amqpComponent = Locator::get(Component\Amqp\Facade::class);
    }

    /**
     * @param array $config
     * @return Component\Amqp\Publisher
     */
    protected function _connect(array $config) {
        return $this->_amqpComponent->getPublisher($config);
    }

    /**
     * @param Component\Amqp\Publisher $connection
     */
    public function disconnect($connection) {
        $connection->close();
    }

    /**
     * @param Component\Amqp\Publisher $connection
     * @return bool
     */
    public function isConnected($connection): bool {
        return $connection->isConnected();
    }

    /**
     * @param Component\Amqp\Publisher $connection
     * @param array $config
     * @return mixed|void
     */
    public function reset($connection, array $config) {
    }

    /**
     * @param Component\Amqp\Publisher $connection
     * @return bool
     */
    public function validate($connection): bool {
        return true;
    }
}
