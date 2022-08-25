import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

/* @components */
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

/* atom states */
import { userAtom } from '../../_state/user.js';
import { companyAtom } from '../../_state/company.js';

/* atom actions */
import { useActions as useUserActions } from '../../_actions/user.actions.js';
import { useActions as useCompanyActions } from '../../_actions/company.actions.js';

export default function Inputs({
  selected_company_id,
  selected_user_id,
  selected_month,
  setSelectedCompanyId,
  setSelectedUserId,
  setSelectedMonth,
}) {
  const user_list = useRecoilValue(userAtom);
  const company_list = useRecoilValue(companyAtom);

  const userActions = useUserActions();
  const companyActions = useCompanyActions();

  useEffect(() => {
    companyActions.get();
  }, []);

  useEffect(() => {
    if (company_list.length) {
      userActions.get(company_list[0].company_id);
      setSelectedCompanyId(company_list[0].company_id);
    }
  }, [company_list]);

  useEffect(() => {
    if (user_list.length) {
      setSelectedUserId(user_list[0].id);
    }
  }, [user_list]);

  useEffect(() => {
    if (company_list.length) {
      console.log(company_list[0].company_id);
      setSelectedCompanyId(company_list[0].company_id);
    }
  }, [company_list]);

  useEffect(() => {
    console.log(selected_company_id);
  }, [selected_company_id]);

  return (
    <div>
      <TextField
        select
        label="Select"
        value={selected_user_id}
        onChange={(e) => {
          setSelectedUserId(e.target.value);
        }}
      >
        {user_list.map((user) => (
          <MenuItem key={user.id} value={user.id}>
            {user.user_name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Select"
        value={selected_company_id}
        onChange={(e) => {
          setSelectedCompanyId(e.target.value);
        }}
      >
        {company_list.map((company) => (
          <MenuItem key={company.company_id} value={company.company_id}>
            {company.company_name}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}
