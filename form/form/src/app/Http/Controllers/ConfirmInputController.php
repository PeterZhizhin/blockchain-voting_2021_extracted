<?php
namespace App\Http\Controllers;

use App\Service;
use App\Jobs;
use Illuminate;

class ConfirmInputController extends Controller
{

    const DEFAUL_CONFIRM_ATTEMPTS_LIMIT = 10;

    protected $config = false;
    protected $errorMaps = [
        1 => 'Пользователь не передан',
        2 => 'Некорректная система',
        3 => 'Доступ запрещен для данной системы',
        4 => 'Метод не поддерживается',
        5 => 'Пользователь не найден',
        6 => 'Техническая ошибка в работе сервиса',
        7 => 'Не передано значение поля для валидации',
        8 => 'Некорректный код',
        9 => 'Код не найден, пройдите процесс подтверждения заново',
        10 => 'Некорректный код. Осталось попыток ввода: %d',
        11 => 'Время ожидания истекло, пройдите процесс подтверждения заново',
        12 => 'Действие не разрешено',
        13 => 'Не найден телефон или email пользователя',
        14 => 'Исчерпано количество попыток ввода или закончилось время ожидания. Запросите новый код подтверждения. Данный номер кода уже не действительный',
        15 => 'Некорректный код. Исчерпаны все новые коды. В подтверждении отказано.'
    ];

    const STATUS_NEW_CODE = 'new_code';
    const STATUS_ERROR_CODE = 'error_code';
    const STATUS_LIMIT = 'limit';
    const STATUS_OK = 'ok';
    const STATUS_WASTED_LIMIT = 'wasted';

    protected $keyPrefix = 'cfm|';
    protected $key;
    protected $type;
    protected $result = [];
    protected $user = [];
    protected $force = false; //флаг генерации нового значения несмотря ниначто
    protected $error = false;
    protected $logger;
    protected $confirmType;
    private $_armMgikLogger;
    private $_cache;
    protected $logArmId = 0;

    public function __construct(Illuminate\Http\Request $request, Illuminate\Http\Response $response, Service\User $userService, Service\Cache $service)
    {

        parent::__construct($request, $response);
        $this->user = $userService->getUserInLegacyFormat();
        $this->config = new Service\Config\FileConfig('ConfirmEmailAndSms');
        $this->logger = app()['log'];
        $this->_armMgikLogger = app()['log']->channel('arm');
        $this->_cache = $service;
        $this->confirmType = 'registration';
        $this->logArmId = env('CONFIRMATION_LOG', true);
        $this->result = [
            'error' => 0,
            'errorCode' => 0,
            'errorMessage' => '',
            'result' => [],
            'date' => date(\DateTime::W3C)
        ];
    }

