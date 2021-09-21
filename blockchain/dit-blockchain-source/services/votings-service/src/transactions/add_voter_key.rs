use exonum::crypto::PublicKey;
use exonum::runtime::{ExecutionContext, ExecutionError};
use exonum_derive::{BinaryValue, ObjectHash};
use exonum_proto::ProtobufConvert;

use crate::{
    errors::Error,
    schema::{
      ServiceConfig,
      Voting,
      BallotsStorage,
    },
    service::VotingsService,
    enums::VotingState,
    proto,
};

#[derive(Serialize, Deserialize, Clone, Debug, ProtobufConvert, BinaryValue, ObjectHash)]
#[protobuf_convert(source = "proto::TxAddVoterKey")]
pub struct TxAddVoterKey {
  pub voting_id: String,
  pub voter_key: PublicKey,
}

impl TxAddVoterKey {
    pub fn execute(
      _: &VotingsService,
      context: ExecutionContext<'_>,
      tx_args: TxAddVoterKey,
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

      if voting.get_state() != VotingState::InProcess {
        Err(Error::ForbiddenForThisVotingState)?;
      }

      let mut ballots_storage = BallotsStorage::get(context.service_data(), &tx_args.voting_id)
        .ok_or_else(|| Error::VotingDoesNotExist)?;
      ballots_storage.add_voter_to_voters_list(tx_args.voter_key.clone());

      println!("Voter key {} added for voting {}", tx_args.voter_key, tx_args.voting_id);
      Ok(())
    }
}
