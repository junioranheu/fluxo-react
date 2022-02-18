import NProgress from 'nprogress';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShimmerCircularImage, ShimmerText } from 'react-shimmer-effects';
import Avaliacao from '../../componentes/avaliacao/avaliacoes';
import { Aviso } from '../../componentes/outros/aviso';
import '../../css/perfil.css';
import SemImagem from '../../static/outro/sem-imagem.webp';
import CONSTANTS_AVALIACOES from '../../utilidades/const/constEstabelecimentosAvaliacoes';
import CONSTANTS_USUARIOS from '../../utilidades/const/constUsuarios';
import { Auth, UsuarioContext } from '../../utilidades/context/usuarioContext';
import { Fetch } from '../../utilidades/utils/fetch';
import UrlImagemApi from '../../utilidades/utils/urlImagemApi';

export default function Perfil() {
    const navigate = useNavigate();
    const [urlPagina] = useState(window.location.pathname);
    const [parametroPerfilUsuario] = useState(urlPagina.substring(urlPagina.lastIndexOf('@') + 1));

    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const [usuarioId] = useState(isAuth ? Auth.getUsuarioLogado().usuarioId : null);

    const [detalhesPerfil, setDetalhesPerfil] = useState([]);
    useEffect(() => {
        async function getDetalhesPerfilUsuario() {
            NProgress.start();

            // Pegar o parâmetro da URL;
            const url = `${CONSTANTS_USUARIOS.API_URL_GET_POR_NOME_USUARIO_SISTEMA}?nomeUsuarioSistema=${parametroPerfilUsuario}`;
            // console.log(url);

            let resposta = await Fetch.getApi(url);
            // console.log(resposta);
            if (resposta) {
                setDetalhesPerfil(resposta);
                NProgress.done();
            } else {
                Aviso.error(`Algo deu errado ao consultar os detalhes do usuário @${parametroPerfilUsuario}!`, 5000);
                navigate('/sem-acesso', { replace: true });
            }
        }

        // Pegar os detalhes do usuário em questão;
        getDetalhesPerfilUsuario();
    }, [navigate, parametroPerfilUsuario]);
    // console.log(detalhesPerfil);

    // Import dinâmico;
    let imagemDinamica = '';
    try {
        imagemDinamica = `${UrlImagemApi}/usuario/${detalhesPerfil.foto}`;
    } catch (err) {
        // console.log('Imagem não existe');        
        // console.log(err);
    }

    // Avaliações feitas pelo usuário;
    const [loadingAvaliacoes, setLoadingAvaliacoes] = useState(false);
    const [avaliacoes, setAvaliacoes] = useState([]);
    useEffect(() => {
        async function getAvaliacoes() {
            setLoadingAvaliacoes(true);
            NProgress.start();

            // Pegar o parâmetro da URL;
            const url = `${CONSTANTS_AVALIACOES.API_URL_GET_AVALIACOES_POR_ID_USUARIO}?id=${detalhesPerfil.usuarioId}`;

            let resposta = await Fetch.getApi(url);
            if (resposta) {
                setAvaliacoes(resposta);
                setLoadingAvaliacoes(false);
                NProgress.done();
            } else {
                setLoadingAvaliacoes(false);
                Aviso.error('Algo deu errado ao consultar as avaliações do estabelecimento em questão!', 5000);
            }
        }

        if (detalhesPerfil.usuarioId) {
            getAvaliacoes();
        }
    }, [detalhesPerfil]);

    if (detalhesPerfil.length < 1) {
        return null;
    }

    return (
        <React.Fragment>
            {/* #01 - Perfil */}
            {
                detalhesPerfil.usuarioId > 0 ? (
                    <div className='profile-top'>
                        <div className='profile-info flexbox'>
                            <div className='profile-info-inner view-width flexbox-space-bet-start'>
                                {/* Esquerda do perfil */}
                                <div className='profile-left flexbox-start'>
                                    <div className='profile-picture-wrapper profile-picture-large flexbox'>
                                        <div className='profile-picture-inner flexbox'>
                                            <img className='profile-picture' src={imagemDinamica} onError={(event) => event.target.src = SemImagem} alt='' />
                                        </div>

                                        <div className='profile-picture-background'></div>
                                    </div>

                                    <div className='profile-username-wrapper flexbox-col-start'>
                                        <h3 className='profile-username flexbox'>
                                            <span className='name'>{detalhesPerfil.nomeCompleto}</span>
                                            <span className='name-small cor-principal'>/@{detalhesPerfil.nomeUsuarioSistema}</span>
                                        </h3>

                                        <div className='profile-followers profile-followers-desk flexbox'>
                                            <p><span className='followers-amount'>0</span>Seguidores</p>
                                            <p><span className='following-amount'>0</span>Seguindo</p>
                                        </div>

                                        {
                                            detalhesPerfil.usuariosInformacoes && (
                                                <div className='profile-bio'>
                                                    <p className='profile-bio-inner'>
                                                        <span className='line'>
                                                            Oi, né... imagina que aqui tem uma bio
                                                        </span>
                                                    </p>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>

                                {/* Direita do perfil */}
                                {(usuarioId === detalhesPerfil.usuarioId) && (
                                    <div className='profile-right flexbox-start'>
                                        <a className='button is-small is-primary is-rounded' href='/perfil/atualizar'>Editar perfil</a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='has-text-centered'>
                        <ShimmerCircularImage size={250} />
                    </div>
                )
            }

            {/* #02 - Localização*/}
            <section className='mt-6'>
                <div className='content-section'>
                    <div className='titulo-wrapper'>
                        <h1 className='titulo'>
                            Localização
                        </h1>
                    </div>

                    {
                        detalhesPerfil.usuariosInformacoes ? (
                            <div>
                                Rua {detalhesPerfil.usuariosInformacoes.rua.replace('Rua', '')}, {detalhesPerfil.usuariosInformacoes.numeroResidencia}<br />
                                {detalhesPerfil.usuariosInformacoes.bairro}, {detalhesPerfil.usuariosInformacoes.cidades?.nome} — {detalhesPerfil.usuariosInformacoes.cidades?.estados?.nome}<br />
                                CEP {detalhesPerfil.usuariosInformacoes.cep}
                            </div>
                        ) : (
                            <div>
                                Esse usuário ainda não definiu sua localização
                            </div>
                        )
                    }
                </div>
            </section>

            {/* #03 - Avaliações e Avaliar */}
            <section className='mt-6'>
                <div className='content-section'>
                    {/* #03.1 - Avaliações */}
                    <div className='titulo-wrapper'>
                        <h1 className='titulo'>
                            Últimas avaliações de <span className='grifar'>@{detalhesPerfil.nomeUsuarioSistema}</span>
                        </h1>
                    </div>

                    {
                        !loadingAvaliacoes && avaliacoes.length > 0 ? (
                            avaliacoes.map((avaliacao) => (
                                <Avaliacao props={avaliacao} key={avaliacao.estabelecimentoAvaliacaoId} />
                            ))
                        ) : (
                            <div className='animate__animated animate__fadeIn animate__delay-1s'>
                                Esse usuário ainda não fez nenhuma avaliação
                            </div>
                        )
                    }

                    {/* Loading */}
                    {loadingAvaliacoes && (
                        <ShimmerText line={5} gap={10} />
                    )}
                </div>
            </section>
        </React.Fragment>
    );
}



