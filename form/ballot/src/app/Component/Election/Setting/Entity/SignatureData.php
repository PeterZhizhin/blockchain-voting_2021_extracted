<?php

namespace App\Component\Election\Setting\Entity;

class SignatureData {

    private array $_signatureData;

    public function __construct(array $signatureData = []) {
    }

    /** TODO: Implement method */
    public function getOpenKey($votingId, $districtId): string {
        return '';
    }
}
