use exonum_rust_runtime::api::{self, ServiceApiState};

use crate::{
  errors::Error,
  schema::{
    Voting,
    BallotConfig,
  },
};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct BallotsConfigQuery {
  pub voting_id: String,
}

pub async fn get_ballots_config(
  state: ServiceApiState,
  query: BallotsConfigQuery,
) -> api::Result<Vec<BallotConfig>> {
  let voting = Voting::get(state.service_data(), &query.voting_id)
    .ok_or_else(|| Error::VotingDoesNotExist)?;

  Ok(voting.get_ballots_config().values().map(|v| v.clone()).collect())
}
