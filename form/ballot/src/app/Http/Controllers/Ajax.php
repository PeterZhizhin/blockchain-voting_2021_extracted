<?php

namespace App\Http\Controllers;

use App\Component\Election;
use App\Component\Election\Exception\GuidDecryptionFailed;
use App\Service\Locator;
use App\Service;
use App\Exceptions;
use App\Jobs;
use Illuminate\Http\Request;

class Ajax extends BaseAjax {

    public function hit() {
        $hit = $this->_request->get('hit');
        $type = $this->_request->get('type');
        $data = json_decode($this->_request->get('value'), true);
        $guid = $data['guid'] ?? null;
        if (!$hit || !$type) {
            return $this->_jsonErrorResponse(3, 'Отсутствует один из обязательных параметров для метода hit');
        }
        $this->_logger->info($hit, ['data' => $data, 'action' => $type, 'errorMessage' => $hit, 'guid' => $guid]);
        return $this->_jsonSuccessResponse(['result' => 'success'], false);
    }

    public function reset() {
        app()['log']->info('Refresh settings webhook received', ['action' => 'settings_webhook']);
        dispatch(new Jobs\RefreshSettings());
        return $this->_jsonSuccessResponse(['status' => 'OK']);
    }

    public function lib($ref) {
        /** @var Service\Election */
        $electionService = Locator::get(Service\Election::class);
        try {
            return $this->_jsonSuccessResponse($electionService->getDistrictDeputies($ref, null, true));
        } catch (\Throwable $t) {
            return $this->_jsonResponse(['error' => $t->getCode(), 'message' => $t->getMessage()]);
        }
    }

    public function decrypt() {
        $data = $this->_data();
        /** @var Election\Facade */
        $electionComponent = Locator::get(Election\Facade::class);
        try {
            $data = $data['base64body'];
            $data = str_replace(' ','+',$data);
            $response = $electionComponent->decrypt($data);
        } catch (Exceptions\BallotException $exception) {
            return $this->_jsonErrorResponse($exception->getCode(), $exception->getMessage());
        }
        return $this->_jsonSuccessResponse(['result' => $response]);
    }

    public function decryptPack(Request $request) {
        $guidData = $request->all();
        $result = [];
        /** @var Election\Facade */
        $electionComponent = Locator::get(Election\Facade::class);
        foreach ($guidData as $guid => $base64EncodedData) {
            try {
                $decrypted = $electionComponent->decrypt($base64EncodedData);
            } catch (GuidDecryptionFailed $exception) {
                return $this->_jsonErrorResponse(10, 'Unable to decrypt data');
            }
            $decryptedDecoded = json_decode($decrypted, true);
            $result[$guid] = $decryptedDecoded['groupId'];
        }
        $response = ['result' => $result, 'errorMessage' => '', 'error' => 0];
        return $this->_jsonResponse($response);
    }

    private function _data() {
        $requestParams = $this->_request->all();
        return array_key_exists('data', $requestParams) ? $requestParams['data'] : $requestParams;
    }
}
