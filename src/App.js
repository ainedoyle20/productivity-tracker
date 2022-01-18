import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LandingPage from './pages/landing-page/landing-page.component';
import RegisterAndLoginPage from './pages/register-and-login-page/register-and-login-page.component';
import HomePage from './pages/home-page/home-page.component';

import './App.css';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/register" element={<RegisterAndLoginPage/>} />
        <Route path="/home" element={<HomePage/>} />
      </Routes>
    </div>
  );
}

export default App;
