<?php

return [
    'default' => env('ERROR_MESSAGE_SERVICE_UNAVAILABLE', 'По техническим причинам сервис временно недоступен. Пожалуйста, попробуйте позже.'),
    'AgreementRequired' => env('ERROR_MESSAGE_AGREEMENT_REQUIRED', 'Необходимо ваше согласие с условиями голосования'),
    'TelephoneOrEmailNotConfirmed' => env('ERROR_MESSAGE_TELEPHONE_OR_EMAIL_NOT_CONFIRMED', 'Телефон/адрес элетронный почты не был подтвержден'),
    'UserAlreadyVotedWithinLockPeriod' => env('ERROR_MESSAGE_MAXIMUM_TRIES_LIMIT_EXCEEDED', 'Превышен лимит переголосований, попробуйте позже'),
    'InvalidResponseCode' => env('ERROR_MESSAGE_ACCESS_DENIED', ''),
    'InvalidResponse' => env('ERROR_MESSAGE_DEFAULT_ERROR_MESSAGE', 'По техническим причинам сервис временно недоступен. Пожалуйста, попробуйте позже.'),
    'InsufficientResponse' => env('ERROR_MESSAGE_DEFAULT_ERROR_MESSAGE', 'По техническим причинам сервис временно недоступен. Пожалуйста, попробуйте позже.'),
	'RequestGuidFailed' => env('ERROR_MESSAGE_DEFAULT_ERROR_MESSAGE', 'По техническим причинам сервис временно недоступен. Пожалуйста, попробуйте позже.'),
];