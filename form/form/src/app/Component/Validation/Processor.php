<?php

namespace App\Component\Validation;

use App\Http\Controllers\ConfirmInputController;
use App\Service;

class Processor {

    private Service\User $_userService;

    public function __construct() {
        $this->_userService = Service\Locator::get(Service\User::class);
    }

    public function check() {
        /** @var ConfirmInputController */
        $confirmInputController = Service\Locator::get(ConfirmInputController::class);
        $user = $this->_userService->getUser();
        $value = $this->getType() === 'email' ? $user->email : $user->phone; 
        $type = $this->getType();
        $ssoId = $user->id;
        if (!$confirmInputController->isConfirmed($ssoId, $value, $type, 'registration')) {
            throw new Exception\TelephoneOrEmailNotConfirmed();
        }

        if (!app()->get('request')->get('is_agree')) {
            throw new Exception\AgreementRequired();
        }
    }

    public function getType(): string {
        $default = 'sms';
        if (!env('ENABLE_MAIL_CONFIRM', true) || !$this->_userService->getUser()->email) {
            return $default;
        }
        $confirmType = app()['session.store']->get('confirmType');
        return $confirmType ?: $default;
    }
}