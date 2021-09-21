<?php

namespace App\Component\Election;

use Illuminate\Support\Facades\Http;

class Facade {

    public function refreshSettings(): void {
        CSL::settingsKeeper()->refreshSettings();
    }

    public function receiveGid(int $votingId, string $ssoIdHmac): string {
        // Получаем идентификатор отложенного пользователя в исходном виде
        $groupId = CSL::mdmKeeper()->receiveGroupId($votingId, $ssoIdHmac);
        // Берём от него хэш
        $gid = $this->_hmacGid($groupId);
        // Шифруем его компонентом шифрования
        $guidCypher = $this->_cypherGid($gid);
        app()['log']->info('Receive gid', ['action' => 'receive_gid', 'ssoIdHmac' => $ssoIdHmac, 'gid' => $gid, 'gidCypher' => $guidCypher]);
        return $guidCypher;
    }

    public function _cypherGid(string $data): string {
        return $this->_request('/api/encryption/crypt', $data);
    }

    private function _request(string $uri, $data) {
        $host = env('ENCRYPTOR_GID_HOST', 'encryptor-gid:8000');
        $data = ['data' => $data];
        $headers = [
            'SYSTEM'       => env('ENCRYPTOR_GID_SYSTEM'),
            'SYSTEM-TOKEN' => env('ENCRYPTOR_GID_TOKEN'),
        ];
        $response = Http::withHeaders($headers)
            ->post("{$host}{$uri}", $data)
            ->throw()
            ->json();
        return $response['result'];
    }

    private function _hmacGid(string $gid): string {
        return hash_hmac('stribog512', $gid, env('GID_HMAC_SECRET'));
    }
}
