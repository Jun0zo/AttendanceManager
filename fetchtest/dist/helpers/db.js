"use strict";

var _path = _interopRequireDefault(require("path"));

var _sqlite = _interopRequireDefault(require("sqlite3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var db_path = "C:/Users/\uCD5C\uBB38\uC11D/OneDrive/\uBC14\uD0D5 \uD654\uBA74/joon/AttendanceManager/backend/db/data.db";
var db = new _sqlite["default"].Database( // path.resolve("db", "data.db"),
db_path, _sqlite["default"].OPEN_READWRITE, function (err) {
  if (err) {
    console.error(err.message, db_path);
  } else {
    console.log("Connected to the mydb database.");
  }
});
module.exports = db;