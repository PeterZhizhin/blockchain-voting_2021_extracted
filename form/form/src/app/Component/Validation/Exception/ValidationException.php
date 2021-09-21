<?php

namespace App\Component\Validation\Exception;

use Illuminate\Http\JsonResponse;
use App\Exceptions;

class ValidationException extends Exceptions\Base {
    public function render($request)
    {
        if (!$request->expectsJson()) {
            return parent::render($request, $this);
        }

        return new JsonResponse([
            'error' => class_basename($this),
        ], 422);
    }
}