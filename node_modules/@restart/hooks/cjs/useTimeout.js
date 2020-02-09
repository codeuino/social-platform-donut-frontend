"use strict";

exports.__esModule = true;
exports.default = useTimeout;

var _react = require("react");

var _useWillUnmount = _interopRequireDefault(require("./useWillUnmount"));

var _useMounted = _interopRequireDefault(require("./useMounted"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a controller object for setting a timeout that is properly cleaned up
 * once the component unmounts. New timeouts cancel and replace existing ones.
 */
function useTimeout() {
  var isMounted = (0, _useMounted.default)();
  var handle = (0, _react.useRef)();

  var clear = function clear() {
    return clearTimeout(handle.current);
  };

  (0, _useWillUnmount.default)(clear);
  return {
    set: function set(fn, ms) {
      if (!isMounted()) return;
      clear();
      handle.current = setTimeout(fn, ms);
    },
    clear: clear
  };
}