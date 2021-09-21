<?php

namespace App\Component\Cache\Chain;

use App\Component\Cache;

class Keeper {

    public function buildChain(string $table, array $fieldsMap, int $ttl): Cache\Entity\Chain {
        $engines = [
            'local'    => $this->_getLocalEngine(),
            'redis'    => $this->_getRedisEngine($table, $ttl),
            'databaes' => $this->_getDatabaseEngine($table, $fieldsMap),
        ];
        return new Cache\Entity\Chain($engines);
    }

    private function _getLocalEngine() {
        return new Engine\Local();
    }

    private function _getDatabaseEngine(string $table, array $fieldsMap) {
        return new Engine\Database($table, $fieldsMap);
    }

    private function _getRedisEngine(string $cacheKey, int $ttl) {
        return new Engine\Redis($cacheKey, $ttl);
    }
}
