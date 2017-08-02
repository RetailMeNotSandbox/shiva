'use strict'

var assert = require('chai').assert

/**
 * @module asserts
 */

module.exports = {
/**
 * Checks that the number of elements is equal to what is expected
 * @param {string} selector - CSS selector to find a number of elements
 * @param {int} expectedNumber - expected number of elements found
 * @param {module:leadfoot/Command} command - command chain
 */
  checkNumberOfElements: function (selector, expectedNumber, command) {
    return function () {
      return command.findAllByCssSelector(selector)
        .then((found) => assert.equal(found, expectedNumber, 'The expected number of elements have been found'))
        .end()
    }
  },
/**
 * Checks that the text of an element equals the string that is expected
 * @param {string} selector - CSS selector for element to check
 * @param {string} expected - expected string that the text will equal
 * @param {module:leadfoot/Command} command - command chain
 */
  checkTextEquals: function (selector, expected, command) {
    return function () {
      return command.findByCssSelector(selector)
          .getVisibleText()
          .then((text) => assert.equal(text, expected, 'The text matches what is expected'))
          .end()
    }
  },
/**
 * Checks that the current url is what is expected
 * @param {string} expected - expected string that the url will equal
 * @param {module:leadfoot/Command} command - command chain
 */
  checkUrlEquals: function (expected, command) {
    return function () {
      return command.getCurrentUrl()
        .then((url) => assert.equal(url, expected, 'The url matches what is expected'))
    }
  }

}

