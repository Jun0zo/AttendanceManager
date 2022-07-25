"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestLoss = requestLoss;

var _fetchWrapper = _interopRequireDefault(require("./fetchWrapper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var record_sep = "\x1E";
var unit_sep = "\x1F";
var end_of_text = "\x03";
var jquery_id = "1708400003276587735_1658537216836";
var headers = {
  accept: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01",
  "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
  "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
  "x-requested-with": "XMLHttpRequest"
};

function requestLogin(jquery_id) {
  var url = "http://pcpos.spc.co.kr/spcwps/com/com009.spc?goTo=login&callback=jQuery".concat(jquery_id);
  var options = {
    headers: {
      accept: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01",
      "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "x-requested-with": "XMLHttpRequest"
    },
    body: "userId=0020280000&userPw=&decodeYn=N&cInfo=&sessionYn=Y&loginType=N&loginBrower=N&ignoreLoginTypeYN=&isExistedNewCheckResult=false&isExistedNewlogin=false&hqStDiv=ST",
    method: "POST",
    mode: "cors",
    credentials: "include"
  };
  return new Promise(function (resolve, reject) {
    (0, _fetchWrapper["default"])(url, options).then(function (res) {
      var text = res.replace("jQuery".concat(jquery_id, "("), "").replace(")", "");
      resolve(JSON.parse(text));
    });
  });
}

function requestLoss(start_date, end_date) {
  var url = "http://pcpos.spc.co.kr/spcwps/pc/spl725.spc?goTo=selectLossComprehensiveList";
  var options = {
    headers: {
      accept: "application/xml, text/xml, */*",
      "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
      "cache-control": "no-cache, no-store",
      "content-type": "text/xml",
      expires: "-1",
      "if-modified-since": "Thu, 01 Jun 1970 00:00:00 GMT",
      pragma: "no-cache",
      "x-requested-with": "XMLHttpRequest",
      // cookie:
      //   "_xm_webid_1_=-124771825; JSESSIONID=bOcohYEnturQNiYju_CH2_tyMLHB3DQhHwESS0fZLv1SL0C7Tjz1!-1691855770!1798835331",
      Referer: "http://pcpos.spc.co.kr/spcwps/index_ori.jsp",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    // body: `SSV:utf-8${record_sep}JSESSIONID=${sid}${record_sep}_xm_webid_1_=19878378${record_sep}Dataset:ds_search${record_sep}_RowType_${unit_sep}SALES_ORG_CD:STRING(256)${unit_sep}DRT_FRCS_TYPE:STRING(256)${unit_sep}STOR_CD:STRING(256)${unit_sep}FR_DATE:STRING(256)${unit_sep}TO_DATE:STRING(256)${unit_sep}PAGE_KEY:STRING(256)${unit_sep}ROW_COUNT:STRING(256)${unit_sep}CHK_REAL:STRING(256)${record_sep}N${unit_sep}005${unit_sep}20${unit_sep}0020280${unit_sep}${start_date}${unit_sep}${end_date}${unit_sep}${end_of_text}${unit_sep}${end_of_text}${unit_sep}1${record_sep}${record_sep}`,
    method: "POST",
    mode: "cors",
    credentials: "include"
  };
  return new Promise(function (resolve, reject) {
    requestLogin().then(function (json) {
      var sid = json["SID"];
      console.log("sid", sid);
      options.headers.cookie = "_xm_webid_1_=-124771825; JSESSIONID=".concat(sid);
      options.body = "SSV:utf-8".concat(record_sep, "JSESSIONID=").concat(sid).concat(record_sep, "_xm_webid_1_=19878378").concat(record_sep, "Dataset:ds_search").concat(record_sep, "_RowType_").concat(unit_sep, "SALES_ORG_CD:STRING(256)").concat(unit_sep, "DRT_FRCS_TYPE:STRING(256)").concat(unit_sep, "STOR_CD:STRING(256)").concat(unit_sep, "FR_DATE:STRING(256)").concat(unit_sep, "TO_DATE:STRING(256)").concat(unit_sep, "PAGE_KEY:STRING(256)").concat(unit_sep, "ROW_COUNT:STRING(256)").concat(unit_sep, "CHK_REAL:STRING(256)").concat(record_sep, "N").concat(unit_sep, "005").concat(unit_sep, "20").concat(unit_sep, "0020280").concat(unit_sep).concat(start_date).concat(unit_sep).concat(end_date).concat(unit_sep).concat(end_of_text).concat(unit_sep).concat(end_of_text).concat(unit_sep, "1").concat(record_sep).concat(record_sep);
      (0, _fetchWrapper["default"])(url, options).then(function (res) {
        console.log(res);
        var losses = [];
        var rows = res.split(record_sep).slice(6, -1);
        var column_names = rows.shift().trim().split(unit_sep).map(function (column_name) {
          return column_name.trim("_").split(":")[0];
        });
        rows.forEach(function (row) {
          var row_dic = {};
          var units = row.trim().split(unit_sep);
          units.forEach(function (unit, index) {
            var column_name = column_names[index];
            row_dic[column_name] = unit;
          });
          losses.push(row_dic);
        });
        var total_loss = losses.shift();
        resolve([total_loss, losses]);
      });
    });
  });
}