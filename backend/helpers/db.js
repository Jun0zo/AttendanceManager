import path from "path";
import sqlite3 from "sqlite3";

let db = new sqlite3.Database(
  path.resolve("db", "data.db"),
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error(err.message, path.resolve("db", "data.db"));
    } else {
      console.log("Connected to the mydb database.");
    }
  }
);

module.exports = db;
