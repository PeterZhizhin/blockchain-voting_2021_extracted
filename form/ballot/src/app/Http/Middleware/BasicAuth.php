<?php


namespace App\Http\Middleware;

use App\Service\Utils;
use Closure;

class BasicAuth {

    public function handle($request, Closure $next, $guard = null) {
        if (!env('BASIC_AUTH_ENABLED', true)) {
            return $next($request);
        }
        $dateFrom = new \DateTime(env('BASIC_AUTH_FROM'));
        $dateTo = new \DateTime(env('BASIC_AUTH_TO'));

        $isInPeriod = Utils::isInPeriod($dateFrom, $dateTo);
        $headerToken = $request->header('TOKEN');
        $isValidTokenInHeader = $headerToken == env('BASIC_AUTH_TOKEN');

        if ($isInPeriod && !$isValidTokenInHeader) {
            app()['log']->info('Попытка доступа с не валидным токеном', [
                'type'  => 'access',
                'token' => $headerToken,
            ]);
            return response("Данной страницы не существует", 404);
        }
        $title = 'В настоящий момент услуга<br>недоступна';
        $message = 'Мы занимаемся обновлением и настройкой услуги,<br>чтобы она работала ещё лучше и удобнее<br>';
        return $next($request);
    }

}