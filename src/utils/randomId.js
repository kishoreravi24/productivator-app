/**
 * @description An ID Generator similar to previous, but generates shorter ID
 * @returns random string
 */
export const getShortRandomID = () =>
  toBase64(
    `${new Date().getUTCMonth()}${new Date().getUTCDate()}${new Date().getUTCDay()}${new Date().getUTCHours()}${new Date().getUTCMinutes()}${new Date().getUTCSeconds()}${new Date().getUTCMilliseconds()}`
  );

/**
 * @description A custom base64 encoder for ID gen.
 * @param {string} input String to encoded
 * @returns encoded string
 */
function toBase64(input) {
  let hash = "",
    alphabet =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@#",
    alphabetLength = alphabet.length;

  do {
    hash = alphabet[input % alphabetLength] + hash;
    input = parseInt(input / alphabetLength, 10);
  } while (input);

  return hash;
}
