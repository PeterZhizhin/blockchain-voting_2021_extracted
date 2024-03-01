use exonum_rust_runtime::api::{self, ServiceApiState};

use crate::{errors::Error, schema::ActualBallotsStorage};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct CopiedBallotsAmountQuery {
    pub voting_id: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct CopiedBallotsAmountView {
    pub copied_ballots_amount: u64,
}

pub async fn get_copied_ballots_amount(
    state: ServiceApiState,
    query: CopiedBallotsAmountQuery,
) -> api::Result<CopiedBallotsAmountView> {
    let actual_ballots_storage = ActualBallotsStorage::get(state.service_data(), &query.voting_id)
        .ok_or_else(|| Error::VotingDoesNotExist)?;

    Ok({
        CopiedBallotsAmountView {
            copied_ballots_amount: actual_ballots_storage.get_copied_ballots_amount(),
        }
    })
}
