<?php

namespace App\Component\Amqp;

use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Channel\AMQPChannel;

abstract class Connection {

    protected AMQPStreamConnection $_connection;
    protected string $_exchange;

    /** @var AMQPChannel */
    protected $_channel;

    public function __construct(array $config) {
        $this->_connection = $this->_initConnection($config);
    }

    private function _initConnection(array $config): AMQPStreamConnection {
        $host = $config['host'];
        $port = $config['port'];
        $login = $config['login'];
        $password = $config['pass'];
        $vhost = $config['vhost'] ?? '/';
        $timeout = round((float)env('AMQP_TIMEOUT', 1.0), 1);
        $heartbeat = (int)env('AMQP_HEARTBEAT', 0);
        return new AMQPStreamConnection($host, $port, $login, $password, $vhost, false, 'AMQPLAIN', null, 'en_US', $timeout, $timeout, null, true, $heartbeat, $timeout);
    }

    protected function _sendHeartbeat() {
        $pkt = new \PhpAmqpLib\Wire\AMQPWriter();
        $pkt->write_octet(8);
        $pkt->write_short(0);
        $pkt->write_long(0);
        $pkt->write_octet(0xCE);
        $this->_connection->getIO()->write($pkt->getvalue());
    }

    public function close() {
        if ($this->_channel) {
            $this->_channel->close();
        }
        $this->_connection->close();
    }

    protected function _typeExchange(): string {
        if (strpos($this->_exchange, 'fanout') !== false) {
            return 'fanout';
        }
        return 'direct';
    }
}
