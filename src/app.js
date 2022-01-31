import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { UsuarioContext } from './utilidades/context/usuarioContext';
import Estabelecimento from './views/estabelecimento/estabelecimentos';
import GerenciarEstabelecimento from './views/estabelecimento/gerenciarEstabelecimentos';
import Entrar from './views/home/entrar';
import Inicio from './views/home/index';
import SemAcesso from './views/home/semAcesso';
import Sobre from './views/home/sobre';

export default function App() {
  const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;

  return (
    <Routes>
      <Route path='/' element={<Inicio />} />
      <Route path='/sem-acesso' element={<SemAcesso />} />
      <Route path='/entrar' element={<Entrar />} />
      <Route path='/gerenciar-estabelecimentos' element={isAuth ? <GerenciarEstabelecimento /> : <Navigate to={'/sem-acesso'} />} />
      <Route path='/sobre' element={<Sobre />} />
      <Route path='/estabelecimento/tipo/:tipoEstabelecimentoId' element={<Estabelecimento />} />
    </Routes>
  );
}

