import * as React from 'react';
import { Card, CardHeader, CardContent, CardActions } from '@mui/material';

export default function BasicCard(props) {
  return (
    <Card sx={{ minWidth: 275 }}>
      {props.title !== '' && <CardHeader title={props.title}></CardHeader>}
      <CardContent>{props.children}</CardContent>
      {props.card_action !== '' && <CardActions>{props.card_action}</CardActions>}
    </Card>
  );
}
