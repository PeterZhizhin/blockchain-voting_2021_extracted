<?php

namespace App\Http\Controllers;

use App\Service\Locator;
use Illuminate\Http\Request;
use App\Service;

class Election extends Controller {

    private Service\Encryption $_encryptionService;

    public function __construct(Request $request) {
        parent::__construct($request);
        $this->_encryptionService = Locator::get(Service\Encryption::class);
    }

    public function decrypt() {
        $data = $this->_data();
        app()['log']->info('Получение запроса на расшифровку шифрованного сообщения', [
            'action' => 'decrypt_request',
            'request' => $this->_request->all(), 
        ]);
        try {
            $response = $this->_encryptionService->decrypt($data);
        } catch (\Exception $exception) {
            return $this->_jsonErrorResponse($exception->getCode(), $exception->getMessage());
        }
        app()['log']->info('Передача ответа с телом расшифрованного сообщения', [
            'action' => 'decrypt_response',
            'response' => ['data' => ['result' => $response]], 
        ]);
        return $this->_jsonSuccessResponse(['data' => ['result' => $response]]);
    }

    public function decryptPack() {
        $guidData = $this->_request->all();
        app()['log']->info('Получение запроса на расшифровку шифрованного сообщения', [
            'action' => 'decrypt_request',
            'request' => $this->_request->all(), 
        ]);
        $result = [];
        $hashSecret = env('HASH_SECRET', 'hashGid');
        foreach ($guidData as $guid => $base64EncodedData) {
            try {
                $decrypted = $this->_encryptionService->decryptRaw($base64EncodedData);
            } catch (\Exception $exception) {
                return $this->_jsonErrorResponse(10, 'Unable to decrypt data');
            }
            $decryptedDecoded = json_decode($decrypted, true);
            $result[$guid] = hash_hmac('stribog512', $decryptedDecoded['groupId'], $hashSecret);
        }
        app()['log']->info('Передача ответа с телом расшифрованного сообщения', [
            'action' => 'decrypt_response',
            'response' => ['result' => $result, 'errorMessage' => '', 'error' => 0], 
        ]);
        $response = ['result' => $result, 'errorMessage' => '', 'error' => 0];
        return $this->_jsonResponse($response);
    }

    public function crypt() {
        app()['log']->info('Получение запроса на шифрование сообщения', [
            'action' => 'crypt_request',
            'request' => $this->_request->all(), 
        ]);
        $data = $this->_data();
        try {
            $response = $this->_encryptionService->crypt($data);
        } catch (\Exception $exception) {
            return $this->_jsonErrorResponse($exception->getCode(), $exception->getMessage());
        }
        app()['log']->info('Ответ с телом зашифрованного сообщения', [
            'action' => 'crypt_response',
            'response' => ['result' => $response], 
        ]);
        return $this->_jsonSuccessResponse(['result' => $response]);
    }

    private function _data() {
        $requestParams = $this->_request->all();
        return array_key_exists('data', $requestParams) ? $requestParams['data'] : $requestParams;
    }
}