    public function handle($type)
    {
        $action = $type;
        $this->force = self::isForce($this->_request);



        $_REQUEST['code'] = isset($_REQUEST['code']) ? trim($_REQUEST['code']) : '';
        $code = (int) $_REQUEST['code'];

        if ($action == 'phone') {
            $action = 'sms';
        }

        if (!in_array($action, ['sms', 'email'])) {
            return $this->returnError(4);
        }
        $this->type = $action;
           //неавторизованным у нас нельщя
        $sso = $this->user['SUDIR_ID'] ?? '';
        
        
        $value = $_REQUEST['value'] ?? null;
        $allow = $this->config->get("confirm/$action/allowFromClient", []);
     
        
        if (!empty($_REQUEST['code']) && (mb_strlen($_REQUEST['code']) != 5 || empty($code))) {
            return $this->returnError(8);
        }
        
        if (!($value && in_array($this->confirmType, $allow))) {
            if (empty($sso)) {
                return $this->returnError(5);
            }
            $value = null;
            if ($action === 'sms') {
                $value = !empty($this->user['TELEPHONE']) ? $this->user['TELEPHONE'] : null;
            } elseif ($action === 'email') {
                $value = !empty($this->user['EMAIL']) ? $this->user['EMAIL'] : null;
            }
        } else {
            if ($action === 'sms') {
                $value = preg_replace("/[^\d]/u", '', $value);
                $value = mb_substr($value, mb_strlen($value) - 10, 10);
            }
        }

        if (!$value) {
            return $this->returnError(13);
        }
        $this->setCacheKey($sso, $value, $this->confirmType);
        if ($code) {
            $updateValue = isset($_REQUEST['updateValue']) ? $_REQUEST['updateValue'] : true;
            $result = $this->checkCode($sso, $value, $code, $updateValue,$action);
            
        } else if (!empty($_REQUEST['updateConfirmed'])) {
            $result = $this->updateConfirmed($sso, $value, $action, $this->confirmType);
            if ($this->logArmId) {
                $this->_armMgikLogger->info('Сохранение после подтверждения', ['action' => "form_{$action}_update", 'value' => $value, 'method' => $action, 'ssoId' => $sso, 'voitingId' => $this->logArmId, 'sessId' => session_id()]);
                app()['log']->info('Сохранение после подтверждения', ['action' => "form_{$action}_update", 'value' => $value, 'method' => $action, 'ssoId' => $sso, 'voitingId' => $this->logArmId, 'sessId' => session_id()]);
            }
        } else {
            $result = $this->sendCode($sso, $value, $action);
            if (!$this->config->get('debug', false)) {
                unset($result['code']);
            }
            if ($this->logArmId) {
                $this->_armMgikLogger->info('Отправлен код', ['action' => "form_{$action}_send", 'value' => $value, 'method' => $action, 'ssoId' => $sso, 'voitingId' => $this->logArmId, 'sessId' => session_id()]);
            }
        }
        if ($result instanceof Illuminate\Http\JsonResponse){
            return $result;
        }
        
        return $this->returnSuccess($result);
    }

    protected function setCacheKey(string $userId, string $value, string $confirmType = ''): bool
    {
        $this->key = $this->keyPrefix . $this->type . '|' . $userId . '|' . $value . '|' . $confirmType;
        return true;
    }

    protected function getCacheKey(): string
    {
        return $this->key;
    }

    public function sendCode($userId, $value, $type)
    {

        $this->startTimer();
        $oldCode = $this->getCache();
        if (!empty($oldCode) && (!$this->force || ($this->force && ($oldCode['retreat'] - time()) > 0) )) {

            #нашли код в кеше, используем его, если время не вышло или телефон не
            if (time() <= $oldCode['time']) {
                $int = $oldCode['retreat'] - time();
                $oldCode['retreat'] = $int;
                $oldCode['lifeText'] = $this->getLifeText();
                $oldCode['life'] = $oldCode['time'] - time();
                return $oldCode;
            }
        }
        #новый код генерим
        $newNumber = !empty($oldCode['number']) ? ++$oldCode['number'] : 1;

        #мб уже нельзя новый код?
        if ($newNumber > $this->config->get("confirm/$type/forms/{$this->confirmType}/wastedLimit", $this->config->get('confirm/' . $type . '/wastedLimit', 10))) {
            $oldCode['status'] = self::STATUS_WASTED_LIMIT;
            $this->saveCache($oldCode);
            return $this->returnError(15, $oldCode);
        }
        #создаем новый код
        $code = $this->generateCode();
        $oldCode = [
            'value' => $value,
            'status' => self::STATUS_NEW_CODE,
            'time' => time() + $this->getLifeTime(),
            'retreat' => time() + $this->getReatreatTime(),
            'attempt' => 0,
            'updated' => false,
            'number' => $newNumber,
            'code' => $code,
        ];



        #отправим код
        switch ($type) {
            case 'sms':
                $smsTemplate = env('CONFIRM_TEXT_SMS', 'Для подтверждения номера введите код №%number: %code');
                $template = $this->config->get("confirm/$type/forms/{$this->confirmType}/template", $smsTemplate);
                $body = str_replace(['%number', '%code'], [$newNumber, $code], $template);
                dispatch(new Jobs\SendSms($value, $body, 'CONFIRM'));
                break;

            case 'email':
                $emailTemplate = env('CONFIRM_TEXT_EMAIL', 'Для подтверждения почтового адреса введите код №%number: %code');
                $template = $this->config->get("confirm/$type/forms/{$this->confirmType}/template", $emailTemplate);
                $body = str_replace(['%number', '%code'], [$newNumber, $code], $template);
                dispatch(new Jobs\SendEmail($value, $body));
                break;
        }
        $this->saveCache($oldCode);
        $oldCode['lifeText'] = $this->getLifeText();
        $oldCode['life'] = $oldCode['time'] - time();
        $oldCode['retreat'] = $oldCode['retreat'] - time();
        $this->logger->info('Сгенерили код', ['userId' => $userId, 'estimate' => $this->stopTimer(), 'code' => $code, 'type' => $type, 'number' => $newNumber, 'action' => "form_{$type}_send", 'value' => $value, 'confirmType' => $this->confirmType, 'key' => $this->getCacheKey()]);
        if (!$this->config->get('debug', false)) {
            unset($oldCode['code']);
        }
        return $oldCode;
    }

