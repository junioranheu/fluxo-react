import Moment from 'moment';
import NProgress from 'nprogress';
import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Aviso } from './componentes/outros/aviso';
import CONSTANTS from './utilidades/const/constUsuarios';
import { Auth, UsuarioContext } from './utilidades/context/usuarioContext';
import { Fetch } from './utilidades/utils/fetch';
import HorarioBrasilia from './utilidades/utils/horarioBrasilia';
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
import RecuperandoSenha from './views/usuario/recuperandoSenha';
import RecuperarSenha from './views/usuario/recuperarSenha';

export default function App() {
  const [isAuth, setIsAuth] = useContext(UsuarioContext); // Contexto do usuário;
  const navigate = useNavigate();

  // Verificar se o token ainda é válido;
  useEffect(() => {
    if (isAuth) {
      const horaAgora = HorarioBrasilia();
      const dataAutenticacao = Auth.getUsuarioLogado()?.dataAutenticacao;
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
  }, [isAuth, navigate, setIsAuth]);

  const [exibirErroAtualizarDataOnline, setExibirErroAtualizarDataOnline] = useState(true);
  useEffect(() => {
    async function atualizarHoraOnline() {
      const url = CONSTANTS.API_URL_POST_ATUALIZAR_HORA_ONLINE;
      const token = Auth.getUsuarioLogado().token;
      const dataAgora = HorarioBrasilia().format('YYYY-MM-DD HH:mm:ss');
      // console.log(token);
      const usuario = {
        usuarioId: Auth.getUsuarioLogado().usuarioId,
        dataOnline: dataAgora,
      };

      let resposta = await Fetch.postApi(url, usuario, token);
      // console.log(resposta);
      if (resposta) {
        // const msg = `Hora on-line atualizada com sucesso para às ${dataAgora}`;
        // console.log(msg);
        // Aviso.success(msg, 5000);
      } else {
        const msg = `Algo deu errado ao atualizar a última data on-line às ${dataAgora}`;
        if (exibirErroAtualizarDataOnline) {
          Aviso.error(msg, 5000);
          setExibirErroAtualizarDataOnline(false);
        }

        console.log(msg);
      }
    }

    if (isAuth) {
      // https://stackoverflow.com/questions/40510560/setinterval-with-setstate-in-react
      const intervaloPollMs = 3000;
      const poll = setInterval(() => {
        // console.log(HorarioBrasilia().format('YYYY-MM-DD HH:mm:ss'));
        // Atualizar a data on-line do usuário logado;
        atualizarHoraOnline();
      }, intervaloPollMs);

      return () => clearInterval(poll);
    }
  }, [isAuth, exibirErroAtualizarDataOnline]);

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
      <Route path='/recuperar-senha' element={!isAuth ? <RecuperarSenha /> : <Navigate to={'/sem-acesso'} />} />
      <Route path='/recuperar-senha/:urlTemporaria' element={!isAuth ? <RecuperandoSenha /> : <Navigate to={'/sem-acesso'} />} />

      <Route path='/gerenciar-estabelecimentos' element={isAuth ? <GerenciarEstabelecimento /> : <Navigate to={'/sem-acesso'} />} />
      <Route path='/estabelecimento/tipo/:tipoEstabelecimentoId' element={<Estabelecimentos />} />
      <Route path='/estabelecimento/:estabelecimentoId' element={<Estabelecimento />} />
    </Routes>
  );
}
