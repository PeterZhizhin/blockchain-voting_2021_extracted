<?php

namespace App\Service;

/**
 * Description of oauth
 *
 * @author Blakkky
 */

use App\Exceptions\RedirectRequired;
use Illuminate\Contracts;
use Illuminate\Support\Facades\Request;
use App\Service\Config\PoolConfig;

class OAuth {

	use CurlTrait;

	private static $USER_ENV = 'OAUTH_ENV';
	public static $USER_TOKEN = 'OAUTH_TOKEN';
	private static $USER_DATA_KEY = 'oauth|';
	private static $USER_DATA_EXPIRES = 300; // 5 минут
	private static $OAUTH_ENABLED = null;
	private static $LOG_FILE = 'oauth.log';

	/** @var OAuth Инстанс класса */
    private static $instance = null;

	private $loginURL = '';
	private $tokenURL = '';
	private $userDataUrl = '';
	private $clientId = '';
	private $clientSecret = '';
	private $backURL = '';
    private $token = '';
	private $forceAuthorize = false;
    protected $_config;

	/**
	 * Конструктор
	 */
	public function __construct() {
        $this->_config = PoolConfig::me()->get('Sudir');
		$this->loginURL     = $this->_config->get('login_url');
		$this->tokenURL     = $this->_config->get('token_url');
		$this->userDataUrl  = $this->_config->get('user_data');
		$this->clientId     = $this->_config->get('client_id');
		$this->clientSecret = $this->_config->get('client_secret');
		$this->backURL      = $this->_config->get('backurl');
        $this->token        = $this->_config->get('cookie_token','Ltpatoken2');
        if (!empty($_COOKIE[$this->token])) {
            $_COOKIE[$this->token] = str_replace(' ','+',$_COOKIE[$this->token]);
        }
		$this->initCurlCfg();
	}

    /**
     * Вынуть из ответа СУДИР данные о пользователе
     * @param array $result
     * @return array
     */
    private function extractUserData($result) {
        self::log('INFO', 'Вынули данные пользователя из ответа');
        if (empty($result['guid'])) return array();
        return array(
            'SSO_ID' => $this->getFieldData($result, 'guid'),
            'first_name' => $this->getFieldData($result, 'firstName'),
            'last_name' => $this->getFieldData($result, 'lastName'),
            'middle_name' => $this->getFieldData($result, 'middleName'),
            'mail' => $this->getFieldData($result, 'mail'),
            'mobile' => $this->getFieldData($result, 'mobile'),
        );
    }

    private function getFieldData($result, $name) {
        return $result[$name] ?? '';
    }

    /**
     * Вынуть из ответа СУДИР данные о ЕСИА-токенах
     * @param array $result
     * @return array
     */
    private function extractESIAData($result) {
        self::log('INFO', 'Вынули данные ЕСИА из ответа)');
        if (!isset($result['esiaDataVO'])||!isset($result['guid']))
            return array();
        return array(
            'SSO_ID' => $result['guid'],
            'first_name' => $result['firstName'],
            'last_name' => $result['lastName'],
            'middle_name' => $result['middleName'],
            'mail' => $result['mail'],
            'mobile' => isset($result['phone'])?$result['phone']:$result['mobile'],
            'esiaDataVO'=>$result['esiaDataVO']
        );
    }
    
