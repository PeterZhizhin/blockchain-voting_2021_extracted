<?php

namespace App\Component\Election;

use App\Component\Election\Exception\Base;
use App\Exceptions\RedirectRequired;
use App\Jobs\GetUserElections;
use App\Service\Utils;
use Illuminate\Support\Facades\Http;
use App\Service\Cache;
use App\Service\Config\FileConfig;
use App\Service\Config\PoolConfig;
use App\Service\DurationCounter;
use Illuminate\Contracts\Cache\LockTimeoutException;

class Keeper {

    private FileConfig $_config;
    private Mdm\Keeper $_mdmKeeper;
    private \Psr\Log\LoggerInterface $_armLogger;
    private Setting\Keeper $_settingKeeper;

    public function __construct() {
        $this->_mdmKeeper = CSL::mdmKeeper();
        $this->_settingKeeper = CSL::settingsKeeper();
	    $this->_config = PoolConfig::me()->get('Mgik');
	    $this->_armLogger = app()['log']->channel('arm');
    }

    public function generateBallotUrl($userId, array $votingIds): string {
        $electionHash = $this->getEncryptedGuid($userId, $votingIds);
        $port = env('BALLOT_EXTERNAL_PORT', null);
        $host = $this->_config->get('host');
        if ($port) $host = "{$host}:{$port}";
        // Ссылка ведущая на сервер бюллетеня
        return "{$host}/ballot/check/{$electionHash}";
    }

    // Метод защищает получение шифра атомарным замком, чтобы исключить получение шифра более одного раза
    public function getEncryptedGuid($userId, array $votingIds): string {
        $lock = \Cache::lock($userId, 20);
        try {
            $lock->block(10);
            return $this->_getEncryptedGuid($userId, $votingIds);
        } catch (LockTimeoutException $e) {
            app()['log']->emergency('Was unable to aquire user get guid lock for 20 seconds', [
                'exception_message' => $e->getMessage(),
                'error' => 'guid_lock_timeout',
            ]);
        } finally {
            optional($lock)->release();
        }
    }

    private function _getEncryptedGuid($userId, array $votingIds): string {
        if (count($votingIds) === 0) {
            throw new RedirectRequired(route('election'));
        }
        [$isLocked, $lockExpiresDateTime] = $this->isUserVoteLocked($userId);
        
        $votings = [];
        try {
            $this->_setUserVoteLock($userId);
            if ($isLocked) throw new Exception\UserAlreadyVotedWithinLockPeriod($lockExpiresDateTime);
            foreach ($votingIds as $votingId) {
                // Уведомляем кабинет председателя о попытке получить шифр
                $this->_notifyTrySubmit($votingId, $userId);
                // Проверяем доступ пользователя к голосованию
                $voterData = $this->_mdmKeeper->checkVoter($votingId, $userId);
                // Получаем идентификатор отложенного выбора
                $externalId = $this->_mdmKeeper->getExternalId($votingId, $userId);
                $voterData->setRequestId($externalId);
                // Фиксируем факт выдачи бюллетеня по голосованию
                $this->_mdmKeeper->getVoter($votingId, $userId);
                $votings[$votingId] = $voterData;
                // Уведомляем кабинет председателя о выдаче бюллетеня
                $this->_notifyMdmSubmit($votingId, $userId);
            }
            // Запрашиваем шифр голосования у системы бюллетеня
            $guid = $this->_requestGuid($votings);
            foreach ($votingIds as $votingId) {
                // Уведомляем кабинет председателя о факте получения шифра для каждого голосования отдельно
                $this->_notifyGuidRequested($votingId, $userId);
            }
        } catch (Base | Mdm\Exception\Base $t) {
            // Одно из голосований к которому пользователь имел доступ во время фоновой проверки, более не доступно.
            // Отправляем пользователя обратно на страницу подтверждения, где фоновая проверка будет выполнена заново.
            app()['log']->critical('Got throwable upon generating ballot URL', [
                'error'             => 'vote_link_generation_failed',
                'exception_message' => $t->getMessage(),
                'exception_trace'   => Utils::cutTrace($t),
            ]);
            $this->_clearUserVoteLock($userId);
            throw new RedirectRequired(route('election'));
        } catch (Exception\UserAlreadyVotedWithinLockPeriod $t) {
            // Пользователь попытался в обход фронтовой проверки получить бюллетень,
            // перекидываем его обратно на страницу голосования и уведомляем эксплуатацию
            app()['log']->info('User already voted within lock period', [
                'error'             => $t->name(),
                'exception_message' => $t->getMessage(),
            ]);
            throw new RedirectRequired(route('election'));
        } catch (\Throwable $t) {
            // Произошла непредвиденная ошибка. Снимаем блокировку переголосования, но не отдаём шифр пользователю
            $this->_clearUserVoteLock($userId);
            throw $t;
        }

        // Подписываем полученный гуид секретом формы
        return $this->_signGuid($guid);
    }

    public function getUserElectionsJob(string $ssoId): GetUserElections {
        return new GetUserElections($ssoId);
    }

    /** @return Mdm\Entity\VoterData[] */
    public function getUserElections(string $ssoId): array {
        $settings = $this->_settingKeeper->get();
        $now = new \DateTime();
        $voterData = [];
        /** @var Setting\Entity\Setting $setting */
        foreach ($settings as $setting) {
            if ($setting->getStartDate() > $now || $setting->getEndDate() < $now) continue;
            $votingId = $setting->getVotingId();
            try {
                $voterData["{$votingId}"] = $this->_mdmKeeper->checkVoter($votingId, $ssoId);
            } catch (Mdm\Exception\RevotingLimitExceeded $e) {
                throw $e;
            } catch (Mdm\Exception\Base $e) {
                // User has no access to this voting
            } catch (\Throwable $t) {
                app()['log']->critical('Got throwable upon checking voter on MDM', [
                    'error'             => (new \ReflectionClass($t))->getShortName(),
                    'exception_class'   => get_class($t),
                    'exception_message' => $t->getMessage(),
                    'exception_trace'   => Utils::cutTrace($t),
                ]);
            }
        }
        return $voterData;
    }

