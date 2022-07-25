import path from "path";
import sqlite3 from "sqlite3";

const db_path = `C:/Users/최문석/OneDrive/바탕 화면/joon/AttendanceManager/backend/db/data.db`;

let db = new sqlite3.Database(
  // path.resolve("db", "data.db"),
  db_path,
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error(err.message, db_path);
    } else {
      console.log("Connected to the mydb database.");
    }
  }
);

module.exports = db;
