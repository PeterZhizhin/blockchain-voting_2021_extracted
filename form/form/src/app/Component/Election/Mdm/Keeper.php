<?php

namespace App\Component\Election\Mdm;

use App\Service\Config;
use App\Component\Election;
use App\Service\DurationCounter;
use App\Service\Locator;
use Illuminate\Support\Facades\Http;

class Keeper {

    private Config\ConfigInterface $_config;
    private Election\Setting\Keeper $_settingKeeper;

    private const ERROR_CODE_REVOTING_LIMIT = 18;

    public function __construct() {
        $this->_config = Config\PoolConfig::me()->get('Mdm');
        $this->_settingKeeper = Locator::get(Election\Setting\Keeper::class);
    }

    /**
     * @param $votingId
     * @param string $sudirId
     * @return Entity\VoterData
     * @throws Exception\InsufficientResponse
     * @throws Exception\InvalidResponse
     * @throws Exception\InvalidResponseCode
     */
    public function checkVoter($votingId, string $sudirId): Entity\VoterData {
        return $this->getVoterData($sudirId, $votingId, 'checkBallot');
    }

    public function getExternalId($votingId, string $sudirId): string {
        if ($this->_isTest()) return "test-external-id";
        $baseUrl = env('VOTING_EXTERNAL_ID_HOST', 're-voting:8000');
        $settings = $this->_settingKeeper->getById($votingId);
        $hmacSecret = $settings->getMdmVars()->hmacSalt;
        $ssoIdHmac = hash_hmac('stribog512', $sudirId, $hmacSecret);
        $url = "{$baseUrl}/gid/{$votingId}/{$ssoIdHmac}";
        $headers = [
            'SYSTEM'       => env('VOTING_EXTERNAL_ID_SYSTEM'),
            'SYSTEM-TOKEN' => env('VOTING_EXTERNAL_ID_TOKEN'),
        ];
        $durationCounter = DurationCounter::start();
        try {
            $data = Http::withHeaders($headers)
                ->timeout($this->_timeout())
                ->post($url)
                ->json();
        } catch (\Throwable $e) {
            $this->_logError('Ошибка на запросе в компонент Х', $url, 'getExternalId', $headers, '', $e->getMessage(), ['duration_ms' => $durationCounter->finish(), 'ssoId' => $sudirId, 'ssoIdHmac' => $ssoIdHmac]);
            throw new Exception\NetworkError($e->getMessage());
        }
        $cypher = $data['gidCypher'] ?? null;
        if (!$cypher) {
            $this->_logError('Отсутствует gidCypher в ответе компонента Х', $url, 'getExternalId', $headers, '', $data, ['duration_ms' => $durationCounter->finish(), 'ssoId' => $sudirId, 'ssoIdHmac' => $ssoIdHmac]);
            throw new Exception\InsufficientResponse();
        }
        $this->_logError('Успешный ответ компонента Х', $url, 'getExternalId', $headers, '', $data, ['duration_ms' => $durationCounter->finish(), 'ssoId' => $sudirId, 'ssoIdHmac' => $ssoIdHmac]);
        return $cypher;
    }

    /**
     * @param $votingId
     * @param string $sudirId
     * @return Entity\VoterData
     * @throws Exception\InsufficientResponse
     * @throws Exception\InvalidResponse
     * @throws Exception\InvalidResponseCode
     */
    public function getVoter($votingId, string $sudirId): Entity\VoterData {
        return $this->getVoterData($sudirId, $votingId, 'getBallot');
    }

    public function getVoterData($sudirId, $votingId, string $method) {
        if ($this->_isTest()) {
            app()['log']->info('Using test voter data, due to mgik debug enabled', []);
            return $this->_testVoterData($sudirId);
        }
        return $this->_requestVoterData($sudirId, $votingId, $method);
    }

    private function _testVoterData($sudirId) {
        $district = app()['request']->get('district') ?: app()['request']->header('district') ?: $this->_config->get('default_district_id');
        return $this->_buildVoterData($district, 'random', 'secureHash', time(), "test-request-123-{$sudirId}");
    }

