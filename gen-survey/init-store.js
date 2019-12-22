// npm
const got = require("got")

// got("https://www.jsonstore.io/get-token", { json: true })
// got("https://www.jsonstore.io/get-token").json()
got("https://www.jsonstore.io/get-token", { responseType: "json" })
  .then(({ body: { token } }) => Promise.all([
    token,
    got.post(`https://www.jsonstore.io/${token}/ready`, {
      responseType: "json",
      json: {
        createdAt: Date.now(),
        ready: true
      },

      /*
      json: true,
      body: {
        createdAt: Date.now(),
        ready: true
      },
      */
    }) // .json()
  ]))
  .then(([token, { headers, url, body: { ok, ...rest } }]) => {
    if (!ok) {
      const err = new Error("Problem!")
      err.url = url
      err.headers = headers
      err.more = rest
      throw err
    }
    console.log(`If you don't already have an \`.env\` file or you don't mind losing its content,
you can initialize it with the following content:

JSONSTOREIO=${token}

If you loose your JSONSTOREIO token, you will loose access to all the responses you've gathered.

Create a separate JSONSTOREIO token for each survey you want to host.
`)
  })
  .catch(console.error)
