use std::collections::HashMap;
use std::convert::{From, Into};
use exonum_derive::{BinaryValue, ObjectHash};
use exonum_merkledb::{
  access::{Access, AccessError, FromAccess, RawAccessMut},
  Entry, Group, IndexAddress,
};
use exonum_proto::ProtobufConvert;
use exonum_sodiumoxide::crypto::box_;

use crate::{
  errors::Error,
  enums::VotingState,
  types::{
    SealedBoxPublicKeyWrapper,
    SealedBoxSecretKeyWrapper,
  },
  proto,
};

#[derive(Clone, Debug, ProtobufConvert, BinaryValue, ObjectHash)]
#[protobuf_convert(source = "proto::CryptoSystemSettings", serde_pb_convert)]
struct CryptoSystemSettingsSchema {
  pub public_key: SealedBoxPublicKeyWrapper,
  pub private_key: SealedBoxSecretKeyWrapper, // 0 value is considered None
}

#[derive(Clone, Debug)]
pub struct CryptoSystemSettings {
  pub public_key: box_::curve25519xsalsa20poly1305::PublicKey,
  pub private_key: Option<box_::curve25519xsalsa20poly1305::SecretKey>,
}

impl From<CryptoSystemSettingsSchema> for CryptoSystemSettings {
  fn from(schema: CryptoSystemSettingsSchema) -> Self {
    let private_key: box_::curve25519xsalsa20poly1305::SecretKey = schema.private_key.into();

    Self {
      public_key: schema.public_key.into(),
      private_key: match private_key.0 == [0u8; 32] {
        true => None,
        false => Some(private_key)
      },
    }
  }
}

impl Into<CryptoSystemSettingsSchema> for CryptoSystemSettings {
  fn into(self) -> CryptoSystemSettingsSchema {
    CryptoSystemSettingsSchema {
      public_key: self.public_key.into(),
      private_key: match self.private_key {
        Some(private_key) => private_key.into(),
        None => box_::curve25519xsalsa20poly1305::SecretKey::from_slice(&[0u8; 32]).unwrap().into(),
      },
    }
  }
}

#[derive(Clone, Debug, ProtobufConvert, BinaryValue, ObjectHash)]
#[protobuf_convert(source = "proto::BallotConfig", serde_pb_convert)]
pub struct BallotConfig {
  pub district_id: u32,
  pub question: String,
  pub options: HashMap<u32, String>,
  pub min_choices: u32,
  pub max_choices: u32
}

#[derive(Clone, Debug, ProtobufConvert, BinaryValue, ObjectHash)]
#[protobuf_convert(source = "proto::Voting", serde_pb_convert)]
struct VotingSchema {
  pub voting_id: String,
  pub crypto_system: CryptoSystemSettingsSchema,
  pub ballots_config: HashMap<u32, BallotConfig>,
  pub state: VotingState,
  pub revote_enabled: bool,
}

#[derive(Debug)]
pub struct Voting<T: Access> {
  access: T,
  voting_storage: Entry<T::Base, VotingSchema>,
  voting_id: String,
  crypto_system: CryptoSystemSettings,
  ballots_config: HashMap<u32, BallotConfig>,
  state: VotingState,
  revote_enabled: bool,
}

impl<T: Access> Voting<T> {
  pub fn get(access: T, voting_id: &String) -> Option<Self> {
    let voting_storage = Self::get_storage(access.clone(), &voting_id).unwrap();

    let voting_data = voting_storage.get()?;

    Some(Self {
      access,
      voting_storage,
      voting_id: voting_data.voting_id,
      crypto_system: voting_data.crypto_system.into(),
      ballots_config: voting_data.ballots_config,
      state: voting_data.state,
      revote_enabled: voting_data.revote_enabled,
    })
  }

  pub fn get_crypto_system_settings(&self) -> CryptoSystemSettings {
    self.crypto_system.clone()
  }

  pub fn get_ballots_config(&self) -> HashMap<u32, BallotConfig> {
    self.ballots_config.clone()
  }

  pub fn get_state(&self) -> VotingState {
    self.state.clone()
  }

  pub fn is_revote_enabled(&self) -> bool {
    self.revote_enabled
  }

  fn get_storage(access: T, voting_id: &String) -> Result<Entry<T::Base, VotingSchema>, AccessError> {
    let votings: Group<T, String, Entry<T::Base, VotingSchema>> = Group::from_access(
      access.clone(),
      IndexAddress::from_root("votings_service").append_name("voting"),
    )?;

    Ok(votings.get(&voting_id))
  }

  fn to_schema(&self) -> VotingSchema {
    VotingSchema {
      voting_id: self.voting_id.clone(),
      crypto_system: self.crypto_system.clone().into(),
      ballots_config: self.ballots_config.clone(),
      state: self.state.clone(),
      revote_enabled: self.revote_enabled,
    }
  }
}

impl<T: Access> Voting<T>
where
  T::Base: RawAccessMut,
{
  pub fn create(
    access: T,
    voting_id: &String,
    crypto_system: CryptoSystemSettings,
    mut ballots_config: HashMap<u32, BallotConfig>,
    revote_enabled: bool,
  ) -> Result<Self, Error> {
    let voting_storage = Self::get_storage(access.clone(), &voting_id).unwrap();

    if voting_storage.exists() {
      Err(Error::VotingAlreadyExists)?;
    }

    for (_, config) in ballots_config.iter_mut() {
      if config.options.contains_key(&0) {
        return Err(Error::ChoicesCannotOutOfBounds);
      }

      if config.min_choices == 0 {
        config.min_choices = 1;
      }

      if config.max_choices == 0 {
        config.max_choices = 1;
      }

      if config.min_choices > config.max_choices {
        return Err(Error::ChoicesCannotOutOfBounds);
      }

      if config.max_choices > (config.options.len() as u32) {
        return Err(Error::ChoicesCannotOutOfBounds);
      }
    }

    let mut voting = Self {
      access,
      voting_storage,
      voting_id: voting_id.clone(),
      crypto_system,
      ballots_config,
      state: VotingState::Registration,
      revote_enabled,
    };

    voting.voting_storage.set(voting.to_schema());

    Ok(voting)
  }

  pub fn change_state(&mut self, new_state: VotingState) {
    self.state = new_state;
    self.update_storage();
  }

  pub fn publish_private_key(&mut self, private_key: box_::curve25519xsalsa20poly1305::SecretKey) {
    self.crypto_system.private_key = Some(private_key);
    self.update_storage();
  }

  fn update_storage(&mut self) {
    self.voting_storage.set(self.to_schema());
  }
}
