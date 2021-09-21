<?php

namespace App\Http\Middleware;

use Illuminate\Routing;
use App\Service\Utils;
use Closure;

class ThrottleRequests extends Routing\Middleware\ThrottleRequests {

    protected function _buildRouteMiddlewareHash($request, $decaySeconds, $maxAttempts) {
        return Utils::getRouteHash($request) . $decaySeconds . $maxAttempts;
    }

    public function handle($request, Closure $next, $maxAttempts = 60, $decaySeconds = 1, $prefix = '') {
        $key = $prefix.$this->_buildRouteMiddlewareHash($request, $decaySeconds, $maxAttempts);

        $maxAttempts = $this->resolveMaxAttempts($request, $maxAttempts);

        if ($maxAttempts === 0 || $this->limiter->tooManyAttempts($key, $maxAttempts)) {
            app()['log']->info("Too many requests, rendering highload error template");
            return $this->_tooManyAttemptsResponse();
        }

        $this->limiter->hit($key, $decaySeconds);
        $response = $next($request);
        return $response;
    }

    private function _tooManyAttemptsResponse() {
        $view = app()['view'];
        $view->share('url_404', route('landing'));
        $view->share('base_template_path',  resource_path() . '/views/base');
        $view->share('retry_time_in_seconds', config('ThrottleRequests')['retryIn']);
        $view->share('app', []);
        $view->share('hide_right_block', true);
        $view->share('show_error', false);
        return view('base.innerMos', ['content' => view('base.common.error.highload'), 'base_template_path' => resource_path() . '/views/base']);
        return response($view, 429);
    }
}