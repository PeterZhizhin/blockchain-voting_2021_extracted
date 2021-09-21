<?php

foreach (['get', 'post'] as $method) {
    $router->group(['middleware' => ['system_auth:get_gid']], function () use ($router, $method) {
        $router->$method(env('ROUTE_RECEIVE', '/gid/{votingId}/{ssoIdHmac}'), 'Election@receiveGid');
    });
    $router->group(['middleware' => ['system_auth:refresh_cache']], function () use ($router, $method) {
        $router->$method('/webhook/refresh-cache', 'Election@refreshCache');
    });
}