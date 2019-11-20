import dec from "./dec"

const jsonStoreIo = process.env.JSONSTOREIO
const elU1 = `https://www.jsonstore.io/${jsonStoreIo}/keys`

const $elReload = document.querySelector("#reload")
const $elResponses = document.querySelector("#responses")
const $elResponseId = document.querySelector("#response-id")
const $elResponse = document.querySelector("#response")


const loadResponses = () =>
fetch(elU1)
  .then((res) => res.json())
  .then(({ ok, result }) => {
    const responses = []
    for (const id in result) {
      if (typeof result[id] === "number") responses.push({
        createdAt: result[id],
        id
      })
    }
    $elResponses.innerText = ""
    responses
      .sort(({ createdAt: ac }, { createdAt: bc }) => {
        if (ac > bc) return -1
        if (ac < bc) return 1
      })
      .map(({ id, createdAt }) => ({ id, createdAt: new Date(createdAt).toISOString() }))
      .forEach(({ id, createdAt }) => {
        const el = document.createElement("li")
        el.dataset.id = id
        el.innerText = createdAt
        $elResponses.appendChild(el)
      })
  })

$elReload.addEventListener("click", (ev) => {
  ev.preventDefault()
  loadResponses()
  .catch(console,error)
})

dec()
  .then((elDec) => {
    $elResponses.addEventListener("click", (ev) => {
      ev.preventDefault()
      const { id } = ev.target.dataset
      if (!id) return
      $elResponseId.innerText = id
      const elU2 = `https://www.jsonstore.io/${jsonStoreIo}/responses/${id}`
      return fetch(elU2)
        .then((res) => res.json())
        .then(({ ok, result }) => {
          if (ok) return elDec(result)
          throw new Error('Not ok')
        })
        .then((xyz) => {
          $elResponse.innerText = JSON.stringify(JSON.parse(xyz), null, 2)
        })
    })
  })
  .catch(console.error)

loadResponses()
  .catch(console.error)
