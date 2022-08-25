import express from "express";
import db from "../../helpers/db.js";
import executeQuery from "../../helpers/queryWrapper.js";
const router = express.Router();

router.post("/attendance", (req, res) => {
  let {
    attendance_id,
    start_date,
    end_date,
    user_id,
    company_id,
    work_time,
    go_time,
  } = req.body;
  let query = `SELECT attendance_id, attendance_date, work_time, go_time, attendance.user_id, attendance.company_id, user.user_name, company.company_name FROM attendance
  INNER JOIN user ON attendance.user_id = user.id
  INNER JOIN company ON attendance.company_id = company.company_id
  WHERE `;

  let add_query_list = [];
  if (attendance_id) add_query_list.push(`attendance_id = ${attendance_id}`);
  if (start_date) add_query_list.push(`attendance_date >= "${start_date}"`);
  if (end_date) add_query_list.push(`attendance_date <= "${end_date}"`);
  if (user_id) add_query_list.push(`attendance.user_id = ${user_id}`);
  if (company_id) add_query_list.push(`attendance.company_id = ${company_id}`);
  if (work_time) add_query_list.push(`work_time = "${work_time}"`);
  if (go_time) add_query_list.push(`go_time = "${go_time}"`);
  query += add_query_list.join(" AND ");

  executeQuery(db, query).then((rows) => res.json(rows));
});

router.put("/attendance", (req, res) => {
  let { attendance_id, user_id, attendance_date, company_id } = req.body;

  let query;
  if (attendance_id) {
    let add_query_list = [];
    for (key in req.body) {
      if (key != attendance_id) {
        let val = req.body[key];
        add_query_list.push(`${key} = ${val}`);
      }
    }
    let add_query = add_query_list.join(",");
    query = `UPDATE attendance SET ${add_query} WHERE attendance_id=${attendance_id};`;
  } else {
    query = `INSERT INTO attendance VALUES (NULL, "${attendance_date}", ${work_time}, ${go_time}, ${user_id}, ${company_id}`;
  }
  executeQuery(db, query).then((rows) => res.json(rows));
});

module.exports = router;
// export default router;
