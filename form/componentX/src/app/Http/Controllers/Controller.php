<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController {

    final protected function _jsonSuccessResponse(array $data) {
        return $this->_jsonResponse($data);
    }

    final protected function _jsonErrorResponse(int $errorCode, string $message) {
        return $this->_jsonResponse(['error' => $errorCode, 'message' => $message]);
    }

    final protected function _jsonResponse(array $data, int $code = 200) {
        return response()->json($data, $code, ['Content-Type' => 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }
}