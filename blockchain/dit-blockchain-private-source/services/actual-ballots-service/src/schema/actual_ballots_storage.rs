use exonum_derive::{BinaryValue, ObjectHash};
use exonum_merkledb::{
    access::{Access, AccessError, FromAccess, RawAccessMut},
    Entry, Group, IndexAddress, ListIndex, MapIndex,
};
use exonum_proto::ProtobufConvert;
use std::collections::HashMap;
use std::convert::{From, Into};

use crate::{enums::InvalidReason, errors::Error, proto, variants::ballot_status::BallotStatus};

#[derive(Clone, Debug, ProtobufConvert, BinaryValue, ObjectHash)]
#[protobuf_convert(source = "proto::GroupedTxHash", serde_pb_convert)]
struct GroupedTxHashSchema {
    pub index: u32,
    pub store_tx_hash: String,
    pub encrypted_group_id: String,
    pub group_id: String,
    pub ts: i64,
}

#[derive(Clone, Debug)]
pub struct GroupedTxHash {
    pub index: u32,
    pub store_tx_hash: String,
    pub encrypted_group_id: String,
    pub group_id: Option<String>,
    pub ts: i64,
}

impl From<GroupedTxHashSchema> for GroupedTxHash {
    fn from(grouped_tx_hash: GroupedTxHashSchema) -> Self {
        Self {
            index: grouped_tx_hash.index,
            store_tx_hash: grouped_tx_hash.store_tx_hash,
            encrypted_group_id: grouped_tx_hash.encrypted_group_id,
            group_id: if grouped_tx_hash.group_id.is_empty() {
                None
            } else {
                Some(grouped_tx_hash.group_id)
            },
            ts: grouped_tx_hash.ts,
        }
    }
}

impl Into<GroupedTxHashSchema> for GroupedTxHash {
    fn into(self) -> GroupedTxHashSchema {
        GroupedTxHashSchema {
            index: self.index,
            store_tx_hash: self.store_tx_hash,
            encrypted_group_id: self.encrypted_group_id,
            group_id: match self.group_id {
                Some(group_id) => group_id,
                None => String::new(),
            },
            ts: self.ts,
        }
    }
}

#[derive(Clone, Debug, ProtobufConvert, BinaryValue, ObjectHash)]
#[protobuf_convert(source = "proto::ActualBallot", serde_pb_convert)]
struct ActualBallotSchema {
    pub voter: String,
    pub district_id: u32,
    pub decrypted_choices: Vec<u32>,
    pub store_tx_hash: String,
    pub decrypt_tx_hash: String,
    pub status: BallotStatus,
}

#[derive(Clone, Debug)]
pub struct ActualBallot {
    pub voter: String,
    pub district_id: u32,
    pub decrypted_choices: Vec<u32>,
    pub store_tx_hash: String,
    pub decrypt_tx_hash: String,
    pub status: BallotStatus,
}

impl From<ActualBallotSchema> for ActualBallot {
    fn from(ballot: ActualBallotSchema) -> Self {
        Self {
            voter: ballot.voter,
            district_id: ballot.district_id,
            decrypted_choices: ballot.decrypted_choices,
            store_tx_hash: ballot.store_tx_hash,
            decrypt_tx_hash: ballot.decrypt_tx_hash,
            status: ballot.status,
        }
    }
}

impl Into<ActualBallotSchema> for ActualBallot {
    fn into(self) -> ActualBallotSchema {
        ActualBallotSchema {
            voter: self.voter,
            district_id: self.district_id,
            decrypted_choices: self.decrypted_choices,
            store_tx_hash: self.store_tx_hash,
            decrypt_tx_hash: self.decrypt_tx_hash,
            status: self.status,
        }
    }
}

#[derive(Clone, Debug, ProtobufConvert, BinaryValue, ObjectHash)]
#[protobuf_convert(source = "proto::DistrictResults", serde_pb_convert)]
pub struct DistrictResults {
    pub district_id: u32,
    pub tally: HashMap<u32, u32>,
    pub invalid_ballots_amount: u32,
    pub unique_valid_ballots_amount: u32,
}

