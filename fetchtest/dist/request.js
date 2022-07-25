"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginRequest = loginRequest;
exports.tableRequest = tableRequest;

var _fetchWrapper = _interopRequireDefault(require("./fetchWrapper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var record_sep = "\x1E";
var unit_sep = "\x1F";
var end_of_text = "\x03";
var headers = {
  accept: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01",
  "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
  "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
  "x-requested-with": "XMLHttpRequest"
};

function loginRequest(jquery_id) {
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
    (0, _fetchWrapper["default"])(url, options).then(resolve);
  });
}

function tableRequest(sid) {
  var start_date = "20220723";
  var end_date = "20220723";
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
      cookie: "_xm_webid_1_=-124771825; JSESSIONID=bOcohYEnturQNiYju_CH2_tyMLHB3DQhHwESS0fZLv1SL0C7Tjz1!-1691855770!1798835331",
      Referer: "http://pcpos.spc.co.kr/spcwps/index_ori.jsp",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    body: "SSV:utf-8".concat(record_sep, "JSESSIONID=Rekk5b9NAy5ETWTbCwZpv0nQwJxqZRAyQXmMlGx7RY9mF-QYHZL3!-1691855770!1798835331!1658476412749").concat(record_sep, "_xm_webid_1_=19878378").concat(record_sep, "Dataset:ds_search").concat(record_sep, "_RowType_").concat(unit_sep, "SALES_ORG_CD:STRING(256)").concat(unit_sep, "DRT_FRCS_TYPE:STRING(256)").concat(unit_sep, "STOR_CD:STRING(256)").concat(unit_sep, "FR_DATE:STRING(256)").concat(unit_sep, "TO_DATE:STRING(256)").concat(unit_sep, "PAGE_KEY:STRING(256)").concat(unit_sep, "ROW_COUNT:STRING(256)").concat(unit_sep, "CHK_REAL:STRING(256)").concat(record_sep, "N").concat(unit_sep, "005").concat(unit_sep, "20").concat(unit_sep, "0020280").concat(unit_sep).concat(start_date).concat(unit_sep).concat(end_date).concat(unit_sep).concat(end_of_text).concat(unit_sep).concat(end_of_text).concat(unit_sep, "1").concat(record_sep).concat(record_sep),
    method: "POST",
    mode: "cors",
    credentials: "include"
  };
  return new Promise(function (resolve, reject) {
    (0, _fetchWrapper["default"])(url, options).then(resolve);
  });
}