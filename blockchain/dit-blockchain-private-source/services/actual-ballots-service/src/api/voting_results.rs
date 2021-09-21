use exonum_rust_runtime::api::{self, ServiceApiState};
use std::collections::HashMap;
use std::convert::From;

use crate::{
    errors::Error,
    schema::{ActualBallotsStorage, DistrictResults, VotingResults},
};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct VotingResultsQuery {
    pub voting_id: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct DistrictResultsView {
    pub district_id: u32,
    pub tally: HashMap<u32, u32>,
    pub invalid_ballots_amount: u32,
    pub unique_valid_ballots_amount: u32,
}

impl From<DistrictResults> for DistrictResultsView {
    fn from(results: DistrictResults) -> Self {
        Self {
            district_id: results.district_id,
            tally: results.tally,
            invalid_ballots_amount: results.invalid_ballots_amount,
            unique_valid_ballots_amount: results.unique_valid_ballots_amount,
        }
    }
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct VotingResultsView {
    pub district_results: HashMap<u32, DistrictResultsView>,
    pub invalid_ballots_amount: u32,
    pub unique_valid_ballots_amount: u32,
}

impl From<VotingResults> for VotingResultsView {
    fn from(results: VotingResults) -> Self {
        Self {
            district_results: results.district_results.iter().fold(
                HashMap::new(),
                |mut map, (id, res)| {
                    map.insert(*id, res.clone().into());
                    map
                },
            ),
            invalid_ballots_amount: results.invalid_ballots_amount,
            unique_valid_ballots_amount: results.unique_valid_ballots_amount,
        }
    }
}

pub async fn get_voting_results(
    state: ServiceApiState,
    query: VotingResultsQuery,
) -> api::Result<VotingResultsView> {
    let actual_ballots_storage = ActualBallotsStorage::get(state.service_data(), &query.voting_id)
        .ok_or_else(|| Error::VotingDoesNotExist)?;
    let voting_results = actual_ballots_storage.get_voting_results();

    Ok(voting_results.into())
}
