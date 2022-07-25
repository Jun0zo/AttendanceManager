import { requestLoss } from "./helpers/request";
import db from "./helpers/db";

const record_sep = "\u001e";
const unit_sep = "\u001f";
const end_of_text = "\u0003";

const start_date = "20220722";
const end_date = "20220724";

requestLoss(start_date, end_date).then(([total_loss, losses]) => {
  console.log(losses);
});

function saveLoss(start_date, end_date) {}
