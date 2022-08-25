import React, { useState, useEffect, Fragment } from 'react';
import { useRecoilValue } from 'recoil';
import styles from './AttendanceTable.module.css';

/* @components */
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';

/* components */
import AttendanceDialog from '../../components/Attendance/AttendanceDialog.js';

/* atom states */
import { attendanceAtom } from '../../_state/attendance.js';

/* atom actions */
import { useActions as useAttendanceActions } from '../../_actions/attendance.actions.js';

/* helpers */
import { timeFormat } from '../../_helpers/formatting.js';

const tableCellStyle = {
  borderLeft: '1px solid rgba(224, 224, 224, 1)',
};

/* modal info */

function getRange(start, end) {
  if (start > end) return [];
  return [...Array(end - start).keys()].map((n) => n + start);
}

function OneSideTable(props) {
  const {
    position,
    handleOpen,
    handleSelect,
    selected_company_id,
    selected_month,
    selected_user_id,
  } = props;

  const openModal = (day, time_type) => {
    let options = { day, time_type };

    options['time'] = day_dic.hasOwnProperty(day) ? day_dic[day].work_time : undefined;
    
    handleSelect(options);
    handleOpen(true);
  };

  const attendance_list = useRecoilValue(attendanceAtom);
  const attendacneActions = useAttendanceActions();

  let [day_list, setDayList] = useState([]);
  let [day_dic, setDayDic] = useState({});

  let today = new Date();
  let [start_date, end_date] = [new Date(), new Date()];
  if (position === 'left') {
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
      user_id: selected_user_id,
      company_id: selected_company_id,
    };
    attendacneActions.get(options);
  }, [selected_user_id, selected_company_id]);

  return (
    <TableContainer component={Paper} sx={{ my: 10 }}>
      <Table aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">날짜</TableCell>
            <TableCell align="center" sx={tableCellStyle}>
              출근
            </TableCell>
            <TableCell align="center" sx={tableCellStyle}>
              퇴근
            </TableCell>
            <TableCell align="center" sx={tableCellStyle}>
              action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {day_list.map((day) => (
            <TableRow key={day}>
              <TableCell align="center">{day + '일'}</TableCell>
              <TableCell
                className="eventCell"
                align="center"
                sx={tableCellStyle}
                onMouseOver={(e) => e.target.classList.add(styles.hoverTableCell)}
                onMouseOut={(e) => e.target.classList.remove(styles.hoverTableCell)}
                onClick={(e) => openModal(day, 'work_time')}
              >
                {day_dic.hasOwnProperty(day) ? day_dic[day].work_time : ''}
              </TableCell>
              <TableCell
                className="eventCell"
                align="center"
                sx={tableCellStyle}
                onMouseOver={(e) => e.target.classList.add(styles.hoverTableCell)}
                onMouseOut={(e) => e.target.classList.remove(styles.hoverTableCell)}
                onClick={(e) => openModal(day, 'go_time')}
              >
                {day_dic.hasOwnProperty(day) ? day_dic[day].go_time : ''}
              </TableCell>
              <TableCell align="center" sx={tableCellStyle}>
                {day_dic.hasOwnProperty(day) ? (
                  <Button size="small" variant="contained" sx={{ fontSize: 8 }}>
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

export default function AttendanceTable({ selected_company_id, selected_month, selected_user_id }) {
  const [open, setOpen] = useState(false);
  const [selected_attendance, setSelectedAttendance] = useState({});

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <OneSideTable
            position={'left'}
            handleOpen={setOpen}
            handleSelect={setSelectedAttendance}
            selected_company_id={selected_company_id}
            selected_month={selected_month}
            selected_user_id={selected_user_id}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <OneSideTable
            position={'right'}
            handleOpen={setOpen}
            handleSelect={setSelectedAttendance}
            selected_company_id={selected_company_id}
            selected_month={selected_month}
            selected_user_id={selected_user_id}
          />
        </Grid>
      </Grid>

      <AttendanceDialog
        open={open}
        handleClose={handleClose}
        selected_attendance={selected_attendance}
        handleSelect={setSelectedAttendance}
      />
    </Fragment>
  );
}
