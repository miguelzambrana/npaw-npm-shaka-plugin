/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 166);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(21);
var hide = __webpack_require__(14);
var redefine = __webpack_require__(15);
var ctx = __webpack_require__(22);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(55)('wks');
var uid = __webpack_require__(40);
var Symbol = __webpack_require__(2).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(24);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(3)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var Emitter = __webpack_require__(34)
var isArray = __webpack_require__(106)

/**
 * Static Log class for YouboraLib
 *
 * @class
 * @static
 * @memberof youbora
 */
var Log = {

  _emitter: new Emitter(),

  /** Exposes {@link youbora.EvenfulObject.on} */
  on: function () { Log._emitter.on.apply(Log._emitter, arguments) },
  /** Exposes {@link youbora.EvenfulObject.off} */
  off: function () { Log._emitter.off.apply(Log._emitter, arguments) },
  /** Exposes {@link youbora.EvenfulObject.emit} */
  emit: function () { Log._emitter.emit.apply(Log._emitter, arguments) },

  /**
   * Enum for log levels
   * @enum
   */
  Level: {
    /** No console outputs */
    SILENT: 6,
    /** Console will show errors */
    ERROR: 5,
    /** Console will show warnings */
    WARNING: 4,
    /** Console will show notices (ie: life-cyrcle logs) */
    NOTICE: 3,
    /** Console will show debug messages (ie: player events) */
    DEBUG: 2,
    /** Console will show verbose messages (ie: Http Requests) */
    VERBOSE: 1
  },

  /**
   * Enum for events
   * @enum
   */
  Event: {
    /** Sent each time a messaged is issued, even if log level does not handle it. */
    LOG: 'log'
  },

  /**
   * Only logs of this imporance or higher will be shown.
   * @default youbora.Log.Levels.ERROR
   * @see {@link youbora.Log.Levels}
   */
  logLevel: 5,

  /**
   * If true, console logs will always be outputed without colors (for debbugin in devices).
   * @default false
   */
  plainLogs: false,

  /**
   * Returns a console message
   *
   * @private
   * @param {(string|error|array)} msg Message string, error object or array of messages.
   * @param {Log.Levels} [level=Log.Levels.NOTICE] Defines the level of the error sent.
   * Only errors with higher or equal level than Log.logLevel will be displayed.
   * @param {string} [color=darkcyan] Color of the header
   * @see {@link Youbora.Log.debugLevel}
   */
  report: function (msg, level, color) {
    if (typeof console !== 'undefined' && console.log && typeof document !== 'undefined') {
      level = level || Log.Level.NOTICE
      color = color || 'darkcyan'

      var letters = {
        5: 'e', // Error
        4: 'w', // Warning
        3: 'n', // Notice
        2: 'd', // Debug
        1: 'v' // Verbose
      }

      var letter = letters[level]
      var prefix = '[Youbora]' + Log._getCurrentTime() + ' ' + letter + ':'

      this.emit('log', { level: level, msg: msg, prefix: prefix })

      // Show messages in actual console if level is enought
      if (Log.logLevel <= level) {
        if (Log.plainLogs || document.documentMode) { // document.documentMode exits only in IE
          // Plain log for IE and devices
          Log._plainReport(msg, prefix)
        } else {
          // choose log method
          var logMethod
          if (level === Log.Level.ERROR && console.error) {
            logMethod = console.error
          } else if (level === Log.Level.WARNING && console.warn) {
            logMethod = console.warn
          } else if (level === Log.Level.DEBUG && console.debug) {
            logMethod = console.debug
          } else {
            logMethod = console.log
          }

          // print message
          prefix = '%c' + prefix
          if (isArray(msg)) {
            msg.splice(0, 0, prefix, 'color: ' + color)
            logMethod.apply(console, msg)
          } else {
            logMethod.call(console, prefix, 'color: ' + color, msg)
          }
        }
      }
    }
  },

  /**
   * Returns the current time in format hh:mm:ss.mmm (with trailing 0s)
   * @private
   * @return {string} Current time.
   */
  _getCurrentTime: function () {
    var d = new Date()
    var hh = ('0' + d.getDate()).slice(-2)
    var mm = ('0' + d.getMinutes()).slice(-2)
    var ss = ('0' + d.getSeconds()).slice(-2)
    var mmm = ('00' + d.getMilliseconds()).slice(-3)
    return '[' + hh + ':' + mm + ':' + ss + '.' + mmm + ']'
  },

  /**
   * Returns a console message without style
   *
   * @private
   * @param {(string|object|array)} msg Message string, object or array of messages.
   * @param {string} prefix Prefix of the message.
   */
  _plainReport: function (msg, prefix) {
    if (msg instanceof Array) {
      for (var m in msg) {
        Log._plainReport(msg[m], prefix)
      }
    } else {
      if (typeof msg === 'string') {
        console.log(prefix + ' ' + msg)
      } else {
        console.log(prefix + ' <next line>')
        console.log(msg)
      }
    }
  },

  /**
   * Sends an error (level 1) console log.
   * Supports unlimited arguments: ("this", "is", "a", "message")
   * @memberof $YB
   * @see {@link $YB.report}
   */
  error: function () {
    Log.report([].slice.call(arguments), Log.Level.ERROR, 'darkred')
  },

  /**
   * Sends a warning (level 2) console log.
   * Supports unlimited arguments: ("this", "is", "a", "message")
   * @memberof $YB
   * @see {@link $YB.report}
   */
  warn: function () {
    Log.report([].slice.call(arguments), Log.Level.WARNING, 'darkorange')
  },

  /**
   * Sends a notice (level 3) console log.
   * Supports unlimited arguments: ("this", "is", "a", "message")
   * @memberof $YB
   * @see {@link $YB.report}
   */
  notice: function () {
    Log.report([].slice.call(arguments), Log.Level.NOTICE, 'darkgreen')
  },

  /**
   * Sends a debug message (level 4) to console.
   * Supports unlimited arguments: ("this", "is", "a", "message")
   * @memberof $YB
   * @see {@link $YB.report}
   */
  debug: function () {
    Log.report([].slice.call(arguments), Log.Level.DEBUG, 'indigo')
  },

  /**
   * Sends a verbose message (level 5) to console.
   * Supports unlimited arguments: ("this", "is", "a", "message")
   * @memberof $YB
   * @see {@link $YB.report}
   */
  verbose: function () {
    Log.report([].slice.call(arguments), Log.Level.VERBOSE, 'navy')
  },

  /**
   * This function is automatically executed at youboralib's init.
   * Will search inside window.location.search for attribute 'youbora-debug=X'.
   * X can have one of these values, that will modify LogLevel.
   * 6: SILENT,
   * 5: ERROR,
   * 4: WARNING,
   * 3: NOTICE,
   * 2: DEBUG,
   * 1: VERBOSE
   *
   * If youbora-console=plain is present, plainLogs will be set to true.
   */
  loadLevelFromUrl: function () {
    if (typeof window !== 'undefined' && window.location) {
      this._parseLevelFromUrl(window.location.search)
    }
  },

  _parseLevelFromUrl: function (url) {
    if (url) {
      var m = /\?.*&*youbora-debug=(.+)/i.exec(url)
      if (m !== null) {
        Log.logLevel = m[1]
      }

      var m2 = /\?.*&*youbora-debug=plain/i.exec(url)
      if (m2 !== null) {
        Log.plainLogs = true
      }
    }
  }
}

module.exports = Log


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(1);
var IE8_DOM_DEFINE = __webpack_require__(113);
var toPrimitive = __webpack_require__(27);
var dP = Object.defineProperty;

exports.f = __webpack_require__(7) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var assign = __webpack_require__(149)
var createObject = __webpack_require__(374)

var YouboraObject = function () { }

YouboraObject.prototype = {
  /**
   * A base class that other Classes should inherit from.
   * It has a no-op constructor intended to be overridden by classes that extend from this.
   *
   * @constructs YouboraObject
   * @abstract
   * @memberof youbora
   */
  constructor: function () { }
}

/**
 * This method allows the extension of the current class, emulating 1-level inheritance.
 * It is inspired by Backbone's extend, but removing all references to underscore.
 *
 * @see http://backbonejs.org/#Model-extend
 *
 * @example
 * var A = YouboraObject.extend({ a: 1, b: 1, c: { d: 0 } });
 * var a = new A(); // { a: 1, b: 1, c: { d: 0 } }
 *
 * var B = A.extend({ b: 2, c: { e: 3 } });
 * var b = new B(); // { a: 1, b: 2, c: { e: 3 } }
 *
 * @param  {Object} protoProps  Prototype properties (available on the instances)
 * @param  {Object} staticProps Static properties (available on the contructor)
 * @return {Object}             New sub class
 */
YouboraObject.extend = function (protoProps, staticProps) {
  var parent = this
  var child

  // The constructor function for the new subclass is either defined by you
  // (the "constructor" property in your `extend` definition), or defaulted
  // by us to simply call the parent constructor.
  if (protoProps && protoProps.hasOwnProperty('constructor')) { // eslint-disable-line no-prototype-builtins
    child = protoProps.constructor
  } else {
    child = function () { return parent.apply(this, arguments) }
  }

  // Add static properties to the constructor function, if supplied.
  assign(child, parent, staticProps)

  // Set the prototype chain to inherit from `parent`, without calling
  // `parent`'s constructor function and add the prototype properties.
  child.prototype = createObject(parent.prototype)
  if (protoProps) assign(child.prototype, protoProps)
  child.prototype.constructor = child

  // Set a convenience property in case the parent's prototype is needed
  // later.
  child.__super__ = parent.prototype
  return child
}

module.exports = YouboraObject


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(28);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var Log = __webpack_require__(8)

/**
 * This static class provides utility methods.
 *
 * @class
 * @static
 * @memberof youbora
 */
var Util = {
  /**
     * Strip {protocol}:// and // from the begining of the string.
     *
     * @param {string} url
     * @returns {string} stripped url
     */
  stripProtocol: function (url) {
    var strippedUrl = url
    try {
      strippedUrl = url.replace(/^(.*?:\/\/|\/\/)/i, '')
    } catch (err) {
      Log.warn(err)
    }
    return strippedUrl
  },

  /**
     * Adds specific protocol. ie: [http://]nqs.nice264.com
     *
     * @param {string} url Domain of the service. Without protocol. ie: 'nqs.nice264.com'.
     * @param {boolean|null} [httpSecure]
     * If true will add https, if false http.
     * Otherwise will add //
     * @return Return the complete service URL.
     */
  addProtocol: function (url, httpSecure) {
    var serviceUrl = 'http://localhost/'
    try {
      serviceUrl = 'http://' + url
      if (httpSecure || (typeof window !== 'undefined' && window.location.protocol.indexOf('https') === 0)) {
        serviceUrl = 'https://' + url
      } else if (typeof window !== 'undefined' && window.location.protocol.indexOf('http') === 0) {
        serviceUrl = '//' + url
      }
    } catch (err) {
      Log.warn(err)
    }
    return serviceUrl
  },

  /**
     * Return n if it isn't NaN, negative, Infinity, null or undefined.
     * In any other case, return def.
     *
     * @param {mixed} n Number to be parsed.
     * @param {number} def Number to return if n is not correct.
     */
  parseNumber: function (n, def) {
    return (!isNaN(n) &&
      n >= 0 &&
      n !== Infinity &&
      n !== -Infinity &&
      n !== null &&
      typeof n !== 'undefined')
      ? n
      : def
  },

  /**
     * This utility method will add most of the HTML5 common event listeners to the player sent.
     * This common events will be listened: 'canplay', 'buffering', 'waiting', 'ended', 'play',
     * 'playing', 'pause', 'resume', 'error', 'abort', 'seek', 'seeking', 'seeked', 'stalled',
     * 'dispose', 'loadeddata', 'loadstart'.
     *
     * Events will be reported as DEBUG level messages.
     *
     * @param {object|function} o Object to attach the events.
     * @param {array} [extraEvents]
     * An array of extra events to watch. ie:  ['timeupdate', 'progress'].
     * If the first item is null, no common events will be added.
     * @param {function} [report] Callback function called to report events.
     * Default calls Log.debug()
     */
  logAllEvents: function (o, extraEvents, report) {
    try {
      if (Log.logLevel <= Log.Level.DEBUG) {
        report = report || function (e) {
          Log.debug('Event: ' + e.type)
        }

        var playerEvents = [
          'canplay', 'buffering', 'waiting', 'ended', 'play', 'playing',
          'pause', 'resume', 'error', 'abort', 'seek', 'seeking', 'seeked',
          'stalled', 'dispose', 'loadeddata', 'loadstart'
        ]
        if (extraEvents) {
          if (extraEvents[0] === null) {
            extraEvents.shift()
            playerEvents = extraEvents
          } else {
            playerEvents = playerEvents.concat(extraEvents)
          }
        }

        for (var i = 0; i < playerEvents.length; i++) {
          if (typeof o === 'function') {
            o.call(window, playerEvents[i], report)
          } else if (o.on) {
            o.on(playerEvents[i], report)
          } else if (o.addEventListener) {
            o.addEventListener(playerEvents[i], report)
          }
        }
      }
    } catch (err) {
      Log.error(err)
    }
  },

  /**
     * Builds a string that represents the rendition.
     *
     * The returned string will have the following format: <width>x<height>@bitrate<suffix?>.
     * If either the width or height are < 1, only the bitrate will be returned.
     * If bitrate is < 1, only the dimensions will be returned.
     * If bitrate is < and there is no dimensions, a null will be returned.
     * The bitrate will also have one of the following suffixes dependin on its
     * magnitude: bps, Kbps, Mbps
     *
     * @param {any} width The width of the asset. If only 1 argument is sent, it will be treated
     * as bitrate.
     * @param {any} height The height of the asset.
     * @param {any} bitrate The indicated bitrate (in the manifest) of the asset.
     * @returns {string} A string with the following format: <width>x<height>@<bitrate><suffix>
     */
  buildRenditionString: function (width, height, bitrate) {
    if (arguments.length === 1) {
      bitrate = width
      width = null
      height = null
    }

    var ret = null
    if (width && height) {
      ret = width + 'x' + height
    }

    if (typeof bitrate === 'number' && !isNaN(bitrate) && bitrate >= 1) {
      if (ret) {
        ret += '@'
      } else {
        ret = ''
      }

      if (bitrate < 1e3) {
        ret += Math.round(bitrate) + 'bps'
      } else if (bitrate < 1e6) {
        bitrate = Math.round(bitrate / 1e3)
        ret += bitrate + 'Kbps'
      } else {
        bitrate = Math.round(bitrate / 1e4) / 1e2
        ret += bitrate + 'Mbps'
      }
    }
    return ret
  },

  /**
     * Returns a params dictionary with the error values.
     *
     * @param {String|Object} [code] Error Code, if an object is sent, it will be treated as params.
     * @param {String} [msg] Error Message
     * @param {Object} [metadata] Object defining error metadata
     * @param {String} [level] Level of the error. Currently supports 'error' and 'fatal'
     * @returns {Object} Key:value params.
     */
  buildErrorParams: function (code, msg, metadata, level) {
    var params = {}
    if (typeof code === 'object' && code !== null) {
      params = code
    } else {
      params.errorCode = code || 'FAILURE'
      params.msg = msg || params.errorCode
      params.errorMetadata = metadata
      params.errorLevel = level
    }
    return params
  },

  /**
     * Returns a boolean indicating if more than the desired % of pixels are on screen.
     *
     * @param {Object} [player] Player object
     * @param {Number} [screenPercent] Threshold % of pixels on screen to return true.
     * @returns {Boolean} Its on screen or not.
     */
  calculateAdViewability: function (player, screenPercent) {
    var isVisible = true
    if (typeof window !== 'undefined' && player && typeof player.getBoundingClientRect === 'function') {
      var box = player.getBoundingClientRect()
      // 100% outside the window cases
      if (box.top >= window.innerHeight || box.bottom <= 0 ||
        box.right <= 0 || box.left >= window.innerWidth) {
        isVisible = false
      } else {
        var pixels = Math.trunc(box.height * box.width)
        var x1 = box.top > 0 ? box.top : 0
        var x2 = box.bottom > window.innerHeight ? window.innerHeight : box.bottom
        var y1 = box.left > 0 ? box.left : 0
        var y2 = box.right > window.innerWidth ? window.innerWidth : box.right
        var inScreenPixels = (y2 - y1) * (x2 - x1)
        // more than screenPercent of pixels (by default 50%)
        isVisible = inScreenPixels * 100 > pixels * (screenPercent || 50)
      }
    }
    return isVisible
  },

  getMetricsFrom: function (op1, op2) {
    var metrics = op1 || op2
    for (var metric in metrics) {
      if (typeof metrics[metric] !== 'object' || !metrics[metric].value) {
        var temporal = {}
        // temporal.oper = 'SUM' //default one?
        temporal.value = metrics[metric]
        metrics[metric] = temporal
      }
    }
    return metrics
  },

  // The following methods replace core js functionallity to ensure compatibility in old versions.
  assign: __webpack_require__(149),
  isArray: __webpack_require__(106)
}

module.exports = Util


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(9);
var createDesc = __webpack_require__(39);
module.exports = __webpack_require__(7) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var hide = __webpack_require__(14);
var has = __webpack_require__(17);
var SRC = __webpack_require__(40)('src');
var $toString = __webpack_require__(170);
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(21).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var fails = __webpack_require__(3);
var defined = __webpack_require__(28);
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(56);
var defined = __webpack_require__(28);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(57);
var createDesc = __webpack_require__(39);
var toIObject = __webpack_require__(18);
var toPrimitive = __webpack_require__(27);
var has = __webpack_require__(17);
var IE8_DOM_DEFINE = __webpack_require__(113);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(7) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(17);
var toObject = __webpack_require__(11);
var IE_PROTO = __webpack_require__(80)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.12' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(12);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(3);

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var AdPosition = __webpack_require__(375)
var Adapter = __webpack_require__(75)
var ManifestError = __webpack_require__(377)
var Service = __webpack_require__(378)
var WillSendEvent = __webpack_require__(379)
var AdInsertionType = __webpack_require__(380)
/**
 * This static class englobes youbora constants.
 *
 * @class
 * @static
 * @memberof youbora
 */
var Constants = {
  AdPosition: AdPosition,
  ManifestError: ManifestError,
  Service: Service,
  WillSendEvent: WillSendEvent,
  AdInsertionType: AdInsertionType,
  Adapter: Adapter
}

module.exports = Constants


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(0);
var core = __webpack_require__(21);
var fails = __webpack_require__(3);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(22);
var IObject = __webpack_require__(56);
var toObject = __webpack_require__(11);
var toLength = __webpack_require__(6);
var asc = __webpack_require__(96);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

/* global  atv, XMLHttpRequest, ActiveXObject */
var YouboraObject = __webpack_require__(10)
var Log = __webpack_require__(8)
var Util = __webpack_require__(13)

var YBRequest = YouboraObject.extend(
  /** @lends youbora.YBRequest.prototype */
  {
    /**
     * YBYBRequest class will wrap XmlHttpRequest and extend its functionality, allowing youbora
     * to manage queues, blockers and retries.
     *
     * @constructs YBRequest
     * @extends youbora.Object
     * @memberof youbora
     *
     * @param {string} host URL of the request. ie: a-fds.youborafds01.com
     * @param {string} [service] Name of the service. ie '/start'
     * @param {Object} [params] Object of key:value params.
     * @param {Object} [options] Object with custom options.
     * @param {string} [options.method="GET"] Specifies the method of the request. ie: "GET", "HEAD".
     * @param {string} [options.requestHeaders] Object with options of requestHeaders.
     * ie: { header: value }.
     * @param {number} [options.retryAfter=5000] Time in ms before sending a failed request again.
     * 0 to disable.
     * @param {number} [options.maxRetries=3] Max number of retries. 0 to disable.
     * @param {bool} [options.cache=false] If false, timestamp will be added to each request to
     * prevent caching.
     */
    constructor: function (host, service, params, options) {
      /** Instance of XmlHttpRequest (or the item returned by createXHR method). */
      this.xhr = this.createXHR()

      /** Host of the request */
      this.host = host || ''

      /** Service of the request */
      this.service = service || ''

      /** Object of params of the request */
      this.params = params || {}

      /** Options of the current request */
      this.options = Util.assign({}, YBRequest.defaultOptions, options)

      /** Number of times this request has failed and retried. */
      this.retries = 0

      // Add timemark
      if (!this.options.cache) {
        this.setParam('timemark', new Date().getTime())
      }
    },

    /**
     * Creates XMLHttpRequest if it is available in the browser.
     * If not, it tries to create an ActiveXObject XMLHTTP item.
     * Override this function for custom environments.
     *
     * @return YBRequest handler.
     */
    createXHR: function () {
      var xhr = {}
      try {
        if (XMLHttpRequest) {
          xhr = new XMLHttpRequest()
        } else {
          xhr = new ActiveXObject('Microsoft.XMLHTTP')
        }
      } catch (err) {
        Log.error(err)
      }
      return xhr
    },

    /**
     * Returns xhr object.
     *
     * @return {XmlHttpRequest} object.
     */
    getXHR: function () {
      return this.xhr
    },

    getResponse: function () {
      return this.xhr.response
    },

    getResponseText: function () {
      return this.xhr.responseText
    },

    getResponseHeaders: function () {
      return this.xhr.getAllResponseHeaders()
    },

    /** Returns the complete formed url of the request url+service+params. */
    getUrl: function () {
      return this.host + this.service + this.getParamString()
    },

    /**
     * Wraps this.getHXR.addEventListener.
     * Accepts a callback that receives (this YBRequest, event)
     */
    on: function (event, callback, callbackParams) {
      if (this.xhr.addEventListener) {
        this.xhr.addEventListener(event, callback.bind(this, this, callbackParams))
      } else {
        if (event === YBRequest.Event.SUCCESS) {
          this.xhr.onreadystatechange = function () {
            if (this.xhr.readyState === 4) {
              callback.bind(this, this, callbackParams)
            }
          }.bind(this)
        }
      }
      return this
    },

    /** Wraps this.getHXR.removeEventListener */
    off: function (event, callback) {
      this.xhr.removeEventListener(event, callback)
      return this
    },

    /**
     * Returns the params of the request, stringified.
     * ie: '?pluginVersion=5.1.0&systemCode=nicetv'.
     * @return {string} Concatenated Params
     */
    getParamString: function () {
      try {
        var params = '?'
        for (var key in this.params) {
          var param = this.params[key]
          if (param !== null && typeof param === 'object') {
            var string = JSON.stringify(param)
            if (string !== '{}') {
              params += encodeURIComponent(key) + '=' + encodeURIComponent(string) + '&'
            }
          } else if (param !== null && typeof param !== 'undefined' && param !== '') {
            params += encodeURIComponent(key) + '=' + encodeURIComponent(param) + '&'
          }
        }
        return params.slice(0, -1)
      } catch (err) {
        Log.error(err)
        return ''
      }
    },

    /**
     * Returns the value of the given param, or undefined.
     * @param {string} key Name of the param.
     * @return {any}
     */
    getParam: function (key) {
      return this.params[key]
    },

    /**
     * Add or set a parameter for the request.
     * ie: if you want to add 'username=user' use setParam('username', 'user').
     * @param {string} key Name of the param.
     * @param {string} value Name of the param.
     * @return this
     */
    setParam: function (key, value) {
      this.params[key] = value
      return this
    },

    setBody: function (body) {
      this.body = body
    },

    /**
     * Sends the request.
     *
     * @return returns xhr.send()
     */
    send: function () {
      try {
        this.xhr.open(this.options.method, this.getUrl(), true)

        // Add custom headers
        if (this.options.requestHeaders) {
          for (var key in this.options.requestHeaders) {
            if (this.options.requestHeaders.hasOwnProperty(key)) { // eslint-disable-line no-prototype-builtins
              this.xhr.setRequestHeader(key, this.options.requestHeaders[key])
            }
          }
        }

        // Add retries system
        if (this.options.retryAfter > 0 && this.options.maxRetries > 0) {
          var genericError = function () {
            if (this.retries >= this.options.maxRetries) {
              Log.error('Aborting failed request "' + this.service + '". Max retries reached.')
            } else {
              Log.warn('YBRequest "' + this.service + '" failed. Retry ' + (this.retries + 1) + ' of ' +
                this.options.maxRetries + ' in ' + this.options.retryAfter + 'ms.')
              try {
                setTimeout(function () {
                  this.retries += 1
                  this.send()
                }.bind(this), this.options.retryAfter)
              } catch (err) {
                if (typeof atv !== 'undefined') {
                  atv.setTimeout(function () {
                    this.retries += 1
                    this.send()
                  }.bind(this), this.options.retryAfter)
                } else {
                  Log.error(err)
                }
              }
            }
          }
          if (this.retries === 0) {
            this.on(YBRequest.Event.ERROR, genericError.bind(this))
          }
        }

        // Log XHR
        if (Log.logLevel <= Log.Level.VERBOSE) {
          Log.verbose('XHR Req: ' + this.getUrl())
        }

        // Register 'on every' listeners
        for (var event in YBRequest._globalListeners) {
          YBRequest._globalListeners[event].forEach(function (callback) {
            this.on(event, callback)
          }.bind(this))
        }

        // Send
        return this.xhr.send(this.body)
      } catch (err) {
        Log.error(err)
      }
    }
  },

  /** @lends youbora.YBRequest */
  {
    /**
     * List of events that could be fired from XHR
     * @enum
     */
    Event: {
      /** Request successful */
      SUCCESS: 'load',
      /** Request successful */
      LOAD: 'load', // Native JS
      /** Request returned error */
      ERROR: 'error',
      /** Request aborted */
      ABORT: 'abort'
    },

    /**
     * This static property includes the default values for the options. In case you do not define
     * one of them in the constructor, these values will be used instead.
     *
     * @param {string} [defaultOptions.method="GET"] Specifies the method of the request.
     * ie: "GET", "HEAD".
     * @param {string} [defaultOptions.requestHeaders] Object with options of requestHeaders.
     * ie: { header: value }.
     * @param {number} [defaultOptions.retryAfter=5000] Time in ms before sending a failed request
     * again. 0 to disable.
     * @param {number} [defaultOptions.maxRetries=3] Max number of retries. 0 to disable.
     * @param {bool} [defaultOptions.cache=false] If false, timemark will be added to each request
     * to prevent caching.
     */
    defaultOptions: {
      method: 'GET',
      requestHeaders: {},
      maxRetries: 3,
      retryAfter: 5000,
      cache: false
    },

    /** @private */
    _globalListeners: {},

    /**
     * Adds a callback to every instance.
     * @param {string} event Name of the event.
     * @param {function} callback Callback of the event.
     */
    onEvery: function (event, callback) {
      YBRequest._globalListeners[event] = YBRequest._globalListeners[event] || []
      YBRequest._globalListeners[event].push(callback)
    },

    /**
     * Removes a global callback
     * @param {string} event Name of the event.
     * @param {function} callback Callback of the event.
     */
    offEvery: function (event, callback) {
      if (YBRequest._globalListeners[event]) {
        var index = YBRequest._globalListeners[event].indexOf(callback)
        if (index !== -1) {
          YBRequest._globalListeners[event].splice(index, 1)
        }
      }
    }
  })

module.exports = YBRequest


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if (__webpack_require__(7)) {
  var LIBRARY = __webpack_require__(35);
  var global = __webpack_require__(2);
  var fails = __webpack_require__(3);
  var $export = __webpack_require__(0);
  var $typed = __webpack_require__(70);
  var $buffer = __webpack_require__(104);
  var ctx = __webpack_require__(22);
  var anInstance = __webpack_require__(46);
  var propertyDesc = __webpack_require__(39);
  var hide = __webpack_require__(14);
  var redefineAll = __webpack_require__(48);
  var toInteger = __webpack_require__(24);
  var toLength = __webpack_require__(6);
  var toIndex = __webpack_require__(141);
  var toAbsoluteIndex = __webpack_require__(42);
  var toPrimitive = __webpack_require__(27);
  var has = __webpack_require__(17);
  var classof = __webpack_require__(51);
  var isObject = __webpack_require__(4);
  var toObject = __webpack_require__(11);
  var isArrayIter = __webpack_require__(93);
  var create = __webpack_require__(43);
  var getPrototypeOf = __webpack_require__(20);
  var gOPN = __webpack_require__(44).f;
  var getIterFn = __webpack_require__(95);
  var uid = __webpack_require__(40);
  var wks = __webpack_require__(5);
  var createArrayMethod = __webpack_require__(30);
  var createArrayIncludes = __webpack_require__(60);
  var speciesConstructor = __webpack_require__(59);
  var ArrayIterators = __webpack_require__(98);
  var Iterators = __webpack_require__(53);
  var $iterDetect = __webpack_require__(65);
  var setSpecies = __webpack_require__(45);
  var arrayFill = __webpack_require__(97);
  var arrayCopyWithin = __webpack_require__(130);
  var $DP = __webpack_require__(9);
  var $GOPD = __webpack_require__(19);
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var Map = __webpack_require__(136);
var $export = __webpack_require__(0);
var shared = __webpack_require__(55)('metadata');
var store = shared.store || (shared.store = new (__webpack_require__(139))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var YouboraObject = __webpack_require__(10)
var isArray = __webpack_require__(106)

/**
 * This class extends YouboraObject, adding event emitting/listening functionalities.
 *
 * @constructs Emitter
 * @extends youbora.YouboraObject
 * @memberof youbora
 */
var Emitter = YouboraObject.extend(
  /** @lends youbora.Emitter.prototype */
  {
    /**
     * Sets a listener to a given event. Use {@link emit} to trigger those events.
     * Pass '*' to listen ALL events.
     *
     * @param {string} event Name of the event.
     * @param {function} callback Callback of the event. Receives event and data.
     * @return this
     */
    on: function (event, callback) {
      this._listeners = this._listeners || {}
      if (typeof callback === 'function') {
        this._listeners[event] = this._listeners[event] || []
        this._listeners[event].push(callback)
        return this
      }
    },

    /**
     * Removes given callback from the listeners of this object.
     *
     * @param {string} event Name of the event.
     * @param {function} callback Callback of the event.
     * @return this
     */
    off: function (event, callback) {
      this._listeners = this._listeners || {}

      if (this._listeners[event]) {
        var index = this._listeners[event].indexOf(callback)
        if (index !== -1) {
          this._listeners[event].splice(index, 1)
        }
      }
      return this
    },

    /**
     * Emits given event, triggering all the associated callbacks.
     *
     * @param {string} event Name of the event.
     * @param {object} [data] Custom data to be sent to the callbacks.
     * @return this
     */
    emit: function (event, data) {
      this._listeners = this._listeners || {}
      data = data || {}

      if (isArray(this._listeners[event])) {
        this._listeners[event].forEach(this._eachCallback.bind(this, event, data))
      }
      if (isArray(this._listeners['*'])) {
        this._listeners['*'].forEach(this._eachCallback.bind(this, event, data))
      }
      return this
    },

    /**
     * Travels through the listener list and executes them them.
     *
     * @private
     */
    _eachCallback: function (event, data, callback) {
      if (typeof callback === 'function') {
        var callbackArguments = {
          type: event,
          data: data,
          target: this
        }
        callback(callbackArguments)
      }
    }
  }
)

module.exports = Emitter


/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(40)('meta');
var isObject = __webpack_require__(4);
var has = __webpack_require__(17);
var setDesc = __webpack_require__(9).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(3)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(5)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(14)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var Emitter = __webpack_require__(34)

var Transform = Emitter.extend(
  /** @lends youbora.Transform.prototype */
  {
    /**
     * Transform classes in YOUBORA help the library parse and work with data.
     *
     * A Transform makes some kind of task that may block requests until it's done, or applies changes
     * to the requests right before they're finally sent.
     *
     * {@link ResourceTransform}, {@link ViewTransform}... all extend from this class.
     *
     * @constructs Transform
     * @extends youbora.Emitter
     * @memberof youbora
     * @abstract
     */
    constructor: function () {
      /**
       * Whether the Transform is currently working or not.
       * @private
       */
      this._isBusy = true
      this._sendRequest = true
      this.transformName = 'Transform'
    },

    /**
     * Override this method to transform info.
     *
     * @param {YBRequest} request Request to transform.
     */
    parse: function (request) { },

    /**
     * By default this will return true until {@link #done()} is called. This can be overridden
     * in order to block {@link Request}s based on any criteria. For instance its
     * {@link Request#getService()}.
     *
     * @param {YBRequest} request Request to transform.
     * @return {bool} True if queue shall be blocked.
     */
    isBlocking: function (request) {
      return this._isBusy
    },

    /**
     * Emits DONE event
     */
    done: function () {
      this._isBusy = false
      this.emit(Transform.Event.DONE)
    },

    // offline
    hasToSend: function (request) {
      return this._sendRequest
    },

    getState: function () {
      if (!this._sendRequest) {
        return this.STATE_OFFLINE
      }
      if (this._isBusy) {
        return this.STATE_BLOCKED
      }
      return this.STATE_NO_BLOCKED
    }

  },

  /** @lends youbora.Transform */
  {
    // Static members

    STATE_OFFLINE: 2,
    STATE_BLOCKED: 1,
    STATE_NO_BLOCKED: 0,
    /**
     * List of events that could be fired from this class.
     * @enum
     */
    Event: {
      /** Notifies that this Transform is done processing. */
      DONE: 'done'
    }
  }
)

module.exports = Transform


/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 40 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(115);
var enumBugKeys = __webpack_require__(81);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(24);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(1);
var dPs = __webpack_require__(116);
var enumBugKeys = __webpack_require__(81);
var IE_PROTO = __webpack_require__(80)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(78)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(82).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(115);
var hiddenKeys = __webpack_require__(81).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var dP = __webpack_require__(9);
var DESCRIPTORS = __webpack_require__(7);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(22);
var call = __webpack_require__(128);
var isArrayIter = __webpack_require__(93);
var anObject = __webpack_require__(1);
var toLength = __webpack_require__(6);
var getIterFn = __webpack_require__(95);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(15);
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(9).f;
var has = __webpack_require__(17);
var TAG = __webpack_require__(5)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(23);
var TAG = __webpack_require__(5)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var defined = __webpack_require__(28);
var fails = __webpack_require__(3);
var spaces = __webpack_require__(84);
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var YouboraObject = __webpack_require__(10)

var Chrono = YouboraObject.extend(
  /** @lends youbora.Chrono.prototype */
  {
    /**
     * This class calculates time lapses between two points in time.
     *
     * @constructs Chrono
     * @extends youbora.YouboraObject
     * @memberof youbora
     */
    constructor: function () {
      this.reset()
    },

    /** Reset chrono values. */
    reset: function () {
      /** Start time */
      this.startTime = 0

      /** Stop time */
      this.stopTime = 0

      /** Pause time */
      this.pauseTime = 0

      /** Offset to be added to deltaTime and stop. in ms. */
      this.offset = 0
    },

    /**
     * Returns the time between start() and the last stop() in ms. Returns -1 if start wasn't
     * called.
     * @param {boolean} [stop=true] If true, it will force a stop() if it wasn't called before.
     * @return {number} Time lapse in ms.
     */
    getDeltaTime: function (stop) {
      var retValue = -1
      var now = new Date().getTime()
      if (this.startTime) {
        if (stop && !this.stopTime) {
          this.stopTime = now
        }
        var tempOffset = this.pauseTime ? now - this.pauseTime : 0
        var tempStop = this.stopTime ? this.stopTime : now
        retValue = (this.offset - tempOffset) + (tempStop - this.startTime)
      }
      return retValue
    },

    /**
     * Starts the chrono.
     */
    start: function () {
      this.startTime = new Date().getTime()
      this.stopTime = 0
      this.offset = 0
    },

    /**
     * Stops the timer and returns current delta time.
     * @return {number} Returns the delta time
     */
    stop: function () {
      if (this.pauseTime) this.resume()
      this.stopTime = new Date().getTime()
      return this.startTime ? this.offset + (this.stopTime - this.startTime) : -1
    },

    pause: function () {
      this.pauseTime = new Date().getTime()
    },

    resume: function () {
      this.offset -= (new Date().getTime() - this.pauseTime)
      this.pauseTime = 0
    },

    /**
     * Creates a copy of the chrono.
     */
    clone: function () {
      var chrono = new Chrono()
      chrono.startTime = this.startTime
      chrono.stopTime = this.stopTime
      chrono.offset = this.offset
      return chrono
    }
  }
)

module.exports = Chrono


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(21);
var global = __webpack_require__(2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(35) ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(23);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 57 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(1);
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(1);
var aFunction = __webpack_require__(12);
var SPECIES = __webpack_require__(5)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(18);
var toLength = __webpack_require__(6);
var toAbsoluteIndex = __webpack_require__(42);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 61 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(23);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(24);
var defined = __webpack_require__(28);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(4);
var cof = __webpack_require__(23);
var MATCH = __webpack_require__(5)('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(5)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__(51);
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(132);
var redefine = __webpack_require__(15);
var hide = __webpack_require__(14);
var fails = __webpack_require__(3);
var defined = __webpack_require__(28);
var wks = __webpack_require__(5);
var regexpExec = __webpack_require__(99);

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(15);
var redefineAll = __webpack_require__(48);
var meta = __webpack_require__(36);
var forOf = __webpack_require__(47);
var anInstance = __webpack_require__(46);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var $iterDetect = __webpack_require__(65);
var setToStringTag = __webpack_require__(50);
var inheritIfRequired = __webpack_require__(85);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var hide = __webpack_require__(14);
var uid = __webpack_require__(40);
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(35) || !__webpack_require__(3)(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete __webpack_require__(2)[K];
});


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(0);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(0);
var aFunction = __webpack_require__(12);
var ctx = __webpack_require__(22);
var forOf = __webpack_require__(47);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(372).version


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var Event = __webpack_require__(376)

var Adapter = {
  Event: Event
}
module.exports = Adapter


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var Emitter = __webpack_require__(34)

var Parser = Emitter.extend(
  /** @lends youbora.Parser.prototype */
  {
    /**
     * Class that asynchronously parses a resource in order to get to the URL.
     *
     * Since the CDN detection is performed with the resource url, it is essential that this
     * resource url is pointing to the CDN that is actually hosting the manifest.
     *
     * @constructs Parser
     * @extends youbora.Emitter
     * @memberof youbora
     */
    constructor: function (headers) {
      this._realResource = null
      this._lastManifest = null
      this._transportFormat = null
      this.iterations = 3
      this._headers = headers
    },

    /**
     * Emits DONE event
     */
    done: function () {
      this.iterations = 3
      this.emit(Parser.Event.DONE)
    },

    /**
     * Starts the parsing from the given resource.
     *
     * @param {string} resource The resource url.
     * @param {object} lastManifest The manifest request response if parsed previously.
     */
    parse: function (resource, lastManifest) { },

    /**
     * Get the parsed resource. Will be null/undefined if parsing is not yet started and can be a partial
     * (an intermediate manifest) result if the parser is still running.
     *
     * @return {string} The parsed resource.
     */
    getResource: function () {
      return this._realResource
    },

    /**
     * Get the transport format. Will be null/undefined if parsing is not yet started or is still running.
     *
     * @return {string} The parsed resource.
     */
    getTransportFormat: function () {
      return this._transportFormat
    },

    /**
     * Get the last request manifest response object used to parse the resource.
     * Will be null/undefined if parsing is not yet started and can be a partial
     * (an intermediate manifest) result if the parser is still running.
     *
     * @return {object} The last manifest request response used to parse the resource.
     */
    getLastManifest: function () {
      return this._lastManifest
    },

    /**
     * Get the result of checking a previous manifest to detect if the parser should be used or not.
     *
     * @param {string} resource The resource url.
     * @return {object} The last manifest request response used to parse the resource.
     */
    shouldExecute: function (lastManifest) {
      return true
    }
  },

  /** @lends youbora.Parser */
  {
    // Static members

    /**
     * List of events that could be fired from this class.
     * @enum
     */
    Event: {
      /** Notifies that this DashParser is done processing. */
      DONE: 'done'
    }
  }
)

module.exports = Parser


/***/ }),
/* 77 */
/***/ (function(module, exports) {

/**
 * List of transport formats
 *   - TS (MPEG-2 TS)
 *   - MP4 (Fragmented MP4)
 *   - CMF
 */
var TransportFormat = {
  MP4: 'MP4',
  MPEG2: 'TS',
  CMF: 'CMF'
}
module.exports = TransportFormat


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var document = __webpack_require__(2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(21);
var LIBRARY = __webpack_require__(35);
var wksExt = __webpack_require__(114);
var defineProperty = __webpack_require__(9).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(55)('keys');
var uid = __webpack_require__(40);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 81 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(4);
var anObject = __webpack_require__(1);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(22)(Function.call, __webpack_require__(19).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 84 */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var setPrototypeOf = __webpack_require__(83).set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(24);
var defined = __webpack_require__(28);

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};


/***/ }),
/* 87 */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};


/***/ }),
/* 88 */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(35);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(15);
var hide = __webpack_require__(14);
var Iterators = __webpack_require__(53);
var $iterCreate = __webpack_require__(90);
var setToStringTag = __webpack_require__(50);
var getPrototypeOf = __webpack_require__(20);
var ITERATOR = __webpack_require__(5)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(43);
var descriptor = __webpack_require__(39);
var setToStringTag = __webpack_require__(50);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(14)(IteratorPrototype, __webpack_require__(5)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(64);
var defined = __webpack_require__(28);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(5)('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(53);
var ITERATOR = __webpack_require__(5)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(9);
var createDesc = __webpack_require__(39);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(51);
var ITERATOR = __webpack_require__(5)('iterator');
var Iterators = __webpack_require__(53);
module.exports = __webpack_require__(21).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(259);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(11);
var toAbsoluteIndex = __webpack_require__(42);
var toLength = __webpack_require__(6);
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(37);
var step = __webpack_require__(131);
var Iterators = __webpack_require__(53);
var toIObject = __webpack_require__(18);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(89)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var regexpFlags = __webpack_require__(58);

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var at = __webpack_require__(63)(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(22);
var invoke = __webpack_require__(121);
var html = __webpack_require__(82);
var cel = __webpack_require__(78);
var global = __webpack_require__(2);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(23)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var macrotask = __webpack_require__(101).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(23)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(12);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var DESCRIPTORS = __webpack_require__(7);
var LIBRARY = __webpack_require__(35);
var $typed = __webpack_require__(70);
var hide = __webpack_require__(14);
var redefineAll = __webpack_require__(48);
var fails = __webpack_require__(3);
var anInstance = __webpack_require__(46);
var toInteger = __webpack_require__(24);
var toLength = __webpack_require__(6);
var toIndex = __webpack_require__(141);
var gOPN = __webpack_require__(44).f;
var dP = __webpack_require__(9).f;
var arrayFill = __webpack_require__(97);
var setToStringTag = __webpack_require__(50);
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

// No-Conflict
var previousYoubora = youbora // eslint-disable-line no-use-before-define
var youbora = {}

/**
 * This allows you to run multiple instances of YouboraLib on the same webapp.
 * After loading the new version, call `noConflict()` to get a reference to it.
 * At the same time the old version will be returned to Youbora.
 */
youbora.noConflict = function () {
  youbora = previousYoubora
  return this
}

// Info
youbora.VERSION = __webpack_require__(74)

// Polyfills
youbora.polyfills = __webpack_require__(373)
youbora.polyfills()

// Base Classes
youbora.Object = __webpack_require__(10)
youbora.Emitter = __webpack_require__(34)

// Log
youbora.Log = __webpack_require__(8)
youbora.Log.loadLevelFromUrl()

// General classes
youbora.Util = __webpack_require__(13)
youbora.HybridNetwork = __webpack_require__(150)
youbora.Chrono = __webpack_require__(54)
youbora.Timer = __webpack_require__(107)
youbora.Constants = __webpack_require__(26)

// Comm classes
youbora.Request = __webpack_require__(31)
youbora.Communication = __webpack_require__(108)

// Resource Transform classes
youbora.Transform = __webpack_require__(38)
youbora.ViewTransform = __webpack_require__(151)
youbora.ResourceTransform = __webpack_require__(152)
youbora.CdnParser = __webpack_require__(154)
youbora.HlsParser = __webpack_require__(153)
youbora.DashParser = __webpack_require__(155)
youbora.OfflineParser = __webpack_require__(157)
youbora.LocationheaderParser = __webpack_require__(156)

// Plugin Classes
youbora.Options = __webpack_require__(158)
youbora.Plugin = __webpack_require__(393)
youbora.Storage = __webpack_require__(109)
youbora.RequestBuilder = __webpack_require__(160)

// Adapters
youbora.PlayheadMonitor = __webpack_require__(164)
youbora.Adapter = __webpack_require__(111)
youbora.adapters = {}

// Infinity
youbora.Infinity = __webpack_require__(110)

// Detector classes
youbora.BackgroundDetector = __webpack_require__(161)
youbora.DeviceDetector = __webpack_require__(162)
youbora.UUIDGenerator = __webpack_require__(163)

/**
 * Register the given adapter in <youbora>.adapters.
 *
 * @param {string} key Unique adapter identifier.
 * @param {youbora.Adapter} Adapter Adapter class.
 *
 * @memberof youbora
 */
youbora.registerAdapter = function (key, Adapter) {
  this.adapters[key] = Adapter
}.bind(youbora)

/**
 * Remove the given adapter in <youbora>.adapters.
 *
 * @param {string} key Unique adapter identifier.
 *
 * @memberof youbora
 */
youbora.unregisterAdapter = function (key) {
  this.adapters[key] = null
}.bind(youbora)

module.exports = youbora


/***/ }),
/* 106 */
/***/ (function(module, exports) {

/**
 * See Array.isArray.
 * @memberof youbora.Util
 */
module.exports = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Array]'
}


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

/* global atv */
var YouboraObject = __webpack_require__(10)
var Chrono = __webpack_require__(54)

var Timer = YouboraObject.extend(
  /** @lends youbora.Timer.prototype */
  {
    /**
     * An Utility class that provides timed events in a defined time interval.
     *
     * @param {function} callback The callback to call every due interval.
     * Callback will receive lapsed ms between calls.
     * @param {int} [interval=5000] Milliseconds between each call.
     *
     * @constructs Timer
     * @extends youbora.YouboraObject
     * @memberof youbora
     */
    constructor: function (callback, interval) {
      this.callback = callback
      this.interval = interval || 5000
      this.isRunning = false
      this._timer = null

      this.chrono = new Chrono()
    },

    /**
     * Starts the timer.
     */
    start: function () {
      if (!this.isRunning) {
        this.isRunning = true
        this._setTick()
      }
    },

    /**
     * Stops the timer.
     */
    stop: function () {
      this.isRunning = false
      if (this._timer) {
        try {
          clearTimeout(this._timer)
        } catch (err) {
          if (typeof atv !== 'undefined') {
            atv.clearTimeout(this._timer)
          }
        }
      }
    },

    /**
     * Sets the next tick execution.
     * @private
     */
    _setTick: function () {
      this.chrono.start()
      try {
        this._timer = setTimeout(function () {
          this.callback(this.chrono.stop())
          this._setTick()
        }.bind(this), this.interval)
      } catch (err) {
        if (typeof atv !== 'undefined') {
          this._timer = atv.setTimeout(function () {
            this.callback(this.chrono.stop())
            this._setTick()
          }.bind(this), this.interval)
        }
      }
    }
  }
)

module.exports = Timer


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var YouboraObject = __webpack_require__(10)
var Log = __webpack_require__(8)
var YBRequest = __webpack_require__(31)
var Transform = __webpack_require__(38)

var Communication = YouboraObject.extend(
  /** @lends youbora.Communication.prototype */
  {
    /**
     * Youbora Communication implements an abstraction layer over API requests.
     * Internally, Communication implements queues of {@link Request} objects.
     * This queue can be blocked using {@link Transform}
     *
     * @constructs Communication
     * @extends youbora.YouboraObject
     * @memberof youbora
     *
     * @param {string} host The fastdata host address.
     * @param {boolean} httpSecure True for https, false for http, undefined for //.
     */
    constructor: function (pluginref) {
      /** Array of {@link Transform}, only when the array is empty the request Queues will begin sending. */
      this.transforms = []
      this.pluginRef = pluginref
      /**
       * Queue of {@link YBRequest}
       * @private
       */
      this._requests = []
    },

    /**
     * Enqueues the request provided.
     *
     * @param {YBRequest} request Request to be enqueued
     * @param {function} [callback] The defined load callback to the Request
     */
    sendRequest: function (request, callback, callbackParams) {
      if (request) {
        if (typeof callback === 'function') request.on(YBRequest.Event.SUCCESS, callback, callbackParams)
        this._registerRequest(request)
      }
    },

    /**
     * Build a generic request to the given host.
     *
     * @param {string} host Host of the service called.
     * @param {string} service A string with the service to be called. ie: '/data', '/joinTime'...
     * @param {Object} [params] Object of key:value params.
     * @param {function} [callback] The defined load callback to the Request
     */
    buildRequest: function (host, service, params, callback) {
      params = params || {}
      var request = new YBRequest(host, service, params)
      if (typeof callback === 'function') request.on(YBRequest.Event.SUCCESS, callback)
      this._registerRequest(request)
    },

    /**
     * Adds a Transform to the queue. See {@link Transform}.
     *
     * @param {RequestTransform} transform
     */
    addTransform: function (transform) {
      if (transform.parse && transform.isBlocking) {
        this.transforms.push(transform)
        transform.on(Transform.Event.DONE, this._processRequests.bind(this))
      } else {
        Log.warn(transform + ' is not a valid RequestTransform.')
      }
    },

    /**
     * Removes a {@link Transform}.
     *
     * @param {RequestTransform} transform Transform object to remove.
     */
    removeTransform: function (transform) {
      var pos = this.transforms.indexOf(transform)
      if (pos !== -1) {
        this.transforms.splice(pos, 1)
      } else {
        Log.warn('Trying to remove unexisting Transform \'' + transform + '\'.')
      }
    },

    /**
     * Adds an {@link YBRequest} to the queue of requests.
     *
     * @private
     * @param {YBRequest} request The Request to be queued.
     */
    _registerRequest: function (request) {
      if (this.pluginRef) {
        var options = this.pluginRef.options
        if (options.authToken) {
          request.options.requestHeaders.Authorization = options.authType + ' ' + options.authToken
        }
      }
      this._requests.push(request)
      this._processRequests()
    },

    /**
     * Execute pending requests in the queue. Returns rejected ones to the queue.
     * @private
     */
    _processRequests: function () {
      var workingQueue = this._requests
      this._requests = []

      var rejected = []
      while (workingQueue.length) {
        var request = workingQueue.shift()
        var transformState = this._transform(request)
        if (transformState === Transform.STATE_NO_BLOCKED) {
          if (this.pluginRef) request.host = this.pluginRef.getHost()
          request.send()
        } else if (transformState === Transform.STATE_BLOCKED) {
          rejected.push(request)
        } // else { remove }
      }

      while (rejected.length) {
        this._requests.push(rejected.shift())
      }
    },

    /**
     * Pass the given request to each transform.
     * @private
     * @returns {int} STATE_NO_BLOCKED if everything is right. STATE_BLOCKED if some parser rejected it.
     * STATE_OFFLINE if offline transform blocked it.
     */
    _transform: function (request) {
      var ret = Transform.STATE_NO_BLOCKED
      this.transforms.forEach(function (transform) {
        if (transform.isBlocking(request)) {
          ret = Transform.STATE_BLOCKED
          return
        } else {
          transform.parse(request)
        }
        if (transform.getState() === Transform.STATE_OFFLINE) {
          ret = Transform.STATE_OFFLINE
        }
      })
      return ret
    }
  })

module.exports = Communication


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

/* global localStorage, sessionStorage, location */
var YouboraObject = __webpack_require__(10)
var Log = __webpack_require__(8)

/**
 * This class manages data sotrage in the browser memory.
 *
 * @extends youbora.Emitter
 * @memberof youbora
 */
var YouboraStorage = YouboraObject.extend(
  /** @lends youbora.YouboraStorage.prototype */
  {
    /**
     *
     * @constructs YouboraStorage
     * @extends YouboraObject
     * @memberof youbora
     *
     * @param {String} [prefix] Optional. Sets the prefix for saved objects in storages or cookies. 'youbora' by default.
     * @param {Boolean} [disableCookies] Optional. Set to true to disable cookies fallback. True by default.
     */
    constructor: function (prefix, disableCookies, forceCookies, disable) {
      this.prefix = prefix || 'youbora'
      this.disableCookies = disableCookies
      this.forceCookies = forceCookies
      this.disabled = disable
    },

    /**
     * Returns if storages are available or not
     *
     */
    isEnabled: function () {
      if (this.disabled) return false
      var ret = true
      if (!this.forceCookies) {
        try {
          localStorage.setItem(this.prefix + '.' + 'test', 'true')
          localStorage.removeItem(this.prefix + '.' + 'test')
        } catch (err) {
          ret = false
        }
      }
      return ret
    },

    /**
     * Saves in localStorage or equivalent
     *
     * @param {string} key Key of the value. Prefix will be appended.
     * @param {string} value Value.
     */
    setLocal: function (key, value) {
      if (this.disabled) return null
      var ret = null
      try {
        if (this.forceCookies || ((typeof localStorage === 'undefined' || !localStorage) && !this.disableCookies)) {
          ret = this._setCookie(this.prefix + '.local.' + key, value)
        } else {
          ret = localStorage.setItem(this.prefix + '.' + key, value)
        }
      } catch (err) {
        Log.error('Youbora Infinity needs localStorage or cookies, not supported by your browser.')
      }
      return ret
    },

    /**
     * Reads from localStorage or equivalent
     *
     * @param {string} key Key of the value. prefix will be appended.
     */
    getLocal: function (key) {
      if (this.disabled) return null
      return this._localGetRemove('getItem', '_getCookie', key)
    },

    /**
     * Removes from localStorage or equivalent
     *
     * @param {string} key Key of the value. prefix will be appended.
     */
    removeLocal: function (key) {
      if (this.disabled) return null
      return this._localGetRemove('removeItem', '_removeCookie', key)
    },

    _localGetRemove: function (storageMethod, cookieMethod, key) {
      var ret = null
      try {
        if (this.forceCookies || ((typeof localStorage === 'undefined' || !localStorage) && !this.disableCookies)) {
          ret = this[cookieMethod](this.prefix + '.local.' + key)
        } else {
          ret = localStorage[storageMethod](this.prefix + '.' + key)
        }
      } catch (err) {
        Log.error('Youbora Infinity needs localStorage or cookies, not supported by your browser.')
      }
      return ret
    },

    /**
     * Saves in sessionStorage or equivalent
     *
     * @param {string} key Key of the value. prefix will be appended.
     * @param {string} value Value.
     */
    setSession: function (key, value) {
      if (this.disabled) return null
      var ret = null
      try {
        if (this.forceCookies || ((typeof sessionStorage === 'undefined' || !sessionStorage) && !this.disableCookies)) {
          ret = this._setCookie(this.prefix + '.session.' + key, value)
        } else {
          ret = sessionStorage.setItem(this.prefix + '.' + key, value)
        }
      } catch (err) {
        Log.error('Youbora Infinity needs sessionStorage or cookies, not supported by your browser.')
      }
      return ret
    },

    /**
     * Reads from sessionStorage or equivalent
     *
     * @param {string} key Key of the value. prefix will be appended.
     */
    getSession: function (key) {
      if (this.disabled) return null
      return this._sessionGetRemove('getItem', '_getCookie', key)
    },

    /**
   * Removes from sessionStorage or equivalent
   *
   * @param {string} key Key of the value. prefix will be appended.
   */
    removeSession: function (key) {
      if (this.disabled) return null
      return this._sessionGetRemove('removeItem', '_removeCookie', key)
    },

    _sessionGetRemove: function (storageMethod, cookieMethod, key) {
      var ret = null
      try {
        if (this.forceCookies || ((typeof sessionStorage === 'undefined' || !sessionStorage) && !this.disableCookies)) {
          ret = this[cookieMethod](this.prefix + '.session.' + key)
        } else {
          ret = sessionStorage[storageMethod](this.prefix + '.' + key)
        }
      } catch (err) {
        Log.error('Youbora Infinity needs sessionStorage or cookies, not supported by your browser.')
      }
      return ret
    },

    /**
     * Calls getSession and getLocal for the same key
     * @param {string} key Key of the value. prefix will be appended.
     */
    getStorages: function (key) {
      return this.getSession(key) || this.getLocal(key)
    },

    /**
     * Calls getSession and getLocal with the same key and value
     * @param {string} key Key of the value. prefix will be appended.
     * @param {string} value Value.
     */
    setStorages: function (key, value) {
      this.setSession(key, value)
      this.setLocal(key, value)
    },

    /**
     * Calls getSession and getLocal for the same key
     * @param {string} key Key of the value. prefix will be appended.
     */
    removeStorages: function (key) {
      this.removeSession(key)
      this.removeLocal(key)
    },

    // Private cookies methods

    /**
   * Sets a cookie value
   *
   * @param {string} cname Key of the value.
   * @param {Object} cvalue Value.
   */
    _setCookie: function (cname, cvalue) {
      if (typeof document !== 'undefined') {
        var domain = ';'
        if (typeof location !== 'undefined') {
          domain += 'domain=' + location.host.split('.').reverse().splice(0, 2).reverse().join('.') + ';path=/;'
        }
        document.cookie = cname + '=' + cvalue + domain
      }
    },

    /**
   * Gets a cookie value
   *
   * @param {string} cname Key of the value.
   */
    _getCookie: function (cname) {
      if (typeof document !== 'undefined') {
        var name = cname + '='
        var decodedCookie = decodeURIComponent(document.cookie)
        var ca = decodedCookie.split(';')
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i]
          while (c.charAt(0) === ' ') {
            c = c.substring(1)
          }
          if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length)
          }
        }
      }
      return null
    },

    /**
   * Removes a cookie
   *
   * @param {string} cname Key of the value.
   */
    _removeCookie: function (cname) {
      this._setCookie(cname, '')
    }
  }
)

module.exports = YouboraStorage


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

/* global btoa */
var Emitter = __webpack_require__(34)
var Comm = __webpack_require__(108)
var WrongTransform = __webpack_require__(396)
var Util = __webpack_require__(13)

var YouboraInfinity = Emitter.extend(
  /** @lends youbora.Infinity.prototype */
  {

    /**
     * This class is the base of youbora infinity. Every plugin will have an instance.
     *
     * @param {youbora.Plugin} plugin Parent plugin.
     *
     * @constructs youbora.Infinity
     * @extends youbora.Emitter
     * @memberof youbora
     */
    constructor: function (plugin) {
      /** Parent {@link youbora.Plugin} reference. */
      this._plugin = plugin
    },

    /**
     * @alias youbora.Infinity.prototype.begin.
     */
    andBeyond: function () {
      YouboraInfinity.prototype.begin.apply(this, arguments)
    },

    /**
     * This method will start infinity logic, setting storage as needed.
     * Will call fireSessionStart the first time and fireNav for every subsequent route change.
     *
     * @param {Object} [params] Object of key:value params to add to the request.
     */
    begin: function (dimensions) {
      this._comm = new Comm(this._plugin)
      this._comm.addTransform(this._plugin.viewTransform)
      this._comm.addTransform(new WrongTransform(this._plugin))
      if (this._plugin && this._plugin.storage && typeof this._plugin.storage.getLocal === 'function') {
        this._registeredProperties = this._plugin.storage.getLocal('inifnityRegisteredProperties')
      }
      var started = this._plugin.storage.getLocal('infinityStarted')
      if (this._plugin.getIsSessionExpired() || started === 'false' || !started) {
        this.fireSessionStart(dimensions) // first time
      } else {
        this.fireNav(dimensions) // returning
        this._sendExtraBeat()
      }
    },

    _generateNewContext: function () {
      var context = null
      try {
        context = btoa(new Date().getTime())
      } catch (err) {
        context = 'Default'
      }
      this._plugin.storage.setSession('context', context)
    },

    _setLastActive: function () {
      if (!this._firstActive) {
        this._firstActive = this.getFirstActive()
      }
      this._plugin.storage.setStorages('lastactive', new Date().getTime())
    },

    getFirstActive: function () {
      return Number(this._plugin.getLastActive()) || 0
    },

    /**
     * Returns the current {@link youbora.Communication} instance.
     *
     * @returns {youbora.Communication} communication instance
     */
    getComm: function () {
      return this._comm
    },

    // Fire
    /**
     * Emits session start request.
     *
     * @param {Object} [params] Object of key:value params to add to the request.
     */
    fireSessionStart: function (dimensions) {
      if (!this.infinityStarted) {
        this._plugin.storage.setLocal('infinityStarted', 'true')
        this.infinityStarted = true
        this._generateNewContext()
        this.emit(YouboraInfinity.Event.SESSION_START, this._getParamsJson(dimensions, null, null, true, true))
        this._setLastActive()
      }
    },

    /**
     * Emits session start request.
     *
     * @param {Object} [params] Object of key:value params to add to the request.
     */
    fireSessionStop: function (params) {
      if (this.infinityStarted) {
        this.infinityStarted = false
        this._plugin.storage.removeStorages('infinityStarted')
        this.emit(YouboraInfinity.Event.SESSION_STOP, params)
        this._plugin.storage.removeStorages('data')
        this._plugin.storage.removeStorages('session')
        this._plugin.storage.removeStorages('lastactive')
      }
    },

    /**
     * Stops the session and creates a new one
     *
     * @param {Object} [params] Object of key:value params to add to the request.
     */
    newSession: function (options, params) {
      if (this.isActive()) {
        this.fireSessionStop()
        this._plugin.storage.removeStorages('infinityStarted')
        this._plugin.storage.removeStorages('data')
        if (this._comm) this._comm.removeTransform(this._plugin.viewTransform)
        this._plugin.restartViewTransform()
        if (this._comm) this._comm.addTransform(this._plugin.viewTransform)
      }
      this._plugin.setOptions(options)
      this.begin(params)
    },

    /**
     * Emits session start request.
     *
     * @param {Object} [params] Object of key:value params to add to the request.
     */
    fireNav: function (dimensions) {
      if (this.isActive()) {
        if (!this._plugin.getContext()) {
          this._generateNewContext()
        }
        this.infinityStarted = true
        this.emit(YouboraInfinity.Event.NAV, this._getParamsJson(dimensions, null, null, true))
      }
    },

    _sendExtraBeat: function () {
      if (this._plugin && this._plugin._beat) {
        var now = new Date().getTime()
        var time = this._plugin._beat.chrono.startTime ? (now - this._plugin._beat.chrono.startTime) : 0
        this._plugin._sendBeat(time)
        this._plugin._beat.chrono.startTime = now
      }
      this._setLastActive()
    },

    /**
     * Emits session start request.
     *
     * @param {Object} [params] Object of key:value params to add to the request.
     */
    fireEvent: function (eventName, dimensions, values, topLevelDimensions) {
      if (this.infinityStarted) {
        var builtParams = this._getParamsJson(dimensions, values, eventName)
        Util.assign(builtParams.params, topLevelDimensions || {})
        this.emit(YouboraInfinity.Event.EVENT, builtParams)
        this._setLastActive()
      }
    },

    /** Register properties sent by the User, to send in all the events
    *
    * @memberof youbora.Infinity.prototype
    */
    register: function (dimensions, values) {
      this._registeredProperties = { dimensions: dimensions, values: values }
      this._plugin.storage.setLocal('inifnityRegisteredProperties', JSON.stringify(this._registeredProperties))
    },

    /** Calls register if registeredProperties is empty
    *
    * @memberof youbora.Infinity.prototype
    */
    registerOnce: function (dimensions, values) {
      if (!this._registeredProperties) {
        this.register(dimensions, values)
      }
    },

    /** Unregister properties registered with register()
    *
    * @memberof youbora.Infinity.prototype
    */
    unregister: function () {
      this._registeredProperties = null
      this._plugin.storage.removeLocal('inifnityRegisteredProperties')
    },

    /**
     * Splits params in dimensions (strings) and values (numbers)
     *
     * @param {Object} [params] Object of key:value params to split before adding to request.
     */
    _getParamsJson: function (dimensions, values, eventName, isNavigaton, isStart) {
      var returnparams = {}
      if (eventName) returnparams.name = eventName
      returnparams.dimensions = dimensions || {}
      returnparams.values = values || {}
      if (this._registeredProperties) {
        for (var key in this._registeredProperties.dimensions) {
          returnparams.dimensions[key] = this._registeredProperties.dimensions[key]
        }
        for (var key2 in this._registeredProperties.values) {
          returnparams.values[key2] = this._registeredProperties.values[key2]
        }
      }
      var paramsObject = { params: returnparams }
      if (isNavigaton) {
        if (paramsObject.params.dimensions.page) {
          paramsObject.params.page = paramsObject.params.dimensions.page
          delete paramsObject.params.dimensions.page
        }
        if (paramsObject.params.dimensions.route) {
          paramsObject.params.route = paramsObject.params.dimensions.route
          delete paramsObject.params.dimensions.route
        }
        if (!isStart) {
          delete paramsObject.params.dimensions
        }
        delete paramsObject.params.values
      }
      return paramsObject
    },

    isActive: function () {
      var started = this._plugin.storage.getLocal('infinityStarted')
      if (this.infinityStarted || (started && started !== 'false')) {
        return true
      }
      var now = new Date().getTime()
      if (Number(this._plugin.getLastActive()) + this._plugin.sessionExpire > now) {
        return true
      }
      return false
    }
  },
  /** @lends youbora.Plugin */
  {
    // Static Memebers //
    /**
     * List of events that could be fired
     * @enum
     * @event
     */
    Event: {
      NAV: 'nav',
      SESSION_START: 'sessionStart',
      SESSION_STOP: 'sessionStop',
      BEAT: 'beat',
      EVENT: 'event'
    }
  }
)

module.exports = YouboraInfinity


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var Emitter = __webpack_require__(34)
var Log = __webpack_require__(8)
var Util = __webpack_require__(13)
var version = __webpack_require__(74)
var PlaybackChronos = __webpack_require__(403)
var PlaybackFlags = __webpack_require__(404)
var PlayheadMonitor = __webpack_require__(164)
var AdapterConstants = __webpack_require__(75)

var Adapter = Emitter.extend(
  /** @lends youbora.this.prototype */
  {
    /**
     * Main Adapter class. All specific player adapters should extend this class specifying a player
     * class.
     *
     * The Adapter works as the 'glue' between the player and YOUBORA acting both as event
     * translator and as proxy for the {@link Plugin} to get info from the player.
     *
     * @constructs Adapter
     * @extends youbora.Emitter
     * @memberof youbora
     *
     * @param {object|string} player Either an instance of the player or a string containing an ID.
     */
    constructor: function (player) {
      /** An instance of {@link FlagStatus} */
      this.flags = new PlaybackFlags()

      /** An instance of {@link ChronoStatus} */
      this.chronos = new PlaybackChronos()

      /** Reference to {@link PlayheadMonitor}. Helps the plugin detect buffers/seeks. */
      this.monitor = null

      /** Reference to {@link Plugin}. */
      this.plugin = null

      /** Reference to the player tag */
      this.player = null

      /** Defines if the adapter is used as adapter or adsAdapter */
      this._isAdsAdapter = null

      // Register player and event listeners
      this.setPlayer(player)

      /** Reference to the video/object tag, could be the same as the player. */
      this.tag = this.player

      Log.notice('Adapter ' + this.getVersion() + ' with Lib ' + version + ' is ready.')
    },

    /**
     * Sets a new player, removes the old listeners if needed.
     *
     * @param {Object} player Player to be registered.
     */
    setPlayer: function (player) {
      if (this.player) this.unregisterListeners()

      if (typeof player === 'string' && typeof document !== 'undefined') {
        this.player = document.getElementById(player)
      } else {
        this.player = player
      }
      this.registerListeners()
    },

    /**
     * Override to create event binders.
     * It's a good practice when implementing a new Adapter to create intermediate methods and call
     * those when player events are detected instead of just calling the `fire*` methods. This
     * will allow future users of the Adapter to customize its behaviour by overriding these
     * methods.
     *
     * @example
     * registerListeners: function () {
     *  this.player.addEventListener('start', this.onStart.bind(this))
     * },
     *
     * onStart: function (e) {
     *  this.emit('start')
     * }
     */
    registerListeners: function () {
    },

    /**
     * Override to create event de-binders.
     *
     * @example
     * registerListeners: function () {
     *  this.player.removeEventListener('start', this.onStart)
     * }
     */
    /** Unregister listeners to this.player. */
    unregisterListeners: function () {
    },

    /**
     * This function disposes the currend adapter, removes player listeners and drops references.
     */
    dispose: function () {
      if (this.monitor) this.monitor.stop()
      this.fireStop()
      this.unregisterListeners()
      this.player = null
      this.tag = null
    },

    /**
     * Creates a new {@link PlayheadMonitor} at this.monitor.
     *
     * @param {bool} monitorBuffers If true, it will monitor buffers.
     * @param {bool} monitorSeeks If true, it will monitor seeks.
     * @param {number} [interval=800] The interval time in ms.
     */
    monitorPlayhead: function (monitorBuffers, monitorSeeks, interval) {
      this.stopMonitor()
      var type = 0
      if (monitorBuffers) type |= PlayheadMonitor.Type.BUFFER
      if (monitorSeeks) type |= PlayheadMonitor.Type.SEEK

      if (!this.monitor || !this.monitor._timer.isRunning) {
        this.monitor = new PlayheadMonitor(this, type, interval)
      } else {
        this.monitor.skipNextTick()
      }
    },

    stopMonitor: function () {
      if (this.monitor) this.monitor.stop()
    },

    // GETTERS //

    /** Override to return current playhead of the video */
    getPlayhead: function () {
      return null
    },

    /** Override to return video duration */
    getDuration: function () {
      return null
    },

    /** Override to return current bitrate */
    getBitrate: function () {
      return null
    },

    /** Override to return total downloaded bytes */
    getTotalBytes: function () {
      return null
    },

    /** Override to return title */
    getTitle: function () {
      return null
    },

    /** Override to return resource URL. */
    getResource: function () {
      return null
    },

    /** Override to return player version */
    getPlayerVersion: function () {
      return null
    },

    /** Override to return player's name */
    getPlayerName: function () {
      return null
    },

    /** Override to return adapter version. */
    getVersion: function () {
      return version + '-generic-js'
    },

    // FLOW //

    /**
     * Emits related event and set flags if current status is valid.
     * ie: won't sent init if isStarted is already true.
     *
     * @param {Object} [params] Object of key:value params to add to the request.
     */
    fireInit: function (params) {
      if (this.plugin) this.plugin.fireInit()
    },

    /**
     * Emits related event and set flags if current status is valid.
     * ie: won't sent start if isStarted is already true.
     *
     * @param {Object} [params] Object of key:value params to add to the request.
     */
    fireStart: function (params) {
      if (this.plugin && this.plugin.backgroundDetector && this.plugin.backgroundDetector.canBlockStartCalls()) {
        return null
      }
      if (!this.flags.isStarted) {
        this.flags.isStarted = true
        this.chronos.total.start()
        this.chronos.join.start()
        this.emit(AdapterConstants.Event.START, { params: params })
      }
    },

    /**
     * Emits related event and set flags if current status is valid.
     * ie: won't sent start if isStarted is already true.
     *
     * @param {Object} [params] Object of key:value params to add to the request.
     */
    fireJoin: function (params) {
      if (!this.flags.isJoined && !this.flags.isStarted && !this._isAds() && this.plugin && this.plugin.isInitiated) {
        this.fireStart()
      }
      if (this.flags.isStarted && !this.flags.isJoined) {
        this.flags.isStarted = true
        if (this.monitor) this.monitor.start()
        this.flags.isJoined = true
        this.chronos.join.stop()
        this.emit(AdapterConstants.Event.JOIN, { params: params })
      }
    },

    /**
     * Emits related event and set flags if current status is valid.
     * ie: won't sent start if isStarted is already true.
     *
     * @param {Object} [params] Object of key:value params to add to the request.
     */
    firePause: function (params) {
      if (this.flags.isBuffering) {
        this.fireBufferEnd()
      }
      if (this.flags.isJoined && !this.flags.isPaused) {
        this.flags.isPaused = true

        this.chronos.pause.start()

        this.emit(AdapterConstants.Event.PAUSE, { params: params })
      }
    },

    /**
     * Emits related event and set flags if current status is valid.
     * ie: won't sent start if isStarted is already true.
     *
     * @param {Object} [params] Object of key:value params to add to the request.
     */
    fireResume: function (params) {
      if (this.flags.isJoined && this.flags.isPaused) {
        this.flags.isPaused = false

        this.chronos.pause.stop()

        if (this.monitor) this.monitor.skipNextTick()

        this.emit(AdapterConstants.Event.RESUME, { params: params })
      }
    },

    /**
     * Emits related event and set flags if current status is valid.
     * ie: won't sent start if isStarted is already true.
     *
     * @param {Object} [params] Object of key:value params to add to the request.
     * @param {bool} [convertFromSeek=false] If true, will convert current seek to buffer.
     */
    fireBufferBegin: function (params, convertFromSeek) {
      if (this.flags.isJoined && !this.flags.isBuffering) {
        if (this.flags.isSeeking) {
          if (convertFromSeek) {
            Log.notice('Converting current buffer to seek')

            this.chronos.buffer = this.chronos.seek.clone()
            this.chronos.seek.reset()

            this.flags.isSeeking = false
          } else {
            return
          }
        } else {
          this.chronos.buffer.start()
        }

        this.flags.isBuffering = true
        this.emit(AdapterConstants.Event.BUFFER_BEGIN, { params: params })
      }
    },

    /**
     * Emits related event and set flags if current status is valid.
     * ie: won't sent start if isStarted is already true.
     *
     * @param {Object} [params] Object of key:value params to add to the request.
     */
    fireBufferEnd: function (params) {
      if (this.flags.isJoined && this.flags.isBuffering) {
        this.cancelBuffer()
        this.emit(AdapterConstants.Event.BUFFER_END, { params: params })
      }
    },

    /**
     *
     * @param {Object} [params] Object of key:value params to add to the request.
     */
    cancelBuffer: function (params) {
      if (this.flags.isJoined && this.flags.isBuffering) {
        this.flags.isBuffering = false

        this.chronos.buffer.stop()

        if (this.monitor) this.monitor.skipNextTick()
      }
    },

    /**
     * Emits related event and set flags if current status is valid.
     * ie: won't sent start if isStarted is already true.
     *
     * @param {Object} [params] Object of key:value params to add to the request.
     */
    fireStop: function (params) {
      if (this._isAds() || (this.plugin && this.plugin._isStopReady())) {
        if ((this._isAds() && this.flags.isStarted) ||
          (!this._isAds() && (this.flags.isStarted || (this.plugin && this.plugin.isInitiated)))
        ) {
          if (this.monitor) this.monitor.stop()

          this.flags.reset()
          this.chronos.total.stop()
          this.chronos.join.reset()
          this.chronos.pause.stop()
          this.chronos.buffer.stop()
          this.chronos.seek.stop()

          this.emit(AdapterConstants.Event.STOP, { params: params })

          this.chronos.pause.reset()
          this.chronos.buffer.reset()
          this.chronos.seek.reset()
          this.chronos.viewedMax.splice(0, this.chronos.viewedMax.length)
        }
      }
    },

    setIsAds: function (value) {
      this._isAdsAdapter = value
    },

    _isAds: function () {
      return this._isAdsAdapter
    },

    /**
     * @param {Object} [params] Object of key:value params to add to the request.
     */
    fireCasted: function (params) {
      if (!params) params = {}
      params.casted = true
      this.fireStop(params)
    },

    /**
     * Emits related event and set flags if current status is valid.
     * ie: won't sent start if isStarted is already true.
     *
     * @param {String|Object} [code] Error Code, if an object is sent, it will be treated as params.
     * @param {String} [msg] Error Message
     * @param {Object} [metadata] Object defining error metadata
     * @param {String} [level] Level of the error. Currently supports 'error' and 'fatal'
     */
    fireError: function (code, msg, metadata, level) {
      var params = Util.buildErrorParams(code, msg, metadata, level)
      if (params.code) {
        delete params.code
      }
      var options = this.plugin ? this.plugin.options : {}
      if (typeof params.errorCode !== 'undefined' && options['errors.ignore'] &&
      options['errors.ignore'].indexOf(params.errorCode.toString()) > -1) {
        // ignore error
      } else {
        this.emit(AdapterConstants.Event.ERROR, { params: params })
        if (typeof params.errorCode !== 'undefined' && options['errors.fatal'] &&
          options['errors.fatal'].indexOf(params.errorCode.toString()) > -1) {
          this.fireStop()
        }
      }
    },

    /**
     * Emits related event and set flags if current status is valid.
     * ie: won't sent start if isStarted is already true.
     *
     * @param {String|Object} [code] Error Code, if an object is sent, it will be treated as params.
     * @param {String} [msg] Error Message
     * @param {Object} [metadata] Object defining error metadata
     */
    fireFatalError: function (code, msg, metadata, level) {
      var options = this.plugin ? this.plugin.options : {}
      if (typeof code !== 'undefined' && options['errors.ignore'] &&
      options['errors.ignore'].indexOf(code.toString()) > -1) {
        // ignore error
      } else {
        if (this.monitor) this.monitor.stop()
        this.fireError(code, msg, metadata, level)
        if (typeof code !== 'undefined' && options['errors.nonFatal'] &&
          options['errors.nonFatal'].indexOf(code.toString()) > -1) {
          // no stop
        } else {
          this.fireStop()
        }
      }
    }
  },
  {
    /** @lends youbora.Adapter */
    // Static Memebers //

    /**
     * List of events that could be fired
     * @enum
     * @event
     */
    Event: AdapterConstants.Event
  }
)

Util.assign(Adapter.prototype, __webpack_require__(405))
Util.assign(Adapter.prototype, __webpack_require__(406))

module.exports = Adapter


/***/ }),
/* 112 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(7) && !__webpack_require__(3)(function () {
  return Object.defineProperty(__webpack_require__(78)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(5);


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(17);
var toIObject = __webpack_require__(18);
var arrayIndexOf = __webpack_require__(60)(false);
var IE_PROTO = __webpack_require__(80)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(9);
var anObject = __webpack_require__(1);
var getKeys = __webpack_require__(41);

module.exports = __webpack_require__(7) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(18);
var gOPN = __webpack_require__(44).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = __webpack_require__(7);
var getKeys = __webpack_require__(41);
var gOPS = __webpack_require__(61);
var pIE = __webpack_require__(57);
var toObject = __webpack_require__(11);
var IObject = __webpack_require__(56);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(3)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),
/* 119 */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(12);
var isObject = __webpack_require__(4);
var invoke = __webpack_require__(121);
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};


/***/ }),
/* 121 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(2).parseInt;
var $trim = __webpack_require__(52).trim;
var ws = __webpack_require__(84);
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(2).parseFloat;
var $trim = __webpack_require__(52).trim;

module.exports = 1 / $parseFloat(__webpack_require__(84) + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(23);
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(4);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),
/* 126 */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var sign = __webpack_require__(87);
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(1);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(12);
var toObject = __webpack_require__(11);
var IObject = __webpack_require__(56);
var toLength = __webpack_require__(6);

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(11);
var toAbsoluteIndex = __webpack_require__(42);
var toLength = __webpack_require__(6);

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),
/* 131 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpExec = __webpack_require__(99);
__webpack_require__(0)({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(7) && /./g.flags != 'g') __webpack_require__(9).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(58)
});


/***/ }),
/* 134 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var newPromiseCapability = __webpack_require__(103);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(137);
var validate = __webpack_require__(49);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(69)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(9).f;
var create = __webpack_require__(43);
var redefineAll = __webpack_require__(48);
var ctx = __webpack_require__(22);
var anInstance = __webpack_require__(46);
var forOf = __webpack_require__(47);
var $iterDefine = __webpack_require__(89);
var step = __webpack_require__(131);
var setSpecies = __webpack_require__(45);
var DESCRIPTORS = __webpack_require__(7);
var fastKey = __webpack_require__(36).fastKey;
var validate = __webpack_require__(49);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(137);
var validate = __webpack_require__(49);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(69)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var each = __webpack_require__(30)(0);
var redefine = __webpack_require__(15);
var meta = __webpack_require__(36);
var assign = __webpack_require__(118);
var weak = __webpack_require__(140);
var isObject = __webpack_require__(4);
var validate = __webpack_require__(49);
var NATIVE_WEAK_MAP = __webpack_require__(49);
var IS_IE11 = !global.ActiveXObject && 'ActiveXObject' in global;
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(69)(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (NATIVE_WEAK_MAP && IS_IE11) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(48);
var getWeak = __webpack_require__(36).getWeak;
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var anInstance = __webpack_require__(46);
var forOf = __webpack_require__(47);
var createArrayMethod = __webpack_require__(30);
var $has = __webpack_require__(17);
var validate = __webpack_require__(49);
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = __webpack_require__(24);
var toLength = __webpack_require__(6);
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__(44);
var gOPS = __webpack_require__(61);
var anObject = __webpack_require__(1);
var Reflect = __webpack_require__(2).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = __webpack_require__(62);
var isObject = __webpack_require__(4);
var toLength = __webpack_require__(6);
var ctx = __webpack_require__(22);
var IS_CONCAT_SPREADABLE = __webpack_require__(5)('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(6);
var repeat = __webpack_require__(86);
var defined = __webpack_require__(28);

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(7);
var getKeys = __webpack_require__(41);
var toIObject = __webpack_require__(18);
var isEnum = __webpack_require__(57).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!DESCRIPTORS || isEnum.call(O, key)) {
        result.push(isEntries ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(51);
var from = __webpack_require__(147);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(47);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 148 */
/***/ (function(module, exports) {

// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (
    arguments.length === 0
      // eslint-disable-next-line no-self-compare
      || x != x
      // eslint-disable-next-line no-self-compare
      || inLow != inLow
      // eslint-disable-next-line no-self-compare
      || inHigh != inHigh
      // eslint-disable-next-line no-self-compare
      || outLow != outLow
      // eslint-disable-next-line no-self-compare
      || outHigh != outHigh
  ) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};


/***/ }),
/* 149 */
/***/ (function(module, exports) {

/**
 * See Object.assign.
 *
 * @memberof youbora.Util
 */
module.exports = function (target) {
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert undefined or null to object')
  }

  var output = Object(target)
  for (var index = 1; index < arguments.length; index++) {
    var source = arguments[index]
    if (source !== undefined && source !== null) {
      for (var nextKey in source) {
        if (source.hasOwnProperty(nextKey)) { // eslint-disable-line no-prototype-builtins
          output[nextKey] = source[nextKey]
        }
      }
    }
  }
  return output
}


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

/* global Streamroot, peer5, teltoo, CdnBalancerStats */
var YouboraObject = __webpack_require__(10)
/**
 * This static class provides p2p and cdn network traffic information for
 * Streamroot, Peer5 and EasyBroadcast
 *
 * @constructs YouboraObject
 * @extends youbora.YouboraObject
 * @memberof youbora
 *
 */
var HybridNetowrk = YouboraObject.extend({
  /** Returns CDN traffic bytes using NPAW balancer, streamroot, peer5 or teltoo. Otherwise null */
  getCdnTraffic: function () {
    var ret = null
    if (typeof CdnBalancerStats !== 'undefined' && CdnBalancerStats.cdn) {
      ret = CdnBalancerStats.cdn.totalDownloadedBytes
    } else if (typeof Streamroot !== 'undefined') {
      ret = this._getStreamrootPeerObject('cdn', false) || this._getStreamrootInstanceObject('cdnDownload')
    } else if (typeof peer5 !== 'undefined' && peer5.getStats) {
      ret = peer5.getStats().totalHttpDownloaded
    } else if (typeof teltoo !== 'undefined' && teltoo.getStats) {
      var stats = teltoo.getStats()
      ret = stats.totalReceivedBytes - stats.p2pReceivedBytes
    }
    return ret
  },

  /** Returns CDN traffic when using multiple cdns, available only for NPAW solution. Otherwise null */
  getMultiCdnInfo: function () {
    var ret = null
    if (typeof CdnBalancerStats !== 'undefined' && CdnBalancerStats.cdn && CdnBalancerStats.cdn.cdns) {
      var p2p = CdnBalancerStats.p2p
      ret = {
        P2P: {
          downloaded_bytes: p2p.downloadedBytes,
          uploaded_bytes: p2p.uploadedBytes,
          downloaded_chunks: p2p.downloadedSegments,
          uploaded_chunks: p2p.uploadedSegments,
          errors: p2p.failedRequests ? p2p.failedRequests.total : 0,
          missed_downloaded_chunks: p2p.failedRequests ? p2p.failedRequests.absent : 0,
          timeout_errors: p2p.failedRequests ? p2p.failedRequests.timeout : 0,
          other_errors: p2p.failedRequests ? p2p.failedRequests.error : 0,
          late_uploaded_chunks: p2p.discardedUploadedSegments,
          late_uploaded_bytes: p2p.discardedUploadedBytes,
          late_downloaded_bytes: p2p.discardedDownloadedBytes,
          time: p2p.downloadMillis,
          active_peers: p2p.activePeers,
          peers: p2p.totalPeers
        }
      }
      CdnBalancerStats.cdn.cdns.forEach(function (cdn) {
        ret[cdn.name] = {
          downloaded_bytes: cdn.bytes,
          downloaded_chunks: cdn.chunks,
          errors: cdn.failures,
          time: cdn.downloadMillis
        }
      })
    }
    return ret
  },

  /** Returns segment duration using NPAW balancer API. Otherwise null */
  getSegmentDuration: function () {
    var ret = null
    if (typeof CdnBalancerStats !== 'undefined' && CdnBalancerStats.segmentDuration) {
      return CdnBalancerStats.segmentDuration
    }
    return ret
  },

  /** Returns CDN balancer API response id, available only for NPAW solution. Otherwise null */
  getBalancerResponseId: function () {
    var ret = null
    if (typeof CdnBalancerStats !== 'undefined' && CdnBalancerStats.cdn) {
      return CdnBalancerStats.cdn.responseUUID
    }
    return ret
  },

  /** Returns P2P traffic bytes using NPAW balancer, streamroot, peer5 or teltoo. Otherwise null */
  getP2PTraffic: function () {
    var ret = null
    if (typeof CdnBalancerStats !== 'undefined' && CdnBalancerStats.p2p) {
      ret = CdnBalancerStats.p2p.downloadedBytes
    } else if (typeof Streamroot !== 'undefined') {
      ret = this._getStreamrootPeerObject('p2p', true) || this._getStreamrootInstanceObject('dnaDownload')
    } else if (typeof peer5 !== 'undefined' && peer5.getStats) {
      ret = peer5.getStats().totalP2PDownloaded
    } else if (typeof teltoo !== 'undefined' && teltoo.getStats) {
      ret = teltoo.getStats().p2pReceivedBytes
    }
    return ret
  },

  /** Returns P2P traffic sent in bytes, using NPAW balancer, streamroot or peer5. Otherwise null */
  getUploadTraffic: function () {
    var ret = null
    if (typeof CdnBalancerStats !== 'undefined' && CdnBalancerStats.p2p) {
      ret = CdnBalancerStats.p2p.uploadedBytes
    } else if (typeof Streamroot !== 'undefined') {
      ret = this._getStreamrootPeerObject('upload', true) || this._getStreamrootInstanceObject('dnaUpload')
    } else if (typeof peer5 !== 'undefined' && peer5.getStats) {
      ret = peer5.getStats().totalP2PUploaded
    }
    return ret
  },

  /** Returns if P2P is enabled, using NPAW balancer, streamroot or peer5. Otherwise null */
  getIsP2PEnabled: function () {
    var ret = false
    if (typeof CdnBalancerStats !== 'undefined' && CdnBalancerStats.p2p) {
      ret = CdnBalancerStats.p2p.downloadEnabled
    } else if (typeof Streamroot !== 'undefined') {
      if (Streamroot.p2pAvailable && Streamroot.peerAgents) {
        for (var agent in Streamroot.peerAgents) {
          ret = ret || Streamroot.peerAgents[agent].isP2PEnabled
        }
      } else if (Streamroot.instances) {
        Streamroot.instances.forEach(function (instance) {
          ret = ret || instance.dnaDownloadEnabled || instance.dnaUploadEnabled
        })
      }
    } else if (typeof peer5 !== 'undefined' && peer5.isEnabled) {
      ret = peer5.isEnabled()
    } else if (typeof teltoo !== 'undefined') {
      ret = true
    }
    return ret
  },

  _getStreamrootPeerObject: function (objectName, check) {
    var ret = null
    if (Streamroot.p2pAvailable && Streamroot.peerAgents) {
      for (var agent in Streamroot.peerAgents) {
        var agentInst = Streamroot.peerAgents[agent]
        if (agentInst.stats && (!check || agentInst.isP2PEnabled)) {
          ret += agentInst.stats[objectName]
        }
      }
    }
    return ret
  },

  _getStreamrootInstanceObject: function (objectName) {
    var ret = null
    if (Streamroot.instances) {
      Streamroot.instances.forEach(function (instance) {
        if (instance.stats && instance.stats.currentContent) {
          ret += instance.stats.currentContent[objectName]
        }
      })
    }
    return ret
  }
})

module.exports = HybridNetowrk


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

var YBRequest = __webpack_require__(31)
var Transform = __webpack_require__(38)
var Log = __webpack_require__(8)
var Util = __webpack_require__(13)
var Constants = __webpack_require__(26)

var ViewTransform = Transform.extend(
  /** @lends youbora.ViewTransform.prototype */
  {
    /**
     * This class manages Fastdata service and view index.
     *
     * @constructs
     * @extends youbora.Transform
     * @memberof youbora
     *
     * @param {Plugin} plugin Instance of {@link Plugin}
     * @param {string} session If provided, plugin will use this as a FD response.
     */
    constructor: function (plugin, session) {
      Transform.prototype.constructor.apply(this, arguments)

      /** /data response */
      this.response = {}

      this._viewIndex = new Date().getTime()

      this._session = session

      this._httpSecure = plugin.options['app.https']

      this._plugin = plugin

      this.transformName = 'View'
    },

    /**
     * Starts the 'FastData' fetching. This will send the initial request to YOUBORA in order to get
     * the needed info for the rest of the requests.
     *
     * This is an asynchronous process.
     *
     * When the fetch is complete, {@link #fastDataConfig} will contain the parsed info.
     * @see FastDataConfig
     */
    init: function () {
      // offline
      if (this._plugin.options && this._plugin.options.offline) {
        // set the options
        this.response.host = 'OFFLINE'
        this.response.code = 'OFFLINE'
        this.response.pingTime = 60
        this.response.beatTime = 60
        this.done()
        return null
      }

      // reusing old data not expired
      if (this._plugin.storage.isEnabled()) {
        var now = new Date().getTime()
        if (now < this._plugin.sessionExpire + (Number(this._plugin.getDataTime()) || 0) &&
          this._plugin.getStoredData()) {
          this.setData(this._plugin.getStoredData())
          return null
        }
      }

      // request new data
      var service = Constants.Service.DATA
      var params = {
        outputformat: 'json'
      }

      params = this._plugin.requestBuilder.buildParams(params, service)
      if (params !== null) {
        Log.notice(service + ' ' + params.system)
        if (params.system === 'nicetest') {
          // "nicetest" is the default accountCode.
          // If found here, it's very likely that the customer has forgotten to set it.
          Log.error(
            'No accountCode has been set. Please set your accountCode inside plugin\'s options.'
          )
        }

        new YBRequest(this._plugin.getHost(), service, params)
          .on(YBRequest.Event.SUCCESS, this._receiveData.bind(this))
          .on(YBRequest.Event.ERROR, this._failedData.bind(this))
          .send()
      }
    },

    /**
     * Uses given response to set fastdata response.
     *
     * @param {String} response Fastdata response as json string.
     */
    setData: function (response) {
      try {
        var resp = JSON.parse(response)
        if (this._plugin.options['parse.fdsResponseHost']) {
          response = response.replace(resp.q.h, this._plugin.options['parse.fdsResponseHost'](resp.q.h))
          resp = JSON.parse(response)
        }
        this.response.msg = response
        this.response.host = Util.addProtocol(resp.q.h, this._httpSecure)
        this.response.code = resp.q.c
        this.response.pingTime = resp.q.pt || 5
        this.response.beatTime = resp.q.i ? resp.q.i.bt || 30 : 30
        this.response.sessionExpire = resp.q.i ? resp.q.i.exp || 300 : 300
        this._plugin.storage.setLocal('sessionExpire', this.response.sessionExpire)
        this.done()
      } catch (err) {
        Log.error('Fastdata response is invalid.')
      }
    },

    /**
     * Parse the response from the fastData service.
     *
     * @private
     */
    _receiveData: function (req, e) {
      var msg = req.getResponse()
      this.setData(msg)
    },

    _failedData: function (req, e) {
      Log.error('Fastdata request has failed.')
    },

    /**
     * This method will increment the view index (timestamp values). The library handles this
     * automatically, but some error flow might need calling this manually.
     * @return {string} new viewcode
     */
    nextView: function () {
      this._viewIndex = new Date().getTime()
      return this.getViewCode()
    },

    /**
     * Returns current viewcode
     * @return {string} viewcode
     */
    getViewCode: function () {
      return this.response.code + '_' + this._viewIndex
    },

    /**
     * Returns the current session
     *
     * @returns {string} Session
     */
    getSession: function () {
      return this._session
    },

    /**
     * Sets the session
     *
     * @param {String} sessionId Sets the session
     */
    setSession: function (session) {
      this._session = session
    },

    /** Sets the host url
    *
    * @param {String} host Sets the host
    */
    setHost: function (host) {
      this.response.host = host
    },

    /**
     * Transform requests
     * @param {youbora.comm.YBRequest} request YBRequest to transform.
     */
    parse: function (request) {
      // Host, system and sessionRoot for all
      request.host = request.host || this.response.host
      request.params.system = this._plugin.getAccountCode()
      request.params.sessionRoot = request.params.sessionRoot || this.getSession()

      // PingTime for ping and start
      if (ViewTransform.EventList.PingTime.indexOf(request.service) !== -1) {
        request.params.pingTime = request.params.pingTime || this.response.pingTime
      }

      // ViewCode for non infinity events
      if (ViewTransform.EventList.Infinity.indexOf(request.service) === -1) {
        request.params.code = request.params.code || this.getViewCode()
      } else {
        // For infinity events, sessionId
        request.params.sessionId = request.params.sessionRoot
      }

      // For init error and start, parentId and navContext
      if (ViewTransform.EventList.CreateView.indexOf(request.service) !== -1) {
        if (this._plugin.infinity.infinityStarted || (this._plugin.storage.isEnabled() && this._plugin.storage.getLocal('infinityStarted'))) {
          request.params.parentId = request.params.sessionRoot
          request.params.navContext = request.params.navContext || this._plugin.getContext()
        }
      }
    }
  },
  {
    // Static members
    EventList: {
      CreateView: [
        Constants.Service.START,
        Constants.Service.INIT,
        Constants.Service.ERROR
      ],
      Infinity: [
        Constants.Service.NAV,
        Constants.Service.SESSION_START,
        Constants.Service.SESSION_STOP,
        Constants.Service.EVENT,
        Constants.Service.BEAT
      ],
      PingTime: [
        Constants.Service.START,
        Constants.Service.PING
      ]
    }
  })

module.exports = ViewTransform


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

/* global atv */
var Transform = __webpack_require__(38)
var HlsParser = __webpack_require__(153)
var CdnParser = __webpack_require__(154)
var CdnSwitch = __webpack_require__(391)
var DashParser = __webpack_require__(155)
var Parser = __webpack_require__(76)
var LocationheaderParser = __webpack_require__(156)
var Log = __webpack_require__(8)
var Constants = __webpack_require__(26)

var ResourceTransform = Transform.extend(
  /** @lends youbora.ResourceTransform.prototype */
  {
    /**
     * This class parses resource to fetch HLS transportstreams and CDN-related info.
     *
     * @constructs ResourceTransform
     * @extends youbora.Transform
     * @memberof youbora
     *
     * @param {Plugin} plugin Instance of {@link Plugin}
     */
    constructor: function (plugin) {
      ResourceTransform.__super__.constructor.apply(this, arguments)

      this._plugin = plugin
      this._realResource = null
      this._transportFormat = null
      this._initResource = null
      this._cdnName = null
      this._cdnNodeHost = null
      this._cdnNodeTypeString = null
      this._cdnNodeType = null
      this._responses = {}
      this._isBusy = false

      this.transformName = 'Resource'
    },

    /**
     * Get the resource. If the transform is done, the real (parsed) resource will be returned
     * Otherwise the initial one is returned.
     *
     * @return {string} The initial or parsed resource
     */
    getResource: function () {
      return this._realResource
    },

    _getInitialCdnResource: function () {
      return this._realResource || this._initResource
    },

    /**
     * Get the transport format. If the transform detected the chunk format it will be returned, if not, null.
     *
     * @return {string} The streaming protocol
     */
    getTransportFormat: function () {
      return this._transportFormat
    },

    /**
     * Get the parsed CDN name.
     *
     * @return {string} The CDN name or null if unknown
     */
    getCdnName: function () {
      return this._cdnName
    },

    /**
     * Get the parsed CDN node.
     *
     * @return {string} The CDN node or null if unknown
     */
    getNodeHost: function () {
      return this._cdnNodeHost
    },

    /**
     * Get the parsed CDN type string, as returned in the cdn header response.
     *
     * @return {string} The CDN type string
     */
    getNodeTypeString: function () {
      return this._cdnNodeTypeString
    },

    /**
     * Get the parsed CDN type, parsed from the type string.
     *
     * @return {string} The CDN type
     */
    getNodeType: function () {
      return this._cdnNodeType
    },

    /**
     * Start the execution. Can be called more than once. If already running, it will be ignored,
     * if ended it will restart.
     * @param {string} resource the original resource
     */
    init: function (resource) {
      if (!resource) {
        this.done()
        return
      }
      if (!this._isBusy) {
        this._isBusy = true
        this._initResource = resource
        this._parseManifestEnabled = this._plugin.isParseManifest()
        this._cdnEnabled = this._plugin.isParseCdnNode()
        this._cdnList = this._plugin.getParseCdnNodeList().slice() // clone
        CdnParser.setBalancerHeaderName(this._plugin.getParseCdnNodeNameHeader(), this._plugin.getParseNodeHeader())

        this._setTimeout()
        if (this._parseManifestEnabled) {
          if (!this._isFinalUrl(this._initResource)) {
            this.parseManifest() // Unknown lastManifest or lastSrc, call without arguments
          } else {
            this._realResource = this._initResource
            this.done()
          }
        } else {
          this._parseCDN()
        }
      }
    },

    _isFinalUrl: function (url) {
      var segmentExtensions = ['.ts', '.mp4', '.m4s', '.cmfv']
      url = url || ''
      for (var i in segmentExtensions) {
        var ext = segmentExtensions[i]
        if (url.lastIndexOf(ext) === url.length - ext.length) {
          return true
        }
      }
      return false
    },

    // done: function () {
    //  Transform.prototype.done.apply(this, arguments) // super
    // },

    _setTimeout: function () {
      // Abort operation after 3s
      var timeoutComplete = function () {
        if (this._isBusy) {
          this.done()
          Log.warn('ResourceTransform has exceded the maximum execution time (3s) and will be aborted.')
        }
      }.bind(this)
      try {
        this._parseTimeout = setTimeout(timeoutComplete, 3000)
      } catch (err) {
        if (typeof atv !== 'undefined') {
          this._parseTimeout = atv.setTimeout(timeoutComplete, 3000)
        } else {
          Log.error(err)
        }
      }
    },

    parseManifest: function (lastManifest, lastSrc) {
      var headers = this._plugin.options['parse.manifest.auth']
      var parserArray = [new LocationheaderParser(headers), new DashParser(headers), new HlsParser(headers)]
      this._parseManifest(parserArray, lastManifest, lastSrc || this._initResource)
    },

    _parseManifest: function (parserArray, lastManifest, lastSrc, format) {
      if (parserArray.length > 0) {
        var parser = parserArray[0]
        if (parser.shouldExecute(lastManifest)) {
          parser.on(Parser.Event.DONE, function () {
            this._parseManifest(parserArray.slice(1, parserArray.length), parser.getLastManifest(), parser.getResource(), parser.getTransportFormat() || format)
          }.bind(this))
          parser.parse(lastSrc, lastManifest)
        } else {
          this._parseManifest(parserArray.slice(1, parserArray.length), lastManifest, lastSrc, format)
        }
      } else {
        this._transportFormat = format
        this._realResource = lastSrc
        this._parseCDN()
      }
    },

    _parseCDN: function () {
      if (this._plugin.isCdnSwitch()) {
        this.switchDetector = new CdnSwitch(this._plugin)
        this.switchDetector.on(CdnSwitch.Events.DONE, function (resp) {
          this._cdnName = resp.data
          this.done()
        }.bind(this))

        this.switchDetector.on(CdnSwitch.Events.ERROR, function () {
          this.done()
        }.bind(this))
        this.switchDetector.init()
      } else if (this._cdnEnabled && this._cdnList.length > 0) {
        var cdn = this._cdnList.shift()

        if (this.getNodeHost()) return // abort

        var cdnParser = CdnParser.create(cdn)
        if (cdnParser) {
          cdnParser.on(CdnParser.Event.DONE, function () {
            this._responses = cdnParser.getResponses()
            this._cdnName = cdnParser.getParsedCdnName()
            this._cdnNodeHost = cdnParser.getParsedNodeHost()
            this._cdnNodeTypeString = cdnParser.getParsedNodeTypeString()
            this._cdnNodeType = cdnParser.getParsedNodeType()
            if (this.getNodeHost()) {
              this.done()
            } else {
              this._parseCDN()
            }
          }.bind(this))
          // Run parse
          cdnParser.parse(this._getInitialCdnResource(), this._responses)
        } else {
          this._parseCDN()
        }
      } else {
        this.done()
      }
    },

    /**
     * Replaces the resource and/or Cdn info for the /start service.
     *
     * @param {YBRequest} request YBRequest to transform.
     */
    parse: function (request) {
      if (request.service === Constants.Service.START) {
        var lastSent = this._plugin.requestBuilder.lastSent
        lastSent.parsedResource = request.params.parsedResource = this.getResource() || request.params.parsedResource
        lastSent.transportFormat = request.params.transportFormat = this.getTransportFormat() || request.params.transportFormat
        if (this._cdnEnabled) {
          lastSent.cdn = request.params.cdn = request.params.cdn || this.getCdnName()
          lastSent.nodeHost = request.params.nodeHost = this.getNodeHost() || request.params.nodeHost
          lastSent.nodeType = request.params.nodeType = this.getNodeType() || request.params.nodeType
          lastSent.nodeTypeString = request.params.nodeTypeString = this.getNodeTypeString() || request.params.nodeTypeString
        }
      }
    }
  })

module.exports = ResourceTransform


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

var YBRequest = __webpack_require__(31)
var Parser = __webpack_require__(76)
var Log = __webpack_require__(8)
var TransportFormat = __webpack_require__(77)

var HlsParser = Parser.extend(
  /** @lends youbora.HlsParser.prototype */
  {
    /**
     * Starts the HLS parsing from the given resource. The first (outside) call should set the
     * parentResource to null.
     *
     * @param {string} resource Either the resource url or the manifest body.
     * @param {string} parentResource Parent resource in case relative paths are sent.
     */
    parse: function (resource, lastManifest, parentResource) {
      parentResource = parentResource || ''
      var matches = null
      try {
        matches = /((\S*?)(\.m3u8|\.m3u|\.ts|\.m4s|\.mp4|\.cmfv)((\?|;)\S*|\n|\r|$))/i.exec(resource.replaceAll(',URI=', '\n').replaceAll('"', '').replaceAll(',', '\n'))
      } catch (err) {
        Log.warn('Parse HLS Regex failed', err)
        this.done()
      }

      if (matches !== null) { // get first line ending in .m3u8, .m3u, .mp4, .cmfv or .ts
        var res = matches[1].trim()
        var prevParent = ''
        var index = parentResource.lastIndexOf('/')
        if (res.indexOf('http') !== 0 && index !== -1) {
          // If does not start with http, add parentResource relative route.
          if (res[0] === '/' && res[1] !== '/') {
            // if its a relative route not using the same path, but the same domain
            var ind = parentResource.indexOf('/') + 1
            ind += parentResource.substr(ind, parentResource.length).indexOf('/') + 1 // Second '/'
            ind += parentResource.substr(ind, parentResource.length).indexOf('/') // Third '/'
            res = parentResource.slice(0, ind) + res
          } else {
            // if its sharing the (omitted) path
            res = parentResource.slice(0, index) + '/' + res
          }
          prevParent = parentResource.slice(0, index) + '/'
        }

        if (matches[3] === '.m3u8' || matches[3] === '.m3u') { // It is m3u8 or m3u...
          if (!lastManifest) {
            var request = new YBRequest(res, null, null, { cache: true, requestHeaders: this._headers })

            request.on(YBRequest.Event.SUCCESS, function (resp) {
              this._parseWithManifest(resp, prevParent, matches)
            }.bind(this))

            request.on(YBRequest.Event.ERROR, function (resp) {
              this.done()
            }.bind(this))

            request.send()
          } else {
            this._parseWithManifest(lastManifest, prevParent, matches)
          }
        } else { // It is mp4 or ts...
          switch (matches[3]) {
            case '.mp4':
            case '.m4s':
              this._transportFormat = TransportFormat.MP4
              break
            case '.ts':
              this._transportFormat = TransportFormat.MPEG2
              break
            case '.cmfv':
              this._transportFormat = TransportFormat.CMF
          }
          this._realResource = res
          this.done()
        }
      } else {
        this.done()
      }
    },

    _parseWithManifest: function (resp, prevParent, matches) {
      this._lastManifest = resp
      this.parse(resp.getResponseText(), null, prevParent + matches[2])
    },

    shouldExecute: function (lastManifest) {
      var ret = true
      if (lastManifest) {
        var response = lastManifest.getResponseText()
        ret = response.indexOf('#EXTM3U') !== -1
      }
      return ret
    }
  }
)

module.exports = HlsParser


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

var Emitter = __webpack_require__(34)
var Log = __webpack_require__(8)
var Util = __webpack_require__(13)
var YBRequest = __webpack_require__(31)

var CdnParser = Emitter.extend(
  /** @lends youbora.CdnParser.prototype */
  {
    /**
         * Class that asynchronously tries to get information about the CDN where a given resource is
         * hosted.
         *
         * The info we care about is the CDN code itself, the node host and node type.
         *
         * The CDN is queried with http HEAD requests. This only will work if the CDN has been properly
         * configured.
         *
         * When HEAD requests are performed against the resources, the CDN returns a set of headers that
         * contain info about the cdn header and/or cdn type.
         *
         * Each CDN is different; some require special headers to be set when the HEAD request is
         * performed and others don't. Also, the info can come back in any fashion of ways, sometimes
         * both type and host come in the same response header while sometimes they're in different
         * headers. The format of these response headers is also different from CDN to CDN, so a
         * different regex is used for each CDN.
         *
         * Lastly, as the values indicating the CDN type are also different, we need a specific mapping
         * for each one.
         *
         * Every instance of this class will represent a 'way' of parsing the HEAD response. So an
         * instance should be created for Level3, Akamai, Highwinds, etc...
         *
         * @constructs CdnParser
         * @extends youbora.Emitter
         * @memberof youbora
         *
         * @param {object} options This object represents the configuration of a certain CDN parsing
         * methodology.
         * @param {string} options.cdnName see {@link CdnParser#setCdnName}.
         * @param {array} options.parsers see {@link CdnParser#addParser}.
         * @param {array} options.requestMethod see {@link CdnParser#setRequestMethod}.
         * @param {array} options.requestHeaders see {@link CdnParser#setRequestHeader}.
         * @param {function} options.parseType see {@link CdnParser#setParseType}.
         */
    constructor: function (options) {
      this._options = Util.assign({
        cdnName: null,
        parsers: [],
        requestMethod: 'HEAD',
        requestHeaders: {},
        parseType: function () { return 0 }
      }, options)

      this._responses = {}
    },

    /**
         * Emits DONE event
         */
    done: function () {
      this.emit(CdnParser.Event.DONE)
    },

    /**
         * Adds an object that represents a parse step of the headers.
         *
         * Each parser item will define the element parsed (whether if it is a host, a type, both...)
         * a headerName to parse (ie: x-cache) and a regex to execute over that header.
         *
         * @param {object} parser
         * @param {string} parser.element Which element will be parsed from the request.
         * Use {@link CdnParser.ElementType} enum.
         * @param {string} parser.headerName Name of the header to parse.
         * @param {regex} parser.regex Regex to match against the header content.
         *
         * @return itself to chain method calls
         */
    addParser: function (parser) {
      this._options.parsers.push(parser)
      return this
    },

    /**
         * Sets the cdn name. Note that this names are provided by Youbora and must coincede with the
         * ones offered here: {@link http://mapi.youbora.com:8081/cdns}.
         *
         * @return itself to chain method calls
         */
    setCdnName: function (name) {
      this._options.cdnName = name
      return this
    },

    /**
         * Sets the method of the request. HEAD by default.
         *
         * @return itself to chain method calls
         */
    setRequestMethod: function (method) {
      this._options.requestMethod = method
      return this
    },

    /**
         * if this CDN requires special headers to be set in order to respond with the info we want,
         * add them using this method.
         *
         * @param {string} key Name of the header.
         * @param {string} value Content of the header.
         *
         * @return itself to chain method calls
         */
    setRequestHeader: function (key, value) {
      this._options.requestHeaders[key] = value
      return this
    },

    /**
         * Adds a parsing function for parsing the type (hit or miss) of the request.
         *
         * Parser fucntion will receive a string parsed from a type header (see
         * {@link CdnParser#addParser}). Should return 1 in case of HIT, 2 in case of MISS and
         * 0 otherwise.
         *
         * @param {function} parser Parsing function
         *
         * @return itself to chain method calls
         */
    setParseType: function (parser) {
      this._options.parseType = parser
      return this
    },

    /**
         * Get parsed CDN name.
         *
         * @return {string} The CDN name or null if unknown
         */
    getParsedCdnName: function () {
      return this._cdnName
    },

    /**
         * Get the parsed CDN node.
         *
         * @return {string} The CDN node or null if unknown
         */
    getParsedNodeHost: function () {
      return this._cdnNodeHost
    },

    /**
         * Get the parsed CDN type string, as returned in the cdn header response.
         *
         * @return {string} The CDN type string
         */
    getParsedNodeTypeString: function () {
      return this._cdnNodeTypeString
    },

    /**
         * Get the parsed CDN type, parsed from the type string.
         *
         * @return {string} The CDN type
         */
    getParsedNodeType: function () {
      return this._cdnNodeType
    },

    /**
         * Returns the request responses from this CdnParser.
         * This is filled with the responses from the constructor, or created empty if null.
         * Then the performed request response (if any) is added to this map.
         * Call this method after "using" the CdnParser and pass the responses to the following
         * CdnParser so it can use the responses if it applies.
         * @return the request responses
         */
    getResponses: function () {
      return this._responses
    },

    /**
         * Parses given headers to check for matches.
         */
    parse: function (url, responses) {
      this._responses = responses || {}
      var headerString = JSON.stringify(this._options.requestHeaders)
      if (this._responses[headerString]) {
        this._parseResponse(this._responses[headerString])
      } else {
        this._requestResponse(url)
      }
    },

    _requestResponse: function (url) {
      var headerString = JSON.stringify(this._options.requestHeaders)
      var useheaders = headerString !== '{}'

      var request = new YBRequest(url, null, null, {
        method: this._options.requestMethod,
        maxRetries: 0,
        requestHeaders: this._options.requestHeaders,
        cache: true
      })

      request.on(YBRequest.Event.SUCCESS, function (resp) {
        this._responses[headerString] = resp.getResponseHeaders()
        this._parseResponse(this._responses[headerString])
      }.bind(this))

      request.on(YBRequest.Event.ERROR, function (resp) {
        if (useheaders) {
          this._options.requestHeaders = {}
          this._requestResponse(url)
        } else {
          this.done()
        }
      }.bind(this))

      request.send()
    },

    _parseResponse: function (headers) {
      this._options.parsers.forEach(function (parser) {
        var headerName = (parser.headerName)
          ? parser.headerName.toLowerCase()
          : ''
        if (headerName) {
          headers.split('\n').forEach(function (line) {
            var index = line.indexOf(':')
            if (index !== -1) {
              var key = line.slice(0, index).toLowerCase()
              if (key === headerName) {
                this._executeParser(parser, line.slice(index + 1))
              }
            }
          }.bind(this))
        }
      }.bind(this))
      this.done()
    },

    _executeParser: function (parser, value) {
      try {
        var matches = parser.regex.exec(value.trim())
        if (matches !== null) {
          if (this._options.cdnName) this._cdnName = this._options.cdnName
          switch (parser.element) {
            case CdnParser.ElementType.HOST:
              this._cdnNodeHost = matches[1]
              break
            case CdnParser.ElementType.TYPE:
              this._cdnNodeTypeString = matches[1]
              this._cdnNodeType = this._options.parseType(this._cdnNodeTypeString)
              break
            case CdnParser.ElementType.HOST_AND_TYPE:
              this._cdnNodeHost = matches[1]
              this._cdnNodeTypeString = matches[2]
              this._cdnNodeType = this._options.parseType(this._cdnNodeTypeString)
              break
            case CdnParser.ElementType.TYPE_AND_HOST:
              this._cdnNodeTypeString = matches[1]
              this._cdnNodeType = this._options.parseType(this._cdnNodeTypeString)
              this._cdnNodeHost = matches[2]
              break
            case CdnParser.ElementType.NAME:
              this._cdnName = matches[1].toUpperCase()
              break
          }
        }
      } catch (err) {
        Log.warn('CDN parsing for ' + this._options.cdnName +
          ' could not parse header value ' + value)
      }
    },

    shouldExecute: function () {
      return true
    }

  },

  /** @lends youbora.CdnParser */
  {
    // Static members

    /**
         * List of events that could be fired from this class.
         *
         * @enum
         */
    Event: {
      /** Notifies that this CdnParser is done processing. */
      DONE: 'done'
    },

    /**
         * Possible different bits of info we can get from a header.
         *
         * @enum
         */
    ElementType: {
      HOST: 'host',
      TYPE: 'type',
      HOST_AND_TYPE: 'host+type',
      TYPE_AND_HOST: 'type+host',
      NAME: 'name'
    },

    /**
         * List of available CDN parsers.
         * @private
         */
    _cdnConfigs: {},

    /**
         * This is a special case. The BalancerCdnParser is a custom CDN definition
         * that tries to get the CDN name directly from one of the headers. This method can be used
         * as a shortcut to creating a new CDN definition.
         *
         * This is usually used with DNS-based load balance services, such as Cedexis.
         *
         * Youboralib will use this method by itself using the configuration passed in the
         * {@link Options}.
         *
         * @param {string} cdnNameHeader the header response name where to get the CDN name from.
         * @param {string} cdnNodeNameHeader the header response name where to get the host name from.
         */
    setBalancerHeaderName: function (name, nodename) {
      CdnParser._cdnConfigs.Balancer.parsers[0].headerName = name
      CdnParser._cdnConfigs.Balancer.parsers[1].headerName = nodename
    },

    /**
         * Create one of the pre-defined CDN parsers. This method will be called with the keys passed
         * to {@link Options#'parse.CdnNode.list'}.
         *
         * Before using this method, configs must be added first using {@link CdnParser.add}.
         *
         * @param {string} cdnName Name of the CDN
         * @return {CdnParser} An instance or undefined if the names does not match any CDN.
         */
    create: function (key) {
      if (CdnParser._cdnConfigs[key]) {
        return new CdnParser(CdnParser._cdnConfigs[key])
      } else {
        Log.warn('Tried to create an unexisting CdnParser named ' + key)
      }
    },

    /**
         * Adds the given CdnParser's config to the available list. Objects sent must comply with
         * CdnParser constructor.
         *
         * @param {string} key The name that will identify the CDN.
         * @param {Object} config The parser that defines the CDN.
         */
    add: function (key, config) {
      CdnParser._cdnConfigs[key] = config
    }
  }
)

// Adding built-in parsers
CdnParser.add('Level3', __webpack_require__(381))
CdnParser.add('Cloudfront', __webpack_require__(382))
CdnParser.add('Akamai', __webpack_require__(383))
CdnParser.add('Highwinds', __webpack_require__(384))
CdnParser.add('Fastly', __webpack_require__(385))
CdnParser.add('Telefonica', __webpack_require__(386))
CdnParser.add('Amazon', __webpack_require__(387))
CdnParser.add('Edgecast', __webpack_require__(388))
CdnParser.add('Balancer', __webpack_require__(389))
CdnParser.add('NosOtt', __webpack_require__(390))

module.exports = CdnParser


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

var YBRequest = __webpack_require__(31)
var Parser = __webpack_require__(76)
var Log = __webpack_require__(8)
var TransportFormat = __webpack_require__(77)

var DashParser = Parser.extend(
  /** @lends youbora.DashParser.prototype */
  {
    /**
     * Starts the Dash parsing from the given resource. The first (outside) call should set the
     * parentResource to null.
     *
     * @param {string} resource The resource url.
     */
    parse: function (resource, lastManifest) {
      if (!lastManifest) {
        var request = new YBRequest(resource, null, null, { cache: true, requestHeaders: this._headers })

        request.on(YBRequest.Event.SUCCESS, function (resp) {
          this.parseLocation(resp, resource)
        }.bind(this))

        request.on(YBRequest.Event.ERROR, function (resp) {
          this.done()
        }.bind(this))

        request.send()
      } else {
        this.parseLocation(lastManifest, resource)
      }
    },

    parseLocation: function (lastManifest, resource) {
      this.iterations--
      var locationRegexp = new RegExp(/<Location>([\s\S]+)<\/Location>/)
      try {
        this._lastManifest = lastManifest
        var manifest = lastManifest.getResponseText()
        var matches = locationRegexp.exec(manifest)

        if (matches && matches[1]) {
          var newRes = this._htmlDecode(matches[1].replace('\n', ''))
        }
        if (newRes && newRes !== resource && this.iterations > 0) {
          this.parse(newRes)
        } else {
          this.parseFinalResource(manifest, resource)
        }
      } catch (err) {
        Log.warn('Dash parse failed')
        this.done()
      }
    },

    _htmlDecode: function (input) {
      if (typeof document !== 'undefined' && typeof document.createElement === 'function') {
        var e = document.createElement('textarea')
        e.innerHTML = input
        return e.childNodes && e.childNodes.length ? e.childNodes[0].nodeValue : input
      }
      return input
    },

    parseFinalResource: function (manifest, resource) {
      var baseUrlRegexp = new RegExp(/<BaseURL>[\r\n]*(.*?)[\r\n]*<\/BaseURL>/)
      var segmentUrlRegexp = new RegExp(/<SegmentURL[\s\S]*media="([^"]+)/)
      var segmentTemplateRegexp = new RegExp(/<SegmentTemplate[\s\S]*media="([^"]+)/)
      var matches = null
      // first: base url, second: segment url, third: segment template
      try {
        matches = baseUrlRegexp.exec(manifest) || segmentTemplateRegexp.exec(manifest) || segmentUrlRegexp.exec(manifest)
        this._getManifestMetadata(manifest)
        if (matches && matches[1] && this._isFullUrl(matches[1])) {
          if (matches[1].indexOf('"') > 0) {
            this._realResource = matches[1].substr(0, matches[1].indexOf('"')).replace('\n', '')
          } else {
            this._realResource = matches[1].replace('\n', '')
          }
        } else {
          this._realResource = resource
        }
      } catch (err) {
        Log.warn('Dash manifest parse failed')
      }
      this.done()
    },

    _getManifestMetadata: function (manifest) {
      try {
        var transportFormatRegexp = new RegExp(/<AdaptationSet[\s\S]*mimeType="video\/([^"]+)/)
        var matches = transportFormatRegexp.exec(manifest)
        var ret = null
        switch (matches[1]) {
          case 'mp4':
          case 'm4s':
            ret = TransportFormat.MP4
            break
          case 'mp2t':
            ret = TransportFormat.MPEG2
            break
          case 'cmfv':
            ret = TransportFormat.CMF
            break
        }
        this._transportFormat = ret
      } catch (err) {
        Log.warn('Couldnt find the transport format')
      }
    },

    _isFullUrl: function (url) {
      return url.indexOf('http') !== -1
    },

    shouldExecute: function (lastManifest) {
      var ret = true
      if (lastManifest) {
        var response = lastManifest.getResponseText()
        ret = response.indexOf('<MPD') !== -1
      }
      return ret
    }
  }
)

module.exports = DashParser


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

var YBRequest = __webpack_require__(31)
var Parser = __webpack_require__(76)

var LocationheaderParser = Parser.extend(
  /** @lends youbora.LocationheaderParser.prototype */
  {
    /**
     * Parses given header to check.
     */
    parse: function (url, lastManifest) {
      if (!lastManifest) {
        this._realResource = url
        var request = new YBRequest(url, null, null, {
          cache: true,
          requestHeaders: this._headers
        })

        request.on(YBRequest.Event.SUCCESS, function (resp) {
          this._parseWithManifest(resp)
        }.bind(this))

        request.on(YBRequest.Event.ERROR, function (resp) {
          this.done()
        }.bind(this))

        request.send()
      } else {
        this._parseWithManifest(lastManifest)
      }
    },

    _parseWithManifest: function (resp) {
      this._lastManifest = resp
      var response = resp.getResponseHeaders()
      var found = false
      if (resp && resp.xhr && resp.xhr.responseURL && resp.xhr.responseURL !== this._realResource) {
        this._realResource = resp.xhr.responseURL
        this.parse(this._realResource)
        found = true
      } else {
        response.split('\n').forEach(function (line) {
          if (line.startsWith('Location:')) {
            this._realResource = line.slice(10)
            this.parse(this._realResource)
            found = true
          }
        }.bind(this))
      }
      if (!found) {
        this.done()
      }
    }
  }
)

module.exports = LocationheaderParser


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

var Transform = __webpack_require__(38)

var OfflineTransform = Transform.extend(
  /** @lends youbora.OfflineTransform.prototype */
  {
    /**
     * This class manages Fastdata service and view index.
     *
     * @constructs
     * @extends youbora.Transform
     * @memberof youbora
     *
     * @param {Plugin} plugin Instance of {@link Plugin}
     * @param {string} session If provided, plugin will use this as a FD response.
     */
    constructor: function (plugin, session) {
      this._sendRequest = false
      this._isBusy = false
      this.plugin = plugin
      this.session = session
      this.transformName = 'Offline'
    },

    /**
     * Transform requests
     * @param {youbora.comm.YBRequest} request YBRequest to transform.
     */
    parse: function (request) {
      if (request && this.plugin.offlineStorage) {
        this.plugin.offlineStorage.addEvent(request.service, request.params)
      }
    },

    hasToSend: function (request) {
      return false
    },

    getState: function () {
      return Transform.STATE_OFFLINE
    }

  })

module.exports = OfflineTransform


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

var YouboraObject = __webpack_require__(10)
var DeprecatedOptions = __webpack_require__(392)
var Log = __webpack_require__(8)
var TransportFormat = __webpack_require__(77)
var StreamingProtocol = __webpack_require__(159)

var Options = YouboraObject.extend(
  /** @lends youbora.Options.prototype */
  {
    /**
     * This Class store youbora configuration settings.
     * Any value specified in this class, if set, will override the info the plugin is able to get
     * on its own.
     *
     * @constructs Options
     * @param {Object|Options} [options] A literal containing values.
     * @extends youbora.YouboraObject
     * @memberof youbora
     */
    constructor: function (options) {
      /** @prop {boolean} [enabled=true] If false, the plugin won't send NQS requests. */
      this.enabled = true

      /** @prop {string} [host='a-fds.youborafds01.com'] Host of the Fastdata service. */
      this.host = 'a-fds.youborafds01.com'

      /**
      * @prop {string} [accountCode='nicetest']
      * NicePeopleAtWork account code that indicates the customer account.
      */
      this.accountCode = 'nicetest'

      /**
       * @prop {string} [authToken]
       * Optional auth token to validate all the requests
       */
      this.authToken = null

      /**
       * @prop {string} [authType]
       * Optional auth type. Used if authToken is set.
       * 'Bearer' by default.
       */
      this.authType = 'Bearer'

      /**
      *  @prop {boolean} [preventZombieViews=true]
      * If true, the plugin will check if the last event
      * was sent more than 10 mins ago
      * so it will not send more events to the same view
      */
      this.preventZombieViews = true

      /**
      * @prop {boolean} [offline=false]
      * If true the plugin will store the events and send them later when there's connection
      */
      this.offline = false

      /** @prop {string} [referer] Site url.
      *  By default window.location.href */
      this.referer = null

      /** @prop {string} [referral] Previous site url.
      *  By default document.referrer */
      this.referral = null

      /**
      * @prop {boolean} [disableCookies]
      * To disable cookies storage fallback after local/sessionstorage
      * True by default
      */
      this.disableCookies = true

      /**
      * @prop {boolean} [forceCookies]
      * To force the use of cookies storage instead of local/sessionstorage
      * False by default
      */
      this.forceCookies = false

      /**
      * @prop {boolean} [disableStorage]
      * To disable all possible storages usage (cookies, localStorage, sessionStorage)
      * CAUTION: enabling this option session tracking may stop to work properly
      * False by default
      */
      this.disableStorage = false

      // USER

      /**
      * @prop {string} [user.email]
      * User email.
      */
      this['user.email'] = null

      /**
      * @prop {string} [user.type]
      * User type.
      */
      this['user.type'] = null

      /**
      * @prop {string} [user.name]
      * User ID value inside your system.
      */
      this['user.name'] = null

      /**
      *  @prop {boolean} [user.obfuscateIp=false]
      * If true, the view will have the IP obfuscated
      */
      this['user.obfuscateIp'] = false

      /**
      * @prop {string} [user.anonymousId]
      * Anonymous identifyer of the user provided by the customer.
      */
      this['user.anonymousId'] = null

      /**
      * @prop {string} [user.privacyProtocol]
      * Privacy protocol to be used, nothing by default.
      * Possible values are "optin" and "optout"
      */
      this['user.privacyProtocol'] = null

      // PARSERS

      /**
      * @prop {boolean} [parse.manifest=false]
      * If true the plugin will look for location value in manifest header to retrieve the actual resource,
      * will parse HLS files to use the first .ts file found as resource and
      * will look for location and segment values inside DASH manifest to retrieve the actual resource
      * It might slow performance down.
      */
      this['parse.manifest'] = false

      /**
      * @prop {object} [parse.manifest.auth={}]
      * If parse.manifest enabled, it adds extra headers to the request of the content.
      * Use this if for example, the player needs to include authentication headers to request the content,
      * so the plugin needs it to access to the manifest files too.
      */
      this['parse.manifest.auth'] = {}

      /**
      * @prop {string} [parse.CdnNameHeader]
      * If defined, resource parse will try to fetch the CDN code from the custom header defined
      * by this property. ie: 'x-cdn-forward'
      */
      this['parse.cdnNameHeader'] = 'x-cdn-forward'

      /**
      * @prop {string} [parse.CdnNodeHeader]
      * If defined, resource parse will try to fetch the CDN node name from the custom header defined
      * by this property. ie: 'x-node'
      */
      this['parse.cdnNodeHeader'] = ''

      /**
      * @prop {boolean} [parse.CdnNode=false]
      * If true the plugin will query the CDN to retrieve the node name.
      * It might slow performance down.
      */
      this['parse.cdnNode'] = false

      /**
      * @prop {array<string>} [parse.CdnNode.list=false]
      * If true the plugin will query the CDN to retrieve the node name.
      * It might slow performance down.
      */
      this['parse.cdnNode.list'] = ['Akamai', 'Amazon', 'Cloudfront', 'Level3', 'Fastly', 'Highwinds', 'Telefonica', 'Edgecast', 'NosOtt']

      /**
       * @prop {function} [parse.fdsResponseHost=null]
       * Parses fastdata response to modify the host where the requests will be sent
       */
      this['parse.fdsResponseHost'] = null

      /**
       * @prop {function} [parse.cdnSwitchHeader=false]
       * Parses a video chunk or manifest every x seconds to read the x-cdn header and report it
       */
      this['parse.cdnSwitchHeader'] = false

      /**
       * @prop {function} [parse.cdnTTL=60]
       * if parse.cdnSwitchHeader enabled, the time between new requests
       */
      this['parse.cdnTTL'] = 60

      // NETWORK

      /** @prop {string} [network.ip] IP of the viewer/user. ie= '100.100.100.100'. */
      this['network.ip'] = null

      /** @prop {string} [network.isp] Name of the internet service provider of the viewer/user. */
      this['network.isp'] = null

      /**
      * @prop {string} [network.connectionType]
      * Type of connection used
      */
      this['network.connectionType'] = null

      // DEVICE

      /**
       * @prop {string} [device.id]
       * Unique identifyer of the device. If set it will consider the value as the device id.
       * By default the plugin tries to generate a unique id based on exposed information on the browser.
       * It wont be sent if 'device.isAnonymous option' is set to true.
       */
      this['device.id'] = null

      /**
      * @prop {string} [device.code]
      * Youbora's device code. If specified it will rewrite info gotten from user agent.
      * See a list of codes in {@link http://mapi.youbora.com:8081/devices}
      */
      this['device.code'] = null

      /**
      * @prop {string} [device.model]
      * Device model name
      */
      this['device.model'] = null

      /**
      * @prop {string} [device.brand]
      * Device vendor name
      */
      this['device.brand'] = null

      /**
      * @prop {string} [device.type]
      * Device type (pc, smartphone, stb, tv, etc.)
      */
      this['device.type'] = null

      /**
      * @prop {string} [device.name]
      * Device name. It must exist in NPAW database.
      */
      this['device.name'] = null

      /**
      * @prop {string} [device.osName]
      * OS name.
      */
      this['device.osName'] = null

      /**
      * @prop {string} [device.osVersion]
      * OS version.
      */
      this['device.osVersion'] = null

      /**
      * @prop {string} [device.browserName]
      * Browser name.
      */
      this['device.browserName'] = null

      /**
      * @prop {string} [device.browserVersion]
      * Browser version.
      */
      this['device.browserVersion'] = null

      /**
      * @prop {string} [device.browserType]
      * Browser type.
      */
      this['device.browserType'] = null

      /**
      * @prop {string} [device.browserEngine]
      * Browser engine.
      */
      this['device.browserEngine'] = null

      /**
      * @prop {string} [device.EDID]
      * Connected screen EDID.
      * The expected format is a hex value
      */
      this['device.EDID'] = null

      /**
      * @prop {bool} [device.isAnonymous]
      * If true, it blocks 'deviceUUID' parameter in requests.
      */
      this['device.isAnonymous'] = false

      // CONTENT

      /** @prop {string} [content.transactionCode] Custom unique code to identify the view. */
      this['content.transactionCode'] = null

      /** @prop {string} [content.resource] URL/path of the current media resource. */
      this['content.resource'] = null

      /** @prop {boolean} [content.isLive] True if the content is live false if VOD. */
      this['content.isLive'] = null

      /** @prop {boolean} [content.isLive.noSeek] True if the player seeks automatically when resumed or ending buffer. Only for live content. False by default */
      this['content.isLive.noSeek'] = false

      /** @prop {boolean} [content.isLive.noMonitor] True if the player returns non consistent values for the playhead on live, so playhead monitor wont work to detect buffers and seeks. False by default. */
      this['content.isLive.noMonitor'] = false

      /** @prop {string} [content.title] Title of the media. */
      this['content.title'] = null

      /** @prop {string} [content.program] Secondary title of the media */
      this['content.program'] = null

      /** @prop {number} [content.duration] Duration of the media. */
      this['content.duration'] = null

      /** @prop {number} [content.fps] Frames per second of the content in the current moment. */
      this['content.fps'] = null

      /** @prop {number} [content.segmentDuration] Video segment length in milliseconds. */
      this['content.segmentDuration'] = null

      /** @prop {number} [content.bitrate] Bitrate of the content in bits per second. */
      this['content.bitrate'] = null

      /** @prop {number} [content.totalBytes] Total downloaded bytes of the content. */
      this['content.totalBytes'] = null

      /** @prop {bool} [content.sendTotalBytes] Additionaly report totalbytes or not, default false. */
      this['content.sendTotalBytes'] = false

      /** @prop {number} [content.throughput] Throughput of the client bandwith in bits per second. */
      this['content.throughput'] = null

      /** @prop {string} [content.rendition] Name of the current rendition of the content. */
      this['content.rendition'] = null

      /**
       * @prop {string} [content.cdn]
       * Codename of the CDN where the content is streaming from.
       * See a list of codes in {@link http://mapi.youbora.com:8081/cdns}
       * */
      this['content.cdn'] = null

      /** @prop {string} [content.cdnNode] CDN node id */
      this['content.cdnNode'] = null

      /**
       * @prop {number} [content.cdnType] CDN node content access type
       * It defines if the content request hits the cache or not
       * TCP_HIT / HIT: 1
       * TCP_MISS / MISS: 2
       * TCP_MEM_HIT: 3
       * TCP_IMS_HIT: 4
       */
      this['content.cdnType'] = null

      /**
       * @prop {object} [content.metadata]
       * Item containing mixed extra information about the content like: director, parental rating,
       * device info or the audio channels.This object may store any serializable key:value info.
       */
      this['content.metadata'] = {}

      /**
       * @prop {object} [content.metrics]
       * Item containing metrics in json format. Reported every ping if the values change
       */
      this['content.metrics'] = {}

      /** @prop {string} [content.streamingProtocol] Name of the streaming media protocol.
       * Can be:
       *   - HDS (Adobe HDS)
       *   - HLS (Apple HLS)
       *   - MSS (Microsoft Smooth Streaming)
       *   - DASH (MPEG-DASH)
       *   - RTMP (Adobe RTMP)
       *   - RTP (RTP)
       *   - RTSP (RTSP)
       */
      this['content.streamingProtocol'] = null

      /** @prop {string} [content.transportFormat] Name of the transport format.
       * Can be:
       *   - TS (MPEG-2 TS)
       *   - MP4 (Fragmented MP4)
       */
      this['content.transportFormat'] = null

      /** @prop {number} [content.package] Package of the media. */
      this['content.package'] = null

      /** @prop {number} [content.saga] Saga of the media. */
      this['content.saga'] = null

      /** @prop {number} [content.tvShow] TV Show of the media. */
      this['content.tvShow'] = null

      /** @prop {number} [content.season] Season of the media. */
      this['content.season'] = null

      /** @prop {number} [content.episodeTitle] Episode title of the media. */
      this['content.episodeTitle'] = null

      /** @prop {number} [content.channel] Channel name of the media. */
      this['content.channel'] = null

      /** @prop {number} [content.id] ID of the media. */
      this['content.id'] = null

      /** @prop {number} [content.imdbId] IMDB id of the media. */
      this['content.imdbId'] = null

      /** @prop {number} [content.gracenoteId] Gracenote id of the media. */
      this['content.gracenoteId'] = null

      /** @prop {number} [content.type] Type of the media. */
      this['content.type'] = null

      /** @prop {number} [content.genre] Genre of the media. */
      this['content.genre'] = null

      /** @prop {number} [content.language] Language of the media. */
      this['content.language'] = null

      /** @prop {number} [content.subtitles] Subtitles of the media. */
      this['content.subtitles'] = null

      /** @prop {number} [content.contractedResolution] Contracted Resolution of the media. */
      this['content.contractedResolution'] = null

      /** @prop {number} [content.cost] Cost of the media. */
      this['content.cost'] = null

      /** @prop {number} [content.price] Price of the media. */
      this['content.price'] = null

      /** @prop {number} [content.playbackType] Type of the media. Can be Vod, Live, catch-up or offline */
      this['content.playbackType'] = null

      /** @prop {number} [content.drm] DRM of the media. */
      this['content.drm'] = null

      // Encoding

      /** @prop {number} [content.encoding.videoCodec] Video codec of the media. */
      this['content.encoding.videoCodec'] = null

      /** @prop {number} [content.encoding.audioCodec] Audio codec of the media. */
      this['content.encoding.audioCodec'] = null

      /** @prop {number} [content.encoding.codecSettings] Codec settings of the media. */
      this['content.encoding.codecSettings'] = null

      /** @prop {number} [content.encoding.codecProfile] Codec profile of the media. */
      this['content.encoding.codecProfile'] = null

      /** @prop {number} [content.encoding.containerFormat] Container format of the media. */
      this['content.encoding.containerFormat'] = null

      // ADS

      /**
      * @prop {object} [ad.metadata]
      * Item containing mixed extra information about ads like: request url.
      * This object may store any serializable key:value info.
      */
      this['ad.metadata'] = {}

      /**
      * @prop {string} [ad.campaign]
      * String containing the name of the campaign
      */
      this['ad.campaign'] = null

      /**
      * @prop {string} [ad.creativeId]
      * String containing the id of the creative
      */
      this['ad.creativeId'] = null

      /**
      * @prop {string} [ad.provider]
      * String containing the provider of the ad
      */
      this['ad.provider'] = null

      /**
      * @prop {string} [ad.resource]
      * String containing the ad resource
      */
      this['ad.resource'] = null

      /**
      * @prop {string} [ad.title]
      * String containing the title of the campaign
      */
      this['ad.title'] = null

      /**
      * @prop {duration} [ad.duration]
      * Duration of the ad in seconds
      */
      this['ad.duration'] = null

      /**
      * @prop {object} [ad.expectedPattern]
      * Json with the position of the breaks expected.
      * Arrays are the number of breaks, and the numbers in them, the number of ads for each break
      *
      * Example:
      * {pre: [1],
      * mid: [1,2],
      * post: [1]}
      * Would be a view with 1 preroll break with 1 ad, 2 midroll breaks, one with 1 ad and
      * the other with 2, and one postroll break with 1 ad.
      */
      this['ad.expectedPattern'] = null

      /**
      * @prop {string} [ad.givenAds]
      * Number of ads given by the adserver for this break
      */
      this['ad.givenAds'] = null

      /**
      * @prop {number[]} [ad.breaksTime]
      * Array of numbers for the time position of adbreaks
      */
      this['ad.breaksTime'] = null

      /**
      * @prop {string} [ad.expectedBreaks]
      * Number of breaks expected for the view
      */
      this['ad.expectedBreaks'] = null

      /**
      * @prop {number} [ad.givenBreaks]
      * Number of breaks given by the adserver for the view
      */
      this['ad.givenBreaks'] = null

      /**
      * @prop {boolean} [ad.ignore]
      * False by default.
      * If true, youbora blocks ad events and calculates jointime ignoring ad time.
      */
      this['ad.ignore'] = false

      /**
      * @prop {boolean} [ad.blockerDetected]
      * Null (notified as false) by default.
      * Sets if an adblocker has been detected
      */
      this['ad.blockerDetected'] = null

      // APP

      /**
      * @prop {string} [app.name]
      * String containing the name of the app
      */
      this['app.name'] = null

      /**
      * @prop {string} [app.releaseVerson]
      * String containing the app version
      */
      this['app.releaseVersion'] = null

      /**
      * @prop {boolean} [app.https=null]
      * Define the security of NQS calls.
      * If true it will use 'https://',
      * if false it will use 'http://',
      * if null/undefined it will use '//'.
      */
      this['app.https'] = false

      // BACKGROUND

      /**
      *  @prop {boolean} [background.enabled=false]
      * If true, plugin will send background/foreground events
      * Different device behaviour is settable in background.settings
      */
      this['background.enabled'] = true

      /**
      *  @prop {string} [background.settings]
      * Action to do when the browser goes to background.
      * Options are 'stop', 'pause', and '' for no action.
      * stop will be used to stop the view and track post-foreground events in a new view
      * pause will be used when after foreground event, an action like pressing play button is expected to resume the content
      * '' will be used if the content can be played in background
      * If not defined, specific device options will be used
      * background.setings.android / background.settings.iOS / background.settings.desktop / background.settings.tv
      * Default specific device values are stop for android and iphone, nothing for desktop.
      */
      this['background.settings'] = null

      /**
      *  @prop {string} [background.settings.android='stop']
      * If background.settings is not defined, action to do when the browser goes to background if
      * the device is android type.
      * Options are 'stop', 'pause', and '' or not defined for no action.
      * bg by default
      */
      this['background.settings.android'] = 'stop'

      /**
      *  @prop {string} [background.settings.iOS='stop']
      * If background.settings is not defined, action to do when the browser goes to background if
      * the device is iphone type.
      * Options are 'stop', 'pause', and '' or not defined for no action.
      * bg by default
      */
      this['background.settings.iOS'] = 'stop'

      /**
      *  @prop {string} [background.settings.desktop=null]
      * If background.settings is not defined, action to do when the browser goes to background if
      * the device is desktop type.
      * Options are 'stop', 'pause', and '' or not defined for no action.
      * Null by default
      */
      this['background.settings.desktop'] = null

      /**
      *  @prop {string} [background.settings.tv='stop']
      * If background.settings is not defined, action to do when the browser goes to background if
      * the device is smartTV type.
      * Options are 'stop', 'pause', and '' or not defined for no action.
      * bg by default
      */
      this['background.settings.tv'] = 'stop'

      /**
      *  @prop {string} [background.settings.playstation='stop']
      * If background.settings is not defined, action to do when the browser goes to background if
      * the device is playstation type.
      * Options are 'stop', 'pause', and '' or not defined for no action.
      * Null by default
      */
      this['background.settings.playstation'] = 'stop'

      // SMARTSWITCH

      /**
      *  @prop {string} [smartswitch.configCode]
      * Config code for smartswitch
      * null by default
      */
      this['smartswitch.configCode'] = null

      /**
      *  @prop {string} [smartswitch.groupCode]
      * Group code for smartswitch
      * null by default
      */
      this['smartswitch.groupCode'] = null

      /**
      *  @prop {string} [smartswitch.contractCode]
      * Contract code for smartswitch
      * null by default
      */
      this['smartswitch.contractCode'] = null

      // EXTRAPARAMS // CUSTOM DIMENSIONS

      /** @prop {object} [content.customDimensions] Custom dimensions object. */
      this['content.customDimensions'] = {}

      /** @prop {string} [content.customDimension.1] Custom parameter 1. */
      this['content.customDimension.1'] = null

      /** @prop {string} [content.customDimension.2] Custom parameter 2. */
      this['content.customDimension.2'] = null

      /** @prop {string} [content.customDimension.3] Custom parameter 3. */
      this['content.customDimension.3'] = null

      /** @prop {string} [content.customDimension.4] Custom parameter 4. */
      this['content.customDimension.4'] = null

      /** @prop {string} [content.customDimension.5] Custom parameter 5. */
      this['content.customDimension.5'] = null

      /** @prop {string} [content.customDimension.6] Custom parameter 6. */
      this['content.customDimension.6'] = null

      /** @prop {string} [content.customDimension.7] Custom parameter 7. */
      this['content.customDimension.7'] = null

      /** @prop {string} [content.customDimension.8] Custom parameter 8. */
      this['content.customDimension.8'] = null

      /** @prop {string} [content.customDimension.9] Custom parameter 9. */
      this['content.customDimension.9'] = null

      /** @prop {string} [content.customDimension.10] Custom parameter 10. */
      this['content.customDimension.10'] = null

      /** @prop {string} [content.customDimension.11] Custom parameter 11. */
      this['content.customDimension.11'] = null

      /** @prop {string} [content.customDimension.12] Custom parameter 12. */
      this['content.customDimension.12'] = null

      /** @prop {string} [content.customDimension.13] Custom parameter 13. */
      this['content.customDimension.13'] = null

      /** @prop {string} [content.customDimension.14] Custom parameter 14. */
      this['content.customDimension.14'] = null

      /** @prop {string} [content.customDimension.15] Custom parameter 15. */
      this['content.customDimension.15'] = null

      /** @prop {string} [content.customDimension.16] Custom parameter 16. */
      this['content.customDimension.16'] = null

      /** @prop {string} [content.customDimension.17] Custom parameter 17. */
      this['content.customDimension.17'] = null

      /** @prop {string} [content.customDimension.18] Custom parameter 18. */
      this['content.customDimension.18'] = null

      /** @prop {string} [content.customDimension.19] Custom parameter 19. */
      this['content.customDimension.19'] = null

      /** @prop {string} [content.customDimension.20] Custom parameter 20. */
      this['content.customDimension.20'] = null

      /** @prop {string} [ad.customDimension.1] Ad custom parameter 1. */
      this['ad.customDimension.1'] = null

      /** @prop {string} [ad.customDimension.2] Ad custom parameter 2. */
      this['ad.customDimension.2'] = null

      /** @prop {string} [ad.customDimension.3] Ad custom parameter 3. */
      this['ad.customDimension.3'] = null

      /** @prop {string} [ad.customDimension.4] Ad custom parameter 4. */
      this['ad.customDimension.4'] = null

      /** @prop {string} [ad.customDimension.5] Ad custom parameter 5. */
      this['ad.customDimension.5'] = null

      /** @prop {string} [ad.customDimension.6] Ad custom parameter 6. */
      this['ad.customDimension.6'] = null

      /** @prop {string} [ad.customDimension.7] Ad custom parameter 7. */
      this['ad.customDimension.7'] = null

      /** @prop {string} [ad.customDimension.8] Ad custom parameter 8. */
      this['ad.customDimension.8'] = null

      /** @prop {string} [ad.customDimension.9] Ad custom parameter 9. */
      this['ad.customDimension.9'] = null

      /** @prop {string} [ad.customDimension.10] Ad custom parameter 10. */
      this['ad.customDimension.10'] = null

      /** @prop {bool} [forceInit] Forces init to be sent instead of start, use it when mediaduration,
      *  title, source or is live is reported with a wrong value by the player until jointime happens */
      this.forceInit = false

      /**
      * @prop {object} [session.metrics]
      * Item containing metrics in json format. Reported every beat if the values change
      */
      this['session.metrics'] = {}

      /**
      * @prop {bool} [session.context]
      * Boolean to choose to report context or not. False by default
      */
      this['session.context'] = false

      /**
      * @prop {array<string>} [errors.fatal=[]]
      * If it has elements on it, all the errors matching this code will fire the stop event to end the view
      */
      this['errors.fatal'] = []

      /**
      * @prop {array<string>} [errors.nonFatal=[]]
      * If it has elements on it, all the errors matching this code won't fire a stop event to end the view
      */
      this['errors.nonFatal'] = []

      /**
      * @prop {array<string>} [errors.ignore=[]]
      * If it has elements on it, all the errors matching this code wont be reported
      */
      this['errors.ignore'] = []

      /**
       * @prop {string} linkedViewId
       * String to send on start events to link views with previous session events
       */
      this.linkedViewId = null

      /**
      * @prop {bool} [waitForMetadata]
      * Boolean to delay the start event. Use with `pendingMetadata`
      */
      this.waitForMetadata = false

      /**
      * @prop {array<string>} [pendingMetadata]
      * List of values that should be ready to send in start event. Use with `waitForMetadata` set to True.
      */
      this.pendingMetadata = []

      this.setOptions(options)
    },

    /**
    * Recursively sets the properties present in the params object.
    * ie: this.username = params.username.
    *
    * @param {Object} options A literal or another Data containing values.
    * @param {Object} [base=this] Start point for recursion.
    */
    setOptions: function (options, base) {
      var isInBase = false
      if (base === undefined) {
        base = this
        isInBase = true
        var deprecatedOptions = new DeprecatedOptions()
      }
      if (typeof options !== 'undefined') {
        for (var key in options) {
          var deprecated = false
          var newKey = null
          if (isInBase) {
            if (!this.hasOwnProperty(key)) { // eslint-disable-line no-prototype-builtins
              if (deprecatedOptions.exists(key)) {
                newKey = deprecatedOptions.getNewName(key)
                deprecated = true
              } else {
                Log.warn('The option "' + key + '" does not exist, so it cannot be set')
              }
            }
          }
          if ((typeof base[key] === 'object' && base[key] !== null) && (!Array.isArray(base[key]) && key === 'parse.cdnNode.list')) {
            this.setOptions(options[key], base[key])
          } else {
            if (deprecated) {
              base[newKey] = options[key]
            } else {
              base[key] = options[key]
            }
          }
        }
      }
    },

    /**
    * Sets all the values given in an array as extraparams. Limit is 20
    * @param {array<string>} paramsArray array of extraparam strings
    * */
    setExtraParams: function (paramsArray) {
      var maxLength = 20
      if (typeof paramsArray !== 'object' || !paramsArray.length) return
      if (paramsArray.length >= maxLength) paramsArray = paramsArray.slice(0, maxLength)
      while (paramsArray.length < maxLength) {
        paramsArray.push(null)
      }
      paramsArray.forEach(function (param, index) {
        this['content.customDimension.' + (index + 1).toString()] = param
      }.bind(this))
    },

    /**
    * @alias youbora.options.prototype.setExtraParams.
    */
    setCustomDimensions: function () {
      Options.prototype.setExtraParams.apply(this, arguments)
    },

    /**
    * Sets all the values given in an array as extraparams. Limit is 10
    * @param {array<string>} paramsArray array of extraparam strings
    * */
    setAdExtraParams: function (paramsArray) {
      var maxLength = 10
      if (typeof paramsArray !== 'object' || !paramsArray.length) return
      if (paramsArray.length >= maxLength) paramsArray = paramsArray.slice(0, maxLength)
      while (paramsArray.length < maxLength) {
        paramsArray.push(null)
      }
      paramsArray.forEach(function (param, index) {
        this['ad.customDimension.' + (index + 1).toString()] = param
      }.bind(this))
    },

    /**
    * @alias youbora.options.prototype.setAdExtraParams.
    */
    setAdCustomDimensions: function () {
      Options.prototype.setAdExtraParams.apply(this, arguments)
    }
  }, {
  // Constants
    StreamingProtocol: StreamingProtocol,
    TransportFormat: TransportFormat
  }
)

module.exports = Options


/***/ }),
/* 159 */
/***/ (function(module, exports) {

/**
 * List of streaming protocols
 *   - HDS (Adobe HDS)
 *   - HLS (Apple HLS)
 *   - MSS (Microsoft Smooth Streaming)
 *   - DASH (MPEG-DASH)
 *   - RTMP (Adobe RTMP)
 *   - RTP (RTP)
 *   - RTSP (RTSP)
 */
var StreamingProtocol = {
  HDS: 'HDS',
  HLS: 'HLS',
  MSS: 'MSS',
  DASH: 'DASH',
  RTMP: 'RTMP',
  RTP: 'RTP',
  RTSP: 'RTSP'
}

module.exports = StreamingProtocol


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

var YouboraObject = __webpack_require__(10)
var Log = __webpack_require__(8)

var startParams = [
  'accountCode',
  'username',
  'anonymousUser',
  'rendition',
  'deviceInfo',
  'player',
  'title',
  'title2',
  'live',
  'segmentDuration',
  'mediaDuration',
  'mediaResource',
  'parsedResource',
  'transactionCode',
  'properties',
  'cdn',
  'playerVersion',
  'param1',
  'param2',
  'param3',
  'param4',
  'param5',
  'param6',
  'param7',
  'param8',
  'param9',
  'param10',
  'param11',
  'param12',
  'param13',
  'param14',
  'param15',
  'param16',
  'param17',
  'param18',
  'param19',
  'param20',
  'dimensions',
  'playerStartupTime',
  'obfuscateIp',
  'privacyProtocol',
  'p2pEnabled',
  'pluginVersion',
  'pluginInfo',
  'isp',
  'connectionType',
  'ip',
  'referer',
  'userType',
  'streamingProtocol',
  'transportFormat',
  'householdId',
  'adsBlocked',
  'adsExpected',
  'deviceUUID',
  'smartswitchConfigCode',
  'smartswitchGroupCode',
  'smartswitchContractCode',
  'libVersion',
  'nodeHost',
  'nodeType',
  'appName',
  'appReleaseVersion',
  'package',
  'saga',
  'tvshow',
  'season',
  'titleEpisode',
  'channel',
  'imdbID',
  'gracenoteID',
  'contentType',
  'genre',
  'contentLanguage',
  'subtitles',
  'cost',
  'price',
  'playbackType',
  'email',
  'drm',
  'videoCodec',
  'audioCodec',
  'codecSettings',
  'codecProfile',
  'containerFormat',
  'contentId',
  'contractedResolution',
  'linkedViewId',
  'edid',
  'cdnBalancerResponseUUID'
]

var adStartParams = [
  'player',
  'playhead',
  'adTitle',
  'position',
  'adDuration',
  'adCampaign',
  'adCreativeId',
  'adProvider',
  'adResource',
  'adPlayerVersion',
  'adProperties',
  'adAdapterVersion',
  'adInsertionType',
  'extraparam1',
  'extraparam2',
  'extraparam3',
  'extraparam4',
  'extraparam5',
  'extraparam6',
  'extraparam7',
  'extraparam8',
  'extraparam9',
  'extraparam10',
  'fullscreen',
  'audio',
  'skippable',
  'adNumber',
  'adNumberInBreak',
  'breakNumber'
]

var RequestBuilder = YouboraObject.extend(
  /** @lends youbora.RequestBuilder.prototype */
  {
    /**
     * This class helps building params associated with each event: /start, /joinTime...
     *
     * @constructs RequestBuilder
     * @extends youbora.YouboraObject
     * @memberof youbora
     *
     * @param {Plugin} plugin A Plugin instance
     */
    constructor: function (plugin) {
      this._plugin = plugin
      this._adNumber = 0
      this._adNumberInBreak = 0

      /** Stores a list of the last params fetched */
      this.lastSent = {}
    },

    /**
     * Adds to params all the entities specified in paramList, unless they are already set.
     *
     * @param {Object} params Object of params key:value.
     * @param {Array.string} paramList A list of params to fetch.
     * @param {bool} onlyDifferent If true, only fetches params that have changed
     */
    fetchParams: function (params, paramList, onlyDifferent) {
      params = params || {}
      paramList = paramList || []
      for (var i = 0; i < paramList.length; i++) {
        var param = paramList[i]

        if (params[param]) { continue }
        var getterName = RequestBuilder.getters[param]

        if (this._plugin[getterName]) {
          var value = this._plugin[getterName]()
          if (value !== null && (!onlyDifferent || this.lastSent[param] !== value)) {
            params[param] = value
            this.lastSent[param] = value
          }
        } else {
          Log.warn('Trying to call undefined getter ' + param + ':' + getterName)
        }
      }
      return params
    },

    getGetters: function () {
      return RequestBuilder.getters
    },

    buildBody: function (service) {
      var body = null
      return this.fetchParams(body, RequestBuilder.bodyParams[service], false)
    },

    /**
     * Adds to params object all the entities specified in paramList, unless they are already set.
     *
     * @param {Object} params Object of params key:value.
     * @param {string} service The name of the service. Use {@link Plugin.Service} enum.
     */
    buildParams: function (params, service) {
      params = params || {}
      this.fetchParams(params, RequestBuilder.params[service], false)
      this.fetchParams(params, RequestBuilder.differentParams[service], true)
      return params
    },

    /**
     * Creates an adnumber if it does not exist and stores it in lastSent. If it already exists,
     * it is incremented by 1.
     *
     * @returns {number} adNumber
     */
    getNewAdNumber: function () {
      var adNumber = this.lastSent.adNumber
      if (adNumber && this.lastSent.position === this._plugin.getAdPosition()) {
        adNumber += 1
      } else {
        adNumber = 1
      }
      this.lastSent.adNumber = adNumber
      return adNumber
    },

    /**
     * Creates an adnumberinbreak incrementing by 1.
     *
     * @returns {number} adNumber
     */
    getNewAdNumberInBreak: function () {
      this._adNumberInBreak++
      this.lastSent.adNumberInBreak = this._adNumberInBreak
      return this._adNumberInBreak
    },

    /**
     * Creates an breaknumber if it does not exist and stores it in lastSent. If it already exists,
     * it is incremented by 1.
     * Also resets adnumberinbreak
     * @returns {number} breakNumber
     */
    getNewBreakNumber: function () {
      var breakNumber = 1
      this._adNumberInBreak = 0
      if (this.lastSent.breakNumber) {
        breakNumber = this.lastSent.breakNumber + 1
      }
      this.lastSent.breakNumber = breakNumber
      return breakNumber
    },

    /**
     * Return changed entities since last check
     *
     * @returns {Object} params
     */
    getChangedEntities: function () {
      return this.fetchParams({}, RequestBuilder.differentParams.entities, true)
    }
  },
  /** @lends youbora.RequestBuilder */
  {
    // Static Members

    /** List of params used by each service */
    params: {
      '/data': ['system', 'pluginVersion', 'requestNumber', 'username'],

      '/init': startParams,
      '/start': startParams,
      '/joinTime': ['joinDuration', 'playhead', 'bitrate'],
      '/pause': ['playhead'],
      '/resume': ['pauseDuration', 'playhead'],
      '/seek': ['seekDuration', 'playhead'],
      '/bufferUnderrun': ['bufferDuration', 'playhead'],
      '/error': ['player', 'playhead'].concat(startParams),
      '/stop': ['bitrate', 'totalBytes', 'playhead', 'pauseDuration', 'metrics', 'cdnDownloadedTraffic', 'multiCdnInfo', 'p2pDownloadedTraffic', 'uploadTraffic'],

      '/infinity/video/event': [],

      '/adInit': adStartParams,
      '/adStart': adStartParams,
      '/adJoin': ['playhead', 'position', 'adJoinDuration', 'adPlayhead', 'adNumber', 'adNumberInBreak', 'breakNumber'],
      '/adPause': ['playhead', 'position', 'adPlayhead', 'adNumber', 'adNumberInBreak', 'breakNumber'],
      '/adResume': ['playhead', 'position', 'adPlayhead', 'adPauseDuration', 'adNumber', 'adNumberInBreak', 'breakNumber'],
      '/adBufferUnderrun': ['playhead', 'position', 'adPlayhead', 'adBufferDuration', 'adNumber', 'adNumberInBreak', 'breakNumber'],
      '/adStop': ['playhead', 'position', 'adPlayhead', 'adBitrate', 'adTotalDuration', 'pauseDuration', 'adViewedDuration', 'adViewability', 'adNumber', 'adNumberInBreak', 'breakNumber'],
      '/adClick': ['playhead', 'position', 'adPlayhead', 'adNumber', 'adNumberInBreak', 'breakNumber'],
      '/adError': ['playhead'].concat(adStartParams),
      '/adManifest': ['givenBreaks', 'expectedBreaks', 'expectedPattern', 'breaksTime'],
      '/adBreakStart': ['position', 'givenAds', 'expectedAds', 'breakNumber', 'adInsertionType'],
      '/adBreakStop': ['position', 'breakNumber'],
      '/adQuartile': ['position', 'adViewedDuration', 'adViewability', 'adNumber', 'adNumberInBreak', 'breakNumber'],

      '/ping': ['droppedFrames', 'playrate', 'cdnDownloadedTraffic', 'multiCdnInfo', 'p2pDownloadedTraffic', 'uploadTraffic', 'latency', 'packetLoss', 'packetSent', 'metrics', 'totalBytes', 'segmentDuration'],

      '/infinity/session/start': [
        'accountCode',
        'username',
        'userType',
        'anonymousUser',
        'navContext',
        'route',
        'page',
        'referer',
        'referral',
        'language',
        'deviceInfo',
        'adsBlocked',
        'deviceUUID',
        'libVersion',
        'appName',
        'appReleaseVersion',
        'isp',
        'connectionType',
        'ip',
        'obfuscateIp',
        'privacyProtocol',
        'param1',
        'param2',
        'param3',
        'param4',
        'param5',
        'param6',
        'param7',
        'param8',
        'param9',
        'param10',
        'param11',
        'param12',
        'param13',
        'param14',
        'param15',
        'param16',
        'param17',
        'param18',
        'param19',
        'param20',
        'edid'
      ],
      '/infinity/session/stop': ['sessionMetrics'],
      '/infinity/session/nav': ['navContext', 'route', 'page', 'scrollDepth'],
      '/infinity/session/beat': ['sessionMetrics'],
      '/infinity/session/event': ['accountCode', 'navContext'],

      '/offlineEvents': {}
    },

    /** Values for request body */
    bodyParams: {
      '/offlineEvents': ['viewJson']
    },

    /** List of params used by each service (only if they are different) */
    differentParams: {
      entities: [
        'rendition',
        'title',
        'title2',
        'param1',
        'param2',
        'param3',
        'param4',
        'param5',
        'param6',
        'param7',
        'param8',
        'param9',
        'param10',
        'param11',
        'param12',
        'param13',
        'param14',
        'param15',
        'param16',
        'param17',
        'param18',
        'param19',
        'param20',
        'cdn',
        'nodeHost',
        'nodeType',
        'nodeTypeString',
        'subtitles',
        'contentLanguage'
      ]
    },

    /** List of params and its related getter */
    getters: {
      requestNumber: 'getRequestNumber',
      playhead: 'getPlayhead',
      playrate: 'getPlayrate',
      fps: 'getFramesPerSecond',
      segmentDuration: 'getSegmentDuration',
      droppedFrames: 'getDroppedFrames',
      mediaDuration: 'getDuration',
      bitrate: 'getBitrate',
      totalBytes: 'getTotalBytes',
      throughput: 'getThroughput',
      rendition: 'getRendition',
      title: 'getTitle',
      title2: 'getTitle2',
      live: 'getIsLive',
      mediaResource: 'getResource',
      parsedResource: 'getParsedResource',
      transactionCode: 'getTransactionCode',
      properties: 'getMetadata',
      playerVersion: 'getPlayerVersion',
      player: 'getPlayerName',
      cdn: 'getCdn',
      pluginVersion: 'getPluginVersion',
      libVersion: 'getLibVersion',
      userType: 'getUserType',
      streamingProtocol: 'getStreamingProtocol',
      transportFormat: 'getTransportFormat',
      obfuscateIp: 'getObfuscateIp',
      privacyProtocol: 'getPrivacyProtocol',
      householdId: 'getHouseholdId',
      latency: 'getLatency',
      packetLoss: 'getPacketLoss',
      packetSent: 'getPacketSent',
      metrics: 'getVideoMetrics',
      dimensions: 'getCustomDimensions',

      param1: 'getExtraparam1',
      param2: 'getExtraparam2',
      param3: 'getExtraparam3',
      param4: 'getExtraparam4',
      param5: 'getExtraparam5',
      param6: 'getExtraparam6',
      param7: 'getExtraparam7',
      param8: 'getExtraparam8',
      param9: 'getExtraparam9',
      param10: 'getExtraparam10',
      param11: 'getExtraparam11',
      param12: 'getExtraparam12',
      param13: 'getExtraparam13',
      param14: 'getExtraparam14',
      param15: 'getExtraparam15',
      param16: 'getExtraparam16',
      param17: 'getExtraparam17',
      param18: 'getExtraparam18',
      param19: 'getExtraparam19',
      param20: 'getExtraparam20',

      extraparam1: 'getAdExtraparam1',
      extraparam2: 'getAdExtraparam2',
      extraparam3: 'getAdExtraparam3',
      extraparam4: 'getAdExtraparam4',
      extraparam5: 'getAdExtraparam5',
      extraparam6: 'getAdExtraparam6',
      extraparam7: 'getAdExtraparam7',
      extraparam8: 'getAdExtraparam8',
      extraparam9: 'getAdExtraparam9',
      extraparam10: 'getAdExtraparam10',

      position: 'getAdPosition',
      adNumber: 'getAdNumber',
      adNumberInBreak: 'getAdNumberInBreak',
      breakNumber: 'getBreakNumber',
      adPlayhead: 'getAdPlayhead',
      adDuration: 'getAdDuration',
      adCampaign: 'getAdCampaign',
      adCreativeId: 'getAdCreativeId',
      adBitrate: 'getAdBitrate',
      adTitle: 'getAdTitle',
      adResource: 'getAdResource',
      adPlayerVersion: 'getAdPlayerVersion',
      adProperties: 'getAdMetadata',
      adAdapterVersion: 'getAdAdapterVersion',
      givenBreaks: 'getGivenBreaks',
      expectedBreaks: 'getExpectedBreaks',
      expectedPattern: 'getExpectedPattern',
      breaksTime: 'getBreaksTime',
      givenAds: 'getGivenAds',
      expectedAds: 'getExpectedAds',
      adsExpected: 'getAdsExpected',
      adViewedDuration: 'getAdViewedDuration',
      adViewability: 'getAdViewability',
      fullscreen: 'getIsFullscreen',
      audio: 'getAudioEnabled',
      skippable: 'getIsSkippable',
      adProvider: 'getAdProvider',
      adInsertionType: 'getAdInsertionType',

      pluginInfo: 'getPluginInfo',

      isp: 'getIsp',
      connectionType: 'getConnectionType',
      ip: 'getIp',

      deviceInfo: 'getDeviceInfo',
      edid: 'getEDID',

      system: 'getAccountCode',
      accountCode: 'getAccountCode',
      username: 'getUsername',
      anonymousUser: 'getAnonymousUser',

      joinDuration: 'getJoinDuration',
      bufferDuration: 'getBufferDuration',
      seekDuration: 'getSeekDuration',
      pauseDuration: 'getPauseDuration',

      adJoinDuration: 'getAdJoinDuration',
      adBufferDuration: 'getAdBufferDuration',
      adPauseDuration: 'getAdPauseDuration',
      adTotalDuration: 'getAdTotalDuration',

      referer: 'getReferer',
      referral: 'getReferral',
      language: 'getLanguage',

      nodeHost: 'getNodeHost',
      nodeType: 'getNodeType',
      nodeTypeString: 'getNodeTypeString',

      route: 'getReferer',
      navContext: 'getContext',
      page: 'getPageName',

      playerStartupTime: 'getPlayerStartupTime',
      pageLoadTime: 'getPageLoadTime',

      cdnDownloadedTraffic: 'getCdnTraffic',
      multiCdnInfo: 'getMultiCdnInfo',
      p2pDownloadedTraffic: 'getP2PTraffic',
      p2pEnabled: 'getIsP2PEnabled',
      uploadTraffic: 'getUploadTraffic',
      cdnBalancerResponseUUID: 'getBalancerResponseId',

      viewJson: 'getOfflineView',
      deviceUUID: 'getDeviceUUID',
      sessionMetrics: 'getSessionMetrics',
      scrollDepth: 'getScrollDepth',

      adsBlocked: 'getIsBlocked',
      linkedViewId: 'getLinkedViewId',

      smartswitchConfigCode: 'getSmartswitchConfigCode',
      smartswitchGroupCode: 'getSmartswitchGroupCode',
      smartswitchContractCode: 'getSmartswitchContractCode',

      appName: 'getAppName',
      appReleaseVersion: 'getAppReleaseVersion',
      package: 'getPackage',
      saga: 'getSaga',
      tvshow: 'getTvShow',
      season: 'getSeason',
      titleEpisode: 'getEpisodeTitle',
      channel: 'getChannel',
      drm: 'getDRM',
      videoCodec: 'getVideoCodec',
      audioCodec: 'getAudioCodec',
      codecSettings: 'getCodecSettings',
      codecProfile: 'getCodecProfile',
      containerFormat: 'getContainerFormat',
      contentId: 'getID',
      imdbID: 'getImdbId',
      gracenoteID: 'getGracenoteID',
      contentType: 'getType',
      genre: 'getGenre',
      contentLanguage: 'getVideoLanguage',
      subtitles: 'getSubtitles',
      contractedResolution: 'getContractedResolution',
      cost: 'getCost',
      price: 'getPrice',
      playbackType: 'getPlaybackType',
      email: 'getEmail'
    }

  }
)

module.exports = RequestBuilder


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

var YouboraObject = __webpack_require__(10)
/**
 * This static class provides device detection methods.
 *
 * @class
 * @static
 * @memberof youbora
 */
var BackgroundDetector = YouboraObject.extend({
  constructor: function (plugin) {
    this.plugin = plugin
    this.isInBackground = false
    this.listenerReference = this._visibilityListener.bind(this)
    this._reset()
  },

  startDetection: function () {
    if (!this.isBackgroundDetectorStarted && typeof document !== 'undefined') {
      this.isBackgroundDetectorStarted = true
      document.addEventListener('visibilitychange', this.listenerReference)
    }
  },

  stopDetection: function () {
    if (this.isBackgroundDetectorStarted && typeof document !== 'undefined') {
      document.removeEventListener('visibilitychange', this.listenerReference)
      this._reset()
    }
  },

  _reset: function () {
    this.isBackgroundDetectorStarted = false
  },

  _visibilityListener: function (e) {
    if (typeof document !== 'undefined') {
      var settings = this._getSettings()
      if (document.visibilityState === 'hidden') {
        this._toBackground(settings)
      } else if (document.visibilityState === 'visible') { // to Foreground
        this._toForeground(settings)
      }
    }
  },

  _toBackground: function (settings) {
    this.isInBackground = true
    if (this.plugin && this.plugin._adsAdapter) {
      this.plugin._adsAdapter.stopChronoView()
    }
    if (typeof settings === 'string') {
      switch (settings) {
        case 'stop':
          this._fireStop()
          break
        case 'pause':
          this._firePause()
          break
      }
      if (this.plugin.infinity.infinityStarted) {
        this.lastBeatTime = new Date().getTime()
        var difftime = this.plugin._beat.chrono.startTime ? (this.lastBeatTime - this.plugin._beat.chrono.startTime) : 0
        this.plugin._sendBeat(difftime)
        this.plugin._beat.stop()
      }
    }
  },

  _toForeground: function (settings) {
    this.isInBackground = false
    // ads
    if (this.plugin && this.plugin._adsAdapter) {
      this.plugin._adsAdapter.startChronoView()
    }
    // nothing for video yet
    if (typeof settings === 'string' && settings) {
      if (this.plugin.infinity.infinityStarted) {
        var now = new Date().getTime()
        if (now - this.lastBeatTime < this.plugin.sessionExpire) { // if session not expired
          this.plugin._sendBeat(now - this.lastBeatTime)
          this.plugin._beat.start()
        } else { // session expired
          this.plugin.infinity.newSession()
        }
      }
    }
  },

  _getSettings: function () {
    if (typeof this.plugin.options['background.settings'] === 'string' && this.plugin.options['background.settings']) {
      return this.plugin.options['background.settings']
    }
    if (this.plugin.deviceDetector.isSmartTV()) {
      return this.plugin.options['background.settings.tv']
    }
    if (this.plugin.deviceDetector.isDesktop()) {
      return this.plugin.options['background.settings.desktop']
    }
    if (this.plugin.deviceDetector.isAndroid()) {
      return this.plugin.options['background.settings.android']
    }
    if (this.plugin.deviceDetector.isIphone()) {
      return this.plugin.options['background.settings.iOS']
    }
    if (this.plugin.deviceDetector.isPlayStation()) {
      return this.plugin.options['background.settings.playstation']
    }
  },

  _firePause: function () {
    this._fireX('firePause')
  },

  _fireStop: function () {
    this._fireX('fireStop')
    this.plugin.fireStop()
  },

  _fireX: function (fireMethod) {
    this.adsAdapter = this.plugin.getAdsAdapter()
    if (this.adsAdapter) {
      this.adsAdapter[fireMethod]()
    }
    this.contentAdapter = this.plugin.getAdapter()
    if (this.contentAdapter) {
      this.contentAdapter[fireMethod]()
    }
  },

  canBlockStartCalls: function () {
    return (
      this.isInBackground &&
      this.plugin.options['background.enabled'] === true &&
      this._getSettings() // it is stop or pause
    )
  }
})

module.exports = BackgroundDetector


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

var YouboraObject = __webpack_require__(10)
/**
 * This static class provides device detection methods.
 *
 * @class
 * @static
 * @memberof youbora
 */
var DeviceDetector = YouboraObject.extend({
  constructor: function () {
    if (typeof navigator !== 'undefined' && navigator.userAgent) {
      this._isSmartTVDevice = navigator.userAgent.toLowerCase().match(/smarttv/) ||
        navigator.userAgent.toLowerCase().match(/smart-tv/) ||
        navigator.userAgent.toLowerCase().match(/appletv/) ||
        navigator.userAgent.toLowerCase().match(/apple tv/)
      this._isPlaystationDevice = navigator.userAgent.match(/PlayStation/) !== null
      this._isIphoneDevice = navigator.userAgent.match(/iPhone|iPad|iPod/i) !== null
      this._isAndroidDevice = navigator.userAgent.match(/Android/) !== null
      this._isSmartphoneDevice = !this._isSmartTVDevice && !this._isPlaystationDevice && (this._isIphoneDevice || this._isAndroidDevice)
      this._isDesktopDevice = !this._isSmartphoneDevice && !this._isSmartTVDevice && !this._isPlaystationDevice
    }
  },

  isIphone: function () {
    return this._isIphoneDevice
  },

  isAndroid: function () {
    return this._isAndroidDevice
  },

  isSmartphone: function () {
    return this._isSmartphoneDevice
  },

  isDesktop: function () {
    return this._isDesktopDevice
  },

  isSmartTV: function () {
    return this._isSmartTVDevice
  },

  isPlayStation: function () {
    return this._isPlaystationDevice
  }
})

module.exports = DeviceDetector


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

var DataExtractor = __webpack_require__(400)
var YouboraObject = __webpack_require__(10)
var MD5 = __webpack_require__(401)

var HashGenerator = YouboraObject.extend({
  constructor: function (plugin) {
    this.plugin = plugin
    this.dataExtractor = new DataExtractor()
    this.key = this.getPreviousKey()
  },

  generateHashKey: function () {
    if (!this.key) {
      var data = this.dataExtractor.getAllData()
      this.key = this._hashFunction(data)
      this.plugin.storage.setLocal('youboraDeviceUUID', this.key)
    }
  },

  getKey: function () {
    if (!this.key) this.generateHashKey()
    return this.key
  },

  _hashFunction: function (inputString) {
    var outputString = inputString
    if (typeof inputString !== 'string') {
      outputString = JSON.stringify(inputString)
    }
    return MD5(outputString)
  },

  _reset: function () {
    this.key = undefined
  },

  getPreviousKey: function () {
    return this.plugin.storage.getLocal('youboraDeviceUUID')
  }

})

module.exports = HashGenerator


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

var YouboraObject = __webpack_require__(10)
var Timer = __webpack_require__(107)
var Chrono = __webpack_require__(54)

var PlayheadMonitor = YouboraObject.extend(
  /** @lends youbora.PlayheadMonitor.prototype */
  {
    /**
     * This class periodically checks the player's playhead in order to infer buffer and/or seek
     * events.
     *
     * Instances of this class are bounded to an {@link Adapter} and fires its buffer and seek
     * start and end methods.
     *
     * In order to use this feature, {@link Adapter#monitorPlayhead} should be used.
     *
     * @constructs PlayheadMonitor
     * @extends youbora.YouboraObject
     * @memberof youbora
     *
     * @param {Adapter} adapter Adapter to monitor. Must have getPlayhead defined.
     * @param {PlayheadMonitor.Type} [type=NONE]
     * Which metric to monitor seek and/or buffer.
     * Use bitwise operators to join both values (Type.BUFFER | Type.SEEK)
     * @param {int} [interval=800] How many ms will wait between progress. -1 to disable.
     */
    constructor: function (adapter, type, interval) {
      this._adapter = adapter
      this._seekEnabled = type & PlayheadMonitor.Type.SEEK
      this._bufferEnabled = type & PlayheadMonitor.Type.BUFFER
      interval = interval || 800

      this._chrono = new Chrono()
      this._lastPlayhead = 0

      if (interval > 0) {
        this._timer = new Timer(this.progress.bind(this), interval)
      }
    },

    /**
     * Start interval checks.
     */
    start: function () {
      this.stop()
      if (this.canBeUsed()) this._timer.start()
    },

    /**
     * Stop interval checks.
     */
    stop: function () {
      this._lastPlayhead = 0
      if (this._timer) this._timer.stop()
    },

    skipNextTick: function () {
      this._lastPlayhead = 0
    },

    /**
     * Call this method at every tick of timeupdate/progress.
     * If you defined an interval, do not fire this method manually.
     */
    progress: function () {
      // Reset timer
      var deltaTime = this._chrono.stop()
      this._chrono.start()

      // Define thresholds
      var bufferThreshold = deltaTime * PlayheadMonitor.kBUFFER_THRESHOLD_RATIO
      var seekThreshold = deltaTime * PlayheadMonitor.kSEEK_THRESHOLD_RATIO

      if (this._adapter.getPlayrate && this._adapter.getPlayrate() && this._adapter.getPlayrate() !== 1) {
        bufferThreshold *= this._adapter.getPlayrate()
        seekThreshold *= this._adapter.getPlayrate()
      }

      // Calculate diff playhead
      var currentPlayhead = this._getPlayhead()
      var diffPlayhead = Math.abs(this._lastPlayhead - currentPlayhead) * 1000

      // youbora.Log.debug('curr: ' + currentPlayhead + ' last: ' + this._lastPlayhead + ' diff: ' + diffPlayhead)

      if (diffPlayhead < bufferThreshold) {
        // Playhead is stalling > buffer
        if (this._bufferEnabled &&
          this._lastPlayhead > 0 &&
          !this._adapter.flags.isPaused &&
          !this._adapter.flags.isSeeking
        ) {
          this._adapter.fireBufferBegin(null, false)
        }
      } else if (diffPlayhead > seekThreshold) {
        // Playhead has jumped > seek
        if (this._seekEnabled && this._lastPlayhead > 0) {
          this._adapter.fireSeekBegin(null, false)
        }
      } else {
        // Healthy
        if (this._seekEnabled) {
          this._adapter.fireSeekEnd()
        }
        if (this._bufferEnabled) {
          this._adapter.fireBufferEnd()
        }
      }

      // Update Playhead
      this._lastPlayhead = currentPlayhead
    },

    /**
     * Returns if the monitor can be used or not.
     * Enabled by default, except the case where the content is live and the option 'content.isLive.noMonitor' is true.
     * @public
     * @returns {boolean} If the monitor can be used or not.
     */
    canBeUsed: function () {
      var plugin = this._adapter.plugin
      return plugin && plugin.getIsLive() ? !plugin.options['content.isLive.noMonitor'] : true
    },

    /**
     * Returns adapter's playhead. Override to add a custom playhead getter.
     * @private
     * @returns {double} Playhead in seconds
     */
    _getPlayhead: function () {
      return this._adapter.getPlayhead()
    }
  },
  /** @lends youbora.PlayheadMonitor */
  {
    // Static methods

    /**
     * Enum for monitoring type
     * @enum
     */
    Type: {
      /** Would not monitor */
      NONE: 0,
      /** Sends buffer-begin/end */
      BUFFER: 1,
      /** Sends seek-begin/end */
      SEEK: 2
    },

    /** Buffer threshold */
    kBUFFER_THRESHOLD_RATIO: 0.5,

    /** Seek threshold */
    kSEEK_THRESHOLD_RATIO: 2
  })

module.exports = PlayheadMonitor


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

/* global shaka */
var youbora = __webpack_require__(105)
var manifest = __webpack_require__(415)

youbora.adapters.Shaka = youbora.Adapter.extend({

  constructor: function(player, tag) {
    youbora.adapters.Shaka.__super__.constructor.call(this, player)
    this.tag = tag ? tag : null
  },

  /** Override to return current plugin version */
  getVersion: function () {
    return manifest.version + '-' + manifest.name + '-' + manifest.tech
  },

  /** Override to return current playhead of the video */
  getPlayhead: function () {
    var tag = this.tag || this._getTagFromPlayer()
    return tag ? tag.currentTime : null
  },

  /** Override to return current playrate */
  getPlayrate: function () {
    if (typeof this.player.getPlaybackRate === 'function') {
      return this.player.getPlaybackRate() || 1
    }
    return 1
  },

  /** Override to return Frames Per Secon (FPS) */
  getFramesPerSecond: function () {
    var track = this._getActiveTrack()
    return track ? track.frameRate : null
  },

  /** Override to return dropped frames since start */
  getDroppedFrames: function () {
    return this.player.getStats().droppedFrames
  },

  /** Override to return the live latency */
  getLatency: function () {
    // Only for shaka 3.0+
    var latency = this.player.getStats().liveLatency
    return latency ? latency * 1000 : undefined
  },

  /** Override to return video duration */
  getDuration: function () {
    var tag = this.tag || this._getTagFromPlayer()
    return tag ? tag.duration : null
  },

  /** Override to return current bitrate */
  getBitrate: function () {
    var stats = this.player.getStats()
    var ret = null
    if (typeof stats.streamBandwidth !== 'undefined') {
      ret = stats.streamBandwidth
    }
    if (typeof stats.streamStats !== 'undefined') {
      ret = stats.streamStats.videoBandwidth
    }
    return ret
  },

  /** Override to return rendition */
  getRendition: function () {
    var track = this._getActiveTrack()
    return track ? youbora.Util.buildRenditionString(track.width, track.height, track.bandwidth) : null
  },

  /** Override to return user bandwidth throughput */
  getThroughput: function () {
    return this.player.getStats().estimatedBandwidth
  },

  /** Override to return title */
  getTitle: function () {
    var tag = this.tag || this._getTagFromPlayer()
    return tag ? tag.title : null
  },

  /** Override to recurn true if live and false if VOD */
  getIsLive: function () {
    return this.player.isLive() ? true : !this.getDuration()
  },

  /** Override to return resource URL. */
  getResource: function () {
    var tag = this.tag || this._getTagFromPlayer()
    var ret = tag ? tag.currentSrc : null
    if (this.player.getAssetUri && this.player.getAssetUri()) {
      ret = this.player.getAssetUri()
    } else if (this.player.getManifestUri && this.player.getManifestUri()) {
      ret = this.player.getManifestUri()
    }
    return ret
  },

  /** Override to return player version */
  getPlayerVersion: function () {
    var ret = null
    if (typeof shaka !== 'undefined') {
      if (shaka.Player) {
        ret = shaka.Player.version
      } if (shaka.player) {
        ret = shaka.player.Player.version
      }
    }
    return ret
  },

  /** Override to return player's name */
  getPlayerName: function () {
    return 'Shaka'
  },

  /** Get the active track, to get playrate, rendition... */
  _getActiveTrack: function () {
    var ret = null
    if (this.player.getVariantTracks) {
      var tracks = this.player.getVariantTracks()
      for (var i in tracks) {
        var track = tracks[i]
        if (track.active && (track.type === 'video' || track.type === 'variant')) {
          ret = track
        }
      }
    } else if (this.player.getVideoTracks) {
      var tracks2 = this.player.getVideoTracks()
      for (var j in tracks2) {
        var track2 = tracks2[j]
        if (track2.active) {
          ret = track2
        }
      }
    }
    return ret
  },

  /** Register listeners to this.player. */
  registerListeners: function () {
    // Enable playhead monitor (buffer = true, seek = false)
    this.monitorPlayhead(true, true)

    // References
    this.references = {
      play: this.playListener.bind(this),
      loadstart: this.autoplayListener.bind(this),
      pause: this.pauseListener.bind(this),
      playing: this.playingListener.bind(this),
      seeking: this.seekingListener.bind(this),
      seeked: this.seekedListener.bind(this),
      ended: this.endedListener.bind(this),
      timeupdate: this.timeupdateListener.bind(this),
      waiting: this.bufferingListener.bind(this)
    }

    this.referencesPlayer = {
      error: this.errorListener.bind(this)
    }

    // Register listeners
    this.tag = null
    this._registerTag()
    for (var key2 in this.referencesPlayer) {
      this.player.addEventListener(key2, this.referencesPlayer[key2])
    }
  },

  _registerTag: function () {
    this.tag = this.tag || this._getTagFromPlayer()
    if (this.tag) {
      for (var key in this.references) {
        this.tag.addEventListener(key, this.references[key])
      }
    } else {
      setTimeout(this._registerTag.bind(this), 50)
    }
  },

  _getTagFromPlayer: function () {
    return this.player.getMediaElement ? this.player.getMediaElement() : this.player.a
  },

  /** Unregister listeners to this.player. */
  unregisterListeners: function () {
    // Disable playhead monitoring
    if (this.monitor) this.monitor.stop()
    
    var tag = this.tag || this._getTagFromPlayer()

    // unregister listeners
    if (tag && this.references) {
      for (var key in this.references) {
        tag.removeEventListener(key, this.references[key])
      }
      delete this.references
    }

    if (this.player && this.referencesPlayer) {
      for (var key2 in this.referencesPlayer) {
        this.player.removeEventListener(key2, this.referencesPlayer[key2])
      }
      delete this.referencesPlayer
    }
  },

  /** Listener for 'play' event. */
  playListener: function (e) {
    this._callStart()
  },

  /** Listener for 'play' event. */
  autoplayListener: function (e) {
    var tag = this.tag || this._getTagFromPlayer()
    if (tag && tag.autoplay) {
      this._callStart()
    }
  },

  /** Listener for 'pause' event. */
  pauseListener: function (e) {
    this.firePause()
  },

  /** Listener for 'playing' event. */
  playingListener: function (e) {
    this.fireResume()
    this._callStart()
    this.fireJoin()
    if (this.flags.isBuffering && this.monitor && typeof this.monitor.canBeUsed === 'function' && !this.monitor.canBeUsed()){
      this.fireBufferEnd()
    }
  },

  /** Listener for 'error' event. */
  errorListener: function (e) {
    // Error codes: https://shaka-player-demo.appspot.com/docs/api/shaka.util.Error.html
    var code = e.detail && e.detail.code? e.detail.code : e.code;
    var msg = e.detail && e.detail.message ? e.detail.message : 'unknown'
    var category = e.detail && e.detail.category? e.detail.category : e.category
    var severity = e.detail && e.detail.severity? e.detail.severity : e.severity;
    if (category && category < 10 && category > 0) {
      var typeDicc = {
        1: 'network',
        2: 'text',
        3: 'media',
        4: 'manifest',
        5: 'streaming',
        6: 'drm',
        7: 'player',
        8: 'cast',
        9: 'storage'
      }
      msg = typeDicc[category] || msg
    }
    if (severity === 2 && [1002,3016].indexOf(code) === -1) {
      this.fireFatalError(code,msg) // code is not on the list and severity is 2: fatal
    } else {
      this.fireError(code,msg) // not severity 2, or in the list: nonfatal
    }
  },

  /** Listener for 'seeking' event. */
  seekingListener: function (e) {
    this.fireSeekBegin()
    if (this.plugin && this.plugin.getIsLive()) this.autoplayListener()
  },

  /** Listener for 'seeked' event. */
  seekedListener: function (e) {
    if (this.flags.isBuffering) {
      this.fireBufferEnd()
    } else if (this.flags.isSeeking) {
      this.fireSeekEnd()
    }
  },

  /** Listener for 'ended' event. */
  endedListener: function (e) {
    this.fireStop()
  },

  timeupdateListener: function (e) {
    if (this.getPlayhead() !== this.initialPlayhead && typeof this.initialPlayhead === 'number') {
      this._callStart()
    } else {
      this.initialPlayhead = this.getPlayhead()
    }
  },

  bufferingListener: function(e) {
    if (this.monitor && typeof this.monitor.canBeUsed === 'function' && !this.monitor.canBeUsed()){
      this.fireBufferBegin()
    }
  },

  _callStart: function () {
    if (!this.flags.isStarted) {
      this.fireStart()
      this.initialPlayhead = this.getPlayhead()
    }
    if (this._initialPlayheadChanged() ) this.fireJoin()
  },

  _initialPlayheadChanged: function () {
    var ret = false
    if (!this.flags.isJoined) {
      var current = this.getPlayhead()
      var initial = this.initialPlayhead || 0
      var live = this.plugin ? this.plugin.getIsLive() : this.getIsLive()
      if ( ((initial !== 0 && live) || !live) && current > initial) {
        ret = true
      } else if (live) {
        this.initialPlayhead = current
      }
    }
    return ret
  }
})

module.exports = youbora.adapters.Shaka


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(167);

__webpack_require__(369);

__webpack_require__(371);

__webpack_require__(105);

__webpack_require__(165);

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(168);

__webpack_require__(365);

__webpack_require__(366);

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(112)))

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(169);
__webpack_require__(172);
__webpack_require__(173);
__webpack_require__(174);
__webpack_require__(175);
__webpack_require__(176);
__webpack_require__(177);
__webpack_require__(178);
__webpack_require__(179);
__webpack_require__(180);
__webpack_require__(181);
__webpack_require__(182);
__webpack_require__(183);
__webpack_require__(184);
__webpack_require__(185);
__webpack_require__(186);
__webpack_require__(187);
__webpack_require__(188);
__webpack_require__(189);
__webpack_require__(190);
__webpack_require__(191);
__webpack_require__(192);
__webpack_require__(193);
__webpack_require__(194);
__webpack_require__(195);
__webpack_require__(196);
__webpack_require__(197);
__webpack_require__(198);
__webpack_require__(199);
__webpack_require__(200);
__webpack_require__(201);
__webpack_require__(202);
__webpack_require__(203);
__webpack_require__(204);
__webpack_require__(205);
__webpack_require__(206);
__webpack_require__(207);
__webpack_require__(208);
__webpack_require__(209);
__webpack_require__(210);
__webpack_require__(211);
__webpack_require__(212);
__webpack_require__(213);
__webpack_require__(214);
__webpack_require__(215);
__webpack_require__(216);
__webpack_require__(217);
__webpack_require__(218);
__webpack_require__(219);
__webpack_require__(220);
__webpack_require__(221);
__webpack_require__(222);
__webpack_require__(223);
__webpack_require__(224);
__webpack_require__(225);
__webpack_require__(226);
__webpack_require__(227);
__webpack_require__(228);
__webpack_require__(229);
__webpack_require__(230);
__webpack_require__(231);
__webpack_require__(232);
__webpack_require__(233);
__webpack_require__(234);
__webpack_require__(235);
__webpack_require__(236);
__webpack_require__(237);
__webpack_require__(238);
__webpack_require__(239);
__webpack_require__(240);
__webpack_require__(241);
__webpack_require__(242);
__webpack_require__(243);
__webpack_require__(244);
__webpack_require__(245);
__webpack_require__(246);
__webpack_require__(247);
__webpack_require__(249);
__webpack_require__(250);
__webpack_require__(252);
__webpack_require__(253);
__webpack_require__(254);
__webpack_require__(255);
__webpack_require__(256);
__webpack_require__(257);
__webpack_require__(258);
__webpack_require__(260);
__webpack_require__(261);
__webpack_require__(262);
__webpack_require__(263);
__webpack_require__(264);
__webpack_require__(265);
__webpack_require__(266);
__webpack_require__(267);
__webpack_require__(268);
__webpack_require__(269);
__webpack_require__(270);
__webpack_require__(271);
__webpack_require__(272);
__webpack_require__(98);
__webpack_require__(273);
__webpack_require__(132);
__webpack_require__(274);
__webpack_require__(133);
__webpack_require__(275);
__webpack_require__(276);
__webpack_require__(277);
__webpack_require__(278);
__webpack_require__(279);
__webpack_require__(136);
__webpack_require__(138);
__webpack_require__(139);
__webpack_require__(280);
__webpack_require__(281);
__webpack_require__(282);
__webpack_require__(283);
__webpack_require__(284);
__webpack_require__(285);
__webpack_require__(286);
__webpack_require__(287);
__webpack_require__(288);
__webpack_require__(289);
__webpack_require__(290);
__webpack_require__(291);
__webpack_require__(292);
__webpack_require__(293);
__webpack_require__(294);
__webpack_require__(295);
__webpack_require__(296);
__webpack_require__(297);
__webpack_require__(298);
__webpack_require__(299);
__webpack_require__(300);
__webpack_require__(301);
__webpack_require__(302);
__webpack_require__(303);
__webpack_require__(304);
__webpack_require__(305);
__webpack_require__(306);
__webpack_require__(307);
__webpack_require__(308);
__webpack_require__(309);
__webpack_require__(310);
__webpack_require__(311);
__webpack_require__(312);
__webpack_require__(313);
__webpack_require__(314);
__webpack_require__(315);
__webpack_require__(316);
__webpack_require__(317);
__webpack_require__(318);
__webpack_require__(319);
__webpack_require__(320);
__webpack_require__(321);
__webpack_require__(322);
__webpack_require__(323);
__webpack_require__(324);
__webpack_require__(325);
__webpack_require__(326);
__webpack_require__(327);
__webpack_require__(328);
__webpack_require__(329);
__webpack_require__(330);
__webpack_require__(331);
__webpack_require__(332);
__webpack_require__(333);
__webpack_require__(334);
__webpack_require__(335);
__webpack_require__(336);
__webpack_require__(337);
__webpack_require__(338);
__webpack_require__(339);
__webpack_require__(340);
__webpack_require__(341);
__webpack_require__(342);
__webpack_require__(343);
__webpack_require__(344);
__webpack_require__(345);
__webpack_require__(346);
__webpack_require__(347);
__webpack_require__(348);
__webpack_require__(349);
__webpack_require__(350);
__webpack_require__(351);
__webpack_require__(352);
__webpack_require__(353);
__webpack_require__(354);
__webpack_require__(355);
__webpack_require__(356);
__webpack_require__(357);
__webpack_require__(358);
__webpack_require__(359);
__webpack_require__(360);
__webpack_require__(361);
__webpack_require__(362);
__webpack_require__(363);
__webpack_require__(364);
module.exports = __webpack_require__(21);


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(2);
var has = __webpack_require__(17);
var DESCRIPTORS = __webpack_require__(7);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(15);
var META = __webpack_require__(36).KEY;
var $fails = __webpack_require__(3);
var shared = __webpack_require__(55);
var setToStringTag = __webpack_require__(50);
var uid = __webpack_require__(40);
var wks = __webpack_require__(5);
var wksExt = __webpack_require__(114);
var wksDefine = __webpack_require__(79);
var enumKeys = __webpack_require__(171);
var isArray = __webpack_require__(62);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var toObject = __webpack_require__(11);
var toIObject = __webpack_require__(18);
var toPrimitive = __webpack_require__(27);
var createDesc = __webpack_require__(39);
var _create = __webpack_require__(43);
var gOPNExt = __webpack_require__(117);
var $GOPD = __webpack_require__(19);
var $GOPS = __webpack_require__(61);
var $DP = __webpack_require__(9);
var $keys = __webpack_require__(41);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(44).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(57).f = $propertyIsEnumerable;
  $GOPS.f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(35)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });

$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return $GOPS.f(toObject(it));
  }
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(14)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(55)('native-function-to-string', Function.toString);


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(41);
var gOPS = __webpack_require__(61);
var pIE = __webpack_require__(57);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(43) });


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(7), 'Object', { defineProperty: __webpack_require__(9).f });


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(7), 'Object', { defineProperties: __webpack_require__(116) });


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(18);
var $getOwnPropertyDescriptor = __webpack_require__(19).f;

__webpack_require__(29)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(11);
var $getPrototypeOf = __webpack_require__(20);

__webpack_require__(29)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(11);
var $keys = __webpack_require__(41);

__webpack_require__(29)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(29)('getOwnPropertyNames', function () {
  return __webpack_require__(117).f;
});


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(36).onFreeze;

__webpack_require__(29)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(36).onFreeze;

__webpack_require__(29)('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(36).onFreeze;

__webpack_require__(29)('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(4);

__webpack_require__(29)('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(4);

__webpack_require__(29)('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(4);

__webpack_require__(29)('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(0);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(118) });


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { is: __webpack_require__(119) });


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(83).set });


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(51);
var test = {};
test[__webpack_require__(5)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(15)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(0);

$export($export.P, 'Function', { bind: __webpack_require__(120) });


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(9).f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__(7) && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(4);
var getPrototypeOf = __webpack_require__(20);
var HAS_INSTANCE = __webpack_require__(5)('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(9).f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(122);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(123);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var has = __webpack_require__(17);
var cof = __webpack_require__(23);
var inheritIfRequired = __webpack_require__(85);
var toPrimitive = __webpack_require__(27);
var fails = __webpack_require__(3);
var gOPN = __webpack_require__(44).f;
var gOPD = __webpack_require__(19).f;
var dP = __webpack_require__(9).f;
var $trim = __webpack_require__(52).trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__(43)(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__(7) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(15)(global, NUMBER, $Number);
}


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toInteger = __webpack_require__(24);
var aNumberValue = __webpack_require__(124);
var repeat = __webpack_require__(86);
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(3)(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $fails = __webpack_require__(3);
var aNumberValue = __webpack_require__(124);
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(0);

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(0);
var _isFinite = __webpack_require__(2).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', { isInteger: __webpack_require__(125) });


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__(0);
var isInteger = __webpack_require__(125);
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});


/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(123);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(122);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(0);
var log1p = __webpack_require__(126);
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(0);
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(0);
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(0);
var sign = __webpack_require__(87);

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(0);
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(0);
var $expm1 = __webpack_require__(88);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { fround: __webpack_require__(127) });


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(0);
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(0);
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(3)(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { log1p: __webpack_require__(126) });


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { sign: __webpack_require__(87) });


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(88);
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(3)(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});


/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(88);
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});


/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});


/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var toAbsoluteIndex = __webpack_require__(42);
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});


/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(18);
var toLength = __webpack_require__(6);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});


/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(52)('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});


/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(63)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(89)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $at = __webpack_require__(63)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export = __webpack_require__(0);
var toLength = __webpack_require__(6);
var context = __webpack_require__(91);
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(92)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__(0);
var context = __webpack_require__(91);
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(92)(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(86)
});


/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__(0);
var toLength = __webpack_require__(6);
var context = __webpack_require__(91);
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(92)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(16)('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});


/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(16)('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});


/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(16)('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});


/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(16)('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});


/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(16)('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(16)('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(16)('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});


/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(16)('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});


/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(16)('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});


/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(16)('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});


/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(16)('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});


/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(16)('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});


/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(16)('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});


/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(0);

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });


/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(27);

$export($export.P + $export.F * __webpack_require__(3)(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});


/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(0);
var toISOString = __webpack_require__(248);

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});


/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = __webpack_require__(3);
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;


/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__(15)(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}


/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(5)('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) __webpack_require__(14)(proto, TO_PRIMITIVE, __webpack_require__(251));


/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(1);
var toPrimitive = __webpack_require__(27);
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};


/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(0);

$export($export.S, 'Array', { isArray: __webpack_require__(62) });


/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(22);
var $export = __webpack_require__(0);
var toObject = __webpack_require__(11);
var call = __webpack_require__(128);
var isArrayIter = __webpack_require__(93);
var toLength = __webpack_require__(6);
var createProperty = __webpack_require__(94);
var getIterFn = __webpack_require__(95);

$export($export.S + $export.F * !__webpack_require__(65)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var createProperty = __webpack_require__(94);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(3)(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});


/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export = __webpack_require__(0);
var toIObject = __webpack_require__(18);
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(56) != Object || !__webpack_require__(25)(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var html = __webpack_require__(82);
var cof = __webpack_require__(23);
var toAbsoluteIndex = __webpack_require__(42);
var toLength = __webpack_require__(6);
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(3)(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = new Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});


/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var aFunction = __webpack_require__(12);
var toObject = __webpack_require__(11);
var fails = __webpack_require__(3);
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(25)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $forEach = __webpack_require__(30)(0);
var STRICT = __webpack_require__(25)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var isArray = __webpack_require__(62);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $map = __webpack_require__(30)(1);

$export($export.P + $export.F * !__webpack_require__(25)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $filter = __webpack_require__(30)(2);

$export($export.P + $export.F * !__webpack_require__(25)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $some = __webpack_require__(30)(3);

$export($export.P + $export.F * !__webpack_require__(25)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $every = __webpack_require__(30)(4);

$export($export.P + $export.F * !__webpack_require__(25)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $reduce = __webpack_require__(129);

$export($export.P + $export.F * !__webpack_require__(25)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});


/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $reduce = __webpack_require__(129);

$export($export.P + $export.F * !__webpack_require__(25)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});


/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $indexOf = __webpack_require__(60)(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(25)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});


/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(18);
var toInteger = __webpack_require__(24);
var toLength = __webpack_require__(6);
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(25)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});


/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { copyWithin: __webpack_require__(130) });

__webpack_require__(37)('copyWithin');


/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { fill: __webpack_require__(97) });

__webpack_require__(37)('fill');


/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(30)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(37)(KEY);


/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(30)(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(37)(KEY);


/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(45)('Array');


/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var inheritIfRequired = __webpack_require__(85);
var dP = __webpack_require__(9).f;
var gOPN = __webpack_require__(44).f;
var isRegExp = __webpack_require__(64);
var $flags = __webpack_require__(58);
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__(7) && (!CORRECT_NEW || __webpack_require__(3)(function () {
  re2[__webpack_require__(5)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(15)(global, 'RegExp', $RegExp);
}

__webpack_require__(45)('RegExp');


/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(133);
var anObject = __webpack_require__(1);
var $flags = __webpack_require__(58);
var DESCRIPTORS = __webpack_require__(7);
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__(15)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__(3)(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(1);
var toLength = __webpack_require__(6);
var advanceStringIndex = __webpack_require__(100);
var regExpExec = __webpack_require__(66);

// @@match logic
__webpack_require__(67)('match', 1, function (defined, MATCH, $match, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[MATCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative($match, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      if (!rx.global) return regExpExec(rx, S);
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});


/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(1);
var toObject = __webpack_require__(11);
var toLength = __webpack_require__(6);
var toInteger = __webpack_require__(24);
var advanceStringIndex = __webpack_require__(100);
var regExpExec = __webpack_require__(66);
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
__webpack_require__(67)('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(1);
var sameValue = __webpack_require__(119);
var regExpExec = __webpack_require__(66);

// @@search logic
__webpack_require__(67)('search', 1, function (defined, SEARCH, $search, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[SEARCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
    function (regexp) {
      var res = maybeCallNative($search, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regExpExec(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});


/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isRegExp = __webpack_require__(64);
var anObject = __webpack_require__(1);
var speciesConstructor = __webpack_require__(59);
var advanceStringIndex = __webpack_require__(100);
var toLength = __webpack_require__(6);
var callRegExpExec = __webpack_require__(66);
var regexpExec = __webpack_require__(99);
var fails = __webpack_require__(3);
var $min = Math.min;
var $push = [].push;
var $SPLIT = 'split';
var LENGTH = 'length';
var LAST_INDEX = 'lastIndex';
var MAX_UINT32 = 0xffffffff;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { RegExp(MAX_UINT32, 'y'); });

// @@split logic
__webpack_require__(67)('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  } else {
    internalSplit = $split;
  }

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = defined(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
});


/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(35);
var global = __webpack_require__(2);
var ctx = __webpack_require__(22);
var classof = __webpack_require__(51);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(4);
var aFunction = __webpack_require__(12);
var anInstance = __webpack_require__(46);
var forOf = __webpack_require__(47);
var speciesConstructor = __webpack_require__(59);
var task = __webpack_require__(101).set;
var microtask = __webpack_require__(102)();
var newPromiseCapabilityModule = __webpack_require__(103);
var perform = __webpack_require__(134);
var userAgent = __webpack_require__(68);
var promiseResolve = __webpack_require__(135);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(5)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(48)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(50)($Promise, PROMISE);
__webpack_require__(45)(PROMISE);
Wrapper = __webpack_require__(21)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(65)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(140);
var validate = __webpack_require__(49);
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
__webpack_require__(69)(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);


/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $typed = __webpack_require__(70);
var buffer = __webpack_require__(104);
var anObject = __webpack_require__(1);
var toAbsoluteIndex = __webpack_require__(42);
var toLength = __webpack_require__(6);
var isObject = __webpack_require__(4);
var ArrayBuffer = __webpack_require__(2).ArrayBuffer;
var speciesConstructor = __webpack_require__(59);
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(3)(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var fin = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(fin - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < fin) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(45)(ARRAY_BUFFER);


/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
$export($export.G + $export.W + $export.F * !__webpack_require__(70).ABV, {
  DataView: __webpack_require__(104).DataView
});


/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32)('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32)('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32)('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);


/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32)('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32)('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32)('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32)('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32)('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(32)('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = __webpack_require__(0);
var aFunction = __webpack_require__(12);
var anObject = __webpack_require__(1);
var rApply = (__webpack_require__(2).Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(3)(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});


/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__(0);
var create = __webpack_require__(43);
var aFunction = __webpack_require__(12);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var bind = __webpack_require__(120);
var rConstruct = (__webpack_require__(2).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = __webpack_require__(9);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var toPrimitive = __webpack_require__(27);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(3)(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = __webpack_require__(0);
var gOPD = __webpack_require__(19).f;
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});


/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
__webpack_require__(90)(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});


/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = __webpack_require__(19);
var getPrototypeOf = __webpack_require__(20);
var has = __webpack_require__(17);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(4);
var anObject = __webpack_require__(1);

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });


/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = __webpack_require__(19);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});


/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export = __webpack_require__(0);
var getProto = __webpack_require__(20);
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});


/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});


/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});


/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', { ownKeys: __webpack_require__(142) });


/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = __webpack_require__(9);
var gOPD = __webpack_require__(19);
var getPrototypeOf = __webpack_require__(20);
var has = __webpack_require__(17);
var $export = __webpack_require__(0);
var createDesc = __webpack_require__(39);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    if (existingDescriptor = gOPD.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      dP.f(receiver, propertyKey, existingDescriptor);
    } else dP.f(receiver, propertyKey, createDesc(0, V));
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });


/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = __webpack_require__(0);
var setProto = __webpack_require__(83);

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__(0);
var $includes = __webpack_require__(60)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(37)('includes');


/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(143);
var toObject = __webpack_require__(11);
var toLength = __webpack_require__(6);
var aFunction = __webpack_require__(12);
var arraySpeciesCreate = __webpack_require__(96);

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

__webpack_require__(37)('flatMap');


/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(143);
var toObject = __webpack_require__(11);
var toLength = __webpack_require__(6);
var toInteger = __webpack_require__(24);
var arraySpeciesCreate = __webpack_require__(96);

$export($export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

__webpack_require__(37)('flatten');


/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(0);
var $at = __webpack_require__(63)(true);
var $fails = __webpack_require__(3);

var FORCED = $fails(function () {
  return '𠮷'.at(0) !== '𠮷';
});

$export($export.P + $export.F * FORCED, 'String', {
  at: function at(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0);
var $pad = __webpack_require__(144);
var userAgent = __webpack_require__(68);

// https://github.com/zloirock/core-js/issues/280
var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

$export($export.P + $export.F * WEBKIT_BUG, 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});


/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0);
var $pad = __webpack_require__(144);
var userAgent = __webpack_require__(68);

// https://github.com/zloirock/core-js/issues/280
var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

$export($export.P + $export.F * WEBKIT_BUG, 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});


/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(52)('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');


/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(52)('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');


/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export = __webpack_require__(0);
var defined = __webpack_require__(28);
var toLength = __webpack_require__(6);
var isRegExp = __webpack_require__(64);
var getFlags = __webpack_require__(58);
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function (regexp, string) {
  this._r = regexp;
  this._s = string;
};

__webpack_require__(90)($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp) {
    defined(this);
    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});


/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(79)('asyncIterator');


/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(79)('observable');


/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__(0);
var ownKeys = __webpack_require__(142);
var toIObject = __webpack_require__(18);
var gOPD = __webpack_require__(19);
var createProperty = __webpack_require__(94);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $values = __webpack_require__(145)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $entries = __webpack_require__(145)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(11);
var aFunction = __webpack_require__(12);
var $defineProperty = __webpack_require__(9);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(7) && $export($export.P + __webpack_require__(71), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(11);
var aFunction = __webpack_require__(12);
var $defineProperty = __webpack_require__(9);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(7) && $export($export.P + __webpack_require__(71), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(27);
var getPrototypeOf = __webpack_require__(20);
var getOwnPropertyDescriptor = __webpack_require__(19).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(7) && $export($export.P + __webpack_require__(71), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(11);
var toPrimitive = __webpack_require__(27);
var getPrototypeOf = __webpack_require__(20);
var getOwnPropertyDescriptor = __webpack_require__(19).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(7) && $export($export.P + __webpack_require__(71), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(146)('Map') });


/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(146)('Set') });


/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(72)('Map');


/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(72)('Set');


/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
__webpack_require__(72)('WeakMap');


/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
__webpack_require__(72)('WeakSet');


/***/ }),
/* 330 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(73)('Map');


/***/ }),
/* 331 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(73)('Set');


/***/ }),
/* 332 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
__webpack_require__(73)('WeakMap');


/***/ }),
/* 333 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
__webpack_require__(73)('WeakSet');


/***/ }),
/* 334 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.G, { global: __webpack_require__(2) });


/***/ }),
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.S, 'System', { global: __webpack_require__(2) });


/***/ }),
/* 336 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(0);
var cof = __webpack_require__(23);

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});


/***/ }),
/* 337 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});


/***/ }),
/* 338 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });


/***/ }),
/* 339 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var RAD_PER_DEG = 180 / Math.PI;

$export($export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});


/***/ }),
/* 340 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var scale = __webpack_require__(148);
var fround = __webpack_require__(127);

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});


/***/ }),
/* 341 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});


/***/ }),
/* 342 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});


/***/ }),
/* 343 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});


/***/ }),
/* 344 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });


/***/ }),
/* 345 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var DEG_PER_RAD = Math.PI / 180;

$export($export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});


/***/ }),
/* 346 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { scale: __webpack_require__(148) });


/***/ }),
/* 347 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});


/***/ }),
/* 348 */
/***/ (function(module, exports, __webpack_require__) {

// http://jfbastien.github.io/papers/Math.signbit.html
var $export = __webpack_require__(0);

$export($export.S, 'Math', { signbit: function signbit(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
} });


/***/ }),
/* 349 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(0);
var core = __webpack_require__(21);
var global = __webpack_require__(2);
var speciesConstructor = __webpack_require__(59);
var promiseResolve = __webpack_require__(135);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 350 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(0);
var newPromiseCapability = __webpack_require__(103);
var perform = __webpack_require__(134);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 351 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(33);
var anObject = __webpack_require__(1);
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });


/***/ }),
/* 352 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(33);
var anObject = __webpack_require__(1);
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });


/***/ }),
/* 353 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(33);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(20);
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 354 */
/***/ (function(module, exports, __webpack_require__) {

var Set = __webpack_require__(138);
var from = __webpack_require__(147);
var metadata = __webpack_require__(33);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(20);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 355 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(33);
var anObject = __webpack_require__(1);
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 356 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(33);
var anObject = __webpack_require__(1);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 357 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(33);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(20);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 358 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(33);
var anObject = __webpack_require__(1);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 359 */
/***/ (function(module, exports, __webpack_require__) {

var $metadata = __webpack_require__(33);
var anObject = __webpack_require__(1);
var aFunction = __webpack_require__(12);
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });


/***/ }),
/* 360 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export = __webpack_require__(0);
var microtask = __webpack_require__(102)();
var process = __webpack_require__(2).process;
var isNode = __webpack_require__(23)(process) == 'process';

$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});


/***/ }),
/* 361 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable
var $export = __webpack_require__(0);
var global = __webpack_require__(2);
var core = __webpack_require__(21);
var microtask = __webpack_require__(102)();
var OBSERVABLE = __webpack_require__(5)('observable');
var aFunction = __webpack_require__(12);
var anObject = __webpack_require__(1);
var anInstance = __webpack_require__(46);
var redefineAll = __webpack_require__(48);
var hide = __webpack_require__(14);
var forOf = __webpack_require__(47);
var RETURN = forOf.RETURN;

var getMethod = function (fn) {
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function (subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function (subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function (subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function (observer, subscriber) {
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  } if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() { closeSubscription(this); }
});

var SubscriptionObserver = function (subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (core.Promise || global.Promise)(function (resolve, reject) {
      aFunction(fn);
      var subscription = that.subscribe({
        next: function (value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          try {
            if (forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = new Array(l); i < l;) items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function () { return this; });

$export($export.G, { Observable: $Observable });

__webpack_require__(45)('Observable');


/***/ }),
/* 362 */
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global = __webpack_require__(2);
var $export = __webpack_require__(0);
var userAgent = __webpack_require__(68);
var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});


/***/ }),
/* 363 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $task = __webpack_require__(101);
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});


/***/ }),
/* 364 */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(98);
var getKeys = __webpack_require__(41);
var redefine = __webpack_require__(15);
var global = __webpack_require__(2);
var hide = __webpack_require__(14);
var Iterators = __webpack_require__(53);
var wks = __webpack_require__(5);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),
/* 365 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
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
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
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
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
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
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
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
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
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

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

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
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
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
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
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
          context.arg = undefined;
        }

        return !! caught;
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

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
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

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
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

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
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
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(112)))

/***/ }),
/* 366 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(367);
module.exports = __webpack_require__(21).RegExp.escape;


/***/ }),
/* 367 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(0);
var $re = __webpack_require__(368)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });


/***/ }),
/* 368 */
/***/ (function(module, exports) {

module.exports = function (regExp, replace) {
  var replacer = replace === Object(replace) ? function (part) {
    return replace[part];
  } : replace;
  return function (it) {
    return String(it).replace(regExp, replacer);
  };
};


/***/ }),
/* 369 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(370);

/***/ }),
/* 370 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// SmoothScroll for websites v1.4.6 (Balazs Galambosi)
// http://www.smoothscroll.net/
//
// Licensed under the terms of the MIT license.
//
// You may use it in your theme if you credit me. 
// It is also free to use on any individual website.
//
// Exception:
// The only restriction is to not publish any  
// extension for browsers or native application
// without getting a written permission first.
//

(function () {

    // Scroll Variables (tweakable)
    var defaultOptions = {

        // Scrolling Core
        frameRate: 150, // [Hz]
        animationTime: 400, // [ms]
        stepSize: 100, // [px]

        // Pulse (less tweakable)
        // ratio of "tail" to "acceleration"
        pulseAlgorithm: true,
        pulseScale: 4,
        pulseNormalize: 1,

        // Acceleration
        accelerationDelta: 50, // 50
        accelerationMax: 3, // 3

        // Keyboard Settings
        keyboardSupport: true, // option
        arrowScroll: 50, // [px]

        // Other
        fixedBackground: true,
        excluded: ''
    };

    var options = defaultOptions;

    // Other Variables
    var isExcluded = false;
    var isFrame = false;
    var direction = { x: 0, y: 0 };
    var initDone = false;
    var root = document.documentElement;
    var activeElement;
    var observer;
    var refreshSize;
    var deltaBuffer = [];
    var isMac = /^Mac/.test(navigator.platform);

    var key = { left: 37, up: 38, right: 39, down: 40, spacebar: 32,
        pageup: 33, pagedown: 34, end: 35, home: 36 };
    var arrowKeys = { 37: 1, 38: 1, 39: 1, 40: 1 };

    /***********************************************
     * INITIALIZE
     ***********************************************/

    /**
     * Tests if smooth scrolling is allowed. Shuts down everything if not.
     */
    function initTest() {
        if (options.keyboardSupport) {
            addEvent('keydown', keydown);
        }
    }

    /**
     * Sets up scrolls array, determines if frames are involved.
     */
    function init() {

        if (initDone || !document.body) return;

        initDone = true;

        var body = document.body;
        var html = document.documentElement;
        var windowHeight = window.innerHeight;
        var scrollHeight = body.scrollHeight;

        // check compat mode for root element
        root = document.compatMode.indexOf('CSS') >= 0 ? html : body;
        activeElement = body;

        initTest();

        // Checks if this script is running in a frame
        if (top != self) {
            isFrame = true;
        }

        /**
         * Safari 10 fixed it, Chrome fixed it in v45:
         * This fixes a bug where the areas left and right to 
         * the content does not trigger the onmousewheel event
         * on some pages. e.g.: html, body { height: 100% }
         */
        else if (isOldSafari && scrollHeight > windowHeight && (body.offsetHeight <= windowHeight || html.offsetHeight <= windowHeight)) {

                var fullPageElem = document.createElement('div');
                fullPageElem.style.cssText = 'position:absolute; z-index:-10000; ' + 'top:0; left:0; right:0; height:' + root.scrollHeight + 'px';
                document.body.appendChild(fullPageElem);

                // DOM changed (throttled) to fix height
                var pendingRefresh;
                refreshSize = function refreshSize() {
                    if (pendingRefresh) return; // could also be: clearTimeout(pendingRefresh);
                    pendingRefresh = setTimeout(function () {
                        if (isExcluded) return; // could be running after cleanup
                        fullPageElem.style.height = '0';
                        fullPageElem.style.height = root.scrollHeight + 'px';
                        pendingRefresh = null;
                    }, 500); // act rarely to stay fast
                };

                setTimeout(refreshSize, 10);

                addEvent('resize', refreshSize);

                // TODO: attributeFilter?
                var config = {
                    attributes: true,
                    childList: true,
                    characterData: false
                    // subtree: true
                };

                observer = new MutationObserver(refreshSize);
                observer.observe(body, config);

                if (root.offsetHeight <= windowHeight) {
                    var clearfix = document.createElement('div');
                    clearfix.style.clear = 'both';
                    body.appendChild(clearfix);
                }
            }

        // disable fixed background
        if (!options.fixedBackground && !isExcluded) {
            body.style.backgroundAttachment = 'scroll';
            html.style.backgroundAttachment = 'scroll';
        }
    }

    /**
     * Removes event listeners and other traces left on the page.
     */
    function cleanup() {
        observer && observer.disconnect();
        removeEvent(wheelEvent, wheel);
        removeEvent('mousedown', mousedown);
        removeEvent('keydown', keydown);
        removeEvent('resize', refreshSize);
        removeEvent('load', init);
    }

    /************************************************
     * SCROLLING 
     ************************************************/

    var que = [];
    var pending = false;
    var lastScroll = Date.now();

    /**
     * Pushes scroll actions to the scrolling queue.
     */
    function scrollArray(elem, left, top) {

        directionCheck(left, top);

        if (options.accelerationMax != 1) {
            var now = Date.now();
            var elapsed = now - lastScroll;
            if (elapsed < options.accelerationDelta) {
                var factor = (1 + 50 / elapsed) / 2;
                if (factor > 1) {
                    factor = Math.min(factor, options.accelerationMax);
                    left *= factor;
                    top *= factor;
                }
            }
            lastScroll = Date.now();
        }

        // push a scroll command
        que.push({
            x: left,
            y: top,
            lastX: left < 0 ? 0.99 : -0.99,
            lastY: top < 0 ? 0.99 : -0.99,
            start: Date.now()
        });

        // don't act if there's a pending queue
        if (pending) {
            return;
        }

        var scrollWindow = elem === document.body;

        var step = function step(time) {

            var now = Date.now();
            var scrollX = 0;
            var scrollY = 0;

            for (var i = 0; i < que.length; i++) {

                var item = que[i];
                var elapsed = now - item.start;
                var finished = elapsed >= options.animationTime;

                // scroll position: [0, 1]
                var position = finished ? 1 : elapsed / options.animationTime;

                // easing [optional]
                if (options.pulseAlgorithm) {
                    position = pulse(position);
                }

                // only need the difference
                var x = item.x * position - item.lastX >> 0;
                var y = item.y * position - item.lastY >> 0;

                // add this to the total scrolling
                scrollX += x;
                scrollY += y;

                // update last values
                item.lastX += x;
                item.lastY += y;

                // delete and step back if it's over
                if (finished) {
                    que.splice(i, 1);i--;
                }
            }

            // scroll left and top
            if (scrollWindow) {
                window.scrollBy(scrollX, scrollY);
            } else {
                if (scrollX) elem.scrollLeft += scrollX;
                if (scrollY) elem.scrollTop += scrollY;
            }

            // clean up if there's nothing left to do
            if (!left && !top) {
                que = [];
            }

            if (que.length) {
                requestFrame(step, elem, 1000 / options.frameRate + 1);
            } else {
                pending = false;
            }
        };

        // start a new queue of actions
        requestFrame(step, elem, 0);
        pending = true;
    }

    /***********************************************
     * EVENTS
     ***********************************************/

    /**
     * Mouse wheel handler.
     * @param {Object} event
     */
    function wheel(event) {

        if (!initDone) {
            init();
        }

        var target = event.target;

        // leave early if default action is prevented   
        // or it's a zooming event with CTRL 
        if (event.defaultPrevented || event.ctrlKey) {
            return true;
        }

        // leave embedded content alone (flash & pdf)
        if (isNodeName(activeElement, 'embed') || isNodeName(target, 'embed') && /\.pdf/i.test(target.src) || isNodeName(activeElement, 'object') || target.shadowRoot) {
            return true;
        }

        var deltaX = -event.wheelDeltaX || event.deltaX || 0;
        var deltaY = -event.wheelDeltaY || event.deltaY || 0;

        if (isMac) {
            if (event.wheelDeltaX && isDivisible(event.wheelDeltaX, 120)) {
                deltaX = -120 * (event.wheelDeltaX / Math.abs(event.wheelDeltaX));
            }
            if (event.wheelDeltaY && isDivisible(event.wheelDeltaY, 120)) {
                deltaY = -120 * (event.wheelDeltaY / Math.abs(event.wheelDeltaY));
            }
        }

        // use wheelDelta if deltaX/Y is not available
        if (!deltaX && !deltaY) {
            deltaY = -event.wheelDelta || 0;
        }

        // line based scrolling (Firefox mostly)
        if (event.deltaMode === 1) {
            deltaX *= 40;
            deltaY *= 40;
        }

        var overflowing = overflowingAncestor(target);

        // nothing to do if there's no element that's scrollable
        if (!overflowing) {
            // except Chrome iframes seem to eat wheel events, which we need to 
            // propagate up, if the iframe has nothing overflowing to scroll
            if (isFrame && isChrome) {
                // change target to iframe element itself for the parent frame
                Object.defineProperty(event, "target", { value: window.frameElement });
                return parent.wheel(event);
            }
            return true;
        }

        // check if it's a touchpad scroll that should be ignored
        if (isTouchpad(deltaY)) {
            return true;
        }

        // scale by step size
        // delta is 120 most of the time
        // synaptics seems to send 1 sometimes
        if (Math.abs(deltaX) > 1.2) {
            deltaX *= options.stepSize / 120;
        }
        if (Math.abs(deltaY) > 1.2) {
            deltaY *= options.stepSize / 120;
        }

        scrollArray(overflowing, deltaX, deltaY);
        event.preventDefault();
        scheduleClearCache();
    }

    /**
     * Keydown event handler.
     * @param {Object} event
     */
    function keydown(event) {

        var target = event.target;
        var modifier = event.ctrlKey || event.altKey || event.metaKey || event.shiftKey && event.keyCode !== key.spacebar;

        // our own tracked active element could've been removed from the DOM
        if (!document.body.contains(activeElement)) {
            activeElement = document.activeElement;
        }

        // do nothing if user is editing text
        // or using a modifier key (except shift)
        // or in a dropdown
        // or inside interactive elements
        var inputNodeNames = /^(textarea|select|embed|object)$/i;
        var buttonTypes = /^(button|submit|radio|checkbox|file|color|image)$/i;
        if (event.defaultPrevented || inputNodeNames.test(target.nodeName) || isNodeName(target, 'input') && !buttonTypes.test(target.type) || isNodeName(activeElement, 'video') || isInsideYoutubeVideo(event) || target.isContentEditable || modifier) {
            return true;
        }

        // [spacebar] should trigger button press, leave it alone
        if ((isNodeName(target, 'button') || isNodeName(target, 'input') && buttonTypes.test(target.type)) && event.keyCode === key.spacebar) {
            return true;
        }

        // [arrwow keys] on radio buttons should be left alone
        if (isNodeName(target, 'input') && target.type == 'radio' && arrowKeys[event.keyCode]) {
            return true;
        }

        var shift,
            x = 0,
            y = 0;
        var overflowing = overflowingAncestor(activeElement);

        if (!overflowing) {
            // Chrome iframes seem to eat key events, which we need to 
            // propagate up, if the iframe has nothing overflowing to scroll
            return isFrame && isChrome ? parent.keydown(event) : true;
        }

        var clientHeight = overflowing.clientHeight;

        if (overflowing == document.body) {
            clientHeight = window.innerHeight;
        }

        switch (event.keyCode) {
            case key.up:
                y = -options.arrowScroll;
                break;
            case key.down:
                y = options.arrowScroll;
                break;
            case key.spacebar:
                // (+ shift)
                shift = event.shiftKey ? 1 : -1;
                y = -shift * clientHeight * 0.9;
                break;
            case key.pageup:
                y = -clientHeight * 0.9;
                break;
            case key.pagedown:
                y = clientHeight * 0.9;
                break;
            case key.home:
                y = -overflowing.scrollTop;
                break;
            case key.end:
                var scroll = overflowing.scrollHeight - overflowing.scrollTop;
                var scrollRemaining = scroll - clientHeight;
                y = scrollRemaining > 0 ? scrollRemaining + 10 : 0;
                break;
            case key.left:
                x = -options.arrowScroll;
                break;
            case key.right:
                x = options.arrowScroll;
                break;
            default:
                return true; // a key we don't care about
        }

        scrollArray(overflowing, x, y);
        event.preventDefault();
        scheduleClearCache();
    }

    /**
     * Mousedown event only for updating activeElement
     */
    function mousedown(event) {
        activeElement = event.target;
    }

    /***********************************************
     * OVERFLOW
     ***********************************************/

    var uniqueID = function () {
        var i = 0;
        return function (el) {
            return el.uniqueID || (el.uniqueID = i++);
        };
    }();

    var cache = {}; // cleared out after a scrolling session
    var clearCacheTimer;

    //setInterval(function () { cache = {}; }, 10 * 1000);

    function scheduleClearCache() {
        clearTimeout(clearCacheTimer);
        clearCacheTimer = setInterval(function () {
            cache = {};
        }, 1 * 1000);
    }

    function setCache(elems, overflowing) {
        for (var i = elems.length; i--;) {
            cache[uniqueID(elems[i])] = overflowing;
        }return overflowing;
    }

    //  (body)                (root)
    //         | hidden | visible | scroll |  auto  |
    // hidden  |   no   |    no   |   YES  |   YES  |
    // visible |   no   |   YES   |   YES  |   YES  |
    // scroll  |   no   |   YES   |   YES  |   YES  |
    // auto    |   no   |   YES   |   YES  |   YES  |

    function overflowingAncestor(el) {
        var elems = [];
        var body = document.body;
        var rootScrollHeight = root.scrollHeight;
        do {
            var cached = cache[uniqueID(el)];
            if (cached) {
                return setCache(elems, cached);
            }
            elems.push(el);
            if (rootScrollHeight === el.scrollHeight) {
                var topOverflowsNotHidden = overflowNotHidden(root) && overflowNotHidden(body);
                var isOverflowCSS = topOverflowsNotHidden || overflowAutoOrScroll(root);
                if (isFrame && isContentOverflowing(root) || !isFrame && isOverflowCSS) {
                    return setCache(elems, getScrollRoot());
                }
            } else if (isContentOverflowing(el) && overflowAutoOrScroll(el)) {
                return setCache(elems, el);
            }
        } while (el = el.parentElement);
    }

    function isContentOverflowing(el) {
        return el.clientHeight + 10 < el.scrollHeight;
    }

    // typically for <body> and <html>
    function overflowNotHidden(el) {
        var overflow = getComputedStyle(el, '').getPropertyValue('overflow-y');
        return overflow !== 'hidden';
    }

    // for all other elements
    function overflowAutoOrScroll(el) {
        var overflow = getComputedStyle(el, '').getPropertyValue('overflow-y');
        return overflow === 'scroll' || overflow === 'auto';
    }

    /***********************************************
     * HELPERS
     ***********************************************/

    function addEvent(type, fn) {
        window.addEventListener(type, fn, false);
    }

    function removeEvent(type, fn) {
        window.removeEventListener(type, fn, false);
    }

    function isNodeName(el, tag) {
        return (el.nodeName || '').toLowerCase() === tag.toLowerCase();
    }

    function directionCheck(x, y) {
        x = x > 0 ? 1 : -1;
        y = y > 0 ? 1 : -1;
        if (direction.x !== x || direction.y !== y) {
            direction.x = x;
            direction.y = y;
            que = [];
            lastScroll = 0;
        }
    }

    var deltaBufferTimer;

    if (window.localStorage && localStorage.SS_deltaBuffer) {
        try {
            // #46 Safari throws in private browsing for localStorage 
            deltaBuffer = localStorage.SS_deltaBuffer.split(',');
        } catch (e) {}
    }

    function isTouchpad(deltaY) {
        if (!deltaY) return;
        if (!deltaBuffer.length) {
            deltaBuffer = [deltaY, deltaY, deltaY];
        }
        deltaY = Math.abs(deltaY);
        deltaBuffer.push(deltaY);
        deltaBuffer.shift();
        clearTimeout(deltaBufferTimer);
        deltaBufferTimer = setTimeout(function () {
            try {
                // #46 Safari throws in private browsing for localStorage
                localStorage.SS_deltaBuffer = deltaBuffer.join(',');
            } catch (e) {}
        }, 1000);
        return !allDeltasDivisableBy(120) && !allDeltasDivisableBy(100);
    }

    function isDivisible(n, divisor) {
        return Math.floor(n / divisor) == n / divisor;
    }

    function allDeltasDivisableBy(divisor) {
        return isDivisible(deltaBuffer[0], divisor) && isDivisible(deltaBuffer[1], divisor) && isDivisible(deltaBuffer[2], divisor);
    }

    function isInsideYoutubeVideo(event) {
        var elem = event.target;
        var isControl = false;
        if (document.URL.indexOf('www.youtube.com/watch') != -1) {
            do {
                isControl = elem.classList && elem.classList.contains('html5-video-controls');
                if (isControl) break;
            } while (elem = elem.parentNode);
        }
        return isControl;
    }

    var requestFrame = function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback, element, delay) {
            window.setTimeout(callback, delay || 1000 / 60);
        };
    }();

    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

    var getScrollRoot = function () {
        var SCROLL_ROOT;
        return function () {
            if (!SCROLL_ROOT) {
                var dummy = document.createElement('div');
                dummy.style.cssText = 'height:10000px;width:1px;';
                document.body.appendChild(dummy);
                var bodyScrollTop = document.body.scrollTop;
                var docElScrollTop = document.documentElement.scrollTop;
                window.scrollBy(0, 3);
                if (document.body.scrollTop != bodyScrollTop) SCROLL_ROOT = document.body;else SCROLL_ROOT = document.documentElement;
                window.scrollBy(0, -3);
                document.body.removeChild(dummy);
            }
            return SCROLL_ROOT;
        };
    }();

    /***********************************************
     * PULSE (by Michael Herf)
     ***********************************************/

    /**
     * Viscous fluid with a pulse for part and decay for the rest.
     * - Applies a fixed force over an interval (a damped acceleration), and
     * - Lets the exponential bleed away the velocity over a longer interval
     * - Michael Herf, http://stereopsis.com/stopping/
     */
    function pulse_(x) {
        var val, start, expx;
        // test
        x = x * options.pulseScale;
        if (x < 1) {
            // acceleartion
            val = x - (1 - Math.exp(-x));
        } else {
            // tail
            // the previous animation ended here:
            start = Math.exp(-1);
            // simple viscous drag
            x -= 1;
            expx = 1 - Math.exp(-x);
            val = start + expx * (1 - start);
        }
        return val * options.pulseNormalize;
    }

    function pulse(x) {
        if (x >= 1) return 1;
        if (x <= 0) return 0;

        if (options.pulseNormalize == 1) {
            options.pulseNormalize /= pulse_(1);
        }
        return pulse_(x);
    }

    /***********************************************
     * FIRST RUN
     ***********************************************/

    var userAgent = window.navigator.userAgent;
    var isEdge = /Edge/.test(userAgent); // thank you MS
    var isChrome = /chrome/i.test(userAgent) && !isEdge;
    var isSafari = /safari/i.test(userAgent) && !isEdge;
    var isMobile = /mobile/i.test(userAgent);
    var isIEWin7 = /Windows NT 6.1/i.test(userAgent) && /rv:11/i.test(userAgent);
    var isOldSafari = isSafari && (/Version\/8/i.test(userAgent) || /Version\/9/i.test(userAgent));
    var isEnabledForBrowser = (isChrome || isSafari || isIEWin7) && !isMobile;

    var wheelEvent;
    if ('onwheel' in document.createElement('div')) wheelEvent = 'wheel';else if ('onmousewheel' in document.createElement('div')) wheelEvent = 'mousewheel';

    if (wheelEvent && isEnabledForBrowser) {
        addEvent(wheelEvent, wheel);
        addEvent('mousedown', mousedown);
        addEvent('load', init);
    }

    /***********************************************
     * PUBLIC INTERFACE
     ***********************************************/

    function SmoothScroll(optionsToSet) {
        for (var key in optionsToSet) {
            if (defaultOptions.hasOwnProperty(key)) options[key] = optionsToSet[key];
        }
    }
    SmoothScroll.destroy = cleanup;

    if (window.SmoothScrollOptions) // async API
        SmoothScroll(window.SmoothScrollOptions);

    if (true) !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
        return SmoothScroll;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if ('object' == (typeof exports === 'undefined' ? 'undefined' : _typeof(exports))) module.exports = SmoothScroll;else window.SmoothScroll = SmoothScroll;
})();

/***/ }),
/* 371 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


console.log('Hello');

var youbora = __webpack_require__(105);
__webpack_require__(165);

window.youbora = youbora;

function initPlayer() {
    // Install polyfills.
    shaka.polyfill.installAll();

    // Find the video element.
    var video = document.getElementById('video1');

    // Construct a Player to wrap around it.
    var player = new shaka.Player(video);

    // Attach the player to the window so that it can be easily debugged.
    window.player = player;

    /* Dash */
    var source = 'https://livesim.dashif.org/livesim/chunkdur_1/ato_7/testpic4_8s/Manifest.mpd';

    // init plugin
    if (typeof youbora != "undefined" && typeof youbora.adapters.Shaka != "undefined") {
        youbora.Log.logLevel = youbora.Log.Level.DEBUG;
        window.plugin = new youbora.Plugin({
            'accountCode': 'powerdev',
            'parse.CDNNode': true,
            'content.title': 'Title vod dash',
            'content.transactionCode': "transactionTest"
        });

        plugin.setAdapter(new youbora.adapters.Shaka(player));
    }

    // Load the source into the Player.
    player.load(source).catch(function (error) {
        plugin.getAdapter().errorListener(error);
        plugin.disable();
    });
}

document.addEventListener('DOMContentLoaded', initPlayer);

/***/ }),
/* 372 */
/***/ (function(module, exports) {

module.exports = {"name":"youboralib","type":"lib","tech":"js","author":"Jordi Aguilar","version":"6.8.27","built":"2022-07-20","repo":"https://bitbucket.org/npaw/lib-plugin-js.git"}

/***/ }),
/* 373 */
/***/ (function(module, exports) {

/* eslint no-extend-native: "off" */

/**
 * When executed, this function applies polyfills to the following functionalities:
 * Function.prototype.bind and
 * Array.prototype.forEach.
 *
 * @memberof youbora
 */
var applyPolyfills = function () {
  // Bind, changed for compatibility
  Function.prototype.bind = Function.prototype.bind || function (context) {
    var slice = Array.prototype.slice
    var func = this
    var args = slice.call(arguments, 1)
    function bound () {
      var invokedAsConstructor = func.prototype && (this instanceof func)
      return func.apply(
        !invokedAsConstructor && context || this, args.concat(slice.call(arguments)) // eslint-disable-line no-mixed-operators
      )
    }
    bound.prototype = func.prototype
    return bound
  }

  // Foreach
  Array.prototype.forEach = Array.prototype.forEach || function (callback, thisArg) {
    if (typeof (callback) !== 'function') {
      throw new TypeError(callback + ' is not a function!')
    }
    var len = this.length
    for (var i = 0; i < len; i++) {
      callback.call(thisArg, this[i], i, this)
    }
  }

  // Trunc
  Math.trunc = Math.trunc || function (x) {
    if (isNaN(x)) {
      return NaN
    }
    if (x > 0) {
      return Math.floor(x)
    }
    return Math.ceil(x)
  }
}

module.exports = applyPolyfills


/***/ }),
/* 374 */
/***/ (function(module, exports) {

var F = function () { }

/** See Object.create. */
module.exports = function (o) {
  if (arguments.length > 1) {
    throw Error('Second argument not supported')
  }
  if (o === null) {
    throw Error('Cannot set a null [[Prototype]]')
  }
  if (typeof o !== 'object') {
    throw TypeError('Argument must be an object')
  }
  F.prototype = o
  return new F()
}


/***/ }),
/* 375 */
/***/ (function(module, exports) {

/**
 * List of ad positions
 */
var AdPosition = {
  Preroll: 'pre',
  Midroll: 'mid',
  Postroll: 'post'
}
module.exports = AdPosition


/***/ }),
/* 376 */
/***/ (function(module, exports) {

/**
 * List of events that can be triggered by the adapter
 */
var Event = {
  START: 'start',
  JOIN: 'join',
  PAUSE: 'pause',
  RESUME: 'resume',
  SEEK_BEGIN: 'seek-begin',
  SEEK_END: 'seek-end',
  BUFFER_BEGIN: 'buffer-begin',
  BUFFER_END: 'buffer-end',
  ERROR: 'error',
  STOP: 'stop',
  CLICK: 'click',
  MANIFEST: 'manifest',
  PODSTART: 'break-start',
  PODSTOP: 'break-stop',
  QUARTILE: 'quartile',
  VIDEO_EVENT: 'video-event'
}
module.exports = Event


/***/ }),
/* 377 */
/***/ (function(module, exports) {

/**
* List of ad manifest errors
*/
var ManifestError = {
  NO_RESPONSE: 'NO_RESPONSE',
  EMPTY: 'EMPTY_RESPONSE',
  WRONG: 'WRONG_RESPONSE'
}
module.exports = ManifestError


/***/ }),
/* 378 */
/***/ (function(module, exports) {

/**
 * List of youbora services.
 *
 * @enum
 */
var Service = {
  DATA: '/data',

  // Video
  INIT: '/init',
  START: '/start',
  JOIN: '/joinTime',
  PAUSE: '/pause',
  RESUME: '/resume',
  SEEK: '/seek',
  BUFFER: '/bufferUnderrun',
  ERROR: '/error',
  STOP: '/stop',
  PING: '/ping',

  VIDEO_EVENT: '/infinity/video/event',

  // Ads
  AD_INIT: '/adInit',
  AD_START: '/adStart',
  AD_JOIN: '/adJoin',
  AD_PAUSE: '/adPause',
  AD_RESUME: '/adResume',
  AD_BUFFER: '/adBufferUnderrun',
  AD_STOP: '/adStop',
  AD_CLICK: '/adClick',
  AD_ERROR: '/adError',
  AD_MANIFEST: '/adManifest',
  AD_POD_START: '/adBreakStart',
  AD_POD_STOP: '/adBreakStop',
  AD_QUARTILE: '/adQuartile',

  // Infinity
  EVENT: '/infinity/session/event',
  SESSION_START: '/infinity/session/start',
  SESSION_STOP: '/infinity/session/stop',
  NAV: '/infinity/session/nav',
  BEAT: '/infinity/session/beat',

  // Offline
  OFFLINE_EVENTS: '/offlineEvents'
}
module.exports = Service


/***/ }),
/* 379 */
/***/ (function(module, exports) {

/**
 * List of will-send events.
 *
 * @memberof youbora.Plugin
 * @enum
 * @event
 */
var WillSendEvent = {
  WILL_SEND_INIT: 'will-send-init',
  WILL_SEND_START: 'will-send-start',
  WILL_SEND_JOIN: 'will-send-join',
  WILL_SEND_PAUSE: 'will-send-pause',
  WILL_SEND_RESUME: 'will-send-resume',
  WILL_SEND_SEEK: 'will-send-seek',
  WILL_SEND_BUFFER: 'will-send-buffer',
  WILL_SEND_ERROR: 'will-send-error',
  WILL_SEND_FATAL_ERROR: 'will-send-fatal-error',
  WILL_SEND_STOP: 'will-send-stop',
  WILL_SEND_PING: 'will-send-ping',
  WILL_SEND_VIDEO_EVENT: 'will-send-video-event',

  WILL_SEND_AD_START: 'will-send-ad-start',
  WILL_SEND_AD_JOIN: 'will-send-ad-join',
  WILL_SEND_AD_PAUSE: 'will-send-ad-pause',
  WILL_SEND_AD_RESUME: 'will-send-ad-resume',
  WILL_SEND_AD_BUFFER: 'will-send-ad-buffer',
  WILL_SEND_AD_STOP: 'will-send-ad-stop',
  WILL_SEND_AD_CLICK: 'will-send-ad-click',
  WILL_SEND_AD_ERROR: 'will-send-ad-error',
  WILL_SEND_AD_MANIFEST: 'will-send-ad-manifest',
  WILL_SEND_AD_POD_START: 'will-send-ad-break-start',
  WILL_SEND_AD_POD_STOP: 'will-send-ad-break-stop',
  WILL_SEND_AD_QUARTILE: 'will-send-ad-quartile',

  WILL_SEND_SESSION_START: 'will-send-session-start',
  WILL_SEND_SESSION_STOP: 'will-send-session-stop',
  WILL_SEND_NAV: 'will-send-nav',
  WILL_SEND_BEAT: 'will-send-beat',
  WILL_SEND_EVENT: 'will-send-event',

  WILL_SEND_OFFLINE_EVENTS: 'will-send-offline-events'
}
module.exports = WillSendEvent


/***/ }),
/* 380 */
/***/ (function(module, exports) {

/**
 * List of ad insertion types
 */
var InsertionType = {
  ClientSide: 'csai',
  ServerSide: 'ssai'
}
module.exports = InsertionType


/***/ }),
/* 381 */
/***/ (function(module, exports) {

// {@see CdnParser}

module.exports = {
  cdnName: 'LEVEL3',
  parsers: [{
    element: 'host+type',
    headerName: 'X-WR-Diag',
    regex: /Host:(.+)\sType:(.+)/
  }],
  requestHeaders: {
    'X-WR-Diag': 'host'
  },
  parseType: function (type) {
    if (type) {
      if (
        type.indexOf('TCP_HIT') === 0 ||
        type.indexOf('TCP_MEM_HIT') === 0 ||
        type.indexOf('TCP_IMS_HIT') === 0
      ) {
        return 1
      } else if (type.indexOf('TCP_MISS') === 0) {
        return 2
      }
    }

    return 0
  }
}


/***/ }),
/* 382 */
/***/ (function(module, exports) {

// {@see CdnParser}

module.exports = {
  cdnName: 'CLOUDFRT',
  parsers: [{
    element: 'host',
    headerName: 'X-Amz-Cf-Id',
    regex: /(.+)/
  }, {
    element: 'type',
    headerName: 'X-Cache',
    regex: /(\S+)\s.+/
  }],
  parseType: function (type) {
    switch (type) {
      case 'Hit':
        return 1
      case 'Miss':
        return 2
      default:
        return 0
    }
  }
}


/***/ }),
/* 383 */
/***/ (function(module, exports) {

// {@see CdnParser}

module.exports = {
  cdnName: 'AKAMAI',
  // requestMethod: 'GET',
  parsers: [{
    element: 'type+host',
    headerName: 'X-Cache',
    regex: /(.+)\sfrom.+AkamaiGHost\/(.+)\).+/
  }, {
    element: 'host',
    headerName: 'akamai-mon-iucid-del',
    regex: /(.*)/
  }, {
    element: 'type',
    headerName: 'akamai-cache-status',
    regex: /(.+)\sfrom\schild/
  }],
  requestHeaders: {
    Pragma: 'akamai-x-cache-on'
  },
  parseType: function (type) {
    var t = type.toLowerCase()
    if (t.indexOf('hit') !== -1) {
      return 1
    } else if (t.indexOf('miss') !== -1) {
      return 2
    }
    return 0
  }
}


/***/ }),
/* 384 */
/***/ (function(module, exports) {

// {@see CdnParser}

module.exports = {
  cdnName: 'HIGHNEGR',
  parsers: [{
    element: 'host+type',
    headerName: 'X-HW',
    regex: /.+,[0-9]+\.(.+)\.(.+)/
  }],
  parseType: function (type) {
    switch (type) {
      case 'c':
      case 'x':
        return 1
      default:
        return 2
    }
  }
}


/***/ }),
/* 385 */
/***/ (function(module, exports) {

// {@see CdnParser}

module.exports = {
  cdnName: 'FASTLY',
  parsers: [{
    element: 'host',
    headerName: 'X-Served-By',
    regex: /([^,\s]+)$/
  }, {
    element: 'type',
    headerName: 'X-Cache',
    regex: /([^,\s]+)$/
  }],
  parseType: function (type) {
    switch (type) {
      case 'HIT':
        return 1
      case 'MISS':
        return 2
      default:
        return 0
    }
  }
}


/***/ }),
/* 386 */
/***/ (function(module, exports) {

// {@see CdnParser}

module.exports = {
  cdnName: 'TELEFO',
  parsers: [{
    element: 'host+type',
    headerName: 'x-tcdn',
    regex: /Host:(.+)\sType:(.+)/
  }],
  requestHeaders: {
    'x-tcdn': 'host'
  },
  parseType: function (type) {
    if (type) {
      if (
        type.indexOf('p') !== -1 ||
        type.indexOf('c') !== -1
      ) {
        return 1
      } else if (type.indexOf('i') !== -1 ||
        type.indexOf('m') !== -1) {
        return 2
      }
    }
    return 0
  }
}


/***/ }),
/* 387 */
/***/ (function(module, exports) {

// {@see CdnParser}

module.exports = {
  cdnName: 'AMAZON',
  parsers: [{
    element: 'host',
    headerName: 'x-amz-cf-pop',
    regex: /(.+)/
  }, {
    element: 'type',
    headerName: 'x-cache',
    regex: /(.+)\sfrom.+/
  }],
  parseType: function (type) {
    if (type.toLowerCase().indexOf('hit') !== -1) {
      return 1
    } else if (type.toLowerCase().indexOf('miss') !== -1) {
      return 2
    }
    return 0
  }
}


/***/ }),
/* 388 */
/***/ (function(module, exports) {

// {@see CdnParser}

module.exports = {
  cdnName: 'EDGECAST',
  parsers: [{
    element: 'host',
    headerName: 'Server',
    regex: /\((.+)\/.+\)/
  }, {
    element: 'type',
    headerName: 'X-Cache',
    regex: /(.+)/
  }],
  parseType: function (type) {
    switch (type) {
      case 'HIT':
        return 1
      case 'MISS':
      default:
        return 2
    }
  }
}


/***/ }),
/* 389 */
/***/ (function(module, exports) {

// {@see CdnParser}

module.exports = {
  parsers: [{
    element: 'name',
    headerName: null,
    regex: /(.+)/
  },
  {
    element: 'host',
    headerName: null,
    regex: /(.+)/
  }]
}


/***/ }),
/* 390 */
/***/ (function(module, exports) {

// {@see CdnParser}

module.exports = {
  cdnName: 'NOSOTT',
  parsers: [{
    element: 'host',
    headerName: 'X-NOS-Server',
    regex: /(.+)/
  }, {
    element: 'type',
    headerName: 'X-Cache',
    regex: /(.*)/
  }],
  parseType: function (type) {
    switch (type) {
      case 'Hit':
        return 1
      case 'Miss':
        return 2
      default:
        return 0
    }
  }
}


/***/ }),
/* 391 */
/***/ (function(module, exports, __webpack_require__) {

var Emitter = __webpack_require__(34)
var Log = __webpack_require__(8)
var YBRequest = __webpack_require__(31)

var CdnSwitch = Emitter.extend({
  constructor: function (plugin) {
    this.plugin = plugin
    this.headerName = 'x-cdn'
  },

  init: function () {
    var url = null
    if (this.plugin) {
      if (this.plugin.getAdapter() && this.plugin.getAdapter().getURLToParse()) {
        url = this.plugin.getAdapter().getURLToParse()
      } else {
        url = this.plugin.getResource()
      }
    }
    if (this.plugin && this.plugin.getAdapter() && this.plugin.getAdapter().flags.isStarted) {
      this._request(url)
    }
  },

  done: function (data) {
    this.emit(CdnSwitch.Events.DONE, data)
  },

  error: function () {
    this.emit(CdnSwitch.Events.ERROR)
  },

  _successfulRequest: function (resp) {
    setTimeout(this.init.bind(this), parseInt(this.plugin.options['parse.cdnTTL']) * 1000)
    var headers = resp.getResponseHeaders().split('\n')
    var cdn = null
    for (var i in headers) {
      var line = headers[i]
      var index = line.indexOf(this.headerName)
      if (index > -1) {
        cdn = line.substring(index + this.headerName.length + 1, line.length - 1).replace(' ', '')
      }
    }
    this.done(cdn)
  },

  _failedRequest: function () {
    setTimeout(this.init.bind(this), parseInt(this.plugin.options['parse.cdnTTL']) * 1000)
    Log.warn('CDN switch detection request failed')
    this.error()
  },

  _request: function (url) {
    var request = new YBRequest(url, null, null, { method: 'HEAD', cache: true })
    request.on(YBRequest.Event.SUCCESS, this._successfulRequest.bind(this))
    request.on(YBRequest.Event.ERROR, this._failedRequest.bind(this))
    request.send()
  }

}, {
  Events: {
    DONE: 'done',
    ERROR: 'error'
  }
})

module.exports = CdnSwitch


/***/ }),
/* 392 */
/***/ (function(module, exports, __webpack_require__) {

var YouboraObject = __webpack_require__(10)
var Log = __webpack_require__(8)

var DeprecatedOptions = YouboraObject.extend({
  exists: function (optionName) {
    return DeprecatedOptions.Dictionary.hasOwnProperty(optionName) // eslint-disable-line no-prototype-builtins
  },

  getNewName: function (optionName) {
    var newName = DeprecatedOptions.Dictionary[optionName]
    Log.warn('The option "' + optionName + '" is deprecated, use "' + newName + '" instead')
    return newName
  }
}, {
  // Keys are old option names
  // Values are new option names
  Dictionary: {
    httpSecure: 'app.https',
    username: 'user.name',
    anonymousUser: 'user.anonymousId',
    obfuscateIp: 'user.obfuscateIp',
    userType: 'user.type',
    'content.title2': 'content.program',
    'background.settings.iphone': 'background.settings.iOS',
    'parse.hls': 'parse.manifest',
    'parse.dash': 'parse.manifest',
    'parse.locationHeader': 'parse.manifest',
    'extraparam.1': 'content.customDimension.1',
    'extraparam.2': 'content.customDimension.2',
    'extraparam.3': 'content.customDimension.3',
    'extraparam.4': 'content.customDimension.4',
    'extraparam.5': 'content.customDimension.5',
    'extraparam.6': 'content.customDimension.6',
    'extraparam.7': 'content.customDimension.7',
    'extraparam.8': 'content.customDimension.8',
    'extraparam.9': 'content.customDimension.9',
    'extraparam.10': 'content.customDimension.10',
    'extraparam.11': 'content.customDimension.11',
    'extraparam.12': 'content.customDimension.12',
    'extraparam.13': 'content.customDimension.13',
    'extraparam.14': 'content.customDimension.14',
    'extraparam.15': 'content.customDimension.15',
    'extraparam.16': 'content.customDimension.16',
    'extraparam.17': 'content.customDimension.17',
    'extraparam.18': 'content.customDimension.18',
    'extraparam.19': 'content.customDimension.19',
    'extraparam.20': 'content.customDimension.20',
    'ad.extraparam.1': 'ad.customDimension.1',
    'ad.extraparam.2': 'ad.customDimension.2',
    'ad.extraparam.3': 'ad.customDimension.3',
    'ad.extraparam.4': 'ad.customDimension.4',
    'ad.extraparam.5': 'ad.customDimension.5',
    'ad.extraparam.6': 'ad.customDimension.6',
    'ad.extraparam.7': 'ad.customDimension.7',
    'ad.extraparam.8': 'ad.customDimension.8',
    'ad.extraparam.9': 'ad.customDimension.9',
    'ad.extraparam.10': 'ad.customDimension.10'
  }
})

module.exports = DeprecatedOptions


/***/ }),
/* 393 */
/***/ (function(module, exports, __webpack_require__) {

var Emitter = __webpack_require__(34)
var Timer = __webpack_require__(107)
var Chrono = __webpack_require__(54)
var Constants = __webpack_require__(26)
var Util = __webpack_require__(13)

var YBRequest = __webpack_require__(31)
var Communication = __webpack_require__(108)
var FlowTransform = __webpack_require__(394)
var ViewTransform = __webpack_require__(151)
var ResourceTransform = __webpack_require__(152)
var OfflineTransform = __webpack_require__(157)

var Options = __webpack_require__(158)
var YouboraStorage = __webpack_require__(109)
var OfflineStorage = __webpack_require__(395)
var RequestBuilder = __webpack_require__(160)

var YouboraInfinity = __webpack_require__(110)

var HybridNetwork = __webpack_require__(150)
var BrowserLoadTimes = __webpack_require__(397)
var BackgroundDetector = __webpack_require__(161)
var DeviceDetector = __webpack_require__(162)
var ResizeScrollDetector = __webpack_require__(399)
var UUIDGenerator = __webpack_require__(163)

var Plugin = Emitter.extend(
  /** @lends youbora.Plugin.prototype */
  {
    /**
     * This is the main class of video analytics. You may want to have one instance for each video
     * you want to track. Will need {@link Adapter}s for both content and ads.
     *
     * @constructs Plugin
     * @extends youbora.Emitter
     * @memberof youbora
     *
     * @param {Options} [options] An object complying with {@link Options} constructor.
     * @param {Adapter} [adapter] If an adapter is provided, setAdapter will be immediately called.
     * @param {object} [dataReq] If a data response is given, it wont request to /data anything and will use this one instead.
     */
    constructor: function (options, adapter, dataReq) {
      if (typeof adapter === 'string' && !dataReq) {
        dataReq = adapter
        adapter = null
      }
      /** Reference to {@link youbora.YouboraStorage} */
      this.storage = new YouboraStorage()

      /** UUIDGenerator manager */
      this.uuidGenerator = new UUIDGenerator(this)

      /** Instance of youbora infinity. */
      this.infinity = new YouboraInfinity(this)

      /** This flags indicates that /init has been called. */
      this.isInitiated = false

      /** This flags indicates that /adManifest has been called. */
      this.isAdsManifestSent = false

      /** Postroll counter to fix plugins reporting stop before postrolls */
      this.playedPostrolls = 0

      /** This flags indicates if an ad break is started */
      this.isBreakStarted = false

      /** Chrono for init times. */
      this.initChrono = new Chrono()

      /** Stored {@link Options} of the session. */
      this.options = new Options(options)

      /** Reference to {@link youbora.YouboraStorage} */
      this.storage = new YouboraStorage(null, this.options.disableCookies, this.options.forceCookies, this.options.disableStorage)

      /** Reference to {@link youbora.OfflineStorage} */
      if (!this.options.disableStorage) {
        this.offlineStorage = new OfflineStorage()
      }

      this._adapter = null
      this._adsAdapter = null
      this._ping = new Timer(this._sendPing.bind(this), 5000)
      this._beat = new Timer(this._sendBeat.bind(this), 30000)
      this._refreshData = new Timer(this._checkOldData.bind(this), 3600000) // 1h
      this._refreshData.start()
      this.sessionExpire = Number(this.storage.getLocal('sessionExpire')) * 1000 || 300000

      this.requestBuilder = new RequestBuilder(this)

      this.resourceTransform = new ResourceTransform(this)

      this.lastEventTime = null

      this.restartViewTransform(dataReq)

      this._initInfinity()

      this.hybridNetwork = new HybridNetwork()
      this.browserLoadTimes = new BrowserLoadTimes(this)
      this.deviceDetector = new DeviceDetector()
      this.backgroundDetector = new BackgroundDetector(this)
      this.resizeScrollDetector = new ResizeScrollDetector(this)
      if (this.options['background.enabled']) this.backgroundDetector.startDetection()

      if (adapter) this.setAdapter(adapter)
    },

    _checkOldData: function () {
      if (this._adapter && this._adapter.flags.isStarted) return
      if (this.infinity.infinityStarted) return
      this.restartViewTransform()
    },

    restartViewTransform: function (response) {
      // FastData
      this.viewTransform = new ViewTransform(this)
      this.viewTransform.on(ViewTransform.Event.DONE, this._receiveData.bind(this))

      // External response
      if (response) {
        this.viewTransform.setData(response)
        return
      }

      if (this.getIsDataExpired() || !this.getStorageHost() ||
        ((this.storage.getLocal('accCode') !== this.options.accountCode) &&
          (this.storage.getSession('accCode') !== this.options.accountCode))) { // If expired or nonexistant
        this.storage.removeStorages('data')
        this.storage.removeStorages('session')
        this.storage.removeLocal('infinityStarted')
        this.viewTransform.init() // request a new data
      } else {
        this.viewTransform.setData(this.getStoredData()) // use stored data
      }
    },

    /**
    * This callback is called when a correct data response is received.
    *
    * @param {any} e Response from fastdata
    */
    _receiveData: function (e) {
      this._ping.interval = e.target.response.pingTime * 1000
      this._beat.interval = e.target.response.beatTime * 1000
      this.sessionExpire = e.target.response.sessionExpire * 1000
      this.storage.setStorages('data', e.target.response.msg)
      this.storage.setStorages('dataTime', new Date().getTime())
      this.storage.setStorages('accCode', this.options.accountCode)
      if (this.getIsSessionExpired()) {
        this.viewTransform.setSession(this.viewTransform.response.code)
        this.storage.setStorages('session', this.viewTransform.response.code)
        this.storage.setStorages('host', this.viewTransform.response.host)
      } else {
        this.viewTransform.setSession(this.getSession())
        this.viewTransform.setHost(this.getStorageHost())
      }
    },

    /**
    * Reset all variables and stop all timers
    * @private
    */
    _reset: function () {
      this._stopPings()
      this.resourceTransform = new ResourceTransform(this)
      if (this._adapter) { // The fix
        this._adapter.flags.reset()
      }
      this.isInitiated = false
      this.isStarted = false
      this.startDelayed = false
      this.isAdsManifestSent = false
      this.initChrono.reset()
      this._totalPrerollsTime = 0
      this.requestBuilder.lastSent.breakNumber = 0
      this.requestBuilder.lastSent.adNumber = 0
      this._savedAdManifest = null
      this._savedAdError = null
      this.playedPostrolls = 0
      this.isBreakStarted = false
    },

    /**
    * Creates and enqueues related request using {@link Communication#sendRequest}.
    * It will fire will-send-events.
    *
    * @param {string} willSendEvent Name of the will-send event. Use {@link Plugin.Event} enum.
    * @param {string} service Name of the service. Use {@link Constants.Service} enum.
    * @param {Object} params Params of the request
    * @param {Object} body Body of the request, if it is a POST request
    * @param {string} method Request method. GET by default
    * @param {function} callback Callback method for successful request
    * @param {Object} callbackParams Json with params for callback call
    * @private
    */
    _send: function (willSendEvent, service, params, body, method, callback, callbackParams) {
      var now = new Date().getTime()
      if (this.options.preventZombieViews && this.lastEventTime && (now > (this.lastEventTime + (600 * 1000)))) { // 600 * 1000ms = 10 minutes
        // if last event was sent more than 10 minutes ago, it will use new view code
        this.viewTransform.nextView()
      }
      this.lastEventTime = (service === Constants.Service.STOP) ? null : now
      params = this.requestBuilder.buildParams(params, service)

      if (this.getIsLive()) {
        params.mediaDuration = this.options['content.duration']
        params.playhead = undefined
      }

      var data = {
        params: params,
        plugin: this,
        adapter: this.getAdapter(),
        adsAdapter: this.getAdsAdapter()
      }

      this.emit(willSendEvent, data)

      if (this._comm && (params !== null || typeof method !== 'undefined') && this.options.enabled) {
        this.lastServeiceSent = service
        var options = {}
        if (typeof method !== 'undefined' && method !== 'GET') {
          options.method = method
        }
        var request = new YBRequest(null, service, params, options)
        if (body) request.setBody(body)
        this._comm.sendRequest(request, callback, callbackParams)
      }
    },

    /**
    * Initializes comm and its transforms.
    * @private
    */
    _initComm: function () {
      var resource = this.getResource()
      if (this._adapter && this._adapter.getURLToParse()) {
        resource = this._adapter.getURLToParse()
      }
      this.resourceTransform.init(resource)

      this._comm = new Communication()
      this._comm.addTransform(new FlowTransform())
      this._comm.addTransform(this.viewTransform)
      if (this.options && this.options.offline) {
        this._comm.addTransform(new OfflineTransform(this))
      } else {
        this._comm.addTransform(this.resourceTransform)
      }
    },

    /**
    * Returns the current {@link youbora.Communication} instance.
    *
    * @returns {youbora.Communication} communication instance
    */
    getComm: function () {
      return this._comm
    },

    /**
    * Modifies current options. See {@link Options.setOptions}.
    *
    * @param {any} options
    */
    setOptions: function (options) {
      if (options) {
        this.options.setOptions(options)
        if (typeof options['background.enabled'] === 'boolean') {
          if (options['background.enabled']) {
            this.backgroundDetector.startDetection()
          } else {
            this.backgroundDetector.stopDetection()
          }
        }
      }
    },

    /**
    * Get fastdata response to set it in another plugin instance
    */
    getFastDataConfig: function () {
      return this.viewTransform.response.msg
    },

    /**
    * Disable request sending.
    */
    disable: function () {
      this.setOptions({ enabled: false })
    },

    /**
    * Re-enable request sending.
    */
    enable: function () {
      this.setOptions({ enabled: true })
    }
  },

  /** @lends youbora.Plugin */
  {
    // Static Memebers //
    /**
    * List of events that could be fired
    * @enum
    * @event
    */
    Event: Constants.WillSendEvent
  }
)

// Apply Mixins
// Plugin is actually a big class, I decided to separate the logic into
// different mixin files to ease the maintainability of each file.
// Filename convention will be plugin+xxxxx.js where xxxxx is the added functionality.
Util.assign(Plugin.prototype, __webpack_require__(402))
Util.assign(Plugin.prototype, __webpack_require__(407))
Util.assign(Plugin.prototype, __webpack_require__(408))
Util.assign(Plugin.prototype, __webpack_require__(409))
Util.assign(Plugin.prototype, __webpack_require__(410))
Util.assign(Plugin.prototype, __webpack_require__(411))
Util.assign(Plugin.prototype, __webpack_require__(412))
Util.assign(Plugin.prototype, __webpack_require__(413))
Util.assign(Plugin.prototype, __webpack_require__(414))

module.exports = Plugin


/***/ }),
/* 394 */
/***/ (function(module, exports, __webpack_require__) {

var Transform = __webpack_require__(38)
var Constants = __webpack_require__(26)

/**
 * This transform ensures that no requests will be sent before an /init or /start request.
 * As these are the two possible first requests that the API expects for a view.
 *
 * @constructs
 * @extends youbora.Transform
 * @memberof youbora
 * @name FlowTransform
 *
 * @param {Plugin} plugin Instance of {@link Plugin}
 */
var FlowTransform = Transform.extend(
  /** @lends youbora.FlowTransform.prototype */
  {
    _services: [Constants.Service.INIT, Constants.Service.START, Constants.Service.OFFLINE_EVENTS],
    /**
     * Returns if transform is blocking.
     *
     * @param {YBRequest} request Request to transform.
     * @return {bool} True if queue shall be blocked.
     */
    isBlocking: function (request) {
      if (this._isBusy && request != null) {
        if (this._services.indexOf(request.service) !== -1) {
          this.done()
        } else if (request.service === Constants.Service.ERROR) {
          return false
        }
      }
      return Transform.prototype.isBlocking.apply(this, arguments)
    }
  }
)

module.exports = FlowTransform


/***/ }),
/* 395 */
/***/ (function(module, exports, __webpack_require__) {

var YouboraObject = __webpack_require__(10)
var Storage = __webpack_require__(109)

/**
 * This class manages data storage for offline events in an storage.
 *
 * @extends youbora.Emitter
 * @memberof youbora
 */
var OfflineStorage = YouboraObject.extend({
  constructor: function () {
    this.storage = new Storage('youboraOffline', true) // No cookies for offline
    this.actualView = null
    this.viewList = []
    this.givenIds = []
    this._getOldViewList()
  },

  _newView: function () {
    // search for first unused id
    var viewId = this._getValidId()

    // create empty view
    this.storage.setLocal(viewId, '')

    // add to viewlist
    this.viewList.push(viewId)
    this.storage.setLocal('views', this.viewList)

    // save the id
    this.actualView = viewId
  },

  addEvent: function (event, params) {
    // if event is start, create new view
    if (event === '/start') this._newView()

    // if event is init, ignore
    if (event === '/init') return null

    // if we have no view discard
    if (!this.actualView) return null

    // create event object
    var fullEvent = '{"request":"' + event.slice(1) + '",' // {"request":"start",
    fullEvent += '"unixtime":' + Date.now() + ',' // "unixtime":1499876515,
    for (var param in params) {
      if (params[param] === undefined) break
      fullEvent += '"' + param + '":' // "aParam":
      if (param === 'code') {
        fullEvent += '"' + 'CODE_PLACEHOLDER' + '",' // "CODE_PLACEHOLDER",
      } else if (param === 'sessionId') {
        fullEvent += '"' + 'SESSION_PLACEHOLDER' + '",' // "SESSION_PLACEHOLDER",
      } else if (param === 'sessionRoot') {
        fullEvent += '"' + 'ROOT_PLACEHOLDER' + '",' // "ROOT_PLACEHOLDER",
      } else if (typeof params[param] === 'string') {
        fullEvent += '"' + params[param] + '",' // "aStringValue",
      } else if (typeof params[param] === 'object') {
        fullEvent += '"' + JSON.stringify(params[param]).replace(/"/g, '\\"') + '",' // json object
      } else {
        fullEvent += params[param] + ',' // 123, for example
      }
    }
    fullEvent = fullEvent.slice(0, -1) // remove the last comma
    fullEvent += '}'

    // get accumulated view object
    var temp = this.storage.getLocal(this.actualView)
    if (temp !== '') temp = temp + ',' // comma between events

    // add the event
    this.storage.setLocal(this.actualView, temp + fullEvent)
  },

  getView: function () {
    if (this.viewList.length > this.givenIds.length) { // if we have any view not sent yet
      var position = 0
      while (true) {
        var idToSend = this.viewList[position]
        if (this.givenIds.indexOf(idToSend) < 0) {
          this.givenIds.push(idToSend)
          return ['[' + this.storage.getLocal(idToSend) + ']', idToSend]
        }
        position++
      }
    }
    return [null, null]
  },

  removeView: function (id) {
    this.storage.removeLocal(id)
    var position = this.viewList.indexOf(id)
    if (position !== -1) this.viewList.splice(position, 1)
    position = this.givenIds.indexOf(id)
    if (position !== -1) this.givenIds.splice(position, 1)
    this.storage.setLocal('views', this.viewList.toString())
    if (id === this.actualView) this.actualView = null
  },

  _getOldViewList: function () {
    var stringList = ''
    if (this.storage.getLocal('views')) {
      stringList = this.storage.getLocal('views')
    } else {
      this.storage.setLocal('views', '')
    }

    if (stringList === '') {
      this.viewList = []
    } else if (typeof stringList.split === 'function') {
      this.viewList = stringList.split(',')
    }
  },

  _getValidId: function () {
    // get a value not in the list
    var id = Math.floor(Math.random() * 1e8).toString()
    if (this.viewList.indexOf(id) >= 0) {
      return this._getValidId()
    }
    return id
  },

  sent: function () {
    this.givenIds = []
  }
})

module.exports = OfflineStorage


/***/ }),
/* 396 */
/***/ (function(module, exports, __webpack_require__) {

var Transform = __webpack_require__(38)

/**
 * This transform ensures that no requests will be sent without sessionId when is required
 *
 * @constructs
 * @extends youbora.Transform
 * @memberof youbora
 * @name WrongTransform
 *
 * @param {Plugin} plugin Instance of {@link Plugin}
 */
var WrongTransform = Transform.extend(
  /** @lends youbora.WrongTransform.prototype */
  {
    /**
   * Returns if transform is blocking.
   *
   * @param {YBRequest} request Request to transform.
   * @return {bool} True if queue shall be blocked.
   */
    isBlocking: function (request) {
      if (!request.params.sessionId) {
        return true
      }
      return false
    }
  }
)

module.exports = WrongTransform


/***/ }),
/* 397 */
/***/ (function(module, exports, __webpack_require__) {

/* global PerformanceObserver */
var YouboraObject = __webpack_require__(10)
var RUMSpeedIndex = __webpack_require__(398)

/**
 * This static class provides information about the load times of the page
 *
 * @constructs YouboraObject
 * @extends youbora.YouboraObject
 * @memberof youbora
 *
 */
var BrowserLoadTimes = YouboraObject.extend({
  constructor: function (plugin) {
    this.infinity = plugin.infinity
    this.timeObject = null
    this.playerSetup = null
    this.perfObject = null
    this.myTimesObject = {}

    if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
      window.addEventListener('load', this._windowLoaded.bind(this))
      if (window.performance && window.performance.timing) {
        try {
          if (typeof window.performance.getEntriesByType === 'function') {
            this.perfObject = window.performance
          }
        } catch (err) {
          // Nothing
        }
        this.timeObject = window.performance.timing
      }
    }
    try {
      if (typeof PerformanceObserver === 'function') {
        var observer = new PerformanceObserver(function (list, obj) {
          var entries = list.getEntries()
          this.myTimesObject.largestContentfulPaint = entries[entries.length - 1].renderTime
        }.bind(this))
        if (PerformanceObserver.supportedEntryTypes.indexOf('largest-contentful-paint') > -1) {
          observer.observe({ entryTypes: ['largest-contentful-paint'] })
        }
      }
    } catch (err) {
      // Cant use PerformanceObserver, entryTypes...
    }
  },

  _windowLoaded: function () {
    this.myTimesObject.onLoad = new Date().getTime()
    this._getEnoughFPS()
    setTimeout(this._fireLoadTimesEvent.bind(this), 1000)
  },

  _fireLoadTimesEvent: function () {
    this._getLastMetrics()
    this.infinity.fireEvent('loadTimes', {}, this._getAllValues())
  },

  _getAllValues: function () {
    var ret = {
      PageLoadTime: this.getPageLoadTime(),
      DNSTime: this.getDnsTime(),
      TCPTime: this.getTcpTime(),
      HandshakeTime: this.getHandshakeTime(),
      DomReadyTime: this.getDomReadyTime(),
      BackendTime: this.getBackendTime(),
      FrontendTime: this.getFrontendTime(),
      VisualReady: this.getTimeToVisuallyReady(),
      TimeToInteractive: this.getTimeToInteractive(),
      JsTime: this.getJSTime(),
      CssTime: this.getCSSTime(),
      ImageTime: this.getImageTime(),
      FontTime: this.getFontTime(),
      AvgReqLatency: this.getAvgReqLatency(),
      MaxReqLatency: this.getMaxReqLatency(),
      FirstPaint: this.getFirstPaint(),
      FirstContentfulPaint: this.getFirstContentfulPaint(),
      LargestContentfulPaint: this.getLargestContentfulPaint(),
      SpeedIndex: this.getSpeedIndex()
    }
    for (var key in ret) {
      if (ret[key] === null || ret[key] === undefined || ret[key] < 0) {
        delete ret[key]
      } else {
        ret[key] = Math.round(ret[key])
      }
    }
    return ret
  },

  // Getters

  getPageLoadTime: function () {
    var ret = null
    if (this.timeObject) {
      ret = this.timeObject.loadEventEnd - this.timeObject.navigationStart
    }
    return ret
  },

  getPlayerStartupTime: function () {
    var ret = null
    if (this.timeObject && this.playerSetup) {
      ret = this.playerSetup - this.timeObject.navigationStart
    }
    return ret
  },

  getDnsTime: function () {
    var ret = null
    if (this.timeObject) {
      ret = this.timeObject.domainLookupEnd - this.timeObject.domainLookupStart
    }
    return ret
  },

  getTcpTime: function () {
    var ret = null
    if (this.timeObject) {
      ret = this.timeObject.connectEnd - this.timeObject.connectStart
    }
    return ret
  },

  getHandshakeTime: function () {
    var ret = null
    if (this.timeObject && this.timeObject.secureConnectionStart) {
      ret = this.timeObject.connectEnd - this.timeObject.secureConnectionStart
    }
    return ret
  },

  getDomReadyTime: function () {
    var ret = null
    if (this.timeObject) {
      ret = this.timeObject.domComplete - this.timeObject.navigationStart
    }
    return ret
  },

  getBackendTime: function () {
    var ret = null
    if (this.timeObject) {
      ret = this.timeObject.responseStart - this.timeObject.navigationStart
    }
    return ret
  },

  getFrontendTime: function () {
    var ret = null
    if (this.timeObject) {
      ret = this.myTimesObject.onLoad - this.timeObject.responseStart
    }
    return ret
  },

  getTimeToVisuallyReady: function () {
    var ret = this.myTimesObject.firstPaint || 0
    if (this.timeObject) {
      return Math.max(
        ret,
        this.timeObject.domContentLoadedEventEnd - this.timeObject.navigationStart || 0
      // this.myTimesObject.heroImages - this.timeObject.navigationStart || 0
      )
    }
    return ret || null
  },

  getTimeToInteractive: function () {
    if (this.myTimesObject.fps && this.getTimeToVisuallyReady()) {
      return Math.max(this.myTimesObject.fps, this.getTimeToVisuallyReady())
    } else {
      setTimeout(function () { this.getTimeToInteractive() }.bind(this), 500)
    }
  },

  getJSTime: function () {
    return this._getXTime('script')
  },

  getCSSTime: function () {
    return this._getXTime('css')
  },

  getImageTime: function () {
    return this._getXTime('img')
  },

  getFontTime: function () {
    return this._getXTime('css', ['.woff', '.otf', '.ttf'])
  },

  getAvgReqLatency: function () {
    try {
      if (this.perfObject && typeof this.perfObject.getEntriesByType === 'function') {
        var count = 0
        var latency = 0
        var scripts = this.perfObject.getEntriesByType('resource')
        for (var i in scripts) {
          if (scripts[i].requestStart && scripts[i].responseStart) {
            latency += scripts[i].responseStart - scripts[i].requestStart
          }
          count++
        }
        return latency / count
      }
    } catch (err) {
      // Nothing
    }
    return null
  },

  getFirstPaint: function () {
    return this.myTimesObject ? this.myTimesObject.firstPaint : null
  },

  getFirstContentfulPaint: function () {
    return this.myTimesObject ? this.myTimesObject.firstContentfulPaint : null
  },

  getLargestContentfulPaint: function () {
    return this.myTimesObject ? this.myTimesObject.largestContentfulPaint : null
  },

  getMaxReqLatency: function () {
    try {
      if (this.perfObject && typeof this.perfObject.getEntriesByType === 'function') {
        var scripts = this.perfObject.getEntriesByType('resource')
        var latency = 0
        for (var i in scripts) {
          if (scripts[i].requestStart && scripts[i].responseStart) {
            latency = Math.max(latency, scripts[i].responseStart - scripts[i].requestStart)
          }
        }
        return latency
      }
    } catch (err) {
      // Nothing
    }
    return null
  },

  getSpeedIndex: function () {
    var ret = null
    if (typeof window !== 'undefined' && window.performance && typeof window.performance.getEntriesByType === 'function') {
      try {
        ret = RUMSpeedIndex()
      } catch (e) {
        // nothing
      }
    }
    return ret
  },

  _getXTime: function (type, validExtensions) {
    var ret = 0
    try {
      if (this.perfObject && typeof this.perfObject.getEntriesByType === 'function') {
        var scripts = this.perfObject.getEntriesByType('resource')
        for (var i in scripts) {
          if (scripts[i].initiatorType === type) {
            if (!validExtensions) {
              ret += scripts[i].duration
            } else {
              var valid = false
              for (var ext in validExtensions) {
                if (scripts[i].name.indexOf(validExtensions[ext] > 0)) {
                  valid = true
                }
              }
              if (valid) {
                ret += scripts[i].duration
              }
            }
          }
        }
      }
    } catch (err) {
    // Nothing
    }
    return Math.round(ret) || null
  },

  _getLastMetrics: function () {
    var firstPaint = null
    var contentfulPaint = null
    try {
      if (this.perfObject && typeof this.perfObject.getEntriesByType === 'function') {
        var entries = this.perfObject.getEntriesByType('paint')
        for (var i in entries) {
          if (entries[i].name === 'first-paint') {
            firstPaint = entries[i].startTime
          } else if (entries[i].name === 'first-contentful-paint') {
            contentfulPaint = entries[i].startTime
          }
        }
      }
    } catch (err) {
    // Nothing
    }
    // First paint
    if (!firstPaint && this.timeObject) {
      firstPaint = this.timeObject.msFirstPaint - this.timeObject.navigationStart
    }
    // TODO first paint for firefox
    this.myTimesObject.firstPaint = firstPaint
    // First contentful paint
    this.myTimesObject.firstContentfulPaint = contentfulPaint
    // Others
    this.getTimeToInteractive()
  },

  _getEnoughFPS: function () {
    if (this.timeObject && typeof window !== 'undefined') {
      var req = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function () {}
      this.preFPS = new Date().getTime()
      req(function () {
        var now = new Date().getTime()
        if (now < this.preFPS + 50) {
          this.myTimesObject.fps = now - this.timeObject.navigationStart
        } else {
          setTimeout(function () { return this._getEnoughFPS() }.bind(this), 50)
        }
      }.bind(this))
    } else {
      return true
    }
  },

  // Setters

  setPlayerSetupTime: function () {
    this.playerSetup = this.playerSetup || new Date().getTime()
  }
})

module.exports = BrowserLoadTimes


/***/ }),
/* 398 */
/***/ (function(module, exports) {

/* istanbul ignore next */
/******************************************************************************
Copyright (c) 2014, Google Inc.
All rights reserved.
Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright notice,
      this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright notice,
      this list of conditions and the following disclaimer in the documentation
      and/or other materials provided with the distribution.
    * Neither the name of the <ORGANIZATION> nor the names of its contributors
    may be used to endorse or promote products derived from this software
    without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
******************************************************************************/

/******************************************************************************
*******************************************************************************
  Calculates the Speed Index for a page by:
  - Collecting a list of visible rectangles for elements that loaded
    external resources (images, background images, fonts)
  - Gets the time when the external resource for those elements loaded
    through Resource Timing
  - Calculates the likely time that the background painted
  - Runs the various paint rectangles through the SpeedIndex calculation:
    https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/metrics/speed-index
  TODO:
  - Improve the start render estimate
  - Handle overlapping rects (though maybe counting the area as multiple paints
    will work out well)
  - Detect elements with Custom fonts and the time that the respective font
    loaded
  - Better error handling for browsers that don't support resource timing
*******************************************************************************
******************************************************************************/

var RUMSpeedIndex = function (win) {
  win = win || window
  var doc = win.document

  /****************************************************************************
    Support Routines
  ****************************************************************************/
  // Get the rect for the visible portion of the provided DOM element
  var GetElementViewportRect = function (el) {
    var intersect = false
    if (el.getBoundingClientRect) {
      var elRect = el.getBoundingClientRect()
      intersect = {
        top: Math.max(elRect.top, 0),
        left: Math.max(elRect.left, 0),
        bottom: Math.min(elRect.bottom, (win.innerHeight || doc.documentElement.clientHeight)),
        right: Math.min(elRect.right, (win.innerWidth || doc.documentElement.clientWidth))
      }
      if (intersect.bottom <= intersect.top ||
          intersect.right <= intersect.left) {
        intersect = false
      } else {
        intersect.area = (intersect.bottom - intersect.top) * (intersect.right - intersect.left)
      }
    }
    return intersect
  }

  // Check a given element to see if it is visible
  var CheckElement = function (el, url) {
    if (url) {
      var rect = GetElementViewportRect(el)
      if (rect) {
        rects.push({
          url: url,
          area: rect.area,
          rect: rect
        })
      }
    }
  }

  // Get the visible rectangles for elements that we care about
  var GetRects = function () {
    // Walk all of the elements in the DOM (try to only do this once)
    var elements = doc.getElementsByTagName('*')
    var re = /url\(.*(http.*)\)/ig
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i]
      var style = win.getComputedStyle(el)

      // check for Images
      if (el.tagName === 'IMG') {
        CheckElement(el, el.src)
      }
      // Check for background images
      if (style['background-image']) {
        re.lastIndex = 0
        var matches = re.exec(style['background-image'])
        if (matches && matches.length > 1) { CheckElement(el, matches[1].replace('"', '')) }
      }
      // recursively walk any iFrames
      if (el.tagName === 'IFRAME') {
        try {
          var rect = GetElementViewportRect(el)
          if (rect) {
            var tm = RUMSpeedIndex(el.contentWindow)
            if (tm) {
              rects.push({
                tm: tm,
                area: rect.area,
                rect: rect
              })
            }
          }
        } catch (e) {
        }
      }
    }
  }

  // Get the time at which each external resource loaded
  var GetRectTimings = function () {
    var timings = {}
    var requests = win.performance.getEntriesByType('resource')
    for (var i = 0; i < requests.length; i++) { timings[requests[i].name] = requests[i].responseEnd }
    for (var j = 0; j < rects.length; j++) {
      if (!('tm' in rects[j])) { rects[j].tm = timings[rects[j].url] !== undefined ? timings[rects[j].url] : 0 }
    }
  }

  // Get the first paint time.
  var GetFirstPaint = function () {
    // If the browser supports a first paint event, just use what the browser reports
    if ('msFirstPaint' in win.performance.timing) { firstPaint = win.performance.timing.msFirstPaint - navStart }
    var paintMetrics = win.performance.getEntriesByType('paint')
    for (var k = 0; k < paintMetrics.length; k++) {
      if (paintMetrics[k].name === 'first-paint') {
        firstPaint = paintMetrics[k].startTime
      }
    }
    // For browsers that don't support first-paint or where we get insane values,
    // use the time of the last non-async script or css from the head.
    if (firstPaint === undefined || firstPaint < 0 || firstPaint > 120000) {
      firstPaint = win.performance.timing.responseStart - navStart
      var headURLs = {}
      var headElements = doc.getElementsByTagName('head')[0].children
      for (var i = 0; i < headElements.length; i++) {
        var el = headElements[i]
        if (el.tagName === 'SCRIPT' && el.src && !el.async) { headURLs[el.src] = true }
        if (el.tagName === 'LINK' && el.rel === 'stylesheet' && el.href) { headURLs[el.href] = true }
      }
      var requests = win.performance.getEntriesByType('resource')
      var doneCritical = false
      for (var j = 0; j < requests.length; j++) {
        if (!doneCritical &&
            headURLs[requests[j].name] &&
           (requests[j].initiatorType === 'script' || requests[j].initiatorType === 'link')) {
          var requestEnd = requests[j].responseEnd
          if (firstPaint === undefined || requestEnd > firstPaint) { firstPaint = requestEnd }
        } else {
          doneCritical = true
        }
      }
    }
    firstPaint = Math.max(firstPaint, 0)
  }

  // Sort and group all of the paint rects by time and use them to
  // calculate the visual progress
  var CalculateVisualProgress = function () {
    var paints = { 0: 0 }
    var total = 0
    for (var i = 0; i < rects.length; i++) {
      var tm = firstPaint
      if ('tm' in rects[i] && rects[i].tm > firstPaint) { tm = rects[i].tm }
      if (paints[tm] === undefined) { paints[tm] = 0 }
      paints[tm] += rects[i].area
      total += rects[i].area
    }
    // Add a paint area for the page background (count 10% of the pixels not
    // covered by existing paint rects.
    var pixels = Math.max(doc.documentElement.clientWidth, win.innerWidth || 0) *
                 Math.max(doc.documentElement.clientHeight, win.innerHeight || 0)
    if (pixels > 0) {
      pixels = Math.max(pixels - total, 0) * pageBackgroundWeight
      if (paints[firstPaint] === undefined) { paints[firstPaint] = 0 }
      paints[firstPaint] += pixels
      total += pixels
    }
    // Calculate the visual progress
    if (total) {
      for (var time in paints) {
        if (paints.hasOwnProperty(time)) { // eslint-disable-line no-prototype-builtins
          progress.push({ tm: time, area: paints[time] })
        }
      }
      progress.sort(function (a, b) { return a.tm - b.tm })
      var accumulated = 0
      for (var j = 0; j < progress.length; j++) {
        accumulated += progress[j].area
        progress[j].progress = accumulated / total
      }
    }
  }

  // Given the visual progress information, Calculate the speed index.
  var CalculateSpeedIndex = function () {
    if (progress.length) {
      SpeedIndex = 0
      var lastTime = 0
      var lastProgress = 0
      for (var i = 0; i < progress.length; i++) {
        var elapsed = progress[i].tm - lastTime
        if (elapsed > 0 && lastProgress < 1) { SpeedIndex += (1 - lastProgress) * elapsed }
        lastTime = progress[i].tm
        lastProgress = progress[i].progress
      }
    } else {
      SpeedIndex = firstPaint
    }
  }

  /****************************************************************************
    Main flow
  ****************************************************************************/
  var rects = []
  var progress = []
  var firstPaint
  var SpeedIndex
  var pageBackgroundWeight = 0.1
  try {
    var navStart = win.performance.timing.navigationStart
    GetRects()
    GetRectTimings()
    GetFirstPaint()
    CalculateVisualProgress()
    CalculateSpeedIndex()
  } catch (e) {
  }
  return SpeedIndex
}

module.exports = RUMSpeedIndex


/***/ }),
/* 399 */
/***/ (function(module, exports, __webpack_require__) {

var YouboraObject = __webpack_require__(10)
/**
 * This static class provides screen scrolling and resizing detection methods.
 *
 * @class
 * @static
 * @memberof youbora
 */
var ResizeScrollDetector = YouboraObject.extend({
  constructor: function (plugin) {
    this.pluginref = plugin
    this.listenerReference = this._changeListener.bind(this)
    this.loadReference = this._loadListener.bind(this)
    this.isEnabled = false

    this.pageHeight = 0
    this.maxHeight = 0
    this.startDetection()
  },

  startDetection: function () {
    if (!this.isEnabled && typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
      window.addEventListener('scroll', this.listenerReference)
      window.addEventListener('resize', this.listenerReference)
      window.addEventListener('load', this.loadReference)
      this.isEnabled = true
    }
  },

  stopDetection: function () {
    if (this.isEnabled && typeof window !== 'undefined' && typeof window.removeEventListener === 'function') {
      window.removeEventListener('scroll', this.listenerReference)
      window.removeEventListener('resize', this.listenerReference)
      window.removeEventListener('load', this.loadReference)
      this.isEnabled = false
    }
  },

  getScrollDepth: function () {
    var ret = null
    if (this.maxHeight && this.pageHeight) {
      ret = Math.min(Math.trunc((this.maxHeight / this.pageHeight) * 100), 100)
    }
    return ret
  },

  _loadListener: function () {
    if (typeof document !== 'undefined') {
      var docEl = document.documentElement
      if (docEl) {
        this.pageHeight = Math.round(docEl.scrollHeight, docEl.clientHeight, docEl.offsetHeight)
        this.maxHeight = window.innerHeight
        this._updateCompletionRate()
      }
    }
  },

  _changeListener: function () {
    if (this.pageHeight) {
      var prevHeight = this.maxHeight
      this.maxHeight = Math.max(this.maxHeight, window.pageYOffset + window.innerHeight)
      if (prevHeight !== this.maxHeight) {
        this._updateCompletionRate()
      }
    }
    var adsAdapter = this.pluginref.getAdsAdapter()
    if (adsAdapter && adsAdapter.flags.isStarted) {
      if (!adsAdapter.getIsVisible()) {
        adsAdapter.stopChronoView()
      } else {
        adsAdapter.startChronoView()
      }
    }
  },

  _updateCompletionRate: function () {
    setTimeout(function () {
      this.pluginref.storage.setSession('pageScrollDepth', this.getScrollDepth())
    }.bind(this), 3000)
  }
})

module.exports = ResizeScrollDetector


/***/ }),
/* 400 */
/***/ (function(module, exports, __webpack_require__) {

/* global ActiveXObject */
var YouboraObject = __webpack_require__(10)

var DataExtractor = YouboraObject.extend({
  constructor: function (plugin) {
    this.plugin = plugin
  },

  getAllData: function () {
    var returnValue = this.getNonRandomData()
    returnValue.timestamp = this.getTimestamp()
    return returnValue
  },

  getNonRandomData: function () {
    var returnValue = {}
    returnValue.userAgent = this.getUserAgent()
    returnValue.threads = this.getVirtualCores()
    returnValue.language = this.getLanguage()
    returnValue.langList = this.getAvailableLanguages()
    returnValue.resolution = this.getResolution()
    returnValue.colorDepth = this.getColorDepth()
    returnValue.deviceMemory = this.getMemory()
    returnValue.touchscreen = this.getTouchscreen()
    returnValue.localStorage = this.getLocalStorage()
    returnValue.sessionStorage = this.getSessionStorage()
    returnValue.cookiesAvailable = this.getCookiesAvailable()
    returnValue.flashAvailable = this.getHasFlash()
    returnValue.timeZone = this.getTimeZone()
    returnValue.plugins = this.getPluginList()
    return returnValue
  },

  // Getters
  getUserAgent: function () {
    return this._getNavigatorValue('userAgent')
  },

  getVirtualCores: function () {
    return this._getNavigatorValue('hardwareConcurrency')
  },

  getLanguage: function () {
    return this._getNavigatorValue('language')
  },

  getAvailableLanguages: function () {
    return this._getNavigatorValue('languages')
  },

  getResolution: function () {
    var ret = null
    try {
      if (this._getNavigatorValue('screen')) {
        ret = navigator.screen.width.toString() + navigator.screen.height.toString()
      }
    } catch (err) {
      // ret = null
    }
    return ret
  },

  getColorDepth: function () {
    var ret = null
    try {
      if (this._getNavigatorValue('screen')) {
        ret = navigator.screen.colorDepth
      }
    } catch (err) {
      // ret = null
    }
    return ret
  },

  getMemory: function () {
    return this._getNavigatorValue('deviceMemory')
  },

  getTouchscreen: function () {
    return this._getNavigatorValue('maxTouchPoints') || false
  },

  getLocalStorage: function () {
    var ret = false
    try {
      ret = typeof localStorage !== 'undefined'
    } catch (err) {
      // ret = false
    }
    return ret
  },

  getSessionStorage: function () {
    var ret = false
    try {
      ret = typeof sessionStorage !== 'undefined'
    } catch (err) {
      // ret = false
    }
    return ret
  },

  getCookiesAvailable: function () {
    return this._getNavigatorValue('cookieEnabled') || false
  },

  getHasFlash: function () {
    var ret = false
    try {
      var plugins = this._getNavigatorValue('plugins')
      ret = (plugins && typeof plugins['Shockwave Flash'] === 'object') || (typeof window !== 'undefined' && window.ActiveXObject && (new ActiveXObject('ShockwaveFlash.ShockwaveFlash')) !== false)
    } catch (err) {
      // ret = false
    }
    return ret
  },

  getPluginList: function () {
    var ret = null
    try {
      var plugins = this._getNavigatorValue('plugins')
      if (plugins && plugins.length !== 0) {
        var pluginlist = ''
        for (var counter = 0; counter < navigator.plugins.length; counter++) {
          pluginlist += navigator.plugins[counter].description + ' ' + navigator.plugins[counter].filename + ' ' + navigator.plugins[counter].name + ' '
        }
        ret = pluginlist
      }
    } catch (err) {
      // return null
    }
    return ret
  },

  getTimeZone: function () {
    var ret = null
    try {
      var date = new Date()
      ret = date.getTimezoneOffset().toString()
    } catch (err) {
      // return null
    }
    return ret
  },

  getTimestamp: function () {
    return new Date().getTime()
  },

  _navigatorCheck: function () {
    return typeof navigator !== 'undefined'
  },

  _getNavigatorValue: function (key) {
    var ret = null
    try {
      if (this._navigatorCheck()) {
        ret = navigator[key]
      }
    } catch (err) {
      // ret = null
    }
    return ret
  }

})

module.exports = DataExtractor


/***/ }),
/* 401 */
/***/ (function(module, exports) {

/* istanbul ignore next */
var MD5 = function (s) { function L (k, d) { return (k << d) | (k >>> (32 - d)) } function K (G, k) { var I, d, F, H, x; F = (G & 2147483648); H = (k & 2147483648); I = (G & 1073741824); d = (k & 1073741824); x = (G & 1073741823) + (k & 1073741823); if (I & d) { return (x ^ 2147483648 ^ F ^ H) } if (I | d) { if (x & 1073741824) { return (x ^ 3221225472 ^ F ^ H) } else { return (x ^ 1073741824 ^ F ^ H) } } else { return (x ^ F ^ H) } } function r (d, F, k) { return (d & F) | ((~d) & k) } function q (d, F, k) { return (d & k) | (F & (~k)) } function p (d, F, k) { return (d ^ F ^ k) } function n (d, F, k) { return (F ^ (d | (~k))) } function u (G, F, aa, Z, k, H, I) { G = K(G, K(K(r(F, aa, Z), k), I)); return K(L(G, H), F) } function f (G, F, aa, Z, k, H, I) { G = K(G, K(K(q(F, aa, Z), k), I)); return K(L(G, H), F) } function D (G, F, aa, Z, k, H, I) { G = K(G, K(K(p(F, aa, Z), k), I)); return K(L(G, H), F) } function t (G, F, aa, Z, k, H, I) { G = K(G, K(K(n(F, aa, Z), k), I)); return K(L(G, H), F) } function e (G) { var Z; var F = G.length; var x = F + 8; var k = (x - (x % 64)) / 64; var I = (k + 1) * 16; var aa = Array(I - 1); var d = 0; var H = 0; while (H < F) { Z = (H - (H % 4)) / 4; d = (H % 4) * 8; aa[Z] = (aa[Z] | (G.charCodeAt(H) << d)); H++ } Z = (H - (H % 4)) / 4; d = (H % 4) * 8; aa[Z] = aa[Z] | (128 << d); aa[I - 2] = F << 3; aa[I - 1] = F >>> 29; return aa } function B (x) { var k = "", F = "", G, d; for (d = 0; d <= 3; d++) { G = (x >>> (d * 8)) & 255; F = "0" + G.toString(16); k = k + F.substr(F.length - 2, 2) } return k } function J (k) { k = k.replace(/rn/g, "n"); var d = ""; for (var F = 0; F < k.length; F++) { var x = k.charCodeAt(F); if (x < 128) { d += String.fromCharCode(x) } else { if ((x > 127) && (x < 2048)) { d += String.fromCharCode((x >> 6) | 192); d += String.fromCharCode((x & 63) | 128) } else { d += String.fromCharCode((x >> 12) | 224); d += String.fromCharCode(((x >> 6) & 63) | 128); d += String.fromCharCode((x & 63) | 128) } } } return d } var C = Array(); var P, h, E, v, g, Y, X, W, V; var S = 7, Q = 12, N = 17, M = 22; var A = 5, z = 9, y = 14, w = 20; var o = 4, m = 11, l = 16, j = 23; var U = 6, T = 10, R = 15, O = 21; s = J(s); C = e(s); Y = 1732584193; X = 4023233417; W = 2562383102; V = 271733878; for (P = 0; P < C.length; P += 16) { h = Y; E = X; v = W; g = V; Y = u(Y, X, W, V, C[P + 0], S, 3614090360); V = u(V, Y, X, W, C[P + 1], Q, 3905402710); W = u(W, V, Y, X, C[P + 2], N, 606105819); X = u(X, W, V, Y, C[P + 3], M, 3250441966); Y = u(Y, X, W, V, C[P + 4], S, 4118548399); V = u(V, Y, X, W, C[P + 5], Q, 1200080426); W = u(W, V, Y, X, C[P + 6], N, 2821735955); X = u(X, W, V, Y, C[P + 7], M, 4249261313); Y = u(Y, X, W, V, C[P + 8], S, 1770035416); V = u(V, Y, X, W, C[P + 9], Q, 2336552879); W = u(W, V, Y, X, C[P + 10], N, 4294925233); X = u(X, W, V, Y, C[P + 11], M, 2304563134); Y = u(Y, X, W, V, C[P + 12], S, 1804603682); V = u(V, Y, X, W, C[P + 13], Q, 4254626195); W = u(W, V, Y, X, C[P + 14], N, 2792965006); X = u(X, W, V, Y, C[P + 15], M, 1236535329); Y = f(Y, X, W, V, C[P + 1], A, 4129170786); V = f(V, Y, X, W, C[P + 6], z, 3225465664); W = f(W, V, Y, X, C[P + 11], y, 643717713); X = f(X, W, V, Y, C[P + 0], w, 3921069994); Y = f(Y, X, W, V, C[P + 5], A, 3593408605); V = f(V, Y, X, W, C[P + 10], z, 38016083); W = f(W, V, Y, X, C[P + 15], y, 3634488961); X = f(X, W, V, Y, C[P + 4], w, 3889429448); Y = f(Y, X, W, V, C[P + 9], A, 568446438); V = f(V, Y, X, W, C[P + 14], z, 3275163606); W = f(W, V, Y, X, C[P + 3], y, 4107603335); X = f(X, W, V, Y, C[P + 8], w, 1163531501); Y = f(Y, X, W, V, C[P + 13], A, 2850285829); V = f(V, Y, X, W, C[P + 2], z, 4243563512); W = f(W, V, Y, X, C[P + 7], y, 1735328473); X = f(X, W, V, Y, C[P + 12], w, 2368359562); Y = D(Y, X, W, V, C[P + 5], o, 4294588738); V = D(V, Y, X, W, C[P + 8], m, 2272392833); W = D(W, V, Y, X, C[P + 11], l, 1839030562); X = D(X, W, V, Y, C[P + 14], j, 4259657740); Y = D(Y, X, W, V, C[P + 1], o, 2763975236); V = D(V, Y, X, W, C[P + 4], m, 1272893353); W = D(W, V, Y, X, C[P + 7], l, 4139469664); X = D(X, W, V, Y, C[P + 10], j, 3200236656); Y = D(Y, X, W, V, C[P + 13], o, 681279174); V = D(V, Y, X, W, C[P + 0], m, 3936430074); W = D(W, V, Y, X, C[P + 3], l, 3572445317); X = D(X, W, V, Y, C[P + 6], j, 76029189); Y = D(Y, X, W, V, C[P + 9], o, 3654602809); V = D(V, Y, X, W, C[P + 12], m, 3873151461); W = D(W, V, Y, X, C[P + 15], l, 530742520); X = D(X, W, V, Y, C[P + 2], j, 3299628645); Y = t(Y, X, W, V, C[P + 0], U, 4096336452); V = t(V, Y, X, W, C[P + 7], T, 1126891415); W = t(W, V, Y, X, C[P + 14], R, 2878612391); X = t(X, W, V, Y, C[P + 5], O, 4237533241); Y = t(Y, X, W, V, C[P + 12], U, 1700485571); V = t(V, Y, X, W, C[P + 3], T, 2399980690); W = t(W, V, Y, X, C[P + 10], R, 4293915773); X = t(X, W, V, Y, C[P + 1], O, 2240044497); Y = t(Y, X, W, V, C[P + 8], U, 1873313359); V = t(V, Y, X, W, C[P + 15], T, 4264355552); W = t(W, V, Y, X, C[P + 6], R, 2734768916); X = t(X, W, V, Y, C[P + 13], O, 1309151649); Y = t(Y, X, W, V, C[P + 4], U, 4149444226); V = t(V, Y, X, W, C[P + 11], T, 3174756917); W = t(W, V, Y, X, C[P + 2], R, 718787259); X = t(X, W, V, Y, C[P + 9], O, 3951481745); Y = K(Y, h); X = K(X, E); W = K(W, v); V = K(V, g) } var i = B(Y) + B(X) + B(W) + B(V); return i.toLowerCase() }
module.exports = MD5


/***/ }),
/* 402 */
/***/ (function(module, exports, __webpack_require__) {

var Log = __webpack_require__(8)
var Constants = __webpack_require__(26)
var Util = __webpack_require__(13)
var Adapter = __webpack_require__(111)

// This file is designed to add extra functionalities to Plugin class

/** @lends youbora.Plugin.prototype */
var PluginContentMixin = {
  /**
   * Sets an adapter for video content.
   *
   * @param {Adapter} adapter
   *
   * @memberof youbora.Plugin.prototype
   */
  setAdapter: function (adapter) {
    if (this.browserLoadTimes) this.browserLoadTimes.setPlayerSetupTime()
    if (adapter.plugin) {
      Log.warn('Adapters can only be added to a single plugin')
    } else {
      this.removeAdapter()

      this._adapter = adapter
      adapter.plugin = this
      adapter.setIsAds(false)

      // Register listeners
      this.contentAdapterListeners = {}
      this.contentAdapterListeners[Adapter.Event.START] = this._startListener.bind(this)
      this.contentAdapterListeners[Adapter.Event.JOIN] = this._joinListener.bind(this)
      this.contentAdapterListeners[Adapter.Event.PAUSE] = this._pauseListener.bind(this)
      this.contentAdapterListeners[Adapter.Event.RESUME] = this._resumeListener.bind(this)
      this.contentAdapterListeners[Adapter.Event.SEEK_BEGIN] = this._seekBufferBeginListener.bind(this)
      this.contentAdapterListeners[Adapter.Event.SEEK_END] = this._seekEndListener.bind(this)
      this.contentAdapterListeners[Adapter.Event.BUFFER_BEGIN] = this._seekBufferBeginListener.bind(this)
      this.contentAdapterListeners[Adapter.Event.BUFFER_END] = this._bufferEndListener.bind(this)
      this.contentAdapterListeners[Adapter.Event.ERROR] = this._errorListener.bind(this)
      this.contentAdapterListeners[Adapter.Event.STOP] = this._stopListener.bind(this)
      this.contentAdapterListeners[Adapter.Event.VIDEO_EVENT] = this._videoEventListener.bind(this)

      for (var key in this.contentAdapterListeners) {
        this._adapter.on(key, this.contentAdapterListeners[key])
      }
    }
  },

  /**
   * Returns current adapter or null.
   *
   * @returns {Adapter}
   *
   * @memberof youbora.Plugin.prototype
   */
  getAdapter: function () {
    return this._adapter
  },

  /**
   * Removes the current adapter. Fires stop if needed. Calls adapter.dispose().
   *
   * @memberof youbora.Plugin.prototype
   * */
  removeAdapter: function () {
    if (this._adapter) {
      this._adapter.dispose()
      this._adapter.plugin = null

      if (this.contentAdapterListeners) {
        for (var key in this.contentAdapterListeners) {
          this._adapter.off(key, this.contentAdapterListeners[key])
        }
        delete this.contentAdapterListeners
      }

      this._adapter = null
    }
  },

  // ---------------------------------------- LISTENERS -----------------------------------------
  _startListener: function (e) {
    if (!this.isInitiated) {
      this.viewTransform.nextView()
      this._initComm()
      this._startPings()
    } else if (this.initChrono.startTime !== 0) {
      this._adapter.chronos.join.startTime = this.initChrono.startTime
    }
    var params = e.data.params || {}
    var allParamsReady = this.getResource() && typeof this.getIsLive() === 'boolean' &&
      (this.getIsLive() || (typeof this.getDuration() === 'number' && this.getDuration() > 0)) && this.getTitle()
    allParamsReady = this.options.forceInit ? false : (allParamsReady && this._isExtraMetadataReady())
    if (allParamsReady && !this.isInitiated) { // start
      this._send(Constants.WillSendEvent.WILL_SEND_START, Constants.Service.START, params)
      this._adSavedError()
      this._adSavedManifest()
      Log.notice(Constants.Service.START + ' ' + (params.title || params.mediaResource))
      this.isStarted = true
      // chrono if had no adapter when inited
    } else if (!this.isInitiated) { // init
      this.isInitiated = true
      this._adapter.chronos.join.start()
      this._send(Constants.WillSendEvent.WILL_SEND_INIT, Constants.Service.INIT, params)
      this._adSavedError()
      this._adSavedManifest()
      Log.notice(Constants.Service.INIT + ' ' + (params.title || params.mediaResource))
    }
  },

  _retryStart: function (e) {
    if (this._isExtraMetadataReady()) {
      this._send(Constants.WillSendEvent.WILL_SEND_START, Constants.Service.START, {})
      this.startDelayed = false
    }
  },

  _joinListener: function (e) {
    var params = {}
    Util.assign(params, e.data.params || {})
    if (!this._adsAdapter || !this._adsAdapter.flags.isStarted) {
      if (this._adapter) {
        this._adapter.chronos.join.startTime = Math.min(
          this._adapter.chronos.join.startTime + (this._totalPrerollsTime || 0),
          new Date().getTime()
        )
        this._totalPrerollsTime = 0
      }
      if (this.isInitiated && !this.isStarted) { // start if just inited
        if (this._isExtraMetadataReady()) {
          this._send(Constants.WillSendEvent.WILL_SEND_START, Constants.Service.START, params)
        } else {
          this.startDelayed = true
        }
        this._adSavedError()
        this._adSavedManifest()
        Log.notice(Constants.Service.START + ' ' + (params.title || params.mediaResource))
        this.isStarted = true
      }
      params = e.data.params || {}
      if (this._adsAdapter && this.isBreakStarted) {
        this._adsAdapter.fireBreakStop()
      }
      this._send(Constants.WillSendEvent.WILL_SEND_JOIN, Constants.Service.JOIN, params)
      Log.notice(Constants.Service.JOIN + ' ' + params.joinDuration + 'ms')
    } else { // If it is currently showing ads, join is invalidated
      if (this._adapter.monitor) this._adapter.monitor.stop()
      this._adapter.flags.isJoined = false
      this._adapter.chronos.join.stopTime = 0
    }
  },

  _pauseListener: function (e) {
    if (this._adapter) {
      if (this._adapter.flags.isBuffering ||
        this._adapter.flags.isSeeking ||
        (this._adsAdapter && this._adsAdapter.flags.isStarted)) {
        this._adapter.chronos.pause.reset()
      }
    }

    var params = e.data.params || {}
    this._send(Constants.WillSendEvent.WILL_SEND_PAUSE, Constants.Service.PAUSE, params)
    Log.notice(Constants.Service.PAUSE + ' at ' + params.playhead + 's')
  },

  _resumeListener: function (e) {
    if (this._adsAdapter && this.isBreakStarted && !this._adsAdapter.flags.isStarted) {
      this._adsAdapter.fireBreakStop()
    }
    var params = e.data.params || {}
    this._send(Constants.WillSendEvent.WILL_SEND_RESUME, Constants.Service.RESUME, params)
    Log.notice(Constants.Service.RESUME + ' ' + params.pauseDuration + 'ms')
    this._adapter.chronos.pause.reset()
  },

  _seekEndListener: function (e) {
    var params = e.data.params || {}
    this._send(Constants.WillSendEvent.WILL_SEND_SEEK, Constants.Service.SEEK, params)
    Log.notice(Constants.Service.SEEK +
      ' to ' + params.playhead +
      ' in ' + params.seekDuration + 'ms'
    )
  },

  _seekBufferBeginListener: function (e) {
    if (this._adapter && this._adapter.flags.isPaused) this._adapter.chronos.pause.reset()
    Log.notice(e.type)
  },

  _bufferEndListener: function (e) {
    var params = e.data.params || {}
    this._send(Constants.WillSendEvent.WILL_SEND_BUFFER, Constants.Service.BUFFER, params)
    Log.notice(Constants.Service.BUFFER +
      ' to ' + params.playhead +
      ' in ' + params.bufferDuration + 'ms'
    )
  },

  _errorListener: function (e) {
    if (!this._blockError(e.data.params)) {
      this.fireError(e.data.params || {})
      this._adSavedError()
      this._adSavedManifest()
    }
  },

  _blockError: function (errorParams) {
    var now = Date.now()
    var sameError = this._lastErrorParams
      ? this._lastErrorParams.errorCode === errorParams.errorCode && this._lastErrorParams.msg === errorParams.msg
      : false
    if (sameError && this._lastErrorTime + 5000 > now) {
      this._lastErrorTime = now
      return true
    }
    this._lastErrorTime = now
    this._lastErrorParams = errorParams
    return false
  },

  _stopListener: function (e) {
    this.fireStop(e.data.params || {})
  },

  _isStopReady: function (e) {
    var ret = false
    // this solution is only for the case of:
    if (!this.requestBuilder.lastSent.live && // VOD, live have no postrolls
      this._adsAdapter && // having ads adapter connected
      this._adapter && // playhead close to the end of the content (or 0 because is already restarted)
      (!this._adapter.getPlayhead() || this._adapter.getPlayhead() >= this.requestBuilder.lastSent.mediaDuration - 1)) {
      var expectedPostrolls = 0
      var pat = this.options['ad.expectedPattern']
      // We can get the expectedPostrolls from the expected pattern if it has postrolls defined
      if (pat && pat.post && pat.post[0]) {
        expectedPostrolls = pat.post[0]
        // If not, while playing postrolls after adbreakstart we can get the givenAds
      } else if (this.requestBuilder.lastSent.breaksTime) {
        if (this.requestBuilder.lastSent.position === Constants.AdPosition.Postroll) {
          expectedPostrolls = this.requestBuilder.lastSent.givenAds
        }
        // Or before playing postrolls, at least, we can check using breaksTime (from adManifest event) if we expect at least 1 postroll
        if (!expectedPostrolls && this.requestBuilder.lastSent.breaksTime) {
          var breaks = this.requestBuilder.lastSent.breaksTime
          if (breaks.length > 0 && this.requestBuilder.lastSent.mediaDuration) { // If there is no duration probably is a live content, so no postrolls
            var lastTimePosition = Math.round(breaks[breaks.length - 1])
            if (lastTimePosition + 1 >= this.requestBuilder.lastSent.mediaDuration) {
              expectedPostrolls = 1
            }
          }
        }
        // If none of the previous solutions found anything, we assume we have no postrolls
      } else {
        ret = true
      }
      // Finally, if the number of played postrolls is the same (or more) than the expected, we can close the view
      if (expectedPostrolls <= this.playedPostrolls) {
        ret = true
      }
    } else {
      ret = true
    }
    return ret
  },

  _videoEventListener: function (e) {
    this._send(Constants.WillSendEvent.WILL_SEND_VIDEO_EVENT, Constants.Service.VIDEO_EVENT, e.data.params)
  },

  _isExtraMetadataReady: function (e) {
    // If the option is disabled, always is ready
    if (!this.options.waitForMetadata || this.options.pendingMetadata.length < 1) return true
    // If for existing parameters, one of them is false (no value for it), return false
    var getters = this.requestBuilder.getGetters()
    return this.options.pendingMetadata.map(function (element) {
      if (getters.hasOwnProperty(element)) { // eslint-disable-line no-prototype-builtins
        return !!this[getters[element]]()
      }
    }.bind(this)).indexOf(false) < 0
  }
}

module.exports = PluginContentMixin


/***/ }),
/* 403 */
/***/ (function(module, exports, __webpack_require__) {

var YouboraObject = __webpack_require__(10)
var Chrono = __webpack_require__(54)

var PlaybackChronos = YouboraObject.extend(
  /** @lends youbora.PlaybackChronos.prototype */
  {
    /**
     * This class contains all the {@link Chrono}s related to view status.
     * Chronos measure time lapses between events.
     * ie: between start and join, between seek-begin and seek-end, etc.
     * Each plugin will have an instance of this class.
     *
     * @constructs PlaybackChronos
     * @extends youbora.YouboraObject
     * @memberof youbora
     */
    constructor: function () {
      this.reset()
    },

    /** Reset flag values */
    reset: function () {
      /** Chrono between start and joinTime. */
      this.join = new Chrono()

      /** Chrono between seek-begin and seek-end. */
      this.seek = new Chrono()

      /** Chrono between pause and resume. */
      this.pause = new Chrono()

      /** Chrono between buffer-begin and buffer-end. */
      this.buffer = new Chrono()

      /** Chrono for the totality of the view. */
      this.total = new Chrono()

      // For ads

      /** List of chronos with seen intervals */
      this.viewedMax = []
    }
  }
)

module.exports = PlaybackChronos


/***/ }),
/* 404 */
/***/ (function(module, exports, __webpack_require__) {

var YouboraObject = __webpack_require__(10)

var PlaybackFlags = YouboraObject.extend(
  /** @lends youbora.PlaybackFlags.prototype */
  {
    /**
     * This class contains all the flags related to view status.
     * Each plugin will have an instance of this class.
     *
     * @constructs PlaybackFlags
     * @extends youbora.YouboraObject
     * @memberof youbora
     */
    constructor: function () {
      this.reset()
    },

    /** Reset flag values */
    reset: function () {
      /** Flag when Start has been sent. */
      this.isStarted = false

      /** Flag when Join has been sent. */
      this.isJoined = false

      /** Flag when Player is paused. */
      this.isPaused = false

      /** Flag when Player is seeking. */
      this.isSeeking = false

      /** Flag when Player is buffering. */
      this.isBuffering = false

      /** Flag when Player is ended. */
      this.isEnded = false

      /** Flag when Player view ends and stop is already sent. */
      this.isStopped = false

      /** Flag with last quartile sent. */
      this.lastQuartileSent = 0
    }
  }
)

module.exports = PlaybackFlags


/***/ }),
/* 405 */
/***/ (function(module, exports, __webpack_require__) {

var AdapterConstants = __webpack_require__(75)
var Chrono = __webpack_require__(54)

var AdapterAdsMixin = {
  /** Override to return current ad position */
  getPosition: function () {
    return null
  },

  /** Override to return the given ad structure (list with number of pre, mid, and post breaks) */
  getGivenBreaks: function () {
    return null
  },

  /** Override to return the ad structure requested (list with number of pre, mid, and post breaks) */
  getExpectedBreaks: function () {
    return null
  },

  /** Override to return the structure of ads requested */
  getExpectedPattern: function () {
    return null
  },

  /** Override to return a list of playheads of ad breaks begin time */
  getBreaksTime: function () {
    return null
  },

  /** Override to return the number of ads given for the break */
  getGivenAds: function () {
    return null
  },

  /** Override to return the number of ads requested for the break */
  getExpectedAds: function () {
    return null
  },

  /** Override to return if the ad is being shown in the screen or not
   * The standard definition is: more than 50% of the pixels of the ad are on the screen
   */
  getIsVisible: function () {
    return true
  },

  /** Override to return a boolean showing if the audio is enabled when the ad begins */
  getAudioEnabled: function () {
    return null
  },

  /** Override to return if the ad is skippable */
  getIsSkippable: function () {
    return null
  },

  /** Override to return a boolean showing if the player is in fullscreen mode when the ad begins */
  getIsFullscreen: function () {
    return null
  },

  /** Override to return the ad campaign */
  getCampaign: function () {
    return null
  },

  /** Override to return the ad creative id */
  getCreativeId: function () {
    return null
  },

  /** Override to return the ad provider name */
  getProvider: function () {
    return null
  },

  /** Override to return the ad insertion type
   * Use constants:
   * youbora.Constants.AdInsertionType.ClientSide
   * youbora.Constants.AdInsertionType.ServerSide
  */
  getAdInsertionType: function () {
    return null
  },

  /**
 * Emits related event and set flags if current status is valid.
 * ie: won't sent start if isStarted is already true.
 *
 * @param {Object} [params] Object of key:value params to add to the request.
 */
  fireClick: function (params) {
    if (typeof params === 'string') {
      params = { url: params }
    }
    this.emit(AdapterConstants.Event.CLICK, { params: params })
  },

  /**
   * Emits related event and set flags if current status is valid.
   * ie: won't sent start if isStarted is already true.
   *
   * @param {Object} [params] Object of key:value params to add to the request.
   */
  fireQuartile: function (quartile) {
    if (this.flags.isStarted && typeof quartile === 'number' &&
      quartile > this.flags.lastQuartileSent && quartile < 4) {
      this.flags.lastQuartileSent++
      this.emit(AdapterConstants.Event.QUARTILE, { params: { quartile: quartile } })
    }
  },

  /**
  * Starts a new chrono for viewedMax and restarts viewedAcum
  */
  startChronoView: function () {
    if (this.getIsVisible() && !this.plugin.backgroundDetector.isInBackground) {
      var max = this.chronos.viewedMax
      if (max.length === 0 || max[max.length - 1].stopTime !== 0) {
        max.push(new Chrono())
        max[max.length - 1].start()
      }
    }
  },

  /**
  * Stops a new chrono for viewedMax and restarts viewedAcum
  */
  stopChronoView: function () {
    var max = this.chronos.viewedMax
    if (max[0] && max.length > 0 && max[max.length - 1].stopTime === 0) {
      max[max.length - 1].stop()
    }
  },

  /**
  * @param {Object} [params] Object of key:value params to add to the request.
  */
  fireManifest: function (params, message) {
    var paramsObject = { params: params }
    if (typeof params === 'string') {
      paramsObject = { params: { errorType: params, errorMessage: message } }
    }
    this.emit(AdapterConstants.Event.MANIFEST, paramsObject)
  },

  /*
  * Emits related event and set flags if current status is valid.
  * ie: won't sent start if isStarted is already true.
  *
  * @param {Object} [params] Object of key:value params to add to the request.
  */
  fireSkip: function (params) {
    if (params === undefined) {
      params = {}
    }
    params.skipped = true
    this.fireStop(params)
  },

  /**
  * Emits related event and set flags if current status is valid.
  * ie: won't sent start if isStarted is already true.
  *
  * @param {Object} [params] Object of key:value params to add to the request.
  */
  fireBreakStart: function (params) {
    this.emit(AdapterConstants.Event.PODSTART, { params: params })
  },

  /**
  * Emits related event and set flags if current status is valid.
  * ie: won't sent start if isStarted is already true.
  *
  * @param {Object} [params] Object of key:value params to add to the request.
  */
  fireBreakStop: function (params) {
    this.emit(AdapterConstants.Event.PODSTOP, { params: params })
  }
}

module.exports = AdapterAdsMixin


/***/ }),
/* 406 */
/***/ (function(module, exports, __webpack_require__) {

var AdapterConstants = __webpack_require__(75)
var Log = __webpack_require__(8)

var AdapterContentMixin = {
  /** Override to return current playrate */
  getPlayrate: function () {
    return !this.flags.isPaused ? 1 : 0
  },

  /** Override to return Frames Per Secon (FPS) */
  getFramesPerSecond: function () {
    return null
  },

  /** Override to return dropped frames since start */
  getDroppedFrames: function () {
    return null
  },

  /** Override to return user bandwidth throughput */
  getThroughput: function () {
    return null
  },

  /** Override to return rendition */
  getRendition: function () {
    return null
  },

  /** Override to return title2 */
  getTitle2: function () {
    return null
  },

  /** Override to recurn true if live and false if VOD */
  getIsLive: function () {
    return null
  },

  /** Override to return CDN traffic bytes not using streamroot or peer5. */
  getCdnTraffic: function () {
    return null
  },

  /** Override to return P2P traffic bytes not using streamroot or peer5. */
  getP2PTraffic: function () {
    return null
  },

  /** Override to return P2P traffic sent in bytes, not using streamroot or peer5. */
  getUploadTraffic: function () {
    return null
  },

  /** Override to return if P2P is enabled not using streamroot or peer5. */
  getIsP2PEnabled: function () {
    return null
  },

  /** Override to return video segment duration. */
  getSegmentDuration: function () {
    return null
  },

  /** Override to return household id */
  getHouseholdId: function () {
    return null
  },

  /** Override to return the latency */
  getLatency: function () {
    return null
  },

  /** Override to return the number of packets lost */
  getPacketLoss: function () {
    return null
  },

  /** Override to return the number of packets sent */
  getPacketSent: function () {
    return null
  },

  /** Override to return a json with metrics */
  getMetrics: function () {
    return null
  },

  /** Override to return the audio codec */
  getAudioCodec: function () {
    return null
  },

  /** Override to return the video codec */
  getVideoCodec: function () {
    return null
  },

  /** Override to return a chunk or intermediate manifest url */
  getURLToParse: function () {
    return null
  },

  /**
 * Emits related event and set flags if current status is valid.
 * ie: won't sent start if isStarted is already true.
 *
 * @param {Object} [params] Object of key:value params to add to the request.
 * @param {bool} [convertFromBuffer=true] If false, will convert current buffer to seek.
 */
  fireSeekBegin: function (params, convertFromBuffer) {
    if (this.plugin && this.plugin.getIsLive() && this.plugin.options['content.isLive.noSeek']) return null
    if (this.flags.isJoined && !this.flags.isSeeking) {
      if (this.flags.isBuffering) {
        if (convertFromBuffer !== false) {
          Log.notice('Converting current buffer to seek')

          this.chronos.seek = this.chronos.buffer.clone()
          this.chronos.buffer.reset()

          this.flags.isBuffering = false
        } else {
          return
        }
      } else {
        this.chronos.seek.start()
      }

      this.flags.isSeeking = true
      this.emit(AdapterConstants.Event.SEEK_BEGIN, { params: params })
    }
  },

  /**
   * Emits related event and set flags if current status is valid.
   * ie: won't sent start if isStarted is already true.
   *
   * @param {Object} [params] Object of key:value params to add to the request.
   */
  fireSeekEnd: function (params) {
    if (this.plugin && this.plugin.getIsLive() && this.plugin.options['content.isLive.noSeek']) return null
    if (this.flags.isJoined && this.flags.isSeeking) {
      this.cancelSeek()
      this.emit(AdapterConstants.Event.SEEK_END, { params: params })
    }
  },

  /**
   *
   * @param {Object} [params] Object of key:value params to add to the request.
   */
  cancelSeek: function (params) {
    if (this.flags.isJoined && this.flags.isSeeking) {
      this.flags.isSeeking = false

      this.chronos.seek.stop()

      if (this.monitor) this.monitor.skipNextTick()
    }
  },

  /**
 * Emits event request.
 *
 * @param {Object} [params] Object of key:value params to add to the request.
 */
  fireEvent: function (eventName, dimensions, values, topLevelDimensions) {
    var returnparams = topLevelDimensions || {}
    returnparams.name = eventName || ''
    returnparams.dimensions = dimensions || {}
    returnparams.values = values || {}
    this.emit(AdapterConstants.Event.VIDEO_EVENT, { params: returnparams })
  }
}

module.exports = AdapterContentMixin


/***/ }),
/* 407 */
/***/ (function(module, exports, __webpack_require__) {

var Util = __webpack_require__(13)

var version = __webpack_require__(74)

// This file is designed to add extra functionalities to Plugin class

var PluginGetterMixin = {
  /**
     * Returns service host
     *
     * @memberof youbora.Plugin.prototype
     */
  getHost: function () {
    var host = this.options.host
    if (this.viewTransform && this.viewTransform.response && this.viewTransform.response.host) {
      host = this.viewTransform.response.host
    }
    return Util.addProtocol(Util.stripProtocol(host), this.options['app.https'])
  },

  getUserType: function () {
    return this.options['user.type']
  },

  /**
     * Returns parse Manifest Flag
     *
     * @memberof youbora.Plugin.prototype
     */
  isParseManifest: function () {
    return this.options['parse.manifest']
  },

  /**
     * Returns parse CdnNode Flag
     *
     * @memberof youbora.Plugin.prototype
     */
  isParseCdnNode: function () {
    return this.options['parse.cdnNode']
  },

  /**
     * Returns parse cdn switch Flag
     *
     * @memberof youbora.Plugin.prototype
     */
  isCdnSwitch: function () {
    return this.options['parse.cdnSwitchHeader']
  },

  /**
     * Returns Cdn list
     *
     * @memberof youbora.Plugin.prototype
     */
  getParseCdnNodeList: function () {
    return this.options['parse.cdnNode.list']
  },

  /**
     * Returns Cdn header name
     *
     * @memberof youbora.Plugin.prototype
     */
  getParseCdnNodeNameHeader: function () {
    return this.options['parse.cdnNameHeader']
  },

  /**
   * Returns header node name
   *
   * @memberof youbora.Plugin.prototype
   */
  getParseNodeHeader: function () {
    return this.options['parse.cdnNodeHeader']
  },

  /**
     * Returns obfuscateIp option
     *
     * @memberof youbora.Plugin.prototype
     */
  getObfuscateIp: function () {
    return this.options['user.obfuscateIp']
  },

  /**
   * Returns privacy protocol option
   *
   * @memberof youbora.Plugin.prototype
   */
  getPrivacyProtocol: function () {
    var ret = this.options['user.privacyProtocol']
    if (typeof ret === 'string') {
      ret = ret.toLowerCase()
    }
    return ret === 'optin' || ret === 'optout' ? ret : null
  },

  /**
   * Returns content's custom dimensions
   *
   * @memberof youbora.Plugin.prototype
   */
  getCustomDimensions: function () {
    var dim = this.options['content.customDimensions']
    return typeof dim === 'object' ? dim : null
  },

  /**
     * Returns content's Extraparam1
     *
     * @memberof youbora.Plugin.prototype
     */
  getExtraparam1: function () {
    return this.options['content.customDimension.1']
  },

  /**
     * Returns content's Extraparam2
     *
     * @memberof youbora.Plugin.prototype
     */
  getExtraparam2: function () {
    return this.options['content.customDimension.2']
  },

  /**
     * Returns content's Extraparam3
     *
     * @memberof youbora.Plugin.prototype
     */
  getExtraparam3: function () {
    return this.options['content.customDimension.3']
  },

  /**
     * Returns content's Extraparam4
     *
     * @memberof youbora.Plugin.prototype
     */
  getExtraparam4: function () {
    return this.options['content.customDimension.4']
  },
  /**
     * Returns content's Extraparam5
     *
     * @memberof youbora.Plugin.prototype
     */
  getExtraparam5: function () {
    return this.options['content.customDimension.5']
  },

  /**
     * Returns content's Extraparam6
     *
     * @memberof youbora.Plugin.prototype
     */
  getExtraparam6: function () {
    return this.options['content.customDimension.6']
  },

  /**
     * Returns content's Extraparam7
     *
     * @memberof youbora.Plugin.prototype
     */
  getExtraparam7: function () {
    return this.options['content.customDimension.7']
  },

  /**
     * Returns content's Extraparam8
     *
     * @memberof youbora.Plugin.prototype
     */
  getExtraparam8: function () {
    return this.options['content.customDimension.8']
  },

  /**
     * Returns content's Extraparam9
     *
     * @memberof youbora.Plugin.prototype
     */
  getExtraparam9: function () {
    return this.options['content.customDimension.9']
  },

  /**
     * Returns content's Extraparam10
     *
     * @memberof youbora.Plugin.prototype
     */
  getExtraparam10: function () {
    return this.options['content.customDimension.10']
  },

  /**
     * Returns content's Extraparam11
     *
     * @memberof youbora.Plugin.prototype
     */
  getExtraparam11: function () {
    return this.options['content.customDimension.11']
  },

  /**
     * Returns content's Extraparam12
     *
     * @memberof youbora.Plugin.prototype
     */
  getExtraparam12: function () {
    return this.options['content.customDimension.12']
  },

  /**
     * Returns content's Extraparam13
     *
     * @memberof youbora.Plugin.prototype
     */
  getExtraparam13: function () {
    return this.options['content.customDimension.13']
  },

  /**
     * Returns content's Extraparam14
     *
     * @memberof youbora.Plugin.prototype
     */
  getExtraparam14: function () {
    return this.options['content.customDimension.14']
  },
  /**
     * Returns content's Extraparam15
     *
     * @memberof youbora.Plugin.prototype
     */
  getExtraparam15: function () {
    return this.options['content.customDimension.15']
  },

  /**
     * Returns content's Extraparam16
     *
     * @memberof youbora.Plugin.prototype
     */
  getExtraparam16: function () {
    return this.options['content.customDimension.16']
  },

  /**
     * Returns content's Extraparam17
     *
     * @memberof youbora.Plugin.prototype
     */
  getExtraparam17: function () {
    return this.options['content.customDimension.17']
  },

  /**
     * Returns content's Extraparam18
     *
     * @memberof youbora.Plugin.prototype
     */
  getExtraparam18: function () {
    return this.options['content.customDimension.18']
  },

  /**
     * Returns content's Extraparam19
     *
     * @memberof youbora.Plugin.prototype
     */
  getExtraparam19: function () {
    return this.options['content.customDimension.19']
  },

  /**
     * Returns content's Extraparam20
     *
     * @memberof youbora.Plugin.prototype
     */
  getExtraparam20: function () {
    return this.options['content.customDimension.20']
  },

  /**
     * Returns ad's Extraparam1
     *
     * @memberof youbora.Plugin.prototype
     */
  getAdExtraparam1: function () {
    return this.options['ad.customDimension.1']
  },

  /**
     * Returns ad's Extraparam2
     *
     * @memberof youbora.Plugin.prototype
     */
  getAdExtraparam2: function () {
    return this.options['ad.customDimension.2']
  },

  /**
     * Returns ad's Extraparam3
     *
     * @memberof youbora.Plugin.prototype
     */
  getAdExtraparam3: function () {
    return this.options['ad.customDimension.3']
  },

  /**
     * Returns ad's Extraparam4
     *
     * @memberof youbora.Plugin.prototype
     */
  getAdExtraparam4: function () {
    return this.options['ad.customDimension.4']
  },
  /**
     * Returns ad's Extraparam5
     *
     * @memberof youbora.Plugin.prototype
     */
  getAdExtraparam5: function () {
    return this.options['ad.customDimension.5']
  },

  /**
     * Returns ad's Extraparam6
     *
     * @memberof youbora.Plugin.prototype
     */
  getAdExtraparam6: function () {
    return this.options['ad.customDimension.6']
  },

  /**
     * Returns ad's Extraparam7
     *
     * @memberof youbora.Plugin.prototype
     */
  getAdExtraparam7: function () {
    return this.options['ad.customDimension.7']
  },

  /**
     * Returns ad's Extraparam8
     *
     * @memberof youbora.Plugin.prototype
     */
  getAdExtraparam8: function () {
    return this.options['ad.customDimension.8']
  },

  /**
     * Returns ad's Extraparam9
     *
     * @memberof youbora.Plugin.prototype
     */
  getAdExtraparam9: function () {
    return this.options['ad.customDimension.9']
  },

  /**
     * Returns ad's Extraparam10
     *
     * @memberof youbora.Plugin.prototype
     */
  getAdExtraparam10: function () {
    return this.options['ad.customDimension.10']
  },

  /**
     * Returns PluginInfo
     *
     * @memberof youbora.Plugin.prototype
     */
  getPluginInfo: function () {
    var ret = {
      lib: version,
      adapter: this.getAdapterVersion(),
      adAdapter: this.getAdAdapterVersion()
    }
    return ret
  },

  /**
     * Returns Ip
     *
     * @memberof youbora.Plugin.prototype
     */
  getIp: function () {
    return this.options['network.ip']
  },

  /**
     * Returns Isp
     *
     * @memberof youbora.Plugin.prototype
     */
  getIsp: function () {
    return this.options['network.isp']
  },

  /**
     * Returns ConnectionType
     *
     * @memberof youbora.Plugin.prototype
     */
  getConnectionType: function () {
    return this.options['network.connectionType']
  },

  /** Returns deviceInfo json
     *
     * @memberof youbora.Plugin.prototype
     */
  getDeviceInfo: function () {
    var info = {}
    if (this.getDeviceCode()) info.deviceCode = this.getDeviceCode()
    if (this.getModel()) info.model = this.getModel()
    if (this.getBrand()) info.brand = this.getBrand()
    if (this.getDeviceType()) info.deviceType = this.getDeviceType()
    if (this.getDeviceName()) info.deviceName = this.getDeviceName()
    if (this.getOsName()) info.osName = this.getOsName()
    if (this.getOsVersion()) info.osVersion = this.getOsVersion()
    if (this.getBrowserName()) info.browserName = this.getBrowserName()
    if (this.getBrowserVersion()) info.browserVersion = this.getBrowserVersion()
    if (this.getBrowserType()) info.browserType = this.getBrowserType()
    if (this.getBrowserEngine()) info.browserEngine = this.getBrowserEngine()
    return (info !== {} ? info : null)
  },

  /** Returns EDID object
   *
   * @memberof youbora.Plugin.prototype
   */
  getEDID: function () {
    var edid = this.options['device.EDID']
    return edid ? edid.toString() : null
  },

  /**
     * Returns DeviceCode
     *
     * @memberof youbora.Plugin.prototype
     */
  getDeviceCode: function () {
    return this.options['device.code']
  },

  /**
     * Returns Device model
     *
     * @memberof youbora.Plugin.prototype
     */
  getModel: function () {
    return this.options['device.model']
  },

  /**
     * Returns Device brand
     *
     * @memberof youbora.Plugin.prototype
     */
  getBrand: function () {
    return this.options['device.brand']
  },

  /**
     * Returns Device type
     *
     * @memberof youbora.Plugin.prototype
     */
  getDeviceType: function () {
    return this.options['device.type']
  },

  /**
     * Returns Device name
     *
     * @memberof youbora.Plugin.prototype
     */
  getDeviceName: function () {
    return this.options['device.name']
  },

  /**
     * Returns Device OS name
     *
     * @memberof youbora.Plugin.prototype
     */
  getOsName: function () {
    return this.options['device.osName']
  },

  /**
     * Returns Device OS Version
     *
     * @memberof youbora.Plugin.prototype
     */
  getOsVersion: function () {
    return this.options['device.osVersion']
  },

  /**
     * Returns Device browser name
     *
     * @memberof youbora.Plugin.prototype
     */
  getBrowserName: function () {
    return this.options['device.browserName']
  },

  /**
     * Returns Device browser version
     *
     * @memberof youbora.Plugin.prototype
     */
  getBrowserVersion: function () {
    return this.options['device.browserVersion']
  },

  /**
     * Returns Device browser type
     *
     * @memberof youbora.Plugin.prototype
     */
  getBrowserType: function () {
    return this.options['device.browserType']
  },

  /**
     * Returns DeviceCode
     *
     * @memberof youbora.Plugin.prototype
     */
  getBrowserEngine: function () {
    return this.options['device.browserEngine']
  },

  /**
     * Returns AccountCode
     *
     * @memberof youbora.Plugin.prototype
     */
  getAccountCode: function () {
    return this.options.accountCode
  },

  /**
     * Returns Username
     *
     * @memberof youbora.Plugin.prototype
     */
  getUsername: function () {
    return this.options['user.name']
  },

  /**
     * Returns AnonymousUser
     *
     * @memberof youbora.Plugin.prototype
     */
  getAnonymousUser: function () {
    return this.options['user.anonymousId']
  },

  /**
     * Returns user email
     *
     * @memberof youbora.Plugin.prototype
     */
  getEmail: function () {
    return this.options['user.email']
  },

  /**
     * Get URL referer.
     *
     * @memberof youbora.Plugin.prototype
     */
  getReferer: function () {
    var ret = this.options.referer || ''
    if (!ret && typeof window !== 'undefined' && window.location) {
      ret = window.location.href
    }
    return ret
  },

  /**
     * Get URL referral.
     * Previous page url.
     * @memberof youbora.Plugin.prototype
     */
  getReferral: function () {
    var ret = this.options.referral || ''
    if (!ret && typeof document !== 'undefined') {
      ret = document.referrer
    }
    return ret
  },

  /**
     * Get Browser language
     *
     * @memberof youbora.Plugin.prototype
     */
  getLanguage: function () {
    var ret = null
    if (typeof navigator !== 'undefined') {
      ret = navigator.language
    }
    return ret
  },

  /**
     * Returns the nodehost
     *
     * @memberof youbora.Plugin.prototype
     */
  getNodeHost: function () {
    return this.options['content.cdnNode'] || this.resourceTransform.getNodeHost()
  },

  /**
     * Returns the node type id
     *
     * @memberof youbora.Plugin.prototype
     */
  getNodeType: function () {
    return this.options['content.cdnType'] || this.resourceTransform.getNodeType()
  },

  /**
     * Returns the node type string
     *
     * @memberof youbora.Plugin.prototype
     */
  getNodeTypeString: function () {
    return this.resourceTransform.getNodeTypeString()
  },

  /**
     * Returns requestNumber value, to prevent /data calls being cached
     *
     * @memberof youbora.Plugin.prototype
     */
  getRequestNumber: function () {
    return Math.random()
  },

  /**
     * Returns a whole offline view and its id.
     *
     * @memberof youbora.Plugin.prototype
     */
  getOfflineView: function () {
    var ret = null
    if (this.offlineStorage) {
      ret = this.offlineStorage.getView()
    }
    return ret
  },

  getDeviceUUID: function () {
    var id = null
    if (!this.options['device.isAnonymous']) {
      id = this.options['device.id'] || this.uuidGenerator.getKey()
    }
    return id
  },

  getSmartswitchConfigCode: function () {
    return this.options['smartswitch.configCode']
  },

  getSmartswitchGroupCode: function () {
    return this.options['smartswitch.groupCode']
  },

  getSmartswitchContractCode: function () {
    return this.options['smartswitch.contractCode']
  },

  getAppName: function () {
    return this.options['app.name']
  },

  getAppReleaseVersion: function () {
    return this.options['app.releaseVersion']
  },

  getIsBlocked: function () {
    return this.options['ad.blockerDetected']
  }
}

module.exports = PluginGetterMixin


/***/ }),
/* 408 */
/***/ (function(module, exports, __webpack_require__) {

var Log = __webpack_require__(8)
var Util = __webpack_require__(13)
var version = __webpack_require__(74)
var TransportFormat = __webpack_require__(77)
var StreamingProtocol = __webpack_require__(159)

// This file is designed to add extra functionalities to Plugin class

var PluginContentGetterMixin = {
  /**
       * Returns content's playhead
       *
       * @memberof youbora.Plugin.prototype
       */
  getPlayhead: function () {
    var ret = this._safeGetterAdapter('getPlayhead')
    return Util.parseNumber(ret, 0)
  },

  /**
       * Returns content's PlayRate
       *
       * @memberof youbora.Plugin.prototype
       */
  getPlayrate: function () {
    var ret = 0
    if (this._adapter && this._adapter.flags && !this._adapter.flags.isPaused) {
      try {
        ret = this._adapter.getPlayrate()
      } catch (err) {
        Log.warn('An error occured while calling getPlayrate', err)
      }
    }
    return ret
  },

  /**
       * Returns content's FramesPerSecond
       *
       * @memberof youbora.Plugin.prototype
       */
  getFramesPerSecond: function () {
    return this._safeGetterAdapter('getFramesPerSecond', 'content.fps')
  },

  /**
   * Returns content's segment duration
   *
   * @memberof youbora.Plugin.prototype
   */
  getSegmentDuration: function () {
    return this.hybridNetwork.getSegmentDuration() || this._safeGetterAdapter('getSegmentDuration', 'content.segmentDuration')
  },

  /**
       * Returns content's DroppedFrames
       *
       * @memberof youbora.Plugin.prototype
       */
  getDroppedFrames: function () {
    var ret = this._safeGetterAdapter('getDroppedFrames')
    if (!ret) {
      ret = this.getWebkitDroppedFrames()
    }
    return Util.parseNumber(ret, 0)
  },

  /**
       * Returns dropped frames as per webkitDroppedFrameCount
       *
       * @returns {number}
       *
       * @memberof youbora.Plugin.prototype
       */
  getWebkitDroppedFrames: function () {
    if (this._adapter && this._adapter.tag && this._adapter.tag.webkitDroppedFrameCount) {
      return this._adapter.tag.webkitDroppedFrameCount
    }
    return null
  },

  /**
       * Returns content's Duration
       *
       * @memberof youbora.Plugin.prototype
       */
  getDuration: function () {
    var ret = this._safeGetterAdapter('getDuration', 'content.duration') || null
    return Util.parseNumber(Math.round(ret), null)
  },

  /**
       * Returns content's Bitrate
       *
       * @memberof youbora.Plugin.prototype
       */
  getBitrate: function () {
    var ret = this._safeGetterAdapter('getBitrate', 'content.bitrate')
    if (!ret || ret === -1) {
      ret = this.getWebkitBitrate()
    }
    return Util.parseNumber(ret, -1)
  },

  /**
       * Returns content's total bytes downloaded
       *
       * @memberof youbora.Plugin.prototype
       */
  getTotalBytes: function () {
    return this.options['content.sendTotalBytes'] ? this._safeGetterAdapter('getTotalBytes', 'content.totalBytes') : null
  },

  /**
       * Returns bitrate as per webkitVideoDecodedByteCount
       *
       * @param {Object} tag Video tag DOM reference.
       * @returns {number}
       *
       * @memberof youbora.Plugin.prototype
       */
  getWebkitBitrate: function () {
    if (this._adapter && this._adapter.tag && this._adapter.tag.webkitVideoDecodedByteCount) {
      var bitrate = this._adapter.tag.webkitVideoDecodedByteCount
      if (this._lastWebkitBitrate) {
        var delta = this._adapter.tag.webkitVideoDecodedByteCount - this._lastWebkitBitrate
        bitrate = Math.round(((delta) / this.viewTransform.response.pingTime) * 8)
      }
      this._lastWebkitBitrate = this._adapter.tag.webkitVideoDecodedByteCount
      return bitrate !== 0 ? bitrate : -1
    }
  },

  /**
       * Returns content's Throughput
       *
       * @memberof youbora.Plugin.prototype
       */
  getThroughput: function () {
    var ret = this._safeGetterAdapter('getThroughput', 'content.throughput')
    return Util.parseNumber(ret, -1)
  },

  /**
       * Returns content's Rendition
       *
       * @memberof youbora.Plugin.prototype
       */
  getRendition: function () {
    return this._safeGetterAdapter('getRendition', 'content.rendition')
  },

  /**
       * Returns content's Title
       *
       * @memberof youbora.Plugin.prototype
       */
  getTitle: function () {
    return this._safeGetterAdapter('getTitle', 'content.title')
  },

  /**
       * Returns content's Title2
       *
       * @memberof youbora.Plugin.prototype
       */
  getTitle2: function () {
    return this._safeGetterAdapter('getTitle2', 'content.program')
  },

  /**
       * Returns content's IsLive
       *
       * @memberof youbora.Plugin.prototype
       */
  getIsLive: function () {
    var ret = this.options['content.isLive']
    if (!ret && ret !== false) {
      ret = this._safeGetterAdapter('getIsLive') || false
    }
    return ret
  },

  /**
       * Returns content's Resource after being parsed by the resourceTransform
       *
       * @memberof youbora.Plugin.prototype
       */
  getResource: function () {
    return this._safeGetterAdapter('getResource', 'content.resource')
  },

  getParsedResource: function () {
    var ret = null
    if (!this.resourceTransform.isBlocking()) {
      ret = this.resourceTransform.getResource()
    }
    ret = ret || this._safeGetterAdapter('getURLToParse')
    return (ret === this.getResource()) ? null : ret
  },

  /**
       * Returns content's TransactionCode
       *
       * @memberof youbora.Plugin.prototype
       */
  getTransactionCode: function () {
    return this.options['content.transactionCode']
  },

  /**
       * Returns content's Metadata
       *
       * @memberof youbora.Plugin.prototype
       */
  getMetadata: function () {
    return this.options['content.metadata']
  },

  /**
       * Returns content's PlayerVersion
       *
       * @memberof youbora.Plugin.prototype
       */
  getPlayerVersion: function () {
    return this._safeGetterAdapter('getPlayerVersion') || ''
  },

  /**
       * Returns content's PlayerName
       *
       * @memberof youbora.Plugin.prototype
       */
  getPlayerName: function () {
    return this._safeGetterAdapter('getPlayerName') || ''
  },

  /**
       * Returns content's Cdn
       *
       * @memberof youbora.Plugin.prototype
       */
  getCdn: function () {
    var ret = null
    if (!this.resourceTransform.isBlocking()) {
      ret = this.resourceTransform.getCdnName()
    }
    return ret || this.options['content.cdn']
  },

  /**
       * Returns content's PluginVersion
       *
       * @memberof youbora.Plugin.prototype
       */
  getPluginVersion: function () {
    var ret = this.getAdapterVersion()
    if (!ret) ret = version + '-adapterless-js'

    return ret
  },

  /**
       * Returns content's PluginVersion
       *
       * @memberof youbora.Plugin.prototype
       */
  getLibVersion: function () {
    return version
  },

  /**
       * Returns ads adapter getVersion or null
       *
       * @memberof youbora.Plugin.prototype
       */
  getAdapterVersion: function () {
    return this._safeGetterAdapter('getVersion')
  },

  /**
       * Returns cdn traffic received in bytes or null
       *
       * @memberof youbora.Plugin.prototype
       */
  getCdnTraffic: function () {
    return this._safeGetterAdapter('getCdnTraffic') || this.hybridNetwork.getCdnTraffic()
  },

  /**
   * Returns multi cdn traffic received in bytes or null
   *
   * @memberof youbora.Plugin.prototype
   */
  getMultiCdnInfo: function () {
    return this.hybridNetwork.getMultiCdnInfo()
  },

  /**
   * Returns cdn balancer response id
   *
   * @memberof youbora.Plugin.prototype
   */
  getBalancerResponseId: function () {
    return this.hybridNetwork.getBalancerResponseId()
  },

  /**
       * Returns p2p traffic received in bytes or null
       *
       * @memberof youbora.Plugin.prototype
       */
  getP2PTraffic: function () {
    return this._safeGetterAdapter('getP2PTraffic') || this.hybridNetwork.getP2PTraffic()
  },

  /**
       * Returns p2p traffic sent in bytes or null
       *
       * @memberof youbora.Plugin.prototype
       */
  getUploadTraffic: function () {
    return this._safeGetterAdapter('getUploadTraffic') || this.hybridNetwork.getUploadTraffic()
  },

  /**
       * Returns if p2p plugin is enabled or null
       *
       * @memberof youbora.Plugin.prototype
       */
  getIsP2PEnabled: function () {
    return this._safeGetterAdapter('getIsP2PEnabled') || this.hybridNetwork.getIsP2PEnabled()
  },

  /** Returns streaming protocol (DASH, HLS, HDS...) */
  getStreamingProtocol: function () {
    var ret = this.options['content.streamingProtocol']
    // if ret is not in the list of possible options, ret = null
    if (ret) {
      for (var i in StreamingProtocol) {
        if (StreamingProtocol[i] === ret) {
          return ret
        }
      }
    }
    return null
  },

  /** Returns transport format (TS, MP4) */
  getTransportFormat: function () {
    var ret = this.options['content.transportFormat']
    if (!ret && this.options['parse.manifest'] && !this.resourceTransform.isBlocking()) {
      ret = this.resourceTransform.getTransportFormat()
    }
    // if ret is not in the list of possible options, ret = null
    if (ret) {
      for (var i in TransportFormat) {
        if (TransportFormat[i] === ret) {
          return ret
        }
      }
    }
    return null
  },

  /** Returns household id */
  getHouseholdId: function () {
    return this._safeGetterAdapter('getHouseholdId')
  },

  /**
       * Returns latency of a live video, or null
       *
       * @memberof youbora.Plugin.prototype
       */
  getLatency: function () {
    return this.getIsLive() ? this._safeGetterAdapter('getLatency') : null
  },

  /**
       * Returns the amount of packets lost, or null
       *
       * @memberof youbora.Plugin.prototype
       */
  getPacketLoss: function () {
    return this._safeGetterAdapter('getPacketLoss')
  },

  /**
       * Returns the amount of packets sent, or null
       *
       * @memberof youbora.Plugin.prototype
       */
  getPacketSent: function () {
    return this._safeGetterAdapter('getPacketSent')
  },

  /**
       * Returns a json with the metrics to be reported in pings when changed
       *
       * @memberof youbora.Plugin.prototype
       */
  getVideoMetrics: function () {
    return Util.getMetricsFrom(this._adapter ? this._adapter.getMetrics() : null, this.options['content.metrics'])
  },

  getPlayerStartupTime: function () {
    return this.browserLoadTimes.getPlayerStartupTime()
  },

  // ----------------------------------------- CHRONOS ------------------------------------------

  /**
       * Returns JoinDuration chrono delta time
       *
       * @memberof youbora.Plugin.prototype
       */
  getJoinDuration: function () {
    return this._adapter ? this._adapter.chronos.join.getDeltaTime(false) : -1
  },

  /**
       * Returns BufferDuration chrono delta time
       *
       * @memberof youbora.Plugin.prototype
       */
  getBufferDuration: function () {
    return this._adapter ? this._adapter.chronos.buffer.getDeltaTime(false) : -1
  },

  /**
       * Returns SeekDuration chrono delta time
       *
       * @memberof youbora.Plugin.prototype
       */
  getSeekDuration: function () {
    return this._adapter ? this._adapter.chronos.seek.getDeltaTime(false) : -1
  },

  /**
       * Returns pauseDuration chrono delta time
       *
       * @memberof youbora.Plugin.prototype
       */
  getPauseDuration: function () {
    return this._adapter ? this._adapter.chronos.pause.getDeltaTime(false) : 0
  },

  /**
       * Returns content's package
       *
       * @memberof youbora.Plugin.prototype
       */
  getPackage: function () {
    return this.options['content.package']
  },

  /**
       * Returns content's saga
       *
       * @memberof youbora.Plugin.prototype
       */
  getSaga: function () {
    return this.options['content.saga']
  },

  /**
       * Returns content's tv show
       *
       * @memberof youbora.Plugin.prototype
       */
  getTvShow: function () {
    return this.options['content.tvShow']
  },

  /**
       * Returns content's season
       *
       * @memberof youbora.Plugin.prototype
       */
  getSeason: function () {
    return this.options['content.season']
  },

  /**
       * Returns content's episode title
       *
       * @memberof youbora.Plugin.prototype
       */
  getEpisodeTitle: function () {
    return this.options['content.episodeTitle']
  },

  /**
       * Returns content's channel
       *
       * @memberof youbora.Plugin.prototype
       */
  getChannel: function () {
    return this.options['content.channel']
  },

  /**
       * Returns content's id
       *
       * @memberof youbora.Plugin.prototype
       */
  getID: function () {
    return this.options['content.id']
  },

  /**
       * Returns content's IMDB id
       *
       * @memberof youbora.Plugin.prototype
       */
  getImdbId: function () {
    return this.options['content.imdbId']
  },

  /**
       * Returns content's gracenote id
       *
       * @memberof youbora.Plugin.prototype
       */
  getGracenoteID: function () {
    return this.options['content.gracenoteId']
  },

  /**
       * Returns content's type
       *
       * @memberof youbora.Plugin.prototype
       */
  getType: function () {
    return this.options['content.type']
  },

  /**
       * Returns content's genre
       *
       * @memberof youbora.Plugin.prototype
       */
  getGenre: function () {
    return this.options['content.genre']
  },

  /**
       * Returns content's language
       *
       * @memberof youbora.Plugin.prototype
       */
  getVideoLanguage: function () {
    return this.options['content.language']
  },

  /**
       * Returns content's subtitles
       *
       * @memberof youbora.Plugin.prototype
       */
  getSubtitles: function () {
    return this.options['content.subtitles']
  },

  /**
       * Returns content's contracted resolution
       *
       * @memberof youbora.Plugin.prototype
       */
  getContractedResolution: function () {
    return this.options['content.contractedResolution']
  },

  /**
       * Returns content's cost
       *
       * @memberof youbora.Plugin.prototype
       */
  getCost: function () {
    return this.options['content.cost']
  },

  /**
       * Returns content's price
       *
       * @memberof youbora.Plugin.prototype
       */
  getPrice: function () {
    return this.options['content.price']
  },

  /**
       * Returns content's playback type
       *
       * @memberof youbora.Plugin.prototype
       */
  getPlaybackType: function () {
    var ret = this.options['content.playbackType']
    if (!ret) {
      var isLive = this.options['content.isLive']
      if (typeof isLive !== 'boolean') {
        isLive = this._safeGetterAdapter('getIsLive')
      }
      if (typeof isLive === 'boolean') {
        ret = isLive ? 'Live' : 'VoD'
      }
    }
    return ret
  },

  /**
       * Returns content's DRM
       *
       * @memberof youbora.Plugin.prototype
       */
  getDRM: function () {
    return this.options['content.drm']
  },

  /**
       * Returns content's video codec
       *
       * @memberof youbora.Plugin.prototype
       */
  getVideoCodec: function () {
    return this._safeGetterAdapter('getVideoCodec', 'content.encoding.videoCodec')
  },

  /**
       * Returns content's audio codec
       *
       * @memberof youbora.Plugin.prototype
       */
  getAudioCodec: function () {
    return this._safeGetterAdapter('getAudioCodec', 'content.encoding.audioCodec')
  },

  /**
       * Returns content's codec settings
       *
       * @memberof youbora.Plugin.prototype
       */
  getCodecSettings: function () {
    return this.options['content.encoding.codecSettings']
  },

  /**
       * Returns content's codec profile
       *
       * @memberof youbora.Plugin.prototype
       */
  getCodecProfile: function () {
    return this.options['content.encoding.codecProfile']
  },

  /**
       * Returns content's container format
       *
       * @memberof youbora.Plugin.prototype
       */
  getContainerFormat: function () {
    return this.options['content.encoding.containerFormat']
  },

  /**
     * Returns linked view id string
     *
     * @memberof youbora.Plugin.prototype
     */
  getLinkedViewId: function () {
    return this.options.linkedViewId
  },

  _safeGetterAdapter: function (functionName, optionName) {
    var ret = null
    if (optionName && this.options[optionName]) {
      ret = this.options[optionName]
    } else {
      try {
        if (this._adapter && typeof this._adapter[functionName] === 'function') {
          ret = this._adapter[functionName]()
        }
      } catch (err) {
        Log.warn('An error occured while calling ' + functionName, err)
      }
    }
    return ret
  }
}

module.exports = PluginContentGetterMixin


/***/ }),
/* 409 */
/***/ (function(module, exports, __webpack_require__) {

var Log = __webpack_require__(8)
var Constants = __webpack_require__(26)
var Adapter = __webpack_require__(111)
var Util = __webpack_require__(13)

// This file is designed to add extra functionalities to Plugin class

var PluginAdsMixin = {
  /**
     * Returns current adapter or null.
     *
     * @returns {Adapter}
     *
     * @memberof youbora.Plugin.prototype
     */
  getAdsAdapter: function () {
    return this._adsAdapter
  },

  /**
     * Sets an adapter for ads.
     *
     * @param {Adapter} adsAdapter
     *
     * @memberof youbora.Plugin.prototype
     */
  setAdsAdapter: function (adsAdapter) {
    if (adsAdapter.plugin) {
      Log.warn('Adapters can only be added to a single plugin')
    } else {
      this.removeAdsAdapter()
      adsAdapter.plugin = this
      this._adsAdapter = adsAdapter
      adsAdapter.setIsAds(true)
      this.adsAdapterListeners = {}
      this.adsAdapterListeners[Adapter.Event.START] = this._adStartListener.bind(this)
      this.adsAdapterListeners[Adapter.Event.JOIN] = this._adJoinListener.bind(this)
      this.adsAdapterListeners[Adapter.Event.PAUSE] = this._adPauseListener.bind(this)
      this.adsAdapterListeners[Adapter.Event.RESUME] = this._adResumeListener.bind(this)
      this.adsAdapterListeners[Adapter.Event.BUFFER_BEGIN] = this._adBufferBeginListener.bind(this)
      this.adsAdapterListeners[Adapter.Event.BUFFER_END] = this._adBufferEndListener.bind(this)
      this.adsAdapterListeners[Adapter.Event.STOP] = this._adStopListener.bind(this)
      this.adsAdapterListeners[Adapter.Event.ERROR] = this._adErrorListener.bind(this)
      this.adsAdapterListeners[Adapter.Event.CLICK] = this._adClickListener.bind(this)
      this.adsAdapterListeners[Adapter.Event.MANIFEST] = this._adManifestListener.bind(this)
      this.adsAdapterListeners[Adapter.Event.PODSTART] = this._adBreakStartListener.bind(this)
      this.adsAdapterListeners[Adapter.Event.PODSTOP] = this._adBreakStopListener.bind(this)
      this.adsAdapterListeners[Adapter.Event.QUARTILE] = this._adQuartileListener.bind(this)
      for (var key in this.adsAdapterListeners) {
        this._adsAdapter.on(key, this.adsAdapterListeners[key])
      }
    }
  },

  /**
     * Removes the current adapter. Fires stop if needed. Calls adapter.dispose()
     *
     * @memberof youbora.Plugin.prototype
     */
  removeAdsAdapter: function () {
    if (this._adsAdapter) {
      this._adsAdapter.dispose()
      this._adsAdapter.plugin = null
      if (this.adsAdapterListeners) {
        for (var key in this.adsAdapterListeners) {
          this._adsAdapter.off(key, this.adsAdapterListeners[key])
        }
        delete this.adsAdapterListeners
      }
      this.resizeScrollDetector.stopDetection()
      this._adsAdapter = null
    }
  },

  // ---------------------------------------- LISTENERS -----------------------------------------
  _adStartListener: function (e) {
    if (this._adapter) {
      this._adapter.fireBufferEnd()
      this._adapter.fireSeekEnd()
      if (!this.isInitiated && !this._adapter.flags.isStarted) this._adapter.fireStart()
      if (this._adapter.flags.isPaused) this._adapter.chronos.pause.reset()
    } else {
      this.fireInit()
    }
    if (this._adsAdapter) {
      this._adsAdapter.chronos.viewedMax = []
    }
    var params = e.data.params || {}
    params.adNumber = this.requestBuilder.getNewAdNumber()
    var allParamsReady = (this.getAdResource() || this.getAdTitle()) && typeof this.getAdDuration() === 'number'
    if (allParamsReady) {
      this.adStartSent = true
      this._adsAdapter.fireManifest()
      this._adsAdapter.fireBreakStart()
      params.adNumberInBreak = this.requestBuilder.getNewAdNumberInBreak()
      this._sendAdEventIfAllowed(Constants.WillSendEvent.WILL_SEND_AD_START, Constants.Service.AD_START, params)
    } else {
      this.adInitSent = true
      params.adNumberInBreak = this.requestBuilder.getNewAdNumberInBreak()
      this._sendAdEventIfAllowed(Constants.WillSendEvent.WILL_SEND_AD_INIT, Constants.Service.AD_INIT, params)
    }
  },

  _adJoinListener: function (e) {
    var params = {}
    Util.assign(params, e.data.params || {})
    if (this.adInitSent && !this.adStartSent) {
      this._adsAdapter.fireManifest()
      this._adsAdapter.fireBreakStart()
      this._sendAdEventIfAllowed(Constants.WillSendEvent.WILL_SEND_AD_START, Constants.Service.AD_START, params)
    }
    this._adsAdapter.startChronoView()
    if (this.adConnected) {
      this._adsAdapter.chronos.join.startTime = this.adConnectedTime
      this._adsAdapter.chronos.total.startTime = this.adConnectedTime
      this.adConnectedTime = 0
      this.adConnected = false
    }
    params = e.data.params || {}
    this._sendAdEventIfAllowed(Constants.WillSendEvent.WILL_SEND_AD_JOIN, Constants.Service.AD_JOIN, params)
    this.adInitSent = false
    this.adStartSent = false
  },

  _adPauseListener: function (e) {
    var params = e.data.params || {}
    this._adsAdapter.stopChronoView()
    this._sendAdEventIfAllowed(Constants.WillSendEvent.WILL_SEND_AD_PAUSE, Constants.Service.AD_PAUSE, params)
  },

  _adResumeListener: function (e) {
    var params = e.data.params || {}
    this._adsAdapter.startChronoView()
    this._sendAdEventIfAllowed(Constants.WillSendEvent.WILL_SEND_AD_RESUME, Constants.Service.AD_RESUME, params)
  },

  _adBufferBeginListener: function (e) {
    Log.notice('Ad Buffer Begin')
    this._adsAdapter.stopChronoView()
    if (this._adsAdapter && this._adsAdapter.flags.isPaused) {
      this._adsAdapter.chronos.pause.reset()
    }
  },

  _adBufferEndListener: function (e) {
    var params = e.data.params || {}
    this._adsAdapter.startChronoView()
    this._sendAdEventIfAllowed(Constants.WillSendEvent.WILL_SEND_AD_BUFFER, Constants.Service.AD_BUFFER, params)
  },

  _adStopListener: function (e) {
    this._adsAdapter.stopChronoView()
    this._adsAdapter.flags.reset()
    this._totalPrerollsTime = (this._totalPrerollsTime || 0) + this._adsAdapter.chronos.total.getDeltaTime()

    var params = e.data.params || {}
    params.position = this.requestBuilder.lastSent.position
    this._sendAdEventIfAllowed(Constants.WillSendEvent.WILL_SEND_AD_STOP, Constants.Service.AD_STOP, params)

    // If its a stop for a postroll we check if we can detect if its the last one to call view stop
    if (this.requestBuilder.lastSent.position === Constants.AdPosition.Postroll) {
      var pat = this.options['ad.expectedPattern']
      this.playedPostrolls++
      // If we know the amount of postrolls and this was the last one
      if ((this.requestBuilder.lastSent.givenAds && this.requestBuilder.lastSent.givenAds <= this.playedPostrolls) ||
      // Or if we have expected (and not given!) and this was the last expected one
      (!this.requestBuilder.lastSent.givenAds && pat && pat.post && pat.post[0] && pat.post[0] <= this.playedPostrolls)) {
        this.fireStop()
      }
    }

    this.adConnected = true
    this.adConnectedTime = new Date().getTime()
  },

  _adErrorListener: function (e) {
    var params = e.data.params || {}
    if (this._adapter && !this._adapter.flags.isStarted && !this.isInitiated) {
      this._savedAdError = e
      return null // Ignore ad errors before content
    }
    if (this._blockAdError(e.data.params)) return null
    if (this._adsAdapter) {
      this._adsAdapter.fireManifest()
      this._adsAdapter.fireBreakStart()
    }
    if (!this._adsAdapter || !this._adsAdapter.flags.isStarted) {
      params.adNumber = this.requestBuilder.getNewAdNumber()
      params.adNumberInBreak = this.requestBuilder.getNewAdNumberInBreak()
    }
    if (!this.isBreakStarted) {
      params.breakNumber = this.requestBuilder.getNewBreakNumber()
    }
    this._sendAdEventIfAllowed(Constants.WillSendEvent.WILL_SEND_AD_ERROR, Constants.Service.AD_ERROR, params)
  },

  _adSavedError: function () {
    if (this._savedAdError) {
      this._adErrorListener(this._savedAdError)
      this._savedAdError = null
    }
  },

  _adSavedManifest: function () {
    if (this._savedAdManifest) {
      this._adManifestListener(this._savedAdManifest)
      this._savedAdManifest = null
    }
  },

  _blockAdError: function (errorParams) {
    var now = Date.now()
    var sameError = this._lastAdErrorParams &&
      this._lastAdErrorParams.errorCode === errorParams.errorCode &&
      this._lastAdErrorParams.msg === errorParams.msg &&
      this._lastAdErrorParams.adCreativeId === this.getAdCreativeId()

    if (sameError && this._lastAdErrorTime + 5000 > now) {
      this._lastAdErrorTime = now
      return true
    }
    this._lastAdErrorTime = now
    this._lastAdErrorParams = errorParams
    return false
  },

  _adClickListener: function (e) {
    var params = e.data.params || {}
    this._adsAdapter.stopChronoView()
    this._sendAdEventIfAllowed(Constants.WillSendEvent.WILL_SEND_AD_CLICK, Constants.Service.AD_CLICK, params)
  },

  _adManifestListener: function (e) {
    if (!this.isAdsManifestSent) {
      if (this._adapter && !this._adapter.flags.isStarted && !this.isInitiated) {
        this._savedAdManifest = e
        return null // Ignore ad manifest before content
      }
      var params = e.data.params || {}
      this.isAdsManifestSent = true
      this._sendAdEventIfAllowed(Constants.WillSendEvent.WILL_SEND_AD_MANIFEST, Constants.Service.AD_MANIFEST, params)
    }
  },

  _adBreakStartListener: function (e) {
    if (!this.isBreakStarted) {
      this.isBreakStarted = true
      if (this._adapter) this._adapter.firePause()
      var params = e.data.params || {}
      params.breakNumber = this.requestBuilder.getNewBreakNumber()
      this._sendAdEventIfAllowed(Constants.WillSendEvent.WILL_SEND_AD_POD_START, Constants.Service.AD_POD_START, params)
      this.adConnected = false
    }
  },

  _adBreakStopListener: function (e) {
    if (this.isBreakStarted) {
      this.isBreakStarted = false
      var params = e.data.params || {}
      params.position = this.requestBuilder.lastSent.position
      this._sendAdEventIfAllowed(Constants.WillSendEvent.WILL_SEND_AD_POD_STOP, Constants.Service.AD_POD_STOP, params)
      this.adConnected = false
      if (this._adapter) this._adapter.fireResume()
    }
  },

  _adQuartileListener: function (e) {
    var params = e.data.params || {}
    if (params.quartile) {
      this._sendAdEventIfAllowed(Constants.WillSendEvent.WILL_SEND_AD_QUARTILE, Constants.Service.AD_QUARTILE, params)
    }
  },

  _sendAdEventIfAllowed: function (willSend, service, params) {
    if (!this.options['ad.ignore']) this._send(willSend, service, params)
    Log.notice(service)
  }

}

module.exports = PluginAdsMixin


/***/ }),
/* 410 */
/***/ (function(module, exports, __webpack_require__) {

var Log = __webpack_require__(8)
var Util = __webpack_require__(13)
var Constants = __webpack_require__(26)

// This file is designed to add extra functionalities to Plugin class

var PluginAdsGettersMixin = {
  /**
   * Returns ads's PlayerVersion
   *
   * @memberof youbora.Plugin.prototype
   */
  getAdPlayerVersion: function () {
    return this._safeGetterAdsAdapter('getPlayerVersion') || ''
  },

  /**
   * Returns ad's position
   *
   * @memberof youbora.Plugin.prototype
   */
  getAdPosition: function () {
    var ret = Constants.AdPosition.Preroll
    if (this._adsAdapter) {
      try {
        var temporalRet = this._adsAdapter.getPosition()
        if (Constants.AdPosition.Preroll === temporalRet ||
          Constants.AdPosition.Midroll === temporalRet ||
          Constants.AdPosition.Postroll === temporalRet) {
          ret = temporalRet
        }
      } catch (err) {
        Log.warn('An error occured while calling getAdPosition', err)
      }
    }
    if (!ret && this._adapter) {
      ret = (this._adapter.flags.isJoined) ? Constants.AdPosition.Midroll : Constants.AdPosition.Preroll
    }
    return ret
  },

  getAdNumber: function () {
    return this.requestBuilder.lastSent.adNumber || 0
  },

  getAdNumberInBreak: function () {
    return this.requestBuilder.lastSent.adNumberInBreak || 0
  },

  getBreakNumber: function () {
    return this.requestBuilder.lastSent.breakNumber || 0
  },

  /**
   * Returns ad's AdPlayhead
   *
   * @memberof youbora.Plugin.prototype
   */
  getAdPlayhead: function () {
    var ret = this._safeGetterAdsAdapter('getPlayhead')
    return Util.parseNumber(ret, 0)
  },

  /**
   * Returns ad's AdDuration
   *
   * @memberof youbora.Plugin.prototype
   */
  getAdDuration: function () {
    var ret = this._safeGetterAdsAdapter('getDuration', 'ad.duration')
    return Util.parseNumber(ret, 0)
  },

  /**
   * Returns ad's AdBitrate
   *
   * @memberof youbora.Plugin.prototype
   */
  getAdBitrate: function () {
    var ret = this._safeGetterAdsAdapter('getBitrate')
    if (!ret || ret === -1) {
      ret = this.getWebkitAdBitrate()
    }
    return Util.parseNumber(ret, -1)
  },

  /**
   * Returns bitrate as per webkitVideoDecodedByteCount
   *
   * @param {Object} tag Video tag DOM reference.
   * @returns {number}
   *
   * @memberof youbora.Plugin.prototype
   */
  getWebkitAdBitrate: function () {
    if (this._adsAdapter && this._adsAdapter.tag && this._adsAdapter.tag.webkitVideoDecodedByteCount) {
      var bitrate = this._adsAdapter.tag.webkitVideoDecodedByteCount
      if (this._lastWebkitAdBitrate) {
        var delta = this._adsAdapter.tag.webkitVideoDecodedByteCount - this._lastWebkitAdBitrate
        bitrate = Math.round(((delta) / this.viewTransform.response.pingTime) * 8)
      }
      this._lastWebkitAdBitrate = this._adsAdapter.tag.webkitVideoDecodedByteCount
      return bitrate !== 0 ? bitrate : -1
    }
  },

  /**
   * Returns ad's AdTitle
   *
   * @memberof youbora.Plugin.prototype
   */
  getAdTitle: function () {
    return this._safeGetterAdsAdapter('getTitle', 'ad.title')
  },

  /**
   * Returns ad's AdResource
   *
   * @memberof youbora.Plugin.prototype
   */
  getAdResource: function () {
    return this._safeGetterAdsAdapter('getResource', 'ad.resource')
  },

  /**
   * Returns ad's campaign
   *
   * @memberof youbora.Plugin.prototype
   */
  getAdCampaign: function () {
    return this._safeGetterAdsAdapter('getCampaign', 'ad.campaign')
  },

  /**
  * Returns ad's campaign
  *
  * @memberof youbora.Plugin.prototype
  */
  getAdCreativeId: function () {
    return this._safeGetterAdsAdapter('getCreativeId', 'ad.creativeId')
  },

  /**
  * Returns ad's provider
  *
  * @memberof youbora.Plugin.prototype
  */
  getAdProvider: function () {
    return this._safeGetterAdsAdapter('getProvider', 'ad.provider')
  },

  /**
   * Returns ads adapter getVersion or null
   *
   * @memberof youbora.Plugin.prototype
   */
  getAdAdapterVersion: function () {
    return this._safeGetterAdsAdapter('getVersion')
  },

  /**
   * Returns ad's AdMetadata
   *
   * @memberof youbora.Plugin.prototype
   */
  getAdMetadata: function () {
    return this.options['ad.metadata']
  },

  /**
   * Returns the type of ad insertion (clientside, serverside)
   * @returns {string} ad insertion type
   */
  getAdInsertionType: function () {
    return this._safeGetterAdsAdapter('getAdInsertionType')
  },

  getGivenBreaks: function () {
    return this._safeGetterAdsAdapter('getGivenBreaks', 'ad.givenBreaks')
  },

  getExpectedBreaks: function () {
    var ret = null
    var expBreaks = this.options['ad.expectedBreaks']
    var expPattern = this.options['ad.expectedPattern']
    if (expBreaks) {
      ret = expBreaks
    } else if (expPattern) {
      ret = 0
      ret = expPattern.pre ? expPattern.pre.length : 0
      ret += expPattern.mid ? expPattern.mid.length : 0
      ret += expPattern.post ? expPattern.post.length : 0
    } else if (this._adsAdapter) {
      try {
        ret = this._adsAdapter.getExpectedBreaks()
      } catch (err) {
        Log.warn('An error occured while calling expectedBreaks', err)
      }
    }
    return ret
  },

  getExpectedPattern: function () {
    return this._safeGetterAdsAdapter('getExpectedPattern', 'ad.expectedPattern')
  },

  getBreaksTime: function () {
    return this._safeGetterAdsAdapter('getBreaksTime', 'ad.breaksTime')
  },

  getGivenAds: function () {
    return this._safeGetterAdsAdapter('getGivenAds', 'ad.givenAds')
  },

  getExpectedAds: function () {
    var ret = null
    try {
      if (this._adsAdapter) {
        var pattern = this.options['ad.expectedPattern']
        if (pattern && this.getAdPosition()) {
          var list = []
          if (pattern.pre) list = list.concat(pattern.pre)
          if (pattern.mid) list = list.concat(pattern.mid)
          if (pattern.post) list = list.concat(pattern.post)
          if (list.length > 0) {
            var position = this.requestBuilder.lastSent.breakNumber
            if (position > list.length) position = list.length
            ret = list[position - 1]
          }
        } else {
          ret = this._adsAdapter.getExpectedAds()
        }
      }
    } catch (err) {
      Log.warn('An error occured while calling expectedAds', err)
    }
    return ret
  },

  getAdsExpected: function () {
    var ret = null
    try {
      ret = (this.getExpectedPattern() || this.getGivenAds()) || false
    } catch (err) {
      Log.warn('An error occured while calling givenAds or expectedPattern', err)
    }
    return ret
  },

  // ----------------------------------------- CHRONOS ------------------------------------------

  /**
   * Returns AdJoinDuration chrono delta time
   *
   * @memberof youbora.Plugin.prototype
   */
  getAdJoinDuration: function () {
    return this._adsAdapter ? this._adsAdapter.chronos.join.getDeltaTime(false) : -1
  },

  /**
   * Returns AdBufferDuration chrono delta time
   *
   * @memberof youbora.Plugin.prototype
   */
  getAdBufferDuration: function () {
    return this._adsAdapter ? this._adsAdapter.chronos.buffer.getDeltaTime(false) : -1
  },

  /**
   * Returns AdPauseDuration chrono delta time
   *
   * @memberof youbora.Plugin.prototype
   */
  getAdPauseDuration: function () {
    return this._adsAdapter ? this._adsAdapter.chronos.pause.getDeltaTime(false) : 0
  },

  /**
   * Returns total totalAdDuration chrono delta time
   *
   * @memberof youbora.Plugin.prototype
   */
  getAdTotalDuration: function () {
    return this._adsAdapter ? this._adsAdapter.chronos.total.getDeltaTime(false) : -1
  },

  getAdViewedDuration: function () {
    return this._getTimeMaxOrAcum(true)
  },

  getAdViewability: function () {
    return this._getTimeMaxOrAcum()
  },

  _getTimeMaxOrAcum: function (acum) {
    var maxTime = 0
    if (this._adsAdapter) {
      this._adsAdapter.chronos.viewedMax.forEach(function (chrono) {
        if (acum) {
          maxTime += chrono.getDeltaTime(false)
        } else {
          maxTime = Math.max(chrono.getDeltaTime(false), maxTime)
        }
      })
    }
    return maxTime
  },

  getAudioEnabled: function () {
    return this._safeGetterAdsAdapter('getAudioEnabled')
  },

  getIsSkippable: function () {
    return this._safeGetterAdsAdapter('getIsSkippable')
  },

  getIsFullscreen: function () {
    return this._safeGetterAdsAdapter('getIsFullscreen')
  },

  _safeGetterAdsAdapter: function (func, option) {
    var ret = null
    if (option && this.options[option]) {
      ret = this.options[option]
    } else {
      try {
        if (this._adsAdapter && typeof this._adsAdapter[func] === 'function') {
          ret = this._adsAdapter[func]()
        }
      } catch (err) {
        Log.warn('An error occured while calling ' + func, err)
      }
    }
    return ret
  }
}

module.exports = PluginAdsGettersMixin


/***/ }),
/* 411 */
/***/ (function(module, exports, __webpack_require__) {

var Log = __webpack_require__(8)
var Constants = __webpack_require__(26)

// This file is designed to add extra functionalities to Plugin class

var PluginPingMixin = {
  /**
   * Starts sending pings.
   *
   * @private
   * @memberof youbora.Plugin.prototype
   */
  _startPings: function () {
    if (!this._ping.isRunning) this._ping.start()
  },

  /**
   * Stops sending pings.
   *
   * @private
   * @memberof youbora.Plugin.prototype
   */
  _stopPings: function () {
    this._ping.stop()
  },

  /**
   * Sends ping request
   *
   * @param {number} diffTime Time since the last ping
   *
   * @private
   * @memberof youbora.Plugin.prototype
   */
  _sendPing: function (diffTime) {
    var params = {
      diffTime: diffTime,
      entities: this.requestBuilder.getChangedEntities()
    }
    if (this._adapter) {
      if (this._adapter.flags.isPaused) {
        params = this.requestBuilder.fetchParams(params, ['pauseDuration'])
      } else {
        params = this.requestBuilder.fetchParams(params, ['bitrate', 'throughput', 'fps'])
      }
      if (this._adapter.flags.isJoined) {
        params = this.requestBuilder.fetchParams(params, ['playhead'])
      }
      if (this._adapter.flags.isBuffering) {
        params = this.requestBuilder.fetchParams(params, ['bufferDuration'])
      }
      if (this._adapter.flags.isSeeking) {
        params = this.requestBuilder.fetchParams(params, ['seekDuration'])
      }
    }

    if (this._adsAdapter && !this.options['ad.ignore']) {
      if (this._adsAdapter.flags.isStarted) {
        params = this.requestBuilder.fetchParams(params, ['adPlayhead', 'adViewedDuration', 'adViewability'])
        if (this._adsAdapter.flags.isPaused) {
          params = this.requestBuilder.fetchParams(params, ['adPauseDuration'])
        } else {
          params = this.requestBuilder.fetchParams(params, ['adBitrate'])
        }
      }
      if (this._adsAdapter.flags.isBuffering) {
        params = this.requestBuilder.fetchParams(params, ['adBufferDuration'])
      }
    }

    this._send(Constants.WillSendEvent.WILL_SEND_PING, Constants.Service.PING, params)
    if (this.startDelayed) {
      this._retryStart()
    }
    Log.verbose(Constants.Service.PING)
  }
}

module.exports = PluginPingMixin


/***/ }),
/* 412 */
/***/ (function(module, exports, __webpack_require__) {

var Log = __webpack_require__(8)
var Util = __webpack_require__(13)
var Constants = __webpack_require__(26)
var Transform = __webpack_require__(38)

// This file is designed to add extra functionalities to Plugin class

/** @lends youbora.Plugin.prototype */
var PluginFireMixin = {
  /**
   * Sends /init. Should be called once the user has requested the content. Does not need
   * a working adapter or player to work. it won't sent start if isInitiated is true.
   *
   * @param {Object} [params] Object of key:value params.
   *
   * @memberof youbora.Plugin.prototype
   */
  fireInit: function (params) {
    if (!this.isInitiated) {
      if (!this.getAdapter() || (this.getAdapter() && !this.getAdapter().flags.isStarted)) {
        this.viewTransform.nextView()
        this._initComm()
        this._startPings()
        this.initChrono.start()
        this.isInitiated = true

        params = params || {}
        this._send(Constants.WillSendEvent.WILL_SEND_INIT, Constants.Service.INIT, params)
        this._adSavedError()
        this._adSavedManifest()
        Log.notice(Constants.Service.INIT + ' ' + (params.title || params.mediaResource))
      }
    }
  },

  /**
   * Sends /error. Should be used when the error is related to out-of-player errors: like async
   * resource load or player loading errors.
   *
   * @param {String|Object} [code] Error Code, if an object is sent, it will be treated as params.
   * @param {String} [msg] Error Message
   * @param {Object} [metadata] Object defining error metadata
   * @param {String} [level] Level of the error. Currently supports 'error' and 'fatal'
   *
   * @memberof youbora.Plugin.prototype
   */
  fireError: function (object, msg, metadata, level) {
    this.fireInit()
    var params = Util.buildErrorParams(object, msg, metadata, level)
    if (params.code) {
      delete params.code
    }
    this._send(Constants.WillSendEvent.WILL_SEND_ERROR, Constants.Service.ERROR, params)
    this._adSavedError()
    this._adSavedManifest()
    Log.notice(Constants.Service.ERROR +
      ' ' + params.errorLevel +
      ' ' + params.errorCode
    )

    if (params.errorLevel === 'fatal') {
      this.fireStop()
    }
  },

  /**
   * Calls fireErrors and then stops pings.
   *
   * @param {String|Object} [code] Error Code, if an object is sent, it will be treated as params.
   * @param {String} [msg] Error Message
   * @param {Object} [metadata] Object defining error metadata
   *
   * @memberof youbora.Plugin.prototype
   */
  fireFatalError: function (object, msg, metadata, level) {
    this.fireError(object, msg, metadata, level)
    this.fireStop()
  },

  /**
   * Fires /stop. Should be used to terminate sessions once the player is gone or if
   * plugin.fireError() is called.
   *
   * @param {Object} [params] Object of key:value params.
   *
   * @memberof youbora.Plugin.prototype
   */
  fireStop: function (params) {
    if (this.isInitiated || this.isStarted) {
      if (this._adapter) {
        this._adapter.flags.isStopped = true
        if (this._adapter.monitor) this._adapter.monitor.stop()
      }
      if (this._adsAdapter && this.isBreakStarted) {
        this._adsAdapter.fireStop()
        this._adsAdapter.fireBreakStop()
      }
      params = params || {}
      this._send(Constants.WillSendEvent.WILL_SEND_STOP, Constants.Service.STOP, params)
      var chronos = this._adapter ? this._adapter.chronos : null
      if (chronos) {
        chronos.total.stop()
        chronos.join.reset()
        chronos.pause.reset()
        chronos.buffer.reset()
        chronos.seek.reset()
      }
      Log.notice(Constants.Service.STOP + ' at ' + params.playhead + 's')
      this._reset()
    }
  },

  /**
   * Fires /offlineEvents. If offline is disabled, will try to send all the views stored.
   *
   * @param {Object} [params] Object of key:value params.
   *
   * @memberof youbora.Plugin.prototype
   */
  fireOfflineEvents: function (params) {
    if (this.options && !this.options.offline) {
      if (!this.isInitiated &&
        (!this._adapter || !this._adapter.flags.isStarted) &&
        (!this._adsAdapter || !this._adsAdapter.flags.isStarted)) {
        this._offlineParams = params
        if (this.viewTransform.response.code && this.viewTransform.response.host) {
          this._generateAndSendOffline()
        } else {
          this.offlineReference = this._generateAndSendOffline.bind(this)
          this.viewTransform.on(Transform.Event.DONE, this.offlineReference)
        }
      } else {
        Log.error('Adapters have to be stopped')
      }
    } else {
      Log.error('To send offline events, offline option must be disabled')
    }
  },

  _generateAndSendOffline: function () {
    if (this.options.disableStorage) return null
    var params = this._offlineParams
    this._initComm()
    while (true) {
      var bodyAndId = this.requestBuilder.buildBody(Constants.Service.OFFLINE_EVENTS).viewJson
      if (bodyAndId[0] === null) break
      var newViewCode = this.viewTransform.nextView()
      var body = bodyAndId[0].replace(/CODE_PLACEHOLDER/g, newViewCode.toString())
        .replace(/,"sessionId":"SESSION_PLACEHOLDER"/g, '') // this.viewTransform.getSession()
        .replace(/,"sessionRoot":"ROOT_PLACEHOLDER"/g, '') // this.viewTransform.getSession()
      // modify to support offline+infinity
      this._send(Constants.WillSendEvent.WILL_SEND_OFFLINE_EVENTS, Constants.Service.OFFLINE_EVENTS,
        params, body, 'POST', function (a, callbackParams) {
          this.offlineStorage.removeView(callbackParams.offlineId)
        }.bind(this), { offlineId: bodyAndId[1] })
    }
    this.offlineStorage.sent()
    this._offlineParams = null
  }
}

module.exports = PluginFireMixin


/***/ }),
/* 413 */
/***/ (function(module, exports, __webpack_require__) {

var Constants = __webpack_require__(26)
var Log = __webpack_require__(8)
var YBRequest = __webpack_require__(31)
var Util = __webpack_require__(13)

var YouboraInfinity = __webpack_require__(110)

// This file is designed to add extra functionalities to Plugin class

var PluginInfinityMixin = {
  _initInfinity: function () {
    this.infinity.on(YouboraInfinity.Event.NAV, this._navListener.bind(this))
    this.infinity.on(YouboraInfinity.Event.SESSION_START, this._sessionStartListener.bind(this))
    this.infinity.on(YouboraInfinity.Event.SESSION_STOP, this._sessionStopListener.bind(this))
    this.infinity.on(YouboraInfinity.Event.EVENT, this._eventListener.bind(this))
  },

  _sendInfinity: function (willSendEvent, service, params) {
    params = this.requestBuilder.buildParams(params, service)

    var data = {
      params: params,
      plugin: this,
      adapter: this.getAdapter(),
      adsAdapter: this.getAdsAdapter()
    }

    this.emit(willSendEvent, data)

    if (this.infinity._comm && params !== null && this.options.enabled) {
      this.lastServeiceSent = service
      this.infinity._comm.sendRequest(new YBRequest(null, service, params))
    }
  },

  // ---------------------------------------- LISTENERS -----------------------------------------

  _navListener: function (e) {
    var params = e.data.params || {}
    this._sendInfinity(Constants.WillSendEvent.WILL_SEND_NAV, Constants.Service.NAV, params)

    // start beats
    if (!this._beat.isRunning) this._beat.start()

    Log.notice(Constants.Service.NAV + ' ' + params.route)
  },

  _sessionStartListener: function (e) {
    var params = e.data.params || {}
    this._sendInfinity(
      Constants.WillSendEvent.WILL_SEND_SESSION_START,
      Constants.Service.SESSION_START,
      params
    )

    // start beats
    if (!this._beat.isRunning) this._beat.start()

    Log.notice(Constants.Service.SESSION_START + ' ' + params.route)
  },

  _sessionStopListener: function (e) {
    var params = e.data.params || {}
    this._sendInfinity(
      Constants.WillSendEvent.WILL_SEND_SESSION_STOP,
      Constants.Service.SESSION_STOP,
      params
    )

    // stop beats
    if (this._beat.isRunning) this._beat.stop()

    Log.notice(Constants.Service.SESSION_STOP + ' ' + params.route)
  },

  _eventListener: function (e) {
    var params = e.data.params || {}
    this._sendInfinity(Constants.WillSendEvent.WILL_SEND_EVENT, Constants.Service.EVENT, params)
    Log.notice(Constants.Service.EVENT + ' ' + params.name)
  },

  /**
   * Sends beat request
   *
   * @param {number} diffTime Time since the last ping
   *
   * @private
   * @memberof youbora.Plugin.prototype
   */
  _sendBeat: function (diffTime) {
    var params = {
      diffTime: diffTime
    }

    this._sendInfinity(Constants.WillSendEvent.WILL_SEND_BEAT, Constants.Service.BEAT, params)
    if (this.infinity) {
      this.infinity._setLastActive()
    }
    Log.verbose(Constants.Service.BEAT)
  },

  // ---------------------------------------- GETTERS -----------------------------------------

  /**
* Returns a json with the metrics to be reported in beats when changed
*
* @memberof youbora.Plugin.prototype
*/
  getSessionMetrics: function () {
    return Util.getMetricsFrom(this.options['session.metrics'])
  }
}

module.exports = PluginInfinityMixin


/***/ }),
/* 414 */
/***/ (function(module, exports, __webpack_require__) {

// This file is designed to add extra functionalities to Plugin class

const Util = __webpack_require__(13)

var PluginInfinityGettersMixin = {
  getContext: function () {
    var ret = 'Default'
    if (this.options['session.context']) {
      ret = this.storage.getSession('context')
    }
    return ret
  },

  getScrollDepth: function () {
    var ret = this.storage.getSession('pageScrollDepth')
    this.storage.removeSession('pageScrollDepth')
    return ret
  },

  getSession: function () {
    var ret = this.storage.getStorages('session')
    // Some tvs set the value as 'undefined' as string when deleting the value
    if (ret === 'undefined') {
      ret = undefined
    }
    if (!ret) {
      var data = this.getStoredData()
      if (data) {
        try {
          ret = JSON.parse(data).q.c
        } catch (err) {
          // nothing
        }
      }
    }
    return ret
  },

  getStorageHost: function () {
    var ret = null
    var data = this.getStoredData()
    if (data) {
      try {
        ret = JSON.parse(data).q.h
      } catch (err) {
        // nothing
      }
    }
    return ret ? Util.addProtocol(ret, this.options['app.https']) : ret
  },

  getStoredData: function () {
    return this.storage.getStorages('data')
  },

  getDataTime: function () {
    return this.storage.getStorages('dataTime')
  },

  getLastActive: function () {
    return this.storage.getStorages('lastactive')
  },

  setStoredData: function (data) {
    this.storage.setStorages('data', data)
  },

  setSession: function (session) {
    this.storage.setStorages('session', session)
  },

  setDataTime: function (time) {
    this.storage.setStorages('dataTime', time)
  },

  setLastActive: function (last) {
    this.storage.setStorages('lastactive', last)
  },

  getPageName: function () {
    if (typeof document !== 'undefined' && document.title) {
      return document.title
    }
  },

  getPageLoadTime: function () {
    return this.browserLoadTimes.getPageLoadTime()
  },

  getIsSessionExpired: function () {
    var now = new Date().getTime()
    return !this.getSession() || (this.infinity.getFirstActive() < now - this.sessionExpire)
  },

  getIsDataExpired: function () {
    var now = new Date().getTime()
    return !this.storage.isEnabled() || !this.getStoredData() || (this.infinity.getFirstActive() < now - this.sessionExpire)
  }
}

module.exports = PluginInfinityGettersMixin


/***/ }),
/* 415 */
/***/ (function(module, exports) {

module.exports = {"name":"shaka","type":"adapter","tech":"js","author":"Jesus Lopez","version":"6.8.4","built":"2022-07-18","repo":"https://bitbucket.org/npaw/shaka-adapter-js","libVersion":"^6.8.26","features":{"buffer":"native","seek":"native","error":true,"stop":true,"pause":true,"resume":true,"getters":["getPlayhead","getPlayrate","getFramesPerSecond","getDroppedFrames","getDuration","getBitrate","getThroughput","getRendition","getTitle","getIsLive","getResource","getPlayerVersion","getLatency"]},"ads":[]}

/***/ })
/******/ ]);