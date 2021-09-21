extern crate exonum_derive;
extern crate exonum_merkledb;
extern crate hex;
extern crate toml;
#[macro_use]
extern crate serde_derive;

mod service;

pub mod api;
pub mod enums;
pub mod errors;
pub mod proto;
pub mod schema;
pub mod transactions;
pub mod types;
pub mod util;
pub mod variants;

pub use self::service::VotingsService;
