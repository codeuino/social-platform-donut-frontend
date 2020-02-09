"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getQueriesForElement = getQueriesForElement;

var defaultQueries = _interopRequireWildcard(require("./queries"));

/**
 * @typedef {{[key: string]: Function}} FuncMap
 */

/**
 * @param {HTMLElement} element container
 * @param {FuncMap} queries object of functions
 * @returns {FuncMap} returns object of functions bound to container
 */
function getQueriesForElement(element, queries = defaultQueries) {
  return Object.keys(queries).reduce((helpers, key) => {
    const fn = queries[key];
    helpers[key] = fn.bind(null, element);
    return helpers;
  }, {});
}