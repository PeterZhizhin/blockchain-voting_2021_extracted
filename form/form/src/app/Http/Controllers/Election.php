<?php

namespace App\Http\Controllers;

use App\Exceptions\RedirectRequired;
use Illuminate\Http;
use App\Service;
use App\Exceptions;
use App\Component;
use App\Component\Validation\Exception\AgreementRequired;
use App\Component\Validation\Exception\TelephoneOrEmailNotConfirmed;

class Election extends Controller {

    private Component\Election\Facade $_electionComponent;
    private \Psr\Log\LoggerInterface $_armMgikLogger;
    private Component\Validation\Facade $_validationComponent;

    public function __construct(Http\Request $request, Http\Response $response) {
        parent::__construct($request, $response);
        $this->_addTemplateVar('client', $this->_userService->getUserInLegacyFormat());
        $this->_addTemplateVar('elk_host', env('ELK_URL', 'http://release.elk.srvdev.ru'));
        $this->_electionComponent = Service\Locator::get(Component\Election\Facade::class);
        $this->_validationComponent = Service\Locator::get(Component\Validation\Facade::class);
        $this->_armMgikLogger = app()['log']->channel('arm');
    }

    // Метод для фронта, возвращающий статус или результат работы фоновой 
    // проверки доступа к голосованиям
    public function checkBallot(): Http\JsonResponse
    {
        $user = $this->_userService->getUser();
        /** @var \DateTime  $expireDateTime */
        [$isLocked, $expireDateTime] = $this->_electionComponent->isUserVoteLocked($user->id);

        // Когда голосование будет разблокировано, будет уже следующий день, когда уже нельзя переголосовать
        if ($isLocked && $expireDateTime > $nextDay = (new \DateTime())->modify('+1 day')->setTime(0, 0, 0, 1)) {
            return $this->_voteLimitExceededResponse();
        }

        $userElections = $this->_electionComponent->getUserElectionsJob($user->id);

        $data = [];

        if ($userElections->isFinished()) {
            $elections = $userElections->getResult();
            if ($elections['status'] ?? null === 'error') {
                return $this->_voteLimitExceededResponse();
            }
            foreach ($elections as $votingId => $voterData) {
                $setting = $this->_electionComponent->getSetting($votingId);
                if ($setting === null) {
                    app()['log']->critical('Unable to retrieve setting for election', [
                        'election_id' => $votingId,
                        'error'       => 'setting_lost_on_check_ballot',
                    ]);
                    $this->dispatch($userElections);
                    return new Http\JsonResponse([
                        'status' => 'running',
                        'data' => $data,
                    ]);
                }
                app()['session.store']->put('district', $voterData->getDistrict());
                // Отправляем в кабинет председателя статистику посещения формы
                $this->_notifyFormOpened($votingId, $user->id);

                $formTemplateVars = $setting->getFormTemplateVars();
                $district = $voterData->getDistrict() ?? 1;
                $startDate = $setting->getStartDate()->format('H:i d.m.Y');
                $endDate = $setting->getEndDate()->format('H:i d.m.Y');
                $rules = str_replace(['{$votingId}', '{$district}', '{$startDate}', '{$endDate}'], [$votingId, $district, $startDate, $endDate], env('FORM_RULES_CUSTOM'));
                $data[$votingId] = [
                    'rules' => $rules,
                    'form_name' => $setting->getTitle(),
                    'buttonVote' => $formTemplateVars->getButtonName(),
                    'errorUserMessage' => $formTemplateVars->getErrorMessage(),
                    // если переголосование еще не доступно, кнопка заблокирована
                    'disabled' => $isLocked,
                    'messageVoteStart' => $formTemplateVars->getMessageBeforeVote(),
                    'disabled_until' => $expireDateTime !== null ? $expireDateTime->getTimestamp() : null,
                ];
            }
        }

        return new Http\JsonResponse([
            'status' => $userElections->getStatus(),
            'data' => $data,
        ]);
    }

    // Метод получения списка доступных пользователю голосований для мобильного приложения
    public function list() {
        $user = $this->_userService->getUser();
        /** @var \DateTime  $expireDateTime */
        [$isLocked, $expireDateTime] = $this->_electionComponent->isUserVoteLocked($user->id);
        $userElectionsJob = $this->_electionComponent->getUserElectionsJob($user->id);
        $settingsById = $this->_electionComponent->getSettingsById();
        \Queue::connection('sync')->pushOn('sync', $userElectionsJob);
        $voterElections = $userElectionsJob->getResult();
        if ($voterElections['status'] ?? null === 'error') {
            return new Http\JsonResponse([
                'error' => 1,
                'message' => 'Вами был исчерпан лимит переголосований',
            ]);
        }
        $result = [];
        /** @var Component\Election\Mdm\Entity\VoterData $voterElection */
        foreach ($voterElections as $electionId => $voterElection) {
            $setting = $settingsById[$electionId];
            $result[] = [
                'id'           => $electionId,
                'title'        => $setting->getTitle(),
                'buttonTitle'  => $setting->getFormTemplateVars()->getButtonName(),
                'is_locked'    => (int)$isLocked,
                'locked_until' => $expireDateTime !== null ? $expireDateTime->getTimestamp() : null,
            ];
        }
        return new Http\JsonResponse([
            'data' => $result,
            'error' => 0,
            'message' => 'OK',
        ]);
    }