#[derive(Clone, Debug, ProtobufConvert, BinaryValue, ObjectHash)]
#[protobuf_convert(source = "proto::VotingResults", serde_pb_convert)]
pub struct VotingResults {
    pub district_results: HashMap<u32, DistrictResults>,
    pub invalid_ballots_amount: u32,
    pub unique_valid_ballots_amount: u32,
}

#[derive(Clone, Debug, ProtobufConvert, BinaryValue, ObjectHash)]
#[protobuf_convert(source = "proto::ActualBallotsStorage", serde_pb_convert)]
pub struct ActualBallotsStorageSchema {
    voting_id: String,
    actual_ballots_amount: u32,
    voting_results: VotingResults,
}

#[derive(Debug)]
pub struct ActualBallotsStorage<T: Access> {
    access: T,
    storage: Entry<T::Base, ActualBallotsStorageSchema>,
    grouped_tx_hashes: ListIndex<T::Base, GroupedTxHashSchema>,
    grouped_tx_hash_index_by_tx_hash: MapIndex<T::Base, String, u64>,
    actual_tx_hashes: ListIndex<T::Base, String>,
    actual_tx_hash_index_by_group_id: MapIndex<T::Base, String, u64>,
    actual_ballots: ListIndex<T::Base, ActualBallotSchema>,
    actual_ballot_index_by_tx_hash: MapIndex<T::Base, String, u64>,
    voting_id: String,
    actual_ballots_amount: u32,
    voting_results: VotingResults,
}

#[derive(Debug, Clone, Eq, PartialEq, Ord, PartialOrd)]
struct ResolvedGroupId(String, String);

impl<T: Access> ActualBallotsStorage<T> {
    pub fn get(access: T, voting_id: &String) -> Option<Self> {
        let storage = Self::get_storage(access.clone(), &voting_id).unwrap();
        let storage_data = storage.get()?;

        let grouped_tx_hashes = Self::get_grouped_tx_hashes(access.clone(), &voting_id).unwrap();
        let grouped_tx_hash_index_by_tx_hash =
            Self::get_grouped_tx_hash_index_by_tx_hash(access.clone(), &voting_id).unwrap();

        let actual_tx_hashes = Self::get_actual_tx_hashes(access.clone(), &voting_id).unwrap();
        let actual_tx_hash_index_by_group_id =
            Self::get_actual_tx_hash_index_by_group_id(access.clone(), &voting_id).unwrap();

        let actual_ballots = Self::get_actual_ballots(access.clone(), &voting_id).unwrap();
        let actual_ballot_index_by_tx_hash =
            Self::get_actual_ballot_index_by_tx_hash(access.clone(), &voting_id).unwrap();

        Some(Self {
            access,
            storage,
            grouped_tx_hashes,
            grouped_tx_hash_index_by_tx_hash,
            actual_tx_hashes,
            actual_tx_hash_index_by_group_id,
            actual_ballots,
            actual_ballot_index_by_tx_hash,
            voting_id: storage_data.voting_id.clone(),
            actual_ballots_amount: storage_data.actual_ballots_amount,
            voting_results: storage_data.voting_results.clone(),
        })
    }

    pub fn get_grouped_tx_hashes_by_index(
        &self,
        grouped_tx_hash_index: u32,
    ) -> Option<GroupedTxHash> {
        self.grouped_tx_hashes
            .get(grouped_tx_hash_index as u64)
            .map(|v| v.into())
    }

    pub fn get_grouped_tx_hashes_by_store_tx_hash(
        &self,
        store_tx_hash: String,
    ) -> Option<GroupedTxHash> {
        match self.grouped_tx_hash_index_by_tx_hash.get(&store_tx_hash) {
            None => None,
            Some(grouped_tx_hash_index) => {
                self.get_grouped_tx_hashes_by_index(grouped_tx_hash_index as u32)
            }
        }
    }

    pub fn get_grouped_tx_hashes_amount(&self) -> u32 {
        self.grouped_tx_hashes.len() as u32
    }

    pub fn get_actual_ballots_amount(&self) -> u32 {
        self.actual_ballots_amount
    }

    pub fn get_copied_ballots_amount(&self) -> u64 {
        self.actual_ballots.len()
    }

    pub fn get_actual_ballots_hashes(&self, from: u32, limit: u32) -> Vec<String> {
        self.actual_tx_hashes
            .iter_from(from as u64)
            .take(limit as usize)
            .collect()
    }

