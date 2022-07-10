(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global._ = factory());
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
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

  /**
   * 遍历（类）数组或对象
   * 
   * @param {(Array|Object)} obj - 要遍历的对象
   * @param {Function} cb - 回调，会传递给它 index(key) 和 value
   */

  var each = function each(obj, cb) {
    var type = getType(obj);

    if (type === 'array' || isArrayLike(obj)) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (cb.call(obj, i, obj[i]) === false) {
          break;
        }
      }
    } else if (type === 'object') {
      var stringProp = Object.keys(obj);
      var symbolProp = Object.getOwnPropertySymbols(obj);
      var keys = stringProp.concat(symbolProp);

      for (var _i = 0, _l = keys.length; _i < _l; _i++) {
        var key = keys[_i];

        if (cb.call(obj, key, obj[key]) === false) {
          break;
        }
      }
    }

    return obj;
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

  var LOWERCASELETTERS = 'qwertyuiopasdfghjklzxcvbnm';
  var UPPERCASELETTERS = 'QWERTYUIOPASDFGHJKLZXCVBNM';
  var LETTERS = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
  var stragegies = {
    "int": function int(range) {
      var isLeftOpen = range[0] === '(';
      var isRightOpen = range[range.length - 1] === '(';
      var parts = range.split(',');
      var a = parts[0].slice(1) * 1;
      var b = parts[1].slice(0, -1) * 1;
      isLeftOpen ? a++ : isRightOpen ? b-- : null;
      return Math.floor(Math.random() * (b - a)) + a;
    },
    letters: function letters(type, number) {
      if (getType(type) === 'number') {
        number = type;
        type = undefined;
      }

      var res = '';

      for (var i = 0; i < number; i++) {
        if (type === 'lower') {
          var index = Math.floor(Math.random() * 26);
          res += LOWERCASELETTERS[index];
        } else if (type === 'upper') {
          var _index = Math.floor(Math.random() * 26);

          res += UPPERCASELETTERS[_index];
        } else {
          var _index2 = Math.floor(Math.random() * 53);

          res += LETTERS[_index2];
        }
      }

      return res;
    }
  };
  /**
   * 生成指定范围的随机整数或字母
   * 
   * @param {string} type - 类型，可选值有 'int' | 'letters'
   * @param {string} [range=undefined] - 范围，示例如下：
   *  '[3, 5]' 表示随机生成 3、4、5 中的一个数，
   *  '(5, 8)' 表示随机生成 6、7 中的一个数，
   *  'lower' 表示随机生成小写字母
   *  'upper' 表示随机生成大写字母
   *  undefined 表示随机生成字母
   * @param {number} number - 生成字母的数量，生成随机整数时传入该参数无意义。
   * @returns {(string|number)} - 生成的随机整数或字母
   */

  var random = function random(type, range, number) {
    return stragegies[type](range, number);
  };

  var init = function init(utils) {
    utils.getType = getType;
    utils.each = each;
    utils.shallowClone = shallowClone;
    utils.deepClone = deepClone;
    utils.random = random;
  };

  var utils = Object.create(null);
  init(utils);

  return utils;

}));
