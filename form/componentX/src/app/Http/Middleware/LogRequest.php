<?php

namespace App\Http\Middleware;

use App\Service\Utils;
use Illuminate\Http;

class LogRequest
{
    private static array $_logData = [];

    private static $_bootTime;

    public function handle($request, \Closure $next)
    {
        self::$_bootTime = microtime(true);
        return $next($request);
    }

    public function terminate($request, $response) {
        if ($request instanceof Http\Request) {
            $durationRaw = microtime(true) - self::$_bootTime;
            $duration = round($durationRaw * 1000, 2);
            $route = explode('@', $request->route()[1]['uses'] ?? '');
            $method = array_pop($route);
            $stats = Utils::isCoroutineEnabled() ? app()['swoole.server']->stats() : null;
            if (empty($method)) {
                return;
            }
            $logData = array_merge([
                'method'       => $request->getMethod(),
                'uri'          => $request->getRequestUri(),
                'jsonRequest'  => $request->json() ?: $request->all(),
                'duration_ms'  => $duration,
                'swoole'       => $stats,
                'version'      => 8,
                'level'        => 'info',
                'requestIp'    => rawurlencode($request->ip()),
            ], self::$_logData);
            $logData['code'] = $response instanceof Http\Response ? $response->getStatusCode() : null;
            self::$_logData = [];
            app()['log']->info("Request served: {$request->getRequestUri()}", $logData);
        }
    }

    public static function setCached() {
        self::$_logData['cached'] = 1;
    }

    public static function setRealTime() {
        self::$_logData['cached'] = 0;
    }
}
