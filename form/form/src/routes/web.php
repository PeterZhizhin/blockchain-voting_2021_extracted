<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$showBallotMiddleware = \App\Service\Utils::getThrottleMiddleware();

// $router->get('/landing-no-ba', ['uses' => 'Landing@show', 'as' => 'landing']);

$router->group(['middleware' => 'system_auth'], function () use ($router) {
    foreach (['post', 'get'] as $method) {
        $router->$method('/webhook/refresh-cache',  'Ajax@refreshCache');
    }
});

$router->group(['middleware' => ['auth', 'token_auth']], function () use ($router, $showBallotMiddleware) {
    $router->group(['prefix' => '/election', 'middleware' => $showBallotMiddleware], function () use ($router, $showBallotMiddleware) {
        $router->get('/', ['uses' => 'Election@show', 'as' => 'election']);
    });
    $router->post('/election', 'Election@sign');
    $router->post('/election/check', 'Election@check');
    $router->get('/check', 'Election@checkBallot');
    $router->post('/ws/ajax/confirm/{type}',     'ConfirmInputController@handle');
    $router->post('/ws/ajax',                    'AjaxController@handle');
});

$router->group(['middleware' => ['token_auth']], function () use ($router) {
    $router->get(env('ROUTE_LANDING', '/landing'), ['uses' => 'Landing@show', 'as' => 'landing']);
});

$router->group(['prefix' => '/api', 'middleware' => ['auth']], function() use ($router) {
    $router->post('/confirm/{type}', 'ConfirmInputController@handle');
    $router->group(['prefix' => '/election'], function () use ($router) {
        $router->get('/list', 'Election@list');
        $router->get('/guid', 'Election@getEncryptedGuid');
    });
});

$router->get('/denied', ['uses' => 'Controller@denied', 'as' => 'denied']);
$router->get('/limit',  ['uses' => 'Controller@limit',  'as' => 'limit']);
$router->get('/finished', ['uses' => 'Controller@finished', 'as' => 'finished']);

$router->group(['middleware' => 'token_auth'], function () use ($router) {
    $router->get('/legal-denied', ['uses' => 'Election@denyLegal', 'as'   => 'deny_legal']);
    $router->get(env('ROUTE_NOT_FOUND', '/notfound'), ['uses' => 'Controller@notFound', 'as' => 'not_found']);
    $router->get(env('ROUTE_LOGOUT', '/logout'), ['uses' => 'OAuthController@logout','as' => 'logout']);
    $router->get('/change-confirm', 'Election@changeConfirm');
    $router->get('/test', 'Controller@test');
});
