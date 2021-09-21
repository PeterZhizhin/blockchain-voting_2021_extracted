<?php

namespace App\Component\Common;

use App\Component\Common\Entity\TempData;
use App\Service\Cache;

abstract class Cached {

    public function __construct() {
        $this->_localCache = [];
    }

    /**
     * @var TempData[]
     */
    private array $_localCache;

    protected function _get(): array {
        $result = $this->_getFromLocalCache() ?: $this->_getFromCache();
        if (empty($result) || !$this->_validate($result)) {
            $result = $this->_init();
        }
        return $this->_prepare($result);
    }

    protected function _dropCache(): void {
        unset($this->_localCache[$this->_cacheKey()]);
        Cache::delete($this->_cacheKey());
    }

    private function _init(): array {
        $data = $this->_retrieveData();
        $cacheTime = $this->_cacheTime();
        $this->_saveToCache($data, $cacheTime);
        $this->_saveToLocalCache($data, $cacheTime);
        return $data;
    }

    private function _saveToCache(array $data, $time) {
        Cache::setArray($this->_cacheKey(), $data, $time);
    }

    private function _saveToLocalCache(array $data, $time) {
        $dateExpired = new \DateTime("+ {$time} seconds");
        $this->_localCache[$this->_cacheKey()] = new TempData($data, $dateExpired);
    }

    private function _getFromCache() {
        return Cache::getArray($this->_cacheKey());
    }

    private function _getFromLocalCache() {
        $tempData = $this->_localCache[$this->_cacheKey()] ?? null;
        return $tempData instanceof TempData && $tempData->expireDate >= new \DateTime() ? $tempData->data : null;
    }

    abstract protected function _cacheKey();

    abstract protected function _retrieveData(): array;

    protected function _cacheTime() {
        return 3600; // 1 hour
    }

    protected function _validate($data) {
        return is_array($data);
    }

    protected function _prepare($data) {
        return $data;
    }
}