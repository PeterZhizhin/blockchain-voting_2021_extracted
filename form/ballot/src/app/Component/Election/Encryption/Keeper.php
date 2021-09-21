<?php

namespace App\Component\Election\Encryption;

use App\Service\Config\FileConfig;
use App\Service\Config\PoolConfig;
use App\Component\Election\Exception;
use App\Service\DurationCounter;
use App\Service\Utils;
use Illuminate\Support\Facades\Http;

class Keeper {

    private FileConfig $_config;

    public function __construct() {
        $this->_config = PoolConfig::me()->get('Encryption');
    }

    public function crypt(string $data): string {
        $response = $this->_request('/api/encryption/crypt', $data);
        return $response['result'];
    }

    public function decrypt(string $data): string {
        $data = ['base64body' => $data];
        $response = $this->_request('/api/encryption/decrypt', $data);
        return $response['data']['result'];
    }

    private function _request(string $uri, $data) {
        $host = env('ENCRYPTOR_HOST', 'encryptor:8000');
        $data = ['data' => $data];
        $headers = [
            'SYSTEM'       => env('ENCRYPTOR_SYSTEM'),
            'SYSTEM-TOKEN' => env('ENCRYPTOR_TOKEN'),
        ];
        $durationCounter = DurationCounter::start();
        try {
            $response = Http::withHeaders($headers)
                ->post("{$host}{$uri}", $data)
                ->throw()
                ->json();
            app()['log']->info('Requested encryptor', [
                'url'     => "{$host}{$uri}",
                'action' => 'encryptor_request',
                'request' => $data,
                'duration_ms' => $durationCounter->finish(),
            ]);
            return $response;
        } catch (\Throwable $t) {
            app()['log']->error('Request encryptor failed', [
                'exception_class' => get_class($t),
                'error'   => Utils::throwableName($t),
                'url'     => "{$host}{$uri}",
                'request' => $data,
                'duration_ms' => $durationCounter->finish(),
                'action' => 'encryptor_request',
            ]);
            throw $t;
        }
    }

    public function validateHmacHash(array $data, string $hashHmac): void {
        $jsonTest = json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        if (hash_hmac('gost', $jsonTest, $this->_config->get('cert')) !== $hashHmac) {
            throw new Exception\SignatureInvalid();
        }
    }

    public function validateHash(array $data, string $hash): void {
        $jsonTest = json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        if (hash('stribog512', $jsonTest) !== $hash) {
            throw new Exception\SignatureInvalid();
        }
    }
}