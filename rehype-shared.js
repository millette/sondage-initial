// npm
const remark = require('remark')
const remark2rehype = require('remark-rehype')
const sanitize = require('rehype-sanitize')
const minify = require('rehype-minify-whitespace')
const doc = require('rehype-document')
const format = require('rehype-format')
const html = require('rehype-stringify')

// self
const asForm = require("../rehype-as-form")

const docConfig = {
  js: "main.js",
  css: "style.css",
  title: "yup", // TODO: extract title from markdown h1
  language: "fr", // TODO: autodetect language from markdown
}

const pre = () => remark()
  .use(remark2rehype)
  .use(sanitize)
  .use(minify)
  .use(asForm)

const post = (it) => it
  .use(doc, docConfig)
  .use(format)
  .use(html)

module.exports = { pre, post }
