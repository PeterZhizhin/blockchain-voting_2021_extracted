<?php

namespace App\Providers;

use App\Service;
use Illuminate\Support\ServiceProvider;
use App\Service\Logging\LoggerPool;
use App\Service\Config\PoolConfig;

class AppServiceProvider extends ServiceProvider
{
    public function boot() {
        
        $backURL = PoolConfig::me()->get('Sudir')->get('backurl');
        $parsedUrl = parse_url($backURL);
        app()['router']->get($parsedUrl['path'], 'App\Http\Controllers\OAuthController@handle');
        $view = app()['view'];
        $view->share('CFG_MEDIA_HOST', null);
        $view->share('CFG_CSS_HOST', null);
        $view->share('CFG_MAIN_HOST', null);
        $view->share('CFG_JS_HOST', null);
        $view->share('test', null);
        $view->share('title', null);
        $view->share('tx', null);
        $view->share('isShowTxResult', null);
        $view->share('error_code', null);
        $view->share('logout', null);
        $view->share('skip_try_again_later', null);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
//        require_once(resource_path() . '/include/params.php');
//        require_once(resource_path() . '/include/lib.php');
        $this->app->singleton(Service\Curl::class, function () {
            return new Service\Curl();
        });

        $this->app->singleton(Service\User::class, function ($app) {
            return new Service\User();
        });

        $this->app->alias(Service\User::class, 'user');
    }
}
