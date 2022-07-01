import express from 'express';
import db from '../../helpers/db.js';
const router = express.Router()

router.get('/user', (req, res) => {
  db.all(`SELECT * FROM user`,function (err, rows) {
    if (err) {
      return console.error(err.message)
    }
    res.json(rows);
  });
})

module.exports = router;