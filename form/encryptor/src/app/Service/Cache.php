<?php


namespace App\Service;

use Illuminate\Contracts\Cache\Repository;

class Cache {

    /**
     * @param     $key
     * @param     $value
     * @param int $timeout
     *
     * @return mixed
     */
    public static function set($key, $value, $timeout = 3600)
    {
        return self::_cache()->set($key, $value, 'EX', $timeout);
    }

    public static function setArray($key, array $value, $timeout = 3600)
    {
        return self::set($key, json_encode($value), $timeout);
    }

    public static function getArray($key) {
        return json_decode(self::get($key), true);
    }

    /**
     * @param     $key
     * @param     $value
     * @param int $timeout
     *
     * @return mixed
     */
    public static function add($key, $value, $timeout = 3600)
    {
        return self::_cache()->add($key, $value, 'EX', $timeout);
    }

    /**
     * @param $key
     *
     * @return bool|mixed|null
     */
    public static function get($key)
    {
        return self::_cache()->get($key);
    }

    public static function ttl($key) {
        return self::_cache()->ttl($key);
    }

    /**
     * @param $key
     *
     * @return bool
     */
    public static function delete($key)
    {
        self::_cache()->del($key);
    }

    private static function _cache() {
        return app()->get('redis');
    }
}
