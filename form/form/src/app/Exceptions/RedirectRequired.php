<?php

namespace App\Exceptions;

use Throwable;
use App\Exceptions;

class RedirectRequired extends Exceptions\Base {

    /** @var string */
    private $_location;

    public function __construct(string $location, $message = "", $code = 0, Throwable $previous = null) {
        parent::__construct($message, $code, $previous);
        $this->_location = $location;
    }

    public function location(): string {
        return $this->_location;
    }
}