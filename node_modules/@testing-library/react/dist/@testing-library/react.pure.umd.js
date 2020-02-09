(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-dom'), require('react-dom/test-utils')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-dom', 'react-dom/test-utils'], factory) :
  (global = global || self, factory(global.TestingLibraryReact = {}, global.React, global.ReactDom, global.testUtils));
}(this, (function (exports, React, ReactDOM, testUtils) { 'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;
  ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var runtime_1 = createCommonjsModule(function (module) {
    /**
     * Copyright (c) 2014-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    var runtime = function (exports) {

      var Op = Object.prototype;
      var hasOwn = Op.hasOwnProperty;
      var undefined$1; // More compressible than void 0.

      var $Symbol = typeof Symbol === "function" ? Symbol : {};
      var iteratorSymbol = $Symbol.iterator || "@@iterator";
      var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
      var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

      function wrap(innerFn, outerFn, self, tryLocsList) {
        // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
        var generator = Object.create(protoGenerator.prototype);
        var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
        // .throw, and .return methods.

        generator._invoke = makeInvokeMethod(innerFn, self, context);
        return generator;
      }

      exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
      // record like context.tryEntries[i].completion. This interface could
      // have been (and was previously) designed to take a closure to be
      // invoked without arguments, but in all the cases we care about we
      // already have an existing method we want to call, so there's no need
      // to create a new function object. We can even get away with assuming
      // the method takes exactly one argument, since that happens to be true
      // in every case, so we don't have to touch the arguments object. The
      // only additional allocation required is the completion record, which
      // has a stable shape and so hopefully should be cheap to allocate.

      function tryCatch(fn, obj, arg) {
        try {
          return {
            type: "normal",
            arg: fn.call(obj, arg)
          };
        } catch (err) {
          return {
            type: "throw",
            arg: err
          };
        }
      }

      var GenStateSuspendedStart = "suspendedStart";
      var GenStateExecuting = "executing";
      var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
      // breaking out of the dispatch switch statement.

      var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
      // .constructor.prototype properties for functions that return Generator
      // objects. For full spec compliance, you may wish to configure your
      // minifier not to mangle the names of these two functions.

      function Generator() {}

      function GeneratorFunction() {}

      function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
      // don't natively support it.


      var IteratorPrototype = {};

      IteratorPrototype[iteratorSymbol] = function () {
        return this;
      };

      var getProto = Object.getPrototypeOf;
      var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

      if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
        // This environment has a native %IteratorPrototype%; use it instead
        // of the polyfill.
        IteratorPrototype = NativeIteratorPrototype;
      }

      var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
      GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
      GeneratorFunctionPrototype.constructor = GeneratorFunction;
      GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction"; // Helper for defining the .next, .throw, and .return methods of the
      // Iterator interface in terms of a single ._invoke method.

      function defineIteratorMethods(prototype) {
        ["next", "throw", "return"].forEach(function (method) {
          prototype[method] = function (arg) {
            return this._invoke(method, arg);
          };
        });
      }

      exports.isGeneratorFunction = function (genFun) {
        var ctor = typeof genFun === "function" && genFun.constructor;
        return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
      };

      exports.mark = function (genFun) {
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
        } else {
          genFun.__proto__ = GeneratorFunctionPrototype;

          if (!(toStringTagSymbol in genFun)) {
            genFun[toStringTagSymbol] = "GeneratorFunction";
          }
        }

        genFun.prototype = Object.create(Gp);
        return genFun;
      }; // Within the body of any async function, `await x` is transformed to
      // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
      // `hasOwn.call(value, "__await")` to determine if the yielded value is
      // meant to be awaited.


      exports.awrap = function (arg) {
        return {
          __await: arg
        };
      };

      function AsyncIterator(generator) {
        function invoke(method, arg, resolve, reject) {
          var record = tryCatch(generator[method], generator, arg);

          if (record.type === "throw") {
            reject(record.arg);
          } else {
            var result = record.arg;
            var value = result.value;

            if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
              return Promise.resolve(value.__await).then(function (value) {
                invoke("next", value, resolve, reject);
              }, function (err) {
                invoke("throw", err, resolve, reject);
              });
            }

            return Promise.resolve(value).then(function (unwrapped) {
              // When a yielded Promise is resolved, its final value becomes
              // the .value of the Promise<{value,done}> result for the
              // current iteration.
              result.value = unwrapped;
              resolve(result);
            }, function (error) {
              // If a rejected Promise was yielded, throw the rejection back
              // into the async generator function so it can be handled there.
              return invoke("throw", error, resolve, reject);
            });
          }
        }

        var previousPromise;

        function enqueue(method, arg) {
          function callInvokeWithMethodAndArg() {
            return new Promise(function (resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }

          return previousPromise = // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        } // Define the unified helper method that is used to implement .next,
        // .throw, and .return (see defineIteratorMethods).


        this._invoke = enqueue;
      }

      defineIteratorMethods(AsyncIterator.prototype);

      AsyncIterator.prototype[asyncIteratorSymbol] = function () {
        return this;
      };

      exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
      // AsyncIterator objects; they just return a Promise for the value of
      // the final result produced by the iterator.

      exports.async = function (innerFn, outerFn, self, tryLocsList) {
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
        return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
        : iter.next().then(function (result) {
          return result.done ? result.value : iter.next();
        });
      };

      function makeInvokeMethod(innerFn, self, context) {
        var state = GenStateSuspendedStart;
        return function (method, arg) {
          if (state === GenStateExecuting) {
            throw new Error("Generator is already running");
          }

          if (state === GenStateCompleted) {
            if (method === "throw") {
              throw arg;
            } // Be forgiving, per 25.3.3.3.3 of the spec:
            // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


            return doneResult();
          }

          context.method = method;
          context.arg = arg;

          while (true) {
            var delegate = context.delegate;

            if (delegate) {
              var delegateResult = maybeInvokeDelegate(delegate, context);

              if (delegateResult) {
                if (delegateResult === ContinueSentinel) continue;
                return delegateResult;
              }
            }

            if (context.method === "next") {
              // Setting context._sent for legacy support of Babel's
              // function.sent implementation.
              context.sent = context._sent = context.arg;
            } else if (context.method === "throw") {
              if (state === GenStateSuspendedStart) {
                state = GenStateCompleted;
                throw context.arg;
              }

              context.dispatchException(context.arg);
            } else if (context.method === "return") {
              context.abrupt("return", context.arg);
            }

            state = GenStateExecuting;
            var record = tryCatch(innerFn, self, context);

            if (record.type === "normal") {
              // If an exception is thrown from innerFn, we leave state ===
              // GenStateExecuting and loop back for another invocation.
              state = context.done ? GenStateCompleted : "suspendedYield";

              if (record.arg === ContinueSentinel) {
                continue;
              }

              return {
                value: record.arg,
                done: context.done
              };
            } else if (record.type === "throw") {
              state = GenStateCompleted; // Dispatch the exception by looping back around to the
              // context.dispatchException(context.arg) call above.

              context.method = "throw";
              context.arg = record.arg;
            }
          }
        };
      } // Call delegate.iterator[context.method](context.arg) and handle the
      // result, either by returning a { value, done } result from the
      // delegate iterator, or by modifying context.method and context.arg,
      // setting context.delegate to null, and returning the ContinueSentinel.


      function maybeInvokeDelegate(delegate, context) {
        var method = delegate.iterator[context.method];

        if (method === undefined$1) {
          // A .throw or .return when the delegate iterator has no .throw
          // method always terminates the yield* loop.
          context.delegate = null;

          if (context.method === "throw") {
            // Note: ["return"] must be used for ES3 parsing compatibility.
            if (delegate.iterator["return"]) {
              // If the delegate iterator has a return method, give it a
              // chance to clean up.
              context.method = "return";
              context.arg = undefined$1;
              maybeInvokeDelegate(delegate, context);

              if (context.method === "throw") {
                // If maybeInvokeDelegate(context) changed context.method from
                // "return" to "throw", let that override the TypeError below.
                return ContinueSentinel;
              }
            }

            context.method = "throw";
            context.arg = new TypeError("The iterator does not provide a 'throw' method");
          }

          return ContinueSentinel;
        }

        var record = tryCatch(method, delegate.iterator, context.arg);

        if (record.type === "throw") {
          context.method = "throw";
          context.arg = record.arg;
          context.delegate = null;
          return ContinueSentinel;
        }

        var info = record.arg;

        if (!info) {
          context.method = "throw";
          context.arg = new TypeError("iterator result is not an object");
          context.delegate = null;
          return ContinueSentinel;
        }

        if (info.done) {
          // Assign the result of the finished delegate to the temporary
          // variable specified by delegate.resultName (see delegateYield).
          context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

          context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
          // exception, let the outer generator proceed normally. If
          // context.method was "next", forget context.arg since it has been
          // "consumed" by the delegate iterator. If context.method was
          // "return", allow the original .return call to continue in the
          // outer generator.

          if (context.method !== "return") {
            context.method = "next";
            context.arg = undefined$1;
          }
        } else {
          // Re-yield the result returned by the delegate method.
          return info;
        } // The delegate iterator is finished, so forget it and continue with
        // the outer generator.


        context.delegate = null;
        return ContinueSentinel;
      } // Define Generator.prototype.{next,throw,return} in terms of the
      // unified ._invoke helper method.


      defineIteratorMethods(Gp);
      Gp[toStringTagSymbol] = "Generator"; // A Generator should always return itself as the iterator object when the
      // @@iterator function is called on it. Some browsers' implementations of the
      // iterator prototype chain incorrectly implement this, causing the Generator
      // object to not be returned from this call. This ensures that doesn't happen.
      // See https://github.com/facebook/regenerator/issues/274 for more details.

      Gp[iteratorSymbol] = function () {
        return this;
      };

      Gp.toString = function () {
        return "[object Generator]";
      };

      function pushTryEntry(locs) {
        var entry = {
          tryLoc: locs[0]
        };

        if (1 in locs) {
          entry.catchLoc = locs[1];
        }

        if (2 in locs) {
          entry.finallyLoc = locs[2];
          entry.afterLoc = locs[3];
        }

        this.tryEntries.push(entry);
      }

      function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal";
        delete record.arg;
        entry.completion = record;
      }

      function Context(tryLocsList) {
        // The root entry object (effectively a try statement without a catch
        // or a finally block) gives us a place to store values thrown from
        // locations where there is no enclosing try statement.
        this.tryEntries = [{
          tryLoc: "root"
        }];
        tryLocsList.forEach(pushTryEntry, this);
        this.reset(true);
      }

      exports.keys = function (object) {
        var keys = [];

        for (var key in object) {
          keys.push(key);
        }

        keys.reverse(); // Rather than returning an object with a next method, we keep
        // things simple and return the next function itself.

        return function next() {
          while (keys.length) {
            var key = keys.pop();

            if (key in object) {
              next.value = key;
              next.done = false;
              return next;
            }
          } // To avoid creating an additional object, we just hang the .value
          // and .done properties off the next function object itself. This
          // also ensures that the minifier will not anonymize the function.


          next.done = true;
          return next;
        };
      };

      function values(iterable) {
        if (iterable) {
          var iteratorMethod = iterable[iteratorSymbol];

          if (iteratorMethod) {
            return iteratorMethod.call(iterable);
          }

          if (typeof iterable.next === "function") {
            return iterable;
          }

          if (!isNaN(iterable.length)) {
            var i = -1,
                next = function next() {
              while (++i < iterable.length) {
                if (hasOwn.call(iterable, i)) {
                  next.value = iterable[i];
                  next.done = false;
                  return next;
                }
              }

              next.value = undefined$1;
              next.done = true;
              return next;
            };

            return next.next = next;
          }
        } // Return an iterator with no values.


        return {
          next: doneResult
        };
      }

      exports.values = values;

      function doneResult() {
        return {
          value: undefined$1,
          done: true
        };
      }

      Context.prototype = {
        constructor: Context,
        reset: function reset(skipTempReset) {
          this.prev = 0;
          this.next = 0; // Resetting context._sent for legacy support of Babel's
          // function.sent implementation.

          this.sent = this._sent = undefined$1;
          this.done = false;
          this.delegate = null;
          this.method = "next";
          this.arg = undefined$1;
          this.tryEntries.forEach(resetTryEntry);

          if (!skipTempReset) {
            for (var name in this) {
              // Not sure about the optimal order of these conditions:
              if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
                this[name] = undefined$1;
              }
            }
          }
        },
        stop: function stop() {
          this.done = true;
          var rootEntry = this.tryEntries[0];
          var rootRecord = rootEntry.completion;

          if (rootRecord.type === "throw") {
            throw rootRecord.arg;
          }

          return this.rval;
        },
        dispatchException: function dispatchException(exception) {
          if (this.done) {
            throw exception;
          }

          var context = this;

          function handle(loc, caught) {
            record.type = "throw";
            record.arg = exception;
            context.next = loc;

            if (caught) {
              // If the dispatched exception was caught by a catch block,
              // then let that catch block handle the exception normally.
              context.method = "next";
              context.arg = undefined$1;
            }

            return !!caught;
          }

          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            var record = entry.completion;

            if (entry.tryLoc === "root") {
              // Exception thrown outside of any try block that could handle
              // it, so set the completion value of the entire function to
              // throw the exception.
              return handle("end");
            }

            if (entry.tryLoc <= this.prev) {
              var hasCatch = hasOwn.call(entry, "catchLoc");
              var hasFinally = hasOwn.call(entry, "finallyLoc");

              if (hasCatch && hasFinally) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                } else if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }
              } else if (hasCatch) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                }
              } else if (hasFinally) {
                if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }
              } else {
                throw new Error("try statement without catch or finally");
              }
            }
          }
        },
        abrupt: function abrupt(type, arg) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];

            if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
              var finallyEntry = entry;
              break;
            }
          }

          if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
            // Ignore the finally entry if control is not jumping to a
            // location outside the try/catch block.
            finallyEntry = null;
          }

          var record = finallyEntry ? finallyEntry.completion : {};
          record.type = type;
          record.arg = arg;

          if (finallyEntry) {
            this.method = "next";
            this.next = finallyEntry.finallyLoc;
            return ContinueSentinel;
          }

          return this.complete(record);
        },
        complete: function complete(record, afterLoc) {
          if (record.type === "throw") {
            throw record.arg;
          }

          if (record.type === "break" || record.type === "continue") {
            this.next = record.arg;
          } else if (record.type === "return") {
            this.rval = this.arg = record.arg;
            this.method = "return";
            this.next = "end";
          } else if (record.type === "normal" && afterLoc) {
            this.next = afterLoc;
          }

          return ContinueSentinel;
        },
        finish: function finish(finallyLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];

            if (entry.finallyLoc === finallyLoc) {
              this.complete(entry.completion, entry.afterLoc);
              resetTryEntry(entry);
              return ContinueSentinel;
            }
          }
        },
        "catch": function _catch(tryLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];

            if (entry.tryLoc === tryLoc) {
              var record = entry.completion;

              if (record.type === "throw") {
                var thrown = record.arg;
                resetTryEntry(entry);
              }

              return thrown;
            }
          } // The context.catch method must only be called with a location
          // argument that corresponds to a known catch block.


          throw new Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(iterable, resultName, nextLoc) {
          this.delegate = {
            iterator: values(iterable),
            resultName: resultName,
            nextLoc: nextLoc
          };

          if (this.method === "next") {
            // Deliberately forget the last sent value so that we don't
            // accidentally pass it on to the delegate.
            this.arg = undefined$1;
          }

          return ContinueSentinel;
        }
      }; // Regardless of whether this script is executing as a CommonJS module
      // or not, return the runtime object so that we can declare the variable
      // regeneratorRuntime in the outer scope, which allows this module to be
      // injected easily by `bin/regenerator --include-runtime script.js`.

      return exports;
    }( // If this script is executing as a CommonJS module, use module.exports
    // as the regeneratorRuntime namespace. Otherwise create a new empty
    // object. Either way, the resulting object will be used to initialize
    // the regeneratorRuntime variable at the top of this file.
    module.exports);

    try {
      regeneratorRuntime = runtime;
    } catch (accidentalStrictMode) {
      // This module should not be running in strict mode, so the above
      // assignment should always work unless something is misconfigured. Just
      // in case runtime.js accidentally runs in strict mode, we can escape
      // strict mode using a global Function call. This could conceivably fail
      // if a Content Security Policy forbids using Function, but in that case
      // the proper solution is to fix the accidental strict mode problem. If
      // you've misconfigured your bundler to force strict mode and applied a
      // CSP to forbid Function, and you're not willing to fix either of those
      // problems, please detail your unique predicament in a GitHub issue.
      Function("r", "regeneratorRuntime = r")(runtime);
    }
  });

  var regenerator = runtime_1;

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function (o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function (o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct() {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function (Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function (Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  var colorName = {
    "aliceblue": [240, 248, 255],
    "antiquewhite": [250, 235, 215],
    "aqua": [0, 255, 255],
    "aquamarine": [127, 255, 212],
    "azure": [240, 255, 255],
    "beige": [245, 245, 220],
    "bisque": [255, 228, 196],
    "black": [0, 0, 0],
    "blanchedalmond": [255, 235, 205],
    "blue": [0, 0, 255],
    "blueviolet": [138, 43, 226],
    "brown": [165, 42, 42],
    "burlywood": [222, 184, 135],
    "cadetblue": [95, 158, 160],
    "chartreuse": [127, 255, 0],
    "chocolate": [210, 105, 30],
    "coral": [255, 127, 80],
    "cornflowerblue": [100, 149, 237],
    "cornsilk": [255, 248, 220],
    "crimson": [220, 20, 60],
    "cyan": [0, 255, 255],
    "darkblue": [0, 0, 139],
    "darkcyan": [0, 139, 139],
    "darkgoldenrod": [184, 134, 11],
    "darkgray": [169, 169, 169],
    "darkgreen": [0, 100, 0],
    "darkgrey": [169, 169, 169],
    "darkkhaki": [189, 183, 107],
    "darkmagenta": [139, 0, 139],
    "darkolivegreen": [85, 107, 47],
    "darkorange": [255, 140, 0],
    "darkorchid": [153, 50, 204],
    "darkred": [139, 0, 0],
    "darksalmon": [233, 150, 122],
    "darkseagreen": [143, 188, 143],
    "darkslateblue": [72, 61, 139],
    "darkslategray": [47, 79, 79],
    "darkslategrey": [47, 79, 79],
    "darkturquoise": [0, 206, 209],
    "darkviolet": [148, 0, 211],
    "deeppink": [255, 20, 147],
    "deepskyblue": [0, 191, 255],
    "dimgray": [105, 105, 105],
    "dimgrey": [105, 105, 105],
    "dodgerblue": [30, 144, 255],
    "firebrick": [178, 34, 34],
    "floralwhite": [255, 250, 240],
    "forestgreen": [34, 139, 34],
    "fuchsia": [255, 0, 255],
    "gainsboro": [220, 220, 220],
    "ghostwhite": [248, 248, 255],
    "gold": [255, 215, 0],
    "goldenrod": [218, 165, 32],
    "gray": [128, 128, 128],
    "green": [0, 128, 0],
    "greenyellow": [173, 255, 47],
    "grey": [128, 128, 128],
    "honeydew": [240, 255, 240],
    "hotpink": [255, 105, 180],
    "indianred": [205, 92, 92],
    "indigo": [75, 0, 130],
    "ivory": [255, 255, 240],
    "khaki": [240, 230, 140],
    "lavender": [230, 230, 250],
    "lavenderblush": [255, 240, 245],
    "lawngreen": [124, 252, 0],
    "lemonchiffon": [255, 250, 205],
    "lightblue": [173, 216, 230],
    "lightcoral": [240, 128, 128],
    "lightcyan": [224, 255, 255],
    "lightgoldenrodyellow": [250, 250, 210],
    "lightgray": [211, 211, 211],
    "lightgreen": [144, 238, 144],
    "lightgrey": [211, 211, 211],
    "lightpink": [255, 182, 193],
    "lightsalmon": [255, 160, 122],
    "lightseagreen": [32, 178, 170],
    "lightskyblue": [135, 206, 250],
    "lightslategray": [119, 136, 153],
    "lightslategrey": [119, 136, 153],
    "lightsteelblue": [176, 196, 222],
    "lightyellow": [255, 255, 224],
    "lime": [0, 255, 0],
    "limegreen": [50, 205, 50],
    "linen": [250, 240, 230],
    "magenta": [255, 0, 255],
    "maroon": [128, 0, 0],
    "mediumaquamarine": [102, 205, 170],
    "mediumblue": [0, 0, 205],
    "mediumorchid": [186, 85, 211],
    "mediumpurple": [147, 112, 219],
    "mediumseagreen": [60, 179, 113],
    "mediumslateblue": [123, 104, 238],
    "mediumspringgreen": [0, 250, 154],
    "mediumturquoise": [72, 209, 204],
    "mediumvioletred": [199, 21, 133],
    "midnightblue": [25, 25, 112],
    "mintcream": [245, 255, 250],
    "mistyrose": [255, 228, 225],
    "moccasin": [255, 228, 181],
    "navajowhite": [255, 222, 173],
    "navy": [0, 0, 128],
    "oldlace": [253, 245, 230],
    "olive": [128, 128, 0],
    "olivedrab": [107, 142, 35],
    "orange": [255, 165, 0],
    "orangered": [255, 69, 0],
    "orchid": [218, 112, 214],
    "palegoldenrod": [238, 232, 170],
    "palegreen": [152, 251, 152],
    "paleturquoise": [175, 238, 238],
    "palevioletred": [219, 112, 147],
    "papayawhip": [255, 239, 213],
    "peachpuff": [255, 218, 185],
    "peru": [205, 133, 63],
    "pink": [255, 192, 203],
    "plum": [221, 160, 221],
    "powderblue": [176, 224, 230],
    "purple": [128, 0, 128],
    "rebeccapurple": [102, 51, 153],
    "red": [255, 0, 0],
    "rosybrown": [188, 143, 143],
    "royalblue": [65, 105, 225],
    "saddlebrown": [139, 69, 19],
    "salmon": [250, 128, 114],
    "sandybrown": [244, 164, 96],
    "seagreen": [46, 139, 87],
    "seashell": [255, 245, 238],
    "sienna": [160, 82, 45],
    "silver": [192, 192, 192],
    "skyblue": [135, 206, 235],
    "slateblue": [106, 90, 205],
    "slategray": [112, 128, 144],
    "slategrey": [112, 128, 144],
    "snow": [255, 250, 250],
    "springgreen": [0, 255, 127],
    "steelblue": [70, 130, 180],
    "tan": [210, 180, 140],
    "teal": [0, 128, 128],
    "thistle": [216, 191, 216],
    "tomato": [255, 99, 71],
    "turquoise": [64, 224, 208],
    "violet": [238, 130, 238],
    "wheat": [245, 222, 179],
    "white": [255, 255, 255],
    "whitesmoke": [245, 245, 245],
    "yellow": [255, 255, 0],
    "yellowgreen": [154, 205, 50]
  };

  var conversions = createCommonjsModule(function (module) {
    /* MIT license */
    // NOTE: conversions should only return primitive values (i.e. arrays, or
    //       values that give correct `typeof` results).
    //       do not use box values types (i.e. Number(), String(), etc.)
    var reverseKeywords = {};

    for (var key in colorName) {
      if (colorName.hasOwnProperty(key)) {
        reverseKeywords[colorName[key]] = key;
      }
    }

    var convert = module.exports = {
      rgb: {
        channels: 3,
        labels: 'rgb'
      },
      hsl: {
        channels: 3,
        labels: 'hsl'
      },
      hsv: {
        channels: 3,
        labels: 'hsv'
      },
      hwb: {
        channels: 3,
        labels: 'hwb'
      },
      cmyk: {
        channels: 4,
        labels: 'cmyk'
      },
      xyz: {
        channels: 3,
        labels: 'xyz'
      },
      lab: {
        channels: 3,
        labels: 'lab'
      },
      lch: {
        channels: 3,
        labels: 'lch'
      },
      hex: {
        channels: 1,
        labels: ['hex']
      },
      keyword: {
        channels: 1,
        labels: ['keyword']
      },
      ansi16: {
        channels: 1,
        labels: ['ansi16']
      },
      ansi256: {
        channels: 1,
        labels: ['ansi256']
      },
      hcg: {
        channels: 3,
        labels: ['h', 'c', 'g']
      },
      apple: {
        channels: 3,
        labels: ['r16', 'g16', 'b16']
      },
      gray: {
        channels: 1,
        labels: ['gray']
      }
    }; // hide .channels and .labels properties

    for (var model in convert) {
      if (convert.hasOwnProperty(model)) {
        if (!('channels' in convert[model])) {
          throw new Error('missing channels property: ' + model);
        }

        if (!('labels' in convert[model])) {
          throw new Error('missing channel labels property: ' + model);
        }

        if (convert[model].labels.length !== convert[model].channels) {
          throw new Error('channel and label counts mismatch: ' + model);
        }

        var channels = convert[model].channels;
        var labels = convert[model].labels;
        delete convert[model].channels;
        delete convert[model].labels;
        Object.defineProperty(convert[model], 'channels', {
          value: channels
        });
        Object.defineProperty(convert[model], 'labels', {
          value: labels
        });
      }
    }

    convert.rgb.hsl = function (rgb) {
      var r = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255;
      var min = Math.min(r, g, b);
      var max = Math.max(r, g, b);
      var delta = max - min;
      var h;
      var s;
      var l;

      if (max === min) {
        h = 0;
      } else if (r === max) {
        h = (g - b) / delta;
      } else if (g === max) {
        h = 2 + (b - r) / delta;
      } else if (b === max) {
        h = 4 + (r - g) / delta;
      }

      h = Math.min(h * 60, 360);

      if (h < 0) {
        h += 360;
      }

      l = (min + max) / 2;

      if (max === min) {
        s = 0;
      } else if (l <= 0.5) {
        s = delta / (max + min);
      } else {
        s = delta / (2 - max - min);
      }

      return [h, s * 100, l * 100];
    };

    convert.rgb.hsv = function (rgb) {
      var rdif;
      var gdif;
      var bdif;
      var h;
      var s;
      var r = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255;
      var v = Math.max(r, g, b);
      var diff = v - Math.min(r, g, b);

      var diffc = function (c) {
        return (v - c) / 6 / diff + 1 / 2;
      };

      if (diff === 0) {
        h = s = 0;
      } else {
        s = diff / v;
        rdif = diffc(r);
        gdif = diffc(g);
        bdif = diffc(b);

        if (r === v) {
          h = bdif - gdif;
        } else if (g === v) {
          h = 1 / 3 + rdif - bdif;
        } else if (b === v) {
          h = 2 / 3 + gdif - rdif;
        }

        if (h < 0) {
          h += 1;
        } else if (h > 1) {
          h -= 1;
        }
      }

      return [h * 360, s * 100, v * 100];
    };

    convert.rgb.hwb = function (rgb) {
      var r = rgb[0];
      var g = rgb[1];
      var b = rgb[2];
      var h = convert.rgb.hsl(rgb)[0];
      var w = 1 / 255 * Math.min(r, Math.min(g, b));
      b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
      return [h, w * 100, b * 100];
    };

    convert.rgb.cmyk = function (rgb) {
      var r = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255;
      var c;
      var m;
      var y;
      var k = Math.min(1 - r, 1 - g, 1 - b);
      c = (1 - r - k) / (1 - k) || 0;
      m = (1 - g - k) / (1 - k) || 0;
      y = (1 - b - k) / (1 - k) || 0;
      return [c * 100, m * 100, y * 100, k * 100];
    };
    /**
     * See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
     * */


    function comparativeDistance(x, y) {
      return Math.pow(x[0] - y[0], 2) + Math.pow(x[1] - y[1], 2) + Math.pow(x[2] - y[2], 2);
    }

    convert.rgb.keyword = function (rgb) {
      var reversed = reverseKeywords[rgb];

      if (reversed) {
        return reversed;
      }

      var currentClosestDistance = Infinity;
      var currentClosestKeyword;

      for (var keyword in colorName) {
        if (colorName.hasOwnProperty(keyword)) {
          var value = colorName[keyword]; // Compute comparative distance

          var distance = comparativeDistance(rgb, value); // Check if its less, if so set as closest

          if (distance < currentClosestDistance) {
            currentClosestDistance = distance;
            currentClosestKeyword = keyword;
          }
        }
      }

      return currentClosestKeyword;
    };

    convert.keyword.rgb = function (keyword) {
      return colorName[keyword];
    };

    convert.rgb.xyz = function (rgb) {
      var r = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255; // assume sRGB

      r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
      g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
      b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
      var x = r * 0.4124 + g * 0.3576 + b * 0.1805;
      var y = r * 0.2126 + g * 0.7152 + b * 0.0722;
      var z = r * 0.0193 + g * 0.1192 + b * 0.9505;
      return [x * 100, y * 100, z * 100];
    };

    convert.rgb.lab = function (rgb) {
      var xyz = convert.rgb.xyz(rgb);
      var x = xyz[0];
      var y = xyz[1];
      var z = xyz[2];
      var l;
      var a;
      var b;
      x /= 95.047;
      y /= 100;
      z /= 108.883;
      x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
      y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
      z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
      l = 116 * y - 16;
      a = 500 * (x - y);
      b = 200 * (y - z);
      return [l, a, b];
    };

    convert.hsl.rgb = function (hsl) {
      var h = hsl[0] / 360;
      var s = hsl[1] / 100;
      var l = hsl[2] / 100;
      var t1;
      var t2;
      var t3;
      var rgb;
      var val;

      if (s === 0) {
        val = l * 255;
        return [val, val, val];
      }

      if (l < 0.5) {
        t2 = l * (1 + s);
      } else {
        t2 = l + s - l * s;
      }

      t1 = 2 * l - t2;
      rgb = [0, 0, 0];

      for (var i = 0; i < 3; i++) {
        t3 = h + 1 / 3 * -(i - 1);

        if (t3 < 0) {
          t3++;
        }

        if (t3 > 1) {
          t3--;
        }

        if (6 * t3 < 1) {
          val = t1 + (t2 - t1) * 6 * t3;
        } else if (2 * t3 < 1) {
          val = t2;
        } else if (3 * t3 < 2) {
          val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
        } else {
          val = t1;
        }

        rgb[i] = val * 255;
      }

      return rgb;
    };

    convert.hsl.hsv = function (hsl) {
      var h = hsl[0];
      var s = hsl[1] / 100;
      var l = hsl[2] / 100;
      var smin = s;
      var lmin = Math.max(l, 0.01);
      var sv;
      var v;
      l *= 2;
      s *= l <= 1 ? l : 2 - l;
      smin *= lmin <= 1 ? lmin : 2 - lmin;
      v = (l + s) / 2;
      sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
      return [h, sv * 100, v * 100];
    };

    convert.hsv.rgb = function (hsv) {
      var h = hsv[0] / 60;
      var s = hsv[1] / 100;
      var v = hsv[2] / 100;
      var hi = Math.floor(h) % 6;
      var f = h - Math.floor(h);
      var p = 255 * v * (1 - s);
      var q = 255 * v * (1 - s * f);
      var t = 255 * v * (1 - s * (1 - f));
      v *= 255;

      switch (hi) {
        case 0:
          return [v, t, p];

        case 1:
          return [q, v, p];

        case 2:
          return [p, v, t];

        case 3:
          return [p, q, v];

        case 4:
          return [t, p, v];

        case 5:
          return [v, p, q];
      }
    };

    convert.hsv.hsl = function (hsv) {
      var h = hsv[0];
      var s = hsv[1] / 100;
      var v = hsv[2] / 100;
      var vmin = Math.max(v, 0.01);
      var lmin;
      var sl;
      var l = (2 - s) * v;
      lmin = (2 - s) * vmin;
      sl = s * vmin;
      sl /= lmin <= 1 ? lmin : 2 - lmin;
      sl = sl || 0;
      l /= 2;
      return [h, sl * 100, l * 100];
    }; // http://dev.w3.org/csswg/css-color/#hwb-to-rgb


    convert.hwb.rgb = function (hwb) {
      var h = hwb[0] / 360;
      var wh = hwb[1] / 100;
      var bl = hwb[2] / 100;
      var ratio = wh + bl;
      var i;
      var v;
      var f;
      var n; // wh + bl cant be > 1

      if (ratio > 1) {
        wh /= ratio;
        bl /= ratio;
      }

      i = Math.floor(6 * h);
      v = 1 - bl;
      f = 6 * h - i;

      if ((i & 0x01) !== 0) {
        f = 1 - f;
      }

      n = wh + f * (v - wh); // linear interpolation

      var r;
      var g;
      var b;

      switch (i) {
        default:
        case 6:
        case 0:
          r = v;
          g = n;
          b = wh;
          break;

        case 1:
          r = n;
          g = v;
          b = wh;
          break;

        case 2:
          r = wh;
          g = v;
          b = n;
          break;

        case 3:
          r = wh;
          g = n;
          b = v;
          break;

        case 4:
          r = n;
          g = wh;
          b = v;
          break;

        case 5:
          r = v;
          g = wh;
          b = n;
          break;
      }

      return [r * 255, g * 255, b * 255];
    };

    convert.cmyk.rgb = function (cmyk) {
      var c = cmyk[0] / 100;
      var m = cmyk[1] / 100;
      var y = cmyk[2] / 100;
      var k = cmyk[3] / 100;
      var r;
      var g;
      var b;
      r = 1 - Math.min(1, c * (1 - k) + k);
      g = 1 - Math.min(1, m * (1 - k) + k);
      b = 1 - Math.min(1, y * (1 - k) + k);
      return [r * 255, g * 255, b * 255];
    };

    convert.xyz.rgb = function (xyz) {
      var x = xyz[0] / 100;
      var y = xyz[1] / 100;
      var z = xyz[2] / 100;
      var r;
      var g;
      var b;
      r = x * 3.2406 + y * -1.5372 + z * -0.4986;
      g = x * -0.9689 + y * 1.8758 + z * 0.0415;
      b = x * 0.0557 + y * -0.2040 + z * 1.0570; // assume sRGB

      r = r > 0.0031308 ? 1.055 * Math.pow(r, 1.0 / 2.4) - 0.055 : r * 12.92;
      g = g > 0.0031308 ? 1.055 * Math.pow(g, 1.0 / 2.4) - 0.055 : g * 12.92;
      b = b > 0.0031308 ? 1.055 * Math.pow(b, 1.0 / 2.4) - 0.055 : b * 12.92;
      r = Math.min(Math.max(0, r), 1);
      g = Math.min(Math.max(0, g), 1);
      b = Math.min(Math.max(0, b), 1);
      return [r * 255, g * 255, b * 255];
    };

    convert.xyz.lab = function (xyz) {
      var x = xyz[0];
      var y = xyz[1];
      var z = xyz[2];
      var l;
      var a;
      var b;
      x /= 95.047;
      y /= 100;
      z /= 108.883;
      x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
      y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
      z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
      l = 116 * y - 16;
      a = 500 * (x - y);
      b = 200 * (y - z);
      return [l, a, b];
    };

    convert.lab.xyz = function (lab) {
      var l = lab[0];
      var a = lab[1];
      var b = lab[2];
      var x;
      var y;
      var z;
      y = (l + 16) / 116;
      x = a / 500 + y;
      z = y - b / 200;
      var y2 = Math.pow(y, 3);
      var x2 = Math.pow(x, 3);
      var z2 = Math.pow(z, 3);
      y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
      x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
      z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;
      x *= 95.047;
      y *= 100;
      z *= 108.883;
      return [x, y, z];
    };

    convert.lab.lch = function (lab) {
      var l = lab[0];
      var a = lab[1];
      var b = lab[2];
      var hr;
      var h;
      var c;
      hr = Math.atan2(b, a);
      h = hr * 360 / 2 / Math.PI;

      if (h < 0) {
        h += 360;
      }

      c = Math.sqrt(a * a + b * b);
      return [l, c, h];
    };

    convert.lch.lab = function (lch) {
      var l = lch[0];
      var c = lch[1];
      var h = lch[2];
      var a;
      var b;
      var hr = h / 360 * 2 * Math.PI;
      a = c * Math.cos(hr);
      b = c * Math.sin(hr);
      return [l, a, b];
    };

    convert.rgb.ansi16 = function (args) {
      var r = args[0];
      var g = args[1];
      var b = args[2];
      var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2]; // hsv -> ansi16 optimization

      value = Math.round(value / 50);

      if (value === 0) {
        return 30;
      }

      var ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));

      if (value === 2) {
        ansi += 60;
      }

      return ansi;
    };

    convert.hsv.ansi16 = function (args) {
      // optimization here; we already know the value and don't need to get
      // it converted for us.
      return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
    };

    convert.rgb.ansi256 = function (args) {
      var r = args[0];
      var g = args[1];
      var b = args[2]; // we use the extended greyscale palette here, with the exception of
      // black and white. normal palette only has 4 greyscale shades.

      if (r === g && g === b) {
        if (r < 8) {
          return 16;
        }

        if (r > 248) {
          return 231;
        }

        return Math.round((r - 8) / 247 * 24) + 232;
      }

      var ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
      return ansi;
    };

    convert.ansi16.rgb = function (args) {
      var color = args % 10; // handle greyscale

      if (color === 0 || color === 7) {
        if (args > 50) {
          color += 3.5;
        }

        color = color / 10.5 * 255;
        return [color, color, color];
      }

      var mult = (~~(args > 50) + 1) * 0.5;
      var r = (color & 1) * mult * 255;
      var g = (color >> 1 & 1) * mult * 255;
      var b = (color >> 2 & 1) * mult * 255;
      return [r, g, b];
    };

    convert.ansi256.rgb = function (args) {
      // handle greyscale
      if (args >= 232) {
        var c = (args - 232) * 10 + 8;
        return [c, c, c];
      }

      args -= 16;
      var rem;
      var r = Math.floor(args / 36) / 5 * 255;
      var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
      var b = rem % 6 / 5 * 255;
      return [r, g, b];
    };

    convert.rgb.hex = function (args) {
      var integer = ((Math.round(args[0]) & 0xFF) << 16) + ((Math.round(args[1]) & 0xFF) << 8) + (Math.round(args[2]) & 0xFF);
      var string = integer.toString(16).toUpperCase();
      return '000000'.substring(string.length) + string;
    };

    convert.hex.rgb = function (args) {
      var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);

      if (!match) {
        return [0, 0, 0];
      }

      var colorString = match[0];

      if (match[0].length === 3) {
        colorString = colorString.split('').map(function (char) {
          return char + char;
        }).join('');
      }

      var integer = parseInt(colorString, 16);
      return [integer >> 16 & 0xFF, integer >> 8 & 0xFF, integer & 0xFF];
    };

    convert.rgb.hcg = function (rgb) {
      var r = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255;
      var max = Math.max(Math.max(r, g), b);
      var min = Math.min(Math.min(r, g), b);
      var chroma = max - min;
      var grayscale;
      var hue;

      if (chroma < 1) {
        grayscale = min / (1 - chroma);
      } else {
        grayscale = 0;
      }

      if (chroma <= 0) {
        hue = 0;
      } else if (max === r) {
        hue = (g - b) / chroma % 6;
      } else if (max === g) {
        hue = 2 + (b - r) / chroma;
      } else {
        hue = 4 + (r - g) / chroma + 4;
      }

      hue /= 6;
      hue %= 1;
      return [hue * 360, chroma * 100, grayscale * 100];
    };

    convert.hsl.hcg = function (hsl) {
      var s = hsl[1] / 100;
      var l = hsl[2] / 100;
      var c = 1;
      var f = 0;

      if (l < 0.5) {
        c = 2.0 * s * l;
      } else {
        c = 2.0 * s * (1.0 - l);
      }

      if (c < 1.0) {
        f = (l - 0.5 * c) / (1.0 - c);
      }

      return [hsl[0], c * 100, f * 100];
    };

    convert.hsv.hcg = function (hsv) {
      var s = hsv[1] / 100;
      var v = hsv[2] / 100;
      var c = s * v;
      var f = 0;

      if (c < 1.0) {
        f = (v - c) / (1 - c);
      }

      return [hsv[0], c * 100, f * 100];
    };

    convert.hcg.rgb = function (hcg) {
      var h = hcg[0] / 360;
      var c = hcg[1] / 100;
      var g = hcg[2] / 100;

      if (c === 0.0) {
        return [g * 255, g * 255, g * 255];
      }

      var pure = [0, 0, 0];
      var hi = h % 1 * 6;
      var v = hi % 1;
      var w = 1 - v;
      var mg = 0;

      switch (Math.floor(hi)) {
        case 0:
          pure[0] = 1;
          pure[1] = v;
          pure[2] = 0;
          break;

        case 1:
          pure[0] = w;
          pure[1] = 1;
          pure[2] = 0;
          break;

        case 2:
          pure[0] = 0;
          pure[1] = 1;
          pure[2] = v;
          break;

        case 3:
          pure[0] = 0;
          pure[1] = w;
          pure[2] = 1;
          break;

        case 4:
          pure[0] = v;
          pure[1] = 0;
          pure[2] = 1;
          break;

        default:
          pure[0] = 1;
          pure[1] = 0;
          pure[2] = w;
      }

      mg = (1.0 - c) * g;
      return [(c * pure[0] + mg) * 255, (c * pure[1] + mg) * 255, (c * pure[2] + mg) * 255];
    };

    convert.hcg.hsv = function (hcg) {
      var c = hcg[1] / 100;
      var g = hcg[2] / 100;
      var v = c + g * (1.0 - c);
      var f = 0;

      if (v > 0.0) {
        f = c / v;
      }

      return [hcg[0], f * 100, v * 100];
    };

    convert.hcg.hsl = function (hcg) {
      var c = hcg[1] / 100;
      var g = hcg[2] / 100;
      var l = g * (1.0 - c) + 0.5 * c;
      var s = 0;

      if (l > 0.0 && l < 0.5) {
        s = c / (2 * l);
      } else if (l >= 0.5 && l < 1.0) {
        s = c / (2 * (1 - l));
      }

      return [hcg[0], s * 100, l * 100];
    };

    convert.hcg.hwb = function (hcg) {
      var c = hcg[1] / 100;
      var g = hcg[2] / 100;
      var v = c + g * (1.0 - c);
      return [hcg[0], (v - c) * 100, (1 - v) * 100];
    };

    convert.hwb.hcg = function (hwb) {
      var w = hwb[1] / 100;
      var b = hwb[2] / 100;
      var v = 1 - b;
      var c = v - w;
      var g = 0;

      if (c < 1) {
        g = (v - c) / (1 - c);
      }

      return [hwb[0], c * 100, g * 100];
    };

    convert.apple.rgb = function (apple) {
      return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
    };

    convert.rgb.apple = function (rgb) {
      return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
    };

    convert.gray.rgb = function (args) {
      return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
    };

    convert.gray.hsl = convert.gray.hsv = function (args) {
      return [0, 0, args[0]];
    };

    convert.gray.hwb = function (gray) {
      return [0, 100, gray[0]];
    };

    convert.gray.cmyk = function (gray) {
      return [0, 0, 0, gray[0]];
    };

    convert.gray.lab = function (gray) {
      return [gray[0], 0, 0];
    };

    convert.gray.hex = function (gray) {
      var val = Math.round(gray[0] / 100 * 255) & 0xFF;
      var string = ((val << 16) + (val << 8) + val).toString(16).toUpperCase();
      return '000000'.substring(string.length) + string;
    };

    convert.rgb.gray = function (rgb) {
      var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
      return [val / 255 * 100];
    };
  });
  var conversions_1 = conversions.rgb;
  var conversions_2 = conversions.hsl;
  var conversions_3 = conversions.hsv;
  var conversions_4 = conversions.hwb;
  var conversions_5 = conversions.cmyk;
  var conversions_6 = conversions.xyz;
  var conversions_7 = conversions.lab;
  var conversions_8 = conversions.lch;
  var conversions_9 = conversions.hex;
  var conversions_10 = conversions.keyword;
  var conversions_11 = conversions.ansi16;
  var conversions_12 = conversions.ansi256;
  var conversions_13 = conversions.hcg;
  var conversions_14 = conversions.apple;
  var conversions_15 = conversions.gray;

  /*
  	this function routes a model to all other models.

  	all functions that are routed have a property `.conversion` attached
  	to the returned synthetic function. This property is an array
  	of strings, each with the steps in between the 'from' and 'to'
  	color models (inclusive).

  	conversions that are not possible simply are not included.
  */

  function buildGraph() {
    var graph = {}; // https://jsperf.com/object-keys-vs-for-in-with-closure/3

    var models = Object.keys(conversions);

    for (var len = models.length, i = 0; i < len; i++) {
      graph[models[i]] = {
        // http://jsperf.com/1-vs-infinity
        // micro-opt, but this is simple.
        distance: -1,
        parent: null
      };
    }

    return graph;
  } // https://en.wikipedia.org/wiki/Breadth-first_search


  function deriveBFS(fromModel) {
    var graph = buildGraph();
    var queue = [fromModel]; // unshift -> queue -> pop

    graph[fromModel].distance = 0;

    while (queue.length) {
      var current = queue.pop();
      var adjacents = Object.keys(conversions[current]);

      for (var len = adjacents.length, i = 0; i < len; i++) {
        var adjacent = adjacents[i];
        var node = graph[adjacent];

        if (node.distance === -1) {
          node.distance = graph[current].distance + 1;
          node.parent = current;
          queue.unshift(adjacent);
        }
      }
    }

    return graph;
  }

  function link(from, to) {
    return function (args) {
      return to(from(args));
    };
  }

  function wrapConversion(toModel, graph) {
    var path = [graph[toModel].parent, toModel];
    var fn = conversions[graph[toModel].parent][toModel];
    var cur = graph[toModel].parent;

    while (graph[cur].parent) {
      path.unshift(graph[cur].parent);
      fn = link(conversions[graph[cur].parent][cur], fn);
      cur = graph[cur].parent;
    }

    fn.conversion = path;
    return fn;
  }

  var route = function (fromModel) {
    var graph = deriveBFS(fromModel);
    var conversion = {};
    var models = Object.keys(graph);

    for (var len = models.length, i = 0; i < len; i++) {
      var toModel = models[i];
      var node = graph[toModel];

      if (node.parent === null) {
        // no possible conversion, or this node is the source model.
        continue;
      }

      conversion[toModel] = wrapConversion(toModel, graph);
    }

    return conversion;
  };

  var convert = {};
  var models = Object.keys(conversions);

  function wrapRaw(fn) {
    var wrappedFn = function (args) {
      if (args === undefined || args === null) {
        return args;
      }

      if (arguments.length > 1) {
        args = Array.prototype.slice.call(arguments);
      }

      return fn(args);
    }; // preserve .conversion property if there is one


    if ('conversion' in fn) {
      wrappedFn.conversion = fn.conversion;
    }

    return wrappedFn;
  }

  function wrapRounded(fn) {
    var wrappedFn = function (args) {
      if (args === undefined || args === null) {
        return args;
      }

      if (arguments.length > 1) {
        args = Array.prototype.slice.call(arguments);
      }

      var result = fn(args); // we're assuming the result is an array here.
      // see notice in conversions.js; don't use box types
      // in conversion functions.

      if (typeof result === 'object') {
        for (var len = result.length, i = 0; i < len; i++) {
          result[i] = Math.round(result[i]);
        }
      }

      return result;
    }; // preserve .conversion property if there is one


    if ('conversion' in fn) {
      wrappedFn.conversion = fn.conversion;
    }

    return wrappedFn;
  }

  models.forEach(function (fromModel) {
    convert[fromModel] = {};
    Object.defineProperty(convert[fromModel], 'channels', {
      value: conversions[fromModel].channels
    });
    Object.defineProperty(convert[fromModel], 'labels', {
      value: conversions[fromModel].labels
    });
    var routes = route(fromModel);
    var routeModels = Object.keys(routes);
    routeModels.forEach(function (toModel) {
      var fn = routes[toModel];
      convert[fromModel][toModel] = wrapRounded(fn);
      convert[fromModel][toModel].raw = wrapRaw(fn);
    });
  });
  var colorConvert = convert;

  var ansiStyles = createCommonjsModule(function (module) {

    var wrapAnsi16 = function (fn, offset) {
      return function () {
        var code = fn.apply(colorConvert, arguments);
        return "\x1B[" + (code + offset) + "m";
      };
    };

    var wrapAnsi256 = function (fn, offset) {
      return function () {
        var code = fn.apply(colorConvert, arguments);
        return "\x1B[" + (38 + offset) + ";5;" + code + "m";
      };
    };

    var wrapAnsi16m = function (fn, offset) {
      return function () {
        var rgb = fn.apply(colorConvert, arguments);
        return "\x1B[" + (38 + offset) + ";2;" + rgb[0] + ";" + rgb[1] + ";" + rgb[2] + "m";
      };
    };

    function assembleStyles() {
      var codes = new Map();
      var styles = {
        modifier: {
          reset: [0, 0],
          // 21 isn't widely supported and 22 does the same thing
          bold: [1, 22],
          dim: [2, 22],
          italic: [3, 23],
          underline: [4, 24],
          inverse: [7, 27],
          hidden: [8, 28],
          strikethrough: [9, 29]
        },
        color: {
          black: [30, 39],
          red: [31, 39],
          green: [32, 39],
          yellow: [33, 39],
          blue: [34, 39],
          magenta: [35, 39],
          cyan: [36, 39],
          white: [37, 39],
          gray: [90, 39],
          // Bright color
          redBright: [91, 39],
          greenBright: [92, 39],
          yellowBright: [93, 39],
          blueBright: [94, 39],
          magentaBright: [95, 39],
          cyanBright: [96, 39],
          whiteBright: [97, 39]
        },
        bgColor: {
          bgBlack: [40, 49],
          bgRed: [41, 49],
          bgGreen: [42, 49],
          bgYellow: [43, 49],
          bgBlue: [44, 49],
          bgMagenta: [45, 49],
          bgCyan: [46, 49],
          bgWhite: [47, 49],
          // Bright color
          bgBlackBright: [100, 49],
          bgRedBright: [101, 49],
          bgGreenBright: [102, 49],
          bgYellowBright: [103, 49],
          bgBlueBright: [104, 49],
          bgMagentaBright: [105, 49],
          bgCyanBright: [106, 49],
          bgWhiteBright: [107, 49]
        }
      }; // Fix humans

      styles.color.grey = styles.color.gray;

      for (var _i = 0, _Object$keys = Object.keys(styles); _i < _Object$keys.length; _i++) {
        var groupName = _Object$keys[_i];
        var group = styles[groupName];

        for (var _i3 = 0, _Object$keys3 = Object.keys(group); _i3 < _Object$keys3.length; _i3++) {
          var styleName = _Object$keys3[_i3];
          var style = group[styleName];
          styles[styleName] = {
            open: "\x1B[" + style[0] + "m",
            close: "\x1B[" + style[1] + "m"
          };
          group[styleName] = styles[styleName];
          codes.set(style[0], style[1]);
        }

        Object.defineProperty(styles, groupName, {
          value: group,
          enumerable: false
        });
        Object.defineProperty(styles, 'codes', {
          value: codes,
          enumerable: false
        });
      }

      var ansi2ansi = function (n) {
        return n;
      };

      var rgb2rgb = function (r, g, b) {
        return [r, g, b];
      };

      styles.color.close = "\x1B[39m";
      styles.bgColor.close = "\x1B[49m";
      styles.color.ansi = {
        ansi: wrapAnsi16(ansi2ansi, 0)
      };
      styles.color.ansi256 = {
        ansi256: wrapAnsi256(ansi2ansi, 0)
      };
      styles.color.ansi16m = {
        rgb: wrapAnsi16m(rgb2rgb, 0)
      };
      styles.bgColor.ansi = {
        ansi: wrapAnsi16(ansi2ansi, 10)
      };
      styles.bgColor.ansi256 = {
        ansi256: wrapAnsi256(ansi2ansi, 10)
      };
      styles.bgColor.ansi16m = {
        rgb: wrapAnsi16m(rgb2rgb, 10)
      };

      for (var _i2 = 0, _Object$keys2 = Object.keys(colorConvert); _i2 < _Object$keys2.length; _i2++) {
        var key = _Object$keys2[_i2];

        if (typeof colorConvert[key] !== 'object') {
          continue;
        }

        var suite = colorConvert[key];

        if (key === 'ansi16') {
          key = 'ansi';
        }

        if ('ansi16' in suite) {
          styles.color.ansi[key] = wrapAnsi16(suite.ansi16, 0);
          styles.bgColor.ansi[key] = wrapAnsi16(suite.ansi16, 10);
        }

        if ('ansi256' in suite) {
          styles.color.ansi256[key] = wrapAnsi256(suite.ansi256, 0);
          styles.bgColor.ansi256[key] = wrapAnsi256(suite.ansi256, 10);
        }

        if ('rgb' in suite) {
          styles.color.ansi16m[key] = wrapAnsi16m(suite.rgb, 0);
          styles.bgColor.ansi16m[key] = wrapAnsi16m(suite.rgb, 10);
        }
      }

      return styles;
    } // Make the export immutable


    Object.defineProperty(module, 'exports', {
      enumerable: true,
      get: assembleStyles
    });
  });

  var collections = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, '__esModule', {
      value: true
    });

    exports.printIteratorEntries =
    /**
     * Return entries (for example, of a map)
     * with spacing, indentation, and comma
     * without surrounding punctuation (for example, braces)
     */
    function ( // Flow 0.51.0: property `@@iterator` of $Iterator not found in Object
    // To allow simplistic getRecordIterator in immutable.js
    iterator, config, indentation, depth, refs, printer, // Too bad, so sad that separator for ECMAScript Map has been ' => '
    // What a distracting diff if you change a data structure to/from
    separator) {
      if (separator === void 0) {
        separator = ': ';
      }

      var result = '';
      var current = iterator.next();

      if (!current.done) {
        result += config.spacingOuter;
        var indentationNext = indentation + config.indent;

        while (!current.done) {
          var name = printer(current.value[0], config, indentationNext, depth, refs);
          var value = printer(current.value[1], config, indentationNext, depth, refs);
          result += indentationNext + name + separator + value;
          current = iterator.next();

          if (!current.done) {
            result += ',' + config.spacingInner;
          } else if (!config.min) {
            result += ',';
          }
        }

        result += config.spacingOuter + indentation;
      }

      return result;
    }
    /**
     * Return values (for example, of a set)
     * with spacing, indentation, and comma
     * without surrounding punctuation (braces or brackets)
     */
    ;

    exports.printIteratorValues = function (iterator, config, indentation, depth, refs, printer) {
      var result = '';
      var current = iterator.next();

      if (!current.done) {
        result += config.spacingOuter;
        var indentationNext = indentation + config.indent;

        while (!current.done) {
          result += indentationNext + printer(current.value, config, indentationNext, depth, refs);
          current = iterator.next();

          if (!current.done) {
            result += ',' + config.spacingInner;
          } else if (!config.min) {
            result += ',';
          }
        }

        result += config.spacingOuter + indentation;
      }

      return result;
    }
    /**
     * Return items (for example, of an array)
     * with spacing, indentation, and comma
     * without surrounding punctuation (for example, brackets)
     **/
    ;

    exports.printListItems = function (list, config, indentation, depth, refs, printer) {
      var result = '';

      if (list.length) {
        result += config.spacingOuter;
        var indentationNext = indentation + config.indent;

        for (var i = 0; i < list.length; i++) {
          result += indentationNext + printer(list[i], config, indentationNext, depth, refs);

          if (i < list.length - 1) {
            result += ',' + config.spacingInner;
          } else if (!config.min) {
            result += ',';
          }
        }

        result += config.spacingOuter + indentation;
      }

      return result;
    }
    /**
     * Return properties of an object
     * with spacing, indentation, and comma
     * without surrounding punctuation (for example, braces)
     */
    ;

    exports.printObjectProperties = function (val, config, indentation, depth, refs, printer) {
      var result = '';
      var keys = getKeysOfEnumerableProperties(val);

      if (keys.length) {
        result += config.spacingOuter;
        var indentationNext = indentation + config.indent;

        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          var name = printer(key, config, indentationNext, depth, refs);
          var value = printer(val[key], config, indentationNext, depth, refs);
          result += indentationNext + name + ': ' + value;

          if (i < keys.length - 1) {
            result += ',' + config.spacingInner;
          } else if (!config.min) {
            result += ',';
          }
        }

        result += config.spacingOuter + indentation;
      }

      return result;
    };
    /**
     * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     *
     */


    var getKeysOfEnumerableProperties = function (object) {
      var keys = Object.keys(object).sort();

      if (Object.getOwnPropertySymbols) {
        Object.getOwnPropertySymbols(object).forEach(function (symbol) {
          if (Object.getOwnPropertyDescriptor(object, symbol).enumerable) {
            keys.push(symbol);
          }
        });
      }

      return keys;
    };
  });
  unwrapExports(collections);
  var collections_1 = collections.printIteratorEntries;
  var collections_2 = collections.printIteratorValues;
  var collections_3 = collections.printListItems;
  var collections_4 = collections.printObjectProperties;

  var AsymmetricMatcher = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, '__esModule', {
      value: true
    });
    exports.default = exports.test = exports.serialize = void 0;
    var Symbol = commonjsGlobal['jest-symbol-do-not-touch'] || commonjsGlobal.Symbol;
    var asymmetricMatcher = Symbol.for('jest.asymmetricMatcher');
    var SPACE = ' ';

    var serialize = function (val, config, indentation, depth, refs, printer) {
      var stringedValue = val.toString();

      if (stringedValue === 'ArrayContaining' || stringedValue === 'ArrayNotContaining') {
        if (++depth > config.maxDepth) {
          return '[' + stringedValue + ']';
        }

        return stringedValue + SPACE + '[' + (0, collections.printListItems)(val.sample, config, indentation, depth, refs, printer) + ']';
      }

      if (stringedValue === 'ObjectContaining' || stringedValue === 'ObjectNotContaining') {
        if (++depth > config.maxDepth) {
          return '[' + stringedValue + ']';
        }

        return stringedValue + SPACE + '{' + (0, collections.printObjectProperties)(val.sample, config, indentation, depth, refs, printer) + '}';
      }

      if (stringedValue === 'StringMatching' || stringedValue === 'StringNotMatching') {
        return stringedValue + SPACE + printer(val.sample, config, indentation, depth, refs);
      }

      if (stringedValue === 'StringContaining' || stringedValue === 'StringNotContaining') {
        return stringedValue + SPACE + printer(val.sample, config, indentation, depth, refs);
      }

      return val.toAsymmetricMatcher();
    };

    exports.serialize = serialize;

    var test = function (val) {
      return val && val.$$typeof === asymmetricMatcher;
    };

    exports.test = test;
    exports.default = {
      serialize: serialize,
      test: test
    };
  });
  unwrapExports(AsymmetricMatcher);
  var AsymmetricMatcher_1 = AsymmetricMatcher.test;
  var AsymmetricMatcher_2 = AsymmetricMatcher.serialize;

  var ansiRegex = function (options) {
    options = Object.assign({
      onlyFirst: false
    }, options);
    var pattern = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))'].join('|');
    return new RegExp(pattern, options.onlyFirst ? undefined : 'g');
  };

  var ConvertAnsi = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, '__esModule', {
      value: true
    });
    exports.default = exports.serialize = exports.test = void 0;

    var _ansiRegex = _interopRequireDefault(ansiRegex);

    var _ansiStyles = _interopRequireDefault(ansiStyles);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    /**
     * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */


    var toHumanReadableAnsi = function (text) {
      return text.replace((0, _ansiRegex.default)(), function (match) {
        switch (match) {
          case _ansiStyles.default.red.close:
          case _ansiStyles.default.green.close:
          case _ansiStyles.default.cyan.close:
          case _ansiStyles.default.gray.close:
          case _ansiStyles.default.white.close:
          case _ansiStyles.default.yellow.close:
          case _ansiStyles.default.bgRed.close:
          case _ansiStyles.default.bgGreen.close:
          case _ansiStyles.default.bgYellow.close:
          case _ansiStyles.default.inverse.close:
          case _ansiStyles.default.dim.close:
          case _ansiStyles.default.bold.close:
          case _ansiStyles.default.reset.open:
          case _ansiStyles.default.reset.close:
            return '</>';

          case _ansiStyles.default.red.open:
            return '<red>';

          case _ansiStyles.default.green.open:
            return '<green>';

          case _ansiStyles.default.cyan.open:
            return '<cyan>';

          case _ansiStyles.default.gray.open:
            return '<gray>';

          case _ansiStyles.default.white.open:
            return '<white>';

          case _ansiStyles.default.yellow.open:
            return '<yellow>';

          case _ansiStyles.default.bgRed.open:
            return '<bgRed>';

          case _ansiStyles.default.bgGreen.open:
            return '<bgGreen>';

          case _ansiStyles.default.bgYellow.open:
            return '<bgYellow>';

          case _ansiStyles.default.inverse.open:
            return '<inverse>';

          case _ansiStyles.default.dim.open:
            return '<dim>';

          case _ansiStyles.default.bold.open:
            return '<bold>';

          default:
            return '';
        }
      });
    };

    var test = function (val) {
      return typeof val === 'string' && !!val.match((0, _ansiRegex.default)());
    };

    exports.test = test;

    var serialize = function (val, config, indentation, depth, refs, printer) {
      return printer(toHumanReadableAnsi(val), config, indentation, depth, refs);
    };

    exports.serialize = serialize;
    exports.default = {
      serialize: serialize,
      test: test
    };
  });
  unwrapExports(ConvertAnsi);
  var ConvertAnsi_1 = ConvertAnsi.serialize;
  var ConvertAnsi_2 = ConvertAnsi.test;

  var DOMCollection = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, '__esModule', {
      value: true
    });
    exports.default = exports.serialize = exports.test = void 0;

    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);

        if (typeof Object.getOwnPropertySymbols === 'function') {
          ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          }));
        }

        ownKeys.forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      }

      return target;
    }

    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
    }

    var OBJECT_NAMES = ['DOMStringMap', 'NamedNodeMap'];
    var ARRAY_REGEXP = /^(HTML\w*Collection|NodeList)$/;

    var testName = function (name) {
      return OBJECT_NAMES.indexOf(name) !== -1 || ARRAY_REGEXP.test(name);
    };

    var test = function (val) {
      return val && val.constructor && val.constructor.name && testName(val.constructor.name);
    }; // Convert array of attribute objects to props object.


    exports.test = test;

    var propsReducer = function (props, attribute) {
      props[attribute.name] = attribute.value;
      return props;
    };

    var serialize = function (collection, config, indentation, depth, refs, printer) {
      var name = collection.constructor.name;

      if (++depth > config.maxDepth) {
        return '[' + name + ']';
      }

      return (config.min ? '' : name + ' ') + (OBJECT_NAMES.indexOf(name) !== -1 ? '{' + (0, collections.printObjectProperties)(name === 'NamedNodeMap' ? Array.prototype.reduce.call(collection, propsReducer, {}) : _objectSpread({}, collection), config, indentation, depth, refs, printer) + '}' : '[' + (0, collections.printListItems)(Array.from(collection), config, indentation, depth, refs, printer) + ']');
    };

    exports.serialize = serialize;
    exports.default = {
      serialize: serialize,
      test: test
    };
  });
  unwrapExports(DOMCollection);
  var DOMCollection_1 = DOMCollection.serialize;
  var DOMCollection_2 = DOMCollection.test;

  var escapeHTML_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, '__esModule', {
      value: true
    });

    exports.default =
    /**
     * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    function (str) {
      return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    };
  });
  unwrapExports(escapeHTML_1);

  var markup = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, '__esModule', {
      value: true
    });
    exports.printElementAsLeaf = exports.printElement = exports.printComment = exports.printText = exports.printChildren = exports.printProps = void 0;

    var _escapeHTML = function (obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    /**
     * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    // Return empty string if keys is empty.
    (escapeHTML_1);

    // Return empty string if children is empty.
    exports.printProps = function printProps(keys, props, config, indentation, depth, refs, printer) {
      var indentationNext = indentation + config.indent;
      var colors = config.colors;
      return keys.map(function (key) {
        var value = props[key];
        var printed = printer(value, config, indentationNext, depth, refs);

        if (typeof value !== 'string') {
          if (printed.indexOf('\n') !== -1) {
            printed = config.spacingOuter + indentationNext + printed + config.spacingOuter + indentation;
          }

          printed = '{' + printed + '}';
        }

        return config.spacingInner + indentation + colors.prop.open + key + colors.prop.close + '=' + colors.value.open + printed + colors.value.close;
      }).join('');
    };

    exports.printChildren = function printChildren(children, config, indentation, depth, refs, printer) {
      return children.map(function (child) {
        return config.spacingOuter + indentation + (typeof child === 'string' ? printText(child, config) : printer(child, config, indentation, depth, refs));
      }).join('');
    };

    var printText = function (text, config) {
      var contentColor = config.colors.content;
      return contentColor.open + (0, _escapeHTML.default)(text) + contentColor.close;
    };

    exports.printText = printText;

    // Separate the functions to format props, children, and element,
    // so a plugin could override a particular function, if needed.
    // Too bad, so sad: the traditional (but unnecessary) space
    // in a self-closing tagColor requires a second test of printedProps.
    exports.printComment = function printComment(comment, config) {
      var commentColor = config.colors.comment;
      return commentColor.open + '<!--' + (0, _escapeHTML.default)(comment) + '-->' + commentColor.close;
    };

    exports.printElement = function printElement(type, printedProps, printedChildren, config, indentation) {
      var tagColor = config.colors.tag;
      return tagColor.open + '<' + type + (printedProps && tagColor.close + printedProps + config.spacingOuter + indentation + tagColor.open) + (printedChildren ? '>' + tagColor.close + printedChildren + config.spacingOuter + indentation + tagColor.open + '</' + type : (printedProps && !config.min ? '' : ' ') + '/') + '>' + tagColor.close;
    };

    exports.printElementAsLeaf = function printElementAsLeaf(type, config) {
      var tagColor = config.colors.tag;
      return tagColor.open + '<' + type + tagColor.close + ' …' + tagColor.open + ' />' + tagColor.close;
    };
  });
  unwrapExports(markup);
  var markup_1 = markup.printElementAsLeaf;
  var markup_2 = markup.printElement;
  var markup_3 = markup.printComment;
  var markup_4 = markup.printText;
  var markup_5 = markup.printChildren;
  var markup_6 = markup.printProps;

  var DOMElement = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, '__esModule', {
      value: true
    });
    exports.default = exports.serialize = exports.test = void 0;
    /**
     * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */

    var TEXT_NODE = 3;
    var COMMENT_NODE = 8;
    var FRAGMENT_NODE = 11;
    var ELEMENT_REGEXP = /^((HTML|SVG)\w*)?Element$/;

    var testNode = function (nodeType, name) {
      return nodeType === 1 && ELEMENT_REGEXP.test(name) || nodeType === TEXT_NODE && name === 'Text' || nodeType === COMMENT_NODE && name === 'Comment' || nodeType === FRAGMENT_NODE && name === 'DocumentFragment';
    };

    var test = function (val) {
      return val && val.constructor && val.constructor.name && testNode(val.nodeType, val.constructor.name);
    };

    exports.test = test;

    function nodeIsText(node) {
      return node.nodeType === TEXT_NODE;
    }

    function nodeIsComment(node) {
      return node.nodeType === COMMENT_NODE;
    }

    function nodeIsFragment(node) {
      return node.nodeType === FRAGMENT_NODE;
    }

    var serialize = function (node, config, indentation, depth, refs, printer) {
      if (nodeIsText(node)) {
        return (0, markup.printText)(node.data, config);
      }

      if (nodeIsComment(node)) {
        return (0, markup.printComment)(node.data, config);
      }

      var type = nodeIsFragment(node) ? "DocumentFragment" : node.tagName.toLowerCase();

      if (++depth > config.maxDepth) {
        return (0, markup.printElementAsLeaf)(type, config);
      }

      return (0, markup.printElement)(type, (0, markup.printProps)(nodeIsFragment(node) ? [] : Array.from(node.attributes).map(function (attr) {
        return attr.name;
      }).sort(), nodeIsFragment(node) ? [] : Array.from(node.attributes).reduce(function (props, attribute) {
        props[attribute.name] = attribute.value;
        return props;
      }, {}), config, indentation + config.indent, depth, refs, printer), (0, markup.printChildren)(Array.prototype.slice.call(node.childNodes || node.children), config, indentation + config.indent, depth, refs, printer), config, indentation);
    };

    exports.serialize = serialize;
    exports.default = {
      serialize: serialize,
      test: test
    };
  });
  unwrapExports(DOMElement);
  var DOMElement_1 = DOMElement.serialize;
  var DOMElement_2 = DOMElement.test;

  var Immutable = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, '__esModule', {
      value: true
    });
    exports.default = exports.test = exports.serialize = void 0;
    /**
     * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    // SENTINEL constants are from https://github.com/facebook/immutable-js

    var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

    var getImmutableName = function (name) {
      return 'Immutable.' + name;
    };

    var printAsLeaf = function (name) {
      return '[' + name + ']';
    };

    var SPACE = ' ';
    var LAZY = '…'; // Seq is lazy if it calls a method like filter

    var printImmutableEntries = function (val, config, indentation, depth, refs, printer, type) {
      return ++depth > config.maxDepth ? printAsLeaf(getImmutableName(type)) : getImmutableName(type) + SPACE + '{' + (0, collections.printIteratorEntries)(val.entries(), config, indentation, depth, refs, printer) + '}';
    }; // Record has an entries method because it is a collection in immutable v3.
    // Return an iterator for Immutable Record from version v3 or v4.


    var getRecordEntries = function (val) {
      var i = 0;
      return {
        next: function next() {
          if (i < val._keys.length) {
            var key = val._keys[i++];
            return {
              done: false,
              value: [key, val.get(key)]
            };
          }

          return {
            done: true
          };
        }
      };
    };

    var printImmutableRecord = function (val, config, indentation, depth, refs, printer) {
      // _name property is defined only for an Immutable Record instance
      // which was constructed with a second optional descriptive name arg
      var name = getImmutableName(val._name || 'Record');
      return ++depth > config.maxDepth ? printAsLeaf(name) : name + SPACE + '{' + (0, collections.printIteratorEntries)(getRecordEntries(val), config, indentation, depth, refs, printer) + '}';
    };

    var printImmutableSeq = function (val, config, indentation, depth, refs, printer) {
      var name = getImmutableName('Seq');

      if (++depth > config.maxDepth) {
        return printAsLeaf(name);
      }

      if (val['@@__IMMUTABLE_KEYED__@@']) {
        return name + SPACE + '{' + ( // from Immutable collection of entries or from ECMAScript object
        val._iter || val._object ? (0, collections.printIteratorEntries)(val.entries(), config, indentation, depth, refs, printer) : LAZY) + '}';
      }

      return name + SPACE + '[' + (val._iter || // from Immutable collection of values
      val._array || // from ECMAScript array
      val._collection || // from ECMAScript collection in immutable v4
      val._iterable // from ECMAScript collection in immutable v3
      ? (0, collections.printIteratorValues)(val.values(), config, indentation, depth, refs, printer) : LAZY) + ']';
    };

    var printImmutableValues = function (val, config, indentation, depth, refs, printer, type) {
      return ++depth > config.maxDepth ? printAsLeaf(getImmutableName(type)) : getImmutableName(type) + SPACE + '[' + (0, collections.printIteratorValues)(val.values(), config, indentation, depth, refs, printer) + ']';
    };

    var serialize = function (val, config, indentation, depth, refs, printer) {
      if (val['@@__IMMUTABLE_MAP__@@']) {
        return printImmutableEntries(val, config, indentation, depth, refs, printer, val[IS_ORDERED_SENTINEL] ? 'OrderedMap' : 'Map');
      }

      if (val['@@__IMMUTABLE_LIST__@@']) {
        return printImmutableValues(val, config, indentation, depth, refs, printer, 'List');
      }

      if (val['@@__IMMUTABLE_SET__@@']) {
        return printImmutableValues(val, config, indentation, depth, refs, printer, val[IS_ORDERED_SENTINEL] ? 'OrderedSet' : 'Set');
      }

      if (val['@@__IMMUTABLE_STACK__@@']) {
        return printImmutableValues(val, config, indentation, depth, refs, printer, 'Stack');
      }

      if (val['@@__IMMUTABLE_SEQ__@@']) {
        return printImmutableSeq(val, config, indentation, depth, refs, printer);
      } // For compatibility with immutable v3 and v4, let record be the default.


      return printImmutableRecord(val, config, indentation, depth, refs, printer);
    }; // Explicitly comparing sentinel properties to true avoids false positive
    // when mock identity-obj-proxy returns the key as the value for any key.


    exports.serialize = serialize;

    var test = function (val) {
      return val && (val['@@__IMMUTABLE_ITERABLE__@@'] === true || val['@@__IMMUTABLE_RECORD__@@'] === true);
    };

    exports.test = test;
    exports.default = {
      serialize: serialize,
      test: test
    };
  });
  unwrapExports(Immutable);
  var Immutable_1 = Immutable.test;
  var Immutable_2 = Immutable.serialize;

  var reactIs_production_min = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    var b = "function" === typeof Symbol && Symbol.for,
        c = b ? Symbol.for("react.element") : 60103,
        d = b ? Symbol.for("react.portal") : 60106,
        e = b ? Symbol.for("react.fragment") : 60107,
        f = b ? Symbol.for("react.strict_mode") : 60108,
        g = b ? Symbol.for("react.profiler") : 60114,
        h = b ? Symbol.for("react.provider") : 60109,
        k = b ? Symbol.for("react.context") : 60110,
        l = b ? Symbol.for("react.async_mode") : 60111,
        m = b ? Symbol.for("react.concurrent_mode") : 60111,
        n = b ? Symbol.for("react.forward_ref") : 60112,
        p = b ? Symbol.for("react.suspense") : 60113,
        q = b ? Symbol.for("react.memo") : 60115,
        r = b ? Symbol.for("react.lazy") : 60116;

    function t(a) {
      if ("object" === typeof a && null !== a) {
        var u = a.$$typeof;

        switch (u) {
          case c:
            switch (a = a.type, a) {
              case l:
              case m:
              case e:
              case g:
              case f:
              case p:
                return a;

              default:
                switch (a = a && a.$$typeof, a) {
                  case k:
                  case n:
                  case h:
                    return a;

                  default:
                    return u;
                }

            }

          case r:
          case q:
          case d:
            return u;
        }
      }
    }

    function v(a) {
      return t(a) === m;
    }

    exports.typeOf = t;
    exports.AsyncMode = l;
    exports.ConcurrentMode = m;
    exports.ContextConsumer = k;
    exports.ContextProvider = h;
    exports.Element = c;
    exports.ForwardRef = n;
    exports.Fragment = e;
    exports.Lazy = r;
    exports.Memo = q;
    exports.Portal = d;
    exports.Profiler = g;
    exports.StrictMode = f;
    exports.Suspense = p;

    exports.isValidElementType = function (a) {
      return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f || a === p || "object" === typeof a && null !== a && (a.$$typeof === r || a.$$typeof === q || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n);
    };

    exports.isAsyncMode = function (a) {
      return v(a) || t(a) === l;
    };

    exports.isConcurrentMode = v;

    exports.isContextConsumer = function (a) {
      return t(a) === k;
    };

    exports.isContextProvider = function (a) {
      return t(a) === h;
    };

    exports.isElement = function (a) {
      return "object" === typeof a && null !== a && a.$$typeof === c;
    };

    exports.isForwardRef = function (a) {
      return t(a) === n;
    };

    exports.isFragment = function (a) {
      return t(a) === e;
    };

    exports.isLazy = function (a) {
      return t(a) === r;
    };

    exports.isMemo = function (a) {
      return t(a) === q;
    };

    exports.isPortal = function (a) {
      return t(a) === d;
    };

    exports.isProfiler = function (a) {
      return t(a) === g;
    };

    exports.isStrictMode = function (a) {
      return t(a) === f;
    };

    exports.isSuspense = function (a) {
      return t(a) === p;
    };
  });
  unwrapExports(reactIs_production_min);
  var reactIs_production_min_1 = reactIs_production_min.typeOf;
  var reactIs_production_min_2 = reactIs_production_min.AsyncMode;
  var reactIs_production_min_3 = reactIs_production_min.ConcurrentMode;
  var reactIs_production_min_4 = reactIs_production_min.ContextConsumer;
  var reactIs_production_min_5 = reactIs_production_min.ContextProvider;
  var reactIs_production_min_6 = reactIs_production_min.Element;
  var reactIs_production_min_7 = reactIs_production_min.ForwardRef;
  var reactIs_production_min_8 = reactIs_production_min.Fragment;
  var reactIs_production_min_9 = reactIs_production_min.Lazy;
  var reactIs_production_min_10 = reactIs_production_min.Memo;
  var reactIs_production_min_11 = reactIs_production_min.Portal;
  var reactIs_production_min_12 = reactIs_production_min.Profiler;
  var reactIs_production_min_13 = reactIs_production_min.StrictMode;
  var reactIs_production_min_14 = reactIs_production_min.Suspense;
  var reactIs_production_min_15 = reactIs_production_min.isValidElementType;
  var reactIs_production_min_16 = reactIs_production_min.isAsyncMode;
  var reactIs_production_min_17 = reactIs_production_min.isConcurrentMode;
  var reactIs_production_min_18 = reactIs_production_min.isContextConsumer;
  var reactIs_production_min_19 = reactIs_production_min.isContextProvider;
  var reactIs_production_min_20 = reactIs_production_min.isElement;
  var reactIs_production_min_21 = reactIs_production_min.isForwardRef;
  var reactIs_production_min_22 = reactIs_production_min.isFragment;
  var reactIs_production_min_23 = reactIs_production_min.isLazy;
  var reactIs_production_min_24 = reactIs_production_min.isMemo;
  var reactIs_production_min_25 = reactIs_production_min.isPortal;
  var reactIs_production_min_26 = reactIs_production_min.isProfiler;
  var reactIs_production_min_27 = reactIs_production_min.isStrictMode;
  var reactIs_production_min_28 = reactIs_production_min.isSuspense;

  var reactIs_development = createCommonjsModule(function (module, exports) {

    (function () {
      Object.defineProperty(exports, '__esModule', {
        value: true
      }); // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
      // nor polyfill, then a plain number is used for performance.

      var hasSymbol = typeof Symbol === 'function' && Symbol.for;
      var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
      var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
      var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
      var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
      var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
      var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
      var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
      var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
      var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
      var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
      var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
      var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
      var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;

      /**
       * Forked from fbjs/warning:
       * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
       *
       * Only change is we use console.warn instead of console.error,
       * and do nothing when 'console' is not supported.
       * This really simplifies the code.
       * ---
       * Similar to invariant but only logs a warning if the condition is not met.
       * This can be used to log issues in development environments in critical
       * paths. Removing the logging code for production environments will keep the
       * same logic and follow the same code paths.
       */
      var lowPriorityWarning = function () {};

      {
        var printWarning = function (format) {
          for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          var argIndex = 0;
          var message = 'Warning: ' + format.replace(/%s/g, function () {
            return args[argIndex++];
          });

          if (typeof console !== 'undefined') {
            console.warn(message);
          }

          try {
            // --- Welcome to debugging React ---
            // This error was thrown as a convenience so that you can use this stack
            // to find the callsite that caused this warning to fire.
            throw new Error(message);
          } catch (x) {}
        };

        lowPriorityWarning = function (condition, format) {
          if (format === undefined) {
            throw new Error('`lowPriorityWarning(condition, format, ...args)` requires a warning ' + 'message argument');
          }

          if (!condition) {
            for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
              args[_key2 - 2] = arguments[_key2];
            }

            printWarning.apply(undefined, [format].concat(args));
          }
        };
      }
      var lowPriorityWarning$1 = lowPriorityWarning;

      function typeOf(object) {
        if (typeof object === 'object' && object !== null) {
          var $$typeof = object.$$typeof;

          switch ($$typeof) {
            case REACT_ELEMENT_TYPE:
              var type = object.type;

              switch (type) {
                case REACT_ASYNC_MODE_TYPE:
                case REACT_CONCURRENT_MODE_TYPE:
                case REACT_FRAGMENT_TYPE:
                case REACT_PROFILER_TYPE:
                case REACT_STRICT_MODE_TYPE:
                case REACT_SUSPENSE_TYPE:
                  return type;

                default:
                  var $$typeofType = type && type.$$typeof;

                  switch ($$typeofType) {
                    case REACT_CONTEXT_TYPE:
                    case REACT_FORWARD_REF_TYPE:
                    case REACT_PROVIDER_TYPE:
                      return $$typeofType;

                    default:
                      return $$typeof;
                  }

              }

            case REACT_LAZY_TYPE:
            case REACT_MEMO_TYPE:
            case REACT_PORTAL_TYPE:
              return $$typeof;
          }
        }

        return undefined;
      } // AsyncMode is deprecated along with isAsyncMode


      var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

      function isAsyncMode(object) {
        {
          if (!hasWarnedAboutDeprecatedIsAsyncMode) {
            hasWarnedAboutDeprecatedIsAsyncMode = true;
            lowPriorityWarning$1(false, 'The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
          }
        }
        return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
      }

      function isConcurrentMode(object) {
        return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
      }

      exports.typeOf = typeOf;
      exports.AsyncMode = REACT_ASYNC_MODE_TYPE;
      exports.ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
      exports.ContextConsumer = REACT_CONTEXT_TYPE;
      exports.ContextProvider = REACT_PROVIDER_TYPE;
      exports.Element = REACT_ELEMENT_TYPE;
      exports.ForwardRef = REACT_FORWARD_REF_TYPE;
      exports.Fragment = REACT_FRAGMENT_TYPE;
      exports.Lazy = REACT_LAZY_TYPE;
      exports.Memo = REACT_MEMO_TYPE;
      exports.Portal = REACT_PORTAL_TYPE;
      exports.Profiler = REACT_PROFILER_TYPE;
      exports.StrictMode = REACT_STRICT_MODE_TYPE;
      exports.Suspense = REACT_SUSPENSE_TYPE;

      exports.isValidElementType = function (type) {
        return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
        type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
      };

      exports.isAsyncMode = isAsyncMode;
      exports.isConcurrentMode = isConcurrentMode;

      exports.isContextConsumer = function (object) {
        return typeOf(object) === REACT_CONTEXT_TYPE;
      };

      exports.isContextProvider = function (object) {
        return typeOf(object) === REACT_PROVIDER_TYPE;
      };

      exports.isElement = function (object) {
        return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
      };

      exports.isForwardRef = function (object) {
        return typeOf(object) === REACT_FORWARD_REF_TYPE;
      };

      exports.isFragment = function (object) {
        return typeOf(object) === REACT_FRAGMENT_TYPE;
      };

      exports.isLazy = function (object) {
        return typeOf(object) === REACT_LAZY_TYPE;
      };

      exports.isMemo = function (object) {
        return typeOf(object) === REACT_MEMO_TYPE;
      };

      exports.isPortal = function (object) {
        return typeOf(object) === REACT_PORTAL_TYPE;
      };

      exports.isProfiler = function (object) {
        return typeOf(object) === REACT_PROFILER_TYPE;
      };

      exports.isStrictMode = function (object) {
        return typeOf(object) === REACT_STRICT_MODE_TYPE;
      };

      exports.isSuspense = function (object) {
        return typeOf(object) === REACT_SUSPENSE_TYPE;
      };
    })();
  });
  unwrapExports(reactIs_development);
  var reactIs_development_1 = reactIs_development.typeOf;
  var reactIs_development_2 = reactIs_development.AsyncMode;
  var reactIs_development_3 = reactIs_development.ConcurrentMode;
  var reactIs_development_4 = reactIs_development.ContextConsumer;
  var reactIs_development_5 = reactIs_development.ContextProvider;
  var reactIs_development_6 = reactIs_development.Element;
  var reactIs_development_7 = reactIs_development.ForwardRef;
  var reactIs_development_8 = reactIs_development.Fragment;
  var reactIs_development_9 = reactIs_development.Lazy;
  var reactIs_development_10 = reactIs_development.Memo;
  var reactIs_development_11 = reactIs_development.Portal;
  var reactIs_development_12 = reactIs_development.Profiler;
  var reactIs_development_13 = reactIs_development.StrictMode;
  var reactIs_development_14 = reactIs_development.Suspense;
  var reactIs_development_15 = reactIs_development.isValidElementType;
  var reactIs_development_16 = reactIs_development.isAsyncMode;
  var reactIs_development_17 = reactIs_development.isConcurrentMode;
  var reactIs_development_18 = reactIs_development.isContextConsumer;
  var reactIs_development_19 = reactIs_development.isContextProvider;
  var reactIs_development_20 = reactIs_development.isElement;
  var reactIs_development_21 = reactIs_development.isForwardRef;
  var reactIs_development_22 = reactIs_development.isFragment;
  var reactIs_development_23 = reactIs_development.isLazy;
  var reactIs_development_24 = reactIs_development.isMemo;
  var reactIs_development_25 = reactIs_development.isPortal;
  var reactIs_development_26 = reactIs_development.isProfiler;
  var reactIs_development_27 = reactIs_development.isStrictMode;
  var reactIs_development_28 = reactIs_development.isSuspense;

  var reactIs = createCommonjsModule(function (module) {

    module.exports = reactIs_development;
  });

  var ReactElement = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, '__esModule', {
      value: true
    });
    exports.default = exports.test = exports.serialize = void 0;

    var ReactIs = function (obj) {
      if (obj && obj.__esModule) {
        return obj;
      } else {
        var newObj = {};

        if (obj != null) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};

              if (desc.get || desc.set) {
                Object.defineProperty(newObj, key, desc);
              } else {
                newObj[key] = obj[key];
              }
            }
          }
        }

        newObj.default = obj;
        return newObj;
      }
    }
    /**
     * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    // Given element.props.children, or subtree during recursive traversal,
    // return flattened array of children.
    (reactIs);

    var getChildren = function (arg, children) {
      if (children === void 0) {
        children = [];
      }

      if (Array.isArray(arg)) {
        arg.forEach(function (item) {
          getChildren(item, children);
        });
      } else if (arg != null && arg !== false) {
        children.push(arg);
      }

      return children;
    };

    var getType = function (element) {
      var type = element.type;

      if (typeof type === 'string') {
        return type;
      }

      if (typeof type === 'function') {
        return type.displayName || type.name || 'Unknown';
      }

      if (ReactIs.isFragment(element)) {
        return 'React.Fragment';
      }

      if (ReactIs.isSuspense(element)) {
        return 'React.Suspense';
      }

      if (typeof type === 'object' && type !== null) {
        if (ReactIs.isContextProvider(element)) {
          return 'Context.Provider';
        }

        if (ReactIs.isContextConsumer(element)) {
          return 'Context.Consumer';
        }

        if (ReactIs.isForwardRef(element)) {
          var functionName = type.render.displayName || type.render.name || '';
          return functionName !== '' ? 'ForwardRef(' + functionName + ')' : 'ForwardRef';
        }

        if (ReactIs.isMemo(type)) {
          var _functionName = type.displayName || type.type.displayName || type.type.name || '';

          return _functionName !== '' ? 'Memo(' + _functionName + ')' : 'Memo';
        }
      }

      return 'UNDEFINED';
    };

    var getPropKeys = function (element) {
      var props = element.props;
      return Object.keys(props).filter(function (key) {
        return key !== 'children' && props[key] !== undefined;
      }).sort();
    };

    var serialize = function (element, config, indentation, depth, refs, printer) {
      return ++depth > config.maxDepth ? (0, markup.printElementAsLeaf)(getType(element), config) : (0, markup.printElement)(getType(element), (0, markup.printProps)(getPropKeys(element), element.props, config, indentation + config.indent, depth, refs, printer), (0, markup.printChildren)(getChildren(element.props.children), config, indentation + config.indent, depth, refs, printer), config, indentation);
    };

    exports.serialize = serialize;

    var test = function (val) {
      return val && ReactIs.isElement(val);
    };

    exports.test = test;
    exports.default = {
      serialize: serialize,
      test: test
    };
  });
  unwrapExports(ReactElement);
  var ReactElement_1 = ReactElement.test;
  var ReactElement_2 = ReactElement.serialize;

  var ReactTestComponent = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, '__esModule', {
      value: true
    });
    exports.default = exports.test = exports.serialize = void 0;
    var Symbol = commonjsGlobal['jest-symbol-do-not-touch'] || commonjsGlobal.Symbol;
    var testSymbol = Symbol.for('react.test.json');

    var getPropKeys = function (object) {
      var props = object.props;
      return props ? Object.keys(props).filter(function (key) {
        return props[key] !== undefined;
      }).sort() : [];
    };

    var serialize = function (object, config, indentation, depth, refs, printer) {
      return ++depth > config.maxDepth ? (0, markup.printElementAsLeaf)(object.type, config) : (0, markup.printElement)(object.type, object.props ? (0, markup.printProps)(getPropKeys(object), object.props, config, indentation + config.indent, depth, refs, printer) : '', object.children ? (0, markup.printChildren)(object.children, config, indentation + config.indent, depth, refs, printer) : '', config, indentation);
    };

    exports.serialize = serialize;

    var test = function (val) {
      return val && val.$$typeof === testSymbol;
    };

    exports.test = test;
    exports.default = {
      serialize: serialize,
      test: test
    };
  });
  unwrapExports(ReactTestComponent);
  var ReactTestComponent_1 = ReactTestComponent.test;
  var ReactTestComponent_2 = ReactTestComponent.serialize;

  var build = createCommonjsModule(function (module) {

    var _ansiStyles = _interopRequireDefault(ansiStyles);

    var _AsymmetricMatcher = _interopRequireDefault(AsymmetricMatcher);

    var _ConvertAnsi = _interopRequireDefault(ConvertAnsi);

    var _DOMCollection = _interopRequireDefault(DOMCollection);

    var _DOMElement = _interopRequireDefault(DOMElement);

    var _Immutable = _interopRequireDefault(Immutable);

    var _ReactElement = _interopRequireDefault(ReactElement);

    var _ReactTestComponent = _interopRequireDefault(ReactTestComponent);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    var Symbol = commonjsGlobal['jest-symbol-do-not-touch'] || commonjsGlobal.Symbol;
    var toString = Object.prototype.toString;
    var toISOString = Date.prototype.toISOString;
    var errorToString = Error.prototype.toString;
    var regExpToString = RegExp.prototype.toString;
    var symbolToString = Symbol.prototype.toString;
    /**
     * Explicitly comparing typeof constructor to function avoids undefined as name
     * when mock identity-obj-proxy returns the key as the value for any key.
     */

    var getConstructorName = function (val) {
      return typeof val.constructor === 'function' && val.constructor.name || 'Object';
    };
    /* global window */

    /** Is val is equal to global window object? Works even if it does not exist :) */


    var isWindow = function (val) {
      return typeof window !== 'undefined' && val === window;
    };

    var SYMBOL_REGEXP = /^Symbol\((.*)\)(.*)$/;
    var NEWLINE_REGEXP = /\n/gi;

    var PrettyFormatPluginError =
    /*#__PURE__*/
    function (_Error) {
      _inheritsLoose(PrettyFormatPluginError, _Error);

      function PrettyFormatPluginError(message, stack) {
        var _this = _Error.call(this, message) || this;

        _this.stack = stack;
        _this.name = _this.constructor.name;
        return _this;
      }

      return PrettyFormatPluginError;
    }(_wrapNativeSuper(Error));

    function isToStringedArrayType(toStringed) {
      return toStringed === '[object Array]' || toStringed === '[object ArrayBuffer]' || toStringed === '[object DataView]' || toStringed === '[object Float32Array]' || toStringed === '[object Float64Array]' || toStringed === '[object Int8Array]' || toStringed === '[object Int16Array]' || toStringed === '[object Int32Array]' || toStringed === '[object Uint8Array]' || toStringed === '[object Uint8ClampedArray]' || toStringed === '[object Uint16Array]' || toStringed === '[object Uint32Array]';
    }

    function printNumber(val) {
      return Object.is(val, -0) ? '-0' : String(val);
    }

    function printBigInt(val) {
      return String(val + "n");
    }

    function printFunction(val, printFunctionName) {
      if (!printFunctionName) {
        return '[Function]';
      }

      return '[Function ' + (val.name || 'anonymous') + ']';
    }

    function printSymbol(val) {
      return symbolToString.call(val).replace(SYMBOL_REGEXP, 'Symbol($1)');
    }

    function printError(val) {
      return '[' + errorToString.call(val) + ']';
    }
    /**
     * The first port of call for printing an object, handles most of the
     * data-types in JS.
     */


    function printBasicValue(val, printFunctionName, escapeRegex, escapeString) {
      if (val === true || val === false) {
        return '' + val;
      }

      if (val === undefined) {
        return 'undefined';
      }

      if (val === null) {
        return 'null';
      }

      var typeOf = typeof val;

      if (typeOf === 'number') {
        return printNumber(val);
      }

      if (typeOf === 'bigint') {
        return printBigInt(val);
      }

      if (typeOf === 'string') {
        if (escapeString) {
          return '"' + val.replace(/"|\\/g, '\\$&') + '"';
        }

        return '"' + val + '"';
      }

      if (typeOf === 'function') {
        return printFunction(val, printFunctionName);
      }

      if (typeOf === 'symbol') {
        return printSymbol(val);
      }

      var toStringed = toString.call(val);

      if (toStringed === '[object WeakMap]') {
        return 'WeakMap {}';
      }

      if (toStringed === '[object WeakSet]') {
        return 'WeakSet {}';
      }

      if (toStringed === '[object Function]' || toStringed === '[object GeneratorFunction]') {
        return printFunction(val, printFunctionName);
      }

      if (toStringed === '[object Symbol]') {
        return printSymbol(val);
      }

      if (toStringed === '[object Date]') {
        return isNaN(+val) ? 'Date { NaN }' : toISOString.call(val);
      }

      if (toStringed === '[object Error]') {
        return printError(val);
      }

      if (toStringed === '[object RegExp]') {
        if (escapeRegex) {
          // https://github.com/benjamingr/RegExp.escape/blob/master/polyfill.js
          return regExpToString.call(val).replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
        }

        return regExpToString.call(val);
      }

      if (val instanceof Error) {
        return printError(val);
      }

      return null;
    }
    /**
     * Handles more complex objects ( such as objects with circular references.
     * maps and sets etc )
     */


    function printComplexValue(val, config, indentation, depth, refs, hasCalledToJSON) {
      if (refs.indexOf(val) !== -1) {
        return '[Circular]';
      }

      refs = refs.slice();
      refs.push(val);
      var hitMaxDepth = ++depth > config.maxDepth;
      var min = config.min;

      if (config.callToJSON && !hitMaxDepth && val.toJSON && typeof val.toJSON === 'function' && !hasCalledToJSON) {
        return printer(val.toJSON(), config, indentation, depth, refs, true);
      }

      var toStringed = toString.call(val);

      if (toStringed === '[object Arguments]') {
        return hitMaxDepth ? '[Arguments]' : (min ? '' : 'Arguments ') + '[' + (0, collections.printListItems)(val, config, indentation, depth, refs, printer) + ']';
      }

      if (isToStringedArrayType(toStringed)) {
        return hitMaxDepth ? '[' + val.constructor.name + ']' : (min ? '' : val.constructor.name + ' ') + '[' + (0, collections.printListItems)(val, config, indentation, depth, refs, printer) + ']';
      }

      if (toStringed === '[object Map]') {
        return hitMaxDepth ? '[Map]' : 'Map {' + (0, collections.printIteratorEntries)(val.entries(), config, indentation, depth, refs, printer, ' => ') + '}';
      }

      if (toStringed === '[object Set]') {
        return hitMaxDepth ? '[Set]' : 'Set {' + (0, collections.printIteratorValues)(val.values(), config, indentation, depth, refs, printer) + '}';
      } // Avoid failure to serialize global window object in jsdom test environment.
      // For example, not even relevant if window is prop of React element.


      return hitMaxDepth || isWindow(val) ? '[' + getConstructorName(val) + ']' : (min ? '' : getConstructorName(val) + ' ') + '{' + (0, collections.printObjectProperties)(val, config, indentation, depth, refs, printer) + '}';
    }

    function isNewPlugin(plugin) {
      return plugin.serialize != null;
    }

    function printPlugin(plugin, val, config, indentation, depth, refs) {
      var printed;

      try {
        printed = isNewPlugin(plugin) ? plugin.serialize(val, config, indentation, depth, refs, printer) : plugin.print(val, function (valChild) {
          return printer(valChild, config, indentation, depth, refs);
        }, function (str) {
          var indentationNext = indentation + config.indent;
          return indentationNext + str.replace(NEWLINE_REGEXP, '\n' + indentationNext);
        }, {
          edgeSpacing: config.spacingOuter,
          min: config.min,
          spacing: config.spacingInner
        }, config.colors);
      } catch (error) {
        throw new PrettyFormatPluginError(error.message, error.stack);
      }

      if (typeof printed !== 'string') {
        throw new Error("pretty-format: Plugin must return type \"string\" but instead returned \"" + typeof printed + "\".");
      }

      return printed;
    }

    function findPlugin(plugins, val) {
      for (var p = 0; p < plugins.length; p++) {
        try {
          if (plugins[p].test(val)) {
            return plugins[p];
          }
        } catch (error) {
          throw new PrettyFormatPluginError(error.message, error.stack);
        }
      }

      return null;
    }

    function printer(val, config, indentation, depth, refs, hasCalledToJSON) {
      var plugin = findPlugin(config.plugins, val);

      if (plugin !== null) {
        return printPlugin(plugin, val, config, indentation, depth, refs);
      }

      var basicResult = printBasicValue(val, config.printFunctionName, config.escapeRegex, config.escapeString);

      if (basicResult !== null) {
        return basicResult;
      }

      return printComplexValue(val, config, indentation, depth, refs, hasCalledToJSON);
    }

    var DEFAULT_THEME = {
      comment: 'gray',
      content: 'reset',
      prop: 'yellow',
      tag: 'cyan',
      value: 'green'
    };
    var DEFAULT_THEME_KEYS = Object.keys(DEFAULT_THEME);
    var DEFAULT_OPTIONS = {
      callToJSON: true,
      escapeRegex: false,
      escapeString: true,
      highlight: false,
      indent: 2,
      maxDepth: Infinity,
      min: false,
      plugins: [],
      printFunctionName: true,
      theme: DEFAULT_THEME
    };

    function validateOptions(options) {
      Object.keys(options).forEach(function (key) {
        if (!DEFAULT_OPTIONS.hasOwnProperty(key)) {
          throw new Error("pretty-format: Unknown option \"" + key + "\".");
        }
      });

      if (options.min && options.indent !== undefined && options.indent !== 0) {
        throw new Error('pretty-format: Options "min" and "indent" cannot be used together.');
      }

      if (options.theme !== undefined) {
        if (options.theme === null) {
          throw new Error("pretty-format: Option \"theme\" must not be null.");
        }

        if (typeof options.theme !== 'object') {
          throw new Error("pretty-format: Option \"theme\" must be of type \"object\" but instead received \"" + typeof options.theme + "\".");
        }
      }
    }

    var getColorsHighlight = function (options) {
      return DEFAULT_THEME_KEYS.reduce(function (colors, key) {
        var value = options.theme && options.theme[key] !== undefined ? options.theme[key] : DEFAULT_THEME[key];
        var color = value && _ansiStyles.default[value];

        if (color && typeof color.close === 'string' && typeof color.open === 'string') {
          colors[key] = color;
        } else {
          throw new Error("pretty-format: Option \"theme\" has a key \"" + key + "\" whose value \"" + value + "\" is undefined in ansi-styles.");
        }

        return colors;
      }, Object.create(null));
    };

    var getColorsEmpty = function () {
      return DEFAULT_THEME_KEYS.reduce(function (colors, key) {
        colors[key] = {
          close: '',
          open: ''
        };
        return colors;
      }, Object.create(null));
    };

    var getPrintFunctionName = function (options) {
      return options && options.printFunctionName !== undefined ? options.printFunctionName : DEFAULT_OPTIONS.printFunctionName;
    };

    var getEscapeRegex = function (options) {
      return options && options.escapeRegex !== undefined ? options.escapeRegex : DEFAULT_OPTIONS.escapeRegex;
    };

    var getEscapeString = function (options) {
      return options && options.escapeString !== undefined ? options.escapeString : DEFAULT_OPTIONS.escapeString;
    };

    var getConfig = function (options) {
      return {
        callToJSON: options && options.callToJSON !== undefined ? options.callToJSON : DEFAULT_OPTIONS.callToJSON,
        colors: options && options.highlight ? getColorsHighlight(options) : getColorsEmpty(),
        escapeRegex: getEscapeRegex(options),
        escapeString: getEscapeString(options),
        indent: options && options.min ? '' : createIndent(options && options.indent !== undefined ? options.indent : DEFAULT_OPTIONS.indent),
        maxDepth: options && options.maxDepth !== undefined ? options.maxDepth : DEFAULT_OPTIONS.maxDepth,
        min: options && options.min !== undefined ? options.min : DEFAULT_OPTIONS.min,
        plugins: options && options.plugins !== undefined ? options.plugins : DEFAULT_OPTIONS.plugins,
        printFunctionName: getPrintFunctionName(options),
        spacingInner: options && options.min ? ' ' : '\n',
        spacingOuter: options && options.min ? '' : '\n'
      };
    };

    function createIndent(indent) {
      return new Array(indent + 1).join(' ');
    }
    /**
     * Returns a presentation string of your `val` object
     * @param val any potential JavaScript object
     * @param options Custom settings
     */


    function prettyFormat(val, options) {
      if (options) {
        validateOptions(options);

        if (options.plugins) {
          var plugin = findPlugin(options.plugins, val);

          if (plugin !== null) {
            return printPlugin(plugin, val, getConfig(options), '', 0, []);
          }
        }
      }

      var basicResult = printBasicValue(val, getPrintFunctionName(options), getEscapeRegex(options), getEscapeString(options));

      if (basicResult !== null) {
        return basicResult;
      }

      return printComplexValue(val, getConfig(options), '', 0, []);
    }

    prettyFormat.plugins = {
      AsymmetricMatcher: _AsymmetricMatcher.default,
      ConvertAnsi: _ConvertAnsi.default,
      DOMCollection: _DOMCollection.default,
      DOMElement: _DOMElement.default,
      Immutable: _Immutable.default,
      ReactElement: _ReactElement.default,
      ReactTestComponent: _ReactTestComponent.default
    };
    /* eslint-disable-next-line no-redeclare */

    module.exports = prettyFormat;
  });
  var prettyFormat = unwrapExports(build);

  /*!
   * Shim for MutationObserver interface
   * Author: Graeme Yeates (github.com/megawac)
   * Repository: https://github.com/megawac/MutationObserver.js
   * License: WTFPL V2, 2004 (wtfpl.net).
   * Though credit and staring the repo will make me feel pretty, you can modify and redistribute as you please.
   * Attempts to follow spec (https://www.w3.org/TR/dom/#mutation-observers) as closely as possible for native javascript
   * See https://github.com/WebKit/webkit/blob/master/Source/WebCore/dom/MutationObserver.cpp for current webkit source c++ implementation
   */

  /**
   * prefix bugs:
      - https://bugs.webkit.org/show_bug.cgi?id=85161
      - https://bugzilla.mozilla.org/show_bug.cgi?id=749920
   * Don't use WebKitMutationObserver as Safari (6.0.5-6.1) use a buggy implementation
  */
  var MutationObserver = function (undefined$1) {
    if (typeof window !== 'undefined' && typeof window.MutationObserver !== 'undefined') {
      return window.MutationObserver;
    }
    /**
     * @param {function(Array.<MutationRecord>, MutationObserver)} listener
     * @constructor
     */


    function MutationObserver(listener) {
      /**
       * @type {Array.<Object>}
       * @private
       */
      this._watched = [];
      /** @private */

      this._listener = listener;
    }
    /**
     * Start a recursive timeout function to check all items being observed for mutations
     * @type {MutationObserver} observer
     * @private
     */


    function startMutationChecker(observer) {
      (function check() {
        var mutations = observer.takeRecords();

        if (mutations.length) {
          // fire away
          // calling the listener with context is not spec but currently consistent with FF and WebKit
          observer._listener(mutations, observer);
        }
        /** @private */


        observer._timeout = setTimeout(check, MutationObserver._period);
      })();
    }
    /**
     * Period to check for mutations (~32 times/sec)
     * @type {number}
     * @expose
     */


    MutationObserver._period = 30
    /*ms+runtime*/
    ;
    /**
     * Exposed API
     * @expose
     * @final
     */

    MutationObserver.prototype = {
      /**
       * see https://dom.spec.whatwg.org/#dom-mutationobserver-observe
       * not going to throw here but going to follow the current spec config sets
       * @param {Node|null} $target
       * @param {Object|null} config : MutationObserverInit configuration dictionary
       * @expose
       * @return undefined
       */
      observe: function observe($target, config) {
        /**
         * Using slightly different names so closure can go ham
         * @type {!Object} : A custom mutation config
         */
        var settings = {
          attr: !!(config.attributes || config.attributeFilter || config.attributeOldValue),
          // some browsers enforce that subtree must be set with childList, attributes or characterData.
          // We don't care as spec doesn't specify this rule.
          kids: !!config.childList,
          descendents: !!config.subtree,
          charData: !!(config.characterData || config.characterDataOldValue)
        };
        var watched = this._watched; // remove already observed target element from pool

        for (var i = 0; i < watched.length; i++) {
          if (watched[i].tar === $target) watched.splice(i, 1);
        }

        if (config.attributeFilter) {
          /**
           * converts to a {key: true} dict for faster lookup
           * @type {Object.<String,Boolean>}
           */
          settings.afilter = reduce(config.attributeFilter, function (a, b) {
            a[b] = true;
            return a;
          }, {});
        }

        watched.push({
          tar: $target,
          fn: createMutationSearcher($target, settings)
        }); // reconnect if not connected

        if (!this._timeout) {
          startMutationChecker(this);
        }
      },

      /**
       * Finds mutations since last check and empties the "record queue" i.e. mutations will only be found once
       * @expose
       * @return {Array.<MutationRecord>}
       */
      takeRecords: function takeRecords() {
        var mutations = [];
        var watched = this._watched;

        for (var i = 0; i < watched.length; i++) {
          watched[i].fn(mutations);
        }

        return mutations;
      },

      /**
       * @expose
       * @return undefined
       */
      disconnect: function disconnect() {
        this._watched = []; // clear the stuff being observed

        clearTimeout(this._timeout); // ready for garbage collection

        /** @private */

        this._timeout = null;
      }
    };
    /**
     * Simple MutationRecord pseudoclass. No longer exposing as its not fully compliant
     * @param {Object} data
     * @return {Object} a MutationRecord
     */

    function MutationRecord(data) {
      var settings = {
        // technically these should be on proto so hasOwnProperty will return false for non explicitly props
        type: null,
        target: null,
        addedNodes: [],
        removedNodes: [],
        previousSibling: null,
        nextSibling: null,
        attributeName: null,
        attributeNamespace: null,
        oldValue: null
      };

      for (var prop in data) {
        if (has(settings, prop) && data[prop] !== undefined$1) settings[prop] = data[prop];
      }

      return settings;
    }
    /**
     * Creates a func to find all the mutations
     *
     * @param {Node} $target
     * @param {!Object} config : A custom mutation config
     */


    function createMutationSearcher($target, config) {
      /** type {Elestuct} */
      var $oldstate = clone($target, config); // create the cloned datastructure

      /**
       * consumes array of mutations we can push to
       *
       * @param {Array.<MutationRecord>} mutations
       */

      return function (mutations) {
        var olen = mutations.length,
            dirty;

        if (config.charData && $target.nodeType === 3 && $target.nodeValue !== $oldstate.charData) {
          mutations.push(new MutationRecord({
            type: "characterData",
            target: $target,
            oldValue: $oldstate.charData
          }));
        } // Alright we check base level changes in attributes... easy


        if (config.attr && $oldstate.attr) {
          findAttributeMutations(mutations, $target, $oldstate.attr, config.afilter);
        } // check childlist or subtree for mutations


        if (config.kids || config.descendents) {
          dirty = searchSubtree(mutations, $target, $oldstate, config);
        } // reclone data structure if theres changes


        if (dirty || mutations.length !== olen) {
          /** type {Elestuct} */
          $oldstate = clone($target, config);
        }
      };
    }
    /* attributes + attributeFilter helpers */
    // Check if the environment has the attribute bug (#4) which cause
    // element.attributes.style to always be null.


    var hasAttributeBug = false;

    if (typeof document !== 'undefined') {
      var testElement = document.createElement('i');
      testElement.style.top = 0;
      hasAttributeBug = testElement.attributes.style.value != 'null';
    }
    /**
     * Gets an attribute value in an environment without attribute bug
     *
     * @param {Node} el
     * @param {Attr} attr
     * @return {String} an attribute value
     */


    var getAttributeValue = hasAttributeBug ? function (el, attr) {
      // There is a potential for a warning to occur here if the attribute is a
      // custom attribute in IE<9 with a custom .toString() method. This is
      // just a warning and doesn't affect execution (see #21)
      return attr.value;
    }
    /**
     * Gets an attribute value with special hack for style attribute (see #4)
     *
     * @param {Node} el
     * @param {Attr} attr
     * @return {String} an attribute value
     */
    : function (el, attr) {
      // As with getAttributeSimple there is a potential warning for custom attribtues in IE7.
      return attr.name !== "style" ? attr.value : el.style.cssText;
    };
    /**
     * fast helper to check to see if attributes object of an element has changed
     * doesnt handle the textnode case
     *
     * @param {Array.<MutationRecord>} mutations
     * @param {Node} $target
     * @param {Object.<string, string>} $oldstate : Custom attribute clone data structure from clone
     * @param {Object} filter
     */

    function findAttributeMutations(mutations, $target, $oldstate, filter) {
      var checked = {};
      var attributes = $target.attributes;
      var attr;
      var i = attributes.length;

      while (i--) {
        attr = attributes[i];
        name = attr.name;

        if (!filter || has(filter, name)) {
          if (getAttributeValue($target, attr) !== $oldstate[name]) {
            // The pushing is redundant but gzips very nicely
            mutations.push(MutationRecord({
              type: "attributes",
              target: $target,
              attributeName: name,
              oldValue: $oldstate[name],
              attributeNamespace: attr.namespaceURI // in ie<8 it incorrectly will return undefined

            }));
          }

          checked[name] = true;
        }
      }

      for (var name in $oldstate) {
        if (!checked[name]) {
          mutations.push(MutationRecord({
            target: $target,
            type: "attributes",
            attributeName: name,
            oldValue: $oldstate[name]
          }));
        }
      }
    }
    /**
     * searchSubtree: array of mutations so far, element, element clone, bool
     * synchronous dfs comparision of two nodes
     * This function is applied to any observed element with childList or subtree specified
     * Sorry this is kind of confusing as shit, tried to comment it a bit...
     * codereview.stackexchange.com/questions/38351 discussion of an earlier version of this func
     *
     * @param {Array} mutations
     * @param {Node} $target
     * @param {!Object} $oldstate : A custom cloned node from clone()
     * @param {!Object} config : A custom mutation config
     */


    function searchSubtree(mutations, $target, $oldstate, config) {
      // Track if the tree is dirty and has to be recomputed (#14).
      var dirty;
      /*
       * Helper to identify node rearrangment and stuff...
       * There is no gaurentee that the same node will be identified for both added and removed nodes
       * if the positions have been shuffled.
       * conflicts array will be emptied by end of operation
       */

      function resolveConflicts(conflicts, node, $kids, $oldkids, numAddedNodes) {
        // the distance between the first conflicting node and the last
        var distance = conflicts.length - 1; // prevents same conflict being resolved twice consider when two nodes switch places.
        // only one should be given a mutation event (note -~ is used as a math.ceil shorthand)

        var counter = -~((distance - numAddedNodes) / 2);
        var $cur;
        var oldstruct;
        var conflict;

        while (conflict = conflicts.pop()) {
          $cur = $kids[conflict.i];
          oldstruct = $oldkids[conflict.j]; // attempt to determine if there was node rearrangement... won't gaurentee all matches
          // also handles case where added/removed nodes cause nodes to be identified as conflicts

          if (config.kids && counter && Math.abs(conflict.i - conflict.j) >= distance) {
            mutations.push(MutationRecord({
              type: "childList",
              target: node,
              addedNodes: [$cur],
              removedNodes: [$cur],
              // haha don't rely on this please
              nextSibling: $cur.nextSibling,
              previousSibling: $cur.previousSibling
            }));
            counter--; // found conflict
          } // Alright we found the resorted nodes now check for other types of mutations


          if (config.attr && oldstruct.attr) findAttributeMutations(mutations, $cur, oldstruct.attr, config.afilter);

          if (config.charData && $cur.nodeType === 3 && $cur.nodeValue !== oldstruct.charData) {
            mutations.push(MutationRecord({
              type: "characterData",
              target: $cur,
              oldValue: oldstruct.charData
            }));
          } // now look @ subtree


          if (config.descendents) findMutations($cur, oldstruct);
        }
      }
      /**
       * Main worker. Finds and adds mutations if there are any
       * @param {Node} node
       * @param {!Object} old : A cloned data structure using internal clone
       */


      function findMutations(node, old) {
        var $kids = node.childNodes;
        var $oldkids = old.kids;
        var klen = $kids.length; // $oldkids will be undefined for text and comment nodes

        var olen = $oldkids ? $oldkids.length : 0; // if (!olen && !klen) return; // both empty; clearly no changes
        // we delay the intialization of these for marginal performance in the expected case (actually quite signficant on large subtrees when these would be otherwise unused)
        // map of checked element of ids to prevent registering the same conflict twice

        var map; // array of potential conflicts (ie nodes that may have been re arranged)

        var conflicts;
        var id; // element id from getElementId helper

        var idx; // index of a moved or inserted element

        var oldstruct; // current and old nodes

        var $cur;
        var $old; // track the number of added nodes so we can resolve conflicts more accurately

        var numAddedNodes = 0; // iterate over both old and current child nodes at the same time

        var i = 0,
            j = 0; // while there is still anything left in $kids or $oldkids (same as i < $kids.length || j < $oldkids.length;)

        while (i < klen || j < olen) {
          // current and old nodes at the indexs
          $cur = $kids[i];
          oldstruct = $oldkids[j];
          $old = oldstruct && oldstruct.node;

          if ($cur === $old) {
            // expected case - optimized for this case
            // check attributes as specified by config
            if (config.attr && oldstruct.attr)
              /* oldstruct.attr instead of textnode check */
              findAttributeMutations(mutations, $cur, oldstruct.attr, config.afilter); // check character data if node is a comment or textNode and it's being observed

            if (config.charData && oldstruct.charData !== undefined$1 && $cur.nodeValue !== oldstruct.charData) {
              mutations.push(MutationRecord({
                type: "characterData",
                target: $cur,
                oldValue: oldstruct.charData
              }));
            } // resolve conflicts; it will be undefined if there are no conflicts - otherwise an array


            if (conflicts) resolveConflicts(conflicts, node, $kids, $oldkids, numAddedNodes); // recurse on next level of children. Avoids the recursive call when there are no children left to iterate

            if (config.descendents && ($cur.childNodes.length || oldstruct.kids && oldstruct.kids.length)) findMutations($cur, oldstruct);
            i++;
            j++;
          } else {
            // (uncommon case) lookahead until they are the same again or the end of children
            dirty = true;

            if (!map) {
              // delayed initalization (big perf benefit)
              map = {};
              conflicts = [];
            }

            if ($cur) {
              // check id is in the location map otherwise do a indexOf search
              if (!map[id = getElementId($cur)]) {
                // to prevent double checking
                // mark id as found
                map[id] = true; // custom indexOf using comparitor checking oldkids[i].node === $cur

                if ((idx = indexOfCustomNode($oldkids, $cur, j)) === -1) {
                  if (config.kids) {
                    mutations.push(MutationRecord({
                      type: "childList",
                      target: node,
                      addedNodes: [$cur],
                      // $cur is a new node
                      nextSibling: $cur.nextSibling,
                      previousSibling: $cur.previousSibling
                    }));
                    numAddedNodes++;
                  }
                } else {
                  conflicts.push({
                    // add conflict
                    i: i,
                    j: idx
                  });
                }
              }

              i++;
            }

            if ($old && // special case: the changes may have been resolved: i and j appear congurent so we can continue using the expected case
            $old !== $kids[i]) {
              if (!map[id = getElementId($old)]) {
                map[id] = true;

                if ((idx = indexOf($kids, $old, i)) === -1) {
                  if (config.kids) {
                    mutations.push(MutationRecord({
                      type: "childList",
                      target: old.node,
                      removedNodes: [$old],
                      nextSibling: $oldkids[j + 1],
                      // praise no indexoutofbounds exception
                      previousSibling: $oldkids[j - 1]
                    }));
                    numAddedNodes--;
                  }
                } else {
                  conflicts.push({
                    i: idx,
                    j: j
                  });
                }
              }

              j++;
            }
          } // end uncommon case

        } // end loop
        // resolve any remaining conflicts


        if (conflicts) resolveConflicts(conflicts, node, $kids, $oldkids, numAddedNodes);
      }

      findMutations($target, $oldstate);
      return dirty;
    }
    /**
     * Utility
     * Cones a element into a custom data structure designed for comparision. https://gist.github.com/megawac/8201012
     *
     * @param {Node} $target
     * @param {!Object} config : A custom mutation config
     * @return {!Object} : Cloned data structure
     */


    function clone($target, config) {
      var recurse = true; // set true so childList we'll always check the first level

      return function copy($target) {
        var elestruct = {
          /** @type {Node} */
          node: $target
        }; // Store current character data of target text or comment node if the config requests
        // those properties to be observed.

        if (config.charData && ($target.nodeType === 3 || $target.nodeType === 8)) {
          elestruct.charData = $target.nodeValue;
        } // its either a element, comment, doc frag or document node
        else {
            // Add attr only if subtree is specified or top level and avoid if
            // attributes is a document object (#13).
            if (config.attr && recurse && $target.nodeType === 1) {
              /**
               * clone live attribute list to an object structure {name: val}
               * @type {Object.<string, string>}
               */
              elestruct.attr = reduce($target.attributes, function (memo, attr) {
                if (!config.afilter || config.afilter[attr.name]) {
                  memo[attr.name] = getAttributeValue($target, attr);
                }

                return memo;
              }, {});
            } // whether we should iterate the children of $target node


            if (recurse && (config.kids || config.charData || config.attr && config.descendents)) {
              /** @type {Array.<!Object>} : Array of custom clone */
              elestruct.kids = map($target.childNodes, copy);
            }

            recurse = config.descendents;
          }

        return elestruct;
      }($target);
    }
    /**
     * indexOf an element in a collection of custom nodes
     *
     * @param {NodeList} set
     * @param {!Object} $node : A custom cloned node
     * @param {number} idx : index to start the loop
     * @return {number}
     */


    function indexOfCustomNode(set, $node, idx) {
      return indexOf(set, $node, idx, JSCompiler_renameProperty("node"));
    } // using a non id (eg outerHTML or nodeValue) is extremely naive and will run into issues with nodes that may appear the same like <li></li>


    var counter = 1; // don't use 0 as id (falsy)

    /** @const */

    var expando = "mo_id";
    /**
     * Attempt to uniquely id an element for hashing. We could optimize this for legacy browsers but it hopefully wont be called enough to be a concern
     *
     * @param {Node} $ele
     * @return {(string|number)}
     */

    function getElementId($ele) {
      try {
        return $ele.id || ($ele[expando] = $ele[expando] || counter++);
      } catch (o_O) {
        // ie <8 will throw if you set an unknown property on a text node
        try {
          return $ele.nodeValue; // naive
        } catch (shitie) {
          // when text node is removed: https://gist.github.com/megawac/8355978 :(
          return counter++;
        }
      }
    }
    /**
     * **map** Apply a mapping function to each item of a set
     * @param {Array|NodeList} set
     * @param {Function} iterator
     */


    function map(set, iterator) {
      var results = [];

      for (var index = 0; index < set.length; index++) {
        results[index] = iterator(set[index], index, set);
      }

      return results;
    }
    /**
     * **Reduce** builds up a single result from a list of values
     * @param {Array|NodeList|NamedNodeMap} set
     * @param {Function} iterator
     * @param {*} [memo] Initial value of the memo.
     */


    function reduce(set, iterator, memo) {
      for (var index = 0; index < set.length; index++) {
        memo = iterator(memo, set[index], index, set);
      }

      return memo;
    }
    /**
     * **indexOf** find index of item in collection.
     * @param {Array|NodeList} set
     * @param {Object} item
     * @param {number} idx
     * @param {string} [prop] Property on set item to compare to item
     */


    function indexOf(set, item, idx, prop) {
      for (;
      /*idx = ~~idx*/
      idx < set.length; idx++) {
        // start idx is always given as this is internal
        if ((prop ? set[idx][prop] : set[idx]) === item) return idx;
      }

      return -1;
    }
    /**
     * @param {Object} obj
     * @param {(string|number)} prop
     * @return {boolean}
     */


    function has(obj, prop) {
      return obj[prop] !== undefined$1; // will be nicely inlined by gcc
    } // GCC hack see https://stackoverflow.com/a/23202438/1517919


    function JSCompiler_renameProperty(a) {
      return a;
    }

    return MutationObserver;
  }(void 0);

  var ariaPropsMap_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ariaPropsMap = new Map([['aria-activedescendant', {
      'type': 'id'
    }], ['aria-atomic', {
      'type': 'boolean'
    }], ['aria-autocomplete', {
      'type': 'token',
      'values': ['inline', 'list', 'both', 'none']
    }], ['aria-busy', {
      'type': 'boolean'
    }], ['aria-checked', {
      'type': 'tristate'
    }], ['aria-colcount', {
      type: 'integer'
    }], ['aria-colindex', {
      type: 'integer'
    }], ['aria-colspan', {
      type: 'integer'
    }], ['aria-controls', {
      'type': 'idlist'
    }], ['aria-current', {
      type: 'token',
      values: ['page', 'step', 'location', 'date', 'time', true, false]
    }], ['aria-describedby', {
      'type': 'idlist'
    }], ['aria-disabled', {
      'type': 'boolean'
    }], ['aria-dropeffect', {
      'type': 'tokenlist',
      'values': ['copy', 'move', 'link', 'execute', 'popup', 'none']
    }], ['aria-errormessage', {
      'type': 'string'
    }], ['aria-expanded', {
      'type': 'boolean',
      'allowundefined': true
    }], ['aria-flowto', {
      'type': 'idlist'
    }], ['aria-grabbed', {
      'type': 'boolean',
      'allowundefined': true
    }], ['aria-haspopup', {
      'type': 'token',
      'values': [false, true, 'menu', 'listbox', 'tree', 'grid', 'dialog']
    }], ['aria-hidden', {
      'type': 'boolean'
    }], ['aria-invalid', {
      'type': 'token',
      'values': ['grammar', false, 'spelling', true]
    }], ['aria-keyshortcuts', {
      type: 'string'
    }], ['aria-label', {
      'type': 'string'
    }], ['aria-labelledby', {
      'type': 'idlist'
    }], ['aria-level', {
      'type': 'integer'
    }], ['aria-live', {
      'type': 'token',
      'values': ['off', 'polite', 'assertive']
    }], ['aria-modal', {
      type: 'boolean'
    }], ['aria-multiline', {
      'type': 'boolean'
    }], ['aria-multiselectable', {
      'type': 'boolean'
    }], ['aria-orientation', {
      'type': 'token',
      'values': ['vertical', 'horizontal']
    }], ['aria-owns', {
      'type': 'idlist'
    }], ['aria-placeholder', {
      type: 'string'
    }], ['aria-posinset', {
      'type': 'integer'
    }], ['aria-pressed', {
      'type': 'tristate'
    }], ['aria-readonly', {
      'type': 'boolean'
    }], ['aria-relevant', {
      'type': 'tokenlist',
      'values': ['additions', 'removals', 'text', 'all']
    }], ['aria-required', {
      'type': 'boolean'
    }], ['aria-roledescription', {
      type: 'string'
    }], ['aria-rowcount', {
      type: 'integer'
    }], ['aria-rowindex', {
      type: 'integer'
    }], ['aria-rowspan', {
      type: 'integer'
    }], ['aria-selected', {
      'type': 'boolean',
      'allowundefined': true
    }], ['aria-setsize', {
      'type': 'integer'
    }], ['aria-sort', {
      'type': 'token',
      'values': ['ascending', 'descending', 'none', 'other']
    }], ['aria-valuemax', {
      'type': 'number'
    }], ['aria-valuemin', {
      'type': 'number'
    }], ['aria-valuenow', {
      'type': 'number'
    }], ['aria-valuetext', {
      'type': 'string'
    }]]);
    exports.default = ariaPropsMap;
  });
  unwrapExports(ariaPropsMap_1);

  var domMap_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var domMap = new Map([['a', {
      reserved: false
    }], ['abbr', {
      reserved: false
    }], ['acronym', {
      reserved: false
    }], ['address', {
      reserved: false
    }], ['applet', {
      reserved: false
    }], ['area', {
      reserved: false
    }], ['article', {
      reserved: false
    }], ['aside', {
      reserved: false
    }], ['audio', {
      reserved: false
    }], ['b', {
      reserved: false
    }], ['base', {
      reserved: true
    }], ['bdi', {
      reserved: false
    }], ['bdo', {
      reserved: false
    }], ['big', {
      reserved: false
    }], ['blink', {
      reserved: false
    }], ['blockquote', {
      reserved: false
    }], ['body', {
      reserved: false
    }], ['br', {
      reserved: false
    }], ['button', {
      reserved: false
    }], ['canvas', {
      reserved: false
    }], ['caption', {
      reserved: false
    }], ['center', {
      reserved: false
    }], ['cite', {
      reserved: false
    }], ['code', {
      reserved: false
    }], ['col', {
      reserved: true
    }], ['colgroup', {
      reserved: true
    }], ['content', {
      reserved: false
    }], ['data', {
      reserved: false
    }], ['datalist', {
      reserved: false
    }], ['dd', {
      reserved: false
    }], ['del', {
      reserved: false
    }], ['details', {
      reserved: false
    }], ['dfn', {
      reserved: false
    }], ['dialog', {
      reserved: false
    }], ['dir', {
      reserved: false
    }], ['div', {
      reserved: false
    }], ['dl', {
      reserved: false
    }], ['dt', {
      reserved: false
    }], ['em', {
      reserved: false
    }], ['embed', {
      reserved: false
    }], ['fieldset', {
      reserved: false
    }], ['figcaption', {
      reserved: false
    }], ['figure', {
      reserved: false
    }], ['font', {
      reserved: false
    }], ['footer', {
      reserved: false
    }], ['form', {
      reserved: false
    }], ['frame', {
      reserved: false
    }], ['frameset', {
      reserved: false
    }], ['h1', {
      reserved: false
    }], ['h2', {
      reserved: false
    }], ['h3', {
      reserved: false
    }], ['h4', {
      reserved: false
    }], ['h5', {
      reserved: false
    }], ['h6', {
      reserved: false
    }], ['head', {
      reserved: true
    }], ['header', {
      reserved: false
    }], ['hgroup', {
      reserved: false
    }], ['hr', {
      reserved: false
    }], ['html', {
      reserved: true
    }], ['i', {
      reserved: false
    }], ['iframe', {
      reserved: false
    }], ['img', {
      reserved: false
    }], ['input', {
      reserved: false
    }], ['ins', {
      reserved: false
    }], ['kbd', {
      reserved: false
    }], ['keygen', {
      reserved: false
    }], ['label', {
      reserved: false
    }], ['legend', {
      reserved: false
    }], ['li', {
      reserved: false
    }], ['link', {
      reserved: true
    }], ['main', {
      reserved: false
    }], ['map', {
      reserved: false
    }], ['mark', {
      reserved: false
    }], ['marquee', {
      reserved: false
    }], ['menu', {
      reserved: false
    }], ['menuitem', {
      reserved: false
    }], ['meta', {
      reserved: true
    }], ['meter', {
      reserved: false
    }], ['nav', {
      reserved: false
    }], ['noembed', {
      reserved: true
    }], ['noscript', {
      reserved: true
    }], ['object', {
      reserved: false
    }], ['ol', {
      reserved: false
    }], ['optgroup', {
      reserved: false
    }], ['option', {
      reserved: false
    }], ['output', {
      reserved: false
    }], ['p', {
      reserved: false
    }], ['param', {
      reserved: true
    }], ['picture', {
      reserved: true
    }], ['pre', {
      reserved: false
    }], ['progress', {
      reserved: false
    }], ['q', {
      reserved: false
    }], ['rp', {
      reserved: false
    }], ['rt', {
      reserved: false
    }], ['rtc', {
      reserved: false
    }], ['ruby', {
      reserved: false
    }], ['s', {
      reserved: false
    }], ['samp', {
      reserved: false
    }], ['script', {
      reserved: true
    }], ['section', {
      reserved: false
    }], ['select', {
      reserved: false
    }], ['small', {
      reserved: false
    }], ['source', {
      reserved: true
    }], ['spacer', {
      reserved: false
    }], ['span', {
      reserved: false
    }], ['strike', {
      reserved: false
    }], ['strong', {
      reserved: false
    }], ['style', {
      reserved: true
    }], ['sub', {
      reserved: false
    }], ['summary', {
      reserved: false
    }], ['sup', {
      reserved: false
    }], ['table', {
      reserved: false
    }], ['tbody', {
      reserved: false
    }], ['td', {
      reserved: false
    }], ['textarea', {
      reserved: false
    }], ['tfoot', {
      reserved: false
    }], ['th', {
      reserved: false
    }], ['thead', {
      reserved: false
    }], ['time', {
      reserved: false
    }], ['title', {
      reserved: true
    }], ['tr', {
      reserved: false
    }], ['track', {
      reserved: true
    }], ['tt', {
      reserved: false
    }], ['u', {
      reserved: false
    }], ['ul', {
      reserved: false
    }], ['var', {
      reserved: false
    }], ['video', {
      reserved: false
    }], ['wbr', {
      reserved: false
    }], ['xmp', {
      reserved: false
    }]]);
    exports.default = domMap;
  });
  unwrapExports(domMap_1);

  var commandRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {},
      relatedConcepts: [{
        module: 'HTML',
        concept: {
          name: 'menuitem'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'widget']]
    };
  });
  unwrapExports(commandRole_1);

  var compositeRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-activedescendant': null
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'widget']]
    };
  });
  unwrapExports(compositeRole_1);

  var inputRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {},
      relatedConcepts: [{
        module: 'XForms',
        concept: {
          name: 'input'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'widget']]
    };
  });
  unwrapExports(inputRole_1);

  var landmarkRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
  });
  unwrapExports(landmarkRole_1);

  var rangeRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-valuemax': null,
        'aria-valuemin': null,
        'aria-valuenow': null,
        'aria-valuetext': null
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'widget']]
    };
  });
  unwrapExports(rangeRole_1);

  var roletypeRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-atomic': null,
        'aria-busy': null,
        'aria-controls': null,
        'aria-current': null,
        'aria-describedby': null,
        'aria-details': null,
        'aria-disabled': null,
        'aria-dropeffect': null,
        'aria-errormessage': null,
        'aria-flowto': null,
        'aria-grabbed': null,
        'aria-haspopup': null,
        'aria-hidden': null,
        'aria-invalid': null,
        'aria-keyshortcuts': null,
        'aria-label': null,
        'aria-labelledby': null,
        'aria-live': null,
        'aria-owns': null,
        'aria-relevant': null,
        'aria-roledescription': null
      },
      relatedConcepts: [{
        module: 'XHTML',
        concept: {
          name: 'role'
        }
      }, {
        module: 'HTML',
        concept: {
          name: 'rel'
        }
      }, {
        module: 'Dublin Core',
        concept: {
          name: 'type'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: []
    };
  });
  unwrapExports(roletypeRole_1);

  var sectionRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: [],
      props: {
        'aria-expanded': null
      },
      relatedConcepts: [{
        module: 'DTB',
        concept: {
          name: 'frontmatter'
        }
      }, {
        module: 'DTB',
        concept: {
          name: 'level'
        }
      }, {
        module: 'SMIL',
        concept: {
          name: 'level'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure']]
    };
  });
  unwrapExports(sectionRole_1);

  var sectionheadRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author', 'contents'],
      props: {
        'aria-expanded': null
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure']]
    };
  });
  unwrapExports(sectionheadRole_1);

  var selectRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-orientation': null
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'widget', 'composite'], ['roletype', 'structure', 'section', 'group']]
    };
  });
  unwrapExports(selectRole_1);

  var structureRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype']]
    };
  });
  unwrapExports(structureRole_1);

  var widgetRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype']]
    };
  });
  unwrapExports(widgetRole_1);

  var windowRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: true,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-expanded': null,
        'aria-modal': null
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype']]
    };
  });
  unwrapExports(windowRole_1);

  var ariaAbstractRoles_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _commandRole2 = _interopRequireDefault(commandRole_1);

    var _compositeRole2 = _interopRequireDefault(compositeRole_1);

    var _inputRole2 = _interopRequireDefault(inputRole_1);

    var _landmarkRole2 = _interopRequireDefault(landmarkRole_1);

    var _rangeRole2 = _interopRequireDefault(rangeRole_1);

    var _roletypeRole2 = _interopRequireDefault(roletypeRole_1);

    var _sectionRole2 = _interopRequireDefault(sectionRole_1);

    var _sectionheadRole2 = _interopRequireDefault(sectionheadRole_1);

    var _selectRole2 = _interopRequireDefault(selectRole_1);

    var _structureRole2 = _interopRequireDefault(structureRole_1);

    var _widgetRole2 = _interopRequireDefault(widgetRole_1);

    var _windowRole2 = _interopRequireDefault(windowRole_1);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    var ariaAbstractRoles = new Map([['command', _commandRole2.default], ['composite', _compositeRole2.default], ['input', _inputRole2.default], ['landmark', _landmarkRole2.default], ['range', _rangeRole2.default], ['roletype', _roletypeRole2.default], ['section', _sectionRole2.default], ['sectionhead', _sectionheadRole2.default], ['select', _selectRole2.default], ['structure', _structureRole2.default], ['widget', _widgetRole2.default], ['window', _windowRole2.default]]);
    exports.default = ariaAbstractRoles;
  });
  unwrapExports(ariaAbstractRoles_1);

  var alertRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-atomic': 'true',
        'aria-live': 'assertive'
      },
      relatedConcepts: [{
        module: 'XForms',
        concept: {
          name: 'alert'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
  });
  unwrapExports(alertRole_1);

  var alertdialogRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {},
      relatedConcepts: [{
        module: 'XForms',
        concept: {
          name: 'alert'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'alert'], ['roletype', 'window', 'dialog']]
    };
  });
  unwrapExports(alertdialogRole_1);

  var applicationRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [{
        concept: {
          name: 'Device Independence Delivery Unit'
        }
      }],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-activedescendant': null
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure']]
    };
  });
  unwrapExports(applicationRole_1);

  var articleRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-posinset': null,
        'aria-setsize': null
      },
      relatedConcepts: [{
        module: 'HTML',
        concept: {
          name: 'article'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'document']]
    };
  });
  unwrapExports(articleRole_1);

  var bannerRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
  });
  unwrapExports(bannerRole_1);

  var buttonRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [{
        module: 'HTML',
        concept: {
          name: 'button'
        }
      }],
      childrenPresentational: true,
      nameFrom: ['author', 'contents'],
      props: {
        'aria-expanded': null,
        'aria-pressed': null
      },
      relatedConcepts: [{
        module: 'ARIA',
        concept: {
          name: 'link'
        }
      }, {
        module: 'XForms',
        concept: {
          name: 'trigger'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'widget', 'command']]
    };
  });
  unwrapExports(buttonRole_1);

  var cellRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [{
        module: 'HTML',
        concept: {
          name: 'td'
        }
      }],
      childrenPresentational: false,
      nameFrom: ['author', 'contents'],
      props: {
        'aria-colindex': null,
        'aria-colspan': null,
        'aria-rowindex': null,
        'aria-rowspan': null
      },
      relatedConcepts: [],
      requireContextRole: ['row'],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
  });
  unwrapExports(cellRole_1);

  var checkboxRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ['author', 'contents'],
      props: {
        'aria-checked': 'false',
        'aria-readonly': null
      },
      relatedConcepts: [{
        module: 'ARIA',
        concept: {
          name: 'option'
        }
      }, {
        module: 'HTML',
        concept: {
          name: 'input',
          attributes: [{
            name: 'type',
            value: 'checkbox'
          }]
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {
        'aria-checked': null
      },
      superClass: [['roletype', 'widget', 'input']]
    };
  });
  unwrapExports(checkboxRole_1);

  var columnheaderRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [{
        module: 'HTML',
        concept: {
          name: 'th'
        }
      }],
      childrenPresentational: false,
      nameFrom: ['author', 'contents'],
      props: {
        'aria-sort': null
      },
      relatedConcepts: [],
      requireContextRole: ['row'],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'cell'], ['roletype', 'structure', 'section', 'cell', 'gridcell'], ['roletype', 'widget', 'gridcell'], ['roletype', 'structure', 'sectionhead']]
    };
  });
  unwrapExports(columnheaderRole_1);

  var comboboxRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-expanded': 'false',
        'aria-autocomplete': null,
        'aria-required': null,
        'aria-haspopup': 'listbox',
        'aria-readonly': null
      },
      relatedConcepts: [{
        module: 'XForms',
        concept: {
          name: 'select'
        }
      }, {
        module: 'HTML',
        concept: {
          name: 'select'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [['textbox'], ['listbox'], ['tree'], ['grid'], ['dialog']],
      requiredProps: {
        'aria-controls': null,
        'aria-expanded': 'false'
      },
      superClass: [['roletype', 'widget', 'composite', 'select'], ['roletype', 'structure', 'section', 'group', 'select']]
    };
  });
  unwrapExports(comboboxRole_1);

  var complementaryRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
  });
  unwrapExports(complementaryRole_1);

  var contentinfoRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
  });
  unwrapExports(contentinfoRole_1);

  var definitionRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {},
      relatedConcepts: [{
        module: 'HTML',
        concept: {
          name: 'dd'
        }
      }, {
        module: 'HTML',
        concept: {
          name: 'dfn'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
  });
  unwrapExports(definitionRole_1);

  var dialogRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'window']]
    };
  });
  unwrapExports(dialogRole_1);

  var directoryRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {},
      relatedConcepts: [{
        module: 'DAISY Guide'
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'list']]
    };
  });
  unwrapExports(directoryRole_1);

  var documentRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-expanded': null
      },
      relatedConcepts: [{
        concept: {
          name: 'Device Independence Delivery Unit'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure']]
    };
  });
  unwrapExports(documentRole_1);

  var feedRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredOwnedElements: [['article']],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'list']]
    };
  });
  unwrapExports(feedRole_1);

  var figureRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {},
      relatedConcepts: [{
        module: 'HTML',
        concept: {
          name: 'figure'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
  });
  unwrapExports(figureRole_1);

  var formRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {},
      relatedConcepts: [{
        module: 'HTML',
        concept: {
          name: 'form'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
  });
  unwrapExports(formRole_1);

  var gridRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [{
        module: 'HTML',
        concept: {
          name: 'table',
          attributes: [{
            name: 'role',
            value: 'grid'
          }]
        }
      }],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-level': null,
        'aria-multiselectable': null,
        'aria-readonly': null
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredOwnedElements: [['rowgroup', 'row'], ['row']],
      requiredProps: {},
      superClass: [['roletype', 'widget', 'composite'], ['roletype', 'structure', 'section', 'table']]
    };
  });
  unwrapExports(gridRole_1);

  var gridcellRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [{
        module: 'HTML',
        concept: {
          name: 'td',
          attributes: [{
            name: 'role',
            value: 'gridcell'
          }]
        }
      }],
      childrenPresentational: false,
      nameFrom: ['author', 'contents'],
      props: {
        'aria-readonly': null,
        'aria-required': null,
        'aria-selected': null
      },
      relatedConcepts: [],
      requireContextRole: ['row'],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'cell'], ['roletype', 'widget']]
    };
  });
  unwrapExports(gridcellRole_1);

  var groupRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-activedescendant': null
      },
      relatedConcepts: [{
        module: 'HTML',
        concept: {
          name: 'fieldset'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
  });
  unwrapExports(groupRole_1);

  var headingRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author', 'contents'],
      props: {
        'aria-level': '2'
      },
      relatedConcepts: [{
        module: 'HTML',
        concept: {
          name: 'h1'
        }
      }, {
        module: 'HTML',
        concept: {
          name: 'h2'
        }
      }, {
        module: 'HTML',
        concept: {
          name: 'h3'
        }
      }, {
        module: 'HTML',
        concept: {
          name: 'h4'
        }
      }, {
        module: 'HTML',
        concept: {
          name: 'h5'
        }
      }, {
        module: 'HTML',
        concept: {
          name: 'h6'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'sectionhead']]
    };
  });
  unwrapExports(headingRole_1);

  var imgRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ['author'],
      props: {},
      relatedConcepts: [{
        module: 'HTML',
        concept: {
          name: 'img'
        }
      }, {
        module: 'DTB',
        concept: {
          name: 'imggroup'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
  });
  unwrapExports(imgRole_1);

  var linkRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author', 'contents'],
      props: {
        'aria-expanded': null
      },
      relatedConcepts: [{
        module: 'HTML',
        concept: {
          name: 'a',
          attributes: [{
            name: 'href'
          }]
        }
      }, {
        module: 'HTML',
        concept: {
          name: 'area',
          attributes: [{
            name: 'href'
          }]
        }
      }, {
        module: 'HTML',
        concept: {
          name: 'link'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'widget', 'command']]
    };
  });
  unwrapExports(linkRole_1);

  var listRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [{
        module: 'HTML',
        concept: {
          name: 'ol'
        }
      }, {
        module: 'HTML',
        concept: {
          name: 'ul'
        }
      }],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredOwnedElements: [['group', 'listitem'], ['listitem']],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
  });
  unwrapExports(listRole_1);

  var listboxRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-multiselectable': null,
        'aria-readonly': null,
        'aria-required': null,
        'aria-orientation': 'vertical'
      },
      relatedConcepts: [{
        module: 'ARIA',
        concept: {
          name: 'list'
        }
      }, {
        module: 'HTML',
        concept: {
          name: 'select'
        }
      }, {
        module: 'XForms',
        concept: {
          name: 'select'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [['option']],
      requiredProps: {},
      superClass: [['roletype', 'widget', 'composite', 'select'], ['roletype', 'structure', 'section', 'group', 'select']]
    };
  });
  unwrapExports(listboxRole_1);

  var listitemRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [{
        module: 'HTML',
        concept: {
          name: 'li'
        }
      }],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-level': null,
        'aria-posinset': null,
        'aria-setsize': null
      },
      relatedConcepts: [{
        module: 'XForms',
        concept: {
          name: 'item'
        }
      }],
      requireContextRole: ['group', 'list'],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
  });
  unwrapExports(listitemRole_1);

  var logRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-live': 'polite'
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
  });
  unwrapExports(logRole_1);

  var mainRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {},
      relatedConcepts: [{
        module: 'HTML',
        concept: {
          name: 'main'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
  });
  unwrapExports(mainRole_1);

  var marqueeRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
  });
  unwrapExports(marqueeRole_1);

  var mathRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ['author'],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
  });
  unwrapExports(mathRole_1);

  var menuRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-orientation': 'vertical'
      },
      relatedConcepts: [{
        module: 'ARIA',
        concept: {
          name: 'list'
        }
      }, {
        module: 'DTB',
        concept: {
          name: 'sidebar'
        }
      }, {
        module: 'XForms',
        concept: {
          name: 'select'
        }
      }, {
        module: 'JAPI',
        concept: {
          name: 'MENU'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [['group', 'menuitemradio'], ['menuitem'], ['menuitemcheckbox'], ['menuitemradio']],
      requiredProps: {},
      superClass: [['roletype', 'widget', 'composite', 'select'], ['roletype', 'structure', 'section', 'group', 'select']]
    };
  });
  unwrapExports(menuRole_1);

  var menubarRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-orientation': 'vertical'
      },
      relatedConcepts: [{
        module: 'ARIA',
        concept: {
          name: 'toolbar'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [['group', 'menuitemradio'], ['menuitem'], ['menuitemcheckbox'], ['menuitemradio']],
      requiredProps: {},
      superClass: [['roletype', 'widget', 'composite', 'select', 'menu'], ['roletype', 'structure', 'section', 'group', 'select', 'menu']]
    };
  });
  unwrapExports(menubarRole_1);

  var menuitemRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author', 'contents'],
      props: {
        'aria-posinset': null,
        'aria-setsize': null
      },
      relatedConcepts: [{
        module: 'ARIA',
        concept: {
          name: 'option'
        }
      }, {
        module: 'ARIA',
        concept: {
          name: 'listitem'
        }
      }, {
        module: 'HTML',
        concept: {
          name: 'menuitem'
        }
      }, {
        module: 'JAPI',
        concept: {
          name: 'MENU_ITEM'
        }
      }],
      requireContextRole: ['group', 'menu', 'menubar'],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'widget', 'command']]
    };
  });
  unwrapExports(menuitemRole_1);

  var menuitemcheckboxRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ['author', 'contents'],
      props: {
        'aria-checked': 'false'
      },
      relatedConcepts: [{
        module: 'ARIA',
        concept: {
          name: 'menuitem'
        }
      }],
      requireContextRole: ['menu', 'menubar'],
      requiredOwnedElements: [],
      requiredProps: {
        'aria-checked': null
      },
      superClass: [['roletype', 'widget', 'command', 'menuitem'], ['roletype', 'widget', 'input', 'checkbox']]
    };
  });
  unwrapExports(menuitemcheckboxRole_1);

  var menuitemradioRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ['author', 'contents'],
      props: {
        'aria-checked': 'false'
      },
      relatedConcepts: [{
        module: 'ARIA',
        concept: {
          name: 'menuitem'
        }
      }],
      requireContextRole: ['group', 'menu', 'menubar'],
      requiredOwnedElements: [],
      requiredProps: {
        'aria-checked': null
      },
      superClass: [['roletype', 'widget', 'command', 'menuitem', 'menuitemcheckbox'], ['roletype', 'widget', 'input', 'checkbox', 'menuitemcheckbox'], ['roletype', 'widget', 'input', 'radio']]
    };
  });
  unwrapExports(menuitemradioRole_1);

  var navigationRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {},
      relatedConcepts: [{
        module: 'HTML',
        concept: {
          name: 'nav'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
  });
  unwrapExports(navigationRole_1);

  var noneRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: [],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: []
    };
  });
  unwrapExports(noneRole_1);

  var noteRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
  });
  unwrapExports(noteRole_1);

  var optionRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [{
        module: 'HTML',
        concept: {
          name: 'option'
        }
      }],
      childrenPresentational: true,
      nameFrom: ['author', 'contents'],
      props: {
        'aria-checked': null,
        'aria-posinset': null,
        'aria-selected': 'false',
        'aria-setsize': null
      },
      relatedConcepts: [{
        module: 'ARIA',
        concept: {
          name: 'listitem'
        }
      }, {
        module: 'XForms',
        concept: {
          name: 'item'
        }
      }],
      requireContextRole: ['listbox'],
      requiredOwnedElements: [],
      requiredProps: {
        'aria-selected': 'false'
      },
      superClass: [['roletype', 'widget', 'input']]
    };
  });
  unwrapExports(optionRole_1);

  var presentationRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure']]
    };
  });
  unwrapExports(presentationRole_1);

  var progressbarRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ['author'],
      props: {},
      relatedConcepts: [{
        module: 'ARIA',
        concept: {
          name: 'status'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'widget', 'range']]
    };
  });
  unwrapExports(progressbarRole_1);

  var radioRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ['author', 'contents'],
      props: {
        'aria-checked': 'false',
        'aria-posinset': null,
        'aria-selected': null,
        'aria-setsize': null
      },
      relatedConcepts: [{
        module: 'HTML',
        concept: {
          name: 'input',
          attributes: [{
            name: 'type',
            value: 'radio'
          }]
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {
        'aria-checked': 'false'
      },
      superClass: [['roletype', 'widget', 'input']]
    };
  });
  unwrapExports(radioRole_1);

  var radiogroupRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-readonly': null,
        'aria-required': null
      },
      relatedConcepts: [{
        module: 'ARIA',
        concept: {
          name: 'list'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [['radio']],
      requiredProps: {},
      superClass: [['roletype', 'widget', 'composite', 'select'], ['roletype', 'structure', 'section', 'group', 'select']]
    };
  });
  unwrapExports(radiogroupRole_1);

  var regionRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {},
      relatedConcepts: [// frame tag on html5 is deprecated
      {
        module: 'HTML',
        concept: {
          name: 'frame'
        }
      }, {
        module: 'HTML',
        concept: {
          name: 'section'
        }
      }, {
        concept: {
          name: 'Device Independence Glossart perceivable unit'
        }
      }, {
        module: 'ARIA',
        concept: {
          name: 'section'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
  });
  unwrapExports(regionRole_1);

  var rowRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [{
        module: 'HTML',
        concept: {
          name: 'tr'
        }
      }],
      childrenPresentational: false,
      nameFrom: ['author', 'contents'],
      props: {
        'aria-colindex': null,
        'aria-level': null,
        'aria-rowindex': null,
        'aria-selected': null
      },
      relatedConcepts: [],
      requireContextRole: ['grid', 'rowgroup', 'table', 'treegrid'],
      requiredOwnedElements: [['cell'], ['columnheader'], ['gridcell'], ['rowheader']],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'group'], ['roletype', 'widget']]
    };
  });
  unwrapExports(rowRole_1);

  var rowgroupRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [{
        module: 'HTML',
        concept: {
          name: 'tbody'
        }
      }, {
        module: 'HTML',
        concept: {
          name: 'tfoot'
        }
      }, {
        module: 'HTML',
        concept: {
          name: 'thead'
        }
      }],
      childrenPresentational: false,
      nameFrom: ['author', 'contents'],
      props: {
        'aria-activedescendant': null,
        'aria-expanded': null
      },
      relatedConcepts: [],
      requireContextRole: ['grid', 'table', 'treegrid'],
      requiredOwnedElements: [['row']],
      requiredProps: {},
      superClass: [['roletype', 'structure']]
    };
  });
  unwrapExports(rowgroupRole_1);

  var rowheaderRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [{
        module: 'HTML',
        concept: {
          name: 'th',
          attributes: [{
            name: 'scope',
            value: 'row'
          }]
        }
      }],
      childrenPresentational: false,
      nameFrom: ['author', 'contents'],
      props: {
        'aria-sort': null
      },
      relatedConcepts: [],
      requireContextRole: ['row'],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'cell'], ['roletype', 'structure', 'section', 'cell', 'gridcell'], ['roletype', 'widget', 'gridcell'], ['roletype', 'structure', 'sectionhead']]
    };
  });
  unwrapExports(rowheaderRole_1);

  var scrollbarRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ['author'],
      props: {
        'aria-controls': null,
        'aria-orientation': null,
        'aria-valuemax': null,
        'aria-valuemin': null,
        'aria-valuenow': null,
        'aria-atomic': null,
        'aria-busy': null,
        'aria-describedby': null,
        'aria-disabled': null,
        'aria-dropeffect': null,
        'aria-flowto': null,
        'aria-grabbed': null,
        'aria-haspopup': null,
        'aria-hidden': null,
        'aria-invalid': null,
        'aria-label': null,
        'aria-labelledby': null,
        'aria-live': null,
        'aria-owns': null,
        'aria-relevant': null,
        'aria-valuetext': null
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {
        'aria-controls': null,
        'aria-orientation': null,
        'aria-valuemax': null,
        'aria-valuemin': null,
        'aria-valuenow': null
      },
      superClass: []
    };
  });
  unwrapExports(scrollbarRole_1);

  var searchRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
  });
  unwrapExports(searchRole_1);

  var searchboxRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [{
        module: 'HTML',
        concept: {
          name: 'input',
          attributes: [{
            name: 'type',
            value: 'search'
          }]
        }
      }],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'widget', 'input', 'textbox']]
    };
  });
  unwrapExports(searchboxRole_1);

  var separatorRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ['author'],
      props: {
        'aria-expanded': null,
        'aria-orientation': 'horizontal'
      },
      relatedConcepts: [{
        module: 'HTML',
        concept: {
          name: 'hr'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure']]
    };
  });
  unwrapExports(separatorRole_1);

  var sliderRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ['author'],
      props: {
        'aria-orientation': 'horizontal',
        'aria-readonly': null,
        'aria-valuemax': '100',
        'aria-valuemin': '0',
        'aria-valuenow': '50'
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {
        'aria-valuemax': '100',
        'aria-valuemin': '0',
        'aria-valuenow': '50'
      },
      superClass: [['roletype', 'widget', 'input'], ['roletype', 'widget', 'range']]
    };
  });
  unwrapExports(sliderRole_1);

  var spinbuttonRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-valuenow': '0',
        'aria-required': null,
        'aria-readonly': null
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {
        'aria-valuemax': null,
        'aria-valuemin': null,
        'aria-valuenow': '0'
      },
      superClass: [['roletype', 'widget', 'composite'], ['roletype', 'widget', 'input'], ['roletype', 'widget', 'range']]
    };
  });
  unwrapExports(spinbuttonRole_1);

  var statusRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-atomic': 'true',
        'aria-live': 'polite'
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
  });
  unwrapExports(statusRole_1);

  var switchRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ['author', 'contents'],
      props: {
        'aria-checked': 'false'
      },
      relatedConcepts: [{
        module: 'ARIA',
        concept: {
          name: 'button'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {
        'aria-checked': 'false'
      },
      superClass: [['roletype', 'widget', 'input', 'checkbox']]
    };
  });
  unwrapExports(switchRole_1);

  var tabRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ['author', 'contents'],
      props: {
        'aria-posinset': null,
        'aria-selected': 'false',
        'aria-setsize': null
      },
      relatedConcepts: [],
      requireContextRole: ['tablist'],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'sectionhead'], ['roletype', 'widget']]
    };
  });
  unwrapExports(tabRole_1);

  var tableRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [{
        module: 'HTML',
        concept: {
          name: 'table'
        }
      }],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-colcount': null,
        'aria-rowcount': null
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredOwnedElements: [['row'], ['rowgroup', 'row']],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
  });
  unwrapExports(tableRole_1);

  var tablistRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-level': null,
        'aria-multiselectable': null,
        'aria-orientation': 'horizontal',
        'aria-expanded': null
      },
      relatedConcepts: [{
        module: 'DAISY',
        concept: {
          name: 'guide'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [['tab']],
      requiredProps: {},
      superClass: [['roletype', 'widget', 'composite']]
    };
  });
  unwrapExports(tablistRole_1);

  var tabpanelRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
  });
  unwrapExports(tabpanelRole_1);

  var termRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {},
      relatedConcepts: [{
        module: 'HTML',
        concept: {
          name: 'dt'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
  });
  unwrapExports(termRole_1);

  var textboxRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-activedescendant': null,
        'aria-autocomplete': null,
        'aria-multiline': null,
        'aria-placeholder': null,
        'aria-readonly': null,
        'aria-required': null
      },
      relatedConcepts: [{
        module: 'XForms',
        concept: {
          name: 'input'
        }
      }, {
        module: 'HTML',
        concept: {
          name: 'textarea'
        }
      }, {
        module: 'HTML',
        concept: {
          name: 'input'
        }
      }, {
        module: 'HTML',
        concept: {
          name: 'input',
          attributes: [{
            name: 'type',
            value: 'text'
          }]
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'widget', 'input']]
    };
  });
  unwrapExports(textboxRole_1);

  var timerRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'status']]
    };
  });
  unwrapExports(timerRole_1);

  var toolbarRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-orientation': 'horizontal'
      },
      relatedConcepts: [{
        module: 'ARIA',
        concept: {
          name: 'menubar'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'group']]
    };
  });
  unwrapExports(toolbarRole_1);

  var tooltipRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author', 'contents'],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
  });
  unwrapExports(tooltipRole_1);

  var treeRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-multiselectable': null,
        'aria-required': null,
        'aria-orientation': 'vertical'
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredOwnedElements: [['group', 'treeitem'], ['treeitem']],
      requiredProps: {},
      superClass: [['roletype', 'widget', 'composite', 'select'], ['roletype', 'structure', 'section', 'group', 'select']]
    };
  });
  unwrapExports(treeRole_1);

  var treegridRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {},
      relatedConcepts: [],
      requireContextRole: [],
      requiredOwnedElements: [['rowgroup', 'row'], ['row']],
      requiredProps: {},
      superClass: [['roletype', 'widget', 'composite', 'grid'], ['roletype', 'structure', 'section', 'table', 'grid'], ['roletype', 'widget', 'composite', 'select', 'tree'], ['roletype', 'structure', 'section', 'group', 'select', 'tree']]
    };
  });
  unwrapExports(treegridRole_1);

  var treeitemRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author', 'contents'],
      props: {},
      relatedConcepts: [],
      requireContextRole: ['group', 'tree'],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'listitem'], ['roletype', 'widget', 'input', 'option']]
    };
  });
  unwrapExports(treeitemRole_1);

  var ariaLiteralRoles_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _alertRole2 = _interopRequireDefault(alertRole_1);

    var _alertdialogRole2 = _interopRequireDefault(alertdialogRole_1);

    var _applicationRole2 = _interopRequireDefault(applicationRole_1);

    var _articleRole2 = _interopRequireDefault(articleRole_1);

    var _bannerRole2 = _interopRequireDefault(bannerRole_1);

    var _buttonRole2 = _interopRequireDefault(buttonRole_1);

    var _cellRole2 = _interopRequireDefault(cellRole_1);

    var _checkboxRole2 = _interopRequireDefault(checkboxRole_1);

    var _columnheaderRole2 = _interopRequireDefault(columnheaderRole_1);

    var _comboboxRole2 = _interopRequireDefault(comboboxRole_1);

    var _complementaryRole2 = _interopRequireDefault(complementaryRole_1);

    var _contentinfoRole2 = _interopRequireDefault(contentinfoRole_1);

    var _definitionRole2 = _interopRequireDefault(definitionRole_1);

    var _dialogRole2 = _interopRequireDefault(dialogRole_1);

    var _directoryRole2 = _interopRequireDefault(directoryRole_1);

    var _documentRole2 = _interopRequireDefault(documentRole_1);

    var _feedRole2 = _interopRequireDefault(feedRole_1);

    var _figureRole2 = _interopRequireDefault(figureRole_1);

    var _formRole2 = _interopRequireDefault(formRole_1);

    var _gridRole2 = _interopRequireDefault(gridRole_1);

    var _gridcellRole2 = _interopRequireDefault(gridcellRole_1);

    var _groupRole2 = _interopRequireDefault(groupRole_1);

    var _headingRole2 = _interopRequireDefault(headingRole_1);

    var _imgRole2 = _interopRequireDefault(imgRole_1);

    var _linkRole2 = _interopRequireDefault(linkRole_1);

    var _listRole2 = _interopRequireDefault(listRole_1);

    var _listboxRole2 = _interopRequireDefault(listboxRole_1);

    var _listitemRole2 = _interopRequireDefault(listitemRole_1);

    var _logRole2 = _interopRequireDefault(logRole_1);

    var _mainRole2 = _interopRequireDefault(mainRole_1);

    var _marqueeRole2 = _interopRequireDefault(marqueeRole_1);

    var _mathRole2 = _interopRequireDefault(mathRole_1);

    var _menuRole2 = _interopRequireDefault(menuRole_1);

    var _menubarRole2 = _interopRequireDefault(menubarRole_1);

    var _menuitemRole2 = _interopRequireDefault(menuitemRole_1);

    var _menuitemcheckboxRole2 = _interopRequireDefault(menuitemcheckboxRole_1);

    var _menuitemradioRole2 = _interopRequireDefault(menuitemradioRole_1);

    var _navigationRole2 = _interopRequireDefault(navigationRole_1);

    var _noneRole2 = _interopRequireDefault(noneRole_1);

    var _noteRole2 = _interopRequireDefault(noteRole_1);

    var _optionRole2 = _interopRequireDefault(optionRole_1);

    var _presentationRole2 = _interopRequireDefault(presentationRole_1);

    var _progressbarRole2 = _interopRequireDefault(progressbarRole_1);

    var _radioRole2 = _interopRequireDefault(radioRole_1);

    var _radiogroupRole2 = _interopRequireDefault(radiogroupRole_1);

    var _regionRole2 = _interopRequireDefault(regionRole_1);

    var _rowRole2 = _interopRequireDefault(rowRole_1);

    var _rowgroupRole2 = _interopRequireDefault(rowgroupRole_1);

    var _rowheaderRole2 = _interopRequireDefault(rowheaderRole_1);

    var _scrollbarRole2 = _interopRequireDefault(scrollbarRole_1);

    var _searchRole2 = _interopRequireDefault(searchRole_1);

    var _searchboxRole2 = _interopRequireDefault(searchboxRole_1);

    var _separatorRole2 = _interopRequireDefault(separatorRole_1);

    var _sliderRole2 = _interopRequireDefault(sliderRole_1);

    var _spinbuttonRole2 = _interopRequireDefault(spinbuttonRole_1);

    var _statusRole2 = _interopRequireDefault(statusRole_1);

    var _switchRole2 = _interopRequireDefault(switchRole_1);

    var _tabRole2 = _interopRequireDefault(tabRole_1);

    var _tableRole2 = _interopRequireDefault(tableRole_1);

    var _tablistRole2 = _interopRequireDefault(tablistRole_1);

    var _tabpanelRole2 = _interopRequireDefault(tabpanelRole_1);

    var _termRole2 = _interopRequireDefault(termRole_1);

    var _textboxRole2 = _interopRequireDefault(textboxRole_1);

    var _timerRole2 = _interopRequireDefault(timerRole_1);

    var _toolbarRole2 = _interopRequireDefault(toolbarRole_1);

    var _tooltipRole2 = _interopRequireDefault(tooltipRole_1);

    var _treeRole2 = _interopRequireDefault(treeRole_1);

    var _treegridRole2 = _interopRequireDefault(treegridRole_1);

    var _treeitemRole2 = _interopRequireDefault(treeitemRole_1);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    var ariaLiteralRoles = new Map([['alert', _alertRole2.default], ['alertdialog', _alertdialogRole2.default], ['application', _applicationRole2.default], ['article', _articleRole2.default], ['banner', _bannerRole2.default], ['button', _buttonRole2.default], ['cell', _cellRole2.default], ['checkbox', _checkboxRole2.default], ['columnheader', _columnheaderRole2.default], ['combobox', _comboboxRole2.default], ['complementary', _complementaryRole2.default], ['contentinfo', _contentinfoRole2.default], ['definition', _definitionRole2.default], ['dialog', _dialogRole2.default], ['directory', _directoryRole2.default], ['document', _documentRole2.default], ['feed', _feedRole2.default], ['figure', _figureRole2.default], ['form', _formRole2.default], ['grid', _gridRole2.default], ['gridcell', _gridcellRole2.default], ['group', _groupRole2.default], ['heading', _headingRole2.default], ['img', _imgRole2.default], ['link', _linkRole2.default], ['list', _listRole2.default], ['listbox', _listboxRole2.default], ['listitem', _listitemRole2.default], ['log', _logRole2.default], ['main', _mainRole2.default], ['marquee', _marqueeRole2.default], ['math', _mathRole2.default], ['menu', _menuRole2.default], ['menubar', _menubarRole2.default], ['menuitem', _menuitemRole2.default], ['menuitemcheckbox', _menuitemcheckboxRole2.default], ['menuitemradio', _menuitemradioRole2.default], ['navigation', _navigationRole2.default], ['none', _noneRole2.default], ['note', _noteRole2.default], ['option', _optionRole2.default], ['presentation', _presentationRole2.default], ['progressbar', _progressbarRole2.default], ['radio', _radioRole2.default], ['radiogroup', _radiogroupRole2.default], ['region', _regionRole2.default], ['row', _rowRole2.default], ['rowgroup', _rowgroupRole2.default], ['rowheader', _rowheaderRole2.default], ['scrollbar', _scrollbarRole2.default], ['search', _searchRole2.default], ['searchbox', _searchboxRole2.default], ['separator', _separatorRole2.default], ['slider', _sliderRole2.default], ['spinbutton', _spinbuttonRole2.default], ['status', _statusRole2.default], ['switch', _switchRole2.default], ['tab', _tabRole2.default], ['table', _tableRole2.default], ['tablist', _tablistRole2.default], ['tabpanel', _tabpanelRole2.default], ['term', _termRole2.default], ['textbox', _textboxRole2.default], ['timer', _timerRole2.default], ['toolbar', _toolbarRole2.default], ['tooltip', _tooltipRole2.default], ['tree', _treeRole2.default], ['treegrid', _treegridRole2.default], ['treeitem', _treeitemRole2.default]]);
    exports.default = ariaLiteralRoles;
  });
  unwrapExports(ariaLiteralRoles_1);

  var docAbstractRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-describedat': null
      },
      relatedConcepts: [{
        module: 'EPUB',
        concept: {
          name: 'abstract [EPUB-SSV]'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
  });
  unwrapExports(docAbstractRole_1);

  var docAcknowledgmentsRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-describedat': null
      },
      relatedConcepts: [{
        module: 'EPUB',
        concept: {
          name: 'acknowledgments [EPUB-SSV]'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
  });
  unwrapExports(docAcknowledgmentsRole_1);

  var docAfterwordRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-describedat': null
      },
      relatedConcepts: [{
        module: 'EPUB',
        concept: {
          name: 'afterword [EPUB-SSV]'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
  });
  unwrapExports(docAfterwordRole_1);

  var docAppendixRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-describedat': null
      },
      relatedConcepts: [{
        module: 'EPUB',
        concept: {
          name: 'appendix [EPUB-SSV]'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
  });
  unwrapExports(docAppendixRole_1);

  var docBacklinkRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author', 'content'],
      props: {
        'aria-describedat': null
      },
      relatedConcepts: [{
        module: 'EPUB',
        concept: {
          name: 'referrer [EPUB-SSV]'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'widget', 'command', 'link']]
    };
  });
  unwrapExports(docBacklinkRole_1);

  var docBiblioentryRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-describedat': null
      },
      relatedConcepts: [{
        module: 'EPUB',
        concept: {
          name: 'EPUB biblioentry [EPUB-SSV]'
        }
      }],
      requireContextRole: ['doc-bibliography'],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'listitem']]
    };
  });
  unwrapExports(docBiblioentryRole_1);

  var docBibliographyRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-describedat': null
      },
      relatedConcepts: [{
        module: 'EPUB',
        concept: {
          name: 'bibliography [EPUB-SSV]'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [['doc-biblioentry']],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
  });
  unwrapExports(docBibliographyRole_1);

  var docBibliorefRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author', 'contents'],
      props: {
        'aria-describedat': null
      },
      relatedConcepts: [{
        module: 'EPUB',
        concept: {
          name: 'biblioref [EPUB-SSV]'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'widget', 'command', 'link']]
    };
  });
  unwrapExports(docBibliorefRole_1);

  var docChapterRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-describedat': null
      },
      relatedConcepts: [{
        module: 'EPUB',
        concept: {
          name: 'chapter [EPUB-SSV]'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
  });
  unwrapExports(docChapterRole_1);

  var docColophonRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-describedat': null
      },
      relatedConcepts: [{
        module: 'EPUB',
        concept: {
          name: 'colophon [EPUB-SSV]'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
  });
  unwrapExports(docColophonRole_1);

  var docConclusionRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-describedat': null
      },
      relatedConcepts: [{
        module: 'EPUB',
        concept: {
          name: 'conclusion [EPUB-SSV]'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
  });
  unwrapExports(docConclusionRole_1);

  var docCoverRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-describedat': null
      },
      relatedConcepts: [{
        module: 'EPUB',
        concept: {
          name: 'cover [EPUB-SSV]'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'img']]
    };
  });
  unwrapExports(docCoverRole_1);

  var docCreditRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-describedat': null
      },
      relatedConcepts: [{
        module: 'EPUB',
        concept: {
          name: 'credit [EPUB-SSV]'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
  });
  unwrapExports(docCreditRole_1);

  var docCreditsRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-describedat': null
      },
      relatedConcepts: [{
        module: 'EPUB',
        concept: {
          name: 'credits [EPUB-SSV]'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
  });
  unwrapExports(docCreditsRole_1);

  var docDedicationRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-describedat': null
      },
      relatedConcepts: [{
        module: 'EPUB',
        concept: {
          name: 'dedication [EPUB-SSV]'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
  });
  unwrapExports(docDedicationRole_1);

  var docEndnoteRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-describedat': null
      },
      relatedConcepts: [{
        module: 'EPUB',
        concept: {
          name: 'rearnote [EPUB-SSV]'
        }
      }],
      requireContextRole: ['doc-endnotes'],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'listitem']]
    };
  });
  unwrapExports(docEndnoteRole_1);

  var docEndnotesRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-describedat': null
      },
      relatedConcepts: [{
        module: 'EPUB',
        concept: {
          name: 'rearnotes [EPUB-SSV]'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [['doc-endnote']],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
  });
  unwrapExports(docEndnotesRole_1);

  var docEpigraphRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-describedat': null
      },
      relatedConcepts: [{
        module: 'EPUB',
        concept: {
          name: 'epigraph [EPUB-SSV]'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
  });
  unwrapExports(docEpigraphRole_1);

  var docEpilogueRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-describedat': null
      },
      relatedConcepts: [{
        module: 'EPUB',
        concept: {
          name: 'epilogue [EPUB-SSV]'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
  });
  unwrapExports(docEpilogueRole_1);

  var docErrataRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-describedat': null
      },
      relatedConcepts: [{
        module: 'EPUB',
        concept: {
          name: 'errata [EPUB-SSV]'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
  });
  unwrapExports(docErrataRole_1);

  var docExampleRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-describedat': null
      },
      relatedConcepts: [],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
  });
  unwrapExports(docExampleRole_1);

  var docFootnoteRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-describedat': null
      },
      relatedConcepts: [{
        module: 'EPUB',
        concept: {
          name: 'footnote [EPUB-SSV]'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
  });
  unwrapExports(docFootnoteRole_1);

  var docForewordRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-describedat': null
      },
      relatedConcepts: [{
        module: 'EPUB',
        concept: {
          name: 'foreword [EPUB-SSV]'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
  });
  unwrapExports(docForewordRole_1);

  var docGlossaryRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-describedat': null
      },
      relatedConcepts: [{
        module: 'EPUB',
        concept: {
          name: 'glossary [EPUB-SSV]'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [['term'], ['definition']],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
  });
  unwrapExports(docGlossaryRole_1);

  var docGlossrefRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author', 'contents'],
      props: {
        'aria-describedat': null
      },
      relatedConcepts: [{
        module: 'EPUB',
        concept: {
          name: 'glossref [EPUB-SSV]'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'widget', 'command', 'link']]
    };
  });
  unwrapExports(docGlossrefRole_1);

  var docIndexRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-describedat': null
      },
      relatedConcepts: [{
        module: 'EPUB',
        concept: {
          name: 'index [EPUB-SSV]'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark', 'navigation']]
    };
  });
  unwrapExports(docIndexRole_1);

  var docIntroductionRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-describedat': null
      },
      relatedConcepts: [{
        module: 'EPUB',
        concept: {
          name: 'introduction [EPUB-SSV]'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
  });
  unwrapExports(docIntroductionRole_1);

  var docNoterefRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author', 'contents'],
      props: {
        'aria-describedat': null
      },
      relatedConcepts: [{
        module: 'EPUB',
        concept: {
          name: 'noteref [EPUB-SSV]'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'widget', 'command', 'link']]
    };
  });
  unwrapExports(docNoterefRole_1);

  var docNoticeRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-describedat': null
      },
      relatedConcepts: [{
        module: 'EPUB',
        concept: {
          name: 'notice [EPUB-SSV]'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'note']]
    };
  });
  unwrapExports(docNoticeRole_1);

  var docPagebreakRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: true,
      nameFrom: ['author'],
      props: {
        'aria-describedat': null
      },
      relatedConcepts: [{
        module: 'EPUB',
        concept: {
          name: 'pagebreak [EPUB-SSV]'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'separator']]
    };
  });
  unwrapExports(docPagebreakRole_1);

  var docPagelistRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-describedat': null
      },
      relatedConcepts: [{
        module: 'EPUB',
        concept: {
          name: 'page-list [EPUB-SSV]'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark', 'navigation']]
    };
  });
  unwrapExports(docPagelistRole_1);

  var docPartRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: true,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-describedat': null
      },
      relatedConcepts: [{
        module: 'EPUB',
        concept: {
          name: 'part [EPUB-SSV]'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
  });
  unwrapExports(docPartRole_1);

  var docPrefaceRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-describedat': null
      },
      relatedConcepts: [{
        module: 'EPUB',
        concept: {
          name: 'preface [EPUB-SSV]'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
  });
  unwrapExports(docPrefaceRole_1);

  var docPrologueRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-describedat': null
      },
      relatedConcepts: [{
        module: 'EPUB',
        concept: {
          name: 'prologue [EPUB-SSV]'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark']]
    };
  });
  unwrapExports(docPrologueRole_1);

  var docPullquoteRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {},
      relatedConcepts: [{
        module: 'EPUB',
        concept: {
          name: 'pullquote [EPUB-SSV]'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['none']]
    };
  });
  unwrapExports(docPullquoteRole_1);

  var docQnaRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-describedat': null
      },
      relatedConcepts: [{
        module: 'EPUB',
        concept: {
          name: 'qna [EPUB-SSV]'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section']]
    };
  });
  unwrapExports(docQnaRole_1);

  var docSubtitleRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-describedat': null
      },
      relatedConcepts: [{
        module: 'EPUB',
        concept: {
          name: 'subtitle [EPUB-SSV]'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'sectionhead']]
    };
  });
  unwrapExports(docSubtitleRole_1);

  var docTipRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-describedat': null
      },
      relatedConcepts: [{
        module: 'EPUB',
        concept: {
          name: 'help [EPUB-SSV]'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'note']]
    };
  });
  unwrapExports(docTipRole_1);

  var docTocRole_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      abstract: false,
      accessibleNameRequired: false,
      baseConcepts: [],
      childrenPresentational: false,
      nameFrom: ['author'],
      props: {
        'aria-describedat': null
      },
      relatedConcepts: [{
        module: 'EPUB',
        concept: {
          name: 'toc [EPUB-SSV]'
        }
      }],
      requireContextRole: [],
      requiredOwnedElements: [],
      requiredProps: {},
      superClass: [['roletype', 'structure', 'section', 'landmark', 'navigation']]
    };
  });
  unwrapExports(docTocRole_1);

  var ariaDpubRoles_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _docAbstractRole2 = _interopRequireDefault(docAbstractRole_1);

    var _docAcknowledgmentsRole2 = _interopRequireDefault(docAcknowledgmentsRole_1);

    var _docAfterwordRole2 = _interopRequireDefault(docAfterwordRole_1);

    var _docAppendixRole2 = _interopRequireDefault(docAppendixRole_1);

    var _docBacklinkRole2 = _interopRequireDefault(docBacklinkRole_1);

    var _docBiblioentryRole2 = _interopRequireDefault(docBiblioentryRole_1);

    var _docBibliographyRole2 = _interopRequireDefault(docBibliographyRole_1);

    var _docBibliorefRole2 = _interopRequireDefault(docBibliorefRole_1);

    var _docChapterRole2 = _interopRequireDefault(docChapterRole_1);

    var _docColophonRole2 = _interopRequireDefault(docColophonRole_1);

    var _docConclusionRole2 = _interopRequireDefault(docConclusionRole_1);

    var _docCoverRole2 = _interopRequireDefault(docCoverRole_1);

    var _docCreditRole2 = _interopRequireDefault(docCreditRole_1);

    var _docCreditsRole2 = _interopRequireDefault(docCreditsRole_1);

    var _docDedicationRole2 = _interopRequireDefault(docDedicationRole_1);

    var _docEndnoteRole2 = _interopRequireDefault(docEndnoteRole_1);

    var _docEndnotesRole2 = _interopRequireDefault(docEndnotesRole_1);

    var _docEpigraphRole2 = _interopRequireDefault(docEpigraphRole_1);

    var _docEpilogueRole2 = _interopRequireDefault(docEpilogueRole_1);

    var _docErrataRole2 = _interopRequireDefault(docErrataRole_1);

    var _docExampleRole2 = _interopRequireDefault(docExampleRole_1);

    var _docFootnoteRole2 = _interopRequireDefault(docFootnoteRole_1);

    var _docForewordRole2 = _interopRequireDefault(docForewordRole_1);

    var _docGlossaryRole2 = _interopRequireDefault(docGlossaryRole_1);

    var _docGlossrefRole2 = _interopRequireDefault(docGlossrefRole_1);

    var _docIndexRole2 = _interopRequireDefault(docIndexRole_1);

    var _docIntroductionRole2 = _interopRequireDefault(docIntroductionRole_1);

    var _docNoterefRole2 = _interopRequireDefault(docNoterefRole_1);

    var _docNoticeRole2 = _interopRequireDefault(docNoticeRole_1);

    var _docPagebreakRole2 = _interopRequireDefault(docPagebreakRole_1);

    var _docPagelistRole2 = _interopRequireDefault(docPagelistRole_1);

    var _docPartRole2 = _interopRequireDefault(docPartRole_1);

    var _docPrefaceRole2 = _interopRequireDefault(docPrefaceRole_1);

    var _docPrologueRole2 = _interopRequireDefault(docPrologueRole_1);

    var _docPullquoteRole2 = _interopRequireDefault(docPullquoteRole_1);

    var _docQnaRole2 = _interopRequireDefault(docQnaRole_1);

    var _docSubtitleRole2 = _interopRequireDefault(docSubtitleRole_1);

    var _docTipRole2 = _interopRequireDefault(docTipRole_1);

    var _docTocRole2 = _interopRequireDefault(docTocRole_1);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    var ariaDpubRoles = new Map([['doc-abstract', _docAbstractRole2.default], ['doc-acknowledgments', _docAcknowledgmentsRole2.default], ['doc-afterword', _docAfterwordRole2.default], ['doc-appendix', _docAppendixRole2.default], ['doc-backlink', _docBacklinkRole2.default], ['doc-biblioentry', _docBiblioentryRole2.default], ['doc-bibliography', _docBibliographyRole2.default], ['doc-biblioref', _docBibliorefRole2.default], ['doc-chapter', _docChapterRole2.default], ['doc-colophon', _docColophonRole2.default], ['doc-conclusion', _docConclusionRole2.default], ['doc-cover', _docCoverRole2.default], ['doc-credit', _docCreditRole2.default], ['doc-credits', _docCreditsRole2.default], ['doc-dedication', _docDedicationRole2.default], ['doc-endnote', _docEndnoteRole2.default], ['doc-endnotes', _docEndnotesRole2.default], ['doc-epigraph', _docEpigraphRole2.default], ['doc-epilogue', _docEpilogueRole2.default], ['doc-errata', _docErrataRole2.default], ['doc-example', _docExampleRole2.default], ['doc-footnote', _docFootnoteRole2.default], ['doc-foreword', _docForewordRole2.default], ['doc-glossary', _docGlossaryRole2.default], ['doc-glossref', _docGlossrefRole2.default], ['doc-index', _docIndexRole2.default], ['doc-introduction', _docIntroductionRole2.default], ['doc-noteref', _docNoterefRole2.default], ['doc-notice', _docNoticeRole2.default], ['doc-pagebreak', _docPagebreakRole2.default], ['doc-pagelist', _docPagelistRole2.default], ['doc-part', _docPartRole2.default], ['doc-preface', _docPrefaceRole2.default], ['doc-prologue', _docPrologueRole2.default], ['doc-pullquote', _docPullquoteRole2.default], ['doc-qna', _docQnaRole2.default], ['doc-subtitle', _docSubtitleRole2.default], ['doc-tip', _docTipRole2.default], ['doc-toc', _docTocRole2.default]]);
    exports.default = ariaDpubRoles;
  });
  unwrapExports(ariaDpubRoles_1);

  var rolesMap_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _ariaAbstractRoles2 = _interopRequireDefault(ariaAbstractRoles_1);

    var _ariaLiteralRoles2 = _interopRequireDefault(ariaLiteralRoles_1);

    var _ariaDpubRoles2 = _interopRequireDefault(ariaDpubRoles_1);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
    }

    var rolesMap = new Map([]);
    [_ariaAbstractRoles2.default, _ariaLiteralRoles2.default, _ariaDpubRoles2.default].forEach(function (roleSet) {
      roleSet.forEach(function (roleDefinition, name) {
        return rolesMap.set(name, roleDefinition);
      });
    });
    rolesMap.forEach(function (roleDefinition) {
      // Conglomerate the properties
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = roleDefinition.superClass[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var superClassIter = _step.value;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = superClassIter[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var superClassName = _step2.value;
              var superClassDefinition = rolesMap.get(superClassName);

              if (superClassDefinition) {
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                  for (var _iterator3 = Object.keys(superClassDefinition.props)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var prop = _step3.value;

                    if (!Object.prototype.hasOwnProperty.call(roleDefinition.props, prop)) {
                      Object.assign(roleDefinition.props, _defineProperty({}, prop, superClassDefinition.props[prop]));
                    }
                  }
                } catch (err) {
                  _didIteratorError3 = true;
                  _iteratorError3 = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                      _iterator3.return();
                    }
                  } finally {
                    if (_didIteratorError3) {
                      throw _iteratorError3;
                    }
                  }
                }
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    });
    exports.default = rolesMap;
  });
  unwrapExports(rolesMap_1);

  var elementRoleMap_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _slicedToArray = function () {
      function sliceIterator(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = undefined;

        try {
          for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);

            if (i && _arr.length === i) break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"]) _i["return"]();
          } finally {
            if (_d) throw _e;
          }
        }

        return _arr;
      }

      return function (arr, i) {
        if (Array.isArray(arr)) {
          return arr;
        } else if (Symbol.iterator in Object(arr)) {
          return sliceIterator(arr, i);
        } else {
          throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }
      };
    }();

    var _rolesMap2 = function (obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }(rolesMap_1);

    function _toConsumableArray(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
          arr2[i] = arr[i];
        }

        return arr2;
      } else {
        return Array.from(arr);
      }
    }

    var elementRoleMap = new Map([]);
    [].concat(_toConsumableArray(_rolesMap2.default.keys())).forEach(function (key) {
      var role = _rolesMap2.default.get(key);

      if (role) {
        [].concat(_toConsumableArray(role.baseConcepts), _toConsumableArray(role.relatedConcepts)).forEach(function (relation) {
          if (relation.module === 'HTML') {
            var concept = relation.concept;

            if (concept) {
              var conceptStr = JSON.stringify(concept);
              var roles = ([].concat(_toConsumableArray(elementRoleMap.entries())).find(function (_ref) {
                var _ref2 = _slicedToArray(_ref, 2),
                    key = _ref2[0],
                    value = _ref2[1];

                return JSON.stringify(key) === conceptStr;
              }) || [])[1];

              if (!roles) {
                roles = new Set([]);
              }

              roles.add(key);
              elementRoleMap.set(concept, roles);
            }
          }
        });
      }
    });
    exports.default = elementRoleMap;
  });
  unwrapExports(elementRoleMap_1);

  var roleElementMap_1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _rolesMap2 = function (obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }(rolesMap_1);

    function _toConsumableArray(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
          arr2[i] = arr[i];
        }

        return arr2;
      } else {
        return Array.from(arr);
      }
    }

    var roleElementMap = new Map([]);
    [].concat(_toConsumableArray(_rolesMap2.default.keys())).forEach(function (key) {
      var role = _rolesMap2.default.get(key);

      if (role) {
        [].concat(_toConsumableArray(role.baseConcepts), _toConsumableArray(role.relatedConcepts)).forEach(function (relation) {
          if (relation.module === 'HTML') {
            var concept = relation.concept;

            if (concept) {
              var relationConcepts = roleElementMap.get(key) || new Set([]);
              relationConcepts.add(concept);
              roleElementMap.set(key, relationConcepts);
            }
          }
        });
      }
    });
    exports.default = roleElementMap;
  });
  unwrapExports(roleElementMap_1);

  var lib = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.roleElements = exports.elementRoles = exports.roles = exports.dom = exports.aria = undefined;

    var _ariaPropsMap2 = _interopRequireDefault(ariaPropsMap_1);

    var _domMap2 = _interopRequireDefault(domMap_1);

    var _rolesMap2 = _interopRequireDefault(rolesMap_1);

    var _elementRoleMap2 = _interopRequireDefault(elementRoleMap_1);

    var _roleElementMap2 = _interopRequireDefault(roleElementMap_1);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    exports.aria = _ariaPropsMap2.default;
    exports.dom = _domMap2.default;
    exports.roles = _rolesMap2.default;
    exports.elementRoles = _elementRoleMap2.default;
    exports.roleElements = _roleElementMap2.default;
  });
  unwrapExports(lib);
  var lib_1 = lib.roleElements;
  var lib_2 = lib.elementRoles;
  var lib_3 = lib.roles;
  var lib_4 = lib.dom;
  var lib_5 = lib.aria;

  var helpers = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports.getSetTimeoutFn = function () {
      return runWithRealTimers(function () {
        return globalObj.setTimeout;
      });
    };
    /* eslint-disable import/prefer-default-export */

    /* eslint-env jest */
    // Used to avoid using Jest's fake timers and Date.now mocks
    // See https://github.com/TheBrainFamily/wait-for-expect/issues/4 and
    // https://github.com/TheBrainFamily/wait-for-expect/issues/12 for more info


    var globalObj = typeof window === "undefined" ? commonjsGlobal : window; // Currently this fn only supports jest timers, but it could support other test runners in the future.

    function runWithRealTimers(callback) {
      var usingJestFakeTimers = // eslint-disable-next-line no-underscore-dangle
      globalObj.setTimeout._isMockFunction && typeof jest !== "undefined";

      if (usingJestFakeTimers) {
        jest.useRealTimers();
      }

      var callbackReturnValue = callback();

      if (usingJestFakeTimers) {
        jest.useFakeTimers();
      }

      return callbackReturnValue;
    }
  });
  unwrapExports(helpers);
  var helpers_1 = helpers.getSetTimeoutFn;

  var lib$1 = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var defaults = {
      timeout: 4500,
      interval: 50
    };
    /**
     * Waits for the expectation to pass and returns a Promise
     *
     * @param  expectation  Function  Expectation that has to complete without throwing
     * @param  timeout  Number  Maximum wait interval, 4500ms by default
     * @param  interval  Number  Wait-between-retries interval, 50ms by default
     * @return  Promise  Promise to return a callback result
     */

    var waitForExpect = function (expectation) {
      var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaults.timeout;
      var interval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaults.interval;
      var setTimeout = (0, helpers.getSetTimeoutFn)(); // eslint-disable-next-line no-param-reassign

      if (interval < 1) interval = 1;
      var maxTries = Math.ceil(timeout / interval);
      var tries = 0;
      return new Promise(function (resolve, reject) {
        var rejectOrRerun = function (error) {
          if (tries > maxTries) {
            reject(error);
            return;
          } // eslint-disable-next-line no-use-before-define


          setTimeout(runExpectation, interval);
        };

        function runExpectation() {
          tries += 1;

          try {
            Promise.resolve(expectation()).then(function () {
              return resolve();
            }).catch(rejectOrRerun);
          } catch (error) {
            rejectOrRerun(error);
          }
        }

        setTimeout(runExpectation, 0);
      });
    };

    waitForExpect.defaults = defaults;
    exports.default = waitForExpect;
    module.exports = exports.default;
    module.exports.default = exports.default;
  });
  var waitForExpect = unwrapExports(lib$1);

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function fuzzyMatches(textToMatch, node, matcher, normalizer) {
    if (typeof textToMatch !== 'string') {
      return false;
    }

    var normalizedText = normalizer(textToMatch);

    if (typeof matcher === 'string') {
      return normalizedText.toLowerCase().includes(matcher.toLowerCase());
    } else if (typeof matcher === 'function') {
      return matcher(normalizedText, node);
    } else {
      return matcher.test(normalizedText);
    }
  }

  function matches(textToMatch, node, matcher, normalizer) {
    if (typeof textToMatch !== 'string') {
      return false;
    }

    var normalizedText = normalizer(textToMatch);

    if (typeof matcher === 'string') {
      return normalizedText === matcher;
    } else if (typeof matcher === 'function') {
      return matcher(normalizedText, node);
    } else {
      return matcher.test(normalizedText);
    }
  }

  function getDefaultNormalizer(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$trim = _ref.trim,
        trim = _ref$trim === void 0 ? true : _ref$trim,
        _ref$collapseWhitespa = _ref.collapseWhitespace,
        collapseWhitespace = _ref$collapseWhitespa === void 0 ? true : _ref$collapseWhitespa;

    return function (text) {
      var normalizedText = text;
      normalizedText = trim ? normalizedText.trim() : normalizedText;
      normalizedText = collapseWhitespace ? normalizedText.replace(/\s+/g, ' ') : normalizedText;
      return normalizedText;
    };
  }
  /**
   * Constructs a normalizer to pass to functions in matches.js
   * @param {boolean|undefined} trim The user-specified value for `trim`, without
   * any defaulting having been applied
   * @param {boolean|undefined} collapseWhitespace The user-specified value for
   * `collapseWhitespace`, without any defaulting having been applied
   * @param {Function|undefined} normalizer The user-specified normalizer
   * @returns {Function} A normalizer
   */


  function makeNormalizer(_ref2) {
    var trim = _ref2.trim,
        collapseWhitespace = _ref2.collapseWhitespace,
        normalizer = _ref2.normalizer;

    if (normalizer) {
      // User has specified a custom normalizer
      if (typeof trim !== 'undefined' || typeof collapseWhitespace !== 'undefined') {
        // They've also specified a value for trim or collapseWhitespace
        throw new Error('trim and collapseWhitespace are not supported with a normalizer. ' + 'If you want to use the default trim and collapseWhitespace logic in your normalizer, ' + 'use "getDefaultNormalizer({trim, collapseWhitespace})" and compose that into your normalizer');
      }

      return normalizer;
    } else {
      // No custom normalizer specified. Just use default.
      return getDefaultNormalizer({
        trim: trim,
        collapseWhitespace: collapseWhitespace
      });
    }
  } // Constant node.nodeType for text nodes, see:
  // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType#Node_type_constants


  var TEXT_NODE = 3;

  function getNodeText(node) {
    if (node.matches('input[type=submit], input[type=button]')) {
      return node.value;
    }

    return Array.from(node.childNodes).filter(function (child) {
      return child.nodeType === TEXT_NODE && Boolean(child.textContent);
    }).map(function (c) {
      return c.textContent;
    }).join('');
  }

  var globalObj = typeof window === 'undefined' ? global : window; // Currently this fn only supports jest timers, but it could support other test runners in the future.

  function runWithRealTimers(callback) {
    var usingJestFakeTimers = globalObj.setTimeout && globalObj.setTimeout._isMockFunction && typeof jest !== 'undefined';

    if (usingJestFakeTimers) {
      jest.useRealTimers();
    }

    var callbackReturnValue = callback();

    if (usingJestFakeTimers) {
      jest.useFakeTimers();
    }

    return callbackReturnValue;
  } // we only run our tests in node, and setImmediate is supported in node.
  // istanbul ignore next


  function setImmediatePolyfill(fn) {
    return globalObj.setTimeout(fn, 0);
  }

  function getTimeFunctions() {
    // istanbul ignore next
    return {
      clearTimeoutFn: globalObj.clearTimeout,
      setImmediateFn: globalObj.setImmediate || setImmediatePolyfill,
      setTimeoutFn: globalObj.setTimeout
    };
  }

  var _runWithRealTimers = runWithRealTimers(getTimeFunctions),
      clearTimeoutFn = _runWithRealTimers.clearTimeoutFn,
      setImmediateFn = _runWithRealTimers.setImmediateFn,
      setTimeoutFn = _runWithRealTimers.setTimeoutFn;

  function newMutationObserver(onMutation) {
    var MutationObserverConstructor = typeof window !== 'undefined' && typeof window.MutationObserver !== 'undefined' ? window.MutationObserver : MutationObserver;
    return new MutationObserverConstructor(onMutation);
  }

  function getDocument() {
    /* istanbul ignore if */
    if (typeof window === 'undefined') {
      throw new Error('Could not find default container');
    }

    return window.document;
  }

  function inCypress(dom) {
    var window = dom.ownerDocument && dom.ownerDocument.defaultView || undefined;
    return typeof global !== 'undefined' && global.Cypress || typeof window !== 'undefined' && window.Cypress;
  }

  var inNode = function () {
    return typeof process !== 'undefined' && process.versions !== undefined && process.versions.node !== undefined;
  };

  var getMaxLength = function (dom) {
    return inCypress(dom) ? 0 :  7000;
  };

  var _prettyFormat$plugins = prettyFormat.plugins,
      DOMElement$1 = _prettyFormat$plugins.DOMElement,
      DOMCollection$1 = _prettyFormat$plugins.DOMCollection;

  function prettyDOM(dom, maxLength, options) {
    if (!dom) {
      dom = getDocument().body;
    }

    if (typeof maxLength !== 'number') {
      maxLength = getMaxLength(dom);
    }

    if (maxLength === 0) {
      return '';
    }

    if (dom.documentElement) {
      dom = dom.documentElement;
    }

    var domTypeName = typeof dom;

    if (domTypeName === 'object') {
      domTypeName = dom.constructor.name;
    } else {
      // To don't fall with `in` operator
      dom = {};
    }

    if (!('outerHTML' in dom)) {
      throw new TypeError("Expected an element or document but got " + domTypeName);
    }

    var debugContent = prettyFormat(dom, _extends({
      plugins: [DOMElement$1, DOMCollection$1],
      printFunctionName: false,
      highlight: inNode()
    }, options));
    return maxLength !== undefined && dom.outerHTML.length > maxLength ? debugContent.slice(0, maxLength) + "..." : debugContent;
  }

  var logDOM = function () {
    return console.log(prettyDOM.apply(void 0, arguments));
  };
  /* eslint no-console:0 */
  // It would be cleaner for this to live inside './queries', but
  // other parts of the code assume that all exports from
  // './queries' are query functions.


  var config = {
    testIdAttribute: 'data-testid',
    asyncUtilTimeout: 4500,
    // this is to support React's async `act` function.
    // forcing react-testing-library to wrap all async functions would've been
    // a total nightmare (consider wrapping every findBy* query and then also
    // updating `within` so those would be wrapped too. Total nightmare).
    // so we have this config option that's really only intended for
    // react-testing-library to use. For that reason, this feature will remain
    // undocumented.
    asyncWrapper: function (cb) {
      return cb();
    },
    // default value for the `hidden` option in `ByRole` queries
    defaultHidden: false
  };

  function configure(newConfig) {
    if (typeof newConfig === 'function') {
      // Pass the existing config out to the provided function
      // and accept a delta in return
      newConfig = newConfig(config);
    } // Merge the incoming config delta


    config = _extends({}, config, {}, newConfig);
  }

  function getConfig() {
    return config;
  }

  function waitForElement(callback, _temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$container = _ref.container,
        container = _ref$container === void 0 ? getDocument() : _ref$container,
        _ref$timeout = _ref.timeout,
        timeout = _ref$timeout === void 0 ? getConfig().asyncUtilTimeout : _ref$timeout,
        _ref$mutationObserver = _ref.mutationObserverOptions,
        mutationObserverOptions = _ref$mutationObserver === void 0 ? {
      subtree: true,
      childList: true,
      attributes: true,
      characterData: true
    } : _ref$mutationObserver;

    return new Promise(function (resolve, reject) {
      if (typeof callback !== 'function') {
        reject(new Error('waitForElement requires a callback as the first parameter'));
        return;
      }

      var lastError;
      var timer = setTimeoutFn(onTimeout, timeout);
      var observer = newMutationObserver(onMutation);
      runWithRealTimers(function () {
        return observer.observe(container, mutationObserverOptions);
      });

      function onDone(error, result) {
        clearTimeoutFn(timer);
        setImmediateFn(function () {
          return observer.disconnect();
        });

        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }

      function onMutation() {
        try {
          var result = callback();

          if (result) {
            onDone(null, result);
          } // If `callback` returns falsy value, wait for the next mutation or timeout.

        } catch (error) {
          // Save the callback error to reject the promise with it.
          lastError = error; // If `callback` throws an error, wait for the next mutation or timeout.
        }
      }

      function onTimeout() {
        onDone(lastError || new Error('Timed out in waitForElement.'), null);
      }

      onMutation();
    });
  }

  function waitForElementWrapper() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return getConfig().asyncWrapper(function () {
      return waitForElement.apply(void 0, args);
    });
  }

  function getElementError(message, container) {
    return new Error([message, prettyDOM(container)].filter(Boolean).join('\n\n'));
  }

  function getMultipleElementsFoundError(message, container) {
    return getElementError(message + "\n\n(If this is intentional, then use the `*AllBy*` variant of the query (like `queryAllByText`, `getAllByText`, or `findAllByText`)).", container);
  }

  function queryAllByAttribute(attribute, container, text, _temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$exact = _ref.exact,
        exact = _ref$exact === void 0 ? true : _ref$exact,
        collapseWhitespace = _ref.collapseWhitespace,
        trim = _ref.trim,
        normalizer = _ref.normalizer;

    var matcher = exact ? matches : fuzzyMatches;
    var matchNormalizer = makeNormalizer({
      collapseWhitespace: collapseWhitespace,
      trim: trim,
      normalizer: normalizer
    });
    return Array.from(container.querySelectorAll("[" + attribute + "]")).filter(function (node) {
      return matcher(node.getAttribute(attribute), node, text, matchNormalizer);
    });
  }

  function queryByAttribute(attribute, container, text) {
    for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      args[_key - 3] = arguments[_key];
    }

    var els = queryAllByAttribute.apply(void 0, [attribute, container, text].concat(args));

    if (els.length > 1) {
      throw getMultipleElementsFoundError("Found multiple elements by [" + attribute + "=" + text + "]", container);
    }

    return els[0] || null;
  } // this accepts a query function and returns a function which throws an error
  // if more than one elements is returned, otherwise it returns the first
  // element or null


  function makeSingleQuery(allQuery, getMultipleError) {
    return function (container) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      var els = allQuery.apply(void 0, [container].concat(args));

      if (els.length > 1) {
        throw getMultipleElementsFoundError(getMultipleError.apply(void 0, [container].concat(args)), container);
      }

      return els[0] || null;
    };
  } // this accepts a query function and returns a function which throws an error
  // if an empty list of elements is returned


  function makeGetAllQuery(allQuery, getMissingError) {
    return function (container) {
      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      var els = allQuery.apply(void 0, [container].concat(args));

      if (!els.length) {
        throw getElementError(getMissingError.apply(void 0, [container].concat(args)), container);
      }

      return els;
    };
  } // this accepts a getter query function and returns a function which calls
  // waitForElement and passing a function which invokes the getter.


  function makeFindQuery(getter) {
    return function (container, text, options, waitForElementOptions) {
      return waitForElementWrapper(function () {
        return getter(container, text, options);
      }, waitForElementOptions);
    };
  }

  function buildQueries(queryAllBy, getMultipleError, getMissingError) {
    var queryBy = makeSingleQuery(queryAllBy, getMultipleError);
    var getAllBy = makeGetAllQuery(queryAllBy, getMissingError);
    var getBy = makeSingleQuery(getAllBy, getMultipleError);
    var findAllBy = makeFindQuery(getAllBy);
    var findBy = makeFindQuery(getBy);
    return [queryBy, getAllBy, getBy, findAllBy, findBy];
  }

  var queryHelpers =
  /*#__PURE__*/
  Object.freeze({
    __proto__: null,
    getElementError: getElementError,
    getMultipleElementsFoundError: getMultipleElementsFoundError,
    queryAllByAttribute: queryAllByAttribute,
    queryByAttribute: queryByAttribute,
    makeSingleQuery: makeSingleQuery,
    makeGetAllQuery: makeGetAllQuery,
    makeFindQuery: makeFindQuery,
    buildQueries: buildQueries
  });

  function queryAllByText(container, text, _temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$selector = _ref.selector,
        selector = _ref$selector === void 0 ? '*' : _ref$selector,
        _ref$exact = _ref.exact,
        exact = _ref$exact === void 0 ? true : _ref$exact,
        collapseWhitespace = _ref.collapseWhitespace,
        trim = _ref.trim,
        _ref$ignore = _ref.ignore,
        ignore = _ref$ignore === void 0 ? 'script, style' : _ref$ignore,
        normalizer = _ref.normalizer;

    var matcher = exact ? matches : fuzzyMatches;
    var matchNormalizer = makeNormalizer({
      collapseWhitespace: collapseWhitespace,
      trim: trim,
      normalizer: normalizer
    });
    var baseArray = [];

    if (typeof container.matches === 'function' && container.matches(selector)) {
      baseArray = [container];
    }

    return [].concat(baseArray, Array.from(container.querySelectorAll(selector))).filter(function (node) {
      return !ignore || !node.matches(ignore);
    }).filter(function (node) {
      return matcher(getNodeText(node), node, text, matchNormalizer);
    });
  }

  var getMultipleError = function (c, text) {
    return "Found multiple elements with the text: " + text;
  };

  var getMissingError = function (c, text) {
    return "Unable to find an element with the text: " + text + ". This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.";
  };

  var _buildQueries = buildQueries(queryAllByText, getMultipleError, getMissingError),
      queryByText = _buildQueries[0],
      getAllByText = _buildQueries[1],
      getByText = _buildQueries[2],
      findAllByText = _buildQueries[3],
      findByText = _buildQueries[4];

  function queryAllLabelsByText(container, text, _temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$exact = _ref.exact,
        exact = _ref$exact === void 0 ? true : _ref$exact,
        trim = _ref.trim,
        collapseWhitespace = _ref.collapseWhitespace,
        normalizer = _ref.normalizer;

    var matcher = exact ? matches : fuzzyMatches;
    var matchNormalizer = makeNormalizer({
      collapseWhitespace: collapseWhitespace,
      trim: trim,
      normalizer: normalizer
    });
    return Array.from(container.querySelectorAll('label')).filter(function (label) {
      var textToMatch = label.textContent; // The children of a textarea are part of `textContent` as well. We
      // need to remove them from the string so we can match it afterwards.

      Array.from(label.querySelectorAll('textarea')).forEach(function (textarea) {
        textToMatch = textToMatch.replace(textarea.value, '');
      });
      return matcher(textToMatch, label, text, matchNormalizer);
    });
  }

  function queryAllByLabelText(container, text, _temp2) {
    var _ref2 = _temp2 === void 0 ? {} : _temp2,
        _ref2$selector = _ref2.selector,
        selector = _ref2$selector === void 0 ? '*' : _ref2$selector,
        _ref2$exact = _ref2.exact,
        exact = _ref2$exact === void 0 ? true : _ref2$exact,
        collapseWhitespace = _ref2.collapseWhitespace,
        trim = _ref2.trim,
        normalizer = _ref2.normalizer;

    var matchNormalizer = makeNormalizer({
      collapseWhitespace: collapseWhitespace,
      trim: trim,
      normalizer: normalizer
    });
    var labels = queryAllLabelsByText(container, text, {
      exact: exact,
      normalizer: matchNormalizer
    });
    var labelledElements = labels.map(function (label) {
      if (label.control) {
        return label.control;
      }
      /* istanbul ignore if */


      if (label.getAttribute('for')) {
        // we're using this notation because with the # selector we would have to escape special characters e.g. user.name
        // see https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector#Escaping_special_characters
        // <label for="someId">text</label><input id="someId" />
        // .control support has landed in jsdom (https://github.com/jsdom/jsdom/issues/2175)
        return container.querySelector("[id=\"" + label.getAttribute('for') + "\"]");
      }

      if (label.getAttribute('id')) {
        // <label id="someId">text</label><input aria-labelledby="someId" />
        return container.querySelector("[aria-labelledby~=\"" + label.getAttribute('id') + "\"]");
      }

      if (label.childNodes.length) {
        // <label>text: <input /></label>
        return label.querySelector(selector);
      }

      return null;
    }).filter(function (label) {
      return label !== null;
    }).concat(queryAllByAttribute('aria-label', container, text, {
      exact: exact
    }));
    var possibleAriaLabelElements = queryAllByText(container, text, {
      exact: exact,
      normalizer: matchNormalizer
    });
    var ariaLabelledElements = possibleAriaLabelElements.reduce(function (allLabelledElements, nextLabelElement) {
      var labelId = nextLabelElement.getAttribute('id');
      if (!labelId) return allLabelledElements; // ARIA labels can label multiple elements

      var labelledNodes = Array.from(container.querySelectorAll("[aria-labelledby~=\"" + labelId + "\"]"));
      return allLabelledElements.concat(labelledNodes);
    }, []);
    return Array.from(new Set([].concat(labelledElements, ariaLabelledElements)));
  } // the getAll* query would normally look like this:
  // const getAllByLabelText = makeGetAllQuery(
  //   queryAllByLabelText,
  //   (c, text) => `Unable to find a label with the text of: ${text}`,
  // )
  // however, we can give a more helpful error message than the generic one,
  // so we're writing this one out by hand.


  function getAllByLabelText(container, text) {
    for (var _len = arguments.length, rest = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      rest[_key - 2] = arguments[_key];
    }

    var els = queryAllByLabelText.apply(void 0, [container, text].concat(rest));

    if (!els.length) {
      var labels = queryAllLabelsByText.apply(void 0, [container, text].concat(rest));

      if (labels.length) {
        throw getElementError("Found a label with the text of: " + text + ", however no form control was found associated to that label. Make sure you're using the \"for\" attribute or \"aria-labelledby\" attribute correctly.", container);
      } else {
        throw getElementError("Unable to find a label with the text of: " + text, container);
      }
    }

    return els;
  } // the reason mentioned above is the same reason we're not using buildQueries


  var getMultipleError$1 = function (c, text) {
    return "Found multiple elements with the text of: " + text;
  };

  var queryByLabelText = makeSingleQuery(queryAllByLabelText, getMultipleError$1);
  var getByLabelText = makeSingleQuery(getAllByLabelText, getMultipleError$1);
  var findAllByLabelText = makeFindQuery(getAllByLabelText);
  var findByLabelText = makeFindQuery(getByLabelText);
  var queryAllByPlaceholderText = queryAllByAttribute.bind(null, 'placeholder');

  var getMultipleError$2 = function (c, text) {
    return "Found multiple elements with the placeholder text of: " + text;
  };

  var getMissingError$1 = function (c, text) {
    return "Unable to find an element with the placeholder text of: " + text;
  };

  var _buildQueries$1 = buildQueries(queryAllByPlaceholderText, getMultipleError$2, getMissingError$1),
      queryByPlaceholderText = _buildQueries$1[0],
      getAllByPlaceholderText = _buildQueries$1[1],
      getByPlaceholderText = _buildQueries$1[2],
      findAllByPlaceholderText = _buildQueries$1[3],
      findByPlaceholderText = _buildQueries$1[4];

  function queryAllByDisplayValue(container, value, _temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$exact = _ref.exact,
        exact = _ref$exact === void 0 ? true : _ref$exact,
        collapseWhitespace = _ref.collapseWhitespace,
        trim = _ref.trim,
        normalizer = _ref.normalizer;

    var matcher = exact ? matches : fuzzyMatches;
    var matchNormalizer = makeNormalizer({
      collapseWhitespace: collapseWhitespace,
      trim: trim,
      normalizer: normalizer
    });
    return Array.from(container.querySelectorAll("input,textarea,select")).filter(function (node) {
      if (node.tagName === 'SELECT') {
        var selectedOptions = Array.from(node.options).filter(function (option) {
          return option.selected;
        });
        return selectedOptions.some(function (optionNode) {
          return matcher(getNodeText(optionNode), optionNode, value, matchNormalizer);
        });
      } else {
        return matcher(node.value, node, value, matchNormalizer);
      }
    });
  }

  var getMultipleError$3 = function (c, value) {
    return "Found multiple elements with the value: " + value + ".";
  };

  var getMissingError$2 = function (c, value) {
    return "Unable to find an element with the value: " + value + ".";
  };

  var _buildQueries$2 = buildQueries(queryAllByDisplayValue, getMultipleError$3, getMissingError$2),
      queryByDisplayValue = _buildQueries$2[0],
      getAllByDisplayValue = _buildQueries$2[1],
      getByDisplayValue = _buildQueries$2[2],
      findAllByDisplayValue = _buildQueries$2[3],
      findByDisplayValue = _buildQueries$2[4];

  function queryAllByAltText(container, alt, _temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$exact = _ref.exact,
        exact = _ref$exact === void 0 ? true : _ref$exact,
        collapseWhitespace = _ref.collapseWhitespace,
        trim = _ref.trim,
        normalizer = _ref.normalizer;

    var matcher = exact ? matches : fuzzyMatches;
    var matchNormalizer = makeNormalizer({
      collapseWhitespace: collapseWhitespace,
      trim: trim,
      normalizer: normalizer
    });
    return Array.from(container.querySelectorAll('img,input,area')).filter(function (node) {
      return matcher(node.getAttribute('alt'), node, alt, matchNormalizer);
    });
  }

  var getMultipleError$4 = function (c, alt) {
    return "Found multiple elements with the alt text: " + alt;
  };

  var getMissingError$3 = function (c, alt) {
    return "Unable to find an element with the alt text: " + alt;
  };

  var _buildQueries$3 = buildQueries(queryAllByAltText, getMultipleError$4, getMissingError$3),
      queryByAltText = _buildQueries$3[0],
      getAllByAltText = _buildQueries$3[1],
      getByAltText = _buildQueries$3[2],
      findAllByAltText = _buildQueries$3[3],
      findByAltText = _buildQueries$3[4];

  function queryAllByTitle(container, text, _temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$exact = _ref.exact,
        exact = _ref$exact === void 0 ? true : _ref$exact,
        collapseWhitespace = _ref.collapseWhitespace,
        trim = _ref.trim,
        normalizer = _ref.normalizer;

    var matcher = exact ? matches : fuzzyMatches;
    var matchNormalizer = makeNormalizer({
      collapseWhitespace: collapseWhitespace,
      trim: trim,
      normalizer: normalizer
    });
    return Array.from(container.querySelectorAll('[title], svg > title')).filter(function (node) {
      return matcher(node.getAttribute('title'), node, text, matchNormalizer) || matcher(getNodeText(node), node, text, matchNormalizer);
    });
  }

  var getMultipleError$5 = function (c, title) {
    return "Found multiple elements with the title: " + title + ".";
  };

  var getMissingError$4 = function (c, title) {
    return "Unable to find an element with the title: " + title + ".";
  };

  var _buildQueries$4 = buildQueries(queryAllByTitle, getMultipleError$5, getMissingError$4),
      queryByTitle = _buildQueries$4[0],
      getAllByTitle = _buildQueries$4[1],
      getByTitle = _buildQueries$4[2],
      findAllByTitle = _buildQueries$4[3],
      findByTitle = _buildQueries$4[4];

  var elementRoleList = buildElementRoleList(lib_2);
  /**
   * @param {Element} element -
   * @returns {boolean} - `true` if `element` and its subtree are inaccessible
   */

  function isSubtreeInaccessible(element) {
    if (element.hidden === true) {
      return true;
    }

    if (element.getAttribute('aria-hidden') === 'true') {
      return true;
    }

    var window = element.ownerDocument.defaultView;

    if (window.getComputedStyle(element).display === 'none') {
      return true;
    }

    return false;
  }
  /**
   * Partial implementation https://www.w3.org/TR/wai-aria-1.2/#tree_exclusion
   * which should only be used for elements with a non-presentational role i.e.
   * `role="none"` and `role="presentation"` will not be excluded.
   *
   * Implements aria-hidden semantics (i.e. parent overrides child)
   * Ignores "Child Presentational: True" characteristics
   *
   * @param {Element} element -
   * @param {object} [options] -
   * @param {function (element: Element): boolean} options.isSubtreeInaccessible -
   * can be used to return cached results from previous isSubtreeInaccessible calls
   * @returns {boolean} true if excluded, otherwise false
   */


  function isInaccessible(element, options) {
    if (options === void 0) {
      options = {};
    }

    var _options = options,
        _options$isSubtreeIna = _options.isSubtreeInaccessible,
        isSubtreeInaccessibleImpl = _options$isSubtreeIna === void 0 ? isSubtreeInaccessible : _options$isSubtreeIna;
    var window = element.ownerDocument.defaultView; // since visibility is inherited we can exit early

    if (window.getComputedStyle(element).visibility === 'hidden') {
      return true;
    }

    var currentElement = element;

    while (currentElement) {
      if (isSubtreeInaccessibleImpl(currentElement)) {
        return true;
      }

      currentElement = currentElement.parentElement;
    }

    return false;
  }

  function getImplicitAriaRoles(currentNode) {
    // eslint bug here:
    // eslint-disable-next-line no-unused-vars
    for (var _iterator = elementRoleList, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var _ref2 = _ref,
          selector = _ref2.selector,
          roles = _ref2.roles;

      if (currentNode.matches(selector)) {
        return [].concat(roles);
      }
    }

    return [];
  }

  function buildElementRoleList(elementRolesMap) {
    function makeElementSelector(_ref3) {
      var name = _ref3.name,
          _ref3$attributes = _ref3.attributes,
          attributes = _ref3$attributes === void 0 ? [] : _ref3$attributes;
      return "" + name + attributes.map(function (_ref4) {
        var attributeName = _ref4.name,
            value = _ref4.value;
        return value ? "[" + attributeName + "=" + value + "]" : "[" + attributeName + "]";
      }).join('');
    }

    function getSelectorSpecificity(_ref5) {
      var _ref5$attributes = _ref5.attributes,
          attributes = _ref5$attributes === void 0 ? [] : _ref5$attributes;
      return attributes.length;
    }

    var result = []; // eslint bug here:
    // eslint-disable-next-line no-unused-vars

    for (var _iterator2 = elementRolesMap.entries(), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref8;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref8 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref8 = _i2.value;
      }

      var _ref9 = _ref8,
          element = _ref9[0],
          roles = _ref9[1];
      result = [].concat(result, [{
        selector: makeElementSelector(element),
        roles: Array.from(roles),
        specificity: getSelectorSpecificity(element)
      }]);
    }

    return result.sort(function (_ref6, _ref7) {
      var leftSpecificity = _ref6.specificity;
      var rightSpecificity = _ref7.specificity;
      return rightSpecificity - leftSpecificity;
    });
  }

  function getRoles(container, _temp) {
    var _ref10 = _temp === void 0 ? {} : _temp,
        _ref10$hidden = _ref10.hidden,
        hidden = _ref10$hidden === void 0 ? false : _ref10$hidden;

    function flattenDOM(node) {
      return [node].concat(Array.from(node.children).reduce(function (acc, child) {
        return [].concat(acc, flattenDOM(child));
      }, []));
    }

    return flattenDOM(container).filter(function (element) {
      return hidden === false ? isInaccessible(element) === false : true;
    }).reduce(function (acc, node) {
      var roles = getImplicitAriaRoles(node);
      return roles.reduce(function (rolesAcc, role) {
        var _extends2, _extends3;

        return Array.isArray(rolesAcc[role]) ? _extends({}, rolesAcc, (_extends2 = {}, _extends2[role] = [].concat(rolesAcc[role], [node]), _extends2)) : _extends({}, rolesAcc, (_extends3 = {}, _extends3[role] = [node], _extends3));
      }, acc);
    }, {});
  }

  function prettyRoles(dom, _ref11) {
    var hidden = _ref11.hidden;
    var roles = getRoles(dom, {
      hidden: hidden
    });
    return Object.entries(roles).map(function (_ref12) {
      var role = _ref12[0],
          elements = _ref12[1];
      var delimiterBar = '-'.repeat(50);
      var elementsString = elements.map(function (el) {
        return prettyDOM(el.cloneNode(false));
      }).join('\n\n');
      return role + ":\n\n" + elementsString + "\n\n" + delimiterBar;
    }).join('\n');
  }

  var logRoles = function (dom, _temp2) {
    var _ref13 = _temp2 === void 0 ? {} : _temp2,
        _ref13$hidden = _ref13.hidden,
        hidden = _ref13$hidden === void 0 ? false : _ref13$hidden;

    return console.log(prettyRoles(dom, {
      hidden: hidden
    }));
  };
  /* eslint no-console:0 */


  function queryAllByRole(container, role, _temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$exact = _ref.exact,
        exact = _ref$exact === void 0 ? true : _ref$exact,
        collapseWhitespace = _ref.collapseWhitespace,
        _ref$hidden = _ref.hidden,
        hidden = _ref$hidden === void 0 ? getConfig().defaultHidden : _ref$hidden,
        trim = _ref.trim,
        normalizer = _ref.normalizer;

    var matcher = exact ? matches : fuzzyMatches;
    var matchNormalizer = makeNormalizer({
      collapseWhitespace: collapseWhitespace,
      trim: trim,
      normalizer: normalizer
    });
    var subtreeIsInaccessibleCache = new WeakMap();

    function cachedIsSubtreeInaccessible(element) {
      if (!subtreeIsInaccessibleCache.has(element)) {
        subtreeIsInaccessibleCache.set(element, isSubtreeInaccessible(element));
      }

      return subtreeIsInaccessibleCache.get(element);
    }

    return Array.from(container.querySelectorAll('*')).filter(function (node) {
      var isRoleSpecifiedExplicitly = node.hasAttribute('role');

      if (isRoleSpecifiedExplicitly) {
        return matcher(node.getAttribute('role'), node, role, matchNormalizer);
      }

      var implicitRoles = getImplicitAriaRoles(node);
      return implicitRoles.some(function (implicitRole) {
        return matcher(implicitRole, node, role, matchNormalizer);
      });
    }).filter(function (element) {
      return hidden === false ? isInaccessible(element, {
        isSubtreeInaccessible: cachedIsSubtreeInaccessible
      }) === false : true;
    });
  }

  var getMultipleError$6 = function (c, role) {
    return "Found multiple elements with the role \"" + role + "\"";
  };

  var getMissingError$5 = function (container, role, _temp2) {
    var _ref2 = _temp2 === void 0 ? {} : _temp2,
        _ref2$hidden = _ref2.hidden,
        hidden = _ref2$hidden === void 0 ? getConfig().defaultHidden : _ref2$hidden;

    var roles = prettyRoles(container, {
      hidden: hidden
    });
    var roleMessage;

    if (roles.length === 0) {
      if (hidden === false) {
        roleMessage = 'There are no accessible roles. But there might be some inaccessible roles. ' + 'If you wish to access them, then set the `hidden` option to `true`. ' + 'Learn more about this here: https://testing-library.com/docs/dom-testing-library/api-queries#byrole';
      } else {
        roleMessage = 'There are no available roles.';
      }
    } else {
      roleMessage = ("\nHere are the " + (hidden === false ? 'accessible' : 'available') + " roles:\n\n  " + roles.replace(/\n/g, '\n  ').replace(/\n\s\s\n/g, '\n\n') + "\n").trim();
    }

    return ("\nUnable to find an " + (hidden === false ? 'accessible ' : '') + "element with the role \"" + role + "\"\n\n" + roleMessage).trim();
  };

  var _buildQueries$5 = buildQueries(queryAllByRole, getMultipleError$6, getMissingError$5),
      queryByRole = _buildQueries$5[0],
      getAllByRole = _buildQueries$5[1],
      getByRole = _buildQueries$5[2],
      findAllByRole = _buildQueries$5[3],
      findByRole = _buildQueries$5[4];

  var getTestIdAttribute = function () {
    return getConfig().testIdAttribute;
  };

  var queryAllByTestId = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return queryAllByAttribute.apply(void 0, [getTestIdAttribute()].concat(args));
  };

  var getMultipleError$7 = function (c, id) {
    return "Found multiple elements by: [" + getTestIdAttribute() + "=\"" + id + "\"]";
  };

  var getMissingError$6 = function (c, id) {
    return "Unable to find an element by: [" + getTestIdAttribute() + "=\"" + id + "\"]";
  };

  var _buildQueries$6 = buildQueries(queryAllByTestId, getMultipleError$7, getMissingError$6),
      queryByTestId = _buildQueries$6[0],
      getAllByTestId = _buildQueries$6[1],
      getByTestId = _buildQueries$6[2],
      findAllByTestId = _buildQueries$6[3],
      findByTestId = _buildQueries$6[4];

  var queries =
  /*#__PURE__*/
  Object.freeze({
    __proto__: null,
    queryAllByLabelText: queryAllByLabelText,
    queryByLabelText: queryByLabelText,
    getAllByLabelText: getAllByLabelText,
    getByLabelText: getByLabelText,
    findAllByLabelText: findAllByLabelText,
    findByLabelText: findByLabelText,
    queryByPlaceholderText: queryByPlaceholderText,
    queryAllByPlaceholderText: queryAllByPlaceholderText,
    getByPlaceholderText: getByPlaceholderText,
    getAllByPlaceholderText: getAllByPlaceholderText,
    findAllByPlaceholderText: findAllByPlaceholderText,
    findByPlaceholderText: findByPlaceholderText,
    queryByText: queryByText,
    queryAllByText: queryAllByText,
    getByText: getByText,
    getAllByText: getAllByText,
    findAllByText: findAllByText,
    findByText: findByText,
    queryByDisplayValue: queryByDisplayValue,
    queryAllByDisplayValue: queryAllByDisplayValue,
    getByDisplayValue: getByDisplayValue,
    getAllByDisplayValue: getAllByDisplayValue,
    findAllByDisplayValue: findAllByDisplayValue,
    findByDisplayValue: findByDisplayValue,
    queryByAltText: queryByAltText,
    queryAllByAltText: queryAllByAltText,
    getByAltText: getByAltText,
    getAllByAltText: getAllByAltText,
    findAllByAltText: findAllByAltText,
    findByAltText: findByAltText,
    queryByTitle: queryByTitle,
    queryAllByTitle: queryAllByTitle,
    getByTitle: getByTitle,
    getAllByTitle: getAllByTitle,
    findAllByTitle: findAllByTitle,
    findByTitle: findByTitle,
    queryByRole: queryByRole,
    queryAllByRole: queryAllByRole,
    getAllByRole: getAllByRole,
    getByRole: getByRole,
    findAllByRole: findAllByRole,
    findByRole: findByRole,
    queryByTestId: queryByTestId,
    queryAllByTestId: queryAllByTestId,
    getByTestId: getByTestId,
    getAllByTestId: getAllByTestId,
    findAllByTestId: findAllByTestId,
    findByTestId: findByTestId
  });
  /**
   * @typedef {{[key: string]: Function}} FuncMap
   */

  /**
   * @param {HTMLElement} element container
   * @param {FuncMap} queries object of functions
   * @returns {FuncMap} returns object of functions bound to container
   */

  function getQueriesForElement(element, queries$1) {
    if (queries$1 === void 0) {
      queries$1 = queries;
    }

    return Object.keys(queries$1).reduce(function (helpers, key) {
      var fn = queries$1[key];
      helpers[key] = fn.bind(null, element);
      return helpers;
    }, {});
  }

  function wait(callback, _temp) {
    if (callback === void 0) {
      callback = function () {};
    }

    var _ref = _temp === void 0 ? {} : _temp,
        _ref$timeout = _ref.timeout,
        timeout = _ref$timeout === void 0 ? getConfig().asyncUtilTimeout : _ref$timeout,
        _ref$interval = _ref.interval,
        interval = _ref$interval === void 0 ? 50 : _ref$interval;

    return waitForExpect(callback, timeout, interval);
  }

  function waitWrapper() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return getConfig().asyncWrapper(function () {
      return wait.apply(void 0, args);
    });
  }

  function waitForElementToBeRemoved(callback, _temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$container = _ref.container,
        container = _ref$container === void 0 ? getDocument() : _ref$container,
        _ref$timeout = _ref.timeout,
        timeout = _ref$timeout === void 0 ? getConfig().asyncUtilTimeout : _ref$timeout,
        _ref$mutationObserver = _ref.mutationObserverOptions,
        mutationObserverOptions = _ref$mutationObserver === void 0 ? {
      subtree: true,
      childList: true,
      attributes: true,
      characterData: true
    } : _ref$mutationObserver;

    return new Promise(function (resolve, reject) {
      if (typeof callback !== 'function') {
        reject(new Error('waitForElementToBeRemoved requires a function as the first parameter'));
      }

      var timer = setTimeoutFn(function () {
        onDone(new Error('Timed out in waitForElementToBeRemoved.'), null);
      }, timeout);
      var observer = newMutationObserver(function () {
        try {
          var _result = callback();

          if (!_result || Array.isArray(_result) && !_result.length) {
            onDone(null, true);
          } // If `callback` returns truthy value, wait for the next mutation or timeout.

        } catch (error) {
          onDone(null, true);
        }
      }); // Check if the element is not present synchronously,
      // As the name waitForElementToBeRemoved should check `present` --> `removed`

      try {
        var result = callback();

        if (!result || Array.isArray(result) && !result.length) {
          onDone(new Error('The callback function which was passed did not return an element or non-empty array of elements. waitForElementToBeRemoved requires that the element(s) exist before waiting for removal.'));
        } else {
          // Only observe for mutations only if there is element while checking synchronously
          runWithRealTimers(function () {
            return observer.observe(container, mutationObserverOptions);
          });
        }
      } catch (error) {
        onDone(error);
      }

      function onDone(error, result) {
        clearTimeoutFn(timer);
        setImmediateFn(function () {
          return observer.disconnect();
        });

        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    });
  }

  function waitForElementToBeRemovedWrapper() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return getConfig().asyncWrapper(function () {
      return waitForElementToBeRemoved.apply(void 0, args);
    });
  }

  function waitForDomChange(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$container = _ref.container,
        container = _ref$container === void 0 ? getDocument() : _ref$container,
        _ref$timeout = _ref.timeout,
        timeout = _ref$timeout === void 0 ? getConfig().asyncUtilTimeout : _ref$timeout,
        _ref$mutationObserver = _ref.mutationObserverOptions,
        mutationObserverOptions = _ref$mutationObserver === void 0 ? {
      subtree: true,
      childList: true,
      attributes: true,
      characterData: true
    } : _ref$mutationObserver;

    return new Promise(function (resolve, reject) {
      var timer = setTimeoutFn(function () {
        onDone(new Error('Timed out in waitForDomChange.'), null);
      }, timeout);
      var observer = newMutationObserver(function (mutationsList) {
        onDone(null, mutationsList);
      });
      runWithRealTimers(function () {
        return observer.observe(container, mutationObserverOptions);
      });

      function onDone(error, result) {
        clearTimeoutFn(timer);
        setImmediateFn(function () {
          return observer.disconnect();
        });

        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    });
  }

  function waitForDomChangeWrapper() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return getConfig().asyncWrapper(function () {
      return waitForDomChange.apply(void 0, args);
    });
  }

  var eventMap = {
    // Clipboard Events
    copy: {
      EventType: 'ClipboardEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true
      }
    },
    cut: {
      EventType: 'ClipboardEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true
      }
    },
    paste: {
      EventType: 'ClipboardEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true
      }
    },
    // Composition Events
    compositionEnd: {
      EventType: 'CompositionEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true
      }
    },
    compositionStart: {
      EventType: 'CompositionEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true
      }
    },
    compositionUpdate: {
      EventType: 'CompositionEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true
      }
    },
    // Keyboard Events
    keyDown: {
      EventType: 'KeyboardEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true,
        charCode: 0
      }
    },
    keyPress: {
      EventType: 'KeyboardEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true,
        charCode: 0
      }
    },
    keyUp: {
      EventType: 'KeyboardEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true,
        charCode: 0
      }
    },
    // Focus Events
    focus: {
      EventType: 'FocusEvent',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    blur: {
      EventType: 'FocusEvent',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    focusIn: {
      EventType: 'FocusEvent',
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    focusOut: {
      EventType: 'FocusEvent',
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    // Form Events
    change: {
      EventType: 'Event',
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    input: {
      EventType: 'InputEvent',
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    invalid: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: true
      }
    },
    submit: {
      EventType: 'Event',
      defaultInit: {
        bubbles: true,
        cancelable: true
      }
    },
    reset: {
      EventType: 'Event',
      defaultInit: {
        bubbles: true,
        cancelable: true
      }
    },
    // Mouse Events
    click: {
      EventType: 'MouseEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true,
        button: 0
      }
    },
    contextMenu: {
      EventType: 'MouseEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true
      }
    },
    dblClick: {
      EventType: 'MouseEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true
      }
    },
    drag: {
      EventType: 'DragEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true
      }
    },
    dragEnd: {
      EventType: 'DragEvent',
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    dragEnter: {
      EventType: 'DragEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true
      }
    },
    dragExit: {
      EventType: 'DragEvent',
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    dragLeave: {
      EventType: 'DragEvent',
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    dragOver: {
      EventType: 'DragEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true
      }
    },
    dragStart: {
      EventType: 'DragEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true
      }
    },
    drop: {
      EventType: 'DragEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true
      }
    },
    mouseDown: {
      EventType: 'MouseEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true
      }
    },
    mouseEnter: {
      EventType: 'MouseEvent',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    mouseLeave: {
      EventType: 'MouseEvent',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    mouseMove: {
      EventType: 'MouseEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true
      }
    },
    mouseOut: {
      EventType: 'MouseEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true
      }
    },
    mouseOver: {
      EventType: 'MouseEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true
      }
    },
    mouseUp: {
      EventType: 'MouseEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true
      }
    },
    // Selection Events
    select: {
      EventType: 'Event',
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    // Touch Events
    touchCancel: {
      EventType: 'TouchEvent',
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    touchEnd: {
      EventType: 'TouchEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true
      }
    },
    touchMove: {
      EventType: 'TouchEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true
      }
    },
    touchStart: {
      EventType: 'TouchEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true
      }
    },
    // UI Events
    scroll: {
      EventType: 'UIEvent',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    // Wheel Events
    wheel: {
      EventType: 'WheelEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true
      }
    },
    // Media Events
    abort: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    canPlay: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    canPlayThrough: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    durationChange: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    emptied: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    encrypted: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    ended: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    // error: {
    //   EventType: Event,
    //   defaultInit: {bubbles: false, cancelable: false},
    // },
    loadedData: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    loadedMetadata: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    loadStart: {
      EventType: 'ProgressEvent',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    pause: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    play: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    playing: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    progress: {
      EventType: 'ProgressEvent',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    rateChange: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    seeked: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    seeking: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    stalled: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    suspend: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    timeUpdate: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    volumeChange: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    waiting: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    // Image Events
    load: {
      EventType: 'UIEvent',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    error: {
      EventType: 'Event',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    // Animation Events
    animationStart: {
      EventType: 'AnimationEvent',
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    animationEnd: {
      EventType: 'AnimationEvent',
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    animationIteration: {
      EventType: 'AnimationEvent',
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    // Transition Events
    transitionEnd: {
      EventType: 'TransitionEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true
      }
    },
    // pointer events
    pointerOver: {
      EventType: 'PointerEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true
      }
    },
    pointerEnter: {
      EventType: 'PointerEvent',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    pointerDown: {
      EventType: 'PointerEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true
      }
    },
    pointerMove: {
      EventType: 'PointerEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true
      }
    },
    pointerUp: {
      EventType: 'PointerEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true
      }
    },
    pointerCancel: {
      EventType: 'PointerEvent',
      defaultInit: {
        bubbles: true,
        cancelable: false
      }
    },
    pointerOut: {
      EventType: 'PointerEvent',
      defaultInit: {
        bubbles: true,
        cancelable: true
      }
    },
    pointerLeave: {
      EventType: 'PointerEvent',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    gotPointerCapture: {
      EventType: 'PointerEvent',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    },
    lostPointerCapture: {
      EventType: 'PointerEvent',
      defaultInit: {
        bubbles: false,
        cancelable: false
      }
    }
  };
  var eventAliasMap = {
    doubleClick: 'dblClick'
  };

  function fireEvent(element, event) {
    if (!event) {
      throw new Error("Unable to fire an event - please provide an event object.");
    }

    if (!element) {
      throw new Error("Unable to fire a \"" + event.type + "\" event - please provide a DOM element.");
    }

    return element.dispatchEvent(event);
  }

  var createEvent = {};
  Object.keys(eventMap).forEach(function (key) {
    var _eventMap$key = eventMap[key],
        EventType = _eventMap$key.EventType,
        defaultInit = _eventMap$key.defaultInit;
    var eventName = key.toLowerCase();

    createEvent[key] = function (node, init) {
      if (!node) {
        throw new Error("Unable to fire a \"" + key + "\" event - please provide a DOM element.");
      }

      var eventInit = _extends({}, defaultInit, {}, init);

      var _eventInit$target = eventInit.target;
      _eventInit$target = _eventInit$target === void 0 ? {} : _eventInit$target;

      var value = _eventInit$target.value,
          files = _eventInit$target.files,
          targetProperties = _objectWithoutPropertiesLoose(_eventInit$target, ["value", "files"]);

      if (value !== undefined) {
        setNativeValue(node, value);
      }

      if (files !== undefined) {
        // input.files is a read-only property so this is not allowed:
        // input.files = [file]
        // so we have to use this workaround to set the property
        Object.defineProperty(node, 'files', {
          configurable: true,
          enumerable: true,
          writable: true,
          value: files
        });
      }

      Object.assign(node, targetProperties);
      var window = getWindowFromNode(node);
      var EventConstructor = window[EventType] || window.Event;
      return new EventConstructor(eventName, eventInit);
    };

    fireEvent[key] = function (node, init) {
      return fireEvent(node, createEvent[key](node, init));
    };
  });

  function getWindowFromNode(node) {
    // istanbul ignore next I'm not sure what could cause the final else so we'll leave it uncovered.
    if (node.defaultView) {
      // node is document
      return node.defaultView;
    } else if (node.ownerDocument && node.ownerDocument.defaultView) {
      // node is a DOM node
      return node.ownerDocument.defaultView;
    } else if (node.window) {
      // node is window
      return node.window;
    } else {
      // no idea...
      throw new Error("Unable to find the \"window\" object for the given node. fireEvent currently supports firing events on DOM nodes, document, and window. Please file an issue with the code that's causing you to see this error: https://github.com/testing-library/dom-testing-library/issues/new");
    }
  } // function written after some investigation here:
  // https://github.com/facebook/react/issues/10135#issuecomment-401496776


  function setNativeValue(element, value) {
    var _ref = Object.getOwnPropertyDescriptor(element, 'value') || {},
        valueSetter = _ref.set;

    var prototype = Object.getPrototypeOf(element);

    var _ref2 = Object.getOwnPropertyDescriptor(prototype, 'value') || {},
        prototypeValueSetter = _ref2.set;

    if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {
      prototypeValueSetter.call(element, value);
    }
    /* istanbul ignore next (I don't want to bother) */
    else if (valueSetter) {
        valueSetter.call(element, value);
      } else {
        throw new Error('The given element does not have a value setter');
      }
  }

  Object.keys(eventAliasMap).forEach(function (aliasKey) {
    var key = eventAliasMap[aliasKey];

    fireEvent[aliasKey] = function () {
      return fireEvent[key].apply(fireEvent, arguments);
    };
  });
  /* eslint complexity:["error", 9] */

  var screen = typeof document !== 'undefined' && document.body ? getQueriesForElement(document.body) : Object.keys(queries).reduce(function (helpers, key) {
    helpers[key] = function () {
      throw new TypeError('For queries bound to document.body a global document has to be available... Learn more: https://testing-library.com/s/screen-global-error');
    };

    return helpers;
  }, {});

  var reactAct = testUtils.act;
  var actSupported = reactAct !== undefined; // act is supported react-dom@16.8.0
  // so for versions that don't have act from test utils
  // we do this little polyfill. No warnings, but it's
  // better than nothing.

  function actPolyfill(cb) {
    ReactDOM.unstable_batchedUpdates(cb);
    ReactDOM.render(React.createElement("div", null), document.createElement('div'));
  }

  var act = reactAct || actPolyfill;
  var youHaveBeenWarned = false;
  var isAsyncActSupported = null;

  function asyncAct(cb) {
    if (actSupported === true) {
      if (isAsyncActSupported === null) {
        return new Promise(function (resolve, reject) {
          // patch console.error here
          var originalConsoleError = console.error;

          console.error = function () {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            /* if console.error fired *with that specific message* */

            /* istanbul ignore next */
            var firstArgIsString = typeof args[0] === 'string';

            if (firstArgIsString && args[0].indexOf('Warning: Do not await the result of calling ReactTestUtils.act') === 0) {
              // v16.8.6
              isAsyncActSupported = false;
            } else if (!(firstArgIsString && args[0].indexOf('Warning: The callback passed to ReactTestUtils.act(...) function must not return anything') === 0)) {
              originalConsoleError.apply(console, args);
            }
          };

          var cbReturn, result;

          try {
            result = reactAct(function () {
              cbReturn = cb();
              return cbReturn;
            });
          } catch (err) {
            console.error = originalConsoleError;
            reject(err);
            return;
          }

          result.then(function () {
            console.error = originalConsoleError; // if it got here, it means async act is supported

            isAsyncActSupported = true;
            resolve();
          }, function (err) {
            console.error = originalConsoleError;
            isAsyncActSupported = true;
            reject(err);
          }); // 16.8.6's act().then() doesn't call a resolve handler, so we need to manually flush here, sigh

          if (isAsyncActSupported === false) {
            console.error = originalConsoleError;
            /* istanbul ignore next */

            if (!youHaveBeenWarned) {
              // if act is supported and async act isn't and they're trying to use async
              // act, then they need to upgrade from 16.8 to 16.9.
              // This is a seemless upgrade, so we'll add a warning
              console.error("It looks like you're using a version of react-dom that supports the \"act\" function, but not an awaitable version of \"act\" which you will need. Please upgrade to at least react-dom@16.9.0 to remove this warning.");
              youHaveBeenWarned = true;
            }

            cbReturn.then(function () {
              // a faux-version.
              // todo - copy https://github.com/facebook/react/blob/master/packages/shared/enqueueTask.js
              Promise.resolve().then(function () {
                // use sync act to flush effects
                act(function () {});
                resolve();
              });
            }, reject);
          }
        });
      } else if (isAsyncActSupported === false) {
        // use the polyfill directly
        var _result;

        act(function () {
          _result = cb();
        });
        return _result.then(function () {
          return Promise.resolve().then(function () {
            // use sync act to flush effects
            act(function () {});
          });
        });
      } // all good! regular act


      return act(cb);
    } // use the polyfill


    var result;
    act(function () {
      result = cb();
    });
    return result.then(function () {
      return Promise.resolve().then(function () {
        // use sync act to flush effects
        act(function () {});
      });
    });
  }
  /* eslint no-console:0 */

  configure({
    asyncWrapper: function asyncWrapper(cb) {
      var result;
      return regenerator.async(function (_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regenerator.awrap(asyncAct(function () {
                return regenerator.async(function (_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return regenerator.awrap(cb());

                      case 2:
                        result = _context.sent;

                      case 3:
                      case "end":
                        return _context.stop();
                    }
                  }
                });
              }));

            case 2:
              return _context2.abrupt("return", result);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  });
  var mountedContainers = new Set();

  function render(ui, _temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        container = _ref.container,
        _ref$baseElement = _ref.baseElement,
        baseElement = _ref$baseElement === void 0 ? container : _ref$baseElement,
        queries = _ref.queries,
        _ref$hydrate = _ref.hydrate,
        hydrate = _ref$hydrate === void 0 ? false : _ref$hydrate,
        WrapperComponent = _ref.wrapper;

    if (!baseElement) {
      // default to document.body instead of documentElement to avoid output of potentially-large
      // head elements (such as JSS style blocks) in debug output
      baseElement = document.body;
    }

    if (!container) {
      container = baseElement.appendChild(document.createElement('div'));
    } // we'll add it to the mounted containers regardless of whether it's actually
    // added to document.body so the cleanup method works regardless of whether
    // they're passing us a custom container or not.


    mountedContainers.add(container);

    var wrapUiIfNeeded = function (innerElement) {
      return WrapperComponent ? React.createElement(WrapperComponent, null, innerElement) : innerElement;
    };

    act(function () {
      if (hydrate) {
        ReactDOM.hydrate(wrapUiIfNeeded(ui), container);
      } else {
        ReactDOM.render(wrapUiIfNeeded(ui), container);
      }
    });
    return _extends({
      container: container,
      baseElement: baseElement,
      debug: function debug(el) {
        if (el === void 0) {
          el = baseElement;
        }

        return Array.isArray(el) ? // eslint-disable-next-line no-console
        el.forEach(function (e) {
          return console.log(prettyDOM(e));
        }) : // eslint-disable-next-line no-console,
        console.log(prettyDOM(el));
      },
      unmount: function unmount() {
        return ReactDOM.unmountComponentAtNode(container);
      },
      rerender: function rerender(rerenderUi) {
        render(wrapUiIfNeeded(rerenderUi), {
          container: container,
          baseElement: baseElement
        }); // Intentionally do not return anything to avoid unnecessarily complicating the API.
        // folks can use all the same utilities we return in the first place that are bound to the container
      },
      asFragment: function asFragment() {
        /* istanbul ignore if (jsdom limitation) */
        if (typeof document.createRange === 'function') {
          return document.createRange().createContextualFragment(container.innerHTML);
        }

        var template = document.createElement('template');
        template.innerHTML = container.innerHTML;
        return template.content;
      }
    }, getQueriesForElement(baseElement, queries));
  }

  function cleanup() {
    mountedContainers.forEach(cleanupAtContainer);
  } // maybe one day we'll expose this (perhaps even as a utility returned by render).
  // but let's wait until someone asks for it.


  function cleanupAtContainer(container) {
    ReactDOM.unmountComponentAtNode(container);

    if (container.parentNode === document.body) {
      document.body.removeChild(container);
    }

    mountedContainers.delete(container);
  } // react-testing-library's version of fireEvent will call
  // dom-testing-library's version of fireEvent wrapped inside
  // an "act" call so that after all event callbacks have been
  // been called, the resulting useEffect callbacks will also
  // be called.


  function fireEvent$1() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var returnValue;
    act(function () {
      returnValue = fireEvent.apply(void 0, args);
    });
    return returnValue;
  }

  Object.keys(fireEvent).forEach(function (key) {
    fireEvent$1[key] = function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var returnValue;
      act(function () {
        returnValue = fireEvent[key].apply(fireEvent, args);
      });
      return returnValue;
    };
  }); // React event system tracks native mouseOver/mouseOut events for
  // running onMouseEnter/onMouseLeave handlers
  // @link https://github.com/facebook/react/blob/b87aabdfe1b7461e7331abb3601d9e6bb27544bc/packages/react-dom/src/events/EnterLeaveEventPlugin.js#L24-L31

  fireEvent$1.mouseEnter = fireEvent$1.mouseOver;
  fireEvent$1.mouseLeave = fireEvent$1.mouseOut;

  fireEvent$1.select = function (node, init) {
    // React tracks this event only on focused inputs
    node.focus(); // React creates this event when one of the following native events happens
    // - contextMenu
    // - mouseUp
    // - dragEnd
    // - keyUp
    // - keyDown
    // so we can use any here
    // @link https://github.com/facebook/react/blob/b87aabdfe1b7461e7331abb3601d9e6bb27544bc/packages/react-dom/src/events/SelectEventPlugin.js#L203-L224

    fireEvent$1.keyUp(node, init);
  }; // just re-export everything from dom-testing-library
  // thing for people using react-dom@16.8.0. Anyone else doesn't need it and
  // people should just upgrade anyway.

  /* eslint func-name-matching:0 */

  exports.act = act;
  exports.bindElementToQueries = getQueriesForElement;
  exports.buildQueries = buildQueries;
  exports.cleanup = cleanup;
  exports.configure = configure;
  exports.createEvent = createEvent;
  exports.findAllByAltText = findAllByAltText;
  exports.findAllByDisplayValue = findAllByDisplayValue;
  exports.findAllByLabelText = findAllByLabelText;
  exports.findAllByPlaceholderText = findAllByPlaceholderText;
  exports.findAllByRole = findAllByRole;
  exports.findAllByTestId = findAllByTestId;
  exports.findAllByText = findAllByText;
  exports.findAllByTitle = findAllByTitle;
  exports.findByAltText = findByAltText;
  exports.findByDisplayValue = findByDisplayValue;
  exports.findByLabelText = findByLabelText;
  exports.findByPlaceholderText = findByPlaceholderText;
  exports.findByRole = findByRole;
  exports.findByTestId = findByTestId;
  exports.findByText = findByText;
  exports.findByTitle = findByTitle;
  exports.fireEvent = fireEvent$1;
  exports.getAllByAltText = getAllByAltText;
  exports.getAllByDisplayValue = getAllByDisplayValue;
  exports.getAllByLabelText = getAllByLabelText;
  exports.getAllByPlaceholderText = getAllByPlaceholderText;
  exports.getAllByRole = getAllByRole;
  exports.getAllByTestId = getAllByTestId;
  exports.getAllByText = getAllByText;
  exports.getAllByTitle = getAllByTitle;
  exports.getByAltText = getByAltText;
  exports.getByDisplayValue = getByDisplayValue;
  exports.getByLabelText = getByLabelText;
  exports.getByPlaceholderText = getByPlaceholderText;
  exports.getByRole = getByRole;
  exports.getByTestId = getByTestId;
  exports.getByText = getByText;
  exports.getByTitle = getByTitle;
  exports.getDefaultNormalizer = getDefaultNormalizer;
  exports.getElementError = getElementError;
  exports.getMultipleElementsFoundError = getMultipleElementsFoundError;
  exports.getNodeText = getNodeText;
  exports.getQueriesForElement = getQueriesForElement;
  exports.getRoles = getRoles;
  exports.isInaccessible = isInaccessible;
  exports.logDOM = logDOM;
  exports.logRoles = logRoles;
  exports.makeFindQuery = makeFindQuery;
  exports.makeGetAllQuery = makeGetAllQuery;
  exports.makeSingleQuery = makeSingleQuery;
  exports.prettyDOM = prettyDOM;
  exports.queries = queries;
  exports.queryAllByAltText = queryAllByAltText;
  exports.queryAllByAttribute = queryAllByAttribute;
  exports.queryAllByDisplayValue = queryAllByDisplayValue;
  exports.queryAllByLabelText = queryAllByLabelText;
  exports.queryAllByPlaceholderText = queryAllByPlaceholderText;
  exports.queryAllByRole = queryAllByRole;
  exports.queryAllByTestId = queryAllByTestId;
  exports.queryAllByText = queryAllByText;
  exports.queryAllByTitle = queryAllByTitle;
  exports.queryByAltText = queryByAltText;
  exports.queryByAttribute = queryByAttribute;
  exports.queryByDisplayValue = queryByDisplayValue;
  exports.queryByLabelText = queryByLabelText;
  exports.queryByPlaceholderText = queryByPlaceholderText;
  exports.queryByRole = queryByRole;
  exports.queryByTestId = queryByTestId;
  exports.queryByText = queryByText;
  exports.queryByTitle = queryByTitle;
  exports.queryHelpers = queryHelpers;
  exports.render = render;
  exports.screen = screen;
  exports.wait = waitWrapper;
  exports.waitForDomChange = waitForDomChangeWrapper;
  exports.waitForElement = waitForElementWrapper;
  exports.waitForElementToBeRemoved = waitForElementToBeRemovedWrapper;
  exports.within = getQueriesForElement;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=react.pure.umd.js.map
