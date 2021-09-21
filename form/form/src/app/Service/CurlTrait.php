<?php

namespace App\Service;
use App\Service\Config\PoolConfig;
trait CurlTrait
{
    /** @var bool Принудительное выключение блокировки */
    private $enabled         = true;



    /** @var int Время выполения ответа */
    private $execTimeout     = 5;

    /** @var int Время ожидания ответа */
    private $connectTimeout  = 5;

    /** @var int Кол-во попыток обращений к СУДИР */
    private $connectFailCount= 3;

    /** @var int Кол-во неуспешных ответов */
    private $connectCount    = 2;

    /** @var int Время в рамках, которого считаются кол-во неуспешных ответов */
    private $connectCTimeout = 20;

    /** @var string Ключ для хранения признака отключения СУДИР*/
    private static $cacheKey = 'disabled_sudir_oauth';

    /** @var int Время на которое отключаются запросы в СУДИР */
    private $cacheTimeout    = 10;

    /** @var int Кол-во попыток для ожидания освобождения ключа */
    private $cacheCount      = 3;

    /** @var int Время ожидания освобождения ключа */
    private $cacheSleep      = 1;

    /**
     * Инициализация статик данных из конфига
     * @return void
     */
    private static function initCurlStaticCfg()
    {

        self::$cacheKey = PoolConfig::me()->get('Sudir')->get('fail/cache/key','sudir|fail');
    }
    /**
     * Инициализация данных из конфига
     * @return void
     */
    private  function initCurlCfg()
    {
		self::initCurlStaticCfg();
        $this->_config = PoolConfig::me()->get('Sudir');
        $this->enabled         = $this->_config->get('fail/enabled',             $this->enabled);
        $this->execTimeout     = $this->_config->get('timeout',             200);
        $this->connectTimeout  = $this->_config->get('timeout',             200);
        $this->connectFailCount= $this->_config->get('fail/connection/failCount',      $this->connectFailCount);
        $this->connectCount    = $this->_config->get('fail/connection/count',          $this->connectCount);
        $this->connectCTimeout = $this->_config->get('fail/connection/count_timeout',  $this->connectCTimeout);
        $this->cacheTimeout    = $this->_config->get('fail/cache/timeout',             $this->cacheTimeout);
        $this->cacheCount      = $this->_config->get('fail/cache/count',               $this->cacheCount);
        $this->cacheSleep      = $this->_config->get('fail/cache/sleep',               $this->cacheSleep);
    }

    /**
     * Получить данные из сервиса СУДИР
     * @return array
     */
    private function curl($url, $postData=array(),$headers=array(),$cookies=array())
    {
        return $this->sendCurlRequest($url, $postData,$headers,$cookies);
    }

    /**
     * Отправить curl запрос
     * @return array|false
     */
    private function sendCurlRequest($url, $postData=array(),$headers=array(),$cookie=array())
    {
        $returnValue = array();


        $curlHandler = curl_init();

        self::log('NETWORK', 'Отправка запроса в сервис', $url);

        curl_setopt($curlHandler, CURLOPT_URL,            $url);
        curl_setopt($curlHandler, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curlHandler, CURLOPT_CONNECTTIMEOUT_MS, $this->connectTimeout);
        curl_setopt($curlHandler, CURLOPT_TIMEOUT_MS,        $this->execTimeout);
        curl_setopt($curlHandler, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curlHandler, CURLOPT_FOLLOWLOCATION, true);

        if (!empty($postData)) {
            curl_setopt($curlHandler, CURLOPT_POST,       true);
            curl_setopt($curlHandler, CURLOPT_POSTFIELDS, http_build_query($postData));
        }
        if (!empty($headers)) {
            curl_setopt($curlHandler, CURLOPT_HTTPHEADER, $headers);
        }
        if (!empty($cookie)) {
            curl_setopt($curlHandler, CURLOPT_COOKIE, implode(';',$cookie));
        }

        $durationCounter = DurationCounter::start();
        $returnResult = curl_exec($curlHandler);
        $resultError = curl_error($curlHandler);
        $logInfo = [
            'code' => curl_getinfo($curlHandler, CURLINFO_HTTP_CODE),
            'duration_ms' => $durationCounter->finish(),
            'response'  => $returnResult,
            'action' => 'sudir_request_user',
        ];
        if ($resultError) {
            $logInfo['error_message'] = $resultError;
            $logInfo['error'] = 'sudir_network_error';
        }

        self::log('NETWORK', 'Sudir user data request', $logInfo);

        if ($returnResult || empty($resultError)) {

            $returnValue = json_decode($returnResult, true);
            if (empty($returnValue)) {
                $returnValue = $returnResult;
            }
        } else {

            $error = array(
                'URL запроса'               => $url,
                'Ответ запроса'             => $returnValue,
                'Ошибка выполнения запроса' => $resultError,
                'Данные запроса'            => $postData,
                'curl -I'                   => shell_exec('curl -I '. $url),
            );

            if ($this->enabled) {
                self::log('NETWORK', 'Trace', $error);
            } else {
                self::log('CURL-ERROR', 'Trace', $error);
            }
        }

        curl_close($curlHandler);
        return $returnValue;
    }

    public function checkSudirEnabled()
    {
        $returnValue = ($this->enabled) ? Cache::get(self::$cacheKey) : false;

        self::log('NETWORK', 'Проверка блокирования запроса в сервис: ', $returnValue);

        return empty($returnValue);
    }
	public static function checkStaticSudirEnabled()
    {
		self::initCurlStaticCfg();
        $returnValue = Cache::get(self::$cacheKey);
        return empty($returnValue);
    }

    /**
     * Проверка кол-ва ошибочных запросов
     * @return boolean
     */
    private function checkCount()
    {
        $lock_key   = self::$cacheKey .'_lock';
        $time_key   = self::$cacheKey .'_time';
        $sleepCount = 0;
        $returnValue= false;

        $result = Cache::add($lock_key, 1);

        while (!$result && $sleepCount < $this->cacheCount) {

            sleep($this->cacheSleep);
            $result = Cache::add($lock_key, 1);
            $sleepCount++;
        }

        if ($result) {

            $times = Cache::get($time_key);
            $ctime = time();
            $res   = array($ctime);

            if ($times) {

                $times = explode(';', $times);

                foreach ($times as $time) {

                    $ntime = $time + $this->connectCTimeout;
                    
                    if ($ntime > $ctime) {
                        $res[] = $time;
                    }
                }
            }

            $cnt = count($res);
            self::log('NETWORK', 'Кол-во неуспешных попыток: ', $cnt);
            $returnValue = ($cnt > $this->connectCount);
            $result      = implode(';', $res);

            if (!$returnValue) {
                Cache::set($time_key, $result, $this->connectCTimeout);
            } else {
                Cache::delete($time_key);
            }
            Cache::delete($lock_key);
        }

        return $returnValue;
    }

}
