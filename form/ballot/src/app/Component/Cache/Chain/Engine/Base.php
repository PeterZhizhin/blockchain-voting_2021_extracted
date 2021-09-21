<?php


namespace App\Component\Cache\Chain\Engine;


abstract class Base {

    protected ?int $_ttl;

    public function __construct(?int $ttl = null) {
        $this->_ttl = $ttl;
    }

    abstract public function store(array $data);

    abstract public function retrieve(): ?array;
}