    /**
     * Вынуть из ответа СУДИР данные о ЮЛ/ЭЦП
     * @param array $result
     * @return array
     */
    private function extractLegalData($result) {
        /*
         * {"guid":"9b3d0147-66f3-4ae5-bf97-9ecce4d3caa4","firstName":"Пользователь Первый","lastName":"Тестовый","middleName":"","phone":"","mail":"first@test.local",
         * "legalPersonVO":{
         * 	"corpid":"d39e5bee-98fe-49ab-9861-c168e6116f62",
         * 	"certificateid":”6FE2555B0000000138A7”,
         * 	"corpInn":"7702222222",
         * 	"corpOgrn":"1137702222228"
         * }}
         */

        self::log('INFO', 'Вынули данные ЮЛ/ИП из ответа');
        if (!isset($result['legalPersonVO'])||!isset($result['guid']))
            return array();
        $token = $this->parsedIdToken();

        $legalData = array(
            'SSO_ID' => $result['guid'],
            'first_name' => $result['firstName'],
            'last_name' => $result['lastName'],
            'middle_name' => $result['middleName'],
            'mail' => $result['mail'],
            'mobile' => isset($result['phone'])?$result['phone']:$result['mobile'],
            'KORP_ID' => $result['legalPersonVO']['corpId'],
            'ogrn' => $result['legalPersonVO']['corpOgrn'],
            'inn' => $result['legalPersonVO']['corpInn'],
            //'cert_serial' => $result['legalPersonVO']['certificateID'],
            'LegalisIp' => mb_strlen($result['legalPersonVO']['corpOgrn'])==15?1:0,
            'LegalName' => $token['org_name'],
            'LegalInn' => $result['legalPersonVO']['corpInn'],
            'LegalOgrn' => $result['legalPersonVO']['corpOgrn'],
            'LegalHeadPosition' => $token['org_title'],
            'LegalAddress' => $token['org_state'].','.$token['org_street'],
            'LegalCity' => $token['org_city'],
            'LegalEmail' =>$token['org_email'],

        );
        if (empty($legalData['LegalName'])) {
            if ($legalData['LegalisIp'] == 1) {
                $legalData['LegalName']= 'ИП '.$legalData['last_name'].' '.$legalData['first_name'].' '.$legalData['middle_name'];
            }
            else {
                $legalData['LegalName']='Без названия';
            }
        }
        return $legalData;
    }

	public function getUserDataFromService() {
        $token  = $this->token();
        if (empty($token)) {
            return null;
        }
        $headers = [
            'Authorization' => "Bearer {$token}",
        ];
        app()['log']->info('Передача в СУДИР запроса на получение данных авторизованного Пользователя', [
            'action' => 'sudir_user_request',
            'request' => [],
            'headers' => $headers,
            'url' => $this->userDataUrl,
            'is_success' => 1,
        ]);
        $curl = new Curl();
        $result = $curl->get($this->userDataUrl, [], $headers);
        $result = json_decode($result, true);
        $sso = $this->getFieldData($result, 'guid');
        app()['log']->info('Получение от СУДИР данных авторизованного Пользователя', [
            'is_success' => (int)(!empty($sso)),
            'response' => $result,
            'action' => 'sudir_user_request_result',
        ]);
		$this->check_valid_answer($result);

        if (empty($sso)) {
            return null;
        }
        $parsedToken = $this->parsedIdToken();

        $userData = array(
                'SSO_ID' => $sso,
                'first_name' => $this->getFieldData($result, 'FirstName'),
                'last_name' => $this->getFieldData($result, 'LastName'),
                'middle_name' => $this->getFieldData($result, 'MiddleName'),
                'mail' => $this->getFieldData($result, 'mail'),
                'mobile' => $this->_extractMobile($result),
                'trusted'=>$this->getFieldData($result, 'trusted'),
                'ogrn' => $this->getFieldData($result, 'org_OGRN'),
                'LegalEmail' => $this->getFieldData($result, 'org_email'),
                'LegalName' => $this->getFieldData($result, 'org_name'),
                'LegalState' => $this->getFieldData($result, 'org_state'),
                'LegalCity' => $this->getFieldData($result, 'org_city'),
                'LegalStreet' => $this->getFieldData($result, 'org_street'),
                'LegalUnit' => $this->getFieldData($result, 'org_unit'),
                'LegalTitle' => $this->getFieldData($result, 'org_title')
         );

        $innFromToken = $parsedToken['org_INN'] ?? null;
        $userData['is_legal'] = $innFromToken !== null && strlen($innFromToken) > 0;
        app()['log']->info('User successfully authorized', ['jsonResponse' => $userData, 'jsonRequest' => $parsedToken]);
		return $userData;
	}

	private function _extractMobile(array $data) {
        if (!array_key_exists('mobile', $data)) {
            return null;
        }
        $mobile = $data['mobile'];
        if (strlen($mobile) === 11 && strpos($mobile, '7') === 0) {
            return substr($mobile, 1);
        }
        return $mobile;
    }

