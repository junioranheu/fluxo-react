import NProgress from 'nprogress';
import React, { useContext, useEffect, useState } from 'react';
import Avaliacao from '../../componentes/avaliacao/avaliacoes';
import { Aviso } from '../../componentes/outros/aviso';
import '../../css/comentario.css';
import '../../css/mapa.css';
import '../../css/perfilEstabelecimento.css';
import SemImagem from '../../static/outro/sem-imagem.webp';
import CONSTANTS_ESTABELECIMENTOS from '../../utilidades/const/constEstabelecimentos';
import CONSTANTS_AVALIACOES from '../../utilidades/const/constEstabelecimentosAvaliacoes';
import CONSTANTS_POSTS from '../../utilidades/const/constPosts';
import { Auth, UsuarioContext } from '../../utilidades/context/usuarioContext';
import { Fetch } from '../../utilidades/utils/fetch';

export default function Estabelecimento() {
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const [usuarioId] = useState(isAuth ? Auth.getUsuarioLogado().usuarioId : null);
    const [urlPagina] = useState(window.location.pathname);
    const [parametroTipoEstabelecimentoId] = useState(urlPagina.substring(urlPagina.lastIndexOf('/') + 1));

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
    async function getDetalheEstabelecimento() {
        NProgress.start();

        // Pegar o parâmetro da URL;
        const url = `${CONSTANTS_ESTABELECIMENTOS.API_URL_GET_POR_ID}/${parametroTipoEstabelecimentoId}`;

        let resposta = await Fetch.getApi(url);
        if (resposta) {
            setEstabelecimento(resposta);
            NProgress.done();
        } else {
            Aviso.error('Algo deu errado ao consultar o estabelecimento em questão!', 5000);
        }
    }

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

    // Ao carregar página;
    useEffect(() => {
        // Pegar os detalhes do estabelecimento;
        getDetalheEstabelecimento();

        // Pegar as avaliações do estabelecimento;
        getAvaliacoes();
    }, []);

    const [posts, setPosts] = useState([]);
    async function getPosts() {
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

    // Ao carregar página, e depois que ter o valor em estabelecimento;
    useEffect(() => {
        // Pegar os posts do estabelecimento;
        getPosts();
    }, [estabelecimento]);

    console.log(posts);

    // Import dinâmico;
    let imagemDinamica = '';
    try {
        imagemDinamica = require('../../static/' + estabelecimento.thumbnail);
    } catch (err) {
        // console.log('Imagem não existe');        
        // console.log(err);
    }

    return (
        <React.Fragment>
            {/* #01 - Perfil */}
            <div className='profile-top'>
                <div className='profile-info flexbox'>
                    <div className='profile-info-inner view-width flexbox-space-bet-start'>
                        {/* Esquerda do perfil */}
                        <div className='profile-left flexbox-start'>
                            <div className='profile-picture-wrapper profile-picture-large flexbox'>
                                <div className='profile-picture-inner flexbox'>
                                    <img className='profile-picture' src={imagemDinamica} onError={(event) => event.target.src = SemImagem} alt='Erro' />
                                </div>

                                <div className='profile-picture-background'></div>
                            </div>

                            <div className='profile-username-wrapper flexbox-col-start'>
                                <h3 className='profile-username flexbox'>
                                    <span className='name'>{estabelecimento.nome}</span>
                                    <span className='name-small cor-principal'><i className='fas fa-star'></i>&nbsp;{(estabelecimento.avaliacao > 0 ? estabelecimento.avaliacao : 'Sem avaliação')}</span>
                                </h3>

                                <div className='profile-followers profile-followers-desk flexbox'>
                                    <p><span className='posts-amount'>@postsBd.Count()</span>Posts</p>
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
                            <div className='profile-right flexbox-start'>
                                <input type='button' className='button is-small is-primary is-rounded' value='Editar perfil' />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* <#02 - Localização e mapa */}
            <section className='mt-6'>
                <div className='content-section'>
                    <div className='titulo-wrapper'>
                        <h1 className='titulo'>
                            Localização
                        </h1>
                    </div>

                    <div>
                        Rua {estabelecimento.rua.replace('Rua', '')}, {estabelecimento.numeroEndereco}<br />
                        {estabelecimento.bairro}, {estabelecimento.cidades.nome} — {estabelecimento.cidades.estados.nome}<br />
                        CEP {estabelecimento.cep}
                    </div>

                    <div className='mt-3 sem-highlight' id='divMapa'>
                        <div id='mapa' className='mapa'></div>
                    </div>
                </div>
            </section>

            {/* #03 - Avalie */}
            <section className='mt-6'>
                <div className='content-section'>
                    <div className='titulo-wrapper'>
                        <h1 className='titulo'>
                            Avalie sua experiência — <span className='grifar'>{estabelecimento.nome}</span>
                        </h1>
                    </div>

                    <div className='card-avaliacao'>
                    </div>
                </div>
            </section>

            {/* #04 - Avaliações */}
            <section className='mt-6'>
                <div className='content-section'>
                    <div className='titulo-wrapper'>
                        <h1 className='titulo'>
                            Últimas avaliações
                        </h1>
                    </div>

                    {
                        avaliacoes.length > 0 && (
                            avaliacoes.map((avaliacao) => (
                                <Avaliacao props={avaliacao} key={avaliacao.estabelecimentoAvaliacaoId} />
                            ))
                        )
                    }
                </div>
            </section>

            {/* #05 - Posts */}
            <section className='content-section mt-6'>
                <div className='titulo-wrapper'>
                    <h1 className='titulo'>
                        Posts
                    </h1>

                    <a className='titulo-link cor-principal-hover'>
                        Ver mais
                    </a>
                </div>

                {/* Posts */}
                {/* if (postsBd.Count() > 0)
            {
                <div className='section-part mt-3'>
                    <div className='content-part-line'>
                        <!-- Com posts -->
                        @foreach (var p in postsBd.Where(a => a.IsAtivo == 1))
                        {
                            // string semImagem = '/static/outro/cinza.webp';
                            string semImagem = '/static/outro/smile.webp';
                            string midia = (!String.IsNullOrEmpty(p.Midia)) ? ('/static/' + p.Midia) : semImagem;

                            <a className='image-wrapper'>
                                <div className='image-overlay'>
                                    <div className='image-info'>
                                        <div className='image-info-text'>
                                            <h5 className='image-name medium cor-principal'>@p.Titulo</h5>
                                            <p className='image-subtext tiny'>@Html.Raw(p.Conteudo)</p>
                                        </div>

                                        @*<button className='btn-play'></button>*@
                                    </div>
                                </div>

                                <img src='@midia' loading='lazy' width='1' height='1' onerror='this.src='@semImagem';' />
                                <span className='image-icone'>
                                    <i className='far fa-smile' title='Post #@p.PostId'></i>
                                </span>
                            </a>
                        }
                    </div>
                </div>
            }
            else
            {
                <p>Esse estabelecimento ainda não tem posts</p>

                <div className='mt-4'>
                    <figure className='image is-256x256 has-image-centered sem-highlight'>
                        <img src='/static/svg/triste-1.svg'>
                    </figure>
                </div>
            } 
            </section>*/}
            </section>
        </React.Fragment >
    );
}

