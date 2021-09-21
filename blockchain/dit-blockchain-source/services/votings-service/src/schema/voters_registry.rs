
use std::collections::HashMap;
use exonum_derive::{BinaryValue, ObjectHash};
use exonum_merkledb::{
  access::{Access, AccessError, FromAccess, RawAccessMut},
  Entry, Group, IndexAddress, MapIndex,
};
use exonum_proto::ProtobufConvert;

use crate::{
  errors::Error,
  proto,
};

#[derive(Clone, Debug, ProtobufConvert, BinaryValue, ObjectHash)]
#[protobuf_convert(source = "proto::Voter", serde_pb_convert)]
pub struct Voter {
  pub voter_id: String,
  pub is_participation_revoked: bool,
  pub ballot_issuing_district: u32, // 0 means ballot was not issued, district id cannot be 0
}

impl Voter {
  pub fn create(voter_id: String) -> Self {
    Self {
      voter_id,
      is_participation_revoked: false,
      ballot_issuing_district: 0,
    }
  }
}

#[derive(Clone, Debug, ProtobufConvert, BinaryValue, ObjectHash)]
#[protobuf_convert(source = "proto::VotersRegistry", serde_pb_convert)]
pub struct VotersRegistrySchema {
  voting_id: String,
  voters_amount: u32,
  issued_ballots_counter: HashMap<u32, u32>,
}

#[derive(Debug)]
pub struct VotersRegistry<T: Access> {
  access: T,
  storage: Entry<T::Base, VotersRegistrySchema>,
  voting_id: String,
  voters_amount: u32,
  issued_ballots_counter: HashMap<u32, u32>,
  voters_list: MapIndex<T::Base, String, Voter>,
}

impl<T: Access> VotersRegistry<T> {
  pub fn get(access: T, voting_id: &String) -> Option<Self> {
    let storage = Self::get_storage(access.clone(), &voting_id).unwrap();
    let voters_registry_data = storage.get()?;

    let voters_list = Self::get_voters_list(access.clone(), &voting_id).unwrap();

    Some(Self {
      access,
      storage,
      voting_id: voters_registry_data.voting_id.clone(),
      voters_amount: voters_registry_data.voters_amount,
      issued_ballots_counter: voters_registry_data.issued_ballots_counter.clone(),
      voters_list,
    })
  }

  pub fn get_voters_amount(&self) -> u32 {
    self.voters_amount
  }

  pub fn get_issued_ballots_amount(&self) -> HashMap<u32, u32> {
    let mut issued_ballots_by_district = HashMap::new();

    self.issued_ballots_counter.iter().for_each(|(district_id, ballots_amount)| {
      issued_ballots_by_district.insert(*district_id, *ballots_amount);
    });

    issued_ballots_by_district
  }

  pub fn does_voter_exist(&self, voter_id: String) -> bool {
    self.voters_list.contains(&voter_id)
  }

  pub fn get_voter_info(&self, voter_id: String) -> Option<Voter> {
    self.voters_list.get(&voter_id)
  }

  fn get_voters_list(access: T, voting_id: &String) -> Result<MapIndex<T::Base, String, Voter>, AccessError> {
    let voters_lists: Group<T, String, MapIndex<T::Base, String, Voter>> = Group::from_access(
      access.clone(),
      IndexAddress::from_root("votings_registry")
        .append_name("voters_registry")
        .append_name("voters_list"),
    )?;

    Ok(voters_lists.get(&voting_id))
  }

  fn get_storage(access: T, voting_id: &String) -> Result<Entry<T::Base, VotersRegistrySchema>, AccessError> {
    let storages: Group<T, String, Entry<T::Base, VotersRegistrySchema>> = Group::from_access(
      access.clone(),
      IndexAddress::from_root("votings_service")
        .append_name("voters_registry"),
    )?;

    Ok(storages.get(&voting_id))
  }

  fn to_schema(&self) -> VotersRegistrySchema {
    VotersRegistrySchema {
      voting_id: self.voting_id.clone(),
      voters_amount: self.voters_amount,
      issued_ballots_counter: self.issued_ballots_counter.clone(),
    }
  }
}

impl<T: Access> VotersRegistry<T>
where
  T::Base: RawAccessMut,
{
  pub fn create(
    access: T,
    voting_id: &String,
  ) -> Result<Self, Error> {
    let storage = Self::get_storage(access.clone(), &voting_id).unwrap();

    if storage.exists() {
      Err(Error::VotingAlreadyExists)?;
    }

    let voters_list = Self::get_voters_list(access.clone(), &voting_id).unwrap();

    let mut voters_registry = Self {
      access,
      storage,
      voting_id: voting_id.clone(),
      voters_amount: 0,
      issued_ballots_counter: HashMap::new(),
      voters_list,
    };

    voters_registry.storage.set(voters_registry.to_schema());

    Ok(voters_registry)
  }

  pub fn register_voters(&mut self, voters_ids: Vec<String>) {
    let mut new_unique_voters: u32 = 0;
    
    voters_ids.iter().for_each(|voter_id| {
      if !self.voters_list.contains(voter_id) {
        self.voters_list.put(&voter_id, Voter::create(voter_id.clone()));
        new_unique_voters += 1;
      }
    });

    self.voters_amount += new_unique_voters;

    self.update_storage();
  }
  
  pub fn issue_ballot(&mut self, voter_id: String, district_id: u32) -> Result<(), Error> {
    if district_id == 0 {
      Err(Error::DistrictIDCannotBeZero)?;
    }

    let mut voter = self.voters_list.get(&voter_id)
      .ok_or_else(|| Error::VoterNotFound)?;

    if voter.is_participation_revoked {
      Err(Error::ParticipationForVoterWasRevoked)?;
    }
    
    if voter.ballot_issuing_district != 0 {
      Err(Error::BallotForVoterWasAlreadyIssued)?;
    }

    voter.ballot_issuing_district = district_id;
    self.voters_list.put(&voter_id, voter);

    let issued_ballots_for_district = self.issued_ballots_counter.get(&district_id).or(Some(&0)).unwrap();
    let issued_ballots_for_district = issued_ballots_for_district + 1;
    self.issued_ballots_counter.insert(district_id, issued_ballots_for_district);

    self.update_storage();

    Ok(())
  }

  pub fn revoke_participation(&mut self, voter_id: String) -> Result<(), Error> {
    let mut voter = self.voters_list.get(&voter_id)
      .ok_or_else(|| Error::VoterNotFound)?;

    if voter.ballot_issuing_district != 0 {
      Err(Error::BallotForVoterWasAlreadyIssued)?;
    }

    voter.is_participation_revoked = true;
    self.voters_list.put(&voter_id, voter);

    Ok(())
  }

  fn update_storage(&mut self) {
    self.storage.set(self.to_schema());
  }
}
