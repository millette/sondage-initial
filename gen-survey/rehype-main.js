'use strict'

const u = require('unist-builder')
const h = require('hastscript')

function main() {
  return function transformer(tree) {
    return u('root', [h('main', tree.children)])
  }
}

module.exports = main
