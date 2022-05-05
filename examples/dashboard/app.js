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
          return rx[Symbol.split](chunk).forEach((raw, i3, list) => {
            if (raw !== "") {
              newParts.push(raw);
            }
            if (i3 < list.length - 1) {
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
            var i3 = 0;
            var l3 = fns ? fns.length : 0;
            for (i3; i3 < l3; i3++) {
              if (fns[i3] !== fn) {
                keep.push(fns[i3]);
              }
            }
          }
          keep.length ? this._fns[event] = keep : delete this._fns[event];
        };
        function getListeners(e3) {
          var out = _fns[e3] ? _fns[e3] : [];
          var idx = e3.indexOf(":");
          var args = idx === -1 ? [e3] : [e3.substring(0, idx), e3.substring(idx + 1)];
          var keys = Object.keys(_fns);
          var i3 = 0;
          var l3 = keys.length;
          for (i3; i3 < l3; i3++) {
            var key = keys[i3];
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
        function emitAll(e3, fns, args) {
          var i3 = 0;
          var l3 = fns.length;
          for (i3; i3 < l3; i3++) {
            if (!fns[i3])
              break;
            fns[i3].event = e3;
            fns[i3].apply(fns[i3], args);
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
          let i3 = size;
          while (i3--) {
            id += alphabet[Math.random() * alphabet.length | 0];
          }
          return id;
        };
      };
      var nanoid = (size = 21) => {
        let id = "";
        let i3 = size;
        while (i3--) {
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
        const m3 = /Edge\/(\d+\.\d+)/.exec(userAgent);
        if (!m3)
          return true;
        const edgeVersion = m3[1];
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
            const totalFilesSize = files.reduce((total, f3) => total + f3.size, file.size);
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
          for (let i3 = 0; i3 < fileDescriptors.length; i3++) {
            try {
              let newFile = _classPrivateFieldLooseBase(this, _checkAndCreateFileStateObject)[_checkAndCreateFileStateObject](files, fileDescriptors[i3]);
              if (files[newFile.id] && files[newFile.id].isGhost) {
                newFile = {
                  ...files[newFile.id],
                  data: fileDescriptors[i3].data,
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
          const filesArray = Object.keys(files).map((i3) => files[i3]);
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
  function a(n2, l3) {
    for (var u3 in l3)
      n2[u3] = l3[u3];
    return n2;
  }
  function h(n2) {
    var l3 = n2.parentNode;
    l3 && l3.removeChild(n2);
  }
  function v(l3, u3, i3) {
    var t3, r3, o3, f3 = {};
    for (o3 in u3)
      o3 == "key" ? t3 = u3[o3] : o3 == "ref" ? r3 = u3[o3] : f3[o3] = u3[o3];
    if (arguments.length > 2 && (f3.children = arguments.length > 3 ? n.call(arguments, 2) : i3), typeof l3 == "function" && l3.defaultProps != null)
      for (o3 in l3.defaultProps)
        f3[o3] === void 0 && (f3[o3] = l3.defaultProps[o3]);
    return y(l3, f3, t3, r3, null);
  }
  function y(n2, i3, t3, r3, o3) {
    var f3 = {
      type: n2,
      props: i3,
      key: t3,
      ref: r3,
      __k: null,
      __: null,
      __b: 0,
      __e: null,
      __d: void 0,
      __c: null,
      __h: null,
      constructor: void 0,
      __v: o3 == null ? ++u : o3
    };
    return o3 == null && l.vnode != null && l.vnode(f3), f3;
  }
  function p() {
    return {
      current: null
    };
  }
  function d(n2) {
    return n2.children;
  }
  function _(n2, l3) {
    this.props = n2, this.context = l3;
  }
  function k(n2, l3) {
    if (l3 == null)
      return n2.__ ? k(n2.__, n2.__.__k.indexOf(n2) + 1) : null;
    for (var u3; l3 < n2.__k.length; l3++)
      if ((u3 = n2.__k[l3]) != null && u3.__e != null)
        return u3.__e;
    return typeof n2.type == "function" ? k(n2) : null;
  }
  function b(n2) {
    var l3, u3;
    if ((n2 = n2.__) != null && n2.__c != null) {
      for (n2.__e = n2.__c.base = null, l3 = 0; l3 < n2.__k.length; l3++)
        if ((u3 = n2.__k[l3]) != null && u3.__e != null) {
          n2.__e = n2.__c.base = u3.__e;
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
      n2 = t.sort(function(n3, l3) {
        return n3.__v.__b - l3.__v.__b;
      }), t = [], n2.some(function(n3) {
        var l3, u3, i3, t3, r3, o3;
        n3.__d && (r3 = (t3 = (l3 = n3).__v).__e, (o3 = l3.__P) && (u3 = [], (i3 = a({}, t3)).__v = t3.__v + 1, j(o3, t3, i3, l3.__n, o3.ownerSVGElement !== void 0, t3.__h != null ? [r3] : null, u3, r3 == null ? k(t3) : r3, t3.__h), z(u3, t3), t3.__e != r3 && b(t3)));
      });
  }
  function w(n2, l3, u3, i3, t3, r3, o3, f3, s3, a3) {
    var h3, v3, p3, _3, b3, m3, g3, w3 = i3 && i3.__k || c, A3 = w3.length;
    for (u3.__k = [], h3 = 0; h3 < l3.length; h3++)
      if ((_3 = u3.__k[h3] = (_3 = l3[h3]) == null || typeof _3 == "boolean" ? null : typeof _3 == "string" || typeof _3 == "number" || typeof _3 == "bigint" ? y(null, _3, null, null, _3) : Array.isArray(_3) ? y(d, {
        children: _3
      }, null, null, null) : _3.__b > 0 ? y(_3.type, _3.props, _3.key, null, _3.__v) : _3) != null) {
        if (_3.__ = u3, _3.__b = u3.__b + 1, (p3 = w3[h3]) === null || p3 && _3.key == p3.key && _3.type === p3.type)
          w3[h3] = void 0;
        else
          for (v3 = 0; v3 < A3; v3++) {
            if ((p3 = w3[v3]) && _3.key == p3.key && _3.type === p3.type) {
              w3[v3] = void 0;
              break;
            }
            p3 = null;
          }
        j(n2, _3, p3 = p3 || e, t3, r3, o3, f3, s3, a3), b3 = _3.__e, (v3 = _3.ref) && p3.ref != v3 && (g3 || (g3 = []), p3.ref && g3.push(p3.ref, null, _3), g3.push(v3, _3.__c || b3, _3)), b3 != null ? (m3 == null && (m3 = b3), typeof _3.type == "function" && _3.__k === p3.__k ? _3.__d = s3 = x(_3, s3, n2) : s3 = P(n2, _3, p3, w3, b3, s3), typeof u3.type == "function" && (u3.__d = s3)) : s3 && p3.__e == s3 && s3.parentNode != n2 && (s3 = k(p3));
      }
    for (u3.__e = m3, h3 = A3; h3--; )
      w3[h3] != null && (typeof u3.type == "function" && w3[h3].__e != null && w3[h3].__e == u3.__d && (u3.__d = k(i3, h3 + 1)), N(w3[h3], w3[h3]));
    if (g3)
      for (h3 = 0; h3 < g3.length; h3++)
        M(g3[h3], g3[++h3], g3[++h3]);
  }
  function x(n2, l3, u3) {
    for (var i3, t3 = n2.__k, r3 = 0; t3 && r3 < t3.length; r3++)
      (i3 = t3[r3]) && (i3.__ = n2, l3 = typeof i3.type == "function" ? x(i3, l3, u3) : P(u3, i3, i3, t3, i3.__e, l3));
    return l3;
  }
  function A(n2, l3) {
    return l3 = l3 || [], n2 == null || typeof n2 == "boolean" || (Array.isArray(n2) ? n2.some(function(n3) {
      A(n3, l3);
    }) : l3.push(n2)), l3;
  }
  function P(n2, l3, u3, i3, t3, r3) {
    var o3, f3, e3;
    if (l3.__d !== void 0)
      o3 = l3.__d, l3.__d = void 0;
    else if (u3 == null || t3 != r3 || t3.parentNode == null)
      n:
        if (r3 == null || r3.parentNode !== n2)
          n2.appendChild(t3), o3 = null;
        else {
          for (f3 = r3, e3 = 0; (f3 = f3.nextSibling) && e3 < i3.length; e3 += 2)
            if (f3 == t3)
              break n;
          n2.insertBefore(t3, r3), o3 = r3;
        }
    return o3 !== void 0 ? o3 : t3.nextSibling;
  }
  function C(n2, l3, u3, i3, t3) {
    var r3;
    for (r3 in u3)
      r3 === "children" || r3 === "key" || r3 in l3 || H(n2, r3, null, u3[r3], i3);
    for (r3 in l3)
      t3 && typeof l3[r3] != "function" || r3 === "children" || r3 === "key" || r3 === "value" || r3 === "checked" || u3[r3] === l3[r3] || H(n2, r3, l3[r3], u3[r3], i3);
  }
  function $(n2, l3, u3) {
    l3[0] === "-" ? n2.setProperty(l3, u3) : n2[l3] = u3 == null ? "" : typeof u3 != "number" || s.test(l3) ? u3 : u3 + "px";
  }
  function H(n2, l3, u3, i3, t3) {
    var r3;
    n:
      if (l3 === "style") {
        if (typeof u3 == "string")
          n2.style.cssText = u3;
        else {
          if (typeof i3 == "string" && (n2.style.cssText = i3 = ""), i3)
            for (l3 in i3)
              u3 && l3 in u3 || $(n2.style, l3, "");
          if (u3)
            for (l3 in u3)
              i3 && u3[l3] === i3[l3] || $(n2.style, l3, u3[l3]);
        }
      } else if (l3[0] === "o" && l3[1] === "n")
        r3 = l3 !== (l3 = l3.replace(/Capture$/, "")), l3 = l3.toLowerCase() in n2 ? l3.toLowerCase().slice(2) : l3.slice(2), n2.l || (n2.l = {}), n2.l[l3 + r3] = u3, u3 ? i3 || n2.addEventListener(l3, r3 ? T : I, r3) : n2.removeEventListener(l3, r3 ? T : I, r3);
      else if (l3 !== "dangerouslySetInnerHTML") {
        if (t3)
          l3 = l3.replace(/xlink[H:h]/, "h").replace(/sName$/, "s");
        else if (l3 !== "href" && l3 !== "list" && l3 !== "form" && l3 !== "tabIndex" && l3 !== "download" && l3 in n2)
          try {
            n2[l3] = u3 == null ? "" : u3;
            break n;
          } catch (n3) {
          }
        typeof u3 == "function" || (u3 != null && (u3 !== false || l3[0] === "a" && l3[1] === "r") ? n2.setAttribute(l3, u3) : n2.removeAttribute(l3));
      }
  }
  function I(n2) {
    this.l[n2.type + false](l.event ? l.event(n2) : n2);
  }
  function T(n2) {
    this.l[n2.type + true](l.event ? l.event(n2) : n2);
  }
  function j(n2, u3, i3, t3, r3, o3, f3, e3, c3) {
    var s3, h3, v3, y3, p3, k3, b3, m3, g3, x3, A3, P2 = u3.type;
    if (u3.constructor !== void 0)
      return null;
    i3.__h != null && (c3 = i3.__h, e3 = u3.__e = i3.__e, u3.__h = null, o3 = [e3]), (s3 = l.__b) && s3(u3);
    try {
      n:
        if (typeof P2 == "function") {
          if (m3 = u3.props, g3 = (s3 = P2.contextType) && t3[s3.__c], x3 = s3 ? g3 ? g3.props.value : s3.__ : t3, i3.__c ? b3 = (h3 = u3.__c = i3.__c).__ = h3.__E : ("prototype" in P2 && P2.prototype.render ? u3.__c = h3 = new P2(m3, x3) : (u3.__c = h3 = new _(m3, x3), h3.constructor = P2, h3.render = O), g3 && g3.sub(h3), h3.props = m3, h3.state || (h3.state = {}), h3.context = x3, h3.__n = t3, v3 = h3.__d = true, h3.__h = []), h3.__s == null && (h3.__s = h3.state), P2.getDerivedStateFromProps != null && (h3.__s == h3.state && (h3.__s = a({}, h3.__s)), a(h3.__s, P2.getDerivedStateFromProps(m3, h3.__s))), y3 = h3.props, p3 = h3.state, v3)
            P2.getDerivedStateFromProps == null && h3.componentWillMount != null && h3.componentWillMount(), h3.componentDidMount != null && h3.__h.push(h3.componentDidMount);
          else {
            if (P2.getDerivedStateFromProps == null && m3 !== y3 && h3.componentWillReceiveProps != null && h3.componentWillReceiveProps(m3, x3), !h3.__e && h3.shouldComponentUpdate != null && h3.shouldComponentUpdate(m3, h3.__s, x3) === false || u3.__v === i3.__v) {
              h3.props = m3, h3.state = h3.__s, u3.__v !== i3.__v && (h3.__d = false), h3.__v = u3, u3.__e = i3.__e, u3.__k = i3.__k, u3.__k.forEach(function(n3) {
                n3 && (n3.__ = u3);
              }), h3.__h.length && f3.push(h3);
              break n;
            }
            h3.componentWillUpdate != null && h3.componentWillUpdate(m3, h3.__s, x3), h3.componentDidUpdate != null && h3.__h.push(function() {
              h3.componentDidUpdate(y3, p3, k3);
            });
          }
          h3.context = x3, h3.props = m3, h3.state = h3.__s, (s3 = l.__r) && s3(u3), h3.__d = false, h3.__v = u3, h3.__P = n2, s3 = h3.render(h3.props, h3.state, h3.context), h3.state = h3.__s, h3.getChildContext != null && (t3 = a(a({}, t3), h3.getChildContext())), v3 || h3.getSnapshotBeforeUpdate == null || (k3 = h3.getSnapshotBeforeUpdate(y3, p3)), A3 = s3 != null && s3.type === d && s3.key == null ? s3.props.children : s3, w(n2, Array.isArray(A3) ? A3 : [A3], u3, i3, t3, r3, o3, f3, e3, c3), h3.base = u3.__e, u3.__h = null, h3.__h.length && f3.push(h3), b3 && (h3.__E = h3.__ = null), h3.__e = false;
        } else
          o3 == null && u3.__v === i3.__v ? (u3.__k = i3.__k, u3.__e = i3.__e) : u3.__e = L(i3.__e, u3, i3, t3, r3, o3, f3, c3);
      (s3 = l.diffed) && s3(u3);
    } catch (n3) {
      u3.__v = null, (c3 || o3 != null) && (u3.__e = e3, u3.__h = !!c3, o3[o3.indexOf(e3)] = null), l.__e(n3, u3, i3);
    }
  }
  function z(n2, u3) {
    l.__c && l.__c(u3, n2), n2.some(function(u4) {
      try {
        n2 = u4.__h, u4.__h = [], n2.some(function(n3) {
          n3.call(u4);
        });
      } catch (n3) {
        l.__e(n3, u4.__v);
      }
    });
  }
  function L(l3, u3, i3, t3, r3, o3, f3, c3) {
    var s3, a3, v3, y3 = i3.props, p3 = u3.props, d3 = u3.type, _3 = 0;
    if (d3 === "svg" && (r3 = true), o3 != null) {
      for (; _3 < o3.length; _3++)
        if ((s3 = o3[_3]) && "setAttribute" in s3 == !!d3 && (d3 ? s3.localName === d3 : s3.nodeType === 3)) {
          l3 = s3, o3[_3] = null;
          break;
        }
    }
    if (l3 == null) {
      if (d3 === null)
        return document.createTextNode(p3);
      l3 = r3 ? document.createElementNS("http://www.w3.org/2000/svg", d3) : document.createElement(d3, p3.is && p3), o3 = null, c3 = false;
    }
    if (d3 === null)
      y3 === p3 || c3 && l3.data === p3 || (l3.data = p3);
    else {
      if (o3 = o3 && n.call(l3.childNodes), a3 = (y3 = i3.props || e).dangerouslySetInnerHTML, v3 = p3.dangerouslySetInnerHTML, !c3) {
        if (o3 != null)
          for (y3 = {}, _3 = 0; _3 < l3.attributes.length; _3++)
            y3[l3.attributes[_3].name] = l3.attributes[_3].value;
        (v3 || a3) && (v3 && (a3 && v3.__html == a3.__html || v3.__html === l3.innerHTML) || (l3.innerHTML = v3 && v3.__html || ""));
      }
      if (C(l3, p3, y3, r3, c3), v3)
        u3.__k = [];
      else if (_3 = u3.props.children, w(l3, Array.isArray(_3) ? _3 : [_3], u3, i3, t3, r3 && d3 !== "foreignObject", o3, f3, o3 ? o3[0] : i3.__k && k(i3, 0), c3), o3 != null)
        for (_3 = o3.length; _3--; )
          o3[_3] != null && h(o3[_3]);
      c3 || ("value" in p3 && (_3 = p3.value) !== void 0 && (_3 !== y3.value || _3 !== l3.value || d3 === "progress" && !_3) && H(l3, "value", _3, y3.value, false), "checked" in p3 && (_3 = p3.checked) !== void 0 && _3 !== l3.checked && H(l3, "checked", _3, y3.checked, false));
    }
    return l3;
  }
  function M(n2, u3, i3) {
    try {
      typeof n2 == "function" ? n2(u3) : n2.current = u3;
    } catch (n3) {
      l.__e(n3, i3);
    }
  }
  function N(n2, u3, i3) {
    var t3, r3;
    if (l.unmount && l.unmount(n2), (t3 = n2.ref) && (t3.current && t3.current !== n2.__e || M(t3, null, u3)), (t3 = n2.__c) != null) {
      if (t3.componentWillUnmount)
        try {
          t3.componentWillUnmount();
        } catch (n3) {
          l.__e(n3, u3);
        }
      t3.base = t3.__P = null;
    }
    if (t3 = n2.__k)
      for (r3 = 0; r3 < t3.length; r3++)
        t3[r3] && N(t3[r3], u3, typeof n2.type != "function");
    i3 || n2.__e == null || h(n2.__e), n2.__e = n2.__d = void 0;
  }
  function O(n2, l3, u3) {
    return this.constructor(n2, u3);
  }
  function S(u3, i3, t3) {
    var r3, o3, f3;
    l.__ && l.__(u3, i3), o3 = (r3 = typeof t3 == "function") ? null : t3 && t3.__k || i3.__k, f3 = [], j(i3, u3 = (!r3 && t3 || i3).__k = v(d, null, [u3]), o3 || e, e, i3.ownerSVGElement !== void 0, !r3 && t3 ? [t3] : o3 ? null : i3.firstChild ? n.call(i3.childNodes) : null, f3, !r3 && t3 ? t3 : o3 ? o3.__e : i3.firstChild, r3), z(f3, u3);
  }
  function q(n2, l3) {
    S(n2, l3, q);
  }
  function B(l3, u3, i3) {
    var t3, r3, o3, f3 = a({}, l3.props);
    for (o3 in u3)
      o3 == "key" ? t3 = u3[o3] : o3 == "ref" ? r3 = u3[o3] : f3[o3] = u3[o3];
    return arguments.length > 2 && (f3.children = arguments.length > 3 ? n.call(arguments, 2) : i3), y(l3.type, f3, t3 || l3.key, r3 || l3.ref, null);
  }
  function D(n2, l3) {
    var u3 = {
      __c: l3 = "__cC" + f++,
      __: n2,
      Consumer: function(n3, l4) {
        return n3.children(l4);
      },
      Provider: function(n3) {
        var u4, i3;
        return this.getChildContext || (u4 = [], (i3 = {})[l3] = this, this.getChildContext = function() {
          return i3;
        }, this.shouldComponentUpdate = function(n4) {
          this.props.value !== n4.value && u4.some(m);
        }, this.sub = function(n4) {
          u4.push(n4);
          var l4 = n4.componentWillUnmount;
          n4.componentWillUnmount = function() {
            u4.splice(u4.indexOf(n4), 1), l4 && l4.call(n4);
          };
        }), n3.children;
      }
    };
    return u3.Provider.__ = u3.Consumer.contextType = u3;
  }
  var n, l, u, i, t, r, o, f, e, c, s;
  var init_preact_module = __esm({
    "../node_modules/preact/dist/preact.module.js"() {
      e = {};
      c = [];
      s = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
      n = c.slice, l = {
        __e: function(n2, l3) {
          for (var u3, i3, t3; l3 = l3.__; )
            if ((u3 = l3.__c) && !u3.__)
              try {
                if ((i3 = u3.constructor) && i3.getDerivedStateFromError != null && (u3.setState(i3.getDerivedStateFromError(n2)), t3 = u3.__d), u3.componentDidCatch != null && (u3.componentDidCatch(n2), t3 = u3.__d), t3)
                  return u3.__E = u3;
              } catch (l4) {
                n2 = l4;
              }
          throw n2;
        }
      }, u = 0, i = function(n2) {
        return n2 != null && n2.constructor === void 0;
      }, _.prototype.setState = function(n2, l3) {
        var u3;
        u3 = this.__s != null && this.__s !== this.state ? this.__s : this.__s = a({}, this.state), typeof n2 == "function" && (n2 = n2(a({}, u3), this.props)), n2 && a(u3, n2), n2 != null && this.__v && (l3 && this.__h.push(l3), m(this));
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
        constructor(uppy, opts) {
          if (opts === void 0) {
            opts = {};
          }
          this.uppy = uppy;
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
            this.uppy.iteratePlugins((p3) => {
              if (p3 instanceof Target) {
                targetPlugin = p3;
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

  // ../packages/@uppy/utils/lib/getSpeed.js
  var require_getSpeed = __commonJS({
    "../packages/@uppy/utils/lib/getSpeed.js"(exports, module) {
      module.exports = function getSpeed(fileProgress) {
        if (!fileProgress.bytesUploaded)
          return 0;
        const timeElapsed = Date.now() - fileProgress.uploadStarted;
        const uploadSpeed = fileProgress.bytesUploaded / (timeElapsed / 1e3);
        return uploadSpeed;
      };
    }
  });

  // ../packages/@uppy/utils/lib/getBytesRemaining.js
  var require_getBytesRemaining = __commonJS({
    "../packages/@uppy/utils/lib/getBytesRemaining.js"(exports, module) {
      module.exports = function getBytesRemaining(fileProgress) {
        return fileProgress.bytesTotal - fileProgress.bytesUploaded;
      };
    }
  });

  // ../packages/@uppy/utils/lib/getTextDirection.js
  var require_getTextDirection = __commonJS({
    "../packages/@uppy/utils/lib/getTextDirection.js"(exports, module) {
      function getTextDirection(element) {
        var _element;
        while (element && !element.dir) {
          element = element.parentNode;
        }
        return (_element = element) == null ? void 0 : _element.dir;
      }
      module.exports = getTextDirection;
    }
  });

  // ../packages/@uppy/status-bar/lib/StatusBarStates.js
  var require_StatusBarStates = __commonJS({
    "../packages/@uppy/status-bar/lib/StatusBarStates.js"(exports, module) {
      module.exports = {
        STATE_ERROR: "error",
        STATE_WAITING: "waiting",
        STATE_PREPROCESSING: "preprocessing",
        STATE_UPLOADING: "uploading",
        STATE_POSTPROCESSING: "postprocessing",
        STATE_COMPLETE: "complete"
      };
    }
  });

  // ../node_modules/classnames/index.js
  var require_classnames = __commonJS({
    "../node_modules/classnames/index.js"(exports, module) {
      (function() {
        "use strict";
        var hasOwn = {}.hasOwnProperty;
        function classNames() {
          var classes = [];
          for (var i3 = 0; i3 < arguments.length; i3++) {
            var arg = arguments[i3];
            if (!arg)
              continue;
            var argType = typeof arg;
            if (argType === "string" || argType === "number") {
              classes.push(arg);
            } else if (Array.isArray(arg)) {
              if (arg.length) {
                var inner = classNames.apply(null, arg);
                if (inner) {
                  classes.push(inner);
                }
              }
            } else if (argType === "object") {
              if (arg.toString === Object.prototype.toString) {
                for (var key in arg) {
                  if (hasOwn.call(arg, key) && arg[key]) {
                    classes.push(key);
                  }
                }
              } else {
                classes.push(arg.toString());
              }
            }
          }
          return classes.join(" ");
        }
        if (typeof module !== "undefined" && module.exports) {
          classNames.default = classNames;
          module.exports = classNames;
        } else if (typeof define === "function" && typeof define.amd === "object" && define.amd) {
          define("classnames", [], function() {
            return classNames;
          });
        } else {
          window.classNames = classNames;
        }
      })();
    }
  });

  // ../packages/@uppy/status-bar/lib/calculateProcessingProgress.js
  var require_calculateProcessingProgress = __commonJS({
    "../packages/@uppy/status-bar/lib/calculateProcessingProgress.js"(exports, module) {
      module.exports = function calculateProcessingProgress(files) {
        const values = [];
        let mode;
        let message;
        for (const {
          progress
        } of Object.values(files)) {
          const {
            preprocess,
            postprocess
          } = progress;
          if (message == null && (preprocess || postprocess)) {
            ({
              mode,
              message
            } = preprocess || postprocess);
          }
          if ((preprocess == null ? void 0 : preprocess.mode) === "determinate")
            values.push(preprocess.value);
          if ((postprocess == null ? void 0 : postprocess.mode) === "determinate")
            values.push(postprocess.value);
        }
        const value = values.reduce((total, progressValue) => {
          return total + progressValue / values.length;
        }, 0);
        return {
          mode,
          message,
          value
        };
      };
    }
  });

  // ../packages/@uppy/utils/lib/secondsToTime.js
  var require_secondsToTime = __commonJS({
    "../packages/@uppy/utils/lib/secondsToTime.js"(exports, module) {
      module.exports = function secondsToTime(rawSeconds) {
        const hours = Math.floor(rawSeconds / 3600) % 24;
        const minutes = Math.floor(rawSeconds / 60) % 60;
        const seconds = Math.floor(rawSeconds % 60);
        return {
          hours,
          minutes,
          seconds
        };
      };
    }
  });

  // ../packages/@uppy/utils/lib/prettyETA.js
  var require_prettyETA = __commonJS({
    "../packages/@uppy/utils/lib/prettyETA.js"(exports, module) {
      var secondsToTime = require_secondsToTime();
      module.exports = function prettyETA(seconds) {
        const time = secondsToTime(seconds);
        const hoursStr = time.hours === 0 ? "" : `${time.hours}h`;
        const minutesStr = time.minutes === 0 ? "" : `${time.hours === 0 ? time.minutes : ` ${time.minutes.toString(10).padStart(2, "0")}`}m`;
        const secondsStr = time.hours !== 0 ? "" : `${time.minutes === 0 ? time.seconds : ` ${time.seconds.toString(10).padStart(2, "0")}`}s`;
        return `${hoursStr}${minutesStr}${secondsStr}`;
      };
    }
  });

  // ../packages/@uppy/status-bar/lib/Components.js
  var require_Components = __commonJS({
    "../packages/@uppy/status-bar/lib/Components.js"(exports, module) {
      var classNames = require_classnames();
      var throttle = require_lodash();
      var prettierBytes = require_prettierBytes();
      var prettyETA = require_prettyETA();
      var {
        h: h3
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      var statusBarStates = require_StatusBarStates();
      var DOT = `\xB7`;
      var renderDot = () => ` ${DOT} `;
      function UploadBtn(props) {
        const {
          newFiles,
          isUploadStarted,
          recoveredState,
          i18n,
          uploadState,
          isSomeGhost,
          startUpload
        } = props;
        const uploadBtnClassNames = classNames("uppy-u-reset", "uppy-c-btn", "uppy-StatusBar-actionBtn", "uppy-StatusBar-actionBtn--upload", {
          "uppy-c-btn-primary": uploadState === statusBarStates.STATE_WAITING
        }, {
          "uppy-StatusBar-actionBtn--disabled": isSomeGhost
        });
        const uploadBtnText = newFiles && isUploadStarted && !recoveredState ? i18n("uploadXNewFiles", {
          smart_count: newFiles
        }) : i18n("uploadXFiles", {
          smart_count: newFiles
        });
        return h3("button", {
          type: "button",
          className: uploadBtnClassNames,
          "aria-label": i18n("uploadXFiles", {
            smart_count: newFiles
          }),
          onClick: startUpload,
          disabled: isSomeGhost,
          "data-uppy-super-focusable": true
        }, uploadBtnText);
      }
      function RetryBtn(props) {
        const {
          i18n,
          uppy
        } = props;
        return h3("button", {
          type: "button",
          className: "uppy-u-reset uppy-c-btn uppy-StatusBar-actionBtn uppy-StatusBar-actionBtn--retry",
          "aria-label": i18n("retryUpload"),
          onClick: () => uppy.retryAll(),
          "data-uppy-super-focusable": true
        }, h3("svg", {
          "aria-hidden": "true",
          focusable: "false",
          className: "uppy-c-icon",
          width: "8",
          height: "10",
          viewBox: "0 0 8 10"
        }, h3("path", {
          d: "M4 2.408a2.75 2.75 0 1 0 2.75 2.75.626.626 0 0 1 1.25.018v.023a4 4 0 1 1-4-4.041V.25a.25.25 0 0 1 .389-.208l2.299 1.533a.25.25 0 0 1 0 .416l-2.3 1.533A.25.25 0 0 1 4 3.316v-.908z"
        })), i18n("retry"));
      }
      function CancelBtn(props) {
        const {
          i18n,
          uppy
        } = props;
        return h3("button", {
          type: "button",
          className: "uppy-u-reset uppy-StatusBar-actionCircleBtn",
          title: i18n("cancel"),
          "aria-label": i18n("cancel"),
          onClick: () => uppy.cancelAll(),
          "data-cy": "cancel",
          "data-uppy-super-focusable": true
        }, h3("svg", {
          "aria-hidden": "true",
          focusable: "false",
          className: "uppy-c-icon",
          width: "16",
          height: "16",
          viewBox: "0 0 16 16"
        }, h3("g", {
          fill: "none",
          fillRule: "evenodd"
        }, h3("circle", {
          fill: "#888",
          cx: "8",
          cy: "8",
          r: "8"
        }), h3("path", {
          fill: "#FFF",
          d: "M9.283 8l2.567 2.567-1.283 1.283L8 9.283 5.433 11.85 4.15 10.567 6.717 8 4.15 5.433 5.433 4.15 8 6.717l2.567-2.567 1.283 1.283z"
        }))));
      }
      function PauseResumeButton(props) {
        const {
          isAllPaused,
          i18n,
          isAllComplete,
          resumableUploads,
          uppy
        } = props;
        const title = isAllPaused ? i18n("resume") : i18n("pause");
        function togglePauseResume() {
          if (isAllComplete)
            return null;
          if (!resumableUploads) {
            return uppy.cancelAll();
          }
          if (isAllPaused) {
            return uppy.resumeAll();
          }
          return uppy.pauseAll();
        }
        return h3("button", {
          title,
          "aria-label": title,
          className: "uppy-u-reset uppy-StatusBar-actionCircleBtn",
          type: "button",
          onClick: togglePauseResume,
          "data-uppy-super-focusable": true
        }, h3("svg", {
          "aria-hidden": "true",
          focusable: "false",
          className: "uppy-c-icon",
          width: "16",
          height: "16",
          viewBox: "0 0 16 16"
        }, h3("g", {
          fill: "none",
          fillRule: "evenodd"
        }, h3("circle", {
          fill: "#888",
          cx: "8",
          cy: "8",
          r: "8"
        }), h3("path", {
          fill: "#FFF",
          d: isAllPaused ? "M6 4.25L11.5 8 6 11.75z" : "M5 4.5h2v7H5v-7zm4 0h2v7H9v-7z"
        }))));
      }
      function DoneBtn(props) {
        const {
          i18n,
          doneButtonHandler
        } = props;
        return h3("button", {
          type: "button",
          className: "uppy-u-reset uppy-c-btn uppy-StatusBar-actionBtn uppy-StatusBar-actionBtn--done",
          onClick: doneButtonHandler,
          "data-uppy-super-focusable": true
        }, i18n("done"));
      }
      function LoadingSpinner() {
        return h3("svg", {
          className: "uppy-StatusBar-spinner",
          "aria-hidden": "true",
          focusable: "false",
          width: "14",
          height: "14"
        }, h3("path", {
          d: "M13.983 6.547c-.12-2.509-1.64-4.893-3.939-5.936-2.48-1.127-5.488-.656-7.556 1.094C.524 3.367-.398 6.048.162 8.562c.556 2.495 2.46 4.52 4.94 5.183 2.932.784 5.61-.602 7.256-3.015-1.493 1.993-3.745 3.309-6.298 2.868-2.514-.434-4.578-2.349-5.153-4.84a6.226 6.226 0 0 1 2.98-6.778C6.34.586 9.74 1.1 11.373 3.493c.407.596.693 1.282.842 1.988.127.598.073 1.197.161 1.794.078.525.543 1.257 1.15.864.525-.341.49-1.05.456-1.592-.007-.15.02.3 0 0",
          fillRule: "evenodd"
        }));
      }
      function ProgressBarProcessing(props) {
        const {
          progress
        } = props;
        const {
          value,
          mode,
          message
        } = progress;
        const roundedValue = Math.round(value * 100);
        const dot = `\xB7`;
        return h3("div", {
          className: "uppy-StatusBar-content"
        }, h3(LoadingSpinner, null), mode === "determinate" ? `${roundedValue}% ${dot} ` : "", message);
      }
      function ProgressDetails(props) {
        const {
          numUploads,
          complete,
          totalUploadedSize,
          totalSize,
          totalETA,
          i18n
        } = props;
        const ifShowFilesUploadedOfTotal = numUploads > 1;
        return h3("div", {
          className: "uppy-StatusBar-statusSecondary"
        }, ifShowFilesUploadedOfTotal && i18n("filesUploadedOfTotal", {
          complete,
          smart_count: numUploads
        }), h3("span", {
          className: "uppy-StatusBar-additionalInfo"
        }, ifShowFilesUploadedOfTotal && renderDot(), i18n("dataUploadedOfTotal", {
          complete: prettierBytes(totalUploadedSize),
          total: prettierBytes(totalSize)
        }), renderDot(), i18n("xTimeLeft", {
          time: prettyETA(totalETA)
        })));
      }
      function FileUploadCount(props) {
        const {
          i18n,
          complete,
          numUploads
        } = props;
        return h3("div", {
          className: "uppy-StatusBar-statusSecondary"
        }, i18n("filesUploadedOfTotal", {
          complete,
          smart_count: numUploads
        }));
      }
      function UploadNewlyAddedFiles(props) {
        const {
          i18n,
          newFiles,
          startUpload
        } = props;
        const uploadBtnClassNames = classNames("uppy-u-reset", "uppy-c-btn", "uppy-StatusBar-actionBtn", "uppy-StatusBar-actionBtn--uploadNewlyAdded");
        return h3("div", {
          className: "uppy-StatusBar-statusSecondary"
        }, h3("div", {
          className: "uppy-StatusBar-statusSecondaryHint"
        }, i18n("xMoreFilesAdded", {
          smart_count: newFiles
        })), h3("button", {
          type: "button",
          className: uploadBtnClassNames,
          "aria-label": i18n("uploadXFiles", {
            smart_count: newFiles
          }),
          onClick: startUpload
        }, i18n("upload")));
      }
      var ThrottledProgressDetails = throttle(ProgressDetails, 500, {
        leading: true,
        trailing: true
      });
      function ProgressBarUploading(props) {
        const {
          i18n,
          supportsUploadProgress,
          totalProgress,
          showProgressDetails,
          isUploadStarted,
          isAllComplete,
          isAllPaused,
          newFiles,
          numUploads,
          complete,
          totalUploadedSize,
          totalSize,
          totalETA,
          startUpload
        } = props;
        const showUploadNewlyAddedFiles = newFiles && isUploadStarted;
        if (!isUploadStarted || isAllComplete) {
          return null;
        }
        const title = isAllPaused ? i18n("paused") : i18n("uploading");
        function renderProgressDetails() {
          if (!isAllPaused && !showUploadNewlyAddedFiles && showProgressDetails) {
            if (supportsUploadProgress) {
              return h3(ThrottledProgressDetails, {
                numUploads,
                complete,
                totalUploadedSize,
                totalSize,
                totalETA,
                i18n
              });
            }
            return h3(FileUploadCount, {
              i18n,
              complete,
              numUploads
            });
          }
          return null;
        }
        return h3("div", {
          className: "uppy-StatusBar-content",
          "aria-label": title,
          title
        }, !isAllPaused ? h3(LoadingSpinner, null) : null, h3("div", {
          className: "uppy-StatusBar-status"
        }, h3("div", {
          className: "uppy-StatusBar-statusPrimary"
        }, supportsUploadProgress ? `${title}: ${totalProgress}%` : title), renderProgressDetails(), showUploadNewlyAddedFiles ? h3(UploadNewlyAddedFiles, {
          i18n,
          newFiles,
          startUpload
        }) : null));
      }
      function ProgressBarComplete(props) {
        const {
          i18n
        } = props;
        return h3("div", {
          className: "uppy-StatusBar-content",
          role: "status",
          title: i18n("complete")
        }, h3("div", {
          className: "uppy-StatusBar-status"
        }, h3("div", {
          className: "uppy-StatusBar-statusPrimary"
        }, h3("svg", {
          "aria-hidden": "true",
          focusable: "false",
          className: "uppy-StatusBar-statusIndicator uppy-c-icon",
          width: "15",
          height: "11",
          viewBox: "0 0 15 11"
        }, h3("path", {
          d: "M.414 5.843L1.627 4.63l3.472 3.472L13.202 0l1.212 1.213L5.1 10.528z"
        })), i18n("complete"))));
      }
      function ProgressBarError(props) {
        const {
          error,
          i18n,
          complete,
          numUploads
        } = props;
        function displayErrorAlert() {
          const errorMessage = `${i18n("uploadFailed")} 

 ${error}`;
          alert(errorMessage);
        }
        return h3("div", {
          className: "uppy-StatusBar-content",
          title: i18n("uploadFailed")
        }, h3("svg", {
          "aria-hidden": "true",
          focusable: "false",
          className: "uppy-StatusBar-statusIndicator uppy-c-icon",
          width: "11",
          height: "11",
          viewBox: "0 0 11 11"
        }, h3("path", {
          d: "M4.278 5.5L0 1.222 1.222 0 5.5 4.278 9.778 0 11 1.222 6.722 5.5 11 9.778 9.778 11 5.5 6.722 1.222 11 0 9.778z"
        })), h3("div", {
          className: "uppy-StatusBar-status"
        }, h3("div", {
          className: "uppy-StatusBar-statusPrimary"
        }, i18n("uploadFailed"), h3("button", {
          className: "uppy-u-reset uppy-StatusBar-details",
          "aria-label": i18n("showErrorDetails"),
          "data-microtip-position": "top-right",
          "data-microtip-size": "medium",
          onClick: displayErrorAlert,
          type: "button"
        }, "?")), h3(FileUploadCount, {
          i18n,
          complete,
          numUploads
        })));
      }
      module.exports = {
        UploadBtn,
        RetryBtn,
        CancelBtn,
        PauseResumeButton,
        DoneBtn,
        LoadingSpinner,
        ProgressDetails,
        ProgressBarProcessing,
        ProgressBarError,
        ProgressBarUploading,
        ProgressBarComplete
      };
    }
  });

  // ../packages/@uppy/status-bar/lib/StatusBar.js
  var require_StatusBar = __commonJS({
    "../packages/@uppy/status-bar/lib/StatusBar.js"(exports, module) {
      var {
        h: h3
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      var classNames = require_classnames();
      var statusBarStates = require_StatusBarStates();
      var calculateProcessingProgress = require_calculateProcessingProgress();
      var {
        UploadBtn,
        RetryBtn,
        CancelBtn,
        PauseResumeButton,
        DoneBtn,
        ProgressBarProcessing,
        ProgressBarError,
        ProgressBarUploading,
        ProgressBarComplete
      } = require_Components();
      var {
        STATE_ERROR,
        STATE_WAITING,
        STATE_PREPROCESSING,
        STATE_UPLOADING,
        STATE_POSTPROCESSING,
        STATE_COMPLETE
      } = statusBarStates;
      module.exports = StatusBar;
      function StatusBar(props) {
        const {
          newFiles,
          allowNewUpload,
          isUploadInProgress,
          isAllPaused,
          resumableUploads,
          error,
          hideUploadButton,
          hidePauseResumeButton,
          hideCancelButton,
          hideRetryButton,
          recoveredState,
          uploadState,
          totalProgress,
          files,
          supportsUploadProgress,
          hideAfterFinish,
          isSomeGhost,
          isTargetDOMEl,
          doneButtonHandler,
          isUploadStarted,
          i18n,
          startUpload,
          uppy,
          isAllComplete,
          showProgressDetails,
          numUploads,
          complete,
          totalSize,
          totalETA,
          totalUploadedSize
        } = props;
        function getProgressValue() {
          switch (uploadState) {
            case STATE_POSTPROCESSING:
            case STATE_PREPROCESSING: {
              const progress = calculateProcessingProgress(files);
              if (progress.mode === "determinate") {
                return progress.value * 100;
              }
              return totalProgress;
            }
            case STATE_ERROR: {
              return null;
            }
            case STATE_UPLOADING: {
              if (!supportsUploadProgress) {
                return null;
              }
              return totalProgress;
            }
            default:
              return totalProgress;
          }
        }
        function getIsIndeterminate() {
          switch (uploadState) {
            case STATE_POSTPROCESSING:
            case STATE_PREPROCESSING: {
              const {
                mode
              } = calculateProcessingProgress(files);
              return mode === "indeterminate";
            }
            case STATE_UPLOADING: {
              if (!supportsUploadProgress) {
                return true;
              }
              return false;
            }
            default:
              return false;
          }
        }
        function getIsHidden() {
          if (recoveredState) {
            return false;
          }
          switch (uploadState) {
            case STATE_WAITING:
              return hideUploadButton || newFiles === 0;
            case STATE_COMPLETE:
              return hideAfterFinish;
            default:
              return false;
          }
        }
        const progressValue = getProgressValue();
        const isHidden = getIsHidden();
        const width = progressValue != null ? progressValue : 100;
        const showUploadBtn = !error && newFiles && !isUploadInProgress && !isAllPaused && allowNewUpload && !hideUploadButton;
        const showCancelBtn = !hideCancelButton && uploadState !== STATE_WAITING && uploadState !== STATE_COMPLETE;
        const showPauseResumeBtn = resumableUploads && !hidePauseResumeButton && uploadState === STATE_UPLOADING;
        const showRetryBtn = error && !isAllComplete && !hideRetryButton;
        const showDoneBtn = doneButtonHandler && uploadState === STATE_COMPLETE;
        const progressClassNames = classNames("uppy-StatusBar-progress", {
          "is-indeterminate": getIsIndeterminate()
        });
        const statusBarClassNames = classNames({
          "uppy-Root": isTargetDOMEl
        }, "uppy-StatusBar", `is-${uploadState}`, {
          "has-ghosts": isSomeGhost
        });
        return h3("div", {
          className: statusBarClassNames,
          "aria-hidden": isHidden
        }, h3("div", {
          className: progressClassNames,
          style: {
            width: `${width}%`
          },
          role: "progressbar",
          "aria-label": `${width}%`,
          "aria-valuetext": `${width}%`,
          "aria-valuemin": "0",
          "aria-valuemax": "100",
          "aria-valuenow": progressValue
        }), (() => {
          switch (uploadState) {
            case STATE_PREPROCESSING:
            case STATE_POSTPROCESSING:
              return h3(ProgressBarProcessing, {
                progress: calculateProcessingProgress(files)
              });
            case STATE_COMPLETE:
              return h3(ProgressBarComplete, {
                i18n
              });
            case STATE_ERROR:
              return h3(ProgressBarError, {
                error,
                i18n,
                numUploads,
                complete
              });
            case STATE_UPLOADING:
              return h3(ProgressBarUploading, {
                i18n,
                supportsUploadProgress,
                totalProgress,
                showProgressDetails,
                isUploadStarted,
                isAllComplete,
                isAllPaused,
                newFiles,
                numUploads,
                complete,
                totalUploadedSize,
                totalSize,
                totalETA,
                startUpload
              });
            default:
              return null;
          }
        })(), h3("div", {
          className: "uppy-StatusBar-actions"
        }, recoveredState || showUploadBtn ? h3(UploadBtn, {
          newFiles,
          isUploadStarted,
          recoveredState,
          i18n,
          isSomeGhost,
          startUpload,
          uploadState
        }) : null, showRetryBtn ? h3(RetryBtn, {
          i18n,
          uppy
        }) : null, showPauseResumeBtn ? h3(PauseResumeButton, {
          isAllPaused,
          i18n,
          isAllComplete,
          resumableUploads,
          uppy
        }) : null, showCancelBtn ? h3(CancelBtn, {
          i18n,
          uppy
        }) : null, showDoneBtn ? h3(DoneBtn, {
          i18n,
          doneButtonHandler
        }) : null));
      }
    }
  });

  // ../packages/@uppy/status-bar/lib/locale.js
  var require_locale2 = __commonJS({
    "../packages/@uppy/status-bar/lib/locale.js"(exports, module) {
      module.exports = {
        strings: {
          uploading: "Uploading",
          complete: "Complete",
          uploadFailed: "Upload failed",
          paused: "Paused",
          retry: "Retry",
          cancel: "Cancel",
          pause: "Pause",
          resume: "Resume",
          done: "Done",
          filesUploadedOfTotal: {
            0: "%{complete} of %{smart_count} file uploaded",
            1: "%{complete} of %{smart_count} files uploaded"
          },
          dataUploadedOfTotal: "%{complete} of %{total}",
          xTimeLeft: "%{time} left",
          uploadXFiles: {
            0: "Upload %{smart_count} file",
            1: "Upload %{smart_count} files"
          },
          uploadXNewFiles: {
            0: "Upload +%{smart_count} file",
            1: "Upload +%{smart_count} files"
          },
          upload: "Upload",
          retryUpload: "Retry upload",
          xMoreFilesAdded: {
            0: "%{smart_count} more file added",
            1: "%{smart_count} more files added"
          },
          showErrorDetails: "Show error details"
        }
      };
    }
  });

  // ../packages/@uppy/status-bar/lib/index.js
  var require_lib3 = __commonJS({
    "../packages/@uppy/status-bar/lib/index.js"(exports, module) {
      var _class;
      var _temp;
      var {
        UIPlugin
      } = require_lib2();
      var getSpeed = require_getSpeed();
      var getBytesRemaining = require_getBytesRemaining();
      var getTextDirection = require_getTextDirection();
      var statusBarStates = require_StatusBarStates();
      var StatusBarUI = require_StatusBar();
      var locale = require_locale2();
      module.exports = (_temp = _class = class StatusBar extends UIPlugin {
        constructor(uppy, opts) {
          super(uppy, opts);
          this.startUpload = () => {
            const {
              recoveredState
            } = this.uppy.getState();
            if (recoveredState) {
              this.uppy.emit("restore-confirmed");
              return void 0;
            }
            return this.uppy.upload().catch(() => {
            });
          };
          this.id = this.opts.id || "StatusBar";
          this.title = "StatusBar";
          this.type = "progressindicator";
          this.defaultLocale = locale;
          const defaultOptions = {
            target: "body",
            hideUploadButton: false,
            hideRetryButton: false,
            hidePauseResumeButton: false,
            hideCancelButton: false,
            showProgressDetails: false,
            hideAfterFinish: true,
            doneButtonHandler: null
          };
          this.opts = {
            ...defaultOptions,
            ...opts
          };
          this.i18nInit();
          this.render = this.render.bind(this);
          this.install = this.install.bind(this);
        }
        render(state) {
          const {
            capabilities,
            files,
            allowNewUpload,
            totalProgress,
            error,
            recoveredState
          } = state;
          const {
            newFiles,
            startedFiles,
            completeFiles,
            inProgressNotPausedFiles,
            isUploadStarted,
            isAllComplete,
            isAllErrored,
            isAllPaused,
            isUploadInProgress,
            isSomeGhost
          } = this.uppy.getObjectOfFilesPerState();
          const newFilesOrRecovered = recoveredState ? Object.values(files) : newFiles;
          const totalETA = getTotalETA(inProgressNotPausedFiles);
          const resumableUploads = !!capabilities.resumableUploads;
          const supportsUploadProgress = capabilities.uploadProgress !== false;
          let totalSize = 0;
          let totalUploadedSize = 0;
          startedFiles.forEach((file) => {
            totalSize += file.progress.bytesTotal || 0;
            totalUploadedSize += file.progress.bytesUploaded || 0;
          });
          return StatusBarUI({
            error,
            uploadState: getUploadingState(error, isAllComplete, recoveredState, state.files || {}),
            allowNewUpload,
            totalProgress,
            totalSize,
            totalUploadedSize,
            isAllComplete: false,
            isAllPaused,
            isAllErrored,
            isUploadStarted,
            isUploadInProgress,
            isSomeGhost,
            recoveredState,
            complete: completeFiles.length,
            newFiles: newFilesOrRecovered.length,
            numUploads: startedFiles.length,
            totalETA,
            files,
            i18n: this.i18n,
            uppy: this.uppy,
            startUpload: this.startUpload,
            doneButtonHandler: this.opts.doneButtonHandler,
            resumableUploads,
            supportsUploadProgress,
            showProgressDetails: this.opts.showProgressDetails,
            hideUploadButton: this.opts.hideUploadButton,
            hideRetryButton: this.opts.hideRetryButton,
            hidePauseResumeButton: this.opts.hidePauseResumeButton,
            hideCancelButton: this.opts.hideCancelButton,
            hideAfterFinish: this.opts.hideAfterFinish,
            isTargetDOMEl: this.isTargetDOMEl
          });
        }
        onMount() {
          const element = this.el;
          const direction = getTextDirection(element);
          if (!direction) {
            element.dir = "ltr";
          }
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
      }, _class.VERSION = "2.1.3", _temp);
      function getTotalSpeed(files) {
        let totalSpeed = 0;
        files.forEach((file) => {
          totalSpeed += getSpeed(file.progress);
        });
        return totalSpeed;
      }
      function getTotalETA(files) {
        const totalSpeed = getTotalSpeed(files);
        if (totalSpeed === 0) {
          return 0;
        }
        const totalBytesRemaining = files.reduce((total, file) => {
          return total + getBytesRemaining(file.progress);
        }, 0);
        return Math.round(totalBytesRemaining / totalSpeed * 10) / 10;
      }
      function getUploadingState(error, isAllComplete, recoveredState, files) {
        if (error && !isAllComplete) {
          return statusBarStates.STATE_ERROR;
        }
        if (isAllComplete) {
          return statusBarStates.STATE_COMPLETE;
        }
        if (recoveredState) {
          return statusBarStates.STATE_WAITING;
        }
        let state = statusBarStates.STATE_WAITING;
        const fileIDs = Object.keys(files);
        for (let i3 = 0; i3 < fileIDs.length; i3++) {
          const {
            progress
          } = files[fileIDs[i3]];
          if (progress.uploadStarted && !progress.uploadComplete) {
            return statusBarStates.STATE_UPLOADING;
          }
          if (progress.preprocess && state !== statusBarStates.STATE_UPLOADING) {
            state = statusBarStates.STATE_PREPROCESSING;
          }
          if (progress.postprocess && state !== statusBarStates.STATE_UPLOADING && state !== statusBarStates.STATE_PREPROCESSING) {
            state = statusBarStates.STATE_POSTPROCESSING;
          }
        }
        return state;
      }
    }
  });

  // ../packages/@uppy/informer/lib/FadeIn.js
  var require_FadeIn = __commonJS({
    "../packages/@uppy/informer/lib/FadeIn.js"(exports, module) {
      var {
        h: h3,
        Component,
        createRef
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      var TRANSITION_MS = 300;
      module.exports = class FadeIn extends Component {
        constructor() {
          super(...arguments);
          this.ref = createRef();
        }
        componentWillEnter(callback) {
          this.ref.current.style.opacity = "1";
          this.ref.current.style.transform = "none";
          setTimeout(callback, TRANSITION_MS);
        }
        componentWillLeave(callback) {
          this.ref.current.style.opacity = "0";
          this.ref.current.style.transform = "translateY(350%)";
          setTimeout(callback, TRANSITION_MS);
        }
        render() {
          const {
            children
          } = this.props;
          return h3("div", {
            className: "uppy-Informer-animated",
            ref: this.ref
          }, children);
        }
      };
    }
  });

  // ../packages/@uppy/informer/lib/TransitionGroup.js
  var require_TransitionGroup = __commonJS({
    "../packages/@uppy/informer/lib/TransitionGroup.js"(exports, module) {
      "use strict";
      var {
        Component,
        cloneElement,
        h: h3,
        toChildArray
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      function assign(obj, props) {
        return Object.assign(obj, props);
      }
      function getKey(vnode, fallback) {
        var _vnode$key;
        return (_vnode$key = vnode == null ? void 0 : vnode.key) != null ? _vnode$key : fallback;
      }
      function linkRef(component, name) {
        const cache = component._ptgLinkedRefs || (component._ptgLinkedRefs = {});
        return cache[name] || (cache[name] = (c3) => {
          component.refs[name] = c3;
        });
      }
      function getChildMapping(children) {
        const out = {};
        for (let i3 = 0; i3 < children.length; i3++) {
          if (children[i3] != null) {
            const key = getKey(children[i3], i3.toString(36));
            out[key] = children[i3];
          }
        }
        return out;
      }
      function mergeChildMappings(prev, next) {
        prev = prev || {};
        next = next || {};
        const getValueForKey = (key) => next.hasOwnProperty(key) ? next[key] : prev[key];
        const nextKeysPending = {};
        let pendingKeys = [];
        for (const prevKey in prev) {
          if (next.hasOwnProperty(prevKey)) {
            if (pendingKeys.length) {
              nextKeysPending[prevKey] = pendingKeys;
              pendingKeys = [];
            }
          } else {
            pendingKeys.push(prevKey);
          }
        }
        const childMapping = {};
        for (const nextKey in next) {
          if (nextKeysPending.hasOwnProperty(nextKey)) {
            for (let i3 = 0; i3 < nextKeysPending[nextKey].length; i3++) {
              const pendingNextKey = nextKeysPending[nextKey][i3];
              childMapping[nextKeysPending[nextKey][i3]] = getValueForKey(pendingNextKey);
            }
          }
          childMapping[nextKey] = getValueForKey(nextKey);
        }
        for (let i3 = 0; i3 < pendingKeys.length; i3++) {
          childMapping[pendingKeys[i3]] = getValueForKey(pendingKeys[i3]);
        }
        return childMapping;
      }
      var identity = (i3) => i3;
      var TransitionGroup = class extends Component {
        constructor(props, context) {
          super(props, context);
          this.refs = {};
          this.state = {
            children: getChildMapping(toChildArray(toChildArray(this.props.children)) || [])
          };
          this.performAppear = this.performAppear.bind(this);
          this.performEnter = this.performEnter.bind(this);
          this.performLeave = this.performLeave.bind(this);
        }
        componentWillMount() {
          this.currentlyTransitioningKeys = {};
          this.keysToAbortLeave = [];
          this.keysToEnter = [];
          this.keysToLeave = [];
        }
        componentDidMount() {
          const initialChildMapping = this.state.children;
          for (const key in initialChildMapping) {
            if (initialChildMapping[key]) {
              this.performAppear(key);
            }
          }
        }
        componentWillReceiveProps(nextProps) {
          const nextChildMapping = getChildMapping(toChildArray(nextProps.children) || []);
          const prevChildMapping = this.state.children;
          this.setState((prevState) => ({
            children: mergeChildMappings(prevState.children, nextChildMapping)
          }));
          let key;
          for (key in nextChildMapping) {
            if (nextChildMapping.hasOwnProperty(key)) {
              const hasPrev = prevChildMapping && prevChildMapping.hasOwnProperty(key);
              if (nextChildMapping[key] && hasPrev && this.currentlyTransitioningKeys[key]) {
                this.keysToEnter.push(key);
                this.keysToAbortLeave.push(key);
              } else if (nextChildMapping[key] && !hasPrev && !this.currentlyTransitioningKeys[key]) {
                this.keysToEnter.push(key);
              }
            }
          }
          for (key in prevChildMapping) {
            if (prevChildMapping.hasOwnProperty(key)) {
              const hasNext = nextChildMapping && nextChildMapping.hasOwnProperty(key);
              if (prevChildMapping[key] && !hasNext && !this.currentlyTransitioningKeys[key]) {
                this.keysToLeave.push(key);
              }
            }
          }
        }
        componentDidUpdate() {
          const {
            keysToEnter
          } = this;
          this.keysToEnter = [];
          keysToEnter.forEach(this.performEnter);
          const {
            keysToLeave
          } = this;
          this.keysToLeave = [];
          keysToLeave.forEach(this.performLeave);
        }
        _finishAbort(key) {
          const idx = this.keysToAbortLeave.indexOf(key);
          if (idx !== -1) {
            this.keysToAbortLeave.splice(idx, 1);
          }
        }
        performAppear(key) {
          this.currentlyTransitioningKeys[key] = true;
          const component = this.refs[key];
          if (component.componentWillAppear) {
            component.componentWillAppear(this._handleDoneAppearing.bind(this, key));
          } else {
            this._handleDoneAppearing(key);
          }
        }
        _handleDoneAppearing(key) {
          const component = this.refs[key];
          if (component.componentDidAppear) {
            component.componentDidAppear();
          }
          delete this.currentlyTransitioningKeys[key];
          this._finishAbort(key);
          const currentChildMapping = getChildMapping(toChildArray(this.props.children) || []);
          if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
            this.performLeave(key);
          }
        }
        performEnter(key) {
          this.currentlyTransitioningKeys[key] = true;
          const component = this.refs[key];
          if (component.componentWillEnter) {
            component.componentWillEnter(this._handleDoneEntering.bind(this, key));
          } else {
            this._handleDoneEntering(key);
          }
        }
        _handleDoneEntering(key) {
          const component = this.refs[key];
          if (component.componentDidEnter) {
            component.componentDidEnter();
          }
          delete this.currentlyTransitioningKeys[key];
          this._finishAbort(key);
          const currentChildMapping = getChildMapping(toChildArray(this.props.children) || []);
          if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
            this.performLeave(key);
          }
        }
        performLeave(key) {
          const idx = this.keysToAbortLeave.indexOf(key);
          if (idx !== -1) {
            return;
          }
          this.currentlyTransitioningKeys[key] = true;
          const component = this.refs[key];
          if (component.componentWillLeave) {
            component.componentWillLeave(this._handleDoneLeaving.bind(this, key));
          } else {
            this._handleDoneLeaving(key);
          }
        }
        _handleDoneLeaving(key) {
          const idx = this.keysToAbortLeave.indexOf(key);
          if (idx !== -1) {
            return;
          }
          const component = this.refs[key];
          if (component.componentDidLeave) {
            component.componentDidLeave();
          }
          delete this.currentlyTransitioningKeys[key];
          const currentChildMapping = getChildMapping(toChildArray(this.props.children) || []);
          if (currentChildMapping && currentChildMapping.hasOwnProperty(key)) {
            this.performEnter(key);
          } else {
            const children = assign({}, this.state.children);
            delete children[key];
            this.setState({
              children
            });
          }
        }
        render(_ref, _ref2) {
          let {
            childFactory,
            transitionLeave,
            transitionName,
            transitionAppear,
            transitionEnter,
            transitionLeaveTimeout,
            transitionEnterTimeout,
            transitionAppearTimeout,
            component,
            ...props
          } = _ref;
          let {
            children
          } = _ref2;
          const childrenToRender = [];
          for (const key in children) {
            if (children.hasOwnProperty(key)) {
              const child = children[key];
              if (child) {
                const ref = linkRef(this, key), el = cloneElement(childFactory(child), {
                  ref,
                  key
                });
                childrenToRender.push(el);
              }
            }
          }
          return h3(component, props, childrenToRender);
        }
      };
      TransitionGroup.defaultProps = {
        component: "span",
        childFactory: identity
      };
      module.exports = TransitionGroup;
    }
  });

  // ../packages/@uppy/informer/lib/index.js
  var require_lib4 = __commonJS({
    "../packages/@uppy/informer/lib/index.js"(exports, module) {
      var _class;
      var _temp;
      var {
        h: h3
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      var {
        UIPlugin
      } = require_lib2();
      var FadeIn = require_FadeIn();
      var TransitionGroup = require_TransitionGroup();
      module.exports = (_temp = _class = class Informer extends UIPlugin {
        constructor(uppy, opts) {
          super(uppy, opts);
          this.render = (state) => {
            return h3("div", {
              className: "uppy uppy-Informer"
            }, h3(TransitionGroup, null, state.info.map((info) => h3(FadeIn, {
              key: info.message
            }, h3("p", {
              role: "alert"
            }, info.message, " ", info.details && h3("span", {
              "aria-label": info.details,
              "data-microtip-position": "top-left",
              "data-microtip-size": "medium",
              role: "tooltip",
              onClick: () => alert(`${info.message} 

 ${info.details}`)
            }, "?"))))));
          };
          this.type = "progressindicator";
          this.id = this.opts.id || "Informer";
          this.title = "Informer";
          const defaultOptions = {};
          this.opts = {
            ...defaultOptions,
            ...opts
          };
        }
        install() {
          const {
            target
          } = this.opts;
          if (target) {
            this.mount(target, this);
          }
        }
      }, _class.VERSION = "2.0.5", _temp);
    }
  });

  // ../packages/@uppy/utils/lib/dataURItoBlob.js
  var require_dataURItoBlob = __commonJS({
    "../packages/@uppy/utils/lib/dataURItoBlob.js"(exports, module) {
      var DATA_URL_PATTERN = /^data:([^/]+\/[^,;]+(?:[^,]*?))(;base64)?,([\s\S]*)$/;
      module.exports = function dataURItoBlob(dataURI, opts, toFile) {
        var _ref, _opts$mimeType;
        const dataURIData = DATA_URL_PATTERN.exec(dataURI);
        const mimeType = (_ref = (_opts$mimeType = opts.mimeType) != null ? _opts$mimeType : dataURIData == null ? void 0 : dataURIData[1]) != null ? _ref : "plain/text";
        let data;
        if (dataURIData[2] != null) {
          const binary = atob(decodeURIComponent(dataURIData[3]));
          const bytes = new Uint8Array(binary.length);
          for (let i3 = 0; i3 < binary.length; i3++) {
            bytes[i3] = binary.charCodeAt(i3);
          }
          data = [bytes];
        } else {
          data = [decodeURIComponent(dataURIData[3])];
        }
        if (toFile) {
          return new File(data, opts.name || "", {
            type: mimeType
          });
        }
        return new Blob(data, {
          type: mimeType
        });
      };
    }
  });

  // ../packages/@uppy/utils/lib/isObjectURL.js
  var require_isObjectURL = __commonJS({
    "../packages/@uppy/utils/lib/isObjectURL.js"(exports, module) {
      module.exports = function isObjectURL(url) {
        return url.startsWith("blob:");
      };
    }
  });

  // ../packages/@uppy/utils/lib/isPreviewSupported.js
  var require_isPreviewSupported = __commonJS({
    "../packages/@uppy/utils/lib/isPreviewSupported.js"(exports, module) {
      module.exports = function isPreviewSupported(fileType) {
        if (!fileType)
          return false;
        return /^[^/]+\/(jpe?g|gif|png|svg|svg\+xml|bmp|webp|avif)$/.test(fileType);
      };
    }
  });

  // ../node_modules/exifr/dist/mini.umd.js
  var require_mini_umd = __commonJS({
    "../node_modules/exifr/dist/mini.umd.js"(exports) {
      "use strict";
      function e3(e4, t4, i4) {
        return t4 in e4 ? Object.defineProperty(e4, t4, {
          value: i4,
          enumerable: true,
          configurable: true,
          writable: true
        }) : e4[t4] = i4, e4;
      }
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var t3 = typeof self != "undefined" ? self : global;
      var i3 = typeof navigator != "undefined";
      var s3 = i3 && typeof HTMLImageElement == "undefined";
      var n2 = !(typeof global == "undefined" || typeof process == "undefined" || !process.versions || !process.versions.node);
      var r3 = !!t3.Buffer;
      var a3 = (e4) => e4 !== void 0;
      function h3(e4) {
        return e4 === void 0 || (e4 instanceof Map ? e4.size === 0 : Object.values(e4).filter(a3).length === 0);
      }
      function f3(e4) {
        let t4 = new Error(e4);
        throw delete t4.stack, t4;
      }
      function o3(e4) {
        let t4 = function(e5) {
          let t5 = 0;
          return e5.ifd0.enabled && (t5 += 1024), e5.exif.enabled && (t5 += 2048), e5.makerNote && (t5 += 2048), e5.userComment && (t5 += 1024), e5.gps.enabled && (t5 += 512), e5.interop.enabled && (t5 += 100), e5.ifd1.enabled && (t5 += 1024), t5 + 2048;
        }(e4);
        return e4.jfif.enabled && (t4 += 50), e4.xmp.enabled && (t4 += 2e4), e4.iptc.enabled && (t4 += 14e3), e4.icc.enabled && (t4 += 6e3), t4;
      }
      var l3 = (e4) => String.fromCharCode.apply(null, e4);
      var d3 = typeof TextDecoder != "undefined" ? new TextDecoder("utf-8") : void 0;
      var u3 = class {
        static from(e4, t4) {
          return e4 instanceof this && e4.le === t4 ? e4 : new u3(e4, void 0, void 0, t4);
        }
        constructor(e4) {
          let t4 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, i4 = arguments.length > 2 ? arguments[2] : void 0, s4 = arguments.length > 3 ? arguments[3] : void 0;
          if (typeof s4 == "boolean" && (this.le = s4), Array.isArray(e4) && (e4 = new Uint8Array(e4)), e4 === 0)
            this.byteOffset = 0, this.byteLength = 0;
          else if (e4 instanceof ArrayBuffer) {
            i4 === void 0 && (i4 = e4.byteLength - t4);
            let s5 = new DataView(e4, t4, i4);
            this._swapDataView(s5);
          } else if (e4 instanceof Uint8Array || e4 instanceof DataView || e4 instanceof u3) {
            i4 === void 0 && (i4 = e4.byteLength - t4), t4 += e4.byteOffset, t4 + i4 > e4.byteOffset + e4.byteLength && f3("Creating view outside of available memory in ArrayBuffer");
            let s5 = new DataView(e4.buffer, t4, i4);
            this._swapDataView(s5);
          } else if (typeof e4 == "number") {
            let t5 = new DataView(new ArrayBuffer(e4));
            this._swapDataView(t5);
          } else
            f3("Invalid input argument for BufferView: " + e4);
        }
        _swapArrayBuffer(e4) {
          this._swapDataView(new DataView(e4));
        }
        _swapBuffer(e4) {
          this._swapDataView(new DataView(e4.buffer, e4.byteOffset, e4.byteLength));
        }
        _swapDataView(e4) {
          this.dataView = e4, this.buffer = e4.buffer, this.byteOffset = e4.byteOffset, this.byteLength = e4.byteLength;
        }
        _lengthToEnd(e4) {
          return this.byteLength - e4;
        }
        set(e4, t4) {
          let i4 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : u3;
          return e4 instanceof DataView || e4 instanceof u3 ? e4 = new Uint8Array(e4.buffer, e4.byteOffset, e4.byteLength) : e4 instanceof ArrayBuffer && (e4 = new Uint8Array(e4)), e4 instanceof Uint8Array || f3("BufferView.set(): Invalid data argument."), this.toUint8().set(e4, t4), new i4(this, t4, e4.byteLength);
        }
        subarray(e4, t4) {
          return t4 = t4 || this._lengthToEnd(e4), new u3(this, e4, t4);
        }
        toUint8() {
          return new Uint8Array(this.buffer, this.byteOffset, this.byteLength);
        }
        getUint8Array(e4, t4) {
          return new Uint8Array(this.buffer, this.byteOffset + e4, t4);
        }
        getString() {
          let e4 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, t4 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.byteLength, i4 = this.getUint8Array(e4, t4);
          return s4 = i4, d3 ? d3.decode(s4) : r3 ? Buffer.from(s4).toString("utf8") : decodeURIComponent(escape(l3(s4)));
          var s4;
        }
        getLatin1String() {
          let e4 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, t4 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.byteLength, i4 = this.getUint8Array(e4, t4);
          return l3(i4);
        }
        getUnicodeString() {
          let e4 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, t4 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.byteLength;
          const i4 = [];
          for (let s4 = 0; s4 < t4 && e4 + s4 < this.byteLength; s4 += 2)
            i4.push(this.getUint16(e4 + s4));
          return l3(i4);
        }
        getInt8(e4) {
          return this.dataView.getInt8(e4);
        }
        getUint8(e4) {
          return this.dataView.getUint8(e4);
        }
        getInt16(e4) {
          let t4 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.le;
          return this.dataView.getInt16(e4, t4);
        }
        getInt32(e4) {
          let t4 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.le;
          return this.dataView.getInt32(e4, t4);
        }
        getUint16(e4) {
          let t4 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.le;
          return this.dataView.getUint16(e4, t4);
        }
        getUint32(e4) {
          let t4 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.le;
          return this.dataView.getUint32(e4, t4);
        }
        getFloat32(e4) {
          let t4 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.le;
          return this.dataView.getFloat32(e4, t4);
        }
        getFloat64(e4) {
          let t4 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.le;
          return this.dataView.getFloat64(e4, t4);
        }
        getFloat(e4) {
          let t4 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.le;
          return this.dataView.getFloat32(e4, t4);
        }
        getDouble(e4) {
          let t4 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.le;
          return this.dataView.getFloat64(e4, t4);
        }
        getUintBytes(e4, t4, i4) {
          switch (t4) {
            case 1:
              return this.getUint8(e4, i4);
            case 2:
              return this.getUint16(e4, i4);
            case 4:
              return this.getUint32(e4, i4);
            case 8:
              return this.getUint64 && this.getUint64(e4, i4);
          }
        }
        getUint(e4, t4, i4) {
          switch (t4) {
            case 8:
              return this.getUint8(e4, i4);
            case 16:
              return this.getUint16(e4, i4);
            case 32:
              return this.getUint32(e4, i4);
            case 64:
              return this.getUint64 && this.getUint64(e4, i4);
          }
        }
        toString(e4) {
          return this.dataView.toString(e4, this.constructor.name);
        }
        ensureChunk() {
        }
      };
      function p3(e4, t4) {
        f3(`${e4} '${t4}' was not loaded, try using full build of exifr.`);
      }
      var c3 = class extends Map {
        constructor(e4) {
          super(), this.kind = e4;
        }
        get(e4, t4) {
          return this.has(e4) || p3(this.kind, e4), t4 && (e4 in t4 || function(e5, t5) {
            f3(`Unknown ${e5} '${t5}'.`);
          }(this.kind, e4), t4[e4].enabled || p3(this.kind, e4)), super.get(e4);
        }
        keyList() {
          return Array.from(this.keys());
        }
      };
      var g3 = new c3("file parser");
      var m3 = new c3("segment parser");
      var b3 = new c3("file reader");
      var y3 = t3.fetch;
      function w3(e4, t4) {
        return (s4 = e4).startsWith("data:") || s4.length > 1e4 ? v3(e4, t4, "base64") : n2 && e4.includes("://") ? k3(e4, t4, "url", S2) : n2 ? v3(e4, t4, "fs") : i3 ? k3(e4, t4, "url", S2) : void f3("Invalid input argument");
        var s4;
      }
      async function k3(e4, t4, i4, s4) {
        return b3.has(i4) ? v3(e4, t4, i4) : s4 ? async function(e5, t5) {
          let i5 = await t5(e5);
          return new u3(i5);
        }(e4, s4) : void f3(`Parser ${i4} is not loaded`);
      }
      async function v3(e4, t4, i4) {
        let s4 = new (b3.get(i4))(e4, t4);
        return await s4.read(), s4;
      }
      var S2 = (e4) => y3(e4).then((e5) => e5.arrayBuffer());
      var O2 = (e4) => new Promise((t4, i4) => {
        let s4 = new FileReader();
        s4.onloadend = () => t4(s4.result || new ArrayBuffer()), s4.onerror = i4, s4.readAsArrayBuffer(e4);
      });
      var U = /* @__PURE__ */ new Map();
      var A3 = /* @__PURE__ */ new Map();
      var I2 = /* @__PURE__ */ new Map();
      var x3 = ["chunked", "firstChunkSize", "firstChunkSizeNode", "firstChunkSizeBrowser", "chunkSize", "chunkLimit"];
      var B2 = ["jfif", "xmp", "icc", "iptc", "ihdr"];
      var T3 = ["tiff", ...B2];
      var V = ["ifd0", "ifd1", "exif", "gps", "interop"];
      var C2 = [...T3, ...V];
      var F2 = ["makerNote", "userComment"];
      var P2 = ["translateKeys", "translateValues", "reviveValues", "multiSegment"];
      var L2 = [...P2, "sanitize", "mergeOutput", "silentErrors"];
      var z3 = class {
        get translate() {
          return this.translateKeys || this.translateValues || this.reviveValues;
        }
      };
      var j3 = class extends z3 {
        get needed() {
          return this.enabled || this.deps.size > 0;
        }
        constructor(t4, i4, s4, n3) {
          if (super(), e3(this, "enabled", false), e3(this, "skip", /* @__PURE__ */ new Set()), e3(this, "pick", /* @__PURE__ */ new Set()), e3(this, "deps", /* @__PURE__ */ new Set()), e3(this, "translateKeys", false), e3(this, "translateValues", false), e3(this, "reviveValues", false), this.key = t4, this.enabled = i4, this.parse = this.enabled, this.applyInheritables(n3), this.canBeFiltered = V.includes(t4), this.canBeFiltered && (this.dict = U.get(t4)), s4 !== void 0)
            if (Array.isArray(s4))
              this.parse = this.enabled = true, this.canBeFiltered && s4.length > 0 && this.translateTagSet(s4, this.pick);
            else if (typeof s4 == "object") {
              if (this.enabled = true, this.parse = s4.parse !== false, this.canBeFiltered) {
                let {
                  pick: e4,
                  skip: t5
                } = s4;
                e4 && e4.length > 0 && this.translateTagSet(e4, this.pick), t5 && t5.length > 0 && this.translateTagSet(t5, this.skip);
              }
              this.applyInheritables(s4);
            } else
              s4 === true || s4 === false ? this.parse = this.enabled = s4 : f3(`Invalid options argument: ${s4}`);
        }
        applyInheritables(e4) {
          let t4, i4;
          for (t4 of P2)
            i4 = e4[t4], i4 !== void 0 && (this[t4] = i4);
        }
        translateTagSet(e4, t4) {
          if (this.dict) {
            let i4, s4, {
              tagKeys: n3,
              tagValues: r4
            } = this.dict;
            for (i4 of e4)
              typeof i4 == "string" ? (s4 = r4.indexOf(i4), s4 === -1 && (s4 = n3.indexOf(Number(i4))), s4 !== -1 && t4.add(Number(n3[s4]))) : t4.add(i4);
          } else
            for (let i4 of e4)
              t4.add(i4);
        }
        finalizeFilters() {
          !this.enabled && this.deps.size > 0 ? (this.enabled = true, _3(this.pick, this.deps)) : this.enabled && this.pick.size > 0 && _3(this.pick, this.deps);
        }
      };
      var M2 = {
        jfif: false,
        tiff: true,
        xmp: false,
        icc: false,
        iptc: false,
        ifd0: true,
        ifd1: false,
        exif: true,
        gps: true,
        interop: false,
        ihdr: void 0,
        makerNote: false,
        userComment: false,
        multiSegment: false,
        skip: [],
        pick: [],
        translateKeys: true,
        translateValues: true,
        reviveValues: true,
        sanitize: true,
        mergeOutput: true,
        silentErrors: true,
        chunked: true,
        firstChunkSize: void 0,
        firstChunkSizeNode: 512,
        firstChunkSizeBrowser: 65536,
        chunkSize: 65536,
        chunkLimit: 5
      };
      var E = /* @__PURE__ */ new Map();
      var N2 = class extends z3 {
        static useCached(e4) {
          let t4 = E.get(e4);
          return t4 !== void 0 || (t4 = new this(e4), E.set(e4, t4)), t4;
        }
        constructor(e4) {
          super(), e4 === true ? this.setupFromTrue() : e4 === void 0 ? this.setupFromUndefined() : Array.isArray(e4) ? this.setupFromArray(e4) : typeof e4 == "object" ? this.setupFromObject(e4) : f3(`Invalid options argument ${e4}`), this.firstChunkSize === void 0 && (this.firstChunkSize = i3 ? this.firstChunkSizeBrowser : this.firstChunkSizeNode), this.mergeOutput && (this.ifd1.enabled = false), this.filterNestedSegmentTags(), this.traverseTiffDependencyTree(), this.checkLoadedPlugins();
        }
        setupFromUndefined() {
          let e4;
          for (e4 of x3)
            this[e4] = M2[e4];
          for (e4 of L2)
            this[e4] = M2[e4];
          for (e4 of F2)
            this[e4] = M2[e4];
          for (e4 of C2)
            this[e4] = new j3(e4, M2[e4], void 0, this);
        }
        setupFromTrue() {
          let e4;
          for (e4 of x3)
            this[e4] = M2[e4];
          for (e4 of L2)
            this[e4] = M2[e4];
          for (e4 of F2)
            this[e4] = true;
          for (e4 of C2)
            this[e4] = new j3(e4, true, void 0, this);
        }
        setupFromArray(e4) {
          let t4;
          for (t4 of x3)
            this[t4] = M2[t4];
          for (t4 of L2)
            this[t4] = M2[t4];
          for (t4 of F2)
            this[t4] = M2[t4];
          for (t4 of C2)
            this[t4] = new j3(t4, false, void 0, this);
          this.setupGlobalFilters(e4, void 0, V);
        }
        setupFromObject(e4) {
          let t4;
          for (t4 of (V.ifd0 = V.ifd0 || V.image, V.ifd1 = V.ifd1 || V.thumbnail, Object.assign(this, e4), x3))
            this[t4] = $2(e4[t4], M2[t4]);
          for (t4 of L2)
            this[t4] = $2(e4[t4], M2[t4]);
          for (t4 of F2)
            this[t4] = $2(e4[t4], M2[t4]);
          for (t4 of T3)
            this[t4] = new j3(t4, M2[t4], e4[t4], this);
          for (t4 of V)
            this[t4] = new j3(t4, M2[t4], e4[t4], this.tiff);
          this.setupGlobalFilters(e4.pick, e4.skip, V, C2), e4.tiff === true ? this.batchEnableWithBool(V, true) : e4.tiff === false ? this.batchEnableWithUserValue(V, e4) : Array.isArray(e4.tiff) ? this.setupGlobalFilters(e4.tiff, void 0, V) : typeof e4.tiff == "object" && this.setupGlobalFilters(e4.tiff.pick, e4.tiff.skip, V);
        }
        batchEnableWithBool(e4, t4) {
          for (let i4 of e4)
            this[i4].enabled = t4;
        }
        batchEnableWithUserValue(e4, t4) {
          for (let i4 of e4) {
            let e5 = t4[i4];
            this[i4].enabled = e5 !== false && e5 !== void 0;
          }
        }
        setupGlobalFilters(e4, t4, i4) {
          let s4 = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : i4;
          if (e4 && e4.length) {
            for (let e5 of s4)
              this[e5].enabled = false;
            let t5 = D2(e4, i4);
            for (let [e5, i5] of t5)
              _3(this[e5].pick, i5), this[e5].enabled = true;
          } else if (t4 && t4.length) {
            let e5 = D2(t4, i4);
            for (let [t5, i5] of e5)
              _3(this[t5].skip, i5);
          }
        }
        filterNestedSegmentTags() {
          let {
            ifd0: e4,
            exif: t4,
            xmp: i4,
            iptc: s4,
            icc: n3
          } = this;
          this.makerNote ? t4.deps.add(37500) : t4.skip.add(37500), this.userComment ? t4.deps.add(37510) : t4.skip.add(37510), i4.enabled || e4.skip.add(700), s4.enabled || e4.skip.add(33723), n3.enabled || e4.skip.add(34675);
        }
        traverseTiffDependencyTree() {
          let {
            ifd0: e4,
            exif: t4,
            gps: i4,
            interop: s4
          } = this;
          s4.needed && (t4.deps.add(40965), e4.deps.add(40965)), t4.needed && e4.deps.add(34665), i4.needed && e4.deps.add(34853), this.tiff.enabled = V.some((e5) => this[e5].enabled === true) || this.makerNote || this.userComment;
          for (let e5 of V)
            this[e5].finalizeFilters();
        }
        get onlyTiff() {
          return !B2.map((e4) => this[e4].enabled).some((e4) => e4 === true) && this.tiff.enabled;
        }
        checkLoadedPlugins() {
          for (let e4 of T3)
            this[e4].enabled && !m3.has(e4) && p3("segment parser", e4);
        }
      };
      function D2(e4, t4) {
        let i4, s4, n3, r4, a4 = [];
        for (n3 of t4) {
          for (r4 of (i4 = U.get(n3), s4 = [], i4))
            (e4.includes(r4[0]) || e4.includes(r4[1])) && s4.push(r4[0]);
          s4.length && a4.push([n3, s4]);
        }
        return a4;
      }
      function $2(e4, t4) {
        return e4 !== void 0 ? e4 : t4 !== void 0 ? t4 : void 0;
      }
      function _3(e4, t4) {
        for (let i4 of t4)
          e4.add(i4);
      }
      e3(N2, "default", M2);
      var X = class {
        constructor(t4) {
          e3(this, "parsers", {}), e3(this, "output", {}), e3(this, "errors", []), e3(this, "pushToErrors", (e4) => this.errors.push(e4)), this.options = N2.useCached(t4);
        }
        async read(e4) {
          this.file = await function(e5, t4) {
            return typeof e5 == "string" ? w3(e5, t4) : i3 && !s3 && e5 instanceof HTMLImageElement ? w3(e5.src, t4) : e5 instanceof Uint8Array || e5 instanceof ArrayBuffer || e5 instanceof DataView ? new u3(e5) : i3 && e5 instanceof Blob ? k3(e5, t4, "blob", O2) : void f3("Invalid input argument");
          }(e4, this.options);
        }
        setup() {
          if (this.fileParser)
            return;
          let {
            file: e4
          } = this, t4 = e4.getUint16(0);
          for (let [i4, s4] of g3)
            if (s4.canHandle(e4, t4))
              return this.fileParser = new s4(this.options, this.file, this.parsers), e4[i4] = true;
          this.file.close && this.file.close(), f3("Unknown file format");
        }
        async parse() {
          let {
            output: e4,
            errors: t4
          } = this;
          return this.setup(), this.options.silentErrors ? (await this.executeParsers().catch(this.pushToErrors), t4.push(...this.fileParser.errors)) : await this.executeParsers(), this.file.close && this.file.close(), this.options.silentErrors && t4.length > 0 && (e4.errors = t4), h3(i4 = e4) ? void 0 : i4;
          var i4;
        }
        async executeParsers() {
          let {
            output: e4
          } = this;
          await this.fileParser.parse();
          let t4 = Object.values(this.parsers).map(async (t5) => {
            let i4 = await t5.parse();
            t5.assignToOutput(e4, i4);
          });
          this.options.silentErrors && (t4 = t4.map((e5) => e5.catch(this.pushToErrors))), await Promise.all(t4);
        }
        async extractThumbnail() {
          this.setup();
          let {
            options: e4,
            file: t4
          } = this, i4 = m3.get("tiff", e4);
          var s4;
          if (t4.tiff ? s4 = {
            start: 0,
            type: "tiff"
          } : t4.jpeg && (s4 = await this.fileParser.getOrFindSegment("tiff")), s4 === void 0)
            return;
          let n3 = await this.fileParser.ensureSegmentChunk(s4), r4 = this.parsers.tiff = new i4(n3, e4, t4), a4 = await r4.extractThumbnail();
          return t4.close && t4.close(), a4;
        }
      };
      var H2 = class {
        static findPosition(e4, t4) {
          let i4 = e4.getUint16(t4 + 2) + 2, s4 = typeof this.headerLength == "function" ? this.headerLength(e4, t4, i4) : this.headerLength, n3 = t4 + s4, r4 = i4 - s4;
          return {
            offset: t4,
            length: i4,
            headerLength: s4,
            start: n3,
            size: r4,
            end: n3 + r4
          };
        }
        static parse(e4) {
          let t4 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          return new this(e4, new N2({
            [this.type]: t4
          }), e4).parse();
        }
        normalizeInput(e4) {
          return e4 instanceof u3 ? e4 : new u3(e4);
        }
        constructor(t4) {
          let i4 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, s4 = arguments.length > 2 ? arguments[2] : void 0;
          e3(this, "errors", []), e3(this, "raw", /* @__PURE__ */ new Map()), e3(this, "handleError", (e4) => {
            if (!this.options.silentErrors)
              throw e4;
            this.errors.push(e4.message);
          }), this.chunk = this.normalizeInput(t4), this.file = s4, this.type = this.constructor.type, this.globalOptions = this.options = i4, this.localOptions = i4[this.type], this.canTranslate = this.localOptions && this.localOptions.translate;
        }
        translate() {
          this.canTranslate && (this.translated = this.translateBlock(this.raw, this.type));
        }
        get output() {
          return this.translated ? this.translated : this.raw ? Object.fromEntries(this.raw) : void 0;
        }
        translateBlock(e4, t4) {
          let i4 = I2.get(t4), s4 = A3.get(t4), n3 = U.get(t4), r4 = this.options[t4], a4 = r4.reviveValues && !!i4, h4 = r4.translateValues && !!s4, f4 = r4.translateKeys && !!n3, o4 = {};
          for (let [t5, r5] of e4)
            a4 && i4.has(t5) ? r5 = i4.get(t5)(r5) : h4 && s4.has(t5) && (r5 = this.translateValue(r5, s4.get(t5))), f4 && n3.has(t5) && (t5 = n3.get(t5) || t5), o4[t5] = r5;
          return o4;
        }
        translateValue(e4, t4) {
          return t4[e4] || t4.DEFAULT || e4;
        }
        assignToOutput(e4, t4) {
          this.assignObjectToOutput(e4, this.constructor.type, t4);
        }
        assignObjectToOutput(e4, t4, i4) {
          if (this.globalOptions.mergeOutput)
            return Object.assign(e4, i4);
          e4[t4] ? Object.assign(e4[t4], i4) : e4[t4] = i4;
        }
      };
      e3(H2, "headerLength", 4), e3(H2, "type", void 0), e3(H2, "multiSegment", false), e3(H2, "canHandle", () => false);
      function W(e4) {
        return e4 === 192 || e4 === 194 || e4 === 196 || e4 === 219 || e4 === 221 || e4 === 218 || e4 === 254;
      }
      function Y(e4) {
        return e4 >= 224 && e4 <= 239;
      }
      function G(e4, t4, i4) {
        for (let [s4, n3] of m3)
          if (n3.canHandle(e4, t4, i4))
            return s4;
      }
      var K = class extends class {
        constructor(t4, i4, s4) {
          e3(this, "errors", []), e3(this, "ensureSegmentChunk", async (e4) => {
            let t5 = e4.start, i5 = e4.size || 65536;
            if (this.file.chunked) {
              if (this.file.available(t5, i5))
                e4.chunk = this.file.subarray(t5, i5);
              else
                try {
                  e4.chunk = await this.file.readChunk(t5, i5);
                } catch (t6) {
                  f3(`Couldn't read segment: ${JSON.stringify(e4)}. ${t6.message}`);
                }
            } else
              this.file.byteLength > t5 + i5 ? e4.chunk = this.file.subarray(t5, i5) : e4.size === void 0 ? e4.chunk = this.file.subarray(t5) : f3("Segment unreachable: " + JSON.stringify(e4));
            return e4.chunk;
          }), this.extendOptions && this.extendOptions(t4), this.options = t4, this.file = i4, this.parsers = s4;
        }
        injectSegment(e4, t4) {
          this.options[e4].enabled && this.createParser(e4, t4);
        }
        createParser(e4, t4) {
          let i4 = new (m3.get(e4))(t4, this.options, this.file);
          return this.parsers[e4] = i4;
        }
        createParsers(e4) {
          for (let t4 of e4) {
            let {
              type: e5,
              chunk: i4
            } = t4, s4 = this.options[e5];
            if (s4 && s4.enabled) {
              let t5 = this.parsers[e5];
              t5 && t5.append || t5 || this.createParser(e5, i4);
            }
          }
        }
        async readSegments(e4) {
          let t4 = e4.map(this.ensureSegmentChunk);
          await Promise.all(t4);
        }
      } {
        constructor() {
          super(...arguments), e3(this, "appSegments", []), e3(this, "jpegSegments", []), e3(this, "unknownSegments", []);
        }
        static canHandle(e4, t4) {
          return t4 === 65496;
        }
        async parse() {
          await this.findAppSegments(), await this.readSegments(this.appSegments), this.mergeMultiSegments(), this.createParsers(this.mergedAppSegments || this.appSegments);
        }
        setupSegmentFinderArgs(e4) {
          e4 === true ? (this.findAll = true, this.wanted = new Set(m3.keyList())) : (e4 = e4 === void 0 ? m3.keyList().filter((e5) => this.options[e5].enabled) : e4.filter((e5) => this.options[e5].enabled && m3.has(e5)), this.findAll = false, this.remaining = new Set(e4), this.wanted = new Set(e4)), this.unfinishedMultiSegment = false;
        }
        async findAppSegments() {
          let e4 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, t4 = arguments.length > 1 ? arguments[1] : void 0;
          this.setupSegmentFinderArgs(t4);
          let {
            file: i4,
            findAll: s4,
            wanted: n3,
            remaining: r4
          } = this;
          if (!s4 && this.file.chunked && (s4 = Array.from(n3).some((e5) => {
            let t5 = m3.get(e5), i5 = this.options[e5];
            return t5.multiSegment && i5.multiSegment;
          }), s4 && await this.file.readWhole()), e4 = this.findAppSegmentsInRange(e4, i4.byteLength), !this.options.onlyTiff && i4.chunked) {
            let t5 = false;
            for (; r4.size > 0 && !t5 && (i4.canReadNextChunk || this.unfinishedMultiSegment); ) {
              let {
                nextChunkOffset: s5
              } = i4, n4 = this.appSegments.some((e5) => !this.file.available(e5.offset || e5.start, e5.length || e5.size));
              if (t5 = e4 > s5 && !n4 ? !await i4.readNextChunk(e4) : !await i4.readNextChunk(s5), e4 = this.findAppSegmentsInRange(e4, i4.byteLength), e4 === void 0)
                return;
            }
          }
        }
        findAppSegmentsInRange(e4, t4) {
          t4 -= 2;
          let i4, s4, n3, r4, a4, h4, {
            file: f4,
            findAll: o4,
            wanted: l4,
            remaining: d4,
            options: u4
          } = this;
          for (; e4 < t4; e4++)
            if (f4.getUint8(e4) === 255) {
              if (i4 = f4.getUint8(e4 + 1), Y(i4)) {
                if (s4 = f4.getUint16(e4 + 2), n3 = G(f4, e4, s4), n3 && l4.has(n3) && (r4 = m3.get(n3), a4 = r4.findPosition(f4, e4), h4 = u4[n3], a4.type = n3, this.appSegments.push(a4), !o4 && (r4.multiSegment && h4.multiSegment ? (this.unfinishedMultiSegment = a4.chunkNumber < a4.chunkCount, this.unfinishedMultiSegment || d4.delete(n3)) : d4.delete(n3), d4.size === 0)))
                  break;
                u4.recordUnknownSegments && (a4 = H2.findPosition(f4, e4), a4.marker = i4, this.unknownSegments.push(a4)), e4 += s4 + 1;
              } else if (W(i4)) {
                if (s4 = f4.getUint16(e4 + 2), i4 === 218 && u4.stopAfterSos !== false)
                  return;
                u4.recordJpegSegments && this.jpegSegments.push({
                  offset: e4,
                  length: s4,
                  marker: i4
                }), e4 += s4 + 1;
              }
            }
          return e4;
        }
        mergeMultiSegments() {
          if (!this.appSegments.some((e5) => e5.multiSegment))
            return;
          let e4 = function(e5, t4) {
            let i4, s4, n3, r4 = /* @__PURE__ */ new Map();
            for (let a4 = 0; a4 < e5.length; a4++)
              i4 = e5[a4], s4 = i4[t4], r4.has(s4) ? n3 = r4.get(s4) : r4.set(s4, n3 = []), n3.push(i4);
            return Array.from(r4);
          }(this.appSegments, "type");
          this.mergedAppSegments = e4.map((e5) => {
            let [t4, i4] = e5, s4 = m3.get(t4, this.options);
            if (s4.handleMultiSegments) {
              return {
                type: t4,
                chunk: s4.handleMultiSegments(i4)
              };
            }
            return i4[0];
          });
        }
        getSegment(e4) {
          return this.appSegments.find((t4) => t4.type === e4);
        }
        async getOrFindSegment(e4) {
          let t4 = this.getSegment(e4);
          return t4 === void 0 && (await this.findAppSegments(0, [e4]), t4 = this.getSegment(e4)), t4;
        }
      };
      e3(K, "type", "jpeg"), g3.set("jpeg", K);
      var R = [void 0, 1, 1, 2, 4, 8, 1, 1, 2, 4, 8, 4, 8, 4];
      var J = class extends H2 {
        parseHeader() {
          var e4 = this.chunk.getUint16();
          e4 === 18761 ? this.le = true : e4 === 19789 && (this.le = false), this.chunk.le = this.le, this.headerParsed = true;
        }
        parseTags(e4, t4) {
          let i4 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : /* @__PURE__ */ new Map(), {
            pick: s4,
            skip: n3
          } = this.options[t4];
          s4 = new Set(s4);
          let r4 = s4.size > 0, a4 = n3.size === 0, h4 = this.chunk.getUint16(e4);
          e4 += 2;
          for (let f4 = 0; f4 < h4; f4++) {
            let h5 = this.chunk.getUint16(e4);
            if (r4) {
              if (s4.has(h5) && (i4.set(h5, this.parseTag(e4, h5, t4)), s4.delete(h5), s4.size === 0))
                break;
            } else
              !a4 && n3.has(h5) || i4.set(h5, this.parseTag(e4, h5, t4));
            e4 += 12;
          }
          return i4;
        }
        parseTag(e4, t4, i4) {
          let {
            chunk: s4
          } = this, n3 = s4.getUint16(e4 + 2), r4 = s4.getUint32(e4 + 4), a4 = R[n3];
          if (a4 * r4 <= 4 ? e4 += 8 : e4 = s4.getUint32(e4 + 8), (n3 < 1 || n3 > 13) && f3(`Invalid TIFF value type. block: ${i4.toUpperCase()}, tag: ${t4.toString(16)}, type: ${n3}, offset ${e4}`), e4 > s4.byteLength && f3(`Invalid TIFF value offset. block: ${i4.toUpperCase()}, tag: ${t4.toString(16)}, type: ${n3}, offset ${e4} is outside of chunk size ${s4.byteLength}`), n3 === 1)
            return s4.getUint8Array(e4, r4);
          if (n3 === 2)
            return (h4 = function(e5) {
              for (; e5.endsWith("\0"); )
                e5 = e5.slice(0, -1);
              return e5;
            }(h4 = s4.getString(e4, r4)).trim()) === "" ? void 0 : h4;
          var h4;
          if (n3 === 7)
            return s4.getUint8Array(e4, r4);
          if (r4 === 1)
            return this.parseTagValue(n3, e4);
          {
            let t5 = function(e5) {
              switch (e5) {
                case 1:
                  return Uint8Array;
                case 3:
                  return Uint16Array;
                case 4:
                  return Uint32Array;
                case 5:
                case 10:
                default:
                  return Array;
                case 6:
                  return Int8Array;
                case 8:
                  return Int16Array;
                case 9:
                  return Int32Array;
                case 11:
                  return Float32Array;
                case 12:
                  return Float64Array;
              }
            }(n3), i5 = new t5(r4), s5 = a4;
            for (let t6 = 0; t6 < r4; t6++)
              i5[t6] = this.parseTagValue(n3, e4), e4 += s5;
            return i5;
          }
        }
        parseTagValue(e4, t4) {
          let {
            chunk: i4
          } = this;
          switch (e4) {
            case 1:
              return i4.getUint8(t4);
            case 3:
              return i4.getUint16(t4);
            case 4:
            case 13:
              return i4.getUint32(t4);
            case 5:
              return i4.getUint32(t4) / i4.getUint32(t4 + 4);
            case 6:
              return i4.getInt8(t4);
            case 8:
              return i4.getInt16(t4);
            case 9:
              return i4.getInt32(t4);
            case 10:
              return i4.getInt32(t4) / i4.getInt32(t4 + 4);
            case 11:
              return i4.getFloat(t4);
            case 12:
              return i4.getDouble(t4);
            default:
              f3(`Invalid tiff type ${e4}`);
          }
        }
      };
      var q3 = class extends J {
        static canHandle(e4, t4) {
          return e4.getUint8(t4 + 1) === 225 && e4.getUint32(t4 + 4) === 1165519206 && e4.getUint16(t4 + 8) === 0;
        }
        async parse() {
          this.parseHeader();
          let {
            options: e4
          } = this;
          return e4.ifd0.enabled && await this.parseIfd0Block(), e4.exif.enabled && await this.safeParse("parseExifBlock"), e4.gps.enabled && await this.safeParse("parseGpsBlock"), e4.interop.enabled && await this.safeParse("parseInteropBlock"), e4.ifd1.enabled && await this.safeParse("parseThumbnailBlock"), this.createOutput();
        }
        safeParse(e4) {
          let t4 = this[e4]();
          return t4.catch !== void 0 && (t4 = t4.catch(this.handleError)), t4;
        }
        findIfd0Offset() {
          this.ifd0Offset === void 0 && (this.ifd0Offset = this.chunk.getUint32(4));
        }
        findIfd1Offset() {
          if (this.ifd1Offset === void 0) {
            this.findIfd0Offset();
            let e4 = this.chunk.getUint16(this.ifd0Offset), t4 = this.ifd0Offset + 2 + 12 * e4;
            this.ifd1Offset = this.chunk.getUint32(t4);
          }
        }
        parseBlock(e4, t4) {
          let i4 = /* @__PURE__ */ new Map();
          return this[t4] = i4, this.parseTags(e4, t4, i4), i4;
        }
        async parseIfd0Block() {
          if (this.ifd0)
            return;
          let {
            file: e4
          } = this;
          this.findIfd0Offset(), this.ifd0Offset < 8 && f3("Malformed EXIF data"), !e4.chunked && this.ifd0Offset > e4.byteLength && f3(`IFD0 offset points to outside of file.
this.ifd0Offset: ${this.ifd0Offset}, file.byteLength: ${e4.byteLength}`), e4.tiff && await e4.ensureChunk(this.ifd0Offset, o3(this.options));
          let t4 = this.parseBlock(this.ifd0Offset, "ifd0");
          return t4.size !== 0 ? (this.exifOffset = t4.get(34665), this.interopOffset = t4.get(40965), this.gpsOffset = t4.get(34853), this.xmp = t4.get(700), this.iptc = t4.get(33723), this.icc = t4.get(34675), this.options.sanitize && (t4.delete(34665), t4.delete(40965), t4.delete(34853), t4.delete(700), t4.delete(33723), t4.delete(34675)), t4) : void 0;
        }
        async parseExifBlock() {
          if (this.exif)
            return;
          if (this.ifd0 || await this.parseIfd0Block(), this.exifOffset === void 0)
            return;
          this.file.tiff && await this.file.ensureChunk(this.exifOffset, o3(this.options));
          let e4 = this.parseBlock(this.exifOffset, "exif");
          return this.interopOffset || (this.interopOffset = e4.get(40965)), this.makerNote = e4.get(37500), this.userComment = e4.get(37510), this.options.sanitize && (e4.delete(40965), e4.delete(37500), e4.delete(37510)), this.unpack(e4, 41728), this.unpack(e4, 41729), e4;
        }
        unpack(e4, t4) {
          let i4 = e4.get(t4);
          i4 && i4.length === 1 && e4.set(t4, i4[0]);
        }
        async parseGpsBlock() {
          if (this.gps)
            return;
          if (this.ifd0 || await this.parseIfd0Block(), this.gpsOffset === void 0)
            return;
          let e4 = this.parseBlock(this.gpsOffset, "gps");
          return e4 && e4.has(2) && e4.has(4) && (e4.set("latitude", Q(...e4.get(2), e4.get(1))), e4.set("longitude", Q(...e4.get(4), e4.get(3)))), e4;
        }
        async parseInteropBlock() {
          if (!this.interop && (this.ifd0 || await this.parseIfd0Block(), this.interopOffset !== void 0 || this.exif || await this.parseExifBlock(), this.interopOffset !== void 0))
            return this.parseBlock(this.interopOffset, "interop");
        }
        async parseThumbnailBlock() {
          let e4 = arguments.length > 0 && arguments[0] !== void 0 && arguments[0];
          if (!this.ifd1 && !this.ifd1Parsed && (!this.options.mergeOutput || e4))
            return this.findIfd1Offset(), this.ifd1Offset > 0 && (this.parseBlock(this.ifd1Offset, "ifd1"), this.ifd1Parsed = true), this.ifd1;
        }
        async extractThumbnail() {
          if (this.headerParsed || this.parseHeader(), this.ifd1Parsed || await this.parseThumbnailBlock(true), this.ifd1 === void 0)
            return;
          let e4 = this.ifd1.get(513), t4 = this.ifd1.get(514);
          return this.chunk.getUint8Array(e4, t4);
        }
        get image() {
          return this.ifd0;
        }
        get thumbnail() {
          return this.ifd1;
        }
        createOutput() {
          let e4, t4, i4, s4 = {};
          for (t4 of V)
            if (e4 = this[t4], !h3(e4))
              if (i4 = this.canTranslate ? this.translateBlock(e4, t4) : Object.fromEntries(e4), this.options.mergeOutput) {
                if (t4 === "ifd1")
                  continue;
                Object.assign(s4, i4);
              } else
                s4[t4] = i4;
          return this.makerNote && (s4.makerNote = this.makerNote), this.userComment && (s4.userComment = this.userComment), s4;
        }
        assignToOutput(e4, t4) {
          if (this.globalOptions.mergeOutput)
            Object.assign(e4, t4);
          else
            for (let [i4, s4] of Object.entries(t4))
              this.assignObjectToOutput(e4, i4, s4);
        }
      };
      function Q(e4, t4, i4, s4) {
        var n3 = e4 + t4 / 60 + i4 / 3600;
        return s4 !== "S" && s4 !== "W" || (n3 *= -1), n3;
      }
      e3(q3, "type", "tiff"), e3(q3, "headerLength", 10), m3.set("tiff", q3);
      var Z = Object.assign({}, {
        ifd0: false,
        ifd1: false,
        exif: false,
        gps: false,
        interop: false,
        sanitize: false,
        reviveValues: true,
        translateKeys: false,
        translateValues: false,
        mergeOutput: false
      }, {
        firstChunkSize: 4e4,
        ifd0: [274]
      });
      var ee = Object.freeze({
        1: {
          dimensionSwapped: false,
          scaleX: 1,
          scaleY: 1,
          deg: 0,
          rad: 0
        },
        2: {
          dimensionSwapped: false,
          scaleX: -1,
          scaleY: 1,
          deg: 0,
          rad: 0
        },
        3: {
          dimensionSwapped: false,
          scaleX: 1,
          scaleY: 1,
          deg: 180,
          rad: 180 * Math.PI / 180
        },
        4: {
          dimensionSwapped: false,
          scaleX: -1,
          scaleY: 1,
          deg: 180,
          rad: 180 * Math.PI / 180
        },
        5: {
          dimensionSwapped: true,
          scaleX: 1,
          scaleY: -1,
          deg: 90,
          rad: 90 * Math.PI / 180
        },
        6: {
          dimensionSwapped: true,
          scaleX: 1,
          scaleY: 1,
          deg: 90,
          rad: 90 * Math.PI / 180
        },
        7: {
          dimensionSwapped: true,
          scaleX: 1,
          scaleY: -1,
          deg: 270,
          rad: 270 * Math.PI / 180
        },
        8: {
          dimensionSwapped: true,
          scaleX: 1,
          scaleY: 1,
          deg: 270,
          rad: 270 * Math.PI / 180
        }
      });
      var te = true;
      var ie = true;
      if (typeof navigator == "object") {
        let e4 = navigator.userAgent;
        if (e4.includes("iPad") || e4.includes("iPhone")) {
          let t4 = e4.match(/OS (\d+)_(\d+)/);
          if (t4) {
            let [, e5, i4] = t4, s4 = Number(e5) + 0.1 * Number(i4);
            te = s4 < 13.4, ie = false;
          }
        } else if (e4.includes("OS X 10")) {
          let [, t4] = e4.match(/OS X 10[_.](\d+)/);
          te = ie = Number(t4) < 15;
        }
        if (e4.includes("Chrome/")) {
          let [, t4] = e4.match(/Chrome\/(\d+)/);
          te = ie = Number(t4) < 81;
        } else if (e4.includes("Firefox/")) {
          let [, t4] = e4.match(/Firefox\/(\d+)/);
          te = ie = Number(t4) < 77;
        }
      }
      exports.rotation = async function(e4) {
        let t4 = await async function(e5) {
          let t5 = new X(Z);
          await t5.read(e5);
          let i4 = await t5.parse();
          if (i4 && i4.ifd0)
            return i4.ifd0[274];
        }(e4);
        return Object.assign({
          canvas: te,
          css: ie
        }, ee[t4]);
      };
    }
  });

  // ../packages/@uppy/thumbnail-generator/lib/locale.js
  var require_locale3 = __commonJS({
    "../packages/@uppy/thumbnail-generator/lib/locale.js"(exports, module) {
      module.exports = {
        strings: {
          generatingThumbnails: "Generating thumbnails..."
        }
      };
    }
  });

  // ../packages/@uppy/thumbnail-generator/lib/index.js
  var require_lib5 = __commonJS({
    "../packages/@uppy/thumbnail-generator/lib/index.js"(exports, module) {
      var _class;
      var _temp;
      var {
        UIPlugin
      } = require_lib2();
      var dataURItoBlob = require_dataURItoBlob();
      var isObjectURL = require_isObjectURL();
      var isPreviewSupported = require_isPreviewSupported();
      var {
        rotation
      } = require_mini_umd();
      var locale = require_locale3();
      module.exports = (_temp = _class = class ThumbnailGenerator extends UIPlugin {
        constructor(uppy, opts) {
          super(uppy, opts);
          this.onFileAdded = (file) => {
            if (!file.preview && file.data && isPreviewSupported(file.type) && !file.isRemote) {
              this.addToQueue(file.id);
            }
          };
          this.onCancelRequest = (file) => {
            const index = this.queue.indexOf(file.id);
            if (index !== -1) {
              this.queue.splice(index, 1);
            }
          };
          this.onFileRemoved = (file) => {
            const index = this.queue.indexOf(file.id);
            if (index !== -1) {
              this.queue.splice(index, 1);
            }
            if (file.preview && isObjectURL(file.preview)) {
              URL.revokeObjectURL(file.preview);
            }
          };
          this.onRestored = () => {
            const restoredFiles = this.uppy.getFiles().filter((file) => file.isRestored);
            restoredFiles.forEach((file) => {
              if (!file.preview || isObjectURL(file.preview)) {
                this.addToQueue(file.id);
              }
            });
          };
          this.onAllFilesRemoved = () => {
            this.queue = [];
          };
          this.waitUntilAllProcessed = (fileIDs) => {
            fileIDs.forEach((fileID) => {
              const file = this.uppy.getFile(fileID);
              this.uppy.emit("preprocess-progress", file, {
                mode: "indeterminate",
                message: this.i18n("generatingThumbnails")
              });
            });
            const emitPreprocessCompleteForAll = () => {
              fileIDs.forEach((fileID) => {
                const file = this.uppy.getFile(fileID);
                this.uppy.emit("preprocess-complete", file);
              });
            };
            return new Promise((resolve) => {
              if (this.queueProcessing) {
                this.uppy.once("thumbnail:all-generated", () => {
                  emitPreprocessCompleteForAll();
                  resolve();
                });
              } else {
                emitPreprocessCompleteForAll();
                resolve();
              }
            });
          };
          this.type = "modifier";
          this.id = this.opts.id || "ThumbnailGenerator";
          this.title = "Thumbnail Generator";
          this.queue = [];
          this.queueProcessing = false;
          this.defaultThumbnailDimension = 200;
          this.thumbnailType = this.opts.thumbnailType || "image/jpeg";
          this.defaultLocale = locale;
          const defaultOptions = {
            thumbnailWidth: null,
            thumbnailHeight: null,
            waitForThumbnailsBeforeUpload: false,
            lazy: false
          };
          this.opts = {
            ...defaultOptions,
            ...opts
          };
          this.i18nInit();
          if (this.opts.lazy && this.opts.waitForThumbnailsBeforeUpload) {
            throw new Error("ThumbnailGenerator: The `lazy` and `waitForThumbnailsBeforeUpload` options are mutually exclusive. Please ensure at most one of them is set to `true`.");
          }
        }
        createThumbnail(file, targetWidth, targetHeight) {
          const originalUrl = URL.createObjectURL(file.data);
          const onload = new Promise((resolve, reject) => {
            const image = new Image();
            image.src = originalUrl;
            image.addEventListener("load", () => {
              URL.revokeObjectURL(originalUrl);
              resolve(image);
            });
            image.addEventListener("error", (event) => {
              URL.revokeObjectURL(originalUrl);
              reject(event.error || new Error("Could not create thumbnail"));
            });
          });
          const orientationPromise = rotation(file.data).catch(() => 1);
          return Promise.all([onload, orientationPromise]).then((_ref) => {
            let [image, orientation] = _ref;
            const dimensions = this.getProportionalDimensions(image, targetWidth, targetHeight, orientation.deg);
            const rotatedImage = this.rotateImage(image, orientation);
            const resizedImage = this.resizeImage(rotatedImage, dimensions.width, dimensions.height);
            return this.canvasToBlob(resizedImage, this.thumbnailType, 80);
          }).then((blob) => {
            return URL.createObjectURL(blob);
          });
        }
        getProportionalDimensions(img, width, height, rotation2) {
          let aspect = img.width / img.height;
          if (rotation2 === 90 || rotation2 === 270) {
            aspect = img.height / img.width;
          }
          if (width != null) {
            return {
              width,
              height: Math.round(width / aspect)
            };
          }
          if (height != null) {
            return {
              width: Math.round(height * aspect),
              height
            };
          }
          return {
            width: this.defaultThumbnailDimension,
            height: Math.round(this.defaultThumbnailDimension / aspect)
          };
        }
        protect(image) {
          const ratio = image.width / image.height;
          const maxSquare = 5e6;
          const maxSize = 4096;
          let maxW = Math.floor(Math.sqrt(maxSquare * ratio));
          let maxH = Math.floor(maxSquare / Math.sqrt(maxSquare * ratio));
          if (maxW > maxSize) {
            maxW = maxSize;
            maxH = Math.round(maxW / ratio);
          }
          if (maxH > maxSize) {
            maxH = maxSize;
            maxW = Math.round(ratio * maxH);
          }
          if (image.width > maxW) {
            const canvas = document.createElement("canvas");
            canvas.width = maxW;
            canvas.height = maxH;
            canvas.getContext("2d").drawImage(image, 0, 0, maxW, maxH);
            image = canvas;
          }
          return image;
        }
        resizeImage(image, targetWidth, targetHeight) {
          image = this.protect(image);
          let steps = Math.ceil(Math.log2(image.width / targetWidth));
          if (steps < 1) {
            steps = 1;
          }
          let sW = targetWidth * 2 ** (steps - 1);
          let sH = targetHeight * 2 ** (steps - 1);
          const x3 = 2;
          while (steps--) {
            const canvas = document.createElement("canvas");
            canvas.width = sW;
            canvas.height = sH;
            canvas.getContext("2d").drawImage(image, 0, 0, sW, sH);
            image = canvas;
            sW = Math.round(sW / x3);
            sH = Math.round(sH / x3);
          }
          return image;
        }
        rotateImage(image, translate) {
          let w3 = image.width;
          let h3 = image.height;
          if (translate.deg === 90 || translate.deg === 270) {
            w3 = image.height;
            h3 = image.width;
          }
          const canvas = document.createElement("canvas");
          canvas.width = w3;
          canvas.height = h3;
          const context = canvas.getContext("2d");
          context.translate(w3 / 2, h3 / 2);
          if (translate.canvas) {
            context.rotate(translate.rad);
            context.scale(translate.scaleX, translate.scaleY);
          }
          context.drawImage(image, -image.width / 2, -image.height / 2, image.width, image.height);
          return canvas;
        }
        canvasToBlob(canvas, type, quality) {
          try {
            canvas.getContext("2d").getImageData(0, 0, 1, 1);
          } catch (err) {
            if (err.code === 18) {
              return Promise.reject(new Error("cannot read image, probably an svg with external resources"));
            }
          }
          if (canvas.toBlob) {
            return new Promise((resolve) => {
              canvas.toBlob(resolve, type, quality);
            }).then((blob) => {
              if (blob === null) {
                throw new Error("cannot read image, probably an svg with external resources");
              }
              return blob;
            });
          }
          return Promise.resolve().then(() => {
            return dataURItoBlob(canvas.toDataURL(type, quality), {});
          }).then((blob) => {
            if (blob === null) {
              throw new Error("could not extract blob, probably an old browser");
            }
            return blob;
          });
        }
        setPreviewURL(fileID, preview) {
          this.uppy.setFileState(fileID, {
            preview
          });
        }
        addToQueue(item) {
          this.queue.push(item);
          if (this.queueProcessing === false) {
            this.processQueue();
          }
        }
        processQueue() {
          this.queueProcessing = true;
          if (this.queue.length > 0) {
            const current = this.uppy.getFile(this.queue.shift());
            if (!current) {
              this.uppy.log("[ThumbnailGenerator] file was removed before a thumbnail could be generated, but not removed from the queue. This is probably a bug", "error");
              return;
            }
            return this.requestThumbnail(current).catch(() => {
            }).then(() => this.processQueue());
          }
          this.queueProcessing = false;
          this.uppy.log("[ThumbnailGenerator] Emptied thumbnail queue");
          this.uppy.emit("thumbnail:all-generated");
        }
        requestThumbnail(file) {
          if (isPreviewSupported(file.type) && !file.isRemote) {
            return this.createThumbnail(file, this.opts.thumbnailWidth, this.opts.thumbnailHeight).then((preview) => {
              this.setPreviewURL(file.id, preview);
              this.uppy.log(`[ThumbnailGenerator] Generated thumbnail for ${file.id}`);
              this.uppy.emit("thumbnail:generated", this.uppy.getFile(file.id), preview);
            }).catch((err) => {
              this.uppy.log(`[ThumbnailGenerator] Failed thumbnail for ${file.id}:`, "warning");
              this.uppy.log(err, "warning");
              this.uppy.emit("thumbnail:error", this.uppy.getFile(file.id), err);
            });
          }
          return Promise.resolve();
        }
        install() {
          this.uppy.on("file-removed", this.onFileRemoved);
          this.uppy.on("cancel-all", this.onAllFilesRemoved);
          if (this.opts.lazy) {
            this.uppy.on("thumbnail:request", this.onFileAdded);
            this.uppy.on("thumbnail:cancel", this.onCancelRequest);
          } else {
            this.uppy.on("file-added", this.onFileAdded);
            this.uppy.on("restored", this.onRestored);
          }
          if (this.opts.waitForThumbnailsBeforeUpload) {
            this.uppy.addPreProcessor(this.waitUntilAllProcessed);
          }
        }
        uninstall() {
          this.uppy.off("file-removed", this.onFileRemoved);
          this.uppy.off("cancel-all", this.onAllFilesRemoved);
          if (this.opts.lazy) {
            this.uppy.off("thumbnail:request", this.onFileAdded);
            this.uppy.off("thumbnail:cancel", this.onCancelRequest);
          } else {
            this.uppy.off("file-added", this.onFileAdded);
            this.uppy.off("restored", this.onRestored);
          }
          if (this.opts.waitForThumbnailsBeforeUpload) {
            this.uppy.removePreProcessor(this.waitUntilAllProcessed);
          }
        }
      }, _class.VERSION = "2.1.1", _temp);
    }
  });

  // ../packages/@uppy/utils/lib/findAllDOMElements.js
  var require_findAllDOMElements = __commonJS({
    "../packages/@uppy/utils/lib/findAllDOMElements.js"(exports, module) {
      var isDOMElement = require_isDOMElement();
      module.exports = function findAllDOMElements(element) {
        if (typeof element === "string") {
          const elements = document.querySelectorAll(element);
          return elements.length === 0 ? null : Array.from(elements);
        }
        if (typeof element === "object" && isDOMElement(element)) {
          return [element];
        }
        return null;
      };
    }
  });

  // ../packages/@uppy/utils/lib/toArray.js
  var require_toArray = __commonJS({
    "../packages/@uppy/utils/lib/toArray.js"(exports, module) {
      module.exports = Array.from;
    }
  });

  // ../packages/@uppy/utils/lib/getDroppedFiles/utils/webkitGetAsEntryApi/getRelativePath.js
  var require_getRelativePath = __commonJS({
    "../packages/@uppy/utils/lib/getDroppedFiles/utils/webkitGetAsEntryApi/getRelativePath.js"(exports, module) {
      module.exports = function getRelativePath(fileEntry) {
        if (!fileEntry.fullPath || fileEntry.fullPath === `/${fileEntry.name}`) {
          return null;
        }
        return fileEntry.fullPath;
      };
    }
  });

  // ../packages/@uppy/utils/lib/getDroppedFiles/utils/webkitGetAsEntryApi/getFilesAndDirectoriesFromDirectory.js
  var require_getFilesAndDirectoriesFromDirectory = __commonJS({
    "../packages/@uppy/utils/lib/getDroppedFiles/utils/webkitGetAsEntryApi/getFilesAndDirectoriesFromDirectory.js"(exports, module) {
      module.exports = function getFilesAndDirectoriesFromDirectory(directoryReader, oldEntries, logDropError, _ref) {
        let {
          onSuccess
        } = _ref;
        directoryReader.readEntries((entries) => {
          const newEntries = [...oldEntries, ...entries];
          if (entries.length) {
            setTimeout(() => {
              getFilesAndDirectoriesFromDirectory(directoryReader, newEntries, logDropError, {
                onSuccess
              });
            }, 0);
          } else {
            onSuccess(newEntries);
          }
        }, (error) => {
          logDropError(error);
          onSuccess(oldEntries);
        });
      };
    }
  });

  // ../packages/@uppy/utils/lib/getDroppedFiles/utils/webkitGetAsEntryApi/index.js
  var require_webkitGetAsEntryApi = __commonJS({
    "../packages/@uppy/utils/lib/getDroppedFiles/utils/webkitGetAsEntryApi/index.js"(exports, module) {
      var toArray = require_toArray();
      var getRelativePath = require_getRelativePath();
      var getFilesAndDirectoriesFromDirectory = require_getFilesAndDirectoriesFromDirectory();
      module.exports = function webkitGetAsEntryApi(dataTransfer, logDropError) {
        const files = [];
        const rootPromises = [];
        const createPromiseToAddFileOrParseDirectory = (entry) => new Promise((resolve) => {
          if (entry.isFile) {
            entry.file((file) => {
              file.relativePath = getRelativePath(entry);
              files.push(file);
              resolve();
            }, (error) => {
              logDropError(error);
              resolve();
            });
          } else if (entry.isDirectory) {
            const directoryReader = entry.createReader();
            getFilesAndDirectoriesFromDirectory(directoryReader, [], logDropError, {
              onSuccess: (entries) => resolve(Promise.all(entries.map(createPromiseToAddFileOrParseDirectory)))
            });
          }
        });
        toArray(dataTransfer.items).forEach((item) => {
          const entry = item.webkitGetAsEntry();
          if (entry) {
            rootPromises.push(createPromiseToAddFileOrParseDirectory(entry));
          }
        });
        return Promise.all(rootPromises).then(() => files);
      };
    }
  });

  // ../packages/@uppy/utils/lib/getDroppedFiles/utils/fallbackApi.js
  var require_fallbackApi = __commonJS({
    "../packages/@uppy/utils/lib/getDroppedFiles/utils/fallbackApi.js"(exports, module) {
      var toArray = require_toArray();
      module.exports = function fallbackApi(dataTransfer) {
        const files = toArray(dataTransfer.files);
        return Promise.resolve(files);
      };
    }
  });

  // ../packages/@uppy/utils/lib/getDroppedFiles/index.js
  var require_getDroppedFiles = __commonJS({
    "../packages/@uppy/utils/lib/getDroppedFiles/index.js"(exports, module) {
      var webkitGetAsEntryApi = require_webkitGetAsEntryApi();
      var fallbackApi = require_fallbackApi();
      module.exports = function getDroppedFiles(dataTransfer, _temp) {
        var _dataTransfer$items;
        let {
          logDropError = () => {
          }
        } = _temp === void 0 ? {} : _temp;
        if ((_dataTransfer$items = dataTransfer.items) != null && _dataTransfer$items[0] && "webkitGetAsEntry" in dataTransfer.items[0]) {
          return webkitGetAsEntryApi(dataTransfer, logDropError);
        }
        return fallbackApi(dataTransfer);
      };
    }
  });

  // ../packages/@uppy/utils/lib/FOCUSABLE_ELEMENTS.js
  var require_FOCUSABLE_ELEMENTS = __commonJS({
    "../packages/@uppy/utils/lib/FOCUSABLE_ELEMENTS.js"(exports, module) {
      module.exports = ['a[href]:not([tabindex^="-"]):not([inert]):not([aria-hidden])', 'area[href]:not([tabindex^="-"]):not([inert]):not([aria-hidden])', "input:not([disabled]):not([inert]):not([aria-hidden])", "select:not([disabled]):not([inert]):not([aria-hidden])", "textarea:not([disabled]):not([inert]):not([aria-hidden])", "button:not([disabled]):not([inert]):not([aria-hidden])", 'iframe:not([tabindex^="-"]):not([inert]):not([aria-hidden])', 'object:not([tabindex^="-"]):not([inert]):not([aria-hidden])', 'embed:not([tabindex^="-"]):not([inert]):not([aria-hidden])', '[contenteditable]:not([tabindex^="-"]):not([inert]):not([aria-hidden])', '[tabindex]:not([tabindex^="-"]):not([inert]):not([aria-hidden])'];
    }
  });

  // ../packages/@uppy/dashboard/lib/utils/getActiveOverlayEl.js
  var require_getActiveOverlayEl = __commonJS({
    "../packages/@uppy/dashboard/lib/utils/getActiveOverlayEl.js"(exports, module) {
      module.exports = function getActiveOverlayEl(dashboardEl, activeOverlayType) {
        if (activeOverlayType) {
          const overlayEl = dashboardEl.querySelector(`[data-uppy-paneltype="${activeOverlayType}"]`);
          if (overlayEl)
            return overlayEl;
        }
        return dashboardEl;
      };
    }
  });

  // ../packages/@uppy/dashboard/lib/utils/trapFocus.js
  var require_trapFocus = __commonJS({
    "../packages/@uppy/dashboard/lib/utils/trapFocus.js"(exports, module) {
      var toArray = require_toArray();
      var FOCUSABLE_ELEMENTS = require_FOCUSABLE_ELEMENTS();
      var getActiveOverlayEl = require_getActiveOverlayEl();
      function focusOnFirstNode(event, nodes) {
        const node = nodes[0];
        if (node) {
          node.focus();
          event.preventDefault();
        }
      }
      function focusOnLastNode(event, nodes) {
        const node = nodes[nodes.length - 1];
        if (node) {
          node.focus();
          event.preventDefault();
        }
      }
      function isFocusInOverlay(activeOverlayEl) {
        return activeOverlayEl.contains(document.activeElement);
      }
      function trapFocus(event, activeOverlayType, dashboardEl) {
        const activeOverlayEl = getActiveOverlayEl(dashboardEl, activeOverlayType);
        const focusableNodes = toArray(activeOverlayEl.querySelectorAll(FOCUSABLE_ELEMENTS));
        const focusedItemIndex = focusableNodes.indexOf(document.activeElement);
        if (!isFocusInOverlay(activeOverlayEl)) {
          focusOnFirstNode(event, focusableNodes);
        } else if (event.shiftKey && focusedItemIndex === 0) {
          focusOnLastNode(event, focusableNodes);
        } else if (!event.shiftKey && focusedItemIndex === focusableNodes.length - 1) {
          focusOnFirstNode(event, focusableNodes);
        }
      }
      module.exports = {
        forModal: (event, activeOverlayType, dashboardEl) => {
          trapFocus(event, activeOverlayType, dashboardEl);
        },
        forInline: (event, activeOverlayType, dashboardEl) => {
          if (activeOverlayType === null) {
          } else {
            trapFocus(event, activeOverlayType, dashboardEl);
          }
        }
      };
    }
  });

  // ../node_modules/lodash.debounce/index.js
  var require_lodash2 = __commonJS({
    "../node_modules/lodash.debounce/index.js"(exports, module) {
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
      module.exports = debounce;
    }
  });

  // ../packages/@uppy/dashboard/lib/utils/createSuperFocus.js
  var require_createSuperFocus = __commonJS({
    "../packages/@uppy/dashboard/lib/utils/createSuperFocus.js"(exports, module) {
      var debounce = require_lodash2();
      var FOCUSABLE_ELEMENTS = require_FOCUSABLE_ELEMENTS();
      var getActiveOverlayEl = require_getActiveOverlayEl();
      module.exports = function createSuperFocus() {
        let lastFocusWasOnSuperFocusableEl = false;
        const superFocus = (dashboardEl, activeOverlayType) => {
          const overlayEl = getActiveOverlayEl(dashboardEl, activeOverlayType);
          const isFocusInOverlay = overlayEl.contains(document.activeElement);
          if (isFocusInOverlay && lastFocusWasOnSuperFocusableEl)
            return;
          const superFocusableEl = overlayEl.querySelector("[data-uppy-super-focusable]");
          if (isFocusInOverlay && !superFocusableEl)
            return;
          if (superFocusableEl) {
            superFocusableEl.focus({
              preventScroll: true
            });
            lastFocusWasOnSuperFocusableEl = true;
          } else {
            const firstEl = overlayEl.querySelector(FOCUSABLE_ELEMENTS);
            firstEl == null ? void 0 : firstEl.focus({
              preventScroll: true
            });
            lastFocusWasOnSuperFocusableEl = false;
          }
        };
        return debounce(superFocus, 260);
      };
    }
  });

  // ../node_modules/memoize-one/dist/memoize-one.cjs.js
  var require_memoize_one_cjs = __commonJS({
    "../node_modules/memoize-one/dist/memoize-one.cjs.js"(exports, module) {
      "use strict";
      var safeIsNaN = Number.isNaN || function ponyfill(value) {
        return typeof value === "number" && value !== value;
      };
      function isEqual(first, second) {
        if (first === second) {
          return true;
        }
        if (safeIsNaN(first) && safeIsNaN(second)) {
          return true;
        }
        return false;
      }
      function areInputsEqual(newInputs, lastInputs) {
        if (newInputs.length !== lastInputs.length) {
          return false;
        }
        for (var i3 = 0; i3 < newInputs.length; i3++) {
          if (!isEqual(newInputs[i3], lastInputs[i3])) {
            return false;
          }
        }
        return true;
      }
      function memoizeOne(resultFn, isEqual2) {
        if (isEqual2 === void 0) {
          isEqual2 = areInputsEqual;
        }
        var lastThis;
        var lastArgs = [];
        var lastResult;
        var calledOnce = false;
        function memoized() {
          var newArgs = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            newArgs[_i] = arguments[_i];
          }
          if (calledOnce && lastThis === this && isEqual2(newArgs, lastArgs)) {
            return lastResult;
          }
          lastResult = resultFn.apply(this, newArgs);
          calledOnce = true;
          lastThis = this;
          lastArgs = newArgs;
          return lastResult;
        }
        return memoized;
      }
      module.exports = memoizeOne;
    }
  });

  // ../packages/@uppy/utils/lib/isDragDropSupported.js
  var require_isDragDropSupported = __commonJS({
    "../packages/@uppy/utils/lib/isDragDropSupported.js"(exports, module) {
      module.exports = function isDragDropSupported() {
        const div = document.body;
        if (!("draggable" in div) || !("ondragstart" in div && "ondrop" in div)) {
          return false;
        }
        if (!("FormData" in window)) {
          return false;
        }
        if (!("FileReader" in window)) {
          return false;
        }
        return true;
      };
    }
  });

  // ../node_modules/is-shallow-equal/index.js
  var require_is_shallow_equal = __commonJS({
    "../node_modules/is-shallow-equal/index.js"(exports, module) {
      module.exports = function isShallowEqual(a3, b3) {
        if (a3 === b3)
          return true;
        for (var i3 in a3)
          if (!(i3 in b3))
            return false;
        for (var i3 in b3)
          if (a3[i3] !== b3[i3])
            return false;
        return true;
      };
    }
  });

  // ../packages/@uppy/dashboard/lib/utils/getFileTypeIcon.js
  var require_getFileTypeIcon = __commonJS({
    "../packages/@uppy/dashboard/lib/utils/getFileTypeIcon.js"(exports, module) {
      var {
        h: h3
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      function iconImage() {
        return h3("svg", {
          "aria-hidden": "true",
          focusable: "false",
          width: "25",
          height: "25",
          viewBox: "0 0 25 25"
        }, h3("g", {
          fill: "#686DE0",
          fillRule: "evenodd"
        }, h3("path", {
          d: "M5 7v10h15V7H5zm0-1h15a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z",
          fillRule: "nonzero"
        }), h3("path", {
          d: "M6.35 17.172l4.994-5.026a.5.5 0 0 1 .707 0l2.16 2.16 3.505-3.505a.5.5 0 0 1 .707 0l2.336 2.31-.707.72-1.983-1.97-3.505 3.505a.5.5 0 0 1-.707 0l-2.16-2.159-3.938 3.939-1.409.026z",
          fillRule: "nonzero"
        }), h3("circle", {
          cx: "7.5",
          cy: "9.5",
          r: "1.5"
        })));
      }
      function iconAudio() {
        return h3("svg", {
          "aria-hidden": "true",
          focusable: "false",
          className: "uppy-c-icon",
          width: "25",
          height: "25",
          viewBox: "0 0 25 25"
        }, h3("path", {
          d: "M9.5 18.64c0 1.14-1.145 2-2.5 2s-2.5-.86-2.5-2c0-1.14 1.145-2 2.5-2 .557 0 1.079.145 1.5.396V7.25a.5.5 0 0 1 .379-.485l9-2.25A.5.5 0 0 1 18.5 5v11.64c0 1.14-1.145 2-2.5 2s-2.5-.86-2.5-2c0-1.14 1.145-2 2.5-2 .557 0 1.079.145 1.5.396V8.67l-8 2v7.97zm8-11v-2l-8 2v2l8-2zM7 19.64c.855 0 1.5-.484 1.5-1s-.645-1-1.5-1-1.5.484-1.5 1 .645 1 1.5 1zm9-2c.855 0 1.5-.484 1.5-1s-.645-1-1.5-1-1.5.484-1.5 1 .645 1 1.5 1z",
          fill: "#049BCF",
          fillRule: "nonzero"
        }));
      }
      function iconVideo() {
        return h3("svg", {
          "aria-hidden": "true",
          focusable: "false",
          className: "uppy-c-icon",
          width: "25",
          height: "25",
          viewBox: "0 0 25 25"
        }, h3("path", {
          d: "M16 11.834l4.486-2.691A1 1 0 0 1 22 10v6a1 1 0 0 1-1.514.857L16 14.167V17a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2.834zM15 9H5v8h10V9zm1 4l5 3v-6l-5 3z",
          fill: "#19AF67",
          fillRule: "nonzero"
        }));
      }
      function iconPDF() {
        return h3("svg", {
          "aria-hidden": "true",
          focusable: "false",
          className: "uppy-c-icon",
          width: "25",
          height: "25",
          viewBox: "0 0 25 25"
        }, h3("path", {
          d: "M9.766 8.295c-.691-1.843-.539-3.401.747-3.726 1.643-.414 2.505.938 2.39 3.299-.039.79-.194 1.662-.537 3.148.324.49.66.967 1.055 1.51.17.231.382.488.629.757 1.866-.128 3.653.114 4.918.655 1.487.635 2.192 1.685 1.614 2.84-.566 1.133-1.839 1.084-3.416.249-1.141-.604-2.457-1.634-3.51-2.707a13.467 13.467 0 0 0-2.238.426c-1.392 4.051-4.534 6.453-5.707 4.572-.986-1.58 1.38-4.206 4.914-5.375.097-.322.185-.656.264-1.001.08-.353.306-1.31.407-1.737-.678-1.059-1.2-2.031-1.53-2.91zm2.098 4.87c-.033.144-.068.287-.104.427l.033-.01-.012.038a14.065 14.065 0 0 1 1.02-.197l-.032-.033.052-.004a7.902 7.902 0 0 1-.208-.271c-.197-.27-.38-.526-.555-.775l-.006.028-.002-.003c-.076.323-.148.632-.186.8zm5.77 2.978c1.143.605 1.832.632 2.054.187.26-.519-.087-1.034-1.113-1.473-.911-.39-2.175-.608-3.55-.608.845.766 1.787 1.459 2.609 1.894zM6.559 18.789c.14.223.693.16 1.425-.413.827-.648 1.61-1.747 2.208-3.206-2.563 1.064-4.102 2.867-3.633 3.62zm5.345-10.97c.088-1.793-.351-2.48-1.146-2.28-.473.119-.564 1.05-.056 2.405.213.566.52 1.188.908 1.859.18-.858.268-1.453.294-1.984z",
          fill: "#E2514A",
          fillRule: "nonzero"
        }));
      }
      function iconArchive() {
        return h3("svg", {
          "aria-hidden": "true",
          focusable: "false",
          width: "25",
          height: "25",
          viewBox: "0 0 25 25"
        }, h3("path", {
          d: "M10.45 2.05h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5V2.55a.5.5 0 0 1 .5-.5zm2.05 1.024h1.05a.5.5 0 0 1 .5.5V3.6a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5v-.001zM10.45 0h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5V.5a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-2.05 3.074h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-2.05 1.024h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm-2.05 1.025h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-1.656 3.074l-.82 5.946c.52.302 1.174.458 1.976.458.803 0 1.455-.156 1.975-.458l-.82-5.946h-2.311zm0-1.025h2.312c.512 0 .946.378 1.015.885l.82 5.946c.056.412-.142.817-.501 1.026-.686.398-1.515.597-2.49.597-.974 0-1.804-.199-2.49-.597a1.025 1.025 0 0 1-.5-1.026l.819-5.946c.07-.507.503-.885 1.015-.885zm.545 6.6a.5.5 0 0 1-.397-.561l.143-.999a.5.5 0 0 1 .495-.429h.74a.5.5 0 0 1 .495.43l.143.998a.5.5 0 0 1-.397.561c-.404.08-.819.08-1.222 0z",
          fill: "#00C469",
          fillRule: "nonzero"
        }));
      }
      function iconFile() {
        return h3("svg", {
          "aria-hidden": "true",
          focusable: "false",
          className: "uppy-c-icon",
          width: "25",
          height: "25",
          viewBox: "0 0 25 25"
        }, h3("g", {
          fill: "#A7AFB7",
          fillRule: "nonzero"
        }, h3("path", {
          d: "M5.5 22a.5.5 0 0 1-.5-.5v-18a.5.5 0 0 1 .5-.5h10.719a.5.5 0 0 1 .367.16l3.281 3.556a.5.5 0 0 1 .133.339V21.5a.5.5 0 0 1-.5.5h-14zm.5-1h13V7.25L16 4H6v17z"
        }), h3("path", {
          d: "M15 4v3a1 1 0 0 0 1 1h3V7h-3V4h-1z"
        })));
      }
      function iconText() {
        return h3("svg", {
          "aria-hidden": "true",
          focusable: "false",
          className: "uppy-c-icon",
          width: "25",
          height: "25",
          viewBox: "0 0 25 25"
        }, h3("path", {
          d: "M4.5 7h13a.5.5 0 1 1 0 1h-13a.5.5 0 0 1 0-1zm0 3h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1zm0 3h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1zm0 3h10a.5.5 0 1 1 0 1h-10a.5.5 0 1 1 0-1z",
          fill: "#5A5E69",
          fillRule: "nonzero"
        }));
      }
      module.exports = function getIconByMime(fileType) {
        const defaultChoice = {
          color: "#838999",
          icon: iconFile()
        };
        if (!fileType)
          return defaultChoice;
        const fileTypeGeneral = fileType.split("/")[0];
        const fileTypeSpecific = fileType.split("/")[1];
        if (fileTypeGeneral === "text") {
          return {
            color: "#5a5e69",
            icon: iconText()
          };
        }
        if (fileTypeGeneral === "image") {
          return {
            color: "#686de0",
            icon: iconImage()
          };
        }
        if (fileTypeGeneral === "audio") {
          return {
            color: "#068dbb",
            icon: iconAudio()
          };
        }
        if (fileTypeGeneral === "video") {
          return {
            color: "#19af67",
            icon: iconVideo()
          };
        }
        if (fileTypeGeneral === "application" && fileTypeSpecific === "pdf") {
          return {
            color: "#e25149",
            icon: iconPDF()
          };
        }
        const archiveTypes = ["zip", "x-7z-compressed", "x-rar-compressed", "x-tar", "x-gzip", "x-apple-diskimage"];
        if (fileTypeGeneral === "application" && archiveTypes.indexOf(fileTypeSpecific) !== -1) {
          return {
            color: "#00C469",
            icon: iconArchive()
          };
        }
        return defaultChoice;
      };
    }
  });

  // ../packages/@uppy/dashboard/lib/components/FilePreview.js
  var require_FilePreview = __commonJS({
    "../packages/@uppy/dashboard/lib/components/FilePreview.js"(exports, module) {
      var {
        h: h3
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      var getFileTypeIcon = require_getFileTypeIcon();
      module.exports = function FilePreview(props) {
        const {
          file
        } = props;
        if (file.preview) {
          return h3("img", {
            className: "uppy-Dashboard-Item-previewImg",
            alt: file.name,
            src: file.preview
          });
        }
        const {
          color,
          icon
        } = getFileTypeIcon(file.type);
        return h3("div", {
          className: "uppy-Dashboard-Item-previewIconWrap"
        }, h3("span", {
          className: "uppy-Dashboard-Item-previewIcon",
          style: {
            color
          }
        }, icon), h3("svg", {
          "aria-hidden": "true",
          focusable: "false",
          className: "uppy-Dashboard-Item-previewIconBg",
          width: "58",
          height: "76",
          viewBox: "0 0 58 76"
        }, h3("rect", {
          fill: "#FFF",
          width: "58",
          height: "76",
          rx: "3",
          fillRule: "evenodd"
        })));
      };
    }
  });

  // ../packages/@uppy/dashboard/lib/components/FileItem/MetaErrorMessage.js
  var require_MetaErrorMessage = __commonJS({
    "../packages/@uppy/dashboard/lib/components/FileItem/MetaErrorMessage.js"(exports, module) {
      var {
        h: h3
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      var metaFieldIdToName = (metaFieldId, metaFields) => {
        const field = metaFields.filter((f3) => f3.id === metaFieldId);
        return field[0].name;
      };
      module.exports = function renderMissingMetaFieldsError(props) {
        const {
          file,
          toggleFileCard,
          i18n,
          metaFields
        } = props;
        const {
          missingRequiredMetaFields
        } = file;
        if (!(missingRequiredMetaFields != null && missingRequiredMetaFields.length)) {
          return null;
        }
        const metaFieldsString = missingRequiredMetaFields.map((missingMetaField) => metaFieldIdToName(missingMetaField, metaFields)).join(", ");
        return h3("div", {
          className: "uppy-Dashboard-Item-errorMessage"
        }, i18n("missingRequiredMetaFields", {
          smart_count: missingRequiredMetaFields.length,
          fields: metaFieldsString
        }), " ", h3("button", {
          type: "button",
          class: "uppy-u-reset uppy-Dashboard-Item-errorMessageBtn",
          onClick: () => toggleFileCard(true, file.id)
        }, i18n("editFile")));
      };
    }
  });

  // ../packages/@uppy/dashboard/lib/components/FileItem/FilePreviewAndLink/index.js
  var require_FilePreviewAndLink = __commonJS({
    "../packages/@uppy/dashboard/lib/components/FileItem/FilePreviewAndLink/index.js"(exports, module) {
      var {
        h: h3
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      var FilePreview = require_FilePreview();
      var MetaErrorMessage = require_MetaErrorMessage();
      var getFileTypeIcon = require_getFileTypeIcon();
      module.exports = function FilePreviewAndLink(props) {
        return h3("div", {
          className: "uppy-Dashboard-Item-previewInnerWrap",
          style: {
            backgroundColor: getFileTypeIcon(props.file.type).color
          }
        }, props.showLinkToFileUploadResult && props.file.uploadURL && h3("a", {
          className: "uppy-Dashboard-Item-previewLink",
          href: props.file.uploadURL,
          rel: "noreferrer noopener",
          target: "_blank",
          "aria-label": props.file.meta.name
        }, h3("span", {
          hidden: true
        }, props.file.meta.name)), h3(FilePreview, {
          file: props.file
        }), h3(MetaErrorMessage, {
          file: props.file,
          i18n: props.i18n,
          toggleFileCard: props.toggleFileCard,
          metaFields: props.metaFields
        }));
      };
    }
  });

  // ../packages/@uppy/dashboard/lib/components/FileItem/FileProgress/index.js
  var require_FileProgress = __commonJS({
    "../packages/@uppy/dashboard/lib/components/FileItem/FileProgress/index.js"(exports, module) {
      var {
        h: h3
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      function onPauseResumeCancelRetry(props) {
        if (props.isUploaded)
          return;
        if (props.error && !props.hideRetryButton) {
          props.uppy.retryUpload(props.file.id);
          return;
        }
        if (props.resumableUploads && !props.hidePauseResumeButton) {
          props.uppy.pauseResume(props.file.id);
        } else if (props.individualCancellation && !props.hideCancelButton) {
          props.uppy.removeFile(props.file.id);
        }
      }
      function progressIndicatorTitle(props) {
        if (props.isUploaded) {
          return props.i18n("uploadComplete");
        }
        if (props.error) {
          return props.i18n("retryUpload");
        }
        if (props.resumableUploads) {
          if (props.file.isPaused) {
            return props.i18n("resumeUpload");
          }
          return props.i18n("pauseUpload");
        }
        if (props.individualCancellation) {
          return props.i18n("cancelUpload");
        }
        return "";
      }
      function ProgressIndicatorButton(props) {
        return h3("div", {
          className: "uppy-Dashboard-Item-progress"
        }, h3("button", {
          className: "uppy-u-reset uppy-Dashboard-Item-progressIndicator",
          type: "button",
          "aria-label": progressIndicatorTitle(props),
          title: progressIndicatorTitle(props),
          onClick: () => onPauseResumeCancelRetry(props)
        }, props.children));
      }
      function ProgressCircleContainer(_ref) {
        let {
          children
        } = _ref;
        return h3("svg", {
          "aria-hidden": "true",
          focusable: "false",
          width: "70",
          height: "70",
          viewBox: "0 0 36 36",
          className: "uppy-c-icon uppy-Dashboard-Item-progressIcon--circle"
        }, children);
      }
      function ProgressCircle(_ref2) {
        let {
          progress
        } = _ref2;
        const circleLength = 2 * Math.PI * 15;
        return h3("g", null, h3("circle", {
          className: "uppy-Dashboard-Item-progressIcon--bg",
          r: "15",
          cx: "18",
          cy: "18",
          "stroke-width": "2",
          fill: "none"
        }), h3("circle", {
          className: "uppy-Dashboard-Item-progressIcon--progress",
          r: "15",
          cx: "18",
          cy: "18",
          transform: "rotate(-90, 18, 18)",
          fill: "none",
          "stroke-width": "2",
          "stroke-dasharray": circleLength,
          "stroke-dashoffset": circleLength - circleLength / 100 * progress
        }));
      }
      module.exports = function FileProgress(props) {
        if (!props.file.progress.uploadStarted) {
          return null;
        }
        if (props.isUploaded) {
          return h3("div", {
            className: "uppy-Dashboard-Item-progress"
          }, h3("div", {
            className: "uppy-Dashboard-Item-progressIndicator"
          }, h3(ProgressCircleContainer, null, h3("circle", {
            r: "15",
            cx: "18",
            cy: "18",
            fill: "#1bb240"
          }), h3("polygon", {
            className: "uppy-Dashboard-Item-progressIcon--check",
            transform: "translate(2, 3)",
            points: "14 22.5 7 15.2457065 8.99985857 13.1732815 14 18.3547104 22.9729883 9 25 11.1005634"
          }))));
        }
        if (props.recoveredState) {
          return;
        }
        if (props.error && !props.hideRetryButton) {
          return h3(ProgressIndicatorButton, props, h3("svg", {
            "aria-hidden": "true",
            focusable: "false",
            className: "uppy-c-icon uppy-Dashboard-Item-progressIcon--retry",
            width: "28",
            height: "31",
            viewBox: "0 0 16 19"
          }, h3("path", {
            d: "M16 11a8 8 0 1 1-8-8v2a6 6 0 1 0 6 6h2z"
          }), h3("path", {
            d: "M7.9 3H10v2H7.9z"
          }), h3("path", {
            d: "M8.536.5l3.535 3.536-1.414 1.414L7.12 1.914z"
          }), h3("path", {
            d: "M10.657 2.621l1.414 1.415L8.536 7.57 7.12 6.157z"
          })));
        }
        if (props.resumableUploads && !props.hidePauseResumeButton) {
          return h3(ProgressIndicatorButton, props, h3(ProgressCircleContainer, null, h3(ProgressCircle, {
            progress: props.file.progress.percentage
          }), props.file.isPaused ? h3("polygon", {
            className: "uppy-Dashboard-Item-progressIcon--play",
            transform: "translate(3, 3)",
            points: "12 20 12 10 20 15"
          }) : h3("g", {
            className: "uppy-Dashboard-Item-progressIcon--pause",
            transform: "translate(14.5, 13)"
          }, h3("rect", {
            x: "0",
            y: "0",
            width: "2",
            height: "10",
            rx: "0"
          }), h3("rect", {
            x: "5",
            y: "0",
            width: "2",
            height: "10",
            rx: "0"
          }))));
        }
        if (!props.resumableUploads && props.individualCancellation && !props.hideCancelButton) {
          return h3(ProgressIndicatorButton, props, h3(ProgressCircleContainer, null, h3(ProgressCircle, {
            progress: props.file.progress.percentage
          }), h3("polygon", {
            className: "cancel",
            transform: "translate(2, 2)",
            points: "19.8856516 11.0625 16 14.9481516 12.1019737 11.0625 11.0625 12.1143484 14.9481516 16 11.0625 19.8980263 12.1019737 20.9375 16 17.0518484 19.8856516 20.9375 20.9375 19.8980263 17.0518484 16 20.9375 12"
          })));
        }
        return h3("div", {
          className: "uppy-Dashboard-Item-progress"
        }, h3("div", {
          className: "uppy-Dashboard-Item-progressIndicator"
        }, h3(ProgressCircleContainer, null, h3(ProgressCircle, {
          progress: props.file.progress.percentage
        }))));
      };
    }
  });

  // ../packages/@uppy/utils/lib/truncateString.js
  var require_truncateString = __commonJS({
    "../packages/@uppy/utils/lib/truncateString.js"(exports, module) {
      var separator = "...";
      module.exports = function truncateString(string, maxLength) {
        if (maxLength === 0)
          return "";
        if (string.length <= maxLength)
          return string;
        if (maxLength <= separator.length + 1)
          return `${string.slice(0, maxLength - 1)}\u2026`;
        const charsToShow = maxLength - separator.length;
        const frontChars = Math.ceil(charsToShow / 2);
        const backChars = Math.floor(charsToShow / 2);
        return string.slice(0, frontChars) + separator + string.slice(-backChars);
      };
    }
  });

  // ../packages/@uppy/dashboard/lib/components/FileItem/FileInfo/index.js
  var require_FileInfo = __commonJS({
    "../packages/@uppy/dashboard/lib/components/FileItem/FileInfo/index.js"(exports, module) {
      var {
        h: h3,
        Fragment
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      var prettierBytes = require_prettierBytes();
      var truncateString = require_truncateString();
      var MetaErrorMessage = require_MetaErrorMessage();
      var renderFileName = (props) => {
        const {
          author,
          name
        } = props.file.meta;
        function getMaxNameLength() {
          if (props.containerWidth <= 352) {
            return 35;
          }
          if (props.containerWidth <= 576) {
            return 60;
          }
          return author ? 20 : 30;
        }
        return h3("div", {
          className: "uppy-Dashboard-Item-name",
          title: name
        }, truncateString(name, getMaxNameLength()));
      };
      var renderAuthor = (props) => {
        const {
          author
        } = props.file.meta;
        const {
          providerName
        } = props.file.remote;
        const dot = `\xB7`;
        if (!author) {
          return null;
        }
        return h3("div", {
          className: "uppy-Dashboard-Item-author"
        }, h3("a", {
          href: `${author.url}?utm_source=Companion&utm_medium=referral`,
          target: "_blank",
          rel: "noopener noreferrer"
        }, truncateString(author.name, 13)), providerName ? h3(Fragment, null, ` ${dot} `, providerName, ` ${dot} `) : null);
      };
      var renderFileSize = (props) => props.file.size && h3("div", {
        className: "uppy-Dashboard-Item-statusSize"
      }, prettierBytes(props.file.size));
      var ReSelectButton = (props) => props.file.isGhost && h3("span", null, " \u2022 ", h3("button", {
        className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-reSelect",
        type: "button",
        onClick: props.toggleAddFilesPanel
      }, props.i18n("reSelect")));
      var ErrorButton = (_ref) => {
        let {
          file,
          onClick
        } = _ref;
        if (file.error) {
          return h3("button", {
            className: "uppy-u-reset uppy-Dashboard-Item-errorDetails",
            "aria-label": file.error,
            "data-microtip-position": "bottom",
            "data-microtip-size": "medium",
            onClick,
            type: "button"
          }, "?");
        }
        return null;
      };
      module.exports = function FileInfo(props) {
        const {
          file
        } = props;
        return h3("div", {
          className: "uppy-Dashboard-Item-fileInfo",
          "data-uppy-file-source": file.source
        }, h3("div", {
          className: "uppy-Dashboard-Item-fileName"
        }, renderFileName(props), h3(ErrorButton, {
          file: props.file,
          onClick: () => alert(props.file.error)
        })), h3("div", {
          className: "uppy-Dashboard-Item-status"
        }, renderAuthor(props), renderFileSize(props), ReSelectButton(props)), h3(MetaErrorMessage, {
          file: props.file,
          i18n: props.i18n,
          toggleFileCard: props.toggleFileCard,
          metaFields: props.metaFields
        }));
      };
    }
  });

  // ../packages/@uppy/dashboard/lib/utils/copyToClipboard.js
  var require_copyToClipboard = __commonJS({
    "../packages/@uppy/dashboard/lib/utils/copyToClipboard.js"(exports, module) {
      module.exports = function copyToClipboard(textToCopy, fallbackString) {
        fallbackString = fallbackString || "Copy the URL below";
        return new Promise((resolve) => {
          const textArea = document.createElement("textarea");
          textArea.setAttribute("style", {
            position: "fixed",
            top: 0,
            left: 0,
            width: "2em",
            height: "2em",
            padding: 0,
            border: "none",
            outline: "none",
            boxShadow: "none",
            background: "transparent"
          });
          textArea.value = textToCopy;
          document.body.appendChild(textArea);
          textArea.select();
          const magicCopyFailed = () => {
            document.body.removeChild(textArea);
            window.prompt(fallbackString, textToCopy);
            resolve();
          };
          try {
            const successful = document.execCommand("copy");
            if (!successful) {
              return magicCopyFailed("copy command unavailable");
            }
            document.body.removeChild(textArea);
            return resolve();
          } catch (err) {
            document.body.removeChild(textArea);
            return magicCopyFailed(err);
          }
        });
      };
    }
  });

  // ../packages/@uppy/dashboard/lib/components/FileItem/Buttons/index.js
  var require_Buttons = __commonJS({
    "../packages/@uppy/dashboard/lib/components/FileItem/Buttons/index.js"(exports, module) {
      var {
        h: h3
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      var copyToClipboard = require_copyToClipboard();
      function EditButton(_ref) {
        let {
          file,
          uploadInProgressOrComplete,
          metaFields,
          canEditFile,
          i18n,
          onClick
        } = _ref;
        if (!uploadInProgressOrComplete && metaFields && metaFields.length > 0 || !uploadInProgressOrComplete && canEditFile(file)) {
          return h3("button", {
            className: "uppy-u-reset uppy-Dashboard-Item-action uppy-Dashboard-Item-action--edit",
            type: "button",
            "aria-label": i18n("editFileWithFilename", {
              file: file.meta.name
            }),
            title: i18n("editFileWithFilename", {
              file: file.meta.name
            }),
            onClick: () => onClick()
          }, h3("svg", {
            "aria-hidden": "true",
            focusable: "false",
            className: "uppy-c-icon",
            width: "14",
            height: "14",
            viewBox: "0 0 14 14"
          }, h3("g", {
            fillRule: "evenodd"
          }, h3("path", {
            d: "M1.5 10.793h2.793A1 1 0 0 0 5 10.5L11.5 4a1 1 0 0 0 0-1.414L9.707.793a1 1 0 0 0-1.414 0l-6.5 6.5A1 1 0 0 0 1.5 8v2.793zm1-1V8L9 1.5l1.793 1.793-6.5 6.5H2.5z",
            fillRule: "nonzero"
          }), h3("rect", {
            x: "1",
            y: "12.293",
            width: "11",
            height: "1",
            rx: ".5"
          }), h3("path", {
            fillRule: "nonzero",
            d: "M6.793 2.5L9.5 5.207l.707-.707L7.5 1.793z"
          }))));
        }
        return null;
      }
      function RemoveButton(_ref2) {
        let {
          i18n,
          onClick,
          file
        } = _ref2;
        return h3("button", {
          className: "uppy-u-reset uppy-Dashboard-Item-action uppy-Dashboard-Item-action--remove",
          type: "button",
          "aria-label": i18n("removeFile", {
            file: file.meta.name
          }),
          title: i18n("removeFile", {
            file: file.meta.name
          }),
          onClick: () => onClick()
        }, h3("svg", {
          "aria-hidden": "true",
          focusable: "false",
          className: "uppy-c-icon",
          width: "18",
          height: "18",
          viewBox: "0 0 18 18"
        }, h3("path", {
          d: "M9 0C4.034 0 0 4.034 0 9s4.034 9 9 9 9-4.034 9-9-4.034-9-9-9z"
        }), h3("path", {
          fill: "#FFF",
          d: "M13 12.222l-.778.778L9 9.778 5.778 13 5 12.222 8.222 9 5 5.778 5.778 5 9 8.222 12.222 5l.778.778L9.778 9z"
        })));
      }
      var copyLinkToClipboard = (event, props) => {
        copyToClipboard(props.file.uploadURL, props.i18n("copyLinkToClipboardFallback")).then(() => {
          props.uppy.log("Link copied to clipboard.");
          props.uppy.info(props.i18n("copyLinkToClipboardSuccess"), "info", 3e3);
        }).catch(props.uppy.log).then(() => event.target.focus({
          preventScroll: true
        }));
      };
      function CopyLinkButton(props) {
        const {
          i18n
        } = props;
        return h3("button", {
          className: "uppy-u-reset uppy-Dashboard-Item-action uppy-Dashboard-Item-action--copyLink",
          type: "button",
          "aria-label": i18n("copyLink"),
          title: i18n("copyLink"),
          onClick: (event) => copyLinkToClipboard(event, props)
        }, h3("svg", {
          "aria-hidden": "true",
          focusable: "false",
          className: "uppy-c-icon",
          width: "14",
          height: "14",
          viewBox: "0 0 14 12"
        }, h3("path", {
          d: "M7.94 7.703a2.613 2.613 0 0 1-.626 2.681l-.852.851a2.597 2.597 0 0 1-1.849.766A2.616 2.616 0 0 1 2.764 7.54l.852-.852a2.596 2.596 0 0 1 2.69-.625L5.267 7.099a1.44 1.44 0 0 0-.833.407l-.852.851a1.458 1.458 0 0 0 1.03 2.486c.39 0 .755-.152 1.03-.426l.852-.852c.231-.231.363-.522.406-.824l1.04-1.038zm4.295-5.937A2.596 2.596 0 0 0 10.387 1c-.698 0-1.355.272-1.849.766l-.852.851a2.614 2.614 0 0 0-.624 2.688l1.036-1.036c.041-.304.173-.6.407-.833l.852-.852c.275-.275.64-.426 1.03-.426a1.458 1.458 0 0 1 1.03 2.486l-.852.851a1.442 1.442 0 0 1-.824.406l-1.04 1.04a2.596 2.596 0 0 0 2.683-.628l.851-.85a2.616 2.616 0 0 0 0-3.697zm-6.88 6.883a.577.577 0 0 0 .82 0l3.474-3.474a.579.579 0 1 0-.819-.82L5.355 7.83a.579.579 0 0 0 0 .819z"
        })));
      }
      module.exports = function Buttons(props) {
        const {
          uppy,
          file,
          uploadInProgressOrComplete,
          canEditFile,
          metaFields,
          showLinkToFileUploadResult,
          showRemoveButton,
          i18n,
          toggleFileCard,
          openFileEditor
        } = props;
        const editAction = () => {
          if (metaFields && metaFields.length > 0) {
            toggleFileCard(true, file.id);
          } else {
            openFileEditor(file);
          }
        };
        return h3("div", {
          className: "uppy-Dashboard-Item-actionWrapper"
        }, h3(EditButton, {
          i18n,
          file,
          uploadInProgressOrComplete,
          canEditFile,
          metaFields,
          onClick: editAction
        }), showLinkToFileUploadResult && file.uploadURL ? h3(CopyLinkButton, {
          file,
          uppy,
          i18n
        }) : null, showRemoveButton ? h3(RemoveButton, {
          i18n,
          file,
          uppy,
          onClick: () => props.uppy.removeFile(file.id, "removed-by-user")
        }) : null);
      };
    }
  });

  // ../packages/@uppy/dashboard/lib/components/FileItem/index.js
  var require_FileItem = __commonJS({
    "../packages/@uppy/dashboard/lib/components/FileItem/index.js"(exports, module) {
      var {
        h: h3,
        Component
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      var classNames = require_classnames();
      var shallowEqual = require_is_shallow_equal();
      var FilePreviewAndLink = require_FilePreviewAndLink();
      var FileProgress = require_FileProgress();
      var FileInfo = require_FileInfo();
      var Buttons = require_Buttons();
      module.exports = class FileItem extends Component {
        componentDidMount() {
          const {
            file
          } = this.props;
          if (!file.preview) {
            this.props.handleRequestThumbnail(file);
          }
        }
        shouldComponentUpdate(nextProps) {
          return !shallowEqual(this.props, nextProps);
        }
        componentDidUpdate() {
          const {
            file
          } = this.props;
          if (!file.preview) {
            this.props.handleRequestThumbnail(file);
          }
        }
        componentWillUnmount() {
          const {
            file
          } = this.props;
          if (!file.preview) {
            this.props.handleCancelThumbnail(file);
          }
        }
        render() {
          const {
            file
          } = this.props;
          const isProcessing = file.progress.preprocess || file.progress.postprocess;
          const isUploaded = file.progress.uploadComplete && !isProcessing && !file.error;
          const uploadInProgressOrComplete = file.progress.uploadStarted || isProcessing;
          const uploadInProgress = file.progress.uploadStarted && !file.progress.uploadComplete || isProcessing;
          const error = file.error || false;
          const {
            isGhost
          } = file;
          let showRemoveButton = this.props.individualCancellation ? !isUploaded : !uploadInProgress && !isUploaded;
          if (isUploaded && this.props.showRemoveButtonAfterComplete) {
            showRemoveButton = true;
          }
          const dashboardItemClass = classNames({
            "uppy-Dashboard-Item": true,
            "is-inprogress": uploadInProgress && !this.props.recoveredState,
            "is-processing": isProcessing,
            "is-complete": isUploaded,
            "is-error": !!error,
            "is-resumable": this.props.resumableUploads,
            "is-noIndividualCancellation": !this.props.individualCancellation,
            "is-ghost": isGhost
          });
          return h3("div", {
            className: dashboardItemClass,
            id: `uppy_${file.id}`,
            role: this.props.role
          }, h3("div", {
            className: "uppy-Dashboard-Item-preview"
          }, h3(FilePreviewAndLink, {
            file,
            showLinkToFileUploadResult: this.props.showLinkToFileUploadResult,
            i18n: this.props.i18n,
            toggleFileCard: this.props.toggleFileCard,
            metaFields: this.props.metaFields
          }), h3(FileProgress, {
            uppy: this.props.uppy,
            file,
            error,
            isUploaded,
            hideRetryButton: this.props.hideRetryButton,
            hideCancelButton: this.props.hideCancelButton,
            hidePauseResumeButton: this.props.hidePauseResumeButton,
            recoveredState: this.props.recoveredState,
            showRemoveButtonAfterComplete: this.props.showRemoveButtonAfterComplete,
            resumableUploads: this.props.resumableUploads,
            individualCancellation: this.props.individualCancellation,
            i18n: this.props.i18n
          })), h3("div", {
            className: "uppy-Dashboard-Item-fileInfoAndButtons"
          }, h3(FileInfo, {
            file,
            id: this.props.id,
            acquirers: this.props.acquirers,
            containerWidth: this.props.containerWidth,
            i18n: this.props.i18n,
            toggleAddFilesPanel: this.props.toggleAddFilesPanel,
            toggleFileCard: this.props.toggleFileCard,
            metaFields: this.props.metaFields
          }), h3(Buttons, {
            file,
            metaFields: this.props.metaFields,
            showLinkToFileUploadResult: this.props.showLinkToFileUploadResult,
            showRemoveButton,
            canEditFile: this.props.canEditFile,
            uploadInProgressOrComplete,
            toggleFileCard: this.props.toggleFileCard,
            openFileEditor: this.props.openFileEditor,
            uppy: this.props.uppy,
            i18n: this.props.i18n
          })));
        }
      };
    }
  });

  // ../packages/@uppy/dashboard/lib/components/VirtualList.js
  var require_VirtualList = __commonJS({
    "../packages/@uppy/dashboard/lib/components/VirtualList.js"(exports, module) {
      function _extends() {
        _extends = Object.assign || function(target) {
          for (var i3 = 1; i3 < arguments.length; i3++) {
            var source = arguments[i3];
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
      var {
        h: h3,
        Component
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      var STYLE_INNER = {
        position: "relative",
        width: "100%",
        minHeight: "100%"
      };
      var STYLE_CONTENT = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        overflow: "visible"
      };
      var VirtualList = class extends Component {
        constructor(props) {
          super(props);
          this.handleScroll = () => {
            this.setState({
              offset: this.base.scrollTop
            });
          };
          this.handleResize = () => {
            this.resize();
          };
          this.focusElement = null;
          this.state = {
            offset: 0,
            height: 0
          };
        }
        componentDidMount() {
          this.resize();
          window.addEventListener("resize", this.handleResize);
        }
        componentWillUpdate() {
          if (this.base.contains(document.activeElement)) {
            this.focusElement = document.activeElement;
          }
        }
        componentDidUpdate() {
          if (this.focusElement && this.focusElement.parentNode && document.activeElement !== this.focusElement) {
            this.focusElement.focus();
          }
          this.focusElement = null;
          this.resize();
        }
        componentWillUnmount() {
          window.removeEventListener("resize", this.handleResize);
        }
        resize() {
          const {
            height
          } = this.state;
          if (height !== this.base.offsetHeight) {
            this.setState({
              height: this.base.offsetHeight
            });
          }
        }
        render(_ref) {
          let {
            data,
            rowHeight,
            renderRow,
            overscanCount = 10,
            ...props
          } = _ref;
          const {
            offset,
            height
          } = this.state;
          let start = Math.floor(offset / rowHeight);
          let visibleRowCount = Math.floor(height / rowHeight);
          if (overscanCount) {
            start = Math.max(0, start - start % overscanCount);
            visibleRowCount += overscanCount;
          }
          const end = start + visibleRowCount + 4;
          const selection = data.slice(start, end);
          const styleInner = {
            ...STYLE_INNER,
            height: data.length * rowHeight
          };
          const styleContent = {
            ...STYLE_CONTENT,
            top: start * rowHeight
          };
          return h3("div", _extends({
            onScroll: this.handleScroll
          }, props), h3("div", {
            role: "presentation",
            style: styleInner
          }, h3("div", {
            role: "presentation",
            style: styleContent
          }, selection.map(renderRow))));
        }
      };
      module.exports = VirtualList;
    }
  });

  // ../packages/@uppy/dashboard/lib/components/FileList.js
  var require_FileList = __commonJS({
    "../packages/@uppy/dashboard/lib/components/FileList.js"(exports, module) {
      function _extends() {
        _extends = Object.assign || function(target) {
          for (var i3 = 1; i3 < arguments.length; i3++) {
            var source = arguments[i3];
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
      var classNames = require_classnames();
      var {
        h: h3
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      var FileItem = require_FileItem();
      var VirtualList = require_VirtualList();
      function chunks(list, size) {
        const chunked = [];
        let currentChunk = [];
        list.forEach((item) => {
          if (currentChunk.length < size) {
            currentChunk.push(item);
          } else {
            chunked.push(currentChunk);
            currentChunk = [item];
          }
        });
        if (currentChunk.length)
          chunked.push(currentChunk);
        return chunked;
      }
      module.exports = (props) => {
        const noFiles = props.totalFileCount === 0;
        const dashboardFilesClass = classNames("uppy-Dashboard-files", {
          "uppy-Dashboard-files--noFiles": noFiles
        });
        const rowHeight = props.itemsPerRow === 1 ? 71 : 200;
        const fileProps = {
          id: props.id,
          error: props.error,
          i18n: props.i18n,
          uppy: props.uppy,
          acquirers: props.acquirers,
          resumableUploads: props.resumableUploads,
          individualCancellation: props.individualCancellation,
          hideRetryButton: props.hideRetryButton,
          hidePauseResumeButton: props.hidePauseResumeButton,
          hideCancelButton: props.hideCancelButton,
          showLinkToFileUploadResult: props.showLinkToFileUploadResult,
          showRemoveButtonAfterComplete: props.showRemoveButtonAfterComplete,
          isWide: props.isWide,
          metaFields: props.metaFields,
          recoveredState: props.recoveredState,
          toggleFileCard: props.toggleFileCard,
          handleRequestThumbnail: props.handleRequestThumbnail,
          handleCancelThumbnail: props.handleCancelThumbnail
        };
        const sortByGhostComesFirst = (file1, file2) => {
          return props.files[file2].isGhost - props.files[file1].isGhost;
        };
        const files = Object.keys(props.files);
        if (props.recoveredState)
          files.sort(sortByGhostComesFirst);
        const rows = chunks(files, props.itemsPerRow);
        const renderRow = (row) => h3("div", {
          role: "presentation",
          key: row[0]
        }, row.map((fileID) => h3(FileItem, _extends({
          key: fileID,
          uppy: props.uppy
        }, fileProps, {
          role: "listitem",
          openFileEditor: props.openFileEditor,
          canEditFile: props.canEditFile,
          toggleAddFilesPanel: props.toggleAddFilesPanel,
          file: props.files[fileID]
        }))));
        return h3(VirtualList, {
          class: dashboardFilesClass,
          role: "list",
          data: rows,
          renderRow,
          rowHeight
        });
      };
    }
  });

  // ../packages/@uppy/dashboard/lib/components/AddFiles.js
  var require_AddFiles = __commonJS({
    "../packages/@uppy/dashboard/lib/components/AddFiles.js"(exports, module) {
      var _Symbol$for;
      var {
        h: h3,
        Component
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      _Symbol$for = Symbol.for("uppy test: disable unused locale key warning");
      var AddFiles = class extends Component {
        constructor() {
          super(...arguments);
          this.triggerFileInputClick = () => {
            this.fileInput.click();
          };
          this.triggerFolderInputClick = () => {
            this.folderInput.click();
          };
          this.onFileInputChange = (event) => {
            this.props.handleInputChange(event);
            event.target.value = null;
          };
          this.renderHiddenInput = (isFolder, refCallback) => {
            return h3("input", {
              className: "uppy-Dashboard-input",
              hidden: true,
              "aria-hidden": "true",
              tabIndex: -1,
              webkitdirectory: isFolder,
              type: "file",
              name: "files[]",
              multiple: this.props.maxNumberOfFiles !== 1,
              onChange: this.onFileInputChange,
              accept: this.props.allowedFileTypes,
              ref: refCallback
            });
          };
          this.renderMyDeviceAcquirer = () => {
            return h3("div", {
              className: "uppy-DashboardTab",
              role: "presentation",
              "data-uppy-acquirer-id": "MyDevice"
            }, h3("button", {
              type: "button",
              className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
              role: "tab",
              tabIndex: 0,
              "data-uppy-super-focusable": true,
              onClick: this.triggerFileInputClick
            }, h3("svg", {
              "aria-hidden": "true",
              focusable: "false",
              width: "32",
              height: "32",
              viewBox: "0 0 32 32"
            }, h3("g", {
              fill: "none",
              fillRule: "evenodd"
            }, h3("rect", {
              className: "uppy-ProviderIconBg",
              width: "32",
              height: "32",
              rx: "16",
              fill: "#2275D7"
            }), h3("path", {
              d: "M21.973 21.152H9.863l-1.108-5.087h14.464l-1.246 5.087zM9.935 11.37h3.958l.886 1.444a.673.673 0 0 0 .585.316h6.506v1.37H9.935v-3.13zm14.898 3.44a.793.793 0 0 0-.616-.31h-.978v-2.126c0-.379-.275-.613-.653-.613H15.75l-.886-1.445a.673.673 0 0 0-.585-.316H9.232c-.378 0-.667.209-.667.587V14.5h-.782a.793.793 0 0 0-.61.303.795.795 0 0 0-.155.663l1.45 6.633c.078.36.396.618.764.618h13.354c.36 0 .674-.246.76-.595l1.631-6.636a.795.795 0 0 0-.144-.675z",
              fill: "#FFF"
            }))), h3("div", {
              className: "uppy-DashboardTab-name"
            }, this.props.i18n("myDevice"))));
          };
          this.renderBrowseButton = (text, onClickFn) => {
            const numberOfAcquirers = this.props.acquirers.length;
            return h3("button", {
              type: "button",
              className: "uppy-u-reset uppy-Dashboard-browse",
              onClick: onClickFn,
              "data-uppy-super-focusable": numberOfAcquirers === 0
            }, text);
          };
          this.renderDropPasteBrowseTagline = () => {
            const numberOfAcquirers = this.props.acquirers.length;
            const browseFiles = this.renderBrowseButton(this.props.i18n("browseFiles"), this.triggerFileInputClick);
            const browseFolders = this.renderBrowseButton(this.props.i18n("browseFolders"), this.triggerFolderInputClick);
            const lowerFMSelectionType = this.props.fileManagerSelectionType;
            const camelFMSelectionType = lowerFMSelectionType.charAt(0).toUpperCase() + lowerFMSelectionType.slice(1);
            return h3("div", {
              class: "uppy-Dashboard-AddFiles-title"
            }, this.props.disableLocalFiles ? this.props.i18n("importFiles") : numberOfAcquirers > 0 ? this.props.i18nArray(`dropPasteImport${camelFMSelectionType}`, {
              browseFiles,
              browseFolders,
              browse: browseFiles
            }) : this.props.i18nArray(`dropPaste${camelFMSelectionType}`, {
              browseFiles,
              browseFolders,
              browse: browseFiles
            }));
          };
          this.renderAcquirer = (acquirer) => {
            return h3("div", {
              className: "uppy-DashboardTab",
              role: "presentation",
              "data-uppy-acquirer-id": acquirer.id
            }, h3("button", {
              type: "button",
              className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
              role: "tab",
              tabIndex: 0,
              "data-cy": acquirer.id,
              "aria-controls": `uppy-DashboardContent-panel--${acquirer.id}`,
              "aria-selected": this.props.activePickerPanel.id === acquirer.id,
              "data-uppy-super-focusable": true,
              onClick: () => this.props.showPanel(acquirer.id)
            }, acquirer.icon(), h3("div", {
              className: "uppy-DashboardTab-name"
            }, acquirer.name)));
          };
          this.renderAcquirers = (acquirers, disableLocalFiles) => {
            const acquirersWithoutLastTwo = [...acquirers];
            const lastTwoAcquirers = acquirersWithoutLastTwo.splice(acquirers.length - 2, acquirers.length);
            return h3("div", {
              className: "uppy-Dashboard-AddFiles-list",
              role: "tablist"
            }, !disableLocalFiles && this.renderMyDeviceAcquirer(), acquirersWithoutLastTwo.map((acquirer) => this.renderAcquirer(acquirer)), h3("span", {
              role: "presentation",
              style: {
                "white-space": "nowrap"
              }
            }, lastTwoAcquirers.map((acquirer) => this.renderAcquirer(acquirer))));
          };
        }
        [_Symbol$for]() {
          this.props.i18nArray("dropPasteBoth");
          this.props.i18nArray("dropPasteFiles");
          this.props.i18nArray("dropPasteFolders");
          this.props.i18nArray("dropPasteImportBoth");
          this.props.i18nArray("dropPasteImportFiles");
          this.props.i18nArray("dropPasteImportFolders");
        }
        renderPoweredByUppy() {
          const {
            i18nArray
          } = this.props;
          const uppyBranding = h3("span", null, h3("svg", {
            "aria-hidden": "true",
            focusable: "false",
            className: "uppy-c-icon uppy-Dashboard-poweredByIcon",
            width: "11",
            height: "11",
            viewBox: "0 0 11 11"
          }, h3("path", {
            d: "M7.365 10.5l-.01-4.045h2.612L5.5.806l-4.467 5.65h2.604l.01 4.044h3.718z",
            fillRule: "evenodd"
          })), h3("span", {
            className: "uppy-Dashboard-poweredByUppy"
          }, "Uppy"));
          const linkText = i18nArray("poweredBy", {
            uppy: uppyBranding
          });
          return h3("a", {
            tabIndex: "-1",
            href: "https://uppy.io",
            rel: "noreferrer noopener",
            target: "_blank",
            className: "uppy-Dashboard-poweredBy"
          }, linkText);
        }
        render() {
          return h3("div", {
            className: "uppy-Dashboard-AddFiles"
          }, this.renderHiddenInput(false, (ref) => {
            this.fileInput = ref;
          }), this.renderHiddenInput(true, (ref) => {
            this.folderInput = ref;
          }), this.renderDropPasteBrowseTagline(), this.props.acquirers.length > 0 && this.renderAcquirers(this.props.acquirers, this.props.disableLocalFiles), h3("div", {
            className: "uppy-Dashboard-AddFiles-info"
          }, this.props.note && h3("div", {
            className: "uppy-Dashboard-note"
          }, this.props.note), this.props.proudlyDisplayPoweredByUppy && this.renderPoweredByUppy(this.props)));
        }
      };
      module.exports = AddFiles;
    }
  });

  // ../packages/@uppy/dashboard/lib/components/AddFilesPanel.js
  var require_AddFilesPanel = __commonJS({
    "../packages/@uppy/dashboard/lib/components/AddFilesPanel.js"(exports, module) {
      var {
        h: h3
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      var classNames = require_classnames();
      var AddFiles = require_AddFiles();
      var AddFilesPanel = (props) => {
        return h3("div", {
          className: classNames("uppy-Dashboard-AddFilesPanel", props.className),
          "data-uppy-panelType": "AddFiles",
          "aria-hidden": props.showAddFilesPanel
        }, h3("div", {
          className: "uppy-DashboardContent-bar"
        }, h3("div", {
          className: "uppy-DashboardContent-title",
          role: "heading",
          "aria-level": "1"
        }, props.i18n("addingMoreFiles")), h3("button", {
          className: "uppy-DashboardContent-back",
          type: "button",
          onClick: () => props.toggleAddFilesPanel(false)
        }, props.i18n("back"))), h3(AddFiles, props));
      };
      module.exports = AddFilesPanel;
    }
  });

  // ../packages/@uppy/dashboard/lib/utils/ignoreEvent.js
  var require_ignoreEvent = __commonJS({
    "../packages/@uppy/dashboard/lib/utils/ignoreEvent.js"(exports, module) {
      function ignoreEvent(ev) {
        const {
          tagName
        } = ev.target;
        if (tagName === "INPUT" || tagName === "TEXTAREA") {
          ev.stopPropagation();
          return;
        }
        ev.preventDefault();
        ev.stopPropagation();
      }
      module.exports = ignoreEvent;
    }
  });

  // ../packages/@uppy/dashboard/lib/components/PickerPanelContent.js
  var require_PickerPanelContent = __commonJS({
    "../packages/@uppy/dashboard/lib/components/PickerPanelContent.js"(exports, module) {
      var {
        h: h3
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      var classNames = require_classnames();
      var ignoreEvent = require_ignoreEvent();
      function PickerPanelContent(props) {
        return h3("div", {
          className: classNames("uppy-DashboardContent-panel", props.className),
          role: "tabpanel",
          "data-uppy-panelType": "PickerPanel",
          id: `uppy-DashboardContent-panel--${props.activePickerPanel.id}`,
          onDragOver: ignoreEvent,
          onDragLeave: ignoreEvent,
          onDrop: ignoreEvent,
          onPaste: ignoreEvent
        }, h3("div", {
          className: "uppy-DashboardContent-bar"
        }, h3("div", {
          className: "uppy-DashboardContent-title",
          role: "heading",
          "aria-level": "1"
        }, props.i18n("importFrom", {
          name: props.activePickerPanel.name
        })), h3("button", {
          className: "uppy-DashboardContent-back",
          type: "button",
          onClick: props.hideAllPanels
        }, props.i18n("cancel"))), h3("div", {
          className: "uppy-DashboardContent-panelBody"
        }, props.uppy.getPlugin(props.activePickerPanel.id).render(props.state)));
      }
      module.exports = PickerPanelContent;
    }
  });

  // ../packages/@uppy/dashboard/lib/components/EditorPanel.js
  var require_EditorPanel = __commonJS({
    "../packages/@uppy/dashboard/lib/components/EditorPanel.js"(exports, module) {
      var {
        h: h3
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      var classNames = require_classnames();
      function EditorPanel(props) {
        const file = props.files[props.fileCardFor];
        return h3("div", {
          className: classNames("uppy-DashboardContent-panel", props.className),
          role: "tabpanel",
          "data-uppy-panelType": "FileEditor",
          id: "uppy-DashboardContent-panel--editor"
        }, h3("div", {
          className: "uppy-DashboardContent-bar"
        }, h3("div", {
          className: "uppy-DashboardContent-title",
          role: "heading",
          "aria-level": "1"
        }, props.i18nArray("editing", {
          file: h3("span", {
            className: "uppy-DashboardContent-titleFile"
          }, file.meta ? file.meta.name : file.name)
        })), h3("button", {
          className: "uppy-DashboardContent-back",
          type: "button",
          onClick: props.hideAllPanels
        }, props.i18n("cancel")), h3("button", {
          className: "uppy-DashboardContent-save",
          type: "button",
          onClick: props.saveFileEditor
        }, props.i18n("save"))), h3("div", {
          className: "uppy-DashboardContent-panelBody"
        }, props.editors.map((target) => {
          return props.uppy.getPlugin(target.id).render(props.state);
        })));
      }
      module.exports = EditorPanel;
    }
  });

  // ../packages/@uppy/dashboard/lib/components/PickerPanelTopBar.js
  var require_PickerPanelTopBar = __commonJS({
    "../packages/@uppy/dashboard/lib/components/PickerPanelTopBar.js"(exports, module) {
      var {
        h: h3
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      var uploadStates = {
        STATE_ERROR: "error",
        STATE_WAITING: "waiting",
        STATE_PREPROCESSING: "preprocessing",
        STATE_UPLOADING: "uploading",
        STATE_POSTPROCESSING: "postprocessing",
        STATE_COMPLETE: "complete",
        STATE_PAUSED: "paused"
      };
      function getUploadingState(isAllErrored, isAllComplete, isAllPaused, files) {
        if (files === void 0) {
          files = {};
        }
        if (isAllErrored) {
          return uploadStates.STATE_ERROR;
        }
        if (isAllComplete) {
          return uploadStates.STATE_COMPLETE;
        }
        if (isAllPaused) {
          return uploadStates.STATE_PAUSED;
        }
        let state = uploadStates.STATE_WAITING;
        const fileIDs = Object.keys(files);
        for (let i3 = 0; i3 < fileIDs.length; i3++) {
          const {
            progress
          } = files[fileIDs[i3]];
          if (progress.uploadStarted && !progress.uploadComplete) {
            return uploadStates.STATE_UPLOADING;
          }
          if (progress.preprocess && state !== uploadStates.STATE_UPLOADING) {
            state = uploadStates.STATE_PREPROCESSING;
          }
          if (progress.postprocess && state !== uploadStates.STATE_UPLOADING && state !== uploadStates.STATE_PREPROCESSING) {
            state = uploadStates.STATE_POSTPROCESSING;
          }
        }
        return state;
      }
      function UploadStatus(props) {
        const uploadingState = getUploadingState(props.isAllErrored, props.isAllComplete, props.isAllPaused, props.files);
        switch (uploadingState) {
          case "uploading":
            return props.i18n("uploadingXFiles", {
              smart_count: props.inProgressNotPausedFiles.length
            });
          case "preprocessing":
          case "postprocessing":
            return props.i18n("processingXFiles", {
              smart_count: props.processingFiles.length
            });
          case "paused":
            return props.i18n("uploadPaused");
          case "waiting":
            return props.i18n("xFilesSelected", {
              smart_count: props.newFiles.length
            });
          case "complete":
            return props.i18n("uploadComplete");
        }
      }
      function PanelTopBar(props) {
        let {
          allowNewUpload
        } = props;
        if (allowNewUpload && props.maxNumberOfFiles) {
          allowNewUpload = props.totalFileCount < props.maxNumberOfFiles;
        }
        return h3("div", {
          className: "uppy-DashboardContent-bar"
        }, !props.isAllComplete && !props.hideCancelButton ? h3("button", {
          className: "uppy-DashboardContent-back",
          type: "button",
          onClick: () => props.uppy.cancelAll()
        }, props.i18n("cancel")) : h3("div", null), h3("div", {
          className: "uppy-DashboardContent-title",
          role: "heading",
          "aria-level": "1"
        }, h3(UploadStatus, props)), allowNewUpload ? h3("button", {
          className: "uppy-DashboardContent-addMore",
          type: "button",
          "aria-label": props.i18n("addMoreFiles"),
          title: props.i18n("addMoreFiles"),
          onClick: () => props.toggleAddFilesPanel(true)
        }, h3("svg", {
          "aria-hidden": "true",
          focusable: "false",
          className: "uppy-c-icon",
          width: "15",
          height: "15",
          viewBox: "0 0 15 15"
        }, h3("path", {
          d: "M8 6.5h6a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5H8v6a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5V8h-6a.5.5 0 0 1-.5-.5V7a.5.5 0 0 1 .5-.5h6v-6A.5.5 0 0 1 7 0h.5a.5.5 0 0 1 .5.5v6z"
        })), h3("span", {
          className: "uppy-DashboardContent-addMoreCaption"
        }, props.i18n("addMore"))) : h3("div", null));
      }
      module.exports = PanelTopBar;
    }
  });

  // ../packages/@uppy/dashboard/lib/components/FileCard/index.js
  var require_FileCard = __commonJS({
    "../packages/@uppy/dashboard/lib/components/FileCard/index.js"(exports, module) {
      var {
        h: h3,
        Component
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      var classNames = require_classnames();
      var {
        nanoid
      } = require_non_secure();
      var getFileTypeIcon = require_getFileTypeIcon();
      var ignoreEvent = require_ignoreEvent();
      var FilePreview = require_FilePreview();
      var FileCard = class extends Component {
        constructor(props) {
          super(props);
          this.form = document.createElement("form");
          this.updateMeta = (newVal, name) => {
            this.setState((_ref) => {
              let {
                formState
              } = _ref;
              return {
                formState: {
                  ...formState,
                  [name]: newVal
                }
              };
            });
          };
          this.handleSave = (e3) => {
            e3.preventDefault();
            const fileID = this.props.fileCardFor;
            this.props.saveFileCard(this.state.formState, fileID);
          };
          this.handleCancel = () => {
            this.props.toggleFileCard(false);
          };
          this.saveOnEnter = (ev) => {
            if (ev.keyCode === 13) {
              ev.stopPropagation();
              ev.preventDefault();
              const file = this.props.files[this.props.fileCardFor];
              this.props.saveFileCard(this.state.formState, file.id);
            }
          };
          this.renderMetaFields = () => {
            const metaFields = this.getMetaFields() || [];
            const fieldCSSClasses = {
              text: "uppy-u-reset uppy-c-textInput uppy-Dashboard-FileCard-input"
            };
            return metaFields.map((field) => {
              const id = `uppy-Dashboard-FileCard-input-${field.id}`;
              const required = this.props.requiredMetaFields.includes(field.id);
              return h3("fieldset", {
                key: field.id,
                className: "uppy-Dashboard-FileCard-fieldset"
              }, h3("label", {
                className: "uppy-Dashboard-FileCard-label",
                htmlFor: id
              }, field.name), field.render !== void 0 ? field.render({
                value: this.state.formState[field.id],
                onChange: (newVal) => this.updateMeta(newVal, field.id),
                fieldCSSClasses,
                required,
                form: this.form.id
              }, h3) : h3("input", {
                className: fieldCSSClasses.text,
                id,
                form: this.form.id,
                type: field.type || "text",
                required,
                value: this.state.formState[field.id],
                placeholder: field.placeholder,
                onKeyUp: "form" in HTMLInputElement.prototype ? void 0 : this.saveOnEnter,
                onKeyDown: "form" in HTMLInputElement.prototype ? void 0 : this.saveOnEnter,
                onKeyPress: "form" in HTMLInputElement.prototype ? void 0 : this.saveOnEnter,
                onInput: (ev) => this.updateMeta(ev.target.value, field.id),
                "data-uppy-super-focusable": true
              }));
            });
          };
          const _file = this.props.files[this.props.fileCardFor];
          const _metaFields = this.getMetaFields() || [];
          const storedMetaData = {};
          _metaFields.forEach((field) => {
            storedMetaData[field.id] = _file.meta[field.id] || "";
          });
          this.state = {
            formState: storedMetaData
          };
          this.form.id = nanoid();
        }
        componentWillMount() {
          this.form.addEventListener("submit", this.handleSave);
          document.body.appendChild(this.form);
        }
        componentWillUnmount() {
          this.form.removeEventListener("submit", this.handleSave);
          document.body.removeChild(this.form);
        }
        getMetaFields() {
          return typeof this.props.metaFields === "function" ? this.props.metaFields(this.props.files[this.props.fileCardFor]) : this.props.metaFields;
        }
        render() {
          const file = this.props.files[this.props.fileCardFor];
          const showEditButton = this.props.canEditFile(file);
          return h3("div", {
            className: classNames("uppy-Dashboard-FileCard", this.props.className),
            "data-uppy-panelType": "FileCard",
            onDragOver: ignoreEvent,
            onDragLeave: ignoreEvent,
            onDrop: ignoreEvent,
            onPaste: ignoreEvent
          }, h3("div", {
            className: "uppy-DashboardContent-bar"
          }, h3("div", {
            className: "uppy-DashboardContent-title",
            role: "heading",
            "aria-level": "1"
          }, this.props.i18nArray("editing", {
            file: h3("span", {
              className: "uppy-DashboardContent-titleFile"
            }, file.meta ? file.meta.name : file.name)
          })), h3("button", {
            className: "uppy-DashboardContent-back",
            type: "button",
            form: this.form.id,
            title: this.props.i18n("finishEditingFile"),
            onClick: this.handleCancel
          }, this.props.i18n("cancel"))), h3("div", {
            className: "uppy-Dashboard-FileCard-inner"
          }, h3("div", {
            className: "uppy-Dashboard-FileCard-preview",
            style: {
              backgroundColor: getFileTypeIcon(file.type).color
            }
          }, h3(FilePreview, {
            file
          }), showEditButton && h3("button", {
            type: "button",
            className: "uppy-u-reset uppy-c-btn uppy-Dashboard-FileCard-edit",
            onClick: (event) => {
              this.handleSave(event);
              this.props.openFileEditor(file);
            },
            form: this.form.id
          }, this.props.i18n("editFile"))), h3("div", {
            className: "uppy-Dashboard-FileCard-info"
          }, this.renderMetaFields()), h3("div", {
            className: "uppy-Dashboard-FileCard-actions"
          }, h3("button", {
            className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Dashboard-FileCard-actionsBtn",
            type: "form" in HTMLButtonElement.prototype ? "submit" : "button",
            onClick: "form" in HTMLButtonElement.prototype ? void 0 : this.handleSave,
            form: this.form.id
          }, this.props.i18n("saveChanges")), h3("button", {
            className: "uppy-u-reset uppy-c-btn uppy-c-btn-link uppy-Dashboard-FileCard-actionsBtn",
            type: "button",
            onClick: this.handleCancel,
            form: this.form.id
          }, this.props.i18n("cancel")))));
        }
      };
      module.exports = FileCard;
    }
  });

  // ../packages/@uppy/dashboard/lib/components/Slide.js
  var require_Slide = __commonJS({
    "../packages/@uppy/dashboard/lib/components/Slide.js"(exports, module) {
      var {
        cloneElement,
        Component,
        toChildArray
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      var classNames = require_classnames();
      var transitionName = "uppy-transition-slideDownUp";
      var duration = 250;
      var Slide = class extends Component {
        constructor(props) {
          super(props);
          this.state = {
            cachedChildren: null,
            className: ""
          };
        }
        componentWillUpdate(nextProps) {
          const {
            cachedChildren
          } = this.state;
          const child = toChildArray(nextProps.children)[0];
          if (cachedChildren === child)
            return null;
          const patch = {
            cachedChildren: child
          };
          if (child && !cachedChildren) {
            patch.className = `${transitionName}-enter`;
            cancelAnimationFrame(this.animationFrame);
            clearTimeout(this.leaveTimeout);
            this.leaveTimeout = void 0;
            this.animationFrame = requestAnimationFrame(() => {
              this.setState({
                className: `${transitionName}-enter ${transitionName}-enter-active`
              });
              this.enterTimeout = setTimeout(() => {
                this.setState({
                  className: ""
                });
              }, duration);
            });
          }
          if (cachedChildren && !child && this.leaveTimeout === void 0) {
            patch.cachedChildren = cachedChildren;
            patch.className = `${transitionName}-leave`;
            cancelAnimationFrame(this.animationFrame);
            clearTimeout(this.enterTimeout);
            this.enterTimeout = void 0;
            this.animationFrame = requestAnimationFrame(() => {
              this.setState({
                className: `${transitionName}-leave ${transitionName}-leave-active`
              });
              this.leaveTimeout = setTimeout(() => {
                this.setState({
                  cachedChildren: null,
                  className: ""
                });
              }, duration);
            });
          }
          this.setState(patch);
        }
        render() {
          const {
            cachedChildren,
            className
          } = this.state;
          if (!cachedChildren) {
            return null;
          }
          return cloneElement(cachedChildren, {
            className: classNames(className, cachedChildren.props.className)
          });
        }
      };
      module.exports = Slide;
    }
  });

  // ../packages/@uppy/dashboard/lib/components/Dashboard.js
  var require_Dashboard = __commonJS({
    "../packages/@uppy/dashboard/lib/components/Dashboard.js"(exports, module) {
      function _extends() {
        _extends = Object.assign || function(target) {
          for (var i3 = 1; i3 < arguments.length; i3++) {
            var source = arguments[i3];
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
      var {
        h: h3
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      var classNames = require_classnames();
      var isDragDropSupported = require_isDragDropSupported();
      var FileList = require_FileList();
      var AddFiles = require_AddFiles();
      var AddFilesPanel = require_AddFilesPanel();
      var PickerPanelContent = require_PickerPanelContent();
      var EditorPanel = require_EditorPanel();
      var PanelTopBar = require_PickerPanelTopBar();
      var FileCard = require_FileCard();
      var Slide = require_Slide();
      var WIDTH_XL = 900;
      var WIDTH_LG = 700;
      var WIDTH_MD = 576;
      var HEIGHT_MD = 400;
      module.exports = function Dashboard2(props) {
        const noFiles = props.totalFileCount === 0;
        const isSizeMD = props.containerWidth > WIDTH_MD;
        const wrapperClassName = classNames({
          "uppy-Root": props.isTargetDOMEl
        });
        const dashboardClassName = classNames({
          "uppy-Dashboard": true,
          "uppy-Dashboard--isDisabled": props.disabled,
          "uppy-Dashboard--animateOpenClose": props.animateOpenClose,
          "uppy-Dashboard--isClosing": props.isClosing,
          "uppy-Dashboard--isDraggingOver": props.isDraggingOver,
          "uppy-Dashboard--modal": !props.inline,
          "uppy-size--md": props.containerWidth > WIDTH_MD,
          "uppy-size--lg": props.containerWidth > WIDTH_LG,
          "uppy-size--xl": props.containerWidth > WIDTH_XL,
          "uppy-size--height-md": props.containerHeight > HEIGHT_MD,
          "uppy-Dashboard--isAddFilesPanelVisible": props.showAddFilesPanel,
          "uppy-Dashboard--isInnerWrapVisible": props.areInsidesReadyToBeVisible
        });
        let itemsPerRow = 1;
        if (props.containerWidth > WIDTH_XL) {
          itemsPerRow = 5;
        } else if (props.containerWidth > WIDTH_LG) {
          itemsPerRow = 4;
        } else if (props.containerWidth > WIDTH_MD) {
          itemsPerRow = 3;
        }
        const showFileList = props.showSelectedFiles && !noFiles;
        const numberOfFilesForRecovery = props.recoveredState ? Object.keys(props.recoveredState.files).length : null;
        const numberOfGhosts = props.files ? Object.keys(props.files).filter((fileID) => props.files[fileID].isGhost).length : null;
        const renderRestoredText = () => {
          if (numberOfGhosts > 0) {
            return props.i18n("recoveredXFiles", {
              smart_count: numberOfGhosts
            });
          }
          return props.i18n("recoveredAllFiles");
        };
        const dashboard = h3("div", {
          className: dashboardClassName,
          "data-uppy-theme": props.theme,
          "data-uppy-num-acquirers": props.acquirers.length,
          "data-uppy-drag-drop-supported": !props.disableLocalFiles && isDragDropSupported(),
          "aria-hidden": props.inline ? "false" : props.isHidden,
          "aria-disabled": props.disabled,
          "aria-label": !props.inline ? props.i18n("dashboardWindowTitle") : props.i18n("dashboardTitle"),
          onPaste: props.handlePaste,
          onDragOver: props.handleDragOver,
          onDragLeave: props.handleDragLeave,
          onDrop: props.handleDrop
        }, h3("div", {
          "aria-hidden": "true",
          className: "uppy-Dashboard-overlay",
          tabIndex: -1,
          onClick: props.handleClickOutside
        }), h3("div", {
          className: "uppy-Dashboard-inner",
          "aria-modal": !props.inline && "true",
          role: !props.inline && "dialog",
          style: {
            width: props.inline && props.width ? props.width : "",
            height: props.inline && props.height ? props.height : ""
          }
        }, !props.inline ? h3("button", {
          className: "uppy-u-reset uppy-Dashboard-close",
          type: "button",
          "aria-label": props.i18n("closeModal"),
          title: props.i18n("closeModal"),
          onClick: props.closeModal
        }, h3("span", {
          "aria-hidden": "true"
        }, "\xD7")) : null, h3("div", {
          className: "uppy-Dashboard-innerWrap"
        }, h3("div", {
          className: "uppy-Dashboard-dropFilesHereHint"
        }, props.i18n("dropHint")), showFileList && h3(PanelTopBar, props), numberOfFilesForRecovery && h3("div", {
          className: "uppy-Dashboard-serviceMsg"
        }, h3("svg", {
          className: "uppy-Dashboard-serviceMsg-icon",
          "aria-hidden": "true",
          focusable: "false",
          width: "21",
          height: "16",
          viewBox: "0 0 24 19"
        }, h3("g", {
          transform: "translate(0 -1)",
          fill: "none",
          fillRule: "evenodd"
        }, h3("path", {
          d: "M12.857 1.43l10.234 17.056A1 1 0 0122.234 20H1.766a1 1 0 01-.857-1.514L11.143 1.429a1 1 0 011.714 0z",
          fill: "#FFD300"
        }), h3("path", {
          fill: "#000",
          d: "M11 6h2l-.3 8h-1.4z"
        }), h3("circle", {
          fill: "#000",
          cx: "12",
          cy: "17",
          r: "1"
        }))), h3("strong", {
          className: "uppy-Dashboard-serviceMsg-title"
        }, props.i18n("sessionRestored")), h3("div", {
          className: "uppy-Dashboard-serviceMsg-text"
        }, renderRestoredText())), showFileList ? h3(FileList, _extends({}, props, {
          itemsPerRow
        })) : h3(AddFiles, _extends({}, props, {
          isSizeMD
        })), h3(Slide, null, props.showAddFilesPanel ? h3(AddFilesPanel, _extends({
          key: "AddFiles"
        }, props, {
          isSizeMD
        })) : null), h3(Slide, null, props.fileCardFor ? h3(FileCard, _extends({
          key: "FileCard"
        }, props)) : null), h3(Slide, null, props.activePickerPanel ? h3(PickerPanelContent, _extends({
          key: "Picker"
        }, props)) : null), h3(Slide, null, props.showFileEditor ? h3(EditorPanel, _extends({
          key: "Editor"
        }, props)) : null), h3("div", {
          className: "uppy-Dashboard-progressindicators"
        }, props.progressindicators.map((target) => {
          return props.uppy.getPlugin(target.id).render(props.state);
        })))));
        return h3("div", {
          className: wrapperClassName,
          dir: props.direction
        }, dashboard);
      };
    }
  });

  // ../packages/@uppy/dashboard/lib/locale.js
  var require_locale4 = __commonJS({
    "../packages/@uppy/dashboard/lib/locale.js"(exports, module) {
      module.exports = {
        strings: {
          closeModal: "Close Modal",
          addMoreFiles: "Add more files",
          addingMoreFiles: "Adding more files",
          importFrom: "Import from %{name}",
          dashboardWindowTitle: "Uppy Dashboard Window (Press escape to close)",
          dashboardTitle: "Uppy Dashboard",
          copyLinkToClipboardSuccess: "Link copied to clipboard.",
          copyLinkToClipboardFallback: "Copy the URL below",
          copyLink: "Copy link",
          back: "Back",
          removeFile: "Remove file",
          editFile: "Edit file",
          editing: "Editing %{file}",
          finishEditingFile: "Finish editing file",
          saveChanges: "Save changes",
          myDevice: "My Device",
          dropHint: "Drop your files here",
          uploadComplete: "Upload complete",
          uploadPaused: "Upload paused",
          resumeUpload: "Resume upload",
          pauseUpload: "Pause upload",
          retryUpload: "Retry upload",
          cancelUpload: "Cancel upload",
          xFilesSelected: {
            0: "%{smart_count} file selected",
            1: "%{smart_count} files selected"
          },
          uploadingXFiles: {
            0: "Uploading %{smart_count} file",
            1: "Uploading %{smart_count} files"
          },
          processingXFiles: {
            0: "Processing %{smart_count} file",
            1: "Processing %{smart_count} files"
          },
          poweredBy: "Powered by %{uppy}",
          addMore: "Add more",
          editFileWithFilename: "Edit file %{file}",
          save: "Save",
          cancel: "Cancel",
          dropPasteFiles: "Drop files here or %{browseFiles}",
          dropPasteFolders: "Drop files here or %{browseFolders}",
          dropPasteBoth: "Drop files here, %{browseFiles} or %{browseFolders}",
          dropPasteImportFiles: "Drop files here, %{browseFiles} or import from:",
          dropPasteImportFolders: "Drop files here, %{browseFolders} or import from:",
          dropPasteImportBoth: "Drop files here, %{browseFiles}, %{browseFolders} or import from:",
          importFiles: "Import files from:",
          browseFiles: "browse files",
          browseFolders: "browse folders",
          recoveredXFiles: {
            0: "We could not fully recover 1 file. Please re-select it and resume the upload.",
            1: "We could not fully recover %{smart_count} files. Please re-select them and resume the upload."
          },
          recoveredAllFiles: "We restored all files. You can now resume the upload.",
          sessionRestored: "Session restored",
          reSelect: "Re-select",
          missingRequiredMetaFields: {
            0: "Missing required meta field: %{fields}.",
            1: "Missing required meta fields: %{fields}."
          }
        }
      };
    }
  });

  // ../packages/@uppy/dashboard/lib/index.js
  var require_lib6 = __commonJS({
    "../packages/@uppy/dashboard/lib/index.js"(exports, module) {
      var _class;
      var _openFileEditorWhenFilesAdded;
      var _attachRenderFunctionToTarget;
      var _isTargetSupported;
      var _getAcquirers;
      var _getProgressIndicators;
      var _getEditors;
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
      var {
        h: h3
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      var {
        UIPlugin
      } = require_lib2();
      var StatusBar = require_lib3();
      var Informer = require_lib4();
      var ThumbnailGenerator = require_lib5();
      var findAllDOMElements = require_findAllDOMElements();
      var toArray = require_toArray();
      var getDroppedFiles = require_getDroppedFiles();
      var getTextDirection = require_getTextDirection();
      var {
        nanoid
      } = require_non_secure();
      var trapFocus = require_trapFocus();
      var createSuperFocus = require_createSuperFocus();
      var memoize = require_memoize_one_cjs().default || require_memoize_one_cjs();
      var FOCUSABLE_ELEMENTS = require_FOCUSABLE_ELEMENTS();
      var DashboardUI = require_Dashboard();
      var locale = require_locale4();
      var TAB_KEY = 9;
      var ESC_KEY = 27;
      function createPromise() {
        const o3 = {};
        o3.promise = new Promise((resolve, reject) => {
          o3.resolve = resolve;
          o3.reject = reject;
        });
        return o3;
      }
      function defaultPickerIcon() {
        return h3("svg", {
          "aria-hidden": "true",
          focusable: "false",
          width: "30",
          height: "30",
          viewBox: "0 0 30 30"
        }, h3("path", {
          d: "M15 30c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15C6.716 0 0 6.716 0 15c0 8.284 6.716 15 15 15zm4.258-12.676v6.846h-8.426v-6.846H5.204l9.82-12.364 9.82 12.364H19.26z"
        }));
      }
      module.exports = (_temp = (_openFileEditorWhenFilesAdded = /* @__PURE__ */ _classPrivateFieldLooseKey("openFileEditorWhenFilesAdded"), _attachRenderFunctionToTarget = /* @__PURE__ */ _classPrivateFieldLooseKey("attachRenderFunctionToTarget"), _isTargetSupported = /* @__PURE__ */ _classPrivateFieldLooseKey("isTargetSupported"), _getAcquirers = /* @__PURE__ */ _classPrivateFieldLooseKey("getAcquirers"), _getProgressIndicators = /* @__PURE__ */ _classPrivateFieldLooseKey("getProgressIndicators"), _getEditors = /* @__PURE__ */ _classPrivateFieldLooseKey("getEditors"), _class = class Dashboard extends UIPlugin {
        constructor(uppy, _opts) {
          var _this;
          super(uppy, _opts);
          _this = this;
          this.removeTarget = (plugin) => {
            const pluginState = this.getPluginState();
            const newTargets = pluginState.targets.filter((target) => target.id !== plugin.id);
            this.setPluginState({
              targets: newTargets
            });
          };
          this.addTarget = (plugin) => {
            const callerPluginId = plugin.id || plugin.constructor.name;
            const callerPluginName = plugin.title || callerPluginId;
            const callerPluginType = plugin.type;
            if (callerPluginType !== "acquirer" && callerPluginType !== "progressindicator" && callerPluginType !== "editor") {
              const msg = "Dashboard: can only be targeted by plugins of types: acquirer, progressindicator, editor";
              this.uppy.log(msg, "error");
              return;
            }
            const target = {
              id: callerPluginId,
              name: callerPluginName,
              type: callerPluginType
            };
            const state = this.getPluginState();
            const newTargets = state.targets.slice();
            newTargets.push(target);
            this.setPluginState({
              targets: newTargets
            });
            return this.el;
          };
          this.hideAllPanels = () => {
            const state = this.getPluginState();
            const update = {
              activePickerPanel: false,
              showAddFilesPanel: false,
              activeOverlayType: null,
              fileCardFor: null,
              showFileEditor: false
            };
            if (state.activePickerPanel === update.activePickerPanel && state.showAddFilesPanel === update.showAddFilesPanel && state.showFileEditor === update.showFileEditor && state.activeOverlayType === update.activeOverlayType) {
              return;
            }
            this.setPluginState(update);
          };
          this.showPanel = (id2) => {
            const {
              targets
            } = this.getPluginState();
            const activePickerPanel = targets.filter((target) => {
              return target.type === "acquirer" && target.id === id2;
            })[0];
            this.setPluginState({
              activePickerPanel,
              activeOverlayType: "PickerPanel"
            });
          };
          this.canEditFile = (file) => {
            const {
              targets
            } = this.getPluginState();
            const editors = _classPrivateFieldLooseBase(this, _getEditors)[_getEditors](targets);
            return editors.some((target) => this.uppy.getPlugin(target.id).canEditFile(file));
          };
          this.openFileEditor = (file) => {
            const {
              targets
            } = this.getPluginState();
            const editors = _classPrivateFieldLooseBase(this, _getEditors)[_getEditors](targets);
            this.setPluginState({
              showFileEditor: true,
              fileCardFor: file.id || null,
              activeOverlayType: "FileEditor"
            });
            editors.forEach((editor) => {
              this.uppy.getPlugin(editor.id).selectFile(file);
            });
          };
          this.saveFileEditor = () => {
            const {
              targets
            } = this.getPluginState();
            const editors = _classPrivateFieldLooseBase(this, _getEditors)[_getEditors](targets);
            editors.forEach((editor) => {
              this.uppy.getPlugin(editor.id).save();
            });
            this.hideAllPanels();
          };
          this.openModal = () => {
            const {
              promise,
              resolve
            } = createPromise();
            this.savedScrollPosition = window.pageYOffset;
            this.savedActiveElement = document.activeElement;
            if (this.opts.disablePageScrollWhenModalOpen) {
              document.body.classList.add("uppy-Dashboard-isFixed");
            }
            if (this.opts.animateOpenClose && this.getPluginState().isClosing) {
              const handler = () => {
                this.setPluginState({
                  isHidden: false
                });
                this.el.removeEventListener("animationend", handler, false);
                resolve();
              };
              this.el.addEventListener("animationend", handler, false);
            } else {
              this.setPluginState({
                isHidden: false
              });
              resolve();
            }
            if (this.opts.browserBackButtonClose) {
              this.updateBrowserHistory();
            }
            document.addEventListener("keydown", this.handleKeyDownInModal);
            this.uppy.emit("dashboard:modal-open");
            return promise;
          };
          this.closeModal = function(opts) {
            if (opts === void 0) {
              opts = {};
            }
            const {
              manualClose = true
            } = opts;
            const {
              isHidden,
              isClosing
            } = _this.getPluginState();
            if (isHidden || isClosing) {
              return;
            }
            const {
              promise,
              resolve
            } = createPromise();
            if (_this.opts.disablePageScrollWhenModalOpen) {
              document.body.classList.remove("uppy-Dashboard-isFixed");
            }
            if (_this.opts.animateOpenClose) {
              _this.setPluginState({
                isClosing: true
              });
              const handler = () => {
                _this.setPluginState({
                  isHidden: true,
                  isClosing: false
                });
                _this.superFocus.cancel();
                _this.savedActiveElement.focus();
                _this.el.removeEventListener("animationend", handler, false);
                resolve();
              };
              _this.el.addEventListener("animationend", handler, false);
            } else {
              _this.setPluginState({
                isHidden: true
              });
              _this.superFocus.cancel();
              _this.savedActiveElement.focus();
              resolve();
            }
            document.removeEventListener("keydown", _this.handleKeyDownInModal);
            if (manualClose) {
              if (_this.opts.browserBackButtonClose) {
                var _history$state;
                if ((_history$state = history.state) != null && _history$state[_this.modalName]) {
                  history.back();
                }
              }
            }
            _this.uppy.emit("dashboard:modal-closed");
            return promise;
          };
          this.isModalOpen = () => {
            return !this.getPluginState().isHidden || false;
          };
          this.requestCloseModal = () => {
            if (this.opts.onRequestCloseModal) {
              return this.opts.onRequestCloseModal();
            }
            return this.closeModal();
          };
          this.setDarkModeCapability = (isDarkModeOn) => {
            const {
              capabilities
            } = this.uppy.getState();
            this.uppy.setState({
              capabilities: {
                ...capabilities,
                darkMode: isDarkModeOn
              }
            });
          };
          this.handleSystemDarkModeChange = (event) => {
            const isDarkModeOnNow = event.matches;
            this.uppy.log(`[Dashboard] Dark mode is ${isDarkModeOnNow ? "on" : "off"}`);
            this.setDarkModeCapability(isDarkModeOnNow);
          };
          this.toggleFileCard = (show, fileID) => {
            const file = this.uppy.getFile(fileID);
            if (show) {
              this.uppy.emit("dashboard:file-edit-start", file);
            } else {
              this.uppy.emit("dashboard:file-edit-complete", file);
            }
            this.setPluginState({
              fileCardFor: show ? fileID : null,
              activeOverlayType: show ? "FileCard" : null
            });
          };
          this.toggleAddFilesPanel = (show) => {
            this.setPluginState({
              showAddFilesPanel: show,
              activeOverlayType: show ? "AddFiles" : null
            });
          };
          this.addFiles = (files) => {
            const descriptors = files.map((file) => ({
              source: this.id,
              name: file.name,
              type: file.type,
              data: file,
              meta: {
                relativePath: file.relativePath || null
              }
            }));
            try {
              this.uppy.addFiles(descriptors);
            } catch (err) {
              this.uppy.log(err);
            }
          };
          this.startListeningToResize = () => {
            this.resizeObserver = new ResizeObserver((entries) => {
              const uppyDashboardInnerEl = entries[0];
              const {
                width,
                height
              } = uppyDashboardInnerEl.contentRect;
              this.uppy.log(`[Dashboard] resized: ${width} / ${height}`, "debug");
              this.setPluginState({
                containerWidth: width,
                containerHeight: height,
                areInsidesReadyToBeVisible: true
              });
            });
            this.resizeObserver.observe(this.el.querySelector(".uppy-Dashboard-inner"));
            this.makeDashboardInsidesVisibleAnywayTimeout = setTimeout(() => {
              const pluginState = this.getPluginState();
              const isModalAndClosed = !this.opts.inline && pluginState.isHidden;
              if (!pluginState.areInsidesReadyToBeVisible && !isModalAndClosed) {
                this.uppy.log("[Dashboard] resize event didn't fire on time: defaulted to mobile layout", "debug");
                this.setPluginState({
                  areInsidesReadyToBeVisible: true
                });
              }
            }, 1e3);
          };
          this.stopListeningToResize = () => {
            this.resizeObserver.disconnect();
            clearTimeout(this.makeDashboardInsidesVisibleAnywayTimeout);
          };
          this.recordIfFocusedOnUppyRecently = (event) => {
            if (this.el.contains(event.target)) {
              this.ifFocusedOnUppyRecently = true;
            } else {
              this.ifFocusedOnUppyRecently = false;
              this.superFocus.cancel();
            }
          };
          this.disableAllFocusableElements = (disable) => {
            const focusableNodes = toArray(this.el.querySelectorAll(FOCUSABLE_ELEMENTS));
            if (disable) {
              focusableNodes.forEach((node) => {
                const currentTabIndex = node.getAttribute("tabindex");
                if (currentTabIndex) {
                  node.dataset.inertTabindex = currentTabIndex;
                }
                node.setAttribute("tabindex", "-1");
              });
            } else {
              focusableNodes.forEach((node) => {
                if ("inertTabindex" in node.dataset) {
                  node.setAttribute("tabindex", node.dataset.inertTabindex);
                } else {
                  node.removeAttribute("tabindex");
                }
              });
            }
            this.dashboardIsDisabled = disable;
          };
          this.updateBrowserHistory = () => {
            var _history$state2;
            if (!((_history$state2 = history.state) != null && _history$state2[this.modalName])) {
              history.pushState({
                ...history.state,
                [this.modalName]: true
              }, "");
            }
            window.addEventListener("popstate", this.handlePopState, false);
          };
          this.handlePopState = (event) => {
            var _event$state;
            if (this.isModalOpen() && (!event.state || !event.state[this.modalName])) {
              this.closeModal({
                manualClose: false
              });
            }
            if (!this.isModalOpen() && (_event$state = event.state) != null && _event$state[this.modalName]) {
              history.back();
            }
          };
          this.handleKeyDownInModal = (event) => {
            if (event.keyCode === ESC_KEY)
              this.requestCloseModal(event);
            if (event.keyCode === TAB_KEY)
              trapFocus.forModal(event, this.getPluginState().activeOverlayType, this.el);
          };
          this.handleClickOutside = () => {
            if (this.opts.closeModalOnClickOutside)
              this.requestCloseModal();
          };
          this.handlePaste = (event) => {
            this.uppy.iteratePlugins((plugin) => {
              if (plugin.type === "acquirer") {
                plugin.handleRootPaste == null ? void 0 : plugin.handleRootPaste(event);
              }
            });
            const files = toArray(event.clipboardData.files);
            if (files.length > 0) {
              this.uppy.log("[Dashboard] Files pasted");
              this.addFiles(files);
            }
          };
          this.handleInputChange = (event) => {
            event.preventDefault();
            const files = toArray(event.target.files);
            if (files.length > 0) {
              this.uppy.log("[Dashboard] Files selected through input");
              this.addFiles(files);
            }
          };
          this.handleDragOver = (event) => {
            var _this$opts$onDragOver, _this$opts;
            event.preventDefault();
            event.stopPropagation();
            const canSomePluginHandleRootDrop = () => {
              let somePluginCanHandleRootDrop2 = true;
              this.uppy.iteratePlugins((plugin) => {
                if (plugin.canHandleRootDrop != null && plugin.canHandleRootDrop(event)) {
                  somePluginCanHandleRootDrop2 = true;
                }
              });
              return somePluginCanHandleRootDrop2;
            };
            const doesEventHaveFiles = () => {
              const {
                types
              } = event.dataTransfer;
              return types.some((type) => type === "Files");
            };
            const somePluginCanHandleRootDrop = canSomePluginHandleRootDrop(event);
            const hasFiles = doesEventHaveFiles(event);
            if (!somePluginCanHandleRootDrop && !hasFiles || this.opts.disabled || this.opts.disableLocalFiles && (hasFiles || !somePluginCanHandleRootDrop) || !this.uppy.getState().allowNewUpload) {
              event.dataTransfer.dropEffect = "none";
              clearTimeout(this.removeDragOverClassTimeout);
              return;
            }
            event.dataTransfer.dropEffect = "copy";
            clearTimeout(this.removeDragOverClassTimeout);
            this.setPluginState({
              isDraggingOver: true
            });
            (_this$opts$onDragOver = (_this$opts = this.opts).onDragOver) == null ? void 0 : _this$opts$onDragOver.call(_this$opts, event);
          };
          this.handleDragLeave = (event) => {
            var _this$opts$onDragLeav, _this$opts2;
            event.preventDefault();
            event.stopPropagation();
            clearTimeout(this.removeDragOverClassTimeout);
            this.removeDragOverClassTimeout = setTimeout(() => {
              this.setPluginState({
                isDraggingOver: false
              });
            }, 50);
            (_this$opts$onDragLeav = (_this$opts2 = this.opts).onDragLeave) == null ? void 0 : _this$opts$onDragLeav.call(_this$opts2, event);
          };
          this.handleDrop = async (event) => {
            var _this$opts$onDrop, _this$opts3;
            event.preventDefault();
            event.stopPropagation();
            clearTimeout(this.removeDragOverClassTimeout);
            this.setPluginState({
              isDraggingOver: false
            });
            this.uppy.iteratePlugins((plugin) => {
              if (plugin.type === "acquirer") {
                plugin.handleRootDrop == null ? void 0 : plugin.handleRootDrop(event);
              }
            });
            let executedDropErrorOnce = false;
            const logDropError = (error) => {
              this.uppy.log(error, "error");
              if (!executedDropErrorOnce) {
                this.uppy.info(error.message, "error");
                executedDropErrorOnce = true;
              }
            };
            const files = await getDroppedFiles(event.dataTransfer, {
              logDropError
            });
            if (files.length > 0) {
              this.uppy.log("[Dashboard] Files dropped");
              this.addFiles(files);
            }
            (_this$opts$onDrop = (_this$opts3 = this.opts).onDrop) == null ? void 0 : _this$opts$onDrop.call(_this$opts3, event);
          };
          this.handleRequestThumbnail = (file) => {
            if (!this.opts.waitForThumbnailsBeforeUpload) {
              this.uppy.emit("thumbnail:request", file);
            }
          };
          this.handleCancelThumbnail = (file) => {
            if (!this.opts.waitForThumbnailsBeforeUpload) {
              this.uppy.emit("thumbnail:cancel", file);
            }
          };
          this.handleKeyDownInInline = (event) => {
            if (event.keyCode === TAB_KEY)
              trapFocus.forInline(event, this.getPluginState().activeOverlayType, this.el);
          };
          this.handlePasteOnBody = (event) => {
            const isFocusInOverlay = this.el.contains(document.activeElement);
            if (isFocusInOverlay) {
              this.handlePaste(event);
            }
          };
          this.handleComplete = (_ref) => {
            let {
              failed
            } = _ref;
            if (this.opts.closeAfterFinish && failed.length === 0) {
              this.requestCloseModal();
            }
          };
          this.handleCancelRestore = () => {
            this.uppy.emit("restore-canceled");
          };
          Object.defineProperty(this, _openFileEditorWhenFilesAdded, {
            writable: true,
            value: (files) => {
              const firstFile = files[0];
              if (this.canEditFile(firstFile)) {
                this.openFileEditor(firstFile);
              }
            }
          });
          this.initEvents = () => {
            if (this.opts.trigger && !this.opts.inline) {
              const showModalTrigger = findAllDOMElements(this.opts.trigger);
              if (showModalTrigger) {
                showModalTrigger.forEach((trigger) => trigger.addEventListener("click", this.openModal));
              } else {
                this.uppy.log("Dashboard modal trigger not found. Make sure `trigger` is set in Dashboard options, unless you are planning to call `dashboard.openModal()` method yourself", "warning");
              }
            }
            this.startListeningToResize();
            document.addEventListener("paste", this.handlePasteOnBody);
            this.uppy.on("plugin-remove", this.removeTarget);
            this.uppy.on("file-added", this.hideAllPanels);
            this.uppy.on("dashboard:modal-closed", this.hideAllPanels);
            this.uppy.on("file-editor:complete", this.hideAllPanels);
            this.uppy.on("complete", this.handleComplete);
            document.addEventListener("focus", this.recordIfFocusedOnUppyRecently, true);
            document.addEventListener("click", this.recordIfFocusedOnUppyRecently, true);
            if (this.opts.inline) {
              this.el.addEventListener("keydown", this.handleKeyDownInInline);
            }
            if (this.opts.autoOpenFileEditor) {
              this.uppy.on("files-added", _classPrivateFieldLooseBase(this, _openFileEditorWhenFilesAdded)[_openFileEditorWhenFilesAdded]);
            }
          };
          this.removeEvents = () => {
            const showModalTrigger = findAllDOMElements(this.opts.trigger);
            if (!this.opts.inline && showModalTrigger) {
              showModalTrigger.forEach((trigger) => trigger.removeEventListener("click", this.openModal));
            }
            this.stopListeningToResize();
            document.removeEventListener("paste", this.handlePasteOnBody);
            window.removeEventListener("popstate", this.handlePopState, false);
            this.uppy.off("plugin-remove", this.removeTarget);
            this.uppy.off("file-added", this.hideAllPanels);
            this.uppy.off("dashboard:modal-closed", this.hideAllPanels);
            this.uppy.off("file-editor:complete", this.hideAllPanels);
            this.uppy.off("complete", this.handleComplete);
            document.removeEventListener("focus", this.recordIfFocusedOnUppyRecently);
            document.removeEventListener("click", this.recordIfFocusedOnUppyRecently);
            if (this.opts.inline) {
              this.el.removeEventListener("keydown", this.handleKeyDownInInline);
            }
            if (this.opts.autoOpenFileEditor) {
              this.uppy.off("files-added", _classPrivateFieldLooseBase(this, _openFileEditorWhenFilesAdded)[_openFileEditorWhenFilesAdded]);
            }
          };
          this.superFocusOnEachUpdate = () => {
            const isFocusInUppy = this.el.contains(document.activeElement);
            const isFocusNowhere = document.activeElement === document.body || document.activeElement === null;
            const isInformerHidden = this.uppy.getState().info.length === 0;
            const isModal = !this.opts.inline;
            if (isInformerHidden && (isModal || isFocusInUppy || isFocusNowhere && this.ifFocusedOnUppyRecently)) {
              this.superFocus(this.el, this.getPluginState().activeOverlayType);
            } else {
              this.superFocus.cancel();
            }
          };
          this.afterUpdate = () => {
            if (this.opts.disabled && !this.dashboardIsDisabled) {
              this.disableAllFocusableElements(true);
              return;
            }
            if (!this.opts.disabled && this.dashboardIsDisabled) {
              this.disableAllFocusableElements(false);
            }
            this.superFocusOnEachUpdate();
          };
          this.saveFileCard = (meta, fileID) => {
            this.uppy.setFileMeta(fileID, meta);
            this.toggleFileCard(false, fileID);
          };
          Object.defineProperty(this, _attachRenderFunctionToTarget, {
            writable: true,
            value: (target) => {
              const plugin = this.uppy.getPlugin(target.id);
              return {
                ...target,
                icon: plugin.icon || this.opts.defaultPickerIcon,
                render: plugin.render
              };
            }
          });
          Object.defineProperty(this, _isTargetSupported, {
            writable: true,
            value: (target) => {
              const plugin = this.uppy.getPlugin(target.id);
              if (typeof plugin.isSupported !== "function") {
                return true;
              }
              return plugin.isSupported();
            }
          });
          Object.defineProperty(this, _getAcquirers, {
            writable: true,
            value: memoize((targets) => {
              return targets.filter((target) => target.type === "acquirer" && _classPrivateFieldLooseBase(this, _isTargetSupported)[_isTargetSupported](target)).map(_classPrivateFieldLooseBase(this, _attachRenderFunctionToTarget)[_attachRenderFunctionToTarget]);
            })
          });
          Object.defineProperty(this, _getProgressIndicators, {
            writable: true,
            value: memoize((targets) => {
              return targets.filter((target) => target.type === "progressindicator").map(_classPrivateFieldLooseBase(this, _attachRenderFunctionToTarget)[_attachRenderFunctionToTarget]);
            })
          });
          Object.defineProperty(this, _getEditors, {
            writable: true,
            value: memoize((targets) => {
              return targets.filter((target) => target.type === "editor").map(_classPrivateFieldLooseBase(this, _attachRenderFunctionToTarget)[_attachRenderFunctionToTarget]);
            })
          });
          this.render = (state) => {
            const pluginState = this.getPluginState();
            const {
              files,
              capabilities,
              allowNewUpload
            } = state;
            const {
              newFiles,
              uploadStartedFiles,
              completeFiles,
              erroredFiles,
              inProgressFiles,
              inProgressNotPausedFiles,
              processingFiles,
              isUploadStarted,
              isAllComplete,
              isAllErrored,
              isAllPaused
            } = this.uppy.getObjectOfFilesPerState();
            const acquirers = _classPrivateFieldLooseBase(this, _getAcquirers)[_getAcquirers](pluginState.targets);
            const progressindicators = _classPrivateFieldLooseBase(this, _getProgressIndicators)[_getProgressIndicators](pluginState.targets);
            const editors = _classPrivateFieldLooseBase(this, _getEditors)[_getEditors](pluginState.targets);
            let theme;
            if (this.opts.theme === "auto") {
              theme = capabilities.darkMode ? "dark" : "light";
            } else {
              theme = this.opts.theme;
            }
            if (["files", "folders", "both"].indexOf(this.opts.fileManagerSelectionType) < 0) {
              this.opts.fileManagerSelectionType = "files";
              console.warn(`Unsupported option for "fileManagerSelectionType". Using default of "${this.opts.fileManagerSelectionType}".`);
            }
            return DashboardUI({
              state,
              isHidden: pluginState.isHidden,
              files,
              newFiles,
              uploadStartedFiles,
              completeFiles,
              erroredFiles,
              inProgressFiles,
              inProgressNotPausedFiles,
              processingFiles,
              isUploadStarted,
              isAllComplete,
              isAllErrored,
              isAllPaused,
              totalFileCount: Object.keys(files).length,
              totalProgress: state.totalProgress,
              allowNewUpload,
              acquirers,
              theme,
              disabled: this.opts.disabled,
              disableLocalFiles: this.opts.disableLocalFiles,
              direction: this.opts.direction,
              activePickerPanel: pluginState.activePickerPanel,
              showFileEditor: pluginState.showFileEditor,
              saveFileEditor: this.saveFileEditor,
              disableAllFocusableElements: this.disableAllFocusableElements,
              animateOpenClose: this.opts.animateOpenClose,
              isClosing: pluginState.isClosing,
              progressindicators,
              editors,
              autoProceed: this.uppy.opts.autoProceed,
              id: this.id,
              closeModal: this.requestCloseModal,
              handleClickOutside: this.handleClickOutside,
              handleInputChange: this.handleInputChange,
              handlePaste: this.handlePaste,
              inline: this.opts.inline,
              showPanel: this.showPanel,
              hideAllPanels: this.hideAllPanels,
              i18n: this.i18n,
              i18nArray: this.i18nArray,
              uppy: this.uppy,
              note: this.opts.note,
              recoveredState: state.recoveredState,
              metaFields: pluginState.metaFields,
              resumableUploads: capabilities.resumableUploads || false,
              individualCancellation: capabilities.individualCancellation,
              isMobileDevice: capabilities.isMobileDevice,
              fileCardFor: pluginState.fileCardFor,
              toggleFileCard: this.toggleFileCard,
              toggleAddFilesPanel: this.toggleAddFilesPanel,
              showAddFilesPanel: pluginState.showAddFilesPanel,
              saveFileCard: this.saveFileCard,
              openFileEditor: this.openFileEditor,
              canEditFile: this.canEditFile,
              width: this.opts.width,
              height: this.opts.height,
              showLinkToFileUploadResult: this.opts.showLinkToFileUploadResult,
              fileManagerSelectionType: this.opts.fileManagerSelectionType,
              proudlyDisplayPoweredByUppy: this.opts.proudlyDisplayPoweredByUppy,
              hideCancelButton: this.opts.hideCancelButton,
              hideRetryButton: this.opts.hideRetryButton,
              hidePauseResumeButton: this.opts.hidePauseResumeButton,
              showRemoveButtonAfterComplete: this.opts.showRemoveButtonAfterComplete,
              containerWidth: pluginState.containerWidth,
              containerHeight: pluginState.containerHeight,
              areInsidesReadyToBeVisible: pluginState.areInsidesReadyToBeVisible,
              isTargetDOMEl: this.isTargetDOMEl,
              parentElement: this.el,
              allowedFileTypes: this.uppy.opts.restrictions.allowedFileTypes,
              maxNumberOfFiles: this.uppy.opts.restrictions.maxNumberOfFiles,
              requiredMetaFields: this.uppy.opts.restrictions.requiredMetaFields,
              showSelectedFiles: this.opts.showSelectedFiles,
              handleCancelRestore: this.handleCancelRestore,
              handleRequestThumbnail: this.handleRequestThumbnail,
              handleCancelThumbnail: this.handleCancelThumbnail,
              isDraggingOver: pluginState.isDraggingOver,
              handleDragOver: this.handleDragOver,
              handleDragLeave: this.handleDragLeave,
              handleDrop: this.handleDrop
            });
          };
          this.discoverProviderPlugins = () => {
            this.uppy.iteratePlugins((plugin) => {
              if (plugin && !plugin.target && plugin.opts && plugin.opts.target === this.constructor) {
                this.addTarget(plugin);
              }
            });
          };
          this.install = () => {
            this.setPluginState({
              isHidden: true,
              fileCardFor: null,
              activeOverlayType: null,
              showAddFilesPanel: false,
              activePickerPanel: false,
              showFileEditor: false,
              metaFields: this.opts.metaFields,
              targets: [],
              areInsidesReadyToBeVisible: false,
              isDraggingOver: false
            });
            const {
              inline,
              closeAfterFinish
            } = this.opts;
            if (inline && closeAfterFinish) {
              throw new Error("[Dashboard] `closeAfterFinish: true` cannot be used on an inline Dashboard, because an inline Dashboard cannot be closed at all. Either set `inline: false`, or disable the `closeAfterFinish` option.");
            }
            const {
              allowMultipleUploads,
              allowMultipleUploadBatches
            } = this.uppy.opts;
            if ((allowMultipleUploads || allowMultipleUploadBatches) && closeAfterFinish) {
              this.uppy.log("[Dashboard] When using `closeAfterFinish`, we recommended setting the `allowMultipleUploadBatches` option to `false` in the Uppy constructor. See https://uppy.io/docs/uppy/#allowMultipleUploads-true", "warning");
            }
            const {
              target
            } = this.opts;
            if (target) {
              this.mount(target, this);
            }
            const plugins = this.opts.plugins || [];
            plugins.forEach((pluginID) => {
              const plugin = this.uppy.getPlugin(pluginID);
              if (plugin) {
                plugin.mount(this, plugin);
              }
            });
            if (!this.opts.disableStatusBar) {
              this.uppy.use(StatusBar, {
                id: `${this.id}:StatusBar`,
                target: this,
                hideUploadButton: this.opts.hideUploadButton,
                hideRetryButton: this.opts.hideRetryButton,
                hidePauseResumeButton: this.opts.hidePauseResumeButton,
                hideCancelButton: this.opts.hideCancelButton,
                showProgressDetails: this.opts.showProgressDetails,
                hideAfterFinish: this.opts.hideProgressAfterFinish,
                locale: this.opts.locale,
                doneButtonHandler: this.opts.doneButtonHandler
              });
            }
            if (!this.opts.disableInformer) {
              this.uppy.use(Informer, {
                id: `${this.id}:Informer`,
                target: this
              });
            }
            if (!this.opts.disableThumbnailGenerator) {
              this.uppy.use(ThumbnailGenerator, {
                id: `${this.id}:ThumbnailGenerator`,
                thumbnailWidth: this.opts.thumbnailWidth,
                thumbnailHeight: this.opts.thumbnailHeight,
                thumbnailType: this.opts.thumbnailType,
                waitForThumbnailsBeforeUpload: this.opts.waitForThumbnailsBeforeUpload,
                lazy: !this.opts.waitForThumbnailsBeforeUpload
              });
            }
            this.darkModeMediaQuery = typeof window !== "undefined" && window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
            const isDarkModeOnFromTheStart = this.darkModeMediaQuery ? this.darkModeMediaQuery.matches : false;
            this.uppy.log(`[Dashboard] Dark mode is ${isDarkModeOnFromTheStart ? "on" : "off"}`);
            this.setDarkModeCapability(isDarkModeOnFromTheStart);
            if (this.opts.theme === "auto") {
              this.darkModeMediaQuery.addListener(this.handleSystemDarkModeChange);
            }
            this.discoverProviderPlugins();
            this.initEvents();
          };
          this.uninstall = () => {
            if (!this.opts.disableInformer) {
              const informer = this.uppy.getPlugin(`${this.id}:Informer`);
              if (informer)
                this.uppy.removePlugin(informer);
            }
            if (!this.opts.disableStatusBar) {
              const statusBar = this.uppy.getPlugin(`${this.id}:StatusBar`);
              if (statusBar)
                this.uppy.removePlugin(statusBar);
            }
            if (!this.opts.disableThumbnailGenerator) {
              const thumbnail = this.uppy.getPlugin(`${this.id}:ThumbnailGenerator`);
              if (thumbnail)
                this.uppy.removePlugin(thumbnail);
            }
            const plugins = this.opts.plugins || [];
            plugins.forEach((pluginID) => {
              const plugin = this.uppy.getPlugin(pluginID);
              if (plugin)
                plugin.unmount();
            });
            if (this.opts.theme === "auto") {
              this.darkModeMediaQuery.removeListener(this.handleSystemDarkModeChange);
            }
            this.unmount();
            this.removeEvents();
          };
          this.id = this.opts.id || "Dashboard";
          this.title = "Dashboard";
          this.type = "orchestrator";
          this.modalName = `uppy-Dashboard-${nanoid()}`;
          this.defaultLocale = locale;
          const defaultOptions = {
            target: "body",
            metaFields: [],
            trigger: null,
            inline: false,
            width: 750,
            height: 550,
            thumbnailWidth: 280,
            thumbnailType: "image/jpeg",
            waitForThumbnailsBeforeUpload: false,
            defaultPickerIcon,
            showLinkToFileUploadResult: false,
            showProgressDetails: false,
            hideUploadButton: false,
            hideCancelButton: false,
            hideRetryButton: false,
            hidePauseResumeButton: false,
            hideProgressAfterFinish: false,
            doneButtonHandler: () => {
              this.uppy.reset();
              this.requestCloseModal();
            },
            note: null,
            closeModalOnClickOutside: false,
            closeAfterFinish: false,
            disableStatusBar: false,
            disableInformer: false,
            disableThumbnailGenerator: false,
            disablePageScrollWhenModalOpen: true,
            animateOpenClose: true,
            fileManagerSelectionType: "files",
            proudlyDisplayPoweredByUppy: true,
            onRequestCloseModal: () => this.closeModal(),
            showSelectedFiles: true,
            showRemoveButtonAfterComplete: false,
            browserBackButtonClose: false,
            theme: "light",
            autoOpenFileEditor: false,
            disabled: false,
            disableLocalFiles: false
          };
          this.opts = {
            ...defaultOptions,
            ..._opts
          };
          this.i18nInit();
          this.superFocus = createSuperFocus();
          this.ifFocusedOnUppyRecently = false;
          this.makeDashboardInsidesVisibleAnywayTimeout = null;
          this.removeDragOverClassTimeout = null;
        }
        onMount() {
          const element = this.el;
          const direction = getTextDirection(element);
          if (!direction) {
            element.dir = "ltr";
          }
        }
      }), _class.VERSION = "2.1.4", _temp);
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
        constructor(uppy, opts) {
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
          this.uppy = uppy;
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
        return id.split("-").map((s3) => s3.charAt(0).toUpperCase() + s3.slice(1)).join(" ");
      };
      module.exports = class Provider extends RequestClient {
        constructor(uppy, opts) {
          super(uppy, opts);
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
        return id.split("-").map((s3) => s3.charAt(0).toUpperCase() + s3.slice(1)).join(" ");
      };
      module.exports = class SearchProvider extends RequestClient {
        constructor(uppy, opts) {
          super(uppy, opts);
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
            value: (e3) => {
              try {
                const message = JSON.parse(e3.data);
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
  var require_lib7 = __commonJS({
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

  // ../packages/@uppy/provider-views/lib/ProviderView/AuthView.js
  var require_AuthView = __commonJS({
    "../packages/@uppy/provider-views/lib/ProviderView/AuthView.js"(exports, module) {
      var {
        h: h3
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      function GoogleIcon() {
        return h3("svg", {
          width: "26",
          height: "26",
          viewBox: "0 0 26 26",
          xmlns: "http://www.w3.org/2000/svg"
        }, h3("g", {
          fill: "none",
          "fill-rule": "evenodd"
        }, h3("circle", {
          fill: "#FFF",
          cx: "13",
          cy: "13",
          r: "13"
        }), h3("path", {
          d: "M21.64 13.205c0-.639-.057-1.252-.164-1.841H13v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z",
          fill: "#4285F4",
          "fill-rule": "nonzero"
        }), h3("path", {
          d: "M13 22c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H4.957v2.332A8.997 8.997 0 0013 22z",
          fill: "#34A853",
          "fill-rule": "nonzero"
        }), h3("path", {
          d: "M7.964 14.71A5.41 5.41 0 017.682 13c0-.593.102-1.17.282-1.71V8.958H4.957A8.996 8.996 0 004 13c0 1.452.348 2.827.957 4.042l3.007-2.332z",
          fill: "#FBBC05",
          "fill-rule": "nonzero"
        }), h3("path", {
          d: "M13 7.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C17.463 4.891 15.426 4 13 4a8.997 8.997 0 00-8.043 4.958l3.007 2.332C8.672 9.163 10.656 7.58 13 7.58z",
          fill: "#EA4335",
          "fill-rule": "nonzero"
        }), h3("path", {
          d: "M4 4h18v18H4z"
        })));
      }
      function AuthView(props) {
        const {
          pluginName,
          pluginIcon,
          i18nArray,
          handleAuth
        } = props;
        const isGoogleDrive = pluginName === "Google Drive";
        const pluginNameComponent = h3("span", {
          className: "uppy-Provider-authTitleName"
        }, pluginName, h3("br", null));
        return h3("div", {
          className: "uppy-Provider-auth"
        }, h3("div", {
          className: "uppy-Provider-authIcon"
        }, pluginIcon()), h3("div", {
          className: "uppy-Provider-authTitle"
        }, i18nArray("authenticateWithTitle", {
          pluginName: pluginNameComponent
        })), isGoogleDrive ? h3("button", {
          type: "button",
          className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Provider-authBtn uppy-Provider-btn-google",
          onClick: handleAuth,
          "data-uppy-super-focusable": true
        }, h3(GoogleIcon, null), i18nArray("signInWithGoogle")) : h3("button", {
          type: "button",
          className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Provider-authBtn",
          onClick: handleAuth,
          "data-uppy-super-focusable": true
        }, i18nArray("authenticateWith", {
          pluginName
        })));
      }
      module.exports = AuthView;
    }
  });

  // ../packages/@uppy/provider-views/lib/ProviderView/User.js
  var require_User = __commonJS({
    "../packages/@uppy/provider-views/lib/ProviderView/User.js"(exports, module) {
      var {
        h: h3
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      module.exports = (props) => {
        return [h3("span", {
          className: "uppy-ProviderBrowser-user",
          key: "username"
        }, props.username), h3("button", {
          type: "button",
          onClick: props.logout,
          className: "uppy-u-reset uppy-ProviderBrowser-userLogout",
          key: "logout"
        }, props.i18n("logOut"))];
      };
    }
  });

  // ../packages/@uppy/provider-views/lib/Breadcrumbs.js
  var require_Breadcrumbs = __commonJS({
    "../packages/@uppy/provider-views/lib/Breadcrumbs.js"(exports, module) {
      var {
        h: h3,
        Fragment
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      var Breadcrumb = (props) => {
        const {
          getFolder,
          title,
          isLast
        } = props;
        return h3(Fragment, null, h3("button", {
          type: "button",
          className: "uppy-u-reset",
          onClick: getFolder
        }, title), !isLast ? " / " : "");
      };
      module.exports = (props) => {
        const {
          getFolder,
          title,
          breadcrumbsIcon,
          directories
        } = props;
        return h3("div", {
          className: "uppy-Provider-breadcrumbs"
        }, h3("div", {
          className: "uppy-Provider-breadcrumbsIcon"
        }, breadcrumbsIcon), directories.map((directory, i3) => h3(Breadcrumb, {
          key: directory.id,
          getFolder: () => getFolder(directory.id),
          title: i3 === 0 ? title : directory.title,
          isLast: i3 + 1 === directories.length
        })));
      };
    }
  });

  // ../packages/@uppy/provider-views/lib/ProviderView/Header.js
  var require_Header = __commonJS({
    "../packages/@uppy/provider-views/lib/ProviderView/Header.js"(exports, module) {
      var User = require_User();
      var Breadcrumbs = require_Breadcrumbs();
      module.exports = (props) => {
        const components = [];
        if (props.showBreadcrumbs) {
          components.push(Breadcrumbs({
            getFolder: props.getFolder,
            directories: props.directories,
            breadcrumbsIcon: props.pluginIcon && props.pluginIcon(),
            title: props.title
          }));
        }
        components.push(User({
          logout: props.logout,
          username: props.username,
          i18n: props.i18n
        }));
        return components;
      };
    }
  });

  // ../packages/@uppy/utils/lib/remoteFileObjToLocal.js
  var require_remoteFileObjToLocal = __commonJS({
    "../packages/@uppy/utils/lib/remoteFileObjToLocal.js"(exports, module) {
      var getFileNameAndExtension = require_getFileNameAndExtension();
      module.exports = function remoteFileObjToLocal(file) {
        return {
          ...file,
          type: file.mimeType,
          extension: file.name ? getFileNameAndExtension(file.name).extension : null
        };
      };
    }
  });

  // ../packages/@uppy/provider-views/lib/Filter.js
  var require_Filter = __commonJS({
    "../packages/@uppy/provider-views/lib/Filter.js"(exports, module) {
      var {
        h: h3,
        Component
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      module.exports = class Filter extends Component {
        constructor(props) {
          super(props);
          this.preventEnterPress = this.preventEnterPress.bind(this);
        }
        preventEnterPress(ev) {
          if (ev.keyCode === 13) {
            ev.stopPropagation();
            ev.preventDefault();
          }
        }
        render() {
          return h3("div", {
            className: "uppy-ProviderBrowser-filter"
          }, h3("input", {
            className: "uppy-u-reset uppy-ProviderBrowser-filterInput",
            type: "text",
            placeholder: this.props.i18n("filter"),
            "aria-label": this.props.i18n("filter"),
            onKeyUp: this.preventEnterPress,
            onKeyDown: this.preventEnterPress,
            onKeyPress: this.preventEnterPress,
            onInput: (e3) => this.props.filterQuery(e3),
            value: this.props.filterInput
          }), h3("svg", {
            "aria-hidden": "true",
            focusable: "false",
            className: "uppy-c-icon uppy-ProviderBrowser-filterIcon",
            width: "12",
            height: "12",
            viewBox: "0 0 12 12"
          }, h3("path", {
            d: "M8.638 7.99l3.172 3.172a.492.492 0 1 1-.697.697L7.91 8.656a4.977 4.977 0 0 1-2.983.983C2.206 9.639 0 7.481 0 4.819 0 2.158 2.206 0 4.927 0c2.721 0 4.927 2.158 4.927 4.82a4.74 4.74 0 0 1-1.216 3.17zm-3.71.685c2.176 0 3.94-1.726 3.94-3.856 0-2.129-1.764-3.855-3.94-3.855C2.75.964.984 2.69.984 4.819c0 2.13 1.765 3.856 3.942 3.856z"
          })), this.props.filterInput && h3("button", {
            className: "uppy-u-reset uppy-ProviderBrowser-filterClose",
            type: "button",
            "aria-label": this.props.i18n("resetFilter"),
            title: this.props.i18n("resetFilter"),
            onClick: this.props.filterQuery
          }, h3("svg", {
            "aria-hidden": "true",
            focusable: "false",
            className: "uppy-c-icon",
            viewBox: "0 0 19 19"
          }, h3("path", {
            d: "M17.318 17.232L9.94 9.854 9.586 9.5l-.354.354-7.378 7.378h.707l-.62-.62v.706L9.318 9.94l.354-.354-.354-.354L1.94 1.854v.707l.62-.62h-.706l7.378 7.378.354.354.354-.354 7.378-7.378h-.707l.622.62v-.706L9.854 9.232l-.354.354.354.354 7.378 7.378.708-.707-7.38-7.378v.708l7.38-7.38.353-.353-.353-.353-.622-.622-.353-.353-.354.352-7.378 7.38h.708L2.56 1.23 2.208.88l-.353.353-.622.62-.353.355.352.353 7.38 7.38v-.708l-7.38 7.38-.353.353.352.353.622.622.353.353.354-.353 7.38-7.38h-.708l7.38 7.38z"
          }))));
        }
      };
    }
  });

  // ../packages/@uppy/provider-views/lib/FooterActions.js
  var require_FooterActions = __commonJS({
    "../packages/@uppy/provider-views/lib/FooterActions.js"(exports, module) {
      var {
        h: h3
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      module.exports = (props) => {
        return h3("div", {
          className: "uppy-ProviderBrowser-footer"
        }, h3("button", {
          className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary",
          onClick: props.done,
          type: "button"
        }, props.i18n("selectX", {
          smart_count: props.selected
        })), h3("button", {
          className: "uppy-u-reset uppy-c-btn uppy-c-btn-link",
          onClick: props.cancel,
          type: "button"
        }, props.i18n("cancel")));
      };
    }
  });

  // ../packages/@uppy/provider-views/lib/Item/components/ItemIcon.js
  var require_ItemIcon = __commonJS({
    "../packages/@uppy/provider-views/lib/Item/components/ItemIcon.js"(exports, module) {
      var {
        h: h3
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      function FileIcon() {
        return h3("svg", {
          "aria-hidden": "true",
          focusable: "false",
          className: "uppy-c-icon",
          width: 11,
          height: 14.5,
          viewBox: "0 0 44 58"
        }, h3("path", {
          d: "M27.437.517a1 1 0 0 0-.094.03H4.25C2.037.548.217 2.368.217 4.58v48.405c0 2.212 1.82 4.03 4.03 4.03H39.03c2.21 0 4.03-1.818 4.03-4.03V15.61a1 1 0 0 0-.03-.28 1 1 0 0 0 0-.093 1 1 0 0 0-.03-.032 1 1 0 0 0 0-.03 1 1 0 0 0-.032-.063 1 1 0 0 0-.03-.063 1 1 0 0 0-.032 0 1 1 0 0 0-.03-.063 1 1 0 0 0-.032-.03 1 1 0 0 0-.03-.063 1 1 0 0 0-.063-.062l-14.593-14a1 1 0 0 0-.062-.062A1 1 0 0 0 28 .708a1 1 0 0 0-.374-.157 1 1 0 0 0-.156 0 1 1 0 0 0-.03-.03l-.003-.003zM4.25 2.547h22.218v9.97c0 2.21 1.82 4.03 4.03 4.03h10.564v36.438a2.02 2.02 0 0 1-2.032 2.032H4.25c-1.13 0-2.032-.9-2.032-2.032V4.58c0-1.13.902-2.032 2.03-2.032zm24.218 1.345l10.375 9.937.75.718H30.5c-1.13 0-2.032-.9-2.032-2.03V3.89z"
        }));
      }
      function FolderIcon() {
        return h3("svg", {
          "aria-hidden": "true",
          focusable: "false",
          className: "uppy-c-icon",
          style: {
            minWidth: 16,
            marginRight: 3
          },
          viewBox: "0 0 276.157 276.157"
        }, h3("path", {
          d: "M273.08 101.378c-3.3-4.65-8.86-7.32-15.254-7.32h-24.34V67.59c0-10.2-8.3-18.5-18.5-18.5h-85.322c-3.63 0-9.295-2.875-11.436-5.805l-6.386-8.735c-4.982-6.814-15.104-11.954-23.546-11.954H58.73c-9.292 0-18.638 6.608-21.737 15.372l-2.033 5.752c-.958 2.71-4.72 5.37-7.596 5.37H18.5C8.3 49.09 0 57.39 0 67.59v167.07c0 .886.16 1.73.443 2.52.152 3.306 1.18 6.424 3.053 9.064 3.3 4.652 8.86 7.32 15.255 7.32h188.487c11.395 0 23.27-8.425 27.035-19.18l40.677-116.188c2.11-6.035 1.43-12.164-1.87-16.816zM18.5 64.088h8.864c9.295 0 18.64-6.607 21.738-15.37l2.032-5.75c.96-2.712 4.722-5.373 7.597-5.373h29.565c3.63 0 9.295 2.876 11.437 5.806l6.386 8.735c4.982 6.815 15.104 11.954 23.546 11.954h85.322c1.898 0 3.5 1.602 3.5 3.5v26.47H69.34c-11.395 0-23.27 8.423-27.035 19.178L15 191.23V67.59c0-1.898 1.603-3.5 3.5-3.5zm242.29 49.15l-40.676 116.188c-1.674 4.78-7.812 9.135-12.877 9.135H18.75c-1.447 0-2.576-.372-3.02-.997-.442-.625-.422-1.814.057-3.18l40.677-116.19c1.674-4.78 7.812-9.134 12.877-9.134h188.487c1.448 0 2.577.372 3.02.997.443.625.423 1.814-.056 3.18z"
        }));
      }
      function VideoIcon() {
        return h3("svg", {
          "aria-hidden": "true",
          focusable: "false",
          style: {
            width: 16,
            marginRight: 4
          },
          viewBox: "0 0 58 58"
        }, h3("path", {
          d: "M36.537 28.156l-11-7a1.005 1.005 0 0 0-1.02-.033C24.2 21.3 24 21.635 24 22v14a1 1 0 0 0 1.537.844l11-7a1.002 1.002 0 0 0 0-1.688zM26 34.18V23.82L34.137 29 26 34.18z"
        }), h3("path", {
          d: "M57 6H1a1 1 0 0 0-1 1v44a1 1 0 0 0 1 1h56a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1zM10 28H2v-9h8v9zm-8 2h8v9H2v-9zm10 10V8h34v42H12V40zm44-12h-8v-9h8v9zm-8 2h8v9h-8v-9zm8-22v9h-8V8h8zM2 8h8v9H2V8zm0 42v-9h8v9H2zm54 0h-8v-9h8v9z"
        }));
      }
      module.exports = (props) => {
        if (props.itemIconString === null)
          return;
        switch (props.itemIconString) {
          case "file":
            return h3(FileIcon, null);
          case "folder":
            return h3(FolderIcon, null);
          case "video":
            return h3(VideoIcon, null);
          default:
            return h3("img", {
              src: props.itemIconString,
              alt: props.alt
            });
        }
      };
    }
  });

  // ../packages/@uppy/provider-views/lib/Item/components/GridLi.js
  var require_GridLi = __commonJS({
    "../packages/@uppy/provider-views/lib/Item/components/GridLi.js"(exports, module) {
      var {
        h: h3
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      function GridListItem(props) {
        const {
          className,
          isDisabled,
          restrictionReason,
          isChecked,
          title,
          itemIconEl,
          showTitles,
          toggleCheckbox,
          id,
          children
        } = props;
        return h3("li", {
          className,
          title: isDisabled ? restrictionReason : null
        }, h3("input", {
          type: "checkbox",
          className: `uppy-u-reset uppy-ProviderBrowserItem-checkbox ${isChecked ? "uppy-ProviderBrowserItem-checkbox--is-checked" : ""} uppy-ProviderBrowserItem-checkbox--grid`,
          onChange: toggleCheckbox,
          name: "listitem",
          id,
          checked: isChecked,
          disabled: isDisabled,
          "data-uppy-super-focusable": true
        }), h3("label", {
          htmlFor: id,
          "aria-label": title,
          className: "uppy-u-reset uppy-ProviderBrowserItem-inner"
        }, h3("span", {
          className: "uppy-ProviderBrowserItem-inner-relative"
        }, itemIconEl, showTitles && title, children)));
      }
      module.exports = GridListItem;
    }
  });

  // ../packages/@uppy/provider-views/lib/Item/components/ListLi.js
  var require_ListLi = __commonJS({
    "../packages/@uppy/provider-views/lib/Item/components/ListLi.js"(exports, module) {
      var {
        h: h3
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      function ListItem(props) {
        const {
          className,
          isDisabled,
          restrictionReason,
          isCheckboxDisabled,
          isChecked,
          toggleCheckbox,
          type,
          id,
          itemIconEl,
          title,
          handleFolderClick,
          showTitles,
          i18n
        } = props;
        return h3("li", {
          className,
          title: isDisabled ? restrictionReason : null
        }, !isCheckboxDisabled ? h3("input", {
          type: "checkbox",
          className: `uppy-u-reset uppy-ProviderBrowserItem-checkbox ${isChecked ? "uppy-ProviderBrowserItem-checkbox--is-checked" : ""}`,
          onChange: toggleCheckbox,
          name: "listitem",
          id,
          checked: isChecked,
          "aria-label": type === "file" ? null : i18n("allFilesFromFolderNamed", {
            name: title
          }),
          disabled: isDisabled,
          "data-uppy-super-focusable": true
        }) : null, type === "file" ? h3("label", {
          htmlFor: id,
          className: "uppy-u-reset uppy-ProviderBrowserItem-inner"
        }, h3("div", {
          className: "uppy-ProviderBrowserItem-iconWrap"
        }, itemIconEl), showTitles && title) : h3("button", {
          type: "button",
          className: "uppy-u-reset uppy-ProviderBrowserItem-inner",
          onClick: handleFolderClick,
          "aria-label": i18n("openFolderNamed", {
            name: title
          })
        }, h3("div", {
          className: "uppy-ProviderBrowserItem-iconWrap"
        }, itemIconEl), showTitles && h3("span", null, title)));
      }
      module.exports = ListItem;
    }
  });

  // ../packages/@uppy/provider-views/lib/Item/index.js
  var require_Item = __commonJS({
    "../packages/@uppy/provider-views/lib/Item/index.js"(exports, module) {
      function _extends() {
        _extends = Object.assign || function(target) {
          for (var i3 = 1; i3 < arguments.length; i3++) {
            var source = arguments[i3];
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
      var {
        h: h3
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      var classNames = require_classnames();
      var ItemIcon = require_ItemIcon();
      var GridListItem = require_GridLi();
      var ListItem = require_ListLi();
      module.exports = (props) => {
        const {
          author
        } = props;
        const itemIconString = props.getItemIcon();
        const className = classNames("uppy-ProviderBrowserItem", {
          "uppy-ProviderBrowserItem--selected": props.isChecked
        }, {
          "uppy-ProviderBrowserItem--disabled": props.isDisabled
        }, {
          "uppy-ProviderBrowserItem--noPreview": itemIconString === "video"
        });
        const itemIconEl = h3(ItemIcon, {
          itemIconString
        });
        switch (props.viewType) {
          case "grid":
            return h3(GridListItem, _extends({}, props, {
              className,
              itemIconEl
            }));
          case "list":
            return h3(ListItem, _extends({}, props, {
              className,
              itemIconEl
            }));
          case "unsplash":
            return h3(GridListItem, _extends({}, props, {
              className,
              itemIconEl
            }), h3("a", {
              href: `${author.url}?utm_source=Companion&utm_medium=referral`,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "uppy-ProviderBrowserItem-author"
            }, author.name));
          default:
            throw new Error(`There is no such type ${props.viewType}`);
        }
      };
    }
  });

  // ../packages/@uppy/provider-views/lib/Browser.js
  var require_Browser = __commonJS({
    "../packages/@uppy/provider-views/lib/Browser.js"(exports, module) {
      var {
        h: h3
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      var classNames = require_classnames();
      var remoteFileObjToLocal = require_remoteFileObjToLocal();
      var Filter = require_Filter();
      var FooterActions = require_FooterActions();
      var Item = require_Item();
      var VIRTUAL_SHARED_DIR = "shared-with-me";
      function Browser(props) {
        const {
          currentSelection,
          folders,
          files,
          uppyFiles,
          viewType,
          headerComponent,
          showBreadcrumbs,
          isChecked,
          toggleCheckbox,
          handleScroll,
          showTitles,
          i18n,
          validateRestrictions,
          showFilter,
          filterQuery,
          filterInput,
          getNextFolder,
          cancel,
          done,
          columns
        } = props;
        const selected = currentSelection.length;
        return h3("div", {
          className: classNames("uppy-ProviderBrowser", `uppy-ProviderBrowser-viewType--${viewType}`)
        }, h3("div", {
          className: "uppy-ProviderBrowser-header"
        }, h3("div", {
          className: classNames("uppy-ProviderBrowser-headerBar", !showBreadcrumbs && "uppy-ProviderBrowser-headerBar--simple")
        }, headerComponent)), showFilter && h3(Filter, {
          i18n,
          filterQuery,
          filterInput
        }), (() => {
          if (!folders.length && !files.length) {
            return h3("div", {
              className: "uppy-Provider-empty"
            }, props.i18n("noFilesFound"));
          }
          return h3("div", {
            className: "uppy-ProviderBrowser-body"
          }, h3("ul", {
            className: "uppy-ProviderBrowser-list",
            onScroll: handleScroll,
            role: "listbox",
            tabIndex: "-1"
          }, folders.map((folder) => {
            var _isChecked;
            return Item({
              columns,
              showTitles,
              viewType,
              i18n,
              id: folder.id,
              title: folder.name,
              getItemIcon: () => folder.icon,
              isChecked: isChecked(folder),
              toggleCheckbox: (event) => toggleCheckbox(event, folder),
              type: "folder",
              isDisabled: (_isChecked = isChecked(folder)) == null ? void 0 : _isChecked.loading,
              isCheckboxDisabled: folder.id === VIRTUAL_SHARED_DIR,
              handleFolderClick: () => getNextFolder(folder)
            });
          }), files.map((file) => {
            const validated = validateRestrictions(remoteFileObjToLocal(file), [...uppyFiles, ...currentSelection]);
            return Item({
              id: file.id,
              title: file.name,
              author: file.author,
              getItemIcon: () => file.icon,
              isChecked: isChecked(file),
              toggleCheckbox: (event) => toggleCheckbox(event, file),
              columns,
              showTitles,
              viewType,
              i18n,
              type: "file",
              isDisabled: !validated.result && !isChecked(file),
              restrictionReason: validated.reason
            });
          })));
        })(), selected > 0 && h3(FooterActions, {
          selected,
          done,
          cancel,
          i18n
        }));
      }
      module.exports = Browser;
    }
  });

  // ../packages/@uppy/provider-views/lib/Loader.js
  var require_Loader = __commonJS({
    "../packages/@uppy/provider-views/lib/Loader.js"(exports, module) {
      var {
        h: h3
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      module.exports = (props) => {
        return h3("div", {
          className: "uppy-Provider-loading"
        }, h3("span", null, props.i18n("loading")));
      };
    }
  });

  // ../packages/@uppy/provider-views/lib/CloseWrapper.js
  var require_CloseWrapper = __commonJS({
    "../packages/@uppy/provider-views/lib/CloseWrapper.js"(exports, module) {
      var {
        Component,
        toChildArray
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      module.exports = class CloseWrapper extends Component {
        componentWillUnmount() {
          const {
            onUnmount
          } = this.props;
          onUnmount();
        }
        render() {
          const {
            children
          } = this.props;
          return toChildArray(children)[0];
        }
      };
    }
  });

  // ../packages/@uppy/provider-views/lib/SharedHandler.js
  var require_SharedHandler = __commonJS({
    "../packages/@uppy/provider-views/lib/SharedHandler.js"(exports, module) {
      var remoteFileObjToLocal = require_remoteFileObjToLocal();
      module.exports = class SharedHandler {
        constructor(plugin) {
          this.plugin = plugin;
          this.filterItems = this.filterItems.bind(this);
          this.toggleCheckbox = this.toggleCheckbox.bind(this);
          this.isChecked = this.isChecked.bind(this);
          this.loaderWrapper = this.loaderWrapper.bind(this);
        }
        filterItems(items) {
          const state = this.plugin.getPluginState();
          if (!state.filterInput || state.filterInput === "") {
            return items;
          }
          return items.filter((folder) => {
            return folder.name.toLowerCase().indexOf(state.filterInput.toLowerCase()) !== -1;
          });
        }
        toggleCheckbox(e3, file) {
          e3.stopPropagation();
          e3.preventDefault();
          e3.currentTarget.focus();
          const {
            folders,
            files
          } = this.plugin.getPluginState();
          const items = this.filterItems(folders.concat(files));
          if (this.lastCheckbox && e3.shiftKey) {
            const prevIndex = items.indexOf(this.lastCheckbox);
            const currentIndex = items.indexOf(file);
            const currentSelection2 = prevIndex < currentIndex ? items.slice(prevIndex, currentIndex + 1) : items.slice(currentIndex, prevIndex + 1);
            const reducedCurrentSelection = [];
            for (const item of currentSelection2) {
              const {
                uppy
              } = this.plugin;
              const validatedRestrictions = uppy.validateRestrictions(remoteFileObjToLocal(item), [...uppy.getFiles(), ...reducedCurrentSelection]);
              if (validatedRestrictions.result) {
                reducedCurrentSelection.push(item);
              } else {
                uppy.info({
                  message: validatedRestrictions.reason
                }, "error", uppy.opts.infoTimeout);
              }
            }
            this.plugin.setPluginState({
              currentSelection: reducedCurrentSelection
            });
            return;
          }
          this.lastCheckbox = file;
          const {
            currentSelection
          } = this.plugin.getPluginState();
          if (this.isChecked(file)) {
            this.plugin.setPluginState({
              currentSelection: currentSelection.filter((item) => item.id !== file.id)
            });
          } else {
            this.plugin.setPluginState({
              currentSelection: currentSelection.concat([file])
            });
          }
        }
        isChecked(file) {
          const {
            currentSelection
          } = this.plugin.getPluginState();
          return currentSelection.some((item) => item.id === file.id);
        }
        loaderWrapper(promise, then, catch_) {
          promise.then((result) => {
            this.plugin.setPluginState({
              loading: false
            });
            then(result);
          }).catch((err) => {
            this.plugin.setPluginState({
              loading: false
            });
            catch_(err);
          });
          this.plugin.setPluginState({
            loading: true
          });
        }
      };
    }
  });

  // ../packages/@uppy/provider-views/lib/View.js
  var require_View = __commonJS({
    "../packages/@uppy/provider-views/lib/View.js"(exports, module) {
      var getFileType = require_getFileType();
      var isPreviewSupported = require_isPreviewSupported();
      var generateFileID = require_generateFileID();
      var SharedHandler = require_SharedHandler();
      module.exports = class View {
        constructor(plugin, opts) {
          this.plugin = plugin;
          this.provider = opts.provider;
          this.sharedHandler = new SharedHandler(plugin);
          this.isHandlingScroll = false;
          this.preFirstRender = this.preFirstRender.bind(this);
          this.handleError = this.handleError.bind(this);
          this.addFile = this.addFile.bind(this);
          this.clearSelection = this.clearSelection.bind(this);
          this.cancelPicking = this.cancelPicking.bind(this);
        }
        providerFileToId(file) {
          return generateFileID({
            data: file,
            name: file.name || file.id,
            type: file.mimetype
          });
        }
        preFirstRender() {
          this.plugin.setPluginState({
            didFirstRender: true
          });
          this.plugin.onFirstRender();
        }
        shouldHandleScroll(event) {
          const {
            scrollHeight,
            scrollTop,
            offsetHeight
          } = event.target;
          const scrollPosition = scrollHeight - (scrollTop + offsetHeight);
          return scrollPosition < 50 && !this.isHandlingScroll;
        }
        clearSelection() {
          this.plugin.setPluginState({
            currentSelection: []
          });
        }
        cancelPicking() {
          this.clearSelection();
          const dashboard = this.plugin.uppy.getPlugin("Dashboard");
          if (dashboard) {
            dashboard.hideAllPanels();
          }
        }
        handleError(error) {
          const {
            uppy
          } = this.plugin;
          const message = uppy.i18n("companionError");
          uppy.log(error.toString());
          if (error.isAuthError) {
            return;
          }
          uppy.info({
            message,
            details: error.toString()
          }, "error", 5e3);
        }
        addFile(file) {
          const tagFile = {
            id: this.providerFileToId(file),
            source: this.plugin.id,
            data: file,
            name: file.name || file.id,
            type: file.mimeType,
            isRemote: true,
            meta: {},
            body: {
              fileId: file.id
            },
            remote: {
              companionUrl: this.plugin.opts.companionUrl,
              url: `${this.provider.fileUrl(file.requestPath)}`,
              body: {
                fileId: file.id
              },
              providerOptions: this.provider.opts,
              providerName: this.provider.name
            }
          };
          const fileType = getFileType(tagFile);
          if (fileType && isPreviewSupported(fileType)) {
            tagFile.preview = file.thumbnail;
          }
          if (file.author) {
            if (file.author.name != null)
              tagFile.meta.authorName = String(file.author.name);
            if (file.author.url)
              tagFile.meta.authorUrl = file.author.url;
          }
          this.plugin.uppy.log("Adding remote file");
          try {
            this.plugin.uppy.addFile(tagFile);
            return true;
          } catch (err) {
            if (!err.isRestriction) {
              this.plugin.uppy.log(err);
            }
            return false;
          }
        }
      };
    }
  });

  // ../packages/@uppy/provider-views/lib/ProviderView/ProviderView.js
  var require_ProviderView = __commonJS({
    "../packages/@uppy/provider-views/lib/ProviderView/ProviderView.js"(exports, module) {
      var _class;
      var _updateFilesAndFolders;
      var _isOriginAllowed;
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
      var {
        h: h3
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      var AuthView = require_AuthView();
      var Header = require_Header();
      var Browser = require_Browser();
      var LoaderView = require_Loader();
      var CloseWrapper = require_CloseWrapper();
      var View = require_View();
      function getOrigin() {
        return location.origin;
      }
      module.exports = (_temp = (_updateFilesAndFolders = /* @__PURE__ */ _classPrivateFieldLooseKey("updateFilesAndFolders"), _isOriginAllowed = /* @__PURE__ */ _classPrivateFieldLooseKey("isOriginAllowed"), _class = class ProviderView extends View {
        constructor(plugin, opts) {
          super(plugin, opts);
          Object.defineProperty(this, _isOriginAllowed, {
            value: _isOriginAllowed2
          });
          Object.defineProperty(this, _updateFilesAndFolders, {
            value: _updateFilesAndFolders2
          });
          const defaultOptions = {
            viewType: "list",
            showTitles: true,
            showFilter: true,
            showBreadcrumbs: true
          };
          this.opts = {
            ...defaultOptions,
            ...opts
          };
          this.filterQuery = this.filterQuery.bind(this);
          this.getFolder = this.getFolder.bind(this);
          this.getNextFolder = this.getNextFolder.bind(this);
          this.logout = this.logout.bind(this);
          this.handleAuth = this.handleAuth.bind(this);
          this.handleScroll = this.handleScroll.bind(this);
          this.listAllFiles = this.listAllFiles.bind(this);
          this.donePicking = this.donePicking.bind(this);
          this.render = this.render.bind(this);
          this.plugin.setPluginState({
            authenticated: false,
            files: [],
            folders: [],
            directories: [],
            filterInput: "",
            isSearchVisible: false,
            currentSelection: []
          });
        }
        tearDown() {
        }
        getFolder(id2, name) {
          return this.sharedHandler.loaderWrapper(this.provider.list(id2), (res) => {
            const folders = [];
            const files = [];
            let updatedDirectories;
            const state = this.plugin.getPluginState();
            const index = state.directories.findIndex((dir) => id2 === dir.id);
            if (index !== -1) {
              updatedDirectories = state.directories.slice(0, index + 1);
            } else {
              updatedDirectories = state.directories.concat([{
                id: id2,
                title: name
              }]);
            }
            this.username = res.username || this.username;
            _classPrivateFieldLooseBase(this, _updateFilesAndFolders)[_updateFilesAndFolders](res, files, folders);
            this.plugin.setPluginState({
              directories: updatedDirectories
            });
          }, this.handleError);
        }
        getNextFolder(folder) {
          this.getFolder(folder.requestPath, folder.name);
          this.lastCheckbox = void 0;
        }
        logout() {
          this.provider.logout().then((res) => {
            if (res.ok) {
              if (!res.revoked) {
                const message = this.plugin.uppy.i18n("companionUnauthorizeHint", {
                  provider: this.plugin.title,
                  url: res.manual_revoke_url
                });
                this.plugin.uppy.info(message, "info", 7e3);
              }
              const newState = {
                authenticated: false,
                files: [],
                folders: [],
                directories: []
              };
              this.plugin.setPluginState(newState);
            }
          }).catch(this.handleError);
        }
        filterQuery(e3) {
          const state = this.plugin.getPluginState();
          this.plugin.setPluginState({
            ...state,
            filterInput: e3 ? e3.target.value : ""
          });
        }
        addFolder(folder) {
          const folderId = this.providerFileToId(folder);
          const state = this.plugin.getPluginState();
          const folders = {
            ...state.selectedFolders
          };
          if (folderId in folders && folders[folderId].loading) {
            return;
          }
          folders[folderId] = {
            loading: true,
            files: []
          };
          this.plugin.setPluginState({
            selectedFolders: {
              ...folders
            }
          });
          return this.listAllFiles(folder.requestPath).then((files) => {
            let count = 0;
            files.forEach((file) => {
              const id2 = this.providerFileToId(file);
              if (!this.plugin.uppy.checkIfFileAlreadyExists(id2)) {
                count++;
              }
            });
            if (count > 0) {
              files.forEach((file) => this.addFile(file));
            }
            const ids = files.map(this.providerFileToId);
            folders[folderId] = {
              loading: false,
              files: ids
            };
            this.plugin.setPluginState({
              selectedFolders: folders
            });
            let message;
            if (count === 0) {
              message = this.plugin.uppy.i18n("folderAlreadyAdded", {
                folder: folder.name
              });
            } else if (files.length) {
              message = this.plugin.uppy.i18n("folderAdded", {
                smart_count: count,
                folder: folder.name
              });
            } else {
              message = this.plugin.uppy.i18n("emptyFolderAdded");
            }
            this.plugin.uppy.info(message);
          }).catch((e3) => {
            const state2 = this.plugin.getPluginState();
            const selectedFolders = {
              ...state2.selectedFolders
            };
            delete selectedFolders[folderId];
            this.plugin.setPluginState({
              selectedFolders
            });
            this.handleError(e3);
          });
        }
        async handleAuth() {
          await this.provider.ensurePreAuth();
          const authState = btoa(JSON.stringify({
            origin: getOrigin()
          }));
          const clientVersion = `@uppy/provider-views=${ProviderView.VERSION}`;
          const link = this.provider.authUrl({
            state: authState,
            uppyVersions: clientVersion
          });
          const authWindow = window.open(link, "_blank");
          const handleToken = (e3) => {
            if (!_classPrivateFieldLooseBase(this, _isOriginAllowed)[_isOriginAllowed](e3.origin, this.plugin.opts.companionAllowedHosts) || e3.source !== authWindow) {
              this.plugin.uppy.log(`rejecting event from ${e3.origin} vs allowed pattern ${this.plugin.opts.companionAllowedHosts}`);
              return;
            }
            const data = typeof e3.data === "string" ? JSON.parse(e3.data) : e3.data;
            if (data.error) {
              this.plugin.uppy.log("auth aborted");
              const {
                uppy
              } = this.plugin;
              const message = uppy.i18n("authAborted");
              uppy.info({
                message
              }, "warning", 5e3);
              return;
            }
            if (!data.token) {
              this.plugin.uppy.log("did not receive token from auth window");
              return;
            }
            authWindow.close();
            window.removeEventListener("message", handleToken);
            this.provider.setAuthToken(data.token);
            this.preFirstRender();
          };
          window.addEventListener("message", handleToken);
        }
        async handleScroll(event) {
          const path = this.nextPagePath || null;
          if (this.shouldHandleScroll(event) && path) {
            this.isHandlingScroll = true;
            try {
              const response = await this.provider.list(path);
              const {
                files,
                folders
              } = this.plugin.getPluginState();
              _classPrivateFieldLooseBase(this, _updateFilesAndFolders)[_updateFilesAndFolders](response, files, folders);
            } catch (error) {
              this.handleError(error);
            } finally {
              this.isHandlingScroll = false;
            }
          }
        }
        listAllFiles(path, files) {
          if (files === void 0) {
            files = null;
          }
          files = files || [];
          return new Promise((resolve, reject) => {
            this.provider.list(path).then((res) => {
              res.items.forEach((item) => {
                if (!item.isFolder) {
                  files.push(item);
                } else {
                  this.addFolder(item);
                }
              });
              const moreFiles = res.nextPagePath || null;
              if (moreFiles) {
                return this.listAllFiles(moreFiles, files).then((files2) => resolve(files2)).catch((e3) => reject(e3));
              }
              return resolve(files);
            }).catch((e3) => reject(e3));
          });
        }
        donePicking() {
          const {
            currentSelection
          } = this.plugin.getPluginState();
          const promises = currentSelection.map((file) => {
            if (file.isFolder) {
              return this.addFolder(file);
            }
            return this.addFile(file);
          });
          this.sharedHandler.loaderWrapper(Promise.all(promises), () => {
            this.clearSelection();
          }, () => {
          });
        }
        render(state, viewOptions) {
          var _this = this;
          if (viewOptions === void 0) {
            viewOptions = {};
          }
          const {
            authenticated,
            didFirstRender
          } = this.plugin.getPluginState();
          if (!didFirstRender) {
            this.preFirstRender();
          }
          const targetViewOptions = {
            ...this.opts,
            ...viewOptions
          };
          const {
            files,
            folders,
            filterInput,
            loading,
            currentSelection
          } = this.plugin.getPluginState();
          const {
            isChecked,
            toggleCheckbox,
            filterItems
          } = this.sharedHandler;
          const hasInput = filterInput !== "";
          const headerProps = {
            showBreadcrumbs: targetViewOptions.showBreadcrumbs,
            getFolder: this.getFolder,
            directories: this.plugin.getPluginState().directories,
            pluginIcon: this.plugin.icon,
            title: this.plugin.title,
            logout: this.logout,
            username: this.username,
            i18n: this.plugin.uppy.i18n
          };
          const browserProps = {
            isChecked,
            toggleCheckbox,
            currentSelection,
            files: hasInput ? filterItems(files) : files,
            folders: hasInput ? filterItems(folders) : folders,
            username: this.username,
            getNextFolder: this.getNextFolder,
            getFolder: this.getFolder,
            filterItems: this.sharedHandler.filterItems,
            filterQuery: this.filterQuery,
            logout: this.logout,
            handleScroll: this.handleScroll,
            listAllFiles: this.listAllFiles,
            done: this.donePicking,
            cancel: this.cancelPicking,
            headerComponent: Header(headerProps),
            title: this.plugin.title,
            viewType: targetViewOptions.viewType,
            showTitles: targetViewOptions.showTitles,
            showFilter: targetViewOptions.showFilter,
            showBreadcrumbs: targetViewOptions.showBreadcrumbs,
            pluginIcon: this.plugin.icon,
            i18n: this.plugin.uppy.i18n,
            uppyFiles: this.plugin.uppy.getFiles(),
            validateRestrictions: function() {
              return _this.plugin.uppy.validateRestrictions(...arguments);
            }
          };
          if (loading) {
            return h3(CloseWrapper, {
              onUnmount: this.clearSelection
            }, h3(LoaderView, {
              i18n: this.plugin.uppy.i18n
            }));
          }
          if (!authenticated) {
            return h3(CloseWrapper, {
              onUnmount: this.clearSelection
            }, h3(AuthView, {
              pluginName: this.plugin.title,
              pluginIcon: this.plugin.icon,
              handleAuth: this.handleAuth,
              i18n: this.plugin.uppy.i18n,
              i18nArray: this.plugin.uppy.i18nArray
            }));
          }
          return h3(CloseWrapper, {
            onUnmount: this.clearSelection
          }, h3(Browser, browserProps));
        }
      }), _class.VERSION = "2.0.8", _temp);
      function _updateFilesAndFolders2(res, files, folders) {
        this.nextPagePath = res.nextPagePath;
        res.items.forEach((item) => {
          if (item.isFolder) {
            folders.push(item);
          } else {
            files.push(item);
          }
        });
        this.plugin.setPluginState({
          folders,
          files
        });
      }
      function _isOriginAllowed2(origin, allowedOrigin) {
        const getRegex = (value) => {
          if (typeof value === "string") {
            return new RegExp(`^${value}$`);
          }
          if (value instanceof RegExp) {
            return value;
          }
        };
        const patterns = Array.isArray(allowedOrigin) ? allowedOrigin.map(getRegex) : [getRegex(allowedOrigin)];
        return patterns.filter((pattern) => pattern != null).some((pattern) => pattern.test(origin) || pattern.test(`${origin}/`));
      }
    }
  });

  // ../packages/@uppy/provider-views/lib/ProviderView/index.js
  var require_ProviderView2 = __commonJS({
    "../packages/@uppy/provider-views/lib/ProviderView/index.js"(exports, module) {
      module.exports = require_ProviderView();
    }
  });

  // ../packages/@uppy/provider-views/lib/SearchProviderView/InputView.js
  var require_InputView = __commonJS({
    "../packages/@uppy/provider-views/lib/SearchProviderView/InputView.js"(exports, module) {
      var {
        h: h3
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      module.exports = (props) => {
        let input;
        const handleKeyPress = (ev) => {
          if (ev.keyCode === 13) {
            validateAndSearch();
          }
        };
        const validateAndSearch = () => {
          if (input.value) {
            props.search(input.value);
          }
        };
        return h3("div", {
          className: "uppy-SearchProvider"
        }, h3("input", {
          className: "uppy-u-reset uppy-c-textInput uppy-SearchProvider-input",
          type: "search",
          "aria-label": props.i18n("enterTextToSearch"),
          placeholder: props.i18n("enterTextToSearch"),
          onKeyUp: handleKeyPress,
          ref: (input_) => {
            input = input_;
          },
          "data-uppy-super-focusable": true
        }), h3("button", {
          className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-SearchProvider-searchButton",
          type: "button",
          onClick: validateAndSearch
        }, props.i18n("searchImages")));
      };
    }
  });

  // ../packages/@uppy/provider-views/lib/SearchProviderView/Header.js
  var require_Header2 = __commonJS({
    "../packages/@uppy/provider-views/lib/SearchProviderView/Header.js"(exports, module) {
      var {
        h: h3
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      var SUBMIT_KEY = 13;
      module.exports = (props) => {
        const {
          searchTerm,
          i18n,
          search
        } = props;
        const handleKeyPress = (ev) => {
          if (ev.keyCode === SUBMIT_KEY) {
            ev.stopPropagation();
            ev.preventDefault();
            search(ev.target.value);
          }
        };
        return h3("div", {
          class: "uppy-ProviderBrowser-search"
        }, h3("input", {
          class: "uppy-u-reset uppy-ProviderBrowser-searchInput",
          type: "text",
          placeholder: i18n("search"),
          "aria-label": i18n("search"),
          value: searchTerm,
          onKeyUp: handleKeyPress,
          "data-uppy-super-focusable": true
        }), h3("svg", {
          "aria-hidden": "true",
          focusable: "false",
          class: "uppy-c-icon uppy-ProviderBrowser-searchIcon",
          width: "12",
          height: "12",
          viewBox: "0 0 12 12"
        }, h3("path", {
          d: "M8.638 7.99l3.172 3.172a.492.492 0 1 1-.697.697L7.91 8.656a4.977 4.977 0 0 1-2.983.983C2.206 9.639 0 7.481 0 4.819 0 2.158 2.206 0 4.927 0c2.721 0 4.927 2.158 4.927 4.82a4.74 4.74 0 0 1-1.216 3.17zm-3.71.685c2.176 0 3.94-1.726 3.94-3.856 0-2.129-1.764-3.855-3.94-3.855C2.75.964.984 2.69.984 4.819c0 2.13 1.765 3.856 3.942 3.856z"
        })));
      };
    }
  });

  // ../packages/@uppy/provider-views/lib/SearchProviderView/SearchProviderView.js
  var require_SearchProviderView = __commonJS({
    "../packages/@uppy/provider-views/lib/SearchProviderView/SearchProviderView.js"(exports, module) {
      var _class;
      var _updateFilesAndInputMode;
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
      var {
        h: h3
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      var SearchInput = require_InputView();
      var Browser = require_Browser();
      var LoaderView = require_Loader();
      var Header = require_Header2();
      var CloseWrapper = require_CloseWrapper();
      var View = require_View();
      module.exports = (_temp = (_updateFilesAndInputMode = /* @__PURE__ */ _classPrivateFieldLooseKey("updateFilesAndInputMode"), _class = class SearchProviderView extends View {
        constructor(plugin, opts) {
          super(plugin, opts);
          Object.defineProperty(this, _updateFilesAndInputMode, {
            value: _updateFilesAndInputMode2
          });
          const defaultOptions = {
            viewType: "grid",
            showTitles: false,
            showFilter: false,
            showBreadcrumbs: false
          };
          this.opts = {
            ...defaultOptions,
            ...opts
          };
          this.search = this.search.bind(this);
          this.triggerSearchInput = this.triggerSearchInput.bind(this);
          this.addFile = this.addFile.bind(this);
          this.handleScroll = this.handleScroll.bind(this);
          this.donePicking = this.donePicking.bind(this);
          this.render = this.render.bind(this);
          this.plugin.setPluginState({
            isInputMode: true,
            files: [],
            folders: [],
            directories: [],
            filterInput: "",
            currentSelection: [],
            searchTerm: null
          });
        }
        tearDown() {
        }
        clearSelection() {
          this.plugin.setPluginState({
            currentSelection: [],
            isInputMode: true,
            files: [],
            searchTerm: null
          });
        }
        search(query) {
          const {
            searchTerm
          } = this.plugin.getPluginState();
          if (query && query === searchTerm) {
            return;
          }
          return this.sharedHandler.loaderWrapper(this.provider.search(query), (res) => {
            _classPrivateFieldLooseBase(this, _updateFilesAndInputMode)[_updateFilesAndInputMode](res, []);
          }, this.handleError);
        }
        triggerSearchInput() {
          this.plugin.setPluginState({
            isInputMode: true
          });
        }
        async handleScroll(event) {
          const query = this.nextPageQuery || null;
          if (this.shouldHandleScroll(event) && query) {
            this.isHandlingScroll = true;
            try {
              const {
                files,
                searchTerm
              } = this.plugin.getPluginState();
              const response = await this.provider.search(searchTerm, query);
              _classPrivateFieldLooseBase(this, _updateFilesAndInputMode)[_updateFilesAndInputMode](response, files);
            } catch (error) {
              this.handleError(error);
            } finally {
              this.isHandlingScroll = false;
            }
          }
        }
        donePicking() {
          const {
            currentSelection
          } = this.plugin.getPluginState();
          const promises = currentSelection.map((file) => this.addFile(file));
          this.sharedHandler.loaderWrapper(Promise.all(promises), () => {
            this.clearSelection();
          }, () => {
          });
        }
        render(state, viewOptions) {
          var _this = this;
          if (viewOptions === void 0) {
            viewOptions = {};
          }
          const {
            didFirstRender,
            isInputMode,
            searchTerm
          } = this.plugin.getPluginState();
          if (!didFirstRender) {
            this.preFirstRender();
          }
          const targetViewOptions = {
            ...this.opts,
            ...viewOptions
          };
          const {
            files,
            folders,
            filterInput,
            loading,
            currentSelection
          } = this.plugin.getPluginState();
          const {
            isChecked,
            toggleCheckbox,
            filterItems
          } = this.sharedHandler;
          const hasInput = filterInput !== "";
          const browserProps = {
            isChecked,
            toggleCheckbox,
            currentSelection,
            files: hasInput ? filterItems(files) : files,
            folders: hasInput ? filterItems(folders) : folders,
            handleScroll: this.handleScroll,
            done: this.donePicking,
            cancel: this.cancelPicking,
            headerComponent: Header({
              search: this.search,
              i18n: this.plugin.uppy.i18n,
              searchTerm
            }),
            title: this.plugin.title,
            viewType: targetViewOptions.viewType,
            showTitles: targetViewOptions.showTitles,
            showFilter: targetViewOptions.showFilter,
            showBreadcrumbs: targetViewOptions.showBreadcrumbs,
            pluginIcon: this.plugin.icon,
            i18n: this.plugin.uppy.i18n,
            uppyFiles: this.plugin.uppy.getFiles(),
            validateRestrictions: function() {
              return _this.plugin.uppy.validateRestrictions(...arguments);
            }
          };
          if (loading) {
            return h3(CloseWrapper, {
              onUnmount: this.clearSelection
            }, h3(LoaderView, {
              i18n: this.plugin.uppy.i18n
            }));
          }
          if (isInputMode) {
            return h3(CloseWrapper, {
              onUnmount: this.clearSelection
            }, h3(SearchInput, {
              search: this.search,
              i18n: this.plugin.uppy.i18n
            }));
          }
          return h3(CloseWrapper, {
            onUnmount: this.clearSelection
          }, h3(Browser, browserProps));
        }
      }), _class.VERSION = "2.0.8", _temp);
      function _updateFilesAndInputMode2(res, files) {
        this.nextPageQuery = res.nextPageQuery;
        res.items.forEach((item) => {
          files.push(item);
        });
        this.plugin.setPluginState({
          isInputMode: false,
          files,
          searchTerm: res.searchedFor
        });
      }
    }
  });

  // ../packages/@uppy/provider-views/lib/SearchProviderView/index.js
  var require_SearchProviderView2 = __commonJS({
    "../packages/@uppy/provider-views/lib/SearchProviderView/index.js"(exports, module) {
      module.exports = require_SearchProviderView();
    }
  });

  // ../packages/@uppy/provider-views/lib/index.js
  var require_lib8 = __commonJS({
    "../packages/@uppy/provider-views/lib/index.js"(exports, module) {
      var ProviderViews = require_ProviderView2();
      var SearchProviderViews = require_SearchProviderView2();
      module.exports = {
        ProviderViews,
        SearchProviderViews
      };
    }
  });

  // ../packages/@uppy/google-drive/lib/DriveProviderViews.js
  var require_DriveProviderViews = __commonJS({
    "../packages/@uppy/google-drive/lib/DriveProviderViews.js"(exports, module) {
      "use strict";
      var _providerViews = require_lib8();
      var DriveProviderViews = class extends _providerViews.ProviderViews {
        toggleCheckbox(e3, file) {
          e3.stopPropagation();
          e3.preventDefault();
          if (!file.custom.isSharedDrive) {
            super.toggleCheckbox(e3, file);
          }
        }
      };
      module.exports = DriveProviderViews;
    }
  });

  // ../packages/@uppy/google-drive/lib/locale.js
  var require_locale5 = __commonJS({
    "../packages/@uppy/google-drive/lib/locale.js"(exports, module) {
      "use strict";
      module.exports = {
        strings: {
          pluginNameGoogleDrive: "Google Drive"
        }
      };
    }
  });

  // ../packages/@uppy/google-drive/lib/GoogleDrive.js
  var require_GoogleDrive = __commonJS({
    "../packages/@uppy/google-drive/lib/GoogleDrive.js"(exports, module) {
      "use strict";
      var _core = require_lib2();
      var _companionClient = require_lib7();
      var _preact = (init_preact_module(), __toCommonJS(preact_module_exports));
      var packageJson = {
        "version": "2.0.5"
      };
      var DriveProviderViews = require_DriveProviderViews();
      var locale = require_locale5();
      var GoogleDrive2 = class extends _core.UIPlugin {
        constructor(uppy, opts) {
          super(uppy, opts);
          this.id = this.opts.id || "GoogleDrive";
          this.title = this.opts.title || "Google Drive";
          _companionClient.Provider.initPlugin(this, opts);
          this.title = this.opts.title || "Google Drive";
          this.icon = () => (0, _preact.h)("svg", {
            "aria-hidden": "true",
            focusable: "false",
            width: "32",
            height: "32",
            viewBox: "0 0 32 32"
          }, (0, _preact.h)("g", {
            fill: "none",
            fillRule: "evenodd"
          }, (0, _preact.h)("rect", {
            className: "uppy-ProviderIconBg",
            fill: "#4285F4",
            width: "32",
            height: "32",
            rx: "16"
          }), (0, _preact.h)("path", {
            d: "M25.216 17.736L19.043 7h-6.086l6.175 10.736h6.084zm-11.275.896L10.9 24h11.723l3.04-5.368H13.942zm-1.789-10.29l-5.816 10.29L9.38 24l5.905-10.29-3.132-5.369z",
            fill: "#FFF"
          })));
          this.provider = new _companionClient.Provider(uppy, {
            companionUrl: this.opts.companionUrl,
            companionHeaders: this.opts.companionHeaders,
            companionKeysParams: this.opts.companionKeysParams,
            companionCookiesRule: this.opts.companionCookiesRule,
            provider: "drive",
            pluginId: this.id
          });
          this.defaultLocale = locale;
          this.i18nInit();
          this.title = this.i18n("pluginNameGoogleDrive");
          this.onFirstRender = this.onFirstRender.bind(this);
          this.render = this.render.bind(this);
        }
        install() {
          this.view = new DriveProviderViews(this, {
            provider: this.provider
          });
          const {
            target
          } = this.opts;
          if (target) {
            this.mount(target, this);
          }
        }
        uninstall() {
          this.view.tearDown();
          this.unmount();
        }
        onFirstRender() {
          return Promise.all([this.provider.fetchPreAuthToken(), this.view.getFolder("root", "/")]);
        }
        render(state) {
          return this.view.render(state);
        }
      };
      GoogleDrive2.VERSION = packageJson.version;
      module.exports = GoogleDrive2;
    }
  });

  // ../packages/@uppy/google-drive/lib/index.js
  var require_lib9 = __commonJS({
    "../packages/@uppy/google-drive/lib/index.js"(exports, module) {
      "use strict";
      module.exports = require_GoogleDrive();
    }
  });

  // ../packages/@uppy/dropbox/lib/locale.js
  var require_locale6 = __commonJS({
    "../packages/@uppy/dropbox/lib/locale.js"(exports, module) {
      "use strict";
      module.exports = {
        strings: {
          pluginNameDropbox: "Dropbox"
        }
      };
    }
  });

  // ../packages/@uppy/dropbox/lib/Dropbox.js
  var require_Dropbox = __commonJS({
    "../packages/@uppy/dropbox/lib/Dropbox.js"(exports, module) {
      "use strict";
      var _core = require_lib2();
      var _companionClient = require_lib7();
      var _providerViews = require_lib8();
      var _preact = (init_preact_module(), __toCommonJS(preact_module_exports));
      var packageJson = {
        "version": "2.0.6"
      };
      var locale = require_locale6();
      var Dropbox2 = class extends _core.UIPlugin {
        constructor(uppy, opts) {
          super(uppy, opts);
          this.id = this.opts.id || "Dropbox";
          _companionClient.Provider.initPlugin(this, opts);
          this.title = this.opts.title || "Dropbox";
          this.icon = () => (0, _preact.h)("svg", {
            "aria-hidden": "true",
            focusable: "false",
            width: "32",
            height: "32",
            viewBox: "0 0 32 32"
          }, (0, _preact.h)("g", {
            fill: "none",
            fillRule: "evenodd"
          }, (0, _preact.h)("rect", {
            className: "uppy-ProviderIconBg",
            fill: "#0D2481",
            width: "32",
            height: "32",
            rx: "16"
          }), (0, _preact.h)("path", {
            d: "M11 8l5 3.185-5 3.186-5-3.186L11 8zm10 0l5 3.185-5 3.186-5-3.186L21 8zM6 17.556l5-3.185 5 3.185-5 3.186-5-3.186zm15-3.185l5 3.185-5 3.186-5-3.186 5-3.185zm-10 7.432l5-3.185 5 3.185-5 3.186-5-3.186z",
            fill: "#FFF",
            fillRule: "nonzero"
          })));
          this.provider = new _companionClient.Provider(uppy, {
            companionUrl: this.opts.companionUrl,
            companionHeaders: this.opts.companionHeaders,
            companionKeysParams: this.opts.companionKeysParams,
            companionCookiesRule: this.opts.companionCookiesRule,
            provider: "dropbox",
            pluginId: this.id
          });
          this.defaultLocale = locale;
          this.i18nInit();
          this.title = this.i18n("pluginNameDropbox");
          this.onFirstRender = this.onFirstRender.bind(this);
          this.render = this.render.bind(this);
        }
        install() {
          this.view = new _providerViews.ProviderViews(this, {
            provider: this.provider
          });
          const {
            target
          } = this.opts;
          if (target) {
            this.mount(target, this);
          }
        }
        uninstall() {
          this.view.tearDown();
          this.unmount();
        }
        onFirstRender() {
          return Promise.all([this.provider.fetchPreAuthToken(), this.view.getFolder()]);
        }
        render(state) {
          return this.view.render(state);
        }
      };
      Dropbox2.VERSION = packageJson.version;
      module.exports = Dropbox2;
    }
  });

  // ../packages/@uppy/dropbox/lib/index.js
  var require_lib10 = __commonJS({
    "../packages/@uppy/dropbox/lib/index.js"(exports, module) {
      "use strict";
      module.exports = require_Dropbox();
    }
  });

  // ../packages/@uppy/instagram/lib/locale.js
  var require_locale7 = __commonJS({
    "../packages/@uppy/instagram/lib/locale.js"(exports, module) {
      module.exports = {
        strings: {
          pluginNameInstagram: "Instagram"
        }
      };
    }
  });

  // ../packages/@uppy/instagram/lib/index.js
  var require_lib11 = __commonJS({
    "../packages/@uppy/instagram/lib/index.js"(exports, module) {
      var _class;
      var _temp;
      var {
        UIPlugin
      } = require_lib2();
      var {
        Provider
      } = require_lib7();
      var {
        ProviderViews
      } = require_lib8();
      var {
        h: h3
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      var locale = require_locale7();
      module.exports = (_temp = _class = class Instagram extends UIPlugin {
        constructor(uppy, opts) {
          super(uppy, opts);
          this.id = this.opts.id || "Instagram";
          Provider.initPlugin(this, opts);
          this.icon = () => h3("svg", {
            "aria-hidden": "true",
            focusable: "false",
            width: "32",
            height: "32",
            viewBox: "0 0 32 32"
          }, h3("g", {
            fill: "none",
            fillRule: "evenodd"
          }, h3("rect", {
            className: "uppy-ProviderIconBg",
            fill: "#E1306C",
            width: "32",
            height: "32",
            rx: "16"
          }), h3("path", {
            d: "M16 8.622c2.403 0 2.688.009 3.637.052.877.04 1.354.187 1.67.31.392.144.745.374 1.036.673.299.29.529.644.673 1.035.123.317.27.794.31 1.671.043.95.052 1.234.052 3.637s-.009 2.688-.052 3.637c-.04.877-.187 1.354-.31 1.671a2.98 2.98 0 0 1-1.708 1.708c-.317.123-.794.27-1.671.31-.95.043-1.234.053-3.637.053s-2.688-.01-3.637-.053c-.877-.04-1.354-.187-1.671-.31a2.788 2.788 0 0 1-1.035-.673 2.788 2.788 0 0 1-.673-1.035c-.123-.317-.27-.794-.31-1.671-.043-.949-.052-1.234-.052-3.637s.009-2.688.052-3.637c.04-.877.187-1.354.31-1.67.144-.392.374-.745.673-1.036.29-.299.644-.529 1.035-.673.317-.123.794-.27 1.671-.31.95-.043 1.234-.052 3.637-.052zM16 7c-2.444 0-2.75.01-3.71.054-.959.044-1.613.196-2.185.419-.6.225-1.145.58-1.594 1.038-.458.45-.813.993-1.039 1.594-.222.572-.374 1.226-.418 2.184C7.01 13.25 7 13.556 7 16s.01 2.75.054 3.71c.044.959.196 1.613.419 2.185.226.6.58 1.145 1.038 1.594.45.458.993.813 1.594 1.038.572.223 1.227.375 2.184.419.96.044 1.267.054 3.711.054s2.75-.01 3.71-.054c.959-.044 1.613-.196 2.185-.419a4.602 4.602 0 0 0 2.632-2.632c.223-.572.375-1.226.419-2.184.044-.96.054-1.267.054-3.711s-.01-2.75-.054-3.71c-.044-.959-.196-1.613-.419-2.185A4.412 4.412 0 0 0 23.49 8.51a4.412 4.412 0 0 0-1.594-1.039c-.572-.222-1.226-.374-2.184-.418C18.75 7.01 18.444 7 16 7zm0 4.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 7.421a2.921 2.921 0 1 1 0-5.842 2.921 2.921 0 0 1 0 5.842zm4.875-6.671a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25z",
            fill: "#FFF"
          })));
          this.defaultLocale = locale;
          this.i18nInit();
          this.title = this.i18n("pluginNameInstagram");
          this.provider = new Provider(uppy, {
            companionUrl: this.opts.companionUrl,
            companionHeaders: this.opts.companionHeaders,
            companionKeysParams: this.opts.companionKeysParams,
            companionCookiesRule: this.opts.companionCookiesRule,
            provider: "instagram",
            pluginId: this.id
          });
          this.onFirstRender = this.onFirstRender.bind(this);
          this.render = this.render.bind(this);
        }
        install() {
          this.view = new ProviderViews(this, {
            provider: this.provider,
            viewType: "grid",
            showTitles: false,
            showFilter: false,
            showBreadcrumbs: false
          });
          const {
            target
          } = this.opts;
          if (target) {
            this.mount(target, this);
          }
        }
        uninstall() {
          this.view.tearDown();
          this.unmount();
        }
        onFirstRender() {
          return Promise.all([this.provider.fetchPreAuthToken(), this.view.getFolder("recent")]);
        }
        render(state) {
          return this.view.render(state);
        }
      }, _class.VERSION = "2.0.5", _temp);
    }
  });

  // ../packages/@uppy/facebook/lib/locale.js
  var require_locale8 = __commonJS({
    "../packages/@uppy/facebook/lib/locale.js"(exports, module) {
      "use strict";
      module.exports = {
        strings: {
          pluginNameFacebook: "Facebook"
        }
      };
    }
  });

  // ../packages/@uppy/facebook/lib/Facebook.js
  var require_Facebook = __commonJS({
    "../packages/@uppy/facebook/lib/Facebook.js"(exports, module) {
      "use strict";
      var _core = require_lib2();
      var _companionClient = require_lib7();
      var _providerViews = require_lib8();
      var _preact = (init_preact_module(), __toCommonJS(preact_module_exports));
      var packageJson = {
        "version": "2.0.6"
      };
      var locale = require_locale8();
      var Facebook2 = class extends _core.UIPlugin {
        constructor(uppy, opts) {
          super(uppy, opts);
          this.id = this.opts.id || "Facebook";
          _companionClient.Provider.initPlugin(this, opts);
          this.title = this.opts.title || "Facebook";
          this.icon = () => (0, _preact.h)("svg", {
            "aria-hidden": "true",
            focusable: "false",
            width: "32",
            height: "32",
            viewBox: "0 0 32 32"
          }, (0, _preact.h)("g", {
            fill: "none",
            fillRule: "evenodd"
          }, (0, _preact.h)("rect", {
            className: "uppy-ProviderIconBg",
            width: "32",
            height: "32",
            rx: "16",
            fill: "#3C5A99"
          }), (0, _preact.h)("path", {
            d: "M17.842 26v-8.667h2.653l.398-3.377h-3.051v-2.157c0-.978.248-1.644 1.527-1.644H21V7.132A19.914 19.914 0 0 0 18.623 7c-2.352 0-3.963 1.574-3.963 4.465v2.49H12v3.378h2.66V26h3.182z",
            fill: "#FFF",
            fillRule: "nonzero"
          })));
          this.provider = new _companionClient.Provider(uppy, {
            companionUrl: this.opts.companionUrl,
            companionHeaders: this.opts.companionHeaders,
            companionKeysParams: this.opts.companionKeysParams,
            companionCookiesRule: this.opts.companionCookiesRule,
            provider: "facebook",
            pluginId: this.id
          });
          this.defaultLocale = locale;
          this.i18nInit();
          this.title = this.i18n("pluginNameFacebook");
          this.onFirstRender = this.onFirstRender.bind(this);
          this.render = this.render.bind(this);
        }
        install() {
          this.view = new _providerViews.ProviderViews(this, {
            provider: this.provider
          });
          const {
            target
          } = this.opts;
          if (target) {
            this.mount(target, this);
          }
        }
        uninstall() {
          this.view.tearDown();
          this.unmount();
        }
        onFirstRender() {
          return Promise.all([this.provider.fetchPreAuthToken(), this.view.getFolder()]);
        }
        render(state) {
          const viewOptions = {};
          if (this.getPluginState().files.length && !this.getPluginState().folders.length) {
            viewOptions.viewType = "grid";
            viewOptions.showFilter = false;
            viewOptions.showTitles = false;
          }
          return this.view.render(state, viewOptions);
        }
      };
      Facebook2.VERSION = packageJson.version;
      module.exports = Facebook2;
    }
  });

  // ../packages/@uppy/facebook/lib/index.js
  var require_lib12 = __commonJS({
    "../packages/@uppy/facebook/lib/index.js"(exports, module) {
      "use strict";
      module.exports = require_Facebook();
    }
  });

  // ../packages/@uppy/onedrive/lib/locale.js
  var require_locale9 = __commonJS({
    "../packages/@uppy/onedrive/lib/locale.js"(exports, module) {
      module.exports = {
        strings: {
          pluginNameOneDrive: "OneDrive"
        }
      };
    }
  });

  // ../packages/@uppy/onedrive/lib/index.js
  var require_lib13 = __commonJS({
    "../packages/@uppy/onedrive/lib/index.js"(exports, module) {
      var _class;
      var _temp;
      var {
        UIPlugin
      } = require_lib2();
      var {
        Provider
      } = require_lib7();
      var {
        ProviderViews
      } = require_lib8();
      var {
        h: h3
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      var locale = require_locale9();
      module.exports = (_temp = _class = class OneDrive extends UIPlugin {
        constructor(uppy, opts) {
          super(uppy, opts);
          this.id = this.opts.id || "OneDrive";
          Provider.initPlugin(this, opts);
          this.title = this.opts.title || "OneDrive";
          this.icon = () => h3("svg", {
            "aria-hidden": "true",
            focusable: "false",
            width: "32",
            height: "32",
            viewBox: "0 0 32 32"
          }, h3("g", {
            fill: "none",
            fillRule: "evenodd"
          }, h3("rect", {
            className: "uppy-ProviderIconBg",
            width: "32",
            height: "32",
            rx: "16",
            fill: "#0262C0"
          }), h3("g", {
            fill: "#FFF",
            fillRule: "nonzero"
          }, h3("path", {
            d: "M24.157 22s1.492-.205 1.79-1.655a2.624 2.624 0 0 0 .03-.878c-.22-1.64-1.988-2.01-1.988-2.01s.307-1.765-1.312-2.69c-1.62-.925-3.1 0-3.1 0S18.711 13 16.366 13c-3.016 0-3.519 3.448-3.519 3.448S10 16.618 10 19.14c0 2.523 2.597 2.86 2.597 2.86h11.56z"
          }), h3("path", {
            d: "M9.421 19.246c0-2.197 1.606-3.159 2.871-3.472.44-1.477 1.654-3.439 4.135-3.439H16.445c1.721 0 2.79.823 3.368 1.476a3.99 3.99 0 0 1 1.147-.171h.01l.03.002C21.017 13.5 20.691 10 16.757 10c-2.69 0-3.639 2.345-3.639 2.345s-1.95-1.482-3.955.567c-1.028 1.052-.79 2.669-.79 2.669S6 15.824 6 18.412C6 20.757 8.452 21 8.452 21h1.372a3.77 3.77 0 0 1-.403-1.754z"
          }))));
          this.provider = new Provider(uppy, {
            companionUrl: this.opts.companionUrl,
            companionHeaders: this.opts.companionHeaders,
            companionCookiesRule: this.opts.companionCookiesRule,
            provider: "onedrive",
            pluginId: this.id
          });
          this.defaultLocale = locale;
          this.i18nInit();
          this.title = this.i18n("pluginNameOneDrive");
          this.onFirstRender = this.onFirstRender.bind(this);
          this.render = this.render.bind(this);
        }
        install() {
          this.view = new ProviderViews(this, {
            provider: this.provider
          });
          const {
            target
          } = this.opts;
          if (target) {
            this.mount(target, this);
          }
        }
        uninstall() {
          this.view.tearDown();
          this.unmount();
        }
        onFirstRender() {
          return Promise.all([this.provider.fetchPreAuthToken(), this.view.getFolder()]);
        }
        render(state) {
          return this.view.render(state);
        }
      }, _class.VERSION = "2.0.6", _temp);
    }
  });

  // ../packages/@uppy/zoom/lib/locale.js
  var require_locale10 = __commonJS({
    "../packages/@uppy/zoom/lib/locale.js"(exports, module) {
      module.exports = {
        strings: {
          pluginNameZoom: "Zoom"
        }
      };
    }
  });

  // ../packages/@uppy/zoom/lib/index.js
  var require_lib14 = __commonJS({
    "../packages/@uppy/zoom/lib/index.js"(exports, module) {
      var _class;
      var _temp;
      var {
        UIPlugin
      } = require_lib2();
      var {
        Provider
      } = require_lib7();
      var {
        ProviderViews
      } = require_lib8();
      var {
        h: h3
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      var locale = require_locale10();
      module.exports = (_temp = _class = class Zoom extends UIPlugin {
        constructor(uppy, opts) {
          super(uppy, opts);
          this.id = this.opts.id || "Zoom";
          Provider.initPlugin(this, opts);
          this.title = this.opts.title || "Zoom";
          this.icon = () => h3("svg", {
            "aria-hidden": "true",
            focusable: "false",
            width: "32",
            height: "32",
            viewBox: "0 0 32 32"
          }, h3("rect", {
            className: "uppy-ProviderIconBg",
            width: "32",
            height: "32",
            rx: "16",
            fill: "#0E71EB"
          }), h3("g", {
            fill: "none",
            fillRule: "evenodd"
          }, h3("path", {
            fill: "#fff",
            d: "M29,31H14c-1.657,0-3-1.343-3-3V17h15c1.657,0,3,1.343,3,3V31z",
            style: {
              transform: "translate(-5px, -5px) scale(0.9)"
            }
          }), h3("polygon", {
            fill: "#fff",
            points: "37,31 31,27 31,21 37,17",
            style: {
              transform: "translate(-5px, -5px) scale(0.9)"
            }
          })));
          this.provider = new Provider(uppy, {
            companionUrl: this.opts.companionUrl,
            companionHeaders: this.opts.companionHeaders,
            companionKeysParams: this.opts.companionKeysParams,
            companionCookiesRule: this.opts.companionCookiesRule,
            provider: "zoom",
            pluginId: this.id
          });
          this.defaultLocale = locale;
          this.i18nInit();
          this.title = this.i18n("pluginNameZoom");
          this.onFirstRender = this.onFirstRender.bind(this);
          this.render = this.render.bind(this);
        }
        install() {
          this.view = new ProviderViews(this, {
            provider: this.provider
          });
          const {
            target
          } = this.opts;
          if (target) {
            this.mount(target, this);
          }
        }
        uninstall() {
          this.view.tearDown();
          this.unmount();
        }
        onFirstRender() {
          return Promise.all([this.provider.fetchPreAuthToken(), this.view.getFolder()]);
        }
        render(state) {
          return this.view.render(state);
        }
      }, _class.VERSION = "1.0.5", _temp);
    }
  });

  // ../packages/@uppy/unsplash/lib/index.js
  var require_lib15 = __commonJS({
    "../packages/@uppy/unsplash/lib/index.js"(exports, module) {
      var _class;
      var _temp;
      var {
        UIPlugin
      } = require_lib2();
      var {
        h: h3
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      var {
        SearchProvider,
        Provider
      } = require_lib7();
      var {
        SearchProviderViews
      } = require_lib8();
      module.exports = (_temp = _class = class Unsplash extends UIPlugin {
        constructor(uppy, opts) {
          super(uppy, opts);
          this.id = this.opts.id || "Unsplash";
          this.title = this.opts.title || "Unsplash";
          Provider.initPlugin(this, opts, {});
          this.icon = () => h3("svg", {
            viewBox: "0 0 32 32",
            height: "32",
            width: "32",
            "aria-hidden": "true"
          }, h3("path", {
            d: "M46.575 10.883v-9h12v9zm12 5h10v18h-32v-18h10v9h12z",
            fill: "#fff"
          }), h3("rect", {
            className: "uppy-ProviderIconBg",
            width: "32",
            height: "32",
            rx: "16"
          }), h3("path", {
            d: "M13 12.5V8h6v4.5zm6 2.5h5v9H8v-9h5v4.5h6z",
            fill: "#fff"
          }));
          if (!this.opts.companionUrl) {
            throw new Error("Companion hostname is required, please consult https://uppy.io/docs/companion");
          }
          this.hostname = this.opts.companionUrl;
          this.provider = new SearchProvider(uppy, {
            companionUrl: this.opts.companionUrl,
            companionHeaders: this.opts.companionHeaders,
            companionCookiesRule: this.opts.companionCookiesRule,
            provider: "unsplash",
            pluginId: this.id
          });
        }
        install() {
          this.view = new SearchProviderViews(this, {
            provider: this.provider,
            viewType: "unsplash"
          });
          const {
            target
          } = this.opts;
          if (target) {
            this.mount(target, this);
          }
        }
        onFirstRender() {
        }
        render(state) {
          return this.view.render(state);
        }
        uninstall() {
          this.unmount();
        }
      }, _class.VERSION = "2.0.3", _temp);
    }
  });

  // ../packages/@uppy/box/lib/locale.js
  var require_locale11 = __commonJS({
    "../packages/@uppy/box/lib/locale.js"(exports, module) {
      "use strict";
      module.exports = {
        strings: {
          pluginNameBox: "Box"
        }
      };
    }
  });

  // ../packages/@uppy/box/lib/Box.js
  var require_Box = __commonJS({
    "../packages/@uppy/box/lib/Box.js"(exports, module) {
      "use strict";
      var _core = require_lib2();
      var _companionClient = require_lib7();
      var _providerViews = require_lib8();
      var _preact = (init_preact_module(), __toCommonJS(preact_module_exports));
      var locale = require_locale11();
      var packageJson = {
        "version": "1.0.6"
      };
      var Box2 = class extends _core.UIPlugin {
        constructor(uppy, opts) {
          super(uppy, opts);
          this.id = this.opts.id || "Box";
          _companionClient.Provider.initPlugin(this, opts);
          this.title = this.opts.title || "Box";
          this.icon = () => (0, _preact.h)("svg", {
            "aria-hidden": "true",
            focusable: "false",
            width: "32",
            height: "32",
            viewBox: "0 0 32 32"
          }, (0, _preact.h)("g", {
            fill: "none",
            fillRule: "evenodd"
          }, (0, _preact.h)("rect", {
            className: "uppy-ProviderIconBg",
            fill: "#0061D5",
            width: "32",
            height: "32",
            rx: "16"
          }), (0, _preact.h)("g", {
            fill: "#fff",
            fillRule: "nonzero"
          }, (0, _preact.h)("path", {
            d: "m16.4 13.5c-1.6 0-3 0.9-3.7 2.2-0.7-1.3-2.1-2.2-3.7-2.2-1 0-1.8 0.3-2.5 0.8v-3.6c-0.1-0.3-0.5-0.7-1-0.7s-0.8 0.4-0.8 0.8v7c0 2.3 1.9 4.2 4.2 4.2 1.6 0 3-0.9 3.7-2.2 0.7 1.3 2.1 2.2 3.7 2.2 2.3 0 4.2-1.9 4.2-4.2 0.1-2.4-1.8-4.3-4.1-4.3m-7.5 6.8c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5m7.5 0c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5"
          }), (0, _preact.h)("path", {
            d: "m27.2 20.6l-2.3-2.8 2.3-2.8c0.3-0.4 0.2-0.9-0.2-1.2s-1-0.2-1.3 0.2l-2 2.4-2-2.4c-0.3-0.4-0.9-0.4-1.3-0.2-0.4 0.3-0.5 0.8-0.2 1.2l2.3 2.8-2.3 2.8c-0.3 0.4-0.2 0.9 0.2 1.2s1 0.2 1.3-0.2l2-2.4 2 2.4c0.3 0.4 0.9 0.4 1.3 0.2 0.4-0.3 0.4-0.8 0.2-1.2"
          }))));
          this.provider = new _companionClient.Provider(uppy, {
            companionUrl: this.opts.companionUrl,
            companionHeaders: this.opts.companionHeaders,
            companionKeysParams: this.opts.companionKeysParams,
            companionCookiesRule: this.opts.companionCookiesRule,
            provider: "box",
            pluginId: this.id
          });
          this.defaultLocale = locale;
          this.i18nInit();
          this.title = this.i18n("pluginNameBox");
          this.onFirstRender = this.onFirstRender.bind(this);
          this.render = this.render.bind(this);
        }
        install() {
          this.view = new _providerViews.ProviderViews(this, {
            provider: this.provider
          });
          const {
            target
          } = this.opts;
          if (target) {
            this.mount(target, this);
          }
        }
        uninstall() {
          this.view.tearDown();
          this.unmount();
        }
        onFirstRender() {
          return this.view.getFolder();
        }
        render(state) {
          return this.view.render(state);
        }
      };
      Box2.VERSION = packageJson.version;
      module.exports = Box2;
    }
  });

  // ../packages/@uppy/box/lib/index.js
  var require_lib16 = __commonJS({
    "../packages/@uppy/box/lib/index.js"(exports, module) {
      "use strict";
      module.exports = require_Box();
    }
  });

  // ../node_modules/cropperjs/dist/cropper.js
  var require_cropper = __commonJS({
    "../node_modules/cropperjs/dist/cropper.js"(exports, module) {
      (function(global2, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global2 = global2 || self, global2.Cropper = factory());
      })(exports, function() {
        "use strict";
        function _typeof(obj) {
          "@babel/helpers - typeof";
          if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
            _typeof = function(obj2) {
              return typeof obj2;
            };
          } else {
            _typeof = function(obj2) {
              return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
            };
          }
          return _typeof(obj);
        }
        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }
        function _defineProperties(target, props) {
          for (var i3 = 0; i3 < props.length; i3++) {
            var descriptor = props[i3];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor)
              descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps)
            _defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            _defineProperties(Constructor, staticProps);
          return Constructor;
        }
        function _defineProperty(obj, key, value) {
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value,
              enumerable: true,
              configurable: true,
              writable: true
            });
          } else {
            obj[key] = value;
          }
          return obj;
        }
        function ownKeys(object, enumerableOnly) {
          var keys = Object.keys(object);
          if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(object);
            if (enumerableOnly)
              symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
              });
            keys.push.apply(keys, symbols);
          }
          return keys;
        }
        function _objectSpread2(target) {
          for (var i3 = 1; i3 < arguments.length; i3++) {
            var source = arguments[i3] != null ? arguments[i3] : {};
            if (i3 % 2) {
              ownKeys(Object(source), true).forEach(function(key) {
                _defineProperty(target, key, source[key]);
              });
            } else if (Object.getOwnPropertyDescriptors) {
              Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
            } else {
              ownKeys(Object(source)).forEach(function(key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
              });
            }
          }
          return target;
        }
        function _toConsumableArray(arr) {
          return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
        }
        function _arrayWithoutHoles(arr) {
          if (Array.isArray(arr))
            return _arrayLikeToArray(arr);
        }
        function _iterableToArray(iter) {
          if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter))
            return Array.from(iter);
        }
        function _unsupportedIterableToArray(o3, minLen) {
          if (!o3)
            return;
          if (typeof o3 === "string")
            return _arrayLikeToArray(o3, minLen);
          var n2 = Object.prototype.toString.call(o3).slice(8, -1);
          if (n2 === "Object" && o3.constructor)
            n2 = o3.constructor.name;
          if (n2 === "Map" || n2 === "Set")
            return Array.from(o3);
          if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
            return _arrayLikeToArray(o3, minLen);
        }
        function _arrayLikeToArray(arr, len) {
          if (len == null || len > arr.length)
            len = arr.length;
          for (var i3 = 0, arr2 = new Array(len); i3 < len; i3++)
            arr2[i3] = arr[i3];
          return arr2;
        }
        function _nonIterableSpread() {
          throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var IS_BROWSER = typeof window !== "undefined" && typeof window.document !== "undefined";
        var WINDOW = IS_BROWSER ? window : {};
        var IS_TOUCH_DEVICE = IS_BROWSER && WINDOW.document.documentElement ? "ontouchstart" in WINDOW.document.documentElement : false;
        var HAS_POINTER_EVENT = IS_BROWSER ? "PointerEvent" in WINDOW : false;
        var NAMESPACE = "cropper";
        var ACTION_ALL = "all";
        var ACTION_CROP = "crop";
        var ACTION_MOVE = "move";
        var ACTION_ZOOM = "zoom";
        var ACTION_EAST = "e";
        var ACTION_WEST = "w";
        var ACTION_SOUTH = "s";
        var ACTION_NORTH = "n";
        var ACTION_NORTH_EAST = "ne";
        var ACTION_NORTH_WEST = "nw";
        var ACTION_SOUTH_EAST = "se";
        var ACTION_SOUTH_WEST = "sw";
        var CLASS_CROP = "".concat(NAMESPACE, "-crop");
        var CLASS_DISABLED = "".concat(NAMESPACE, "-disabled");
        var CLASS_HIDDEN = "".concat(NAMESPACE, "-hidden");
        var CLASS_HIDE = "".concat(NAMESPACE, "-hide");
        var CLASS_INVISIBLE = "".concat(NAMESPACE, "-invisible");
        var CLASS_MODAL = "".concat(NAMESPACE, "-modal");
        var CLASS_MOVE = "".concat(NAMESPACE, "-move");
        var DATA_ACTION = "".concat(NAMESPACE, "Action");
        var DATA_PREVIEW = "".concat(NAMESPACE, "Preview");
        var DRAG_MODE_CROP = "crop";
        var DRAG_MODE_MOVE = "move";
        var DRAG_MODE_NONE = "none";
        var EVENT_CROP = "crop";
        var EVENT_CROP_END = "cropend";
        var EVENT_CROP_MOVE = "cropmove";
        var EVENT_CROP_START = "cropstart";
        var EVENT_DBLCLICK = "dblclick";
        var EVENT_TOUCH_START = IS_TOUCH_DEVICE ? "touchstart" : "mousedown";
        var EVENT_TOUCH_MOVE = IS_TOUCH_DEVICE ? "touchmove" : "mousemove";
        var EVENT_TOUCH_END = IS_TOUCH_DEVICE ? "touchend touchcancel" : "mouseup";
        var EVENT_POINTER_DOWN = HAS_POINTER_EVENT ? "pointerdown" : EVENT_TOUCH_START;
        var EVENT_POINTER_MOVE = HAS_POINTER_EVENT ? "pointermove" : EVENT_TOUCH_MOVE;
        var EVENT_POINTER_UP = HAS_POINTER_EVENT ? "pointerup pointercancel" : EVENT_TOUCH_END;
        var EVENT_READY = "ready";
        var EVENT_RESIZE = "resize";
        var EVENT_WHEEL = "wheel";
        var EVENT_ZOOM = "zoom";
        var MIME_TYPE_JPEG = "image/jpeg";
        var REGEXP_ACTIONS = /^e|w|s|n|se|sw|ne|nw|all|crop|move|zoom$/;
        var REGEXP_DATA_URL = /^data:/;
        var REGEXP_DATA_URL_JPEG = /^data:image\/jpeg;base64,/;
        var REGEXP_TAG_NAME = /^img|canvas$/i;
        var DEFAULTS = {
          viewMode: 0,
          dragMode: DRAG_MODE_CROP,
          initialAspectRatio: NaN,
          aspectRatio: NaN,
          data: null,
          preview: "",
          responsive: true,
          restore: true,
          checkCrossOrigin: true,
          checkOrientation: true,
          modal: true,
          guides: true,
          center: true,
          highlight: true,
          background: true,
          autoCrop: true,
          autoCropArea: 0.8,
          movable: true,
          rotatable: true,
          scalable: true,
          zoomable: true,
          zoomOnTouch: true,
          zoomOnWheel: true,
          wheelZoomRatio: 0.1,
          cropBoxMovable: true,
          cropBoxResizable: true,
          toggleDragModeOnDblclick: true,
          minCanvasWidth: 0,
          minCanvasHeight: 0,
          minCropBoxWidth: 0,
          minCropBoxHeight: 0,
          minContainerWidth: 200,
          minContainerHeight: 100,
          ready: null,
          cropstart: null,
          cropmove: null,
          cropend: null,
          crop: null,
          zoom: null
        };
        var TEMPLATE = '<div class="cropper-container" touch-action="none"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-cropper-action="e"></span><span class="cropper-line line-n" data-cropper-action="n"></span><span class="cropper-line line-w" data-cropper-action="w"></span><span class="cropper-line line-s" data-cropper-action="s"></span><span class="cropper-point point-e" data-cropper-action="e"></span><span class="cropper-point point-n" data-cropper-action="n"></span><span class="cropper-point point-w" data-cropper-action="w"></span><span class="cropper-point point-s" data-cropper-action="s"></span><span class="cropper-point point-ne" data-cropper-action="ne"></span><span class="cropper-point point-nw" data-cropper-action="nw"></span><span class="cropper-point point-sw" data-cropper-action="sw"></span><span class="cropper-point point-se" data-cropper-action="se"></span></div></div>';
        var isNaN2 = Number.isNaN || WINDOW.isNaN;
        function isNumber(value) {
          return typeof value === "number" && !isNaN2(value);
        }
        var isPositiveNumber = function isPositiveNumber2(value) {
          return value > 0 && value < Infinity;
        };
        function isUndefined(value) {
          return typeof value === "undefined";
        }
        function isObject(value) {
          return _typeof(value) === "object" && value !== null;
        }
        var hasOwnProperty = Object.prototype.hasOwnProperty;
        function isPlainObject(value) {
          if (!isObject(value)) {
            return false;
          }
          try {
            var _constructor = value.constructor;
            var prototype = _constructor.prototype;
            return _constructor && prototype && hasOwnProperty.call(prototype, "isPrototypeOf");
          } catch (error) {
            return false;
          }
        }
        function isFunction(value) {
          return typeof value === "function";
        }
        var slice = Array.prototype.slice;
        function toArray(value) {
          return Array.from ? Array.from(value) : slice.call(value);
        }
        function forEach(data, callback) {
          if (data && isFunction(callback)) {
            if (Array.isArray(data) || isNumber(data.length)) {
              toArray(data).forEach(function(value, key) {
                callback.call(data, value, key, data);
              });
            } else if (isObject(data)) {
              Object.keys(data).forEach(function(key) {
                callback.call(data, data[key], key, data);
              });
            }
          }
          return data;
        }
        var assign = Object.assign || function assign2(target) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          if (isObject(target) && args.length > 0) {
            args.forEach(function(arg) {
              if (isObject(arg)) {
                Object.keys(arg).forEach(function(key) {
                  target[key] = arg[key];
                });
              }
            });
          }
          return target;
        };
        var REGEXP_DECIMALS = /\.\d*(?:0|9){12}\d*$/;
        function normalizeDecimalNumber(value) {
          var times = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e11;
          return REGEXP_DECIMALS.test(value) ? Math.round(value * times) / times : value;
        }
        var REGEXP_SUFFIX = /^width|height|left|top|marginLeft|marginTop$/;
        function setStyle(element, styles) {
          var style = element.style;
          forEach(styles, function(value, property) {
            if (REGEXP_SUFFIX.test(property) && isNumber(value)) {
              value = "".concat(value, "px");
            }
            style[property] = value;
          });
        }
        function hasClass(element, value) {
          return element.classList ? element.classList.contains(value) : element.className.indexOf(value) > -1;
        }
        function addClass(element, value) {
          if (!value) {
            return;
          }
          if (isNumber(element.length)) {
            forEach(element, function(elem) {
              addClass(elem, value);
            });
            return;
          }
          if (element.classList) {
            element.classList.add(value);
            return;
          }
          var className = element.className.trim();
          if (!className) {
            element.className = value;
          } else if (className.indexOf(value) < 0) {
            element.className = "".concat(className, " ").concat(value);
          }
        }
        function removeClass(element, value) {
          if (!value) {
            return;
          }
          if (isNumber(element.length)) {
            forEach(element, function(elem) {
              removeClass(elem, value);
            });
            return;
          }
          if (element.classList) {
            element.classList.remove(value);
            return;
          }
          if (element.className.indexOf(value) >= 0) {
            element.className = element.className.replace(value, "");
          }
        }
        function toggleClass(element, value, added) {
          if (!value) {
            return;
          }
          if (isNumber(element.length)) {
            forEach(element, function(elem) {
              toggleClass(elem, value, added);
            });
            return;
          }
          if (added) {
            addClass(element, value);
          } else {
            removeClass(element, value);
          }
        }
        var REGEXP_CAMEL_CASE = /([a-z\d])([A-Z])/g;
        function toParamCase(value) {
          return value.replace(REGEXP_CAMEL_CASE, "$1-$2").toLowerCase();
        }
        function getData(element, name) {
          if (isObject(element[name])) {
            return element[name];
          }
          if (element.dataset) {
            return element.dataset[name];
          }
          return element.getAttribute("data-".concat(toParamCase(name)));
        }
        function setData(element, name, data) {
          if (isObject(data)) {
            element[name] = data;
          } else if (element.dataset) {
            element.dataset[name] = data;
          } else {
            element.setAttribute("data-".concat(toParamCase(name)), data);
          }
        }
        function removeData(element, name) {
          if (isObject(element[name])) {
            try {
              delete element[name];
            } catch (error) {
              element[name] = void 0;
            }
          } else if (element.dataset) {
            try {
              delete element.dataset[name];
            } catch (error) {
              element.dataset[name] = void 0;
            }
          } else {
            element.removeAttribute("data-".concat(toParamCase(name)));
          }
        }
        var REGEXP_SPACES = /\s\s*/;
        var onceSupported = function() {
          var supported = false;
          if (IS_BROWSER) {
            var once = false;
            var listener = function listener2() {
            };
            var options = Object.defineProperty({}, "once", {
              get: function get() {
                supported = true;
                return once;
              },
              set: function set(value) {
                once = value;
              }
            });
            WINDOW.addEventListener("test", listener, options);
            WINDOW.removeEventListener("test", listener, options);
          }
          return supported;
        }();
        function removeListener(element, type, listener) {
          var options = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
          var handler = listener;
          type.trim().split(REGEXP_SPACES).forEach(function(event) {
            if (!onceSupported) {
              var listeners = element.listeners;
              if (listeners && listeners[event] && listeners[event][listener]) {
                handler = listeners[event][listener];
                delete listeners[event][listener];
                if (Object.keys(listeners[event]).length === 0) {
                  delete listeners[event];
                }
                if (Object.keys(listeners).length === 0) {
                  delete element.listeners;
                }
              }
            }
            element.removeEventListener(event, handler, options);
          });
        }
        function addListener(element, type, listener) {
          var options = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
          var _handler = listener;
          type.trim().split(REGEXP_SPACES).forEach(function(event) {
            if (options.once && !onceSupported) {
              var _element$listeners = element.listeners, listeners = _element$listeners === void 0 ? {} : _element$listeners;
              _handler = function handler() {
                delete listeners[event][listener];
                element.removeEventListener(event, _handler, options);
                for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                  args[_key2] = arguments[_key2];
                }
                listener.apply(element, args);
              };
              if (!listeners[event]) {
                listeners[event] = {};
              }
              if (listeners[event][listener]) {
                element.removeEventListener(event, listeners[event][listener], options);
              }
              listeners[event][listener] = _handler;
              element.listeners = listeners;
            }
            element.addEventListener(event, _handler, options);
          });
        }
        function dispatchEvent(element, type, data) {
          var event;
          if (isFunction(Event) && isFunction(CustomEvent)) {
            event = new CustomEvent(type, {
              detail: data,
              bubbles: true,
              cancelable: true
            });
          } else {
            event = document.createEvent("CustomEvent");
            event.initCustomEvent(type, true, true, data);
          }
          return element.dispatchEvent(event);
        }
        function getOffset(element) {
          var box = element.getBoundingClientRect();
          return {
            left: box.left + (window.pageXOffset - document.documentElement.clientLeft),
            top: box.top + (window.pageYOffset - document.documentElement.clientTop)
          };
        }
        var location2 = WINDOW.location;
        var REGEXP_ORIGINS = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i;
        function isCrossOriginURL(url) {
          var parts = url.match(REGEXP_ORIGINS);
          return parts !== null && (parts[1] !== location2.protocol || parts[2] !== location2.hostname || parts[3] !== location2.port);
        }
        function addTimestamp(url) {
          var timestamp = "timestamp=".concat(new Date().getTime());
          return url + (url.indexOf("?") === -1 ? "?" : "&") + timestamp;
        }
        function getTransforms(_ref) {
          var rotate = _ref.rotate, scaleX = _ref.scaleX, scaleY = _ref.scaleY, translateX = _ref.translateX, translateY = _ref.translateY;
          var values = [];
          if (isNumber(translateX) && translateX !== 0) {
            values.push("translateX(".concat(translateX, "px)"));
          }
          if (isNumber(translateY) && translateY !== 0) {
            values.push("translateY(".concat(translateY, "px)"));
          }
          if (isNumber(rotate) && rotate !== 0) {
            values.push("rotate(".concat(rotate, "deg)"));
          }
          if (isNumber(scaleX) && scaleX !== 1) {
            values.push("scaleX(".concat(scaleX, ")"));
          }
          if (isNumber(scaleY) && scaleY !== 1) {
            values.push("scaleY(".concat(scaleY, ")"));
          }
          var transform = values.length ? values.join(" ") : "none";
          return {
            WebkitTransform: transform,
            msTransform: transform,
            transform
          };
        }
        function getMaxZoomRatio(pointers) {
          var pointers2 = _objectSpread2({}, pointers);
          var ratios = [];
          forEach(pointers, function(pointer, pointerId) {
            delete pointers2[pointerId];
            forEach(pointers2, function(pointer2) {
              var x1 = Math.abs(pointer.startX - pointer2.startX);
              var y1 = Math.abs(pointer.startY - pointer2.startY);
              var x22 = Math.abs(pointer.endX - pointer2.endX);
              var y22 = Math.abs(pointer.endY - pointer2.endY);
              var z1 = Math.sqrt(x1 * x1 + y1 * y1);
              var z22 = Math.sqrt(x22 * x22 + y22 * y22);
              var ratio = (z22 - z1) / z1;
              ratios.push(ratio);
            });
          });
          ratios.sort(function(a3, b3) {
            return Math.abs(a3) < Math.abs(b3);
          });
          return ratios[0];
        }
        function getPointer(_ref2, endOnly) {
          var pageX = _ref2.pageX, pageY = _ref2.pageY;
          var end = {
            endX: pageX,
            endY: pageY
          };
          return endOnly ? end : _objectSpread2({
            startX: pageX,
            startY: pageY
          }, end);
        }
        function getPointersCenter(pointers) {
          var pageX = 0;
          var pageY = 0;
          var count = 0;
          forEach(pointers, function(_ref3) {
            var startX = _ref3.startX, startY = _ref3.startY;
            pageX += startX;
            pageY += startY;
            count += 1;
          });
          pageX /= count;
          pageY /= count;
          return {
            pageX,
            pageY
          };
        }
        function getAdjustedSizes(_ref4) {
          var aspectRatio = _ref4.aspectRatio, height = _ref4.height, width = _ref4.width;
          var type = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "contain";
          var isValidWidth = isPositiveNumber(width);
          var isValidHeight = isPositiveNumber(height);
          if (isValidWidth && isValidHeight) {
            var adjustedWidth = height * aspectRatio;
            if (type === "contain" && adjustedWidth > width || type === "cover" && adjustedWidth < width) {
              height = width / aspectRatio;
            } else {
              width = height * aspectRatio;
            }
          } else if (isValidWidth) {
            height = width / aspectRatio;
          } else if (isValidHeight) {
            width = height * aspectRatio;
          }
          return {
            width,
            height
          };
        }
        function getRotatedSizes(_ref5) {
          var width = _ref5.width, height = _ref5.height, degree = _ref5.degree;
          degree = Math.abs(degree) % 180;
          if (degree === 90) {
            return {
              width: height,
              height: width
            };
          }
          var arc = degree % 90 * Math.PI / 180;
          var sinArc = Math.sin(arc);
          var cosArc = Math.cos(arc);
          var newWidth = width * cosArc + height * sinArc;
          var newHeight = width * sinArc + height * cosArc;
          return degree > 90 ? {
            width: newHeight,
            height: newWidth
          } : {
            width: newWidth,
            height: newHeight
          };
        }
        function getSourceCanvas(image, _ref6, _ref7, _ref8) {
          var imageAspectRatio = _ref6.aspectRatio, imageNaturalWidth = _ref6.naturalWidth, imageNaturalHeight = _ref6.naturalHeight, _ref6$rotate = _ref6.rotate, rotate = _ref6$rotate === void 0 ? 0 : _ref6$rotate, _ref6$scaleX = _ref6.scaleX, scaleX = _ref6$scaleX === void 0 ? 1 : _ref6$scaleX, _ref6$scaleY = _ref6.scaleY, scaleY = _ref6$scaleY === void 0 ? 1 : _ref6$scaleY;
          var aspectRatio = _ref7.aspectRatio, naturalWidth = _ref7.naturalWidth, naturalHeight = _ref7.naturalHeight;
          var _ref8$fillColor = _ref8.fillColor, fillColor = _ref8$fillColor === void 0 ? "transparent" : _ref8$fillColor, _ref8$imageSmoothingE = _ref8.imageSmoothingEnabled, imageSmoothingEnabled = _ref8$imageSmoothingE === void 0 ? true : _ref8$imageSmoothingE, _ref8$imageSmoothingQ = _ref8.imageSmoothingQuality, imageSmoothingQuality = _ref8$imageSmoothingQ === void 0 ? "low" : _ref8$imageSmoothingQ, _ref8$maxWidth = _ref8.maxWidth, maxWidth = _ref8$maxWidth === void 0 ? Infinity : _ref8$maxWidth, _ref8$maxHeight = _ref8.maxHeight, maxHeight = _ref8$maxHeight === void 0 ? Infinity : _ref8$maxHeight, _ref8$minWidth = _ref8.minWidth, minWidth = _ref8$minWidth === void 0 ? 0 : _ref8$minWidth, _ref8$minHeight = _ref8.minHeight, minHeight = _ref8$minHeight === void 0 ? 0 : _ref8$minHeight;
          var canvas = document.createElement("canvas");
          var context = canvas.getContext("2d");
          var maxSizes = getAdjustedSizes({
            aspectRatio,
            width: maxWidth,
            height: maxHeight
          });
          var minSizes = getAdjustedSizes({
            aspectRatio,
            width: minWidth,
            height: minHeight
          }, "cover");
          var width = Math.min(maxSizes.width, Math.max(minSizes.width, naturalWidth));
          var height = Math.min(maxSizes.height, Math.max(minSizes.height, naturalHeight));
          var destMaxSizes = getAdjustedSizes({
            aspectRatio: imageAspectRatio,
            width: maxWidth,
            height: maxHeight
          });
          var destMinSizes = getAdjustedSizes({
            aspectRatio: imageAspectRatio,
            width: minWidth,
            height: minHeight
          }, "cover");
          var destWidth = Math.min(destMaxSizes.width, Math.max(destMinSizes.width, imageNaturalWidth));
          var destHeight = Math.min(destMaxSizes.height, Math.max(destMinSizes.height, imageNaturalHeight));
          var params = [-destWidth / 2, -destHeight / 2, destWidth, destHeight];
          canvas.width = normalizeDecimalNumber(width);
          canvas.height = normalizeDecimalNumber(height);
          context.fillStyle = fillColor;
          context.fillRect(0, 0, width, height);
          context.save();
          context.translate(width / 2, height / 2);
          context.rotate(rotate * Math.PI / 180);
          context.scale(scaleX, scaleY);
          context.imageSmoothingEnabled = imageSmoothingEnabled;
          context.imageSmoothingQuality = imageSmoothingQuality;
          context.drawImage.apply(context, [image].concat(_toConsumableArray(params.map(function(param) {
            return Math.floor(normalizeDecimalNumber(param));
          }))));
          context.restore();
          return canvas;
        }
        var fromCharCode = String.fromCharCode;
        function getStringFromCharCode(dataView, start, length) {
          var str = "";
          length += start;
          for (var i3 = start; i3 < length; i3 += 1) {
            str += fromCharCode(dataView.getUint8(i3));
          }
          return str;
        }
        var REGEXP_DATA_URL_HEAD = /^data:.*,/;
        function dataURLToArrayBuffer(dataURL) {
          var base64 = dataURL.replace(REGEXP_DATA_URL_HEAD, "");
          var binary = atob(base64);
          var arrayBuffer = new ArrayBuffer(binary.length);
          var uint8 = new Uint8Array(arrayBuffer);
          forEach(uint8, function(value, i3) {
            uint8[i3] = binary.charCodeAt(i3);
          });
          return arrayBuffer;
        }
        function arrayBufferToDataURL(arrayBuffer, mimeType) {
          var chunks = [];
          var chunkSize = 8192;
          var uint8 = new Uint8Array(arrayBuffer);
          while (uint8.length > 0) {
            chunks.push(fromCharCode.apply(null, toArray(uint8.subarray(0, chunkSize))));
            uint8 = uint8.subarray(chunkSize);
          }
          return "data:".concat(mimeType, ";base64,").concat(btoa(chunks.join("")));
        }
        function resetAndGetOrientation(arrayBuffer) {
          var dataView = new DataView(arrayBuffer);
          var orientation;
          try {
            var littleEndian;
            var app1Start;
            var ifdStart;
            if (dataView.getUint8(0) === 255 && dataView.getUint8(1) === 216) {
              var length = dataView.byteLength;
              var offset = 2;
              while (offset + 1 < length) {
                if (dataView.getUint8(offset) === 255 && dataView.getUint8(offset + 1) === 225) {
                  app1Start = offset;
                  break;
                }
                offset += 1;
              }
            }
            if (app1Start) {
              var exifIDCode = app1Start + 4;
              var tiffOffset = app1Start + 10;
              if (getStringFromCharCode(dataView, exifIDCode, 4) === "Exif") {
                var endianness = dataView.getUint16(tiffOffset);
                littleEndian = endianness === 18761;
                if (littleEndian || endianness === 19789) {
                  if (dataView.getUint16(tiffOffset + 2, littleEndian) === 42) {
                    var firstIFDOffset = dataView.getUint32(tiffOffset + 4, littleEndian);
                    if (firstIFDOffset >= 8) {
                      ifdStart = tiffOffset + firstIFDOffset;
                    }
                  }
                }
              }
            }
            if (ifdStart) {
              var _length = dataView.getUint16(ifdStart, littleEndian);
              var _offset;
              var i3;
              for (i3 = 0; i3 < _length; i3 += 1) {
                _offset = ifdStart + i3 * 12 + 2;
                if (dataView.getUint16(_offset, littleEndian) === 274) {
                  _offset += 8;
                  orientation = dataView.getUint16(_offset, littleEndian);
                  dataView.setUint16(_offset, 1, littleEndian);
                  break;
                }
              }
            }
          } catch (error) {
            orientation = 1;
          }
          return orientation;
        }
        function parseOrientation(orientation) {
          var rotate = 0;
          var scaleX = 1;
          var scaleY = 1;
          switch (orientation) {
            case 2:
              scaleX = -1;
              break;
            case 3:
              rotate = -180;
              break;
            case 4:
              scaleY = -1;
              break;
            case 5:
              rotate = 90;
              scaleY = -1;
              break;
            case 6:
              rotate = 90;
              break;
            case 7:
              rotate = 90;
              scaleX = -1;
              break;
            case 8:
              rotate = -90;
              break;
          }
          return {
            rotate,
            scaleX,
            scaleY
          };
        }
        var render = {
          render: function render2() {
            this.initContainer();
            this.initCanvas();
            this.initCropBox();
            this.renderCanvas();
            if (this.cropped) {
              this.renderCropBox();
            }
          },
          initContainer: function initContainer() {
            var element = this.element, options = this.options, container = this.container, cropper = this.cropper;
            addClass(cropper, CLASS_HIDDEN);
            removeClass(element, CLASS_HIDDEN);
            var containerData = {
              width: Math.max(container.offsetWidth, Number(options.minContainerWidth) || 200),
              height: Math.max(container.offsetHeight, Number(options.minContainerHeight) || 100)
            };
            this.containerData = containerData;
            setStyle(cropper, {
              width: containerData.width,
              height: containerData.height
            });
            addClass(element, CLASS_HIDDEN);
            removeClass(cropper, CLASS_HIDDEN);
          },
          initCanvas: function initCanvas() {
            var containerData = this.containerData, imageData = this.imageData;
            var viewMode = this.options.viewMode;
            var rotated = Math.abs(imageData.rotate) % 180 === 90;
            var naturalWidth = rotated ? imageData.naturalHeight : imageData.naturalWidth;
            var naturalHeight = rotated ? imageData.naturalWidth : imageData.naturalHeight;
            var aspectRatio = naturalWidth / naturalHeight;
            var canvasWidth = containerData.width;
            var canvasHeight = containerData.height;
            if (containerData.height * aspectRatio > containerData.width) {
              if (viewMode === 3) {
                canvasWidth = containerData.height * aspectRatio;
              } else {
                canvasHeight = containerData.width / aspectRatio;
              }
            } else if (viewMode === 3) {
              canvasHeight = containerData.width / aspectRatio;
            } else {
              canvasWidth = containerData.height * aspectRatio;
            }
            var canvasData = {
              aspectRatio,
              naturalWidth,
              naturalHeight,
              width: canvasWidth,
              height: canvasHeight
            };
            canvasData.left = (containerData.width - canvasWidth) / 2;
            canvasData.top = (containerData.height - canvasHeight) / 2;
            canvasData.oldLeft = canvasData.left;
            canvasData.oldTop = canvasData.top;
            this.canvasData = canvasData;
            this.limited = viewMode === 1 || viewMode === 2;
            this.limitCanvas(true, true);
            this.initialImageData = assign({}, imageData);
            this.initialCanvasData = assign({}, canvasData);
          },
          limitCanvas: function limitCanvas(sizeLimited, positionLimited) {
            var options = this.options, containerData = this.containerData, canvasData = this.canvasData, cropBoxData = this.cropBoxData;
            var viewMode = options.viewMode;
            var aspectRatio = canvasData.aspectRatio;
            var cropped = this.cropped && cropBoxData;
            if (sizeLimited) {
              var minCanvasWidth = Number(options.minCanvasWidth) || 0;
              var minCanvasHeight = Number(options.minCanvasHeight) || 0;
              if (viewMode > 1) {
                minCanvasWidth = Math.max(minCanvasWidth, containerData.width);
                minCanvasHeight = Math.max(minCanvasHeight, containerData.height);
                if (viewMode === 3) {
                  if (minCanvasHeight * aspectRatio > minCanvasWidth) {
                    minCanvasWidth = minCanvasHeight * aspectRatio;
                  } else {
                    minCanvasHeight = minCanvasWidth / aspectRatio;
                  }
                }
              } else if (viewMode > 0) {
                if (minCanvasWidth) {
                  minCanvasWidth = Math.max(minCanvasWidth, cropped ? cropBoxData.width : 0);
                } else if (minCanvasHeight) {
                  minCanvasHeight = Math.max(minCanvasHeight, cropped ? cropBoxData.height : 0);
                } else if (cropped) {
                  minCanvasWidth = cropBoxData.width;
                  minCanvasHeight = cropBoxData.height;
                  if (minCanvasHeight * aspectRatio > minCanvasWidth) {
                    minCanvasWidth = minCanvasHeight * aspectRatio;
                  } else {
                    minCanvasHeight = minCanvasWidth / aspectRatio;
                  }
                }
              }
              var _getAdjustedSizes = getAdjustedSizes({
                aspectRatio,
                width: minCanvasWidth,
                height: minCanvasHeight
              });
              minCanvasWidth = _getAdjustedSizes.width;
              minCanvasHeight = _getAdjustedSizes.height;
              canvasData.minWidth = minCanvasWidth;
              canvasData.minHeight = minCanvasHeight;
              canvasData.maxWidth = Infinity;
              canvasData.maxHeight = Infinity;
            }
            if (positionLimited) {
              if (viewMode > (cropped ? 0 : 1)) {
                var newCanvasLeft = containerData.width - canvasData.width;
                var newCanvasTop = containerData.height - canvasData.height;
                canvasData.minLeft = Math.min(0, newCanvasLeft);
                canvasData.minTop = Math.min(0, newCanvasTop);
                canvasData.maxLeft = Math.max(0, newCanvasLeft);
                canvasData.maxTop = Math.max(0, newCanvasTop);
                if (cropped && this.limited) {
                  canvasData.minLeft = Math.min(cropBoxData.left, cropBoxData.left + (cropBoxData.width - canvasData.width));
                  canvasData.minTop = Math.min(cropBoxData.top, cropBoxData.top + (cropBoxData.height - canvasData.height));
                  canvasData.maxLeft = cropBoxData.left;
                  canvasData.maxTop = cropBoxData.top;
                  if (viewMode === 2) {
                    if (canvasData.width >= containerData.width) {
                      canvasData.minLeft = Math.min(0, newCanvasLeft);
                      canvasData.maxLeft = Math.max(0, newCanvasLeft);
                    }
                    if (canvasData.height >= containerData.height) {
                      canvasData.minTop = Math.min(0, newCanvasTop);
                      canvasData.maxTop = Math.max(0, newCanvasTop);
                    }
                  }
                }
              } else {
                canvasData.minLeft = -canvasData.width;
                canvasData.minTop = -canvasData.height;
                canvasData.maxLeft = containerData.width;
                canvasData.maxTop = containerData.height;
              }
            }
          },
          renderCanvas: function renderCanvas(changed, transformed) {
            var canvasData = this.canvasData, imageData = this.imageData;
            if (transformed) {
              var _getRotatedSizes = getRotatedSizes({
                width: imageData.naturalWidth * Math.abs(imageData.scaleX || 1),
                height: imageData.naturalHeight * Math.abs(imageData.scaleY || 1),
                degree: imageData.rotate || 0
              }), naturalWidth = _getRotatedSizes.width, naturalHeight = _getRotatedSizes.height;
              var width = canvasData.width * (naturalWidth / canvasData.naturalWidth);
              var height = canvasData.height * (naturalHeight / canvasData.naturalHeight);
              canvasData.left -= (width - canvasData.width) / 2;
              canvasData.top -= (height - canvasData.height) / 2;
              canvasData.width = width;
              canvasData.height = height;
              canvasData.aspectRatio = naturalWidth / naturalHeight;
              canvasData.naturalWidth = naturalWidth;
              canvasData.naturalHeight = naturalHeight;
              this.limitCanvas(true, false);
            }
            if (canvasData.width > canvasData.maxWidth || canvasData.width < canvasData.minWidth) {
              canvasData.left = canvasData.oldLeft;
            }
            if (canvasData.height > canvasData.maxHeight || canvasData.height < canvasData.minHeight) {
              canvasData.top = canvasData.oldTop;
            }
            canvasData.width = Math.min(Math.max(canvasData.width, canvasData.minWidth), canvasData.maxWidth);
            canvasData.height = Math.min(Math.max(canvasData.height, canvasData.minHeight), canvasData.maxHeight);
            this.limitCanvas(false, true);
            canvasData.left = Math.min(Math.max(canvasData.left, canvasData.minLeft), canvasData.maxLeft);
            canvasData.top = Math.min(Math.max(canvasData.top, canvasData.minTop), canvasData.maxTop);
            canvasData.oldLeft = canvasData.left;
            canvasData.oldTop = canvasData.top;
            setStyle(this.canvas, assign({
              width: canvasData.width,
              height: canvasData.height
            }, getTransforms({
              translateX: canvasData.left,
              translateY: canvasData.top
            })));
            this.renderImage(changed);
            if (this.cropped && this.limited) {
              this.limitCropBox(true, true);
            }
          },
          renderImage: function renderImage(changed) {
            var canvasData = this.canvasData, imageData = this.imageData;
            var width = imageData.naturalWidth * (canvasData.width / canvasData.naturalWidth);
            var height = imageData.naturalHeight * (canvasData.height / canvasData.naturalHeight);
            assign(imageData, {
              width,
              height,
              left: (canvasData.width - width) / 2,
              top: (canvasData.height - height) / 2
            });
            setStyle(this.image, assign({
              width: imageData.width,
              height: imageData.height
            }, getTransforms(assign({
              translateX: imageData.left,
              translateY: imageData.top
            }, imageData))));
            if (changed) {
              this.output();
            }
          },
          initCropBox: function initCropBox() {
            var options = this.options, canvasData = this.canvasData;
            var aspectRatio = options.aspectRatio || options.initialAspectRatio;
            var autoCropArea = Number(options.autoCropArea) || 0.8;
            var cropBoxData = {
              width: canvasData.width,
              height: canvasData.height
            };
            if (aspectRatio) {
              if (canvasData.height * aspectRatio > canvasData.width) {
                cropBoxData.height = cropBoxData.width / aspectRatio;
              } else {
                cropBoxData.width = cropBoxData.height * aspectRatio;
              }
            }
            this.cropBoxData = cropBoxData;
            this.limitCropBox(true, true);
            cropBoxData.width = Math.min(Math.max(cropBoxData.width, cropBoxData.minWidth), cropBoxData.maxWidth);
            cropBoxData.height = Math.min(Math.max(cropBoxData.height, cropBoxData.minHeight), cropBoxData.maxHeight);
            cropBoxData.width = Math.max(cropBoxData.minWidth, cropBoxData.width * autoCropArea);
            cropBoxData.height = Math.max(cropBoxData.minHeight, cropBoxData.height * autoCropArea);
            cropBoxData.left = canvasData.left + (canvasData.width - cropBoxData.width) / 2;
            cropBoxData.top = canvasData.top + (canvasData.height - cropBoxData.height) / 2;
            cropBoxData.oldLeft = cropBoxData.left;
            cropBoxData.oldTop = cropBoxData.top;
            this.initialCropBoxData = assign({}, cropBoxData);
          },
          limitCropBox: function limitCropBox(sizeLimited, positionLimited) {
            var options = this.options, containerData = this.containerData, canvasData = this.canvasData, cropBoxData = this.cropBoxData, limited = this.limited;
            var aspectRatio = options.aspectRatio;
            if (sizeLimited) {
              var minCropBoxWidth = Number(options.minCropBoxWidth) || 0;
              var minCropBoxHeight = Number(options.minCropBoxHeight) || 0;
              var maxCropBoxWidth = limited ? Math.min(containerData.width, canvasData.width, canvasData.width + canvasData.left, containerData.width - canvasData.left) : containerData.width;
              var maxCropBoxHeight = limited ? Math.min(containerData.height, canvasData.height, canvasData.height + canvasData.top, containerData.height - canvasData.top) : containerData.height;
              minCropBoxWidth = Math.min(minCropBoxWidth, containerData.width);
              minCropBoxHeight = Math.min(minCropBoxHeight, containerData.height);
              if (aspectRatio) {
                if (minCropBoxWidth && minCropBoxHeight) {
                  if (minCropBoxHeight * aspectRatio > minCropBoxWidth) {
                    minCropBoxHeight = minCropBoxWidth / aspectRatio;
                  } else {
                    minCropBoxWidth = minCropBoxHeight * aspectRatio;
                  }
                } else if (minCropBoxWidth) {
                  minCropBoxHeight = minCropBoxWidth / aspectRatio;
                } else if (minCropBoxHeight) {
                  minCropBoxWidth = minCropBoxHeight * aspectRatio;
                }
                if (maxCropBoxHeight * aspectRatio > maxCropBoxWidth) {
                  maxCropBoxHeight = maxCropBoxWidth / aspectRatio;
                } else {
                  maxCropBoxWidth = maxCropBoxHeight * aspectRatio;
                }
              }
              cropBoxData.minWidth = Math.min(minCropBoxWidth, maxCropBoxWidth);
              cropBoxData.minHeight = Math.min(minCropBoxHeight, maxCropBoxHeight);
              cropBoxData.maxWidth = maxCropBoxWidth;
              cropBoxData.maxHeight = maxCropBoxHeight;
            }
            if (positionLimited) {
              if (limited) {
                cropBoxData.minLeft = Math.max(0, canvasData.left);
                cropBoxData.minTop = Math.max(0, canvasData.top);
                cropBoxData.maxLeft = Math.min(containerData.width, canvasData.left + canvasData.width) - cropBoxData.width;
                cropBoxData.maxTop = Math.min(containerData.height, canvasData.top + canvasData.height) - cropBoxData.height;
              } else {
                cropBoxData.minLeft = 0;
                cropBoxData.minTop = 0;
                cropBoxData.maxLeft = containerData.width - cropBoxData.width;
                cropBoxData.maxTop = containerData.height - cropBoxData.height;
              }
            }
          },
          renderCropBox: function renderCropBox() {
            var options = this.options, containerData = this.containerData, cropBoxData = this.cropBoxData;
            if (cropBoxData.width > cropBoxData.maxWidth || cropBoxData.width < cropBoxData.minWidth) {
              cropBoxData.left = cropBoxData.oldLeft;
            }
            if (cropBoxData.height > cropBoxData.maxHeight || cropBoxData.height < cropBoxData.minHeight) {
              cropBoxData.top = cropBoxData.oldTop;
            }
            cropBoxData.width = Math.min(Math.max(cropBoxData.width, cropBoxData.minWidth), cropBoxData.maxWidth);
            cropBoxData.height = Math.min(Math.max(cropBoxData.height, cropBoxData.minHeight), cropBoxData.maxHeight);
            this.limitCropBox(false, true);
            cropBoxData.left = Math.min(Math.max(cropBoxData.left, cropBoxData.minLeft), cropBoxData.maxLeft);
            cropBoxData.top = Math.min(Math.max(cropBoxData.top, cropBoxData.minTop), cropBoxData.maxTop);
            cropBoxData.oldLeft = cropBoxData.left;
            cropBoxData.oldTop = cropBoxData.top;
            if (options.movable && options.cropBoxMovable) {
              setData(this.face, DATA_ACTION, cropBoxData.width >= containerData.width && cropBoxData.height >= containerData.height ? ACTION_MOVE : ACTION_ALL);
            }
            setStyle(this.cropBox, assign({
              width: cropBoxData.width,
              height: cropBoxData.height
            }, getTransforms({
              translateX: cropBoxData.left,
              translateY: cropBoxData.top
            })));
            if (this.cropped && this.limited) {
              this.limitCanvas(true, true);
            }
            if (!this.disabled) {
              this.output();
            }
          },
          output: function output() {
            this.preview();
            dispatchEvent(this.element, EVENT_CROP, this.getData());
          }
        };
        var preview = {
          initPreview: function initPreview() {
            var element = this.element, crossOrigin = this.crossOrigin;
            var preview2 = this.options.preview;
            var url = crossOrigin ? this.crossOriginUrl : this.url;
            var alt = element.alt || "The image to preview";
            var image = document.createElement("img");
            if (crossOrigin) {
              image.crossOrigin = crossOrigin;
            }
            image.src = url;
            image.alt = alt;
            this.viewBox.appendChild(image);
            this.viewBoxImage = image;
            if (!preview2) {
              return;
            }
            var previews = preview2;
            if (typeof preview2 === "string") {
              previews = element.ownerDocument.querySelectorAll(preview2);
            } else if (preview2.querySelector) {
              previews = [preview2];
            }
            this.previews = previews;
            forEach(previews, function(el) {
              var img = document.createElement("img");
              setData(el, DATA_PREVIEW, {
                width: el.offsetWidth,
                height: el.offsetHeight,
                html: el.innerHTML
              });
              if (crossOrigin) {
                img.crossOrigin = crossOrigin;
              }
              img.src = url;
              img.alt = alt;
              img.style.cssText = 'display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;"';
              el.innerHTML = "";
              el.appendChild(img);
            });
          },
          resetPreview: function resetPreview() {
            forEach(this.previews, function(element) {
              var data = getData(element, DATA_PREVIEW);
              setStyle(element, {
                width: data.width,
                height: data.height
              });
              element.innerHTML = data.html;
              removeData(element, DATA_PREVIEW);
            });
          },
          preview: function preview2() {
            var imageData = this.imageData, canvasData = this.canvasData, cropBoxData = this.cropBoxData;
            var cropBoxWidth = cropBoxData.width, cropBoxHeight = cropBoxData.height;
            var width = imageData.width, height = imageData.height;
            var left = cropBoxData.left - canvasData.left - imageData.left;
            var top = cropBoxData.top - canvasData.top - imageData.top;
            if (!this.cropped || this.disabled) {
              return;
            }
            setStyle(this.viewBoxImage, assign({
              width,
              height
            }, getTransforms(assign({
              translateX: -left,
              translateY: -top
            }, imageData))));
            forEach(this.previews, function(element) {
              var data = getData(element, DATA_PREVIEW);
              var originalWidth = data.width;
              var originalHeight = data.height;
              var newWidth = originalWidth;
              var newHeight = originalHeight;
              var ratio = 1;
              if (cropBoxWidth) {
                ratio = originalWidth / cropBoxWidth;
                newHeight = cropBoxHeight * ratio;
              }
              if (cropBoxHeight && newHeight > originalHeight) {
                ratio = originalHeight / cropBoxHeight;
                newWidth = cropBoxWidth * ratio;
                newHeight = originalHeight;
              }
              setStyle(element, {
                width: newWidth,
                height: newHeight
              });
              setStyle(element.getElementsByTagName("img")[0], assign({
                width: width * ratio,
                height: height * ratio
              }, getTransforms(assign({
                translateX: -left * ratio,
                translateY: -top * ratio
              }, imageData))));
            });
          }
        };
        var events = {
          bind: function bind() {
            var element = this.element, options = this.options, cropper = this.cropper;
            if (isFunction(options.cropstart)) {
              addListener(element, EVENT_CROP_START, options.cropstart);
            }
            if (isFunction(options.cropmove)) {
              addListener(element, EVENT_CROP_MOVE, options.cropmove);
            }
            if (isFunction(options.cropend)) {
              addListener(element, EVENT_CROP_END, options.cropend);
            }
            if (isFunction(options.crop)) {
              addListener(element, EVENT_CROP, options.crop);
            }
            if (isFunction(options.zoom)) {
              addListener(element, EVENT_ZOOM, options.zoom);
            }
            addListener(cropper, EVENT_POINTER_DOWN, this.onCropStart = this.cropStart.bind(this));
            if (options.zoomable && options.zoomOnWheel) {
              addListener(cropper, EVENT_WHEEL, this.onWheel = this.wheel.bind(this), {
                passive: false,
                capture: true
              });
            }
            if (options.toggleDragModeOnDblclick) {
              addListener(cropper, EVENT_DBLCLICK, this.onDblclick = this.dblclick.bind(this));
            }
            addListener(element.ownerDocument, EVENT_POINTER_MOVE, this.onCropMove = this.cropMove.bind(this));
            addListener(element.ownerDocument, EVENT_POINTER_UP, this.onCropEnd = this.cropEnd.bind(this));
            if (options.responsive) {
              addListener(window, EVENT_RESIZE, this.onResize = this.resize.bind(this));
            }
          },
          unbind: function unbind() {
            var element = this.element, options = this.options, cropper = this.cropper;
            if (isFunction(options.cropstart)) {
              removeListener(element, EVENT_CROP_START, options.cropstart);
            }
            if (isFunction(options.cropmove)) {
              removeListener(element, EVENT_CROP_MOVE, options.cropmove);
            }
            if (isFunction(options.cropend)) {
              removeListener(element, EVENT_CROP_END, options.cropend);
            }
            if (isFunction(options.crop)) {
              removeListener(element, EVENT_CROP, options.crop);
            }
            if (isFunction(options.zoom)) {
              removeListener(element, EVENT_ZOOM, options.zoom);
            }
            removeListener(cropper, EVENT_POINTER_DOWN, this.onCropStart);
            if (options.zoomable && options.zoomOnWheel) {
              removeListener(cropper, EVENT_WHEEL, this.onWheel, {
                passive: false,
                capture: true
              });
            }
            if (options.toggleDragModeOnDblclick) {
              removeListener(cropper, EVENT_DBLCLICK, this.onDblclick);
            }
            removeListener(element.ownerDocument, EVENT_POINTER_MOVE, this.onCropMove);
            removeListener(element.ownerDocument, EVENT_POINTER_UP, this.onCropEnd);
            if (options.responsive) {
              removeListener(window, EVENT_RESIZE, this.onResize);
            }
          }
        };
        var handlers = {
          resize: function resize() {
            if (this.disabled) {
              return;
            }
            var options = this.options, container = this.container, containerData = this.containerData;
            var ratio = container.offsetWidth / containerData.width;
            if (ratio !== 1 || container.offsetHeight !== containerData.height) {
              var canvasData;
              var cropBoxData;
              if (options.restore) {
                canvasData = this.getCanvasData();
                cropBoxData = this.getCropBoxData();
              }
              this.render();
              if (options.restore) {
                this.setCanvasData(forEach(canvasData, function(n2, i3) {
                  canvasData[i3] = n2 * ratio;
                }));
                this.setCropBoxData(forEach(cropBoxData, function(n2, i3) {
                  cropBoxData[i3] = n2 * ratio;
                }));
              }
            }
          },
          dblclick: function dblclick() {
            if (this.disabled || this.options.dragMode === DRAG_MODE_NONE) {
              return;
            }
            this.setDragMode(hasClass(this.dragBox, CLASS_CROP) ? DRAG_MODE_MOVE : DRAG_MODE_CROP);
          },
          wheel: function wheel(event) {
            var _this = this;
            var ratio = Number(this.options.wheelZoomRatio) || 0.1;
            var delta = 1;
            if (this.disabled) {
              return;
            }
            event.preventDefault();
            if (this.wheeling) {
              return;
            }
            this.wheeling = true;
            setTimeout(function() {
              _this.wheeling = false;
            }, 50);
            if (event.deltaY) {
              delta = event.deltaY > 0 ? 1 : -1;
            } else if (event.wheelDelta) {
              delta = -event.wheelDelta / 120;
            } else if (event.detail) {
              delta = event.detail > 0 ? 1 : -1;
            }
            this.zoom(-delta * ratio, event);
          },
          cropStart: function cropStart(event) {
            var buttons = event.buttons, button = event.button;
            if (this.disabled || (event.type === "mousedown" || event.type === "pointerdown" && event.pointerType === "mouse") && (isNumber(buttons) && buttons !== 1 || isNumber(button) && button !== 0 || event.ctrlKey)) {
              return;
            }
            var options = this.options, pointers = this.pointers;
            var action;
            if (event.changedTouches) {
              forEach(event.changedTouches, function(touch) {
                pointers[touch.identifier] = getPointer(touch);
              });
            } else {
              pointers[event.pointerId || 0] = getPointer(event);
            }
            if (Object.keys(pointers).length > 1 && options.zoomable && options.zoomOnTouch) {
              action = ACTION_ZOOM;
            } else {
              action = getData(event.target, DATA_ACTION);
            }
            if (!REGEXP_ACTIONS.test(action)) {
              return;
            }
            if (dispatchEvent(this.element, EVENT_CROP_START, {
              originalEvent: event,
              action
            }) === false) {
              return;
            }
            event.preventDefault();
            this.action = action;
            this.cropping = false;
            if (action === ACTION_CROP) {
              this.cropping = true;
              addClass(this.dragBox, CLASS_MODAL);
            }
          },
          cropMove: function cropMove(event) {
            var action = this.action;
            if (this.disabled || !action) {
              return;
            }
            var pointers = this.pointers;
            event.preventDefault();
            if (dispatchEvent(this.element, EVENT_CROP_MOVE, {
              originalEvent: event,
              action
            }) === false) {
              return;
            }
            if (event.changedTouches) {
              forEach(event.changedTouches, function(touch) {
                assign(pointers[touch.identifier] || {}, getPointer(touch, true));
              });
            } else {
              assign(pointers[event.pointerId || 0] || {}, getPointer(event, true));
            }
            this.change(event);
          },
          cropEnd: function cropEnd(event) {
            if (this.disabled) {
              return;
            }
            var action = this.action, pointers = this.pointers;
            if (event.changedTouches) {
              forEach(event.changedTouches, function(touch) {
                delete pointers[touch.identifier];
              });
            } else {
              delete pointers[event.pointerId || 0];
            }
            if (!action) {
              return;
            }
            event.preventDefault();
            if (!Object.keys(pointers).length) {
              this.action = "";
            }
            if (this.cropping) {
              this.cropping = false;
              toggleClass(this.dragBox, CLASS_MODAL, this.cropped && this.options.modal);
            }
            dispatchEvent(this.element, EVENT_CROP_END, {
              originalEvent: event,
              action
            });
          }
        };
        var change = {
          change: function change2(event) {
            var options = this.options, canvasData = this.canvasData, containerData = this.containerData, cropBoxData = this.cropBoxData, pointers = this.pointers;
            var action = this.action;
            var aspectRatio = options.aspectRatio;
            var left = cropBoxData.left, top = cropBoxData.top, width = cropBoxData.width, height = cropBoxData.height;
            var right = left + width;
            var bottom = top + height;
            var minLeft = 0;
            var minTop = 0;
            var maxWidth = containerData.width;
            var maxHeight = containerData.height;
            var renderable = true;
            var offset;
            if (!aspectRatio && event.shiftKey) {
              aspectRatio = width && height ? width / height : 1;
            }
            if (this.limited) {
              minLeft = cropBoxData.minLeft;
              minTop = cropBoxData.minTop;
              maxWidth = minLeft + Math.min(containerData.width, canvasData.width, canvasData.left + canvasData.width);
              maxHeight = minTop + Math.min(containerData.height, canvasData.height, canvasData.top + canvasData.height);
            }
            var pointer = pointers[Object.keys(pointers)[0]];
            var range = {
              x: pointer.endX - pointer.startX,
              y: pointer.endY - pointer.startY
            };
            var check = function check2(side) {
              switch (side) {
                case ACTION_EAST:
                  if (right + range.x > maxWidth) {
                    range.x = maxWidth - right;
                  }
                  break;
                case ACTION_WEST:
                  if (left + range.x < minLeft) {
                    range.x = minLeft - left;
                  }
                  break;
                case ACTION_NORTH:
                  if (top + range.y < minTop) {
                    range.y = minTop - top;
                  }
                  break;
                case ACTION_SOUTH:
                  if (bottom + range.y > maxHeight) {
                    range.y = maxHeight - bottom;
                  }
                  break;
              }
            };
            switch (action) {
              case ACTION_ALL:
                left += range.x;
                top += range.y;
                break;
              case ACTION_EAST:
                if (range.x >= 0 && (right >= maxWidth || aspectRatio && (top <= minTop || bottom >= maxHeight))) {
                  renderable = false;
                  break;
                }
                check(ACTION_EAST);
                width += range.x;
                if (width < 0) {
                  action = ACTION_WEST;
                  width = -width;
                  left -= width;
                }
                if (aspectRatio) {
                  height = width / aspectRatio;
                  top += (cropBoxData.height - height) / 2;
                }
                break;
              case ACTION_NORTH:
                if (range.y <= 0 && (top <= minTop || aspectRatio && (left <= minLeft || right >= maxWidth))) {
                  renderable = false;
                  break;
                }
                check(ACTION_NORTH);
                height -= range.y;
                top += range.y;
                if (height < 0) {
                  action = ACTION_SOUTH;
                  height = -height;
                  top -= height;
                }
                if (aspectRatio) {
                  width = height * aspectRatio;
                  left += (cropBoxData.width - width) / 2;
                }
                break;
              case ACTION_WEST:
                if (range.x <= 0 && (left <= minLeft || aspectRatio && (top <= minTop || bottom >= maxHeight))) {
                  renderable = false;
                  break;
                }
                check(ACTION_WEST);
                width -= range.x;
                left += range.x;
                if (width < 0) {
                  action = ACTION_EAST;
                  width = -width;
                  left -= width;
                }
                if (aspectRatio) {
                  height = width / aspectRatio;
                  top += (cropBoxData.height - height) / 2;
                }
                break;
              case ACTION_SOUTH:
                if (range.y >= 0 && (bottom >= maxHeight || aspectRatio && (left <= minLeft || right >= maxWidth))) {
                  renderable = false;
                  break;
                }
                check(ACTION_SOUTH);
                height += range.y;
                if (height < 0) {
                  action = ACTION_NORTH;
                  height = -height;
                  top -= height;
                }
                if (aspectRatio) {
                  width = height * aspectRatio;
                  left += (cropBoxData.width - width) / 2;
                }
                break;
              case ACTION_NORTH_EAST:
                if (aspectRatio) {
                  if (range.y <= 0 && (top <= minTop || right >= maxWidth)) {
                    renderable = false;
                    break;
                  }
                  check(ACTION_NORTH);
                  height -= range.y;
                  top += range.y;
                  width = height * aspectRatio;
                } else {
                  check(ACTION_NORTH);
                  check(ACTION_EAST);
                  if (range.x >= 0) {
                    if (right < maxWidth) {
                      width += range.x;
                    } else if (range.y <= 0 && top <= minTop) {
                      renderable = false;
                    }
                  } else {
                    width += range.x;
                  }
                  if (range.y <= 0) {
                    if (top > minTop) {
                      height -= range.y;
                      top += range.y;
                    }
                  } else {
                    height -= range.y;
                    top += range.y;
                  }
                }
                if (width < 0 && height < 0) {
                  action = ACTION_SOUTH_WEST;
                  height = -height;
                  width = -width;
                  top -= height;
                  left -= width;
                } else if (width < 0) {
                  action = ACTION_NORTH_WEST;
                  width = -width;
                  left -= width;
                } else if (height < 0) {
                  action = ACTION_SOUTH_EAST;
                  height = -height;
                  top -= height;
                }
                break;
              case ACTION_NORTH_WEST:
                if (aspectRatio) {
                  if (range.y <= 0 && (top <= minTop || left <= minLeft)) {
                    renderable = false;
                    break;
                  }
                  check(ACTION_NORTH);
                  height -= range.y;
                  top += range.y;
                  width = height * aspectRatio;
                  left += cropBoxData.width - width;
                } else {
                  check(ACTION_NORTH);
                  check(ACTION_WEST);
                  if (range.x <= 0) {
                    if (left > minLeft) {
                      width -= range.x;
                      left += range.x;
                    } else if (range.y <= 0 && top <= minTop) {
                      renderable = false;
                    }
                  } else {
                    width -= range.x;
                    left += range.x;
                  }
                  if (range.y <= 0) {
                    if (top > minTop) {
                      height -= range.y;
                      top += range.y;
                    }
                  } else {
                    height -= range.y;
                    top += range.y;
                  }
                }
                if (width < 0 && height < 0) {
                  action = ACTION_SOUTH_EAST;
                  height = -height;
                  width = -width;
                  top -= height;
                  left -= width;
                } else if (width < 0) {
                  action = ACTION_NORTH_EAST;
                  width = -width;
                  left -= width;
                } else if (height < 0) {
                  action = ACTION_SOUTH_WEST;
                  height = -height;
                  top -= height;
                }
                break;
              case ACTION_SOUTH_WEST:
                if (aspectRatio) {
                  if (range.x <= 0 && (left <= minLeft || bottom >= maxHeight)) {
                    renderable = false;
                    break;
                  }
                  check(ACTION_WEST);
                  width -= range.x;
                  left += range.x;
                  height = width / aspectRatio;
                } else {
                  check(ACTION_SOUTH);
                  check(ACTION_WEST);
                  if (range.x <= 0) {
                    if (left > minLeft) {
                      width -= range.x;
                      left += range.x;
                    } else if (range.y >= 0 && bottom >= maxHeight) {
                      renderable = false;
                    }
                  } else {
                    width -= range.x;
                    left += range.x;
                  }
                  if (range.y >= 0) {
                    if (bottom < maxHeight) {
                      height += range.y;
                    }
                  } else {
                    height += range.y;
                  }
                }
                if (width < 0 && height < 0) {
                  action = ACTION_NORTH_EAST;
                  height = -height;
                  width = -width;
                  top -= height;
                  left -= width;
                } else if (width < 0) {
                  action = ACTION_SOUTH_EAST;
                  width = -width;
                  left -= width;
                } else if (height < 0) {
                  action = ACTION_NORTH_WEST;
                  height = -height;
                  top -= height;
                }
                break;
              case ACTION_SOUTH_EAST:
                if (aspectRatio) {
                  if (range.x >= 0 && (right >= maxWidth || bottom >= maxHeight)) {
                    renderable = false;
                    break;
                  }
                  check(ACTION_EAST);
                  width += range.x;
                  height = width / aspectRatio;
                } else {
                  check(ACTION_SOUTH);
                  check(ACTION_EAST);
                  if (range.x >= 0) {
                    if (right < maxWidth) {
                      width += range.x;
                    } else if (range.y >= 0 && bottom >= maxHeight) {
                      renderable = false;
                    }
                  } else {
                    width += range.x;
                  }
                  if (range.y >= 0) {
                    if (bottom < maxHeight) {
                      height += range.y;
                    }
                  } else {
                    height += range.y;
                  }
                }
                if (width < 0 && height < 0) {
                  action = ACTION_NORTH_WEST;
                  height = -height;
                  width = -width;
                  top -= height;
                  left -= width;
                } else if (width < 0) {
                  action = ACTION_SOUTH_WEST;
                  width = -width;
                  left -= width;
                } else if (height < 0) {
                  action = ACTION_NORTH_EAST;
                  height = -height;
                  top -= height;
                }
                break;
              case ACTION_MOVE:
                this.move(range.x, range.y);
                renderable = false;
                break;
              case ACTION_ZOOM:
                this.zoom(getMaxZoomRatio(pointers), event);
                renderable = false;
                break;
              case ACTION_CROP:
                if (!range.x || !range.y) {
                  renderable = false;
                  break;
                }
                offset = getOffset(this.cropper);
                left = pointer.startX - offset.left;
                top = pointer.startY - offset.top;
                width = cropBoxData.minWidth;
                height = cropBoxData.minHeight;
                if (range.x > 0) {
                  action = range.y > 0 ? ACTION_SOUTH_EAST : ACTION_NORTH_EAST;
                } else if (range.x < 0) {
                  left -= width;
                  action = range.y > 0 ? ACTION_SOUTH_WEST : ACTION_NORTH_WEST;
                }
                if (range.y < 0) {
                  top -= height;
                }
                if (!this.cropped) {
                  removeClass(this.cropBox, CLASS_HIDDEN);
                  this.cropped = true;
                  if (this.limited) {
                    this.limitCropBox(true, true);
                  }
                }
                break;
            }
            if (renderable) {
              cropBoxData.width = width;
              cropBoxData.height = height;
              cropBoxData.left = left;
              cropBoxData.top = top;
              this.action = action;
              this.renderCropBox();
            }
            forEach(pointers, function(p3) {
              p3.startX = p3.endX;
              p3.startY = p3.endY;
            });
          }
        };
        var methods = {
          crop: function crop() {
            if (this.ready && !this.cropped && !this.disabled) {
              this.cropped = true;
              this.limitCropBox(true, true);
              if (this.options.modal) {
                addClass(this.dragBox, CLASS_MODAL);
              }
              removeClass(this.cropBox, CLASS_HIDDEN);
              this.setCropBoxData(this.initialCropBoxData);
            }
            return this;
          },
          reset: function reset() {
            if (this.ready && !this.disabled) {
              this.imageData = assign({}, this.initialImageData);
              this.canvasData = assign({}, this.initialCanvasData);
              this.cropBoxData = assign({}, this.initialCropBoxData);
              this.renderCanvas();
              if (this.cropped) {
                this.renderCropBox();
              }
            }
            return this;
          },
          clear: function clear() {
            if (this.cropped && !this.disabled) {
              assign(this.cropBoxData, {
                left: 0,
                top: 0,
                width: 0,
                height: 0
              });
              this.cropped = false;
              this.renderCropBox();
              this.limitCanvas(true, true);
              this.renderCanvas();
              removeClass(this.dragBox, CLASS_MODAL);
              addClass(this.cropBox, CLASS_HIDDEN);
            }
            return this;
          },
          replace: function replace(url) {
            var hasSameSize = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
            if (!this.disabled && url) {
              if (this.isImg) {
                this.element.src = url;
              }
              if (hasSameSize) {
                this.url = url;
                this.image.src = url;
                if (this.ready) {
                  this.viewBoxImage.src = url;
                  forEach(this.previews, function(element) {
                    element.getElementsByTagName("img")[0].src = url;
                  });
                }
              } else {
                if (this.isImg) {
                  this.replaced = true;
                }
                this.options.data = null;
                this.uncreate();
                this.load(url);
              }
            }
            return this;
          },
          enable: function enable() {
            if (this.ready && this.disabled) {
              this.disabled = false;
              removeClass(this.cropper, CLASS_DISABLED);
            }
            return this;
          },
          disable: function disable() {
            if (this.ready && !this.disabled) {
              this.disabled = true;
              addClass(this.cropper, CLASS_DISABLED);
            }
            return this;
          },
          destroy: function destroy() {
            var element = this.element;
            if (!element[NAMESPACE]) {
              return this;
            }
            element[NAMESPACE] = void 0;
            if (this.isImg && this.replaced) {
              element.src = this.originalUrl;
            }
            this.uncreate();
            return this;
          },
          move: function move(offsetX) {
            var offsetY = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : offsetX;
            var _this$canvasData = this.canvasData, left = _this$canvasData.left, top = _this$canvasData.top;
            return this.moveTo(isUndefined(offsetX) ? offsetX : left + Number(offsetX), isUndefined(offsetY) ? offsetY : top + Number(offsetY));
          },
          moveTo: function moveTo(x3) {
            var y3 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : x3;
            var canvasData = this.canvasData;
            var changed = false;
            x3 = Number(x3);
            y3 = Number(y3);
            if (this.ready && !this.disabled && this.options.movable) {
              if (isNumber(x3)) {
                canvasData.left = x3;
                changed = true;
              }
              if (isNumber(y3)) {
                canvasData.top = y3;
                changed = true;
              }
              if (changed) {
                this.renderCanvas(true);
              }
            }
            return this;
          },
          zoom: function zoom(ratio, _originalEvent) {
            var canvasData = this.canvasData;
            ratio = Number(ratio);
            if (ratio < 0) {
              ratio = 1 / (1 - ratio);
            } else {
              ratio = 1 + ratio;
            }
            return this.zoomTo(canvasData.width * ratio / canvasData.naturalWidth, null, _originalEvent);
          },
          zoomTo: function zoomTo(ratio, pivot, _originalEvent) {
            var options = this.options, canvasData = this.canvasData;
            var width = canvasData.width, height = canvasData.height, naturalWidth = canvasData.naturalWidth, naturalHeight = canvasData.naturalHeight;
            ratio = Number(ratio);
            if (ratio >= 0 && this.ready && !this.disabled && options.zoomable) {
              var newWidth = naturalWidth * ratio;
              var newHeight = naturalHeight * ratio;
              if (dispatchEvent(this.element, EVENT_ZOOM, {
                ratio,
                oldRatio: width / naturalWidth,
                originalEvent: _originalEvent
              }) === false) {
                return this;
              }
              if (_originalEvent) {
                var pointers = this.pointers;
                var offset = getOffset(this.cropper);
                var center = pointers && Object.keys(pointers).length ? getPointersCenter(pointers) : {
                  pageX: _originalEvent.pageX,
                  pageY: _originalEvent.pageY
                };
                canvasData.left -= (newWidth - width) * ((center.pageX - offset.left - canvasData.left) / width);
                canvasData.top -= (newHeight - height) * ((center.pageY - offset.top - canvasData.top) / height);
              } else if (isPlainObject(pivot) && isNumber(pivot.x) && isNumber(pivot.y)) {
                canvasData.left -= (newWidth - width) * ((pivot.x - canvasData.left) / width);
                canvasData.top -= (newHeight - height) * ((pivot.y - canvasData.top) / height);
              } else {
                canvasData.left -= (newWidth - width) / 2;
                canvasData.top -= (newHeight - height) / 2;
              }
              canvasData.width = newWidth;
              canvasData.height = newHeight;
              this.renderCanvas(true);
            }
            return this;
          },
          rotate: function rotate(degree) {
            return this.rotateTo((this.imageData.rotate || 0) + Number(degree));
          },
          rotateTo: function rotateTo(degree) {
            degree = Number(degree);
            if (isNumber(degree) && this.ready && !this.disabled && this.options.rotatable) {
              this.imageData.rotate = degree % 360;
              this.renderCanvas(true, true);
            }
            return this;
          },
          scaleX: function scaleX(_scaleX) {
            var scaleY = this.imageData.scaleY;
            return this.scale(_scaleX, isNumber(scaleY) ? scaleY : 1);
          },
          scaleY: function scaleY(_scaleY) {
            var scaleX = this.imageData.scaleX;
            return this.scale(isNumber(scaleX) ? scaleX : 1, _scaleY);
          },
          scale: function scale(scaleX) {
            var scaleY = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : scaleX;
            var imageData = this.imageData;
            var transformed = false;
            scaleX = Number(scaleX);
            scaleY = Number(scaleY);
            if (this.ready && !this.disabled && this.options.scalable) {
              if (isNumber(scaleX)) {
                imageData.scaleX = scaleX;
                transformed = true;
              }
              if (isNumber(scaleY)) {
                imageData.scaleY = scaleY;
                transformed = true;
              }
              if (transformed) {
                this.renderCanvas(true, true);
              }
            }
            return this;
          },
          getData: function getData2() {
            var rounded = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
            var options = this.options, imageData = this.imageData, canvasData = this.canvasData, cropBoxData = this.cropBoxData;
            var data;
            if (this.ready && this.cropped) {
              data = {
                x: cropBoxData.left - canvasData.left,
                y: cropBoxData.top - canvasData.top,
                width: cropBoxData.width,
                height: cropBoxData.height
              };
              var ratio = imageData.width / imageData.naturalWidth;
              forEach(data, function(n2, i3) {
                data[i3] = n2 / ratio;
              });
              if (rounded) {
                var bottom = Math.round(data.y + data.height);
                var right = Math.round(data.x + data.width);
                data.x = Math.round(data.x);
                data.y = Math.round(data.y);
                data.width = right - data.x;
                data.height = bottom - data.y;
              }
            } else {
              data = {
                x: 0,
                y: 0,
                width: 0,
                height: 0
              };
            }
            if (options.rotatable) {
              data.rotate = imageData.rotate || 0;
            }
            if (options.scalable) {
              data.scaleX = imageData.scaleX || 1;
              data.scaleY = imageData.scaleY || 1;
            }
            return data;
          },
          setData: function setData2(data) {
            var options = this.options, imageData = this.imageData, canvasData = this.canvasData;
            var cropBoxData = {};
            if (this.ready && !this.disabled && isPlainObject(data)) {
              var transformed = false;
              if (options.rotatable) {
                if (isNumber(data.rotate) && data.rotate !== imageData.rotate) {
                  imageData.rotate = data.rotate;
                  transformed = true;
                }
              }
              if (options.scalable) {
                if (isNumber(data.scaleX) && data.scaleX !== imageData.scaleX) {
                  imageData.scaleX = data.scaleX;
                  transformed = true;
                }
                if (isNumber(data.scaleY) && data.scaleY !== imageData.scaleY) {
                  imageData.scaleY = data.scaleY;
                  transformed = true;
                }
              }
              if (transformed) {
                this.renderCanvas(true, true);
              }
              var ratio = imageData.width / imageData.naturalWidth;
              if (isNumber(data.x)) {
                cropBoxData.left = data.x * ratio + canvasData.left;
              }
              if (isNumber(data.y)) {
                cropBoxData.top = data.y * ratio + canvasData.top;
              }
              if (isNumber(data.width)) {
                cropBoxData.width = data.width * ratio;
              }
              if (isNumber(data.height)) {
                cropBoxData.height = data.height * ratio;
              }
              this.setCropBoxData(cropBoxData);
            }
            return this;
          },
          getContainerData: function getContainerData() {
            return this.ready ? assign({}, this.containerData) : {};
          },
          getImageData: function getImageData() {
            return this.sized ? assign({}, this.imageData) : {};
          },
          getCanvasData: function getCanvasData() {
            var canvasData = this.canvasData;
            var data = {};
            if (this.ready) {
              forEach(["left", "top", "width", "height", "naturalWidth", "naturalHeight"], function(n2) {
                data[n2] = canvasData[n2];
              });
            }
            return data;
          },
          setCanvasData: function setCanvasData(data) {
            var canvasData = this.canvasData;
            var aspectRatio = canvasData.aspectRatio;
            if (this.ready && !this.disabled && isPlainObject(data)) {
              if (isNumber(data.left)) {
                canvasData.left = data.left;
              }
              if (isNumber(data.top)) {
                canvasData.top = data.top;
              }
              if (isNumber(data.width)) {
                canvasData.width = data.width;
                canvasData.height = data.width / aspectRatio;
              } else if (isNumber(data.height)) {
                canvasData.height = data.height;
                canvasData.width = data.height * aspectRatio;
              }
              this.renderCanvas(true);
            }
            return this;
          },
          getCropBoxData: function getCropBoxData() {
            var cropBoxData = this.cropBoxData;
            var data;
            if (this.ready && this.cropped) {
              data = {
                left: cropBoxData.left,
                top: cropBoxData.top,
                width: cropBoxData.width,
                height: cropBoxData.height
              };
            }
            return data || {};
          },
          setCropBoxData: function setCropBoxData(data) {
            var cropBoxData = this.cropBoxData;
            var aspectRatio = this.options.aspectRatio;
            var widthChanged;
            var heightChanged;
            if (this.ready && this.cropped && !this.disabled && isPlainObject(data)) {
              if (isNumber(data.left)) {
                cropBoxData.left = data.left;
              }
              if (isNumber(data.top)) {
                cropBoxData.top = data.top;
              }
              if (isNumber(data.width) && data.width !== cropBoxData.width) {
                widthChanged = true;
                cropBoxData.width = data.width;
              }
              if (isNumber(data.height) && data.height !== cropBoxData.height) {
                heightChanged = true;
                cropBoxData.height = data.height;
              }
              if (aspectRatio) {
                if (widthChanged) {
                  cropBoxData.height = cropBoxData.width / aspectRatio;
                } else if (heightChanged) {
                  cropBoxData.width = cropBoxData.height * aspectRatio;
                }
              }
              this.renderCropBox();
            }
            return this;
          },
          getCroppedCanvas: function getCroppedCanvas() {
            var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
            if (!this.ready || !window.HTMLCanvasElement) {
              return null;
            }
            var canvasData = this.canvasData;
            var source = getSourceCanvas(this.image, this.imageData, canvasData, options);
            if (!this.cropped) {
              return source;
            }
            var _this$getData = this.getData(), initialX = _this$getData.x, initialY = _this$getData.y, initialWidth = _this$getData.width, initialHeight = _this$getData.height;
            var ratio = source.width / Math.floor(canvasData.naturalWidth);
            if (ratio !== 1) {
              initialX *= ratio;
              initialY *= ratio;
              initialWidth *= ratio;
              initialHeight *= ratio;
            }
            var aspectRatio = initialWidth / initialHeight;
            var maxSizes = getAdjustedSizes({
              aspectRatio,
              width: options.maxWidth || Infinity,
              height: options.maxHeight || Infinity
            });
            var minSizes = getAdjustedSizes({
              aspectRatio,
              width: options.minWidth || 0,
              height: options.minHeight || 0
            }, "cover");
            var _getAdjustedSizes = getAdjustedSizes({
              aspectRatio,
              width: options.width || (ratio !== 1 ? source.width : initialWidth),
              height: options.height || (ratio !== 1 ? source.height : initialHeight)
            }), width = _getAdjustedSizes.width, height = _getAdjustedSizes.height;
            width = Math.min(maxSizes.width, Math.max(minSizes.width, width));
            height = Math.min(maxSizes.height, Math.max(minSizes.height, height));
            var canvas = document.createElement("canvas");
            var context = canvas.getContext("2d");
            canvas.width = normalizeDecimalNumber(width);
            canvas.height = normalizeDecimalNumber(height);
            context.fillStyle = options.fillColor || "transparent";
            context.fillRect(0, 0, width, height);
            var _options$imageSmoothi = options.imageSmoothingEnabled, imageSmoothingEnabled = _options$imageSmoothi === void 0 ? true : _options$imageSmoothi, imageSmoothingQuality = options.imageSmoothingQuality;
            context.imageSmoothingEnabled = imageSmoothingEnabled;
            if (imageSmoothingQuality) {
              context.imageSmoothingQuality = imageSmoothingQuality;
            }
            var sourceWidth = source.width;
            var sourceHeight = source.height;
            var srcX = initialX;
            var srcY = initialY;
            var srcWidth;
            var srcHeight;
            var dstX;
            var dstY;
            var dstWidth;
            var dstHeight;
            if (srcX <= -initialWidth || srcX > sourceWidth) {
              srcX = 0;
              srcWidth = 0;
              dstX = 0;
              dstWidth = 0;
            } else if (srcX <= 0) {
              dstX = -srcX;
              srcX = 0;
              srcWidth = Math.min(sourceWidth, initialWidth + srcX);
              dstWidth = srcWidth;
            } else if (srcX <= sourceWidth) {
              dstX = 0;
              srcWidth = Math.min(initialWidth, sourceWidth - srcX);
              dstWidth = srcWidth;
            }
            if (srcWidth <= 0 || srcY <= -initialHeight || srcY > sourceHeight) {
              srcY = 0;
              srcHeight = 0;
              dstY = 0;
              dstHeight = 0;
            } else if (srcY <= 0) {
              dstY = -srcY;
              srcY = 0;
              srcHeight = Math.min(sourceHeight, initialHeight + srcY);
              dstHeight = srcHeight;
            } else if (srcY <= sourceHeight) {
              dstY = 0;
              srcHeight = Math.min(initialHeight, sourceHeight - srcY);
              dstHeight = srcHeight;
            }
            var params = [srcX, srcY, srcWidth, srcHeight];
            if (dstWidth > 0 && dstHeight > 0) {
              var scale = width / initialWidth;
              params.push(dstX * scale, dstY * scale, dstWidth * scale, dstHeight * scale);
            }
            context.drawImage.apply(context, [source].concat(_toConsumableArray(params.map(function(param) {
              return Math.floor(normalizeDecimalNumber(param));
            }))));
            return canvas;
          },
          setAspectRatio: function setAspectRatio(aspectRatio) {
            var options = this.options;
            if (!this.disabled && !isUndefined(aspectRatio)) {
              options.aspectRatio = Math.max(0, aspectRatio) || NaN;
              if (this.ready) {
                this.initCropBox();
                if (this.cropped) {
                  this.renderCropBox();
                }
              }
            }
            return this;
          },
          setDragMode: function setDragMode(mode) {
            var options = this.options, dragBox = this.dragBox, face = this.face;
            if (this.ready && !this.disabled) {
              var croppable = mode === DRAG_MODE_CROP;
              var movable = options.movable && mode === DRAG_MODE_MOVE;
              mode = croppable || movable ? mode : DRAG_MODE_NONE;
              options.dragMode = mode;
              setData(dragBox, DATA_ACTION, mode);
              toggleClass(dragBox, CLASS_CROP, croppable);
              toggleClass(dragBox, CLASS_MOVE, movable);
              if (!options.cropBoxMovable) {
                setData(face, DATA_ACTION, mode);
                toggleClass(face, CLASS_CROP, croppable);
                toggleClass(face, CLASS_MOVE, movable);
              }
            }
            return this;
          }
        };
        var AnotherCropper = WINDOW.Cropper;
        var Cropper = /* @__PURE__ */ function() {
          function Cropper2(element) {
            var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            _classCallCheck(this, Cropper2);
            if (!element || !REGEXP_TAG_NAME.test(element.tagName)) {
              throw new Error("The first argument is required and must be an <img> or <canvas> element.");
            }
            this.element = element;
            this.options = assign({}, DEFAULTS, isPlainObject(options) && options);
            this.cropped = false;
            this.disabled = false;
            this.pointers = {};
            this.ready = false;
            this.reloading = false;
            this.replaced = false;
            this.sized = false;
            this.sizing = false;
            this.init();
          }
          _createClass(Cropper2, [{
            key: "init",
            value: function init() {
              var element = this.element;
              var tagName = element.tagName.toLowerCase();
              var url;
              if (element[NAMESPACE]) {
                return;
              }
              element[NAMESPACE] = this;
              if (tagName === "img") {
                this.isImg = true;
                url = element.getAttribute("src") || "";
                this.originalUrl = url;
                if (!url) {
                  return;
                }
                url = element.src;
              } else if (tagName === "canvas" && window.HTMLCanvasElement) {
                url = element.toDataURL();
              }
              this.load(url);
            }
          }, {
            key: "load",
            value: function load(url) {
              var _this = this;
              if (!url) {
                return;
              }
              this.url = url;
              this.imageData = {};
              var element = this.element, options = this.options;
              if (!options.rotatable && !options.scalable) {
                options.checkOrientation = false;
              }
              if (!options.checkOrientation || !window.ArrayBuffer) {
                this.clone();
                return;
              }
              if (REGEXP_DATA_URL.test(url)) {
                if (REGEXP_DATA_URL_JPEG.test(url)) {
                  this.read(dataURLToArrayBuffer(url));
                } else {
                  this.clone();
                }
                return;
              }
              var xhr = new XMLHttpRequest();
              var clone = this.clone.bind(this);
              this.reloading = true;
              this.xhr = xhr;
              xhr.onabort = clone;
              xhr.onerror = clone;
              xhr.ontimeout = clone;
              xhr.onprogress = function() {
                if (xhr.getResponseHeader("content-type") !== MIME_TYPE_JPEG) {
                  xhr.abort();
                }
              };
              xhr.onload = function() {
                _this.read(xhr.response);
              };
              xhr.onloadend = function() {
                _this.reloading = false;
                _this.xhr = null;
              };
              if (options.checkCrossOrigin && isCrossOriginURL(url) && element.crossOrigin) {
                url = addTimestamp(url);
              }
              xhr.open("GET", url);
              xhr.responseType = "arraybuffer";
              xhr.withCredentials = element.crossOrigin === "use-credentials";
              xhr.send();
            }
          }, {
            key: "read",
            value: function read(arrayBuffer) {
              var options = this.options, imageData = this.imageData;
              var orientation = resetAndGetOrientation(arrayBuffer);
              var rotate = 0;
              var scaleX = 1;
              var scaleY = 1;
              if (orientation > 1) {
                this.url = arrayBufferToDataURL(arrayBuffer, MIME_TYPE_JPEG);
                var _parseOrientation = parseOrientation(orientation);
                rotate = _parseOrientation.rotate;
                scaleX = _parseOrientation.scaleX;
                scaleY = _parseOrientation.scaleY;
              }
              if (options.rotatable) {
                imageData.rotate = rotate;
              }
              if (options.scalable) {
                imageData.scaleX = scaleX;
                imageData.scaleY = scaleY;
              }
              this.clone();
            }
          }, {
            key: "clone",
            value: function clone() {
              var element = this.element, url = this.url;
              var crossOrigin = element.crossOrigin;
              var crossOriginUrl = url;
              if (this.options.checkCrossOrigin && isCrossOriginURL(url)) {
                if (!crossOrigin) {
                  crossOrigin = "anonymous";
                }
                crossOriginUrl = addTimestamp(url);
              }
              this.crossOrigin = crossOrigin;
              this.crossOriginUrl = crossOriginUrl;
              var image = document.createElement("img");
              if (crossOrigin) {
                image.crossOrigin = crossOrigin;
              }
              image.src = crossOriginUrl || url;
              image.alt = element.alt || "The image to crop";
              this.image = image;
              image.onload = this.start.bind(this);
              image.onerror = this.stop.bind(this);
              addClass(image, CLASS_HIDE);
              element.parentNode.insertBefore(image, element.nextSibling);
            }
          }, {
            key: "start",
            value: function start() {
              var _this2 = this;
              var image = this.image;
              image.onload = null;
              image.onerror = null;
              this.sizing = true;
              var isIOSWebKit = WINDOW.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(WINDOW.navigator.userAgent);
              var done = function done2(naturalWidth, naturalHeight) {
                assign(_this2.imageData, {
                  naturalWidth,
                  naturalHeight,
                  aspectRatio: naturalWidth / naturalHeight
                });
                _this2.sizing = false;
                _this2.sized = true;
                _this2.build();
              };
              if (image.naturalWidth && !isIOSWebKit) {
                done(image.naturalWidth, image.naturalHeight);
                return;
              }
              var sizingImage = document.createElement("img");
              var body = document.body || document.documentElement;
              this.sizingImage = sizingImage;
              sizingImage.onload = function() {
                done(sizingImage.width, sizingImage.height);
                if (!isIOSWebKit) {
                  body.removeChild(sizingImage);
                }
              };
              sizingImage.src = image.src;
              if (!isIOSWebKit) {
                sizingImage.style.cssText = "left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;";
                body.appendChild(sizingImage);
              }
            }
          }, {
            key: "stop",
            value: function stop() {
              var image = this.image;
              image.onload = null;
              image.onerror = null;
              image.parentNode.removeChild(image);
              this.image = null;
            }
          }, {
            key: "build",
            value: function build() {
              if (!this.sized || this.ready) {
                return;
              }
              var element = this.element, options = this.options, image = this.image;
              var container = element.parentNode;
              var template = document.createElement("div");
              template.innerHTML = TEMPLATE;
              var cropper = template.querySelector(".".concat(NAMESPACE, "-container"));
              var canvas = cropper.querySelector(".".concat(NAMESPACE, "-canvas"));
              var dragBox = cropper.querySelector(".".concat(NAMESPACE, "-drag-box"));
              var cropBox = cropper.querySelector(".".concat(NAMESPACE, "-crop-box"));
              var face = cropBox.querySelector(".".concat(NAMESPACE, "-face"));
              this.container = container;
              this.cropper = cropper;
              this.canvas = canvas;
              this.dragBox = dragBox;
              this.cropBox = cropBox;
              this.viewBox = cropper.querySelector(".".concat(NAMESPACE, "-view-box"));
              this.face = face;
              canvas.appendChild(image);
              addClass(element, CLASS_HIDDEN);
              container.insertBefore(cropper, element.nextSibling);
              if (!this.isImg) {
                removeClass(image, CLASS_HIDE);
              }
              this.initPreview();
              this.bind();
              options.initialAspectRatio = Math.max(0, options.initialAspectRatio) || NaN;
              options.aspectRatio = Math.max(0, options.aspectRatio) || NaN;
              options.viewMode = Math.max(0, Math.min(3, Math.round(options.viewMode))) || 0;
              addClass(cropBox, CLASS_HIDDEN);
              if (!options.guides) {
                addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-dashed")), CLASS_HIDDEN);
              }
              if (!options.center) {
                addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-center")), CLASS_HIDDEN);
              }
              if (options.background) {
                addClass(cropper, "".concat(NAMESPACE, "-bg"));
              }
              if (!options.highlight) {
                addClass(face, CLASS_INVISIBLE);
              }
              if (options.cropBoxMovable) {
                addClass(face, CLASS_MOVE);
                setData(face, DATA_ACTION, ACTION_ALL);
              }
              if (!options.cropBoxResizable) {
                addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-line")), CLASS_HIDDEN);
                addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-point")), CLASS_HIDDEN);
              }
              this.render();
              this.ready = true;
              this.setDragMode(options.dragMode);
              if (options.autoCrop) {
                this.crop();
              }
              this.setData(options.data);
              if (isFunction(options.ready)) {
                addListener(element, EVENT_READY, options.ready, {
                  once: true
                });
              }
              dispatchEvent(element, EVENT_READY);
            }
          }, {
            key: "unbuild",
            value: function unbuild() {
              if (!this.ready) {
                return;
              }
              this.ready = false;
              this.unbind();
              this.resetPreview();
              this.cropper.parentNode.removeChild(this.cropper);
              removeClass(this.element, CLASS_HIDDEN);
            }
          }, {
            key: "uncreate",
            value: function uncreate() {
              if (this.ready) {
                this.unbuild();
                this.ready = false;
                this.cropped = false;
              } else if (this.sizing) {
                this.sizingImage.onload = null;
                this.sizing = false;
                this.sized = false;
              } else if (this.reloading) {
                this.xhr.onabort = null;
                this.xhr.abort();
              } else if (this.image) {
                this.stop();
              }
            }
          }], [{
            key: "noConflict",
            value: function noConflict() {
              window.Cropper = AnotherCropper;
              return Cropper2;
            }
          }, {
            key: "setDefaults",
            value: function setDefaults(options) {
              assign(DEFAULTS, isPlainObject(options) && options);
            }
          }]);
          return Cropper2;
        }();
        assign(Cropper.prototype, render, preview, events, handlers, change, methods);
        return Cropper;
      });
    }
  });

  // ../packages/@uppy/image-editor/lib/Editor.js
  var require_Editor = __commonJS({
    "../packages/@uppy/image-editor/lib/Editor.js"(exports, module) {
      "use strict";
      var _preact = (init_preact_module(), __toCommonJS(preact_module_exports));
      var CropperImport = require_cropper();
      var Cropper = CropperImport.__esModule ? CropperImport.default : CropperImport;
      var Editor = class extends _preact.Component {
        constructor(props) {
          super(props);
          this.granularRotateOnChange = (ev) => {
            const {
              rotationAngle,
              rotationDelta
            } = this.state;
            const pendingRotationDelta = Number(ev.target.value) - rotationDelta;
            cancelAnimationFrame(this.granularRotateOnInputNextFrame);
            if (pendingRotationDelta !== 0) {
              const pendingRotationAngle = rotationAngle + pendingRotationDelta;
              this.granularRotateOnInputNextFrame = requestAnimationFrame(() => {
                this.cropper.rotateTo(pendingRotationAngle);
              });
            }
          };
          this.state = {
            rotationAngle: 0,
            rotationDelta: 0
          };
        }
        componentDidMount() {
          const {
            opts,
            storeCropperInstance
          } = this.props;
          this.cropper = new Cropper(this.imgElement, opts.cropperOptions);
          storeCropperInstance(this.cropper);
          if (opts.actions.granularRotate) {
            this.imgElement.addEventListener("crop", (ev) => {
              const rotationAngle = ev.detail.rotate;
              this.setState({
                rotationAngle,
                rotationDelta: (rotationAngle + 405) % 90 - 45
              });
            });
          }
        }
        componentWillUnmount() {
          this.cropper.destroy();
        }
        renderGranularRotate() {
          const {
            i18n
          } = this.props;
          const {
            rotationDelta,
            rotationAngle
          } = this.state;
          return (0, _preact.h)("label", {
            "data-microtip-position": "top",
            role: "tooltip",
            "aria-label": `${rotationAngle}\xBA`,
            className: "uppy-ImageCropper-rangeWrapper uppy-u-reset"
          }, (0, _preact.h)("input", {
            className: "uppy-ImageCropper-range uppy-u-reset",
            type: "range",
            onInput: this.granularRotateOnChange,
            onChange: this.granularRotateOnChange,
            value: rotationDelta,
            min: "-45",
            max: "44",
            "aria-label": i18n("rotate")
          }));
        }
        renderRevert() {
          const {
            i18n
          } = this.props;
          return (0, _preact.h)("button", {
            type: "button",
            className: "uppy-u-reset uppy-c-btn",
            "aria-label": i18n("revert"),
            "data-microtip-position": "top",
            onClick: () => {
              this.cropper.reset();
              this.cropper.setAspectRatio(0);
            }
          }, (0, _preact.h)("svg", {
            "aria-hidden": "true",
            className: "uppy-c-icon",
            width: "24",
            height: "24",
            viewBox: "0 0 24 24"
          }, (0, _preact.h)("path", {
            d: "M0 0h24v24H0z",
            fill: "none"
          }), (0, _preact.h)("path", {
            d: "M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"
          })));
        }
        renderRotate() {
          const {
            i18n
          } = this.props;
          return (0, _preact.h)("button", {
            type: "button",
            className: "uppy-u-reset uppy-c-btn",
            onClick: () => this.cropper.rotate(-90),
            "aria-label": i18n("rotate"),
            "data-microtip-position": "top"
          }, (0, _preact.h)("svg", {
            "aria-hidden": "true",
            className: "uppy-c-icon",
            width: "24",
            height: "24",
            viewBox: "0 0 24 24"
          }, (0, _preact.h)("path", {
            d: "M0 0h24v24H0V0zm0 0h24v24H0V0z",
            fill: "none"
          }), (0, _preact.h)("path", {
            d: "M14 10a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7a2 2 0 012-2h8zm0 1.75H6a.25.25 0 00-.243.193L5.75 12v7a.25.25 0 00.193.243L6 19.25h8a.25.25 0 00.243-.193L14.25 19v-7a.25.25 0 00-.193-.243L14 11.75zM12 .76V4c2.3 0 4.61.88 6.36 2.64a8.95 8.95 0 012.634 6.025L21 13a1 1 0 01-1.993.117L19 13h-.003a6.979 6.979 0 00-2.047-4.95 6.97 6.97 0 00-4.652-2.044L12 6v3.24L7.76 5 12 .76z"
          })));
        }
        renderFlip() {
          const {
            i18n
          } = this.props;
          return (0, _preact.h)("button", {
            type: "button",
            className: "uppy-u-reset uppy-c-btn",
            "aria-label": i18n("flipHorizontal"),
            "data-microtip-position": "top",
            onClick: () => this.cropper.scaleX(-this.cropper.getData().scaleX || -1)
          }, (0, _preact.h)("svg", {
            "aria-hidden": "true",
            className: "uppy-c-icon",
            width: "24",
            height: "24",
            viewBox: "0 0 24 24"
          }, (0, _preact.h)("path", {
            d: "M0 0h24v24H0z",
            fill: "none"
          }), (0, _preact.h)("path", {
            d: "M15 21h2v-2h-2v2zm4-12h2V7h-2v2zM3 5v14c0 1.1.9 2 2 2h4v-2H5V5h4V3H5c-1.1 0-2 .9-2 2zm16-2v2h2c0-1.1-.9-2-2-2zm-8 20h2V1h-2v22zm8-6h2v-2h-2v2zM15 5h2V3h-2v2zm4 8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2z"
          })));
        }
        renderZoomIn() {
          const {
            i18n
          } = this.props;
          return (0, _preact.h)("button", {
            type: "button",
            className: "uppy-u-reset uppy-c-btn",
            "aria-label": i18n("zoomIn"),
            "data-microtip-position": "top",
            onClick: () => this.cropper.zoom(0.1)
          }, (0, _preact.h)("svg", {
            "aria-hidden": "true",
            className: "uppy-c-icon",
            height: "24",
            viewBox: "0 0 24 24",
            width: "24"
          }, (0, _preact.h)("path", {
            d: "M0 0h24v24H0V0z",
            fill: "none"
          }), (0, _preact.h)("path", {
            d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          }), (0, _preact.h)("path", {
            d: "M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z"
          })));
        }
        renderZoomOut() {
          const {
            i18n
          } = this.props;
          return (0, _preact.h)("button", {
            type: "button",
            className: "uppy-u-reset uppy-c-btn",
            "aria-label": i18n("zoomOut"),
            "data-microtip-position": "top",
            onClick: () => this.cropper.zoom(-0.1)
          }, (0, _preact.h)("svg", {
            "aria-hidden": "true",
            className: "uppy-c-icon",
            width: "24",
            height: "24",
            viewBox: "0 0 24 24"
          }, (0, _preact.h)("path", {
            d: "M0 0h24v24H0V0z",
            fill: "none"
          }), (0, _preact.h)("path", {
            d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z"
          })));
        }
        renderCropSquare() {
          const {
            i18n
          } = this.props;
          return (0, _preact.h)("button", {
            type: "button",
            className: "uppy-u-reset uppy-c-btn",
            "aria-label": i18n("aspectRatioSquare"),
            "data-microtip-position": "top",
            onClick: () => this.cropper.setAspectRatio(1)
          }, (0, _preact.h)("svg", {
            "aria-hidden": "true",
            className: "uppy-c-icon",
            width: "24",
            height: "24",
            viewBox: "0 0 24 24"
          }, (0, _preact.h)("path", {
            d: "M0 0h24v24H0z",
            fill: "none"
          }), (0, _preact.h)("path", {
            d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
          })));
        }
        renderCropWidescreen() {
          const {
            i18n
          } = this.props;
          return (0, _preact.h)("button", {
            type: "button",
            className: "uppy-u-reset uppy-c-btn",
            "aria-label": i18n("aspectRatioLandscape"),
            "data-microtip-position": "top",
            onClick: () => this.cropper.setAspectRatio(16 / 9)
          }, (0, _preact.h)("svg", {
            "aria-hidden": "true",
            className: "uppy-c-icon",
            width: "24",
            height: "24",
            viewBox: "0 0 24 24"
          }, (0, _preact.h)("path", {
            d: "M 19,4.9999992 V 17.000001 H 4.9999998 V 6.9999992 H 19 m 0,-2 H 4.9999998 c -1.0999999,0 -1.9999999,0.9000001 -1.9999999,2 V 17.000001 c 0,1.1 0.9,2 1.9999999,2 H 19 c 1.1,0 2,-0.9 2,-2 V 6.9999992 c 0,-1.0999999 -0.9,-2 -2,-2 z"
          }), (0, _preact.h)("path", {
            fill: "none",
            d: "M0 0h24v24H0z"
          })));
        }
        renderCropWidescreenVertical() {
          const {
            i18n
          } = this.props;
          return (0, _preact.h)("button", {
            type: "button",
            className: "uppy-u-reset uppy-c-btn",
            "aria-label": i18n("aspectRatioPortrait"),
            "data-microtip-position": "top",
            onClick: () => this.cropper.setAspectRatio(9 / 16)
          }, (0, _preact.h)("svg", {
            "aria-hidden": "true",
            className: "uppy-c-icon",
            width: "24",
            height: "24",
            viewBox: "0 0 24 24"
          }, (0, _preact.h)("path", {
            d: "M 19.000001,19 H 6.999999 V 5 h 10.000002 v 14 m 2,0 V 5 c 0,-1.0999999 -0.9,-1.9999999 -2,-1.9999999 H 6.999999 c -1.1,0 -2,0.9 -2,1.9999999 v 14 c 0,1.1 0.9,2 2,2 h 10.000002 c 1.1,0 2,-0.9 2,-2 z"
          }), (0, _preact.h)("path", {
            d: "M0 0h24v24H0z",
            fill: "none"
          })));
        }
        render() {
          const {
            currentImage,
            opts
          } = this.props;
          const {
            actions
          } = opts;
          const imageURL = URL.createObjectURL(currentImage.data);
          return (0, _preact.h)("div", {
            className: "uppy-ImageCropper"
          }, (0, _preact.h)("div", {
            className: "uppy-ImageCropper-container"
          }, (0, _preact.h)("img", {
            className: "uppy-ImageCropper-image",
            alt: currentImage.name,
            src: imageURL,
            ref: (ref) => {
              this.imgElement = ref;
            }
          })), (0, _preact.h)("div", {
            className: "uppy-ImageCropper-controls"
          }, actions.revert && this.renderRevert(), actions.rotate && this.renderRotate(), actions.granularRotate && this.renderGranularRotate(), actions.flip && this.renderFlip(), actions.zoomIn && this.renderZoomIn(), actions.zoomOut && this.renderZoomOut(), actions.cropSquare && this.renderCropSquare(), actions.cropWidescreen && this.renderCropWidescreen(), actions.cropWidescreenVertical && this.renderCropWidescreenVertical()));
        }
      };
      module.exports = Editor;
    }
  });

  // ../packages/@uppy/image-editor/lib/locale.js
  var require_locale12 = __commonJS({
    "../packages/@uppy/image-editor/lib/locale.js"(exports, module) {
      "use strict";
      module.exports = {
        strings: {
          revert: "Revert",
          rotate: "Rotate",
          zoomIn: "Zoom in",
          zoomOut: "Zoom out",
          flipHorizontal: "Flip horizontal",
          aspectRatioSquare: "Crop square",
          aspectRatioLandscape: "Crop landscape (16:9)",
          aspectRatioPortrait: "Crop portrait (9:16)"
        }
      };
    }
  });

  // ../packages/@uppy/image-editor/lib/ImageEditor.js
  var require_ImageEditor = __commonJS({
    "../packages/@uppy/image-editor/lib/ImageEditor.js"(exports, module) {
      "use strict";
      var _core = require_lib2();
      var _preact = (init_preact_module(), __toCommonJS(preact_module_exports));
      var Editor = require_Editor();
      var packageJson = {
        "version": "1.1.1"
      };
      var locale = require_locale12();
      var ImageEditor2 = class extends _core.UIPlugin {
        constructor(uppy, opts) {
          super(uppy, opts);
          this.save = () => {
            const saveBlobCallback = (blob) => {
              const {
                currentImage: currentImage2
              } = this.getPluginState();
              this.uppy.setFileState(currentImage2.id, {
                data: blob,
                size: blob.size,
                preview: null
              });
              const updatedFile = this.uppy.getFile(currentImage2.id);
              this.uppy.emit("thumbnail:request", updatedFile);
              this.setPluginState({
                currentImage: updatedFile
              });
              this.uppy.emit("file-editor:complete", updatedFile);
            };
            const {
              currentImage
            } = this.getPluginState();
            this.cropper.getCroppedCanvas(this.opts.cropperOptions.croppedCanvasOptions).toBlob(saveBlobCallback, currentImage.type, this.opts.quality);
          };
          this.storeCropperInstance = (cropper) => {
            this.cropper = cropper;
          };
          this.selectFile = (file) => {
            this.uppy.emit("file-editor:start", file);
            this.setPluginState({
              currentImage: file
            });
          };
          this.id = this.opts.id || "ImageEditor";
          this.title = "Image Editor";
          this.type = "editor";
          this.defaultLocale = locale;
          const defaultCropperOptions = {
            viewMode: 1,
            background: false,
            autoCropArea: 1,
            responsive: true,
            croppedCanvasOptions: {}
          };
          const defaultActions = {
            revert: true,
            rotate: true,
            granularRotate: true,
            flip: true,
            zoomIn: true,
            zoomOut: true,
            cropSquare: true,
            cropWidescreen: true,
            cropWidescreenVertical: true
          };
          const defaultOptions = {
            quality: 0.8
          };
          this.opts = {
            ...defaultOptions,
            ...opts,
            actions: {
              ...defaultActions,
              ...opts.actions
            },
            cropperOptions: {
              ...defaultCropperOptions,
              ...opts.cropperOptions
            }
          };
          this.i18nInit();
        }
        canEditFile(file) {
          if (!file.type || file.isRemote) {
            return false;
          }
          const fileTypeSpecific = file.type.split("/")[1];
          if (/^(jpe?g|gif|png|bmp|webp)$/.test(fileTypeSpecific)) {
            return true;
          }
          return false;
        }
        install() {
          this.setPluginState({
            currentImage: null
          });
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
        render() {
          const {
            currentImage
          } = this.getPluginState();
          if (currentImage === null || currentImage.isRemote) {
            return null;
          }
          return (0, _preact.h)(Editor, {
            currentImage,
            storeCropperInstance: this.storeCropperInstance,
            save: this.save,
            opts: this.opts,
            i18n: this.i18n
          });
        }
      };
      ImageEditor2.VERSION = packageJson.version;
      module.exports = ImageEditor2;
    }
  });

  // ../packages/@uppy/image-editor/lib/index.js
  var require_lib17 = __commonJS({
    "../packages/@uppy/image-editor/lib/index.js"(exports, module) {
      "use strict";
      module.exports = require_ImageEditor();
    }
  });

  // ../packages/@uppy/url/lib/UrlUI.js
  var require_UrlUI = __commonJS({
    "../packages/@uppy/url/lib/UrlUI.js"(exports, module) {
      var {
        h: h3,
        Component
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      var UrlUI = class extends Component {
        constructor(props) {
          super(props);
          this.handleKeyPress = this.handleKeyPress.bind(this);
          this.handleClick = this.handleClick.bind(this);
        }
        componentDidMount() {
          this.input.value = "";
        }
        handleKeyPress(ev) {
          if (ev.keyCode === 13) {
            this.props.addFile(this.input.value);
          }
        }
        handleClick() {
          this.props.addFile(this.input.value);
        }
        render() {
          return h3("div", {
            className: "uppy-Url"
          }, h3("input", {
            className: "uppy-u-reset uppy-c-textInput uppy-Url-input",
            type: "text",
            "aria-label": this.props.i18n("enterUrlToImport"),
            placeholder: this.props.i18n("enterUrlToImport"),
            onKeyUp: this.handleKeyPress,
            ref: (input) => {
              this.input = input;
            },
            "data-uppy-super-focusable": true
          }), h3("button", {
            className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Url-importButton",
            type: "button",
            onClick: this.handleClick
          }, this.props.i18n("import")));
        }
      };
      module.exports = UrlUI;
    }
  });

  // ../packages/@uppy/url/lib/utils/forEachDroppedOrPastedUrl.js
  var require_forEachDroppedOrPastedUrl = __commonJS({
    "../packages/@uppy/url/lib/utils/forEachDroppedOrPastedUrl.js"(exports, module) {
      var toArray = require_toArray();
      module.exports = function forEachDroppedOrPastedUrl(dataTransfer, isDropOrPaste, callback) {
        const items = toArray(dataTransfer.items);
        let urlItems;
        switch (isDropOrPaste) {
          case "paste": {
            const atLeastOneFileIsDragged = items.some((item) => item.kind === "file");
            if (atLeastOneFileIsDragged) {
              return;
            }
            urlItems = items.filter((item) => item.kind === "string" && item.type === "text/plain");
            break;
          }
          case "drop": {
            urlItems = items.filter((item) => item.kind === "string" && item.type === "text/uri-list");
            break;
          }
          default: {
            throw new Error(`isDropOrPaste must be either 'drop' or 'paste', but it's ${isDropOrPaste}`);
          }
        }
        urlItems.forEach((item) => {
          item.getAsString((urlString) => callback(urlString));
        });
      };
    }
  });

  // ../packages/@uppy/url/lib/locale.js
  var require_locale13 = __commonJS({
    "../packages/@uppy/url/lib/locale.js"(exports, module) {
      module.exports = {
        strings: {
          import: "Import",
          enterUrlToImport: "Enter URL to import a file",
          failedToFetch: "Companion failed to fetch this URL, please make sure it\u2019s correct",
          enterCorrectUrl: "Incorrect URL: Please make sure you are entering a direct link to a file"
        }
      };
    }
  });

  // ../packages/@uppy/url/lib/index.js
  var require_lib18 = __commonJS({
    "../packages/@uppy/url/lib/index.js"(exports, module) {
      var _class;
      var _temp;
      var {
        UIPlugin
      } = require_lib2();
      var {
        h: h3
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      var {
        RequestClient
      } = require_lib7();
      var toArray = require_toArray();
      var UrlUI = require_UrlUI();
      var forEachDroppedOrPastedUrl = require_forEachDroppedOrPastedUrl();
      var locale = require_locale13();
      function UrlIcon() {
        return h3("svg", {
          "aria-hidden": "true",
          focusable: "false",
          width: "32",
          height: "32",
          viewBox: "0 0 32 32"
        }, h3("g", {
          fill: "none",
          fillRule: "evenodd"
        }, h3("rect", {
          className: "uppy-ProviderIconBg",
          fill: "#FF753E",
          width: "32",
          height: "32",
          rx: "16"
        }), h3("path", {
          d: "M22.788 15.389l-2.199 2.19a3.184 3.184 0 0 1-.513.437c-.806.584-1.686.876-2.638.876a4.378 4.378 0 0 1-3.519-1.752c-.22-.292-.146-.802.147-1.021.293-.22.806-.146 1.026.146.953 1.313 2.785 1.532 4.105.583a.571.571 0 0 0 .293-.292l2.199-2.189c1.1-1.167 1.1-2.992-.073-4.086a2.976 2.976 0 0 0-4.105 0l-1.246 1.24a.71.71 0 0 1-1.026 0 .703.703 0 0 1 0-1.022l1.246-1.24a4.305 4.305 0 0 1 6.083 0c1.833 1.605 1.906 4.451.22 6.13zm-7.183 5.035l-1.246 1.24a2.976 2.976 0 0 1-4.105 0c-1.172-1.094-1.172-2.991-.073-4.086l2.2-2.19.292-.291c.66-.438 1.393-.657 2.2-.584.805.146 1.465.51 1.905 1.168.22.292.733.365 1.026.146.293-.22.367-.73.147-1.022-.733-.949-1.76-1.532-2.859-1.678-1.1-.22-2.272.073-3.225.802l-.44.438-2.199 2.19c-1.686 1.75-1.612 4.524.074 6.202.88.803 1.979 1.241 3.078 1.241 1.1 0 2.199-.438 3.079-1.24l1.246-1.241a.703.703 0 0 0 0-1.022c-.294-.292-.807-.365-1.1-.073z",
          fill: "#FFF",
          fillRule: "nonzero"
        })));
      }
      module.exports = (_temp = _class = class Url extends UIPlugin {
        constructor(uppy, opts) {
          super(uppy, opts);
          this.id = this.opts.id || "Url";
          this.title = this.opts.title || "Link";
          this.type = "acquirer";
          this.icon = () => h3(UrlIcon, null);
          this.defaultLocale = locale;
          const defaultOptions = {};
          this.opts = {
            ...defaultOptions,
            ...opts
          };
          this.i18nInit();
          this.hostname = this.opts.companionUrl;
          if (!this.hostname) {
            throw new Error("Companion hostname is required, please consult https://uppy.io/docs/companion");
          }
          this.getMeta = this.getMeta.bind(this);
          this.addFile = this.addFile.bind(this);
          this.handleRootDrop = this.handleRootDrop.bind(this);
          this.handleRootPaste = this.handleRootPaste.bind(this);
          this.client = new RequestClient(uppy, {
            companionUrl: this.opts.companionUrl,
            companionHeaders: this.opts.companionHeaders,
            companionCookiesRule: this.opts.companionCookiesRule
          });
        }
        getFileNameFromUrl(url) {
          return url.substring(url.lastIndexOf("/") + 1);
        }
        checkIfCorrectURL(url) {
          if (!url)
            return false;
          const protocol = url.match(/^([a-z0-9]+):\/\//)[1];
          if (protocol !== "http" && protocol !== "https") {
            return false;
          }
          return true;
        }
        addProtocolToURL(url) {
          const protocolRegex = /^[a-z0-9]+:\/\//;
          const defaultProtocol = "http://";
          if (protocolRegex.test(url)) {
            return url;
          }
          return defaultProtocol + url;
        }
        getMeta(url) {
          return this.client.post("url/meta", {
            url
          }).then((res) => {
            if (res.error) {
              this.uppy.log("[URL] Error:");
              this.uppy.log(res.error);
              throw new Error("Failed to fetch the file");
            }
            return res;
          });
        }
        addFile(url) {
          url = this.addProtocolToURL(url);
          if (!this.checkIfCorrectURL(url)) {
            this.uppy.log(`[URL] Incorrect URL entered: ${url}`);
            this.uppy.info(this.i18n("enterCorrectUrl"), "error", 4e3);
            return;
          }
          return this.getMeta(url).then((meta) => {
            const tagFile = {
              source: this.id,
              name: this.getFileNameFromUrl(url),
              type: meta.type,
              data: {
                size: meta.size
              },
              isRemote: true,
              body: {
                url
              },
              remote: {
                companionUrl: this.opts.companionUrl,
                url: `${this.hostname}/url/get`,
                body: {
                  fileId: url,
                  url
                },
                providerOptions: this.client.opts
              }
            };
            return tagFile;
          }).then((tagFile) => {
            this.uppy.log("[Url] Adding remote file");
            try {
              return this.uppy.addFile(tagFile);
            } catch (err) {
              if (!err.isRestriction) {
                this.uppy.log(err);
              }
              return err;
            }
          }).catch((err) => {
            this.uppy.log(err);
            this.uppy.info({
              message: this.i18n("failedToFetch"),
              details: err
            }, "error", 4e3);
            return err;
          });
        }
        canHandleRootDrop(e3) {
          const items = toArray(e3.dataTransfer.items);
          const urls = items.filter((item) => item.kind === "string" && item.type === "text/uri-list");
          return urls.length > 0;
        }
        handleRootDrop(e3) {
          forEachDroppedOrPastedUrl(e3.dataTransfer, "drop", (url) => {
            this.uppy.log(`[URL] Adding file from dropped url: ${url}`);
            this.addFile(url);
          });
        }
        handleRootPaste(e3) {
          forEachDroppedOrPastedUrl(e3.clipboardData, "paste", (url) => {
            this.uppy.log(`[URL] Adding file from pasted url: ${url}`);
            this.addFile(url);
          });
        }
        render() {
          return h3(UrlUI, {
            i18n: this.i18n,
            addFile: this.addFile
          });
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
      }, _class.VERSION = "2.0.5", _temp);
    }
  });

  // ../packages/@uppy/utils/lib/getFileTypeExtension.js
  var require_getFileTypeExtension = __commonJS({
    "../packages/@uppy/utils/lib/getFileTypeExtension.js"(exports, module) {
      var mimeToExtensions = {
        "audio/mp3": "mp3",
        "audio/mp4": "mp4",
        "audio/ogg": "ogg",
        "audio/webm": "webm",
        "image/gif": "gif",
        "image/heic": "heic",
        "image/heif": "heif",
        "image/jpeg": "jpg",
        "image/png": "png",
        "image/svg+xml": "svg",
        "video/mp4": "mp4",
        "video/ogg": "ogv",
        "video/quicktime": "mov",
        "video/webm": "webm",
        "video/x-matroska": "mkv",
        "video/x-msvideo": "avi"
      };
      module.exports = function getFileTypeExtension(mimeType) {
        [mimeType] = mimeType.split(";", 1);
        return mimeToExtensions[mimeType] || null;
      };
    }
  });

  // ../packages/@uppy/utils/lib/canvasToBlob.js
  var require_canvasToBlob = __commonJS({
    "../packages/@uppy/utils/lib/canvasToBlob.js"(exports, module) {
      module.exports = function canvasToBlob(canvas, type, quality) {
        return new Promise((resolve) => {
          canvas.toBlob(resolve, type, quality);
        });
      };
    }
  });

  // ../packages/@uppy/webcam/lib/supportsMediaRecorder.js
  var require_supportsMediaRecorder = __commonJS({
    "../packages/@uppy/webcam/lib/supportsMediaRecorder.js"(exports, module) {
      "use strict";
      function supportsMediaRecorder() {
        return typeof MediaRecorder === "function" && !!MediaRecorder.prototype && typeof MediaRecorder.prototype.start === "function";
      }
      module.exports = supportsMediaRecorder;
    }
  });

  // ../packages/@uppy/webcam/lib/CameraIcon.js
  var require_CameraIcon = __commonJS({
    "../packages/@uppy/webcam/lib/CameraIcon.js"(exports, module) {
      "use strict";
      var _preact = (init_preact_module(), __toCommonJS(preact_module_exports));
      module.exports = () => {
        return (0, _preact.h)("svg", {
          "aria-hidden": "true",
          focusable: "false",
          fill: "#0097DC",
          width: "66",
          height: "55",
          viewBox: "0 0 66 55"
        }, (0, _preact.h)("path", {
          d: "M57.3 8.433c4.59 0 8.1 3.51 8.1 8.1v29.7c0 4.59-3.51 8.1-8.1 8.1H8.7c-4.59 0-8.1-3.51-8.1-8.1v-29.7c0-4.59 3.51-8.1 8.1-8.1h9.45l4.59-7.02c.54-.54 1.35-1.08 2.16-1.08h16.2c.81 0 1.62.54 2.16 1.08l4.59 7.02h9.45zM33 14.64c-8.62 0-15.393 6.773-15.393 15.393 0 8.62 6.773 15.393 15.393 15.393 8.62 0 15.393-6.773 15.393-15.393 0-8.62-6.773-15.393-15.393-15.393zM33 40c-5.648 0-9.966-4.319-9.966-9.967 0-5.647 4.318-9.966 9.966-9.966s9.966 4.319 9.966 9.966C42.966 35.681 38.648 40 33 40z",
          fillRule: "evenodd"
        }));
      };
    }
  });

  // ../packages/@uppy/webcam/lib/SnapshotButton.js
  var require_SnapshotButton = __commonJS({
    "../packages/@uppy/webcam/lib/SnapshotButton.js"(exports, module) {
      "use strict";
      var _preact = (init_preact_module(), __toCommonJS(preact_module_exports));
      var CameraIcon = require_CameraIcon();
      module.exports = (_ref) => {
        let {
          onSnapshot,
          i18n
        } = _ref;
        return (0, _preact.h)("button", {
          className: "uppy-u-reset uppy-c-btn uppy-Webcam-button uppy-Webcam-button--picture",
          type: "button",
          title: i18n("takePicture"),
          "aria-label": i18n("takePicture"),
          onClick: onSnapshot,
          "data-uppy-super-focusable": true
        }, CameraIcon());
      };
    }
  });

  // ../packages/@uppy/webcam/lib/RecordButton.js
  var require_RecordButton = __commonJS({
    "../packages/@uppy/webcam/lib/RecordButton.js"(exports, module) {
      "use strict";
      var _preact = (init_preact_module(), __toCommonJS(preact_module_exports));
      function RecordButton(_ref) {
        let {
          recording,
          onStartRecording,
          onStopRecording,
          i18n
        } = _ref;
        if (recording) {
          return (0, _preact.h)("button", {
            className: "uppy-u-reset uppy-c-btn uppy-Webcam-button",
            type: "button",
            title: i18n("stopRecording"),
            "aria-label": i18n("stopRecording"),
            onClick: onStopRecording,
            "data-uppy-super-focusable": true
          }, (0, _preact.h)("svg", {
            "aria-hidden": "true",
            focusable: "false",
            className: "uppy-c-icon",
            width: "100",
            height: "100",
            viewBox: "0 0 100 100"
          }, (0, _preact.h)("rect", {
            x: "15",
            y: "15",
            width: "70",
            height: "70"
          })));
        }
        return (0, _preact.h)("button", {
          className: "uppy-u-reset uppy-c-btn uppy-Webcam-button",
          type: "button",
          title: i18n("startRecording"),
          "aria-label": i18n("startRecording"),
          onClick: onStartRecording,
          "data-uppy-super-focusable": true
        }, (0, _preact.h)("svg", {
          "aria-hidden": "true",
          focusable: "false",
          className: "uppy-c-icon",
          width: "100",
          height: "100",
          viewBox: "0 0 100 100"
        }, (0, _preact.h)("circle", {
          cx: "50",
          cy: "50",
          r: "40"
        })));
      }
      module.exports = RecordButton;
    }
  });

  // ../packages/@uppy/webcam/lib/formatSeconds.js
  var require_formatSeconds = __commonJS({
    "../packages/@uppy/webcam/lib/formatSeconds.js"(exports, module) {
      "use strict";
      function formatSeconds(seconds) {
        return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, 0)}`;
      }
      module.exports = formatSeconds;
    }
  });

  // ../packages/@uppy/webcam/lib/RecordingLength.js
  var require_RecordingLength = __commonJS({
    "../packages/@uppy/webcam/lib/RecordingLength.js"(exports, module) {
      "use strict";
      var _preact = (init_preact_module(), __toCommonJS(preact_module_exports));
      var formatSeconds = require_formatSeconds();
      function RecordingLength(_ref) {
        let {
          recordingLengthSeconds,
          i18n
        } = _ref;
        const formattedRecordingLengthSeconds = formatSeconds(recordingLengthSeconds);
        return (0, _preact.h)("span", {
          "aria-label": i18n("recordingLength", {
            recording_length: formattedRecordingLengthSeconds
          })
        }, formattedRecordingLengthSeconds);
      }
      module.exports = RecordingLength;
    }
  });

  // ../packages/@uppy/webcam/lib/VideoSourceSelect.js
  var require_VideoSourceSelect = __commonJS({
    "../packages/@uppy/webcam/lib/VideoSourceSelect.js"(exports, module) {
      "use strict";
      var _preact = (init_preact_module(), __toCommonJS(preact_module_exports));
      module.exports = (_ref) => {
        let {
          currentDeviceId,
          videoSources,
          onChangeVideoSource
        } = _ref;
        return (0, _preact.h)("div", {
          className: "uppy-Webcam-videoSource"
        }, (0, _preact.h)("select", {
          className: "uppy-u-reset uppy-Webcam-videoSource-select",
          onChange: (event) => {
            onChangeVideoSource(event.target.value);
          }
        }, videoSources.map((videoSource) => (0, _preact.h)("option", {
          key: videoSource.deviceId,
          value: videoSource.deviceId,
          selected: videoSource.deviceId === currentDeviceId
        }, videoSource.label))));
      };
    }
  });

  // ../packages/@uppy/webcam/lib/SubmitButton.js
  var require_SubmitButton = __commonJS({
    "../packages/@uppy/webcam/lib/SubmitButton.js"(exports, module) {
      "use strict";
      var _preact = (init_preact_module(), __toCommonJS(preact_module_exports));
      function SubmitButton(_ref) {
        let {
          onSubmit,
          i18n
        } = _ref;
        return (0, _preact.h)("button", {
          className: "uppy-u-reset uppy-c-btn uppy-Webcam-button uppy-Webcam-button--submit",
          type: "button",
          title: i18n("submitRecordedFile"),
          "aria-label": i18n("submitRecordedFile"),
          onClick: onSubmit,
          "data-uppy-super-focusable": true
        }, (0, _preact.h)("svg", {
          width: "12",
          height: "9",
          viewBox: "0 0 12 9",
          xmlns: "http://www.w3.org/2000/svg",
          "aria-hidden": "true",
          focusable: "false",
          className: "uppy-c-icon"
        }, (0, _preact.h)("path", {
          fill: "#fff",
          fillRule: "nonzero",
          d: "M10.66 0L12 1.31 4.136 9 0 4.956l1.34-1.31L4.136 6.38z"
        })));
      }
      module.exports = SubmitButton;
    }
  });

  // ../packages/@uppy/webcam/lib/DiscardButton.js
  var require_DiscardButton = __commonJS({
    "../packages/@uppy/webcam/lib/DiscardButton.js"(exports, module) {
      "use strict";
      var _preact = (init_preact_module(), __toCommonJS(preact_module_exports));
      function DiscardButton(_ref) {
        let {
          onDiscard,
          i18n
        } = _ref;
        return (0, _preact.h)("button", {
          className: "uppy-u-reset uppy-c-btn uppy-Webcam-button uppy-Webcam-button--discard",
          type: "button",
          title: i18n("discardRecordedFile"),
          "aria-label": i18n("discardRecordedFile"),
          onClick: onDiscard,
          "data-uppy-super-focusable": true
        }, (0, _preact.h)("svg", {
          width: "13",
          height: "13",
          viewBox: "0 0 13 13",
          xmlns: "http://www.w3.org/2000/svg",
          "aria-hidden": "true",
          focusable: "false",
          className: "uppy-c-icon"
        }, (0, _preact.h)("g", {
          fill: "#FFF",
          fillRule: "evenodd"
        }, (0, _preact.h)("path", {
          d: "M.496 11.367L11.103.76l1.414 1.414L1.911 12.781z"
        }), (0, _preact.h)("path", {
          d: "M11.104 12.782L.497 2.175 1.911.76l10.607 10.606z"
        }))));
      }
      module.exports = DiscardButton;
    }
  });

  // ../packages/@uppy/webcam/lib/CameraScreen.js
  var require_CameraScreen = __commonJS({
    "../packages/@uppy/webcam/lib/CameraScreen.js"(exports, module) {
      "use strict";
      var _preact = (init_preact_module(), __toCommonJS(preact_module_exports));
      function _extends() {
        _extends = Object.assign || function(target) {
          for (var i3 = 1; i3 < arguments.length; i3++) {
            var source = arguments[i3];
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
      var SnapshotButton = require_SnapshotButton();
      var RecordButton = require_RecordButton();
      var RecordingLength = require_RecordingLength();
      var VideoSourceSelect = require_VideoSourceSelect();
      var SubmitButton = require_SubmitButton();
      var DiscardButton = require_DiscardButton();
      function isModeAvailable(modes, mode) {
        return modes.indexOf(mode) !== -1;
      }
      var CameraScreen = class extends _preact.Component {
        componentDidMount() {
          const {
            onFocus
          } = this.props;
          onFocus();
        }
        componentWillUnmount() {
          const {
            onStop
          } = this.props;
          onStop();
        }
        render() {
          const {
            src,
            recordedVideo,
            recording,
            modes,
            supportsRecording,
            videoSources,
            showVideoSourceDropdown,
            showRecordingLength,
            onSubmit,
            i18n,
            mirror,
            onSnapshot,
            onStartRecording,
            onStopRecording,
            onDiscardRecordedVideo,
            recordingLengthSeconds
          } = this.props;
          const hasRecordedVideo = !!recordedVideo;
          const shouldShowRecordButton = !hasRecordedVideo && supportsRecording && (isModeAvailable(modes, "video-only") || isModeAvailable(modes, "audio-only") || isModeAvailable(modes, "video-audio"));
          const shouldShowSnapshotButton = !hasRecordedVideo && isModeAvailable(modes, "picture");
          const shouldShowRecordingLength = supportsRecording && showRecordingLength && !hasRecordedVideo;
          const shouldShowVideoSourceDropdown = showVideoSourceDropdown && videoSources && videoSources.length > 1;
          const videoProps = {
            playsinline: true
          };
          if (recordedVideo) {
            videoProps.muted = false;
            videoProps.controls = true;
            videoProps.src = recordedVideo;
            if (this.videoElement) {
              this.videoElement.srcObject = void 0;
            }
          } else {
            videoProps.muted = true;
            videoProps.autoplay = true;
            videoProps.srcObject = src;
          }
          return (0, _preact.h)("div", {
            className: "uppy uppy-Webcam-container"
          }, (0, _preact.h)("div", {
            className: "uppy-Webcam-videoContainer"
          }, (0, _preact.h)("video", _extends({
            ref: (videoElement) => this.videoElement = videoElement,
            className: `uppy-Webcam-video  ${mirror ? "uppy-Webcam-video--mirrored" : ""}`
          }, videoProps))), (0, _preact.h)("div", {
            className: "uppy-Webcam-footer"
          }, (0, _preact.h)("div", {
            className: "uppy-Webcam-videoSourceContainer"
          }, shouldShowVideoSourceDropdown ? VideoSourceSelect(this.props) : null), (0, _preact.h)("div", {
            className: "uppy-Webcam-buttonContainer"
          }, shouldShowSnapshotButton && (0, _preact.h)(SnapshotButton, {
            onSnapshot,
            i18n
          }), shouldShowRecordButton && (0, _preact.h)(RecordButton, {
            recording,
            onStartRecording,
            onStopRecording,
            i18n
          }), hasRecordedVideo && (0, _preact.h)(SubmitButton, {
            onSubmit,
            i18n
          }), hasRecordedVideo && (0, _preact.h)(DiscardButton, {
            onDiscard: onDiscardRecordedVideo,
            i18n
          })), (0, _preact.h)("div", {
            className: "uppy-Webcam-recordingLength"
          }, shouldShowRecordingLength && (0, _preact.h)(RecordingLength, {
            recordingLengthSeconds,
            i18n
          }))));
        }
      };
      module.exports = CameraScreen;
    }
  });

  // ../packages/@uppy/webcam/lib/PermissionsScreen.js
  var require_PermissionsScreen = __commonJS({
    "../packages/@uppy/webcam/lib/PermissionsScreen.js"(exports, module) {
      "use strict";
      var _preact = (init_preact_module(), __toCommonJS(preact_module_exports));
      module.exports = (_ref) => {
        let {
          icon,
          i18n,
          hasCamera
        } = _ref;
        return (0, _preact.h)("div", {
          className: "uppy-Webcam-permissons"
        }, (0, _preact.h)("div", {
          className: "uppy-Webcam-permissonsIcon"
        }, icon()), (0, _preact.h)("h1", {
          className: "uppy-Webcam-title"
        }, hasCamera ? i18n("allowAccessTitle") : i18n("noCameraTitle")), (0, _preact.h)("p", null, hasCamera ? i18n("allowAccessDescription") : i18n("noCameraDescription")));
      };
    }
  });

  // ../packages/@uppy/webcam/lib/locale.js
  var require_locale14 = __commonJS({
    "../packages/@uppy/webcam/lib/locale.js"(exports, module) {
      "use strict";
      module.exports = {
        strings: {
          pluginNameCamera: "Camera",
          noCameraTitle: "Camera Not Available",
          noCameraDescription: "In order to take pictures or record video, please connect a camera device",
          recordingStoppedMaxSize: "Recording stopped because the file size is about to exceed the limit",
          submitRecordedFile: "Submit recorded file",
          discardRecordedFile: "Discard recorded file",
          smile: "Smile!",
          takePicture: "Take a picture",
          startRecording: "Begin video recording",
          stopRecording: "Stop video recording",
          recordingLength: "Recording length %{recording_length}",
          allowAccessTitle: "Please allow access to your camera",
          allowAccessDescription: "In order to take pictures or record video with your camera, please allow camera access for this site."
        }
      };
    }
  });

  // ../packages/@uppy/webcam/lib/Webcam.js
  var require_Webcam = __commonJS({
    "../packages/@uppy/webcam/lib/Webcam.js"(exports, module) {
      "use strict";
      var _preact = (init_preact_module(), __toCommonJS(preact_module_exports));
      var _core = require_lib2();
      function _extends() {
        _extends = Object.assign || function(target) {
          for (var i3 = 1; i3 < arguments.length; i3++) {
            var source = arguments[i3];
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
      var getFileTypeExtension = require_getFileTypeExtension();
      var mimeTypes = require_mimeTypes();
      var canvasToBlob = require_canvasToBlob();
      var supportsMediaRecorder = require_supportsMediaRecorder();
      var CameraIcon = require_CameraIcon();
      var CameraScreen = require_CameraScreen();
      var PermissionsScreen = require_PermissionsScreen();
      var packageJson = {
        "version": "2.1.0"
      };
      var locale = require_locale14();
      function toMimeType(fileType) {
        if (fileType[0] === ".") {
          return mimeTypes[fileType.slice(1)];
        }
        return fileType;
      }
      function isVideoMimeType(mimeType) {
        return /^video\/[^*]+$/.test(mimeType);
      }
      function isImageMimeType(mimeType) {
        return /^image\/[^*]+$/.test(mimeType);
      }
      function getMediaDevices() {
        return navigator.mediaDevices;
      }
      var _enableMirror = /* @__PURE__ */ _classPrivateFieldLooseKey("enableMirror");
      var Webcam2 = class extends _core.UIPlugin {
        constructor(uppy, opts) {
          super(uppy, opts);
          Object.defineProperty(this, _enableMirror, {
            writable: true,
            value: void 0
          });
          this.mediaDevices = getMediaDevices();
          this.supportsUserMedia = !!this.mediaDevices;
          this.protocol = location.protocol.match(/https/i) ? "https" : "http";
          this.id = this.opts.id || "Webcam";
          this.type = "acquirer";
          this.capturedMediaFile = null;
          this.icon = () => (0, _preact.h)("svg", {
            "aria-hidden": "true",
            focusable: "false",
            width: "32",
            height: "32",
            viewBox: "0 0 32 32"
          }, (0, _preact.h)("g", {
            fill: "none",
            fillRule: "evenodd"
          }, (0, _preact.h)("rect", {
            className: "uppy-ProviderIconBg",
            fill: "#03BFEF",
            width: "32",
            height: "32",
            rx: "16"
          }), (0, _preact.h)("path", {
            d: "M22 11c1.133 0 2 .867 2 2v7.333c0 1.134-.867 2-2 2H10c-1.133 0-2-.866-2-2V13c0-1.133.867-2 2-2h2.333l1.134-1.733C13.6 9.133 13.8 9 14 9h4c.2 0 .4.133.533.267L19.667 11H22zm-6 1.533a3.764 3.764 0 0 0-3.8 3.8c0 2.129 1.672 3.801 3.8 3.801s3.8-1.672 3.8-3.8c0-2.13-1.672-3.801-3.8-3.801zm0 6.261c-1.395 0-2.46-1.066-2.46-2.46 0-1.395 1.065-2.461 2.46-2.461s2.46 1.066 2.46 2.46c0 1.395-1.065 2.461-2.46 2.461z",
            fill: "#FFF",
            fillRule: "nonzero"
          })));
          this.defaultLocale = locale;
          const defaultOptions = {
            onBeforeSnapshot: () => Promise.resolve(),
            countdown: false,
            modes: ["video-audio", "video-only", "audio-only", "picture"],
            mirror: true,
            showVideoSourceDropdown: false,
            facingMode: "user",
            preferredImageMimeType: null,
            preferredVideoMimeType: null,
            showRecordingLength: false
          };
          this.opts = {
            ...defaultOptions,
            ...opts
          };
          this.i18nInit();
          this.title = this.i18n("pluginNameCamera");
          _classPrivateFieldLooseBase(this, _enableMirror)[_enableMirror] = this.opts.mirror;
          this.install = this.install.bind(this);
          this.setPluginState = this.setPluginState.bind(this);
          this.render = this.render.bind(this);
          this.start = this.start.bind(this);
          this.stop = this.stop.bind(this);
          this.takeSnapshot = this.takeSnapshot.bind(this);
          this.startRecording = this.startRecording.bind(this);
          this.stopRecording = this.stopRecording.bind(this);
          this.discardRecordedVideo = this.discardRecordedVideo.bind(this);
          this.submit = this.submit.bind(this);
          this.oneTwoThreeSmile = this.oneTwoThreeSmile.bind(this);
          this.focus = this.focus.bind(this);
          this.changeVideoSource = this.changeVideoSource.bind(this);
          this.webcamActive = false;
          if (this.opts.countdown) {
            this.opts.onBeforeSnapshot = this.oneTwoThreeSmile;
          }
          this.setPluginState({
            hasCamera: false,
            cameraReady: false,
            cameraError: null,
            recordingLengthSeconds: 0,
            videoSources: [],
            currentDeviceId: null
          });
        }
        setOptions(newOpts) {
          super.setOptions({
            ...newOpts,
            videoConstraints: {
              ...this.opts.videoConstraints,
              ...newOpts == null ? void 0 : newOpts.videoConstraints
            }
          });
        }
        hasCameraCheck() {
          if (!this.mediaDevices) {
            return Promise.resolve(false);
          }
          return this.mediaDevices.enumerateDevices().then((devices) => {
            return devices.some((device) => device.kind === "videoinput");
          });
        }
        isAudioOnly() {
          return this.opts.modes.length === 1 && this.opts.modes[0] === "audio-only";
        }
        getConstraints(deviceId) {
          if (deviceId === void 0) {
            deviceId = null;
          }
          const acceptsAudio = this.opts.modes.indexOf("video-audio") !== -1 || this.opts.modes.indexOf("audio-only") !== -1;
          const acceptsVideo = !this.isAudioOnly() && (this.opts.modes.indexOf("video-audio") !== -1 || this.opts.modes.indexOf("video-only") !== -1 || this.opts.modes.indexOf("picture") !== -1);
          const videoConstraints = {
            ...this.opts.videoConstraints || {
              facingMode: this.opts.facingMode
            },
            ...deviceId ? {
              deviceId,
              facingMode: null
            } : {}
          };
          return {
            audio: acceptsAudio,
            video: acceptsVideo ? videoConstraints : false
          };
        }
        start(options) {
          if (options === void 0) {
            options = null;
          }
          if (!this.supportsUserMedia) {
            return Promise.reject(new Error("Webcam access not supported"));
          }
          this.webcamActive = true;
          if (this.opts.mirror) {
            _classPrivateFieldLooseBase(this, _enableMirror)[_enableMirror] = true;
          }
          const constraints = this.getConstraints(options && options.deviceId ? options.deviceId : null);
          this.hasCameraCheck().then((hasCamera) => {
            this.setPluginState({
              hasCamera
            });
            return this.mediaDevices.getUserMedia(constraints).then((stream) => {
              this.stream = stream;
              let currentDeviceId = null;
              const tracks = this.isAudioOnly() ? stream.getAudioTracks() : stream.getVideoTracks();
              if (!options || !options.deviceId) {
                currentDeviceId = tracks[0].getSettings().deviceId;
              } else {
                tracks.forEach((track) => {
                  if (track.getSettings().deviceId === options.deviceId) {
                    currentDeviceId = track.getSettings().deviceId;
                  }
                });
              }
              this.updateVideoSources();
              this.setPluginState({
                currentDeviceId,
                cameraReady: true
              });
            }).catch((err) => {
              this.setPluginState({
                cameraReady: false,
                cameraError: err
              });
              this.uppy.info(err.message, "error");
            });
          });
        }
        getMediaRecorderOptions() {
          const options = {};
          if (MediaRecorder.isTypeSupported) {
            const {
              restrictions
            } = this.uppy.opts;
            let preferredVideoMimeTypes = [];
            if (this.opts.preferredVideoMimeType) {
              preferredVideoMimeTypes = [this.opts.preferredVideoMimeType];
            } else if (restrictions.allowedFileTypes) {
              preferredVideoMimeTypes = restrictions.allowedFileTypes.map(toMimeType).filter(isVideoMimeType);
            }
            const filterSupportedTypes = (candidateType) => MediaRecorder.isTypeSupported(candidateType) && getFileTypeExtension(candidateType);
            const acceptableMimeTypes = preferredVideoMimeTypes.filter(filterSupportedTypes);
            if (acceptableMimeTypes.length > 0) {
              options.mimeType = acceptableMimeTypes[0];
            }
          }
          return options;
        }
        startRecording() {
          this.recorder = new MediaRecorder(this.stream, this.getMediaRecorderOptions());
          this.recordingChunks = [];
          let stoppingBecauseOfMaxSize = false;
          this.recorder.addEventListener("dataavailable", (event) => {
            this.recordingChunks.push(event.data);
            const {
              restrictions
            } = this.uppy.opts;
            if (this.recordingChunks.length > 1 && restrictions.maxFileSize != null && !stoppingBecauseOfMaxSize) {
              const totalSize = this.recordingChunks.reduce((acc, chunk) => acc + chunk.size, 0);
              const averageChunkSize = (totalSize - this.recordingChunks[0].size) / (this.recordingChunks.length - 1);
              const expectedEndChunkSize = averageChunkSize * 3;
              const maxSize = Math.max(0, restrictions.maxFileSize - expectedEndChunkSize);
              if (totalSize > maxSize) {
                stoppingBecauseOfMaxSize = true;
                this.uppy.info(this.i18n("recordingStoppedMaxSize"), "warning", 4e3);
                this.stopRecording();
              }
            }
          });
          this.recorder.start(500);
          if (this.opts.showRecordingLength) {
            this.recordingLengthTimer = setInterval(() => {
              const currentRecordingLength = this.getPluginState().recordingLengthSeconds;
              this.setPluginState({
                recordingLengthSeconds: currentRecordingLength + 1
              });
            }, 1e3);
          }
          this.setPluginState({
            isRecording: true
          });
        }
        stopRecording() {
          const stopped = new Promise((resolve) => {
            this.recorder.addEventListener("stop", () => {
              resolve();
            });
            this.recorder.stop();
            if (this.opts.showRecordingLength) {
              clearInterval(this.recordingLengthTimer);
              this.setPluginState({
                recordingLengthSeconds: 0
              });
            }
          });
          return stopped.then(() => {
            this.setPluginState({
              isRecording: false
            });
            return this.getVideo();
          }).then((file) => {
            try {
              this.capturedMediaFile = file;
              this.setPluginState({
                recordedVideo: URL.createObjectURL(file.data)
              });
              _classPrivateFieldLooseBase(this, _enableMirror)[_enableMirror] = false;
            } catch (err) {
              if (!err.isRestriction) {
                this.uppy.log(err);
              }
            }
          }).then(() => {
            this.recordingChunks = null;
            this.recorder = null;
          }, (error) => {
            this.recordingChunks = null;
            this.recorder = null;
            throw error;
          });
        }
        discardRecordedVideo() {
          this.setPluginState({
            recordedVideo: null
          });
          if (this.opts.mirror) {
            _classPrivateFieldLooseBase(this, _enableMirror)[_enableMirror] = true;
          }
          this.capturedMediaFile = null;
        }
        submit() {
          try {
            if (this.capturedMediaFile) {
              this.uppy.addFile(this.capturedMediaFile);
            }
          } catch (err) {
            if (!err.isRestriction) {
              this.uppy.log(err, "error");
            }
          }
        }
        async stop() {
          if (this.stream) {
            const audioTracks = this.stream.getAudioTracks();
            const videoTracks = this.stream.getVideoTracks();
            audioTracks.concat(videoTracks).forEach((track) => track.stop());
          }
          if (this.recorder) {
            await new Promise((resolve) => {
              this.recorder.addEventListener("stop", resolve, {
                once: true
              });
              this.recorder.stop();
              if (this.opts.showRecordingLength) {
                clearInterval(this.recordingLengthTimer);
              }
            });
          }
          this.recordingChunks = null;
          this.recorder = null;
          this.webcamActive = false;
          this.stream = null;
          this.setPluginState({
            recordedVideo: null,
            isRecording: false,
            recordingLengthSeconds: 0
          });
        }
        getVideoElement() {
          return this.el.querySelector(".uppy-Webcam-video");
        }
        oneTwoThreeSmile() {
          return new Promise((resolve, reject) => {
            let count = this.opts.countdown;
            const countDown = setInterval(() => {
              if (!this.webcamActive) {
                clearInterval(countDown);
                this.captureInProgress = false;
                return reject(new Error("Webcam is not active"));
              }
              if (count > 0) {
                this.uppy.info(`${count}...`, "warning", 800);
                count--;
              } else {
                clearInterval(countDown);
                this.uppy.info(this.i18n("smile"), "success", 1500);
                setTimeout(() => resolve(), 1500);
              }
            }, 1e3);
          });
        }
        takeSnapshot() {
          if (this.captureInProgress)
            return;
          this.captureInProgress = true;
          this.opts.onBeforeSnapshot().catch((err) => {
            const message = typeof err === "object" ? err.message : err;
            this.uppy.info(message, "error", 5e3);
            return Promise.reject(new Error(`onBeforeSnapshot: ${message}`));
          }).then(() => {
            return this.getImage();
          }).then((tagFile) => {
            this.captureInProgress = false;
            try {
              this.uppy.addFile(tagFile);
            } catch (err) {
              if (!err.isRestriction) {
                this.uppy.log(err);
              }
            }
          }, (error) => {
            this.captureInProgress = false;
            throw error;
          });
        }
        getImage() {
          const video = this.getVideoElement();
          if (!video) {
            return Promise.reject(new Error("No video element found, likely due to the Webcam tab being closed."));
          }
          const width = video.videoWidth;
          const height = video.videoHeight;
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(video, 0, 0);
          const {
            restrictions
          } = this.uppy.opts;
          let preferredImageMimeTypes = [];
          if (this.opts.preferredImageMimeType) {
            preferredImageMimeTypes = [this.opts.preferredImageMimeType];
          } else if (restrictions.allowedFileTypes) {
            preferredImageMimeTypes = restrictions.allowedFileTypes.map(toMimeType).filter(isImageMimeType);
          }
          const mimeType = preferredImageMimeTypes[0] || "image/jpeg";
          const ext = getFileTypeExtension(mimeType) || "jpg";
          const name = `cam-${Date.now()}.${ext}`;
          return canvasToBlob(canvas, mimeType).then((blob) => {
            return {
              source: this.id,
              name,
              data: new Blob([blob], {
                type: mimeType
              }),
              type: mimeType
            };
          });
        }
        getVideo() {
          const mimeType = this.recordingChunks.find((blob2) => {
            var _blob$type;
            return ((_blob$type = blob2.type) == null ? void 0 : _blob$type.length) > 0;
          }).type;
          const fileExtension = getFileTypeExtension(mimeType);
          if (!fileExtension) {
            return Promise.reject(new Error(`Could not retrieve recording: Unsupported media type "${mimeType}"`));
          }
          const name = `webcam-${Date.now()}.${fileExtension}`;
          const blob = new Blob(this.recordingChunks, {
            type: mimeType
          });
          const file = {
            source: this.id,
            name,
            data: new Blob([blob], {
              type: mimeType
            }),
            type: mimeType
          };
          return Promise.resolve(file);
        }
        focus() {
          if (!this.opts.countdown)
            return;
          setTimeout(() => {
            this.uppy.info(this.i18n("smile"), "success", 1500);
          }, 1e3);
        }
        changeVideoSource(deviceId) {
          this.stop();
          this.start({
            deviceId
          });
        }
        updateVideoSources() {
          this.mediaDevices.enumerateDevices().then((devices) => {
            this.setPluginState({
              videoSources: devices.filter((device) => device.kind === "videoinput")
            });
          });
        }
        render() {
          if (!this.webcamActive) {
            this.start();
          }
          const webcamState = this.getPluginState();
          if (!webcamState.cameraReady || !webcamState.hasCamera) {
            return (0, _preact.h)(PermissionsScreen, {
              icon: CameraIcon,
              i18n: this.i18n,
              hasCamera: webcamState.hasCamera
            });
          }
          return (0, _preact.h)(CameraScreen, _extends({}, webcamState, {
            onChangeVideoSource: this.changeVideoSource,
            onSnapshot: this.takeSnapshot,
            onStartRecording: this.startRecording,
            onStopRecording: this.stopRecording,
            onDiscardRecordedVideo: this.discardRecordedVideo,
            onSubmit: this.submit,
            onFocus: this.focus,
            onStop: this.stop,
            i18n: this.i18n,
            modes: this.opts.modes,
            showRecordingLength: this.opts.showRecordingLength,
            showVideoSourceDropdown: this.opts.showVideoSourceDropdown,
            supportsRecording: supportsMediaRecorder(),
            recording: webcamState.isRecording,
            mirror: _classPrivateFieldLooseBase(this, _enableMirror)[_enableMirror],
            src: this.stream
          }));
        }
        install() {
          this.setPluginState({
            cameraReady: false,
            recordingLengthSeconds: 0
          });
          const {
            target
          } = this.opts;
          if (target) {
            this.mount(target, this);
          }
          if (this.mediaDevices) {
            this.updateVideoSources();
            this.mediaDevices.ondevicechange = () => {
              this.updateVideoSources();
              if (this.stream) {
                let restartStream = true;
                const {
                  videoSources,
                  currentDeviceId
                } = this.getPluginState();
                videoSources.forEach((videoSource) => {
                  if (currentDeviceId === videoSource.deviceId) {
                    restartStream = false;
                  }
                });
                if (restartStream) {
                  this.stop();
                  this.start();
                }
              }
            };
          }
        }
        uninstall() {
          this.stop();
          this.unmount();
        }
        onUnmount() {
          this.stop();
        }
      };
      Webcam2.VERSION = packageJson.version;
      module.exports = Webcam2;
    }
  });

  // ../packages/@uppy/webcam/lib/index.js
  var require_lib19 = __commonJS({
    "../packages/@uppy/webcam/lib/index.js"(exports, module) {
      "use strict";
      module.exports = require_Webcam();
    }
  });

  // ../packages/@uppy/audio/lib/supportsMediaRecorder.js
  var require_supportsMediaRecorder2 = __commonJS({
    "../packages/@uppy/audio/lib/supportsMediaRecorder.js"(exports, module) {
      "use strict";
      function supportsMediaRecorder() {
        var _MediaRecorder$protot;
        return typeof MediaRecorder === "function" && typeof ((_MediaRecorder$protot = MediaRecorder.prototype) == null ? void 0 : _MediaRecorder$protot.start) === "function";
      }
      module.exports = supportsMediaRecorder;
    }
  });

  // ../node_modules/preact/hooks/dist/hooks.module.js
  var hooks_module_exports = {};
  __export(hooks_module_exports, {
    useCallback: () => A2,
    useContext: () => F,
    useDebugValue: () => T2,
    useEffect: () => y2,
    useErrorBoundary: () => q2,
    useImperativeHandle: () => _2,
    useLayoutEffect: () => h2,
    useMemo: () => d2,
    useReducer: () => p2,
    useRef: () => s2,
    useState: () => l2
  });
  function m2(t3, r3) {
    l.__h && l.__h(u2, t3, o2 || r3), o2 = 0;
    var i3 = u2.__H || (u2.__H = {
      __: [],
      __h: []
    });
    return t3 >= i3.__.length && i3.__.push({}), i3.__[t3];
  }
  function l2(n2) {
    return o2 = 1, p2(z2, n2);
  }
  function p2(n2, r3, o3) {
    var i3 = m2(t2++, 2);
    return i3.t = n2, i3.__c || (i3.__ = [o3 ? o3(r3) : z2(void 0, r3), function(n3) {
      var t3 = i3.t(i3.__[0], n3);
      i3.__[0] !== t3 && (i3.__ = [t3, i3.__[1]], i3.__c.setState({}));
    }], i3.__c = u2), i3.__;
  }
  function y2(r3, o3) {
    var i3 = m2(t2++, 3);
    !l.__s && w2(i3.__H, o3) && (i3.__ = r3, i3.__H = o3, u2.__H.__h.push(i3));
  }
  function h2(r3, o3) {
    var i3 = m2(t2++, 4);
    !l.__s && w2(i3.__H, o3) && (i3.__ = r3, i3.__H = o3, u2.__h.push(i3));
  }
  function s2(n2) {
    return o2 = 5, d2(function() {
      return {
        current: n2
      };
    }, []);
  }
  function _2(n2, t3, u3) {
    o2 = 6, h2(function() {
      typeof n2 == "function" ? n2(t3()) : n2 && (n2.current = t3());
    }, u3 == null ? u3 : u3.concat(n2));
  }
  function d2(n2, u3) {
    var r3 = m2(t2++, 7);
    return w2(r3.__H, u3) && (r3.__ = n2(), r3.__H = u3, r3.__h = n2), r3.__;
  }
  function A2(n2, t3) {
    return o2 = 8, d2(function() {
      return n2;
    }, t3);
  }
  function F(n2) {
    var r3 = u2.context[n2.__c], o3 = m2(t2++, 9);
    return o3.c = n2, r3 ? (o3.__ == null && (o3.__ = true, r3.sub(u2)), r3.props.value) : n2.__;
  }
  function T2(t3, u3) {
    l.useDebugValue && l.useDebugValue(u3 ? u3(t3) : t3);
  }
  function q2(n2) {
    var r3 = m2(t2++, 10), o3 = l2();
    return r3.__ = n2, u2.componentDidCatch || (u2.componentDidCatch = function(n3) {
      r3.__ && r3.__(n3), o3[1](n3);
    }), [o3[0], function() {
      o3[1](void 0);
    }];
  }
  function x2() {
    var t3;
    for (i2.sort(function(n2, t4) {
      return n2.__v.__b - t4.__v.__b;
    }); t3 = i2.pop(); )
      if (t3.__P)
        try {
          t3.__H.__h.forEach(j2), t3.__H.__h.forEach(k2), t3.__H.__h = [];
        } catch (u3) {
          t3.__H.__h = [], l.__e(u3, t3.__v);
        }
  }
  function g2(n2) {
    var t3, u3 = function() {
      clearTimeout(r3), b2 && cancelAnimationFrame(t3), setTimeout(n2);
    }, r3 = setTimeout(u3, 100);
    b2 && (t3 = requestAnimationFrame(u3));
  }
  function j2(n2) {
    var t3 = u2, r3 = n2.__c;
    typeof r3 == "function" && (n2.__c = void 0, r3()), u2 = t3;
  }
  function k2(n2) {
    var t3 = u2;
    n2.__c = n2.__(), u2 = t3;
  }
  function w2(n2, t3) {
    return !n2 || n2.length !== t3.length || t3.some(function(t4, u3) {
      return t4 !== n2[u3];
    });
  }
  function z2(n2, t3) {
    return typeof t3 == "function" ? t3(n2) : t3;
  }
  var t2, u2, r2, o2, i2, c2, f2, e2, a2, v2, b2;
  var init_hooks_module = __esm({
    "../node_modules/preact/hooks/dist/hooks.module.js"() {
      init_preact_module();
      o2 = 0;
      i2 = [];
      c2 = l.__b;
      f2 = l.__r;
      e2 = l.diffed;
      a2 = l.__c;
      v2 = l.unmount;
      l.__b = function(n2) {
        u2 = null, c2 && c2(n2);
      }, l.__r = function(n2) {
        f2 && f2(n2), t2 = 0;
        var r3 = (u2 = n2.__c).__H;
        r3 && (r3.__h.forEach(j2), r3.__h.forEach(k2), r3.__h = []);
      }, l.diffed = function(t3) {
        e2 && e2(t3);
        var o3 = t3.__c;
        o3 && o3.__H && o3.__H.__h.length && (i2.push(o3) !== 1 && r2 === l.requestAnimationFrame || ((r2 = l.requestAnimationFrame) || g2)(x2)), u2 = null;
      }, l.__c = function(t3, u3) {
        u3.some(function(t4) {
          try {
            t4.__h.forEach(j2), t4.__h = t4.__h.filter(function(n2) {
              return !n2.__ || k2(n2);
            });
          } catch (r3) {
            u3.some(function(n2) {
              n2.__h && (n2.__h = []);
            }), u3 = [], l.__e(r3, t4.__v);
          }
        }), a2 && a2(t3, u3);
      }, l.unmount = function(t3) {
        v2 && v2(t3);
        var u3, r3 = t3.__c;
        r3 && r3.__H && (r3.__H.__.forEach(function(n2) {
          try {
            j2(n2);
          } catch (n3) {
            u3 = n3;
          }
        }), u3 && l.__e(u3, r3.__v));
      };
      b2 = typeof requestAnimationFrame == "function";
    }
  });

  // ../packages/@uppy/audio/lib/RecordButton.js
  var require_RecordButton2 = __commonJS({
    "../packages/@uppy/audio/lib/RecordButton.js"(exports, module) {
      "use strict";
      var _preact = (init_preact_module(), __toCommonJS(preact_module_exports));
      function RecordButton(_ref) {
        let {
          recording,
          onStartRecording,
          onStopRecording,
          i18n
        } = _ref;
        if (recording) {
          return (0, _preact.h)("button", {
            className: "uppy-u-reset uppy-c-btn uppy-Audio-button",
            type: "button",
            title: i18n("stopAudioRecording"),
            "aria-label": i18n("stopAudioRecording"),
            onClick: onStopRecording,
            "data-uppy-super-focusable": true
          }, (0, _preact.h)("svg", {
            "aria-hidden": "true",
            focusable: "false",
            className: "uppy-c-icon",
            width: "100",
            height: "100",
            viewBox: "0 0 100 100"
          }, (0, _preact.h)("rect", {
            x: "15",
            y: "15",
            width: "70",
            height: "70"
          })));
        }
        return (0, _preact.h)("button", {
          className: "uppy-u-reset uppy-c-btn uppy-Audio-button",
          type: "button",
          title: i18n("startAudioRecording"),
          "aria-label": i18n("startAudioRecording"),
          onClick: onStartRecording,
          "data-uppy-super-focusable": true
        }, (0, _preact.h)("svg", {
          "aria-hidden": "true",
          focusable: "false",
          className: "uppy-c-icon",
          width: "14px",
          height: "20px",
          viewBox: "0 0 14 20"
        }, (0, _preact.h)("path", {
          d: "M7 14c2.21 0 4-1.71 4-3.818V3.818C11 1.71 9.21 0 7 0S3 1.71 3 3.818v6.364C3 12.29 4.79 14 7 14zm6.364-7h-.637a.643.643 0 0 0-.636.65V9.6c0 3.039-2.565 5.477-5.6 5.175-2.645-.264-4.582-2.692-4.582-5.407V7.65c0-.36-.285-.65-.636-.65H.636A.643.643 0 0 0 0 7.65v1.631c0 3.642 2.544 6.888 6.045 7.382v1.387H3.818a.643.643 0 0 0-.636.65v.65c0 .36.285.65.636.65h6.364c.351 0 .636-.29.636-.65v-.65c0-.36-.285-.65-.636-.65H7.955v-1.372C11.363 16.2 14 13.212 14 9.6V7.65c0-.36-.285-.65-.636-.65z",
          fill: "#FFF",
          "fill-rule": "nonzero"
        })));
      }
      module.exports = RecordButton;
    }
  });

  // ../packages/@uppy/audio/lib/formatSeconds.js
  var require_formatSeconds2 = __commonJS({
    "../packages/@uppy/audio/lib/formatSeconds.js"(exports, module) {
      "use strict";
      function formatSeconds(seconds) {
        return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, 0)}`;
      }
      module.exports = formatSeconds;
    }
  });

  // ../packages/@uppy/audio/lib/RecordingLength.js
  var require_RecordingLength2 = __commonJS({
    "../packages/@uppy/audio/lib/RecordingLength.js"(exports, module) {
      "use strict";
      var _preact = (init_preact_module(), __toCommonJS(preact_module_exports));
      var formatSeconds = require_formatSeconds2();
      function RecordingLength(_ref) {
        let {
          recordingLengthSeconds,
          i18n
        } = _ref;
        const formattedRecordingLengthSeconds = formatSeconds(recordingLengthSeconds);
        return (0, _preact.h)("span", {
          "aria-label": i18n("recordingLength", {
            recording_length: formattedRecordingLengthSeconds
          })
        }, formattedRecordingLengthSeconds);
      }
      module.exports = RecordingLength;
    }
  });

  // ../packages/@uppy/audio/lib/AudioSourceSelect.js
  var require_AudioSourceSelect = __commonJS({
    "../packages/@uppy/audio/lib/AudioSourceSelect.js"(exports, module) {
      "use strict";
      var _preact = (init_preact_module(), __toCommonJS(preact_module_exports));
      module.exports = (_ref) => {
        let {
          currentDeviceId,
          audioSources,
          onChangeSource
        } = _ref;
        return (0, _preact.h)("div", {
          className: "uppy-Audio-videoSource"
        }, (0, _preact.h)("select", {
          className: "uppy-u-reset uppy-Audio-audioSource-select",
          onChange: (event) => {
            onChangeSource(event.target.value);
          }
        }, audioSources.map((audioSource) => (0, _preact.h)("option", {
          key: audioSource.deviceId,
          value: audioSource.deviceId,
          selected: audioSource.deviceId === currentDeviceId
        }, audioSource.label))));
      };
    }
  });

  // ../packages/@uppy/audio/lib/audio-oscilloscope/index.js
  var require_audio_oscilloscope = __commonJS({
    "../packages/@uppy/audio/lib/audio-oscilloscope/index.js"(exports, module) {
      "use strict";
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
      function isFunction(v3) {
        return typeof v3 === "function";
      }
      function result(v3) {
        return isFunction(v3) ? v3() : v3;
      }
      var _draw = /* @__PURE__ */ _classPrivateFieldLooseKey("draw");
      var AudioOscilloscope = class {
        constructor(canvas, options) {
          if (options === void 0) {
            options = {};
          }
          Object.defineProperty(this, _draw, {
            writable: true,
            value: () => this.draw()
          });
          const canvasOptions = options.canvas || {};
          const canvasContextOptions = options.canvasContext || {};
          this.analyser = null;
          this.bufferLength = 0;
          this.dataArray = [];
          this.canvas = canvas;
          this.width = result(canvasOptions.width) || this.canvas.width;
          this.height = result(canvasOptions.height) || this.canvas.height;
          this.canvas.width = this.width;
          this.canvas.height = this.height;
          this.canvasContext = this.canvas.getContext("2d");
          this.canvasContext.fillStyle = result(canvasContextOptions.fillStyle) || "rgb(255, 255, 255)";
          this.canvasContext.strokeStyle = result(canvasContextOptions.strokeStyle) || "rgb(0, 0, 0)";
          this.canvasContext.lineWidth = result(canvasContextOptions.lineWidth) || 1;
          this.onDrawFrame = isFunction(options.onDrawFrame) ? options.onDrawFrame : () => {
          };
        }
        addSource(streamSource) {
          this.streamSource = streamSource;
          this.audioContext = this.streamSource.context;
          this.analyser = this.audioContext.createAnalyser();
          this.analyser.fftSize = 2048;
          this.bufferLength = this.analyser.frequencyBinCount;
          this.source = this.audioContext.createBufferSource();
          this.dataArray = new Uint8Array(this.bufferLength);
          this.analyser.getByteTimeDomainData(this.dataArray);
          this.streamSource.connect(this.analyser);
        }
        draw() {
          const {
            analyser,
            dataArray,
            bufferLength
          } = this;
          const ctx = this.canvasContext;
          const w3 = this.width;
          const h3 = this.height;
          if (analyser) {
            analyser.getByteTimeDomainData(dataArray);
          }
          ctx.fillRect(0, 0, w3, h3);
          ctx.beginPath();
          const sliceWidth = w3 * 1 / bufferLength;
          let x3 = 0;
          if (!bufferLength) {
            ctx.moveTo(0, this.height / 2);
          }
          for (let i3 = 0; i3 < bufferLength; i3++) {
            const v3 = dataArray[i3] / 128;
            const y3 = v3 * (h3 / 2);
            if (i3 === 0) {
              ctx.moveTo(x3, y3);
            } else {
              ctx.lineTo(x3, y3);
            }
            x3 += sliceWidth;
          }
          ctx.lineTo(w3, h3 / 2);
          ctx.stroke();
          this.onDrawFrame(this);
          requestAnimationFrame(_classPrivateFieldLooseBase(this, _draw)[_draw]);
        }
      };
      module.exports = AudioOscilloscope;
    }
  });

  // ../packages/@uppy/audio/lib/SubmitButton.js
  var require_SubmitButton2 = __commonJS({
    "../packages/@uppy/audio/lib/SubmitButton.js"(exports, module) {
      "use strict";
      var _preact = (init_preact_module(), __toCommonJS(preact_module_exports));
      function SubmitButton(_ref) {
        let {
          onSubmit,
          i18n
        } = _ref;
        return (0, _preact.h)("button", {
          className: "uppy-u-reset uppy-c-btn uppy-Audio-button uppy-Audio-button--submit",
          type: "button",
          title: i18n("submitRecordedFile"),
          "aria-label": i18n("submitRecordedFile"),
          onClick: onSubmit,
          "data-uppy-super-focusable": true
        }, (0, _preact.h)("svg", {
          width: "12",
          height: "9",
          viewBox: "0 0 12 9",
          xmlns: "http://www.w3.org/2000/svg",
          "aria-hidden": "true",
          focusable: "false",
          className: "uppy-c-icon"
        }, (0, _preact.h)("path", {
          fill: "#fff",
          fillRule: "nonzero",
          d: "M10.66 0L12 1.31 4.136 9 0 4.956l1.34-1.31L4.136 6.38z"
        })));
      }
      module.exports = SubmitButton;
    }
  });

  // ../packages/@uppy/audio/lib/DiscardButton.js
  var require_DiscardButton2 = __commonJS({
    "../packages/@uppy/audio/lib/DiscardButton.js"(exports, module) {
      "use strict";
      var _preact = (init_preact_module(), __toCommonJS(preact_module_exports));
      function DiscardButton(_ref) {
        let {
          onDiscard,
          i18n
        } = _ref;
        return (0, _preact.h)("button", {
          className: "uppy-u-reset uppy-c-btn uppy-Audio-button",
          type: "button",
          title: i18n("discardRecordedFile"),
          "aria-label": i18n("discardRecordedFile"),
          onClick: onDiscard,
          "data-uppy-super-focusable": true
        }, (0, _preact.h)("svg", {
          width: "13",
          height: "13",
          viewBox: "0 0 13 13",
          xmlns: "http://www.w3.org/2000/svg",
          "aria-hidden": "true",
          className: "uppy-c-icon"
        }, (0, _preact.h)("g", {
          fill: "#FFF",
          fillRule: "evenodd"
        }, (0, _preact.h)("path", {
          d: "M.496 11.367L11.103.76l1.414 1.414L1.911 12.781z"
        }), (0, _preact.h)("path", {
          d: "M11.104 12.782L.497 2.175 1.911.76l10.607 10.606z"
        }))));
      }
      module.exports = DiscardButton;
    }
  });

  // ../packages/@uppy/audio/lib/RecordingScreen.js
  var require_RecordingScreen = __commonJS({
    "../packages/@uppy/audio/lib/RecordingScreen.js"(exports, module) {
      "use strict";
      var _preact = (init_preact_module(), __toCommonJS(preact_module_exports));
      var _hooks = (init_hooks_module(), __toCommonJS(hooks_module_exports));
      var RecordButton = require_RecordButton2();
      var RecordingLength = require_RecordingLength2();
      var AudioSourceSelect = require_AudioSourceSelect();
      var AudioOscilloscope = require_audio_oscilloscope();
      var SubmitButton = require_SubmitButton2();
      var DiscardButton = require_DiscardButton2();
      function RecordingScreen(props) {
        const {
          stream,
          recordedAudio,
          onStop,
          recording,
          supportsRecording,
          audioSources,
          showAudioSourceDropdown,
          onSubmit,
          i18n,
          onStartRecording,
          onStopRecording,
          onDiscardRecordedAudio,
          recordingLengthSeconds
        } = props;
        const canvasEl = (0, _hooks.useRef)(null);
        const oscilloscope = (0, _hooks.useRef)(null);
        (0, _hooks.useEffect)(() => {
          return () => {
            oscilloscope.current = null;
            onStop();
          };
        }, [onStop]);
        (0, _hooks.useEffect)(() => {
          if (!recordedAudio) {
            oscilloscope.current = new AudioOscilloscope(canvasEl.current, {
              canvas: {
                width: 600,
                height: 600
              },
              canvasContext: {
                lineWidth: 2,
                fillStyle: "rgb(0,0,0)",
                strokeStyle: "green"
              }
            });
            oscilloscope.current.draw();
            if (stream) {
              const audioContext = new AudioContext();
              const source = audioContext.createMediaStreamSource(stream);
              oscilloscope.current.addSource(source);
            }
          }
        }, [recordedAudio, stream]);
        const hasRecordedAudio = recordedAudio != null;
        const shouldShowRecordButton = !hasRecordedAudio && supportsRecording;
        const shouldShowAudioSourceDropdown = showAudioSourceDropdown && !hasRecordedAudio && audioSources && audioSources.length > 1;
        return (0, _preact.h)("div", {
          className: "uppy-Audio-container"
        }, (0, _preact.h)("div", {
          className: "uppy-Audio-audioContainer"
        }, hasRecordedAudio ? (0, _preact.h)("audio", {
          className: "uppy-Audio-player",
          controls: true,
          src: recordedAudio
        }) : (0, _preact.h)("canvas", {
          ref: canvasEl,
          className: "uppy-Audio-canvas"
        })), (0, _preact.h)("div", {
          className: "uppy-Audio-footer"
        }, (0, _preact.h)("div", {
          className: "uppy-Audio-audioSourceContainer"
        }, shouldShowAudioSourceDropdown ? AudioSourceSelect(props) : null), (0, _preact.h)("div", {
          className: "uppy-Audio-buttonContainer"
        }, shouldShowRecordButton && (0, _preact.h)(RecordButton, {
          recording,
          onStartRecording,
          onStopRecording,
          i18n
        }), hasRecordedAudio && (0, _preact.h)(SubmitButton, {
          onSubmit,
          i18n
        }), hasRecordedAudio && (0, _preact.h)(DiscardButton, {
          onDiscard: onDiscardRecordedAudio,
          i18n
        })), (0, _preact.h)("div", {
          className: "uppy-Audio-recordingLength"
        }, !hasRecordedAudio && (0, _preact.h)(RecordingLength, {
          recordingLengthSeconds,
          i18n
        }))));
      }
      module.exports = RecordingScreen;
    }
  });

  // ../packages/@uppy/audio/lib/PermissionsScreen.js
  var require_PermissionsScreen2 = __commonJS({
    "../packages/@uppy/audio/lib/PermissionsScreen.js"(exports, module) {
      "use strict";
      var _preact = (init_preact_module(), __toCommonJS(preact_module_exports));
      module.exports = (props) => {
        const {
          icon,
          hasAudio,
          i18n
        } = props;
        return (0, _preact.h)("div", {
          className: "uppy-Audio-permissons"
        }, (0, _preact.h)("div", {
          className: "uppy-Audio-permissonsIcon"
        }, icon()), (0, _preact.h)("h1", {
          className: "uppy-Audio-title"
        }, hasAudio ? i18n("allowAudioAccessTitle") : i18n("noAudioTitle")), (0, _preact.h)("p", null, hasAudio ? i18n("allowAudioAccessDescription") : i18n("noAudioDescription")));
      };
    }
  });

  // ../packages/@uppy/audio/lib/locale.js
  var require_locale15 = __commonJS({
    "../packages/@uppy/audio/lib/locale.js"(exports, module) {
      "use strict";
      module.exports = {
        strings: {
          pluginNameAudio: "Audio",
          startAudioRecording: "Begin audio recording",
          stopAudioRecording: "Stop audio recording",
          allowAudioAccessTitle: "Please allow access to your microphone",
          allowAudioAccessDescription: "In order to record audio, please allow microphone access for this site.",
          noAudioTitle: "Microphone Not Available",
          noAudioDescription: "In order to record audio, please connect a microphone or another audio input device",
          recordingStoppedMaxSize: "Recording stopped because the file size is about to exceed the limit",
          recordingLength: "Recording length %{recording_length}",
          submitRecordedFile: "Submit recorded file",
          discardRecordedFile: "Discard recorded file"
        }
      };
    }
  });

  // ../packages/@uppy/audio/lib/Audio.js
  var require_Audio = __commonJS({
    "../packages/@uppy/audio/lib/Audio.js"(exports, module) {
      "use strict";
      var _preact = (init_preact_module(), __toCommonJS(preact_module_exports));
      var _core = require_lib2();
      function _extends() {
        _extends = Object.assign || function(target) {
          for (var i3 = 1; i3 < arguments.length; i3++) {
            var source = arguments[i3];
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
      var getFileTypeExtension = require_getFileTypeExtension();
      var supportsMediaRecorder = require_supportsMediaRecorder2();
      var RecordingScreen = require_RecordingScreen();
      var PermissionsScreen = require_PermissionsScreen2();
      var locale = require_locale15();
      var packageJson = {
        "version": "0.3.0"
      };
      var _stream = /* @__PURE__ */ _classPrivateFieldLooseKey("stream");
      var _audioActive = /* @__PURE__ */ _classPrivateFieldLooseKey("audioActive");
      var _recordingChunks = /* @__PURE__ */ _classPrivateFieldLooseKey("recordingChunks");
      var _recorder = /* @__PURE__ */ _classPrivateFieldLooseKey("recorder");
      var _capturedMediaFile = /* @__PURE__ */ _classPrivateFieldLooseKey("capturedMediaFile");
      var _mediaDevices = /* @__PURE__ */ _classPrivateFieldLooseKey("mediaDevices");
      var _supportsUserMedia = /* @__PURE__ */ _classPrivateFieldLooseKey("supportsUserMedia");
      var _hasAudioCheck = /* @__PURE__ */ _classPrivateFieldLooseKey("hasAudioCheck");
      var _start = /* @__PURE__ */ _classPrivateFieldLooseKey("start");
      var _startRecording = /* @__PURE__ */ _classPrivateFieldLooseKey("startRecording");
      var _stopRecording = /* @__PURE__ */ _classPrivateFieldLooseKey("stopRecording");
      var _discardRecordedAudio = /* @__PURE__ */ _classPrivateFieldLooseKey("discardRecordedAudio");
      var _submit = /* @__PURE__ */ _classPrivateFieldLooseKey("submit");
      var _stop = /* @__PURE__ */ _classPrivateFieldLooseKey("stop");
      var _getAudio = /* @__PURE__ */ _classPrivateFieldLooseKey("getAudio");
      var _changeSource = /* @__PURE__ */ _classPrivateFieldLooseKey("changeSource");
      var _updateSources = /* @__PURE__ */ _classPrivateFieldLooseKey("updateSources");
      var Audio2 = class extends _core.UIPlugin {
        constructor(uppy, opts) {
          var _this;
          super(uppy, opts);
          _this = this;
          Object.defineProperty(this, _getAudio, {
            value: _getAudio2
          });
          Object.defineProperty(this, _hasAudioCheck, {
            value: _hasAudioCheck2
          });
          Object.defineProperty(this, _stream, {
            writable: true,
            value: null
          });
          Object.defineProperty(this, _audioActive, {
            writable: true,
            value: false
          });
          Object.defineProperty(this, _recordingChunks, {
            writable: true,
            value: null
          });
          Object.defineProperty(this, _recorder, {
            writable: true,
            value: null
          });
          Object.defineProperty(this, _capturedMediaFile, {
            writable: true,
            value: null
          });
          Object.defineProperty(this, _mediaDevices, {
            writable: true,
            value: null
          });
          Object.defineProperty(this, _supportsUserMedia, {
            writable: true,
            value: null
          });
          Object.defineProperty(this, _start, {
            writable: true,
            value: function(options) {
              if (options === void 0) {
                options = null;
              }
              if (!_classPrivateFieldLooseBase(_this, _supportsUserMedia)[_supportsUserMedia]) {
                return Promise.reject(new Error("Microphone access not supported"));
              }
              _classPrivateFieldLooseBase(_this, _audioActive)[_audioActive] = true;
              _classPrivateFieldLooseBase(_this, _hasAudioCheck)[_hasAudioCheck]().then((hasAudio) => {
                _this.setPluginState({
                  hasAudio
                });
                return _classPrivateFieldLooseBase(_this, _mediaDevices)[_mediaDevices].getUserMedia({
                  audio: true
                }).then((stream) => {
                  _classPrivateFieldLooseBase(_this, _stream)[_stream] = stream;
                  let currentDeviceId = null;
                  const tracks = stream.getAudioTracks();
                  if (!options || !options.deviceId) {
                    currentDeviceId = tracks[0].getSettings().deviceId;
                  } else {
                    tracks.forEach((track) => {
                      if (track.getSettings().deviceId === options.deviceId) {
                        currentDeviceId = track.getSettings().deviceId;
                      }
                    });
                  }
                  _classPrivateFieldLooseBase(_this, _updateSources)[_updateSources]();
                  _this.setPluginState({
                    currentDeviceId,
                    audioReady: true
                  });
                }).catch((err) => {
                  _this.setPluginState({
                    audioReady: false,
                    cameraError: err
                  });
                  _this.uppy.info(err.message, "error");
                });
              });
            }
          });
          Object.defineProperty(this, _startRecording, {
            writable: true,
            value: () => {
              _classPrivateFieldLooseBase(this, _recorder)[_recorder] = new MediaRecorder(_classPrivateFieldLooseBase(this, _stream)[_stream]);
              _classPrivateFieldLooseBase(this, _recordingChunks)[_recordingChunks] = [];
              let stoppingBecauseOfMaxSize = false;
              _classPrivateFieldLooseBase(this, _recorder)[_recorder].addEventListener("dataavailable", (event) => {
                _classPrivateFieldLooseBase(this, _recordingChunks)[_recordingChunks].push(event.data);
                const {
                  restrictions
                } = this.uppy.opts;
                if (_classPrivateFieldLooseBase(this, _recordingChunks)[_recordingChunks].length > 1 && restrictions.maxFileSize != null && !stoppingBecauseOfMaxSize) {
                  const totalSize = _classPrivateFieldLooseBase(this, _recordingChunks)[_recordingChunks].reduce((acc, chunk) => acc + chunk.size, 0);
                  const averageChunkSize = (totalSize - _classPrivateFieldLooseBase(this, _recordingChunks)[_recordingChunks][0].size) / (_classPrivateFieldLooseBase(this, _recordingChunks)[_recordingChunks].length - 1);
                  const expectedEndChunkSize = averageChunkSize * 3;
                  const maxSize = Math.max(0, restrictions.maxFileSize - expectedEndChunkSize);
                  if (totalSize > maxSize) {
                    stoppingBecauseOfMaxSize = true;
                    this.uppy.info(this.i18n("recordingStoppedMaxSize"), "warning", 4e3);
                    _classPrivateFieldLooseBase(this, _stopRecording)[_stopRecording]();
                  }
                }
              });
              _classPrivateFieldLooseBase(this, _recorder)[_recorder].start(500);
              this.recordingLengthTimer = setInterval(() => {
                const currentRecordingLength = this.getPluginState().recordingLengthSeconds;
                this.setPluginState({
                  recordingLengthSeconds: currentRecordingLength + 1
                });
              }, 1e3);
              this.setPluginState({
                isRecording: true
              });
            }
          });
          Object.defineProperty(this, _stopRecording, {
            writable: true,
            value: () => {
              const stopped = new Promise((resolve) => {
                _classPrivateFieldLooseBase(this, _recorder)[_recorder].addEventListener("stop", () => {
                  resolve();
                });
                _classPrivateFieldLooseBase(this, _recorder)[_recorder].stop();
                clearInterval(this.recordingLengthTimer);
                this.setPluginState({
                  recordingLengthSeconds: 0
                });
              });
              return stopped.then(() => {
                this.setPluginState({
                  isRecording: false
                });
                return _classPrivateFieldLooseBase(this, _getAudio)[_getAudio]();
              }).then((file) => {
                try {
                  _classPrivateFieldLooseBase(this, _capturedMediaFile)[_capturedMediaFile] = file;
                  this.setPluginState({
                    recordedAudio: URL.createObjectURL(file.data)
                  });
                } catch (err) {
                  if (!err.isRestriction) {
                    this.uppy.log(err);
                  }
                }
              }).then(() => {
                _classPrivateFieldLooseBase(this, _recordingChunks)[_recordingChunks] = null;
                _classPrivateFieldLooseBase(this, _recorder)[_recorder] = null;
              }, (error) => {
                _classPrivateFieldLooseBase(this, _recordingChunks)[_recordingChunks] = null;
                _classPrivateFieldLooseBase(this, _recorder)[_recorder] = null;
                throw error;
              });
            }
          });
          Object.defineProperty(this, _discardRecordedAudio, {
            writable: true,
            value: () => {
              this.setPluginState({
                recordedAudio: null
              });
              _classPrivateFieldLooseBase(this, _capturedMediaFile)[_capturedMediaFile] = null;
            }
          });
          Object.defineProperty(this, _submit, {
            writable: true,
            value: () => {
              try {
                if (_classPrivateFieldLooseBase(this, _capturedMediaFile)[_capturedMediaFile]) {
                  this.uppy.addFile(_classPrivateFieldLooseBase(this, _capturedMediaFile)[_capturedMediaFile]);
                }
              } catch (err) {
                if (!err.isRestriction) {
                  this.uppy.log(err, "error");
                }
              }
            }
          });
          Object.defineProperty(this, _stop, {
            writable: true,
            value: async () => {
              if (_classPrivateFieldLooseBase(this, _stream)[_stream]) {
                const audioTracks = _classPrivateFieldLooseBase(this, _stream)[_stream].getAudioTracks();
                audioTracks.forEach((track) => track.stop());
              }
              if (_classPrivateFieldLooseBase(this, _recorder)[_recorder]) {
                await new Promise((resolve) => {
                  _classPrivateFieldLooseBase(this, _recorder)[_recorder].addEventListener("stop", resolve, {
                    once: true
                  });
                  _classPrivateFieldLooseBase(this, _recorder)[_recorder].stop();
                  clearInterval(this.recordingLengthTimer);
                });
              }
              _classPrivateFieldLooseBase(this, _recordingChunks)[_recordingChunks] = null;
              _classPrivateFieldLooseBase(this, _recorder)[_recorder] = null;
              _classPrivateFieldLooseBase(this, _audioActive)[_audioActive] = false;
              _classPrivateFieldLooseBase(this, _stream)[_stream] = null;
              this.setPluginState({
                recordedAudio: null,
                isRecording: false,
                recordingLengthSeconds: 0
              });
            }
          });
          Object.defineProperty(this, _changeSource, {
            writable: true,
            value: (deviceId) => {
              _classPrivateFieldLooseBase(this, _stop)[_stop]();
              _classPrivateFieldLooseBase(this, _start)[_start]({
                deviceId
              });
            }
          });
          Object.defineProperty(this, _updateSources, {
            writable: true,
            value: () => {
              _classPrivateFieldLooseBase(this, _mediaDevices)[_mediaDevices].enumerateDevices().then((devices) => {
                this.setPluginState({
                  audioSources: devices.filter((device) => device.kind === "audioinput")
                });
              });
            }
          });
          _classPrivateFieldLooseBase(this, _mediaDevices)[_mediaDevices] = navigator.mediaDevices;
          _classPrivateFieldLooseBase(this, _supportsUserMedia)[_supportsUserMedia] = _classPrivateFieldLooseBase(this, _mediaDevices)[_mediaDevices] != null;
          this.id = this.opts.id || "Audio";
          this.type = "acquirer";
          this.icon = () => (0, _preact.h)("svg", {
            "aria-hidden": "true",
            focusable: "false",
            width: "32px",
            height: "32px",
            viewBox: "0 0 32 32"
          }, (0, _preact.h)("g", {
            fill: "none",
            "fill-rule": "evenodd"
          }, (0, _preact.h)("rect", {
            fill: "#9B59B6",
            width: "32",
            height: "32",
            rx: "16"
          }), (0, _preact.h)("path", {
            d: "M16 20c-2.21 0-4-1.71-4-3.818V9.818C12 7.71 13.79 6 16 6s4 1.71 4 3.818v6.364C20 18.29 18.21 20 16 20zm-6.364-7h.637c.351 0 .636.29.636.65v1.95c0 3.039 2.565 5.477 5.6 5.175 2.645-.264 4.582-2.692 4.582-5.407V13.65c0-.36.285-.65.636-.65h.637c.351 0 .636.29.636.65v1.631c0 3.642-2.544 6.888-6.045 7.382v1.387h2.227c.351 0 .636.29.636.65v.65c0 .36-.285.65-.636.65h-6.364a.643.643 0 0 1-.636-.65v-.65c0-.36.285-.65.636-.65h2.227v-1.372C11.637 22.2 9 19.212 9 15.6v-1.95c0-.36.285-.65.636-.65z",
            fill: "#FFF",
            "fill-rule": "nonzero"
          })));
          this.defaultLocale = locale;
          this.opts = {
            ...opts
          };
          this.i18nInit();
          this.title = this.i18n("pluginNameAudio");
          this.setPluginState({
            hasAudio: false,
            audioReady: false,
            cameraError: null,
            recordingLengthSeconds: 0,
            audioSources: [],
            currentDeviceId: null
          });
        }
        render() {
          if (!_classPrivateFieldLooseBase(this, _audioActive)[_audioActive]) {
            _classPrivateFieldLooseBase(this, _start)[_start]();
          }
          const audioState = this.getPluginState();
          if (!audioState.audioReady || !audioState.hasAudio) {
            return (0, _preact.h)(PermissionsScreen, {
              icon: this.icon,
              i18n: this.i18n,
              hasAudio: audioState.hasAudio
            });
          }
          return (0, _preact.h)(RecordingScreen, _extends({}, audioState, {
            audioActive: _classPrivateFieldLooseBase(this, _audioActive)[_audioActive],
            onChangeSource: _classPrivateFieldLooseBase(this, _changeSource)[_changeSource],
            onStartRecording: _classPrivateFieldLooseBase(this, _startRecording)[_startRecording],
            onStopRecording: _classPrivateFieldLooseBase(this, _stopRecording)[_stopRecording],
            onDiscardRecordedAudio: _classPrivateFieldLooseBase(this, _discardRecordedAudio)[_discardRecordedAudio],
            onSubmit: _classPrivateFieldLooseBase(this, _submit)[_submit],
            onStop: _classPrivateFieldLooseBase(this, _stop)[_stop],
            i18n: this.i18n,
            showAudioSourceDropdown: this.opts.showAudioSourceDropdown,
            supportsRecording: supportsMediaRecorder(),
            recording: audioState.isRecording,
            stream: _classPrivateFieldLooseBase(this, _stream)[_stream]
          }));
        }
        install() {
          this.setPluginState({
            audioReady: false,
            recordingLengthSeconds: 0
          });
          const {
            target
          } = this.opts;
          if (target) {
            this.mount(target, this);
          }
          if (_classPrivateFieldLooseBase(this, _mediaDevices)[_mediaDevices]) {
            _classPrivateFieldLooseBase(this, _updateSources)[_updateSources]();
            _classPrivateFieldLooseBase(this, _mediaDevices)[_mediaDevices].ondevicechange = () => {
              _classPrivateFieldLooseBase(this, _updateSources)[_updateSources]();
              if (_classPrivateFieldLooseBase(this, _stream)[_stream]) {
                let restartStream = true;
                const {
                  audioSources,
                  currentDeviceId
                } = this.getPluginState();
                audioSources.forEach((audioSource) => {
                  if (currentDeviceId === audioSource.deviceId) {
                    restartStream = false;
                  }
                });
                if (restartStream) {
                  _classPrivateFieldLooseBase(this, _stop)[_stop]();
                  _classPrivateFieldLooseBase(this, _start)[_start]();
                }
              }
            };
          }
        }
        uninstall() {
          if (_classPrivateFieldLooseBase(this, _stream)[_stream]) {
            _classPrivateFieldLooseBase(this, _stop)[_stop]();
          }
          this.unmount();
        }
      };
      function _hasAudioCheck2() {
        if (!_classPrivateFieldLooseBase(this, _mediaDevices)[_mediaDevices]) {
          return Promise.resolve(false);
        }
        return _classPrivateFieldLooseBase(this, _mediaDevices)[_mediaDevices].enumerateDevices().then((devices) => {
          return devices.some((device) => device.kind === "audioinput");
        });
      }
      function _getAudio2() {
        const mimeType = _classPrivateFieldLooseBase(this, _recordingChunks)[_recordingChunks].find((blob2) => {
          var _blob$type;
          return ((_blob$type = blob2.type) == null ? void 0 : _blob$type.length) > 0;
        }).type;
        const fileExtension = getFileTypeExtension(mimeType);
        if (!fileExtension) {
          return Promise.reject(new Error(`Could not retrieve recording: Unsupported media type "${mimeType}"`));
        }
        const name = `audio-${Date.now()}.${fileExtension}`;
        const blob = new Blob(_classPrivateFieldLooseBase(this, _recordingChunks)[_recordingChunks], {
          type: mimeType
        });
        const file = {
          source: this.id,
          name,
          data: new Blob([blob], {
            type: mimeType
          }),
          type: mimeType
        };
        return Promise.resolve(file);
      }
      Audio2.VERSION = packageJson.version;
      module.exports = Audio2;
    }
  });

  // ../packages/@uppy/audio/lib/index.js
  var require_lib20 = __commonJS({
    "../packages/@uppy/audio/lib/index.js"(exports, module) {
      "use strict";
      module.exports = require_Audio();
    }
  });

  // ../packages/@uppy/screen-capture/lib/ScreenRecIcon.js
  var require_ScreenRecIcon = __commonJS({
    "../packages/@uppy/screen-capture/lib/ScreenRecIcon.js"(exports, module) {
      var {
        h: h3
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      module.exports = () => {
        return h3("svg", {
          "aria-hidden": "true",
          focusable: "false",
          width: "32",
          height: "32",
          viewBox: "0 0 32 32"
        }, h3("g", {
          fill: "none",
          fillRule: "evenodd"
        }, h3("rect", {
          className: "uppy-ProviderIconBg",
          fill: "#2C3E50",
          width: "32",
          height: "32",
          rx: "16"
        }), h3("path", {
          d: "M24.182 9H7.818C6.81 9 6 9.742 6 10.667v10c0 .916.81 1.666 1.818 1.666h4.546V24h7.272v-1.667h4.546c1 0 1.809-.75 1.809-1.666l.009-10C26 9.742 25.182 9 24.182 9zM24 21H8V11h16v10z",
          fill: "#FFF",
          fillRule: "nonzero"
        }), h3("circle", {
          fill: "#FFF",
          cx: "16",
          cy: "16",
          r: "2"
        })));
      };
    }
  });

  // ../packages/@uppy/screen-capture/lib/RecordButton.js
  var require_RecordButton3 = __commonJS({
    "../packages/@uppy/screen-capture/lib/RecordButton.js"(exports, module) {
      var {
        h: h3
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      module.exports = function RecordButton(_ref) {
        let {
          recording,
          onStartRecording,
          onStopRecording,
          i18n
        } = _ref;
        if (recording) {
          return h3("button", {
            className: "uppy-u-reset uppy-c-btn uppy-ScreenCapture-button uppy-ScreenCapture-button--video uppy-ScreenCapture-button--stop-rec",
            type: "button",
            title: i18n("stopCapturing"),
            "aria-label": i18n("stopCapturing"),
            onClick: onStopRecording,
            "data-uppy-super-focusable": true
          }, h3("svg", {
            "aria-hidden": "true",
            focusable: "false",
            className: "uppy-c-icon",
            width: "100",
            height: "100",
            viewBox: "0 0 100 100"
          }, h3("rect", {
            x: "15",
            y: "15",
            width: "70",
            height: "70"
          })));
        }
        return h3("button", {
          className: "uppy-u-reset uppy-c-btn uppy-ScreenCapture-button uppy-ScreenCapture-button--video",
          type: "button",
          title: i18n("startCapturing"),
          "aria-label": i18n("startCapturing"),
          onClick: onStartRecording,
          "data-uppy-super-focusable": true
        }, h3("svg", {
          "aria-hidden": "true",
          focusable: "false",
          className: "uppy-c-icon",
          width: "100",
          height: "100",
          viewBox: "0 0 100 100"
        }, h3("circle", {
          cx: "50",
          cy: "50",
          r: "40"
        })));
      };
    }
  });

  // ../packages/@uppy/screen-capture/lib/SubmitButton.js
  var require_SubmitButton3 = __commonJS({
    "../packages/@uppy/screen-capture/lib/SubmitButton.js"(exports, module) {
      var {
        h: h3
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      module.exports = function SubmitButton(_ref) {
        let {
          recording,
          recordedVideo,
          onSubmit,
          i18n
        } = _ref;
        if (recordedVideo && !recording) {
          return h3("button", {
            className: "uppy-u-reset uppy-c-btn uppy-ScreenCapture-button uppy-ScreenCapture-button--submit",
            type: "button",
            title: i18n("submitRecordedFile"),
            "aria-label": i18n("submitRecordedFile"),
            onClick: onSubmit,
            "data-uppy-super-focusable": true
          }, h3("svg", {
            width: "12",
            height: "9",
            viewBox: "0 0 12 9",
            xmlns: "http://www.w3.org/2000/svg",
            "aria-hidden": "true",
            focusable: "false",
            className: "uppy-c-icon"
          }, h3("path", {
            fill: "#fff",
            fillRule: "nonzero",
            d: "M10.66 0L12 1.31 4.136 9 0 4.956l1.34-1.31L4.136 6.38z"
          })));
        }
        return null;
      };
    }
  });

  // ../packages/@uppy/screen-capture/lib/StopWatch.js
  var require_StopWatch = __commonJS({
    "../packages/@uppy/screen-capture/lib/StopWatch.js"(exports, module) {
      var {
        h: h3,
        Component
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      var Stopwatch = class extends Component {
        constructor(props) {
          super(props);
          this.state = {
            elapsedTime: 0
          };
          this.wrapperStyle = {
            width: "100%",
            height: "100%",
            display: "flex"
          };
          this.overlayStyle = {
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "black",
            opacity: 0.7
          };
          this.infoContainerStyle = {
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "auto",
            marginBottom: "auto",
            zIndex: 1,
            color: "white"
          };
          this.infotextStyle = {
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "1rem",
            fontSize: "1.5rem"
          };
          this.timeStyle = {
            display: "block",
            fontWeight: "bold",
            marginLeft: "auto",
            marginRight: "auto",
            fontSize: "3rem",
            fontFamily: "Courier New"
          };
        }
        startTimer() {
          this.timerTick();
          this.timerRunning = true;
        }
        resetTimer() {
          clearTimeout(this.timer);
          this.setState({
            elapsedTime: 0
          });
          this.timerRunning = false;
        }
        timerTick() {
          this.timer = setTimeout(() => {
            this.setState((state) => ({
              elapsedTime: state.elapsedTime + 1
            }));
            this.timerTick();
          }, 1e3);
        }
        fmtMSS(s3) {
          return (s3 - (s3 %= 60)) / 60 + (s3 > 9 ? ":" : ":0") + s3;
        }
        render() {
          const {
            recording,
            i18n
          } = {
            ...this.props
          };
          const minAndSec = this.fmtMSS(this.state.elapsedTime);
          if (recording && !this.timerRunning) {
            this.startTimer();
          }
          if (!recording && this.timerRunning) {
            this.resetTimer();
          }
          if (recording) {
            return h3("div", {
              style: this.wrapperStyle
            }, h3("div", {
              style: this.overlayStyle
            }), h3("div", {
              style: this.infoContainerStyle
            }, h3("div", {
              style: this.infotextStyle
            }, i18n("recording")), h3("div", {
              style: this.timeStyle
            }, minAndSec)));
          }
          return null;
        }
      };
      module.exports = Stopwatch;
    }
  });

  // ../packages/@uppy/screen-capture/lib/StreamStatus.js
  var require_StreamStatus = __commonJS({
    "../packages/@uppy/screen-capture/lib/StreamStatus.js"(exports, module) {
      var {
        h: h3
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      module.exports = (_ref) => {
        let {
          streamActive,
          i18n
        } = _ref;
        if (streamActive) {
          return h3("div", {
            title: i18n("streamActive"),
            "aria-label": i18n("streamActive"),
            className: "uppy-ScreenCapture-icon--stream uppy-ScreenCapture-icon--streamActive"
          }, h3("svg", {
            "aria-hidden": "true",
            focusable: "false",
            width: "24",
            height: "24",
            viewBox: "0 0 24 24"
          }, h3("path", {
            d: "M0 0h24v24H0z",
            opacity: ".1",
            fill: "none"
          }), h3("path", {
            d: "M0 0h24v24H0z",
            fill: "none"
          }), h3("path", {
            d: "M1 18v3h3c0-1.66-1.34-3-3-3zm0-4v2c2.76 0 5 2.24 5 5h2c0-3.87-3.13-7-7-7zm18-7H5v1.63c3.96 1.28 7.09 4.41 8.37 8.37H19V7zM1 10v2c4.97 0 9 4.03 9 9h2c0-6.08-4.93-11-11-11zm20-7H3c-1.1 0-2 .9-2 2v3h2V5h18v14h-7v2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
          })));
        }
        return h3("div", {
          title: i18n("streamPassive"),
          "aria-label": i18n("streamPassive"),
          className: "uppy-ScreenCapture-icon--stream"
        }, h3("svg", {
          "aria-hidden": "true",
          focusable: "false",
          width: "24",
          height: "24",
          viewBox: "0 0 24 24"
        }, h3("path", {
          d: "M0 0h24v24H0z",
          opacity: ".1",
          fill: "none"
        }), h3("path", {
          d: "M0 0h24v24H0z",
          fill: "none"
        }), h3("path", {
          d: "M21 3H3c-1.1 0-2 .9-2 2v3h2V5h18v14h-7v2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM1 18v3h3c0-1.66-1.34-3-3-3zm0-4v2c2.76 0 5 2.24 5 5h2c0-3.87-3.13-7-7-7zm0-4v2c4.97 0 9 4.03 9 9h2c0-6.08-4.93-11-11-11z"
        })));
      };
    }
  });

  // ../packages/@uppy/screen-capture/lib/CaptureScreen.js
  var require_CaptureScreen = __commonJS({
    "../packages/@uppy/screen-capture/lib/CaptureScreen.js"(exports, module) {
      function _extends() {
        _extends = Object.assign || function(target) {
          for (var i3 = 1; i3 < arguments.length; i3++) {
            var source = arguments[i3];
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
      var {
        h: h3,
        Component
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      var RecordButton = require_RecordButton3();
      var SubmitButton = require_SubmitButton3();
      var StopWatch = require_StopWatch();
      var StreamStatus = require_StreamStatus();
      var RecorderScreen = class extends Component {
        componentWillUnmount() {
          this.props.onStop();
        }
        render() {
          const {
            recording,
            stream: videoStream,
            recordedVideo
          } = this.props;
          const videoProps = {
            playsinline: true
          };
          if (recording || !recordedVideo && !recording) {
            videoProps.muted = true;
            videoProps.autoplay = true;
            videoProps.srcObject = videoStream;
          }
          if (recordedVideo && !recording) {
            videoProps.muted = false;
            videoProps.controls = true;
            videoProps.src = recordedVideo;
            if (this.videoElement) {
              this.videoElement.srcObject = void 0;
            }
          }
          return h3("div", {
            className: "uppy uppy-ScreenCapture-container"
          }, h3("div", {
            className: "uppy-ScreenCapture-videoContainer"
          }, h3(StreamStatus, this.props), h3("video", _extends({
            ref: (videoElement) => {
              this.videoElement = videoElement;
            },
            className: "uppy-ScreenCapture-video"
          }, videoProps)), h3(StopWatch, this.props)), h3("div", {
            className: "uppy-ScreenCapture-buttonContainer"
          }, h3(RecordButton, this.props), h3(SubmitButton, this.props)));
        }
      };
      module.exports = RecorderScreen;
    }
  });

  // ../packages/@uppy/screen-capture/lib/locale.js
  var require_locale16 = __commonJS({
    "../packages/@uppy/screen-capture/lib/locale.js"(exports, module) {
      module.exports = {
        strings: {
          startCapturing: "Begin screen capturing",
          stopCapturing: "Stop screen capturing",
          submitRecordedFile: "Submit recorded file",
          streamActive: "Stream active",
          streamPassive: "Stream passive",
          micDisabled: "Microphone access denied by user",
          recording: "Recording"
        }
      };
    }
  });

  // ../packages/@uppy/screen-capture/lib/index.js
  var require_lib21 = __commonJS({
    "../packages/@uppy/screen-capture/lib/index.js"(exports, module) {
      var _class;
      var _temp;
      function _extends() {
        _extends = Object.assign || function(target) {
          for (var i3 = 1; i3 < arguments.length; i3++) {
            var source = arguments[i3];
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
      var {
        h: h3
      } = (init_preact_module(), __toCommonJS(preact_module_exports));
      var {
        UIPlugin
      } = require_lib2();
      var getFileTypeExtension = require_getFileTypeExtension();
      var ScreenRecIcon = require_ScreenRecIcon();
      var CaptureScreen = require_CaptureScreen();
      var locale = require_locale16();
      function getMediaDevices() {
        return window.MediaRecorder && navigator.mediaDevices;
      }
      module.exports = (_temp = _class = class ScreenCapture extends UIPlugin {
        constructor(uppy, opts) {
          super(uppy, opts);
          this.mediaDevices = getMediaDevices();
          this.protocol = location.protocol === "https:" ? "https" : "http";
          this.id = this.opts.id || "ScreenCapture";
          this.title = this.opts.title || "Screencast";
          this.type = "acquirer";
          this.icon = ScreenRecIcon;
          this.defaultLocale = locale;
          const defaultOptions = {
            displayMediaConstraints: {
              video: {
                width: 1280,
                height: 720,
                frameRate: {
                  ideal: 3,
                  max: 5
                },
                cursor: "motion",
                displaySurface: "monitor"
              }
            },
            userMediaConstraints: {
              audio: true
            },
            preferredVideoMimeType: "video/webm"
          };
          this.opts = {
            ...defaultOptions,
            ...opts
          };
          this.i18nInit();
          this.install = this.install.bind(this);
          this.setPluginState = this.setPluginState.bind(this);
          this.render = this.render.bind(this);
          this.start = this.start.bind(this);
          this.stop = this.stop.bind(this);
          this.startRecording = this.startRecording.bind(this);
          this.stopRecording = this.stopRecording.bind(this);
          this.submit = this.submit.bind(this);
          this.streamInterrupted = this.streamInactivated.bind(this);
          this.captureActive = false;
          this.capturedMediaFile = null;
        }
        install() {
          if (!this.mediaDevices) {
            this.uppy.log("Screen recorder access is not supported", "error");
            return null;
          }
          this.setPluginState({
            streamActive: false,
            audioStreamActive: false
          });
          const {
            target
          } = this.opts;
          if (target) {
            this.mount(target, this);
          }
        }
        uninstall() {
          if (this.videoStream) {
            this.stop();
          }
          this.unmount();
        }
        start() {
          if (!this.mediaDevices) {
            return Promise.reject(new Error("Screen recorder access not supported"));
          }
          this.captureActive = true;
          this.selectAudioStreamSource();
          this.selectVideoStreamSource().then((res) => {
            if (res === false) {
              if (this.parent && this.parent.hideAllPanels) {
                this.parent.hideAllPanels();
                this.captureActive = false;
              }
            }
          });
        }
        selectVideoStreamSource() {
          if (this.videoStream) {
            return new Promise((resolve) => resolve(this.videoStream));
          }
          return this.mediaDevices.getDisplayMedia(this.opts.displayMediaConstraints).then((videoStream) => {
            this.videoStream = videoStream;
            this.videoStream.addEventListener("inactive", () => {
              this.streamInactivated();
            });
            this.setPluginState({
              streamActive: true
            });
            return videoStream;
          }).catch((err) => {
            this.setPluginState({
              screenRecError: err
            });
            this.userDenied = true;
            setTimeout(() => {
              this.userDenied = false;
            }, 1e3);
            return false;
          });
        }
        selectAudioStreamSource() {
          if (this.audioStream) {
            return new Promise((resolve) => resolve(this.audioStream));
          }
          return this.mediaDevices.getUserMedia(this.opts.userMediaConstraints).then((audioStream) => {
            this.audioStream = audioStream;
            this.setPluginState({
              audioStreamActive: true
            });
            return audioStream;
          }).catch((err) => {
            if (err.name === "NotAllowedError") {
              this.uppy.info(this.i18n("micDisabled"), "error", 5e3);
            }
            return false;
          });
        }
        startRecording() {
          const options = {};
          this.capturedMediaFile = null;
          this.recordingChunks = [];
          const {
            preferredVideoMimeType
          } = this.opts;
          this.selectVideoStreamSource().then((videoStream) => {
            if (preferredVideoMimeType && MediaRecorder.isTypeSupported(preferredVideoMimeType) && getFileTypeExtension(preferredVideoMimeType)) {
              options.mimeType = preferredVideoMimeType;
            }
            const tracks = [videoStream.getVideoTracks()[0]];
            if (this.audioStream) {
              tracks.push(this.audioStream.getAudioTracks()[0]);
            }
            this.outputStream = new MediaStream(tracks);
            this.recorder = new MediaRecorder(this.outputStream, options);
            this.recorder.addEventListener("dataavailable", (event) => {
              this.recordingChunks.push(event.data);
            });
            this.recorder.start();
            this.setPluginState({
              recording: true
            });
          }).catch((err) => {
            this.uppy.log(err, "error");
          });
        }
        streamInactivated() {
          const {
            recordedVideo,
            recording
          } = {
            ...this.getPluginState()
          };
          if (!recordedVideo && !recording) {
            if (this.parent && this.parent.hideAllPanels) {
              this.parent.hideAllPanels();
            }
          } else if (recording) {
            this.uppy.log("Capture stream inactive \u2014 stop recording");
            this.stopRecording();
          }
          this.videoStream = null;
          this.audioStream = null;
          this.setPluginState({
            streamActive: false,
            audioStreamActive: false
          });
        }
        stopRecording() {
          const stopped = new Promise((resolve) => {
            this.recorder.addEventListener("stop", () => {
              resolve();
            });
            this.recorder.stop();
          });
          return stopped.then(() => {
            this.setPluginState({
              recording: false
            });
            return this.getVideo();
          }).then((file) => {
            this.capturedMediaFile = file;
            this.setPluginState({
              recordedVideo: URL.createObjectURL(file.data)
            });
          }).then(() => {
            this.recordingChunks = null;
            this.recorder = null;
          }, (error) => {
            this.recordingChunks = null;
            this.recorder = null;
            throw error;
          });
        }
        submit() {
          try {
            if (this.capturedMediaFile) {
              this.uppy.addFile(this.capturedMediaFile);
            }
          } catch (err) {
            if (!err.isRestriction) {
              this.uppy.log(err, "error");
            }
          }
        }
        stop() {
          if (this.videoStream) {
            this.videoStream.getVideoTracks().forEach((track) => {
              track.stop();
            });
            this.videoStream.getAudioTracks().forEach((track) => {
              track.stop();
            });
            this.videoStream = null;
          }
          if (this.audioStream) {
            this.audioStream.getAudioTracks().forEach((track) => {
              track.stop();
            });
            this.audioStream.getVideoTracks().forEach((track) => {
              track.stop();
            });
            this.audioStream = null;
          }
          if (this.outputStream) {
            this.outputStream.getAudioTracks().forEach((track) => {
              track.stop();
            });
            this.outputStream.getVideoTracks().forEach((track) => {
              track.stop();
            });
            this.outputStream = null;
          }
          this.setPluginState({
            recordedVideo: null
          });
          this.captureActive = false;
        }
        getVideo() {
          const mimeType = this.recordingChunks[0].type;
          const fileExtension = getFileTypeExtension(mimeType);
          if (!fileExtension) {
            return Promise.reject(new Error(`Could not retrieve recording: Unsupported media type "${mimeType}"`));
          }
          const name = `screencap-${Date.now()}.${fileExtension}`;
          const blob = new Blob(this.recordingChunks, {
            type: mimeType
          });
          const file = {
            source: this.id,
            name,
            data: new Blob([blob], {
              type: mimeType
            }),
            type: mimeType
          };
          return Promise.resolve(file);
        }
        render() {
          const recorderState = this.getPluginState();
          if (!recorderState.streamActive && !this.captureActive && !this.userDenied) {
            this.start();
          }
          return h3(CaptureScreen, _extends({}, recorderState, {
            onStartRecording: this.startRecording,
            onStopRecording: this.stopRecording,
            onStop: this.stop,
            onSubmit: this.submit,
            i18n: this.i18n,
            stream: this.videoStream
          }));
        }
      }, _class.VERSION = "2.0.6", _temp);
    }
  });

  // ../node_modules/js-base64/base64.js
  var require_base64 = __commonJS({
    "../node_modules/js-base64/base64.js"(exports, module) {
      (function(global2, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(global2) : typeof define === "function" && define.amd ? define(factory) : factory(global2);
      })(typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : exports, function(global2) {
        "use strict";
        global2 = global2 || {};
        var _Base64 = global2.Base64;
        var version = "2.6.4";
        var b64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var b64tab = function(bin) {
          var t3 = {};
          for (var i3 = 0, l3 = bin.length; i3 < l3; i3++)
            t3[bin.charAt(i3)] = i3;
          return t3;
        }(b64chars);
        var fromCharCode = String.fromCharCode;
        var cb_utob = function(c3) {
          if (c3.length < 2) {
            var cc = c3.charCodeAt(0);
            return cc < 128 ? c3 : cc < 2048 ? fromCharCode(192 | cc >>> 6) + fromCharCode(128 | cc & 63) : fromCharCode(224 | cc >>> 12 & 15) + fromCharCode(128 | cc >>> 6 & 63) + fromCharCode(128 | cc & 63);
          } else {
            var cc = 65536 + (c3.charCodeAt(0) - 55296) * 1024 + (c3.charCodeAt(1) - 56320);
            return fromCharCode(240 | cc >>> 18 & 7) + fromCharCode(128 | cc >>> 12 & 63) + fromCharCode(128 | cc >>> 6 & 63) + fromCharCode(128 | cc & 63);
          }
        };
        var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
        var utob = function(u3) {
          return u3.replace(re_utob, cb_utob);
        };
        var cb_encode = function(ccc) {
          var padlen = [0, 2, 1][ccc.length % 3], ord = ccc.charCodeAt(0) << 16 | (ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8 | (ccc.length > 2 ? ccc.charCodeAt(2) : 0), chars = [b64chars.charAt(ord >>> 18), b64chars.charAt(ord >>> 12 & 63), padlen >= 2 ? "=" : b64chars.charAt(ord >>> 6 & 63), padlen >= 1 ? "=" : b64chars.charAt(ord & 63)];
          return chars.join("");
        };
        var btoa2 = global2.btoa && typeof global2.btoa == "function" ? function(b3) {
          return global2.btoa(b3);
        } : function(b3) {
          if (b3.match(/[^\x00-\xFF]/))
            throw new RangeError("The string contains invalid characters.");
          return b3.replace(/[\s\S]{1,3}/g, cb_encode);
        };
        var _encode = function(u3) {
          return btoa2(utob(String(u3)));
        };
        var mkUriSafe = function(b64) {
          return b64.replace(/[+\/]/g, function(m0) {
            return m0 == "+" ? "-" : "_";
          }).replace(/=/g, "");
        };
        var encode = function(u3, urisafe) {
          return urisafe ? mkUriSafe(_encode(u3)) : _encode(u3);
        };
        var encodeURI = function(u3) {
          return encode(u3, true);
        };
        var fromUint8Array;
        if (global2.Uint8Array)
          fromUint8Array = function(a3, urisafe) {
            var b64 = "";
            for (var i3 = 0, l3 = a3.length; i3 < l3; i3 += 3) {
              var a0 = a3[i3], a1 = a3[i3 + 1], a22 = a3[i3 + 2];
              var ord = a0 << 16 | a1 << 8 | a22;
              b64 += b64chars.charAt(ord >>> 18) + b64chars.charAt(ord >>> 12 & 63) + (typeof a1 != "undefined" ? b64chars.charAt(ord >>> 6 & 63) : "=") + (typeof a22 != "undefined" ? b64chars.charAt(ord & 63) : "=");
            }
            return urisafe ? mkUriSafe(b64) : b64;
          };
        var re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
        var cb_btou = function(cccc) {
          switch (cccc.length) {
            case 4:
              var cp = (7 & cccc.charCodeAt(0)) << 18 | (63 & cccc.charCodeAt(1)) << 12 | (63 & cccc.charCodeAt(2)) << 6 | 63 & cccc.charCodeAt(3), offset = cp - 65536;
              return fromCharCode((offset >>> 10) + 55296) + fromCharCode((offset & 1023) + 56320);
            case 3:
              return fromCharCode((15 & cccc.charCodeAt(0)) << 12 | (63 & cccc.charCodeAt(1)) << 6 | 63 & cccc.charCodeAt(2));
            default:
              return fromCharCode((31 & cccc.charCodeAt(0)) << 6 | 63 & cccc.charCodeAt(1));
          }
        };
        var btou = function(b3) {
          return b3.replace(re_btou, cb_btou);
        };
        var cb_decode = function(cccc) {
          var len = cccc.length, padlen = len % 4, n2 = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0) | (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0) | (len > 2 ? b64tab[cccc.charAt(2)] << 6 : 0) | (len > 3 ? b64tab[cccc.charAt(3)] : 0), chars = [fromCharCode(n2 >>> 16), fromCharCode(n2 >>> 8 & 255), fromCharCode(n2 & 255)];
          chars.length -= [0, 0, 2, 1][padlen];
          return chars.join("");
        };
        var _atob = global2.atob && typeof global2.atob == "function" ? function(a3) {
          return global2.atob(a3);
        } : function(a3) {
          return a3.replace(/\S{1,4}/g, cb_decode);
        };
        var atob2 = function(a3) {
          return _atob(String(a3).replace(/[^A-Za-z0-9\+\/]/g, ""));
        };
        var _decode = function(a3) {
          return btou(_atob(a3));
        };
        var _fromURI = function(a3) {
          return String(a3).replace(/[-_]/g, function(m0) {
            return m0 == "-" ? "+" : "/";
          }).replace(/[^A-Za-z0-9\+\/]/g, "");
        };
        var decode = function(a3) {
          return _decode(_fromURI(a3));
        };
        var toUint8Array;
        if (global2.Uint8Array)
          toUint8Array = function(a3) {
            return Uint8Array.from(atob2(_fromURI(a3)), function(c3) {
              return c3.charCodeAt(0);
            });
          };
        var noConflict = function() {
          var Base642 = global2.Base64;
          global2.Base64 = _Base64;
          return Base642;
        };
        global2.Base64 = {
          VERSION: version,
          atob: atob2,
          btoa: btoa2,
          fromBase64: decode,
          toBase64: encode,
          utob,
          encode,
          encodeURI,
          btou,
          decode,
          noConflict,
          fromUint8Array,
          toUint8Array
        };
        if (typeof Object.defineProperty === "function") {
          var noEnum = function(v3) {
            return {
              value: v3,
              enumerable: false,
              writable: true,
              configurable: true
            };
          };
          global2.Base64.extendString = function() {
            Object.defineProperty(String.prototype, "fromBase64", noEnum(function() {
              return decode(this);
            }));
            Object.defineProperty(String.prototype, "toBase64", noEnum(function(urisafe) {
              return encode(this, urisafe);
            }));
            Object.defineProperty(String.prototype, "toBase64URI", noEnum(function() {
              return encode(this, true);
            }));
          };
        }
        if (global2["Meteor"]) {
          Base64 = global2.Base64;
        }
        if (typeof module !== "undefined" && module.exports) {
          module.exports.Base64 = global2.Base64;
        } else if (typeof define === "function" && define.amd) {
          define([], function() {
            return global2.Base64;
          });
        }
        return {
          Base64: global2.Base64
        };
      });
    }
  });

  // ../node_modules/requires-port/index.js
  var require_requires_port = __commonJS({
    "../node_modules/requires-port/index.js"(exports, module) {
      "use strict";
      module.exports = function required(port, protocol) {
        protocol = protocol.split(":")[0];
        port = +port;
        if (!port)
          return false;
        switch (protocol) {
          case "http":
          case "ws":
            return port !== 80;
          case "https":
          case "wss":
            return port !== 443;
          case "ftp":
            return port !== 21;
          case "gopher":
            return port !== 70;
          case "file":
            return false;
        }
        return port !== 0;
      };
    }
  });

  // ../node_modules/querystringify/index.js
  var require_querystringify = __commonJS({
    "../node_modules/querystringify/index.js"(exports) {
      "use strict";
      var has = Object.prototype.hasOwnProperty;
      var undef;
      function decode(input) {
        try {
          return decodeURIComponent(input.replace(/\+/g, " "));
        } catch (e3) {
          return null;
        }
      }
      function encode(input) {
        try {
          return encodeURIComponent(input);
        } catch (e3) {
          return null;
        }
      }
      function querystring(query) {
        var parser = /([^=?#&]+)=?([^&]*)/g, result = {}, part;
        while (part = parser.exec(query)) {
          var key = decode(part[1]), value = decode(part[2]);
          if (key === null || value === null || key in result)
            continue;
          result[key] = value;
        }
        return result;
      }
      function querystringify(obj, prefix) {
        prefix = prefix || "";
        var pairs = [], value, key;
        if (typeof prefix !== "string")
          prefix = "?";
        for (key in obj) {
          if (has.call(obj, key)) {
            value = obj[key];
            if (!value && (value === null || value === undef || isNaN(value))) {
              value = "";
            }
            key = encode(key);
            value = encode(value);
            if (key === null || value === null)
              continue;
            pairs.push(key + "=" + value);
          }
        }
        return pairs.length ? prefix + pairs.join("&") : "";
      }
      exports.stringify = querystringify;
      exports.parse = querystring;
    }
  });

  // ../node_modules/url-parse/index.js
  var require_url_parse = __commonJS({
    "../node_modules/url-parse/index.js"(exports, module) {
      "use strict";
      var required = require_requires_port();
      var qs = require_querystringify();
      var slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;
      var protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i;
      var windowsDriveLetter = /^[a-zA-Z]:/;
      var whitespace = "[\\x09\\x0A\\x0B\\x0C\\x0D\\x20\\xA0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000\\u2028\\u2029\\uFEFF]";
      var left = new RegExp("^" + whitespace + "+");
      function trimLeft(str) {
        return (str ? str : "").toString().replace(left, "");
      }
      var rules = [
        ["#", "hash"],
        ["?", "query"],
        function sanitize(address, url) {
          return isSpecial(url.protocol) ? address.replace(/\\/g, "/") : address;
        },
        ["/", "pathname"],
        ["@", "auth", 1],
        [NaN, "host", void 0, 1, 1],
        [/:(\d+)$/, "port", void 0, 1],
        [NaN, "hostname", void 0, 1, 1]
      ];
      var ignore = {
        hash: 1,
        query: 1
      };
      function lolcation(loc) {
        var globalVar;
        if (typeof window !== "undefined")
          globalVar = window;
        else if (typeof global !== "undefined")
          globalVar = global;
        else if (typeof self !== "undefined")
          globalVar = self;
        else
          globalVar = {};
        var location2 = globalVar.location || {};
        loc = loc || location2;
        var finaldestination = {}, type = typeof loc, key;
        if (loc.protocol === "blob:") {
          finaldestination = new Url2(unescape(loc.pathname), {});
        } else if (type === "string") {
          finaldestination = new Url2(loc, {});
          for (key in ignore)
            delete finaldestination[key];
        } else if (type === "object") {
          for (key in loc) {
            if (key in ignore)
              continue;
            finaldestination[key] = loc[key];
          }
          if (finaldestination.slashes === void 0) {
            finaldestination.slashes = slashes.test(loc.href);
          }
        }
        return finaldestination;
      }
      function isSpecial(scheme) {
        return scheme === "file:" || scheme === "ftp:" || scheme === "http:" || scheme === "https:" || scheme === "ws:" || scheme === "wss:";
      }
      function extractProtocol(address, location2) {
        address = trimLeft(address);
        location2 = location2 || {};
        var match = protocolre.exec(address);
        var protocol = match[1] ? match[1].toLowerCase() : "";
        var forwardSlashes = !!match[2];
        var otherSlashes = !!match[3];
        var slashesCount = 0;
        var rest;
        if (forwardSlashes) {
          if (otherSlashes) {
            rest = match[2] + match[3] + match[4];
            slashesCount = match[2].length + match[3].length;
          } else {
            rest = match[2] + match[4];
            slashesCount = match[2].length;
          }
        } else {
          if (otherSlashes) {
            rest = match[3] + match[4];
            slashesCount = match[3].length;
          } else {
            rest = match[4];
          }
        }
        if (protocol === "file:") {
          if (slashesCount >= 2) {
            rest = rest.slice(2);
          }
        } else if (isSpecial(protocol)) {
          rest = match[4];
        } else if (protocol) {
          if (forwardSlashes) {
            rest = rest.slice(2);
          }
        } else if (slashesCount >= 2 && isSpecial(location2.protocol)) {
          rest = match[4];
        }
        return {
          protocol,
          slashes: forwardSlashes || isSpecial(protocol),
          slashesCount,
          rest
        };
      }
      function resolve(relative, base) {
        if (relative === "")
          return base;
        var path = (base || "/").split("/").slice(0, -1).concat(relative.split("/")), i3 = path.length, last = path[i3 - 1], unshift = false, up = 0;
        while (i3--) {
          if (path[i3] === ".") {
            path.splice(i3, 1);
          } else if (path[i3] === "..") {
            path.splice(i3, 1);
            up++;
          } else if (up) {
            if (i3 === 0)
              unshift = true;
            path.splice(i3, 1);
            up--;
          }
        }
        if (unshift)
          path.unshift("");
        if (last === "." || last === "..")
          path.push("");
        return path.join("/");
      }
      function Url2(address, location2, parser) {
        address = trimLeft(address);
        if (!(this instanceof Url2)) {
          return new Url2(address, location2, parser);
        }
        var relative, extracted, parse, instruction, index, key, instructions = rules.slice(), type = typeof location2, url = this, i3 = 0;
        if (type !== "object" && type !== "string") {
          parser = location2;
          location2 = null;
        }
        if (parser && typeof parser !== "function")
          parser = qs.parse;
        location2 = lolcation(location2);
        extracted = extractProtocol(address || "", location2);
        relative = !extracted.protocol && !extracted.slashes;
        url.slashes = extracted.slashes || relative && location2.slashes;
        url.protocol = extracted.protocol || location2.protocol || "";
        address = extracted.rest;
        if (extracted.protocol === "file:" && (extracted.slashesCount !== 2 || windowsDriveLetter.test(address)) || !extracted.slashes && (extracted.protocol || extracted.slashesCount < 2 || !isSpecial(url.protocol))) {
          instructions[3] = [/(.*)/, "pathname"];
        }
        for (; i3 < instructions.length; i3++) {
          instruction = instructions[i3];
          if (typeof instruction === "function") {
            address = instruction(address, url);
            continue;
          }
          parse = instruction[0];
          key = instruction[1];
          if (parse !== parse) {
            url[key] = address;
          } else if (typeof parse === "string") {
            if (~(index = address.indexOf(parse))) {
              if (typeof instruction[2] === "number") {
                url[key] = address.slice(0, index);
                address = address.slice(index + instruction[2]);
              } else {
                url[key] = address.slice(index);
                address = address.slice(0, index);
              }
            }
          } else if (index = parse.exec(address)) {
            url[key] = index[1];
            address = address.slice(0, index.index);
          }
          url[key] = url[key] || (relative && instruction[3] ? location2[key] || "" : "");
          if (instruction[4])
            url[key] = url[key].toLowerCase();
        }
        if (parser)
          url.query = parser(url.query);
        if (relative && location2.slashes && url.pathname.charAt(0) !== "/" && (url.pathname !== "" || location2.pathname !== "")) {
          url.pathname = resolve(url.pathname, location2.pathname);
        }
        if (url.pathname.charAt(0) !== "/" && isSpecial(url.protocol)) {
          url.pathname = "/" + url.pathname;
        }
        if (!required(url.port, url.protocol)) {
          url.host = url.hostname;
          url.port = "";
        }
        url.username = url.password = "";
        if (url.auth) {
          instruction = url.auth.split(":");
          url.username = instruction[0] || "";
          url.password = instruction[1] || "";
        }
        url.origin = url.protocol !== "file:" && isSpecial(url.protocol) && url.host ? url.protocol + "//" + url.host : "null";
        url.href = url.toString();
      }
      function set(part, value, fn) {
        var url = this;
        switch (part) {
          case "query":
            if (typeof value === "string" && value.length) {
              value = (fn || qs.parse)(value);
            }
            url[part] = value;
            break;
          case "port":
            url[part] = value;
            if (!required(value, url.protocol)) {
              url.host = url.hostname;
              url[part] = "";
            } else if (value) {
              url.host = url.hostname + ":" + value;
            }
            break;
          case "hostname":
            url[part] = value;
            if (url.port)
              value += ":" + url.port;
            url.host = value;
            break;
          case "host":
            url[part] = value;
            if (/:\d+$/.test(value)) {
              value = value.split(":");
              url.port = value.pop();
              url.hostname = value.join(":");
            } else {
              url.hostname = value;
              url.port = "";
            }
            break;
          case "protocol":
            url.protocol = value.toLowerCase();
            url.slashes = !fn;
            break;
          case "pathname":
          case "hash":
            if (value) {
              var char = part === "pathname" ? "/" : "#";
              url[part] = value.charAt(0) !== char ? char + value : value;
            } else {
              url[part] = value;
            }
            break;
          default:
            url[part] = value;
        }
        for (var i3 = 0; i3 < rules.length; i3++) {
          var ins = rules[i3];
          if (ins[4])
            url[ins[1]] = url[ins[1]].toLowerCase();
        }
        url.origin = url.protocol !== "file:" && isSpecial(url.protocol) && url.host ? url.protocol + "//" + url.host : "null";
        url.href = url.toString();
        return url;
      }
      function toString(stringify) {
        if (!stringify || typeof stringify !== "function")
          stringify = qs.stringify;
        var query, url = this, protocol = url.protocol;
        if (protocol && protocol.charAt(protocol.length - 1) !== ":")
          protocol += ":";
        var result = protocol + (url.slashes || isSpecial(url.protocol) ? "//" : "");
        if (url.username) {
          result += url.username;
          if (url.password)
            result += ":" + url.password;
          result += "@";
        }
        result += url.host + url.pathname;
        query = typeof url.query === "object" ? stringify(url.query) : url.query;
        if (query)
          result += query.charAt(0) !== "?" ? "?" + query : query;
        if (url.hash)
          result += url.hash;
        return result;
      }
      Url2.prototype = {
        set,
        toString
      };
      Url2.extractProtocol = extractProtocol;
      Url2.location = lolcation;
      Url2.trimLeft = trimLeft;
      Url2.qs = qs;
      module.exports = Url2;
    }
  });

  // ../node_modules/tus-js-client/lib.es5/error.js
  var require_error = __commonJS({
    "../node_modules/tus-js-client/lib.es5/error.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      function _typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = function _typeof2(obj2) {
            return typeof obj2;
          };
        } else {
          _typeof = function _typeof2(obj2) {
            return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
          };
        }
        return _typeof(obj);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            writable: true,
            configurable: true
          }
        });
        if (superClass)
          _setPrototypeOf(subClass, superClass);
      }
      function _createSuper(Derived) {
        return function() {
          var Super = _getPrototypeOf(Derived), result;
          if (_isNativeReflectConstruct()) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
          } else {
            result = Super.apply(this, arguments);
          }
          return _possibleConstructorReturn(this, result);
        };
      }
      function _possibleConstructorReturn(self2, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
          return call;
        }
        return _assertThisInitialized(self2);
      }
      function _assertThisInitialized(self2) {
        if (self2 === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self2;
      }
      function _wrapNativeSuper(Class) {
        var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
        _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
          if (Class2 === null || !_isNativeFunction(Class2))
            return Class2;
          if (typeof Class2 !== "function") {
            throw new TypeError("Super expression must either be null or a function");
          }
          if (typeof _cache !== "undefined") {
            if (_cache.has(Class2))
              return _cache.get(Class2);
            _cache.set(Class2, Wrapper);
          }
          function Wrapper() {
            return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
          }
          Wrapper.prototype = Object.create(Class2.prototype, {
            constructor: {
              value: Wrapper,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
          return _setPrototypeOf(Wrapper, Class2);
        };
        return _wrapNativeSuper(Class);
      }
      function _construct(Parent, args, Class) {
        if (_isNativeReflectConstruct()) {
          _construct = Reflect.construct;
        } else {
          _construct = function _construct2(Parent2, args2, Class2) {
            var a3 = [null];
            a3.push.apply(a3, args2);
            var Constructor = Function.bind.apply(Parent2, a3);
            var instance = new Constructor();
            if (Class2)
              _setPrototypeOf(instance, Class2.prototype);
            return instance;
          };
        }
        return _construct.apply(null, arguments);
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct)
          return false;
        if (Reflect.construct.sham)
          return false;
        if (typeof Proxy === "function")
          return true;
        try {
          Date.prototype.toString.call(Reflect.construct(Date, [], function() {
          }));
          return true;
        } catch (e3) {
          return false;
        }
      }
      function _isNativeFunction(fn) {
        return Function.toString.call(fn).indexOf("[native code]") !== -1;
      }
      function _setPrototypeOf(o3, p3) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o4, p4) {
          o4.__proto__ = p4;
          return o4;
        };
        return _setPrototypeOf(o3, p3);
      }
      function _getPrototypeOf(o3) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o4) {
          return o4.__proto__ || Object.getPrototypeOf(o4);
        };
        return _getPrototypeOf(o3);
      }
      var DetailedError = /* @__PURE__ */ function(_Error) {
        _inherits(DetailedError2, _Error);
        var _super = _createSuper(DetailedError2);
        function DetailedError2(message) {
          var _this;
          var causingErr = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
          var req = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
          var res = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
          _classCallCheck(this, DetailedError2);
          _this = _super.call(this, message);
          _this.originalRequest = req;
          _this.originalResponse = res;
          _this.causingError = causingErr;
          if (causingErr != null) {
            message += ", caused by ".concat(causingErr.toString());
          }
          if (req != null) {
            var requestId = req.getHeader("X-Request-ID") || "n/a";
            var method = req.getMethod();
            var url = req.getURL();
            var status = res ? res.getStatus() : "n/a";
            var body = res ? res.getBody() || "" : "n/a";
            message += ", originated from request (method: ".concat(method, ", url: ").concat(url, ", response code: ").concat(status, ", response text: ").concat(body, ", request id: ").concat(requestId, ")");
          }
          _this.message = message;
          return _this;
        }
        return DetailedError2;
      }(/* @__PURE__ */ _wrapNativeSuper(Error));
      var _default = DetailedError;
      exports.default = _default;
    }
  });

  // ../node_modules/tus-js-client/lib.es5/logger.js
  var require_logger = __commonJS({
    "../node_modules/tus-js-client/lib.es5/logger.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.enableDebugLog = enableDebugLog;
      exports.log = log;
      var isEnabled = false;
      function enableDebugLog() {
        isEnabled = true;
      }
      function log(msg) {
        if (!isEnabled)
          return;
        console.log(msg);
      }
    }
  });

  // ../node_modules/tus-js-client/lib.es5/uuid.js
  var require_uuid = __commonJS({
    "../node_modules/tus-js-client/lib.es5/uuid.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = uuid;
      function uuid() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c3) {
          var r3 = Math.random() * 16 | 0, v3 = c3 == "x" ? r3 : r3 & 3 | 8;
          return v3.toString(16);
        });
      }
    }
  });

  // ../node_modules/tus-js-client/lib.es5/upload.js
  var require_upload = __commonJS({
    "../node_modules/tus-js-client/lib.es5/upload.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _jsBase = require_base64();
      var _urlParse = _interopRequireDefault(require_url_parse());
      var _error = _interopRequireDefault(require_error());
      var _logger = require_logger();
      var _uuid = _interopRequireDefault(require_uuid());
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          default: obj
        };
      }
      function ownKeys(object, enumerableOnly) {
        var keys = Object.keys(object);
        if (Object.getOwnPropertySymbols) {
          var symbols = Object.getOwnPropertySymbols(object);
          if (enumerableOnly)
            symbols = symbols.filter(function(sym) {
              return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
          keys.push.apply(keys, symbols);
        }
        return keys;
      }
      function _objectSpread(target) {
        for (var i3 = 1; i3 < arguments.length; i3++) {
          var source = arguments[i3] != null ? arguments[i3] : {};
          if (i3 % 2) {
            ownKeys(Object(source), true).forEach(function(key) {
              _defineProperty(target, key, source[key]);
            });
          } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
          } else {
            ownKeys(Object(source)).forEach(function(key) {
              Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            });
          }
        }
        return target;
      }
      function _defineProperty(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          obj[key] = value;
        }
        return obj;
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i3 = 0; i3 < props.length; i3++) {
          var descriptor = props[i3];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties(Constructor, staticProps);
        return Constructor;
      }
      var defaultOptions = {
        endpoint: null,
        uploadUrl: null,
        metadata: {},
        fingerprint: null,
        uploadSize: null,
        onProgress: null,
        onChunkComplete: null,
        onSuccess: null,
        onError: null,
        _onUploadUrlAvailable: null,
        overridePatchMethod: false,
        headers: {},
        addRequestId: false,
        onBeforeRequest: null,
        onAfterResponse: null,
        onShouldRetry: null,
        chunkSize: Infinity,
        retryDelays: [0, 1e3, 3e3, 5e3],
        parallelUploads: 1,
        storeFingerprintForResuming: true,
        removeFingerprintOnSuccess: false,
        uploadLengthDeferred: false,
        uploadDataDuringCreation: false,
        urlStorage: null,
        fileReader: null,
        httpStack: null
      };
      var BaseUpload = /* @__PURE__ */ function() {
        function BaseUpload2(file, options) {
          _classCallCheck(this, BaseUpload2);
          if ("resume" in options) {
            console.log("tus: The `resume` option has been removed in tus-js-client v2. Please use the URL storage API instead.");
          }
          this.options = options;
          this._urlStorage = this.options.urlStorage;
          this.file = file;
          this.url = null;
          this._req = null;
          this._fingerprint = null;
          this._urlStorageKey = null;
          this._offset = null;
          this._aborted = false;
          this._size = null;
          this._source = null;
          this._retryAttempt = 0;
          this._retryTimeout = null;
          this._offsetBeforeRetry = 0;
          this._parallelUploads = null;
          this._parallelUploadUrls = null;
        }
        _createClass(BaseUpload2, [{
          key: "findPreviousUploads",
          value: function findPreviousUploads() {
            var _this = this;
            return this.options.fingerprint(this.file, this.options).then(function(fingerprint) {
              return _this._urlStorage.findUploadsByFingerprint(fingerprint);
            });
          }
        }, {
          key: "resumeFromPreviousUpload",
          value: function resumeFromPreviousUpload(previousUpload) {
            this.url = previousUpload.uploadUrl || null;
            this._parallelUploadUrls = previousUpload.parallelUploadUrls || null;
            this._urlStorageKey = previousUpload.urlStorageKey;
          }
        }, {
          key: "start",
          value: function start() {
            var _this2 = this;
            var file = this.file;
            if (!file) {
              this._emitError(new Error("tus: no file or stream to upload provided"));
              return;
            }
            if (!this.options.endpoint && !this.options.uploadUrl) {
              this._emitError(new Error("tus: neither an endpoint or an upload URL is provided"));
              return;
            }
            var retryDelays = this.options.retryDelays;
            if (retryDelays != null && Object.prototype.toString.call(retryDelays) !== "[object Array]") {
              this._emitError(new Error("tus: the `retryDelays` option must either be an array or null"));
              return;
            }
            if (this.options.parallelUploads > 1) {
              ["uploadUrl", "uploadSize", "uploadLengthDeferred"].forEach(function(optionName) {
                if (_this2.options[optionName]) {
                  _this2._emitError(new Error("tus: cannot use the ".concat(optionName, " option when parallelUploads is enabled")));
                }
              });
            }
            this.options.fingerprint(file, this.options).then(function(fingerprint) {
              if (fingerprint == null) {
                (0, _logger.log)("No fingerprint was calculated meaning that the upload cannot be stored in the URL storage.");
              } else {
                (0, _logger.log)("Calculated fingerprint: ".concat(fingerprint));
              }
              _this2._fingerprint = fingerprint;
              if (_this2._source) {
                return _this2._source;
              }
              return _this2.options.fileReader.openFile(file, _this2.options.chunkSize);
            }).then(function(source) {
              _this2._source = source;
              if (_this2.options.parallelUploads > 1 || _this2._parallelUploadUrls != null) {
                _this2._startParallelUpload();
              } else {
                _this2._startSingleUpload();
              }
            })["catch"](function(err) {
              _this2._emitError(err);
            });
          }
        }, {
          key: "_startParallelUpload",
          value: function _startParallelUpload() {
            var _this3 = this;
            var totalSize = this._size = this._source.size;
            var totalProgress = 0;
            this._parallelUploads = [];
            var partCount = this._parallelUploadUrls != null ? this._parallelUploadUrls.length : this.options.parallelUploads;
            var parts = splitSizeIntoParts(this._source.size, partCount, this._parallelUploadUrls);
            this._parallelUploadUrls = new Array(parts.length);
            var uploads = parts.map(function(part, index) {
              var lastPartProgress = 0;
              return _this3._source.slice(part.start, part.end).then(function(_ref) {
                var value = _ref.value;
                return new Promise(function(resolve, reject) {
                  var options = _objectSpread({}, _this3.options, {
                    uploadUrl: part.uploadUrl || null,
                    storeFingerprintForResuming: false,
                    removeFingerprintOnSuccess: false,
                    parallelUploads: 1,
                    metadata: {},
                    headers: _objectSpread({}, _this3.options.headers, {
                      "Upload-Concat": "partial"
                    }),
                    onSuccess: resolve,
                    onError: reject,
                    onProgress: function onProgress(newPartProgress) {
                      totalProgress = totalProgress - lastPartProgress + newPartProgress;
                      lastPartProgress = newPartProgress;
                      _this3._emitProgress(totalProgress, totalSize);
                    },
                    _onUploadUrlAvailable: function _onUploadUrlAvailable() {
                      _this3._parallelUploadUrls[index] = upload.url;
                      if (_this3._parallelUploadUrls.filter(function(u3) {
                        return !!u3;
                      }).length === parts.length) {
                        _this3._saveUploadInUrlStorage();
                      }
                    }
                  });
                  var upload = new BaseUpload2(value, options);
                  upload.start();
                  _this3._parallelUploads.push(upload);
                });
              });
            });
            var req;
            Promise.all(uploads).then(function() {
              req = _this3._openRequest("POST", _this3.options.endpoint);
              req.setHeader("Upload-Concat", "final;".concat(_this3._parallelUploadUrls.join(" ")));
              var metadata = encodeMetadata(_this3.options.metadata);
              if (metadata !== "") {
                req.setHeader("Upload-Metadata", metadata);
              }
              return _this3._sendRequest(req, null);
            }).then(function(res) {
              if (!inStatusCategory(res.getStatus(), 200)) {
                _this3._emitHttpError(req, res, "tus: unexpected response while creating upload");
                return;
              }
              var location2 = res.getHeader("Location");
              if (location2 == null) {
                _this3._emitHttpError(req, res, "tus: invalid or missing Location header");
                return;
              }
              _this3.url = resolveUrl(_this3.options.endpoint, location2);
              (0, _logger.log)("Created upload at ".concat(_this3.url));
              _this3._emitSuccess();
            })["catch"](function(err) {
              _this3._emitError(err);
            });
          }
        }, {
          key: "_startSingleUpload",
          value: function _startSingleUpload() {
            if (this.options.uploadLengthDeferred) {
              this._size = null;
            } else if (this.options.uploadSize != null) {
              this._size = +this.options.uploadSize;
              if (isNaN(this._size)) {
                this._emitError(new Error("tus: cannot convert `uploadSize` option into a number"));
                return;
              }
            } else {
              this._size = this._source.size;
              if (this._size == null) {
                this._emitError(new Error("tus: cannot automatically derive upload's size from input and must be specified manually using the `uploadSize` option"));
                return;
              }
            }
            this._aborted = false;
            if (this.url != null) {
              (0, _logger.log)("Resuming upload from previous URL: ".concat(this.url));
              this._resumeUpload();
              return;
            }
            if (this.options.uploadUrl != null) {
              (0, _logger.log)("Resuming upload from provided URL: ".concat(this.options.url));
              this.url = this.options.uploadUrl;
              this._resumeUpload();
              return;
            }
            (0, _logger.log)("Creating a new upload");
            this._createUpload();
          }
        }, {
          key: "abort",
          value: function abort(shouldTerminate) {
            var _this4 = this;
            if (arguments.length > 1 && typeof arguments[1] === "function") {
              throw new Error("tus: the abort function does not accept a callback since v2 anymore; please use the returned Promise instead");
            }
            if (this._parallelUploads != null) {
              this._parallelUploads.forEach(function(upload) {
                upload.abort(shouldTerminate);
              });
            }
            if (this._req !== null) {
              this._req.abort();
              this._source.close();
            }
            this._aborted = true;
            if (this._retryTimeout != null) {
              clearTimeout(this._retryTimeout);
              this._retryTimeout = null;
            }
            if (!shouldTerminate || this.url == null) {
              return Promise.resolve();
            }
            return BaseUpload2.terminate(this.url, this.options).then(function() {
              return _this4._removeFromUrlStorage();
            });
          }
        }, {
          key: "_emitHttpError",
          value: function _emitHttpError(req, res, message, causingErr) {
            this._emitError(new _error.default(message, causingErr, req, res));
          }
        }, {
          key: "_emitError",
          value: function _emitError(err) {
            var _this5 = this;
            if (this._aborted)
              return;
            if (this.options.retryDelays != null) {
              var shouldResetDelays = this._offset != null && this._offset > this._offsetBeforeRetry;
              if (shouldResetDelays) {
                this._retryAttempt = 0;
              }
              if (shouldRetry(err, this._retryAttempt, this.options)) {
                var delay = this.options.retryDelays[this._retryAttempt++];
                this._offsetBeforeRetry = this._offset;
                this._retryTimeout = setTimeout(function() {
                  _this5.start();
                }, delay);
                return;
              }
            }
            if (typeof this.options.onError === "function") {
              this.options.onError(err);
            } else {
              throw err;
            }
          }
        }, {
          key: "_emitSuccess",
          value: function _emitSuccess() {
            if (this.options.removeFingerprintOnSuccess) {
              this._removeFromUrlStorage();
            }
            if (typeof this.options.onSuccess === "function") {
              this.options.onSuccess();
            }
          }
        }, {
          key: "_emitProgress",
          value: function _emitProgress(bytesSent, bytesTotal) {
            if (typeof this.options.onProgress === "function") {
              this.options.onProgress(bytesSent, bytesTotal);
            }
          }
        }, {
          key: "_emitChunkComplete",
          value: function _emitChunkComplete(chunkSize, bytesAccepted, bytesTotal) {
            if (typeof this.options.onChunkComplete === "function") {
              this.options.onChunkComplete(chunkSize, bytesAccepted, bytesTotal);
            }
          }
        }, {
          key: "_createUpload",
          value: function _createUpload() {
            var _this6 = this;
            if (!this.options.endpoint) {
              this._emitError(new Error("tus: unable to create upload because no endpoint is provided"));
              return;
            }
            var req = this._openRequest("POST", this.options.endpoint);
            if (this.options.uploadLengthDeferred) {
              req.setHeader("Upload-Defer-Length", 1);
            } else {
              req.setHeader("Upload-Length", this._size);
            }
            var metadata = encodeMetadata(this.options.metadata);
            if (metadata !== "") {
              req.setHeader("Upload-Metadata", metadata);
            }
            var promise;
            if (this.options.uploadDataDuringCreation && !this.options.uploadLengthDeferred) {
              this._offset = 0;
              promise = this._addChunkToRequest(req);
            } else {
              promise = this._sendRequest(req, null);
            }
            promise.then(function(res) {
              if (!inStatusCategory(res.getStatus(), 200)) {
                _this6._emitHttpError(req, res, "tus: unexpected response while creating upload");
                return;
              }
              var location2 = res.getHeader("Location");
              if (location2 == null) {
                _this6._emitHttpError(req, res, "tus: invalid or missing Location header");
                return;
              }
              _this6.url = resolveUrl(_this6.options.endpoint, location2);
              (0, _logger.log)("Created upload at ".concat(_this6.url));
              if (typeof _this6.options._onUploadUrlAvailable === "function") {
                _this6.options._onUploadUrlAvailable();
              }
              if (_this6._size === 0) {
                _this6._emitSuccess();
                _this6._source.close();
                return;
              }
              _this6._saveUploadInUrlStorage();
              if (_this6.options.uploadDataDuringCreation) {
                _this6._handleUploadResponse(req, res);
              } else {
                _this6._offset = 0;
                _this6._performUpload();
              }
            })["catch"](function(err) {
              _this6._emitHttpError(req, null, "tus: failed to create upload", err);
            });
          }
        }, {
          key: "_resumeUpload",
          value: function _resumeUpload() {
            var _this7 = this;
            var req = this._openRequest("HEAD", this.url);
            var promise = this._sendRequest(req, null);
            promise.then(function(res) {
              var status = res.getStatus();
              if (!inStatusCategory(status, 200)) {
                if (inStatusCategory(status, 400)) {
                  _this7._removeFromUrlStorage();
                }
                if (status === 423) {
                  _this7._emitHttpError(req, res, "tus: upload is currently locked; retry later");
                  return;
                }
                if (!_this7.options.endpoint) {
                  _this7._emitHttpError(req, res, "tus: unable to resume upload (new upload cannot be created without an endpoint)");
                  return;
                }
                _this7.url = null;
                _this7._createUpload();
                return;
              }
              var offset = parseInt(res.getHeader("Upload-Offset"), 10);
              if (isNaN(offset)) {
                _this7._emitHttpError(req, res, "tus: invalid or missing offset value");
                return;
              }
              var length = parseInt(res.getHeader("Upload-Length"), 10);
              if (isNaN(length) && !_this7.options.uploadLengthDeferred) {
                _this7._emitHttpError(req, res, "tus: invalid or missing length value");
                return;
              }
              if (typeof _this7.options._onUploadUrlAvailable === "function") {
                _this7.options._onUploadUrlAvailable();
              }
              if (offset === length) {
                _this7._emitProgress(length, length);
                _this7._emitSuccess();
                return;
              }
              _this7._offset = offset;
              _this7._performUpload();
            })["catch"](function(err) {
              _this7._emitHttpError(req, null, "tus: failed to resume upload", err);
            });
          }
        }, {
          key: "_performUpload",
          value: function _performUpload() {
            var _this8 = this;
            if (this._aborted) {
              return;
            }
            var req;
            if (this.options.overridePatchMethod) {
              req = this._openRequest("POST", this.url);
              req.setHeader("X-HTTP-Method-Override", "PATCH");
            } else {
              req = this._openRequest("PATCH", this.url);
            }
            req.setHeader("Upload-Offset", this._offset);
            var promise = this._addChunkToRequest(req);
            promise.then(function(res) {
              if (!inStatusCategory(res.getStatus(), 200)) {
                _this8._emitHttpError(req, res, "tus: unexpected response while uploading chunk");
                return;
              }
              _this8._handleUploadResponse(req, res);
            })["catch"](function(err) {
              if (_this8._aborted) {
                return;
              }
              _this8._emitHttpError(req, null, "tus: failed to upload chunk at offset ".concat(_this8._offset), err);
            });
          }
        }, {
          key: "_addChunkToRequest",
          value: function _addChunkToRequest(req) {
            var _this9 = this;
            var start = this._offset;
            var end = this._offset + this.options.chunkSize;
            req.setProgressHandler(function(bytesSent) {
              _this9._emitProgress(start + bytesSent, _this9._size);
            });
            req.setHeader("Content-Type", "application/offset+octet-stream");
            if ((end === Infinity || end > this._size) && !this.options.uploadLengthDeferred) {
              end = this._size;
            }
            return this._source.slice(start, end).then(function(_ref2) {
              var value = _ref2.value, done = _ref2.done;
              if (_this9.options.uploadLengthDeferred && done) {
                _this9._size = _this9._offset + (value && value.size ? value.size : 0);
                req.setHeader("Upload-Length", _this9._size);
              }
              if (value === null) {
                return _this9._sendRequest(req);
              }
              _this9._emitProgress(_this9._offset, _this9._size);
              return _this9._sendRequest(req, value);
            });
          }
        }, {
          key: "_handleUploadResponse",
          value: function _handleUploadResponse(req, res) {
            var offset = parseInt(res.getHeader("Upload-Offset"), 10);
            if (isNaN(offset)) {
              this._emitHttpError(req, res, "tus: invalid or missing offset value");
              return;
            }
            this._emitProgress(offset, this._size);
            this._emitChunkComplete(offset - this._offset, offset, this._size);
            this._offset = offset;
            if (offset == this._size) {
              this._emitSuccess();
              this._source.close();
              return;
            }
            this._performUpload();
          }
        }, {
          key: "_openRequest",
          value: function _openRequest(method, url) {
            var req = openRequest(method, url, this.options);
            this._req = req;
            return req;
          }
        }, {
          key: "_removeFromUrlStorage",
          value: function _removeFromUrlStorage() {
            var _this10 = this;
            if (!this._urlStorageKey)
              return;
            this._urlStorage.removeUpload(this._urlStorageKey)["catch"](function(err) {
              _this10._emitError(err);
            });
            this._urlStorageKey = null;
          }
        }, {
          key: "_saveUploadInUrlStorage",
          value: function _saveUploadInUrlStorage() {
            var _this11 = this;
            if (!this.options.storeFingerprintForResuming || !this._fingerprint) {
              return;
            }
            var storedUpload = {
              size: this._size,
              metadata: this.options.metadata,
              creationTime: new Date().toString()
            };
            if (this._parallelUploads) {
              storedUpload.parallelUploadUrls = this._parallelUploadUrls;
            } else {
              storedUpload.uploadUrl = this.url;
            }
            this._urlStorage.addUpload(this._fingerprint, storedUpload).then(function(urlStorageKey) {
              return _this11._urlStorageKey = urlStorageKey;
            })["catch"](function(err) {
              _this11._emitError(err);
            });
          }
        }, {
          key: "_sendRequest",
          value: function _sendRequest(req) {
            var body = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
            return sendRequest(req, body, this.options);
          }
        }], [{
          key: "terminate",
          value: function terminate(url, options) {
            if (arguments.length > 1 && typeof arguments[arguments.length - 1] === "function") {
              throw new Error("tus: the terminate function does not accept a callback since v2 anymore; please use the returned Promise instead");
            }
            if (options === void 0) {
              options = {};
            }
            var req = openRequest("DELETE", url, options);
            return sendRequest(req, null, options).then(function(res) {
              if (res.getStatus() === 204) {
                return;
              }
              throw new _error.default("tus: unexpected response while terminating upload", null, req, res);
            })["catch"](function(err) {
              if (!(err instanceof _error.default)) {
                err = new _error.default("tus: failed to terminate upload", err, req, null);
              }
              if (!shouldRetry(err, 0, options)) {
                throw err;
              }
              var delay = options.retryDelays[0];
              var remainingDelays = options.retryDelays.slice(1);
              var newOptions = _objectSpread({}, options, {
                retryDelays: remainingDelays
              });
              return new Promise(function(resolve) {
                return setTimeout(resolve, delay);
              }).then(function() {
                return BaseUpload2.terminate(url, newOptions);
              });
            });
          }
        }]);
        return BaseUpload2;
      }();
      function encodeMetadata(metadata) {
        var encoded = [];
        for (var key in metadata) {
          encoded.push("".concat(key, " ").concat(_jsBase.Base64.encode(metadata[key])));
        }
        return encoded.join(",");
      }
      function inStatusCategory(status, category) {
        return status >= category && status < category + 100;
      }
      function openRequest(method, url, options) {
        var req = options.httpStack.createRequest(method, url);
        req.setHeader("Tus-Resumable", "1.0.0");
        var headers = options.headers || {};
        for (var name in headers) {
          req.setHeader(name, headers[name]);
        }
        if (options.addRequestId) {
          var requestId = (0, _uuid.default)();
          req.setHeader("X-Request-ID", requestId);
        }
        return req;
      }
      function sendRequest(req, body, options) {
        var onBeforeRequestPromise = typeof options.onBeforeRequest === "function" ? Promise.resolve(options.onBeforeRequest(req)) : Promise.resolve();
        return onBeforeRequestPromise.then(function() {
          return req.send(body).then(function(res) {
            var onAfterResponsePromise = typeof options.onAfterResponse === "function" ? Promise.resolve(options.onAfterResponse(req, res)) : Promise.resolve();
            return onAfterResponsePromise.then(function() {
              return res;
            });
          });
        });
      }
      function isOnline() {
        var online = true;
        if (typeof window !== "undefined" && "navigator" in window && window.navigator.onLine === false) {
          online = false;
        }
        return online;
      }
      function shouldRetry(err, retryAttempt, options) {
        if (options.retryDelays == null || retryAttempt >= options.retryDelays.length || err.originalRequest == null) {
          return false;
        }
        if (options && typeof options.onShouldRetry === "function") {
          return options.onShouldRetry(err, retryAttempt, options);
        }
        var status = err.originalResponse ? err.originalResponse.getStatus() : 0;
        return (!inStatusCategory(status, 400) || status === 409 || status === 423) && isOnline();
      }
      function resolveUrl(origin, link) {
        return new _urlParse.default(link, origin).toString();
      }
      function splitSizeIntoParts(totalSize, partCount, previousUrls) {
        var partSize = Math.floor(totalSize / partCount);
        var parts = [];
        for (var i3 = 0; i3 < partCount; i3++) {
          parts.push({
            start: partSize * i3,
            end: partSize * (i3 + 1)
          });
        }
        parts[partCount - 1].end = totalSize;
        if (previousUrls) {
          parts.forEach(function(part, index) {
            part.uploadUrl = previousUrls[index] || null;
          });
        }
        return parts;
      }
      BaseUpload.defaultOptions = defaultOptions;
      var _default = BaseUpload;
      exports.default = _default;
    }
  });

  // ../node_modules/tus-js-client/lib.es5/noopUrlStorage.js
  var require_noopUrlStorage = __commonJS({
    "../node_modules/tus-js-client/lib.es5/noopUrlStorage.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i3 = 0; i3 < props.length; i3++) {
          var descriptor = props[i3];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties(Constructor, staticProps);
        return Constructor;
      }
      var NoopUrlStorage = /* @__PURE__ */ function() {
        function NoopUrlStorage2() {
          _classCallCheck(this, NoopUrlStorage2);
        }
        _createClass(NoopUrlStorage2, [{
          key: "listAllUploads",
          value: function listAllUploads() {
            return Promise.resolve([]);
          }
        }, {
          key: "findUploadsByFingerprint",
          value: function findUploadsByFingerprint(fingerprint) {
            return Promise.resolve([]);
          }
        }, {
          key: "removeUpload",
          value: function removeUpload(urlStorageKey) {
            return Promise.resolve();
          }
        }, {
          key: "addUpload",
          value: function addUpload(fingerprint, upload) {
            return Promise.resolve(null);
          }
        }]);
        return NoopUrlStorage2;
      }();
      exports.default = NoopUrlStorage;
    }
  });

  // ../node_modules/tus-js-client/lib.es5/browser/urlStorage.js
  var require_urlStorage = __commonJS({
    "../node_modules/tus-js-client/lib.es5/browser/urlStorage.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.WebStorageUrlStorage = exports.canStoreURLs = void 0;
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i3 = 0; i3 < props.length; i3++) {
          var descriptor = props[i3];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties(Constructor, staticProps);
        return Constructor;
      }
      var hasStorage = false;
      try {
        hasStorage = "localStorage" in window;
        key = "tusSupport";
        localStorage.setItem(key, localStorage.getItem(key));
      } catch (e3) {
        if (e3.code === e3.SECURITY_ERR || e3.code === e3.QUOTA_EXCEEDED_ERR) {
          hasStorage = false;
        } else {
          throw e3;
        }
      }
      var key;
      var canStoreURLs = hasStorage;
      exports.canStoreURLs = canStoreURLs;
      var WebStorageUrlStorage = /* @__PURE__ */ function() {
        function WebStorageUrlStorage2() {
          _classCallCheck(this, WebStorageUrlStorage2);
        }
        _createClass(WebStorageUrlStorage2, [{
          key: "findAllUploads",
          value: function findAllUploads() {
            var results = this._findEntries("tus::");
            return Promise.resolve(results);
          }
        }, {
          key: "findUploadsByFingerprint",
          value: function findUploadsByFingerprint(fingerprint) {
            var results = this._findEntries("tus::".concat(fingerprint, "::"));
            return Promise.resolve(results);
          }
        }, {
          key: "removeUpload",
          value: function removeUpload(urlStorageKey) {
            localStorage.removeItem(urlStorageKey);
            return Promise.resolve();
          }
        }, {
          key: "addUpload",
          value: function addUpload(fingerprint, upload) {
            var id = Math.round(Math.random() * 1e12);
            var key2 = "tus::".concat(fingerprint, "::").concat(id);
            localStorage.setItem(key2, JSON.stringify(upload));
            return Promise.resolve(key2);
          }
        }, {
          key: "_findEntries",
          value: function _findEntries(prefix) {
            var results = [];
            for (var i3 = 0; i3 < localStorage.length; i3++) {
              var _key = localStorage.key(i3);
              if (_key.indexOf(prefix) !== 0)
                continue;
              try {
                var upload = JSON.parse(localStorage.getItem(_key));
                upload.urlStorageKey = _key;
                results.push(upload);
              } catch (e3) {
              }
            }
            return results;
          }
        }]);
        return WebStorageUrlStorage2;
      }();
      exports.WebStorageUrlStorage = WebStorageUrlStorage;
    }
  });

  // ../node_modules/tus-js-client/lib.es5/browser/httpStack.js
  var require_httpStack = __commonJS({
    "../node_modules/tus-js-client/lib.es5/browser/httpStack.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i3 = 0; i3 < props.length; i3++) {
          var descriptor = props[i3];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties(Constructor, staticProps);
        return Constructor;
      }
      var XHRHttpStack = /* @__PURE__ */ function() {
        function XHRHttpStack2() {
          _classCallCheck(this, XHRHttpStack2);
        }
        _createClass(XHRHttpStack2, [{
          key: "createRequest",
          value: function createRequest(method, url) {
            return new Request(method, url);
          }
        }, {
          key: "getName",
          value: function getName() {
            return "XHRHttpStack";
          }
        }]);
        return XHRHttpStack2;
      }();
      exports.default = XHRHttpStack;
      var Request = /* @__PURE__ */ function() {
        function Request2(method, url) {
          _classCallCheck(this, Request2);
          this._xhr = new XMLHttpRequest();
          this._xhr.open(method, url, true);
          this._method = method;
          this._url = url;
          this._headers = {};
        }
        _createClass(Request2, [{
          key: "getMethod",
          value: function getMethod() {
            return this._method;
          }
        }, {
          key: "getURL",
          value: function getURL() {
            return this._url;
          }
        }, {
          key: "setHeader",
          value: function setHeader(header, value) {
            this._xhr.setRequestHeader(header, value);
            this._headers[header] = value;
          }
        }, {
          key: "getHeader",
          value: function getHeader(header) {
            return this._headers[header];
          }
        }, {
          key: "setProgressHandler",
          value: function setProgressHandler(progressHandler) {
            if (!("upload" in this._xhr)) {
              return;
            }
            this._xhr.upload.onprogress = function(e3) {
              if (!e3.lengthComputable) {
                return;
              }
              progressHandler(e3.loaded);
            };
          }
        }, {
          key: "send",
          value: function send() {
            var _this = this;
            var body = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
            return new Promise(function(resolve, reject) {
              _this._xhr.onload = function() {
                resolve(new Response(_this._xhr));
              };
              _this._xhr.onerror = function(err) {
                reject(err);
              };
              _this._xhr.send(body);
            });
          }
        }, {
          key: "abort",
          value: function abort() {
            this._xhr.abort();
            return Promise.resolve();
          }
        }, {
          key: "getUnderlyingObject",
          value: function getUnderlyingObject() {
            return this._xhr;
          }
        }]);
        return Request2;
      }();
      var Response = /* @__PURE__ */ function() {
        function Response2(xhr) {
          _classCallCheck(this, Response2);
          this._xhr = xhr;
        }
        _createClass(Response2, [{
          key: "getStatus",
          value: function getStatus() {
            return this._xhr.status;
          }
        }, {
          key: "getHeader",
          value: function getHeader(header) {
            return this._xhr.getResponseHeader(header);
          }
        }, {
          key: "getBody",
          value: function getBody() {
            return this._xhr.responseText;
          }
        }, {
          key: "getUnderlyingObject",
          value: function getUnderlyingObject() {
            return this._xhr;
          }
        }]);
        return Response2;
      }();
    }
  });

  // ../node_modules/tus-js-client/lib.es5/browser/isReactNative.js
  var require_isReactNative = __commonJS({
    "../node_modules/tus-js-client/lib.es5/browser/isReactNative.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var isReactNative = function isReactNative2() {
        return typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
      };
      var _default = isReactNative;
      exports.default = _default;
    }
  });

  // ../node_modules/tus-js-client/lib.es5/browser/uriToBlob.js
  var require_uriToBlob = __commonJS({
    "../node_modules/tus-js-client/lib.es5/browser/uriToBlob.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = uriToBlob;
      function uriToBlob(uri) {
        return new Promise(function(resolve, reject) {
          var xhr = new XMLHttpRequest();
          xhr.responseType = "blob";
          xhr.onload = function() {
            var blob = xhr.response;
            resolve(blob);
          };
          xhr.onerror = function(err) {
            reject(err);
          };
          xhr.open("GET", uri);
          xhr.send();
        });
      }
    }
  });

  // ../node_modules/tus-js-client/lib.es5/browser/isCordova.js
  var require_isCordova = __commonJS({
    "../node_modules/tus-js-client/lib.es5/browser/isCordova.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var isCordova = function isCordova2() {
        return typeof window != "undefined" && (typeof window.PhoneGap != "undefined" || typeof window.Cordova != "undefined" || typeof window.cordova != "undefined");
      };
      var _default = isCordova;
      exports.default = _default;
    }
  });

  // ../node_modules/tus-js-client/lib.es5/browser/readAsByteArray.js
  var require_readAsByteArray = __commonJS({
    "../node_modules/tus-js-client/lib.es5/browser/readAsByteArray.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = readAsByteArray;
      function readAsByteArray(chunk) {
        return new Promise(function(resolve, reject) {
          var reader = new FileReader();
          reader.onload = function() {
            var value = new Uint8Array(reader.result);
            resolve({
              value
            });
          };
          reader.onerror = function(err) {
            reject(err);
          };
          reader.readAsArrayBuffer(chunk);
        });
      }
    }
  });

  // ../node_modules/tus-js-client/lib.es5/browser/fileReader.js
  var require_fileReader = __commonJS({
    "../node_modules/tus-js-client/lib.es5/browser/fileReader.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = void 0;
      var _isReactNative = _interopRequireDefault(require_isReactNative());
      var _uriToBlob = _interopRequireDefault(require_uriToBlob());
      var _isCordova = _interopRequireDefault(require_isCordova());
      var _readAsByteArray = _interopRequireDefault(require_readAsByteArray());
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          default: obj
        };
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i3 = 0; i3 < props.length; i3++) {
          var descriptor = props[i3];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties(Constructor, staticProps);
        return Constructor;
      }
      var FileSource = /* @__PURE__ */ function() {
        function FileSource2(file) {
          _classCallCheck(this, FileSource2);
          this._file = file;
          this.size = file.size;
        }
        _createClass(FileSource2, [{
          key: "slice",
          value: function slice(start, end) {
            if ((0, _isCordova.default)()) {
              return (0, _readAsByteArray.default)(this._file.slice(start, end));
            }
            var value = this._file.slice(start, end);
            return Promise.resolve({
              value
            });
          }
        }, {
          key: "close",
          value: function close() {
          }
        }]);
        return FileSource2;
      }();
      var StreamSource = /* @__PURE__ */ function() {
        function StreamSource2(reader, chunkSize) {
          _classCallCheck(this, StreamSource2);
          this._chunkSize = chunkSize;
          this._buffer = void 0;
          this._bufferOffset = 0;
          this._reader = reader;
          this._done = false;
        }
        _createClass(StreamSource2, [{
          key: "slice",
          value: function slice(start, end) {
            if (start < this._bufferOffset) {
              return Promise.reject(new Error("Requested data is before the reader's current offset"));
            }
            return this._readUntilEnoughDataOrDone(start, end);
          }
        }, {
          key: "_readUntilEnoughDataOrDone",
          value: function _readUntilEnoughDataOrDone(start, end) {
            var _this = this;
            var hasEnoughData = end <= this._bufferOffset + len(this._buffer);
            if (this._done || hasEnoughData) {
              var value = this._getDataFromBuffer(start, end);
              var done = value == null ? this._done : false;
              return Promise.resolve({
                value,
                done
              });
            }
            return this._reader.read().then(function(_ref) {
              var value2 = _ref.value, done2 = _ref.done;
              if (done2) {
                _this._done = true;
              } else if (_this._buffer === void 0) {
                _this._buffer = value2;
              } else {
                _this._buffer = concat(_this._buffer, value2);
              }
              return _this._readUntilEnoughDataOrDone(start, end);
            });
          }
        }, {
          key: "_getDataFromBuffer",
          value: function _getDataFromBuffer(start, end) {
            if (start > this._bufferOffset) {
              this._buffer = this._buffer.slice(start - this._bufferOffset);
              this._bufferOffset = start;
            }
            var hasAllDataBeenRead = len(this._buffer) === 0;
            if (this._done && hasAllDataBeenRead) {
              return null;
            }
            return this._buffer.slice(0, end - start);
          }
        }, {
          key: "close",
          value: function close() {
            if (this._reader.cancel) {
              this._reader.cancel();
            }
          }
        }]);
        return StreamSource2;
      }();
      function len(blobOrArray) {
        if (blobOrArray === void 0)
          return 0;
        if (blobOrArray.size !== void 0)
          return blobOrArray.size;
        return blobOrArray.length;
      }
      function concat(a3, b3) {
        if (a3.concat) {
          return a3.concat(b3);
        }
        if (a3 instanceof Blob) {
          return new Blob([a3, b3], {
            type: a3.type
          });
        }
        if (a3.set) {
          var c3 = new a3.constructor(a3.length + b3.length);
          c3.set(a3);
          c3.set(b3, a3.length);
          return c3;
        }
        throw new Error("Unknown data type");
      }
      var FileReader2 = /* @__PURE__ */ function() {
        function FileReader3() {
          _classCallCheck(this, FileReader3);
        }
        _createClass(FileReader3, [{
          key: "openFile",
          value: function openFile(input, chunkSize) {
            if ((0, _isReactNative.default)() && input && typeof input.uri !== "undefined") {
              return (0, _uriToBlob.default)(input.uri).then(function(blob) {
                return new FileSource(blob);
              })["catch"](function(err) {
                throw new Error("tus: cannot fetch `file.uri` as Blob, make sure the uri is correct and accessible. ".concat(err));
              });
            }
            if (typeof input.slice === "function" && typeof input.size !== "undefined") {
              return Promise.resolve(new FileSource(input));
            }
            if (typeof input.read === "function") {
              chunkSize = +chunkSize;
              if (!isFinite(chunkSize)) {
                return Promise.reject(new Error("cannot create source for stream without a finite value for the `chunkSize` option"));
              }
              return Promise.resolve(new StreamSource(input, chunkSize));
            }
            return Promise.reject(new Error("source object may only be an instance of File, Blob, or Reader in this environment"));
          }
        }]);
        return FileReader3;
      }();
      exports.default = FileReader2;
    }
  });

  // ../node_modules/tus-js-client/lib.es5/browser/fingerprint.js
  var require_fingerprint = __commonJS({
    "../node_modules/tus-js-client/lib.es5/browser/fingerprint.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.default = fingerprint;
      var _isReactNative = _interopRequireDefault(require_isReactNative());
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          default: obj
        };
      }
      function fingerprint(file, options) {
        if ((0, _isReactNative.default)()) {
          return Promise.resolve(reactNativeFingerprint(file, options));
        }
        return Promise.resolve(["tus-br", file.name, file.type, file.size, file.lastModified, options.endpoint].join("-"));
      }
      function reactNativeFingerprint(file, options) {
        var exifHash = file.exif ? hashCode(JSON.stringify(file.exif)) : "noexif";
        return ["tus-rn", file.name || "noname", file.size || "nosize", exifHash, options.endpoint].join("/");
      }
      function hashCode(str) {
        var hash = 0;
        if (str.length === 0) {
          return hash;
        }
        for (var i3 = 0; i3 < str.length; i3++) {
          var _char = str.charCodeAt(i3);
          hash = (hash << 5) - hash + _char;
          hash &= hash;
        }
        return hash;
      }
    }
  });

  // ../node_modules/tus-js-client/lib.es5/browser/index.js
  var require_browser = __commonJS({
    "../node_modules/tus-js-client/lib.es5/browser/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      Object.defineProperty(exports, "enableDebugLog", {
        enumerable: true,
        get: function() {
          return _logger.enableDebugLog;
        }
      });
      Object.defineProperty(exports, "canStoreURLs", {
        enumerable: true,
        get: function() {
          return _urlStorage.canStoreURLs;
        }
      });
      Object.defineProperty(exports, "HttpStack", {
        enumerable: true,
        get: function() {
          return _httpStack.default;
        }
      });
      exports.isSupported = exports.defaultOptions = exports.Upload = void 0;
      var _upload = _interopRequireDefault(require_upload());
      var _noopUrlStorage = _interopRequireDefault(require_noopUrlStorage());
      var _logger = require_logger();
      var _urlStorage = require_urlStorage();
      var _httpStack = _interopRequireDefault(require_httpStack());
      var _fileReader = _interopRequireDefault(require_fileReader());
      var _fingerprint = _interopRequireDefault(require_fingerprint());
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          default: obj
        };
      }
      function _typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = function _typeof2(obj2) {
            return typeof obj2;
          };
        } else {
          _typeof = function _typeof2(obj2) {
            return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
          };
        }
        return _typeof(obj);
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i3 = 0; i3 < props.length; i3++) {
          var descriptor = props[i3];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties(Constructor, staticProps);
        return Constructor;
      }
      function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            writable: true,
            configurable: true
          }
        });
        if (superClass)
          _setPrototypeOf(subClass, superClass);
      }
      function _setPrototypeOf(o3, p3) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o4, p4) {
          o4.__proto__ = p4;
          return o4;
        };
        return _setPrototypeOf(o3, p3);
      }
      function _createSuper(Derived) {
        return function() {
          var Super = _getPrototypeOf(Derived), result;
          if (_isNativeReflectConstruct()) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
          } else {
            result = Super.apply(this, arguments);
          }
          return _possibleConstructorReturn(this, result);
        };
      }
      function _possibleConstructorReturn(self2, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
          return call;
        }
        return _assertThisInitialized(self2);
      }
      function _assertThisInitialized(self2) {
        if (self2 === void 0) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self2;
      }
      function _isNativeReflectConstruct() {
        if (typeof Reflect === "undefined" || !Reflect.construct)
          return false;
        if (Reflect.construct.sham)
          return false;
        if (typeof Proxy === "function")
          return true;
        try {
          Date.prototype.toString.call(Reflect.construct(Date, [], function() {
          }));
          return true;
        } catch (e3) {
          return false;
        }
      }
      function _getPrototypeOf(o3) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o4) {
          return o4.__proto__ || Object.getPrototypeOf(o4);
        };
        return _getPrototypeOf(o3);
      }
      function ownKeys(object, enumerableOnly) {
        var keys = Object.keys(object);
        if (Object.getOwnPropertySymbols) {
          var symbols = Object.getOwnPropertySymbols(object);
          if (enumerableOnly)
            symbols = symbols.filter(function(sym) {
              return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
          keys.push.apply(keys, symbols);
        }
        return keys;
      }
      function _objectSpread(target) {
        for (var i3 = 1; i3 < arguments.length; i3++) {
          var source = arguments[i3] != null ? arguments[i3] : {};
          if (i3 % 2) {
            ownKeys(Object(source), true).forEach(function(key) {
              _defineProperty(target, key, source[key]);
            });
          } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
          } else {
            ownKeys(Object(source)).forEach(function(key) {
              Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            });
          }
        }
        return target;
      }
      function _defineProperty(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          obj[key] = value;
        }
        return obj;
      }
      var defaultOptions = _objectSpread({}, _upload.default.defaultOptions, {
        httpStack: new _httpStack.default(),
        fileReader: new _fileReader.default(),
        urlStorage: _urlStorage.canStoreURLs ? new _urlStorage.WebStorageUrlStorage() : new _noopUrlStorage.default(),
        fingerprint: _fingerprint.default
      });
      exports.defaultOptions = defaultOptions;
      var Upload = /* @__PURE__ */ function(_BaseUpload) {
        _inherits(Upload2, _BaseUpload);
        var _super = _createSuper(Upload2);
        function Upload2() {
          var file = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
          var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          _classCallCheck(this, Upload2);
          options = _objectSpread({}, defaultOptions, {}, options);
          return _super.call(this, file, options);
        }
        _createClass(Upload2, null, [{
          key: "terminate",
          value: function terminate(url, options, cb) {
            options = _objectSpread({}, defaultOptions, {}, options);
            return _upload.default.terminate(url, options, cb);
          }
        }]);
        return Upload2;
      }(_upload.default);
      exports.Upload = Upload;
      var _window = window;
      var XMLHttpRequest2 = _window.XMLHttpRequest;
      var Blob2 = _window.Blob;
      var isSupported = XMLHttpRequest2 && Blob2 && typeof Blob2.prototype.slice === "function";
      exports.isSupported = isSupported;
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
              for (let i3 = _classPrivateFieldLooseBase(this, _downLimit)[_downLimit]; i3 <= this.limit; i3++) {
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
          for (let i3 = 0; i3 < this.limit; i3++) {
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

  // ../packages/@uppy/tus/lib/getFingerprint.js
  var require_getFingerprint = __commonJS({
    "../packages/@uppy/tus/lib/getFingerprint.js"(exports, module) {
      var tus = require_browser();
      function isCordova() {
        return typeof window !== "undefined" && (typeof window.PhoneGap !== "undefined" || typeof window.Cordova !== "undefined" || typeof window.cordova !== "undefined");
      }
      function isReactNative() {
        return typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
      }
      module.exports = function getFingerprint(uppyFileObj) {
        return (file, options) => {
          if (isCordova() || isReactNative()) {
            return tus.defaultOptions.fingerprint(file, options);
          }
          const uppyFingerprint = ["tus", uppyFileObj.id, options.endpoint].join("-");
          return Promise.resolve(uppyFingerprint);
        };
      };
    }
  });

  // ../packages/@uppy/tus/lib/index.js
  var require_lib22 = __commonJS({
    "../packages/@uppy/tus/lib/index.js"(exports, module) {
      var _class;
      var _retryDelayIterator;
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
      var BasePlugin = require_BasePlugin();
      var tus = require_browser();
      var {
        Provider,
        RequestClient,
        Socket
      } = require_lib7();
      var emitSocketProgress = require_emitSocketProgress();
      var getSocketHost = require_getSocketHost();
      var settle = require_settle();
      var EventTracker = require_EventTracker();
      var NetworkError = require_NetworkError();
      var isNetworkError = require_isNetworkError();
      var {
        RateLimitedQueue
      } = require_RateLimitedQueue();
      var hasProperty = require_hasProperty();
      var getFingerprint = require_getFingerprint();
      var tusDefaultOptions = {
        endpoint: "",
        uploadUrl: null,
        metadata: {},
        uploadSize: null,
        onProgress: null,
        onChunkComplete: null,
        onSuccess: null,
        onError: null,
        overridePatchMethod: false,
        headers: {},
        addRequestId: false,
        chunkSize: Infinity,
        retryDelays: [100, 1e3, 3e3, 5e3],
        parallelUploads: 1,
        removeFingerprintOnSuccess: false,
        uploadLengthDeferred: false,
        uploadDataDuringCreation: false
      };
      module.exports = (_temp = (_retryDelayIterator = /* @__PURE__ */ _classPrivateFieldLooseKey("retryDelayIterator"), _class = class Tus extends BasePlugin {
        constructor(uppy, opts) {
          var _this$opts$retryDelay;
          super(uppy, opts);
          Object.defineProperty(this, _retryDelayIterator, {
            writable: true,
            value: void 0
          });
          this.type = "uploader";
          this.id = this.opts.id || "Tus";
          this.title = "Tus";
          const defaultOptions = {
            useFastRemoteRetry: true,
            limit: 20,
            retryDelays: tusDefaultOptions.retryDelays,
            withCredentials: false
          };
          this.opts = {
            ...defaultOptions,
            ...opts
          };
          if ("autoRetry" in opts) {
            throw new Error("The `autoRetry` option was deprecated and has been removed.");
          }
          this.requests = new RateLimitedQueue(this.opts.limit);
          _classPrivateFieldLooseBase(this, _retryDelayIterator)[_retryDelayIterator] = (_this$opts$retryDelay = this.opts.retryDelays) == null ? void 0 : _this$opts$retryDelay.values();
          this.uploaders = Object.create(null);
          this.uploaderEvents = Object.create(null);
          this.uploaderSockets = Object.create(null);
          this.handleResetProgress = this.handleResetProgress.bind(this);
          this.handleUpload = this.handleUpload.bind(this);
        }
        handleResetProgress() {
          const files = {
            ...this.uppy.getState().files
          };
          Object.keys(files).forEach((fileID) => {
            if (files[fileID].tus && files[fileID].tus.uploadUrl) {
              const tusState = {
                ...files[fileID].tus
              };
              delete tusState.uploadUrl;
              files[fileID] = {
                ...files[fileID],
                tus: tusState
              };
            }
          });
          this.uppy.setState({
            files
          });
        }
        resetUploaderReferences(fileID, opts) {
          if (opts === void 0) {
            opts = {};
          }
          if (this.uploaders[fileID]) {
            const uploader = this.uploaders[fileID];
            uploader.abort();
            if (opts.abort) {
              uploader.abort(true);
            }
            this.uploaders[fileID] = null;
          }
          if (this.uploaderEvents[fileID]) {
            this.uploaderEvents[fileID].remove();
            this.uploaderEvents[fileID] = null;
          }
          if (this.uploaderSockets[fileID]) {
            this.uploaderSockets[fileID].close();
            this.uploaderSockets[fileID] = null;
          }
        }
        upload(file) {
          var _this = this;
          this.resetUploaderReferences(file.id);
          return new Promise((resolve, reject) => {
            let queuedRequest;
            let qRequest;
            this.uppy.emit("upload-started", file);
            const opts = {
              ...this.opts,
              ...file.tus || {}
            };
            if (typeof opts.headers === "function") {
              opts.headers = opts.headers(file);
            }
            const uploadOptions = {
              ...tusDefaultOptions,
              ...opts
            };
            uploadOptions.fingerprint = getFingerprint(file);
            uploadOptions.onBeforeRequest = (req) => {
              const xhr = req.getUnderlyingObject();
              xhr.withCredentials = !!opts.withCredentials;
              if (typeof opts.onBeforeRequest === "function") {
                opts.onBeforeRequest(req);
              }
              if (hasProperty(queuedRequest, "shouldBeRequeued")) {
                if (!queuedRequest.shouldBeRequeued)
                  return Promise.reject();
                let done;
                const p3 = new Promise((res) => {
                  done = res;
                });
                queuedRequest = this.requests.run(() => {
                  if (file.isPaused) {
                    queuedRequest.abort();
                  }
                  done();
                  return () => {
                  };
                });
                return p3;
              }
              return void 0;
            };
            uploadOptions.onError = (err) => {
              this.uppy.log(err);
              const xhr = err.originalRequest ? err.originalRequest.getUnderlyingObject() : null;
              if (isNetworkError(xhr)) {
                err = new NetworkError(err, xhr);
              }
              this.resetUploaderReferences(file.id);
              queuedRequest.abort();
              this.uppy.emit("upload-error", file, err);
              reject(err);
            };
            uploadOptions.onProgress = (bytesUploaded, bytesTotal) => {
              this.onReceiveUploadUrl(file, upload.url);
              this.uppy.emit("upload-progress", file, {
                uploader: this,
                bytesUploaded,
                bytesTotal
              });
            };
            uploadOptions.onSuccess = () => {
              const uploadResp = {
                uploadURL: upload.url
              };
              this.resetUploaderReferences(file.id);
              queuedRequest.done();
              this.uppy.emit("upload-success", file, uploadResp);
              if (upload.url) {
                this.uppy.log(`Download ${upload.file.name} from ${upload.url}`);
              }
              resolve(upload);
            };
            uploadOptions.onShouldRetry = (err) => {
              var _err$originalResponse;
              const status = err == null ? void 0 : (_err$originalResponse = err.originalResponse) == null ? void 0 : _err$originalResponse.getStatus();
              if (status === 429) {
                if (!this.requests.isPaused) {
                  var _classPrivateFieldLoo;
                  const next = (_classPrivateFieldLoo = _classPrivateFieldLooseBase(this, _retryDelayIterator)[_retryDelayIterator]) == null ? void 0 : _classPrivateFieldLoo.next();
                  if (next == null || next.done) {
                    return false;
                  }
                  this.requests.rateLimit(next.value);
                }
              } else if (status > 400 && status < 500 && status !== 409) {
                return false;
              } else if (typeof navigator !== "undefined" && navigator.onLine === false) {
                if (!this.requests.isPaused) {
                  this.requests.pause();
                  window.addEventListener("online", () => {
                    this.requests.resume();
                  }, {
                    once: true
                  });
                }
              }
              queuedRequest.abort();
              queuedRequest = {
                shouldBeRequeued: true,
                abort() {
                  this.shouldBeRequeued = false;
                },
                done() {
                  throw new Error("Cannot mark a queued request as done: this indicates a bug");
                },
                fn() {
                  throw new Error("Cannot run a queued request: this indicates a bug");
                }
              };
              return true;
            };
            const copyProp = (obj, srcProp, destProp) => {
              if (hasProperty(obj, srcProp) && !hasProperty(obj, destProp)) {
                obj[destProp] = obj[srcProp];
              }
            };
            const meta = {};
            const metaFields = Array.isArray(opts.metaFields) ? opts.metaFields : Object.keys(file.meta);
            metaFields.forEach((item) => {
              meta[item] = file.meta[item];
            });
            copyProp(meta, "type", "filetype");
            copyProp(meta, "name", "filename");
            uploadOptions.metadata = meta;
            const upload = new tus.Upload(file.data, uploadOptions);
            this.uploaders[file.id] = upload;
            this.uploaderEvents[file.id] = new EventTracker(this.uppy);
            qRequest = () => {
              if (!file.isPaused) {
                upload.start();
              }
              return () => {
              };
            };
            upload.findPreviousUploads().then((previousUploads) => {
              const previousUpload = previousUploads[0];
              if (previousUpload) {
                this.uppy.log(`[Tus] Resuming upload of ${file.id} started at ${previousUpload.creationTime}`);
                upload.resumeFromPreviousUpload(previousUpload);
              }
            });
            queuedRequest = this.requests.run(qRequest);
            this.onFileRemove(file.id, (targetFileID) => {
              queuedRequest.abort();
              this.resetUploaderReferences(file.id, {
                abort: !!upload.url
              });
              resolve(`upload ${targetFileID} was removed`);
            });
            this.onPause(file.id, (isPaused) => {
              queuedRequest.abort();
              if (isPaused) {
                upload.abort();
              } else {
                queuedRequest = this.requests.run(qRequest);
              }
            });
            this.onPauseAll(file.id, () => {
              queuedRequest.abort();
              upload.abort();
            });
            this.onCancelAll(file.id, function(_temp2) {
              let {
                reason
              } = _temp2 === void 0 ? {} : _temp2;
              if (reason === "user") {
                queuedRequest.abort();
                _this.resetUploaderReferences(file.id, {
                  abort: !!upload.url
                });
              }
              resolve(`upload ${file.id} was canceled`);
            });
            this.onResumeAll(file.id, () => {
              queuedRequest.abort();
              if (file.error) {
                upload.abort();
              }
              queuedRequest = this.requests.run(qRequest);
            });
          }).catch((err) => {
            this.uppy.emit("upload-error", file, err);
            throw err;
          });
        }
        uploadRemote(file) {
          this.resetUploaderReferences(file.id);
          const opts = {
            ...this.opts
          };
          if (file.tus) {
            Object.assign(opts, file.tus);
          }
          this.uppy.emit("upload-started", file);
          this.uppy.log(file.remote.url);
          if (file.serverToken) {
            return this.connectToServerSocket(file);
          }
          return new Promise((resolve, reject) => {
            const Client = file.remote.providerOptions.provider ? Provider : RequestClient;
            const client = new Client(this.uppy, file.remote.providerOptions);
            client.post(file.remote.url, {
              ...file.remote.body,
              endpoint: opts.endpoint,
              uploadUrl: opts.uploadUrl,
              protocol: "tus",
              size: file.data.size,
              headers: opts.headers,
              metadata: file.meta
            }).then((res) => {
              this.uppy.setFileState(file.id, {
                serverToken: res.token
              });
              file = this.uppy.getFile(file.id);
              return this.connectToServerSocket(file);
            }).then(() => {
              resolve();
            }).catch((err) => {
              this.uppy.emit("upload-error", file, err);
              reject(err);
            });
          });
        }
        connectToServerSocket(file) {
          var _this2 = this;
          return new Promise((resolve, reject) => {
            const token = file.serverToken;
            const host = getSocketHost(file.remote.companionUrl);
            const socket = new Socket({
              target: `${host}/api/${token}`,
              autoOpen: false
            });
            this.uploaderSockets[file.id] = socket;
            this.uploaderEvents[file.id] = new EventTracker(this.uppy);
            let queuedRequest;
            this.onFileRemove(file.id, () => {
              queuedRequest.abort();
              socket.send("cancel", {});
              this.resetUploaderReferences(file.id);
              resolve(`upload ${file.id} was removed`);
            });
            this.onPause(file.id, (isPaused) => {
              if (isPaused) {
                queuedRequest.abort();
                socket.send("pause", {});
              } else {
                queuedRequest.abort();
                queuedRequest = this.requests.run(() => {
                  socket.send("resume", {});
                  return () => {
                  };
                });
              }
            });
            this.onPauseAll(file.id, () => {
              queuedRequest.abort();
              socket.send("pause", {});
            });
            this.onCancelAll(file.id, function(_temp3) {
              let {
                reason
              } = _temp3 === void 0 ? {} : _temp3;
              if (reason === "user") {
                queuedRequest.abort();
                socket.send("cancel", {});
                _this2.resetUploaderReferences(file.id);
              }
              resolve(`upload ${file.id} was canceled`);
            });
            this.onResumeAll(file.id, () => {
              queuedRequest.abort();
              if (file.error) {
                socket.send("pause", {});
              }
              queuedRequest = this.requests.run(() => {
                socket.send("resume", {});
                return () => {
                };
              });
            });
            this.onRetry(file.id, () => {
              if (socket.isOpen) {
                socket.send("pause", {});
                socket.send("resume", {});
              }
            });
            this.onRetryAll(file.id, () => {
              if (socket.isOpen) {
                socket.send("pause", {});
                socket.send("resume", {});
              }
            });
            socket.on("progress", (progressData) => emitSocketProgress(this, progressData, file));
            socket.on("error", (errData) => {
              const {
                message
              } = errData.error;
              const error = Object.assign(new Error(message), {
                cause: errData.error
              });
              if (!this.opts.useFastRemoteRetry) {
                this.resetUploaderReferences(file.id);
                this.uppy.setFileState(file.id, {
                  serverToken: null
                });
              } else {
                socket.close();
              }
              this.uppy.emit("upload-error", file, error);
              queuedRequest.done();
              reject(error);
            });
            socket.on("success", (data) => {
              const uploadResp = {
                uploadURL: data.url
              };
              this.uppy.emit("upload-success", file, uploadResp);
              this.resetUploaderReferences(file.id);
              queuedRequest.done();
              resolve();
            });
            queuedRequest = this.requests.run(() => {
              socket.open();
              if (file.isPaused) {
                socket.send("pause", {});
              }
              return () => {
              };
            });
          });
        }
        onReceiveUploadUrl(file, uploadURL) {
          const currentFile = this.uppy.getFile(file.id);
          if (!currentFile)
            return;
          if (!currentFile.tus || currentFile.tus.uploadUrl !== uploadURL) {
            this.uppy.log("[Tus] Storing upload url");
            this.uppy.setFileState(currentFile.id, {
              tus: {
                ...currentFile.tus,
                uploadUrl: uploadURL
              }
            });
          }
        }
        onFileRemove(fileID, cb) {
          this.uploaderEvents[fileID].on("file-removed", (file) => {
            if (fileID === file.id)
              cb(file.id);
          });
        }
        onPause(fileID, cb) {
          this.uploaderEvents[fileID].on("upload-pause", (targetFileID, isPaused) => {
            if (fileID === targetFileID) {
              cb(isPaused);
            }
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
        onPauseAll(fileID, cb) {
          this.uploaderEvents[fileID].on("pause-all", () => {
            if (!this.uppy.getFile(fileID))
              return;
            cb();
          });
        }
        onCancelAll(fileID, eventHandler) {
          var _this3 = this;
          this.uploaderEvents[fileID].on("cancel-all", function() {
            if (!_this3.uppy.getFile(fileID))
              return;
            eventHandler(...arguments);
          });
        }
        onResumeAll(fileID, cb) {
          this.uploaderEvents[fileID].on("resume-all", () => {
            if (!this.uppy.getFile(fileID))
              return;
            cb();
          });
        }
        uploadFiles(files) {
          const promises = files.map((file, i3) => {
            const current = i3 + 1;
            const total = files.length;
            if ("error" in file && file.error) {
              return Promise.reject(new Error(file.error));
            }
            if (file.isRemote) {
              if (!file.progress.uploadStarted || !file.isRestored) {
                this.uppy.emit("upload-started", file);
              }
              return this.uploadRemote(file, current, total);
            }
            if (!file.progress.uploadStarted || !file.isRestored) {
              this.uppy.emit("upload-started", file);
            }
            return this.upload(file, current, total);
          });
          return settle(promises);
        }
        handleUpload(fileIDs) {
          if (fileIDs.length === 0) {
            this.uppy.log("[Tus] No files to upload");
            return Promise.resolve();
          }
          if (this.opts.limit === 0) {
            this.uppy.log("[Tus] When uploading multiple files at once, consider setting the `limit` option (to `10` for example), to limit the number of concurrent uploads, which helps prevent memory and network issues: https://uppy.io/docs/tus/#limit-0", "warning");
          }
          this.uppy.log("[Tus] Uploading...");
          const filesToUpload = fileIDs.map((fileID) => this.uppy.getFile(fileID));
          return this.uploadFiles(filesToUpload).then(() => null);
        }
        install() {
          this.uppy.setState({
            capabilities: {
              ...this.uppy.getState().capabilities,
              resumableUploads: true
            }
          });
          this.uppy.addUploader(this.handleUpload);
          this.uppy.on("reset-progress", this.handleResetProgress);
        }
        uninstall() {
          this.uppy.setState({
            capabilities: {
              ...this.uppy.getState().capabilities,
              resumableUploads: false
            }
          });
          this.uppy.removeUploader(this.handleUpload);
        }
      }), _class.VERSION = "2.2.2", _temp);
    }
  });

  // ../packages/@uppy/drop-target/lib/index.js
  var require_lib23 = __commonJS({
    "../packages/@uppy/drop-target/lib/index.js"(exports, module) {
      "use strict";
      var BasePlugin = require_BasePlugin();
      var getDroppedFiles = require_getDroppedFiles();
      var toArray = require_toArray();
      var packageJson = {
        "version": "1.1.3"
      };
      function isFileTransfer(event) {
        var _event$dataTransfer$t, _event$dataTransfer$t2;
        return (_event$dataTransfer$t = (_event$dataTransfer$t2 = event.dataTransfer.types) == null ? void 0 : _event$dataTransfer$t2.some((type) => type === "Files")) != null ? _event$dataTransfer$t : false;
      }
      var DropTarget2 = class extends BasePlugin {
        constructor(uppy, opts) {
          super(uppy, opts);
          this.addFiles = (files) => {
            const descriptors = files.map((file) => ({
              source: this.id,
              name: file.name,
              type: file.type,
              data: file,
              meta: {
                relativePath: file.relativePath || null
              }
            }));
            try {
              this.uppy.addFiles(descriptors);
            } catch (err) {
              this.uppy.log(err);
            }
          };
          this.isFileTransfer = isFileTransfer;
          this.handleDrop = async (event) => {
            var _this$opts$onDrop, _this$opts;
            if (!this.isFileTransfer(event)) {
              return;
            }
            event.preventDefault();
            event.stopPropagation();
            clearTimeout(this.removeDragOverClassTimeout);
            event.currentTarget.classList.remove("uppy-is-drag-over");
            this.setPluginState({
              isDraggingOver: false
            });
            this.uppy.iteratePlugins((plugin) => {
              if (plugin.type === "acquirer") {
                plugin.handleRootDrop == null ? void 0 : plugin.handleRootDrop(event);
              }
            });
            let executedDropErrorOnce = false;
            const logDropError = (error) => {
              this.uppy.log(error, "error");
              if (!executedDropErrorOnce) {
                this.uppy.info(error.message, "error");
                executedDropErrorOnce = true;
              }
            };
            const files = await getDroppedFiles(event.dataTransfer, {
              logDropError
            });
            if (files.length > 0) {
              this.uppy.log("[DropTarget] Files were dropped");
              this.addFiles(files);
            }
            (_this$opts$onDrop = (_this$opts = this.opts).onDrop) == null ? void 0 : _this$opts$onDrop.call(_this$opts, event);
          };
          this.handleDragOver = (event) => {
            var _this$opts$onDragOver, _this$opts2;
            if (!this.isFileTransfer(event)) {
              return;
            }
            event.preventDefault();
            event.stopPropagation();
            event.dataTransfer.dropEffect = "copy";
            clearTimeout(this.removeDragOverClassTimeout);
            event.currentTarget.classList.add("uppy-is-drag-over");
            this.setPluginState({
              isDraggingOver: true
            });
            (_this$opts$onDragOver = (_this$opts2 = this.opts).onDragOver) == null ? void 0 : _this$opts$onDragOver.call(_this$opts2, event);
          };
          this.handleDragLeave = (event) => {
            var _this$opts$onDragLeav, _this$opts3;
            if (!this.isFileTransfer(event)) {
              return;
            }
            event.preventDefault();
            event.stopPropagation();
            const {
              currentTarget
            } = event;
            clearTimeout(this.removeDragOverClassTimeout);
            this.removeDragOverClassTimeout = setTimeout(() => {
              currentTarget.classList.remove("uppy-is-drag-over");
              this.setPluginState({
                isDraggingOver: false
              });
            }, 50);
            (_this$opts$onDragLeav = (_this$opts3 = this.opts).onDragLeave) == null ? void 0 : _this$opts$onDragLeav.call(_this$opts3, event);
          };
          this.addListeners = () => {
            const {
              target
            } = this.opts;
            if (target instanceof Element) {
              this.nodes = [target];
            } else if (typeof target === "string") {
              this.nodes = toArray(document.querySelectorAll(target));
            }
            if (!this.nodes && !this.nodes.length > 0) {
              throw new Error(`"${target}" does not match any HTML elements`);
            }
            this.nodes.forEach((node) => {
              node.addEventListener("dragover", this.handleDragOver, false);
              node.addEventListener("dragleave", this.handleDragLeave, false);
              node.addEventListener("drop", this.handleDrop, false);
            });
          };
          this.removeListeners = () => {
            if (this.nodes) {
              this.nodes.forEach((node) => {
                node.removeEventListener("dragover", this.handleDragOver, false);
                node.removeEventListener("dragleave", this.handleDragLeave, false);
                node.removeEventListener("drop", this.handleDrop, false);
              });
            }
          };
          this.type = "acquirer";
          this.id = this.opts.id || "DropTarget";
          this.title = "Drop Target";
          const defaultOpts = {
            target: null
          };
          this.opts = {
            ...defaultOpts,
            ...opts
          };
          this.removeDragOverClassTimeout = null;
        }
        install() {
          this.setPluginState({
            isDraggingOver: false
          });
          this.addListeners();
        }
        uninstall() {
          this.removeListeners();
        }
      };
      DropTarget2.VERSION = packageJson.version;
      module.exports = DropTarget2;
    }
  });

  // ../packages/@uppy/golden-retriever/lib/ServiceWorkerStore.js
  var require_ServiceWorkerStore = __commonJS({
    "../packages/@uppy/golden-retriever/lib/ServiceWorkerStore.js"(exports, module) {
      var isSupported = typeof navigator !== "undefined" && "serviceWorker" in navigator;
      function waitForServiceWorker() {
        return new Promise((resolve, reject) => {
          if (!isSupported) {
            reject(new Error("Unsupported"));
          } else if (navigator.serviceWorker.controller) {
            resolve();
          } else {
            navigator.serviceWorker.addEventListener("controllerchange", () => {
              resolve();
            });
          }
        });
      }
      var ServiceWorkerStore = class {
        constructor(opts) {
          this.ready = waitForServiceWorker();
          this.name = opts.storeName;
        }
        list() {
          const defer = {};
          const promise = new Promise((resolve, reject) => {
            defer.resolve = resolve;
            defer.reject = reject;
          });
          console.log("Loading stored blobs from Service Worker");
          const onMessage = (event) => {
            if (event.data.store !== this.name) {
              return;
            }
            switch (event.data.type) {
              case "uppy/ALL_FILES":
                defer.resolve(event.data.files);
                navigator.serviceWorker.removeEventListener("message", onMessage);
                break;
              default:
                defer.reject();
            }
          };
          this.ready.then(() => {
            navigator.serviceWorker.addEventListener("message", onMessage);
            navigator.serviceWorker.controller.postMessage({
              type: "uppy/GET_FILES",
              store: this.name
            });
          });
          return promise;
        }
        put(file) {
          return this.ready.then(() => {
            navigator.serviceWorker.controller.postMessage({
              type: "uppy/ADD_FILE",
              store: this.name,
              file
            });
          });
        }
        delete(fileID) {
          return this.ready.then(() => {
            navigator.serviceWorker.controller.postMessage({
              type: "uppy/REMOVE_FILE",
              store: this.name,
              fileID
            });
          });
        }
      };
      ServiceWorkerStore.isSupported = isSupported;
      module.exports = ServiceWorkerStore;
    }
  });

  // ../packages/@uppy/golden-retriever/lib/IndexedDBStore.js
  var require_IndexedDBStore = __commonJS({
    "../packages/@uppy/golden-retriever/lib/IndexedDBStore.js"(exports, module) {
      var indexedDB = typeof window !== "undefined" && (window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB);
      var isSupported = !!indexedDB;
      var DB_NAME = "uppy-blobs";
      var STORE_NAME = "files";
      var DEFAULT_EXPIRY = 24 * 60 * 60 * 1e3;
      var DB_VERSION = 3;
      function migrateExpiration(store) {
        const request = store.openCursor();
        request.onsuccess = (event) => {
          const cursor = event.target.result;
          if (!cursor) {
            return;
          }
          const entry = cursor.value;
          entry.expires = Date.now() + DEFAULT_EXPIRY;
          cursor.update(entry);
        };
      }
      function connect(dbName) {
        const request = indexedDB.open(dbName, DB_VERSION);
        return new Promise((resolve, reject) => {
          request.onupgradeneeded = (event) => {
            const db = event.target.result;
            const {
              transaction
            } = event.currentTarget;
            if (event.oldVersion < 2) {
              const store = db.createObjectStore(STORE_NAME, {
                keyPath: "id"
              });
              store.createIndex("store", "store", {
                unique: false
              });
            }
            if (event.oldVersion < 3) {
              const store = transaction.objectStore(STORE_NAME);
              store.createIndex("expires", "expires", {
                unique: false
              });
              migrateExpiration(store);
            }
            transaction.oncomplete = () => {
              resolve(db);
            };
          };
          request.onsuccess = (event) => {
            resolve(event.target.result);
          };
          request.onerror = reject;
        });
      }
      function waitForRequest(request) {
        return new Promise((resolve, reject) => {
          request.onsuccess = (event) => {
            resolve(event.target.result);
          };
          request.onerror = reject;
        });
      }
      var cleanedUp = false;
      var IndexedDBStore = class {
        constructor(opts) {
          this.opts = {
            dbName: DB_NAME,
            storeName: "default",
            expires: DEFAULT_EXPIRY,
            maxFileSize: 10 * 1024 * 1024,
            maxTotalSize: 300 * 1024 * 1024,
            ...opts
          };
          this.name = this.opts.storeName;
          const createConnection = () => {
            return connect(this.opts.dbName);
          };
          if (!cleanedUp) {
            cleanedUp = true;
            this.ready = IndexedDBStore.cleanup().then(createConnection, createConnection);
          } else {
            this.ready = createConnection();
          }
        }
        key(fileID) {
          return `${this.name}!${fileID}`;
        }
        list() {
          return this.ready.then((db) => {
            const transaction = db.transaction([STORE_NAME], "readonly");
            const store = transaction.objectStore(STORE_NAME);
            const request = store.index("store").getAll(IDBKeyRange.only(this.name));
            return waitForRequest(request);
          }).then((files) => {
            const result = {};
            files.forEach((file) => {
              result[file.fileID] = file.data;
            });
            return result;
          });
        }
        get(fileID) {
          return this.ready.then((db) => {
            const transaction = db.transaction([STORE_NAME], "readonly");
            const request = transaction.objectStore(STORE_NAME).get(this.key(fileID));
            return waitForRequest(request);
          }).then((result) => ({
            id: result.data.fileID,
            data: result.data.data
          }));
        }
        getSize() {
          return this.ready.then((db) => {
            const transaction = db.transaction([STORE_NAME], "readonly");
            const store = transaction.objectStore(STORE_NAME);
            const request = store.index("store").openCursor(IDBKeyRange.only(this.name));
            return new Promise((resolve, reject) => {
              let size = 0;
              request.onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                  size += cursor.value.data.size;
                  cursor.continue();
                } else {
                  resolve(size);
                }
              };
              request.onerror = () => {
                reject(new Error("Could not retrieve stored blobs size"));
              };
            });
          });
        }
        put(file) {
          if (file.data.size > this.opts.maxFileSize) {
            return Promise.reject(new Error("File is too big to store."));
          }
          return this.getSize().then((size) => {
            if (size > this.opts.maxTotalSize) {
              return Promise.reject(new Error("No space left"));
            }
            return this.ready;
          }).then((db) => {
            const transaction = db.transaction([STORE_NAME], "readwrite");
            const request = transaction.objectStore(STORE_NAME).add({
              id: this.key(file.id),
              fileID: file.id,
              store: this.name,
              expires: Date.now() + this.opts.expires,
              data: file.data
            });
            return waitForRequest(request);
          });
        }
        delete(fileID) {
          return this.ready.then((db) => {
            const transaction = db.transaction([STORE_NAME], "readwrite");
            const request = transaction.objectStore(STORE_NAME).delete(this.key(fileID));
            return waitForRequest(request);
          });
        }
        static cleanup() {
          return connect(DB_NAME).then((db) => {
            const transaction = db.transaction([STORE_NAME], "readwrite");
            const store = transaction.objectStore(STORE_NAME);
            const request = store.index("expires").openCursor(IDBKeyRange.upperBound(Date.now()));
            return new Promise((resolve, reject) => {
              request.onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                  cursor.delete();
                  cursor.continue();
                } else {
                  resolve(db);
                }
              };
              request.onerror = reject;
            });
          }).then((db) => {
            db.close();
          });
        }
      };
      IndexedDBStore.isSupported = isSupported;
      module.exports = IndexedDBStore;
    }
  });

  // ../packages/@uppy/golden-retriever/lib/MetaDataStore.js
  var require_MetaDataStore = __commonJS({
    "../packages/@uppy/golden-retriever/lib/MetaDataStore.js"(exports, module) {
      function findUppyInstances() {
        const instances = [];
        for (let i3 = 0; i3 < localStorage.length; i3++) {
          const key = localStorage.key(i3);
          if (/^uppyState:/.test(key)) {
            instances.push(key.slice("uppyState:".length));
          }
        }
        return instances;
      }
      function maybeParse(str) {
        try {
          return JSON.parse(str);
        } catch (err) {
          return null;
        }
      }
      var cleanedUp = false;
      module.exports = class MetaDataStore {
        constructor(opts) {
          this.opts = {
            expires: 24 * 60 * 60 * 1e3,
            ...opts
          };
          this.name = `uppyState:${opts.storeName}`;
          if (!cleanedUp) {
            cleanedUp = true;
            MetaDataStore.cleanup();
          }
        }
        load() {
          const savedState = localStorage.getItem(this.name);
          if (!savedState)
            return null;
          const data = maybeParse(savedState);
          if (!data)
            return null;
          if (!data.metadata) {
            this.save(data);
            return data;
          }
          return data.metadata;
        }
        save(metadata) {
          const expires = Date.now() + this.opts.expires;
          const state = JSON.stringify({
            metadata,
            expires
          });
          localStorage.setItem(this.name, state);
        }
        static cleanup(instanceID) {
          if (instanceID) {
            localStorage.removeItem(`uppyState:${instanceID}`);
            return;
          }
          const instanceIDs = findUppyInstances();
          const now = Date.now();
          instanceIDs.forEach((id) => {
            const data = localStorage.getItem(`uppyState:${id}`);
            if (!data)
              return null;
            const obj = maybeParse(data);
            if (!obj)
              return null;
            if (obj.expires && obj.expires < now) {
              localStorage.removeItem(`uppyState:${id}`);
            }
          });
        }
      };
    }
  });

  // ../packages/@uppy/golden-retriever/lib/index.js
  var require_lib24 = __commonJS({
    "../packages/@uppy/golden-retriever/lib/index.js"(exports, module) {
      var _class;
      var _temp;
      var throttle = require_lodash();
      var BasePlugin = require_BasePlugin();
      var ServiceWorkerStore = require_ServiceWorkerStore();
      var IndexedDBStore = require_IndexedDBStore();
      var MetaDataStore = require_MetaDataStore();
      module.exports = (_temp = _class = class GoldenRetriever extends BasePlugin {
        constructor(uppy, opts) {
          super(uppy, opts);
          this.addBlobToStores = (file) => {
            if (file.isRemote)
              return;
            if (this.ServiceWorkerStore) {
              this.ServiceWorkerStore.put(file).catch((err) => {
                this.uppy.log("[GoldenRetriever] Could not store file", "warning");
                this.uppy.log(err);
              });
            }
            this.IndexedDBStore.put(file).catch((err) => {
              this.uppy.log("[GoldenRetriever] Could not store file", "warning");
              this.uppy.log(err);
            });
          };
          this.removeBlobFromStores = (file) => {
            if (this.ServiceWorkerStore) {
              this.ServiceWorkerStore.delete(file.id).catch((err) => {
                this.uppy.log("[GoldenRetriever] Failed to remove file", "warning");
                this.uppy.log(err);
              });
            }
            this.IndexedDBStore.delete(file.id).catch((err) => {
              this.uppy.log("[GoldenRetriever] Failed to remove file", "warning");
              this.uppy.log(err);
            });
          };
          this.replaceBlobInStores = (file) => {
            this.removeBlobFromStores(file);
            this.addBlobToStores(file);
          };
          this.handleRestoreConfirmed = () => {
            this.uppy.log("[GoldenRetriever] Restore confirmed, proceeding...");
            const {
              currentUploads
            } = this.uppy.getState();
            if (currentUploads) {
              Object.keys(currentUploads).forEach((uploadId) => {
                this.uppy.restore(uploadId, currentUploads[uploadId]);
              });
              this.uppy.resumeAll();
            }
            this.uppy.upload();
            this.uppy.setState({
              recoveredState: null
            });
          };
          this.abortRestore = () => {
            this.uppy.log("[GoldenRetriever] Aborting restore...");
            const fileIDs = Object.keys(this.uppy.getState().files);
            this.deleteBlobs(fileIDs).then(() => {
              this.uppy.log(`[GoldenRetriever] Removed ${fileIDs.length} files`);
            }).catch((err) => {
              this.uppy.log(`[GoldenRetriever] Could not remove ${fileIDs.length} files`, "warning");
              this.uppy.log(err);
            });
            this.uppy.cancelAll();
            this.uppy.setState({
              recoveredState: null
            });
            MetaDataStore.cleanup(this.uppy.opts.id);
          };
          this.handleComplete = (_ref) => {
            let {
              successful
            } = _ref;
            const fileIDs = successful.map((file) => file.id);
            this.deleteBlobs(fileIDs).then(() => {
              this.uppy.log(`[GoldenRetriever] Removed ${successful.length} files that finished uploading`);
            }).catch((err) => {
              this.uppy.log(`[GoldenRetriever] Could not remove ${successful.length} files that finished uploading`, "warning");
              this.uppy.log(err);
            });
            this.uppy.setState({
              recoveredState: null
            });
            MetaDataStore.cleanup(this.uppy.opts.id);
          };
          this.restoreBlobs = () => {
            if (this.uppy.getFiles().length > 0) {
              Promise.all([this.loadFileBlobsFromServiceWorker(), this.loadFileBlobsFromIndexedDB()]).then((resultingArrayOfObjects) => {
                const blobs = {
                  ...resultingArrayOfObjects[0],
                  ...resultingArrayOfObjects[1]
                };
                this.onBlobsLoaded(blobs);
              });
            } else {
              this.uppy.log("[GoldenRetriever] No files need to be loaded, only restoring processing state...");
              this.onBlobsLoaded([]);
            }
          };
          this.type = "debugger";
          this.id = this.opts.id || "GoldenRetriever";
          this.title = "Golden Retriever";
          const defaultOptions = {
            expires: 24 * 60 * 60 * 1e3,
            serviceWorker: false
          };
          this.opts = {
            ...defaultOptions,
            ...opts
          };
          this.MetaDataStore = new MetaDataStore({
            expires: this.opts.expires,
            storeName: uppy.getID()
          });
          this.ServiceWorkerStore = null;
          if (this.opts.serviceWorker) {
            this.ServiceWorkerStore = new ServiceWorkerStore({
              storeName: uppy.getID()
            });
          }
          this.IndexedDBStore = new IndexedDBStore({
            expires: this.opts.expires,
            ...this.opts.indexedDB || {},
            storeName: uppy.getID()
          });
          this.saveFilesStateToLocalStorage = throttle(this.saveFilesStateToLocalStorage.bind(this), 500, {
            leading: true,
            trailing: true
          });
          this.restoreState = this.restoreState.bind(this);
          this.loadFileBlobsFromServiceWorker = this.loadFileBlobsFromServiceWorker.bind(this);
          this.loadFileBlobsFromIndexedDB = this.loadFileBlobsFromIndexedDB.bind(this);
          this.onBlobsLoaded = this.onBlobsLoaded.bind(this);
        }
        restoreState() {
          const savedState = this.MetaDataStore.load();
          if (savedState) {
            this.uppy.log("[GoldenRetriever] Recovered some state from Local Storage");
            this.uppy.setState({
              currentUploads: savedState.currentUploads || {},
              files: savedState.files || {},
              recoveredState: savedState
            });
            this.savedPluginData = savedState.pluginData;
          }
        }
        getWaitingFiles() {
          const waitingFiles = {};
          this.uppy.getFiles().forEach((file) => {
            if (!file.progress || !file.progress.uploadStarted) {
              waitingFiles[file.id] = file;
            }
          });
          return waitingFiles;
        }
        getUploadingFiles() {
          const uploadingFiles = {};
          const {
            currentUploads
          } = this.uppy.getState();
          if (currentUploads) {
            const uploadIDs = Object.keys(currentUploads);
            uploadIDs.forEach((uploadID) => {
              const filesInUpload = currentUploads[uploadID].fileIDs;
              filesInUpload.forEach((fileID) => {
                uploadingFiles[fileID] = this.uppy.getFile(fileID);
              });
            });
          }
          return uploadingFiles;
        }
        saveFilesStateToLocalStorage() {
          const filesToSave = {
            ...this.getWaitingFiles(),
            ...this.getUploadingFiles()
          };
          if (Object.keys(filesToSave).length === 0) {
            this.uppy.setState({
              recoveredState: null
            });
            MetaDataStore.cleanup(this.uppy.opts.id);
            return;
          }
          const filesToSaveWithoutData = {};
          Object.keys(filesToSave).forEach((file) => {
            if (filesToSave[file].isRemote) {
              filesToSaveWithoutData[file] = {
                ...filesToSave[file],
                isRestored: true
              };
            } else {
              filesToSaveWithoutData[file] = {
                ...filesToSave[file],
                isRestored: true,
                data: null,
                preview: null
              };
            }
          });
          const pluginData = {};
          this.uppy.emit("restore:get-data", (data) => {
            Object.assign(pluginData, data);
          });
          const {
            currentUploads
          } = this.uppy.getState();
          this.MetaDataStore.save({
            currentUploads,
            files: filesToSaveWithoutData,
            pluginData
          });
        }
        loadFileBlobsFromServiceWorker() {
          if (!this.ServiceWorkerStore) {
            return Promise.resolve({});
          }
          return this.ServiceWorkerStore.list().then((blobs) => {
            const files = this.uppy.getFiles();
            const localFilesOnly = files.filter((file) => {
              return !file.isRemote;
            });
            const numberOfFilesRecovered = Object.keys(blobs).length;
            const numberOfFilesTryingToRecover = localFilesOnly.length;
            if (numberOfFilesRecovered === numberOfFilesTryingToRecover) {
              this.uppy.log(`[GoldenRetriever] Successfully recovered ${numberOfFilesRecovered} blobs from Service Worker!`);
              return blobs;
            }
            this.uppy.log("[GoldenRetriever] No blobs found in Service Worker, trying IndexedDB now...");
            return {};
          }).catch((err) => {
            this.uppy.log("[GoldenRetriever] Failed to recover blobs from Service Worker", "warning");
            this.uppy.log(err);
            return {};
          });
        }
        loadFileBlobsFromIndexedDB() {
          return this.IndexedDBStore.list().then((blobs) => {
            const numberOfFilesRecovered = Object.keys(blobs).length;
            if (numberOfFilesRecovered > 0) {
              this.uppy.log(`[GoldenRetriever] Successfully recovered ${numberOfFilesRecovered} blobs from IndexedDB!`);
              return blobs;
            }
            this.uppy.log("[GoldenRetriever] No blobs found in IndexedDB");
            return {};
          }).catch((err) => {
            this.uppy.log("[GoldenRetriever] Failed to recover blobs from IndexedDB", "warning");
            this.uppy.log(err);
            return {};
          });
        }
        onBlobsLoaded(blobs) {
          const obsoleteBlobs = [];
          const updatedFiles = {
            ...this.uppy.getState().files
          };
          Object.keys(blobs).forEach((fileID) => {
            const originalFile = this.uppy.getFile(fileID);
            if (!originalFile) {
              obsoleteBlobs.push(fileID);
              return;
            }
            const cachedData = blobs[fileID];
            const updatedFileData = {
              data: cachedData,
              isRestored: true,
              isGhost: false
            };
            updatedFiles[fileID] = {
              ...originalFile,
              ...updatedFileData
            };
          });
          Object.keys(updatedFiles).forEach((fileID) => {
            if (updatedFiles[fileID].data === null) {
              updatedFiles[fileID] = {
                ...updatedFiles[fileID],
                isGhost: true
              };
            }
          });
          this.uppy.setState({
            files: updatedFiles
          });
          this.uppy.emit("restored", this.savedPluginData);
          if (obsoleteBlobs.length) {
            this.deleteBlobs(obsoleteBlobs).then(() => {
              this.uppy.log(`[GoldenRetriever] Cleaned up ${obsoleteBlobs.length} old files`);
            }).catch((err) => {
              this.uppy.log(`[GoldenRetriever] Could not clean up ${obsoleteBlobs.length} old files`, "warning");
              this.uppy.log(err);
            });
          }
        }
        deleteBlobs(fileIDs) {
          const promises = [];
          fileIDs.forEach((id) => {
            if (this.ServiceWorkerStore) {
              promises.push(this.ServiceWorkerStore.delete(id));
            }
            if (this.IndexedDBStore) {
              promises.push(this.IndexedDBStore.delete(id));
            }
          });
          return Promise.all(promises);
        }
        install() {
          this.restoreState();
          this.restoreBlobs();
          this.uppy.on("file-added", this.addBlobToStores);
          this.uppy.on("file-editor:complete", this.replaceBlobInStores);
          this.uppy.on("file-removed", this.removeBlobFromStores);
          this.uppy.on("state-update", this.saveFilesStateToLocalStorage);
          this.uppy.on("restore-confirmed", this.handleRestoreConfirmed);
          this.uppy.on("restore-canceled", this.abortRestore);
          this.uppy.on("complete", this.handleComplete);
        }
        uninstall() {
          this.uppy.off("file-added", this.addBlobToStores);
          this.uppy.off("file-editor:complete", this.replaceBlobInStores);
          this.uppy.off("file-removed", this.removeBlobFromStores);
          this.uppy.off("state-update", this.saveFilesStateToLocalStorage);
          this.uppy.off("restore-confirmed", this.handleRestoreConfirmed);
          this.uppy.off("restore-canceled", this.abortRestore);
          this.uppy.off("complete", this.handleComplete);
        }
      }, _class.VERSION = "2.0.6", _temp);
    }
  });

  // ../packages/@uppy/compressor/node_modules/@transloadit/prettier-bytes/prettierBytes.js
  var require_prettierBytes2 = __commonJS({
    "../packages/@uppy/compressor/node_modules/@transloadit/prettier-bytes/prettierBytes.js"(exports, module) {
      module.exports = function prettierBytes(num) {
        if (typeof num !== "number" || isNaN(num)) {
          throw new TypeError(`Expected a number, got ${typeof num}`);
        }
        const neg = num < 0;
        const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        if (neg) {
          num = -num;
        }
        if (num < 1) {
          return `${(neg ? "-" : "") + num} B`;
        }
        const exponent = Math.min(Math.floor(Math.log(num) / Math.log(1024)), units.length - 1);
        num = Number(num / Math.pow(1024, exponent));
        const unit = units[exponent];
        if (num >= 10 || num % 1 === 0) {
          return `${(neg ? "-" : "") + num.toFixed(0)} ${unit}`;
        }
        return `${(neg ? "-" : "") + num.toFixed(1)} ${unit}`;
      };
    }
  });

  // ../node_modules/compressorjs/dist/compressor.common.js
  var require_compressor_common = __commonJS({
    "../node_modules/compressorjs/dist/compressor.common.js"(exports, module) {
      "use strict";
      function ownKeys(object, enumerableOnly) {
        var keys = Object.keys(object);
        if (Object.getOwnPropertySymbols) {
          var symbols = Object.getOwnPropertySymbols(object);
          if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
              return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
          }
          keys.push.apply(keys, symbols);
        }
        return keys;
      }
      function _objectSpread2(target) {
        for (var i3 = 1; i3 < arguments.length; i3++) {
          var source = arguments[i3] != null ? arguments[i3] : {};
          if (i3 % 2) {
            ownKeys(Object(source), true).forEach(function(key) {
              _defineProperty(target, key, source[key]);
            });
          } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
          } else {
            ownKeys(Object(source)).forEach(function(key) {
              Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            });
          }
        }
        return target;
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i3 = 0; i3 < props.length; i3++) {
          var descriptor = props[i3];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties(Constructor, staticProps);
        return Constructor;
      }
      function _defineProperty(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          obj[key] = value;
        }
        return obj;
      }
      function _extends() {
        _extends = Object.assign || function(target) {
          for (var i3 = 1; i3 < arguments.length; i3++) {
            var source = arguments[i3];
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
      var canvasToBlob = {
        exports: {}
      };
      (function(module2) {
        if (typeof window === "undefined") {
          return;
        }
        (function(window2) {
          var CanvasPrototype = window2.HTMLCanvasElement && window2.HTMLCanvasElement.prototype;
          var hasBlobConstructor = window2.Blob && function() {
            try {
              return Boolean(new Blob());
            } catch (e3) {
              return false;
            }
          }();
          var hasArrayBufferViewSupport = hasBlobConstructor && window2.Uint8Array && function() {
            try {
              return new Blob([new Uint8Array(100)]).size === 100;
            } catch (e3) {
              return false;
            }
          }();
          var BlobBuilder = window2.BlobBuilder || window2.WebKitBlobBuilder || window2.MozBlobBuilder || window2.MSBlobBuilder;
          var dataURIPattern = /^data:((.*?)(;charset=.*?)?)(;base64)?,/;
          var dataURLtoBlob = (hasBlobConstructor || BlobBuilder) && window2.atob && window2.ArrayBuffer && window2.Uint8Array && function(dataURI) {
            var matches, mediaType, isBase64, dataString, byteString, arrayBuffer, intArray, i3, bb;
            matches = dataURI.match(dataURIPattern);
            if (!matches) {
              throw new Error("invalid data URI");
            }
            mediaType = matches[2] ? matches[1] : "text/plain" + (matches[3] || ";charset=US-ASCII");
            isBase64 = !!matches[4];
            dataString = dataURI.slice(matches[0].length);
            if (isBase64) {
              byteString = atob(dataString);
            } else {
              byteString = decodeURIComponent(dataString);
            }
            arrayBuffer = new ArrayBuffer(byteString.length);
            intArray = new Uint8Array(arrayBuffer);
            for (i3 = 0; i3 < byteString.length; i3 += 1) {
              intArray[i3] = byteString.charCodeAt(i3);
            }
            if (hasBlobConstructor) {
              return new Blob([hasArrayBufferViewSupport ? intArray : arrayBuffer], {
                type: mediaType
              });
            }
            bb = new BlobBuilder();
            bb.append(arrayBuffer);
            return bb.getBlob(mediaType);
          };
          if (window2.HTMLCanvasElement && !CanvasPrototype.toBlob) {
            if (CanvasPrototype.mozGetAsFile) {
              CanvasPrototype.toBlob = function(callback, type, quality) {
                var self2 = this;
                setTimeout(function() {
                  if (quality && CanvasPrototype.toDataURL && dataURLtoBlob) {
                    callback(dataURLtoBlob(self2.toDataURL(type, quality)));
                  } else {
                    callback(self2.mozGetAsFile("blob", type));
                  }
                });
              };
            } else if (CanvasPrototype.toDataURL && dataURLtoBlob) {
              if (CanvasPrototype.msToBlob) {
                CanvasPrototype.toBlob = function(callback, type, quality) {
                  var self2 = this;
                  setTimeout(function() {
                    if ((type && type !== "image/png" || quality) && CanvasPrototype.toDataURL && dataURLtoBlob) {
                      callback(dataURLtoBlob(self2.toDataURL(type, quality)));
                    } else {
                      callback(self2.msToBlob(type));
                    }
                  });
                };
              } else {
                CanvasPrototype.toBlob = function(callback, type, quality) {
                  var self2 = this;
                  setTimeout(function() {
                    callback(dataURLtoBlob(self2.toDataURL(type, quality)));
                  });
                };
              }
            }
          }
          if (module2.exports) {
            module2.exports = dataURLtoBlob;
          } else {
            window2.dataURLtoBlob = dataURLtoBlob;
          }
        })(window);
      })(canvasToBlob);
      var toBlob = canvasToBlob.exports;
      var isBlob = function isBlob2(value) {
        if (typeof Blob === "undefined") {
          return false;
        }
        return value instanceof Blob || Object.prototype.toString.call(value) === "[object Blob]";
      };
      var DEFAULTS = {
        strict: true,
        checkOrientation: true,
        maxWidth: Infinity,
        maxHeight: Infinity,
        minWidth: 0,
        minHeight: 0,
        width: void 0,
        height: void 0,
        resize: "none",
        quality: 0.8,
        mimeType: "auto",
        convertTypes: ["image/png"],
        convertSize: 5e6,
        beforeDraw: null,
        drew: null,
        success: null,
        error: null
      };
      var IS_BROWSER = typeof window !== "undefined" && typeof window.document !== "undefined";
      var WINDOW = IS_BROWSER ? window : {};
      var isPositiveNumber = function isPositiveNumber2(value) {
        return value > 0 && value < Infinity;
      };
      var slice = Array.prototype.slice;
      function toArray(value) {
        return Array.from ? Array.from(value) : slice.call(value);
      }
      var REGEXP_IMAGE_TYPE = /^image\/.+$/;
      function isImageType(value) {
        return REGEXP_IMAGE_TYPE.test(value);
      }
      function imageTypeToExtension(value) {
        var extension = isImageType(value) ? value.substr(6) : "";
        if (extension === "jpeg") {
          extension = "jpg";
        }
        return ".".concat(extension);
      }
      var fromCharCode = String.fromCharCode;
      function getStringFromCharCode(dataView, start, length) {
        var str = "";
        var i3;
        length += start;
        for (i3 = start; i3 < length; i3 += 1) {
          str += fromCharCode(dataView.getUint8(i3));
        }
        return str;
      }
      var btoa2 = WINDOW.btoa;
      function arrayBufferToDataURL(arrayBuffer, mimeType) {
        var chunks = [];
        var chunkSize = 8192;
        var uint8 = new Uint8Array(arrayBuffer);
        while (uint8.length > 0) {
          chunks.push(fromCharCode.apply(null, toArray(uint8.subarray(0, chunkSize))));
          uint8 = uint8.subarray(chunkSize);
        }
        return "data:".concat(mimeType, ";base64,").concat(btoa2(chunks.join("")));
      }
      function resetAndGetOrientation(arrayBuffer) {
        var dataView = new DataView(arrayBuffer);
        var orientation;
        try {
          var littleEndian;
          var app1Start;
          var ifdStart;
          if (dataView.getUint8(0) === 255 && dataView.getUint8(1) === 216) {
            var length = dataView.byteLength;
            var offset = 2;
            while (offset + 1 < length) {
              if (dataView.getUint8(offset) === 255 && dataView.getUint8(offset + 1) === 225) {
                app1Start = offset;
                break;
              }
              offset += 1;
            }
          }
          if (app1Start) {
            var exifIDCode = app1Start + 4;
            var tiffOffset = app1Start + 10;
            if (getStringFromCharCode(dataView, exifIDCode, 4) === "Exif") {
              var endianness = dataView.getUint16(tiffOffset);
              littleEndian = endianness === 18761;
              if (littleEndian || endianness === 19789) {
                if (dataView.getUint16(tiffOffset + 2, littleEndian) === 42) {
                  var firstIFDOffset = dataView.getUint32(tiffOffset + 4, littleEndian);
                  if (firstIFDOffset >= 8) {
                    ifdStart = tiffOffset + firstIFDOffset;
                  }
                }
              }
            }
          }
          if (ifdStart) {
            var _length = dataView.getUint16(ifdStart, littleEndian);
            var _offset;
            var i3;
            for (i3 = 0; i3 < _length; i3 += 1) {
              _offset = ifdStart + i3 * 12 + 2;
              if (dataView.getUint16(_offset, littleEndian) === 274) {
                _offset += 8;
                orientation = dataView.getUint16(_offset, littleEndian);
                dataView.setUint16(_offset, 1, littleEndian);
                break;
              }
            }
          }
        } catch (e3) {
          orientation = 1;
        }
        return orientation;
      }
      function parseOrientation(orientation) {
        var rotate = 0;
        var scaleX = 1;
        var scaleY = 1;
        switch (orientation) {
          case 2:
            scaleX = -1;
            break;
          case 3:
            rotate = -180;
            break;
          case 4:
            scaleY = -1;
            break;
          case 5:
            rotate = 90;
            scaleY = -1;
            break;
          case 6:
            rotate = 90;
            break;
          case 7:
            rotate = 90;
            scaleX = -1;
            break;
          case 8:
            rotate = -90;
            break;
        }
        return {
          rotate,
          scaleX,
          scaleY
        };
      }
      var REGEXP_DECIMALS = /\.\d*(?:0|9){12}\d*$/;
      function normalizeDecimalNumber(value) {
        var times = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e11;
        return REGEXP_DECIMALS.test(value) ? Math.round(value * times) / times : value;
      }
      function getAdjustedSizes(_ref) {
        var aspectRatio = _ref.aspectRatio, height = _ref.height, width = _ref.width;
        var type = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "none";
        var isValidWidth = isPositiveNumber(width);
        var isValidHeight = isPositiveNumber(height);
        if (isValidWidth && isValidHeight) {
          var adjustedWidth = height * aspectRatio;
          if ((type === "contain" || type === "none") && adjustedWidth > width || type === "cover" && adjustedWidth < width) {
            height = width / aspectRatio;
          } else {
            width = height * aspectRatio;
          }
        } else if (isValidWidth) {
          height = width / aspectRatio;
        } else if (isValidHeight) {
          width = height * aspectRatio;
        }
        return {
          width,
          height
        };
      }
      var ArrayBuffer$1 = WINDOW.ArrayBuffer;
      var FileReader2 = WINDOW.FileReader;
      var URL2 = WINDOW.URL || WINDOW.webkitURL;
      var REGEXP_EXTENSION = /\.\w+$/;
      var AnotherCompressor = WINDOW.Compressor;
      var Compressor2 = /* @__PURE__ */ function() {
        function Compressor3(file, options) {
          _classCallCheck(this, Compressor3);
          this.file = file;
          this.image = new Image();
          this.options = _objectSpread2(_objectSpread2({}, DEFAULTS), options);
          this.aborted = false;
          this.result = null;
          this.init();
        }
        _createClass(Compressor3, [{
          key: "init",
          value: function init() {
            var _this = this;
            var file = this.file, options = this.options;
            if (!isBlob(file)) {
              this.fail(new Error("The first argument must be a File or Blob object."));
              return;
            }
            var mimeType = file.type;
            if (!isImageType(mimeType)) {
              this.fail(new Error("The first argument must be an image File or Blob object."));
              return;
            }
            if (!URL2 || !FileReader2) {
              this.fail(new Error("The current browser does not support image compression."));
              return;
            }
            if (!ArrayBuffer$1) {
              options.checkOrientation = false;
            }
            if (URL2 && !options.checkOrientation) {
              this.load({
                url: URL2.createObjectURL(file)
              });
            } else {
              var reader = new FileReader2();
              var checkOrientation = options.checkOrientation && mimeType === "image/jpeg";
              this.reader = reader;
              reader.onload = function(_ref) {
                var target = _ref.target;
                var result = target.result;
                var data = {};
                if (checkOrientation) {
                  var orientation = resetAndGetOrientation(result);
                  if (orientation > 1 || !URL2) {
                    data.url = arrayBufferToDataURL(result, mimeType);
                    if (orientation > 1) {
                      _extends(data, parseOrientation(orientation));
                    }
                  } else {
                    data.url = URL2.createObjectURL(file);
                  }
                } else {
                  data.url = result;
                }
                _this.load(data);
              };
              reader.onabort = function() {
                _this.fail(new Error("Aborted to read the image with FileReader."));
              };
              reader.onerror = function() {
                _this.fail(new Error("Failed to read the image with FileReader."));
              };
              reader.onloadend = function() {
                _this.reader = null;
              };
              if (checkOrientation) {
                reader.readAsArrayBuffer(file);
              } else {
                reader.readAsDataURL(file);
              }
            }
          }
        }, {
          key: "load",
          value: function load(data) {
            var _this2 = this;
            var file = this.file, image = this.image;
            image.onload = function() {
              _this2.draw(_objectSpread2(_objectSpread2({}, data), {}, {
                naturalWidth: image.naturalWidth,
                naturalHeight: image.naturalHeight
              }));
            };
            image.onabort = function() {
              _this2.fail(new Error("Aborted to load the image."));
            };
            image.onerror = function() {
              _this2.fail(new Error("Failed to load the image."));
            };
            if (WINDOW.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(WINDOW.navigator.userAgent)) {
              image.crossOrigin = "anonymous";
            }
            image.alt = file.name;
            image.src = data.url;
          }
        }, {
          key: "draw",
          value: function draw(_ref2) {
            var _this3 = this;
            var naturalWidth = _ref2.naturalWidth, naturalHeight = _ref2.naturalHeight, _ref2$rotate = _ref2.rotate, rotate = _ref2$rotate === void 0 ? 0 : _ref2$rotate, _ref2$scaleX = _ref2.scaleX, scaleX = _ref2$scaleX === void 0 ? 1 : _ref2$scaleX, _ref2$scaleY = _ref2.scaleY, scaleY = _ref2$scaleY === void 0 ? 1 : _ref2$scaleY;
            var file = this.file, image = this.image, options = this.options;
            var canvas = document.createElement("canvas");
            var context = canvas.getContext("2d");
            var is90DegreesRotated = Math.abs(rotate) % 180 === 90;
            var resizable = (options.resize === "contain" || options.resize === "cover") && isPositiveNumber(options.width) && isPositiveNumber(options.height);
            var maxWidth = Math.max(options.maxWidth, 0) || Infinity;
            var maxHeight = Math.max(options.maxHeight, 0) || Infinity;
            var minWidth = Math.max(options.minWidth, 0) || 0;
            var minHeight = Math.max(options.minHeight, 0) || 0;
            var aspectRatio = naturalWidth / naturalHeight;
            var width = options.width, height = options.height;
            if (is90DegreesRotated) {
              var _ref3 = [maxHeight, maxWidth];
              maxWidth = _ref3[0];
              maxHeight = _ref3[1];
              var _ref4 = [minHeight, minWidth];
              minWidth = _ref4[0];
              minHeight = _ref4[1];
              var _ref5 = [height, width];
              width = _ref5[0];
              height = _ref5[1];
            }
            if (resizable) {
              aspectRatio = width / height;
            }
            var _getAdjustedSizes = getAdjustedSizes({
              aspectRatio,
              width: maxWidth,
              height: maxHeight
            }, "contain");
            maxWidth = _getAdjustedSizes.width;
            maxHeight = _getAdjustedSizes.height;
            var _getAdjustedSizes2 = getAdjustedSizes({
              aspectRatio,
              width: minWidth,
              height: minHeight
            }, "cover");
            minWidth = _getAdjustedSizes2.width;
            minHeight = _getAdjustedSizes2.height;
            if (resizable) {
              var _getAdjustedSizes3 = getAdjustedSizes({
                aspectRatio,
                width,
                height
              }, options.resize);
              width = _getAdjustedSizes3.width;
              height = _getAdjustedSizes3.height;
            } else {
              var _getAdjustedSizes4 = getAdjustedSizes({
                aspectRatio,
                width,
                height
              });
              var _getAdjustedSizes4$wi = _getAdjustedSizes4.width;
              width = _getAdjustedSizes4$wi === void 0 ? naturalWidth : _getAdjustedSizes4$wi;
              var _getAdjustedSizes4$he = _getAdjustedSizes4.height;
              height = _getAdjustedSizes4$he === void 0 ? naturalHeight : _getAdjustedSizes4$he;
            }
            width = Math.floor(normalizeDecimalNumber(Math.min(Math.max(width, minWidth), maxWidth)));
            height = Math.floor(normalizeDecimalNumber(Math.min(Math.max(height, minHeight), maxHeight)));
            var destX = -width / 2;
            var destY = -height / 2;
            var destWidth = width;
            var destHeight = height;
            var params = [];
            if (resizable) {
              var srcX = 0;
              var srcY = 0;
              var srcWidth = naturalWidth;
              var srcHeight = naturalHeight;
              var _getAdjustedSizes5 = getAdjustedSizes({
                aspectRatio,
                width: naturalWidth,
                height: naturalHeight
              }, {
                contain: "cover",
                cover: "contain"
              }[options.resize]);
              srcWidth = _getAdjustedSizes5.width;
              srcHeight = _getAdjustedSizes5.height;
              srcX = (naturalWidth - srcWidth) / 2;
              srcY = (naturalHeight - srcHeight) / 2;
              params.push(srcX, srcY, srcWidth, srcHeight);
            }
            params.push(destX, destY, destWidth, destHeight);
            if (is90DegreesRotated) {
              var _ref6 = [height, width];
              width = _ref6[0];
              height = _ref6[1];
            }
            canvas.width = width;
            canvas.height = height;
            if (!isImageType(options.mimeType)) {
              options.mimeType = file.type;
            }
            var fillStyle = "transparent";
            if (file.size > options.convertSize && options.convertTypes.indexOf(options.mimeType) >= 0) {
              options.mimeType = "image/jpeg";
            }
            if (options.mimeType === "image/jpeg") {
              fillStyle = "#fff";
            }
            context.fillStyle = fillStyle;
            context.fillRect(0, 0, width, height);
            if (options.beforeDraw) {
              options.beforeDraw.call(this, context, canvas);
            }
            if (this.aborted) {
              return;
            }
            context.save();
            context.translate(width / 2, height / 2);
            context.rotate(rotate * Math.PI / 180);
            context.scale(scaleX, scaleY);
            context.drawImage.apply(context, [image].concat(params));
            context.restore();
            if (options.drew) {
              options.drew.call(this, context, canvas);
            }
            if (this.aborted) {
              return;
            }
            var done = function done2(result) {
              if (!_this3.aborted) {
                _this3.done({
                  naturalWidth,
                  naturalHeight,
                  result
                });
              }
            };
            if (canvas.toBlob) {
              canvas.toBlob(done, options.mimeType, options.quality);
            } else {
              done(toBlob(canvas.toDataURL(options.mimeType, options.quality)));
            }
          }
        }, {
          key: "done",
          value: function done(_ref7) {
            var naturalWidth = _ref7.naturalWidth, naturalHeight = _ref7.naturalHeight, result = _ref7.result;
            var file = this.file, image = this.image, options = this.options;
            if (URL2 && !options.checkOrientation) {
              URL2.revokeObjectURL(image.src);
            }
            if (result) {
              if (options.strict && result.size > file.size && options.mimeType === file.type && !(options.width > naturalWidth || options.height > naturalHeight || options.minWidth > naturalWidth || options.minHeight > naturalHeight || options.maxWidth < naturalWidth || options.maxHeight < naturalHeight)) {
                result = file;
              } else {
                var date = new Date();
                result.lastModified = date.getTime();
                result.lastModifiedDate = date;
                result.name = file.name;
                if (result.name && result.type !== file.type) {
                  result.name = result.name.replace(REGEXP_EXTENSION, imageTypeToExtension(result.type));
                }
              }
            } else {
              result = file;
            }
            this.result = result;
            if (options.success) {
              options.success.call(this, result);
            }
          }
        }, {
          key: "fail",
          value: function fail(err) {
            var options = this.options;
            if (options.error) {
              options.error.call(this, err);
            } else {
              throw err;
            }
          }
        }, {
          key: "abort",
          value: function abort() {
            if (!this.aborted) {
              this.aborted = true;
              if (this.reader) {
                this.reader.abort();
              } else if (!this.image.complete) {
                this.image.onload = null;
                this.image.onabort();
              } else {
                this.fail(new Error("The compression process has been aborted."));
              }
            }
          }
        }], [{
          key: "noConflict",
          value: function noConflict() {
            window.Compressor = AnotherCompressor;
            return Compressor3;
          }
        }, {
          key: "setDefaults",
          value: function setDefaults(options) {
            _extends(DEFAULTS, options);
          }
        }]);
        return Compressor3;
      }();
      module.exports = Compressor2;
    }
  });

  // ../packages/@uppy/compressor/lib/locale.js
  var require_locale17 = __commonJS({
    "../packages/@uppy/compressor/lib/locale.js"(exports, module) {
      "use strict";
      module.exports = {
        strings: {
          compressingImages: "Compressing images...",
          compressedX: "Saved %{size} by compressing images"
        }
      };
    }
  });

  // ../packages/@uppy/compressor/lib/index.js
  var require_lib25 = __commonJS({
    "../packages/@uppy/compressor/lib/index.js"(exports, module) {
      "use strict";
      var _core = require_lib2();
      var _RateLimitedQueue2 = require_RateLimitedQueue();
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
      var getFileNameAndExtension = require_getFileNameAndExtension();
      var prettierBytes = require_prettierBytes2();
      var CompressorJS = require_compressor_common();
      var locale = require_locale17();
      var _RateLimitedQueue = /* @__PURE__ */ _classPrivateFieldLooseKey("RateLimitedQueue");
      var Compressor2 = class extends _core.BasePlugin {
        constructor(uppy, opts) {
          super(uppy, opts);
          Object.defineProperty(this, _RateLimitedQueue, {
            writable: true,
            value: void 0
          });
          this.id = this.opts.id || "Compressor";
          this.type = "modifier";
          this.defaultLocale = locale;
          const defaultOptions = {
            quality: 0.6,
            limit: 10
          };
          this.opts = {
            ...defaultOptions,
            ...opts
          };
          _classPrivateFieldLooseBase(this, _RateLimitedQueue)[_RateLimitedQueue] = new _RateLimitedQueue2.RateLimitedQueue(this.opts.limit);
          this.i18nInit();
          this.prepareUpload = this.prepareUpload.bind(this);
          this.compress = this.compress.bind(this);
        }
        compress(blob) {
          return new Promise((resolve, reject) => {
            new CompressorJS(blob, {
              ...this.opts,
              success: resolve,
              error: reject
            });
          });
        }
        async prepareUpload(fileIDs) {
          let totalCompressedSize = 0;
          const compressAndApplyResult = _classPrivateFieldLooseBase(this, _RateLimitedQueue)[_RateLimitedQueue].wrapPromiseFunction(async (file) => {
            try {
              const compressedBlob = await this.compress(file.data);
              const compressedSavingsSize = file.data.size - compressedBlob.size;
              this.uppy.log(`[Image Compressor] Image ${file.id} compressed by ${prettierBytes(compressedSavingsSize)}`);
              totalCompressedSize += compressedSavingsSize;
              const {
                name,
                type,
                size
              } = compressedBlob;
              const {
                extension
              } = getFileNameAndExtension(name);
              this.uppy.setFileState(file.id, {
                name,
                extension,
                type,
                size,
                data: compressedBlob
              });
              this.uppy.setFileMeta(file.id, {
                name,
                type
              });
            } catch (err) {
              this.uppy.log(`[Image Compressor] Failed to compress ${file.id}:`, "warning");
              this.uppy.log(err, "warning");
            }
          });
          const promises = fileIDs.map((fileID) => {
            const file = this.uppy.getFile(fileID);
            this.uppy.emit("preprocess-progress", file, {
              mode: "indeterminate",
              message: this.i18n("compressingImages")
            });
            if (file.isRemote) {
              return Promise.resolve();
            }
            if (!file.data.type) {
              file.data = file.data.slice(0, file.data.size, file.type);
            }
            if (!file.type.startsWith("image/")) {
              return Promise.resolve();
            }
            return compressAndApplyResult(file);
          });
          await Promise.all(promises);
          this.uppy.emit("compressor:complete");
          if (totalCompressedSize > 1024) {
            this.uppy.info(this.i18n("compressedX", {
              size: prettierBytes(totalCompressedSize)
            }), "info");
          }
          for (const fileID of fileIDs) {
            const file = this.uppy.getFile(fileID);
            this.uppy.emit("preprocess-complete", file);
          }
        }
        install() {
          this.uppy.addPreProcessor(this.prepareUpload);
        }
        uninstall() {
          this.uppy.removePreProcessor(this.prepareUpload);
        }
      };
      module.exports = Compressor2;
    }
  });

  // src/examples/locale_list.json
  var require_locale_list = __commonJS({
    "src/examples/locale_list.json"(exports, module) {
      module.exports = { ar_SA: "Arabic (Saudi Arabia)", bg_BG: "Bulgarian (Bulgaria)", cs_CZ: "Czech (Czechia)", da_DK: "Danish (Denmark)", de_DE: "German (Germany)", el_GR: "Greek (Greece)", en_US: "English (United States)", es_ES: "Spanish (Spain)", fa_IR: "Persian (Iran)", fi_FI: "Finnish (Finland)", fr_FR: "French (France)", gl_ES: "Galician (Spain)", he_IL: "Hebrew (Israel)", hr_HR: "Croatian (Croatia)", hu_HU: "Hungarian (Hungary)", id_ID: "Indonesian (Indonesia)", is_IS: "Icelandic (Iceland)", it_IT: "Italian (Italy)", ja_JP: "Japanese (Japan)", ko_KR: "Korean (South Korea)", nb_NO: "Norwegian Bokm\xE5l (Norway)", nl_NL: "Dutch (Netherlands)", pl_PL: "Polish (Poland)", pt_BR: "Portuguese (Brazil)", pt_PT: "Portuguese (Portugal)", ro_RO: "Romanian (Romania)", ru_RU: "Russian (Russia)", sk_SK: "Slovak (Slovakia)", sr_RS_Cyrillic: "Serbian (Serbia, Cyrillic)", sr_RS_Latin: "Serbian (Serbia, Latin)", sv_SE: "Swedish (Sweden)", th_TH: "Thai (Thailand)", tr_TR: "Turkish (Turkey)", uk_UA: "Ukrainian (Ukraine)", vi_VN: "Vietnamese (Vietnam)", zh_CN: "Chinese (China)", zh_TW: "Chinese (Taiwan)" };
    }
  });

  // src/examples/env.js
  var require_env = __commonJS({
    "src/examples/env.js"(exports, module) {
      var companionEndpoint = "http://localhost:3020";
      if (location.hostname === "uppy.io" || /--uppy\.netlify\.app$/.test(location.hostname)) {
        companionEndpoint = "//companion.uppy.io";
      }
      var COMPANION2 = companionEndpoint;
      module.exports = COMPANION2;
    }
  });

  // src/examples/dashboard/app.es6
  var Uppy = require_lib2();
  var Dashboard = require_lib6();
  var GoogleDrive = require_lib9();
  var Dropbox = require_lib10();
  var Instagram = require_lib11();
  var Facebook = require_lib12();
  var OneDrive = require_lib13();
  var Zoom = require_lib14();
  var Unsplash = require_lib15();
  var Box = require_lib16();
  var ImageEditor = require_lib17();
  var Url = require_lib18();
  var Webcam = require_lib19();
  var Audio = require_lib20();
  var ScreenCapture = require_lib21();
  var Tus = require_lib22();
  var DropTarget = require_lib23();
  var GoldenRetriever = require_lib24();
  var Compressor = require_lib25();
  var localeList = require_locale_list();
  var COMPANION = require_env();
  var RTL_LOCALES = ["ar_SA", "fa_IR", "he_IL"];
  if (typeof window !== "undefined" && typeof window.Uppy === "undefined") {
    window.Uppy = {
      locales: {}
    };
  }
  function uppyInit() {
    if (window.uppy) {
      window.uppy.close();
    }
    const opts = window.uppyOptions;
    const uppy = new Uppy({
      logger: Uppy.debugLogger
    });
    uppy.use(Tus, {
      endpoint: "https://tusd.tusdemo.net/files/"
    });
    uppy.on("complete", (result) => {
      console.log("successful files:");
      console.log(result.successful);
      console.log("failed files:");
      console.log(result.failed);
    });
    uppy.use(Dashboard, {
      trigger: ".UppyModalOpenerBtn",
      target: opts.DashboardInline ? ".DashboardContainer" : "body",
      inline: opts.DashboardInline,
      height: 470,
      showProgressDetails: true,
      metaFields: [{
        id: "name",
        name: "Name",
        placeholder: "file name"
      }, {
        id: "caption",
        name: "Caption",
        placeholder: "add description"
      }]
    });
    window.uppy = uppy;
  }
  function uppySetOptions() {
    const opts = window.uppyOptions;
    const defaultNullRestrictions = {
      maxFileSize: null,
      minFileSize: null,
      maxNumberOfFiles: null,
      minNumberOfFiles: null,
      allowedFileTypes: null
    };
    const restrictions = {
      maxFileSize: 1e6,
      maxNumberOfFiles: 3,
      minNumberOfFiles: 2,
      allowedFileTypes: ["image/*", "video/*"],
      requiredMetaFields: ["caption"]
    };
    window.uppy.setOptions({
      autoProceed: opts.autoProceed,
      restrictions: opts.restrictions ? restrictions : defaultNullRestrictions
    });
    window.uppy.getPlugin("Dashboard").setOptions({
      note: opts.restrictions ? "Images and video only, 2\u20133 files, up to 1 MB" : "",
      theme: opts.darkMode ? "dark" : "light",
      disabled: opts.disabled
    });
    const googleDriveInstance = window.uppy.getPlugin("GoogleDrive");
    if (opts.GoogleDrive && !googleDriveInstance) {
      window.uppy.use(GoogleDrive, {
        target: Dashboard,
        companionUrl: COMPANION
      });
    }
    if (!opts.GoogleDrive && googleDriveInstance) {
      window.uppy.removePlugin(googleDriveInstance);
    }
    const dropboxInstance = window.uppy.getPlugin("Dropbox");
    if (opts.Dropbox && !dropboxInstance) {
      window.uppy.use(Dropbox, {
        target: Dashboard,
        companionUrl: COMPANION
      });
    }
    if (!opts.Dropbox && dropboxInstance) {
      window.uppy.removePlugin(dropboxInstance);
    }
    const instagramInstance = window.uppy.getPlugin("Instagram");
    if (opts.Instagram && !instagramInstance) {
      window.uppy.use(Instagram, {
        target: Dashboard,
        companionUrl: COMPANION
      });
    }
    if (!opts.Instagram && instagramInstance) {
      window.uppy.removePlugin(instagramInstance);
    }
    const urlInstance = window.uppy.getPlugin("Url");
    if (opts.Url && !urlInstance) {
      window.uppy.use(Url, {
        target: Dashboard,
        companionUrl: COMPANION
      });
    }
    if (!opts.Url && urlInstance) {
      window.uppy.removePlugin(urlInstance);
    }
    const facebookInstance = window.uppy.getPlugin("Facebook");
    if (opts.Facebook && !facebookInstance) {
      window.uppy.use(Facebook, {
        target: Dashboard,
        companionUrl: COMPANION
      });
    }
    if (!opts.Facebook && facebookInstance) {
      window.uppy.removePlugin(facebookInstance);
    }
    const oneDriveInstance = window.uppy.getPlugin("OneDrive");
    if (opts.OneDrive && !oneDriveInstance) {
      window.uppy.use(OneDrive, {
        target: Dashboard,
        companionUrl: COMPANION
      });
    }
    if (!opts.OneDrive && oneDriveInstance) {
      window.uppy.removePlugin(oneDriveInstance);
    }
    const unsplashInstance = window.uppy.getPlugin("Unsplash");
    if (opts.Unsplash && !unsplashInstance) {
      window.uppy.use(Unsplash, {
        target: Dashboard,
        companionUrl: COMPANION
      });
    }
    if (!opts.Unsplash && unsplashInstance) {
      window.uppy.removePlugin(unsplashInstance);
    }
    const zoomInstance = window.uppy.getPlugin("Zoom");
    if (opts.Zoom && !zoomInstance) {
      window.uppy.use(Zoom, {
        target: Dashboard,
        companionUrl: "https://intense-meadow-61813.herokuapp.com/"
      });
    }
    if (!opts.Zoom && zoomInstance) {
      window.uppy.removePlugin(zoomInstance);
    }
    const boxInstance = window.uppy.getPlugin("Box");
    if (opts.Box && !boxInstance) {
      window.uppy.use(Box, {
        target: Dashboard,
        companionUrl: COMPANION
      });
    }
    if (!opts.Box && boxInstance) {
      window.uppy.removePlugin(boxInstance);
    }
    const webcamInstance = window.uppy.getPlugin("Webcam");
    if (opts.Webcam && !webcamInstance) {
      window.uppy.use(Webcam, {
        target: Dashboard,
        showVideoSourceDropdown: true
      });
    }
    if (!opts.Webcam && webcamInstance) {
      window.uppy.removePlugin(webcamInstance);
    }
    const audioInstance = window.uppy.getPlugin("Audio");
    if (opts.Audio && !audioInstance) {
      window.uppy.use(Audio, {
        target: Dashboard,
        showAudioSourceDropdown: true
      });
    }
    if (!opts.Audio && audioInstance) {
      window.uppy.removePlugin(audioInstance);
    }
    const screenCaptureInstance = window.uppy.getPlugin("ScreenCapture");
    if (opts.ScreenCapture && !screenCaptureInstance) {
      window.uppy.use(ScreenCapture, {
        target: Dashboard
      });
    }
    if (!opts.ScreenCapture && screenCaptureInstance) {
      window.uppy.removePlugin(screenCaptureInstance);
    }
    const imageEditorInstance = window.uppy.getPlugin("ImageEditor");
    if (opts.imageEditor && !imageEditorInstance) {
      window.uppy.use(ImageEditor, {
        target: Dashboard
      });
    }
    if (!opts.imageEditor && imageEditorInstance) {
      window.uppy.removePlugin(imageEditorInstance);
    }
    const dropTargetInstance = window.uppy.getPlugin("DropTarget");
    if (opts.DropTarget && !dropTargetInstance) {
      window.uppy.use(DropTarget, {
        target: document.body
      });
    }
    if (!opts.DropTarget && dropTargetInstance) {
      window.uppy.removePlugin(dropTargetInstance);
    }
    const goldenRetrieverInstance = window.uppy.getPlugin("GoldenRetriever");
    if (opts.GoldenRetriever && !goldenRetrieverInstance) {
      window.uppy.use(GoldenRetriever);
    }
    if (!opts.GoldenRetriever && goldenRetrieverInstance) {
      window.uppy.removePlugin(goldenRetrieverInstance);
    }
    const compressorInstance = window.uppy.getPlugin("Compressor");
    if (opts.Compressor && !compressorInstance) {
      window.uppy.use(Compressor);
    }
    if (!opts.Compressor && compressorInstance) {
      window.uppy.removePlugin(compressorInstance);
    }
  }
  function whenLocaleAvailable(localeName, callback) {
    const interval = 100;
    const loop = setInterval(() => {
      if (window.Uppy && window.Uppy.locales && window.Uppy.locales[localeName]) {
        clearInterval(loop);
        callback(window.Uppy.locales[localeName]);
      }
    }, interval);
  }
  function loadLocaleFromCDN(localeName) {
    const head = document.getElementsByTagName("head")[0];
    const js = document.createElement("script");
    js.type = "text/javascript";
    js.src = `https://releases.transloadit.com/uppy/locales/v2.0.9/${localeName}.min.js`;
    head.appendChild(js);
  }
  function setLocale(localeName) {
    if (typeof window.Uppy.locales[localeName] === "undefined") {
      loadLocaleFromCDN(localeName);
    }
    whenLocaleAvailable(localeName, (localeObj) => {
      const direction = RTL_LOCALES.indexOf(localeName) !== -1 ? "rtl" : "ltr";
      window.uppy.setOptions({
        locale: localeObj
      });
      window.uppy.getPlugin("Dashboard").setOptions({
        direction
      });
    });
  }
  function populateLocaleSelect() {
    const localeSelect = document.getElementById("localeList");
    Object.keys(localeList).forEach((localeName) => {
      if (localeName === "en_US")
        return;
      localeSelect.innerHTML += `<option value="${localeName}">${localeList[localeName]} \u2014 (${localeName})</option>`;
    });
    localeSelect.addEventListener("change", (event) => {
      const localeName = event.target.value;
      setLocale(localeName);
    });
  }
  window.uppySetOptions = uppySetOptions;
  window.uppyInit = uppyInit;
  window.uppySetLocale = setLocale;
  populateLocaleSelect();
  uppyInit();
  uppySetOptions();
})();
/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/*!
 * Compressor.js v1.1.1
 * https://fengyuanchen.github.io/compressorjs
 *
 * Copyright 2018-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2021-10-05T02:32:40.212Z
 */
/*!
 * Cropper.js v1.5.7
 * https://fengyuanchen.github.io/cropperjs
 *
 * Copyright 2015-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2020-05-23T05:23:00.081Z
 */
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
