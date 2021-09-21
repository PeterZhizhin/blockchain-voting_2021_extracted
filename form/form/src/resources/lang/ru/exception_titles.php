<?php

return [
    'default' => env('ERROR_TITLE_SERVICE_UNAVAILABLE', 'Возникла ошибка'),
    'AgreementRequired' => env('ERROR_TITLE_AGREEMENT_REQUIRED', 'Не подтверждено согласие с правилами'),
    'TelephoneOrEmailNotConfirmed' => env('ERROR_TITLE_TELEPHONE_OR_EMAIL_NOT_CONFIRMED', 'Ошибка валидации'),
    'UserAlreadyVotedWithinLockPeriod' => env('ERROR_TITLE_MAXIMUM_TRIES_LIMIT_EXCEEDED', 'Повторное голосование'),
    'InvalidResponseCode' => env('ERROR_TITLE_ACCESS_DENIED', 'Доступ к дистанционному электронному голосованию запрещен'),
];