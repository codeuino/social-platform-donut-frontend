"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryAllByLabelText = queryAllByLabelText;
exports.getAllByLabelText = getAllByLabelText;
exports.findByLabelText = exports.findAllByLabelText = exports.getByLabelText = exports.queryByLabelText = void 0;

var _allUtils = require("./all-utils");

var _text = require("./text");

function queryAllLabelsByText(container, text, {
  exact = true,
  trim,
  collapseWhitespace,
  normalizer
} = {}) {
  const matcher = exact ? _allUtils.matches : _allUtils.fuzzyMatches;
  const matchNormalizer = (0, _allUtils.makeNormalizer)({
    collapseWhitespace,
    trim,
    normalizer
  });
  return Array.from(container.querySelectorAll('label')).filter(label => {
    let textToMatch = label.textContent; // The children of a textarea are part of `textContent` as well. We
    // need to remove them from the string so we can match it afterwards.

    Array.from(label.querySelectorAll('textarea')).forEach(textarea => {
      textToMatch = textToMatch.replace(textarea.value, '');
    });
    return matcher(textToMatch, label, text, matchNormalizer);
  });
}

function queryAllByLabelText(container, text, {
  selector = '*',
  exact = true,
  collapseWhitespace,
  trim,
  normalizer
} = {}) {
  const matchNormalizer = (0, _allUtils.makeNormalizer)({
    collapseWhitespace,
    trim,
    normalizer
  });
  const labels = queryAllLabelsByText(container, text, {
    exact,
    normalizer: matchNormalizer
  });
  const labelledElements = labels.map(label => {
    if (label.control) {
      return label.control;
    }
    /* istanbul ignore if */


    if (label.getAttribute('for')) {
      // we're using this notation because with the # selector we would have to escape special characters e.g. user.name
      // see https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector#Escaping_special_characters
      // <label for="someId">text</label><input id="someId" />
      // .control support has landed in jsdom (https://github.com/jsdom/jsdom/issues/2175)
      return container.querySelector(`[id="${label.getAttribute('for')}"]`);
    }

    if (label.getAttribute('id')) {
      // <label id="someId">text</label><input aria-labelledby="someId" />
      return container.querySelector(`[aria-labelledby~="${label.getAttribute('id')}"]`);
    }

    if (label.childNodes.length) {
      // <label>text: <input /></label>
      return label.querySelector(selector);
    }

    return null;
  }).filter(label => label !== null).concat((0, _allUtils.queryAllByAttribute)('aria-label', container, text, {
    exact
  }));
  const possibleAriaLabelElements = (0, _text.queryAllByText)(container, text, {
    exact,
    normalizer: matchNormalizer
  });
  const ariaLabelledElements = possibleAriaLabelElements.reduce((allLabelledElements, nextLabelElement) => {
    const labelId = nextLabelElement.getAttribute('id');
    if (!labelId) return allLabelledElements; // ARIA labels can label multiple elements

    const labelledNodes = Array.from(container.querySelectorAll(`[aria-labelledby~="${labelId}"]`));
    return allLabelledElements.concat(labelledNodes);
  }, []);
  return Array.from(new Set([...labelledElements, ...ariaLabelledElements]));
} // the getAll* query would normally look like this:
// const getAllByLabelText = makeGetAllQuery(
//   queryAllByLabelText,
//   (c, text) => `Unable to find a label with the text of: ${text}`,
// )
// however, we can give a more helpful error message than the generic one,
// so we're writing this one out by hand.


function getAllByLabelText(container, text, ...rest) {
  const els = queryAllByLabelText(container, text, ...rest);

  if (!els.length) {
    const labels = queryAllLabelsByText(container, text, ...rest);

    if (labels.length) {
      throw (0, _allUtils.getElementError)(`Found a label with the text of: ${text}, however no form control was found associated to that label. Make sure you're using the "for" attribute or "aria-labelledby" attribute correctly.`, container);
    } else {
      throw (0, _allUtils.getElementError)(`Unable to find a label with the text of: ${text}`, container);
    }
  }

  return els;
} // the reason mentioned above is the same reason we're not using buildQueries


const getMultipleError = (c, text) => `Found multiple elements with the text of: ${text}`;

const queryByLabelText = (0, _allUtils.makeSingleQuery)(queryAllByLabelText, getMultipleError);
exports.queryByLabelText = queryByLabelText;
const getByLabelText = (0, _allUtils.makeSingleQuery)(getAllByLabelText, getMultipleError);
exports.getByLabelText = getByLabelText;
const findAllByLabelText = (0, _allUtils.makeFindQuery)(getAllByLabelText);
exports.findAllByLabelText = findAllByLabelText;
const findByLabelText = (0, _allUtils.makeFindQuery)(getByLabelText);
exports.findByLabelText = findByLabelText;