import React, { useState, useEffect } from 'react';
import BasicCard from '../components/Card/BasicCard.js';

import { Grid } from '@mui/material';
import BasicTemplate from '../templates/BasicTemplate.js';
import Inputs from '../components/AddPlans/Inputs.js';
import Table from '../components/AddPlans/Table.js';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import { dateFormat } from '../_helpers/formatting.js';

export default function AddPlans() {
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

  useEffect(() => {
    setSelectedMonth(dateFormat(selected_date, 'M'));
  }, [selected_date]);

  const addAttendace = () => {
    console.log(selected_company);
    console.log(selected_user);
    console.log(selected_time);
    console.log(selected_date);
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
                  등록하기
                </Button>
              }
            >
              <Inputs selected_state={selected_state} />
            </BasicCard>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <BasicCard title={selected_month == '' ? '' : selected_month + '월 ' + '출퇴근 목록'}>
              <Table selected_month={selected_month} selected_state={selected_state} />
            </BasicCard>
          </Grid>
        </Grid>
      </Container>
    </BasicTemplate>
  );
}
