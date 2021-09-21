<?php


namespace App\Http\Middleware;

use App\Service\Utils;
use Closure;

class BasicAuth {

    public function handle($request, Closure $next, $guard = null) {
        if (!Utils::isHasBasicAccess($request) && env('BASIC_AUTH_ENABLED', true)) {
            app()['log']->info('Попытка доступа с не валидным токеном', [
                'type'  => 'access',
                'token' => $request->header('TOKEN'),
            ]);

            return redirect(route('denied'));
        }
        
        return $next($request);
    }

}