import { requestLoss } from "./helpers/request";
import db from "./helpers/db";

const record_sep = "\u001e";
const unit_sep = "\u001f";
const end_of_text = "\u0003";

const start_date = "20210514";
const end_date = "20220814";

requestLoss(start_date, end_date).then(([total_loss, losses]) => {
  saveLoss(losses);
});

function saveLoss(losses) {
  db.all(`PRAGMA table_info('loss')`, [], (err, rows) => {
    let column_list = rows
      .map((row) => {
        let column_name = row.name;
        if (column_name !== "id") return String(column_name);
      })
      .filter((column_name) => column_name !== undefined);

    for (let loss of losses) {
      let value_list = column_list.map((column_name) => loss[column_name]);
      let sql_query = `INSERT INTO loss (${column_list.join(", ")}) VALUES `;

      let placeholders = value_list.map((value) => "?").join(",");
      sql_query += "(" + placeholders + ")";
      db.run(sql_query, value_list, (err) => {
        if (err) console.log(err);
        console.log("done!");
      });
    }
  });
}
