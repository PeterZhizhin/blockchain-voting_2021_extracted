<?php

namespace App\Component\Election\Validation\Exception;

use App\Exceptions;

class SettingNotFound extends Exceptions\Base {
    public function __construct() {
        parent::__construct('Настройки голосования не найдены');
    }
}