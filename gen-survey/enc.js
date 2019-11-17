import pubK from "./public-jwk.json"

const tenc = new TextEncoder()

const algo = { name: "RSA-OAEP", hash: "SHA-256" }

// FIXME: reference (taken from...)
const arrayBufferToBase64 = ab =>
  window.btoa(String.fromCharCode(...new Uint8Array(ab)))

const encryptString = (k, s) =>
    // .encrypt({ name: "RSA-OAEP" }, k, tenc.encode(s))
  window.crypto.subtle.encrypt(algo, k, tenc.encode(s))
    .then(arrayBufferToBase64);

const makeEncryptor = () =>
  window.crypto.subtle.importKey("jwk", pubK, algo, false, ["encrypt"])
    .then(encer => encryptString.bind(null, encer))

export default makeEncryptor
