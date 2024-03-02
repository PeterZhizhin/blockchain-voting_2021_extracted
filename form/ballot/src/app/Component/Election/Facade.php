<?php

namespace App\Component\Election;

class Facade {

    public function getEncryptedGuid(array $votings): string {
        return CSL::keeper()->getEncryptedGuid($votings);
    }

    public function getBallot(string $guid, ?int $votingId = null): ?Entity\Ballot {
        return CSL::keeper()->getBallot($guid, $votingId);
    }

    /** @return Entity\Ballot[] */
    public function getBallots(string $guid): array {
        return CSL::keeper()->getBallots($guid);
    }

    public function vote(string $guid, $voteId, string $accountAddressBlock, string $keyVerificationHash, string $rawStoreBallotTx, string $rawTxHash, string $showSid) {
        app()['log']->info("Getting ballot in facade");
        return CSL::keeper()->vote($guid, $voteId, $accountAddressBlock, $keyVerificationHash, $rawStoreBallotTx, $rawTxHash, $showSid);
    }

    public function skip(Entity\Ballot $ballot) {
        CSL::keeper()->skip($ballot);
    }

    public function decrypt(string $data) {
        return CSL::encryptionKeeper()->decrypt($data);
    }

    public function checkSign($electionHash) {
        return CSL::keeper()->checkSign($electionHash);
    }

    public function markOpened(Guid\Entity\Guid $guid): void {
        CSL::guidKeeper()->markOpened($guid);
    }

    public function restoreGuids(): void {
        CSL::guidKeeper()->restoreGuids();
    }

    /**
     * @return Setting\Entity\Setting[]
     */
    public function getSettings(): array {
        return CSL::settingsKeeper()->get();
    }

    public function getSettingsAll(): array {
        return CSL::settingsKeeper()->getAll();
    }

    public function getSetting($id): ?Setting\Entity\Setting {
        return CSL::settingsKeeper()->getById($id);
    }

    public function allById(): array {
        return CSL::settingsKeeper()->allById();
    }

    /**
     * @return Setting\Entity\Setting[]
     */
    public function refreshSettings(): array {
        return CSL::settingsKeeper()->refreshSettings();
    }

    public function buildInterval(Setting\Entity\Setting $setting): string {
        return CSL::keeper()->buildInterval($setting);
    }
}
