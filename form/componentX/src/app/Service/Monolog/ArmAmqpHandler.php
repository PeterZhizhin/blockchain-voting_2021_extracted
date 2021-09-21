<?php

namespace App\Service\Monolog;


class ArmAmqpHandler extends AbstractAmqpHandler {
	protected function getPoolKey(): string
	{
		return 'Arm';
	}
}