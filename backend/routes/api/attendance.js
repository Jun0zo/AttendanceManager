import express from 'express';
import db from '../../helpers/db.js';
const router = express.Router()

router.post('/attendance', (req, res) => {
  let date = req.body.start_date;
  db.all(`SELECT * FROM attendance WHERE attendance_date >= ${start_date} AND attendance_date <= ${end_date}`, (err, rows) => {
    if (err) {
      return console.error(err.message)
    }
    res.json(rows);
  });
})

module.exports = router;
// export default router;