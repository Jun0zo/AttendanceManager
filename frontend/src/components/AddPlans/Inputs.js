import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';

import { companyAtom } from '../../_state/company.js';
import { userAtom } from '../../_state/user.js';
import { useActions as useCompanyActions } from '../../_actions/company.actions.js';
import { useActions as useUserActions } from '../../_actions/user.actions.js';

function BasicSelect(props) {
  const [selected, setSelected] = props.selected_state;

  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel>{props.label}</InputLabel>
        <Select
          value={selected}
          label={props.label}
          onChange={handleChange}
        >
        {props.selectable_list.map(select => (
          <MenuItem value={select.cid ? select.cid : select.uid}>{select.name}</MenuItem>
        ))}
        </Select>
      </FormControl>
    </Box>
  );
}

function ResponsiveDatePickers(props) {
  const [selected_date, setSeletedDate] = props.selected_date_state;
  console.log(selected_date);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        disableFuture
        label="Responsive"
        openTo="year"
        views={['year', 'month', 'day']}
        value={selected_date}
        onChange={(newValue) => {
          setSeletedDate(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

function TimePicker(props) {
  const [selected_time, setSeletedTime] = props.selected_time_state;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticTimePicker
        displayStaticWrapperAs="mobile"
        value={selected_time}
        onChange={(newValue) => {
          setSeletedTime(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}


export default function Inputs(props) {
  const companyActions = useCompanyActions();
  const userActions = useUserActions();
  const company_list = useRecoilValue(companyAtom);
  const user_list = useRecoilValue(userAtom);

  const selected_company_state = props.selected_state.company;
  const selected_user_state = props.selected_state.user;
  const selected_time_state = props.selected_state.time;
  const selected_date_state = props.selected_state.date;

  useEffect(() => {
    companyActions.get();
    userActions.get();
  }, [])
  return (
    <div>
      <Stack spacing={3}>
        <BasicSelect label={'회사'} selectable_list={company_list} selected_state={selected_company_state}/>
        <BasicSelect label={'직원'} selectable_list={user_list} selected_state={selected_user_state}/>
        <ResponsiveDatePickers selected_date_state={selected_date_state}/>
        <TimePicker selected_time_state={selected_time_state}/>
      </Stack>
    </div>
  );
}
