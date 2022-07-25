import fetch from "node-fetch";

export default function fetchWrapper(url, options) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      ...options,
      referrer: "http://pcpos.spc.co.kr/util/jsp/ssl.jsp",
      referrerPolicy: "strict-origin-when-cross-origin",
    })
      .then((res) => resolve(res.text()))
      .catch(reject);
  });
}
