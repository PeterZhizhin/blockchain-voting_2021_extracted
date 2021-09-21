<?php

namespace App\Component\Common\Entity;

class TempData {

    public $data;
    public \DateTime $expireDate;

    public function __construct($data, \DateTime $expireDate) {
        $this->data = $data;
        $this->expireDate = $expireDate;
    }
}