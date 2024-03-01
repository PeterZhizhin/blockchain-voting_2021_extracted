use exonum::crypto::{Hash, PublicKey};
use exonum_derive::{BinaryValue, ObjectHash};
use exonum_merkledb::{
    access::{Access, AccessError, FromAccess, RawAccessMut},
    Entry, Group, IndexAddress, ListIndex, MapIndex,
};
use exonum_proto::ProtobufConvert;
use exonum_sodiumoxide::crypto::box_;
use protobuf::Message;
use std::collections::{HashMap, HashSet};
use std::convert::{From, Into, TryInto};

use crate::{
    enums::InvalidReason,
    errors::Error,
    proto,
    types::{SealedBoxNonceWrapper, SealedBoxPublicKeyWrapper},
    variants::ballot_status::BallotStatus,
};

#[derive(Clone, Debug, ProtobufConvert, BinaryValue, ObjectHash)]
#[protobuf_convert(source = "proto::Choices", serde_pb_convert)]
struct Choices {
    pub data: Vec<u32>,
}

#[derive(Clone, Debug, ProtobufConvert, BinaryValue, ObjectHash)]
#[protobuf_convert(source = "proto::EncryptedChoice", serde_pb_convert)]
struct EncryptedChoiceSchema {
    pub encrypted_message: Vec<u8>,
    pub nonce: SealedBoxNonceWrapper,
    pub public_key: SealedBoxPublicKeyWrapper,
}

#[derive(Clone, Debug)]
pub struct EncryptedChoice {
    pub encrypted_message: Vec<u8>,
    pub nonce: box_::curve25519xsalsa20poly1305::Nonce,
    pub public_key: box_::curve25519xsalsa20poly1305::PublicKey,
}

impl From<EncryptedChoiceSchema> for EncryptedChoice {
    fn from(ec: EncryptedChoiceSchema) -> Self {
        Self {
            encrypted_message: ec.encrypted_message,
            nonce: ec.nonce.into(),
            public_key: ec.public_key.into(),
        }
    }
}

impl Into<EncryptedChoiceSchema> for EncryptedChoice {
    fn into(self) -> EncryptedChoiceSchema {
        EncryptedChoiceSchema {
            encrypted_message: self.encrypted_message,
            nonce: self.nonce.into(),
            public_key: self.public_key.into(),
        }
    }
}

#[derive(Clone, Debug, ProtobufConvert, BinaryValue, ObjectHash)]
#[protobuf_convert(source = "proto::Ballot", serde_pb_convert)]
struct BallotSchema {
    pub index: u32,
    pub voter: PublicKey,
    pub district_id: u32,
    pub encrypted_choice: EncryptedChoiceSchema,
    pub decrypted_choices: Vec<u32>, // should be 0 if not decrypted
    pub store_tx_hash: Hash,
    pub decrypt_tx_hash: Hash, // should be zeroed by default
    pub status: BallotStatus,
    pub sid: String,
}

#[derive(Clone, Debug)]
pub struct Ballot {
    pub index: u32,
    pub voter: PublicKey,
    pub district_id: u32,
    pub encrypted_choice: EncryptedChoice,
    pub decrypted_choices: Option<Vec<u32>>,
    pub store_tx_hash: Hash,
    pub decrypt_tx_hash: Option<Hash>,
    pub status: BallotStatus,
    pub sid: String,
}

impl From<BallotSchema> for Ballot {
    fn from(ballot: BallotSchema) -> Self {
        Self {
            index: ballot.index,
            voter: ballot.voter,
            district_id: ballot.district_id,
            encrypted_choice: ballot.encrypted_choice.into(),
            decrypted_choices: match ballot.decrypted_choices.len() {
                0 => None,
                _ => Some(ballot.decrypted_choices),
            },
            store_tx_hash: ballot.store_tx_hash,
            decrypt_tx_hash: match ballot.decrypt_tx_hash == Hash::zero() {
                true => None,
                false => Some(ballot.decrypt_tx_hash),
            },
            status: ballot.status,
            sid: ballot.sid,
        }
    }
}

