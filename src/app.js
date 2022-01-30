import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { UsuarioContext } from './utilidades/context/usuarioContext';
import Estabelecimento from './views/estabelecimento';
import Entrar from './views/home/entrar';
import Inicio from './views/home/index';
import SemAcesso from './views/home/semAcesso';

export default function App() {
  const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;

  return (
    <Routes>
      <Route path='/' element={<Inicio />} />
      <Route path='/sem-acesso' element={<SemAcesso />} />
      <Route path='/entrar' element={!isAuth ? <Entrar /> : <Navigate to='/sem-acesso' />} />
      <Route path='/estabelecimentos' element={isAuth ? <Estabelecimento /> : <Navigate to='/sem-acesso' />} />
    </Routes>
  );
}

