import express from 'express';
import db from '../../helpers/db.js';
const router = express.Router()

router.post('/attendance', (req, res) => {
  let date = req.body.date;
  db.all(`SELECT * FROM attendance WHERE date LIKE '%${date}%'`,function (err, rows) {
    if (err) {
      return console.error(err.message)
    }
    res.json(rows);
  });
})

module.exports = router;
// export default router;