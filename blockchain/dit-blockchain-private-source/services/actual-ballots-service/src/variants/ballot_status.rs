use anyhow;
use exonum_derive::{BinaryValue, ObjectHash};
use exonum_proto::ProtobufConvert;
use serde::{Deserialize, Serialize};

use crate::{enums::InvalidReason, proto};

#[derive(Debug, Clone, Serialize, Deserialize, BinaryValue, ObjectHash, PartialEq, PartialOrd)]
pub enum BallotStatus {
    Unknown,
    Valid,
    Invalid(InvalidReason),
}

impl ProtobufConvert for BallotStatus {
    type ProtoStruct = proto::BallotStatus;

    fn to_pb(&self) -> Self::ProtoStruct {
        let mut pb = Self::ProtoStruct::new();

        match self {
            Self::Unknown => {
                pb.set_unknown(().to_pb());
            }
            Self::Valid => {
                pb.set_valid(().to_pb());
            }
            Self::Invalid(reason) => {
                pb.set_invalid(reason.to_pb());
            }
        }

        pb
    }

    fn from_pb(pb: Self::ProtoStruct) -> anyhow::Result<Self> {
        let msg = if pb.has_unknown() {
            Self::Unknown
        } else if pb.has_valid() {
            Self::Valid
        } else if pb.has_invalid() {
            let reason = InvalidReason::from_pb(pb.get_invalid())?;
            Self::Invalid(reason)
        } else {
            anyhow::bail!("Incorrect protobuf representation of BallotStatus")
        };

        Ok(msg)
    }
}
