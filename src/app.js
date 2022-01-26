import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Auth from './utilidades/servicoAutenticacao';
import Estabelecimento from './views/estabelecimento';
import Entrar from './views/home/entrar';
import Inicio from './views/home/index';
import SemAcesso from './views/home/semAcesso';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Inicio />} />
      <Route path='/sem-acesso' element={<SemAcesso />} />
      <Route path='/entrar' element={!Auth.isAuth() ? <Entrar /> : <Navigate to='/sem-acesso' />} />
      <Route path='/estabelecimentos' element={Auth.isAuth() ? <Estabelecimento /> : <Navigate to='/sem-acesso' />} />
    </Routes>
  );
}

