/* eslint-disable no-bitwise */
// import 'core-js';
// import 'regenerator-runtime';

const {
  Cryptor,
  util: {
    hexadecimalToUint8Array,
    uint8ArrayToHexadecimal,
    numberToLeBytes,
  },
} = require('crypto-lib');

const {
  proto: {
    votings_service: { Choices },
  },
} = require('blockchain-connector');

const TransactionSigner = require('./transactionSigner');

const MAX_U32_VALUE = 4294967295;
const PB_MAX_U32_BYTES = 5;
const MARKER_BYTES_LENGTH = 1;

/**
 * Returns true if number is a positive unsigned integer 32-bit.
 * @param {Number} num - The number
 * @returns {Boolean}
 */
const isPositiveU32 = (num) => {
  return Number.isInteger(num) && num > 0 && num <= MAX_U32_VALUE;
};

/**
 * Creates ballot.
 * @param {Object} opts - Ballot options.
 * @param {string} opts.votingId - Voting ID.
 * @param {string} opts.encryptionKey - Encryption key.
 * @param {Number} opts.districtId - District ID.
 * @param {Number} [opts.minChoices] - Minimal choices.
 * @param {Number} [opts.maxChoices] - Maximum choices.
 * @param {Number[]} opts.voterChoices - Voter choices
 * @returns {Object} created ballot { voterAddress, districtId, keyVerificationHash, txHash, tx }
 */
function createBallot({
  votingId,
  encryptionKey,
  districtId,
  minChoices = 1,
  maxChoices = 1,
  voterChoices,
} = {}) {
  if (voterChoices.length < minChoices) {
    throw new Error('voterChoices can not be less minChoices');
  }

  if (voterChoices.length > maxChoices) {
    throw new Error('voterChoices can not be more maxChoices');
  }

  if ((new Set(voterChoices).size) < voterChoices.length) {
    throw new Error('voterChoices can not contain duplicates');
  }

  const choices = Array(maxChoices).fill(0);
  voterChoices.forEach((choice, idx) => {
    choices[idx] = choice;
    if (!isPositiveU32(choice)) {
      throw new Error(`[${voterChoices}] must contain only positive u32 numbers`);
    }
  });

  const choicesMessage = Choices.create({ data: choices });
  const buffer = Choices.encode(choicesMessage).finish();

  /**
   * Protobuf bytes have 7 significant bits, left-most bit is a flag
   * which signalals that further bytes of the same number follow.
   */
  let lengthBytesAmount = 1;
  for (let i = 1; i < buffer.length; i++) {
    if (buffer[i] >>> 7 === 0) break;
    lengthBytesAmount += 1;
  }

  const serviceBytesLength = MARKER_BYTES_LENGTH + lengthBytesAmount;
  const maxBufferSize = maxChoices * PB_MAX_U32_BYTES + serviceBytesLength;

  // Leading zeros
  const zerosAmount = maxBufferSize - buffer.length;
  const leadingZeros = new Uint8Array(zerosAmount).fill(0);
  const leadingLengthBytes = numberToLeBytes(zerosAmount, 2).reverse(); // Big-endian

  const filledBuffer = new Uint8Array([
    ...leadingLengthBytes,
    ...leadingZeros,
    ...buffer,
  ]);

  const cryptor = Cryptor.withRandomKeyPair();

  const encryptedBox = cryptor.encrypt(
    filledBuffer,
    hexadecimalToUint8Array(encryptionKey),
  );

  const signer = new TransactionSigner();
  const rawStoreBallotTx = signer.getSignedTransaction(
    votingId,
    districtId,
    uint8ArrayToHexadecimal(encryptedBox.encryptedMessage),
    uint8ArrayToHexadecimal(encryptedBox.nonce),
    uint8ArrayToHexadecimal(encryptedBox.publicKey),
  );

  const rawTxHash = signer.getRawTransactionHash(rawStoreBallotTx);

  const voterAddress = signer.getAccountAddress();

  const keyVerificationHash = Cryptor.getKeyVerificationHash(
    hexadecimalToUint8Array(encryptionKey),
  );

  return {
    voterAddress,
    districtId,
    keyVerificationHash,
    txHash: rawTxHash,
    tx: rawStoreBallotTx,
  };
}

module.exports = {
  createBallot,
};
