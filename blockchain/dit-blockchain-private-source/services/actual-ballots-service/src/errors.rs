use exonum::runtime::{ErrorKind, ExecutionFail};
use exonum_derive::ExecutionFail;
use exonum_rust_runtime::api::{self, HttpStatusCode};
use std::convert::From;

/// Error codes emitted by transactions during execution.
#[derive(Debug, ExecutionFail)]
pub enum Error {
    /// Transaction author is not authorised to perform operation
    AuthorNotAuthorized = 0,
    /// Wrong transaction initiator
    WrongTxInitiator = 1,
    /// Voting already exists
    VotingAlreadyExists = 2,
    /// Specified voting does not exist
    VotingDoesNotExist = 3,
    /// Grouped tx hash cannot be stored
    GroupedTxHashCannotBeStored = 4,
    /// Ballot cannot be stored
    BallotCannotBeStored = 5,
    /// Ballot does not exist
    BallotDoesNotExist = 6,
    /// Grouped tx hash does not exist
    GroupedTxHashDoesNotExist = 7,
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
