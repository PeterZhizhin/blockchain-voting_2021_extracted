<?php

namespace App\Component\Amqp;

class Facade {

    public function getPublisher(array $config): Publisher {
        return new Publisher($config);
    }

    public function getPublisherWithConfirms(array $config): PublisherWithConfirms {
        return new PublisherWithConfirms($config);
    }
}
