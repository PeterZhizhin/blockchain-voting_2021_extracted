<?php


namespace App\Http\Controllers;

use Illuminate;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Http;
use App\Service;

class Controller extends BaseController {

    /** @var Http\Request */
    protected $_request;

    protected array $_javascriptData = [];

    /** @var Illuminate\View\Factory */
    private $_view;

    /** @var  \Psr\Log\LoggerInterface */
    protected $_armMgikLogger;

    public function __construct() {
        $this->_view          = app()['view'];
        $this->_request       = app()->get('request');
        $this->_armMgikLogger = app()['log']->channel('arm');
    }

    protected function _jsonPermissionDeniedResponse(array $response) {
        return $this->_jsonResponse($response, 401);
    }

    protected function _addJsRoute(string $key, string $route) {
        $routesKey = 'routes';
        if (!array_key_exists($routesKey, $this->_javascriptData)) {
            $this->_javascriptData[$routesKey] = [];
        }
        $this->_javascriptData[$routesKey][$key] = $route;
    }

    protected function _addJsVar(string $key, $data) {

    }

    protected function _jsonStatusSuccessResponse(array $data = []) {
        return $this->_jsonStatusResponse('success', $data);
    }

    protected function _jsonStatusErrorResponse(array $data) {
        return $this->_jsonStatusResponse('error', $data);
    }

    protected function _jsonStatusResponse(string $status, array $data = []) {
        $data['status'] = $status;
        return $this->_jsonSuccessResponse($data);
    }

    protected function _jsonSuccessResponse(array $response) {
        return $this->_jsonResponse($response, 200);
    }

    private function _jsonResponse(array $data, $code) {
        return response()->json($data, $code, ['Content-Type' => 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
    }

    protected function _addTemplateVar($key, $value): void {
        $this->_view->share($key, $value);
    }

    protected function _param($key) {
        return $this->_request->get($key) ?: $this->_request->post($key);
    }
}
