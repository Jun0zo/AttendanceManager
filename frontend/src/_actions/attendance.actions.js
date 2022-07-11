import { useRecoilState } from 'recoil';

import { attendanceAtom } from '../_state/attendance.js';
import { useFetchWrapper } from '../_helpers/fetch-wrapper.js'
import { dateFormat } from '../_helpers/formatting.js';

export function useActions() {
  const fetchWrapper = useFetchWrapper();
  const [attendance, setattendance] = useRecoilState(attendanceAtom);

  const get = (date) => {
    let start_date = dateFormat(date, 'YYYY-MM') + '-00 00:00';
    let end_date = dateFormat(date, 'YYYY-MM') + '-00 00:00';
    return fetchWrapper.post('http://localhost:9000/api/attendance', {start_date, end_date}).then(setattendance)
  }

  return {get}
}