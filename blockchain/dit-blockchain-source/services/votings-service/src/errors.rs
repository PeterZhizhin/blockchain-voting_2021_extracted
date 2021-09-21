use exonum::runtime::{ErrorKind, ExecutionFail};
use exonum_derive::ExecutionFail;
use exonum_rust_runtime::api::{self, HttpStatusCode};
use std::convert::From;

/// Error codes emitted by transactions during execution.
#[derive(Debug, ExecutionFail)]
pub enum Error {
    /// Transaction author is not authorised to perform operation
    AuthorNotAuthorized = 0,
    /// Failed to create voting
    FailedToCreateVoting = 1,
    /// Specified voting does not exist
    VotingDoesNotExist = 2,
    /// Requested operation is forbidden for current voting state
    ForbiddenForThisVotingState = 3,
    /// Participation for specified voter cannot be revoked
    ParticipationCannotBeRevoked = 4,
    /// Ballot cannot be issued
    BallotCannotBeIssued = 5,
    /// Ballot cannot be stored
    BallotCannotBeStored = 6,
    /// Decryption key is already published
    DecryptionKeyIsAlreadyPublished = 7,
    /// Decryption key is not published
    DecryptionKeyIsNotPublished = 8,
    /// Ballot cannot be decrypted
    BallotCannotBeDecrypted = 9,
    /// Incorrect private key
    IncorrectPrivateKey = 10,
    /// Decryption is not finished
    DecryptionIsNotFinished = 11,
    /// Ballot does not exist
    BallotDoesNotExist = 12,
    /// Wrong transaction initiator
    WrongTxInitiator = 13,
    /// Specified voter not found
    VoterNotFound = 14,
    /// Voting with specified id already exists
    VotingAlreadyExists = 15,
    /// Choices can not contain duplicates
    ChoicesCannotContainDuplicates = 16,
    /// Choices length can not be less min choices
    ChoicesCannotBeLessMinChoices = 17,
    /// Choices length can not be more max choices
    ChoicesCannotBeMoreMaxChoices = 18,
    /// Choices can not out of bounds
    ChoicesCannotOutOfBounds = 19,
    /// Voter is not in access control list for this voting
    VoterIsNotInAcl = 20,
    /// Voter has already voted
    VoterHasAlreadyVoted = 21,
    /// Ballot for voter was already issued
    BallotForVoterWasAlreadyIssued = 22,
    /// Participation for voter was revoked
    ParticipationForVoterWasRevoked = 23,
    /// District ID cannot be zero
    DistrictIDCannotBeZero = 24,
}

impl From<Error> for api::Error {
    fn from(err: Error) -> Self {
        let title = err.description();
        let code = match err.kind() {
            ErrorKind::Service { code } => code,
            _ => 0,
        };

        Self::new(HttpStatusCode::CONFLICT)
            .title(title)
            .error_code(code)
    }
}