    pub fn get_encrypted_group_ids(&self, from: u32, limit: u32) -> HashMap<String, String> {
        self.grouped_tx_hashes
            .iter_from(from as u64)
            .take(limit as usize)
            .fold(HashMap::new(), |mut map, grouped_tx_hash| {
                map.insert(
                    grouped_tx_hash.store_tx_hash.clone(),
                    grouped_tx_hash.encrypted_group_id.clone(),
                );
                map
            })
    }

    pub fn get_actual_ballot_by_index(&self, ballot_index: u32) -> Option<ActualBallot> {
        self.actual_ballots
            .get(ballot_index as u64)
            .map(|v| v.into())
    }

    pub fn get_actual_ballot_by_store_tx_hash(
        &self,
        store_tx_hash: String,
    ) -> Option<ActualBallot> {
        match self.actual_ballot_index_by_tx_hash.get(&store_tx_hash) {
            None => None,
            Some(ballot_index) => self.get_actual_ballot_by_index(ballot_index as u32),
        }
    }

    pub fn get_voting_results(&self) -> VotingResults {
        self.voting_results.clone()
    }

    fn get_storage(
        access: T,
        voting_id: &String,
    ) -> Result<Entry<T::Base, ActualBallotsStorageSchema>, AccessError> {
        let storages: Group<T, String, Entry<T::Base, ActualBallotsStorageSchema>> =
            Group::from_access(
                access.clone(),
                IndexAddress::from_root("actual_ballots_registry")
                    .append_name("actual_ballots_storage"),
            )?;

        Ok(storages.get(&voting_id))
    }

    fn get_grouped_tx_hashes(
        access: T,
        voting_id: &String,
    ) -> Result<ListIndex<T::Base, GroupedTxHashSchema>, AccessError> {
        let grouped_tx_hashes_storage: Group<T, String, ListIndex<T::Base, GroupedTxHashSchema>> =
            Group::from_access(
                access.clone(),
                IndexAddress::from_root("actual_ballots_registry")
                    .append_name("actual_ballots_storage")
                    .append_name("grouped_tx_hashes"),
            )?;

        Ok(grouped_tx_hashes_storage.get(&voting_id))
    }

    fn get_grouped_tx_hash_index_by_tx_hash(
        access: T,
        voting_id: &String,
    ) -> Result<MapIndex<T::Base, String, u64>, AccessError> {
        let grouped_tx_hash_index_by_tx_hash: Group<T, String, MapIndex<T::Base, String, u64>> =
            Group::from_access(
                access.clone(),
                IndexAddress::from_root("actual_ballots_registry")
                    .append_name("actual_ballots_storage")
                    .append_name("grouped_tx_hash_index_by_tx_hash"),
            )?;

        Ok(grouped_tx_hash_index_by_tx_hash.get(&voting_id))
    }

    fn get_actual_tx_hashes(
        access: T,
        voting_id: &String,
    ) -> Result<ListIndex<T::Base, String>, AccessError> {
        let actual_tx_hashes: Group<T, String, ListIndex<T::Base, String>> = Group::from_access(
            access.clone(),
            IndexAddress::from_root("actual_ballots_registry")
                .append_name("actual_ballots_storage")
                .append_name("actual_tx_hashes"),
        )?;

        Ok(actual_tx_hashes.get(&voting_id))
    }

    fn get_actual_tx_hash_index_by_group_id(
        access: T,
        voting_id: &String,
    ) -> Result<MapIndex<T::Base, String, u64>, AccessError> {
        let actual_tx_hash_index_by_group_id: Group<T, String, MapIndex<T::Base, String, u64>> =
            Group::from_access(
                access.clone(),
                IndexAddress::from_root("actual_ballots_registry")
                    .append_name("actual_ballots_storage")
                    .append_name("actual_tx_hash_index_by_group_id"),
            )?;

        Ok(actual_tx_hash_index_by_group_id.get(&voting_id))
    }

