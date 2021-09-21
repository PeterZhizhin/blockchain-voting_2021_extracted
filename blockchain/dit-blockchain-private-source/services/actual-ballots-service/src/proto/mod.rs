#![allow(bare_trait_objects)]
#![allow(renamed_and_removed_lints)]

pub use self::config::ServiceConfig;

pub use self::schema::{
    ActualBallot, ActualBallotsStorage, DistrictResults, GroupedTxHash, VotingResults,
};

pub use self::enums::InvalidReason;

pub use self::transactions::{
    TxActualBallot, TxCreateActualBallotsStorage, TxResolveGroupIds, TxStoreActualBallots,
    TxStoreGroupedTxHash, TxTallyResults,
};

pub use self::ballot_status::BallotStatus;

include!(concat!(env!("OUT_DIR"), "/protobuf_mod.rs"));

use exonum::crypto::proto::*;