    // Метод получения шифра доступа к бюллетеням для мобильного приложения
    public function getEncryptedGuid() {
        try {
            $this->_validationComponent->check();
        } catch (TelephoneOrEmailNotConfirmed $e) {
            return $this->_jsonResponse(['error' => 1, 'message' => 'Телефон\электронная почта не подтверждены']);
        } catch (AgreementRequired $e) {
            // we doesn't care if agreement was checked for api
        }
        $user = $this->_userService->getUser();
        $userElections = $this->_electionComponent->getUserElectionsJob($user->id);

        if (!$userElections->isFinished()) {
            return $this->_jsonResponse(['error' => 2, 'message' => 'Вы не инициировали доступные голосования']);
        }

        $votingIds = array_keys($userElections->getResult());
        try {
            $encryptedGuid = $this->_electionComponent->getEncryptedGuid($user->id, $votingIds);
        } catch (RedirectRequired $e) {
            return $this->_jsonResponse(['error' => 3, 'message' => 'Не возможно проголосовать по одному из голосований. Запросите список доступных голосований повторно']);
        }
        return $this->_jsonResponse(['encryptedGuid' => $encryptedGuid]);
    }

    public function show() {
        $user = $this->_userService->getUser();
        // Проверяем, что у пользователя заполнен телефон
        if (empty($user->phone)) {
            throw new Exceptions\HumanReadableException('Уважаемый пользователь! Для продолжения работы Вам необходимо перейти 
           на <a href="' . env('ELK_URL', 'ELK_URL_NOT_SET') . '/my/#/settings/profile" target="_blank">страницу "Мои документы"</a>
            Вашего личного кабинета и подтвердить Ваш номер мобильного телефона. Затем Вы сможете вернуться и продолжить работу.');
        }

        // Инициируем задачу по проверке доступных пользователю голосований
        $checkBallotJob = $this->_electionComponent->getUserElectionsJob($user->id);
        $this->dispatch($checkBallotJob);

        $this->_assignCommonTemplateVars();
        app()['log']->info('Передача данных сессии пользователя на форму', [
            'action' => 'sudir_render_data',
            'is_success' => 1,
        ]);
        return $this->_renderView('application.election.ballot.show');
    }

    // Метод для фронта, проверка подтвержден ли телефон
    public function check() {
        $this->_validationComponent->check();
    }

    public function sign() {
        $this->_validationComponent->check();
        $user = $this->_userService->getUser();
        $userElections = $this->_electionComponent->getUserElectionsJob($user->id);

        // Заходить в метод до завершения проверки запрещено
        if (!$userElections->isFinished()) {
            throw new RedirectRequired(route('election'));
        }

        $votingIds = array_keys($userElections->getResult());
        // Формируем ссылку на сервер бюллетеня
        $ballotUrl = $this->_electionComponent->generateBallotUrl($user->id, $votingIds);
        return redirect($ballotUrl);
    }

    public function denyLegal() {
        // Метод отдачи шаблона ошибки недопустимости голосования юр. лицом
        return $this->_renderView('base.form_not_for_legal');
    }

    public function changeConfirm() {
        // Метод смены способа подтверждения учетной записи пользователя (телефон\почта)
        $session = app()['session.store'];
        $confirmType = $session->get('confirmType');
        $emailConfirmAllowed = (bool)env('ENABLE_MAIL_CONFIRM', 1);
        if ($emailConfirmAllowed && ($confirmType === 'sms' || !$confirmType)) {
            $session->put('confirmType', 'email');
        } else {
            $session->put('confirmType', 'sms');
        }
        return redirect(route('election'));
    }

    private function _assignCommonTemplateVars(): void {
        $this->_addTemplateVar('mainTitle',env('MAIN_TITLE','Тестирование дистанционного электронного голосования'));
        $this->_addTemplateVar('manualTxt', env('FORM_MANUAL', '<h3>Общероссийское голосование</h3>'));
        $this->_addTemplateVar('rulesCommon', env('FORM_RULES_COMMON'));
        $this->_addTemplateVar('agreement', env('FORM_AGREEMENT'));
        $this->_addTemplateVar('about', env('FORM_ABOUT'));
        $this->_addTemplateVar('confirmType', $this->_validationComponent->getType());
        $this->_addTemplateVar('enableEmailConfirm', env('ENABLE_MAIL_CONFIRM', true));
        $confirmType = app()['session.store']->get('confirmType');
        $this->_addJsVar('notConfirmedMessage', $confirmType === 'email'
            ? env('ERROR_MESSAGE_EMAIL_NOT_CONFIRMED', 'Адрес электронной почты не подтвержден. Страница будет обновлена для повторного подтверждения адреса электронной почты')
            : env('ERROR_MESSAGE_TELEPHONE_NOT_CONFIRMED', 'Телефон не подтвержден. Страница будет обновлена для повторного подтверждения номера телефона')
        );
        $this->_addJsVar('agreementRequiredMessage', env('ERROR_MESSAGE_AGREEMENT_REQUIRED', 'Необходимо ваше согласие с условиями голосования'));
    }

    private function _voteLimitExceededResponse() {
        return new Http\JsonResponse([
            'status' => 'error',
            'data' => ['url' => '/limit'],
        ]);
    }

    private function _notifyFormOpened($votingId, $userId): void {
        $this->_notify(
            'Открыта форма подтверждения участия',
            ['action' => 'form_open', 'voitingId' => $votingId, 'sessId' => app()['session.store']->getId(), 'ssoId' => $userId]
        );
    }

    private function _notify($message, array $data): void {
        $this->_armMgikLogger->info($message, $data);
        $this->_logger->info($message, $data);
    }
}
