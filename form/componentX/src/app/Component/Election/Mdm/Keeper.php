<?php

namespace App\Component\Election\Mdm;

use App\Component\Election;
use App\Service\Locator;
use Illuminate\Support\Facades\Http;
use App\Service;
use App\Service\DurationCounter;

class Keeper {

    private Election\Setting\Keeper $_settingKeeper;
    private Service\Utils $_utils;

    public function __construct() {
        $this->_config = config('Mdm');
        $this->_settingKeeper = Locator::get(Election\Setting\Keeper::class);
        $this->_utils = Locator::get(Service\Utils::class);
    }

    public function receiveGroupId(int $votingId, string $ssoIdHmac): string {
        $isUseMdmData = env('USE_MDM_DATA', false) && ($mdmDataRaw = env('MDM_DATA'));
        
        if ($isUseMdmData) {
            $mdmData = json_decode($mdmDataRaw, true);
            if (!is_array($mdmData) || count($mdmData) === 0) {
                throw new \Exception('Mdm data is not a proper JSON');
            }
            $mdmDataByVotingId = $this->_utils->buildIndex($mdmData, 'id'); 
            $mdmDataForVoting = $mdmDataByVotingId[$votingId];
            $url = $mdmDataForVoting['host'];
            $serviceToken = $mdmDataForVoting['token'];
        } else {
            $settings = $this->_settingKeeper->getById($votingId);
            $url = $settings->getServiceUrl();
            $serviceToken = $settings->getServiceToken();
        }
        
        $params = ['ssoId' => $ssoIdHmac];
        $headers = [
            'x-application-token' => $serviceToken,
            'Content-Type'        => 'application/json',
        ];
        app()['log']->info('Передача полученного зашифрованного запроса в подсистему «Реестр участников голосования»', [
            'action'      => 'gid_mdm_request_sent',
            'url'         => $url,
            'request'     => $params,
            'ssoIdHmac'   => $ssoIdHmac,
        ]);
        $durationCounter = DurationCounter::start();
        try {
            $response = Http::withHeaders($headers)->post($url, $params);
        } catch (\Throwable $t) {
            throw new Exception\NetworkError($t->getMessage());
        }
        $responseData = $response->json();
        if ($code = $responseData['errorCode'] ?? null) {
            $errorMessage = $responseData['errorMessage'] ?? null;
            app()['log']->error('Error response from mdm', [
                'url'          => $url,
                'request'      => $params,
                'ssoIdHmac'    => $ssoIdHmac,
                'is_success'   => 0,
                'error'        => 'mdm_gid_error',
                'response'     => $responseData,
                'code'         => $code,
                'errorMessage' => $errorMessage,
                'duration_ms'  => $durationCounter->finish(),
            ]);
            throw new Exception\InvalidResponse($errorMessage);
        }
        app()['log']->info('Получение идентификатора eid', [
            'action'      => 'gid_mdm_request_result',
            'url'         => $url,
            'request'     => $params,
            'ssoIdHmac'   => $ssoIdHmac,
            'response'    => $responseData,
            'code'        => $code,
            'duration_ms' => $durationCounter->finish(),
        ]);
        return $responseData['externalId'];
    }
}