use std::collections::HashMap;

use exonum::runtime::{ExecutionContext, ExecutionError};
use exonum_derive::{BinaryValue, ObjectHash};
use exonum_proto::ProtobufConvert;

use crate::{
    errors::Error,
    proto,
    schema::{ActualBallotsStorage, ServiceConfig},
    service::ActualBallotsService,
};

#[derive(Serialize, Deserialize, Clone, Debug, ProtobufConvert, BinaryValue, ObjectHash)]
#[protobuf_convert(source = "proto::TxResolveGroupIds")]
pub struct TxResolveGroupIds {
    pub voting_id: String,
    pub resolved_group_ids: HashMap<String, String>,
}

impl TxResolveGroupIds {
    pub fn execute(
        _: &ActualBallotsService,
        context: ExecutionContext<'_>,
        tx_args: TxResolveGroupIds,
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

        let mut actual_ballots_storage =
            ActualBallotsStorage::get(context.service_data(), &tx_args.voting_id)
                .ok_or_else(|| Error::VotingDoesNotExist)?;

        actual_ballots_storage
            .resolve_group_ids(tx_args.resolved_group_ids)
            .or_else(|_| Err(Error::GroupedTxHashCannotBeStored))?;

        println!("Group ids was resolved");
        Ok(())
    }
}
