import NProgress from 'nprogress';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShimmerCircularImage } from 'react-shimmer-effects';
import { Aviso } from '../../componentes/outros/aviso';
import '../../css/perfil.css';
import SemImagem from '../../static/outro/sem-imagem.webp';
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
                                            <span className='name-small cor-principal'>@{detalhesPerfil.nomeUsuarioSistema}</span>
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
                                                            Rua {detalhesPerfil.usuariosInformacoes.rua.replace('Rua', '')}, {detalhesPerfil.usuariosInformacoes.numeroResidencia}<br />
                                                            {detalhesPerfil.usuariosInformacoes.bairro}, {detalhesPerfil.usuariosInformacoes.cidades?.nome} — {detalhesPerfil.usuariosInformacoes.cidades?.estados?.nome}<br />
                                                            CEP {detalhesPerfil.usuariosInformacoes.cep}
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

            <div className='mt-4'>
                <h2>Perfil de @{detalhesPerfil.nomeUsuarioSistema}</h2>

                <code className='mt-2'>
                    dataCriacao: {detalhesPerfil.dataCriacao}<br />
                    dataOnline: {detalhesPerfil.dataOnline}<br />
                    email: {detalhesPerfil.email}<br />
                    foto: {detalhesPerfil.foto}<br />
                    isAtivo: {detalhesPerfil.isAtivo}<br />
                    isPremium: {detalhesPerfil.isPremium}<br />
                    nomeCompleto: {detalhesPerfil.nomeCompleto}<br />
                    nomeUsuarioSistema: {detalhesPerfil.nomeUsuarioSistema}<br />
                    usuarioId: {detalhesPerfil.usuarioId}<br />
                    usuarioTipoId: {detalhesPerfil.usuarioTipoId}<br />
                    usuarioTipos.tipo: {detalhesPerfil.usuarioTipos.tipo}<br />
                    usuarioTipos.descricao: {detalhesPerfil.usuarioTipos.descricao}<br />

                    {
                        detalhesPerfil.usuariosInformacoes && (
                            <React.Fragment>
                                usuariosInformacoes.bairro: {detalhesPerfil.usuariosInformacoes.bairro}<br />
                                usuariosInformacoes.cep: {detalhesPerfil.usuariosInformacoes.cep}<br />
                                usuariosInformacoes.cidadeId: {detalhesPerfil.usuariosInformacoes.cidadeId}<br />
                                usuariosInformacoes.cpf: {detalhesPerfil.usuariosInformacoes.cpf}<br />
                                usuariosInformacoes.dataAniversario: {detalhesPerfil.usuariosInformacoes.dataAniversario}<br />
                                usuariosInformacoes.genero: {detalhesPerfil.usuariosInformacoes.genero}<br />
                                usuariosInformacoes.numeroResidencia: {detalhesPerfil.usuariosInformacoes.numeroResidencia}<br />
                                usuariosInformacoes.rua: {detalhesPerfil.usuariosInformacoes.rua}<br />
                                usuariosInformacoes.telefone: {detalhesPerfil.usuariosInformacoes.telefone}
                            </React.Fragment>
                        )
                    }
                </code>
            </div>
        </React.Fragment>
    );
}