impl Into<BallotSchema> for Ballot {
    fn into(self) -> BallotSchema {
        BallotSchema {
            index: self.index,
            voter: self.voter,
            district_id: self.district_id,
            encrypted_choice: self.encrypted_choice.into(),
            decrypted_choices: match self.decrypted_choices {
                Some(decrypted_choices) => decrypted_choices,
                None => vec![],
            },
            store_tx_hash: self.store_tx_hash,
            decrypt_tx_hash: match self.decrypt_tx_hash {
                Some(decrypt_tx_hash) => decrypt_tx_hash,
                None => Hash::zero(),
            },
            status: self.status,
            sid: self.sid,
        }
    }
}

#[derive(Clone, Debug, ProtobufConvert)]
#[protobuf_convert(source = "proto::DecryptionStatistics", serde_pb_convert)]
pub struct DecryptionStatistics {
    pub decrypted_ballots_amount: u32,
    pub invalid_ballots_amount: u32,
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
#[protobuf_convert(source = "proto::BallotsStorage", serde_pb_convert)]
pub struct BallotsStorageSchema {
    voting_id: String,
    stored_ballots_counter: HashMap<u32, u32>,
    decrypted_ballots_counter: DecryptionStatistics,
    voting_results: VotingResults,
}

#[derive(Debug)]
pub struct BallotsStorage<T: Access> {
    access: T,
    storage: Entry<T::Base, BallotsStorageSchema>,
    ballots: ListIndex<T::Base, BallotSchema>,
    ballot_by_store_tx_index: MapIndex<T::Base, Hash, u64>,
    ballot_by_sid_index: MapIndex<T::Base, String, u64>,
    invalid_ballots: ListIndex<T::Base, Hash>,
    voters_list: MapIndex<T::Base, PublicKey, bool>,
    voting_id: String,
    stored_ballots_counter: HashMap<u32, u32>,
    decrypted_ballots_counter: DecryptionStatistics,
    voting_results: VotingResults,
}

impl<T: Access> BallotsStorage<T> {
    pub fn get(access: T, voting_id: &String) -> Option<Self> {
        let storage = Self::get_storage(access.clone(), &voting_id).unwrap();
        let storage_data = storage.get()?;

        let ballots = Self::get_ballots(access.clone(), &voting_id).unwrap();
        let ballot_by_store_tx_index =
            Self::get_ballot_by_store_tx_index(access.clone(), &voting_id).unwrap();
        let ballot_by_sid_index = Self::get_ballot_by_sid_index(access.clone(), voting_id).unwrap();
        let invalid_ballots =
            Self::get_invalid_ballots_storage(access.clone(), &voting_id).unwrap();
        let voters_list = Self::get_voters_list(access.clone(), &voting_id).unwrap();

        Some(Self {
            access,
            storage,
            ballots,
            ballot_by_store_tx_index,
            ballot_by_sid_index,
            invalid_ballots,
            voters_list,
            voting_id: storage_data.voting_id.clone(),
            stored_ballots_counter: storage_data.stored_ballots_counter.clone(),
            decrypted_ballots_counter: storage_data.decrypted_ballots_counter.clone(),
            voting_results: storage_data.voting_results.clone(),
        })
    }

    pub fn get_ballot_by_index(&self, ballot_index: u32) -> Option<Ballot> {
        self.ballots.get(ballot_index as u64).map(|v| v.into())
    }

    pub fn get_ballot_by_store_tx_hash(&self, store_tx_hash: Hash) -> Option<Ballot> {
        match self.ballot_by_store_tx_index.get(&store_tx_hash) {
            None => None,
            Some(ballot_index) => self.get_ballot_by_index(ballot_index as u32),
        }
    }

    pub fn get_ballot_by_sid(&self, sid: String) -> Option<Ballot> {
        match self.ballot_by_sid_index.get(&sid) {
            None => None,
            Some(ballot_index) => self.get_ballot_by_index(ballot_index as u32),
        }
    }

    pub fn get_ballots_by_store_tx_hashes(
        &self,
        store_tx_hashes: Vec<Hash>,
    ) -> Vec<Option<Ballot>> {
        let mut ballots: Vec<Option<Ballot>> = Vec::new();

        store_tx_hashes
            .iter()
            .for_each(|hash| match self.get_ballot_by_store_tx_hash(*hash) {
                Some(ballot) => ballots.push(ballot.clone().into()),
                None => ballots.push(None),
            });

        ballots
    }

    pub fn get_invalid_ballots(&self, from: u32, limit: u32) -> Vec<Ballot> {
        self.invalid_ballots
            .iter()
            .skip(from.try_into().unwrap())
            .take(limit.try_into().unwrap())
            .filter_map(|tx_hash| self.get_ballot_by_store_tx_hash(tx_hash))
            .collect()
    }

