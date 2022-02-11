import NProgress from 'nprogress';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Aviso } from '../../componentes/outros/aviso';
import HeroZika from '../../componentes/outros/heroZika';
import AbaDadosFluxo from '../../componentes/usuarios/abaDadosFluxo';
import AbaDadosPessoais from '../../componentes/usuarios/abaDadosPessoais';
import '../../css/perfilAtualizar.css';
import CONSTANTS_USUARIOS from '../../utilidades/const/constUsuarios';
import { Auth, UsuarioContext } from '../../utilidades/context/usuarioContext';
import { Fetch } from '../../utilidades/utils/fetch';

export default function Atualizar() {
    const navigate = useNavigate();
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const [usuarioId] = useState(isAuth ? Auth.getUsuarioLogado().usuarioId : null);
    const [nomeUsuarioSistema] = useState(isAuth ? Auth.getUsuarioLogado().nomeUsuarioSistema : null);
    const nomeApp = 'Fluxo';

    const [detalhesPerfil, setDetalhesPerfil] = useState([]);
    useEffect(() => {
        async function getDetalhesPerfilUsuario() {
            NProgress.start();

            // Pegar o parâmetro da URL;
            const url = `${CONSTANTS_USUARIOS.API_URL_GET_POR_ID}/${usuarioId}`;
            // console.log(url);

            let resposta = await Fetch.getApi(url);
            // console.log(resposta);
            if (resposta) {
                setDetalhesPerfil(resposta);
                NProgress.done();
            } else {
                Aviso.error(`Algo deu errado ao consultar suas informações!`, 5000);
                navigate('/sem-acesso', { replace: true });
            }
        }

        // Pegar os detalhes do usuário em questão;
        getDetalhesPerfilUsuario();
    }, [navigate, usuarioId]);

    // Detalhes do usuário;
    const [faltaCompletarPerfil, setFaltaCompletarPerfil] = useState(false);
    useEffect(() => {
        // console.log(detalhesPerfil);
        // console.log(detalhesPerfil.usuariosInformacoes);

        if (!detalhesPerfil.usuariosInformacoes) {
            setFaltaCompletarPerfil(true);
        }

        if (detalhesPerfil.usuariosInformacoes) {
            setFaltaCompletarPerfil(false);
        }
    }, [detalhesPerfil]);

    // Abas;
    const [isAbaDadosFluxoSelecionada, setIsAbaDadosFluxoSelecionada] = useState(true);
    const [isAbaDadosPessoaisSelecionada, setIsAbaDadosPessoaisSelecionada] = useState(false);
    function handleClickAbaFluxo() {
        setIsAbaDadosFluxoSelecionada(true);
        setIsAbaDadosPessoaisSelecionada(false);
    }

    function handleClickAbaPessoal() {
        setIsAbaDadosPessoaisSelecionada(true);
        setIsAbaDadosFluxoSelecionada(false);
    }

    // Verificações da foto de perfil e import dinâmico;
    let fotoPerfilDinamica = '';
    try {
        // console.log(detalhesPerfil);
        fotoPerfilDinamica = require('../../upload/usuario/' + detalhesPerfil.foto);
    } catch (err) {
        fotoPerfilDinamica = require('../../static/outro/sem-imagem.webp');
    }

    if (detalhesPerfil.length < 1) {
        return null;
    }

    return (
        <React.Fragment>
            <HeroZika />

            <section className='hero is-medium sem-highlight'>
                <div className='hero-body'>
                    <div className='container'>
                        <div className='columns is-centered'>
                            <div className='column is-12-mobile is-10-tablet is-8-desktop is-7-widescreen'>
                                <div className='box'>
                                    <div className='has-text-centered'>
                                        <h1 className='title'>Seus dados no <span className='grifar'>{nomeApp}</span></h1>
                                    </div>

                                    <hr />

                                    {
                                        faltaCompletarPerfil && (
                                            <div className='notification mt-4'>
                                                <p>Ei, {nomeUsuarioSistema}, <span className='grifar'>parado aí</span> ✋</p>
                                                <p>Preencha seus dados antes de sair por aí usando o sistema 😎</p>
                                                <p>Juramos que manteremos sua privacidade 🤠</p>
                                            </div>
                                        )
                                    }

                                    {/* <!-- #0 - Tabs --> */}
                                    <div className='tabs is-boxed mt-4'>
                                        <ul>
                                            <li onClick={() => handleClickAbaFluxo()} className={isAbaDadosFluxoSelecionada ? 'is-active' : ''}>
                                                <a className='cor-preto'>
                                                    <span className='icon is-small'><i className='fas fa-mobile-alt' aria-hidden='true'></i></span>
                                                    <span>Dados do {nomeApp}</span>
                                                </a>
                                            </li>

                                            <li onClick={() => handleClickAbaPessoal()} className={isAbaDadosPessoaisSelecionada ? 'is-active' : ''}>
                                                <a className='cor-preto'>
                                                    <span className='icon is-small'><i className='fas fa-user-lock' aria-hidden='true'></i></span>
                                                    <span>Dados pessoais</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* <!-- #1 - Dados app --> */}
                                    <div className={isAbaDadosFluxoSelecionada ? '' : 'esconder'}>
                                        <AbaDadosFluxo props={detalhesPerfil} />
                                    </div>

                                    {/* <!-- #2 - Dados pessoais --> */}
                                    <div className={isAbaDadosPessoaisSelecionada ? '' : 'esconder'}>
                                        <AbaDadosPessoais props={detalhesPerfil} />
                                    </div>

                                    <hr className='mt-4' />

                                    <div className='has-text-centered mt-4'>
                                        <input type='submit' className='button is-primary' value='Salvar alterações' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}



