import NProgress from 'nprogress';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShimmerCircularImage, ShimmerText, ShimmerThumbnail } from 'react-shimmer-effects';
import Avaliacao from '../../componentes/avaliacao/avaliacoes';
import Avaliar from '../../componentes/avaliacao/avaliar';
import { Aviso } from '../../componentes/outros/aviso';
import Mapa from '../../componentes/outros/mapa';
import ModalPost from '../../componentes/posts/modalPost';
import Post from '../../componentes/posts/post';
import '../../css/perfil.css';
import SemImagem from '../../static/outro/sem-imagem.webp';
import ImagemTriste from '../../static/svg/triste-1.svg';
import CONSTANTS_ESTABELECIMENTOS from '../../utilidades/const/constEstabelecimentos';
import CONSTANTS_AVALIACOES from '../../utilidades/const/constEstabelecimentosAvaliacoes';
import CONSTANTS_POSTS from '../../utilidades/const/constPosts';
import { Auth, UsuarioContext } from '../../utilidades/context/usuarioContext';
import { Fetch } from '../../utilidades/utils/fetch';
import UrlImagemApi from '../../utilidades/utils/urlImagemApi';

export default function Estabelecimento() {
    const navigate = useNavigate();
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const [usuarioId] = useState(isAuth ? Auth.getUsuarioLogado().usuarioId : null);
    const [urlPagina] = useState(window.location.pathname);
    const [parametroTipoEstabelecimentoId] = useState(urlPagina.substring(urlPagina.lastIndexOf('/') + 1));
    
    // Ao carregar página;
    const padraoEstabelecimento = {
        'estabelecimentoId': parametroTipoEstabelecimentoId,
        'usuarioId': 0,
        'usuarios': {
            'nomeCompleto': '',
            'email': '',
            'nomeUsuarioSistema': ''
        },
        'nome': '',
        'descricao': '',
        'thumbnail': '',
        'rua': '',
        'numeroEndereco': '',
        'cep': '',
        'bairro': '',
        'cidades': {
            'nome': '',
            'estados': {
                'nome': '',
                'sigla': '',
            },
        },
        'avaliacao': 0
    };
    const [estabelecimento, setEstabelecimento] = useState(padraoEstabelecimento);
    const [avaliacoes, setAvaliacoes] = useState([]);
    async function getAvaliacoes() {
        NProgress.start();

        // Pegar o parâmetro da URL;
        const url = `${CONSTANTS_AVALIACOES.API_URL_GET_AVALIACOES_POR_ID}?id=${parametroTipoEstabelecimentoId}`;

        let resposta = await Fetch.getApi(url);
        if (resposta) {
            setAvaliacoes(resposta);
            NProgress.done();
        } else {
            Aviso.error('Algo deu errado ao consultar as avaliações do estabelecimento em questão!', 5000);
        }
    }

    function buscarAvaliacoesNovamente() {
        getAvaliacoes();
    }

    useEffect(() => {
        async function getDetalheEstabelecimento() {
            NProgress.start();

            // Pegar o parâmetro da URL;
            const url = `${CONSTANTS_ESTABELECIMENTOS.API_URL_GET_POR_ID}/${parametroTipoEstabelecimentoId}`;

            let resposta = await Fetch.getApi(url);
            // console.log(resposta);
            if (resposta) {
                setEstabelecimento(resposta);
                NProgress.done();
            } else {
                Aviso.error('Algo deu errado ao consultar o estabelecimento em questão!', 5000);
                navigate('/sem-acesso', { replace: true }); 
            }
        }
        // Pegar os detalhes do estabelecimento;
        getDetalheEstabelecimento();

        // Pegar as avaliações do estabelecimento;
        getAvaliacoes();
    }, [navigate, parametroTipoEstabelecimentoId]);

    // Ao carregar página, e depois que ter o valor em estabelecimento;
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        async function getPosts() {
            setLoadingPosts(true);
            NProgress.start();

            // Pegar o parâmetro da URL;
            const donoEstabelecimentoUsuarioId = estabelecimento.usuarioId;
            const tipoPostId = 2; // 2 = Estabelecimento;
            const url = `${CONSTANTS_POSTS.API_URL_GET_POR_USUARIO_E_TIPO_POST_ID}?usuarioId=${donoEstabelecimentoUsuarioId}&tipoPostId=${tipoPostId}`;
            // console.log(url);

            let resposta = await Fetch.getApi(url);
            if (resposta) {
                setPosts(resposta);
                NProgress.done();
            } else {
                Aviso.error('Algo deu errado ao consultar os posts do estabelecimento em questão!', 5000);
            }
        }

        // Pegar os posts do estabelecimento;
        getPosts();

        if (estabelecimento.nome.length > 0) {
            // Título da página;
            document.title = 'Fluxo — ' + estabelecimento.nome;
        }
    }, [estabelecimento]);

    // Ao carregar página, e depois que ter o valor em posts;
    const [qtdPosts, setQtdPosts] = useState(0);
    const [msgQtdPosts, setMsgQtdPosts] = useState('Posts');
    useEffect(() => {
        setQtdPosts(posts.length);
        setMsgQtdPosts(qtdPosts > 1 || qtdPosts === 0 ? 'Posts' : 'Post');

        setLoadingPosts(false);
    }, [posts, qtdPosts]);

    // Import dinâmico;
    let imagemDinamica = '';
    try {
        imagemDinamica = `${UrlImagemApi}/${estabelecimento.thumbnail}`;
    } catch (err) {
        // console.log('Imagem não existe');        
        // console.log(err);
    }

    // Pegar o width do #ref={divLoadingPosts} para saber o width dos ShimmerThumbnail;
    const divLoadingPosts = useRef(null);
    const [loadingPosts, setLoadingPosts] = useState(false);
    const [widthLoadingPosts, setWidthLoadingPosts] = useState(0);
    useEffect(() => {
        // Pegar o width da div pai do loading dos tipos de estabelecimentos;
        const widthdivLoading = divLoadingPosts.current ? divLoadingPosts.current.offsetWidth : 0;
        const qtdDivsMostradas = 4;
        const widthRespaldo = 15;
        const wl = (widthdivLoading / qtdDivsMostradas) - widthRespaldo;
        // console.log(wl);
        setWidthLoadingPosts(wl);
    }, []);

    // Ao clicar em um post, abra o detalhamento deste;
    const [propsModalDetalhamentoPost, setPropsModalDetalhamentoPost] = useState([]);
    function abrirModalDetalhamentoPost(prop) {
        setPropsModalDetalhamentoPost(prop);
    }

    return (
        <div className='animate__animated animate__fadeIn animate__delay-1sxxx'>
            {/* #01 - Perfil */}
            {
                estabelecimento.usuarioId > 0 ? (
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
                                            <span className='name'>{estabelecimento.nome}</span>
                                            <span className='name-small cor-principal'><i className='fas fa-star'></i>&nbsp;{(estabelecimento.avaliacao > 0 ? estabelecimento.avaliacao : 'Sem avaliação')}</span>
                                        </h3>

                                        <div className='profile-followers profile-followers-desk flexbox'>
                                            <p><span className='posts-amount'>{qtdPosts}</span> {msgQtdPosts}</p>
                                            <p><span className='followers-amount'>0</span>Seguidores</p>
                                            <p><span className='following-amount'>0</span>Seguindo</p>
                                        </div>

                                        <div className='profile-bio'>
                                            <p className='profile-bio-inner'>
                                                <span className='line'>{estabelecimento.descricao}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Direita do perfil */}
                                {(usuarioId === estabelecimento.usuarioId) && (
                                    <div className='profile-right flexbox-start has-text-centered'>
                                        <a className='button is-small is-primary is-rounded' href='/'>Editar loja</a>
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

            {/* #02 - Localização e mapa */}
            <section className='mt-6'>
                <div className='content-section'>
                    <div className='titulo-wrapper'>
                        <h1 className='titulo'>
                            Localização
                        </h1>
                    </div>

                    {
                        estabelecimento.usuarioId > 0 && (
                            <div>
                                Rua {estabelecimento.rua.replace('Rua', '')}, {estabelecimento.numeroEndereco}<br />
                                {estabelecimento.bairro}, {estabelecimento.cidades.nome} — {estabelecimento.cidades.estados.nome}<br />
                                CEP {estabelecimento.cep}
                            </div>
                        )
                    }

                    {/* Loading */}
                    {loadingPosts && (
                        <ShimmerText line={5} gap={10} />
                    )}

                    {/* "usuarioId > 0" significa que todo o loading anterior foi finalizado */}
                    {estabelecimento.usuarioId > 0 && (
                        <Mapa props={estabelecimento} />
                    )}
                </div>
            </section>

            {/* #03 - Avaliações e Avaliar */}
            <section className='mt-6'>
                <div className='columns content-section'>
                    <div className='column is-half'>
                        {/* #03.1 - Avaliações */}
                        <div className='titulo-wrapper'>
                            <h1 className='titulo'>
                                Últimas avaliações
                            </h1>
                        </div>

                        {
                            avaliacoes.length > 0 ? (
                                avaliacoes.map((avaliacao) => (
                                    <Avaliacao props={avaliacao} key={avaliacao.estabelecimentoAvaliacaoId} />
                                ))
                            ) : (
                                <div>
                                    Não existem avaliações para esse estabelecimento ainda
                                </div>
                            )
                        }

                        {/* Loading */}
                        {loadingPosts && (
                            <ShimmerText line={5} gap={10} />
                        )}
                    </div>

                    <div className='column'>
                        {/* #03.2 - Avaliar */}
                        <div className='titulo-wrapper'>
                            <h1 className='titulo'>
                                Avalie sua experiência — <span className='grifar'>{estabelecimento.nome}</span>
                            </h1>
                        </div>

                        {
                            estabelecimento.usuarioId > 0 && (
                                <Avaliar props={estabelecimento} estabelecimentoId={parametroTipoEstabelecimentoId} avaliacoes={buscarAvaliacoesNovamente} />
                            )
                        }
                    </div>
                </div>
            </section>

            {/* #05 - Posts */}
            <section className='content-section mt-6'>
                <div className='titulo-wrapper'>
                    <h1 className='titulo'>
                        Posts
                    </h1>

                    <a className='titulo-link cor-principal-hover' href={() => false}>
                        Ver mais
                    </a>
                </div>

                {/* Posts */}
                <div className='section-part'>
                    {
                        posts.length > 0 && !loadingPosts && (
                            <div className='content-part-line mt-3' ref={divLoadingPosts}>
                                {
                                    posts.map((post) => (
                                        <Post props={post} onClicarPost={() => abrirModalDetalhamentoPost(post)} key={post.postId} />
                                    ))
                                }
                            </div>
                        )
                    }

                    {/* Loading */}
                    {loadingPosts && (
                        <React.Fragment>
                            <ShimmerThumbnail height={widthLoadingPosts} width={widthLoadingPosts} className='m-0' rounded />
                            <ShimmerThumbnail height={widthLoadingPosts} width={widthLoadingPosts} className='m-0' rounded />
                            <ShimmerThumbnail height={widthLoadingPosts} width={widthLoadingPosts} className='m-0' rounded />
                            <ShimmerThumbnail height={widthLoadingPosts} width={widthLoadingPosts} className='m-0' rounded />
                        </React.Fragment>
                    )}

                    {
                        posts.length === 0 && !loadingPosts && (
                            <div>
                                <p>Esse estabelecimento ainda não tem posts</p>

                                <div className='mt-2'>
                                    <figure className='image is-256x256 has-image-centered sem-highlight'>
                                        <img src={ImagemTriste} alt='' />
                                    </figure>
                                </div>
                            </div>
                        )
                    }
                </div>
            </section>

            {/* Quando algum post for clicado, exiba seu detalhamento */}
            {propsModalDetalhamentoPost.postId > 0 && (
                <ModalPost props={propsModalDetalhamentoPost} propsModalAberto={setPropsModalDetalhamentoPost} />
            )}
        </div >
    );
}

