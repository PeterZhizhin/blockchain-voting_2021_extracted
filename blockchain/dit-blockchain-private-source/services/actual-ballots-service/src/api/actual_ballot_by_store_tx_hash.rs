use exonum_rust_runtime::api::{self, ServiceApiState};

use crate::{
    errors::Error,
    schema::{ActualBallot, ActualBallotsStorage},
    variants::ballot_status::BallotStatus,
};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ActualBallotByStoreTxHashQuery {
    pub voting_id: String,
    pub store_tx_hash: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ActualBallotByStoreTxHashView {
    pub voter: String,
    pub district_id: u32,
    pub decrypted_choices: Vec<u32>,
    pub store_tx_hash: String,
    pub decrypt_tx_hash: String,
    pub status: BallotStatus,
}

impl From<ActualBallot> for ActualBallotByStoreTxHashView {
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

pub async fn get_actual_ballot_by_store_tx_hash(
    state: ServiceApiState,
    query: ActualBallotByStoreTxHashQuery,
) -> api::Result<ActualBallotByStoreTxHashView> {
    let actual_ballots_storage = ActualBallotsStorage::get(state.service_data(), &query.voting_id)
        .ok_or_else(|| Error::VotingDoesNotExist)?;

    let actual_ballot = actual_ballots_storage
        .get_actual_ballot_by_store_tx_hash(query.store_tx_hash)
        .map(|v| v.into())
        .ok_or_else(|| Error::BallotDoesNotExist)?;

    Ok(actual_ballot)
}
