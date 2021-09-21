use exonum_rust_runtime::api::{self, ServiceApiState};

use crate::{
  errors::Error,
  schema::{
    Voting,
  },
};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct VotingRevoteEnabledQuery {
  pub voting_id: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct VotingRevoteEnabledView {
  pub revote_enabled: bool,
}

pub async fn is_revote_enabled(
  state: ServiceApiState,
  query: VotingRevoteEnabledQuery,
) -> api::Result<VotingRevoteEnabledView> {
  let voting = Voting::get(state.service_data(), &query.voting_id)
    .ok_or_else(|| Error::VotingDoesNotExist)?;

  let revote_enabled = voting.is_revote_enabled();

  Ok(VotingRevoteEnabledView {
    revote_enabled,
  })
}
