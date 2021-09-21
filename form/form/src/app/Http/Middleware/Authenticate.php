<?php

namespace App\Http\Middleware;

use App\Service\OAuth;
use App\Service;
use Closure;
use Illuminate\Auth\GenericUser;
use Illuminate\Contracts\Auth\Factory as Auth;

class Authenticate
{
    /**
     * The authentication guard factory instance.
     *
     * @var \Illuminate\Contracts\Auth\Factory
     */
    protected $auth;

    /** @var Service\User */
    private $_userService;

    /**
     * Create a new middleware instance.
     *
     * @param \Illuminate\Contracts\Auth\Factory $auth
     * @param Service\User $userService
     */
    public function __construct(Auth $auth, Service\User $userService)
    {
        $this->_userService = $userService;
        $this->auth = $auth;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        $_REQUEST = $request->all();
        $_COOKIE = $request->cookies->all();
        $_SESSION = $request->session()->all();
        $user = $this->_userService->getUser();
        $request->session()->put('request_uri', $request->getRequestUri());
        if (empty($user)) {
            if ($request->isJson()) {
                return response()->json(['status' => 'error', 'code' => 401], 401);
            }
            $oAuth = OAuth::getInstance();
            // Перенаправляем неавторизованных пользователей на форму авторизации
            $url = $oAuth->buildAuthURL();
            app()['log']->info('Передача на форму ссылки на СУДИР', [
                'url' => $url,
                'is_success' => 1,
            ]);
            return redirect($oAuth->buildAuthURL());
        }
        $isLegal = $user->__isset('is_legal') && $user->is_legal;
        // Отказываем юр. лицам
        if ($isLegal) {
            $url = route('deny_legal');
            app()['log']->info('Попытка входа юрика', [
                'error' => 'access_ul',
                'user' => (array)$user,
                'route'=>$url
            ]);
            return redirect($url);
        }
        return $next($request);
    }
}
