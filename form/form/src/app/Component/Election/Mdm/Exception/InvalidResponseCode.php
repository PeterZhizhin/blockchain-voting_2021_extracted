<?php


namespace App\Component\Election\Mdm\Exception;


class InvalidResponseCode extends Base {
    public function getStatusCode(): int
    {
        return 403;
    }
}