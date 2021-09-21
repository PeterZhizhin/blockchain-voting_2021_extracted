<?php

namespace App\Component\Validation;

use App\Service\Locator;

class Facade {

    public function check() {
        $this->_processor()->check();
    }

    public function getType(): string {
        return $this->_processor()->getType();
    }

    private function _processor(): Processor {
        return Locator::get(Processor::class);
    }
}