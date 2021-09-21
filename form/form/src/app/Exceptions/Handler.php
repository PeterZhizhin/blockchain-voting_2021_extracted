<?php

namespace App\Exceptions;

use App\Exceptions\Interfaces\HumanReadable;
use App\Service\Utils;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Laravel\Lumen\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Exception\MethodNotAllowedException;
use Throwable;

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
        \App\Component\Validation\Exception\ValidationException::class,
        HumanReadable::class,
        RedirectRequired::class,
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
        if ($this->shouldntReport($exception)) {
            return;
        }
        $request = app('request');
        $logger = app('log');
        $message = $exception->getMessage() ?: get_class($exception);
        $logger->emergency(
            $message,
            [
                'error' => $exception instanceof Base ? $exception->name() : get_class($exception),
                'exception_class' => get_class($exception),
                'trace' => Utils::cutTrace($exception),
                'request_uri' => $request->getRequestUri()
            ]
        );
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response|\Illuminate\View\View|\Laravel\Lumen\Application
     *
     * @throws \Throwable
     */
    public function render($request, Throwable $exception)
    {
        if ($exception instanceof NotFoundHttpException
            || $exception instanceof MethodNotAllowedException
            || $exception instanceof MethodNotAllowedHttpException) {
            if ($this->endsWith($request->getRequestUri(), '.map')) {
                return response('');
            }
            app()['log']->info("Not found route by uri {$request->getRequestUri()}", ['error' => 'not_found']);
            return redirect(route('not_found'));
        }

        if ($exception instanceof RedirectRequired) {
            return redirect($exception->location());
        }

        if ($request->expectsJson()) {
            return parent::render($request, $exception);
        }

        $statusCode = $this->_getStatusCode($exception);

        return response()->make(
            view('base.innerMos', [
                'content' => view( $this->_getErrorTemplate($exception), [
                    'base_template_path' =>  resource_path() . '/views/base',
                    'error_message' => $this->_getErrorMessage($exception),
                    'error_code' => $this->_getStatusCode($exception),
                    'error_title' => $this->_getErrorTitle($exception),
                ]),
            ]),
            $statusCode >= 100 ? $statusCode : 500
        );
    }

    private function _getStatusCode(\Throwable $exception): ?int
    {
        return method_exists($exception, 'getStatusCode') ? $exception->getStatusCode() : null;
    }

    private function _getErrorTemplate(\Throwable $exception): string {
        $basePath = resource_path() . '/views/base/';
        $statusCode = $this->_getStatusCode($exception);
        $templatePath = $basePath . $statusCode . '.tpl';
        if (file_exists($templatePath)) {
            return 'base.' . $statusCode;
        }
        return 'base.error_exception';
    }

    private function _getErrorMessage(\Throwable $exception): string
    {
        if ($exception instanceof HumanReadable && $message = $exception->getUserMessage()) {
            return $message;
        }
        $error = class_basename($exception);
        $messageKey = 'exception_messages.' . $error;
        $message = trans($messageKey);
        if ($message !== $messageKey) {
            return $message;
        }
        if (env('DEBUG_ERRORS', false) && $message = $exception->getMessage()) {
            return $message;
        }
        return '';
    }

    private function _getErrorTitle(\Throwable $exception): string
    {
        if ($exception instanceof HumanReadable && $title = $exception->getTitle()) {
            return $title;
        }
        $error = class_basename($exception);
        $titleKey = 'exception_titles.' . $error;
        $title = trans($titleKey);
        if ($title !== $titleKey) {
            return $title;
        }
        if (env('DEBUG_ERRORS', false)) {
            return get_class($exception);
        }
        return trans('exception_titles.default');
    }

    function endsWith( $haystack, $needle ) {
        $length = strlen( $needle );
        if( !$length ) {
            return true;
        }
        return substr( $haystack, -$length ) === $needle;
    }

}
