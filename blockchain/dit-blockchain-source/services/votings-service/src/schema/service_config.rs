use exonum_derive::{BinaryValue, FromAccess, ObjectHash};
use exonum_merkledb::{
    access::{Access, FromAccess},
    Entry,
};
use exonum_proto::ProtobufConvert;
use std::default::Default;

use crate::proto;

#[derive(Debug, Clone, Default, ProtobufConvert, BinaryValue, ObjectHash)]
#[protobuf_convert(source = "proto::ServiceConfig", serde_pb_convert)]
pub struct ServiceConfigSchema {
    pub api_public_keys: Vec<String>,
}

#[derive(Debug, FromAccess)]
pub struct ServiceConfig<T: Access> {
    pub config: Entry<T::Base, ServiceConfigSchema>,
}

impl<T: Access> ServiceConfig<T> {
  pub fn instantiate(access: T) -> Self {
      Self::from_root(access).unwrap()
  }

  pub fn get_actual_config(&self) -> ServiceConfigSchema {
      match self.config.get() {
          Some(config) => config,
          None => ServiceConfigSchema::default(),
      }
  }

  pub fn is_api_key(&self, public_key: &str) -> bool {
      match self.config.get() {
          Some(config) => config.api_public_keys.contains(&public_key.to_string()),
          None => false,
      }
  }

  pub fn get_api_keys(&self) -> Vec<String> {
      match self.config.get() {
          Some(config) => config.api_public_keys.clone(),
          None => Vec::new(),
      }
  }
}
