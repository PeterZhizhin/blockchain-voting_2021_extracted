<?php

namespace App\Component\Amqp;

use PhpAmqpLib\Channel\AMQPChannel;
use PhpAmqpLib\Message\AMQPMessage;

class PublisherWithConfirms extends Publisher {

    protected function _send($message) {
        $this->_channel->basic_publish($message, $this->_exchange);
        $this->_channel->wait_for_pending_acks($this->_timeout());
    }

    protected function _applyMode(AMQPChannel $channel) {
        $channel->confirm_select();
        $channel->set_nack_handler(
            function (AMQPMessage $message) {
                // hacky. throw exception, so that the vote is put into task buffer
                throw new \Exception($message->body);
            });
    }
}
