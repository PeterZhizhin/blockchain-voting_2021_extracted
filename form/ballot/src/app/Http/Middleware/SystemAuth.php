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

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $feature = null) {
        $system = $request->header('SYSTEM');
        $token = $request->header('SYSTEM_TOKEN');
        $this->_system = $system;
        app()->instance(self::class, $this);
        $configForSystem = $this->_config[$feature] ?? null;

        if ($configForSystem === null) {
            return $this->_errorResponse("System auth config for feature {$feature} not found");
        }

        if (empty($system) || !array_key_exists($system, $configForSystem)) {
            app()['log']->error('Некорректная система', ['type' => 'system_auth', 'system' => $system, 'token' => $token]);
            return $this->_errorResponse('Некорректная система');
        }
        if (empty($token) || (string)$token !== (string)$configForSystem[$system]) {
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
