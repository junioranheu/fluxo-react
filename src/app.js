import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { UsuarioContext } from './utilidades/context/usuarioContext';
import Estabelecimento from './views/estabelecimento/estabelecimento';
import Estabelecimentos from './views/estabelecimento/estabelecimentos';
import GerenciarEstabelecimento from './views/estabelecimento/gerenciarEstabelecimentos';
import Fluxo from './views/home/fluxo';
import Inicio from './views/home/index';
import Politica from './views/home/politica';
import Reportar from './views/home/reportar';
import SemAcesso from './views/home/semAcesso';
import Sobre from './views/home/sobre';
import Teste from './views/home/teste';
import AtualizarPerfil from './views/usuario/atualizar';
import CriarConta from './views/usuario/criarConta';
import Entrar from './views/usuario/entrar';
import Perfil from './views/usuario/perfil';

export default function App() {
  const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;

  return (
    <Routes>
      <Route path='/' element={<Inicio />} />
      <Route path='/teste' element={<Teste />} />
      <Route path='/fluxo' element={<Fluxo />} />
      <Route path='/sobre' element={<Sobre />} />
      <Route path='/politica-e-termos-de-uso' element={<Politica />} />
      <Route path='/reportar-problema' element={<Reportar />} />
      <Route path='/sem-acesso' element={<SemAcesso />} />
      <Route path='/entrar' element={<Entrar />} />
      <Route path='/criar-conta' element={!isAuth ? <CriarConta /> : <Navigate to={'/sem-acesso'} />} />
      <Route path='/perfil/:nomeUsuarioSistema' element={<Perfil />} />
      <Route path='/perfil/atualizar' element={isAuth ? <AtualizarPerfil /> : <Navigate to={'/sem-acesso'} />} />
      <Route path='/gerenciar-estabelecimentos' element={isAuth ? <GerenciarEstabelecimento /> : <Navigate to={'/sem-acesso'} />} />
      <Route path='/estabelecimento/tipo/:tipoEstabelecimentoId' element={<Estabelecimentos />} />
      <Route path='/estabelecimento/:estabelecimentoId' element={<Estabelecimento />} />
    </Routes>
  );
}

