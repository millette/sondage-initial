import dec from "./dec"

const jsonStoreIo = process.env.JSONSTOREIO
const elU1 = `https://www.jsonstore.io/${jsonStoreIo}/keys`

const $elResponses = document.querySelector("#responses")



$elResponses.addEventListener("click", (ev) => {
  ev.preventDefault()
  if (!ev.target.dataset.id) return
  console.log("target", ev.target)
  console.log("data", ev.target.dataset.id)

},
)
fetch(elU1)
  .then((res) => res.json())
  .then(({ ok, result }) => {
    const responses = []
    for (const id in result) {
      if (typeof result[id] === "number") responses.push({
        createdAt: result[id], // new Date(result[id]),
        id
      })
    }
    return responses
      .sort(({ createdAt: ac }, { createdAt: bc }) => {
        if (ac > bc) return -1
        if (ac < bc) return 1
      })
      .map(({ id, createdAt }) => ({ id, createdAt: new Date(createdAt) }))
      .forEach(({ id, createdAt }) => {
        const el = document.createElement("li")
        el.dataset.id = id
        el.innerText = createdAt
        $elResponses.appendChild(el)
      })


  })
  // .then(console.log)

const oups = (e) => {
  const p = document.createElement("p")
  p.innerText = e
  document.querySelector("body").appendChild(p)
}

const elSubmit = (dg) => (ev) => {
  ev.preventDefault()
  dg(new window.FormData(ev.target).get("msg"))
    .then((bo) => {
      const j = JSON.parse(bo)
      const pre = document.createElement("pre")
      pre.innerText = JSON.stringify(j, null, 2)
      document.querySelector("body").appendChild(pre)
    })
    .catch(oups)
}

/*
dec()
  .then((elDec) => {
    const elForm = document.querySelector("form")
    elForm.addEventListener("submit", elSubmit(elDec))
  })
  .catch(oups)
*/
