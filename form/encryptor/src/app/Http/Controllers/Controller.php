<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;

class Controller extends BaseController {

    protected Request $_request;

    public function __construct(Request $request) {
        $this->_request = $request;
    }

    final protected function _param(string $key) {
        return $this->_request->get($key) ?: $this->_request->post($key);
    }

    final protected function _jsonSuccessResponse(array $data) {
        return $this->_jsonResponse($data);
    }

    final protected function _jsonErrorResponse(int $errorCode, string $message) {
        return $this->_jsonResponse(['error' => $errorCode, 'message' => $message], 400);
    }

    final protected function _jsonResponse(array $data, int $code = 200) {
        return response()->json($data, $code, ['Content-Type' => 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }
}