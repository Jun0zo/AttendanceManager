import fetchWrapper from "./fetchWrapper";

const record_sep = "\u001e";
const unit_sep = "\u001f";
const end_of_text = "\u0003";

const jquery_id = "1708400003276587735_1658537216836";

const headers = {
  accept:
    "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01",
  "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
  "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
  "x-requested-with": "XMLHttpRequest",
};

function requestLogin(jquery_id) {
  const url = `http://pcpos.spc.co.kr/spcwps/com/com009.spc?goTo=login&callback=jQuery${jquery_id}`;

  const options = {
    headers: {
      accept:
        "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01",
      "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "x-requested-with": "XMLHttpRequest",
    },
    body: "userId=0020280000&userPw=&decodeYn=N&cInfo=&sessionYn=Y&loginType=N&loginBrower=N&ignoreLoginTypeYN=&isExistedNewCheckResult=false&isExistedNewlogin=false&hqStDiv=ST",
    method: "POST",
    mode: "cors",
    credentials: "include",
  };
  return new Promise((resolve, reject) => {
    fetchWrapper(url, options).then((res) => {
      const text = res.replace(`jQuery${jquery_id}(`, "").replace(")", "");
      resolve(JSON.parse(text));
    });
  });
}

export function requestLoss(start_date, end_date) {
  let url =
    "http://pcpos.spc.co.kr/spcwps/pc/spl725.spc?goTo=selectLossComprehensiveList";
  let options = {
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
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    // body: `SSV:utf-8${record_sep}JSESSIONID=${sid}${record_sep}_xm_webid_1_=19878378${record_sep}Dataset:ds_search${record_sep}_RowType_${unit_sep}SALES_ORG_CD:STRING(256)${unit_sep}DRT_FRCS_TYPE:STRING(256)${unit_sep}STOR_CD:STRING(256)${unit_sep}FR_DATE:STRING(256)${unit_sep}TO_DATE:STRING(256)${unit_sep}PAGE_KEY:STRING(256)${unit_sep}ROW_COUNT:STRING(256)${unit_sep}CHK_REAL:STRING(256)${record_sep}N${unit_sep}005${unit_sep}20${unit_sep}0020280${unit_sep}${start_date}${unit_sep}${end_date}${unit_sep}${end_of_text}${unit_sep}${end_of_text}${unit_sep}1${record_sep}${record_sep}`,
    method: "POST",
    mode: "cors",
    credentials: "include",
  };
  return new Promise((resolve, reject) => {
    requestLogin().then((json) => {
      let sid = json["SID"];
      options.headers.cookie = `_xm_webid_1_=-124771825; JSESSIONID=${sid}`;
      options.body = `SSV:utf-8${record_sep}JSESSIONID=${sid}${record_sep}_xm_webid_1_=19878378${record_sep}Dataset:ds_search${record_sep}_RowType_${unit_sep}SALES_ORG_CD:STRING(256)${unit_sep}DRT_FRCS_TYPE:STRING(256)${unit_sep}STOR_CD:STRING(256)${unit_sep}FR_DATE:STRING(256)${unit_sep}TO_DATE:STRING(256)${unit_sep}PAGE_KEY:STRING(256)${unit_sep}ROW_COUNT:STRING(256)${unit_sep}CHK_REAL:STRING(256)${record_sep}N${unit_sep}005${unit_sep}20${unit_sep}0020280${unit_sep}${start_date}${unit_sep}${end_date}${unit_sep}${end_of_text}${unit_sep}${end_of_text}${unit_sep}1${record_sep}${record_sep}`;

      fetchWrapper(url, options).then((res) => {
        let losses = [];
        let rows = res.split(record_sep).slice(6, -1);
        let column_names = rows
          .shift()
          .trim()
          .split(unit_sep)
          .map((column_name) => column_name.trim("_").split(":")[0]);

        rows.forEach((row) => {
          let row_dic = {};
          let units = row.trim().split(unit_sep);

          units.forEach((unit, index) => {
            let column_name = column_names[index];
            row_dic[column_name] = unit;
          });
          losses.push(row_dic);
        });

        const total_loss = losses.shift();
        resolve([total_loss, losses]);
      });
    });
  });
}
