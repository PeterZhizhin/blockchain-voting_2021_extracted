<?php

namespace App\Service;

use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;

class Sms {

    /** @var array */
    private $_config;

    public function __construct() {
        $this->_config = config('Sms');
    }

    public function send($phone, string $body, ?string $trackingId = null) {
        $this->_send($phone, $body, $trackingId);
    }

    private function _send($phone, string $body, ?string $trackingId) {
        $params = $this->_params($phone, $body, $trackingId);
        $durationCounter = DurationCounter::start();
        try {
            $response = Http::withHeaders($this->_headers())->timeout($this->_config['timeout'])->post($this->_config['url'], $params);
            $this->_processResponse($response);
        } catch (\Throwable $t) {
            app()['log']->error('Получили ошибку при отправке через емп по протоколу 2.0', [
                'exception_class'   => get_class($t),
                'exception_message' => $t->getMessage(),
                'jsonRequest'       => $params,
                'duration_ms'       => $durationCounter->finish(),
                'phone'             => $phone,
                'body'              => $body,
                'action'            => 'sms_sent',
                'url'               => $this->_config['url'],
                'response'          => null,
            ]);
            throw $t;
        }

        app()['log']->info('Успешный вызов емп по протоколу 2.0', [
            'jsonRequest'  => $params,
            'jsonResponse' => $response->body(),
            'duration_ms'  => $durationCounter->finish(),
            'url'          => $this->_config['url'],
            'phone'        => $phone,
            'action'       => 'sms_sent',
            'body'         => $body,
        ]);
    }

    private function _headers() {
        return [
            'x-ext-emp-token' => $this->_config['token'],
            'Content-type'    => 'application/json',
        ];
    }

    private function _params($phone, string $body, $trackingId): array {
        return [
            'source'         => $this->_config['source'],
            'destination'    => "7{$phone}",
            'message'        => $body,
            'ext_message_id' => $trackingId,
            'token'          => $this->_config['token'],
        ];
    }

    private function _processResponse(Response $response) {
        $errorCode = $response->json()['errorCode'] ?? null;
        if ($errorCode !== 0) {
            throw new \Exception("Result code invalid, body: {$response->body()}");
        }
    }
}