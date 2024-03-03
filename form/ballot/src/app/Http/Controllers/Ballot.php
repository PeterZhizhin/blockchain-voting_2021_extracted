<?php

namespace App\Http\Controllers;

use App\Component\Election\CSL;
use App\Service;
use App\Component;
use App\Exceptions;
use App\Service\Config\PoolConfig;
use App\Service\Utils;
use Illuminate\Validation\ValidationException;

class Ballot extends Controller {

    private const VOTE_ERROR_MAP = [
        // 1 => 'Время истекло.',
        1 => 'Время для голосования истекло. <br>Функция «Отложенное решение» позволяет вернуться к бюллетеню спустя три часа после его открытия, но не позднее 23:59, если вы голосуете 29 июля, или 19:59, если вы голосуете 30 июля.',
        2 => 'Бюллетень уже был отправлен или время истекло.',
        3 => 'Вы не имеете доступа к голосованию',
    ];

    private Component\Election\Setting\Keeper $_settingsKpr;
    private Component\Election\Facade $_electionComponent;
    private Service\Election $_electionService;
    private Component\Arm\Facade $_armComponent;

    public function __construct() {
        parent::__construct();
        $this->_electionComponent = Service\Locator::get(Component\Election\Facade::class);
        $this->_electionService = Service\Locator::get(Service\Election::class);
        $this->_armComponent = Service\Locator::get(Component\Arm\Facade::class);
        $this->_settingsKpr   = Service\Locator::get(Component\Election\Setting\Keeper::class);
    }

    public function test() {
        app()['log']->info('Test Ok!');
        return 'Test Ok!';
    }

    // Метод получения шифра голосования формой
    public function getGuid() {
        $this->_validateParams();
        $votings = $this->_request->all();
        try {
            $encryptedGuid = $this->_electionComponent->getEncryptedGuid($votings);
            $response = $this->_jsonSuccessResponse(['guid' => $encryptedGuid]);
        } catch (Component\Election\Exception\VotingDoesNotExist $exception) {
            $response = $this->_jsonStatusErrorResponse(['error' => 'Данного голосования не существует']);
        }  catch (Component\Election\Exception\VotingIsOver $exception) {
            $response = $this->_jsonStatusErrorResponse(['error' => 'Голосование уже закончилось']);
        } catch (Component\Election\Exception\VotingHasNotStarted $exception) {
            $response = $this->_jsonStatusErrorResponse(['error' => 'Голосование еще не началось']);
        }
        return $response->header('Access-Control-Allow-Origin', '*');
    }

    // Метод для фронта, по факту открытия в браузере бюллетеня привязываем доступ к текущей сессии
    public function markOpened(string $guid, $voteId) {
        try {
            $ballot = $this->_electionComponent->getBallot($guid, $voteId);
        } catch (Component\Election\Exception\VotingIsOver $exception) {
            return $this->_jsonStatusErrorResponse(['error' => 'Голосование уже закончилось']);
        } catch (Component\Election\Exception\VotingHasNotStarted $exception) {
            return $this->_jsonStatusErrorResponse(['error' => 'Голосование еще не началось']);
        }

        if ($ballot === null) {
            return $this->_ballotDeniedResponse();
        }

        $expireDate = $ballot->getGuid()->getExpireDate()->getTimestamp();
        $ttlData = ['ttl' => $expireDate - (new \DateTime())->getTimestamp()];
        if ($ballot->getGuid()->isOpened()) {
            $this->_armComponent->notifyBallotOpenedRepeatedly($ballot);
            return $this->_jsonStatusSuccessResponse($ttlData);
        }
        $this->_electionComponent->markOpened($ballot->getGuid());
        $this->_armComponent->notifyBallotOpened($ballot);
        return $this->_jsonStatusSuccessResponse($ttlData);
    }

    // Метод отображения бюллетеня для голосования
    public function show(string $guid) {
        try {
            $ballot = $this->_electionComponent->getBallot($guid);
        } catch (Component\Election\Exception\VotingIsOver $exception) {
            return $this->_renderErrorTemplate('Голосование уже закончилось');
        } catch (Component\Election\Exception\VotingHasNotStarted $exception) {
            return $this->_renderErrorTemplate('Голосование еще не началось');
        } catch (Component\Election\Exception\AccessFromAnotherDevice $exception) {
            return $this->_renderErrorTemplate('Бюллетень уже был открыт на другом устройстве');
        }

        if ($ballot === null) {
            return $this->_renderErrorTemplate('Вы не имеете доступа к голосованию');
        }
        try {
            $this->_assignTemplateVars($ballot, $guid);
        } catch (Exceptions\LogicException $e) {
            return $this->_renderErrorTemplate($e->getMessage());
        }

        $template = mb_strtolower($ballot->getSettings()->getRef());
        return $this->_renderTemplate($template,[
            'ballotHasNextBallot' => (int)($ballot->getGuidsCount() > 1)
        ]);
    }

