import gen from "./gen-keys"

gen()
.then(({ publicJwk, privateJwk }) => {
  document.querySelector("h1 > small").remove()
  document.querySelector("#public-jwk").innerText = JSON.stringify(publicJwk, null, 2)
  document.querySelector("#private-jwk").innerText = JSON.stringify(privateJwk, null, 2)
})
.catch(console.error)
