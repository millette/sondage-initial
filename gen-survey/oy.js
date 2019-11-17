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

const { process } = remark()
  .use(remark2rehype) // , { fragment: true }
  .use(sanitize)
  .use(minify)
  .use(asForm)
  .use(slug)
  .use(main)
  .use(toc, { position: "beforebegin", headings: ["h2"] })
  .use(doc, { js: "main.js", css: "style.css", title: "yup", language: "fr" })
  .use(format)

  .use(html)

const writer = (c2) => writeFile("questions.html", c2)

readFile("questions.md")
  .then(process)
  .then(writer)
  .catch(console.error)
