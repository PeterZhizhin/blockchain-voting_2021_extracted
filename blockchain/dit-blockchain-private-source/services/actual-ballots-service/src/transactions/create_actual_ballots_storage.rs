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
#[protobuf_convert(source = "proto::TxCreateActualBallotsStorage")]
pub struct TxCreateActualBallotsStorage {
    pub voting_id: String,
}

impl TxCreateActualBallotsStorage {
    pub fn execute(
        _: &ActualBallotsService,
        context: ExecutionContext<'_>,
        tx_args: TxCreateActualBallotsStorage,
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

        ActualBallotsStorage::create(context.service_data(), &tx_args.voting_id).ok();

        println!("Actual Ballots Storage was created");
        Ok(())
    }
}
