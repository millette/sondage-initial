import privK from "./private-jwk.json"

const tdec = new TextDecoder("utf-8")

const algo = { name: "RSA-OAEP", hash: "SHA-256" }

// FIXME: reference (taken from... mafintosh..?)
const charCodeAt = (c) => c.charCodeAt(0)
const base64ToArrayBuffer = (x) => new Uint8Array(atob(x).split("").map(charCodeAt))

const decryptString = (k, s) => {
  try {
    return window.crypto.subtle.decrypt(algo, k, base64ToArrayBuffer(s))
      .then((x) => tdec.decode(x))
  } catch (e) {
    return Promise.reject(e)
  }
}

const makeDecryptor = () => window.crypto.subtle.importKey("jwk", privK, algo, false, ["decrypt"])
    .then(decer => decryptString.bind(null, decer))

export default makeDecryptor
