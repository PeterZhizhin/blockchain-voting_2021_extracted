use exonum_rust_runtime::api::{self, ServiceApiState};
use hex;
use std::convert::From;

use crate::{
    errors::Error,
    schema::{CryptoSystemSettings, Voting},
};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct CryptoSystemSettingsQuery {
    pub voting_id: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct CryptoSystemSettingsView {
    public_key: String,
    private_key: Option<String>,
}

impl From<CryptoSystemSettings> for CryptoSystemSettingsView {
    fn from(cs: CryptoSystemSettings) -> Self {
        Self {
            public_key: hex::encode(&cs.public_key.0),
            private_key: cs.private_key.map(|pk| hex::encode(&pk.0)),
        }
    }
}

pub async fn get_crypto_system_settings(
    state: ServiceApiState,
    query: CryptoSystemSettingsQuery,
) -> api::Result<CryptoSystemSettingsView> {
    let voting = Voting::get(state.service_data(), &query.voting_id)
        .ok_or_else(|| Error::VotingDoesNotExist)?;

    Ok(voting.get_crypto_system_settings().into())
}
