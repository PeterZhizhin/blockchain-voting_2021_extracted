const BlockchainConnector = require('./src/blockchainConnector');
const ReadRequest = require('./src/readRequest');
const AccountBuilder = require('./src/accountBuilder');
const { calculateRawTxHash } = require('./src/util');
const { VotingState } = require('./src/enums');
const proto = require('./src/proto');

const {
  createVoting,
  registerVoters,
  stopRegistration,
  revokeVoterParticipation,
  issueBallot,
  addVoterKey,
  storeBallot,
  stopVoting,
  publishDecryptionKey,
  decryptBallot,
  finalizeVoting,
  finalizeVotingWithResults,
} = require('./src/transactions');

const {
  getCryptoSystemSettings,
  getBallotsConfig,
  getVotingState,
  getRegisteredVotersAmount,
  getVoterInfo,
  getIssuedBallotsAmount,
  getStoredBallotsAmount,
  getStoredBallotsAmountByDistrict,
  getDecryptionStatistics,
  getBallotByIndex,
  getBallotByStoreTxHash,
  getBallotsByStoreTxHashes,
  getInvalidBallots,
  getVotingResults,
} = require('./src/requests');

const {
  getTransactionInfo,
} = require('./src/systemRequests');

const RawTransactionRequest = require('./src/rawTransactionRequest');
const TransactionRequest = require('./src/transactionRequest');

const {
  BadTransactionError,
  ContractLogicError,
  RequestError,
  blockchainErrors,
} = require('./src/errors');

module.exports = {
  BlockchainConnector,
  ReadRequest,
  AccountBuilder,
  RawTransactionRequest,
  TransactionRequest,
  enums: {
    VotingState,
  },
  transactions: {
    createVoting,
    registerVoters,
    stopRegistration,
    revokeVoterParticipation,
    issueBallot,
    addVoterKey,
    storeBallot,
    stopVoting,
    publishDecryptionKey,
    decryptBallot,
    finalizeVoting,
    finalizeVotingWithResults,
  },
  requests: {
    getCryptoSystemSettings,
    getBallotsConfig,
    getVotingState,
    getRegisteredVotersAmount,
    getVoterInfo,
    getIssuedBallotsAmount,
    getStoredBallotsAmount,
    getStoredBallotsAmountByDistrict,
    getDecryptionStatistics,
    getBallotByIndex,
    getBallotByStoreTxHash,
    getBallotsByStoreTxHashes,
    getInvalidBallots,
    getVotingResults,
  },
  systemRequests: {
    getTransactionInfo,
  },
  util: {
    calculateRawTxHash,
  },
  errors: {
    BadTransactionError,
    ContractLogicError,
    RequestError,
    blockchainErrors,
  },
  proto,
};
