<?php

namespace App\Http\Middleware;

use App\Service;
use Closure;
use Illuminate\Contracts\Auth\Factory as Auth;
use Illuminate\Http;

class SystemAuth
{
    /**
     * The authentication guard factory instance.
     *
     * @var \Illuminate\Contracts\Auth\Factory
     */
    protected $auth;

    /** @var  \Psr\Log\LoggerInterface */
    private $_logger;

    private $_config;

    public function __construct(Auth $auth)
    {
        $this->auth = $auth;
        $this->_logger = app()['log'];
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

    private function _errorResponse($message) {
        $errorCode = 401;
        return response()->json([
            'error' => 1,
            'errorMessage' => $message,
            'code' => $errorCode,
        ], $errorCode, ['Content-Type' => 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE)->setStatusCode($errorCode);
    }
}
