import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Estabelecimento from './views/estabelecimento';
import Dashboard from './views/home';
// import './App.css';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/estabelecimentos" element={<Estabelecimento />} />
    </Routes>
  );
}

