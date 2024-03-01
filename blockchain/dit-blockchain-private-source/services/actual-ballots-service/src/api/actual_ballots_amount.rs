use exonum_rust_runtime::api::{self, ServiceApiState};

use crate::{errors::Error, schema::ActualBallotsStorage};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ActualBallotsAmountQuery {
    pub voting_id: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ActualBallotsAmountView {
    pub actual_ballots_amount: u32,
}

pub async fn get_actual_ballots_amount(
    state: ServiceApiState,
    query: ActualBallotsAmountQuery,
) -> api::Result<ActualBallotsAmountView> {
    let actual_ballots_storage = ActualBallotsStorage::get(state.service_data(), &query.voting_id)
        .ok_or_else(|| Error::VotingDoesNotExist)?;

    Ok({
        ActualBallotsAmountView {
            actual_ballots_amount: actual_ballots_storage.get_actual_ballots_amount(),
        }
    })
}
