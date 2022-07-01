import sqlite3 from 'sqlite3';

let db = new sqlite3.Database('./db/data.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
      console.error(err.message);
  } else {
      console.log('Connected to the mydb database.');
  }
});

module.exports = db;