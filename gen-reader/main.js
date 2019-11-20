import dec from "./dec"

const jsonStoreIo = process.env.JSONSTOREIO
const elU1 = `https://www.jsonstore.io/${jsonStoreIo}/keys`

const $elReload = document.querySelector("#reload")
const $elResponses = document.querySelector("#responses")

const blankForm = () => {
  document.querySelectorAll("main input").forEach((el) => {
    el.disabled = true
    el.checked = false
  })

  const $ta = document.querySelector("main textarea")
  $ta.disabled = true
  $ta.innerText = ""
}

blankForm()

const hydrate = (xyz) => {
  j = JSON.parse(xyz)

  for (const q in j) {
    if (typeof j[q] === "string") {
      const $el = document.querySelector(`textarea[name=${q}]`)
      $el.innerText = j[q]
    } else {
      const $el = document.querySelectorAll(`input[name=${q}]`)
      if (!Array.isArray(j[q])) j[q] = [j[q]]
      j[q].forEach((n) => $el[n - 1].checked = true)
    }
  }
}

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
  .catch(console.error)
})

dec()
  .then((elDec) => {
    $elResponses.addEventListener("click", (ev) => {
      ev.preventDefault()
      if (ev.target.className === "current") return
      const { id } = ev.target.dataset
      if (!id) return
      blankForm()
      const hasCurrent = document.querySelector("#responses li.current")
      if (hasCurrent) hasCurrent.className = ""

      ev.target.className = "current"
      const elU2 = `https://www.jsonstore.io/${jsonStoreIo}/responses/${id}`
      return fetch(elU2)
        .then((res) => res.json())
        .then(({ ok, result }) => {
          if (ok) return elDec(result)
          throw new Error('Not ok')
        })
        .then(hydrate)
    })
  })
  .catch(console.error)

loadResponses()
  .catch(console.error)

