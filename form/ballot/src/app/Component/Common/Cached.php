<?php

namespace App\Component\Common;

use App\Component;
use App\Service\Locator;

abstract class Cached {

    protected Component\Cache\Entity\Chain $_cacheChain;

    public function __construct() {
        /** @var Component\Cache\Facade $cacheComponent */
        $cacheComponent = Locator::get(Component\Cache\Facade::class);
        $this->_cacheChain = $cacheComponent->buildChain($this->_table(), $this->_fieldsMap(), $this->_ttl());
    }

    protected function _get(): array {
        $result = $this->_cacheChain->retrieveData();
        if (empty($result) || !$this->_validate($result)) {
            $result = $this->_init();
        }
        return $result;
    }

    protected function _init(): array {
        $data = $this->_retrieveData();
        $preparedData = $this->_prepare($data);
        $this->_cacheChain->storeData($preparedData);
        return $preparedData;
    }

    abstract protected function _table();

    abstract protected function _fieldsMap(): array;

    abstract protected function _retrieveData(): array;

    abstract protected function _ttl(): int;

    protected function _validate($data) {
        return is_array($data);
    }

    protected function _prepare($data) {
        return $data;
    }
}
