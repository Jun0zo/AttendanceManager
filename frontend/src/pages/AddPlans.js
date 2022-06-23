import React from 'react';
import TimePicker from '../components/AddPlans/TimePicker.js';
import BasicCard from '../components/Card/BasicCard.js';

import { Grid, TextField } from '@mui/material';
import BasicTemplate from '../templates/BasicTemplate.js';

export default function AddPlans() {
  return (
    <BasicTemplate>
      <Grid container spacing={20}>
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <BasicCard>
              <TimePicker />
            </BasicCard>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <BasicCard>
              <TimePicker />
            </BasicCard>
          </Grid>
        </Grid>
      </Grid>
    </BasicTemplate>
  );
}
