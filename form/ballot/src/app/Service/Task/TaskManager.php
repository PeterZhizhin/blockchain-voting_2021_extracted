<?php
/**
 * Диспетчер асинхронной гарантированной доставки
 * Использует таблицы P_TASK_BUFFER (буфер) и P_TASK_LOG (журнал попыток).
 * Для рассылки используется задача common/data/tools/tasks/1m#startTaskManager.php
 */

namespace App\Service\Task;

use App\Service\Config\PoolConfig;
use Exception;
use App\Service\Database;
use App\Service\Locator;
use App\Service\Utils;
use Illuminate\Database\ConnectionInterface;

/**
 * Интерфейс модуля для синхронной или асинхронной отправки данных.
 * Модули должны находиться в каталоге ./taskPlugins/<имя-модуля>.class.php
 * Имя класса плагина - <имя-модуля>
 */

/**
 * Отправка данных.
 * Плагин должен:
 * - вернуть true или вызвать stopTask в случае успеха (прекращение доставки, удаление данных из буфера)
 * - кинуть исключение или вызвать requeueTask (будет запланирован повтор доставки)
 * - вызвать setExtIdAndWait в случае работы с асинхронным веб-сервисом (будет запланирован повтор доставки на случай отсутствия подтверждения)
 */
class TaskManager
{
    protected $bufferID = false; //номер задачки
    private $attemptNo = 0;
    public static $message = false; //сообщение ошибки, может подменяться
    public static $result = false; //сообщение ошибки, может подменяться
    public static $jsonResponse = ''; //чистый ответ внешний системы
    public static $logData = array(); //данные для логирование
    private $hasDecision = false;
    private $fromCron = false;
    private $userID, $pluginName, $graylog, $data, $params; // храним промежуточные данные

    public function getLogger()
    {
        return app()['log'];
    }

    public function getConfig()
    {
        return PoolConfig::me()->get('TaskManager');
    }

