<?php

$router->group(['middleware' => 'system_auth', 'prefix' => '/api/encryption'], function () use ($router) {
    foreach (['get', 'post'] as $method) {
        $router->$method('/crypt',       'Election@crypt');
        $router->$method('/decrypt',     'Election@decrypt');
        $router->$method('/decryptPack', 'Election@decryptPack');
    }
});
