'use strict'

const u = require('unist-builder')
const h = require('hastscript')

function main() {
  return function transformer(tree) {
    return u('root', [
      h('nav', [
        h('button', { id: "reload" }, "Reload"),
        h('h3', "Responses"),
        h('ol', { id:"responses" })
      ]),
      h('main', tree.children)
    ])
  }
}

module.exports = main
