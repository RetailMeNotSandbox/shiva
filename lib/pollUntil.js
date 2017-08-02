'use strict'

var pollUntil = require('leadfoot/helpers/pollUntil')

/**
 * @module pollUntil
 */

module.exports = {
/**
 * Polls until an element exists
 * @param {string} selector - CSS selector for the element
 * @param {module:leadfoot/Command} command - command chain
 * @param {int} timeout - duration of polling before timing out in ms
 */
  pollUntilElement: function (selector, command, timeout) {
    return function () {
      return command
        .then(pollUntil(function (selector) {
          let element = document.querySelector(selector)
          return element ? true : null
        }, [selector], timeout))
    }
  },
/**
 * Polls until an element is enabled
 * @param {string} selector - CSS selector for the element
 * @param {module:leadfoot/Command} command - command chain
 * @param {int} timeout - duration of polling before timing out in ms
 */
  pollUntilElementEnabled: function (selector, command, timeout) {
    return function () {
      return command
        .then(pollUntil(function (enabled, selector) {
          let element = document.querySelector(selector)
          return element && element.disabled === enabled ? false : null
        }, [false, selector], timeout))
    }
  },
/**
 * Polls until an element has a particular attribute
 * @param {string} selector - CSS selector for the element
 * @param {string} attribute - attribute of the element that is being queried
 * @param {string} expected - expected value that the attribute contains
 * @param {module:leadfoot/Command} command - command chain
 * @param {int} timeout - duration of polling before timing out in ms
 */
  pollUntilAttribute: function (selector, attribute, expected, command, timeout) {
    return function () {
      return command
        .then(pollUntil(function (selector, attribute, expected) {
          let element = document.querySelector(selector)

          if (!element) {
            return null
          }
          let classes = element.getAttribute(attribute)

          if(!classes) {
            return null
          }

          let containsClass = classes.includes(expected)
          return containsClass ? true : null
        }, [selector, attribute, expected], timeout))
    }
  },
/**
 * Polls until a certain number of elements exist
 * @param {string} selector - CSS selector for the elements
 * @param {int} expectedNumber - Expected number of elements to exist
 * @param {module:leadfoot/Command} command - command chain
 * @param {int} timeout - duration of polling before timing out in ms
 */
  pollUntilElementsEqual: function (selector, expectedNumber, command, timeout) {
    return function () {
      return command
        .then(pollUntil(function (selector, expectedNumber, timeout) {
          let elements = document.querySelectorAll(selector)

          if (!elements) {
            return null
          }

          let number = elements.length
          return number === expectedNumber ? true : null
        }, [selector, expectedNumber], timeout))
    }
  },
/**
 * Polls until an element's text changes to or away from a provided value
 * @param {boolean} isChangingTo - denotes if the wait is until the text equals or no longer equals the text
 * true is for equals, false is no longer equal to
 * @param {string} text - String that the wait checks against
 * @param {string} selector - CSS selector for the element's text that is being checked
 * @param {module:leadfoot/Command} command - command chain
 * @param {int} timeout - duration of polling before timing out in ms
 */
  pollUntilTextChange: function (isChangingTo, text, selector, command, timeout) {
    return function () {
      return command
        .then(pollUntil(function (isChangingTo, value, selector) {
          let element = document.querySelector(selector)

          if (!element) {
            return null
          }

          let changed = isChangingTo ? element.textContent === value : element.textContent !== value

          return changed ? element.textContent : null
        }, [isChangingTo, text, selector], timeout))
    }
  },
/**
 * Polls until the page url equals what is expected
 * @param {string} url - url value that is waited for
 * @param {module:leadfoot/Command} command - command chain
 * @param {int} timeout - duration of polling before timing out in ms
 */
  pollUntilUrl: function (url, command, timeout) {
    return function () {
      return command
        .then(pollUntil(function (url) {
          let page = document
          return page.URL === url ? true : null
        }, [url], timeout))
    }
  }
}

