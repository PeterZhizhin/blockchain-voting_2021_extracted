<?php
/**
 * Created by PhpStorm.
 * User: serqol
 * Date: 13.06.20
 * Time: 17:52
 */

namespace App\Providers;

use Illuminate\Support\Arr;
use App\Service;
use SwooleTW\Http\LumenServiceProvider;
use SwooleTW\Http\Server\Manager;

class SwooleConnectionPoolProvider extends LumenServiceProvider {

    protected function registerManager() {
        // TODO: This call is magical. It prevents artisan from crashing upon executing start server command.
        $this->app->make('session')->driver();
        $this->app->singleton(Manager::class, function ($app) {
            return new Service\Lumen\SwooleManager($app, 'lumen');
        });
        $this->app->alias(Manager::class, 'swoole.manager');

        $this->app->singleton('redis', function ($app) {
            $config = $app->make('config')->get('database.redis', []);
            return new Service\Lumen\RedisManager($app, Arr::pull($config, 'client', 'phpredis'), $config);
        });
        /*
        $this->app->singleton('cache', function ($app) {
            return new Service\Lumen\CacheManager($app);
        });
         */
    }
}
