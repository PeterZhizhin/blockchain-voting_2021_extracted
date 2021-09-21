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
#[protobuf_convert(source = "proto::TxStoreGroupedTxHash")]
pub struct TxStoreGroupedTxHash {
  pub voting_id: String,
  pub store_tx_hash: String,
  pub encrypted_group_id: String,
  pub ts: i64,
}

impl TxStoreGroupedTxHash {
    pub fn execute(
      _: &ActualBallotsService,
      context: ExecutionContext<'_>,
      tx_args: TxStoreGroupedTxHash,
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

      let mut actual_ballots_storage = ActualBallotsStorage::get(
        context.service_data(),
        &tx_args.voting_id,
      ).ok_or_else(|| Error::VotingDoesNotExist)?;

      actual_ballots_storage.store_grouped_tx_hash(
        tx_args.store_tx_hash.clone(),
        tx_args.encrypted_group_id.clone(),
        tx_args.ts,
      ).or_else(|_| Err(Error::GroupedTxHashCannotBeStored))?;

      println!("Grouped tx hash {} stored for voting {}", tx_args.store_tx_hash, tx_args.voting_id);
      Ok(())
    }
}
