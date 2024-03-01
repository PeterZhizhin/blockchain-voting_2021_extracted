use exonum::runtime::{ExecutionContext, ExecutionError};
use exonum_derive::{BinaryValue, ObjectHash};
use exonum_proto::ProtobufConvert;

use crate::{
    enums::VotingState,
    errors::Error,
    proto,
    schema::{ServiceConfig, Voting},
    service::VotingsService,
};

#[derive(Serialize, Deserialize, Clone, Debug, ProtobufConvert, BinaryValue, ObjectHash)]
#[protobuf_convert(source = "proto::TxStopVoting")]
pub struct TxStopVoting {
    pub voting_id: String,
    pub seed: u64,
}

impl TxStopVoting {
    pub fn execute(
        _: &VotingsService,
        context: ExecutionContext<'_>,
        tx_args: TxStopVoting,
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

        if voting.get_state() != VotingState::InProcess {
            Err(Error::ForbiddenForThisVotingState)?;
        }

        voting.change_state(VotingState::Stopped);

        println!("Voting {} was stopped", tx_args.voting_id);
        Ok(())
    }
}
