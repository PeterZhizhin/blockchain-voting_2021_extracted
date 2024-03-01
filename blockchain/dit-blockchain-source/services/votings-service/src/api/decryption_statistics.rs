use exonum_rust_runtime::api::{self, ServiceApiState};
use std::convert::From;

use crate::{
    enums::VotingState,
    errors::Error,
    schema::{BallotsStorage, DecryptionStatistics, Voting},
};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct DecryptionStatisticsQuery {
    pub voting_id: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct DecryptionStatisticsView {
    pub decrypted_ballots_amount: u32,
    pub invalid_ballots_amount: u32,
}

impl From<DecryptionStatistics> for DecryptionStatisticsView {
    fn from(stats: DecryptionStatistics) -> Self {
        Self {
            decrypted_ballots_amount: stats.decrypted_ballots_amount,
            invalid_ballots_amount: stats.invalid_ballots_amount,
        }
    }
}

pub async fn get_decryption_statistics(
    state: ServiceApiState,
    query: DecryptionStatisticsQuery,
) -> api::Result<DecryptionStatisticsView> {
    let voting = Voting::get(state.service_data(), &query.voting_id)
        .ok_or_else(|| Error::VotingDoesNotExist)?;

    if voting.get_state() < VotingState::Stopped {
        Err(Error::ForbiddenForThisVotingState)?;
    }

    let ballots_storage = BallotsStorage::get(state.service_data(), &query.voting_id)
        .ok_or_else(|| Error::VotingDoesNotExist)?;

    Ok(ballots_storage.get_decryption_statistics().into())
}
