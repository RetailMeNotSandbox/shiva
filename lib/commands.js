'use strict'

var pollUntil = require('leadfoot/helpers/pollUntil')

/**
 * @module commands
 */

module.exports = {
/**
 * Custom command to find all elements and select a random one.
 * @param {string} selector - CSS selector for the element
 * @param {module:leadfoot/Command} command - command chain
 */
  selectRandomElement: function (selector, command) {
    return function(value, setContext) {
      return command.findAllByCssSelector(selector)
        .then(function(elements) {
          let index = Math.floor(Math.random() * elements.length)
          setContext(elements[index])
        })
    }
  }
}



