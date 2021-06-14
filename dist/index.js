import { AppWebsocket } from '@holochain/conductor-api';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getAugmentedNamespace(n) {
	if (n.__esModule) return n;
	var a = Object.defineProperty({}, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var postmate_1 = __importDefault(require("postmate"));
var async_with_timeout_1 = __importDefault(require("./async_with_timeout"));
var async_with_timeout_2 = require("./async_with_timeout");
/**
 * @module COMB
 *
 * @description
 * Parent window
 * ```html
 * <script type="text/javascript" src="./holo_hosting_comb.js"></script>
 * <script type="text/javascript">
 * (async () => {
 *     const child = await comb.connect( url );
 *
 *     await child.set("mode", mode );
 *
 *     let response = await child.run("signIn");
 * })();
 * </script>
 * ```
 *
 * Child frame
 * ```html
 * <script type="text/javascript" src="./holo_hosting_comb.js"></script>
 * <script type="text/javascript">
 * (async () => {
 *     const parent = comb.listen({
 *         "signIn": async function ( ...args ) {
 *             if ( this.mode === DEVELOP )
 *                 ...
 *             else
 *                 ...
 *             return response;
 *         },
 *     });
 * })();
 * </script>
 * ```
 *
 */
var COMB$1 = {
    /**
     * Turn on debugging and set the logging level.  If 'debug' is not called, the default log level
     * is 'error'.
     *
     * @function debug
     *
     * @param {string} level		- Log level (default: "debug", options: "error", "warn", "info", "debug", "trace")
     *
     * @example
     * COMB.debug( "info" );
     */
    debug: function (level) {
        postmate_1["default"].debug = true;
    },
    /**
     * Insert an iframe (pointing at the given URL) into the `document.body` and wait for COMB to
     * connect.
     *
     * @async
     * @function connect
     *
     * @param {string} url		- URL that is used as 'src' for the iframe
     *
     * @return {ChildAPI} Connection to child frame
     *
     * @example
     * const child = await COMB.connect( "http://localhost:8002" );
     */
    connect: function (url, timeout, signalCb) {
        return __awaiter(this, void 0, void 0, function () {
            var child;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        child = new ChildAPI(url, timeout, signalCb);
                        return [4 /*yield*/, child.connect()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, child];
                }
            });
        });
    },
    /**
     * Listen to 'postMessage' requests and wait for a parent window to connect.
     *
     * @async
     * @function listen
     *
     * @param {object} methods		- Functions that are available for the parent to call.
     *
     * @return {ParentAPI} Connection to parent window
     *
     * @example
     * const parent = await COMB.listen({
     *     "hello": async function () {
     *         return "Hello world";
     *     }
     * });
     */
    listen: function (methods) {
        return __awaiter(this, void 0, void 0, function () {
            var parent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parent = new ParentAPI(methods);
                        return [4 /*yield*/, parent.connect()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, parent];
                }
            });
        });
    }
};
exports.COMB = COMB$1;
var ChildAPI = /** @class */ (function () {
    /**
     * Initialize a child frame using the given URL.
     *
     * @class ChildAPI
     *
     * @param {string} url - URL that is used as 'src' for the iframe
     *
     * @prop {string} url         - iFrame URL
     * @prop {number} msg_count   - Incrementing message ID
     * @prop {object} responses   - Dictionary of request Promises waiting for their responses
     * @prop {object} msg_bus     - Postmate instance
     * @prop {promise} handshake  - Promise that is waiting for connection confirmation
     * @prop {string} class_name  - iFrame's unique class name
     * @prop {boolean} loaded     - Indicates if iFrame successfully loaded
     * @prop {any} signalCb       - A callback that's run when we receive a signal
     *
     * @example
     * const child = new ChildAPI( url );
     * await child.connect();
     *
     * await child.set("mode", mode );
     * let response = await child.run("signIn");
     */
    function ChildAPI(url, timeout, signalCb) {
        var _this = this;
        if (timeout === void 0) { timeout = 5000; }
        this.url = url;
        this.msg_count = 0;
        this.responses = {};
        this.loaded = false;
        this.signalCb = signalCb;
        this.class_name = "comb-frame-" + ChildAPI.frame_count++;
        this.handshake = async_with_timeout_1["default"](function () { return __awaiter(_this, void 0, void 0, function () {
            var handshake, iframe;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        handshake = new postmate_1["default"]({
                            "container": document.body,
                            "url": this.url,
                            "classListArray": [this.class_name]
                        });
                        iframe = document.querySelector('iframe.' + this.class_name);
                        // log.debug("Listening for iFrame load event", iframe );
                        iframe['contentWindow'].addEventListener("domcontentloaded", function () {
                            // log.debug("iFrame content has loaded");
                            _this.loaded = true;
                        });
                        return [4 /*yield*/, handshake];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); }, timeout);
    }
    /**
     * Wait for handshake to complete and then attach response listener.
     *
     * @async
     *
     * @return {this}
     *
     * @example
     * const child = new ChildAPI( url );
     * await child.connect();
     */
    ChildAPI.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var child, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.handshake];
                    case 1:
                        child = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        if (err_1.name === "TimeoutError") {
                            if (this.loaded) {
                                // log.error("iFrame loaded but could not communicate with COMB");
                                throw new async_with_timeout_2.TimeoutError("Failed to complete COMB handshake", err_1.timeout);
                            }
                            else {
                                // log.error("iFrame did not trigger load event");
                                throw new async_with_timeout_2.TimeoutError("Failed to load iFrame", err_1.timeout);
                            }
                        }
                        else
                            throw err_1;
                    case 3:
                        // log.info("Finished handshake");
                        child.on('response', function (data) {
                            var k = data[0], v = data[1];
                            // log.info("Received response for msg_id:", k );
                            var _a = _this.responses[k], f = _a[0], r = _a[1];
                            if (v instanceof Error)
                                r(v);
                            else
                                f(v);
                            delete _this.responses[k];
                        });
                        if (this.signalCb) {
                            child.on('signal', this.signalCb);
                        }
                        this.msg_bus = child;
                        return [2 /*return*/, this];
                }
            });
        });
    };
    /**
     * Internal method that wraps requests in a timeout.
     *
     * @async
     * @private
     *
     * @param {string} method   - Internally consistent Postmate method
     * @param {string} name     - Function name or property name
     * @param {*} data          - Variable input that is handled by child API
     *
     * @return {*} Response from child
     */
    ChildAPI.prototype.request = function (method, name, data, timeout) {
        var _this = this;
        if (timeout === void 0) { timeout = 2000; }
        var msg_id = this.msg_count++;
        this.msg_bus.call(method, [msg_id, name, data]);
        // log.info("Sent request with msg_id:", msg_id );
        return async_with_timeout_1["default"](function () { return __awaiter(_this, void 0, void 0, function () {
            var request;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = new Promise(function (f, r) {
                            _this.responses[msg_id] = [f, r];
                        });
                        return [4 /*yield*/, request];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); }, timeout);
    };
    /**
     * Set a property on the child instance and wait for the confirmation. Properties set that way
     * can be accessed as properties of `this` in the functions passed via listen() to the parentAPI.
     *
     * Essentially, it is a shortcut to remember some state instead of having to write a method to
     * remember some state.  Example `child.set("development_mode", true)` vs
     * `child.call("setDevelopmentMode", true)`.  The latter requires you to define
     * `setDevelopmentMode` on the child model where the former does not require any
     * pre-configuration.
     *
     * @async
     *
     * @param {string} key  - Property name
     * @param {*} value     - Property value
     *
     * @return {boolean} Success status
     *
     * @example
     * let success = await child.set( "key", "value" );
     */
    ChildAPI.prototype.set = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("prop", key, value)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Call an exposed function on the child instance and wait for the response.
     *
     * @async
     *
     * @param {string} method		- Name of exposed function to call
     * @param {...*} args		- Arguments that are passed to function
     *
     * @return {*}
     *
     * @example
     * let response = await child.run( "some_method", "argument 1", 2, 3 );
     */
    ChildAPI.prototype.run = function (method) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("exec", method, args)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ChildAPI.prototype.call = function (method) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("exec", method, args, 84000000)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ChildAPI.frame_count = 0;
    return ChildAPI;
}());
var ParentAPI = /** @class */ (function () {
    /**
     * Initialize a listening instance and set available methods.
     *
     * @class ParentAPI
     *
     * @param {object} methods    - Functions that are available for the parent to call.
     * @param {object} properties - Properties to memorize in the instance for later use, optional
     *
     * @prop {promise} listener   - Promise that is waiting for parent to connect
     * @prop {object} msg_bus     - Postmate instance
     * @prop {object} methods     - Method storage
     * @prop {object} properties  - Set properties storage
     *
     * @example
     * const parent = new ParentAPI({
     *     "hello": async function () {
     *         return "Hello world";
     *     }
     * });
     * await parent.connect();
     */
    function ParentAPI(methods, properties) {
        var _this = this;
        if (properties === void 0) { properties = {}; }
        this.methods = methods;
        this.properties = properties;
        this.listener = new postmate_1["default"].Model({
            "exec": function (data) { return __awaiter(_this, void 0, void 0, function () {
                var msg_id, method, args, fn, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            msg_id = data[0], method = data[1], args = data[2];
                            fn = this.methods[method];
                            if (fn === undefined) {
                                // log.error("Method does not exist", method );
                                return [2 /*return*/, this.msg_bus.emit("response", [msg_id, new Error("Method '" + method + "' does not exist")])];
                            }
                            if (typeof fn !== "function") {
                                // log.error("Method is not a function: type", typeof fn );
                                return [2 /*return*/, this.msg_bus.emit("response", [msg_id, new Error("Method '" + method + "' is not a function. Found type '" + typeof fn + "'")])];
                            }
                            return [4 /*yield*/, fn.apply(this.properties, args)];
                        case 1:
                            resp = _a.sent();
                            this.msg_bus.emit("response", [msg_id, resp]);
                            return [2 /*return*/];
                    }
                });
            }); },
            "prop": function (data) { return __awaiter(_this, void 0, void 0, function () {
                var msg_id, key, value;
                return __generator(this, function (_a) {
                    msg_id = data[0], key = data[1], value = data[2];
                    this.properties[key] = value;
                    this.msg_bus.emit("response", [msg_id, true]);
                    return [2 /*return*/];
                });
            }); }
        });
    }
    /**
     * Wait for parent to connect.
     *
     * @async
     *
     * @return {this}
     *
     * @example
     * const parent = new ParentAPI({
     *     "hello": async function () {
     *         return "Hello world";
     *     }
     * });
     * await parent.connect();
     */
    ParentAPI.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.listener];
                    case 1:
                        _a.msg_bus = _b.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    /**
   * Send holochain conductor signal to parent.
   *
   * @async
   *
   * @param {object} signal		- The signal
   *
   * @example
   * const parent = new ParentAPI({
   *     "hello": async function () {
   *         return "Hello world";
   *     }
   * });
   * await parent.sendSignal(signal);
   */
    ParentAPI.prototype.sendSignal = function (signal) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.msg_bus.emit('signal', signal);
                return [2 /*return*/];
            });
        });
    };
    return ParentAPI;
}());

