import { useRecoilState } from 'recoil';

import { attendanceAtom } from '../_state/attendance.js';
import { useFetchWrapper } from '../_helpers/fetch-wrapper.js';
import { dateFormat } from '../_helpers/formatting.js';

export function useActions() {
  const fetchWrapper = useFetchWrapper();
  const [attendance, setattendance] = useRecoilState(attendanceAtom);

  const get = (date, company) => {
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
    return fetchWrapper.post('http://localhost:9000/api/attendance', payload).then(setattendance);
  };

  return { get };
}
