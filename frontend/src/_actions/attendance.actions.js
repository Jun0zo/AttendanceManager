import { useRecoilState } from 'recoil';

import { attendanceAtom } from '../_state/attendance.js';
import { useFetchWrapper } from '../_helpers/fetch-wrapper.js'
import { dateFormat } from '../_helpers/formatting.js';

export function useActions() {
  const fetchWrapper = useFetchWrapper();
  const [attendance, setattendance] = useRecoilState(attendanceAtom);

  const get = (date) => {
    console.log(date)
    return fetchWrapper.post('http://localhost:9000/api/attendance', {date:dateFormat(date, 'YYYY-MM')}).then(setattendance)
  }

  return {get}
}