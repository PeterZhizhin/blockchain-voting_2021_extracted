<?php

namespace App\Exceptions;

abstract class Base extends \Exception {

    public function name() {
        $shortName = (new \ReflectionClass($this))->getShortName();
        return camel_case(strtolower($shortName));
    }
}