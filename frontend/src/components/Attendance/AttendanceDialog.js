import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';

import { timeFormat } from '../../_helpers/formatting.js';

/* atom states */
import { attendanceAtom } from '../../_state/attendance.js';

/* atom actions */
import { useActions as useAttendanceActions } from '../../_actions/attendance.actions.js';

function TimePicker(props) {
  const { selected_attendance, handleSelect } = props;

  console.log(selected_attendance);
  console.log(timeFormat(selected_attendance.time));
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticTimePicker
        displayStaticWrapperAs="mobile"
        value={timeFormat(selected_attendance.time)}
        onChange={(new_value) => {
          console.log('new val', new_value);
          handleSelect((prev_obj) => {
            prev_obj.time = `${new_value.getHours()}:${new_value.getMinutes()}`;
            return prev_obj;
          });
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

export default function AttendanceDialog(props) {
  const { open, handleClose, selected_attendance, handleSelect } = props;

  const attendance_list = useRecoilValue(attendanceAtom);
  const attendacneActions = useAttendanceActions();

  const cancelAction = () => {
    handleClose();
  };

  const applayAction = () => {
    console.log(selected_attendance);
    // selected_att
    // attendacneActions.post();
    handleClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      <DialogContent>
        <TimePicker selected_attendance={selected_attendance} handleSelect={handleSelect} />
      </DialogContent>
      <DialogActions>
        <Button onClick={cancelAction}>취소</Button>
        <Button onClick={applayAction}>적용</Button>
      </DialogActions>
    </Dialog>
  );
}
