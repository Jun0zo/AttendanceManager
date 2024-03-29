import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

/* @components */

import { Grid } from '@mui/material';
import BasicTemplate from '../templates/BasicTemplate.js';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

/* components */
import AttendanceTable from '../components/Attendance/AttendanceTable';
import Inputs from '../components/Attendance/Inputs';

/* atom actions */
import { useActions as useAttendanceActions } from '../_actions/attendance.actions.js';

export default function Attendance() {
  const [selected_company_id, setSelectedCompanyId] = useState(-1);
  const [selected_user_id, setSelectedUserId] = useState(-1);
  const [selected_month, setSelectedMonth] = useState(-1);
  return (
    <BasicTemplate>
      <Container>
        근퇴관리
        <Inputs
          selected_company_id={selected_company_id}
          selected_user_id={selected_user_id}
          selected_month={selected_month}
          setSelectedCompanyId={setSelectedCompanyId}
          setSelectedUserId={setSelectedUserId}
          setSelectedMonth={setSelectedMonth}
        />
        <AttendanceTable
          selected_company_id={selected_company_id}
          selected_month={selected_month}
          selected_user_id={selected_user_id}
        />
      </Container>
    </BasicTemplate>
  );
}
