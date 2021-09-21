<?php


namespace App\Component\Cache\Chain\Engine;


class Local extends Base {

    private array $_localCache = [];

    public function store(array $data) {
        $this->_localCache = $data;
    }

    public function retrieve(): array {
        return $this->_localCache;
    }
}
