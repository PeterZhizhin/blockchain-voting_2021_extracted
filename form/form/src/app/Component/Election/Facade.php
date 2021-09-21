<?php

namespace App\Component\Election;

use App\Component\Election\Mdm\Entity\VoterData;
use App\Jobs;

class Facade {

    /**
     * @return Setting\Entity\Setting[]
     */
    public function getSettings(): array {
        return CSL::settingsKeeper()->get();
    }

    /**
     * @return Setting\Entity\Setting[]
     */
    public function getAllSettings(): array {
        return CSL::settingsKeeper()->all();
    }

    /** @return Setting\Entity\Setting[] */
    public function getSettingsById(): array {
        return CSL::settingsKeeper()->allById();
    }

    public function validate(Setting\Entity\Setting $setting, $districtId): void {
        CSL::validationKeeper()->validate($setting, $districtId);
    }

    public function getSetting($id): ?Setting\Entity\Setting {
        return CSL::settingsKeeper()->getById($id);
    }

    public function generateBallotUrl($userId, array $votingIds): string {
        return CSL::keeper()->generateBallotUrl($userId, $votingIds);
    }

    public function getEncryptedGuid($userId, array $votingIds): string {
        return CSL::keeper()->getEncryptedGuid($userId, $votingIds);
    }

    public function isUserVoteLocked($userId): array {
        return CSL::keeper()->isUserVoteLocked($userId);
    }

    /**
     * @return Setting\Entity\Setting[]
     */
    public function refreshSettings(): array {
        return CSL::settingsKeeper()->refreshSettings();
    }

    public function getUserElectionsJob(string $ssoId): Jobs\GetUserElections {
        return CSL::keeper()->getUserElectionsJob($ssoId);
    }

    /** @return VoterData[] */
    public function getUserElections(string $ssoId): array {
        return CSL::keeper()->getUserElections($ssoId);
    }

    /**
     * @param $votingId
     * @param string $sudirId
     * @return Mdm\Entity\VoterData
     * @throws Mdm\Exception\InsufficientResponse
     * @throws Mdm\Exception\InvalidResponse
     * @throws Mdm\Exception\InvalidResponseCode
     */
    public function checkVoter($votingId, string $sudirId): VoterData {
        return CSL::mdmKeeper()->checkVoter($votingId, $sudirId);
    }

    /**
     * @param $votingId
     * @param string $sudirId
     * @return Mdm\Entity\VoterData
     * @throws Mdm\Exception\InsufficientResponse
     * @throws Mdm\Exception\InvalidResponse
     * @throws Mdm\Exception\InvalidResponseCode
     */
    public function getVoter($votingId, string $sudirId) {
        return CSL::mdmKeeper()->getVoter($votingId, $sudirId);
    }
}
