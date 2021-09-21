<?php

namespace App\Component\Cache;


use App\Service\Locator;

class Facade {

    private Chain\Keeper $_chainKeeper;

    public function __construct() {
        $this->_chainKeeper = $this->_chainKeeper();
    }

    public function buildChain(string $table, array $fieldsMap, int $ttl): Entity\Chain {
        return $this->_chainKeeper->buildChain($table, $fieldsMap, $ttl);
    }

    private function _chainKeeper(): Chain\Keeper {
        return Locator::get(Chain\Keeper::class);
    }
}
