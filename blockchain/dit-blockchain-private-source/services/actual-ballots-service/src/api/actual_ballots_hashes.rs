use exonum_rust_runtime::api::{self, ServiceApiState};

use crate::{
  errors::Error,
  schema::{
    ActualBallotsStorage,
  },
};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ActualBallotsHashesQuery {
  pub voting_id: String,
  pub from: u32,
  pub limit: u32,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ActualBallotsHashesView {
  pub actual_ballots_hashes: Vec<String>,
}

pub async fn get_actual_ballots_hashes(
  state: ServiceApiState,
  query: ActualBallotsHashesQuery,
) -> api::Result<ActualBallotsHashesView> {
  let actual_ballots_storage = ActualBallotsStorage::get(state.service_data(), &query.voting_id)
    .ok_or_else(|| Error::VotingDoesNotExist)?;

  Ok({
    ActualBallotsHashesView {
      actual_ballots_hashes: actual_ballots_storage.get_actual_ballots_hashes(query.from, query.limit),
    }
  })
}
