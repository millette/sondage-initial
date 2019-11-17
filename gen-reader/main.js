import dec from "./dec"

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

dec()
  .then((elDec) => {
    const elForm = document.querySelector("form")
    elForm.addEventListener("submit", elSubmit(elDec))
  })
  .catch(oups)
