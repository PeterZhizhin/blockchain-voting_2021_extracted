<?php

namespace App\Service;

use Illuminate\Auth\GenericUser;
use Illuminate\Contracts;

class User {

    public const SESSION_KEY_USER = 'user';

    /** @var GenericUser */
    private $_user;

    public function getUser(): ?GenericUser {
        if ($this->_user === null) {
            $this->_user = $this->_initUser();
        }
        return $this->_user;
    }

    /** no logs call, skip recursion */
    public function getCurrentUser(): ?GenericUser {
        try {
            return $this->_user ?: $this->_initGenericUser($this->_retrieveUserFromSession(app()['session.store']));
        } catch (\Throwable $t) {
            return null;
        }
    }

    public function clearUserSession() {
        $session = app()['session.store'];
        $session->remove(User::SESSION_KEY_USER);
        $session->remove(OAuth::$USER_TOKEN);
        app()['log']->info('Удаление сессии пользователя в ГИС ДЭГ', [
            'action' => 'sudir_user_session_clear_result',
            'is_success' => 1,
        ]);
    }

    public function initUserById(?string $ssoId): void {
        $this->_user = $this->_initGenericUser([
            'SSO_ID' => $ssoId,
        ]);
    }

    private function _initUser(): ?GenericUser {
        $session = app()['session.store'];
        $oauth = OAuth::getInstance();
        $userFromSession = $this->_retrieveUserFromSession($session);
        app()['log']->info('Поиск информации о сессии пользователя', [
            'action' => 'sudir_session_lookup',
            'is_success' => (int)($userFromSession !== null),
        ]);
        if ($userFromSession !== null) {
            if (!$oauth->verifyCookieToken($session)) {
                return null;
            }
            return $this->_initGenericUser($userFromSession);
        }
        $userData = $oauth->getUserDataFromService();
        if ($userData === null) {
            return null;
        }
        $this->_storeUserInSession($session, $userData);
        return $this->_initGenericUser($userData);
    }

    private function _initGenericUser(array $userData) {
        return new GenericUser([
            'id'         => $userData['SSO_ID'],
            'phone'      => $userData['mobile'] ?? '',
            'email'      => $userData['mail'] ?? null,
            'firstName'  => $userData['first_name'] ?? null,
            'lastName'   => $userData['last_name'] ?? null,
            'middleName' => $userData['middle_name'] ?? null,
            'is_legal'   => $userData['is_legal'] ?? false,
        ]);
    }

    private function _storeUserInSession(Contracts\Session\Session $session, array $user) {
         $session->put(self::SESSION_KEY_USER, $user);
         app()['log']->info('Cохранение данных пользователя в сессию', [
            'is_success' => 1,
            'action' => 'sudir_persist_user_to_session',
        ]);
    }

    private function _retrieveUserFromSession(Contracts\Session\Session $session): ?array {
        $user = $session->get(self::SESSION_KEY_USER);
        return is_array($user) && count($user) > 0 ? $user : null;
    }

    private function _convertUserToLegacyUser(GenericUser $user) {
        return [
            'SUDIR_ID'  => $user->id,
            'TELEPHONE' => $user->phone,
            'EMAIL'     => $user->email,
        ];
    }

    public function getUserInLegacyFormat(): array {
        $user = $this->getUser();
        return $this->_convertUserToLegacyUser($user);
    }
}