    public function showTest(string $voteId, string $districtId) {
        $this->_addTemplateVar('guid', 1);
        $this->_addTemplateVar('district', $districtId);
        $settings = $this->_settingsKpr->getById($voteId);
        $ballotRef = $settings->getRef();
        $this->_addJsRoute('mark_opened', route('mark_opened', ['hash' => '1', 'voteId' => $voteId]));
        $districtDeputies = $this->_electionService->getDistrictDeputies($ballotRef, $districtId, false);
        $this->_addTemplateVar('deputies', $districtDeputies);
        $districts = $this->_electionService->getDistricts($ballotRef, $districtId, false);
        $this->_addTemplateVar('districts', $districts);
        if (PoolConfig::me()->get('Arm')->get('needCacheDistrictLog')) {
            app()['log']->info('District data assigned from cache', ['district' => $districtId, 'ref' => $ballotRef.'_DISTRICT',
                'content' => $districts,'pid' => posix_getpid(),'sess-id' => session_id()]);
        }
        $this->_addTemplateVar('question', $this->_electionService->getDistrictQuestion($ballotRef, $districtId));
        $votingParams = [
            'publicKey'  => $settings->getPublicKey(),
            'voitingId'  => $settings->getVotingId(),
            'extId'      => $settings->getExtId(),
            'minChoices' => $settings->getMinCountVote() ?? 1,
            'maxChoices' => $settings->getMaxCountVote() ?? 1,
            'guidsCount' => 1,
            'isTest'     => $settings->getIsTest() ?? 0
        ];
        $ballotParams = $settings->getBallot();
        $this->_addTemplateVar('ballot', $ballotParams);
        $this->_addTemplateVar('dit_voting', json_encode($votingParams, JSON_UNESCAPED_UNICODE));
        $this->_addTemplateVar('settings', $votingParams);
        $interval = $this->_electionComponent->buildInterval($settings);
        $this->_addTemplateVar('timeInterval', $interval); // TODO: Do we need this? Appears to be unused
        $template = mb_strtolower($ballotRef);
        return $this->_renderTemplate($template);
    }


    // Метод проверки подписей
    public function checkSign(string $electionHash) {
        try {
            // Получаем гуид из шифра
            $guid = $this->_electionComponent->checkSign($electionHash);
        } catch (\Exception $e) {
            return $this->_jsonStatusErrorResponse(['error' => 'Вы не имеете доступа к голосованию']);
        }
        return redirect(route('ballot_show', ['guid' => $guid]));
    }

    // Метод для мобильного приложения
    public function decryptGuid() {
        try {
            $this->validate($this->_request, ['encryptedGuid' => 'required']);
        } catch (ValidationException $e) {
            return $this->_jsonStatusErrorResponse(['error' => 'Недостаточно параметров запроса']);
        }
        $encryptedGuid = $this->_param('encryptedGuid');
        try {
            // Получаем гуид из шифра
            $guid = $this->_electionComponent->checkSign($encryptedGuid);
            // Получаем список доступных к голосованию бюллетеней
            $ballots = $this->_electionComponent->getBallots($guid);
        } catch (Component\Election\Exception\VotingIsOver $exception) {
            return $this->_jsonStatusErrorResponse(['error' => 'Голосование уже закончилось', 'errorCode' => 1]);
        } catch (Component\Election\Exception\VotingHasNotStarted $exception) {
            return $this->_jsonStatusErrorResponse(['error' => 'Голосование еще не началось', 'errorCode' => 2]);
        } catch (\Exception $e) {
            return $this->_jsonStatusErrorResponse(['error' => 'Не валидные зашифрованные данные', 'errorCode' => 3]);
        }
        $electionsData = [];
        $settingsById = $this->_electionComponent->allById();

        if (count($ballots) === 0) {
            return $this->_jsonStatusErrorResponse(['error' => 'У вас нет ни одного доступного голосования', 'errorCode' => 4]);
        }

        foreach ($ballots as $ballot) {
            $guid = $ballot->getGuid();
            $electionId = $guid->getElectionId();
            $settings = $settingsById[$electionId];
            $districtDeputies = $this->_electionService->getDistrictDeputies($ballot->getSettings()->getRef(), $ballot->getGuid()->getDistrictId(), true);
            $electionsData[] = [
                'votingId'            => $electionId,
                'expirationTimestamp' => $ballot->getGuid()->getExpireDate()->getTimestamp(),
                'deputies'            => $districtDeputies,
                'publicKey'           => $settings->getPublicKey(),
                'districtId'          => $guid->getDistrictId(),
                'minChoices'          => $settings->getMinCountVote(),
                'maxChoices'          => $settings->getMaxCountVote(),
            ];
        }

        return $this->_jsonSuccessResponse([
            'guid'      => $guid->getId(), 
            'elections' => $electionsData,
        ]);
    }

