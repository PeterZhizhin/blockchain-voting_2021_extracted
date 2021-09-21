<?php

namespace App\Exceptions;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Laravel\Lumen\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;
use App\Service\Utils;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        AuthorizationException::class,
        HttpException::class,
        ModelNotFoundException::class,
        ValidationException::class,
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Throwable  $exception
     * @return void
     *
     * @throws \Exception
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse
     *
     * @throws \Throwable
     */
    public function render($request, Throwable $exception)
    {
        if ($exception instanceof NotFoundHttpException || $exception instanceof MethodNotAllowedHttpException) {
            app()['log']->info("Not found route by uri {$request->getRequestUri()}", ['type' => 'not_found']);
            $message = "Данной страницы не существует";
            return $request->expectsJson() ? response($message, 404) : $this->_renderError($message, 404);
        } else {
            app()['log']->emergency($exception->getMessage(), ['exception_class' => get_class($exception), 'trace' => Utils::cutTrace($exception), 'request_uri' => $request->getRequestUri()]);
        }

        if (!$request->expectsJson()) {
            return $this->_renderError('Возникла ошибка на сервере', 500);
        }

        return parent::render($request, $exception);
    }

    /**
     * @return \Illuminate\Http\Response
     */
    private function _renderError($message, $code): \Illuminate\Http\Response
    {
        return response()->make(
            view('base.innerMos', [
                'content' => view( 'base.500', [
                    'base_template_path' =>  resource_path() . '/views/base',
                    'template_path' =>  resource_path() . '/views/election',
                    'error_message' => $message,
                    'error_code' => $code,
                ]),
            ]),
            500
        );
    }
}
