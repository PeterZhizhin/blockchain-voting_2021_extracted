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
#[protobuf_convert(source = "proto::TxRevokeVoterParticipation")]
pub struct TxRevokeVoterParticipation {
  pub voting_id: String,
  pub voter_id: String,
  pub seed: u64,
}

impl TxRevokeVoterParticipation {
    pub fn execute(
      _: &VotingsService,
      context: ExecutionContext<'_>,
      tx_args: TxRevokeVoterParticipation,
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

      if voting.get_state() > VotingState::InProcess {
        Err(Error::ForbiddenForThisVotingState)?;
      }

      let mut voters_registry = VotersRegistry::get(context.service_data(), &tx_args.voting_id)
        .ok_or_else(|| Error::VotingDoesNotExist)?;
      voters_registry.revoke_participation(tx_args.voter_id.clone())
        .or_else(|_| Err(Error::ParticipationCannotBeRevoked))?;

      println!("Participation in voting {} revoked for voter {}", tx_args.voting_id, tx_args.voter_id);
      Ok(())
    }
}
