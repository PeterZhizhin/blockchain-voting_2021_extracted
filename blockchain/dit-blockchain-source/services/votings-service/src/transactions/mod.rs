use exonum::runtime::{ExecutionContext, ExecutionError};
use exonum_derive::{exonum_interface, interface_method};

use crate::service::VotingsService;

mod add_voter_key;
mod create_voting;
mod decrypt_ballot;
mod finalize_voting;
mod finalize_voting_with_results;
mod issue_ballot;
mod publish_decryption_key;
mod register_voters;
mod revoke_voter_participation;
mod stop_registration;
mod stop_voting;
mod store_ballot;

use add_voter_key::TxAddVoterKey;
use create_voting::TxCreateVoting;
use decrypt_ballot::TxDecryptBallot;
use finalize_voting::TxFinalizeVoting;
use finalize_voting_with_results::TxFinalizeVotingWithResults;
use issue_ballot::TxIssueBallot;
use publish_decryption_key::TxPublishDecryptionKey;
use register_voters::TxRegisterVoters;
use revoke_voter_participation::TxRevokeVoterParticipation;
use stop_registration::TxStopRegistration;
use stop_voting::TxStopVoting;
use store_ballot::TxStoreBallot;

#[exonum_interface]
pub trait VotingsServiceInterface<Ctx> {
    type Output;

    #[interface_method(id = 0)]
    fn create_voting(&self, ctx: Ctx, tx_args: TxCreateVoting) -> Self::Output;

    #[interface_method(id = 1)]
    fn register_voters(&self, ctx: Ctx, tx_args: TxRegisterVoters) -> Self::Output;

    #[interface_method(id = 2)]
    fn stop_registration(&self, ctx: Ctx, tx_args: TxStopRegistration) -> Self::Output;

    #[interface_method(id = 3)]
    fn revoke_participation(&self, ctx: Ctx, tx_args: TxRevokeVoterParticipation) -> Self::Output;

    #[interface_method(id = 4)]
    fn issue_ballot(&self, ctx: Ctx, tx_args: TxIssueBallot) -> Self::Output;

    #[interface_method(id = 5)]
    fn add_voter_key(&self, ctx: Ctx, tx_args: TxAddVoterKey) -> Self::Output;

    #[interface_method(id = 6)]
    fn store_ballot(&self, ctx: Ctx, tx_args: TxStoreBallot) -> Self::Output;

    #[interface_method(id = 7)]
    fn stop_voting(&self, ctx: Ctx, tx_args: TxStopVoting) -> Self::Output;

    #[interface_method(id = 8)]
    fn publish_decryption_key(&self, ctx: Ctx, tx_args: TxPublishDecryptionKey) -> Self::Output;

    #[interface_method(id = 9)]
    fn decrypt_ballot(&self, ctx: Ctx, tx_args: TxDecryptBallot) -> Self::Output;

    #[interface_method(id = 10)]
    fn finalize_voting(&self, ctx: Ctx, tx_args: TxFinalizeVoting) -> Self::Output;

    #[interface_method(id = 11)]
    fn finalize_voting_with_results(
        &self,
        ctx: Ctx,
        tx_args: TxFinalizeVotingWithResults,
    ) -> Self::Output;
}

impl VotingsServiceInterface<ExecutionContext<'_>> for VotingsService {
    type Output = Result<(), ExecutionError>;

    fn create_voting(&self, ctx: ExecutionContext<'_>, tx_args: TxCreateVoting) -> Self::Output {
        TxCreateVoting::execute(&self, ctx, tx_args)
    }

    fn register_voters(
        &self,
        ctx: ExecutionContext<'_>,
        tx_args: TxRegisterVoters,
    ) -> Self::Output {
        TxRegisterVoters::execute(&self, ctx, tx_args)
    }

    fn stop_registration(
        &self,
        ctx: ExecutionContext<'_>,
        tx_args: TxStopRegistration,
    ) -> Self::Output {
        TxStopRegistration::execute(&self, ctx, tx_args)
    }

    fn revoke_participation(
        &self,
        ctx: ExecutionContext<'_>,
        tx_args: TxRevokeVoterParticipation,
    ) -> Self::Output {
        TxRevokeVoterParticipation::execute(&self, ctx, tx_args)
    }

    fn issue_ballot(&self, ctx: ExecutionContext<'_>, tx_args: TxIssueBallot) -> Self::Output {
        TxIssueBallot::execute(&self, ctx, tx_args)
    }

    fn add_voter_key(&self, ctx: ExecutionContext<'_>, tx_args: TxAddVoterKey) -> Self::Output {
        TxAddVoterKey::execute(&self, ctx, tx_args)
    }

    fn store_ballot(&self, ctx: ExecutionContext<'_>, tx_args: TxStoreBallot) -> Self::Output {
        TxStoreBallot::execute(&self, ctx, tx_args)
    }

    fn stop_voting(&self, ctx: ExecutionContext<'_>, tx_args: TxStopVoting) -> Self::Output {
        TxStopVoting::execute(&self, ctx, tx_args)
    }

    fn publish_decryption_key(
        &self,
        ctx: ExecutionContext<'_>,
        tx_args: TxPublishDecryptionKey,
    ) -> Self::Output {
        TxPublishDecryptionKey::execute(&self, ctx, tx_args)
    }

    fn decrypt_ballot(&self, ctx: ExecutionContext<'_>, tx_args: TxDecryptBallot) -> Self::Output {
        TxDecryptBallot::execute(&self, ctx, tx_args)
    }

    fn finalize_voting(
        &self,
        ctx: ExecutionContext<'_>,
        tx_args: TxFinalizeVoting,
    ) -> Self::Output {
        TxFinalizeVoting::execute(&self, ctx, tx_args)
    }

    fn finalize_voting_with_results(
        &self,
        ctx: ExecutionContext<'_>,
        tx_args: TxFinalizeVotingWithResults,
    ) -> Self::Output {
        TxFinalizeVotingWithResults::execute(&self, ctx, tx_args)
    }
}
