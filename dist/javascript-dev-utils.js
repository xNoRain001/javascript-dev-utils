(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global._ = factory());
})(this, (function () { 'use strict';

  var keys = function keys(target) {
    var stringKeys = Object.keys(target);
    var symbolKeys = Object.getOwnPropertySymbols(target);
    return stringKeys.concat(symbolKeys);
  };

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  /**
   * 返回给定值的数据类型
   * 
   * @param {*} v - 需要判断类型的值
   * @returns {string} 给定值的数据类型，都为小写字母。
   */
  var getType = function getType(v) {
    if (v == null) {
      return "".concat(v);
    }

    var type = _typeof(v);

    return !/^(object|function)$/.test(type) ? type : Object.prototype.toString.call(v).slice(8, -1).toLowerCase();
  };

  var isArrayLike = function isArrayLike(v) {
    return v != null && isLength(v.length) && !/^function$/.test(_typeof(v));
  };

  var isLength = function isLength(n) {
    return typeof n === 'number' && n > -1 && n % 1 === 0 && n <= Number.MAX_SAFE_INTEGER;
  };

  var isPrimitive = function isPrimitive(v) {
    return !(v !== null && _typeof(v) === 'object');
  };

  var isObject = function isObject(v) {
    return getType(v) === 'object';
  };

  var isArray = function isArray(v) {
    return Array.isArray(v);
  };

  /**
   * 遍历（类）数组或对象
   * 
   * @param {(Array|Object)} target - 要遍历的目标
   * @param {Function} cb - 回调函数，会传递给它 key(index) 和 value，当回调函数的返
   *  回值为 false 时会结束循环。
   */

  var each = function each(target, cb) {
    if (isArray(target) || isArrayLike(target)) {
      for (var i = 0, l = target.length; i < l; i++) {
        if (cb.call(target, i, target[i]) === false) {
          break;
        }
      }
    } else if (isObject(target)) {
      var _keys = keys(target);

      for (var _i = 0, _l = _keys.length; _i < _l; _i++) {
        var key = _keys[_i];

        if (cb.call(target, key, target[key]) === false) {
          break;
        }
      }
    }

    return target;
  };

  var lowerCaseLetters = 'qwertyuiopasdfghjklzxcvbnm';
  var upCaseLetters = 'QWERTYUIOPASDFGHJKLZXCVBNM';
  var letters = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
  var stragegies = {
    number: function number(range) {
      var isLeftOpen = range[0] === '(';
      var isRightOpen = range[range.length - 1] === '(';
      var parts = range.split(',');
      var a = +parts[0].slice(1);
      var b = +parts[1].slice(1, -1);
      isLeftOpen ? a++ : isRightOpen ? b-- : null;
      return Math.floor(Math.random() * (b - a)) + a;
    },
    lowerCaseLetter: function lowerCaseLetter(number) {
      var res = '';

      for (var i = 0; i < number; i++) {
        var index = this.number('[0, 25]');
        res += lowerCaseLetters[index];
      }

      return res;
    },
    upCaseLetter: function upCaseLetter(number) {
      var res = '';

      for (var i = 0; i < number; i++) {
        var index = this.number('[0, 25]');
        res += upCaseLetters[index];
      }

      return res;
    },
    letter: function letter(number) {
      var res = '';

      for (var i = 0; i < number; i++) {
        var index = this.number('[0, 51]');
        res += letters[index];
      }

      return res;
    }
  };
  /**
   * 生成随机正整数或字母
   * 
   * @param {string} type - 类型，可选值有
   *  number | lowerCaseLetter | upCaseLetter | letter
   * @param {(string|number)} rangeOrNumber - 随机数范围或字母数量，示例如下：
   *  [3, 5] 表示随机生成 3、4、5 中的一个数
   *  (5, 8) 表示随机生成 6、7 中的一个数
   *  3 表示生成三个字母
   * @returns {(string|number)} - 生成的随机整数或字母
   */

  var random = function random(type, rangeOrNumber) {
    return stragegies[type](rangeOrNumber);
  };

  /**
   * 函数节流 https://github.com/jashkenas/underscore
   * 
   * @param {Function} fn - 需要进行节流处理的原函数
   * @param {number} wait - 节流的时间间隔
   * @param {Object} options - 用于设置开始边界和结束边界是否触发的配置项
   * @param {boolean} options.leading - 开始边界是否触发
   * @param {boolean} options.trailing - 结束边界是否触发
   * @returns {Function} - 生成的节流函数
   */
  var throttle = function throttle(fn) {
    var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var leading = options.leading,
        trailing = options.trailing;
    var context = null,
        parmas = null,
        result = null,
        timer = null,
        prev = 0; // 结束边界触发的函数

    var later = function later() {
      // 之后再次触发时当作第一次点击，如果开始边界要不触发，应该让 prev 为 0。
      prev = leading ? Date.now() : 0;
      timer = null;
      result = fn.call.apply(fn, [context].concat(_toConsumableArray(parmas)));

      if (!timer) {
        context = parmas = null;
      }
    };

    var _throttle = function _throttle() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      parmas = args;
      context = this; // 记录点击的时间

      var now = Date.now(); // 开始边界不触发，本来需要用一个变量标识是否是第一次点击，由于 prev 只有初始时的
      // 值是 0，正好可以用来标识是否是第一次点击。

      if (!prev && !leading) {
        prev = now;
      } // 计算需要等待的时间


      var remaining = wait - (now - prev);

      if (remaining <= 0 || remaining > wait) {
        // remaining > wait 代表修改了时间
        // 清除之前因结束边界触发而设置的定时器，这种情况只会在结束边界定时器回调即将触
        // 发的同时又点击了一下时出现，此时正好超过等待时间。如果因时间误差先执行了点击
        // 时的代码，就会取消掉定时器回调；如果因时间误差先执行了定时器回调，prev 会更
        // 新，就不会执行下面的代码。总之保证了规定时间内只会执行一次。
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }

        prev = now;
        result = fn.call.apply(fn, [context].concat(_toConsumableArray(parmas)));

        if (!timer) {
          context = parmas = null;
        }

        return result;
      } // 结束边界触发


      if (!timer && trailing) {
        timer = setTimeout(later, remaining);
        return result;
      }
    }; // 取消


    _throttle.cancle = function () {
      clearTimeout(timer);
      prev = 0;
      timer = context = parmas = null;
    };

    return _throttle;
  };

  /**
   * 函数防抖 https://github.com/jashkenas/underscore
   * 
   * @param {Function} fn - 需要进行防抖处理的原函数
   * @param {number} wait - 防抖的时间间隔
   * @param {boolean} immediate - 开始边界触发
   * @returns {Function} - 生成的防抖函数
   */
  var debounce = function debounce(fn, wait, immediate) {
    var context = null,
        timer = null,
        params = null,
        result = null,
        previous = 0;

    var later = function later() {
      var passed = Date.now() - previous;

      if (wait > passed) {
        timer = setTimeout(later, wait - passed);
      } else {
        timer = null;

        if (!immediate) {
          result = fn.call.apply(fn, [context].concat(_toConsumableArray(params)));
        }
      }
    };

    var _debounce = function _debounce() {
      context = this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      params = args;
      previous = Date.now();

      if (!timer) {
        timer = setTimeout(later, wait);

        if (immediate) {
          result = fn.call.apply(fn, [context].concat(_toConsumableArray(params)));
        }
      }

      return result;
    };

    _debounce.cancel = function () {
      clearTimeout(timer);
      timer = context = params = null;
    };

    return _debounce;
  };

  var strategies$2 = {
    replace: function replace(target, sources, key) {
      target[key] = sources;
    }
  };

  var merge = function merge(target, sources, prevTarget, key) {
    if (isObject(target) && isObject(sources) || isArray(target) && isArray(sources)) {
      for (var _key in sources) {
        var value1 = target[_key];
        var value2 = sources[_key];
        merge(value1, value2, target, _key);
      }
    } else {
      strategies$2.replace(prevTarget || target, sources, key);
    }

    return target;
  };

  var hasPubProperty = function hasPubProperty(target, prop) {
    return prop in target && !target.hasOwnProperty(prop);
  };

  var uniq = function uniq(ary) {
    return _toConsumableArray(new Set(ary));
  };

  var strategies$1 = {
    object: function object(target, key) {
      delete target[key];
    },
    array: function array(target, key) {
      console.log(target, key);
    }
  };

  var useless = function useless(target) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var isStrict = arguments.length > 2 ? arguments[2] : undefined;

    var _keys = keys(target);

    var set = new Set();
    each(options, function (_, key) {
      set.add(key);
    });
    each(_keys, function (_, key) {
      if (set.has(target[key])) {
        var type = getType(target);
        strategies$1[type](target, key);
        return;
      }

      var value = target[key];

      if (isObject(value)) {
        useless(value, options, isStrict);
      }
    });
  };

  var strategies = {
    array: function array(target) {
      return target.slice();
    },
    object: function object(target, Ctor) {
      var obj = new Ctor();
      each(target, function (key, value) {
        obj[key] = value;
      });
      return obj;
    },
    regexp: function regexp(target, Ctor) {
      return new Ctor(target);
    },
    date: function date(target, Ctor) {
      return new Ctor(target);
    },
    error: function error(target, Ctor) {
      return new Ctor(target.message);
    }
  };
  /**
   * 返回一个值的浅拷贝
   * 
   * @param {*} target - 需要浅拷贝的值
   * @returns {*} 浅拷贝后的值
   */

  var shallowClone = function shallowClone(target) {
    if (isPrimitive(target)) {
      return target;
    }

    var type = getType(target);
    var Ctor = target.constructor;
    return strategies[type](target, Ctor);
  };

  /**
   * 返回一个值的深拷贝
   * 
   * @param {*} target - 需要深拷贝的值
   * @returns {*} 深拷贝后的值
   */

  var deepClone = function deepClone(target) {
    var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new WeakSet();

    if (!/^(array|object)$/.test(getType(target))) {
      return shallowClone(target);
    }

    if (cache.has(target)) {
      return target;
    }

    cache.add(target);
    var obj = new target.constructor();
    each(target, function (key, value) {
      obj[key] = deepClone(value, cache);
    });
    return obj;
  };

  var init = function init(utils) {
    utils.getType = getType;
    utils.each = each;
    utils.shallowClone = shallowClone;
    utils.deepClone = deepClone;
    utils.random = random;
    utils.throttle = throttle;
    utils.debounce = debounce;
    utils.merge = merge;
    utils.hasPubProperty = hasPubProperty;
    utils.uniq = uniq;
    utils.keys = keys;
    utils.useless = useless;
  };

  var utils = Object.create(null);
  init(utils);

  return utils;

}));
