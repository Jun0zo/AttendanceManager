import React from 'react';
import Navbar from '../components/Navbar.js';

export default function BasicTemplate(props) {
  return (
    <div id="template">
      <Navbar />
      {props.children}
    </div>
  );
}
