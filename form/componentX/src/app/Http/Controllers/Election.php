<?php

namespace App\Http\Controllers;

use App\Jobs;
use App\Component;
use App\Service\Locator;
use Illuminate\Http;

class Election extends Controller {

    private Component\Election\Facade $_electionComponent;

    public function __construct() {
        $this->_electionComponent = Locator::get(Component\Election\Facade::class);
    }

    public function receiveGid(int $votingId, string $ssoIdHmac) {
        app()['log']->info('Получение зашифрованного запроса на получение зашифрованного обезличенного идентификатора участника голосования', [
            'action' => 'gid_request_received',
            'is_success' => 1,
            'voting_id' => $votingId,
            'sudir_id_hmac' => $ssoIdHmac, 
        ]);
        try {
            $gid = $this->_electionComponent->receiveGid($votingId, $ssoIdHmac);
        } catch (Component\Election\Mdm\Exception\Base $e) {
            return $this->_jsonErrorResponse(1, $e->getMessage());
        }
        app()['log']->info('Передача зашифрованного egid на Форму подтверждения', [
            'action' => 'gid_request_served',
            'is_success' => 1,
            'voting_id' => $votingId,
            'sudir_id_hmac' => $ssoIdHmac,
            'gid' => $gid,
        ]);
        return $this->_jsonSuccessResponse(['gidCypher' => $gid, 'status' => 'ok']);
    }

    public function refreshCache() {
        app()['log']->info('Refresh settings webhook received', ['action' => 'settings_webhook']);
        dispatch(new Jobs\RefreshSettings());
        return $this->_jsonSuccessResponse(['status' => 'ok']);
    }

}