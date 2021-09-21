use exonum_rust_runtime::api::{self, ServiceApiState};
use std::collections::HashMap;

use crate::{
    errors::Error,
    schema::{BallotsStorage, Voting},
};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct StoredBallotsAmountQuery {
    pub voting_id: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct StoredBallotsAmountView {
    pub stored_ballots_amount_by_district: HashMap<u32, u32>,
}

pub async fn get_stored_ballots_amount_by_district(
    state: ServiceApiState,
    query: StoredBallotsAmountQuery,
) -> api::Result<StoredBallotsAmountView> {
    Voting::get(state.service_data(), &query.voting_id).ok_or_else(|| Error::VotingDoesNotExist)?;

    let ballots_storage = BallotsStorage::get(state.service_data(), &query.voting_id)
        .ok_or_else(|| Error::VotingDoesNotExist)?;

    Ok({
        StoredBallotsAmountView {
            stored_ballots_amount_by_district: ballots_storage
                .get_stored_ballots_amount_by_district(),
        }
    })
}