var build = /*#__PURE__*/Object.freeze({
	__proto__: null
});

var require$$0 = /*@__PURE__*/getAugmentedNamespace(build);

var domain;

// This constructor is used to store event handlers. Instantiating this is
// faster than explicitly calling `Object.create(null)` to get a "clean" empty
// object (tested with v8 v4.9).
function EventHandlers() {}
EventHandlers.prototype = Object.create(null);

function EventEmitter$1() {
  EventEmitter$1.init.call(this);
}

// nodejs oddity
// require('events') === require('events').EventEmitter
EventEmitter$1.EventEmitter = EventEmitter$1;

EventEmitter$1.usingDomains = false;

EventEmitter$1.prototype.domain = undefined;
EventEmitter$1.prototype._events = undefined;
EventEmitter$1.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter$1.defaultMaxListeners = 10;

EventEmitter$1.init = function() {
  this.domain = null;
  if (EventEmitter$1.usingDomains) {
    // if there is an active domain, then attach to it.
    if (domain.active ) ;
  }

  if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
    this._events = new EventHandlers();
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter$1.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || isNaN(n))
    throw new TypeError('"n" argument must be a positive number');
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter$1.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter$1.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

// These standalone emit* functions are used to optimize calling of event
// handlers for fast cases because emit() itself often has a variable number of
// arguments and can be deoptimized because of that. These functions always have
// the same number of arguments and thus do not get deoptimized, so the code
// inside them can execute faster.
function emitNone(handler, isFn, self) {
  if (isFn)
    handler.call(self);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self);
  }
}
function emitOne(handler, isFn, self, arg1) {
  if (isFn)
    handler.call(self, arg1);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1);
  }
}
function emitTwo(handler, isFn, self, arg1, arg2) {
  if (isFn)
    handler.call(self, arg1, arg2);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2);
  }
}
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
  if (isFn)
    handler.call(self, arg1, arg2, arg3);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2, arg3);
  }
}

