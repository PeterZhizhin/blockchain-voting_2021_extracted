use exonum::crypto::{Hash, PublicKey};
use exonum_rust_runtime::api::{self, ServiceApiState};
use hex;
use std::convert::From;

use crate::{
    enums::VotingState,
    errors::Error,
    schema::{Ballot, BallotsStorage, EncryptedChoice, Voting},
    variants::ballot_status::BallotStatus,
};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct InvalidBallotsQuery {
    pub voting_id: String,
    pub from: u32,
    pub limit: u32,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct EncryptedChoiceView {
    pub message: String,
    pub nonce: String,
    pub public_key: String,
}

impl From<EncryptedChoice> for EncryptedChoiceView {
    fn from(enc_choice: EncryptedChoice) -> Self {
        Self {
            message: hex::encode(&enc_choice.encrypted_message),
            nonce: hex::encode(&enc_choice.nonce.0),
            public_key: hex::encode(&enc_choice.public_key.0),
        }
    }
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct InvalidBallotView {
    pub index: u32,
    pub voter: PublicKey,
    pub district_id: u32,
    pub encrypted_choice: EncryptedChoiceView,
    pub store_tx_hash: Hash,
    pub decrypt_tx_hash: Option<Hash>,
    pub status: BallotStatus,
}

impl From<Ballot> for InvalidBallotView {
    fn from(ballot: Ballot) -> Self {
        Self {
            index: ballot.index,
            voter: ballot.voter,
            district_id: ballot.district_id,
            encrypted_choice: ballot.encrypted_choice.into(),
            store_tx_hash: ballot.store_tx_hash,
            decrypt_tx_hash: ballot.decrypt_tx_hash,
            status: ballot.status,
        }
    }
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct InvalidBallotsView {
    pub ballots: Vec<InvalidBallotView>,
}

pub async fn get_invalid_ballots(
    state: ServiceApiState,
    query: InvalidBallotsQuery,
) -> api::Result<InvalidBallotsView> {
    let voting = Voting::get(state.service_data(), &query.voting_id)
        .ok_or_else(|| Error::VotingDoesNotExist)?;

    if voting.get_state() == VotingState::Registration {
        Err(Error::ForbiddenForThisVotingState)?;
    }

    let ballots_storage = BallotsStorage::get(state.service_data(), &query.voting_id)
        .ok_or_else(|| Error::VotingDoesNotExist)?;

    let ballots = ballots_storage
        .get_invalid_ballots(query.from, query.limit)
        .iter()
        .map(|v| v.clone().into())
        .collect();

    let view = InvalidBallotsView { ballots };

    Ok(view)
}
