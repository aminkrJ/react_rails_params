"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isArrayOfObjects = exports.railsify = void 0;

var _underscore = _interopRequireDefault(require("underscore"));

var _humps = _interopRequireDefault(require("humps"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var railsify = function railsify(data) {
  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var defaultOptions = {
    decamelize: false,
    idAssociations: []
  };
  options = Object.assign(defaultOptions, options);
  var _options = options,
      decamelize = _options.decamelize,
      idAssociations = _options.idAssociations;
  var newObject = {};

  _underscore.default.each(data, function (value, key) {
    if (decamelize) key = _humps.default.decamelize(key);

    if (isArrayOfObjects(value)) {
      var items = _underscore.default.map(value, function (item) {
        return railsify(item, null, options);
      });

      var nested = _defineProperty({}, "".concat(key, "_attributes"), items);

      newObject = _objectSpread({}, newObject, nested);
      return true;
    }

    if (isObject(value)) {
      if (idAssociations.includes(key)) {
        var _nested2 = _defineProperty({}, "".concat(key, "_id"), value.id);

        newObject = _objectSpread({}, newObject, _nested2);
      } else {
        var _nested4 = railsify(value, "".concat(key, "_attributes"), options);

        newObject = _objectSpread({}, newObject, _nested4);
      }

      return true;
    }

    newObject = _objectSpread({}, newObject, _defineProperty({}, key, value));
  });

  if (root) {
    return _defineProperty({}, root, newObject);
  } else {
    return newObject;
  }
};

exports.railsify = railsify;

var isArrayOfObjects = function isArrayOfObjects(value) {
  if (Array.isArray(value)) {
    value = value.map(function (item) {
      return isObject(item);
    });
    return value.includes(false) ? false : true;
  } else {
    return false;
  }
};

exports.isArrayOfObjects = isArrayOfObjects;

var isObject = function isObject(value) {
  return value && _typeof(value) === 'object' && value.constructor === Object;
};