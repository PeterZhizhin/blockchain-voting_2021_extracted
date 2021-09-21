<?php

namespace App\Service\Monolog;

use App\Service\Locator;
use Monolog\Formatter;
use App\Service;

class JsonContextFormatter extends Formatter\JsonFormatter {

    public function format(array $record): string {
        try {
            $sessionId = app()['session.store']->getId();
        } catch (\Throwable $t) {
            $sessionId = null;
        }
        /** @var Service\User */
        $userService = Locator::get(Service\User::class);
        try {
            $user = $userService->getCurrentUser();
            $userId = $user->id;
        } catch (\Throwable $t) {
            $userId = null;
        }
        $record['context']['session_id'] = $sessionId;
        $record['context']['sudir_id'] = $userId;
        return parent::format($record);
    }
}