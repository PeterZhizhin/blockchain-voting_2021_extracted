use exonum_rust_runtime::api::{self, ServiceApiState};

use crate::{
  errors::Error,
  schema::{
    ActualBallotsStorage,
  },
};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct GroupedTxHashesAmountQuery {
  pub voting_id: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct GroupedTxHashesAmountView {
  pub grouped_tx_hashes_amount: u32,
}

pub async fn get_grouped_tx_hashes_amount(
  state: ServiceApiState,
  query: GroupedTxHashesAmountQuery,
) -> api::Result<GroupedTxHashesAmountView> {
  let actual_ballots_storage = ActualBallotsStorage::get(state.service_data(), &query.voting_id)
    .ok_or_else(|| Error::VotingDoesNotExist)?;

  Ok({
    GroupedTxHashesAmountView {
      grouped_tx_hashes_amount: actual_ballots_storage.get_grouped_tx_hashes_amount(),
    }
  })
}
