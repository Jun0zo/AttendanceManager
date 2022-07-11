import React, {useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useRecoilValue } from 'recoil';

import { attendanceAtom } from '../../_state/attendance.js';
import { useActions as useAttendanceActions } from '../../_actions/attendance.actions.js';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function BasicTable(props) {
  const attendacne_list = useRecoilValue(attendanceAtom);
  const attendanceActions = useAttendanceActions()

  const [selected_company, setSeletedCompany] = props.selected_state.company;
  const [selected_user, setSeletedUser] = props.selected_state.user;
  const [selected_date, setSeletedDate] = props.selected_state.date;
  const selected_month = props.selected_month;

  useEffect(() => {
    console.log(selected_date)
    attendanceActions.get(selected_date);
  }, [selected_date])

  useEffect(() => {
    console.log(selected_user)
  }, [selected_user])
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">날짜</TableCell>
            <TableCell align="right">이름</TableCell>
            <TableCell align="right">시간</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attendacne_list.map((row) => (
            <TableRow key={row.attendance_name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="right">
                {row.date}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
