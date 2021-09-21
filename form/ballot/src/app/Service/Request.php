<?php

namespace App\Service;

class Request {

    private Curl $_curl;

    private $_url;
    private $_postData;
    private $_getParams;
    private $_method;
    private $_headers;
    private $_cookies;
    private $_timeoutMs;

    public function __construct() {
        $this->_curl = Locator::get(Curl::class);
    }

    public static function post(string $url) {
        $request = self::_instance($url);
        $request->withMethod('POST');
        return $request;
    }

    public static function get(string $url) {
        $request = self::_instance($url);
        $request->withMethod('GET');
        return $request;
    }

    public function withPostData(?string $postData) {
        $this->_postData = $postData;
        return $this;
    }

    public function withGetData(array $getData) {
        $this->_getParams = $getData;
        return $this;
    }

    public function withHeaders(array $headers) {
        $this->_headers = $headers;
        return $this;
    }

    public function withCookies(array $cookies) {
        $this->_cookies = $cookies;
        return $this;
    }

    public function withUrl(string $url) {
        $this->_url = $url;
        return $this;
    }

    public function withTimeoutMs($timeoutMs) {
        $this->_timeoutMs = $timeoutMs;
        return $this;
    }

    public function withMethod(string $method) {
        $this->_method = $method;
        return $this;
    }

    public function exec() {
        $curlHandler = $this->_curl->getHandler(
            $this->_url,
            $this->_postData,
            $this->_getParams ?: [],
            $this->_method,
            $this->_headers ?: [],
            $this->_cookies ?: []
        );
        $timeoutMs = $this->_timeoutMs ?: env('CURL_GLOBAL_TIMEOUT_MS', 5000);
        curl_setopt($curlHandler, CURLOPT_TIMEOUT_MS, $timeoutMs);
        curl_setopt($curlHandler, CURLOPT_CONNECTTIMEOUT_MS, $timeoutMs);
        $result = curl_exec($curlHandler);
        $error = curl_error($curlHandler);
        if ($error) {
            throw new \Exception($error);
        }
        curl_close($curlHandler);
        return $result;
    }

    private static function _instance(string $url): self {
        $request = new self;
        $request->withUrl($url);
        return $request;
    }
}