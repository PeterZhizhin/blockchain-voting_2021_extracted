<?php

namespace App\Component\Cache\Entity;

use App\Component\Cache\Chain\Engine;

class Chain {

    /** @var Engine\Base[] */
    private $_engines;

    public function __construct(array $engines) {
       $this->_engines = $engines;
    }

    public function storeData(array $data) {
        $this->_persistData($this->_engines, $data);
    }

    public function clearLocalEngineCache() {
        $this->_engines['local']->store([]);
    }

    public function retrieveData() {
        $enginesToStoreDataIn = [];
        foreach ($this->_engines as $key => $engine) {
            $data = $engine->retrieve();
            if (empty($data)) {
                $enginesToStoreDataIn[] = $engine;
                continue;
            }
            return $this->_persistData($enginesToStoreDataIn, $data);
        }
        return null;
    }

    /**
     * @param Engine\Base[] $engines
     * @param array $data
     * @return array
     */
    private function _persistData(array $engines, array $data): array {
        foreach ($engines as $engine) {
            $engine->store($data);
        }
        return $data;
    }
}
