<?php

namespace App\Service\Lumen;

class CacheManager extends \Illuminate\Cache\CacheManager {

    public function createRedisDriver(array $config) {
        $redis = $this->app['redis'];
        $connection = $config['connection'] ?? 'default';
        return $this->repository(new RedisStore($redis, $this->getPrefix($config), $connection));
    }
}
