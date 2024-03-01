use exonum_rust_runtime::api::{self, ServiceApiState};
use std::collections::HashMap;

use crate::{
    errors::Error,
    schema::{VotersRegistry, Voting},
};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct IssuedBallotsAmountQuery {
    pub voting_id: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct IssuedBallotsAmountView {
    pub issued_ballots_amount: HashMap<u32, u32>,
}

pub async fn get_issued_ballots_amount(
    state: ServiceApiState,
    query: IssuedBallotsAmountQuery,
) -> api::Result<IssuedBallotsAmountView> {
    Voting::get(state.service_data(), &query.voting_id).ok_or_else(|| Error::VotingDoesNotExist)?;

    let voters_registry = VotersRegistry::get(state.service_data(), &query.voting_id)
        .ok_or_else(|| Error::VotingDoesNotExist)?;

    // TODO: map through all available districts & set zeroes where no ballots.
    // Maybe do it in VotersRegistry
    Ok({
        IssuedBallotsAmountView {
            issued_ballots_amount: voters_registry.get_issued_ballots_amount(),
        }
    })
}
