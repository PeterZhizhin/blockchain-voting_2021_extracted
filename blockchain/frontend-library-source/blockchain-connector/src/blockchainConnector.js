
const axios = require('axios');
const Exonum = require('exonum-client');
const {
  BadTransactionError,
  ContractLogicError,
  RequestError,
} = require('./errors');

const AXIOS_REQUEST_TIMEOUT = 3000;

axios.defaults.timeout = AXIOS_REQUEST_TIMEOUT;
const CancelToken = axios.CancelToken;

const BAD_TX_STATUS = 400;
const BAD_TX_TITLE = 'Failed to add transaction to memory pool';

class BlockchainConnector {
  /**
   * @param {string} apiUrl - blockchain node api url, ex. http://127.0.0.1:8200
   * @param {Object} config - connector configuration
   */
  constructor(apiUrl, config = {}) {
    this.apiUrl = apiUrl;
    this.config = Object.assign({
      txResultRequestAttemps: 10,
      txResultPollingTimeout: 500,
    }, config);
  }

  /**
   * Sends transaction to blockchain without waiting for commitment
   * @param {{publicKey: string, secretKey: string}} sender - transaction sender keypair
   * @param {Exonum.Transaction} tx - transaction object (made with new Exonum.Transaction(...))
   * @param {Object} txData - transaction data
   * @return {Promise<string>} - promise resolved with transaction hash after tx is successfuly sent
   */
  sendTransaction(sender, tx, txData) {
    const transaction = tx.create(txData, sender);
    const serialiedTx = transaction.serialize();

    return this.sendRawTransaction(serialiedTx);
  }

  /**
   * Sends raw transaction to blockchain without waiting for commitment
   * @param {string} rawTx - serialized transaction data in hex
   * @return {Promise<string>} - promise resolved with transaction hash after tx is successfuly sent
   */
  sendRawTransaction(rawTx) {
    // TODO: check whether hash really gives correct transaction hash
    
    if (typeof rawTx !== 'string') {
        rawTx = Exonum.uint8ArrayToHexadecimal(new Uint8Array(rawTx));
    }

    return axios.post(`${this.apiUrl}/api/explorer/v1/transactions`, { tx_body: rawTx }, {
      cancelToken: new CancelToken((cancel) => {
        const cancelRequest = () => cancel(`Cancelled by axios timeout (${AXIOS_REQUEST_TIMEOUT} ms)`);
        setTimeout(cancelRequest, AXIOS_REQUEST_TIMEOUT);
      }),
    })
      .then(() => Exonum.hash(Exonum.hexadecimalToUint8Array(rawTx)))
      .catch((error) => {
        if (error.response) {
          const { status, data: { title, detail } } = error.response;
          if (status === BAD_TX_STATUS && title === BAD_TX_TITLE) {
            throw new BadTransactionError(rawTx, `${title}: ${detail}`);
          }
        }

        throw error;
      });
  }

  /**
   * Returns transaction result, if committed & successfull, otherwise throws error
   * @param {string} txHash - transaction hash
   * @return {Promise<Object>} - promise resolved with transaction info
   */
  getTransactionResult(txHash) {
    const apiUrl = this.apiUrl;

    return axios.get(`${apiUrl}/api/explorer/v1/transactions?hash=${txHash}`, {
      cancelToken: new CancelToken((cancel) => {
        setTimeout(cancel, AXIOS_REQUEST_TIMEOUT);
      }),
    })
      .then((response) => {
        if (response.data.type !== 'committed') {
          throw new Error('Transaction is not committed yet');
        }

        if (response.data.status.type !== 'success') {
          throw new ContractLogicError(
            response.data.status.code,
            response.data.status.description,
            txHash,
          );
        }

        return response.data;
      });
  }

  /**
   * Waits for transaction commitment
   * @param {string} txHash - transaction hash
   * @return {Promise<Object>} - promise resolved with transaction info when tx
   * is commited & successfull
   */
  waitTransactionResult(txHash) {
    let attemptsCounter = this.config.txResultRequestAttemps;
    const pollingTimeout = this.config.txResultPollingTimeout;

    const self = this;

    return new Promise((resolve) => {
      setTimeout(resolve, pollingTimeout);
    }).then(() => {
      const getTxResult = () => {
        // eslint-disable-next-line no-plusplus
        if (attemptsCounter-- === 0) {
          return Promise.reject(new Error('The transaction was not accepted to the block for the expected period.'));
        }

        return self.getTransactionResult(txHash)
          .catch((err) => {
            if (err instanceof ContractLogicError) {
              throw err;
            }

            if (attemptsCounter === 0) {
              throw new Error('The request failed or the blockchain node did not respond.');
            }

            return new Promise((resolve) => {
              setTimeout(resolve, pollingTimeout);
            }).then(getTxResult);
          });
      };

      return getTxResult();
    });
  }

  /**
   * Makes request to blockchain & returns result
   * @param {string} request - relative url path with request params,
   * ex.: services/votings_service/v1/crypto-system-settings?voting_id=5d76...
   * @return {Promise<Object>} - promise resolved with response data
   */
  makeRequest(request) {
    const fullRequestUrl = [this.apiUrl, '/api/', request].join('');

    return axios.get(fullRequestUrl, {
      cancelToken: new CancelToken((cancel) => {
        setTimeout(cancel, AXIOS_REQUEST_TIMEOUT);
      }),
    })
      .then(response => response.data)
      .catch((err) => {
        if (err.response && +err.response.status < 500) {
          const message = err.response.data
            ? `${err.message}: ${JSON.stringify(err.response.data)}`
            : err.message;

          throw new RequestError(+err.response.status, message);
        } else {
          throw err;
        }
      });
  }

  /**
   * Makes post request to blockchain & returns result
   * @param {string} postRequest - relative url path with request params
   * @param {(Object|null)} [data] - request body
   * @returns {Promise<Object>}
   */
  makePostRequest(postRequest, data = null) {
    const fullRequestUrl = [this.apiUrl, '/api/', postRequest].join('');

    return axios.post(fullRequestUrl, data, {
      cancelToken: new CancelToken((cancel) => {
        setTimeout(cancel, AXIOS_REQUEST_TIMEOUT);
      }),
    })
      .then(response => response.data)
      .catch((err) => {
        if (err.response && +err.response.status < 500) {
          const message = err.response.data
            ? `${err.message}: ${JSON.stringify(err.response.data)}`
            : err.message;

          throw new RequestError(+err.response.status, message);
        } else {
          throw err;
        }
      });
  }
}

module.exports = BlockchainConnector;
