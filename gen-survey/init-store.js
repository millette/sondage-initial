// npm
const got = require("got")

got("https://www.jsonstore.io/get-token", { json: true })
  .then(({ body: { token } }) => Promise.all([
    token,
    got.post(`https://www.jsonstore.io/${token}/ready`, {
      json: true,
      body: {
        createdAt: Date.now(),
        ready: true
      },
    })
  ]))
  .then(([token, { headers, url, body: { ok, ...rest } }]) => {
    if (ok) return console.log(ok && token)
    const err new Error("Problem!")
    err.url = url
    err.headers = headers
    err.more = rest
    throw err
  })
  .catch(console.error)
