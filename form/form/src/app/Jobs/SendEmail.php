<?php

namespace App\Jobs;

use App\Service;
use App\Service\Utils;
use App\Service\Ispk;
use App\Service\Locator;
use App\Service\User;

class SendEmail extends Job {

    private string $_email;
    private string $_body;
    private string $_sudirId;

    public function __construct(string $email, string $body) {
        $this->_email = $email;
        $this->_body = $body;
        $this->_sudirId = Locator::get(User::class)->getUserInLegacyFormat()['SUDIR_ID'];
    }

    public function handle() {
        try {
            $mailConf = Service\Config\PoolConfig::me()->get('Ispk');
                    $fromEmail = $mailConf->get('from_address');
                    $fromName = $mailConf->get('from_name');
                    (new Ispk($mailConf))->sendEmail(
                        $this->_sudirId, "Подтверждение участия почтового адреса", [
                        'email' => $this->_email,
                        'name' => "Подтверждение почтового адреса"], [
                        'email' => $fromEmail,
                        'name' => $fromName], $this->_body, [
                        'code' => '10',
                        'desc' => 'Подтверждение почтового адреса',
                        'text' => ''], [
                        'id' => '',
                        'name' => ''], Utils::create_guid(), '', $this->_sudirId, '', ''
                    );
        } catch (\Throwable $t) {
            app()['log']->critical('Sending email failed', ['exception_class' => get_class($t), 'exception_message' => $t->getMessage(), 'exception_trace' => Service\Utils::cutTrace($t)]);
        }
    }
}