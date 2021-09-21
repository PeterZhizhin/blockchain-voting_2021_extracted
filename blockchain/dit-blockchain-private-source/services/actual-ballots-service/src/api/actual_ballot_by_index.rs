use exonum_rust_runtime::api::{self, ServiceApiState};

use crate::{
    errors::Error,
    schema::{ActualBallot, ActualBallotsStorage},
    variants::ballot_status::BallotStatus,
};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ActualBallotByIndexQuery {
    pub voting_id: String,
    pub actual_ballot_index: u32,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ActualBallotByIndexView {
    pub voter: String,
    pub district_id: u32,
    pub decrypted_choices: Vec<u32>,
    pub store_tx_hash: String,
    pub decrypt_tx_hash: String,
    pub status: BallotStatus,
}

impl From<ActualBallot> for ActualBallotByIndexView {
    fn from(ballot: ActualBallot) -> Self {
        Self {
            voter: ballot.voter,
            district_id: ballot.district_id,
            decrypted_choices: ballot.decrypted_choices,
            store_tx_hash: ballot.store_tx_hash,
            decrypt_tx_hash: ballot.decrypt_tx_hash,
            status: ballot.status,
        }
    }
}

pub async fn get_actual_ballot_by_index(
    state: ServiceApiState,
    query: ActualBallotByIndexQuery,
) -> api::Result<ActualBallotByIndexView> {
    let actual_ballots_storage = ActualBallotsStorage::get(state.service_data(), &query.voting_id)
        .ok_or_else(|| Error::VotingDoesNotExist)?;

    let actual_ballot = actual_ballots_storage
        .get_actual_ballot_by_index(query.actual_ballot_index)
        .map(|v| v.into())
        .ok_or_else(|| Error::BallotDoesNotExist)?;

    Ok(actual_ballot)
}
