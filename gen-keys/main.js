import gen from "./gen-keys"

const elSmall = document.querySelector("h1 > small")

const terval = setInterval(() => {
  elSmall.innerText = elSmall.innerText + '.'
}, 333)

gen()
.then(({ publicJwk, privateJwk }) => {
  clearInterval(terval)
  elSmall.remove()

  const d1 = document.querySelector("#public-jwk")
  const d2 = document.querySelector("#private-jwk")

  d1.innerText = ""
  d2.innerText = ""

  const blob1 = new window.Blob([JSON.stringify(publicJwk, null, 2)], { type: 'application/json' })
  const u1 = URL.createObjectURL(blob1)
  const link1 = document.createElement("a")
  link1.href = u1
  link1.download = "public-jwk.json"
  link1.innerText = "Save public-jwk.json"

  const blob2 = new window.Blob([JSON.stringify(privateJwk, null, 2)], { type: 'application/json' })
  const u2 = URL.createObjectURL(blob2)
  const link2 = document.createElement("a")
  link2.href = u2
  link2.download = "private-jwk.json"
  link2.innerText = "Save private-jwk.json"

  d1.appendChild(link1)
  d2.appendChild(link2)
})
.catch(console.error)
