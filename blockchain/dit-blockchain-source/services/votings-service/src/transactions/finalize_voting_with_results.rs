use exonum::runtime::{ExecutionContext, ExecutionError};
use exonum_derive::{BinaryValue, ObjectHash};
use exonum_proto::ProtobufConvert;
use std::collections::HashMap;

use crate::{
    enums::VotingState,
    errors::Error,
    proto,
    schema::{BallotsStorage, DistrictResults, ServiceConfig, Voting, VotingResults},
    service::VotingsService,
};

#[derive(Serialize, Deserialize, Clone, Debug, ProtobufConvert, BinaryValue, ObjectHash)]
#[protobuf_convert(source = "proto::TxDistrictResults")]
pub struct TxDistrictResults {
    pub district_id: u32,
    pub tally: HashMap<u32, u32>,
    pub invalid_ballots_amount: u32,
    pub unique_valid_ballots_amount: u32,
}

impl Into<DistrictResults> for TxDistrictResults {
    fn into(self) -> DistrictResults {
        DistrictResults {
            district_id: self.district_id,
            tally: self.tally,
            invalid_ballots_amount: self.invalid_ballots_amount,
            unique_valid_ballots_amount: self.unique_valid_ballots_amount,
        }
    }
}

#[derive(Serialize, Deserialize, Clone, Debug, ProtobufConvert, BinaryValue, ObjectHash)]
#[protobuf_convert(source = "proto::TxVotingResults")]
pub struct TxVotingResults {
    pub district_results: HashMap<u32, TxDistrictResults>,
    pub invalid_ballots_amount: u32,
    pub unique_valid_ballots_amount: u32,
}

impl Into<VotingResults> for TxVotingResults {
    fn into(self) -> VotingResults {
        VotingResults {
            district_results: self.district_results.iter().fold(
                HashMap::new(),
                |mut map, (id, res)| {
                    map.insert(*id, res.clone().into());
                    map
                },
            ),
            invalid_ballots_amount: self.invalid_ballots_amount,
            unique_valid_ballots_amount: self.unique_valid_ballots_amount,
        }
    }
}

#[derive(Serialize, Deserialize, Clone, Debug, ProtobufConvert, BinaryValue, ObjectHash)]
#[protobuf_convert(source = "proto::TxFinalizeVotingWithResults")]
pub struct TxFinalizeVotingWithResults {
    pub voting_id: String,
    pub seed: u64,
    pub results: TxVotingResults,
}

impl TxFinalizeVotingWithResults {
    pub fn execute(
        _: &VotingsService,
        context: ExecutionContext<'_>,
        tx_args: TxFinalizeVotingWithResults,
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

        if voting.get_state() != VotingState::Stopped {
            Err(Error::ForbiddenForThisVotingState)?;
        }

        let mut ballots_storage = BallotsStorage::get(context.service_data(), &tx_args.voting_id)
            .ok_or_else(|| Error::VotingDoesNotExist)?;

        let stored_ballots_by_disrict_amount =
            ballots_storage.get_stored_ballots_amount_by_district();
        let stored_ballots_amount = stored_ballots_by_disrict_amount
            .values()
            .fold(0 as u32, |total, for_district| for_district + total);

        let decryption_stats = ballots_storage.get_decryption_statistics();
        let processed_ballots_amount =
            decryption_stats.decrypted_ballots_amount + decryption_stats.invalid_ballots_amount;

        if stored_ballots_amount != processed_ballots_amount {
            Err(Error::DecryptionIsNotFinished)?;
        }

        ballots_storage.publish_results(tx_args.results.clone().into())?;

        voting.change_state(VotingState::Finished);

        println!("Voting {} was finalized", tx_args.voting_id);
        Ok(())
    }
}
