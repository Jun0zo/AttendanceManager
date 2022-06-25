import './App.css';
import React from 'react';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';

import Login from './pages/Login.js';
import AddPlans from './pages/AddPlans.js';

function App() {
  return (
    <RecoilRoot>
      <AddPlans />
    </RecoilRoot>
  );
}

export default App;
