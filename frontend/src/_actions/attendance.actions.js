import { useRecoilState } from 'recoil';

import { attendanceAtom } from '../_state/attendance.js';
import { useFetchWrapper } from '../_helpers/fetch-wrapper.js';
import { dateFormat } from '../_helpers/formatting.js';

let search_cache = {};

export function useActions() {
  const fetchWrapper = useFetchWrapper();
  const [attendance, setAttendance] = useRecoilState(attendanceAtom);

  const get = (date, company) => {
    search_cache['date'] = date;
    search_cache['company'] = company;

    let start_date = new Date(date);
    let end_date = new Date(date);
    end_date.setMonth(date.getMonth() + 1);

    let start_date_string = dateFormat(start_date, 'YYYY-MM') + '-00 00:00';
    let end_date_string = dateFormat(end_date, 'YYYY-MM') + '-00 00:00';

    let payload = {
      start_date: start_date_string,
      end_date: end_date_string,
    };

    if (company) {
      payload['company'] = company;
    }
    return fetchWrapper.post('http://localhost:9000/api/attendance', payload).then(setAttendance);
  };

  const put = (user_id, attendance_date, company_id, type) => {
    let payload = {
      user_id,
      attendance_date,
      company_id,
      type,
    };
    return fetchWrapper.put('http://localhost:9000/api/attendance', payload).then((res) => {
      get(search_cache['date'], search_cache['company']);
    });
  };

  return { get, put };
}