    protected $cached_life;

    public function getLifeTime(): int
    {
        if (empty($this->cached_life)) {
            $this->cached_life = (int) $this->config->get("confirm/{$this->type}/forms/{$this->confirmType}/life", $this->config->get("confirm/{$this->type}/life"));
        }
        return $this->cached_life;
    }

    protected $cached_lifeText;

    public function getLifeText(): string
    {
        if (empty($this->cached_lifeText)) {
            $this->cached_lifeText = $this->config->get("confirm/{$this->type}/forms/{$this->confirmType}/lifeText", $this->config->get("confirm/{$this->type}/lifeText"));
        }
        return $this->cached_lifeText;
    }

    protected $cached_retreat;

    public function getReatreatTime(): int
    {
        if (empty($this->cached_retreat)) {
            $this->cached_retreat = (int) $this->config->get("confirm/{$this->type}/forms/{$this->confirmType}/retreat", $this->config->get("confirm/{$this->type}/retreat", 60));
        }
        return $this->cached_retreat;
    }

    protected $cached_max_attempt;

    public function getMaxAttempt(): int
    {
        if (empty($this->cached_max_attempt)) {
            $this->cached_max_attempt = (int) $this->config->get("confirm/{$this->type}/forms/{$this->confirmType}/maxAttempt", $this->config->get("confirm/{$this->type}/limit", self::DEFAUL_CONFIRM_ATTEMPTS_LIMIT));
        }
        return $this->cached_max_attempt;
    }

    public function isConfirmed($userId, $value, string $type, string $confirmType = ''): bool
    {
        if (!empty($type)) {
            $this->setType($type);
        }
        if (!empty($confirmType)) {
            $this->setConfirmType($confirmType);
        }
        $this->setCacheKey($userId, $value, $confirmType);
        $cache = $this->getCache();

        return !empty($cache) && $cache['status'] == self::STATUS_OK;
    }

    public function setConfirmType(string $type)
    {
        $this->confirmType = $type;
    }

    public function setType(string $type)
    {
        $this->type = $type;
    }

    protected function saveCache(array $data):bool
    {
        return $this->_cache::setArray($this->getCacheKey(), $data, $this->getLifeTime());
    }

    protected function getCache()
    {
        return $this->_cache::getArray($this->getCacheKey());
    }

