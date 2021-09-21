<?php

namespace App\Service\Monolog;

use Monolog\Formatter;

class JsonContextFormatter extends Formatter\JsonFormatter {

    public function format(array $record): string {
        try {
            $sessionId = app()['session.store']->getId();
        } catch (\Throwable $t) {
            $sessionId = null;
        }
        $record['context']['session_id'] = $sessionId;
        return parent::format($record);
    }
}