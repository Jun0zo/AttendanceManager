import * as React from 'react';
import { Card, CardHeader, CardContent, CardActions } from '@mui/material';
import Button from '@mui/material/Button';

export default function BasicCard(props) {
  return (
    <Card sx={{ minWidth: 275 }}>
      {props.title !== '' && <CardHeader title={props.title}></CardHeader>}
      <CardContent>{props.children}</CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
