import privK from "./keypair-private-4096.json";

const tdec = new TextDecoder("utf-8");

// FIXME: reference (taken from... mafintosh..?)
const charCodeAt = c => c.charCodeAt(0);
const base64ToArrayBuffer = x =>
  new Uint8Array(
    atob(x)
      .split("")
      .map(charCodeAt)
  );

const decryptString = (k, s) => {
  try {
    return window.crypto.subtle
      .decrypt({ name: "RSA-OAEP" }, k, base64ToArrayBuffer(s))
      .then(tdec.decode.bind(tdec));
  } catch (e) {
    return Promise.reject(e);
  }
};

const makeDecryptor = () =>
  window.crypto.subtle
    .importKey("jwk", privK, { name: "RSA-OAEP", hash: "SHA-256" }, false, [
      "decrypt"
    ])
    .then(decer => decryptString.bind(null, decer));

export default makeDecryptor;