    // Метод отправки голоса для мобильного приложения
    public function voteApi() {
        try {
            $this->validate($this->_request, ['guid' => 'required', 'electionId' => 'required']);
        } catch (ValidationException $e) {
            return $this->_jsonStatusErrorResponse(['error' => 'Недостаточно параметров запроса']);
        }
        $guid = $this->_param('guid');
        $electionId = $this->_param('electionId');
        return $this->vote($guid, $electionId, false);
    }

    // Метод отправки голоса
    public function vote($guid, $voteId, bool $returnUrl = true) {
        $rawStoreBallotTx    = $this->_request->post('rawStoreBallotTx') ?? null;
        $rawTxHash           = $this->_request->post('rawTxHash') ?? null;
        $accountAddressBlock = $this->_request->post('accountAddressBlock') ?? null;
        $keyVerificationHash = $this->_request->post('keyVerificationHash') ?? null;
        $showSid             = $this->_request->post('showSid') ?? "false";

        // Cast to bool
        $showSid = $showSid == "true";

        if (!($accountAddressBlock && $keyVerificationHash && $rawStoreBallotTx && $rawTxHash)) {
            return $this->_jsonStatusErrorResponse(['code' => 1]);
        }
        try {
          $ballot = $this->_electionComponent->vote($guid, $voteId, $accountAddressBlock, $keyVerificationHash, $rawStoreBallotTx, $rawTxHash, $showSid);
        } catch (Component\Election\Exception\VotingIsOver $exception) {
            return $this->_jsonStatusErrorResponse(['error' => 'Голосование уже закончилось', 'code' => 2]);
        } catch (Component\Election\Exception\VotingHasNotStarted $exception) {
            return $this->_jsonStatusErrorResponse(['error' => 'Голосование еще не началось', 'code' => 2]);
        } catch (Component\Election\Exception\BallotDoesNotExist $exception) {
            return $this->_jsonStatusErrorResponse(['error' => 'Вы не имеете доступа к голосованию']);
        }
        if ($ballot === null) {
            return $this->_jsonStatusErrorResponse(['error' => 'Вы не имеете доступа к голосованию']);
        }
        $this->_armComponent->notifyBallotSent($ballot);
        if ($ballot->getGuidsCount() > 1 && $returnUrl) {
            return $this->_jsonSuccessResponse(['url' => route('ballot_show', ['guid' => $ballot->getGuid()->getId()])]);
        }
        return $this->_jsonStatusResponse('success', ["sid" => $ballot->getSid()]);
    }

    // Метод пропуска бюллетеня
    public function skip($guid, $voteId) {
        try {
            $ballot = $this->_electionComponent->getBallot($guid, $voteId);
        } catch (Component\Election\Exception\VotingIsOver $exception) {
            return $this->_jsonStatusErrorResponse(['error' => 'Голосование уже закончилось', 'code' => 2]);
        } catch (Component\Election\Exception\VotingHasNotStarted $exception) {
            return $this->_jsonStatusErrorResponse(['error' => 'Голосование еще не началось', 'code' => 2]);
        }

        if ($ballot === null) {
            return $this->_jsonStatusErrorResponse(['error' => 'Вы не имеете доступа к голосованию', 'code' => 3]);
        }

        $this->_electionComponent->skip($ballot);
        $this->_armComponent->notifyBallotSkipped($ballot);
        if ($ballot->getGuidsCount() > 1) {
            return $this->_jsonSuccessResponse(['url' => route('ballot_show', ['guid' => $ballot->getGuid()->getId()])]);
        }
        return $this->_jsonStatusResponse('success');
    }

