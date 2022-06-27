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

import { companyAtom } from '../../_state/company.js';
import { userAtom } from '../../_state/user.js';
import { useActions as useCompanyActions } from '../../_actions/company.actions.js';
import { useActions as useUserActions } from '../../_actions/user.actions.js';

function BasicSelect(props) {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel>{props.label}</InputLabel>
        <Select
          value={age}
          label={props.label}
          onChange={handleChange}
        >
        {props.selectable_list.map(select => (
          <MenuItem value={select.cid}>{select.name}</MenuItem>
        ))}
        </Select>
      </FormControl>
    </Box>
  );
}

function ResponsiveDatePickers() {
  const [value, setValue] = React.useState(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        disableFuture
        label="Responsive"
        openTo="year"
        views={['year', 'month', 'day']}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

export default function Inputs() {
  const companyActions = useCompanyActions();
  const userActions = useUserActions();
  const company_list = useRecoilValue(companyAtom);
  const user_list = useRecoilValue(userAtom);

  useEffect(() => {
    companyActions.get();
    userActions.get();
  }, [])
  return (
    <div>
      <Stack spacing={3}>
        <BasicSelect label={'회사'} selectable_list={company_list}/>
        <BasicSelect label={'직원'} selectable_list={user_list}/>
        <ResponsiveDatePickers />
      </Stack>
    </div>
  );
}
