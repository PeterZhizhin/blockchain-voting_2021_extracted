use std::convert::{Into};

use exonum::runtime::{ExecutionContext, ExecutionError};
use exonum_derive::{BinaryValue, ObjectHash};
use exonum_proto::ProtobufConvert;

use crate::{
    errors::Error,
    schema::{
      ActualBallotsStorage,
      ServiceConfig,
    },
    service::ActualBallotsService,
    proto,
};

#[derive(Serialize, Deserialize, Clone, Debug, ProtobufConvert, BinaryValue, ObjectHash)]
#[protobuf_convert(source = "proto::TxTallyResults")]
pub struct TxTallyResults {
  pub voting_id: String,
  pub seed: u64,
}

impl TxTallyResults {
    pub fn execute(
      _: &ActualBallotsService,
      context: ExecutionContext<'_>,
      tx_args: TxTallyResults,
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

      // @TODO Check state (all deciphered?)

      let mut actual_ballots_storage = ActualBallotsStorage::get(
        context.service_data(), &tx_args.voting_id
      ).ok_or_else(|| Error::VotingDoesNotExist)?;

      actual_ballots_storage.tally_results();

      println!("Voting results {} was counted", tx_args.voting_id);
      Ok(())
    }
}
