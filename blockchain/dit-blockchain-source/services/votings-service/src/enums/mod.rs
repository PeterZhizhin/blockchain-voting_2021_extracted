use anyhow::Error;
use protobuf::Enum;
use serde_repr::{Deserialize_repr, Serialize_repr};

use crate::proto;

#[derive(Serialize_repr, Deserialize_repr, Clone, Debug, PartialEq, PartialOrd)]
#[repr(u8)]
pub enum VotingState {
    Registration,
    InProcess,
    Stopped,
    Finished,
}

impl exonum_proto::ProtobufConvert for VotingState {
    type ProtoStruct = proto::VotingState;

    fn to_pb(&self) -> proto::VotingState {
        proto::VotingState::from_i32(self.clone() as i32).unwrap()
    }

    fn from_pb(pb: proto::VotingState) -> Result<Self, Error> {
        match pb.value() {
            0 => Ok(VotingState::Registration),
            1 => Ok(VotingState::InProcess),
            2 => Ok(VotingState::Stopped),
            3 => Ok(VotingState::Finished),
            _ => Err(Error::msg("Illegal VotingState enum value")),
        }
    }
}

#[derive(Serialize_repr, Deserialize_repr, Clone, Debug, PartialEq, PartialOrd)]
#[repr(u8)]
pub enum InvalidReason {
    WrongDistrict,
    DecryptionError,
}

impl exonum_proto::ProtobufConvert for InvalidReason {
    type ProtoStruct = proto::InvalidReason;

    fn to_pb(&self) -> proto::InvalidReason {
        proto::InvalidReason::from_i32(self.clone() as i32).unwrap()
    }

    fn from_pb(pb: proto::InvalidReason) -> Result<Self, Error> {
        match pb.value() {
            0 => Ok(InvalidReason::WrongDistrict),
            1 => Ok(InvalidReason::DecryptionError),
            _ => Err(Error::msg("Illegal VotingState enum value")),
        }
    }
}
