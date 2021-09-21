class BadTransactionError extends Error {
  constructor(rawTx, message) {
    super(message);
    this.rawTx = rawTx;
  }
}

module.exports = BadTransactionError;
