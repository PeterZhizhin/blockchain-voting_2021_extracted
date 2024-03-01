use exonum_rust_runtime::api::{self, ServiceApiState};

use crate::{enums::VotingState, errors::Error, schema::Voting};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct VotingStateQuery {
    pub voting_id: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct VotingStateView {
    pub state: String,
}

pub async fn get_voting_state(
    state: ServiceApiState,
    query: VotingStateQuery,
) -> api::Result<VotingStateView> {
    let voting = Voting::get(state.service_data(), &query.voting_id)
        .ok_or_else(|| Error::VotingDoesNotExist)?;

    let voting_state = voting.get_state();

    Ok(VotingStateView {
        state: match voting_state {
            VotingState::Registration => "Registration".to_owned(),
            VotingState::InProcess => "InProcess".to_owned(),
            VotingState::Stopped => "Stopped".to_owned(),
            VotingState::Finished => "Finished".to_owned(),
        },
    })
}
