use std::collections::HashMap;
use exonum_rust_runtime::api::{self, ServiceApiState};

use crate::{
  errors::Error,
  schema::{
    ActualBallotsStorage,
  },
};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct EncryptedGroupIdsQuery {
  pub voting_id: String,
  pub from: u32,
  pub limit: u32,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct EncryptedGroupIdsView {
  pub encrypted_group_ids: HashMap<String, String>,
}

pub async fn get_encrypted_group_ids(
  state: ServiceApiState,
  query: EncryptedGroupIdsQuery,
) -> api::Result<EncryptedGroupIdsView> {
  let actual_ballots_storage = ActualBallotsStorage::get(state.service_data(), &query.voting_id)
    .ok_or_else(|| Error::VotingDoesNotExist)?;

  let encrypted_group_ids = actual_ballots_storage.get_encrypted_group_ids(query.from, query.limit);

  Ok(EncryptedGroupIdsView {
    encrypted_group_ids,
  })
}
