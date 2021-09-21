<?php
namespace App\Http\Controllers;

use App\Service;
use Illuminate\Http;
use Illuminate\View;
use Laravel\Lumen\Application;
use Laravel\Lumen\Routing\Controller as BaseController;
use Psr\Log\LoggerInterface;

class Controller extends BaseController
{

    const FORCE_PARAM_NAME = 'force';
    const FORCE_HEADER_NAME = 'x-force';
    const SYSTEM_PARAM_NAME = 'system';
    const SYSTEM_HEADER_NAME = 'x-system';
    const TOKEN_PARAM_NAME = 'token';
    const TOKEN_HEADER_NAME = 'x-token';

    /** @var View\Factory */
    protected $_view;
    protected array $_javascriptData = [];
    protected array $_templateVars = [];
    protected LoggerInterface $_logger;

    /** @var Http\Request */
    protected $_request;

    /** @var Http\Response */
    protected $_response;

    /** @var Application */
    protected $_app;

    /** @var Service\User */
    protected $_userService;
    protected $_electionId = 0;

    public function __construct(Http\Request $request, Http\Response $response) {
        $this->_app = app();
        $this->_userService = $this->_app['user'];
        $this->_view = $this->_app['view'];
        $this->_logger = $this->_app['log'];
        $this->_request = $request;
        $this->_electionId = $this->_param('electionId',0);
        $this->_response = $response;
        $templateVars = $this->_templateVars();
        $this->_addTemplateVars($templateVars);
    }

    public function test() {
        $this->_logger->info('Test OK!');
        return 'Test OK!';
    }

    public function denied(string $message = '') {
        
       if (Service\Utils::isHasBasicAccess($this->_request)) {
           return redirect(route('landing'));
       }

        $content = view('base.disabled',['errorMessage' => $message, 'show_error' => 1, 'base_template_path' => resource_path() . '/views/base']);
        return view('base.innerMos', ['content' => $content]);
    }

    public function limit() {
        $content = view('base.error_exception', ['error_message' => env('REVOTE_LIMIT_MESSAGE', 'Вы достигли лимита переголосований')]);
        return view('base.innerMos', ['content' => $content]);
    }

    public function finished()
    {
        $content = view('base.error_exception', [
            'error_message' => env('VOTING_FINISHED', '<h3>Голосование завершено</h3><br>')
        ]);
        return view('base.innerMos', ['content' => $content]);
    }


    public function notFound()
    {
        $content = view('base.404');
        return view('base.innerMos', ['content' => $content, 'base_template_path' => resource_path() . '/views/base']);
    }

    final protected function _renderView(string $view, array $params = [])
    {
        $this->_addTemplateVar('js_data', json_encode($this->_javascriptData,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE));
        $this->_shareTemplateVars();
        //$content = view('base.header') . view($view, $params) . view('base.footer');
        return view('base.innerMos', ['content' => view($view, $params)]);
    }

    final protected function _jsonSuccessResponse(array $data)
    {
        return $this->_jsonResponse($data, 200);
    }

    final protected function _jsonResponse(array $data, int $code = 200) {
        return response()->json($data, $code, ['Content-Type' => 'application/json; charset=utf-8'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }

    public function getJavascriptData(?string $key = null)
    {
        return $key ? ($this->_javascriptData[$key] ?? null) : $this->_javascriptData;
    }

    public function getTemplateData(?string $key = null)
    {
        return $key ? ($this->_templateVars[$key] ?? null) : $this->_templateVars;
    }

    protected function _shareTemplateVars(): void {
        foreach ($this->_templateVars as $key => $value) {
            $this->_shareTemplateVar($key, $value);
        }
    }

    protected function _shareTemplateVar($key, $value): void {
        $this->_view->share($key, $value);
    }

    protected function _addTemplateVars(array $vars): void {
        foreach ($vars as $key => $value) {
            $this->_addTemplateVar($key, $value);
        }
    }

    protected function _addTemplateVar($key, $value): void {
        $this->_templateVars[$key] = $value;
    }

    protected function _addJsVar($key, $value): void
    {
        $this->_javascriptData[$key] = $value;
    }
    //тут описываем самые базовые переменные шаблонов
    protected function _templateVars(): array
    {
        $CFG_MAIN_HOST = env('APP_URL','localhost');
        $CFG_JS_HOST = env('APP_STATIC_URL', $CFG_MAIN_HOST);
        return [
            'base_template_path'    => $this->_getBaseTemplatePath(),
            'CFG_MAIN_HOST'         => $CFG_MAIN_HOST,
            'CFG_JS_HOST'           => $CFG_JS_HOST,
            'CFG_CSS_HOST'          => env('APP_CSS_URL', $CFG_JS_HOST),
            'CFG_MEDIA_HOST'        => env('APP_MEDIA_URL', $CFG_JS_HOST),
            'application_view_path' => resource_path() . '/views/application',
            'logout'                => route('logout'),
            'url_404'               => route('landing'),
        ];
    }


    protected function _param($key, $default = null)
    {
        return $this->_request->get($key, $default) ?: $this->_request->post($key, $default);
    }

    private function _getBaseTemplatePath(): string
    {
        return resource_path() . '/views/base';
    }

    public function isForce($request): bool
    {
        $isForce = !empty($request->header(self::FORCE_HEADER_NAME));
        if (!$isForce&&$this->_param(self::FORCE_PARAM_NAME)) {
            $isForce = true;
        }
        return $isForce;
    }

    public function getSystem($request): string
    {
        return !empty($request->header(self::SYSTEM_HEADER_NAME)) ? $request->header(self::SYSTEM_HEADER_NAME) : $this->_param(self::SYSTEM_PARAM_NAME);
    }

    public function getToken($request): string
    {
        return !empty($request->header(self::TOKEN_HEADER_NAME)) ? $request->header(self::TOKEN_HEADER_NAME) : $this->_param(self::TOKEN_PARAM_NAME);
    }

    

    protected static $_singletonInstance;

    public function getMe()
    {
        $class = get_called_class();
        if (empty(self::$_singletonInstance[$class])) {


            self::$_singletonInstance[$class] = new $class();
        }
        return self::$_singletonInstance[$class];
    }

    protected $_estimateTime;

    public function startTimer(): bool
    {
        $this->_estimateTime = microtime(true);
        return true;
    }

    public function stopTimer(): float
    {
        return round(microtime(true) - $this->_estimateTime, 4);
    }
}
