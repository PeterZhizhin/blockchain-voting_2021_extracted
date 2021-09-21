<?php

namespace App\Service;

class DurationCounter {

    private $startTime;

    public function __construct() {
        $this->startTime = microtime(true);
    }

    public static function start() {
        return new self();
    }

    public function finish() {
        $duration = microtime(true) - $this->startTime;
        $durationInMs = round($duration * 1000, 1);
        return $durationInMs;
    }
}