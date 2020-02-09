"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _flushMicrotasks = _interopRequireDefault(require("./flush-microtasks"));

var _pure = require("./pure");

Object.keys(_pure).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _pure[key];
    }
  });
});

if (typeof afterEach === 'function' && !process.env.RTL_SKIP_AUTO_CLEANUP) {
  afterEach(async () => {
    await (0, _flushMicrotasks.default)();
    (0, _pure.cleanup)();
  });
}