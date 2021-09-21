<?php

namespace App\Http\Controllers;

use App\Service;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Http;

class BaseAjax extends BaseController {

    /** @var Http\Request */
    protected $_request;

    /** @var Http\Response */
    protected $_response;

    /** @var  \Psr\Log\LoggerInterface */
    protected $_logger;

    /** @var  \Psr\Log\LoggerInterface */
    protected $_armMgikLogger;

    /** @var \Illuminate\Session\Store */
    protected $_session;

    public function __construct(
        Http\Request $request,
        Http\Response $response
    ) {
        $this->_request         = $request;
        $this->_response        = $response;
        $this->_logger          = app()['log'];
        $this->_session         = $request->session();
        $this->_armMgikLogger   = app()['log']->channel('arm');
    }

    protected $_errorsMap = [
        1 => ['Пользователь не авторизован', 401],
        2 => ['Неподдерживаемый метод', 405],
        3 => ['Некорректные параметры', 400],
        4 => ['Некорректная система', 401],
        5 => ['Некорректный токен системы', 401],
        6 => ['Доступ этой системы к методу запрещен', 401],
        7 => ['Данные защиты переданы не в полном составе', 403],
        8 => ['Данные округа не переданы', 401],
        9 => ['Данные защиты переданы некорректны', 401],
        10 => ['Данные не валидно зашифрованы или сжаты', 403],
        11 => ['Запрошен несуществующий бюллетень', 404],
        12 => ['Технический сбой при работе сервиса шифрования', 400],
        13 => ['Попытка взлома голосования сервиса шифрования', 400],
        14 => ['Попытка захода на несуществующее голосование', 400],
        15 => ['Попытка захода на несуществующее голосование', 400],
        16 => ['<ul><li>проголосовать можно только один раз,</li><li>проголосовать можно со своего устройства, если его память после загрузки бюллетеня не была Вами очищена (выключение, перезагрузка, сброс к заводским настройкам).</li></ul>', 400],
        17 => ['<ul><li>голосование уже завершено.</li></ul>', 400],
        18 => ['<ul><li>проголосовать можно с устройства, на котором впервые был открыт бюллетень, если его память после загрузки бюллетеня не была Вами очищена (выключение, перезагрузка, сброс к заводским настройкам).</li></ul>', 400],
    ];

    protected function _jsonSuccessResponse($response) {
        $response = array(
            'error' => 0,
            'data' => $response
        );
        $data = json_encode($response, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        $mainLogData = array(
            'jsonResult'  => $data,
            'version'     => Service\Utils::getApiVersionByRequest($this->_request),
            'action'      => $this->_request->get('action'),
            'jsonRequest' => json_encode($this->_request->all(), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
            'system'      => env('HTTP_SYSTEM', ''),
        );
        if (!empty($this->logData)) {
            $mainLogData = array_merge($mainLogData, $this->logData);
        }
        return response()->json($response, 200, ['Content-Type' => 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
    }

    protected function _jsonResponse(array $data) {
        return response()->json($data, 200, ['Content-Type' => 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
    }

    protected function _jsonErrorResponse($code, $debugMessage = null, bool $isReturnError = false) {
        if (isset($this->_errorsMap[$code])) {
            $message = (string)$this->_errorsMap[$code][0];
            if (isset($this->_errorsMap[$code][1])) {
                $httpcode = (int)$this->_errorsMap[$code][1];
            } else {
                $httpcode = 400;
            }
        } else {
            $message = 'Произошла непредвиденная ошибка';
            $httpcode = 500;
        }

        $mainLogData = array(
            'errorMessage' => $message,
            'errorText' => $debugMessage,
            'errorCode' => $code,
            'version' => Service\Utils::getApiVersionByRequest($this->_request),
            'action' => $_REQUEST['action'] ?? '',
            'jsonRequest' => json_encode($this->_request->all(), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
            'system' => $_SERVER['HTTP_SYSTEM'] ?? '',
            'token' => $_SERVER['HTTP_SYSTEM_TOKEN'] ?? '',
            'sess-id' => $this->_session->getId(),
        );

        if (!empty($this->logData)) {
            $mainLogData = array_merge($mainLogData, $this->logData);
        }
        $this->_logger->error($message, $mainLogData);

        if (!$isReturnError) {
            return response()->json([
                'error' => 1,
                'errorMessage' => $message,
                'code' => $code,
            ], 200, ['Content-Type' => 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES)->setStatusCode($httpcode);
        } else {
            return [
                'error'        => 1,
                'errorMessage' => $message,
                'code'         => $code,
            ];
        }
    }

    protected function _requestParam($key) {
        return $this->_request->get($key) ?: $this->_request->post($key);
    }
}
