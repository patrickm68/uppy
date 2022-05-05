"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __reExport = (target, module, copyDefault, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toCommonJS = /* @__PURE__ */ ((cache) => {
    return (module, temp) => {
      return cache && cache.get(module) || (temp = __reExport(__markAsModule({}), module, 1), cache && cache.set(module, temp), temp);
    };
  })(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

  // ../packages/@uppy/utils/lib/hasProperty.js
  var require_hasProperty = __commonJS({
    "../packages/@uppy/utils/lib/hasProperty.js"(exports, module) {
      module.exports = function has(object, key) {
        return Object.prototype.hasOwnProperty.call(object, key);
      };
    }
  });

  // ../packages/@uppy/utils/lib/Translator.js
  var require_Translator = __commonJS({
    "../packages/@uppy/utils/lib/Translator.js"(exports, module) {
      var _apply;
      function _classPrivateFieldLooseBase(receiver, privateKey) {
        if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
          throw new TypeError("attempted to use private field on non-instance");
        }
        return receiver;
      }
      var id = 0;
      function _classPrivateFieldLooseKey(name) {
        return "__private_" + id++ + "_" + name;
      }
      var has = require_hasProperty();
      function insertReplacement(source, rx, replacement) {
        const newParts = [];
        source.forEach((chunk) => {
          if (typeof chunk !== "string") {
            return newParts.push(chunk);
          }
          return rx[Symbol.split](chunk).forEach((raw, i2, list) => {
            if (raw !== "") {
              newParts.push(raw);
            }
            if (i2 < list.length - 1) {
              newParts.push(replacement);
            }
          });
        });
        return newParts;
      }
      function interpolate(phrase, options) {
        const dollarRegex = /\$/g;
        const dollarBillsYall = "$$$$";
        let interpolated = [phrase];
        if (options == null)
          return interpolated;
        for (const arg of Object.keys(options)) {
          if (arg !== "_") {
            let replacement = options[arg];
            if (typeof replacement === "string") {
              replacement = dollarRegex[Symbol.replace](replacement, dollarBillsYall);
            }
            interpolated = insertReplacement(interpolated, new RegExp(`%\\{${arg}\\}`, "g"), replacement);
          }
        }
        return interpolated;
      }
      module.exports = (_apply = /* @__PURE__ */ _classPrivateFieldLooseKey("apply"), class Translator {
        constructor(locales) {
          Object.defineProperty(this, _apply, {
            value: _apply2
          });
          this.locale = {
            strings: {},
            pluralize(n2) {
              if (n2 === 1) {
                return 0;
              }
              return 1;
            }
          };
          if (Array.isArray(locales)) {
            locales.forEach(_classPrivateFieldLooseBase(this, _apply)[_apply], this);
          } else {
            _classPrivateFieldLooseBase(this, _apply)[_apply](locales);
          }
        }
        translate(key, options) {
          return this.translateArray(key, options).join("");
        }
        translateArray(key, options) {
          if (!has(this.locale.strings, key)) {
            throw new Error(`missing string: ${key}`);
          }
          const string = this.locale.strings[key];
          const hasPluralForms = typeof string === "object";
          if (hasPluralForms) {
            if (options && typeof options.smart_count !== "undefined") {
              const plural = this.locale.pluralize(options.smart_count);
              return interpolate(string[plural], options);
            }
            throw new Error("Attempted to use a string with plural forms, but no value was given for %{smart_count}");
          }
          return interpolate(string, options);
        }
      });
      function _apply2(locale) {
        if (!(locale != null && locale.strings)) {
          return;
        }
        const prevLocale = this.locale;
        this.locale = {
          ...prevLocale,
          strings: {
            ...prevLocale.strings,
            ...locale.strings
          }
        };
        this.locale.pluralize = locale.pluralize || prevLocale.pluralize;
      }
    }
  });

  // ../node_modules/namespace-emitter/index.js
  var require_namespace_emitter = __commonJS({
    "../node_modules/namespace-emitter/index.js"(exports, module) {
      module.exports = function createNamespaceEmitter() {
        var emitter = {};
        var _fns = emitter._fns = {};
        emitter.emit = function emit(event, arg1, arg2, arg3, arg4, arg5, arg6) {
          var toEmit = getListeners(event);
          if (toEmit.length) {
            emitAll(event, toEmit, [arg1, arg2, arg3, arg4, arg5, arg6]);
          }
        };
        emitter.on = function on(event, fn) {
          if (!_fns[event]) {
            _fns[event] = [];
          }
          _fns[event].push(fn);
        };
        emitter.once = function once(event, fn) {
          function one() {
            fn.apply(this, arguments);
            emitter.off(event, one);
          }
          this.on(event, one);
        };
        emitter.off = function off(event, fn) {
          var keep = [];
          if (event && fn) {
            var fns = this._fns[event];
            var i2 = 0;
            var l2 = fns ? fns.length : 0;
            for (i2; i2 < l2; i2++) {
              if (fns[i2] !== fn) {
                keep.push(fns[i2]);
              }
            }
          }
          keep.length ? this._fns[event] = keep : delete this._fns[event];
        };
        function getListeners(e2) {
          var out = _fns[e2] ? _fns[e2] : [];
          var idx = e2.indexOf(":");
          var args = idx === -1 ? [e2] : [e2.substring(0, idx), e2.substring(idx + 1)];
          var keys = Object.keys(_fns);
          var i2 = 0;
          var l2 = keys.length;
          for (i2; i2 < l2; i2++) {
            var key = keys[i2];
            if (key === "*") {
              out = out.concat(_fns[key]);
            }
            if (args.length === 2 && args[0] === key) {
              out = out.concat(_fns[key]);
              break;
            }
          }
          return out;
        }
        function emitAll(e2, fns, args) {
          var i2 = 0;
          var l2 = fns.length;
          for (i2; i2 < l2; i2++) {
            if (!fns[i2])
              break;
            fns[i2].event = e2;
            fns[i2].apply(fns[i2], args);
          }
        }
        return emitter;
      };
    }
  });

  // ../node_modules/nanoid/non-secure/index.cjs
  var require_non_secure = __commonJS({
    "../node_modules/nanoid/non-secure/index.cjs"(exports, module) {
      var urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
      var customAlphabet = (alphabet, size) => {
        return () => {
          let id = "";
          let i2 = size;
          while (i2--) {
            id += alphabet[Math.random() * alphabet.length | 0];
          }
          return id;
        };
      };
      var nanoid = (size = 21) => {
        let id = "";
        let i2 = size;
        while (i2--) {
          id += urlAlphabet[Math.random() * 64 | 0];
        }
        return id;
      };
      module.exports = { nanoid, customAlphabet };
    }
  });

  // ../node_modules/lodash.throttle/index.js
  var require_lodash = __commonJS({
    "../node_modules/lodash.throttle/index.js"(exports, module) {
      var FUNC_ERROR_TEXT = "Expected a function";
      var NAN = 0 / 0;
      var symbolTag = "[object Symbol]";
      var reTrim = /^\s+|\s+$/g;
      var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
      var reIsBinary = /^0b[01]+$/i;
      var reIsOctal = /^0o[0-7]+$/i;
      var freeParseInt = parseInt;
      var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      var objectProto = Object.prototype;
      var objectToString = objectProto.toString;
      var nativeMax = Math.max;
      var nativeMin = Math.min;
      var now = function() {
        return root.Date.now();
      };
      function debounce(func, wait, options) {
        var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
        if (typeof func != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        wait = toNumber(wait) || 0;
        if (isObject(options)) {
          leading = !!options.leading;
          maxing = "maxWait" in options;
          maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        function invokeFunc(time) {
          var args = lastArgs, thisArg = lastThis;
          lastArgs = lastThis = void 0;
          lastInvokeTime = time;
          result = func.apply(thisArg, args);
          return result;
        }
        function leadingEdge(time) {
          lastInvokeTime = time;
          timerId = setTimeout(timerExpired, wait);
          return leading ? invokeFunc(time) : result;
        }
        function remainingWait(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, result2 = wait - timeSinceLastCall;
          return maxing ? nativeMin(result2, maxWait - timeSinceLastInvoke) : result2;
        }
        function shouldInvoke(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
          return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
        }
        function timerExpired() {
          var time = now();
          if (shouldInvoke(time)) {
            return trailingEdge(time);
          }
          timerId = setTimeout(timerExpired, remainingWait(time));
        }
        function trailingEdge(time) {
          timerId = void 0;
          if (trailing && lastArgs) {
            return invokeFunc(time);
          }
          lastArgs = lastThis = void 0;
          return result;
        }
        function cancel() {
          if (timerId !== void 0) {
            clearTimeout(timerId);
          }
          lastInvokeTime = 0;
          lastArgs = lastCallTime = lastThis = timerId = void 0;
        }
        function flush() {
          return timerId === void 0 ? result : trailingEdge(now());
        }
        function debounced() {
          var time = now(), isInvoking = shouldInvoke(time);
          lastArgs = arguments;
          lastThis = this;
          lastCallTime = time;
          if (isInvoking) {
            if (timerId === void 0) {
              return leadingEdge(lastCallTime);
            }
            if (maxing) {
              timerId = setTimeout(timerExpired, wait);
              return invokeFunc(lastCallTime);
            }
          }
          if (timerId === void 0) {
            timerId = setTimeout(timerExpired, wait);
          }
          return result;
        }
        debounced.cancel = cancel;
        debounced.flush = flush;
        return debounced;
      }
      function throttle(func, wait, options) {
        var leading = true, trailing = true;
        if (typeof func != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        if (isObject(options)) {
          leading = "leading" in options ? !!options.leading : leading;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        return debounce(func, wait, {
          "leading": leading,
          "maxWait": wait,
          "trailing": trailing
        });
      }
      function isObject(value) {
        var type = typeof value;
        return !!value && (type == "object" || type == "function");
      }
      function isObjectLike(value) {
        return !!value && typeof value == "object";
      }
      function isSymbol(value) {
        return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
      }
      function toNumber(value) {
        if (typeof value == "number") {
          return value;
        }
        if (isSymbol(value)) {
          return NAN;
        }
        if (isObject(value)) {
          var other = typeof value.valueOf == "function" ? value.valueOf() : value;
          value = isObject(other) ? other + "" : other;
        }
        if (typeof value != "string") {
          return value === 0 ? value : +value;
        }
        value = value.replace(reTrim, "");
        var isBinary = reIsBinary.test(value);
        return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
      }
      module.exports = throttle;
    }
  });

  // ../packages/@uppy/store-default/lib/index.js
  var require_lib = __commonJS({
    "../packages/@uppy/store-default/lib/index.js"(exports, module) {
      function _classPrivateFieldLooseBase(receiver, privateKey) {
        if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
          throw new TypeError("attempted to use private field on non-instance");
        }
        return receiver;
      }
      var id = 0;
      function _classPrivateFieldLooseKey(name) {
        return "__private_" + id++ + "_" + name;
      }
      var _publish = /* @__PURE__ */ _classPrivateFieldLooseKey("publish");
      var DefaultStore = class {
        constructor() {
          Object.defineProperty(this, _publish, {
            value: _publish2
          });
          this.state = {};
          this.callbacks = [];
        }
        getState() {
          return this.state;
        }
        setState(patch) {
          const prevState = {
            ...this.state
          };
          const nextState = {
            ...this.state,
            ...patch
          };
          this.state = nextState;
          _classPrivateFieldLooseBase(this, _publish)[_publish](prevState, nextState, patch);
        }
        subscribe(listener) {
          this.callbacks.push(listener);
          return () => {
            this.callbacks.splice(this.callbacks.indexOf(listener), 1);
          };
        }
      };
      function _publish2() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        this.callbacks.forEach((listener) => {
          listener(...args);
        });
      }
      DefaultStore.VERSION = "2.0.3";
      module.exports = function defaultStore() {
        return new DefaultStore();
      };
    }
  });

  // ../packages/@uppy/utils/lib/getFileNameAndExtension.js
  var require_getFileNameAndExtension = __commonJS({
    "../packages/@uppy/utils/lib/getFileNameAndExtension.js"(exports, module) {
      module.exports = function getFileNameAndExtension(fullFileName) {
        const lastDot = fullFileName.lastIndexOf(".");
        if (lastDot === -1 || lastDot === fullFileName.length - 1) {
          return {
            name: fullFileName,
            extension: void 0
          };
        }
        return {
          name: fullFileName.slice(0, lastDot),
          extension: fullFileName.slice(lastDot + 1)
        };
      };
    }
  });

  // ../packages/@uppy/utils/lib/mimeTypes.js
  var require_mimeTypes = __commonJS({
    "../packages/@uppy/utils/lib/mimeTypes.js"(exports, module) {
      module.exports = {
        md: "text/markdown",
        markdown: "text/markdown",
        mp4: "video/mp4",
        mp3: "audio/mp3",
        svg: "image/svg+xml",
        jpg: "image/jpeg",
        png: "image/png",
        gif: "image/gif",
        heic: "image/heic",
        heif: "image/heif",
        yaml: "text/yaml",
        yml: "text/yaml",
        csv: "text/csv",
        tsv: "text/tab-separated-values",
        tab: "text/tab-separated-values",
        avi: "video/x-msvideo",
        mks: "video/x-matroska",
        mkv: "video/x-matroska",
        mov: "video/quicktime",
        dicom: "application/dicom",
        doc: "application/msword",
        docm: "application/vnd.ms-word.document.macroenabled.12",
        docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        dot: "application/msword",
        dotm: "application/vnd.ms-word.template.macroenabled.12",
        dotx: "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
        xla: "application/vnd.ms-excel",
        xlam: "application/vnd.ms-excel.addin.macroenabled.12",
        xlc: "application/vnd.ms-excel",
        xlf: "application/x-xliff+xml",
        xlm: "application/vnd.ms-excel",
        xls: "application/vnd.ms-excel",
        xlsb: "application/vnd.ms-excel.sheet.binary.macroenabled.12",
        xlsm: "application/vnd.ms-excel.sheet.macroenabled.12",
        xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        xlt: "application/vnd.ms-excel",
        xltm: "application/vnd.ms-excel.template.macroenabled.12",
        xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
        xlw: "application/vnd.ms-excel",
        txt: "text/plain",
        text: "text/plain",
        conf: "text/plain",
        log: "text/plain",
        pdf: "application/pdf",
        zip: "application/zip",
        "7z": "application/x-7z-compressed",
        rar: "application/x-rar-compressed",
        tar: "application/x-tar",
        gz: "application/gzip",
        dmg: "application/x-apple-diskimage"
      };
    }
  });

  // ../packages/@uppy/utils/lib/getFileType.js
  var require_getFileType = __commonJS({
    "../packages/@uppy/utils/lib/getFileType.js"(exports, module) {
      var getFileNameAndExtension = require_getFileNameAndExtension();
      var mimeTypes = require_mimeTypes();
      module.exports = function getFileType(file) {
        var _getFileNameAndExtens;
        if (file.type)
          return file.type;
        const fileExtension = file.name ? (_getFileNameAndExtens = getFileNameAndExtension(file.name).extension) == null ? void 0 : _getFileNameAndExtens.toLowerCase() : null;
        if (fileExtension && fileExtension in mimeTypes) {
          return mimeTypes[fileExtension];
        }
        return "application/octet-stream";
      };
    }
  });

  // ../packages/@uppy/utils/lib/generateFileID.js
  var require_generateFileID = __commonJS({
    "../packages/@uppy/utils/lib/generateFileID.js"(exports, module) {
      function encodeCharacter(character) {
        return character.charCodeAt(0).toString(32);
      }
      function encodeFilename(name) {
        let suffix = "";
        return name.replace(/[^A-Z0-9]/ig, (character) => {
          suffix += `-${encodeCharacter(character)}`;
          return "/";
        }) + suffix;
      }
      module.exports = function generateFileID(file) {
        let id = "uppy";
        if (typeof file.name === "string") {
          id += `-${encodeFilename(file.name.toLowerCase())}`;
        }
        if (file.type !== void 0) {
          id += `-${file.type}`;
        }
        if (file.meta && typeof file.meta.relativePath === "string") {
          id += `-${encodeFilename(file.meta.relativePath.toLowerCase())}`;
        }
        if (file.data.size !== void 0) {
          id += `-${file.data.size}`;
        }
        if (file.data.lastModified !== void 0) {
          id += `-${file.data.lastModified}`;
        }
        return id;
      };
    }
  });

  // ../packages/@uppy/core/lib/supportsUploadProgress.js
  var require_supportsUploadProgress = __commonJS({
    "../packages/@uppy/core/lib/supportsUploadProgress.js"(exports, module) {
      module.exports = function supportsUploadProgress(userAgent) {
        if (userAgent == null) {
          userAgent = typeof navigator !== "undefined" ? navigator.userAgent : null;
        }
        if (!userAgent)
          return true;
        const m2 = /Edge\/(\d+\.\d+)/.exec(userAgent);
        if (!m2)
          return true;
        const edgeVersion = m2[1];
        let [major, minor] = edgeVersion.split(".");
        major = parseInt(major, 10);
        minor = parseInt(minor, 10);
        if (major < 15 || major === 15 && minor < 15063) {
          return true;
        }
        if (major > 18 || major === 18 && minor >= 18218) {
          return true;
        }
        return false;
      };
    }
  });

  // ../packages/@uppy/core/lib/getFileName.js
  var require_getFileName = __commonJS({
    "../packages/@uppy/core/lib/getFileName.js"(exports, module) {
      module.exports = function getFileName(fileType, fileDescriptor) {
        if (fileDescriptor.name) {
          return fileDescriptor.name;
        }
        if (fileType.split("/")[0] === "image") {
          return `${fileType.split("/")[0]}.${fileType.split("/")[1]}`;
        }
        return "noname";
      };
    }
  });

  // ../packages/@uppy/utils/lib/getTimeStamp.js
  var require_getTimeStamp = __commonJS({
    "../packages/@uppy/utils/lib/getTimeStamp.js"(exports, module) {
      function pad(number) {
        return number < 10 ? `0${number}` : number.toString();
      }
      module.exports = function getTimeStamp() {
        const date = new Date();
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        const seconds = pad(date.getSeconds());
        return `${hours}:${minutes}:${seconds}`;
      };
    }
  });

  // ../packages/@uppy/core/lib/loggers.js
  var require_loggers = __commonJS({
    "../packages/@uppy/core/lib/loggers.js"(exports, module) {
      var getTimeStamp = require_getTimeStamp();
      var justErrorsLogger = {
        debug: () => {
        },
        warn: () => {
        },
        error: function() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return console.error(`[Uppy] [${getTimeStamp()}]`, ...args);
        }
      };
      var debugLogger = {
        debug: function() {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          return console.debug(`[Uppy] [${getTimeStamp()}]`, ...args);
        },
        warn: function() {
          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }
          return console.warn(`[Uppy] [${getTimeStamp()}]`, ...args);
        },
        error: function() {
          for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            args[_key4] = arguments[_key4];
          }
          return console.error(`[Uppy] [${getTimeStamp()}]`, ...args);
        }
      };
      module.exports = {
        justErrorsLogger,
        debugLogger
      };
    }
  });

  // ../node_modules/@transloadit/prettier-bytes/prettierBytes.js
  var require_prettierBytes = __commonJS({
    "../node_modules/@transloadit/prettier-bytes/prettierBytes.js"(exports, module) {
      module.exports = function prettierBytes(num) {
        if (typeof num !== "number" || isNaN(num)) {
          throw new TypeError("Expected a number, got " + typeof num);
        }
        var neg = num < 0;
        var units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        if (neg) {
          num = -num;
        }
        if (num < 1) {
          return (neg ? "-" : "") + num + " B";
        }
        var exponent = Math.min(Math.floor(Math.log(num) / Math.log(1024)), units.length - 1);
        num = Number(num / Math.pow(1024, exponent));
        var unit = units[exponent];
        if (num >= 10 || num % 1 === 0) {
          return (neg ? "-" : "") + num.toFixed(0) + " " + unit;
        } else {
          return (neg ? "-" : "") + num.toFixed(1) + " " + unit;
        }
      };
    }
  });

  // ../node_modules/wildcard/index.js
  var require_wildcard = __commonJS({
    "../node_modules/wildcard/index.js"(exports, module) {
      "use strict";
      function WildcardMatcher(text, separator) {
        this.text = text = text || "";
        this.hasWild = ~text.indexOf("*");
        this.separator = separator;
        this.parts = text.split(separator);
      }
      WildcardMatcher.prototype.match = function(input) {
        var matches = true;
        var parts = this.parts;
        var ii;
        var partsCount = parts.length;
        var testParts;
        if (typeof input == "string" || input instanceof String) {
          if (!this.hasWild && this.text != input) {
            matches = false;
          } else {
            testParts = (input || "").split(this.separator);
            for (ii = 0; matches && ii < partsCount; ii++) {
              if (parts[ii] === "*") {
                continue;
              } else if (ii < testParts.length) {
                matches = parts[ii] === testParts[ii];
              } else {
                matches = false;
              }
            }
            matches = matches && testParts;
          }
        } else if (typeof input.splice == "function") {
          matches = [];
          for (ii = input.length; ii--; ) {
            if (this.match(input[ii])) {
              matches[matches.length] = input[ii];
            }
          }
        } else if (typeof input == "object") {
          matches = {};
          for (var key in input) {
            if (this.match(key)) {
              matches[key] = input[key];
            }
          }
        }
        return matches;
      };
      module.exports = function(text, test, separator) {
        var matcher = new WildcardMatcher(text, separator || /[\/\.]/);
        if (typeof test != "undefined") {
          return matcher.match(test);
        }
        return matcher;
      };
    }
  });

  // ../node_modules/mime-match/index.js
  var require_mime_match = __commonJS({
    "../node_modules/mime-match/index.js"(exports, module) {
      var wildcard = require_wildcard();
      var reMimePartSplit = /[\/\+\.]/;
      module.exports = function(target, pattern) {
        function test(pattern2) {
          var result = wildcard(pattern2, target, reMimePartSplit);
          return result && result.length >= 2;
        }
        return pattern ? test(pattern.split(";")[0]) : test;
      };
    }
  });

  // ../packages/@uppy/core/lib/Restricter.js
  var require_Restricter = __commonJS({
    "../packages/@uppy/core/lib/Restricter.js"(exports, module) {
      var prettierBytes = require_prettierBytes();
      var match = require_mime_match();
      var defaultOptions = {
        maxFileSize: null,
        minFileSize: null,
        maxTotalFileSize: null,
        maxNumberOfFiles: null,
        minNumberOfFiles: null,
        allowedFileTypes: null,
        requiredMetaFields: []
      };
      var RestrictionError = class extends Error {
        constructor() {
          super(...arguments);
          this.isRestriction = true;
        }
      };
      if (typeof AggregateError === "undefined") {
        globalThis.AggregateError = class AggregateError extends Error {
          constructor(errors, message) {
            super(message);
            this.errors = errors;
          }
        };
      }
      var Restricter = class {
        constructor(getOpts, i18n) {
          this.i18n = i18n;
          this.getOpts = () => {
            const opts = getOpts();
            if (opts.restrictions.allowedFileTypes != null && !Array.isArray(opts.restrictions.allowedFileTypes)) {
              throw new TypeError("`restrictions.allowedFileTypes` must be an array");
            }
            return opts;
          };
        }
        validate(file, files) {
          const {
            maxFileSize,
            minFileSize,
            maxTotalFileSize,
            maxNumberOfFiles,
            allowedFileTypes
          } = this.getOpts().restrictions;
          if (maxNumberOfFiles && files.length + 1 > maxNumberOfFiles) {
            throw new RestrictionError(`${this.i18n("youCanOnlyUploadX", {
              smart_count: maxNumberOfFiles
            })}`);
          }
          if (allowedFileTypes) {
            const isCorrectFileType = allowedFileTypes.some((type) => {
              if (type.includes("/")) {
                if (!file.type)
                  return false;
                return match(file.type.replace(/;.*?$/, ""), type);
              }
              if (type[0] === "." && file.extension) {
                return file.extension.toLowerCase() === type.slice(1).toLowerCase();
              }
              return false;
            });
            if (!isCorrectFileType) {
              const allowedFileTypesString = allowedFileTypes.join(", ");
              throw new RestrictionError(this.i18n("youCanOnlyUploadFileTypes", {
                types: allowedFileTypesString
              }));
            }
          }
          if (maxTotalFileSize && file.size != null) {
            const totalFilesSize = files.reduce((total, f2) => total + f2.size, file.size);
            if (totalFilesSize > maxTotalFileSize) {
              throw new RestrictionError(this.i18n("exceedsSize", {
                size: prettierBytes(maxTotalFileSize),
                file: file.name
              }));
            }
          }
          if (maxFileSize && file.size != null && file.size > maxFileSize) {
            throw new RestrictionError(this.i18n("exceedsSize", {
              size: prettierBytes(maxFileSize),
              file: file.name
            }));
          }
          if (minFileSize && file.size != null && file.size < minFileSize) {
            throw new RestrictionError(this.i18n("inferiorSize", {
              size: prettierBytes(minFileSize)
            }));
          }
        }
        validateMinNumberOfFiles(files) {
          const {
            minNumberOfFiles
          } = this.getOpts().restrictions;
          if (Object.keys(files).length < minNumberOfFiles) {
            throw new RestrictionError(this.i18n("youHaveToAtLeastSelectX", {
              smart_count: minNumberOfFiles
            }));
          }
        }
        getMissingRequiredMetaFields(file) {
          const error = new RestrictionError(this.i18n("missingRequiredMetaFieldOnFile", {
            fileName: file.name
          }));
          const {
            requiredMetaFields
          } = this.getOpts().restrictions;
          const own = Object.prototype.hasOwnProperty;
          const missingFields = [];
          for (const field of requiredMetaFields) {
            if (!own.call(file.meta, field) || file.meta[field] === "") {
              missingFields.push(field);
            }
          }
          return {
            missingFields,
            error
          };
        }
      };
      module.exports = {
        Restricter,
        defaultOptions,
        RestrictionError
      };
    }
  });

  // ../packages/@uppy/core/lib/locale.js
  var require_locale = __commonJS({
    "../packages/@uppy/core/lib/locale.js"(exports, module) {
      module.exports = {
        strings: {
          addBulkFilesFailed: {
            0: "Failed to add %{smart_count} file due to an internal error",
            1: "Failed to add %{smart_count} files due to internal errors"
          },
          youCanOnlyUploadX: {
            0: "You can only upload %{smart_count} file",
            1: "You can only upload %{smart_count} files"
          },
          youHaveToAtLeastSelectX: {
            0: "You have to select at least %{smart_count} file",
            1: "You have to select at least %{smart_count} files"
          },
          exceedsSize: "%{file} exceeds maximum allowed size of %{size}",
          missingRequiredMetaField: "Missing required meta fields",
          missingRequiredMetaFieldOnFile: "Missing required meta fields in %{fileName}",
          inferiorSize: "This file is smaller than the allowed size of %{size}",
          youCanOnlyUploadFileTypes: "You can only upload: %{types}",
          noMoreFilesAllowed: "Cannot add more files",
          noDuplicates: "Cannot add the duplicate file '%{fileName}', it already exists",
          companionError: "Connection with Companion failed",
          authAborted: "Authentication aborted",
          companionUnauthorizeHint: "To unauthorize to your %{provider} account, please go to %{url}",
          failedToUpload: "Failed to upload %{file}",
          noInternetConnection: "No Internet connection",
          connectedToInternet: "Connected to the Internet",
          noFilesFound: "You have no files or folders here",
          selectX: {
            0: "Select %{smart_count}",
            1: "Select %{smart_count}"
          },
          allFilesFromFolderNamed: "All files from folder %{name}",
          openFolderNamed: "Open folder %{name}",
          cancel: "Cancel",
          logOut: "Log out",
          filter: "Filter",
          resetFilter: "Reset filter",
          loading: "Loading...",
          authenticateWithTitle: "Please authenticate with %{pluginName} to select files",
          authenticateWith: "Connect to %{pluginName}",
          signInWithGoogle: "Sign in with Google",
          searchImages: "Search for images",
          enterTextToSearch: "Enter text to search for images",
          search: "Search",
          emptyFolderAdded: "No files were added from empty folder",
          folderAlreadyAdded: 'The folder "%{folder}" was already added',
          folderAdded: {
            0: "Added %{smart_count} file from %{folder}",
            1: "Added %{smart_count} files from %{folder}"
          }
        }
      };
    }
  });

  // ../packages/@uppy/core/lib/Uppy.js
  var require_Uppy = __commonJS({
    "../packages/@uppy/core/lib/Uppy.js"(exports, module) {
      "use strict";
      var _Symbol$for;
      var _Symbol$for2;
      function _classPrivateFieldLooseBase(receiver, privateKey) {
        if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
          throw new TypeError("attempted to use private field on non-instance");
        }
        return receiver;
      }
      var id = 0;
      function _classPrivateFieldLooseKey(name) {
        return "__private_" + id++ + "_" + name;
      }
      var Translator = require_Translator();
      var ee = require_namespace_emitter();
      var {
        nanoid
      } = require_non_secure();
      var throttle = require_lodash();
      var DefaultStore = require_lib();
      var getFileType = require_getFileType();
      var getFileNameAndExtension = require_getFileNameAndExtension();
      var generateFileID = require_generateFileID();
      var supportsUploadProgress = require_supportsUploadProgress();
      var getFileName = require_getFileName();
      var {
        justErrorsLogger,
        debugLogger
      } = require_loggers();
      var {
        Restricter,
        defaultOptions: defaultRestrictionOptions,
        RestrictionError
      } = require_Restricter();
      var locale = require_locale();
      var _plugins = /* @__PURE__ */ _classPrivateFieldLooseKey("plugins");
      var _restricter = /* @__PURE__ */ _classPrivateFieldLooseKey("restricter");
      var _storeUnsubscribe = /* @__PURE__ */ _classPrivateFieldLooseKey("storeUnsubscribe");
      var _emitter = /* @__PURE__ */ _classPrivateFieldLooseKey("emitter");
      var _preProcessors = /* @__PURE__ */ _classPrivateFieldLooseKey("preProcessors");
      var _uploaders = /* @__PURE__ */ _classPrivateFieldLooseKey("uploaders");
      var _postProcessors = /* @__PURE__ */ _classPrivateFieldLooseKey("postProcessors");
      var _informAndEmit = /* @__PURE__ */ _classPrivateFieldLooseKey("informAndEmit");
      var _checkRequiredMetaFieldsOnFile = /* @__PURE__ */ _classPrivateFieldLooseKey("checkRequiredMetaFieldsOnFile");
      var _checkRequiredMetaFields = /* @__PURE__ */ _classPrivateFieldLooseKey("checkRequiredMetaFields");
      var _assertNewUploadAllowed = /* @__PURE__ */ _classPrivateFieldLooseKey("assertNewUploadAllowed");
      var _checkAndCreateFileStateObject = /* @__PURE__ */ _classPrivateFieldLooseKey("checkAndCreateFileStateObject");
      var _startIfAutoProceed = /* @__PURE__ */ _classPrivateFieldLooseKey("startIfAutoProceed");
      var _addListeners = /* @__PURE__ */ _classPrivateFieldLooseKey("addListeners");
      var _updateOnlineStatus = /* @__PURE__ */ _classPrivateFieldLooseKey("updateOnlineStatus");
      var _createUpload = /* @__PURE__ */ _classPrivateFieldLooseKey("createUpload");
      var _getUpload = /* @__PURE__ */ _classPrivateFieldLooseKey("getUpload");
      var _removeUpload = /* @__PURE__ */ _classPrivateFieldLooseKey("removeUpload");
      var _runUpload = /* @__PURE__ */ _classPrivateFieldLooseKey("runUpload");
      _Symbol$for = Symbol.for("uppy test: getPlugins");
      _Symbol$for2 = Symbol.for("uppy test: createUpload");
      var Uppy2 = class {
        constructor(_opts) {
          Object.defineProperty(this, _runUpload, {
            value: _runUpload2
          });
          Object.defineProperty(this, _removeUpload, {
            value: _removeUpload2
          });
          Object.defineProperty(this, _getUpload, {
            value: _getUpload2
          });
          Object.defineProperty(this, _createUpload, {
            value: _createUpload2
          });
          Object.defineProperty(this, _addListeners, {
            value: _addListeners2
          });
          Object.defineProperty(this, _startIfAutoProceed, {
            value: _startIfAutoProceed2
          });
          Object.defineProperty(this, _checkAndCreateFileStateObject, {
            value: _checkAndCreateFileStateObject2
          });
          Object.defineProperty(this, _assertNewUploadAllowed, {
            value: _assertNewUploadAllowed2
          });
          Object.defineProperty(this, _checkRequiredMetaFields, {
            value: _checkRequiredMetaFields2
          });
          Object.defineProperty(this, _checkRequiredMetaFieldsOnFile, {
            value: _checkRequiredMetaFieldsOnFile2
          });
          Object.defineProperty(this, _informAndEmit, {
            value: _informAndEmit2
          });
          Object.defineProperty(this, _plugins, {
            writable: true,
            value: Object.create(null)
          });
          Object.defineProperty(this, _restricter, {
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, _storeUnsubscribe, {
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, _emitter, {
            writable: true,
            value: ee()
          });
          Object.defineProperty(this, _preProcessors, {
            writable: true,
            value: /* @__PURE__ */ new Set()
          });
          Object.defineProperty(this, _uploaders, {
            writable: true,
            value: /* @__PURE__ */ new Set()
          });
          Object.defineProperty(this, _postProcessors, {
            writable: true,
            value: /* @__PURE__ */ new Set()
          });
          Object.defineProperty(this, _updateOnlineStatus, {
            writable: true,
            value: this.updateOnlineStatus.bind(this)
          });
          this.defaultLocale = locale;
          const defaultOptions = {
            id: "uppy",
            autoProceed: false,
            allowMultipleUploads: true,
            allowMultipleUploadBatches: true,
            debug: false,
            restrictions: defaultRestrictionOptions,
            meta: {},
            onBeforeFileAdded: (currentFile) => currentFile,
            onBeforeUpload: (files) => files,
            store: DefaultStore(),
            logger: justErrorsLogger,
            infoTimeout: 5e3
          };
          this.opts = {
            ...defaultOptions,
            ..._opts,
            restrictions: {
              ...defaultOptions.restrictions,
              ..._opts && _opts.restrictions
            }
          };
          if (_opts && _opts.logger && _opts.debug) {
            this.log("You are using a custom `logger`, but also set `debug: true`, which uses built-in logger to output logs to console. Ignoring `debug: true` and using your custom `logger`.", "warning");
          } else if (_opts && _opts.debug) {
            this.opts.logger = debugLogger;
          }
          this.log(`Using Core v${this.constructor.VERSION}`);
          this.i18nInit();
          this.calculateProgress = throttle(this.calculateProgress.bind(this), 500, {
            leading: true,
            trailing: true
          });
          this.store = this.opts.store;
          this.setState({
            plugins: {},
            files: {},
            currentUploads: {},
            allowNewUpload: true,
            capabilities: {
              uploadProgress: supportsUploadProgress(),
              individualCancellation: true,
              resumableUploads: false
            },
            totalProgress: 0,
            meta: {
              ...this.opts.meta
            },
            info: [],
            recoveredState: null
          });
          _classPrivateFieldLooseBase(this, _restricter)[_restricter] = new Restricter(() => this.opts, this.i18n);
          _classPrivateFieldLooseBase(this, _storeUnsubscribe)[_storeUnsubscribe] = this.store.subscribe((prevState, nextState, patch) => {
            this.emit("state-update", prevState, nextState, patch);
            this.updateAll(nextState);
          });
          if (this.opts.debug && typeof window !== "undefined") {
            window[this.opts.id] = this;
          }
          _classPrivateFieldLooseBase(this, _addListeners)[_addListeners]();
        }
        emit(event) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          _classPrivateFieldLooseBase(this, _emitter)[_emitter].emit(event, ...args);
        }
        on(event, callback) {
          _classPrivateFieldLooseBase(this, _emitter)[_emitter].on(event, callback);
          return this;
        }
        once(event, callback) {
          _classPrivateFieldLooseBase(this, _emitter)[_emitter].once(event, callback);
          return this;
        }
        off(event, callback) {
          _classPrivateFieldLooseBase(this, _emitter)[_emitter].off(event, callback);
          return this;
        }
        updateAll(state) {
          this.iteratePlugins((plugin) => {
            plugin.update(state);
          });
        }
        setState(patch) {
          this.store.setState(patch);
        }
        getState() {
          return this.store.getState();
        }
        get state() {
          return this.getState();
        }
        setFileState(fileID, state) {
          if (!this.getState().files[fileID]) {
            throw new Error(`Can\u2019t set state for ${fileID} (the file could have been removed)`);
          }
          this.setState({
            files: {
              ...this.getState().files,
              [fileID]: {
                ...this.getState().files[fileID],
                ...state
              }
            }
          });
        }
        i18nInit() {
          const translator = new Translator([this.defaultLocale, this.opts.locale]);
          this.i18n = translator.translate.bind(translator);
          this.i18nArray = translator.translateArray.bind(translator);
          this.locale = translator.locale;
        }
        setOptions(newOpts) {
          this.opts = {
            ...this.opts,
            ...newOpts,
            restrictions: {
              ...this.opts.restrictions,
              ...newOpts && newOpts.restrictions
            }
          };
          if (newOpts.meta) {
            this.setMeta(newOpts.meta);
          }
          this.i18nInit();
          if (newOpts.locale) {
            this.iteratePlugins((plugin) => {
              plugin.setOptions();
            });
          }
          this.setState();
        }
        resetProgress() {
          const defaultProgress = {
            percentage: 0,
            bytesUploaded: 0,
            uploadComplete: false,
            uploadStarted: null
          };
          const files = {
            ...this.getState().files
          };
          const updatedFiles = {};
          Object.keys(files).forEach((fileID) => {
            const updatedFile = {
              ...files[fileID]
            };
            updatedFile.progress = {
              ...updatedFile.progress,
              ...defaultProgress
            };
            updatedFiles[fileID] = updatedFile;
          });
          this.setState({
            files: updatedFiles,
            totalProgress: 0
          });
          this.emit("reset-progress");
        }
        addPreProcessor(fn) {
          _classPrivateFieldLooseBase(this, _preProcessors)[_preProcessors].add(fn);
        }
        removePreProcessor(fn) {
          return _classPrivateFieldLooseBase(this, _preProcessors)[_preProcessors].delete(fn);
        }
        addPostProcessor(fn) {
          _classPrivateFieldLooseBase(this, _postProcessors)[_postProcessors].add(fn);
        }
        removePostProcessor(fn) {
          return _classPrivateFieldLooseBase(this, _postProcessors)[_postProcessors].delete(fn);
        }
        addUploader(fn) {
          _classPrivateFieldLooseBase(this, _uploaders)[_uploaders].add(fn);
        }
        removeUploader(fn) {
          return _classPrivateFieldLooseBase(this, _uploaders)[_uploaders].delete(fn);
        }
        setMeta(data) {
          const updatedMeta = {
            ...this.getState().meta,
            ...data
          };
          const updatedFiles = {
            ...this.getState().files
          };
          Object.keys(updatedFiles).forEach((fileID) => {
            updatedFiles[fileID] = {
              ...updatedFiles[fileID],
              meta: {
                ...updatedFiles[fileID].meta,
                ...data
              }
            };
          });
          this.log("Adding metadata:");
          this.log(data);
          this.setState({
            meta: updatedMeta,
            files: updatedFiles
          });
        }
        setFileMeta(fileID, data) {
          const updatedFiles = {
            ...this.getState().files
          };
          if (!updatedFiles[fileID]) {
            this.log("Was trying to set metadata for a file that has been removed: ", fileID);
            return;
          }
          const newMeta = {
            ...updatedFiles[fileID].meta,
            ...data
          };
          updatedFiles[fileID] = {
            ...updatedFiles[fileID],
            meta: newMeta
          };
          this.setState({
            files: updatedFiles
          });
        }
        getFile(fileID) {
          return this.getState().files[fileID];
        }
        getFiles() {
          const {
            files
          } = this.getState();
          return Object.values(files);
        }
        getObjectOfFilesPerState() {
          const {
            files: filesObject,
            totalProgress,
            error
          } = this.getState();
          const files = Object.values(filesObject);
          const inProgressFiles = files.filter((_ref) => {
            let {
              progress
            } = _ref;
            return !progress.uploadComplete && progress.uploadStarted;
          });
          const newFiles = files.filter((file) => !file.progress.uploadStarted);
          const startedFiles = files.filter((file) => file.progress.uploadStarted || file.progress.preprocess || file.progress.postprocess);
          const uploadStartedFiles = files.filter((file) => file.progress.uploadStarted);
          const pausedFiles = files.filter((file) => file.isPaused);
          const completeFiles = files.filter((file) => file.progress.uploadComplete);
          const erroredFiles = files.filter((file) => file.error);
          const inProgressNotPausedFiles = inProgressFiles.filter((file) => !file.isPaused);
          const processingFiles = files.filter((file) => file.progress.preprocess || file.progress.postprocess);
          return {
            newFiles,
            startedFiles,
            uploadStartedFiles,
            pausedFiles,
            completeFiles,
            erroredFiles,
            inProgressFiles,
            inProgressNotPausedFiles,
            processingFiles,
            isUploadStarted: uploadStartedFiles.length > 0,
            isAllComplete: totalProgress === 100 && completeFiles.length === files.length && processingFiles.length === 0,
            isAllErrored: !!error && erroredFiles.length === files.length,
            isAllPaused: inProgressFiles.length !== 0 && pausedFiles.length === inProgressFiles.length,
            isUploadInProgress: inProgressFiles.length > 0,
            isSomeGhost: files.some((file) => file.isGhost)
          };
        }
        validateRestrictions(file, files) {
          if (files === void 0) {
            files = this.getFiles();
          }
          try {
            _classPrivateFieldLooseBase(this, _restricter)[_restricter].validate(file, files);
            return {
              result: true
            };
          } catch (err) {
            return {
              result: false,
              reason: err.message
            };
          }
        }
        checkIfFileAlreadyExists(fileID) {
          const {
            files
          } = this.getState();
          if (files[fileID] && !files[fileID].isGhost) {
            return true;
          }
          return false;
        }
        addFile(file) {
          _classPrivateFieldLooseBase(this, _assertNewUploadAllowed)[_assertNewUploadAllowed](file);
          const {
            files
          } = this.getState();
          let newFile = _classPrivateFieldLooseBase(this, _checkAndCreateFileStateObject)[_checkAndCreateFileStateObject](files, file);
          if (files[newFile.id] && files[newFile.id].isGhost) {
            newFile = {
              ...files[newFile.id],
              data: file.data,
              isGhost: false
            };
            this.log(`Replaced the blob in the restored ghost file: ${newFile.name}, ${newFile.id}`);
          }
          this.setState({
            files: {
              ...files,
              [newFile.id]: newFile
            }
          });
          this.emit("file-added", newFile);
          this.emit("files-added", [newFile]);
          this.log(`Added file: ${newFile.name}, ${newFile.id}, mime type: ${newFile.type}`);
          _classPrivateFieldLooseBase(this, _startIfAutoProceed)[_startIfAutoProceed]();
          return newFile.id;
        }
        addFiles(fileDescriptors) {
          _classPrivateFieldLooseBase(this, _assertNewUploadAllowed)[_assertNewUploadAllowed]();
          const files = {
            ...this.getState().files
          };
          const newFiles = [];
          const errors = [];
          for (let i2 = 0; i2 < fileDescriptors.length; i2++) {
            try {
              let newFile = _classPrivateFieldLooseBase(this, _checkAndCreateFileStateObject)[_checkAndCreateFileStateObject](files, fileDescriptors[i2]);
              if (files[newFile.id] && files[newFile.id].isGhost) {
                newFile = {
                  ...files[newFile.id],
                  data: fileDescriptors[i2].data,
                  isGhost: false
                };
                this.log(`Replaced blob in a ghost file: ${newFile.name}, ${newFile.id}`);
              }
              files[newFile.id] = newFile;
              newFiles.push(newFile);
            } catch (err) {
              if (!err.isRestriction) {
                errors.push(err);
              }
            }
          }
          this.setState({
            files
          });
          newFiles.forEach((newFile) => {
            this.emit("file-added", newFile);
          });
          this.emit("files-added", newFiles);
          if (newFiles.length > 5) {
            this.log(`Added batch of ${newFiles.length} files`);
          } else {
            Object.keys(newFiles).forEach((fileID) => {
              this.log(`Added file: ${newFiles[fileID].name}
 id: ${newFiles[fileID].id}
 type: ${newFiles[fileID].type}`);
            });
          }
          if (newFiles.length > 0) {
            _classPrivateFieldLooseBase(this, _startIfAutoProceed)[_startIfAutoProceed]();
          }
          if (errors.length > 0) {
            let message = "Multiple errors occurred while adding files:\n";
            errors.forEach((subError) => {
              message += `
 * ${subError.message}`;
            });
            this.info({
              message: this.i18n("addBulkFilesFailed", {
                smart_count: errors.length
              }),
              details: message
            }, "error", this.opts.infoTimeout);
            if (typeof AggregateError === "function") {
              throw new AggregateError(errors, message);
            } else {
              const err = new Error(message);
              err.errors = errors;
              throw err;
            }
          }
        }
        removeFiles(fileIDs, reason) {
          const {
            files,
            currentUploads
          } = this.getState();
          const updatedFiles = {
            ...files
          };
          const updatedUploads = {
            ...currentUploads
          };
          const removedFiles = Object.create(null);
          fileIDs.forEach((fileID) => {
            if (files[fileID]) {
              removedFiles[fileID] = files[fileID];
              delete updatedFiles[fileID];
            }
          });
          function fileIsNotRemoved(uploadFileID) {
            return removedFiles[uploadFileID] === void 0;
          }
          Object.keys(updatedUploads).forEach((uploadID) => {
            const newFileIDs = currentUploads[uploadID].fileIDs.filter(fileIsNotRemoved);
            if (newFileIDs.length === 0) {
              delete updatedUploads[uploadID];
              return;
            }
            updatedUploads[uploadID] = {
              ...currentUploads[uploadID],
              fileIDs: newFileIDs
            };
          });
          const stateUpdate = {
            currentUploads: updatedUploads,
            files: updatedFiles
          };
          if (Object.keys(updatedFiles).length === 0) {
            stateUpdate.allowNewUpload = true;
            stateUpdate.error = null;
            stateUpdate.recoveredState = null;
          }
          this.setState(stateUpdate);
          this.calculateTotalProgress();
          const removedFileIDs = Object.keys(removedFiles);
          removedFileIDs.forEach((fileID) => {
            this.emit("file-removed", removedFiles[fileID], reason);
          });
          if (removedFileIDs.length > 5) {
            this.log(`Removed ${removedFileIDs.length} files`);
          } else {
            this.log(`Removed files: ${removedFileIDs.join(", ")}`);
          }
        }
        removeFile(fileID, reason) {
          if (reason === void 0) {
            reason = null;
          }
          this.removeFiles([fileID], reason);
        }
        pauseResume(fileID) {
          if (!this.getState().capabilities.resumableUploads || this.getFile(fileID).uploadComplete) {
            return void 0;
          }
          const wasPaused = this.getFile(fileID).isPaused || false;
          const isPaused = !wasPaused;
          this.setFileState(fileID, {
            isPaused
          });
          this.emit("upload-pause", fileID, isPaused);
          return isPaused;
        }
        pauseAll() {
          const updatedFiles = {
            ...this.getState().files
          };
          const inProgressUpdatedFiles = Object.keys(updatedFiles).filter((file) => {
            return !updatedFiles[file].progress.uploadComplete && updatedFiles[file].progress.uploadStarted;
          });
          inProgressUpdatedFiles.forEach((file) => {
            const updatedFile = {
              ...updatedFiles[file],
              isPaused: true
            };
            updatedFiles[file] = updatedFile;
          });
          this.setState({
            files: updatedFiles
          });
          this.emit("pause-all");
        }
        resumeAll() {
          const updatedFiles = {
            ...this.getState().files
          };
          const inProgressUpdatedFiles = Object.keys(updatedFiles).filter((file) => {
            return !updatedFiles[file].progress.uploadComplete && updatedFiles[file].progress.uploadStarted;
          });
          inProgressUpdatedFiles.forEach((file) => {
            const updatedFile = {
              ...updatedFiles[file],
              isPaused: false,
              error: null
            };
            updatedFiles[file] = updatedFile;
          });
          this.setState({
            files: updatedFiles
          });
          this.emit("resume-all");
        }
        retryAll() {
          const updatedFiles = {
            ...this.getState().files
          };
          const filesToRetry = Object.keys(updatedFiles).filter((file) => {
            return updatedFiles[file].error;
          });
          filesToRetry.forEach((file) => {
            const updatedFile = {
              ...updatedFiles[file],
              isPaused: false,
              error: null
            };
            updatedFiles[file] = updatedFile;
          });
          this.setState({
            files: updatedFiles,
            error: null
          });
          this.emit("retry-all", filesToRetry);
          if (filesToRetry.length === 0) {
            return Promise.resolve({
              successful: [],
              failed: []
            });
          }
          const uploadID = _classPrivateFieldLooseBase(this, _createUpload)[_createUpload](filesToRetry, {
            forceAllowNewUpload: true
          });
          return _classPrivateFieldLooseBase(this, _runUpload)[_runUpload](uploadID);
        }
        cancelAll(_temp) {
          let {
            reason = "user"
          } = _temp === void 0 ? {} : _temp;
          this.emit("cancel-all", {
            reason
          });
          if (reason === "user") {
            const {
              files
            } = this.getState();
            const fileIDs = Object.keys(files);
            if (fileIDs.length) {
              this.removeFiles(fileIDs, "cancel-all");
            }
            this.setState({
              totalProgress: 0,
              error: null,
              recoveredState: null
            });
          }
        }
        retryUpload(fileID) {
          this.setFileState(fileID, {
            error: null,
            isPaused: false
          });
          this.emit("upload-retry", fileID);
          const uploadID = _classPrivateFieldLooseBase(this, _createUpload)[_createUpload]([fileID], {
            forceAllowNewUpload: true
          });
          return _classPrivateFieldLooseBase(this, _runUpload)[_runUpload](uploadID);
        }
        reset() {
          this.cancelAll(...arguments);
        }
        logout() {
          this.iteratePlugins((plugin) => {
            if (plugin.provider && plugin.provider.logout) {
              plugin.provider.logout();
            }
          });
        }
        calculateProgress(file, data) {
          if (file == null || !this.getFile(file.id)) {
            this.log(`Not setting progress for a file that has been removed: ${file == null ? void 0 : file.id}`);
            return;
          }
          const canHavePercentage = Number.isFinite(data.bytesTotal) && data.bytesTotal > 0;
          this.setFileState(file.id, {
            progress: {
              ...this.getFile(file.id).progress,
              bytesUploaded: data.bytesUploaded,
              bytesTotal: data.bytesTotal,
              percentage: canHavePercentage ? Math.round(data.bytesUploaded / data.bytesTotal * 100) : 0
            }
          });
          this.calculateTotalProgress();
        }
        calculateTotalProgress() {
          const files = this.getFiles();
          const inProgress = files.filter((file) => {
            return file.progress.uploadStarted || file.progress.preprocess || file.progress.postprocess;
          });
          if (inProgress.length === 0) {
            this.emit("progress", 0);
            this.setState({
              totalProgress: 0
            });
            return;
          }
          const sizedFiles = inProgress.filter((file) => file.progress.bytesTotal != null);
          const unsizedFiles = inProgress.filter((file) => file.progress.bytesTotal == null);
          if (sizedFiles.length === 0) {
            const progressMax = inProgress.length * 100;
            const currentProgress = unsizedFiles.reduce((acc, file) => {
              return acc + file.progress.percentage;
            }, 0);
            const totalProgress2 = Math.round(currentProgress / progressMax * 100);
            this.setState({
              totalProgress: totalProgress2
            });
            return;
          }
          let totalSize = sizedFiles.reduce((acc, file) => {
            return acc + file.progress.bytesTotal;
          }, 0);
          const averageSize = totalSize / sizedFiles.length;
          totalSize += averageSize * unsizedFiles.length;
          let uploadedSize = 0;
          sizedFiles.forEach((file) => {
            uploadedSize += file.progress.bytesUploaded;
          });
          unsizedFiles.forEach((file) => {
            uploadedSize += averageSize * (file.progress.percentage || 0) / 100;
          });
          let totalProgress = totalSize === 0 ? 0 : Math.round(uploadedSize / totalSize * 100);
          if (totalProgress > 100) {
            totalProgress = 100;
          }
          this.setState({
            totalProgress
          });
          this.emit("progress", totalProgress);
        }
        updateOnlineStatus() {
          const online = typeof window.navigator.onLine !== "undefined" ? window.navigator.onLine : true;
          if (!online) {
            this.emit("is-offline");
            this.info(this.i18n("noInternetConnection"), "error", 0);
            this.wasOffline = true;
          } else {
            this.emit("is-online");
            if (this.wasOffline) {
              this.emit("back-online");
              this.info(this.i18n("connectedToInternet"), "success", 3e3);
              this.wasOffline = false;
            }
          }
        }
        getID() {
          return this.opts.id;
        }
        use(Plugin, opts) {
          if (typeof Plugin !== "function") {
            const msg = `Expected a plugin class, but got ${Plugin === null ? "null" : typeof Plugin}. Please verify that the plugin was imported and spelled correctly.`;
            throw new TypeError(msg);
          }
          const plugin = new Plugin(this, opts);
          const pluginId = plugin.id;
          if (!pluginId) {
            throw new Error("Your plugin must have an id");
          }
          if (!plugin.type) {
            throw new Error("Your plugin must have a type");
          }
          const existsPluginAlready = this.getPlugin(pluginId);
          if (existsPluginAlready) {
            const msg = `Already found a plugin named '${existsPluginAlready.id}'. Tried to use: '${pluginId}'.
Uppy plugins must have unique \`id\` options. See https://uppy.io/docs/plugins/#id.`;
            throw new Error(msg);
          }
          if (Plugin.VERSION) {
            this.log(`Using ${pluginId} v${Plugin.VERSION}`);
          }
          if (plugin.type in _classPrivateFieldLooseBase(this, _plugins)[_plugins]) {
            _classPrivateFieldLooseBase(this, _plugins)[_plugins][plugin.type].push(plugin);
          } else {
            _classPrivateFieldLooseBase(this, _plugins)[_plugins][plugin.type] = [plugin];
          }
          plugin.install();
          return this;
        }
        getPlugin(id2) {
          for (const plugins of Object.values(_classPrivateFieldLooseBase(this, _plugins)[_plugins])) {
            const foundPlugin = plugins.find((plugin) => plugin.id === id2);
            if (foundPlugin != null)
              return foundPlugin;
          }
          return void 0;
        }
        [_Symbol$for](type) {
          return _classPrivateFieldLooseBase(this, _plugins)[_plugins][type];
        }
        iteratePlugins(method) {
          Object.values(_classPrivateFieldLooseBase(this, _plugins)[_plugins]).flat(1).forEach(method);
        }
        removePlugin(instance) {
          this.log(`Removing plugin ${instance.id}`);
          this.emit("plugin-remove", instance);
          if (instance.uninstall) {
            instance.uninstall();
          }
          const list = _classPrivateFieldLooseBase(this, _plugins)[_plugins][instance.type];
          const index = list.findIndex((item) => item.id === instance.id);
          if (index !== -1) {
            list.splice(index, 1);
          }
          const state = this.getState();
          const updatedState = {
            plugins: {
              ...state.plugins,
              [instance.id]: void 0
            }
          };
          this.setState(updatedState);
        }
        close(_temp2) {
          let {
            reason
          } = _temp2 === void 0 ? {} : _temp2;
          this.log(`Closing Uppy instance ${this.opts.id}: removing all files and uninstalling plugins`);
          this.cancelAll({
            reason
          });
          _classPrivateFieldLooseBase(this, _storeUnsubscribe)[_storeUnsubscribe]();
          this.iteratePlugins((plugin) => {
            this.removePlugin(plugin);
          });
          if (typeof window !== "undefined" && window.removeEventListener) {
            window.removeEventListener("online", _classPrivateFieldLooseBase(this, _updateOnlineStatus)[_updateOnlineStatus]);
            window.removeEventListener("offline", _classPrivateFieldLooseBase(this, _updateOnlineStatus)[_updateOnlineStatus]);
          }
        }
        hideInfo() {
          const {
            info
          } = this.getState();
          this.setState({
            info: info.slice(1)
          });
          this.emit("info-hidden");
        }
        info(message, type, duration) {
          if (type === void 0) {
            type = "info";
          }
          if (duration === void 0) {
            duration = 3e3;
          }
          const isComplexMessage = typeof message === "object";
          this.setState({
            info: [...this.getState().info, {
              type,
              message: isComplexMessage ? message.message : message,
              details: isComplexMessage ? message.details : null
            }]
          });
          setTimeout(() => this.hideInfo(), duration);
          this.emit("info-visible");
        }
        log(message, type) {
          const {
            logger
          } = this.opts;
          switch (type) {
            case "error":
              logger.error(message);
              break;
            case "warning":
              logger.warn(message);
              break;
            default:
              logger.debug(message);
              break;
          }
        }
        restore(uploadID) {
          this.log(`Core: attempting to restore upload "${uploadID}"`);
          if (!this.getState().currentUploads[uploadID]) {
            _classPrivateFieldLooseBase(this, _removeUpload)[_removeUpload](uploadID);
            return Promise.reject(new Error("Nonexistent upload"));
          }
          return _classPrivateFieldLooseBase(this, _runUpload)[_runUpload](uploadID);
        }
        [_Symbol$for2]() {
          return _classPrivateFieldLooseBase(this, _createUpload)[_createUpload](...arguments);
        }
        addResultData(uploadID, data) {
          if (!_classPrivateFieldLooseBase(this, _getUpload)[_getUpload](uploadID)) {
            this.log(`Not setting result for an upload that has been removed: ${uploadID}`);
            return;
          }
          const {
            currentUploads
          } = this.getState();
          const currentUpload = {
            ...currentUploads[uploadID],
            result: {
              ...currentUploads[uploadID].result,
              ...data
            }
          };
          this.setState({
            currentUploads: {
              ...currentUploads,
              [uploadID]: currentUpload
            }
          });
        }
        upload() {
          var _classPrivateFieldLoo;
          if (!((_classPrivateFieldLoo = _classPrivateFieldLooseBase(this, _plugins)[_plugins].uploader) != null && _classPrivateFieldLoo.length)) {
            this.log("No uploader type plugins are used", "warning");
          }
          let {
            files
          } = this.getState();
          const onBeforeUploadResult = this.opts.onBeforeUpload(files);
          if (onBeforeUploadResult === false) {
            return Promise.reject(new Error("Not starting the upload because onBeforeUpload returned false"));
          }
          if (onBeforeUploadResult && typeof onBeforeUploadResult === "object") {
            files = onBeforeUploadResult;
            this.setState({
              files
            });
          }
          return Promise.resolve().then(() => _classPrivateFieldLooseBase(this, _restricter)[_restricter].validateMinNumberOfFiles(files)).catch((err) => {
            _classPrivateFieldLooseBase(this, _informAndEmit)[_informAndEmit](err);
            throw err;
          }).then(() => {
            if (!_classPrivateFieldLooseBase(this, _checkRequiredMetaFields)[_checkRequiredMetaFields](files)) {
              throw new RestrictionError(this.i18n("missingRequiredMetaField"));
            }
          }).catch((err) => {
            throw err;
          }).then(() => {
            const {
              currentUploads
            } = this.getState();
            const currentlyUploadingFiles = Object.values(currentUploads).flatMap((curr) => curr.fileIDs);
            const waitingFileIDs = [];
            Object.keys(files).forEach((fileID) => {
              const file = this.getFile(fileID);
              if (!file.progress.uploadStarted && currentlyUploadingFiles.indexOf(fileID) === -1) {
                waitingFileIDs.push(file.id);
              }
            });
            const uploadID = _classPrivateFieldLooseBase(this, _createUpload)[_createUpload](waitingFileIDs);
            return _classPrivateFieldLooseBase(this, _runUpload)[_runUpload](uploadID);
          }).catch((err) => {
            this.emit("error", err);
            this.log(err, "error");
            throw err;
          });
        }
      };
      function _informAndEmit2(error, file) {
        const {
          message,
          details = ""
        } = error;
        if (error.isRestriction) {
          this.emit("restriction-failed", file, error);
        } else {
          this.emit("error", error);
        }
        this.info({
          message,
          details
        }, "error", this.opts.infoTimeout);
        this.log(`${message} ${details}`.trim(), "error");
      }
      function _checkRequiredMetaFieldsOnFile2(file) {
        const {
          missingFields,
          error
        } = _classPrivateFieldLooseBase(this, _restricter)[_restricter].getMissingRequiredMetaFields(file);
        if (missingFields.length > 0) {
          this.setFileState(file.id, {
            missingRequiredMetaFields: missingFields
          });
          this.log(error.message);
          this.emit("restriction-failed", file, error);
          return false;
        }
        return true;
      }
      function _checkRequiredMetaFields2(files) {
        let success = true;
        for (const file of Object.values(files)) {
          if (!_classPrivateFieldLooseBase(this, _checkRequiredMetaFieldsOnFile)[_checkRequiredMetaFieldsOnFile](file)) {
            success = false;
          }
        }
        return success;
      }
      function _assertNewUploadAllowed2(file) {
        const {
          allowNewUpload
        } = this.getState();
        if (allowNewUpload === false) {
          const error = new RestrictionError(this.i18n("noMoreFilesAllowed"));
          _classPrivateFieldLooseBase(this, _informAndEmit)[_informAndEmit](error, file);
          throw error;
        }
      }
      function _checkAndCreateFileStateObject2(files, fileDescriptor) {
        const fileType = getFileType(fileDescriptor);
        const fileName = getFileName(fileType, fileDescriptor);
        const fileExtension = getFileNameAndExtension(fileName).extension;
        const isRemote = Boolean(fileDescriptor.isRemote);
        const fileID = generateFileID({
          ...fileDescriptor,
          type: fileType
        });
        if (this.checkIfFileAlreadyExists(fileID)) {
          const error = new RestrictionError(this.i18n("noDuplicates", {
            fileName
          }));
          _classPrivateFieldLooseBase(this, _informAndEmit)[_informAndEmit](error, fileDescriptor);
          throw error;
        }
        const meta = fileDescriptor.meta || {};
        meta.name = fileName;
        meta.type = fileType;
        const size = Number.isFinite(fileDescriptor.data.size) ? fileDescriptor.data.size : null;
        let newFile = {
          source: fileDescriptor.source || "",
          id: fileID,
          name: fileName,
          extension: fileExtension || "",
          meta: {
            ...this.getState().meta,
            ...meta
          },
          type: fileType,
          data: fileDescriptor.data,
          progress: {
            percentage: 0,
            bytesUploaded: 0,
            bytesTotal: size,
            uploadComplete: false,
            uploadStarted: null
          },
          size,
          isRemote,
          remote: fileDescriptor.remote || "",
          preview: fileDescriptor.preview
        };
        const onBeforeFileAddedResult = this.opts.onBeforeFileAdded(newFile, files);
        if (onBeforeFileAddedResult === false) {
          const error = new RestrictionError("Cannot add the file because onBeforeFileAdded returned false.");
          this.emit("restriction-failed", fileDescriptor, error);
          throw error;
        } else if (typeof onBeforeFileAddedResult === "object" && onBeforeFileAddedResult !== null) {
          newFile = onBeforeFileAddedResult;
        }
        try {
          const filesArray = Object.keys(files).map((i2) => files[i2]);
          _classPrivateFieldLooseBase(this, _restricter)[_restricter].validate(newFile, filesArray);
        } catch (err) {
          _classPrivateFieldLooseBase(this, _informAndEmit)[_informAndEmit](err, newFile);
          throw err;
        }
        return newFile;
      }
      function _startIfAutoProceed2() {
        if (this.opts.autoProceed && !this.scheduledAutoProceed) {
          this.scheduledAutoProceed = setTimeout(() => {
            this.scheduledAutoProceed = null;
            this.upload().catch((err) => {
              if (!err.isRestriction) {
                this.log(err.stack || err.message || err);
              }
            });
          }, 4);
        }
      }
      function _addListeners2() {
        const errorHandler = (error, file, response) => {
          let errorMsg = error.message || "Unknown error";
          if (error.details) {
            errorMsg += ` ${error.details}`;
          }
          this.setState({
            error: errorMsg
          });
          if (file != null && file.id in this.getState().files) {
            this.setFileState(file.id, {
              error: errorMsg,
              response
            });
          }
        };
        this.on("error", errorHandler);
        this.on("upload-error", (file, error, response) => {
          errorHandler(error, file, response);
          if (typeof error === "object" && error.message) {
            const newError = new Error(error.message);
            newError.details = error.message;
            if (error.details) {
              newError.details += ` ${error.details}`;
            }
            newError.message = this.i18n("failedToUpload", {
              file: file.name
            });
            _classPrivateFieldLooseBase(this, _informAndEmit)[_informAndEmit](newError);
          } else {
            _classPrivateFieldLooseBase(this, _informAndEmit)[_informAndEmit](error);
          }
        });
        this.on("upload", () => {
          this.setState({
            error: null
          });
        });
        this.on("upload-started", (file) => {
          if (file == null || !this.getFile(file.id)) {
            this.log(`Not setting progress for a file that has been removed: ${file == null ? void 0 : file.id}`);
            return;
          }
          this.setFileState(file.id, {
            progress: {
              uploadStarted: Date.now(),
              uploadComplete: false,
              percentage: 0,
              bytesUploaded: 0,
              bytesTotal: file.size
            }
          });
        });
        this.on("upload-progress", this.calculateProgress);
        this.on("upload-success", (file, uploadResp) => {
          if (file == null || !this.getFile(file.id)) {
            this.log(`Not setting progress for a file that has been removed: ${file == null ? void 0 : file.id}`);
            return;
          }
          const currentProgress = this.getFile(file.id).progress;
          this.setFileState(file.id, {
            progress: {
              ...currentProgress,
              postprocess: _classPrivateFieldLooseBase(this, _postProcessors)[_postProcessors].size > 0 ? {
                mode: "indeterminate"
              } : null,
              uploadComplete: true,
              percentage: 100,
              bytesUploaded: currentProgress.bytesTotal
            },
            response: uploadResp,
            uploadURL: uploadResp.uploadURL,
            isPaused: false
          });
          if (file.size == null) {
            this.setFileState(file.id, {
              size: uploadResp.bytesUploaded || currentProgress.bytesTotal
            });
          }
          this.calculateTotalProgress();
        });
        this.on("preprocess-progress", (file, progress) => {
          if (file == null || !this.getFile(file.id)) {
            this.log(`Not setting progress for a file that has been removed: ${file == null ? void 0 : file.id}`);
            return;
          }
          this.setFileState(file.id, {
            progress: {
              ...this.getFile(file.id).progress,
              preprocess: progress
            }
          });
        });
        this.on("preprocess-complete", (file) => {
          if (file == null || !this.getFile(file.id)) {
            this.log(`Not setting progress for a file that has been removed: ${file == null ? void 0 : file.id}`);
            return;
          }
          const files = {
            ...this.getState().files
          };
          files[file.id] = {
            ...files[file.id],
            progress: {
              ...files[file.id].progress
            }
          };
          delete files[file.id].progress.preprocess;
          this.setState({
            files
          });
        });
        this.on("postprocess-progress", (file, progress) => {
          if (file == null || !this.getFile(file.id)) {
            this.log(`Not setting progress for a file that has been removed: ${file == null ? void 0 : file.id}`);
            return;
          }
          this.setFileState(file.id, {
            progress: {
              ...this.getState().files[file.id].progress,
              postprocess: progress
            }
          });
        });
        this.on("postprocess-complete", (file) => {
          if (file == null || !this.getFile(file.id)) {
            this.log(`Not setting progress for a file that has been removed: ${file == null ? void 0 : file.id}`);
            return;
          }
          const files = {
            ...this.getState().files
          };
          files[file.id] = {
            ...files[file.id],
            progress: {
              ...files[file.id].progress
            }
          };
          delete files[file.id].progress.postprocess;
          this.setState({
            files
          });
        });
        this.on("restored", () => {
          this.calculateTotalProgress();
        });
        this.on("dashboard:file-edit-complete", (file) => {
          if (file) {
            _classPrivateFieldLooseBase(this, _checkRequiredMetaFieldsOnFile)[_checkRequiredMetaFieldsOnFile](file);
          }
        });
        if (typeof window !== "undefined" && window.addEventListener) {
          window.addEventListener("online", _classPrivateFieldLooseBase(this, _updateOnlineStatus)[_updateOnlineStatus]);
          window.addEventListener("offline", _classPrivateFieldLooseBase(this, _updateOnlineStatus)[_updateOnlineStatus]);
          setTimeout(_classPrivateFieldLooseBase(this, _updateOnlineStatus)[_updateOnlineStatus], 3e3);
        }
      }
      function _createUpload2(fileIDs, opts) {
        if (opts === void 0) {
          opts = {};
        }
        const {
          forceAllowNewUpload = false
        } = opts;
        const {
          allowNewUpload,
          currentUploads
        } = this.getState();
        if (!allowNewUpload && !forceAllowNewUpload) {
          throw new Error("Cannot create a new upload: already uploading.");
        }
        const uploadID = nanoid();
        this.emit("upload", {
          id: uploadID,
          fileIDs
        });
        this.setState({
          allowNewUpload: this.opts.allowMultipleUploadBatches !== false && this.opts.allowMultipleUploads !== false,
          currentUploads: {
            ...currentUploads,
            [uploadID]: {
              fileIDs,
              step: 0,
              result: {}
            }
          }
        });
        return uploadID;
      }
      function _getUpload2(uploadID) {
        const {
          currentUploads
        } = this.getState();
        return currentUploads[uploadID];
      }
      function _removeUpload2(uploadID) {
        const currentUploads = {
          ...this.getState().currentUploads
        };
        delete currentUploads[uploadID];
        this.setState({
          currentUploads
        });
      }
      async function _runUpload2(uploadID) {
        let {
          currentUploads
        } = this.getState();
        let currentUpload = currentUploads[uploadID];
        const restoreStep = currentUpload.step || 0;
        const steps = [..._classPrivateFieldLooseBase(this, _preProcessors)[_preProcessors], ..._classPrivateFieldLooseBase(this, _uploaders)[_uploaders], ..._classPrivateFieldLooseBase(this, _postProcessors)[_postProcessors]];
        try {
          for (let step = restoreStep; step < steps.length; step++) {
            if (!currentUpload) {
              break;
            }
            const fn = steps[step];
            const updatedUpload = {
              ...currentUpload,
              step
            };
            this.setState({
              currentUploads: {
                ...currentUploads,
                [uploadID]: updatedUpload
              }
            });
            await fn(updatedUpload.fileIDs, uploadID);
            currentUploads = this.getState().currentUploads;
            currentUpload = currentUploads[uploadID];
          }
        } catch (err) {
          _classPrivateFieldLooseBase(this, _removeUpload)[_removeUpload](uploadID);
          throw err;
        }
        if (currentUpload) {
          currentUpload.fileIDs.forEach((fileID) => {
            const file = this.getFile(fileID);
            if (file && file.progress.postprocess) {
              this.emit("postprocess-complete", file);
            }
          });
          const files = currentUpload.fileIDs.map((fileID) => this.getFile(fileID));
          const successful = files.filter((file) => !file.error);
          const failed = files.filter((file) => file.error);
          await this.addResultData(uploadID, {
            successful,
            failed,
            uploadID
          });
          currentUploads = this.getState().currentUploads;
          currentUpload = currentUploads[uploadID];
        }
        let result;
        if (currentUpload) {
          result = currentUpload.result;
          this.emit("complete", result);
          _classPrivateFieldLooseBase(this, _removeUpload)[_removeUpload](uploadID);
        }
        if (result == null) {
          this.log(`Not setting result for an upload that has been removed: ${uploadID}`);
        }
        return result;
      }
      Uppy2.VERSION = "2.1.10";
      module.exports = Uppy2;
    }
  });

  // ../node_modules/preact/dist/preact.module.js
  var preact_module_exports = {};
  __export(preact_module_exports, {
    Component: () => _,
    Fragment: () => d,
    cloneElement: () => B,
    createContext: () => D,
    createElement: () => v,
    createRef: () => p,
    h: () => v,
    hydrate: () => q,
    isValidElement: () => i,
    options: () => l,
    render: () => S,
    toChildArray: () => A
  });
  function a(n2, l2) {
    for (var u2 in l2)
      n2[u2] = l2[u2];
    return n2;
  }
  function h(n2) {
    var l2 = n2.parentNode;
    l2 && l2.removeChild(n2);
  }
  function v(l2, u2, i2) {
    var t2, r2, o2, f2 = {};
    for (o2 in u2)
      o2 == "key" ? t2 = u2[o2] : o2 == "ref" ? r2 = u2[o2] : f2[o2] = u2[o2];
    if (arguments.length > 2 && (f2.children = arguments.length > 3 ? n.call(arguments, 2) : i2), typeof l2 == "function" && l2.defaultProps != null)
      for (o2 in l2.defaultProps)
        f2[o2] === void 0 && (f2[o2] = l2.defaultProps[o2]);
    return y(l2, f2, t2, r2, null);
  }
  function y(n2, i2, t2, r2, o2) {
    var f2 = {
      type: n2,
      props: i2,
      key: t2,
      ref: r2,
      __k: null,
      __: null,
      __b: 0,
      __e: null,
      __d: void 0,
      __c: null,
      __h: null,
      constructor: void 0,
      __v: o2 == null ? ++u : o2
    };
    return o2 == null && l.vnode != null && l.vnode(f2), f2;
  }
  function p() {
    return {
      current: null
    };
  }
  function d(n2) {
    return n2.children;
  }
  function _(n2, l2) {
    this.props = n2, this.context = l2;
  }
  function k(n2, l2) {
    if (l2 == null)
      return n2.__ ? k(n2.__, n2.__.__k.indexOf(n2) + 1) : null;
    for (var u2; l2 < n2.__k.length; l2++)
      if ((u2 = n2.__k[l2]) != null && u2.__e != null)
        return u2.__e;
    return typeof n2.type == "function" ? k(n2) : null;
  }
  function b(n2) {
    var l2, u2;
    if ((n2 = n2.__) != null && n2.__c != null) {
      for (n2.__e = n2.__c.base = null, l2 = 0; l2 < n2.__k.length; l2++)
        if ((u2 = n2.__k[l2]) != null && u2.__e != null) {
          n2.__e = n2.__c.base = u2.__e;
          break;
        }
      return b(n2);
    }
  }
  function m(n2) {
    (!n2.__d && (n2.__d = true) && t.push(n2) && !g.__r++ || o !== l.debounceRendering) && ((o = l.debounceRendering) || r)(g);
  }
  function g() {
    for (var n2; g.__r = t.length; )
      n2 = t.sort(function(n3, l2) {
        return n3.__v.__b - l2.__v.__b;
      }), t = [], n2.some(function(n3) {
        var l2, u2, i2, t2, r2, o2;
        n3.__d && (r2 = (t2 = (l2 = n3).__v).__e, (o2 = l2.__P) && (u2 = [], (i2 = a({}, t2)).__v = t2.__v + 1, j(o2, t2, i2, l2.__n, o2.ownerSVGElement !== void 0, t2.__h != null ? [r2] : null, u2, r2 == null ? k(t2) : r2, t2.__h), z(u2, t2), t2.__e != r2 && b(t2)));
      });
  }
  function w(n2, l2, u2, i2, t2, r2, o2, f2, s2, a2) {
    var h2, v2, p2, _2, b2, m2, g2, w2 = i2 && i2.__k || c, A2 = w2.length;
    for (u2.__k = [], h2 = 0; h2 < l2.length; h2++)
      if ((_2 = u2.__k[h2] = (_2 = l2[h2]) == null || typeof _2 == "boolean" ? null : typeof _2 == "string" || typeof _2 == "number" || typeof _2 == "bigint" ? y(null, _2, null, null, _2) : Array.isArray(_2) ? y(d, {
        children: _2
      }, null, null, null) : _2.__b > 0 ? y(_2.type, _2.props, _2.key, null, _2.__v) : _2) != null) {
        if (_2.__ = u2, _2.__b = u2.__b + 1, (p2 = w2[h2]) === null || p2 && _2.key == p2.key && _2.type === p2.type)
          w2[h2] = void 0;
        else
          for (v2 = 0; v2 < A2; v2++) {
            if ((p2 = w2[v2]) && _2.key == p2.key && _2.type === p2.type) {
              w2[v2] = void 0;
              break;
            }
            p2 = null;
          }
        j(n2, _2, p2 = p2 || e, t2, r2, o2, f2, s2, a2), b2 = _2.__e, (v2 = _2.ref) && p2.ref != v2 && (g2 || (g2 = []), p2.ref && g2.push(p2.ref, null, _2), g2.push(v2, _2.__c || b2, _2)), b2 != null ? (m2 == null && (m2 = b2), typeof _2.type == "function" && _2.__k === p2.__k ? _2.__d = s2 = x(_2, s2, n2) : s2 = P(n2, _2, p2, w2, b2, s2), typeof u2.type == "function" && (u2.__d = s2)) : s2 && p2.__e == s2 && s2.parentNode != n2 && (s2 = k(p2));
      }
    for (u2.__e = m2, h2 = A2; h2--; )
      w2[h2] != null && (typeof u2.type == "function" && w2[h2].__e != null && w2[h2].__e == u2.__d && (u2.__d = k(i2, h2 + 1)), N(w2[h2], w2[h2]));
    if (g2)
      for (h2 = 0; h2 < g2.length; h2++)
        M(g2[h2], g2[++h2], g2[++h2]);
  }
  function x(n2, l2, u2) {
    for (var i2, t2 = n2.__k, r2 = 0; t2 && r2 < t2.length; r2++)
      (i2 = t2[r2]) && (i2.__ = n2, l2 = typeof i2.type == "function" ? x(i2, l2, u2) : P(u2, i2, i2, t2, i2.__e, l2));
    return l2;
  }
  function A(n2, l2) {
    return l2 = l2 || [], n2 == null || typeof n2 == "boolean" || (Array.isArray(n2) ? n2.some(function(n3) {
      A(n3, l2);
    }) : l2.push(n2)), l2;
  }
  function P(n2, l2, u2, i2, t2, r2) {
    var o2, f2, e2;
    if (l2.__d !== void 0)
      o2 = l2.__d, l2.__d = void 0;
    else if (u2 == null || t2 != r2 || t2.parentNode == null)
      n:
        if (r2 == null || r2.parentNode !== n2)
          n2.appendChild(t2), o2 = null;
        else {
          for (f2 = r2, e2 = 0; (f2 = f2.nextSibling) && e2 < i2.length; e2 += 2)
            if (f2 == t2)
              break n;
          n2.insertBefore(t2, r2), o2 = r2;
        }
    return o2 !== void 0 ? o2 : t2.nextSibling;
  }
  function C(n2, l2, u2, i2, t2) {
    var r2;
    for (r2 in u2)
      r2 === "children" || r2 === "key" || r2 in l2 || H(n2, r2, null, u2[r2], i2);
    for (r2 in l2)
      t2 && typeof l2[r2] != "function" || r2 === "children" || r2 === "key" || r2 === "value" || r2 === "checked" || u2[r2] === l2[r2] || H(n2, r2, l2[r2], u2[r2], i2);
  }
  function $(n2, l2, u2) {
    l2[0] === "-" ? n2.setProperty(l2, u2) : n2[l2] = u2 == null ? "" : typeof u2 != "number" || s.test(l2) ? u2 : u2 + "px";
  }
  function H(n2, l2, u2, i2, t2) {
    var r2;
    n:
      if (l2 === "style") {
        if (typeof u2 == "string")
          n2.style.cssText = u2;
        else {
          if (typeof i2 == "string" && (n2.style.cssText = i2 = ""), i2)
            for (l2 in i2)
              u2 && l2 in u2 || $(n2.style, l2, "");
          if (u2)
            for (l2 in u2)
              i2 && u2[l2] === i2[l2] || $(n2.style, l2, u2[l2]);
        }
      } else if (l2[0] === "o" && l2[1] === "n")
        r2 = l2 !== (l2 = l2.replace(/Capture$/, "")), l2 = l2.toLowerCase() in n2 ? l2.toLowerCase().slice(2) : l2.slice(2), n2.l || (n2.l = {}), n2.l[l2 + r2] = u2, u2 ? i2 || n2.addEventListener(l2, r2 ? T : I, r2) : n2.removeEventListener(l2, r2 ? T : I, r2);
      else if (l2 !== "dangerouslySetInnerHTML") {
        if (t2)
          l2 = l2.replace(/xlink[H:h]/, "h").replace(/sName$/, "s");
        else if (l2 !== "href" && l2 !== "list" && l2 !== "form" && l2 !== "tabIndex" && l2 !== "download" && l2 in n2)
          try {
            n2[l2] = u2 == null ? "" : u2;
            break n;
          } catch (n3) {
          }
        typeof u2 == "function" || (u2 != null && (u2 !== false || l2[0] === "a" && l2[1] === "r") ? n2.setAttribute(l2, u2) : n2.removeAttribute(l2));
      }
  }
  function I(n2) {
    this.l[n2.type + false](l.event ? l.event(n2) : n2);
  }
  function T(n2) {
    this.l[n2.type + true](l.event ? l.event(n2) : n2);
  }
  function j(n2, u2, i2, t2, r2, o2, f2, e2, c2) {
    var s2, h2, v2, y2, p2, k2, b2, m2, g2, x2, A2, P2 = u2.type;
    if (u2.constructor !== void 0)
      return null;
    i2.__h != null && (c2 = i2.__h, e2 = u2.__e = i2.__e, u2.__h = null, o2 = [e2]), (s2 = l.__b) && s2(u2);
    try {
      n:
        if (typeof P2 == "function") {
          if (m2 = u2.props, g2 = (s2 = P2.contextType) && t2[s2.__c], x2 = s2 ? g2 ? g2.props.value : s2.__ : t2, i2.__c ? b2 = (h2 = u2.__c = i2.__c).__ = h2.__E : ("prototype" in P2 && P2.prototype.render ? u2.__c = h2 = new P2(m2, x2) : (u2.__c = h2 = new _(m2, x2), h2.constructor = P2, h2.render = O), g2 && g2.sub(h2), h2.props = m2, h2.state || (h2.state = {}), h2.context = x2, h2.__n = t2, v2 = h2.__d = true, h2.__h = []), h2.__s == null && (h2.__s = h2.state), P2.getDerivedStateFromProps != null && (h2.__s == h2.state && (h2.__s = a({}, h2.__s)), a(h2.__s, P2.getDerivedStateFromProps(m2, h2.__s))), y2 = h2.props, p2 = h2.state, v2)
            P2.getDerivedStateFromProps == null && h2.componentWillMount != null && h2.componentWillMount(), h2.componentDidMount != null && h2.__h.push(h2.componentDidMount);
          else {
            if (P2.getDerivedStateFromProps == null && m2 !== y2 && h2.componentWillReceiveProps != null && h2.componentWillReceiveProps(m2, x2), !h2.__e && h2.shouldComponentUpdate != null && h2.shouldComponentUpdate(m2, h2.__s, x2) === false || u2.__v === i2.__v) {
              h2.props = m2, h2.state = h2.__s, u2.__v !== i2.__v && (h2.__d = false), h2.__v = u2, u2.__e = i2.__e, u2.__k = i2.__k, u2.__k.forEach(function(n3) {
                n3 && (n3.__ = u2);
              }), h2.__h.length && f2.push(h2);
              break n;
            }
            h2.componentWillUpdate != null && h2.componentWillUpdate(m2, h2.__s, x2), h2.componentDidUpdate != null && h2.__h.push(function() {
              h2.componentDidUpdate(y2, p2, k2);
            });
          }
          h2.context = x2, h2.props = m2, h2.state = h2.__s, (s2 = l.__r) && s2(u2), h2.__d = false, h2.__v = u2, h2.__P = n2, s2 = h2.render(h2.props, h2.state, h2.context), h2.state = h2.__s, h2.getChildContext != null && (t2 = a(a({}, t2), h2.getChildContext())), v2 || h2.getSnapshotBeforeUpdate == null || (k2 = h2.getSnapshotBeforeUpdate(y2, p2)), A2 = s2 != null && s2.type === d && s2.key == null ? s2.props.children : s2, w(n2, Array.isArray(A2) ? A2 : [A2], u2, i2, t2, r2, o2, f2, e2, c2), h2.base = u2.__e, u2.__h = null, h2.__h.length && f2.push(h2), b2 && (h2.__E = h2.__ = null), h2.__e = false;
        } else
          o2 == null && u2.__v === i2.__v ? (u2.__k = i2.__k, u2.__e = i2.__e) : u2.__e = L(i2.__e, u2, i2, t2, r2, o2, f2, c2);
      (s2 = l.diffed) && s2(u2);
    } catch (n3) {
      u2.__v = null, (c2 || o2 != null) && (u2.__e = e2, u2.__h = !!c2, o2[o2.indexOf(e2)] = null), l.__e(n3, u2, i2);
    }
  }
  function z(n2, u2) {
    l.__c && l.__c(u2, n2), n2.some(function(u3) {
      try {
        n2 = u3.__h, u3.__h = [], n2.some(function(n3) {
          n3.call(u3);
        });
      } catch (n3) {
        l.__e(n3, u3.__v);
      }
    });
  }
  function L(l2, u2, i2, t2, r2, o2, f2, c2) {
    var s2, a2, v2, y2 = i2.props, p2 = u2.props, d2 = u2.type, _2 = 0;
    if (d2 === "svg" && (r2 = true), o2 != null) {
      for (; _2 < o2.length; _2++)
        if ((s2 = o2[_2]) && "setAttribute" in s2 == !!d2 && (d2 ? s2.localName === d2 : s2.nodeType === 3)) {
          l2 = s2, o2[_2] = null;
          break;
        }
    }
    if (l2 == null) {
      if (d2 === null)
        return document.createTextNode(p2);
      l2 = r2 ? document.createElementNS("http://www.w3.org/2000/svg", d2) : document.createElement(d2, p2.is && p2), o2 = null, c2 = false;
    }
    if (d2 === null)
      y2 === p2 || c2 && l2.data === p2 || (l2.data = p2);
    else {
      if (o2 = o2 && n.call(l2.childNodes), a2 = (y2 = i2.props || e).dangerouslySetInnerHTML, v2 = p2.dangerouslySetInnerHTML, !c2) {
        if (o2 != null)
          for (y2 = {}, _2 = 0; _2 < l2.attributes.length; _2++)
            y2[l2.attributes[_2].name] = l2.attributes[_2].value;
        (v2 || a2) && (v2 && (a2 && v2.__html == a2.__html || v2.__html === l2.innerHTML) || (l2.innerHTML = v2 && v2.__html || ""));
      }
      if (C(l2, p2, y2, r2, c2), v2)
        u2.__k = [];
      else if (_2 = u2.props.children, w(l2, Array.isArray(_2) ? _2 : [_2], u2, i2, t2, r2 && d2 !== "foreignObject", o2, f2, o2 ? o2[0] : i2.__k && k(i2, 0), c2), o2 != null)
        for (_2 = o2.length; _2--; )
          o2[_2] != null && h(o2[_2]);
      c2 || ("value" in p2 && (_2 = p2.value) !== void 0 && (_2 !== y2.value || _2 !== l2.value || d2 === "progress" && !_2) && H(l2, "value", _2, y2.value, false), "checked" in p2 && (_2 = p2.checked) !== void 0 && _2 !== l2.checked && H(l2, "checked", _2, y2.checked, false));
    }
    return l2;
  }
  function M(n2, u2, i2) {
    try {
      typeof n2 == "function" ? n2(u2) : n2.current = u2;
    } catch (n3) {
      l.__e(n3, i2);
    }
  }
  function N(n2, u2, i2) {
    var t2, r2;
    if (l.unmount && l.unmount(n2), (t2 = n2.ref) && (t2.current && t2.current !== n2.__e || M(t2, null, u2)), (t2 = n2.__c) != null) {
      if (t2.componentWillUnmount)
        try {
          t2.componentWillUnmount();
        } catch (n3) {
          l.__e(n3, u2);
        }
      t2.base = t2.__P = null;
    }
    if (t2 = n2.__k)
      for (r2 = 0; r2 < t2.length; r2++)
        t2[r2] && N(t2[r2], u2, typeof n2.type != "function");
    i2 || n2.__e == null || h(n2.__e), n2.__e = n2.__d = void 0;
  }
  function O(n2, l2, u2) {
    return this.constructor(n2, u2);
  }
  function S(u2, i2, t2) {
    var r2, o2, f2;
    l.__ && l.__(u2, i2), o2 = (r2 = typeof t2 == "function") ? null : t2 && t2.__k || i2.__k, f2 = [], j(i2, u2 = (!r2 && t2 || i2).__k = v(d, null, [u2]), o2 || e, e, i2.ownerSVGElement !== void 0, !r2 && t2 ? [t2] : o2 ? null : i2.firstChild ? n.call(i2.childNodes) : null, f2, !r2 && t2 ? t2 : o2 ? o2.__e : i2.firstChild, r2), z(f2, u2);
  }
  function q(n2, l2) {
    S(n2, l2, q);
  }
  function B(l2, u2, i2) {
    var t2, r2, o2, f2 = a({}, l2.props);
    for (o2 in u2)
      o2 == "key" ? t2 = u2[o2] : o2 == "ref" ? r2 = u2[o2] : f2[o2] = u2[o2];
    return arguments.length > 2 && (f2.children = arguments.length > 3 ? n.call(arguments, 2) : i2), y(l2.type, f2, t2 || l2.key, r2 || l2.ref, null);
  }
  function D(n2, l2) {
    var u2 = {
      __c: l2 = "__cC" + f++,
      __: n2,
      Consumer: function(n3, l3) {
        return n3.children(l3);
      },
      Provider: function(n3) {
        var u3, i2;
        return this.getChildContext || (u3 = [], (i2 = {})[l2] = this, this.getChildContext = function() {
          return i2;
        }, this.shouldComponentUpdate = function(n4) {
          this.props.value !== n4.value && u3.some(m);
        }, this.sub = function(n4) {
          u3.push(n4);
          var l3 = n4.componentWillUnmount;
          n4.componentWillUnmount = function() {
            u3.splice(u3.indexOf(n4), 1), l3 && l3.call(n4);
          };
        }), n3.children;
      }
    };
    return u2.Provider.__ = u2.Consumer.contextType = u2;
  }
  var n, l, u, i, t, r, o, f, e, c, s;
  var init_preact_module = __esm({
    "../node_modules/preact/dist/preact.module.js"() {
      e = {};
      c = [];
      s = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
      n = c.slice, l = {
        __e: function(n2, l2) {
          for (var u2, i2, t2; l2 = l2.__; )
            if ((u2 = l2.__c) && !u2.__)
              try {
                if ((i2 = u2.constructor) && i2.getDerivedStateFromError != null && (u2.setState(i2.getDerivedStateFromError(n2)), t2 = u2.__d), u2.componentDidCatch != null && (u2.componentDidCatch(n2), t2 = u2.__d), t2)
                  return u2.__E = u2;
              } catch (l3) {
                n2 = l3;
              }
          throw n2;
        }
      }, u = 0, i = function(n2) {
        return n2 != null && n2.constructor === void 0;
      }, _.prototype.setState = function(n2, l2) {
        var u2;
        u2 = this.__s != null && this.__s !== this.state ? this.__s : this.__s = a({}, this.state), typeof n2 == "function" && (n2 = n2(a({}, u2), this.props)), n2 && a(u2, n2), n2 != null && this.__v && (l2 && this.__h.push(l2), m(this));
      }, _.prototype.forceUpdate = function(n2) {
        this.__v && (this.__e = true, n2 && this.__h.push(n2), m(this));
      }, _.prototype.render = d, t = [], r = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, g.__r = 0, f = 0;
    }
  });

  // ../packages/@uppy/utils/lib/isDOMElement.js
  var require_isDOMElement = __commonJS({
    "../packages/@uppy/utils/lib/isDOMElement.js"(exports, module) {
      module.exports = function isDOMElement(obj) {
        return (obj == null ? void 0 : obj.nodeType) === Node.ELEMENT_NODE;
      };
    }
  });

  // ../packages/@uppy/utils/lib/findDOMElement.js
  var require_findDOMElement = __commonJS({
    "../packages/@uppy/utils/lib/findDOMElement.js"(exports, module) {
      var isDOMElement = require_isDOMElement();
      module.exports = function findDOMElement(element, context) {
        if (context === void 0) {
          context = document;
        }
        if (typeof element === "string") {
          return context.querySelector(element);
        }
        if (isDOMElement(element)) {
          return element;
        }
        return null;
      };
    }
  });

  // ../packages/@uppy/core/lib/BasePlugin.js
  var require_BasePlugin = __commonJS({
    "../packages/@uppy/core/lib/BasePlugin.js"(exports, module) {
      var Translator = require_Translator();
      module.exports = class BasePlugin {
        constructor(uppy2, opts) {
          if (opts === void 0) {
            opts = {};
          }
          this.uppy = uppy2;
          this.opts = opts;
        }
        getPluginState() {
          const {
            plugins
          } = this.uppy.getState();
          return plugins[this.id] || {};
        }
        setPluginState(update) {
          const {
            plugins
          } = this.uppy.getState();
          this.uppy.setState({
            plugins: {
              ...plugins,
              [this.id]: {
                ...plugins[this.id],
                ...update
              }
            }
          });
        }
        setOptions(newOpts) {
          this.opts = {
            ...this.opts,
            ...newOpts
          };
          this.setPluginState();
          this.i18nInit();
        }
        i18nInit() {
          const translator = new Translator([this.defaultLocale, this.uppy.locale, this.opts.locale]);
          this.i18n = translator.translate.bind(translator);
          this.i18nArray = translator.translateArray.bind(translator);
          this.setPluginState();
        }
        addTarget() {
          throw new Error("Extend the addTarget method to add your plugin to another plugin's target");
        }
        install() {
        }
        uninstall() {
        }
        render() {
          throw new Error("Extend the render method to add your plugin to a DOM element");
        }
        update() {
        }
        afterUpdate() {
        }
      };
    }
  });

  // ../packages/@uppy/core/lib/UIPlugin.js
  var require_UIPlugin = __commonJS({
    "../packages/@uppy/core/lib/UIPlugin.js"(exports, module) {
      function _classPrivateFieldLooseBase(receiver, privateKey) {
        if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
          throw new TypeError("attempted to use private field on non-instance");
        }
        return receiver;
      }
      var id = 0;
      function _classPrivateFieldLooseKey(name) {
        return "__private_" + id++ + "_" + name;
      }
      var {
        render
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      var findDOMElement = require_findDOMElement();
      var BasePlugin = require_BasePlugin();
      function debounce(fn) {
        let calling = null;
        let latestArgs = null;
        return function() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          latestArgs = args;
          if (!calling) {
            calling = Promise.resolve().then(() => {
              calling = null;
              return fn(...latestArgs);
            });
          }
          return calling;
        };
      }
      var _updateUI = /* @__PURE__ */ _classPrivateFieldLooseKey("updateUI");
      var UIPlugin = class extends BasePlugin {
        constructor() {
          super(...arguments);
          Object.defineProperty(this, _updateUI, {
            writable: true,
            value: void 0
          });
        }
        mount(target, plugin) {
          const callerPluginName = plugin.id;
          const targetElement = findDOMElement(target);
          if (targetElement) {
            this.isTargetDOMEl = true;
            const uppyRootElement = document.createDocumentFragment();
            _classPrivateFieldLooseBase(this, _updateUI)[_updateUI] = debounce((state) => {
              if (!this.uppy.getPlugin(this.id))
                return;
              render(this.render(state), uppyRootElement);
              this.afterUpdate();
            });
            this.uppy.log(`Installing ${callerPluginName} to a DOM element '${target}'`);
            if (this.opts.replaceTargetContent) {
              targetElement.innerHTML = "";
            }
            render(this.render(this.uppy.getState()), uppyRootElement);
            this.el = uppyRootElement.firstElementChild;
            targetElement.appendChild(uppyRootElement);
            this.onMount();
            return this.el;
          }
          let targetPlugin;
          if (typeof target === "object" && target instanceof UIPlugin) {
            targetPlugin = target;
          } else if (typeof target === "function") {
            const Target = target;
            this.uppy.iteratePlugins((p2) => {
              if (p2 instanceof Target) {
                targetPlugin = p2;
                return false;
              }
            });
          }
          if (targetPlugin) {
            this.uppy.log(`Installing ${callerPluginName} to ${targetPlugin.id}`);
            this.parent = targetPlugin;
            this.el = targetPlugin.addTarget(plugin);
            this.onMount();
            return this.el;
          }
          this.uppy.log(`Not installing ${callerPluginName}`);
          let message = `Invalid target option given to ${callerPluginName}.`;
          if (typeof target === "function") {
            message += " The given target is not a Plugin class. Please check that you're not specifying a React Component instead of a plugin. If you are using @uppy/* packages directly, make sure you have only 1 version of @uppy/core installed: run `npm ls @uppy/core` on the command line and verify that all the versions match and are deduped correctly.";
          } else {
            message += "If you meant to target an HTML element, please make sure that the element exists. Check that the <script> tag initializing Uppy is right before the closing </body> tag at the end of the page. (see https://github.com/transloadit/uppy/issues/1042)\n\nIf you meant to target a plugin, please confirm that your `import` statements or `require` calls are correct.";
          }
          throw new Error(message);
        }
        update(state) {
          if (this.el != null) {
            var _classPrivateFieldLoo, _classPrivateFieldLoo2;
            (_classPrivateFieldLoo = (_classPrivateFieldLoo2 = _classPrivateFieldLooseBase(this, _updateUI))[_updateUI]) == null ? void 0 : _classPrivateFieldLoo.call(_classPrivateFieldLoo2, state);
          }
        }
        unmount() {
          if (this.isTargetDOMEl) {
            var _this$el;
            (_this$el = this.el) == null ? void 0 : _this$el.remove();
          }
          this.onUnmount();
        }
        onMount() {
        }
        onUnmount() {
        }
      };
      module.exports = UIPlugin;
    }
  });

  // ../packages/@uppy/core/lib/index.js
  var require_lib2 = __commonJS({
    "../packages/@uppy/core/lib/index.js"(exports, module) {
      "use strict";
      var Uppy2 = require_Uppy();
      var UIPlugin = require_UIPlugin();
      var BasePlugin = require_BasePlugin();
      var {
        debugLogger
      } = require_loggers();
      module.exports = Uppy2;
      module.exports.Uppy = Uppy2;
      module.exports.UIPlugin = UIPlugin;
      module.exports.BasePlugin = BasePlugin;
      module.exports.debugLogger = debugLogger;
    }
  });

  // ../packages/@uppy/utils/lib/toArray.js
  var require_toArray = __commonJS({
    "../packages/@uppy/utils/lib/toArray.js"(exports, module) {
      module.exports = Array.from;
    }
  });

  // ../packages/@uppy/file-input/lib/locale.js
  var require_locale2 = __commonJS({
    "../packages/@uppy/file-input/lib/locale.js"(exports, module) {
      "use strict";
      module.exports = {
        strings: {
          chooseFiles: "Choose files"
        }
      };
    }
  });

  // ../packages/@uppy/file-input/lib/FileInput.js
  var require_FileInput = __commonJS({
    "../packages/@uppy/file-input/lib/FileInput.js"(exports, module) {
      "use strict";
      var _core = require_lib2();
      var _preact = (init_preact_module(), __toCommonJS(preact_module_exports));
      var toArray = require_toArray();
      var packageJson = {
        "version": "2.0.6"
      };
      var locale = require_locale2();
      var FileInput2 = class extends _core.UIPlugin {
        constructor(uppy2, opts) {
          super(uppy2, opts);
          this.id = this.opts.id || "FileInput";
          this.title = "File Input";
          this.type = "acquirer";
          this.defaultLocale = locale;
          const defaultOptions = {
            target: null,
            pretty: true,
            inputName: "files[]"
          };
          this.opts = {
            ...defaultOptions,
            ...opts
          };
          this.i18nInit();
          this.render = this.render.bind(this);
          this.handleInputChange = this.handleInputChange.bind(this);
          this.handleClick = this.handleClick.bind(this);
        }
        addFiles(files) {
          const descriptors = files.map((file) => ({
            source: this.id,
            name: file.name,
            type: file.type,
            data: file
          }));
          try {
            this.uppy.addFiles(descriptors);
          } catch (err) {
            this.uppy.log(err);
          }
        }
        handleInputChange(event) {
          this.uppy.log("[FileInput] Something selected through input...");
          const files = toArray(event.target.files);
          this.addFiles(files);
          event.target.value = null;
        }
        handleClick() {
          this.input.click();
        }
        render() {
          const hiddenInputStyle = {
            width: "0.1px",
            height: "0.1px",
            opacity: 0,
            overflow: "hidden",
            position: "absolute",
            zIndex: -1
          };
          const {
            restrictions
          } = this.uppy.opts;
          const accept = restrictions.allowedFileTypes ? restrictions.allowedFileTypes.join(",") : null;
          return (0, _preact.h)("div", {
            className: "uppy-Root uppy-FileInput-container"
          }, (0, _preact.h)("input", {
            className: "uppy-FileInput-input",
            style: this.opts.pretty && hiddenInputStyle,
            type: "file",
            name: this.opts.inputName,
            onChange: this.handleInputChange,
            multiple: restrictions.maxNumberOfFiles !== 1,
            accept,
            ref: (input) => {
              this.input = input;
            }
          }), this.opts.pretty && (0, _preact.h)("button", {
            className: "uppy-FileInput-btn",
            type: "button",
            onClick: this.handleClick
          }, this.i18n("chooseFiles")));
        }
        install() {
          const {
            target
          } = this.opts;
          if (target) {
            this.mount(target, this);
          }
        }
        uninstall() {
          this.unmount();
        }
      };
      FileInput2.VERSION = packageJson.version;
      module.exports = FileInput2;
    }
  });

  // ../packages/@uppy/file-input/lib/index.js
  var require_lib3 = __commonJS({
    "../packages/@uppy/file-input/lib/index.js"(exports, module) {
      "use strict";
      module.exports = require_FileInput();
    }
  });

  // ../packages/@uppy/utils/lib/NetworkError.js
  var require_NetworkError = __commonJS({
    "../packages/@uppy/utils/lib/NetworkError.js"(exports, module) {
      var NetworkError = class extends Error {
        constructor(error, xhr) {
          if (xhr === void 0) {
            xhr = null;
          }
          super(`This looks like a network error, the endpoint might be blocked by an internet provider or a firewall.`);
          this.cause = error;
          this.isNetworkError = true;
          this.request = xhr;
        }
      };
      module.exports = NetworkError;
    }
  });

  // ../packages/@uppy/utils/lib/fetchWithNetworkError.js
  var require_fetchWithNetworkError = __commonJS({
    "../packages/@uppy/utils/lib/fetchWithNetworkError.js"(exports, module) {
      var NetworkError = require_NetworkError();
      module.exports = function fetchWithNetworkError() {
        return fetch(...arguments).catch((err) => {
          if (err.name === "AbortError") {
            throw err;
          } else {
            throw new NetworkError(err);
          }
        });
      };
    }
  });

  // ../packages/@uppy/utils/lib/ErrorWithCause.js
  var require_ErrorWithCause = __commonJS({
    "../packages/@uppy/utils/lib/ErrorWithCause.js"(exports, module) {
      var hasProperty = require_hasProperty();
      var ErrorWithCause = class extends Error {
        constructor(message, options) {
          if (options === void 0) {
            options = {};
          }
          super(message);
          this.cause = options.cause;
          if (this.cause && hasProperty(this.cause, "isNetworkError")) {
            this.isNetworkError = this.cause.isNetworkError;
          }
        }
      };
      module.exports = ErrorWithCause;
    }
  });

  // ../packages/@uppy/companion-client/lib/AuthError.js
  var require_AuthError = __commonJS({
    "../packages/@uppy/companion-client/lib/AuthError.js"(exports, module) {
      "use strict";
      var AuthError = class extends Error {
        constructor() {
          super("Authorization required");
          this.name = "AuthError";
          this.isAuthError = true;
        }
      };
      module.exports = AuthError;
    }
  });

  // ../packages/@uppy/companion-client/lib/RequestClient.js
  var require_RequestClient = __commonJS({
    "../packages/@uppy/companion-client/lib/RequestClient.js"(exports, module) {
      "use strict";
      var _class;
      var _getPostResponseFunc;
      var _getUrl;
      var _errorHandler;
      var _temp;
      function _classPrivateFieldLooseBase(receiver, privateKey) {
        if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
          throw new TypeError("attempted to use private field on non-instance");
        }
        return receiver;
      }
      var id = 0;
      function _classPrivateFieldLooseKey(name) {
        return "__private_" + id++ + "_" + name;
      }
      var fetchWithNetworkError = require_fetchWithNetworkError();
      var ErrorWithCause = require_ErrorWithCause();
      var AuthError = require_AuthError();
      function stripSlash(url) {
        return url.replace(/\/$/, "");
      }
      async function handleJSONResponse(res) {
        if (res.status === 401) {
          throw new AuthError();
        }
        const jsonPromise = res.json();
        if (res.status < 200 || res.status > 300) {
          let errMsg = `Failed request with status: ${res.status}. ${res.statusText}`;
          try {
            const errData = await jsonPromise;
            errMsg = errData.message ? `${errMsg} message: ${errData.message}` : errMsg;
            errMsg = errData.requestId ? `${errMsg} request-Id: ${errData.requestId}` : errMsg;
          } finally {
            throw new Error(errMsg);
          }
        }
        return jsonPromise;
      }
      module.exports = (_temp = (_getPostResponseFunc = /* @__PURE__ */ _classPrivateFieldLooseKey("getPostResponseFunc"), _getUrl = /* @__PURE__ */ _classPrivateFieldLooseKey("getUrl"), _errorHandler = /* @__PURE__ */ _classPrivateFieldLooseKey("errorHandler"), _class = class RequestClient {
        constructor(uppy2, opts) {
          Object.defineProperty(this, _errorHandler, {
            value: _errorHandler2
          });
          Object.defineProperty(this, _getUrl, {
            value: _getUrl2
          });
          Object.defineProperty(this, _getPostResponseFunc, {
            writable: true,
            value: (skip) => (response) => skip ? response : this.onReceiveResponse(response)
          });
          this.uppy = uppy2;
          this.opts = opts;
          this.onReceiveResponse = this.onReceiveResponse.bind(this);
          this.allowedHeaders = ["accept", "content-type", "uppy-auth-token"];
          this.preflightDone = false;
        }
        get hostname() {
          const {
            companion
          } = this.uppy.getState();
          const host = this.opts.companionUrl;
          return stripSlash(companion && companion[host] ? companion[host] : host);
        }
        headers() {
          const userHeaders = this.opts.companionHeaders || {};
          return Promise.resolve({
            ...RequestClient.defaultHeaders,
            ...userHeaders
          });
        }
        onReceiveResponse(response) {
          const state = this.uppy.getState();
          const companion = state.companion || {};
          const host = this.opts.companionUrl;
          const {
            headers
          } = response;
          if (headers.has("i-am") && headers.get("i-am") !== companion[host]) {
            this.uppy.setState({
              companion: {
                ...companion,
                [host]: headers.get("i-am")
              }
            });
          }
          return response;
        }
        preflight(path) {
          if (this.preflightDone) {
            return Promise.resolve(this.allowedHeaders.slice());
          }
          return fetch(_classPrivateFieldLooseBase(this, _getUrl)[_getUrl](path), {
            method: "OPTIONS"
          }).then((response) => {
            if (response.headers.has("access-control-allow-headers")) {
              this.allowedHeaders = response.headers.get("access-control-allow-headers").split(",").map((headerName) => headerName.trim().toLowerCase());
            }
            this.preflightDone = true;
            return this.allowedHeaders.slice();
          }).catch((err) => {
            this.uppy.log(`[CompanionClient] unable to make preflight request ${err}`, "warning");
            this.preflightDone = true;
            return this.allowedHeaders.slice();
          });
        }
        preflightAndHeaders(path) {
          return Promise.all([this.preflight(path), this.headers()]).then((_ref) => {
            let [allowedHeaders, headers] = _ref;
            Object.keys(headers).forEach((header) => {
              if (!allowedHeaders.includes(header.toLowerCase())) {
                this.uppy.log(`[CompanionClient] excluding disallowed header ${header}`);
                delete headers[header];
              }
            });
            return headers;
          });
        }
        get(path, skipPostResponse) {
          const method = "get";
          return this.preflightAndHeaders(path).then((headers) => fetchWithNetworkError(_classPrivateFieldLooseBase(this, _getUrl)[_getUrl](path), {
            method,
            headers,
            credentials: this.opts.companionCookiesRule || "same-origin"
          })).then(_classPrivateFieldLooseBase(this, _getPostResponseFunc)[_getPostResponseFunc](skipPostResponse)).then(handleJSONResponse).catch(_classPrivateFieldLooseBase(this, _errorHandler)[_errorHandler](method, path));
        }
        post(path, data, skipPostResponse) {
          const method = "post";
          return this.preflightAndHeaders(path).then((headers) => fetchWithNetworkError(_classPrivateFieldLooseBase(this, _getUrl)[_getUrl](path), {
            method,
            headers,
            credentials: this.opts.companionCookiesRule || "same-origin",
            body: JSON.stringify(data)
          })).then(_classPrivateFieldLooseBase(this, _getPostResponseFunc)[_getPostResponseFunc](skipPostResponse)).then(handleJSONResponse).catch(_classPrivateFieldLooseBase(this, _errorHandler)[_errorHandler](method, path));
        }
        delete(path, data, skipPostResponse) {
          const method = "delete";
          return this.preflightAndHeaders(path).then((headers) => fetchWithNetworkError(`${this.hostname}/${path}`, {
            method,
            headers,
            credentials: this.opts.companionCookiesRule || "same-origin",
            body: data ? JSON.stringify(data) : null
          })).then(_classPrivateFieldLooseBase(this, _getPostResponseFunc)[_getPostResponseFunc](skipPostResponse)).then(handleJSONResponse).catch(_classPrivateFieldLooseBase(this, _errorHandler)[_errorHandler](method, path));
        }
      }), _class.VERSION = "2.0.6", _class.defaultHeaders = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Uppy-Versions": `@uppy/companion-client=${_class.VERSION}`
      }, _temp);
      function _getUrl2(url) {
        if (/^(https?:|)\/\//.test(url)) {
          return url;
        }
        return `${this.hostname}/${url}`;
      }
      function _errorHandler2(method, path) {
        return (err) => {
          var _err;
          if (!((_err = err) != null && _err.isAuthError)) {
            err = new ErrorWithCause(`Could not ${method} ${_classPrivateFieldLooseBase(this, _getUrl)[_getUrl](path)}`, {
              cause: err
            });
          }
          return Promise.reject(err);
        };
      }
    }
  });

  // ../packages/@uppy/companion-client/lib/tokenStorage.js
  var require_tokenStorage = __commonJS({
    "../packages/@uppy/companion-client/lib/tokenStorage.js"(exports, module) {
      "use strict";
      module.exports.setItem = (key, value) => {
        return new Promise((resolve) => {
          localStorage.setItem(key, value);
          resolve();
        });
      };
      module.exports.getItem = (key) => {
        return Promise.resolve(localStorage.getItem(key));
      };
      module.exports.removeItem = (key) => {
        return new Promise((resolve) => {
          localStorage.removeItem(key);
          resolve();
        });
      };
    }
  });

  // ../packages/@uppy/companion-client/lib/Provider.js
  var require_Provider = __commonJS({
    "../packages/@uppy/companion-client/lib/Provider.js"(exports, module) {
      "use strict";
      var RequestClient = require_RequestClient();
      var tokenStorage = require_tokenStorage();
      var getName = (id) => {
        return id.split("-").map((s2) => s2.charAt(0).toUpperCase() + s2.slice(1)).join(" ");
      };
      module.exports = class Provider extends RequestClient {
        constructor(uppy2, opts) {
          super(uppy2, opts);
          this.provider = opts.provider;
          this.id = this.provider;
          this.name = this.opts.name || getName(this.id);
          this.pluginId = this.opts.pluginId;
          this.tokenKey = `companion-${this.pluginId}-auth-token`;
          this.companionKeysParams = this.opts.companionKeysParams;
          this.preAuthToken = null;
        }
        headers() {
          return Promise.all([super.headers(), this.getAuthToken()]).then((_ref) => {
            let [headers, token] = _ref;
            const authHeaders = {};
            if (token) {
              authHeaders["uppy-auth-token"] = token;
            }
            if (this.companionKeysParams) {
              authHeaders["uppy-credentials-params"] = btoa(JSON.stringify({
                params: this.companionKeysParams
              }));
            }
            return {
              ...headers,
              ...authHeaders
            };
          });
        }
        onReceiveResponse(response) {
          response = super.onReceiveResponse(response);
          const plugin = this.uppy.getPlugin(this.pluginId);
          const oldAuthenticated = plugin.getPluginState().authenticated;
          const authenticated = oldAuthenticated ? response.status !== 401 : response.status < 400;
          plugin.setPluginState({
            authenticated
          });
          return response;
        }
        setAuthToken(token) {
          return this.uppy.getPlugin(this.pluginId).storage.setItem(this.tokenKey, token);
        }
        getAuthToken() {
          return this.uppy.getPlugin(this.pluginId).storage.getItem(this.tokenKey);
        }
        async ensurePreAuth() {
          if (this.companionKeysParams && !this.preAuthToken) {
            await this.fetchPreAuthToken();
            if (!this.preAuthToken) {
              throw new Error("Could not load authentication data required for third-party login. Please try again later.");
            }
          }
        }
        authUrl(queries) {
          if (queries === void 0) {
            queries = {};
          }
          const params = new URLSearchParams(queries);
          if (this.preAuthToken) {
            params.set("uppyPreAuthToken", this.preAuthToken);
          }
          return `${this.hostname}/${this.id}/connect?${params}`;
        }
        fileUrl(id) {
          return `${this.hostname}/${this.id}/get/${id}`;
        }
        async fetchPreAuthToken() {
          if (!this.companionKeysParams) {
            return;
          }
          try {
            const res = await this.post(`${this.id}/preauth/`, {
              params: this.companionKeysParams
            });
            this.preAuthToken = res.token;
          } catch (err) {
            this.uppy.log(`[CompanionClient] unable to fetch preAuthToken ${err}`, "warning");
          }
        }
        list(directory) {
          return this.get(`${this.id}/list/${directory || ""}`);
        }
        logout() {
          return this.get(`${this.id}/logout`).then((response) => Promise.all([response, this.uppy.getPlugin(this.pluginId).storage.removeItem(this.tokenKey)])).then((_ref2) => {
            let [response] = _ref2;
            return response;
          });
        }
        static initPlugin(plugin, opts, defaultOpts) {
          plugin.type = "acquirer";
          plugin.files = [];
          if (defaultOpts) {
            plugin.opts = {
              ...defaultOpts,
              ...opts
            };
          }
          if (opts.serverUrl || opts.serverPattern) {
            throw new Error("`serverUrl` and `serverPattern` have been renamed to `companionUrl` and `companionAllowedHosts` respectively in the 0.30.5 release. Please consult the docs (for example, https://uppy.io/docs/instagram/ for the Instagram plugin) and use the updated options.`");
          }
          if (opts.companionAllowedHosts) {
            const pattern = opts.companionAllowedHosts;
            if (typeof pattern !== "string" && !Array.isArray(pattern) && !(pattern instanceof RegExp)) {
              throw new TypeError(`${plugin.id}: the option "companionAllowedHosts" must be one of string, Array, RegExp`);
            }
            plugin.opts.companionAllowedHosts = pattern;
          } else if (/^(?!https?:\/\/).*$/i.test(opts.companionUrl)) {
            plugin.opts.companionAllowedHosts = `https://${opts.companionUrl.replace(/^\/\//, "")}`;
          } else {
            plugin.opts.companionAllowedHosts = new URL(opts.companionUrl).origin;
          }
          plugin.storage = plugin.opts.storage || tokenStorage;
        }
      };
    }
  });

  // ../packages/@uppy/companion-client/lib/SearchProvider.js
  var require_SearchProvider = __commonJS({
    "../packages/@uppy/companion-client/lib/SearchProvider.js"(exports, module) {
      "use strict";
      var RequestClient = require_RequestClient();
      var getName = (id) => {
        return id.split("-").map((s2) => s2.charAt(0).toUpperCase() + s2.slice(1)).join(" ");
      };
      module.exports = class SearchProvider extends RequestClient {
        constructor(uppy2, opts) {
          super(uppy2, opts);
          this.provider = opts.provider;
          this.id = this.provider;
          this.name = this.opts.name || getName(this.id);
          this.pluginId = this.opts.pluginId;
        }
        fileUrl(id) {
          return `${this.hostname}/search/${this.id}/get/${id}`;
        }
        search(text, queries) {
          queries = queries ? `&${queries}` : "";
          return this.get(`search/${this.id}/list?q=${encodeURIComponent(text)}${queries}`);
        }
      };
    }
  });

  // ../packages/@uppy/companion-client/lib/Socket.js
  var require_Socket = __commonJS({
    "../packages/@uppy/companion-client/lib/Socket.js"(exports, module) {
      var _queued;
      var _emitter;
      var _isOpen;
      var _socket;
      var _handleMessage;
      var _Symbol$for;
      var _Symbol$for2;
      function _classPrivateFieldLooseBase(receiver, privateKey) {
        if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
          throw new TypeError("attempted to use private field on non-instance");
        }
        return receiver;
      }
      var id = 0;
      function _classPrivateFieldLooseKey(name) {
        return "__private_" + id++ + "_" + name;
      }
      var ee = require_namespace_emitter();
      module.exports = (_queued = /* @__PURE__ */ _classPrivateFieldLooseKey("queued"), _emitter = /* @__PURE__ */ _classPrivateFieldLooseKey("emitter"), _isOpen = /* @__PURE__ */ _classPrivateFieldLooseKey("isOpen"), _socket = /* @__PURE__ */ _classPrivateFieldLooseKey("socket"), _handleMessage = /* @__PURE__ */ _classPrivateFieldLooseKey("handleMessage"), _Symbol$for = Symbol.for("uppy test: getSocket"), _Symbol$for2 = Symbol.for("uppy test: getQueued"), class UppySocket {
        constructor(opts) {
          Object.defineProperty(this, _queued, {
            writable: true,
            value: []
          });
          Object.defineProperty(this, _emitter, {
            writable: true,
            value: ee()
          });
          Object.defineProperty(this, _isOpen, {
            writable: true,
            value: false
          });
          Object.defineProperty(this, _socket, {
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, _handleMessage, {
            writable: true,
            value: (e2) => {
              try {
                const message = JSON.parse(e2.data);
                this.emit(message.action, message.payload);
              } catch (err) {
                console.log(err);
              }
            }
          });
          this.opts = opts;
          if (!opts || opts.autoOpen !== false) {
            this.open();
          }
        }
        get isOpen() {
          return _classPrivateFieldLooseBase(this, _isOpen)[_isOpen];
        }
        [_Symbol$for]() {
          return _classPrivateFieldLooseBase(this, _socket)[_socket];
        }
        [_Symbol$for2]() {
          return _classPrivateFieldLooseBase(this, _queued)[_queued];
        }
        open() {
          _classPrivateFieldLooseBase(this, _socket)[_socket] = new WebSocket(this.opts.target);
          _classPrivateFieldLooseBase(this, _socket)[_socket].onopen = () => {
            _classPrivateFieldLooseBase(this, _isOpen)[_isOpen] = true;
            while (_classPrivateFieldLooseBase(this, _queued)[_queued].length > 0 && _classPrivateFieldLooseBase(this, _isOpen)[_isOpen]) {
              const first = _classPrivateFieldLooseBase(this, _queued)[_queued].shift();
              this.send(first.action, first.payload);
            }
          };
          _classPrivateFieldLooseBase(this, _socket)[_socket].onclose = () => {
            _classPrivateFieldLooseBase(this, _isOpen)[_isOpen] = false;
          };
          _classPrivateFieldLooseBase(this, _socket)[_socket].onmessage = _classPrivateFieldLooseBase(this, _handleMessage)[_handleMessage];
        }
        close() {
          var _classPrivateFieldLoo;
          (_classPrivateFieldLoo = _classPrivateFieldLooseBase(this, _socket)[_socket]) == null ? void 0 : _classPrivateFieldLoo.close();
        }
        send(action, payload) {
          if (!_classPrivateFieldLooseBase(this, _isOpen)[_isOpen]) {
            _classPrivateFieldLooseBase(this, _queued)[_queued].push({
              action,
              payload
            });
            return;
          }
          _classPrivateFieldLooseBase(this, _socket)[_socket].send(JSON.stringify({
            action,
            payload
          }));
        }
        on(action, handler) {
          _classPrivateFieldLooseBase(this, _emitter)[_emitter].on(action, handler);
        }
        emit(action, payload) {
          _classPrivateFieldLooseBase(this, _emitter)[_emitter].emit(action, payload);
        }
        once(action, handler) {
          _classPrivateFieldLooseBase(this, _emitter)[_emitter].once(action, handler);
        }
      });
    }
  });

  // ../packages/@uppy/companion-client/lib/index.js
  var require_lib4 = __commonJS({
    "../packages/@uppy/companion-client/lib/index.js"(exports, module) {
      "use strict";
      var RequestClient = require_RequestClient();
      var Provider = require_Provider();
      var SearchProvider = require_SearchProvider();
      var Socket = require_Socket();
      module.exports = {
        RequestClient,
        Provider,
        SearchProvider,
        Socket
      };
    }
  });

  // ../packages/@uppy/utils/lib/emitSocketProgress.js
  var require_emitSocketProgress = __commonJS({
    "../packages/@uppy/utils/lib/emitSocketProgress.js"(exports, module) {
      var throttle = require_lodash();
      function emitSocketProgress(uploader, progressData, file) {
        const {
          progress,
          bytesUploaded,
          bytesTotal
        } = progressData;
        if (progress) {
          uploader.uppy.log(`Upload progress: ${progress}`);
          uploader.uppy.emit("upload-progress", file, {
            uploader,
            bytesUploaded,
            bytesTotal
          });
        }
      }
      module.exports = throttle(emitSocketProgress, 300, {
        leading: true,
        trailing: true
      });
    }
  });

  // ../packages/@uppy/utils/lib/getSocketHost.js
  var require_getSocketHost = __commonJS({
    "../packages/@uppy/utils/lib/getSocketHost.js"(exports, module) {
      module.exports = function getSocketHost(url) {
        const regex = /^(?:https?:\/\/|\/\/)?(?:[^@\n]+@)?(?:www\.)?([^\n]+)/i;
        const host = regex.exec(url)[1];
        const socketProtocol = /^http:\/\//i.test(url) ? "ws" : "wss";
        return `${socketProtocol}://${host}`;
      };
    }
  });

  // ../packages/@uppy/utils/lib/settle.js
  var require_settle = __commonJS({
    "../packages/@uppy/utils/lib/settle.js"(exports, module) {
      module.exports = function settle(promises) {
        const resolutions = [];
        const rejections = [];
        function resolved(value) {
          resolutions.push(value);
        }
        function rejected(error) {
          rejections.push(error);
        }
        const wait = Promise.all(promises.map((promise) => promise.then(resolved, rejected)));
        return wait.then(() => {
          return {
            successful: resolutions,
            failed: rejections
          };
        });
      };
    }
  });

  // ../packages/@uppy/utils/lib/EventTracker.js
  var require_EventTracker = __commonJS({
    "../packages/@uppy/utils/lib/EventTracker.js"(exports, module) {
      var _emitter;
      var _events;
      function _classPrivateFieldLooseBase(receiver, privateKey) {
        if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
          throw new TypeError("attempted to use private field on non-instance");
        }
        return receiver;
      }
      var id = 0;
      function _classPrivateFieldLooseKey(name) {
        return "__private_" + id++ + "_" + name;
      }
      module.exports = (_emitter = /* @__PURE__ */ _classPrivateFieldLooseKey("emitter"), _events = /* @__PURE__ */ _classPrivateFieldLooseKey("events"), class EventTracker {
        constructor(emitter) {
          Object.defineProperty(this, _emitter, {
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, _events, {
            writable: true,
            value: []
          });
          _classPrivateFieldLooseBase(this, _emitter)[_emitter] = emitter;
        }
        on(event, fn) {
          _classPrivateFieldLooseBase(this, _events)[_events].push([event, fn]);
          return _classPrivateFieldLooseBase(this, _emitter)[_emitter].on(event, fn);
        }
        remove() {
          for (const [event, fn] of _classPrivateFieldLooseBase(this, _events)[_events].splice(0)) {
            _classPrivateFieldLooseBase(this, _emitter)[_emitter].off(event, fn);
          }
        }
      });
    }
  });

  // ../packages/@uppy/utils/lib/ProgressTimeout.js
  var require_ProgressTimeout = __commonJS({
    "../packages/@uppy/utils/lib/ProgressTimeout.js"(exports, module) {
      function _classPrivateFieldLooseBase(receiver, privateKey) {
        if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
          throw new TypeError("attempted to use private field on non-instance");
        }
        return receiver;
      }
      var id = 0;
      function _classPrivateFieldLooseKey(name) {
        return "__private_" + id++ + "_" + name;
      }
      var _aliveTimer = /* @__PURE__ */ _classPrivateFieldLooseKey("aliveTimer");
      var _isDone = /* @__PURE__ */ _classPrivateFieldLooseKey("isDone");
      var _onTimedOut = /* @__PURE__ */ _classPrivateFieldLooseKey("onTimedOut");
      var _timeout = /* @__PURE__ */ _classPrivateFieldLooseKey("timeout");
      var ProgressTimeout = class {
        constructor(timeout, timeoutHandler) {
          Object.defineProperty(this, _aliveTimer, {
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, _isDone, {
            writable: true,
            value: false
          });
          Object.defineProperty(this, _onTimedOut, {
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, _timeout, {
            writable: true,
            value: void 0
          });
          _classPrivateFieldLooseBase(this, _timeout)[_timeout] = timeout;
          _classPrivateFieldLooseBase(this, _onTimedOut)[_onTimedOut] = timeoutHandler;
        }
        progress() {
          if (_classPrivateFieldLooseBase(this, _isDone)[_isDone])
            return;
          if (_classPrivateFieldLooseBase(this, _timeout)[_timeout] > 0) {
            clearTimeout(_classPrivateFieldLooseBase(this, _aliveTimer)[_aliveTimer]);
            _classPrivateFieldLooseBase(this, _aliveTimer)[_aliveTimer] = setTimeout(_classPrivateFieldLooseBase(this, _onTimedOut)[_onTimedOut], _classPrivateFieldLooseBase(this, _timeout)[_timeout]);
          }
        }
        done() {
          if (!_classPrivateFieldLooseBase(this, _isDone)[_isDone]) {
            clearTimeout(_classPrivateFieldLooseBase(this, _aliveTimer)[_aliveTimer]);
            _classPrivateFieldLooseBase(this, _aliveTimer)[_aliveTimer] = null;
            _classPrivateFieldLooseBase(this, _isDone)[_isDone] = true;
          }
        }
      };
      module.exports = ProgressTimeout;
    }
  });

  // ../packages/@uppy/utils/lib/RateLimitedQueue.js
  var require_RateLimitedQueue = __commonJS({
    "../packages/@uppy/utils/lib/RateLimitedQueue.js"(exports, module) {
      function _classPrivateFieldLooseBase(receiver, privateKey) {
        if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
          throw new TypeError("attempted to use private field on non-instance");
        }
        return receiver;
      }
      var id = 0;
      function _classPrivateFieldLooseKey(name) {
        return "__private_" + id++ + "_" + name;
      }
      function createCancelError() {
        return new Error("Cancelled");
      }
      var _activeRequests = /* @__PURE__ */ _classPrivateFieldLooseKey("activeRequests");
      var _queuedHandlers = /* @__PURE__ */ _classPrivateFieldLooseKey("queuedHandlers");
      var _paused = /* @__PURE__ */ _classPrivateFieldLooseKey("paused");
      var _pauseTimer = /* @__PURE__ */ _classPrivateFieldLooseKey("pauseTimer");
      var _downLimit = /* @__PURE__ */ _classPrivateFieldLooseKey("downLimit");
      var _upperLimit = /* @__PURE__ */ _classPrivateFieldLooseKey("upperLimit");
      var _rateLimitingTimer = /* @__PURE__ */ _classPrivateFieldLooseKey("rateLimitingTimer");
      var _call = /* @__PURE__ */ _classPrivateFieldLooseKey("call");
      var _queueNext = /* @__PURE__ */ _classPrivateFieldLooseKey("queueNext");
      var _next = /* @__PURE__ */ _classPrivateFieldLooseKey("next");
      var _queue = /* @__PURE__ */ _classPrivateFieldLooseKey("queue");
      var _dequeue = /* @__PURE__ */ _classPrivateFieldLooseKey("dequeue");
      var _resume = /* @__PURE__ */ _classPrivateFieldLooseKey("resume");
      var _increaseLimit = /* @__PURE__ */ _classPrivateFieldLooseKey("increaseLimit");
      var RateLimitedQueue = class {
        constructor(limit) {
          Object.defineProperty(this, _dequeue, {
            value: _dequeue2
          });
          Object.defineProperty(this, _queue, {
            value: _queue2
          });
          Object.defineProperty(this, _next, {
            value: _next2
          });
          Object.defineProperty(this, _queueNext, {
            value: _queueNext2
          });
          Object.defineProperty(this, _call, {
            value: _call2
          });
          Object.defineProperty(this, _activeRequests, {
            writable: true,
            value: 0
          });
          Object.defineProperty(this, _queuedHandlers, {
            writable: true,
            value: []
          });
          Object.defineProperty(this, _paused, {
            writable: true,
            value: false
          });
          Object.defineProperty(this, _pauseTimer, {
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, _downLimit, {
            writable: true,
            value: 1
          });
          Object.defineProperty(this, _upperLimit, {
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, _rateLimitingTimer, {
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, _resume, {
            writable: true,
            value: () => this.resume()
          });
          Object.defineProperty(this, _increaseLimit, {
            writable: true,
            value: () => {
              if (_classPrivateFieldLooseBase(this, _paused)[_paused]) {
                _classPrivateFieldLooseBase(this, _rateLimitingTimer)[_rateLimitingTimer] = setTimeout(_classPrivateFieldLooseBase(this, _increaseLimit)[_increaseLimit], 0);
                return;
              }
              _classPrivateFieldLooseBase(this, _downLimit)[_downLimit] = this.limit;
              this.limit = Math.ceil((_classPrivateFieldLooseBase(this, _upperLimit)[_upperLimit] + _classPrivateFieldLooseBase(this, _downLimit)[_downLimit]) / 2);
              for (let i2 = _classPrivateFieldLooseBase(this, _downLimit)[_downLimit]; i2 <= this.limit; i2++) {
                _classPrivateFieldLooseBase(this, _queueNext)[_queueNext]();
              }
              if (_classPrivateFieldLooseBase(this, _upperLimit)[_upperLimit] - _classPrivateFieldLooseBase(this, _downLimit)[_downLimit] > 3) {
                _classPrivateFieldLooseBase(this, _rateLimitingTimer)[_rateLimitingTimer] = setTimeout(_classPrivateFieldLooseBase(this, _increaseLimit)[_increaseLimit], 2e3);
              } else {
                _classPrivateFieldLooseBase(this, _downLimit)[_downLimit] = Math.floor(_classPrivateFieldLooseBase(this, _downLimit)[_downLimit] / 2);
              }
            }
          });
          if (typeof limit !== "number" || limit === 0) {
            this.limit = Infinity;
          } else {
            this.limit = limit;
          }
        }
        run(fn, queueOptions) {
          if (!_classPrivateFieldLooseBase(this, _paused)[_paused] && _classPrivateFieldLooseBase(this, _activeRequests)[_activeRequests] < this.limit) {
            return _classPrivateFieldLooseBase(this, _call)[_call](fn);
          }
          return _classPrivateFieldLooseBase(this, _queue)[_queue](fn, queueOptions);
        }
        wrapPromiseFunction(fn, queueOptions) {
          var _this = this;
          return function() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            let queuedRequest;
            const outerPromise = new Promise((resolve, reject) => {
              queuedRequest = _this.run(() => {
                let cancelError;
                let innerPromise;
                try {
                  innerPromise = Promise.resolve(fn(...args));
                } catch (err) {
                  innerPromise = Promise.reject(err);
                }
                innerPromise.then((result) => {
                  if (cancelError) {
                    reject(cancelError);
                  } else {
                    queuedRequest.done();
                    resolve(result);
                  }
                }, (err) => {
                  if (cancelError) {
                    reject(cancelError);
                  } else {
                    queuedRequest.done();
                    reject(err);
                  }
                });
                return () => {
                  cancelError = createCancelError();
                };
              }, queueOptions);
            });
            outerPromise.abort = () => {
              queuedRequest.abort();
            };
            return outerPromise;
          };
        }
        resume() {
          _classPrivateFieldLooseBase(this, _paused)[_paused] = false;
          clearTimeout(_classPrivateFieldLooseBase(this, _pauseTimer)[_pauseTimer]);
          for (let i2 = 0; i2 < this.limit; i2++) {
            _classPrivateFieldLooseBase(this, _queueNext)[_queueNext]();
          }
        }
        pause(duration) {
          if (duration === void 0) {
            duration = null;
          }
          _classPrivateFieldLooseBase(this, _paused)[_paused] = true;
          clearTimeout(_classPrivateFieldLooseBase(this, _pauseTimer)[_pauseTimer]);
          if (duration != null) {
            _classPrivateFieldLooseBase(this, _pauseTimer)[_pauseTimer] = setTimeout(_classPrivateFieldLooseBase(this, _resume)[_resume], duration);
          }
        }
        rateLimit(duration) {
          clearTimeout(_classPrivateFieldLooseBase(this, _rateLimitingTimer)[_rateLimitingTimer]);
          this.pause(duration);
          if (this.limit > 1 && Number.isFinite(this.limit)) {
            _classPrivateFieldLooseBase(this, _upperLimit)[_upperLimit] = this.limit - 1;
            this.limit = _classPrivateFieldLooseBase(this, _downLimit)[_downLimit];
            _classPrivateFieldLooseBase(this, _rateLimitingTimer)[_rateLimitingTimer] = setTimeout(_classPrivateFieldLooseBase(this, _increaseLimit)[_increaseLimit], duration);
          }
        }
        get isPaused() {
          return _classPrivateFieldLooseBase(this, _paused)[_paused];
        }
      };
      function _call2(fn) {
        _classPrivateFieldLooseBase(this, _activeRequests)[_activeRequests] += 1;
        let done = false;
        let cancelActive;
        try {
          cancelActive = fn();
        } catch (err) {
          _classPrivateFieldLooseBase(this, _activeRequests)[_activeRequests] -= 1;
          throw err;
        }
        return {
          abort: () => {
            if (done)
              return;
            done = true;
            _classPrivateFieldLooseBase(this, _activeRequests)[_activeRequests] -= 1;
            cancelActive();
            _classPrivateFieldLooseBase(this, _queueNext)[_queueNext]();
          },
          done: () => {
            if (done)
              return;
            done = true;
            _classPrivateFieldLooseBase(this, _activeRequests)[_activeRequests] -= 1;
            _classPrivateFieldLooseBase(this, _queueNext)[_queueNext]();
          }
        };
      }
      function _queueNext2() {
        queueMicrotask(() => _classPrivateFieldLooseBase(this, _next)[_next]());
      }
      function _next2() {
        if (_classPrivateFieldLooseBase(this, _paused)[_paused] || _classPrivateFieldLooseBase(this, _activeRequests)[_activeRequests] >= this.limit) {
          return;
        }
        if (_classPrivateFieldLooseBase(this, _queuedHandlers)[_queuedHandlers].length === 0) {
          return;
        }
        const next = _classPrivateFieldLooseBase(this, _queuedHandlers)[_queuedHandlers].shift();
        const handler = _classPrivateFieldLooseBase(this, _call)[_call](next.fn);
        next.abort = handler.abort;
        next.done = handler.done;
      }
      function _queue2(fn, options) {
        if (options === void 0) {
          options = {};
        }
        const handler = {
          fn,
          priority: options.priority || 0,
          abort: () => {
            _classPrivateFieldLooseBase(this, _dequeue)[_dequeue](handler);
          },
          done: () => {
            throw new Error("Cannot mark a queued request as done: this indicates a bug");
          }
        };
        const index = _classPrivateFieldLooseBase(this, _queuedHandlers)[_queuedHandlers].findIndex((other) => {
          return handler.priority > other.priority;
        });
        if (index === -1) {
          _classPrivateFieldLooseBase(this, _queuedHandlers)[_queuedHandlers].push(handler);
        } else {
          _classPrivateFieldLooseBase(this, _queuedHandlers)[_queuedHandlers].splice(index, 0, handler);
        }
        return handler;
      }
      function _dequeue2(handler) {
        const index = _classPrivateFieldLooseBase(this, _queuedHandlers)[_queuedHandlers].indexOf(handler);
        if (index !== -1) {
          _classPrivateFieldLooseBase(this, _queuedHandlers)[_queuedHandlers].splice(index, 1);
        }
      }
      module.exports = {
        RateLimitedQueue,
        internalRateLimitedQueue: Symbol("__queue")
      };
    }
  });

  // ../packages/@uppy/utils/lib/isNetworkError.js
  var require_isNetworkError = __commonJS({
    "../packages/@uppy/utils/lib/isNetworkError.js"(exports, module) {
      function isNetworkError(xhr) {
        if (!xhr) {
          return false;
        }
        return xhr.readyState !== 0 && xhr.readyState !== 4 || xhr.status === 0;
      }
      module.exports = isNetworkError;
    }
  });

  // ../packages/@uppy/xhr-upload/lib/locale.js
  var require_locale3 = __commonJS({
    "../packages/@uppy/xhr-upload/lib/locale.js"(exports, module) {
      module.exports = {
        strings: {
          timedOut: "Upload stalled for %{seconds} seconds, aborting."
        }
      };
    }
  });

  // ../packages/@uppy/xhr-upload/lib/index.js
  var require_lib5 = __commonJS({
    "../packages/@uppy/xhr-upload/lib/index.js"(exports, module) {
      var _class;
      var _temp;
      var BasePlugin = require_BasePlugin();
      var {
        nanoid
      } = require_non_secure();
      var {
        Provider,
        RequestClient,
        Socket
      } = require_lib4();
      var emitSocketProgress = require_emitSocketProgress();
      var getSocketHost = require_getSocketHost();
      var settle = require_settle();
      var EventTracker = require_EventTracker();
      var ProgressTimeout = require_ProgressTimeout();
      var {
        RateLimitedQueue,
        internalRateLimitedQueue
      } = require_RateLimitedQueue();
      var NetworkError = require_NetworkError();
      var isNetworkError = require_isNetworkError();
      var locale = require_locale3();
      function buildResponseError(xhr, err) {
        let error = err;
        if (!error)
          error = new Error("Upload error");
        if (typeof error === "string")
          error = new Error(error);
        if (!(error instanceof Error)) {
          error = Object.assign(new Error("Upload error"), {
            data: error
          });
        }
        if (isNetworkError(xhr)) {
          error = new NetworkError(error, xhr);
          return error;
        }
        error.request = xhr;
        return error;
      }
      function setTypeInBlob(file) {
        const dataWithUpdatedType = file.data.slice(0, file.data.size, file.meta.type);
        return dataWithUpdatedType;
      }
      module.exports = (_temp = _class = class XHRUpload extends BasePlugin {
        constructor(uppy2, opts) {
          super(uppy2, opts);
          this.type = "uploader";
          this.id = this.opts.id || "XHRUpload";
          this.title = "XHRUpload";
          this.defaultLocale = locale;
          const defaultOptions = {
            formData: true,
            fieldName: opts.bundle ? "files[]" : "file",
            method: "post",
            metaFields: null,
            responseUrlFieldName: "url",
            bundle: false,
            headers: {},
            timeout: 30 * 1e3,
            limit: 5,
            withCredentials: false,
            responseType: "",
            getResponseData(responseText) {
              let parsedResponse = {};
              try {
                parsedResponse = JSON.parse(responseText);
              } catch (err) {
                uppy2.log(err);
              }
              return parsedResponse;
            },
            getResponseError(_2, response) {
              let error = new Error("Upload error");
              if (isNetworkError(response)) {
                error = new NetworkError(error, response);
              }
              return error;
            },
            validateStatus(status) {
              return status >= 200 && status < 300;
            }
          };
          this.opts = {
            ...defaultOptions,
            ...opts
          };
          this.i18nInit();
          this.handleUpload = this.handleUpload.bind(this);
          if (internalRateLimitedQueue in this.opts) {
            this.requests = this.opts[internalRateLimitedQueue];
          } else {
            this.requests = new RateLimitedQueue(this.opts.limit);
          }
          if (this.opts.bundle && !this.opts.formData) {
            throw new Error("`opts.formData` must be true when `opts.bundle` is enabled.");
          }
          this.uploaderEvents = Object.create(null);
        }
        getOptions(file) {
          const overrides = this.uppy.getState().xhrUpload;
          const {
            headers
          } = this.opts;
          const opts = {
            ...this.opts,
            ...overrides || {},
            ...file.xhrUpload || {},
            headers: {}
          };
          if (typeof headers === "function") {
            opts.headers = headers(file);
          } else {
            Object.assign(opts.headers, this.opts.headers);
          }
          if (overrides) {
            Object.assign(opts.headers, overrides.headers);
          }
          if (file.xhrUpload) {
            Object.assign(opts.headers, file.xhrUpload.headers);
          }
          return opts;
        }
        addMetadata(formData, meta, opts) {
          const metaFields = Array.isArray(opts.metaFields) ? opts.metaFields : Object.keys(meta);
          metaFields.forEach((item) => {
            formData.append(item, meta[item]);
          });
        }
        createFormDataUpload(file, opts) {
          const formPost = new FormData();
          this.addMetadata(formPost, file.meta, opts);
          const dataWithUpdatedType = setTypeInBlob(file);
          if (file.name) {
            formPost.append(opts.fieldName, dataWithUpdatedType, file.meta.name);
          } else {
            formPost.append(opts.fieldName, dataWithUpdatedType);
          }
          return formPost;
        }
        createBundledUpload(files, opts) {
          const formPost = new FormData();
          const {
            meta
          } = this.uppy.getState();
          this.addMetadata(formPost, meta, opts);
          files.forEach((file) => {
            const options = this.getOptions(file);
            const dataWithUpdatedType = setTypeInBlob(file);
            if (file.name) {
              formPost.append(options.fieldName, dataWithUpdatedType, file.name);
            } else {
              formPost.append(options.fieldName, dataWithUpdatedType);
            }
          });
          return formPost;
        }
        upload(file, current, total) {
          const opts = this.getOptions(file);
          this.uppy.log(`uploading ${current} of ${total}`);
          return new Promise((resolve, reject) => {
            this.uppy.emit("upload-started", file);
            const data = opts.formData ? this.createFormDataUpload(file, opts) : file.data;
            const xhr = new XMLHttpRequest();
            this.uploaderEvents[file.id] = new EventTracker(this.uppy);
            const timer = new ProgressTimeout(opts.timeout, () => {
              xhr.abort();
              queuedRequest.done();
              const error = new Error(this.i18n("timedOut", {
                seconds: Math.ceil(opts.timeout / 1e3)
              }));
              this.uppy.emit("upload-error", file, error);
              reject(error);
            });
            const id = nanoid();
            xhr.upload.addEventListener("loadstart", () => {
              this.uppy.log(`[XHRUpload] ${id} started`);
            });
            xhr.upload.addEventListener("progress", (ev) => {
              this.uppy.log(`[XHRUpload] ${id} progress: ${ev.loaded} / ${ev.total}`);
              timer.progress();
              if (ev.lengthComputable) {
                this.uppy.emit("upload-progress", file, {
                  uploader: this,
                  bytesUploaded: ev.loaded,
                  bytesTotal: ev.total
                });
              }
            });
            xhr.addEventListener("load", (ev) => {
              this.uppy.log(`[XHRUpload] ${id} finished`);
              timer.done();
              queuedRequest.done();
              if (this.uploaderEvents[file.id]) {
                this.uploaderEvents[file.id].remove();
                this.uploaderEvents[file.id] = null;
              }
              if (opts.validateStatus(ev.target.status, xhr.responseText, xhr)) {
                const body2 = opts.getResponseData(xhr.responseText, xhr);
                const uploadURL = body2[opts.responseUrlFieldName];
                const uploadResp = {
                  status: ev.target.status,
                  body: body2,
                  uploadURL
                };
                this.uppy.emit("upload-success", file, uploadResp);
                if (uploadURL) {
                  this.uppy.log(`Download ${file.name} from ${uploadURL}`);
                }
                return resolve(file);
              }
              const body = opts.getResponseData(xhr.responseText, xhr);
              const error = buildResponseError(xhr, opts.getResponseError(xhr.responseText, xhr));
              const response = {
                status: ev.target.status,
                body
              };
              this.uppy.emit("upload-error", file, error, response);
              return reject(error);
            });
            xhr.addEventListener("error", () => {
              this.uppy.log(`[XHRUpload] ${id} errored`);
              timer.done();
              queuedRequest.done();
              if (this.uploaderEvents[file.id]) {
                this.uploaderEvents[file.id].remove();
                this.uploaderEvents[file.id] = null;
              }
              const error = buildResponseError(xhr, opts.getResponseError(xhr.responseText, xhr));
              this.uppy.emit("upload-error", file, error);
              return reject(error);
            });
            xhr.open(opts.method.toUpperCase(), opts.endpoint, true);
            xhr.withCredentials = opts.withCredentials;
            if (opts.responseType !== "") {
              xhr.responseType = opts.responseType;
            }
            const queuedRequest = this.requests.run(() => {
              this.uppy.emit("upload-started", file);
              const currentOpts = this.getOptions(file);
              Object.keys(currentOpts.headers).forEach((header) => {
                xhr.setRequestHeader(header, currentOpts.headers[header]);
              });
              xhr.send(data);
              return () => {
                timer.done();
                xhr.abort();
              };
            });
            this.onFileRemove(file.id, () => {
              queuedRequest.abort();
              reject(new Error("File removed"));
            });
            this.onCancelAll(file.id, (_ref) => {
              let {
                reason
              } = _ref;
              if (reason === "user") {
                queuedRequest.abort();
              }
              reject(new Error("Upload cancelled"));
            });
          });
        }
        uploadRemote(file) {
          const opts = this.getOptions(file);
          return new Promise((resolve, reject) => {
            this.uppy.emit("upload-started", file);
            const fields = {};
            const metaFields = Array.isArray(opts.metaFields) ? opts.metaFields : Object.keys(file.meta);
            metaFields.forEach((name) => {
              fields[name] = file.meta[name];
            });
            const Client = file.remote.providerOptions.provider ? Provider : RequestClient;
            const client = new Client(this.uppy, file.remote.providerOptions);
            client.post(file.remote.url, {
              ...file.remote.body,
              endpoint: opts.endpoint,
              size: file.data.size,
              fieldname: opts.fieldName,
              metadata: fields,
              httpMethod: opts.method,
              useFormData: opts.formData,
              headers: opts.headers
            }).then((res) => {
              const {
                token
              } = res;
              const host = getSocketHost(file.remote.companionUrl);
              const socket = new Socket({
                target: `${host}/api/${token}`,
                autoOpen: false
              });
              this.uploaderEvents[file.id] = new EventTracker(this.uppy);
              this.onFileRemove(file.id, () => {
                socket.send("cancel", {});
                queuedRequest.abort();
                resolve(`upload ${file.id} was removed`);
              });
              this.onCancelAll(file.id, function(_temp2) {
                let {
                  reason
                } = _temp2 === void 0 ? {} : _temp2;
                if (reason === "user") {
                  socket.send("cancel", {});
                  queuedRequest.abort();
                }
                resolve(`upload ${file.id} was canceled`);
              });
              this.onRetry(file.id, () => {
                socket.send("pause", {});
                socket.send("resume", {});
              });
              this.onRetryAll(file.id, () => {
                socket.send("pause", {});
                socket.send("resume", {});
              });
              socket.on("progress", (progressData) => emitSocketProgress(this, progressData, file));
              socket.on("success", (data) => {
                const body = opts.getResponseData(data.response.responseText, data.response);
                const uploadURL = body[opts.responseUrlFieldName];
                const uploadResp = {
                  status: data.response.status,
                  body,
                  uploadURL
                };
                this.uppy.emit("upload-success", file, uploadResp);
                queuedRequest.done();
                if (this.uploaderEvents[file.id]) {
                  this.uploaderEvents[file.id].remove();
                  this.uploaderEvents[file.id] = null;
                }
                return resolve();
              });
              socket.on("error", (errData) => {
                const resp = errData.response;
                const error = resp ? opts.getResponseError(resp.responseText, resp) : Object.assign(new Error(errData.error.message), {
                  cause: errData.error
                });
                this.uppy.emit("upload-error", file, error);
                queuedRequest.done();
                if (this.uploaderEvents[file.id]) {
                  this.uploaderEvents[file.id].remove();
                  this.uploaderEvents[file.id] = null;
                }
                reject(error);
              });
              const queuedRequest = this.requests.run(() => {
                socket.open();
                if (file.isPaused) {
                  socket.send("pause", {});
                }
                return () => socket.close();
              });
            }).catch((err) => {
              this.uppy.emit("upload-error", file, err);
              reject(err);
            });
          });
        }
        uploadBundle(files) {
          return new Promise((resolve, reject) => {
            const {
              endpoint
            } = this.opts;
            const {
              method
            } = this.opts;
            const optsFromState = this.uppy.getState().xhrUpload;
            const formData = this.createBundledUpload(files, {
              ...this.opts,
              ...optsFromState || {}
            });
            const xhr = new XMLHttpRequest();
            const timer = new ProgressTimeout(this.opts.timeout, () => {
              xhr.abort();
              const error = new Error(this.i18n("timedOut", {
                seconds: Math.ceil(this.opts.timeout / 1e3)
              }));
              emitError(error);
              reject(error);
            });
            const emitError = (error) => {
              files.forEach((file) => {
                this.uppy.emit("upload-error", file, error);
              });
            };
            xhr.upload.addEventListener("loadstart", () => {
              this.uppy.log("[XHRUpload] started uploading bundle");
              timer.progress();
            });
            xhr.upload.addEventListener("progress", (ev) => {
              timer.progress();
              if (!ev.lengthComputable)
                return;
              files.forEach((file) => {
                this.uppy.emit("upload-progress", file, {
                  uploader: this,
                  bytesUploaded: ev.loaded / ev.total * file.size,
                  bytesTotal: file.size
                });
              });
            });
            xhr.addEventListener("load", (ev) => {
              timer.done();
              if (this.opts.validateStatus(ev.target.status, xhr.responseText, xhr)) {
                const body = this.opts.getResponseData(xhr.responseText, xhr);
                const uploadResp = {
                  status: ev.target.status,
                  body
                };
                files.forEach((file) => {
                  this.uppy.emit("upload-success", file, uploadResp);
                });
                return resolve();
              }
              const error = this.opts.getResponseError(xhr.responseText, xhr) || new Error("Upload error");
              error.request = xhr;
              emitError(error);
              return reject(error);
            });
            xhr.addEventListener("error", () => {
              timer.done();
              const error = this.opts.getResponseError(xhr.responseText, xhr) || new Error("Upload error");
              emitError(error);
              return reject(error);
            });
            this.uppy.on("cancel-all", function(_temp3) {
              let {
                reason
              } = _temp3 === void 0 ? {} : _temp3;
              if (reason !== "user")
                return;
              timer.done();
              xhr.abort();
            });
            xhr.open(method.toUpperCase(), endpoint, true);
            xhr.withCredentials = this.opts.withCredentials;
            if (this.opts.responseType !== "") {
              xhr.responseType = this.opts.responseType;
            }
            Object.keys(this.opts.headers).forEach((header) => {
              xhr.setRequestHeader(header, this.opts.headers[header]);
            });
            xhr.send(formData);
            files.forEach((file) => {
              this.uppy.emit("upload-started", file);
            });
          });
        }
        uploadFiles(files) {
          const promises = files.map((file, i2) => {
            const current = parseInt(i2, 10) + 1;
            const total = files.length;
            if (file.error) {
              return Promise.reject(new Error(file.error));
            }
            if (file.isRemote) {
              return this.uploadRemote(file, current, total);
            }
            return this.upload(file, current, total);
          });
          return settle(promises);
        }
        onFileRemove(fileID, cb) {
          this.uploaderEvents[fileID].on("file-removed", (file) => {
            if (fileID === file.id)
              cb(file.id);
          });
        }
        onRetry(fileID, cb) {
          this.uploaderEvents[fileID].on("upload-retry", (targetFileID) => {
            if (fileID === targetFileID) {
              cb();
            }
          });
        }
        onRetryAll(fileID, cb) {
          this.uploaderEvents[fileID].on("retry-all", () => {
            if (!this.uppy.getFile(fileID))
              return;
            cb();
          });
        }
        onCancelAll(fileID, eventHandler) {
          var _this = this;
          this.uploaderEvents[fileID].on("cancel-all", function() {
            if (!_this.uppy.getFile(fileID))
              return;
            eventHandler(...arguments);
          });
        }
        handleUpload(fileIDs) {
          if (fileIDs.length === 0) {
            this.uppy.log("[XHRUpload] No files to upload!");
            return Promise.resolve();
          }
          if (this.opts.limit === 0 && !this.opts[internalRateLimitedQueue]) {
            this.uppy.log("[XHRUpload] When uploading multiple files at once, consider setting the `limit` option (to `10` for example), to limit the number of concurrent uploads, which helps prevent memory and network issues: https://uppy.io/docs/xhr-upload/#limit-0", "warning");
          }
          this.uppy.log("[XHRUpload] Uploading...");
          const files = fileIDs.map((fileID) => this.uppy.getFile(fileID));
          if (this.opts.bundle) {
            const isSomeFileRemote = files.some((file) => file.isRemote);
            if (isSomeFileRemote) {
              throw new Error("Can\u2019t upload remote files when the `bundle: true` option is set");
            }
            if (typeof this.opts.headers === "function") {
              throw new TypeError("`headers` may not be a function when the `bundle: true` option is set");
            }
            return this.uploadBundle(files);
          }
          return this.uploadFiles(files).then(() => null);
        }
        install() {
          if (this.opts.bundle) {
            const {
              capabilities
            } = this.uppy.getState();
            this.uppy.setState({
              capabilities: {
                ...capabilities,
                individualCancellation: false
              }
            });
          }
          this.uppy.addUploader(this.handleUpload);
        }
        uninstall() {
          if (this.opts.bundle) {
            const {
              capabilities
            } = this.uppy.getState();
            this.uppy.setState({
              capabilities: {
                ...capabilities,
                individualCancellation: true
              }
            });
          }
          this.uppy.removeUploader(this.handleUpload);
        }
      }, _class.VERSION = "2.0.7", _temp);
    }
  });

  // ../packages/@uppy/progress-bar/lib/index.js
  var require_lib6 = __commonJS({
    "../packages/@uppy/progress-bar/lib/index.js"(exports, module) {
      var _class;
      var _temp;
      var {
        UIPlugin
      } = require_lib2();
      var {
        h: h2
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      module.exports = (_temp = _class = class ProgressBar extends UIPlugin {
        constructor(uppy2, opts) {
          super(uppy2, opts);
          this.id = this.opts.id || "ProgressBar";
          this.title = "Progress Bar";
          this.type = "progressindicator";
          const defaultOptions = {
            target: "body",
            fixed: false,
            hideAfterFinish: true
          };
          this.opts = {
            ...defaultOptions,
            ...opts
          };
          this.render = this.render.bind(this);
        }
        render(state) {
          const progress = state.totalProgress || 0;
          const isHidden = (progress === 0 || progress === 100) && this.opts.hideAfterFinish;
          return h2("div", {
            className: "uppy uppy-ProgressBar",
            style: {
              position: this.opts.fixed ? "fixed" : "initial"
            },
            "aria-hidden": isHidden
          }, h2("div", {
            className: "uppy-ProgressBar-inner",
            style: {
              width: `${progress}%`
            }
          }), h2("div", {
            className: "uppy-ProgressBar-percentage"
          }, progress));
        }
        install() {
          const {
            target
          } = this.opts;
          if (target) {
            this.mount(target, this);
          }
        }
        uninstall() {
          this.unmount();
        }
      }, _class.VERSION = "2.0.4", _temp);
    }
  });

  // src/examples/xhrupload/app.es6
  var Uppy = require_lib2();
  var FileInput = require_lib3();
  var XHRUpload = require_lib5();
  var ProgressBar = require_lib6();
  document.querySelector(".Uppy").innerHTML = "";
  var uppy = new Uppy({
    debug: true,
    autoProceed: true
  });
  uppy.use(FileInput, {
    target: ".Uppy"
  });
  uppy.use(ProgressBar, {
    target: ".UppyProgressBar",
    hideAfterFinish: false
  });
  uppy.use(XHRUpload, {
    endpoint: "https://xhr-server.herokuapp.com/upload",
    formData: true,
    fieldName: "files[]"
  });
  uppy.on("upload-success", (file, response) => {
    const url = response.uploadURL;
    const fileName = file.name;
    const li = document.createElement("li");
    const a2 = document.createElement("a");
    a2.href = url;
    a2.target = "_blank";
    a2.appendChild(document.createTextNode(fileName));
    li.appendChild(a2);
    document.querySelector(".uploaded-files ol").appendChild(li);
  });
})();
/**
 * Takes a string with placeholder variables like `%{smart_count} file selected`
 * and replaces it with values from options `{smart_count: 5}`
 *
 * @license https://github.com/airbnb/polyglot.js/blob/master/LICENSE
 * taken from https://github.com/airbnb/polyglot.js/blob/master/lib/polyglot.js#L299
 *
 * @param {string} phrase that needs interpolation, with placeholders
 * @param {object} options with values that will be used to replace placeholders
 * @returns {any[]} interpolated
 */
//# sourceMappingURL=app.js.map
