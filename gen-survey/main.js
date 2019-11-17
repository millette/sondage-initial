// self
import enc from "./enc"
import dec from "./dec"


const woot = () => {
  const str = "U+FoIalg5GxVLnfxIVjb8Grw5eiTN778duceNGBdpwBmum6jb8pMH4k5PPd/jpgqK7/0v7f2UIOji2os9ITxpHp897FKeSX0ZhTgm3Qt5HuCXml4pZbQh/m8XxWhoBdD3oi8Sclaj9jhcnjh9i+oP87semm1hQHw9wSbLdfXZKhMvEdOpbARTK6O7Eof5/96svKnTGZcINLr66YjQDf2BJBlrimqDTYnyatkUYzQ/aDJU930dnCUHMrCgXT4G4JFX17ZlR4eliuRrK89MqsGbgOTK+KAKJ6O3yP6vi6DvNlP/NivIianollqIUPH6N2EmboPpjD0gdfUa85rMy14T0O2hAiSelzc1it2yNdEc7uQp6T/uHcpiv2FwYzlIfVtM8jIbzuYMCLkaN3CjgsuFyE9Wux2ShmoltaZg4fkE++/ioxhMCMegT5qjnmOsrB8y2EJuS1z+PmB9j9oiT+Ldvz+AUZO53Ew/YnzxqPV70qZoijDwwBFLrSyfbBxpAaHrupNMoQK4EcTHSC4WAGXwICODR1hoMpgROZt9PH31rlDl+yXoeFgifRgrAKRvx4bu0OvGLgrJrWDaG11maSVJVue2TWjjCOhi6ThsWDhfHlNdhwGxdBqKE5Gw/7T2qRNhsFwBeiOYRl9ZkY9NXT/8llRH6YbE84FayJJqTXwoOc="
  return dec().then((x) => x(str))
}

woot()
.then(console.log)
.catch(console.error)


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

// TODO: implement remote store (jsonstore.io)

// TODO: implement (duh!)
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
  // TODO Do something with encrypted version...
  elEnc(r2a)
  .then((r2) => {

    // console.log(JSON.stringify(r2, null, 2))
    const div = document.createElement('div')
    const hr = document.createElement('hr')
    const h3 = document.createElement('h3')
    h3.innerText = "Votre réponse"
    const p = document.createElement('pre')
    const sl = JSON.stringify(r2a).length
    const s2 = JSON.stringify(r2).length
    p.innerText = `Taille (pré-encryption): ${sl}
Taille (encrypté): ${s2}

${JSON.stringify(r2, null, 2)}`
    div.appendChild(hr)
    div.appendChild(h3)
    div.appendChild(p)
    const elReset = document.createElement("button")
    elReset.innerText = "Reset"
    elReset.style.width = "100%" // TODO: move to style.css
    elReset.addEventListener("click", () => {
      // FIXME: don't reload page
      window.location.reload()
    })
    div.appendChild(elReset)
    $nav.replaceChild(div, $s2)
  })
  .catch((e) => {
    // whole response was probably larger than 430 (??) characters
    const p = document.createElement("p")
    p.innerText = "Error " + e.message
    $nav.appendChild(p)
  })
})