    fn get_actual_ballots(
        access: T,
        voting_id: &String,
    ) -> Result<ListIndex<T::Base, ActualBallotSchema>, AccessError> {
        let actual_ballots_storage: Group<T, String, ListIndex<T::Base, ActualBallotSchema>> =
            Group::from_access(
                access.clone(),
                IndexAddress::from_root("actual_ballots_registry")
                    .append_name("actual_ballots_storage")
                    .append_name("actual_ballots"),
            )?;

        Ok(actual_ballots_storage.get(&voting_id))
    }

    fn get_actual_ballot_index_by_tx_hash(
        access: T,
        voting_id: &String,
    ) -> Result<MapIndex<T::Base, String, u64>, AccessError> {
        let actual_ballot_index_by_tx_hash: Group<T, String, MapIndex<T::Base, String, u64>> =
            Group::from_access(
                access.clone(),
                IndexAddress::from_root("actual_ballots_registry")
                    .append_name("actual_ballots_storage")
                    .append_name("actual_ballot_index_by_tx_hash"),
            )?;

        Ok(actual_ballot_index_by_tx_hash.get(&voting_id))
    }

    fn to_schema(&self) -> ActualBallotsStorageSchema {
        ActualBallotsStorageSchema {
            voting_id: self.voting_id.clone(),
            actual_ballots_amount: self.actual_ballots_amount,
            voting_results: self.voting_results.clone(),
        }
    }
}

