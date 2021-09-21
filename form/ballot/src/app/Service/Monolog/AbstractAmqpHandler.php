<?php

namespace App\Service\Monolog;

use App\Component;
use App\Service;
use Monolog\Formatter\FormatterInterface;
use Monolog\Formatter\JsonFormatter;
use Monolog\Handler;

abstract class AbstractAmqpHandler extends Handler\AbstractProcessingHandler {

    public const FACILITY = 'Election-ballot';
    private ?Component\ConnectionPool\Facade $_connectionPool = null;

    abstract protected function getPoolKey(): string;

    public function __construct() {
        $this->_connectionPool = Service\Locator::get(Component\ConnectionPool\Facade::class);
    }

    protected function write(array $record): void {
        if (!Service\Utils::isCoroutineEnabled()) {
            return;
        }

        $record['channel'] = sprintf('%s [%s]', self::FACILITY, env('APP_URL', 'localhost'));

        $district = app()['session.store']->get('district') ?? null;
	    if ($district) {
	    	$record['context']['district'] = $district;
	    }

	    try {
		    $user = app()['user']->getUser();
            $record['context']['ssoId'] = $user->id ?? null;
	    } catch (\Exception $e) {
		    // just in case
	    }

        $pool = $this->_connectionPool->getPool($this->getPoolKey());
        /** @var Component\Amqp\Publisher */
        $connection = $pool->borrow();
        $record['formatted'] = $this->getFormatter()->format($record);
        /** @var \Gelf\Message $message */
        $message = $record['formatted'];
        $connection->send(
            $message instanceof \Gelf\Message
            ? json_encode($message->toArray())
            : $message
        );
        $pool->return($connection);
    }

    protected function getDefaultFormatter(): FormatterInterface {
        return new JsonFormatter(JsonFormatter::BATCH_MODE_JSON, false);
    }
}