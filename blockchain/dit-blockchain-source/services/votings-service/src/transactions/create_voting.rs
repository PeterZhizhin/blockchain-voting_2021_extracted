use std::collections::HashMap;
use std::convert::Into;

use exonum::runtime::{ExecutionContext, ExecutionError};
use exonum_derive::{BinaryValue, ObjectHash};
use exonum_proto::ProtobufConvert;

use crate::{
    errors::Error,
    proto,
    schema::{
        BallotConfig, BallotsStorage, CryptoSystemSettings, ServiceConfig, VotersRegistry, Voting,
        VotingsRegistry,
    },
    service::VotingsService,
    types::SealedBoxPublicKeyWrapper,
};

#[derive(Serialize, Deserialize, Clone, Debug, ProtobufConvert, BinaryValue, ObjectHash)]
#[protobuf_convert(source = "proto::TxCryptoSystemSettings")]
pub struct TxCryptoSystemSettings {
    pub public_key: SealedBoxPublicKeyWrapper,
}

impl Into<CryptoSystemSettings> for TxCryptoSystemSettings {
    fn into(self) -> CryptoSystemSettings {
        CryptoSystemSettings {
            public_key: self.public_key.into(),
            private_key: None,
        }
    }
}

#[derive(Serialize, Deserialize, Clone, Debug, ProtobufConvert, BinaryValue, ObjectHash)]
#[protobuf_convert(source = "proto::TxBallotConfig")]
pub struct TxBallotConfig {
    pub district_id: u32,
    pub question: String,
    pub options: HashMap<u32, String>,
    pub min_choices: u32,
    pub max_choices: u32,
}

impl Into<BallotConfig> for TxBallotConfig {
    fn into(self) -> BallotConfig {
        BallotConfig {
            district_id: self.district_id,
            question: self.question,
            options: self.options,
            min_choices: self.min_choices,
            max_choices: self.max_choices,
        }
    }
}

#[derive(Serialize, Deserialize, Clone, Debug, ProtobufConvert, BinaryValue, ObjectHash)]
#[protobuf_convert(source = "proto::TxCreateVoting")]
pub struct TxCreateVoting {
    pub crypto_system: TxCryptoSystemSettings,
    pub ballots_config: Vec<TxBallotConfig>,
    pub revote_enabled: bool,
}

impl TxCreateVoting {
    pub fn execute(
        _: &VotingsService,
        context: ExecutionContext<'_>,
        tx_args: TxCreateVoting,
    ) -> Result<(), ExecutionError> {
        let author_pk = context
            .caller()
            .author()
            .ok_or_else(|| Error::WrongTxInitiator)?;

        let service_data = context.service_data();
        let config = ServiceConfig::instantiate(service_data.clone());

        if !config.is_api_key(&author_pk.to_hex()) {
            Err(Error::AuthorNotAuthorized)?
        }

        let voting_id = context
            .transaction_hash()
            .ok_or_else(|| Error::WrongTxInitiator)?
            .to_hex();

        Voting::create(
            context.service_data(),
            &voting_id,
            tx_args.crypto_system.clone().into(),
            tx_args
                .ballots_config
                .iter()
                .fold(HashMap::new(), |mut map, config| {
                    let district_id = config.district_id.clone();
                    map.insert(district_id, config.clone().into());
                    map
                }),
            tx_args.revote_enabled,
        )
        .or_else(|_| Err(Error::FailedToCreateVoting))?;

        let mut votings_registry = VotingsRegistry::instantiate(context.service_data());
        votings_registry.register_voting(voting_id.clone());

        VotersRegistry::create(context.service_data(), &voting_id)
            .or_else(|_| Err(Error::FailedToCreateVoting))?;

        BallotsStorage::create(context.service_data(), &voting_id)
            .or_else(|_| Err(Error::FailedToCreateVoting))?;

        println!("Voting created with ID {}", voting_id);
        Ok(())
    }
}