    pub fn get_stored_ballots_amount_by_district(&self) -> HashMap<u32, u32> {
        self.stored_ballots_counter.iter().fold(
            HashMap::new(),
            |mut map, (district_id, ballots_amount)| {
                map.insert(*district_id, *ballots_amount);
                map
            },
        )
    }

    pub fn get_stored_ballots_amount(&self) -> u32 {
        self.ballots.len() as u32
    }

    pub fn get_decryption_statistics(&self) -> DecryptionStatistics {
        self.decrypted_ballots_counter.clone()
    }

    pub fn get_voting_results(&self) -> VotingResults {
        self.voting_results.clone()
    }

    fn get_storage(
        access: T,
        voting_id: &String,
    ) -> Result<Entry<T::Base, BallotsStorageSchema>, AccessError> {
        let storages: Group<T, String, Entry<T::Base, BallotsStorageSchema>> = Group::from_access(
            access.clone(),
            IndexAddress::from_root("votings_service").append_name("ballots_storage"),
        )?;

        Ok(storages.get(&voting_id))
    }

    fn get_ballots(
        access: T,
        voting_id: &String,
    ) -> Result<ListIndex<T::Base, BallotSchema>, AccessError> {
        let ballots_storage: Group<T, String, ListIndex<T::Base, BallotSchema>> =
            Group::from_access(
                access.clone(),
                IndexAddress::from_root("votings_registry")
                    .append_name("ballots_storage")
                    .append_name("ballots"),
            )?;

        Ok(ballots_storage.get(&voting_id))
    }

    fn get_ballot_by_store_tx_index(
        access: T,
        voting_id: &String,
    ) -> Result<MapIndex<T::Base, Hash, u64>, AccessError> {
        let ballot_by_store_tx_index: Group<T, String, MapIndex<T::Base, Hash, u64>> =
            Group::from_access(
                access.clone(),
                IndexAddress::from_root("votings_registry")
                    .append_name("ballots_storage")
                    .append_name("ballot_by_store_tx_index"),
            )?;

        Ok(ballot_by_store_tx_index.get(&voting_id))
    }

    fn get_ballot_by_sid_index(
        access: T,
        voting_id: &String,
    ) -> Result<MapIndex<T::Base, String, u64>, AccessError> {
        let ballot_by_store_tx_index: Group<T, String, MapIndex<T::Base, String, u64>> =
            Group::from_access(
                access.clone(),
                IndexAddress::from_root("votings_registry")
                    .append_name("ballots_storage")
                    .append_name("ballot_by_sid_index"),
            )?;

        Ok(ballot_by_store_tx_index.get(&voting_id))
    }

    fn get_invalid_ballots_storage(
        access: T,
        voting_id: &String,
    ) -> Result<ListIndex<T::Base, Hash>, AccessError> {
        let invalid_ballots: Group<T, String, ListIndex<T::Base, Hash>> = Group::from_access(
            access.clone(),
            IndexAddress::from_root("votings_registry")
                .append_name("ballots_storage")
                .append_name("invalid_ballots"),
        )?;

        Ok(invalid_ballots.get(&voting_id))
    }

    fn get_voters_list(
        access: T,
        voting_id: &String,
    ) -> Result<MapIndex<T::Base, PublicKey, bool>, AccessError> {
        let voters_lists: Group<T, String, MapIndex<T::Base, PublicKey, bool>> =
            Group::from_access(
                access.clone(),
                IndexAddress::from_root("votings_registry")
                    .append_name("ballots_storage")
                    .append_name("voters_list"),
            )?;

        Ok(voters_lists.get(&voting_id))
    }