    public function checkCode(string $userId, string $value, int $code, bool $updateValue = false, string $action = null)
    {

        $oldCode = $this->getCache();
        if (!empty($oldCode)) {

            $oldCode['attempt']++;
            $limit = $this->getMaxAttempt();
            $left = $limit - $oldCode['attempt'];

            if ($left < 0) {
                if ($oldCode['status'] !== self::STATUS_LIMIT) {
                    $oldCode['status'] = self::STATUS_LIMIT;
                    $this->saveCache($oldCode);
                }
                if ($this->logArmId) {
                        $this->_armMgikLogger->info('Код не подтверждён, исчерпан лимит',['action'=>"form_{$action}_unsuccess_limit",'value'=>$value,'method'=>$this->type,'ssoId'=>$userId,'voitingId'=>$this->logArmId,'sessId'=>session_id()]);
                        app()['log']->info('Код не подтверждён, исчерпан лимит',['action'=>"form_{$action}_unsuccess_limit",'value'=>$value,'method'=>$this->type,'ssoId'=>$userId,'voitingId'=>$this->logArmId,'sessId'=>session_id()]);
                    }
                return $this->returnError(14);
            }

            if ($code !== $oldCode['code']) {

                $this->saveCache($oldCode);
                if ($this->logArmId) {
                    $this->_armMgikLogger->info('Код не подтверждён',['action'=>"form_{$action}_unsuccess",'value'=>$value,'method'=>$this->type,'ssoId'=>$userId,'voitingId'=>$this->logArmId,'sessId'=>session_id()]);
                    app()['log']->info('Код не подтверждён',['action'=>"form_{$action}_unsuccess",'value'=>$value,'method'=>$this->type,'ssoId'=>$userId,'voitingId'=>$this->logArmId,'sessId'=>session_id()]);
                }
                return $this->returnError(10, [$left]);
            }


            if ($oldCode['value'] == $value && $code == $oldCode['code']) {
                if ($updateValue) {
                    $result = $this->saveData($userId, $this->type, $value);
                    $oldCode['updated'] = $result;
                } else {
                    $oldCode['updated'] = false;
                }
                $oldCode['attempt']++;
                $oldCode['status'] = self::STATUS_OK;
                $this->saveCache($oldCode);
                 if ($this->logArmId) {
                        $this->_armMgikLogger->info('Код подтверждён',['action'=>"form_{$action}_success",'value'=>$value,'method'=>$this->type,'ssoId'=>$userId,'voitingId'=>$this->logArmId,'sessId'=>session_id()]);
                        app()['log']->info('Код подтверждён',['action'=>"form_{$action}_success",'value'=>$value,'method'=>$this->type,'ssoId'=>$userId,'voitingId'=>$this->logArmId,'sessId'=>session_id()]);
                    }
            } else {
                $this->_cache::delete($this->key);

                return $this->returnError(11);
            }
            $data['logData']['code'] = $oldCode['code'];
            if (!$this->config->get('debug', false)) {
                unset($oldCode['code']);
            }


            return $oldCode;
        } else {
            return $this->returnError(9);
        }

        return $this->returnError(9);
    }

    public function updateConfirmed(int $userId, $value, string $type, string $confirmType)
    {

        $oldCode = $this->_cache::getArray($this->getCacheKey());

        if (!empty($oldCode)) {
            if ($oldCode['status'] !== self::STATUS_OK || $oldCode['updated']) {
                return $this->returnError(12);
            }

            $result = $this->saveData($userId, $type, $value);
            $oldCode['updated'] = $result;
            $this->saveCache($oldCode);
            $this->logger->info('Изменили профиль', ['userId' => $userId, 'updated' => $result ? '1' : '0', 'value' => $value, 'action' => 'delete', 'type' => $type, 'confirmType' => $confirmType, 'key' => $this->getCacheKey()]);
            return $result;
        } else {
            return $this->returnError(9);
        }

        return $this->returnError(9);
    }

    private function generateCode()
    {
        return random_int(10000, 99999);
    }

    private function returnError(int $code, array $result = [], string $debugMessage = '')
    {

        $this->result['error'] = 1;
        $this->result['errorCode'] = $code;

        if (isset($this->errorMaps[$code])) {
            $this->result['errorMessage'] = $this->errorMaps[$code];
        } else {
            $this->result['errorMessage'] = 'Произошла непредвиденная ошибка';
        }
        //var_dump($result);
        if ($result) {
            $this->result['result'] = $result;
            $this->result['errorMessage'] = vsprintf($this->result['errorMessage'], $result);
        }

        if (!empty($debugMessage) && $this->config->get('debug', false)) {
            $this->result['debug'] = $debugMessage;
        }

        return $this->_jsonResponse($this->result, 403);
    }

    private function returnSuccess($resultField, $message = '')
    {

        $this->result['error'] = 0;
        $this->result['result'] = $resultField;
        $this->result['errorCode'] = 0;
        $this->result['errorMessage'] = $message;


        return $this->_jsonSuccessResponse($this->result);
    }

    /**
     * Сохраняет даные в бд.
     */
    private function saveData(int $userId, string $type, string $value): bool
    {
        "{$type}|confirmed|".$this->_userService->getUser()->id;
    }
}
