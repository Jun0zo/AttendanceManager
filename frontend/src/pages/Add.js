import React from 'react';
import TimePicker from 'components/TimePicker.js';
import BasicCard from 'components/Card/BasicCard.js';

import { Grid, TextField } from '@mui/material';

export default function Add() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} sm={6} md={6} lg={4}>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <BasicCard>
            <TimePicker />
          </BasicCard>
        </Grid>
      </Grid>
    </Grid>
  );
}
