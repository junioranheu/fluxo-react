import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './views/dashboard/Index';
import Estabelecimento from './views/estabelecimento/Index';
// import './App.css';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/estabelecimentos" element={<Estabelecimento />} />
    </Routes>
  );
}

