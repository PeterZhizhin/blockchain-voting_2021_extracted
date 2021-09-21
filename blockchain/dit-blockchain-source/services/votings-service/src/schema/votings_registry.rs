use exonum_merkledb::{
  access::{Access, AccessError, FromAccess, RawAccessMut},
  IndexAddress, ListIndex,
};

#[derive(Debug)]
pub struct VotingsRegistry<T: Access> {
  access: T,
  votings_ids: ListIndex<T::Base, String>,
}

impl<T: Access> FromAccess<T> for VotingsRegistry<T> {
  fn from_access(access: T, _: IndexAddress) -> Result<Self, AccessError> {
    let votings_ids = ListIndex::from_access(
      access.clone(),
      IndexAddress::from_root("votings_registry").append_name("votings_ids"),
    )?;

    Ok(Self {
      access,
      votings_ids,
    })
  }
}

impl<T: Access> VotingsRegistry<T> {
  pub fn instantiate(access: T) -> Self {
    Self::from_root(access).unwrap()
  }

  pub fn get_votings_ids(&self) -> Vec<String> {
    self.votings_ids.iter().collect()
  }
}

impl<T: Access> VotingsRegistry<T>
where
  T::Base: RawAccessMut,
{
  pub fn register_voting(&mut self, voting_id: String) {
    self.votings_ids.push(voting_id.clone());
  }
}
