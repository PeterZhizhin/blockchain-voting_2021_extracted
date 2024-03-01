use std::convert::Into;

use exonum::crypto::Hash;
use exonum::runtime::{ExecutionContext, ExecutionError};
use exonum_derive::{BinaryValue, ObjectHash};
use exonum_proto::ProtobufConvert;

use crate::{
    enums::{InvalidReason, VotingState},
    errors::Error,
    proto,
    schema::{BallotsStorage, EncryptedChoice, Voting},
    service::VotingsService,
    types::{SealedBoxNonceWrapper, SealedBoxPublicKeyWrapper},
    variants::ballot_status::BallotStatus,
};

#[derive(Serialize, Deserialize, Clone, Debug, ProtobufConvert, BinaryValue, ObjectHash)]
#[protobuf_convert(source = "proto::TxEncryptedChoice")]
pub struct TxEncryptedChoice {
    pub encrypted_message: Vec<u8>,
    pub nonce: SealedBoxNonceWrapper,
    pub public_key: SealedBoxPublicKeyWrapper,
}

impl Into<EncryptedChoice> for TxEncryptedChoice {
    fn into(self) -> EncryptedChoice {
        EncryptedChoice {
            encrypted_message: self.encrypted_message,
            nonce: self.nonce.into(),
            public_key: self.public_key.into(),
        }
    }
}

#[derive(Serialize, Deserialize, Clone, Debug, ProtobufConvert, BinaryValue, ObjectHash)]
#[protobuf_convert(source = "proto::TxStoreBallot")]
pub struct TxStoreBallot {
    pub voting_id: String,
    pub district_id: u32,
    pub encrypted_choice: TxEncryptedChoice,
    pub sid: String,
}

impl TxStoreBallot {
    pub fn execute(
        _: &VotingsService,
        context: ExecutionContext<'_>,
        tx_args: TxStoreBallot,
    ) -> Result<(), ExecutionError> {
        let author_pk = context
            .caller()
            .author()
            .ok_or_else(|| Error::WrongTxInitiator)?;

        let voting = Voting::get(context.service_data(), &tx_args.voting_id)
            .ok_or_else(|| Error::VotingDoesNotExist)?;

        if voting.get_state() != VotingState::InProcess {
            Err(Error::ForbiddenForThisVotingState)?
        }

        if tx_args.sid.is_empty() {
            Err(Error::MissingTxSid)?
        }

        let ballot_status = match voting
            .get_ballots_config()
            .contains_key(&tx_args.district_id)
        {
            true => BallotStatus::Unknown,
            false => BallotStatus::Invalid(InvalidReason::WrongDistrict),
        };

        let store_tx_hash: Hash = context
            .transaction_hash()
            .ok_or_else(|| Error::WrongTxInitiator)?;

        let mut ballots_storage = BallotsStorage::get(context.service_data(), &tx_args.voting_id)
            .ok_or_else(|| Error::VotingDoesNotExist)?;

        ballots_storage
            .store_ballot(
                author_pk,
                tx_args.district_id.clone(),
                tx_args.encrypted_choice.clone().into(),
                store_tx_hash,
                &tx_args.sid,
                ballot_status,
            )
            .or_else(|_| Err(Error::BallotCannotBeStored))?;

        println!(
            "Ballot stored for voting {}, district {} sid {}",
            tx_args.voting_id, tx_args.district_id, tx_args.sid,
        );
        Ok(())
    }
}
