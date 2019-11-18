// npm
import nanoid from 'nanoid'

// self
import enc from "./enc"

const jsonStoreIo = process.env.JSONSTOREIO

const $nav = document.querySelector('nav')
const $form = document.querySelector('main > form')
const $submit = $form.querySelector('input[type=submit]')
const $s2 = document.createElement("button")
$s2.innerText = "Envoyer"
// TODO: move to style.css
$s2.style.width = "100%"
$s2.style.marginTop = "2rem"
$s2.style.height = "3rem"
$nav.appendChild($s2)
$s2.addEventListener("click", () => $submit.click())
$submit.style.display = "none"

const elEnc = (x) => {
  console.log('ENCRYPTING!', x)
  return enc().then((ya) => ya(JSON.stringify(x)))
}

const parser = (textAreas) => ([q, a]) => [
  q,
  (textAreas.indexOf(q) === -1) ? parseInt(a, 10) : a.trim()
]

const fromForm = (target) => {
  const r2 = {}
  Array.from(new FormData(target))
    .map(parser(Array.from(target.querySelectorAll("textarea")).map(({name}) => name)))
    .filter((x) => x[1])
    .forEach(([q, a]) => {
      if (!r2[q]) return r2[q] = a
      if (!Array.isArray(r2[q])) r2[q] = [r2[q]]
      r2[q].push(a)
    })
  return r2
}

$form.addEventListener("submit", (ev) => {
  ev.preventDefault()
  const r2a = fromForm(ev.target)
  elEnc(r2a)
  .then((re2) => {
    const responseId = nanoid(8)
    const elU1 = `https://www.jsonstore.io/${jsonStoreIo}/keys/${responseId}`
    const elU2 = `https://www.jsonstore.io/${jsonStoreIo}/responses/${responseId}`

    return Promise.all([
      fetch(elU1, {
        headers: { 'Content-type': 'application/json' },
        method: "POST",
        body: Date.now()
      }),
      fetch(elU2, {
        headers: { 'Content-type': 'application/json' },
        method: "POST",
        body: JSON.stringify(re2)
      })
    ])
  })
  .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
  .then(([voila1, voila2]) => {
    if (!voila1.ok || !voila2.ok) throw new Error("Problem saving response.")
    setTimeout(() => $nav.querySelector("div").className = "", 1500)
    if ($nav.querySelector("#form-reset")) return $nav.querySelector("div").className = "ping"

    const div = document.createElement('div')
    div.className = "ping"
    const hr = document.createElement('hr')
    const h3 = document.createElement('h3')
    h3.innerText = "Réponses transmises"

    const elReset = document.createElement("button")
    elReset.id = "form-reset"
    elReset.innerText = "Reset"
    elReset.style.width = "100%" // TODO: move to style.css
    elReset.addEventListener("click", $form.reset)

    div.appendChild(hr)
    div.appendChild(h3)

    div.appendChild(elReset)
    // $nav.replaceChild(div, $s2)
    $nav.appendChild(div)

  })
  .catch((e) => {
    // whole response was probably larger than 430 (??) characters
    const p = document.createElement("p")
    p.innerText = "Error " + e.message
    $nav.appendChild(p)
  })
})
