import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import BasicCard from '../components/Card/BasicCard.js';
import { Grid } from '@mui/material';
import BasicTemplate from '../templates/BasicTemplate.js';
import Inputs from '../components/AddPlans/Inputs.js';
import Table from '../components/AddPlans/Table.js';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import { dateFormat } from '../_helpers/formatting.js';
import { companyAtom } from '../_state/company.js';
import { userAtom } from '../_state/user.js';

import { useActions as useAttendanceActions } from '../_actions/attendance.actions.js';

export default function AddPlans() {
  const company_list = useRecoilValue(companyAtom);
  const user_list = useRecoilValue(userAtom);

  const selected_state = {
    company: useState(''),
    user: useState(''),
    time: useState(new Date()),
    date: useState(new Date()),
  };

  const [selected_company, setSeletedCompany] = selected_state.company;
  const [selected_user, setSeletedUser] = selected_state.user;
  const [selected_time, setSeletedTime] = selected_state.time;
  const [selected_date, setSeletedDate] = selected_state.date;

  const [selected_month, setSelectedMonth] = useState('');
  const [table_title, setTableTitle] = useState('');

  const attendacneActions = useAttendanceActions();

  useEffect(() => {
    setSelectedMonth(dateFormat(selected_date, 'M'));
  }, [selected_date]);

  useEffect(() => {
    console.log(company_list);
    let target_company = company_list.filter(
      (company_info) => company_info.company_id === selected_company,
    );
    let target_user = user_list.filter((user_info) => user_info.id === selected_user);

    if (target_company.length || target_user.length) {
      target_company = target_company.length ? target_company[0].company_name : '';
      target_user = target_user.length ? target_user[0].user_name : '전체';

      setTableTitle(`${selected_month}월 출퇴근 목록 (${target_company} - ${target_user})`);
      console.log(table_title);
    } else {
      setTableTitle(`${selected_month}월 출퇴근 목록 (전체)`);
    }
  }, [selected_user, selected_company, selected_month]);

  const addAttendace = () => {
    if (!selected_company) {
      alert('회사를 먼저 선택하세요!');
      return;
    } else if (!selected_user) {
      alert('유저를 먼저 선택하세요!');
      return;
    } else if (!selected_time) {
      alert('시간을 먼저 선택하세요!');
      return;
    } else if (!selected_date) {
      alert('날짜를 먼저 선택하세요!');
      return;
    }

    const attendance_date =
      dateFormat(selected_date, 'YYYY-MM-DD') + ' ' + dateFormat(selected_time, 'HH:MM');
    attendacneActions.put(selected_user, attendance_date, selected_company, 'go');
  };

  return (
    <BasicTemplate>
      <Container maxWidth="lg" sx={{ mt: 8 + 5, mb: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <BasicCard
              title={'등록'}
              card_action={
                <Button variant="contained" onClick={addAttendace}>
                  출근등록
                </Button>
              }
            >
              <Inputs selected_state={selected_state} />
            </BasicCard>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <BasicCard title={table_title}>
              <Table selected_month={selected_month} selected_state={selected_state} />
            </BasicCard>
          </Grid>
        </Grid>
      </Container>
    </BasicTemplate>
  );
}