    public function log($message = '')
    {
        self::$logData['bufferID'] = $this->bufferID;
        self::$logData['attemptNumber'] = $this->attemptNo;
        self::$logData['userid'] = $this->userID;
        self::$logData['pluginName'] = $this->pluginName;

        self::$logData['jsonRequest'] = json_encode($this->data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        self::$logData['params'] = json_encode($this->params, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        self::$logData['jsonResponse'] = self::$jsonResponse;


        if (!self::$result) {
            if (empty($message)) {
                $message = self::$message;
            }
            self::$logData['errorMessage'] = self::$message;

            $this->getLogger()->error($message, self::$logData);
        } else {
            if (!empty($message)) {
                self::$logData['errorMessage'] = $message;
            } else {
                $message = 'OK';
                self::$logData['errorMessage'] = self::$message;
            }
            $this->getLogger()->info($message, self::$logData);
        }
    }

    /**
     * Запуск доставки данных.
     * Параметры:
     * - priority: приоритет задачи на асинхронную отправку, по умолчанию 0 (самый низкий)
     * - execute_now: пытаться ли выполнить синхронно, по умолчанию false
     * - ext_id: внешний идентификатор записи для использования плагином, по умолчанию не установлен
     * - max_attempts: максимальное количество попыток отправки до блокировки, по умолчанию params['task_mgr_max_attempts'], либо бесконечно
     * - time_to_try: лимит времени в секундах на попытки отправки до блокировки, по умолчанию params['task_mgr_time_to_try'], либо бесконечно
     * Ничего не возвращает, либо кидает исключение.
     */
    public static function queueTask($userID, $pluginName, $data, $params = array())
    {
        if (isset($params['execute_now']) && $params['execute_now']) {
            $id = false;
            if (isset($params['store_in_buffer']) && $params['store_in_buffer']) {
                $params['exec_result'] = 2; //копия заявки
                $id = self::storeDataInBuffer($userID, $pluginName, $data, $params);
            }
            $mgr = new TaskManager();
            $mgr->execute($id, 1, $userID, $data, $pluginName, $params);
        } else return self::storeDataInBuffer($userID, $pluginName, $data, $params);
        return self::$message; //false = успех
    }

    public static function taskBufferTableName()
    {
        return 'p_task_buffer';
    }

    private static function storeDataInBuffer($userID, $pluginName, $data, $params)
    {
        $mgr = new TaskManager();
        $fields = array(
            'pgu_user_id' => $userID,
            'plugin_name' => $pluginName,
            'ext_id' => isset($params['ext_id']) ? $params['ext_id'] : NULL,
            'app_id' => isset($params['app_id']) ? $params['app_id'] : NULL,
            'data' => serialize($data),
            'task_priority' => isset($params['priority']) ? $params['priority'] : 0,
            'attempts' => 0,
            'created_at' => time(),
            'next_attempt_time' => isset($params['startTime']) ? $params['startTime'] : 0, // исполнить ASAP
            // Columns added by myself, to comply with postgress tables restrictions
            'failed' => 0,
            'message' => '',
        );
        if (isset($params['exec_result'])) $fields['failed'] = $params['exec_result'];




        if (isset($params['max_attempts'])) {
            $fields['max_attempts'] = $params['max_attempts'];
        } else {
            $fields['max_attempts'] = $mgr->getConfig()->get("plugin/$pluginName/max_attempts", $mgr->getConfig()->get("max_attempts", 10));
        }

        if (isset($params['time_to_try'])) {
            $fields['try_till'] = time() + $params['time_to_try'];
        } else {

            $fields['try_till'] = time() + $mgr->getConfig()->get("plugin/$pluginName/attempts_sleep_time", $mgr->getConfig()->get("attempts_sleep_time", 120));
        }
        /** @var Database */
        $databaseService = Locator::get(Database::class);

        if (!empty($fields['ext_id']) && !empty($fields['app_id'])) {
            $databaseService->execute(function (ConnectionInterface $connection) use ($fields) {
                $connection->table(self::taskBufferTableName())->where([
                    'ext_id' => $fields['ext_id'],
                    'app_id' => $fields['app_id']
                ])->delete();
            });
        }

        return $databaseService->execute(function (ConnectionInterface $connection) use ($fields) {
            return $connection->table(self::taskBufferTableName())->insertGetId($fields, 'p_task_buffer_id');
        });
    }

    public function __construct($from_cron = false)
    {
        $this->fromCron = $from_cron;
        self::$message = false; //успешная отправка по умолчанию
    }

    private function execute($bufferID, $attemptNo, $userID, $data, $pluginName, $params)
    {
        $this->attemptNo = $attemptNo;
        if ($bufferID) $this->bufferID = $bufferID;
        else {
            $this->userID = $userID;
            $this->pluginName = $pluginName;
            $this->data = $data;
            $this->params = $params;
        }

        try {
            $namespace = "App\Service\Task\Plugin";
            $pluginFullName = "{$namespace}\\$pluginName";
            $plugin = new $pluginFullName();

            self::$message = '';
            $plugin->executeTask($this, $attemptNo, $userID, $data, isset($params['ext_id']) ? $params['ext_id'] : NULL);
            if (!$this->hasDecision) throw new Exception('Неизвестен результат исполнения задачи');
        } catch (Exception $e) {
            self::$message = $e->getMessage();
            $this->log('PLUGIN ERROR: '.$e->getMessage());
            $cutTrace = Utils::cutTrace($e);
            $this->requeueTask("Message {$e->getMessage()}, trace: {$cutTrace}");
        }
    }

    /**
     * Метод для плагина: успешное завершение задачи
     * @param boolean $remove Удалять ли задачу
     */
    public function stopTask(bool $success = true, bool $remove = true, string $message = NULL)
    {
        if ($this->fromCron) echo 'stopTask ', $this->bufferID, "\n";
        if (empty($message)) {
            self::$message = $message; //сигнализируем о ошибке
        }
        if ($success) {
            self::$message = '';
        }


        self::$result = $success;

        $this->hasDecision = true;
        $databaseService = Locator::get(Database::class);
        if ($this->bufferID) {
            if ($success && $remove && !$message) {
                $databaseService->execute(function (ConnectionInterface $connection) {
                    $connection->table(self::taskBufferTableName())->where(['p_task_buffer_id' => $this->bufferID])->delete();
                });
            } else {
                if (!$success && empty($message)) {
                    $message = 'Завершили задачу с ошибкой '.$this->attemptNo;
                }
                $databaseService->execute(function (ConnectionInterface $connection) use ($success, $message) {
                    $connection->table(self::taskBufferTableName())->where(['p_task_buffer_id' => $this->bufferID])->update([
                        'failed' => ($success ? 0 : 1),
                        'message' => $message,
                        'try_till' => time(),
                    ]);
                });
            }
            $this->log($message);
        }
    }

    /**
     * Метод для плагина: планируем повтор задачи
     * $nextAttemptAt - unix-штамп времени для следующего исполения задачи
     */
    public function requeueTask($message, $nextAttemptAt = NULL)
    {
        if ($this->fromCron) echo 'requeueTask ', $this->bufferID, ', "', $message, '", повтор через ', $nextAttemptAt === NULL ? $this->attemptNo * 60 : $nextAttemptAt - time(), ' секунд', "\n";
        if (!$this->bufferID) $this->bufferID = self::storeDataInBuffer($this->userID, $this->pluginName, $this->data, $this->params);

        $this->hasDecision = true;
        $databaseService = Locator::get(Database::class);
        $databaseService->execute(function (ConnectionInterface $connection) use ($nextAttemptAt, $message) {
            $connection->table(self::taskBufferTableName())->where(['p_task_buffer_id' => $this->bufferID])->update([
                'unlock_time' => NULL, // разблокируем запись
                'next_attempt_time' => $nextAttemptAt === NULL ? time() + $this->attemptNo * 60 : $nextAttemptAt, // по умолчанию откладываем следующую попытку
                'attempts' => $this->attemptNo, // сохраняем номер попытки
                'process_id' => NULL,
                'message' => $message,
                'failed'=>0,
            ]);
        });
        self::$result = false;
        self::$message = 'задача на переотправке. Попытка '.$this->attemptNo;
        $this->log('задача на переотправке. Попытка '.$this->attemptNo);
    }

    /**
     * Метод для плагина: запланировать следующее выполнение задачи в случае работы с асинхронным веб-сервисом
     * $nextAttemptAt - unix-штамп времени для следующего исполения задачи
     */
    public function setExtIdAndWait($extID, $message = false, $nextAttemptAt = NULL)
    {

        if ($this->fromCron) echo 'setExtIdAndWait ', $this->bufferID, ', ', $extID, ', "', $message, '", повтор через ', $nextAttemptAt === NULL ? $this->attemptNo * 60 : $nextAttemptAt - time(), ' секунд', "\n";
        if (!$this->bufferID && !empty($this->data)) $this->bufferID = self::storeDataInBuffer($this->userID, $this->pluginName, $this->data, $this->params);
        elseif (!$this->bufferID && $extID) {
            //найдем
        }
        self::$result = false;

        self::$message = $message ? '' : $message;
        $this->hasDecision = true;
        if (!$this->bufferID && $extID) {
            //найдем
            $searchData = array(
                'ext_id' => $extID);
        } else $searchData = array(
                'p_task_buffer_id' => $this->bufferID);

        $data = array(
            'ext_id' => $extID, // установим внешний идентификатор
            'unlock_time' => NULL, // разблокируем запись
            'next_attempt_time' => $nextAttemptAt !== NULL ? $nextAttemptAt : (time() + $this->attemptNo * 60), // по умолчанию откладываем следующую попытку
            'process_id' => NULL,
            'failed' => 1,
            'message' => $message
        );
        if ($this->attemptNo) $data['attempts'] = $this->attemptNo;
        $databaseService = Locator::get(Database::class);
        $databaseService->execute(function (ConnectionInterface $connection) use ($searchData, $data) {
            $connection->table(self::taskBufferTableName())->where($searchData)->update($data);
        });
    }

    public function getBufferID()
    {
        return $this->bufferID;
    }

    public function executeCronTask($bufferID, $attemptNo, $userID, $data, $pluginName, $params)
    {
        return $this->execute($bufferID, $attemptNo, $userID, $data, $pluginName, $params);
    }
}