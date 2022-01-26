import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import auth from './utilidades/servicoAutenticacao';
import Estabelecimento from './views/estabelecimento';
import Entrar from './views/home/entrar';
import Inicio from './views/home/index';
import SemAcesso from './views/home/semAcesso';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/sem-acesso" element={<SemAcesso />} />
      <Route path="/entrar" element={<Entrar />} />
      <Route path="/estabelecimentos" element={auth.isAuth() ? <Estabelecimento /> : <Navigate to="/sem-acesso" />} />
    </Routes>
  );
}

