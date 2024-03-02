<?php

namespace App\Service\Task\Plugin;

use App\Component\Amqp\PublisherWithConfirms;
use App\Service;
use App\Service\Locator;
use App\Service\ProcessDurationLogger;
use App\Service\Task\TaskManager;
use App\Service\Utils;

class Mgd2021 implements TaskPlugin
{
    /** @var Utils */
    private $_utils;

    public function __construct() {
        $this->_config = Service\Config\PoolConfig::me()->conf('Mgik')->get('amqp');
        $this->_utils = Locator::get(Utils::class);
    }

    protected $log;

    /**
     * @param TaskManager $taskManager
     * @param $attemptNumber
     * @param $userID
     * @param $data
     * @param $extID
     */
    public function executeTask($taskManager, $attemptNumber, $userID, $data, $extID)
    {
        $log_data = array(
            'error' => 0,
            'userID' => $userID,
            'data' => $data['json'],
            'attemptNumber' => $attemptNumber,
            'vote_id' => $data['vote_id'],
        );
        try {
            $process = ProcessDurationLogger::start('vote');
            $log_data['result'] = $this->_send($data);
            ProcessDurationLogger::finish($process);
        } catch (\Throwable $t) {
            $log_data['trace'] = Utils::cutTrace($t);
            $log_data['error'] = $t->getMessage();
            $log_data['class'] = get_class($t);
            $this->sendLog("Неудачная отправка $attemptNumber", $log_data);
            $taskManager->setExtIdAndWait($extID, $t->getMessage(), time() + (120 * ($attemptNumber + 1)));
            return;
        }

        $taskManager::$message = true;
        $taskManager->stopTask(true);
        $this->sendLog('Удачная отправка', $log_data);
    }

    private function _getPool($votingId) {
      $poolComponent = app()->get('connection_pool');
      $poolName = "mgik-{$votingId}";
      app()['log']->info('Getting pool for voting id', ['voting_id' => $votingId, 'pool_name' => $poolName]);
      try {
        $pool = $poolComponent->getPool($poolName);
        app()['log']->info('Pool found, do not create', ['pool_nane' => $poolName]);
        return $pool;
      } catch (\Throwable $t) {
          $isTransactional = (bool)env('MDM_AMQP_TRANSACTIONAL', 0);
          $amqpConfig = PoolConfig::me()->get('Mgik')->get('amqp');
          app()['log']->info('Haven not found the pool, creating one', ['pool_name' => $poolName, 'exception_class' => get_class($t), 'exception_message' => $t->getMessage(), 'exception_trace' => Utils::cutTrace($t)]);
          $configWithQueue = $amqpConfig;
          $configWithQueue['queue'] = "{$amqpConfig['queue']}-{$votingId}";
          $configWithQueue['exchange'] = "{$amqpConfig['queue']}-exchange-{$votingId}";

          $mgikPool = $isTransactional ? $poolComponent->buildAmqpPublisher($configWithQueue) : $poolComponent->buildAmqpPublisherWithConfirms($configWithQueue);

          $mgikPool->init();
          $poolComponent->addPool($poolName, $mgikPool);
          return $poolComponent->getPool($poolName);
      }
    }

    private function _send($data) {
        if (!Service\Utils::isCoroutineEnabled()) {
            $config = Service\Config\PoolConfig::me()->conf('Mgik')->get('amqp');
            $publisher = new PublisherWithConfirms($config);
            $publisher->send($data['json']);
            return '1';
        }
        $retryCount = env('ARM_RABBIT_RETRY_COUNT', 1);
        $poolComponent = app()->get('connection_pool');
        $pool = $this->_getPool($data['vote_id']);
        return $this->_utils->retry(function () use ($pool, $data) {
                $broker = $pool->borrow();
                try {
                    $broker->send($data['json']);
                } catch (\Throwable $t) {
                    $pool->return($broker);
                    throw $t;
                }
                return '1';
        }, $retryCount);
    }

    protected function sendLog($message, $data = [])
    {
        if (! $this->log) {
            $this->log = app()['log'];
        }

        $this->log->info($message, array_merge([
            'pid' => posix_getpid(),
            'sess-id' => session_id(),
            'type' => 'vote'
        ], $data));
    }
}
