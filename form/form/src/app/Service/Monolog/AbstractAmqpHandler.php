<?php

namespace App\Service\Monolog;

use Monolog\Handler;
use App\Component;
use App\Service\Locator;
use App\Service\Utils;

abstract class AbstractAmqpHandler extends Handler\AbstractProcessingHandler {

    private ?Component\ConnectionPool\Facade $_connectionPool = null;

    abstract protected function getPoolKey(): string;

    public function __construct() {
        if (!Utils::isCoroutineEnabled()) {
            return;
        }
        $this->_connectionPool = app()->get('connection_pool');

    }

    public function handle(array $record): bool {
        $hostName = env('APP_URL', 'localhost');
        $record['channel'] = "Election-form [{$hostName}]";
        $district = app()['session.store']->get('district') ?? null;
	    if ($district) {
	    	$record['context']['district'] = $district;
	    }
        try {
		    $user = app()['user']->getCurrentUser();
            $record['context']['ssoId'] = $user->id ?? null;
	    } catch (\Exception $e) {
		    // just in case
	    }
        return parent::handle($record);
    }

    protected function write(array $record): void {
        if (!Utils::isCoroutineEnabled()) {
            $config = config($this->getPoolKey());
            /** @var Component\Amqp\Facade $amqpComponent */
            $amqpComponent = Locator::get(Component\Amqp\Facade::class);
            $publisher = $amqpComponent->getPublisherWithConfirms($config['connstring']);
            $message = $this->_formatMessage($record);
            try {
                $publisher->send($message);
            } catch (\Throwable $t) {
                return;
            }
            return;
        }
        $pool = $this->_connectionPool->getPool($this->getPoolKey());
        /** @var Component\Amqp\Publisher */
        $connection = $pool->borrow();
        $message = $this->_formatMessage($record);
	    $connection->send($message);
        $pool->return($connection);
    }

    private function _formatMessage($record) {
        /** @var \Gelf\Message $gelfMessage */
        $gelfMessage = $record['formatted'];
        return json_encode($gelfMessage->toArray());
    }
}