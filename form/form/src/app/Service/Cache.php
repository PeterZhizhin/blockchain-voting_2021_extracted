<?php


namespace App\Service;

use Illuminate\Support\Facades\Cache as CacheFacade;

class Cache {

    public static function set($key, $value, $timeout = 3600) {
        return CacheFacade::set($key, $value, $timeout);
    }

    public static function forever($key, $value) {
        return CacheFacade::forever($key, $value);
    }

    public static function setArray($key, array $value, $timeout = 3600) {
        return self::set($key, json_encode($value), $timeout);
    }

    public static function setArrayForever($key, array $value) {
        return self::forever($key, json_encode($value));
    }

    public static function getArray($key) {
        return json_decode(self::get($key), true);
    }

    public static function add($key, $value, $timeout = 3600) {
        return CacheFacade::add($key, $value, $timeout);
    }

    public static function get($key) {
        return CacheFacade::get($key);
    }

    public static function ttl($key) {
        // stay classy, lara :(
        $redis = app()->get('redis');
        $prefix = config('cache')['prefix'];
        $key = "{$prefix}:" . $key;
        $ttl = $redis->ttl($key);
        return $ttl;
    }

    public static function delete($key) {
        CacheFacade::delete($key);
    }
}
