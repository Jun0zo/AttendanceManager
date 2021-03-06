import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

/* @components */
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';

/* components */
import BasicCard from '../../components/Card/BasicCard.js';
import Inputs from '../../components/AddPlans/Inputs.js';
import BasicTemplate from '../../templates/BasicTemplate.js';

/* atom states */
import { attendanceAtom } from '../../_state/attendance.js';

/* atom actions */
import { useActions as useAttendanceActions } from '../../_actions/attendance.actions.js';

const tableCellStyle = {
  borderLeft: '1px solid rgba(224, 224, 224, 1)',
};

function getRange(start, end) {
  if (start > end) return [];
  return [...Array(end - start).keys()].map((n) => n + start);
}

function OneSideTable(props) {
  const attendance_list = useRecoilValue(attendanceAtom);
  const attendacneActions = useAttendanceActions();

  let [day_list, setDayList] = useState([]);
  let [day_dic, setDayDic] = useState({});

  let today = new Date();
  let [start_date, end_date] = [new Date(), new Date()];
  if (props.position === 'left') {
    start_date.setDate(1);
    end_date.setDate(32 / 2);
  } else {
    start_date.setDate(32 / 2 + 1);
    end_date.setMonth(end_date.getMonth() + 2);
    end_date.setDate(0);
  }

  useEffect(() => {
    setDayList(getRange(start_date.getDate(), end_date.getDate() + 1));
    let day_dic_tmp = {};

    attendance_list.forEach((attendance_info) => {
      let day = attendance_info.attendance_date.split('-')[2]; // .getDate();
      day_dic_tmp[day] = attendance_info;
    });
    console.log(day_dic_tmp);
    setDayDic(day_dic_tmp);
  }, [attendance_list]);

  useEffect(() => {
    let options = {
      start_date: '2022-07-01',
      end_date: '2022-08-01',
    };
    attendacneActions.get(options);
  }, []);

  useEffect(() => {
    window.addEventListener('hover', (e) => {
      console(e.target);
    });
  });

  return (
    <TableContainer component={Paper} sx={{ my: 10 }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">??????</TableCell>
            <TableCell align="center" sx={tableCellStyle}>
              ??????
            </TableCell>
            <TableCell align="center" sx={tableCellStyle}>
              ??????
            </TableCell>
            <TableCell align="center" sx={tableCellStyle}>
              action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {day_list.map((day) => (
            <TableRow key={day}>
              <TableCell align="center">{day + '???'}</TableCell>
              <TableCell
                className="eventCell"
                align="center"
                sx={tableCellStyle}
                onMouseOver={(e) => e.target.classList.add('green')}
                onMouseOut={(e) => e.target.classList.remove('green')}
              >
                {day_dic.hasOwnProperty(day) ? day_dic[day].work_time : ''}
              </TableCell>
              <TableCell className="eventCell" align="center" sx={tableCellStyle}>
                {day_dic.hasOwnProperty(day) ? day_dic[day].go_time : ''}
              </TableCell>
              <TableCell align="center" sx={tableCellStyle}>
                {day_dic.hasOwnProperty(day) ? (
                  <Button size="small" variant="contained">
                    ab
                  </Button>
                ) : (
                  ''
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function AttendanceTable() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <OneSideTable position={'left'} />
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <OneSideTable position={'right'} />
      </Grid>
    </Grid>
  );
}
