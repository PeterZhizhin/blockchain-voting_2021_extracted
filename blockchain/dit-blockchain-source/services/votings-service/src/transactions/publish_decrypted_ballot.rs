use exonum::crypto::Hash;
use exonum::runtime::{ExecutionContext, ExecutionError};
use exonum_derive::{BinaryValue, ObjectHash};
use exonum_proto::ProtobufConvert;

use crate::{
    enums::{InvalidReason, VotingState},
    errors::Error,
    proto,
    schema::{BallotsStorage, ServiceConfig, Voting},
    service::VotingsService,
    variants::ballot_status::BallotStatus,
};

#[derive(Serialize, Deserialize, Clone, Debug, ProtobufConvert, BinaryValue, ObjectHash)]
#[protobuf_convert(source = "proto::TxPublishDecryptedBallot")]
pub struct TxPublishDecryptedBallot {
    pub voting_id: String,
    pub ballot_index: u32,
    pub is_invalid: bool,
    pub decrypted_choices: Vec<u32>,
    pub seed: u64,
}

impl TxPublishDecryptedBallot {
    pub fn execute(
        _: &VotingsService,
        context: ExecutionContext<'_>,
        tx_args: TxPublishDecryptedBallot,
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

        let voting = Voting::get(context.service_data(), &tx_args.voting_id)
            .ok_or_else(|| Error::VotingDoesNotExist)?;

        if voting.get_state() != VotingState::Stopped {
            Err(Error::ForbiddenForThisVotingState)?;
        }

        let mut ballots_storage = BallotsStorage::get(context.service_data(), &tx_args.voting_id)
            .ok_or_else(|| Error::VotingDoesNotExist)?;

        let ballot = ballots_storage
            .get_ballot_by_index(tx_args.ballot_index)
            .ok_or_else(|| Error::BallotDoesNotExist)?;

        if ballot.status == BallotStatus::Invalid(InvalidReason::WrongDistrict) {
            println!(
                "Ballot for voting {} with index {} is invalid (Wrong district)",
                tx_args.voting_id, tx_args.ballot_index
            );
            return Ok(());
        }

        if ballot.decrypted_choices.is_some() || ballot.status != BallotStatus::Unknown {
            println!(
                "Ballot for voting {} with index {} was already decrypted",
                tx_args.voting_id, tx_args.ballot_index
            );
            return Ok(());
        }

        let ballots_config = voting.get_ballots_config();

        let ballot_config = ballots_config.get(&ballot.district_id).unwrap();

        let options: Vec<u32> = ballot_config.options.keys().map(|i| i.clone()).collect();

        let tx_hash: Hash = context
            .transaction_hash()
            .ok_or_else(|| Error::WrongTxInitiator)?;

        ballots_storage
            .publish_decrypted_ballot(
                tx_args.ballot_index,
                &tx_args.decrypted_choices,
                tx_args.is_invalid,
                tx_hash,
                &options,
                ballot_config.min_choices,
                ballot_config.max_choices,
            )
            .or_else(|_| Err(Error::BallotDecryptionResultCannotBePublished))?;

        println!(
            "Ballot for voting {} with index {} was decrypted",
            tx_args.voting_id, tx_args.ballot_index
        );
        Ok(())
    }
}
