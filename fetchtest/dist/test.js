"use strict";

var _request = require("./helpers/request");

var _db = _interopRequireDefault(require("./helpers/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var record_sep = "\x1E";
var unit_sep = "\x1F";
var end_of_text = "\x03";
var start_date = "20210514";
var end_date = "20220814";
(0, _request.requestLoss)(start_date, end_date).then(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      total_loss = _ref2[0],
      losses = _ref2[1];

  saveLoss(losses);
});

function saveLoss(losses) {
  _db["default"].all("PRAGMA table_info('loss')", [], function (err, rows) {
    var column_list = rows.map(function (row) {
      var column_name = row.name;
      if (column_name !== "id") return String(column_name);
    }).filter(function (column_name) {
      return column_name !== undefined;
    });

    var _iterator = _createForOfIteratorHelper(losses),
        _step;

    try {
      var _loop = function _loop() {
        var loss = _step.value;
        var value_list = column_list.map(function (column_name) {
          return loss[column_name];
        });
        var sql_query = "INSERT INTO loss (".concat(column_list.join(", "), ") VALUES ");
        var placeholders = value_list.map(function (value) {
          return "?";
        }).join(",");
        sql_query += "(" + placeholders + ")";
        console.log(sql_query);

        _db["default"].run(sql_query, value_list, function (err) {
          // if (err) throw err;
          console.log("done!");
        });
      };

      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  });
}