function emitMany(handler, isFn, self, args) {
  if (isFn)
    handler.apply(self, args);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].apply(self, args);
  }
}

EventEmitter$1.prototype.emit = function emit(type) {
  var er, handler, len, args, i, events, domain;
  var doError = (type === 'error');

  events = this._events;
  if (events)
    doError = (doError && events.error == null);
  else if (!doError)
    return false;

  domain = this.domain;

  // If there is no 'error' event listener then throw.
  if (doError) {
    er = arguments[1];
    if (domain) {
      if (!er)
        er = new Error('Uncaught, unspecified "error" event');
      er.domainEmitter = this;
      er.domain = domain;
      er.domainThrown = false;
      domain.emit('error', er);
    } else if (er instanceof Error) {
      throw er; // Unhandled 'error' event
    } else {
      // At least give some kind of context to the user
      var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
      err.context = er;
      throw err;
    }
    return false;
  }

  handler = events[type];

  if (!handler)
    return false;

  var isFn = typeof handler === 'function';
  len = arguments.length;
  switch (len) {
    // fast cases
    case 1:
      emitNone(handler, isFn, this);
      break;
    case 2:
      emitOne(handler, isFn, this, arguments[1]);
      break;
    case 3:
      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
      break;
    case 4:
      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
      break;
    // slower
    default:
      args = new Array(len - 1);
      for (i = 1; i < len; i++)
        args[i - 1] = arguments[i];
      emitMany(handler, isFn, this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');

  events = target._events;
  if (!events) {
    events = target._events = new EventHandlers();
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (!existing) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] = prepend ? [listener, existing] :
                                          [existing, listener];
    } else {
      // If we've already got an array, just append.
      if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
    }

    // Check for listener leak
    if (!existing.warned) {
      m = $getMaxListeners(target);
      if (m && m > 0 && existing.length > m) {
        existing.warned = true;
        var w = new Error('Possible EventEmitter memory leak detected. ' +
                            existing.length + ' ' + type + ' listeners added. ' +
                            'Use emitter.setMaxListeners() to increase limit');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        emitWarning(w);
      }
    }
  }

  return target;
}
function emitWarning(e) {
  typeof console.warn === 'function' ? console.warn(e) : console.log(e);
}
EventEmitter$1.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter$1.prototype.on = EventEmitter$1.prototype.addListener;

