// core
const { readFile, writeFile } = require('fs').promises

// npm
const slug = require("rehype-slug")
const toc = require("rehype-toc")

// self
const main = require("./rehype-main")
const shared = require("../rehype-shared")

const { process } = shared.post(shared.pre()
  .use(slug)
  .use(main)
  .use(toc, { position: "beforebegin", headings: ["h2"] })
)

const writer = (c2) => writeFile("questions.html", c2)

const oups = (error) => {
  if ((error.code === "ENOENT") && error.path) {
    return console.error(`Did you forget to create ${error.path}? You can use questions-sample.md as a starter.`)
  }
  console.error(error)
}

readFile("../questions.md")
  .then(process)
  .then(writer)
  .catch(oups)
