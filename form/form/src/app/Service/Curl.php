<?php
/** @author Alexey Loginov <a.loginov@inform-tb.ru> */

namespace App\Service;

class Curl {

    public function request(string $url, ?string $postData, array $getParams, string $method, array $headers = [], array $cookies = []) {
        $curlHandler = $this->getHandler($url, $postData, $getParams, $method, $headers, $cookies);
        $result = curl_exec($curlHandler);
        curl_close($curlHandler);
        return $result;
    }

    public function getHandler(string $url, ?string $postData, array $getParams, string $method, array $headers = [], array $cookies = []) {
        if (count($getParams) > 0) {
            $url = "{$url}?" . http_build_query($getParams);
        }
        $curlHandler = curl_init($url);
        $this->_setDefaultCurlOptions($curlHandler, $headers, $cookies);
        curl_setopt($curlHandler, CURLOPT_CUSTOMREQUEST, strtoupper($method));
        if ($postData !== null) {
            curl_setopt($curlHandler, CURLOPT_POSTFIELDS, $postData);
        }
        return $curlHandler;
    }

    public function post(string $url, string $postData, array $queryParams, array $headers = [], array $cookies = []) {
        return $this->request($url, $postData, $queryParams, 'POST', $headers, $cookies);
    }

    public function get(string $url, array $queryParams = [], array $headers = [], array $cookies = []) {
        return $this->request($url, null, $queryParams, 'GET', $headers, $cookies);
    }

    private function _setDefaultCurlOptions($curlHandler, array $headers, array $cookies) {
        curl_setopt($curlHandler, CURLOPT_HTTPHEADER, $this->_prepareHeaders($headers));
        curl_setopt($curlHandler, CURLOPT_RETURNTRANSFER, true);
        if (count($cookies) > 0) {
            curl_setopt($curlHandler, CURLOPT_COOKIE, $this->_prepareCookies($cookies));
        }
    }

    private function _prepareHeaders(array $headers): array {
        return $this->_convertFromAssocToListByGlue($headers, ': ');
    }

    private function _prepareCookies(array $cookies): string {
        return implode(';',$this->_convertFromAssocToListByGlue($cookies, '='));
    }

    private function _convertFromAssocToListByGlue(array $data, $glue) {
        $result = [];
        foreach ($data as $key => $value) {
            $result[] = "{$key}{$glue}{$value}";
        }
        return $result;
    }
}