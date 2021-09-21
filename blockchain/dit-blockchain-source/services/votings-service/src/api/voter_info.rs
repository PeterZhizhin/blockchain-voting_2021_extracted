use std::convert::From;
use exonum_rust_runtime::api::{self, ServiceApiState};

use crate::{
  errors::Error,
  schema::{
    Voting,
    VotersRegistry,
    Voter,
  },
};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct VoterInfoQuery {
  pub voting_id: String,
  pub voter_id: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct VoterInfoView {
  pub voter_id: String,
  pub is_participation_revoked: bool,
  pub ballot_issuing_district: Option<u32>, 
}

impl From<Voter> for VoterInfoView {
  fn from(voter: Voter) -> Self {
    Self {
      voter_id: voter.voter_id,
      is_participation_revoked: voter.is_participation_revoked,
      ballot_issuing_district: match voter.ballot_issuing_district {
        0 => None,
        district_id => Some(district_id),
      },
    }
  }
}

pub async fn get_voter_info(
  state: ServiceApiState,
  query: VoterInfoQuery,
) -> api::Result<VoterInfoView> {
  Voting::get(state.service_data(), &query.voting_id)
    .ok_or_else(|| Error::VotingDoesNotExist)?;

  let voters_registry = VotersRegistry::get(state.service_data(), &query.voting_id)
    .ok_or_else(|| Error::VotingDoesNotExist)?;

  let voter_info = voters_registry.get_voter_info(query.voter_id)
    .map(|v| v.into())
    .ok_or_else(|| Error::VoterNotFound)?;

  Ok(voter_info)
}
