<?php

namespace App\Http\Controllers;

class AjaxController extends Controller {

    public function handle() {
        return ['status' => 'ok'];
    }
}
