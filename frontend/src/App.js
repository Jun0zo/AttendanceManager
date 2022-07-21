import './App.css';
import React from 'react';
import { RecoilRoot } from 'recoil';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.js';
import AddPlans from './pages/AddPlans.js';
import Attendance from './pages/Attendance';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/attendance" element={<Attendance />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
