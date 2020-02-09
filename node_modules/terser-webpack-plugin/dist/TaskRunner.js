"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _os = _interopRequireDefault(require("os"));

var _cacache = _interopRequireDefault(require("cacache"));

var _findCacheDir = _interopRequireDefault(require("find-cache-dir"));

var _jestWorker = _interopRequireDefault(require("jest-worker"));

var _serializeJavascript = _interopRequireDefault(require("serialize-javascript"));

var _minify = _interopRequireDefault(require("./minify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const workerPath = require.resolve('./worker');

class TaskRunner {
  constructor(options = {}) {
    this.options = options;
    this.cacheDir = TaskRunner.getCacheDirectory(this.options.cache);
    this.numberWorkers = TaskRunner.getNumberWorkers(this.options.parallel);
  }

  static getCacheDirectory(cache) {
    return cache === true ? (0, _findCacheDir.default)({
      name: 'terser-webpack-plugin'
    }) || _os.default.tmpdir() : cache;
  }

  static getNumberWorkers(parallel) {
    // In some cases cpus() returns undefined
    // https://github.com/nodejs/node/issues/19022
    const cpus = _os.default.cpus() || {
      length: 1
    };
    return parallel === true ? cpus.length - 1 : Math.min(Number(parallel) || 0, cpus.length - 1);
  }

  async runTask(task) {
    if (this.worker) {
      return this.worker.transform((0, _serializeJavascript.default)(task));
    }

    return (0, _minify.default)(task);
  }

  async run(tasks) {
    if (this.numberWorkers > 1) {
      this.worker = new _jestWorker.default(workerPath, {
        numWorkers: this.numberWorkers
      });
    }

    return Promise.all(tasks.map(task => {
      const enqueue = async () => {
        let result;

        try {
          result = await this.runTask(task);
        } catch (error) {
          result = {
            error
          };
        }

        if (this.cacheDir && !result.error) {
          return _cacache.default.put(this.cacheDir, (0, _serializeJavascript.default)(task.cacheKeys), JSON.stringify(result)).then(() => result, () => result);
        }

        return result;
      };

      if (this.cacheDir) {
        return _cacache.default.get(this.cacheDir, (0, _serializeJavascript.default)(task.cacheKeys)).then(({
          data
        }) => JSON.parse(data), enqueue);
      }

      return enqueue();
    }));
  }

  async exit() {
    if (!this.worker) {
      return Promise.resolve();
    }

    return this.worker.end();
  }

}

exports.default = TaskRunner;