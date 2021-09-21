/**
 * Converts number to little-endian hex representation
 * @param {number} num - number
 * @param {number} [lengthInBytes] - length in bytes (fill zeros)
 * @return {Uint8Array} - little-endian bytes as Uint8Arrary
 */
module.exports = (num, lengthInBytes = null) => {
  let hex = parseInt(num, 10).toString(16);
  if (hex.length % 2 !== 0) {
    hex = `0${hex}`; // eslint-disable-line prefer-template
  }

  // eslint-disable-next-line prefer-const
  let bytes = [];

  for (let i = 0; i < hex.length; i += 2) {
    bytes.push(parseInt(hex.slice(i, i + 2), 16));
  }

  bytes.reverse();

  if (lengthInBytes) {
    const zerosAmount = lengthInBytes - bytes.length;
    for (let i = 0; i < zerosAmount; i++) {
      bytes.push(0);
    }
  }

  return new Uint8Array(bytes);
};