    fn to_schema(&self) -> BallotsStorageSchema {
        BallotsStorageSchema {
            voting_id: self.voting_id.clone(),
            stored_ballots_counter: self.stored_ballots_counter.clone(),
            decrypted_ballots_counter: self.decrypted_ballots_counter.clone(),
            voting_results: self.voting_results.clone(),
        }
    }
}

impl<T: Access> BallotsStorage<T>
where
    T::Base: RawAccessMut,
{
    pub fn create(access: T, voting_id: &String) -> Result<Self, Error> {
        let storage = Self::get_storage(access.clone(), &voting_id).unwrap();

        if storage.exists() {
            Err(Error::VotingAlreadyExists)?;
        }

        let ballots = Self::get_ballots(access.clone(), &voting_id).unwrap();
        let ballot_by_store_tx_index =
            Self::get_ballot_by_store_tx_index(access.clone(), &voting_id).unwrap();
        let ballot_by_sid_index = Self::get_ballot_by_sid_index(access.clone(), voting_id).unwrap();
        let invalid_ballots =
            Self::get_invalid_ballots_storage(access.clone(), &voting_id).unwrap();
        let voters_list = Self::get_voters_list(access.clone(), &voting_id).unwrap();

        let stored_ballots_counter: HashMap<u32, u32> = HashMap::new();
        let district_results: HashMap<u32, DistrictResults> = HashMap::new();

        let mut ballots_storage = Self {
            access,
            storage,
            ballots,
            ballot_by_store_tx_index,
            ballot_by_sid_index,
            invalid_ballots,
            voters_list,
            voting_id: voting_id.clone(),
            stored_ballots_counter,
            decrypted_ballots_counter: DecryptionStatistics {
                decrypted_ballots_amount: 0,
                invalid_ballots_amount: 0,
            },
            voting_results: VotingResults {
                district_results,
                invalid_ballots_amount: 0,
                unique_valid_ballots_amount: 0,
            },
        };

        ballots_storage.storage.set(ballots_storage.to_schema());

        Ok(ballots_storage)
    }

    pub fn add_voter_to_voters_list(&mut self, voter: PublicKey) {
        if !self.voters_list.contains(&voter) {
            self.voters_list.put(&voter, false);
        }
    }

    pub fn store_ballot(
        &mut self,
        voter: PublicKey,
        district_id: u32,
        encrypted_choice: EncryptedChoice,
        store_tx_hash: Hash,
        sid: &String,
        status: BallotStatus,
    ) -> Result<(), Error> {
        let voter_has_voted = self
            .voters_list
            .get(&voter)
            .ok_or_else(|| Error::VoterIsNotInAcl)?;

        if voter_has_voted {
            Err(Error::VoterHasAlreadyVoted)?;
        }

        let sid_already_present = self.ballot_by_sid_index.get(sid).is_some();
        if sid_already_present {
            Err(Error::TxSidAlreadyPresent)?
        }

        self.voters_list.put(&voter, true);

        let new_ballot_index = self.ballots.len() as u32;

        let ballot = Ballot {
            index: new_ballot_index,
            voter,
            district_id: district_id.clone(),
            encrypted_choice,
            decrypted_choices: None,
            store_tx_hash,
            decrypt_tx_hash: None,
            status: status.clone(),
            sid: sid.into(),
        };

        self.ballot_by_store_tx_index
            .put(&ballot.store_tx_hash, (ballot.index as u32).into());
        self.ballot_by_sid_index
            .put(&ballot.sid, (ballot.index as u32).into());
        self.ballots.push(ballot.into());

        if status == BallotStatus::Unknown {
            let stored_ballots_for_district = self
                .stored_ballots_counter
                .get(&district_id)
                .or(Some(&0))
                .unwrap();
            let stored_ballots_for_district = stored_ballots_for_district + 1;
            self.stored_ballots_counter
                .insert(district_id, stored_ballots_for_district);
        } else {
            self.invalid_ballots.push(store_tx_hash);
        }

        self.update_storage();

        Ok(())
    }

    pub fn decrypt_ballot(
        &mut self,
        ballot_index: u32,
        decryption_key: &box_::curve25519xsalsa20poly1305::SecretKey,
        decrypt_tx_hash: Hash,
        options: &Vec<u32>,
        min_choices: u32,
        max_choices: u32,
    ) -> Result<(), Error> {
        let ballot_schema = self
            .ballots
            .get(ballot_index as u64)
            .ok_or_else(|| Error::BallotDoesNotExist)?;

        let mut ballot: Ballot = ballot_schema.into();

        ballot.decrypt_tx_hash = Some(decrypt_tx_hash);

        if ballot.status == BallotStatus::Unknown {
            let decrypted_message = box_::open(
                &ballot.encrypted_choice.encrypted_message,
                &ballot.encrypted_choice.nonce,
                &ballot.encrypted_choice.public_key,
                decryption_key,
            )
            .ok();

            let decrypted_choices = decrypted_message
                .and_then(|message| {
                    // truncate leading zeros
                    let offset = (((message[0] as u16) << 8) | message[1] as u16) as usize + 2;
                    let original_message = &message[offset..];

                    let mut proto_choices = proto::Choices::new();
                    proto_choices.merge_from_bytes(&original_message).ok();
                    Some(proto_choices)
                })
                .and_then(|proto_choices| Choices::from_pb(proto_choices).ok())
                .and_then(|decrypted_choices| {
                    Some(
                        decrypted_choices
                            .data
                            .into_iter()
                            .filter(|&choice| choice != 0)
                            .collect::<Vec<_>>(),
                    )
                })
                .and_then(|choices| {
                    match validate_decrypted_choices(&choices, &options, min_choices, max_choices) {
                        Ok(()) => Some(choices),
                        _ => None,
                    }
                });

            match decrypted_choices {
                Some(decrypted_choices) => {
                    ballot.status = BallotStatus::Valid;
                    ballot.decrypted_choices = Some(decrypted_choices);
                    self.decrypted_ballots_counter.decrypted_ballots_amount += 1;
                }
                None => {
                    ballot.status = BallotStatus::Invalid(InvalidReason::DecryptionError);
                    self.decrypted_ballots_counter.invalid_ballots_amount += 1;
                    self.invalid_ballots.push(ballot.store_tx_hash);
                }
            }
        }

        self.ballots.set(ballot_index as u64, ballot.into());

        self.update_storage();

        Ok(())
    }

    pub fn tally_results(&mut self) {
        let mut invalid_ballots_amount: u32 = 0;
        let mut unique_valid_ballots_amount: u32 = 0;

        let district_results: HashMap<u32, DistrictResults> =
            self.ballots.iter().fold(HashMap::new(), |mut map, ballot| {
                if ballot.status == BallotStatus::Invalid(InvalidReason::WrongDistrict) {
                    invalid_ballots_amount += 1;
                    return map;
                }

                let mut tally_for_district: DistrictResults = map
                    .get(&ballot.district_id)
                    .map(|v| v.clone())
                    .or(Some(DistrictResults {
                        district_id: ballot.district_id.clone(),
                        tally: HashMap::new(),
                        invalid_ballots_amount: 0,
                        unique_valid_ballots_amount: 0,
                    }))
                    .unwrap();

                if ballot.status == BallotStatus::Valid {
                    unique_valid_ballots_amount += 1;
                    tally_for_district.unique_valid_ballots_amount += 1;

                    for choice in ballot.decrypted_choices {
                        let choice_counter: u32 = tally_for_district
                            .tally
                            .get(&choice)
                            .map(|v| v.clone())
                            .or(Some(0))
                            .unwrap();

                        tally_for_district
                            .tally
                            .insert(choice.clone(), choice_counter + 1);
                    }
                } else {
                    invalid_ballots_amount += 1;
                    tally_for_district.invalid_ballots_amount += 1;
                }

                map.insert(ballot.district_id.clone(), tally_for_district);
                map
            });

        self.voting_results.district_results = district_results.clone();
        self.voting_results.invalid_ballots_amount = invalid_ballots_amount;
        self.voting_results.unique_valid_ballots_amount = unique_valid_ballots_amount;

        self.update_storage();
    }

    pub fn publish_results(&mut self, results: VotingResults) -> Result<(), Error> {
        self.voting_results = results;

        self.update_storage();

        Ok(())
    }

    fn update_storage(&mut self) {
        self.storage.set(self.to_schema());
    }
}

fn validate_decrypted_choices(
    decrypted_choices: &Vec<u32>,
    options: &Vec<u32>,
    min_choices: u32,
    max_choices: u32,
) -> Result<(), Error> {
    let len = decrypted_choices.len() as u32;

    let mut unique_choices = decrypted_choices.clone();
    unique_choices.dedup();

    if len < min_choices {
        Err(Error::ChoicesCannotBeLessMinChoices)?;
    }

    if len > max_choices {
        Err(Error::ChoicesCannotBeMoreMaxChoices)?;
    }

    if len != (unique_choices.len() as u32) {
        Err(Error::ChoicesCannotContainDuplicates)?;
    }

    let options_set: HashSet<&u32> = options.into_iter().collect();
    let choices_set: HashSet<&u32> = decrypted_choices.into_iter().collect();
    if !choices_set.is_subset(&options_set) {
        Err(Error::ChoicesCannotOutOfBounds)?;
    }

    Ok(())
}