EventEmitter$1.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function _onceWrap(target, type, listener) {
  var fired = false;
  function g() {
    target.removeListener(type, g);
    if (!fired) {
      fired = true;
      listener.apply(target, arguments);
    }
  }
  g.listener = listener;
  return g;
}

EventEmitter$1.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter$1.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// emits a 'removeListener' event iff the listener was removed
EventEmitter$1.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');

      events = this._events;
      if (!events)
        return this;

      list = events[type];
      if (!list)
        return this;

      if (list === listener || (list.listener && list.listener === listener)) {
        if (--this._eventsCount === 0)
          this._events = new EventHandlers();
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length; i-- > 0;) {
          if (list[i] === listener ||
              (list[i].listener && list[i].listener === listener)) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (list.length === 1) {
          list[0] = undefined;
          if (--this._eventsCount === 0) {
            this._events = new EventHandlers();
            return this;
          } else {
            delete events[type];
          }
        } else {
          spliceOne(list, position);
        }

        if (events.removeListener)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter$1.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events;

      events = this._events;
      if (!events)
        return this;

      // not listening for removeListener, no need to emit
      if (!events.removeListener) {
        if (arguments.length === 0) {
          this._events = new EventHandlers();
          this._eventsCount = 0;
        } else if (events[type]) {
          if (--this._eventsCount === 0)
            this._events = new EventHandlers();
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        for (var i = 0, key; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = new EventHandlers();
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners) {
        // LIFO order
        do {
          this.removeListener(type, listeners[listeners.length - 1]);
        } while (listeners[0]);
      }

      return this;
    };

EventEmitter$1.prototype.listeners = function listeners(type) {
  var evlistener;
  var ret;
  var events = this._events;

  if (!events)
    ret = [];
  else {
    evlistener = events[type];
    if (!evlistener)
      ret = [];
    else if (typeof evlistener === 'function')
      ret = [evlistener.listener || evlistener];
    else
      ret = unwrapListeners(evlistener);
  }

  return ret;
};

EventEmitter$1.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter$1.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter$1.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};

// About 1.5x faster than the two-arg version of Array#splice().
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
    list[i] = list[k];
  list.pop();
}

function arrayClone(arr, i) {
  var copy = new Array(i);
  while (i--)
    copy[i] = arr[i];
  return copy;
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

var events = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': EventEmitter$1,
	EventEmitter: EventEmitter$1
});

var require$$1 = /*@__PURE__*/getAugmentedNamespace(events);

const TESTING = commonjsGlobal.COMB !== undefined;

if (!TESTING)
  COMB = require$$0.COMB;