    public function success() {
        $sid = $this->_request->get('sid') ?? null;
        return $this->_renderTemplate('success', ["sid" => $sid]);
    }

    public function error() {
        $errorMap = self::VOTE_ERROR_MAP;
        $code = $this->_request->get('code') ?? null;
        $message = $errorMap[$code] ?? null;
        $this->_addTemplateVar('error_message', $message);
        return $this->_renderTemplate('error');
    }

    private function _votingParams(Component\Election\Entity\Ballot $ballot): array {
        return [
            'publicKey'  => $ballot->getSettings()->getPublicKey(),
            'voitingId'  => $ballot->getSettings()->getVotingId(),
            'extId'      => $ballot->getSettings()->getExtId(),
            'minChoices' => $ballot->getSettings()->getMinCountVote() ?? 1,
            'maxChoices' => $ballot->getSettings()->getMaxCountVote() ?? 1,
            'guidsCount' => $ballot->getGuidsCount() ?? 0,
        ];
    }

    private function _ballotDeniedResponse() {
        return $this->_jsonPermissionDeniedResponse(['error' => 'Вы не имеете доступа к голосованию']);
    }

    private function _renderErrorTemplate(string $error) {
        $this->_addTemplateVar('error_message', $error);
        return $this->_renderTemplate('error');
    }

    private function _renderTemplate($template, $data = []) {
        $this->_addTemplateVar('template_path', resource_path() . '/views/election');
        $this->_addTemplateVar('js_data', json_encode($this->_javascriptData));
        foreach($data as $key=>$value) {
            $this->_addTemplateVar($key, $value);
        }
        $templatePath = "election.{$template}";
        return view($templatePath);
    }

    private function _assignTemplateVars(Component\Election\Entity\Ballot $ballot, string $hash) {
        $guid = $ballot->getGuid();
        $ballotRef = $ballot->getSettings()->getRef();
        $this->_addTemplateVar('guid', $hash);
        $this->_addJsRoute('mark_opened', route('mark_opened', ['guid' => $hash, 'voteId' => $ballot->getGuid()->getElectionId()]));
        $this->_addJsRoute('vote', route('vote', ['guid' => $hash, 'voteId' => $ballot->getGuid()->getElectionId()]));
        $this->_addJsRoute('skip', route('skip', ['guid' => $hash, 'voteId' => $ballot->getGuid()->getElectionId()]));
        $this->_addJsRoute('success', route('success'));
        $this->_addJsRoute('error', route('error'));
        $this->_addTemplateVar('district', $guid->getDistrictId());
        $districtDeputies = $this->_electionService->getDistrictDeputies($ballotRef, $guid->getDistrictId(), Utils::needToRenewCache());
        $this->_addTemplateVar('deputies', $districtDeputies);
        $districts = $this->_electionService->getDistricts($ballotRef, $guid->getDistrictId(), Utils::needToRenewCache());
        $this->_addTemplateVar('districts', $districts);
        if (PoolConfig::me()->get('Arm')->get('needCacheDistrictLog')) {
            app()['log']->info('District data assigned from cache', ['district' => $guid->getDistrictId(), 'ref' => $ballotRef.'_DISTRICT',
                'content' => $districts,'pid' => posix_getpid(),'sess-id' => session_id()]);
        }
        $this->_addTemplateVar('question', $this->_electionService->getDistrictQuestion($ballotRef, $guid->getDistrictId()));
        $votingParams = $this->_votingParams($ballot);
        $ballotParams = $ballot->getSettings()->getBallot();
        $this->_addTemplateVar('ballot', $ballotParams);
        $this->_addTemplateVar('dit_voting', json_encode($votingParams, JSON_UNESCAPED_UNICODE));
        $this->_addTemplateVar('settings', $votingParams);
        $interval = $this->_electionComponent->buildInterval($ballot->getSettings());
        $this->_addTemplateVar('timeInterval', $interval); // TODO: Do we need this? Appears to be unused
    }

    private function _validateParams(): void {
        $this->validate($this->_request, [
            '*.hash_groups' => 'required',
            '*.district'    => 'required',
            '*.mdm_cypher'  => 'required',
            '*.voting_id'   => 'required',
        ]);
    }
}
