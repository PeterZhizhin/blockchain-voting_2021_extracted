<?php

namespace App\Component\Amqp;

use PhpAmqpLib\Channel\AMQPChannel;
use PhpAmqpLib\Message\AMQPMessage;
use PhpAmqpLib\Wire\AMQPTable;
use PhpAmqpLib\Wire;

class Publisher extends Connection {

    private string $_queue;

    private array $_config;

    public function __construct(array $config) {
        parent::__construct($config);
        $this->_config = $config;
        $this->_queue = $config['queue'];
        $this->_exchange = $config['exchange'];
        $this->_bindQueue();
    }

    public function send($amqpMessage, array $properties = []) {
        $properties['delivery_mode'] = AMQPMessage::DELIVERY_MODE_PERSISTENT;
        $amqpMessage = new AMQPMessage($amqpMessage);
        $amqpHeaders = new Wire\AMQPTable();
        foreach ($properties as $key => $value) {
            try {
                $amqpMessage->set($key, $value);
            } catch (\OutOfBoundsException $e) {
                $amqpHeaders->set($key, $value);
            }
        }
        $amqpMessage->set('application_headers', $amqpHeaders);
        $this->_send($amqpMessage);
    }

    protected function _send($amqpMessage) {
        try {
            $this->_channel->basic_publish($amqpMessage, $this->_exchange);
            $this->_channel->tx_commit();
        } catch (\Throwable $t) {
            app()['log']->emergency('Unable to publish or commit', ['exception_class' => get_class($t), 'message' => $t->getMessage()]);
            try {
                $this->_channel->tx_rollback();
            } catch (\Throwable $t) {
                // do nothing, channel is closed
            }
            throw $t;
        }
    }

    public function isConnected(): bool {
        try {
            $this->_sendHeartbeat();
        } catch (\Throwable $t) {
            app()['log']->info("Hearbeat missing, reconnecting", ['type' => 'heartbeat_reconnect']);
            return false;
        }
        return true;
    }

    private function _bindQueue() {
        $arguments = [];
        if (!empty($this->_config['queue_type'])) {
            $arguments['x-queue-type'] = $this->_config['queue_type'];
        }
        $channel = $this->_connection->channel();
        $channel->queue_declare($this->_queue, false, true, false, false, false, new AMQPTable($arguments));
        $channel->exchange_declare($this->_exchange, $this->_typeExchange(), false, true, false);
        $channel->queue_bind($this->_queue, $this->_exchange);
        $this->_applyMode($channel);
        $this->_channel = $channel;
    }

    protected function _applyMode(AMQPChannel $channel) {
        $channel->tx_select();
    }
}
