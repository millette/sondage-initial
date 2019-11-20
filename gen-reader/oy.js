// core
const { readFile, writeFile } = require('fs').promises

// self
const main = require("./rehype-main")
const shared = require("../rehype-shared")

const { process } = shared.post(shared.pre({ formConfig: { prefix: true, noForm: true } }).use(main))

const writer = (c2) => writeFile("index.html", c2)

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
