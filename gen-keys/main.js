import gen from "./gen-keys"

const elSmall = document.querySelector("h1 > small")

const terval = setInterval(() => elSmall.innerText = elSmall.innerText + '.', 333)

const saveLink = (n, k) => {
  const d1 = document.querySelector(`#${n}`)
  d1.innerText = ""
  const blob1 = new window.Blob([JSON.stringify(k, null, 2)], { type: 'application/json' })
  const u1 = URL.createObjectURL(blob1)
  const link1 = document.createElement("a")
  link1.href = u1
  link1.download = `${n}.json`
  link1.innerText = `Save ${n}.json`
  d1.appendChild(link1)
}

const doit = ({ publicJwk, privateJwk }) => {
  clearInterval(terval)
  elSmall.remove()
  saveLink("public-jwk", publicJwk)
  saveLink("private-jwk", privateJwk)
}

const oups = (e) => {
  clearInterval(terval)
  elSmall.remove()
  const el = document.createElement("div")
  const p = document.createElement("p")
  const b = document.createElement("b")
  b.innerText = e
  p.appendChild(b)

  const c = document.createElement("h1")
  c.innerText = "ERROR!"
  el.appendChild(c)

  el.appendChild(p)
  document.querySelector("body").appendChild(el)
}

gen()
.then(doit)
.catch(oups)
