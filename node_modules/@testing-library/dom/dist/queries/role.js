"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryAllByRole = queryAllByRole;
exports.findByRole = exports.findAllByRole = exports.getByRole = exports.getAllByRole = exports.queryByRole = void 0;

var _roleHelpers = require("../role-helpers");

var _allUtils = require("./all-utils");

function queryAllByRole(container, role, {
  exact = true,
  collapseWhitespace,
  hidden = (0, _allUtils.getConfig)().defaultHidden,
  trim,
  normalizer
} = {}) {
  const matcher = exact ? _allUtils.matches : _allUtils.fuzzyMatches;
  const matchNormalizer = (0, _allUtils.makeNormalizer)({
    collapseWhitespace,
    trim,
    normalizer
  });
  const subtreeIsInaccessibleCache = new WeakMap();

  function cachedIsSubtreeInaccessible(element) {
    if (!subtreeIsInaccessibleCache.has(element)) {
      subtreeIsInaccessibleCache.set(element, (0, _roleHelpers.isSubtreeInaccessible)(element));
    }

    return subtreeIsInaccessibleCache.get(element);
  }

  return Array.from(container.querySelectorAll('*')).filter(node => {
    const isRoleSpecifiedExplicitly = node.hasAttribute('role');

    if (isRoleSpecifiedExplicitly) {
      return matcher(node.getAttribute('role'), node, role, matchNormalizer);
    }

    const implicitRoles = (0, _roleHelpers.getImplicitAriaRoles)(node);
    return implicitRoles.some(implicitRole => matcher(implicitRole, node, role, matchNormalizer));
  }).filter(element => {
    return hidden === false ? (0, _roleHelpers.isInaccessible)(element, {
      isSubtreeInaccessible: cachedIsSubtreeInaccessible
    }) === false : true;
  });
}

const getMultipleError = (c, role) => `Found multiple elements with the role "${role}"`;

const getMissingError = (container, role, {
  hidden = (0, _allUtils.getConfig)().defaultHidden
} = {}) => {
  const roles = (0, _roleHelpers.prettyRoles)(container, {
    hidden
  });
  let roleMessage;

  if (roles.length === 0) {
    if (hidden === false) {
      roleMessage = 'There are no accessible roles. But there might be some inaccessible roles. ' + 'If you wish to access them, then set the `hidden` option to `true`. ' + 'Learn more about this here: https://testing-library.com/docs/dom-testing-library/api-queries#byrole';
    } else {
      roleMessage = 'There are no available roles.';
    }
  } else {
    roleMessage = `
Here are the ${hidden === false ? 'accessible' : 'available'} roles:

  ${roles.replace(/\n/g, '\n  ').replace(/\n\s\s\n/g, '\n\n')}
`.trim();
  }

  return `
Unable to find an ${hidden === false ? 'accessible ' : ''}element with the role "${role}"

${roleMessage}`.trim();
};

const [queryByRole, getAllByRole, getByRole, findAllByRole, findByRole] = (0, _allUtils.buildQueries)(queryAllByRole, getMultipleError, getMissingError);
exports.findByRole = findByRole;
exports.findAllByRole = findAllByRole;
exports.getByRole = getByRole;
exports.getAllByRole = getAllByRole;
exports.queryByRole = queryByRole;