import express from "express";
import db from "../../helpers/db.js";
const router = express.Router();

router.post("/attendance", (req, res) => {
  let start_date = req.body.start_date;
  let end_date = req.body.end_date;
  db.all(
    `SELECT * FROM attendance
    INNER JOIN user ON attendance.attendance_id = user.id
    INNER JOIN company ON attendance.company_id = company.company_id
    WHERE attendance_date >= "${start_date}" AND attendance_date <= "${end_date}";`,
    (err, rows) => {
      if (err) {
        return console.error(err.message);
      }
      res.json(rows);
    }
  );
});

module.exports = router;
// export default router;
