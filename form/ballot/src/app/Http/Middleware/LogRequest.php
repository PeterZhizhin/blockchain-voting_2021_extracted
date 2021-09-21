<?php

namespace App\Http\Middleware;

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
            if (empty($method)) {
                return;
            }
            try {
                $jsonRequest = $request->json()->all();
            } catch (\Throwable $t) {
                $jsonRequest = [];
            }
            $logData = array_merge([
                'action'       => 'request_served',
                'method'       => $request->getMethod(),
                'uri'          => $request->getRequestUri(),
                'jsonRequest'  => $jsonRequest,
                'jsonResponse' => $response instanceof Http\JsonResponse ? $response->getData() : null,
                'duration_ms'  => $duration,
                'version'      => 8,
                'level'        => 'info',
                'requestIp'    => rawurlencode($request->ip()),
                'system'       => app()->has(SystemAuth::class) ? app()->get(SystemAuth::class)->system() : null,
            ], self::$_logData);

            $logData['code'] = $response instanceof Http\Response ? $response->getStatusCode() : null;
            self::$_logData = [];
            app()['log']->info("Request served: {$request->getRequestUri()}", $logData);
        }
    }
}
