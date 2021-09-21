use exonum::runtime::{ExecutionContext, ExecutionError};
use exonum_derive::{BinaryValue, ObjectHash};
use exonum_proto::ProtobufConvert;

use crate::{
    errors::Error,
    schema::{
      ServiceConfig,
      Voting,
      VotersRegistry,
    },
    service::VotingsService,
    enums::VotingState,
    proto,
};

#[derive(Serialize, Deserialize, Clone, Debug, ProtobufConvert, BinaryValue, ObjectHash)]
#[protobuf_convert(source = "proto::TxRegisterVoters")]
pub struct TxRegisterVoters {
  pub voting_id: String,
  pub voters: Vec<String>,
}

impl TxRegisterVoters {
    pub fn execute(
      _: &VotingsService,
      context: ExecutionContext<'_>,
      tx_args: TxRegisterVoters,
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

      if voting.get_state() != VotingState::Registration {
        Err(Error::ForbiddenForThisVotingState)?;
      }

      let mut voters_registry = VotersRegistry::get(context.service_data(), &tx_args.voting_id)
        .ok_or_else(|| Error::VotingDoesNotExist)?;
      voters_registry.register_voters(tx_args.voters.clone());

      Ok(())
    }
}
