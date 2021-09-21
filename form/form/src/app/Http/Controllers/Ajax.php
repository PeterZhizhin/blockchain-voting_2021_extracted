<?php

namespace App\Http\Controllers;

use App\Jobs;

class Ajax extends Controller {

    public function refreshCache() {
        app()['log']->info('Refresh settings webhook received', ['action' => 'settings_webhook']);
        dispatch(new Jobs\RefreshSettings());
        return $this->_jsonSuccessResponse(['status' => 'OK']);
    }
}