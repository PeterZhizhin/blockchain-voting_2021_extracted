<?php

namespace App\Jobs;

use App\Exceptions\Base;
use App\Service\Cache;
use App\Service\Utils;

abstract class TrackableJob extends Job {

    private const STATUS_RUNNING  = 'running';
    private const STATUS_FINISHED = 'finished';
    private const STATUS_IDLE     = 'idle';

    private ?array $_data = null;

    public function handle() {
        $this->_setRunning();
        try {
            $data = $this->_handle();
        } catch (\Throwable $t) {
            $class = static::class;
            app()['log']->error("Got throwable  while executing job: " . static::class, [
                'exception_class' => $class,
                'exception_trace' => Utils::cutTrace($t), 
                'exception_message' => $t->getMessage(),
                'error' =>  $t instanceof Base ? $t->name() : get_class($t),
            ]);
            return;
        }
        $this->_setFinished($data);
    }

    public function isIdle(): bool {
        return $this->getStatus() === self::STATUS_IDLE;
    }

    public function isRunning() {
        return $this->getStatus() === self::STATUS_RUNNING;
    }

    public function isFinished() {
        return $this->getStatus() === self::STATUS_FINISHED;
    }

    public function getStatus(): ?string {
        return $this->_getData()['status'] ?? self::STATUS_IDLE;
    }

    public function getResult(): array {
        $data = $this->_getData()['result'] ?? [];
        return $this->_prepareResult($data);
    }

    protected function _setRunning() {
        $this->_updateData(['status' => self::STATUS_RUNNING]);
    }

    protected function _setIdle() {
        $this->_updateData(['status' => self::STATUS_IDLE]);
    }

    protected function _setFinished(array $result) {
        $this->_updateData(['status' => self::STATUS_FINISHED, 'result' => $result]);
    }

    private function _updateData(array $data) {
        $this->_data = null;
        Cache::setArray($this->_key(), $data, $this->_cacheTime());
    }

    private function _getData(): ?array {
        if ($this->_data === null) {
            $this->_data = Cache::getArray($this->_key()); 
        }
        return $this->_data;
    }

    protected function _prepareResult(array $result): array {
        return $result;
    }

    abstract protected function _handle(): array;

    abstract protected function _key(): string;

    protected function _cacheTime(): int {
        return 10000;
    }
}