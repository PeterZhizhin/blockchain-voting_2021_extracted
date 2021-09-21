<?php


namespace App\Component\ConnectionPool\Connector;

use App\Component;

class AmqpPublisherWithConfirms extends AmqpPublisher {

    /**
     * @param array $config
     * @return Component\Amqp\Publisher
     */
    protected function _connect(array $config) {
        return $this->_amqpComponent->getPublisherWithConfirms($config);
    }
}
