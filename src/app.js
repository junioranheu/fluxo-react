import Moment from 'moment';
import NProgress from 'nprogress';
import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Aviso } from './componentes/outros/aviso';
import { Auth, UsuarioContext } from './utilidades/context/usuarioContext';
import horarioBrasilia from './utilidades/utils/horarioBrasilia';
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
  const [isAuth, setIsAuth] = useContext(UsuarioContext); // Contexto do usuário;
  const [dataAutenticacao] = useState(isAuth ? Auth.getUsuarioLogado()?.dataAutenticacao : null);
  const navigate = useNavigate();

  // Verificar se o token é válido ainda;
  useEffect(() => {
    if (isAuth) {
      const horaAgora = horarioBrasilia;
      var duracao = Moment.duration(horaAgora.diff(dataAutenticacao));
      var diferencaHoras = duracao.asHours();
      // console.log(diferencaHoras);

      // Foi definido na API, no método ServicoGerarToken() em Services/TokenService.cs, que o token JWT expira em 1 hora...
      // "Imitar" o mesmo comportamento aqui... caso a diferença seja de uma hora, limpe o token e mostre uma mensagem ao usuário;
      const limiteExpirarTokenHoras = 1;
      if (diferencaHoras >= limiteExpirarTokenHoras) {
        NProgress.start();
        Aviso.warn('A sua sessão expirou!<br/>Renove sua sessão fazendo login novamente no Fluxo 😎', 15000);

        // Desatribuir autenticação ao contexto de usuário;
        setIsAuth(false);

        // Deslogar;
        Auth.deleteUsuarioLogado();
        navigate('/sem-acesso', { replace: true });
        NProgress.done();
      }
    }
  }, [isAuth, dataAutenticacao])

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

