import pubK from "./keypair-public-4096.json";

const tenc = new TextEncoder();

// FIXME: reference (taken from...)
const arrayBufferToBase64 = ab =>
  window.btoa(String.fromCharCode(...new Uint8Array(ab)));

const encryptString = (k, s) =>
  window.crypto.subtle
    .encrypt({ name: "RSA-OAEP" }, k, tenc.encode(s))
    .then(arrayBufferToBase64);

const makeEncryptor = () =>
  window.crypto.subtle
    .importKey("jwk", pubK, { name: "RSA-OAEP", hash: "SHA-256" }, false, [
      "encrypt"
    ])
    .then(encer => encryptString.bind(null, encer));

export default makeEncryptor;
