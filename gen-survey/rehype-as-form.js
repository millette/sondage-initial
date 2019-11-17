'use strict'

// npm
const u = require('unist-builder')
const h = require('hastscript')
const findAfter = require('unist-util-find-after')
const visit = require('unist-util-visit-parents')

function main({ prefix } = {}) {
  let questionNumber = 0

  function asRadioButtons (n, e) {
    e.children.push(h("li", h("i", "Ne pas répondre")))
    const last = e.children.length - 1
    e.children.forEach((g, i) => {
      g.children.unshift(
        h("input", {
          value: i === last ? "" : (i + 1),
          name: `q${questionNumber}`,
          type: "radio"
        })
      )
      g.children = [h("label", g.children)]
    })
  }

  function asCheckBoxes (n, e) {
    e.children.forEach((g, i) => {
      g.properties.className = undefined
      g.children[0].properties.name = `q${questionNumber}`
      g.children[0].properties.disabled = false
      g.children[0].properties.value = i + 1
      g.children = [h("label", g.children)]
    })
  }

  function asTextarea (n, e, a) {
    e.children = [
      h(e.tagName, e.children),
      h("textarea", {
        name: `q${questionNumber}`
      })
    ]
    e.tagName = "label"
  }

  function asForm (node, ancestors) {
    const end = findAfter(ancestors[ancestors.length - 1], node, ({ type }) =>  type === "element")

    ++questionNumber
    if (prefix) node.children.unshift(h('span', `Q${questionNumber}.`), u("text", " "))

    switch (end && end.tagName) {
      case "ul":
      case "ol":
        end.tagName = "ol"
        if (end.children[0] && end.children[0].properties.className && (end.children[0].properties.className[0] === 'task-list-item')) {
          asCheckBoxes(node, end)
        } else {
          asRadioButtons(node, end)
        }
        break

      case "p":
        asTextarea(node, end)
        break

      default:
        throw new Error("Unexpected")
    }
  }

  return function transformer(tree) {
    tree.children.push(h("input", { type: "submit" }))
    tree.children = [h("form", { method: "POST" }, tree.children)]
    visit(
      tree,
      ({ tagName }) => tagName === 'h2',
      asForm
    )
  }
}

module.exports = main
