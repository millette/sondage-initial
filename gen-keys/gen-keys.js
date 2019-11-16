'use strict'

const za = (key) => window.crypto.subtle.exportKey("jwk", key)

const run = () => window.crypto.subtle.generateKey(
  {
    name: "RSA-OAEP",
    modulusLength: 4096,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: "SHA-256",
  },
  true,
  ["encrypt", "decrypt"]
)
.then(({ publicKey, privateKey }) => Promise.all([za(publicKey), za(privateKey)]))
.then(([publicJwk, privateJwk]) => ({ publicJwk, privateJwk }))
/*
.then(([publicJwk, privateJwk]) => {
  console.log("publicJwk", publicJwk)
  console.log("privateJwk", privateJwk)

})
  .catch(console.error)
}
*/

export default run
