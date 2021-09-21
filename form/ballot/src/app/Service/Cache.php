<?php


namespace App\Service;

use Illuminate\Support\Facades\Cache as CacheFacade;

class Cache {

    static function exists($key) {
        return CacheFacade::has($key);
    }

    static function set($key, $value, $timeout = 3600) {
        if (is_array($value)) {
            $value = json_encode($value);
        }
        CacheFacade::set($key, $value, $timeout);
    }

    public static function setArrayForever($key, array $value) {
        return self::forever($key, json_encode($value));
    }

    public static function forever($key, $value) {
        return CacheFacade::forever($key, $value);
    }

    static function add($key, $value, $timeout = 3600) {
        if (self::exists($key)) {
            return false;
        }
        if (is_array($value)) {
            $value = json_encode($value);
        }
        CacheFacade::set($key, $value, $timeout);
    }

    public static function ttl($key) {
        // stay classy, lara :(
        $redis = app()->get('redis');
        $prefix = config('cache')['prefix'];
        $key = "{$prefix}:" . $key;
        $ttl = $redis->ttl($key);
        return $ttl;
    }

    static function get($key) {
        $valueFromRedis = CacheFacade::get($key);
        $result = json_decode($valueFromRedis, true);
        return !empty($result) ? $result : $valueFromRedis;
    }

    static function delete($key) {
        CacheFacade::delete($key);
    }
}
