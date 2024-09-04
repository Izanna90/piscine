import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Statistics from './components/Statistics';
import Advice from './components/Advice';
import Events from './components/Events';
import Login from './components/Login';

import Astral from './components/AstralCompatibility';
import Pantry from './components/Pantry';

import CreateAccount from './components/CreateAccount';

import Coaches from './components/Coache';
import Customers from './components/Customer'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/advice" element={<Advice />} />
        <Route path="/events" element={<Events />} />

        <Route path="/astral" element={<Astral />} />
        <Route path="/pantry" element={<Pantry />} />

        <Route path="/account-management" element={<Coaches />} />
        <Route path="/client-profile" element={<Customers />} />

        <Route path="/register" element={<CreateAccount />} />

      </Routes>
    </Router>
  );
};

export default App;
