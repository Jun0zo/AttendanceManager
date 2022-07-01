import express from 'express';
import db from '../../helpers/db.js';
const router = express.Router()

router.get('/company', (req, res) => {
  db.all(`SELECT * FROM company`,function (err, rows) {
    if (err) {
      return console.error(err.message)
    }
    res.json(rows);
  });
})

module.exports = router;
// export default router;