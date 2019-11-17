// core
const { readFile, writeFile } = require('fs').promises

// npm
const remark = require('remark')
const remark2rehype = require('remark-rehype')
const html = require('rehype-stringify')
const doc = require('rehype-document')
const minify = require('rehype-minify-whitespace')
const format = require('rehype-format')
const sanitize = require('rehype-sanitize')
const slug = require("rehype-slug")
const toc = require("rehype-toc")

// self
const main = require("./rehype-main")
const asForm = require("./rehype-as-form")

const docConfig = {
  js: "main.js",
  css: "style.css",
  title: "yup", // TODO: extract title from markdown h1
  language: "fr", // TODO: autodetect language from markdown
}

const { process } = remark()
  .use(remark2rehype)
  .use(sanitize)
  .use(minify)
  .use(asForm)
  .use(slug)
  .use(main)
  .use(toc, { position: "beforebegin", headings: ["h2"] })
  .use(doc, docConfig)
  .use(format)
  .use(html)

const writer = (c2) => writeFile("questions.html", c2)

const oups = (error) => {
  if ((error.code === "ENOENT") && error.path) {
    return console.error(`Did you forget to create ${error.path}? You can use questions-sample.md as a starter.`)
  }
  console.error(error)
}

readFile("questions.md")
  .then(process)
  .then(writer)
  .catch(oups)
