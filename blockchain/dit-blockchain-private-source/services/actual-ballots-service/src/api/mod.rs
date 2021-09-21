use exonum_rust_runtime::api::ServiceApiBuilder;

mod grouped_tx_hashes_amount;
mod encrypted_group_ids;
mod actual_ballots_amount;
mod copied_ballots_amount;
mod actual_ballots_hashes;
mod actual_ballot_by_index;
mod actual_ballot_by_store_tx_hash;
mod voting_results;

use grouped_tx_hashes_amount::get_grouped_tx_hashes_amount;
use encrypted_group_ids::get_encrypted_group_ids;
use actual_ballots_amount::get_actual_ballots_amount;
use copied_ballots_amount::get_copied_ballots_amount;
use actual_ballots_hashes::get_actual_ballots_hashes;
use actual_ballot_by_index::get_actual_ballot_by_index;
use actual_ballot_by_store_tx_hash::get_actual_ballot_by_store_tx_hash;
use voting_results::get_voting_results;

#[derive(Debug, Clone, Copy)]
pub struct PublicApi;

#[derive(Debug, Clone, Copy)]
pub struct PrivateApi;

impl PublicApi {
  pub fn wire(builder: &mut ServiceApiBuilder) {
      builder
          .public_scope()
          .endpoint("v1/grouped-tx-hashes-amount", get_grouped_tx_hashes_amount)
          .endpoint("v1/encrypted-group-ids", get_encrypted_group_ids)
          .endpoint("v1/actual-ballots-amount", get_actual_ballots_amount)
          .endpoint("v1/copied-ballots-amount", get_copied_ballots_amount)
          .endpoint("v1/actual-ballots-hashes", get_actual_ballots_hashes)
          .endpoint("v1/actual-ballot-by-store-tx-hash", get_actual_ballot_by_store_tx_hash)
          .endpoint("v1/actual-ballot-by-index", get_actual_ballot_by_index)
          .endpoint("v1/voting-results", get_voting_results);
  }
}

impl PrivateApi {
  pub fn wire(builder: &mut ServiceApiBuilder) {
      builder
          .private_scope();
  }
}