impl<T: Access> ActualBallotsStorage<T>
where
    T::Base: RawAccessMut,
{
    pub fn create(access: T, voting_id: &String) -> Result<Self, Error> {
        let storage = Self::get_storage(access.clone(), &voting_id).unwrap();

        if storage.exists() {
            Err(Error::VotingAlreadyExists)?;
        }

        let grouped_tx_hashes = Self::get_grouped_tx_hashes(access.clone(), &voting_id).unwrap();
        let grouped_tx_hash_index_by_tx_hash =
            Self::get_grouped_tx_hash_index_by_tx_hash(access.clone(), &voting_id).unwrap();

        let actual_tx_hashes = Self::get_actual_tx_hashes(access.clone(), &voting_id).unwrap();
        let actual_tx_hash_index_by_group_id =
            Self::get_actual_tx_hash_index_by_group_id(access.clone(), &voting_id).unwrap();

        let actual_ballots = Self::get_actual_ballots(access.clone(), &voting_id).unwrap();
        let actual_ballot_index_by_tx_hash =
            Self::get_actual_ballot_index_by_tx_hash(access.clone(), &voting_id).unwrap();

        let actual_ballots_amount = 0;

        let district_results: HashMap<u32, DistrictResults> = HashMap::new();

        let mut ballots_storage = Self {
            access,
            storage,
            grouped_tx_hashes,
            grouped_tx_hash_index_by_tx_hash,
            actual_tx_hashes,
            actual_tx_hash_index_by_group_id,
            actual_ballots,
            actual_ballot_index_by_tx_hash,
            voting_id: voting_id.clone(),
            actual_ballots_amount,
            voting_results: VotingResults {
                district_results,
                invalid_ballots_amount: 0,
                unique_valid_ballots_amount: 0,
            },
        };

        ballots_storage.storage.set(ballots_storage.to_schema());

        Ok(ballots_storage)
    }

    pub fn store_grouped_tx_hash(
        &mut self,
        store_tx_hash: String,
        encrypted_group_id: String,
        ts: i64,
    ) -> Result<(), Error> {
        if !self
            .grouped_tx_hash_index_by_tx_hash
            .contains(&store_tx_hash)
        {
            let new_index = self.grouped_tx_hashes.len();

            let grouped_tx_hash = GroupedTxHash {
                index: new_index as u32,
                store_tx_hash,
                encrypted_group_id,
                group_id: None,
                ts,
            };

            self.grouped_tx_hash_index_by_tx_hash
                .put(&grouped_tx_hash.store_tx_hash, new_index);
            self.grouped_tx_hashes.push(grouped_tx_hash.into());
        }

        Ok(())
    }

    pub fn resolve_group_ids(
        &mut self,
        resolved_group_ids: HashMap<String, String>,
    ) -> Result<(), Error> {
        let mut resolved_group_ids_list: Vec<ResolvedGroupId> = resolved_group_ids
            .into_iter()
            .map(|(k, v)| ResolvedGroupId(k, v))
            .collect();
        resolved_group_ids_list.sort();

        resolved_group_ids_list
            .iter()
            .for_each(|ResolvedGroupId(store_tx_hash, group_id)| {
                let grouped_tx_hash_index = self
                    .grouped_tx_hash_index_by_tx_hash
                    .get(&store_tx_hash)
                    .ok_or_else(|| Error::GroupedTxHashDoesNotExist)
                    .unwrap();
                let grouped_tx_hash_schema = self
                    .get_grouped_tx_hashes_by_index(grouped_tx_hash_index as u32)
                    .ok_or_else(|| Error::GroupedTxHashDoesNotExist)
                    .unwrap();

                let mut grouped_tx_hash: GroupedTxHash = grouped_tx_hash_schema.into();
                grouped_tx_hash.group_id = Some(group_id.clone());

                self.grouped_tx_hashes
                    .set(grouped_tx_hash_index, grouped_tx_hash.clone().into());

                match self.actual_tx_hash_index_by_group_id.get(&group_id) {
                    Some(index) => {
                        let tx_hash = self.actual_tx_hashes.get(index).unwrap();
                        let actual_grouped_tx_hash = self
                            .get_grouped_tx_hashes_by_store_tx_hash(tx_hash)
                            .unwrap();
                        if actual_grouped_tx_hash.ts < grouped_tx_hash.ts {
                            self.actual_tx_hashes
                                .set(index, grouped_tx_hash.store_tx_hash.clone());
                        }
                    }
                    None => {
                        self.actual_tx_hash_index_by_group_id
                            .put(&group_id, self.actual_tx_hashes.len());
                        self.actual_tx_hashes
                            .push(grouped_tx_hash.store_tx_hash.clone());
                        self.actual_ballots_amount += 1;
                    }
                }
            });

        self.update_storage();

        Ok(())
    }

    pub fn store_actual_ballots(&mut self, actual_ballots: Vec<ActualBallot>) -> Result<(), Error> {
        actual_ballots.iter().for_each(|ballot| {
            if !self
                .actual_ballot_index_by_tx_hash
                .contains(&ballot.store_tx_hash)
            {
                self.actual_ballot_index_by_tx_hash
                    .put(&ballot.store_tx_hash, self.actual_ballots.len());
                self.actual_ballots.push(ballot.clone().into());
            }
        });

        Ok(())
    }

    pub fn tally_results(&mut self) {
        let mut invalid_ballots_amount: u32 = 0;
        let mut unique_valid_ballots_amount: u32 = 0;

        let district_results: HashMap<u32, DistrictResults> =
            self.actual_ballots
                .iter()
                .fold(HashMap::new(), |mut map, ballot| {
                    let mut tally_for_district: Option<DistrictResults> = match ballot.status {
                        BallotStatus::Invalid(InvalidReason::WrongDistrict) => None,
                        _ => map.get(&ballot.district_id).map(|v| v.clone()).or(Some(
                            DistrictResults {
                                district_id: ballot.district_id.clone(),
                                tally: HashMap::new(),
                                invalid_ballots_amount: 0,
                                unique_valid_ballots_amount: 0,
                            },
                        )),
                    };

                    match tally_for_district {
                        Some(ref mut t) => {
                            unique_valid_ballots_amount += 1;
                            t.unique_valid_ballots_amount += 1;

                            if ballot.status == BallotStatus::Valid {
                                for choice in ballot.decrypted_choices {
                                    let choice_counter: u32 = t
                                        .tally
                                        .get(&choice)
                                        .map(|v| v.clone())
                                        .or(Some(0))
                                        .unwrap();

                                    t.tally.insert(choice.clone(), choice_counter + 1);
                                }
                            } else {
                                invalid_ballots_amount += 1;
                                t.invalid_ballots_amount += 1;
                            }

                            map.insert(ballot.district_id.clone(), t.clone());
                        }
                        None => {
                            invalid_ballots_amount += 1;
                        }
                    }

                    map
                });

        self.voting_results.district_results = district_results.clone();
        self.voting_results.invalid_ballots_amount = invalid_ballots_amount;
        self.voting_results.unique_valid_ballots_amount = unique_valid_ballots_amount;

        self.update_storage();
    }

    fn update_storage(&mut self) {
        self.storage.set(self.to_schema());
    }
}
