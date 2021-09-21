/* eslint-disable no-console */
const Exonum = require('exonum-client');

const { votings_service: { TxCreateVoting } } = require('../proto');
const { pbConvert } = require('../util');
const TransactionRequest = require('../transactionRequest');

const VOTINGS_SERVICE_ID = 1001;
const CREATE_VOTING_MSG_ID = 0;

/**
 * @typedef BallotConfig
 * @type {Object}
 * @property {number} district_id - district id (integer
 * @property {string} question - question for voting
 * @property {Object.<number, string>} options - options map <option number, option text>
 */

/**
 * Returns TransactionRequest object for making CreateVoting transaction
 * @param {{publicKey: string, secretKey: string}} sender - transaction sender keypair
 * @param {Object} data - transaction data
 * @param {Object} data.crypto_system - cryptosystem settings
 * @param {string} data.crypto_system.public_key - cryptosystem public key
 * @param {Array<BallotConfig>} data.ballots_config - ballots config
 * @param {boolean} data.revote_enabled - revote enabled
 * @return {TransactionRequest}
 */
module.exports = (sender, data) => {
  const createVotingTx = new Exonum.Transaction({
    serviceId: VOTINGS_SERVICE_ID,
    methodId: CREATE_VOTING_MSG_ID,
    schema: TxCreateVoting,
  });

  const txData = {
    crypto_system: {
      public_key: pbConvert.SealedBoxPublicKey(data.crypto_system.public_key),
    },
    ballots_config: data.ballots_config,
    revote_enabled: data.revote_enabled,
  };

  return new TransactionRequest(sender, createVotingTx, txData);
};
