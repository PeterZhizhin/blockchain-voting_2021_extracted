<?php

namespace App\Http\Middleware;

use Closure;

class SystemAuth
{
    private $_config;
    private ?string $_system = null;

    public function __construct() {
        $this->_config = config('SystemAuth');
    }

    public function handle($request, Closure $next, $guard = null) {
        $system = $request->header('SYSTEM');
        $token = $request->header('SYSTEM_TOKEN');
        $this->_system = $system;
        app()->instance(self::class, $this);

        if (empty($system) || !array_key_exists($system, $this->_config)) {
            app()['log']->error('Некорректная система', ['type' => 'system_auth', 'system' => $system, 'token' => $token]);
            return $this->_errorResponse('Некорректная система');
        }
        if (empty($token) || (string)$token !== (string)$this->_config[$system]) {
            app()['log']->error('Некорректный токен', ['type' => 'system_auth', 'system' => $system, 'token' => $token]);
            return $this->_errorResponse('Некорректный токен системы');
        }
        return $next($request);
    }

    public function system(): ?string {
        return $this->_system;
    }

    private function _errorResponse($message) {
        $errorCode = 401;
        return response()->json([
            'error' => 1,
            'errorMessage' => $message,
            'code' => $errorCode,
        ], $errorCode, ['Content-Type' => 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE)->setStatusCode($errorCode);
    }
}