    private function _setUserVoteLock($userId) {
        Cache::set("{$this->_userLockCacheKey($userId)}", 1, (int)(env('VOTE_LOCK_TIMEOUT_MIN', 60) * 60));
    }

    private function _clearUserVoteLock($userId) {
        Cache::delete("{$this->_userLockCacheKey($userId)}");
    }

    public function isUserVoteLocked($userId): array {
        $isLockEnabled = $this->_config->get('lock_enabled');
        if (!$isLockEnabled) {
            return [false, null];
        }
        $cacheKey = "{$this->_userLockCacheKey($userId)}";
        $result = (bool)Cache::get($cacheKey);
        return [$result, $result ? new \DateTime('+' . Cache::ttl($cacheKey) . ' seconds')  : null];
    }

    private function _userLockCacheKey($userId) {
        return "vote_lock_{$userId}";
    }

    // Метод формирует и отправляет запрос в систему бюллетеня за шифром голосования
    /** @var Mdm\Entity\VoterData $votings */
    private function _requestGuid(array $votings): string {
        $request = [];
        foreach ($votings as $votingId => $voterData) {
            $request[] = [
                'hash_groups' => $this->_getHashGroups($voterData),
                'district'   => $voterData->getDistrict(),
                'mdm_cypher' => $voterData->getRequestId(),
                'voting_id'  => $votingId,
            ];
        }
        $url = $this->_config->get('url');
        $postData = json_encode($request, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        $headers = $this->_headers();
        $durationCounter = DurationCounter::start();
        try {
            $response = Http::withHeaders($this->_headers())
                ->timeout($this->_timeout())
                ->post($url, $request)
                ->body();
        } catch (\Exception $e) {
            $this->_logError($e->getMessage(), $url, 'mgik', $headers, $postData, $response ?? null, $durationCounter->finish());
            throw new Exception\RequestGuidFailed();
        }

        if (!$response || !($responseData = json_decode($response, true)) || !array_key_exists('guid', $responseData)) {
            $this->_logError('Unable to request guid', $url, 'mgik', $headers, $postData, $response ?? null, $durationCounter->finish());
            throw new Exception\RequestGuidFailed();
        }

        app()['log']->info('Request guid success', [
            'action' => 'guid_request',
            'duration_ms' => $durationCounter->finish(),
        ]);

        return $responseData['guid'];
    }

    private function _timeout(): int {
        return (int)(env('CURL_GLOBAL_TIMEOUT_MS', 20000) / 1000);
    }

    private function _signGuid(string $guid): string {
        $data = ['guid' => $guid];
        $cert = $this->_config->get('cert');
        $data['hash'] = hash('stribog512', json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
        $data['hash_hmac'] = hash_hmac('gost', json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE), $cert);
        $electionHash = base64_encode(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
        return $electionHash;
    }

    private function _headers(): array {
        return [
            'SYSTEM'       => $this->_config->get('system'),
            'SYSTEM-TOKEN' => $this->_config->get('system_token'),
            'Content-Type' => 'application/json',
        ];
    }

    private function _getHashGroups(Mdm\Entity\VoterData $voterData): array {
        return [
            'mpgu' => $this->_getMpguHashGroup(),
            'mdm'  => $this->_getMdmHashGroup($voterData),
        ];
    }

    private function _getMdmHashGroup(Mdm\Entity\VoterData $voterData): array {
        return [
            'timestamp' => $voterData->getTimeStamp(),
            'random'    => $voterData->getRandom(),
            'hash'      => $voterData->getSecureHash(),
        ];
    }

    private function _getMpguHashGroup(): array {
        $secret = $this->_config->get('secret');
        $timestamp = time();
        $random = Utils::create_guid();
        return [
            'timestamp' => $timestamp,
            'random'    => $random,
            'hash'      => hash('sha256', "{$timestamp}|{$random}|{$secret}"),
        ];
    }

    private function _logError($message, $url, $action, $headers, $body, $response, $duration) {
        app()['log']->error($message, [
            'url'            => $url,
            'error'          => 'request_guid_failed',
            'action'         => $action,
            'response'       => $response,
            'requestBody'    => $body,
            'requestHeaders' => $headers,
            'duration_ms'    => $duration,
        ]);
    }

    private function _notifyTrySubmit($votingId, $userId): void {
        $this->_notify(
            'Попытка получить бюллетень',
            ['action' => 'form_sent', 'voitingId' => $votingId, 'sessId' => app()['session.store']->getId(), 'ssoId' => $userId]
        );
    }

    private function _notifyGuidRequested($votingId, $userId): void {
        $this->_notify(
            'Получили шифр бюллетеня',
            ['action' => 'form_guid', 'voitingId' => $votingId, 'sessId' => app()['session.store']->getId(), 'ssoId' => $userId]);
    }

    private function _notifyMdmSubmit($votingId, $userId): void {
        $this->_notify(
            'Пометили в мдм получение бюллетеня',
            ['action' => 'form_redirected', 'voitingId' => $votingId, 'sessId' => app()['session.store']->getId(), 'ssoId' => $userId]
        );
    }

    private function _notify($message, array $data): void {
        $this->_armLogger->info($message, $data);
        app()['log']->info($message, $data);
    }

}
