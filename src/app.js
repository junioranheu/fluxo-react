import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Estabelecimento from './views/estabelecimento';
import Entrar from './views/home/entrar';
import Dashboard from './views/home/index';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/entrar" element={<Entrar />} />
      <Route path="/estabelecimentos" element={<Estabelecimento />} />
    </Routes>
  );
}

