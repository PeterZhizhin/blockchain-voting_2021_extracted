use exonum_rust_runtime::api::{self, ServiceApiState};

use crate::{
    errors::Error,
    schema::{VotersRegistry, Voting},
};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct RegisteredVotersAmountQuery {
    pub voting_id: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct RegisteredVotersAmountView {
    pub registered_voters_amount: u32,
}

pub async fn get_registered_voters_amount(
    state: ServiceApiState,
    query: RegisteredVotersAmountQuery,
) -> api::Result<RegisteredVotersAmountView> {
    Voting::get(state.service_data(), &query.voting_id).ok_or_else(|| Error::VotingDoesNotExist)?;

    let voters_registry = VotersRegistry::get(state.service_data(), &query.voting_id)
        .ok_or_else(|| Error::VotingDoesNotExist)?;

    Ok({
        RegisteredVotersAmountView {
            registered_voters_amount: voters_registry.get_voters_amount(),
        }
    })
}