const { EventEmitter } = require$$1;

function makeUrlAbsolute (url) {
  return new URL(url, window.location).href
}

class Connection extends EventEmitter {

  constructor(url, signalCb, branding) {
    super();

    const hostname = window.location.hostname;
    this.chaperone_url = new URL(url || `http://${hostname}:24273`);
    if (branding !== undefined) {
      if (branding.logo_url !== undefined) {
        this.chaperone_url.searchParams.set("logo_url", makeUrlAbsolute(branding.logo_url));
      }
      if (branding.app_name !== undefined) {
        this.chaperone_url.searchParams.set("app_name", branding.app_name);
      }
      if (branding.info_link !== undefined) {
        this.chaperone_url.searchParams.set("info_link", branding.info_link);
      }
      if (branding.publisher_name !== undefined) {
        this.chaperone_url.searchParams.set("publisher_name", branding.publisher_name);
      }
    }

    this.waiting = [];
    this.child = null;
    this.signalCb = signalCb;
    this.connecting = this.connect();
  }

  ready() {
    return new Promise((resolve, reject) => {
      this.connecting.catch(reject);
      this.child !== null
        ? resolve()
        : this.waiting.push(resolve);
    });
  }

  async connect() {
    try {
      this.child = await COMB.connect(this.chaperone_url.href, 5000, this.signalCb);
    } catch (err) {
      if (err.name === "TimeoutError")
        console.log("Chaperone did not load properly. Is it running?");
      throw err;
    }

    let f;
    while (f = this.waiting.shift()) {
      f();
    }

    if (TESTING)
      return;

    // Alerts:
    //   signin		- emitted when the user completes a successful sign-in
    //   signup		- emitted when the user completes a successful sign-up
    //   signout		- emitted when the user competes a successful sign-out
    //   canceled		- emitted when the user purposefully exits sign-in/up
    //   connected		- emitted when the connection is opened
    //   disconnected	- emitted when the connection is closed
    this.child.msg_bus.on("alert", (event, ...args) => {
      this.emit(event);
    });

    this.iframe = document.getElementsByClassName("comb-frame-0")[0];
    this.iframe.setAttribute('allowtransparency', 'true');

    const style = this.iframe.style;
    style.zIndex = "99999999";
    style.width = "100%";
    style.height = "100%";
    style.position = "absolute";
    style.top = "0";
    style.left = "0";
    style.display = "none";
  }

  async context() {
    return Connection.HOSTED_ANONYMOUS;
  }

  async zomeCall(...args) {
    const response = await this.child.call("zomeCall", ...args);
    return response;
  }

  async appInfo(...args) {
    const response = await this.child.call("appInfo", ...args);
    return response;
  }

  async signUp() {
    this.iframe.style.display = "block";
    const result = await this.child.call("signUp");
    this.iframe.style.display = "none";
    return result;
  }

  async signIn() {
    this.iframe.style.display = "block";
    const result = await this.child.call("signIn");
    this.iframe.style.display = "none";
    return result;
  }

  async signOut() {
    return await this.child.run("signOut");
  }

  async holoInfo() {
    return await this.child.run("holoInfo");
  }
}

Connection.AUTONOMOUS = 1;
Connection.HOSTED_ANONYMOUS = 2;
Connection.HOSTED_AGENT = 3;

var src = {
  Connection,
};

//@ts-ignore
class HoloClient {
    constructor(connection, cellData, branding) {
        this.connection = connection;
        this.cellData = cellData;
        this.branding = branding;
    }
    get cellId() {
        return this.cellData.cell_id;
    }
    callZome(zomeName, fnName, payload) {
        return this.connection.zomeCall(this.cellData.cell_nick, zomeName, fnName, payload);
    }
    addSignalHandler(signalHandler) {
        new src.Connection(this.connection.chaperone_url, signalHandler, this.branding);
    }
}

class HolochainClient {
    constructor(appWebsocket, cellData) {
        this.appWebsocket = appWebsocket;
        this.cellData = cellData;
    }
    get cellId() {
        return this.cellData.cell_id;
    }
    callZome(zomeName, fnName, payload) {
        return this.appWebsocket.callZome({
            cap: null,
            cell_id: this.cellId,
            zome_name: zomeName,
            fn_name: fnName,
            payload: payload,
            provenance: this.cellId[1],
        });
    }
    addSignalHandler(signalHandler) {
        AppWebsocket.connect(this.appWebsocket.client.socket.url, 15000, signalHandler);
    }
}

export { HoloClient, HolochainClient };
//# sourceMappingURL=index.js.map
