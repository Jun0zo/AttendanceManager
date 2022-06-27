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

import { companyAtom } from '../../_state/company.js'
import { useActions as useCompanyActions } from '../../_actions/company.actions.js'

function BasicSelect(props) {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const companyActions = useCompanyActions()
  
  const company_list = useRecoilValue(companyAtom)

  useEffect(() => {
    companyActions.get()
    console.log("company actions 3", company_list)
  }, [])

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel>{props.label}</InputLabel>
        <Select
          value={age}
          label={props.label}
          onChange={handleChange}
        >
        {company_list.map(company => (
          <MenuItem value={company.cid}>{company.name}</MenuItem>
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
  return (
    <div>
      <Stack spacing={3}>
        <BasicSelect label={'회사'}/>
        <BasicSelect label={'직원'}/>
        <ResponsiveDatePickers />
      </Stack>
    </div>
  );
}
