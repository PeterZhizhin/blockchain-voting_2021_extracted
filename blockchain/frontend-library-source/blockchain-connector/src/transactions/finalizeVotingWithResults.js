/* eslint-disable no-console */
const Exonum = require('exonum-client');

const { votings_service: { TxFinalizeVotingWithResults } } = require('../proto');
const TransactionRequest = require('../transactionRequest');

const VOTINGS_SERVICE_ID = 1001;
const FINALIZE_VOTING_WITH_RESULTS_MSG_ID = 11;

/**
 * Returns TransactionRequest object for making FinalizeVoting transaction
 * @param {{publicKey: string, secretKey: string}} sender - transaction sendet keypair
 * @param {Object} data - transaction data
 * @param {string} data.voting_id - voting id
 * @param {string} data.results - voting results
 * @return {TransactionRequest}
 */
module.exports = (sender, data) => {
  const finalizeVotingTx = new Exonum.Transaction({
    serviceId: VOTINGS_SERVICE_ID,
    methodId: FINALIZE_VOTING_WITH_RESULTS_MSG_ID,
    schema: TxFinalizeVotingWithResults,
  });

  const txData = {
    voting_id: data.voting_id,
    seed: Exonum.randomUint64(),
    results: data.results,
  };

  return new TransactionRequest(sender, finalizeVotingTx, txData);
};
