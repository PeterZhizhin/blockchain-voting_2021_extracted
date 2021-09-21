use exonum::runtime::{ExecutionContext, ExecutionError};
use exonum_derive::{BinaryValue, ObjectHash};
use exonum_proto::ProtobufConvert;

use crate::{
    enums::VotingState,
    errors::Error,
    proto,
    schema::{BallotsStorage, ServiceConfig, Voting},
    service::VotingsService,
};

#[derive(Serialize, Deserialize, Clone, Debug, ProtobufConvert, BinaryValue, ObjectHash)]
#[protobuf_convert(source = "proto::TxFinalizeVoting")]
pub struct TxFinalizeVoting {
    pub voting_id: String,
    pub seed: u64,
}

impl TxFinalizeVoting {
    pub fn execute(
        _: &VotingsService,
        context: ExecutionContext<'_>,
        tx_args: TxFinalizeVoting,
    ) -> Result<(), ExecutionError> {
        let author_pk = context
            .caller()
            .author()
            .ok_or_else(|| Error::WrongTxInitiator)?;

        let service_data = context.service_data();
        let config = ServiceConfig::instantiate(service_data.clone());

        if !config.is_api_key(&author_pk.to_hex()) {
            Err(Error::AuthorNotAuthorized)?;
        }

        let mut voting = Voting::get(context.service_data(), &tx_args.voting_id)
            .ok_or_else(|| Error::VotingDoesNotExist)?;

        if voting.get_state() != VotingState::Stopped {
            Err(Error::ForbiddenForThisVotingState)?;
        }

        let mut ballots_storage = BallotsStorage::get(context.service_data(), &tx_args.voting_id)
            .ok_or_else(|| Error::VotingDoesNotExist)?;

        let stored_ballots_by_disrict_amount =
            ballots_storage.get_stored_ballots_amount_by_district();
        let stored_ballots_amount = stored_ballots_by_disrict_amount
            .values()
            .fold(0 as u32, |total, for_district| for_district + total);

        let decryption_stats = ballots_storage.get_decryption_statistics();
        let processed_ballots_amount =
            decryption_stats.decrypted_ballots_amount + decryption_stats.invalid_ballots_amount;

        if stored_ballots_amount != processed_ballots_amount {
            Err(Error::DecryptionIsNotFinished)?;
        }

        ballots_storage.tally_results();
        voting.change_state(VotingState::Finished);

        println!("Voting {} was finalized", tx_args.voting_id);
        Ok(())
    }
}
