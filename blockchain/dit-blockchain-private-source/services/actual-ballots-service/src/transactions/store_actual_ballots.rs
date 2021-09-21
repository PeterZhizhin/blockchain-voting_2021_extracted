use std::convert::Into;

use exonum::runtime::{ExecutionContext, ExecutionError};
use exonum_derive::{BinaryValue, ObjectHash};
use exonum_proto::ProtobufConvert;

use crate::{
    errors::Error,
    proto,
    schema::{ActualBallot, ActualBallotsStorage, ServiceConfig},
    service::ActualBallotsService,
    variants::ballot_status::BallotStatus,
};

#[derive(Serialize, Deserialize, Clone, Debug, ProtobufConvert, BinaryValue, ObjectHash)]
#[protobuf_convert(source = "proto::TxActualBallot")]
pub struct TxActualBallot {
    pub voter: String,
    pub district_id: u32,
    pub decrypted_choices: Vec<u32>,
    pub store_tx_hash: String,
    pub decrypt_tx_hash: String,
    pub status: BallotStatus,
}

impl Into<ActualBallot> for TxActualBallot {
    fn into(self) -> ActualBallot {
        ActualBallot {
            voter: self.voter,
            district_id: self.district_id,
            decrypted_choices: self.decrypted_choices,
            store_tx_hash: self.store_tx_hash,
            decrypt_tx_hash: self.decrypt_tx_hash,
            status: self.status,
        }
    }
}

#[derive(Serialize, Deserialize, Clone, Debug, ProtobufConvert, BinaryValue, ObjectHash)]
#[protobuf_convert(source = "proto::TxStoreActualBallots")]
pub struct TxStoreActualBallots {
    pub voting_id: String,
    pub actual_ballots: Vec<TxActualBallot>,
}

impl TxStoreActualBallots {
    pub fn execute(
        _: &ActualBallotsService,
        context: ExecutionContext<'_>,
        tx_args: TxStoreActualBallots,
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
            .store_actual_ballots(
                tx_args
                    .actual_ballots
                    .iter()
                    .map(|v| v.clone().into())
                    .collect(),
            )
            .or_else(|_| Err(Error::BallotCannotBeStored))?;

        println!(
            "{} actual ballots stored for voting {}",
            tx_args.actual_ballots.len(),
            tx_args.voting_id
        );
        Ok(())
    }
}
