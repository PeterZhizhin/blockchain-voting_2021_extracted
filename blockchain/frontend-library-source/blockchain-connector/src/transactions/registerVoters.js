/* eslint-disable no-console */
const Exonum = require('exonum-client');

const { votings_service: { TxRegisterVoters } } = require('../proto');
const TransactionRequest = require('../transactionRequest');

const VOTINGS_SERVICE_ID = 1001;
const REGISTER_VOTERS_MSG_ID = 1;

/**
 * Returns TransactionRequest object for making RegisterVoters transaction
 * @param {{publicKey: string, secretKey: string}} sender - transaction sendet keypair
 * @param {Object} data - transaction data
 * @param {string} data.voting_id - voting ID
 * @param {string[]} data.voters - voters IDs list
 * @return {TransactionRequest}
 */
module.exports = (sender, data) => {
  const registerVotersTx = new Exonum.Transaction({
    serviceId: VOTINGS_SERVICE_ID,
    methodId: REGISTER_VOTERS_MSG_ID,
    schema: TxRegisterVoters,
  });

  const txData = {
    voting_id: data.voting_id,
    voters: data.voters,
  };

  return new TransactionRequest(sender, registerVotersTx, txData);
};
