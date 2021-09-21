<?php

namespace App\Http\Controllers;

use App\Service;
use Illuminate\Http;
use App\Service\Utils;

class OAuthController extends Controller
{
    /** @var Service\OAuth */
    private $_oAuth;

    public function __construct(Http\Request $request, Http\Response $response, Service\OAuth $oAuth) {
        parent::__construct($request, $response);
        $this->_oAuth = $oAuth;
    }

    public function handle() {
        $code = $this->_request->get('code');
        app()['log']->info('Получение авторизованного кода от СУДИР', [
            'action' => 'sudir_receive_code',
            'code' => $code,
            'is_success' => (int)($code !== null),
        ]);
        $session = $this->_request->session();
        $location = $this->_oAuth->getRedirectionUrl($session);
        try {
            $this->_oAuth->processAuthCodeNew($code, $session);
            $this->_userService->getUser();
        } catch (\Exception $e) {
            app()['log']->error($e->getMessage(), ['class' => get_class($e), 'trace' => Utils::cutTrace($e)]);
            // caught exception indicates code deprecation, so we simply redirect back
        }
        return redirect($location);
    }

    public function logout() {
        app()['log']->info('Отправка запроса на удаление сессии пользователя', [
            'action' => 'sudir_user_session_clear',
            'is_success' => 1,
        ]);
        $this->_userService->clearUserSession();
        $redirect = redirect(env('SUDIR_LOGOUT_URL', 'https://login.2020og.ru/sps2/login/logout?post_logout_redirect_uri=https://2020og.ru/'));
        app()['log']->info('Передача ссылки на logout СУДИР', [
            'is_success' => 1,
            'action' => 'sudir_user_logout_link',
        ]);
        return $redirect;
    }
}
