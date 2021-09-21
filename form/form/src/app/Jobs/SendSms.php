<?php

namespace App\Jobs;

use App\Service;

class SendSms extends Job {

    private $_phone;
    private string $_body;
    private string $_service;

    public function __construct($phone, string $body, string $service) {
        $this->_phone = $phone;
        $this->_body = $body;
        $this->_service = $service;
    }

    public function handle() {
        try {
            app()->make(Service\Sms::class)->send($this->_phone, $this->_body);
        } catch (\Throwable $t) {
            app()['log']->critical('Sending sms failed', ['exception_class' => get_class($t), 'message' => $t->getMessage(), 'trace' => Service\Utils::cutTrace($t)]);
        }
    }
}