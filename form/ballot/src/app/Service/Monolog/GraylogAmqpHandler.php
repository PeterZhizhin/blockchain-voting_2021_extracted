<?php

namespace App\Service\Monolog;

class GraylogAmqpHandler extends AbstractAmqpHandler {
	protected function getPoolKey(): string
	{
		return 'graylog';
	}
}