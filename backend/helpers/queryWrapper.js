export default function executeQuery(db, query, mode = "all") {
  console.log(query);
  return new Promise((resolve, reject) => {
    if (mode == "all") {
      db.all(query, (err, rows) => {
        if (err) {
          return console.error(err.message);
        }
        resolve(rows);
      });
    }
    if (mode == "each") {
      db.each(query, (err, row) => {
        if (err) {
          return console.error(err.message);
        }
        resolve(row);
      });
    }
  });
}
