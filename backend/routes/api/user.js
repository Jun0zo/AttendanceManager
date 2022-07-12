import express from "express";
import db from "../../helpers/db.js";
const router = express.Router();

router.get("/user", (req, res) => {
  let query = `SELECT * FROM user`;
  if (req.query.company) query += ` WHERE company_id = ${req.query.company}`;
  db.all(query, function (err, rows) {
    if (err) {
      return console.error(err.message);
    }
    res.json(rows);
  });
});

module.exports = router;
