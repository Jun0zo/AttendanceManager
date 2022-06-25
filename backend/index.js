import express from 'express';
import path from 'path';
import sqlite3 from 'sqlite3';
const app = express()
const port = 9000

let db = new sqlite3.Database('./db/data.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
      console.error(err.message);
  } else {
      console.log('Connected to the mydb database.');
  }
});

const build_path = path.join(__dirname, '../', 'frontend', 'build')

app.use(express.static(build_path));

app.get('/', (req, res) => {
  res.sendFile(path.join(build_path, 'index.html'))
})

app.get('/api/company', (req, res) => {
  db.all(`SELECT cid, name FROM company`,function (err, rows) {
    if (err) {
      return console.error(err.message)
    }
    res.json(rows);
  });
})

app.get('/api/user', (req, res) => {
  db.all(`SELECT * FROM user`,function (err, rows) {
    if (err) {
      return console.error(err.message)
    }
    res.json(rows);
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})