    private function _requestVoterData(string $sudirId, $votingId, string $method) {
        $mdmVars = $this->_settingKeeper->getById($votingId)->getMdmVars();
        $url = "{$mdmVars->url}/{$method}";
        $headers = ['x-application-token' => $mdmVars->token];
        $request = ['ssoId' => $sudirId];
        $durationCounter = DurationCounter::start();
        try {
            $response = Http::withHeaders($headers)
                ->timeout($this->_timeout())
                ->post($url, ['ssoId' => $sudirId]);
        } catch (\Throwable $e) {
            $this->_logError('Ошибка на запросе в МДМ', $url, $method, $headers, $request, $e->getMessage(), [
                'error' => 'mdm_response_invalid',
                'duration_ms' => $durationCounter->finish(),
            ]);
            throw new Exception\NetworkError($e->getMessage());
        }

        return $this->_processRequestVoteDataResponse($response->body(), $method, $url, $request, $headers, $durationCounter->finish());
    }

    private function _timeout(): int {
        return (int)(env('MDM_CURL_TIMEOUT_MS', 20000) / 1000);
    }

    private function _processRequestVoteDataResponse($response, string $method, $url, $body, $headers, $duration) {
        if (empty($response) || !is_array($data = json_decode($response, true))) {
            $this->_logError('Пустой ответ от сервиса', $url, $method, $headers, $body, $response, [
                'error' => 'mdm_response_empty',
                'duration_ms' => $duration
            ]);
            throw new Exception\InvalidResponse();
        }

        $random = $data['random'] ?? null;
        $secureHash = $data['secureHash'] ?? null;
        $timestamp = $data['timestamp'] ?? null;
        $district = $data['district']['districtNumber'] ?? null;
        $requestId = $data['externalId'] ?? null;

        if (!($random && $secureHash && $timestamp)) {
            $this->_logError('Не достаточно параметров в ответе от сервиса', $url, $method, $headers, $body, $response, [
                'error' => 'mdm_response_incomplete',
                'duration_ms' => $duration,
            ]);
            throw new Exception\InsufficientResponse();
        }

        $code = $data['code'][0] ?? null;

        if ($code === self::ERROR_CODE_REVOTING_LIMIT) {
            $this->_logError('Достигнут лимит попыток переголосования', $url, $method, $headers, $body, $response, [
                'duration_ms' => $duration,
            ]);
            throw new Exception\RevotingLimitExceeded();
        }

        if ($code !== $this->_successCodeByMethod($method)) {
            $this->_logError('Не валидный код ответа от сервиса', $url, $method, $headers, $body, $response, [
                'duration_ms' => $duration,
            ]);
            throw new Exception\InvalidResponseCode();
        }

        $this->_logError('Успешный ответ от МДМ', $url, $method, $headers, $body, $response, [
            'duration_ms' => $duration,
        ]);
        return $this->_buildVoterData($district, $random, $secureHash, $timestamp, $requestId);
    }

    private function _buildVoterData($district, $random, $secureHash, $timestamp, $requestId) {
        return new Entity\VoterData($district, $random, $secureHash, $timestamp, $requestId);
    }

    private function _successCodeByMethod($method) {
        return self::SUCCESS_CODES_BY_METHODS[$method] ?? null;
    }

    private function _logError($message, $url, $action, $headers, $body, $response, array $additional = []) {
        app()['log']->info($message, array_merge([
            'url'            => $url,
            'action'         => strtolower(snake_case($action)),
            'is_test'        => $this->_isTest() ? '1' : '0',
            'response'       => $response,
            'requestBody'    => $body,
            'requestHeaders' => $headers,
        ], $additional));
    }

    private function _isTest(): bool {
        return Config\PoolConfig::me()->get('Mgik')->get('debug', false);
    }

    private const SUCCESS_CODES_BY_METHODS = [
        'checkBallot' => 14,
        'getBallot'   => 0,
    ];
}