     /**
	 * Проверим на корректность возвращаемых данных  от курла
	 * @param mixed $result
	 * @return array
	 */
	private function check_valid_answer($result) {
		self::log('INFO', 'Проверим ответ от сервиса на валидность', $result);
		if (is_string($result)&&$this->forceAuthorize) {
			self::log('INFO', 'Строка в ответе! Очищаем сессию.', $result);
			$_SESSION[self::$USER_TOKEN]=array();
			$this->redirectToLogin();
		}
    }

    public function processAuthCodeNew(string $authCode, Contracts\Session\Session $session) {
        $postData = array(
            'redirect_uri'  => $this->backURL,
            'grant_type'    => 'authorization_code',
            'code'          => $authCode,
            'client_secret' => $this->clientSecret,
            'client_id'     => $this->clientId,
        );
        app('log')->info('Передача в СУДИР запроса на получение токена доступа', [
            'request' => $postData,
            'action' => 'sudir_request_token',
            'is_success' => 1,
        ]);
        $durationCounter = DurationCounter::start();
        $result = $this->curl($this->tokenURL, $postData);

        app()['log']->info('Получение от СУДИР токена доступа', [
            'response' => $result,
            'duration_ms' => $durationCounter->finish(),
            'action' => 'sudir_request_token_result',
            'is_success' => (int)($result['access_token'] ?? null !== null)
        ]);

        $data = array(
            $this->token    => app()['request']->cookie($this->token),
            'id_token'      => $result['id_token'] ?? null,
            'access_token'  => $result['access_token'] ?? null,
            'expires'       => $result['expires_in'] ?? null,
            'refresh_token' => $result['refresh_token'] ?? null,
        );
        $session->put(self::$USER_TOKEN, $data);
        $session->remove(User::SESSION_KEY_USER);
    }

    public function verifyCookieToken(Contracts\Session\Session $session) {
	    $isVerifyCookieToken = $this->_config->get('is_verify_cookie_token') ?? false;
	    if (!$isVerifyCookieToken) {
	        return true;
        }
	    $tokenData = $session->get(self::$USER_TOKEN);
        $storedToken = $tokenData[$this->token];
        if (empty($storedToken)) {
            return true;
        }
	    $tokenFromCookie = app()['request']->cookie($this->token) ?? null;
	    return $tokenFromCookie === $storedToken;
    }

	/**
	 * Прочитать токен
	 * @return string
	 */
	private function token() {
	    return app()['session.store']->get(self::$USER_TOKEN)['access_token'] ?? app()['request']->header('access-token') ?? null;
	}

     /**
	 * Прочитать или записать токен
	 * @param string $newToken
	 * @return string
	 */
	public function parsedIdToken() {
	    $idToken = app()['session.store']->get(self::$USER_TOKEN)['id_token'] ?? null;
		$parsed = array();
            if (!empty($idToken)) {
               $splited = explode('.',$idToken);
               $parsedJson =  $this->decode($splited[1]);
               $parsed = json_decode($parsedJson,true);
            }
		return $parsed;
	}

    protected function decode($input) {
        $remainder = strlen($input) % 4;
        if ($remainder) {
            $padlen = 4 - $remainder;
            $input .= str_repeat('=', $padlen);
        }
        return base64_decode(strtr($input, '-_', '+/'));
    }

	public function buildAuthURL() {
        return $this->loginURL . '?redirect_uri=' . urlencode($this->backURL) . '&response_type=code&scope=openid+profile+contacts&client_id=' . $this->clientId;
	}

	public function redirectToLogin() {
		self::log('NETWORK', 'Отправили вводить логин/пароль', $this->buildAuthURL());
		throw new RedirectRequired($this->buildAuthURL());
	}

	public function getRedirectionUrl(Contracts\Session\Session $session) {
		return env('APP_URL', 'localhost') . $session->get('request_uri');
	}

    public static function getInstance()
    {
        if (self::checkOAuthEnabled() && empty(self::$instance)) {
            self::$instance = new OAuth();
        }

        return self::$instance;
    }

    private static function log($type, $message, $data = null) {
        if (!is_array($data)) {
            $data = ['data' => $data];
        }
        app()['log']->info($message, $data);
    }

    /**
     * Проверить, включен ли oAuth?
     * @return boolean
     */
    public static function checkOAuthEnabled() {
        return true;
    }
}
