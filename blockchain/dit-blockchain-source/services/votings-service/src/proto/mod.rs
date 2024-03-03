#![allow(bare_trait_objects)]
#![allow(renamed_and_removed_lints)]

pub use self::config::ServiceConfig;

pub use self::custom_types::{BigUint, SealedBoxNonce, SealedBoxPublicKey, SealedBoxSecretKey};

pub use self::enums::{InvalidReason, VotingState};

pub use self::schema::{
    Ballot, BallotConfig, BallotsStorage, Choices, CryptoSystemSettings, DecryptionStatistics,
    DistrictResults, EncryptedChoice, Voter, VotersRegistry, Voting, VotingResults,
};

pub use self::transactions::{
    TxAddVoterKey, TxBallotConfig, TxCreateVoting, TxCryptoSystemSettings, TxDecryptBallot,
    TxDistrictResults, TxEncryptedChoice, TxFinalizeVoting, TxFinalizeVotingWithResults,
    TxIssueBallot, TxPublishDecryptedBallot, TxPublishDecryptionKey, TxRegisterVoters,
    TxRevokeVoterParticipation, TxStopRegistration, TxStopVoting, TxStoreBallot, TxVotingResults,
};

pub use self::ballot_status::BallotStatus;

include!(concat!(env!("OUT_DIR"), "/protobuf_mod.rs"));

use exonum::crypto::proto::*;
