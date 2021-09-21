<?php
/**
 * Created by PhpStorm.
 * User: serqol
 * Date: 13.06.20
 * Time: 17:52
 */

namespace App\Providers;

use App\Service;
use SwooleTW\Http\LumenServiceProvider;
use SwooleTW\Http\Server\Manager;

class SwooleConnectionPoolProvider extends LumenServiceProvider {

    protected function registerManager() {
        $this->app->singleton(Manager::class, function ($app) {
            return new Service\Lumen\SwooleManager($app, 'lumen');
        });
        $this->app->alias(Manager::class, 'swoole.manager');
    }
}
