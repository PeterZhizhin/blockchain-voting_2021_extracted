/**
 * Read POST request object can be used to make POST request to blockchain
 */
class ReadPostRequest {
  /**
   * @param {string} requestUrl - request url
   * @param {Object} [body] - post request body if necessary
   * @param {function(Object):any} [responseProcessor] - function for processing response data,
   * if necessary
   */
  constructor(requestUrl, body = null, responseProcessor = null) {
    this.requestUrl = requestUrl;
    this.requestBody = body;
    this.responseProcessor = typeof responseProcessor === 'function'
      ? responseProcessor
      : res => res;
    this.blockchainConnector = null;
  }

  /**
   * Send post request to blockchain
   * @param {BlockchainConnector} blockchainConnector - BlockchainConnector instance
   * @return {Promise} - promise resolved with response data
   */
  send(blockchainConnector) {
    this.blockchainConnector = blockchainConnector;
    return blockchainConnector.makePostRequest(
      this.requestUrl,
      this.requestBody,
    )
      .then(this.responseProcessor);
  }
}

module.exports = ReadPostRequest;
