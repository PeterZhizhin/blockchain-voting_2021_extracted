<?php


namespace App\Component\Cache\Chain\Engine;


use App\Service\Cache;

class Redis extends Base {

    private string $_cacheKey;

    public function __construct(string $cacheKey, $ttl) {
        parent::__construct($ttl);
        $this->_cacheKey = $cacheKey;
    }

    public function store(array $data): void {
        $this->_ttl >= 1 ? Cache::set($this->_cacheKey, $data, $this->_ttl) : Cache::setArrayForever($this->_cacheKey, $data);
    }

    public function retrieve(): ?array {
        return Cache::get($this->_cacheKey);
    }
}
