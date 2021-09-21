<?php

$router->group(['prefix' => '/ballot'], function () use ($router) {

    $router->group(['middleware' => ['system_auth:get_guid']], function () use ($router) {
        $router->post('/getGuid', 'Ballot@getGuid');
    });

    $router->group(['middleware' => 'token_auth'], function () use ($router) {
        $router->get('/test', 'Ballot@test');
        $router->get('/success', ['uses' => 'Ballot@success', 'as' => 'success']);
        $router->get('/error', ['uses' => 'Ballot@error', 'as' => 'error']);
    
        $router->get('/check/{electionHash}', 'Ballot@checkSign');
    
        $router->group(['prefix' => '/{guid}'], function () use ($router) {
            $router->get('',       ['uses' => 'Ballot@show', 'as' => 'ballot_show']);
            $router->post('/{voteId}',      ['uses' => 'Ballot@vote', 'as' => 'vote']);
            $router->post('/{voteId}/skip', ['uses' => 'Ballot@skip', 'as' => 'skip']);
            $router->post('/mark/{voteId}', ['uses' => 'Ballot@markOpened', 'as' => 'mark_opened']);
        });    
    });
});

$router->group(['middleware' => ['token_auth', 'system_auth:refresh_cache']], function () use ($router) {
    $router->get('/test/{voteId}/{districtId}', ['uses' => 'Ballot@showTest', 'as' => 'ballot_test_show']);
});

$router->group(['prefix' => 'api', 'middleware' => 'system_auth:api'], function() use ($router) {
    $router->post('/guid/decrypt', 'Ballot@decryptGuid');
    $router->post('/guid/vote',    'Ballot@voteApi');
});

$router->group(['middleware' => 'system_auth:refresh_cache', 'prefix' => '/webhook'], function () use ($router) {
    foreach (['post', 'get'] as $method) {
        $router->$method('/refresh-cache',            'Ajax@reset');
        $router->$method('/refresh-dictionary/{ref}', 'Ajax@lib'); 
    }
});

$router->group(['prefix' => '/api'], function () use ($router) {
    foreach (['post', 'get'] as $method) {
        
        $router->$method('/event/hit', 'Ajax@hit');

        $router->group(['middleware' => ['system_auth:encryption'], 'prefix' => '/encryption'], function () use ($router, $method) {
            $router->$method('/crypt',  'Ajax@crypt');
            $router->$method('/decrypt', 'Ajax@decrypt');
            $router->$method('/decryptPack', 'Ajax@decryptPack');
        });
    }
});