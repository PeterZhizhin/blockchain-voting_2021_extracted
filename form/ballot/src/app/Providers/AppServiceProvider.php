<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{

    public function boot() {
        app()['url']->forceRootUrl(env('APP_URL'));
        app()['url']->forceScheme(env('APP_HTTP_PROTOCOL'));
        $view = app()['view'];
        $view->share('CFG_MEDIA_HOST', null);
        $view->share('CFG_CSS_HOST', null);
        $view->share('CFG_MAIN_HOST', null);
        $view->share('CFG_JS_HOST', null);
        $view->share('test', null);
        $view->share('title', null);
        $view->share('tx', null);
        $view->share('isShowTxResult', null);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
    }
}
