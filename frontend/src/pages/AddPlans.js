import React, { useState } from 'react';
import TimePicker from '../components/AddPlans/TimePicker.js';
import BasicCard from '../components/Card/BasicCard.js';

import { Grid } from '@mui/material';
import BasicTemplate from '../templates/BasicTemplate.js';
import Inputs from '../components/AddPlans/Inputs.js';
import Table from '../components/AddPlans/Table.js';
import Container from '@mui/material/Container';

export default function AddPlans() {
  const selected_state = {
    company: useState(''),
    user: useState('')
  }

  const [selected_company, setSeletedCompany] = selected_state.company;
  const [selected_user, setSeletedUser] = selected_state.user;
  return (
    <BasicTemplate>
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <BasicCard title={"등록"}>
              <Inputs selected_state={selected_state}/>
              <TimePicker />
            </BasicCard>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <BasicCard title="직원목록">
              <Table />
            </BasicCard>
          </Grid>
        </Grid>
      </Container>
    </BasicTemplate>
  );
}
