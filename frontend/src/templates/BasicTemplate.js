import React from 'react';
import Navbar from '../components/Navbar.js';
import Container from '@mui/material/Container';

export default function BasicTemplate(props) {
  return (
    <div id="template">
      <Container maxWidth="lg" sx={{ mt: 8 + 5, mb: 5 }}>
        <Navbar />
      </Container>

      {props.children}
    </div>
  );
}
