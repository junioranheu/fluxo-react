import NProgress from 'nprogress';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ShimmerThumbnail } from 'react-shimmer-effects';
import Categoria from '../../componentes/categorias/categoria';
import { Aviso } from '../../componentes/outros/aviso';
import AvisoNenhumRegistro from '../../componentes/outros/avisoNenhumRegistro';
import Card from '../../componentes/outros/card';
import InputFiltroPrincipal from '../../componentes/outros/inputFiltroPrincipal';
import Item from '../../componentes/outros/item';
import InfoUsuario from '../../componentes/usuarios/infoUsuario';
import CONSTANTS_CATEGORIAS from '../../utilidades/const/constCategorias';
import CONSTANTS_TIPOS_ESTABELECIMENTOS from '../../utilidades/const/constTiposEstabelecimentos';
import { Auth, UsuarioContext } from '../../utilidades/context/usuarioContext';
import { Fetch } from '../../utilidades/utils/fetch';
import HorarioBrasilia from '../../utilidades/utils/horarioBrasilia';
 
export default function Index() {
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const [usuarioId] = useState(isAuth ? Auth.getUsuarioLogado().usuarioId : null);

    // Refs;
    const divLoadingTiposEstabelecimentos = useRef(null);

    // Cards;
    const listaCards = [
        {
            'id': 1,
            'mostrarApenasAutenticado': true,
            'usuarioTipoId': 2, // Normal;
            'imagem': 'static/cards/loja.webp',
            'titulo': 'Torne-se um parceiro',
            'descricao': 'Quer fazer parte do Fluxo como uma loja, para ganhar mais visibilidade, bla bla bla...',
            'url': '/',
            'mensagemBotao': 'Clique aqui',
            'icone': 'fas fa-store'
        },

        {
            'id': 2,
            'mostrarApenasAutenticado': true,
            'usuarioTipoId': 3, // Estabelecimento;
            'imagem': 'static/cards/loja.webp',
            'titulo': 'Perfil',
            'descricao': 'Oi, né?<br/>Veja o perfil de seu estabelecimento',
            'url': 'aaaaaaaaa',
            'mensagemBotao': 'Ver',
            'icone': 'fas fa-store'
        },

        {
            'id': 3,
            'mostrarApenasAutenticado': true,
            'usuarioTipoId': null,
            'imagem': 'static/cards/sobre.webp',
            'titulo': 'Sobre',
            'descricao': 'Bla bla bla...<br/>Descubra mais sobre o Fluxo',
            'url': '/sobre',
            'mensagemBotao': 'Descobrir',
            'icone': 'fas fa-book'
        },

        {
            'id': 4,
            'mostrarApenasAutenticado': false,
            'usuarioTipoId': null,
            'imagem': 'static/cards/entrar.webp',
            'titulo': 'Faça login',
            'descricao': 'Bla bla bla<br />Teste 1, 2, 3...',
            'url': '/entrar',
            'mensagemBotao': 'Entrar',
            'icone': 'fas fa-sign-in-alt'
        },

        {
            'id': 5,
            'mostrarApenasAutenticado': false,
            'usuarioTipoId': null,
            'imagem': 'static/cards/comida.webp',
            'titulo': 'Fluxo',
            'descricao': 'Veja nossa página institucional<br />Conheça mais sobre a gente!',
            'url': '/fluxo',
            'mensagemBotao': 'Ver',
            'icone': 'fas fa-smile-wink'
        }
    ];
    const [cards] = useState(listaCards);

    // Olá;
    function ola() {
        var hora = HorarioBrasilia().hour();
        var msg = '';

        if (hora < 12) {
            msg = 'Bom dia';
        } else if (hora < 18) {
            msg = 'Boa tarde';
        } else {
            msg = 'Boa noite';
        }

        if (isAuth) {
            msg += ', <span class="grifar">' + Auth.getUsuarioLogado().nomeUsuarioSistema + '</span>!';
        } else {
            msg += '!<br/>Bem-vindo ao Fluxo';
        }

        return msg;
    }
    const [msgOla] = useState(ola());

    // Get categorias;
    const [categorias, setCategorias] = useState([]);
    async function getCategorias() {
        const url = CONSTANTS_CATEGORIAS.API_URL_GET_TODOS;
        // console.log(url);

        let resposta = await Fetch.getApi(url);
        if (resposta) {
            setCategorias(resposta);
        } else {
            Aviso.error('Algo deu errado ao buscar as categorias<br/>Consulte o F12!', 5000);
        }
    }

    // Get tipos de estabelecimentos;
    const [tiposEstabelecimentos, setTiposEstabelecimentos] = useState([]);
    async function getTiposEstabelecimentos() {
        NProgress.start();
        setLoadingTiposEstabelecimentos(true);
        const url = CONSTANTS_TIPOS_ESTABELECIMENTOS.API_URL_GET_TODOS;
        // console.log(url);

        let resposta = await Fetch.getApi(url);
        if (resposta) {
            // Filtrar array;
            resposta = resposta.filter(({ estabelecimentoTipoId }) => estabelecimentoTipoId !== 1); // Traficante;
            resposta = resposta.filter(({ estabelecimentoTipoId }) => estabelecimentoTipoId !== 14); // Sex shop;
            resposta = resposta.filter(({ estabelecimentoTipoId }) => estabelecimentoTipoId !== 20); // Motel;
            resposta = resposta.filter(({ estabelecimentoTipoId }) => estabelecimentoTipoId !== 23); // Bar;
            // console.log(resposta);

            setTiposEstabelecimentos(resposta);
            setLoadingTiposEstabelecimentos(false);
            NProgress.done();
        } else {
            Aviso.error('Algo deu errado ao buscar os tipos de estabelecimentos<br/>Consulte o F12!', 5000);
            NProgress.done();
        }
    }

    // Ao carregar página;
    useEffect(() => {
        document.title = 'Fluxo — Início'

        // Pegar todas as categorias;
        getCategorias();

        // Pegar todos os tipos de estabelecimentos;
        getTiposEstabelecimentos();
    }, [])

    // Lógica dos clicks das categorias;
    const [categoriasSelecionadas, setCategoriasSelecionadas] = useState([]);
    function handleAdicionarCategoria(prop) {
        // console.log(prop);
        setCategoriasSelecionadas(prop);
    }

    function handleRemoverCategoria(prop) {
        const index = categoriasSelecionadas.findIndex((c, index) => {
            if (c.categoriaId === prop[0].categoriaId) {
                return true;
            }

            return false;
        });

        if (index !== -1) {
            var categoriasCopy = [...categoriasSelecionadas];
            categoriasCopy.splice(index, 1);
            setCategoriasSelecionadas(categoriasCopy);
        }
    }

    // Ao mudar o 'categoriasSelecionadas';
    const [isCategoriaSelecionaTodosSelecionado, setIsCategoriaSelecionaTodosSelecionado] = useState(true);
    useEffect(() => {
        if (categoriasSelecionadas.length > 0) {
            setIsCategoriaSelecionaTodosSelecionado(false);
        } else {
            setIsCategoriaSelecionaTodosSelecionado(true);
        }
    }, [categoriasSelecionadas])

    function handleClickTodasCategorias() {
        setIsCategoriaSelecionaTodosSelecionado(true);
        setCategorias([])
        getCategorias();
        setTiposEstabelecimentos([]);
        getTiposEstabelecimentos();
        setCategoriasSelecionadas([]);
    }

    // Filtro de busca (input);
    const [inputFiltro, setInputFiltro] = useState('');
    function handleInputFiltro(e) {
        setInputFiltro(e);
    }

    // Pegar o width do #ref={divLoadingTiposEstabelecimentos} para saber o width dos ShimmerThumbnail;
    const [loadingTiposEstabelecimentos, setLoadingTiposEstabelecimentos] = useState(false);
    const [widthLoadingTiposEstabelecimentos, setWidthLoadingTiposEstabelecimentos] = useState(0);
    useEffect(() => {
        // Pegar o width da div pai do loading dos tipos de estabelecimentos;
        const widthdivLoadingTiposEstabelecimentos = divLoadingTiposEstabelecimentos.current ? divLoadingTiposEstabelecimentos.current.offsetWidth : 0;
        const qtdDivsMostradas = 4;
        const widthRespaldo = 15;
        const widthLoading = (widthdivLoadingTiposEstabelecimentos / qtdDivsMostradas) - widthRespaldo;
        // console.log(widthLoading);
        setWidthLoadingTiposEstabelecimentos(widthLoading);
    }, []);

    // Verificar se a busca do usuário encontrou algo;
    const [isMostrarNaoEncontrouResultados, setIsMostrarNaoEncontrouResultados] = useState(false);
    useEffect(() => {
        if (tiposEstabelecimentos.length > 0) {
            const itens = divLoadingTiposEstabelecimentos.current?.innerText;
            // console.log(itens.length);

            if (!itens) {
                // console.log('NOPE');
                setIsMostrarNaoEncontrouResultados(true);
            }
            else {
                // console.log('YES');
                setIsMostrarNaoEncontrouResultados(false);
            }
        }
    });

    return (
        <React.Fragment>
            {/* Info usuário */}
            {(process.env.NODE_ENV === 'development' || usuarioId === 2) && (
                <InfoUsuario />
            )}

            {/* Cards */}
            <section className='content-section mt-6'>
                <div className='card-ui-wrapper'>
                    {cards.map((card) => (
                        <Card props={card} key={card.id} />
                    ))}
                </div>
            </section>

            {/* Outros conteúdos */}
            <section className='mt-6'>
                {/* Olá */}
                <section className='content-section mt-4'>
                    <h1 className='titulo'><span dangerouslySetInnerHTML={{ __html: msgOla }}></span></h1>
                </section>

                {/* Campo de busca */}
                <div className='main-area-header mt-3'>
                    <InputFiltroPrincipal onInput={handleInputFiltro} placeholder='Filtre os tipos de estabelecimentos aqui também...' />
                </div>

                {/* Categorias */}
                <section className='content-section mt-6'>
                    <h1 className='titulo' style={{ marginTop: '8px !important', marginBottom: '8px !important' }}>
                        Categorias
                    </h1>

                    <div className='access-links'>
                        <div className='categoria pointer' title='Mostrar todos'>
                            <div className='access-icon' onClick={() => handleClickTodasCategorias()} style={{ backgroundColor: (isCategoriaSelecionaTodosSelecionado ? 'var(--cor-principal)' : '') }}>
                                <i className='fas fa-globe-americas'></i>
                            </div>

                            <span className='access-text'>Todas as categorias</span>
                        </div>

                        {
                            categorias.length > 0 && (
                                categorias.map((categoria) => (
                                    <Categoria props={categoria} key={categoria.estabelecimentoCategoriaId}
                                        onAdicionarCategoria={handleAdicionarCategoria} onRemoverCategoria={handleRemoverCategoria}
                                    />
                                ))
                            )
                        }
                    </div>
                </section>

                {/* Tipos de estabelecimentos */}
                <section className='content-section mt-6'>
                    <div className='titulo-wrapper'>
                        <h1 className='titulo'>
                            Tipos de estabelecimentos
                        </h1>
                    </div>

                    {isMostrarNaoEncontrouResultados && (
                        <AvisoNenhumRegistro />
                    )}

                    <div className='section-part mt-3'>
                        <div className='content-part-line' ref={divLoadingTiposEstabelecimentos}>
                            {/* Loading */}
                            {loadingTiposEstabelecimentos && (
                                <React.Fragment>
                                    <ShimmerThumbnail height={widthLoadingTiposEstabelecimentos} width={widthLoadingTiposEstabelecimentos} className='m-0' rounded />
                                    <ShimmerThumbnail height={widthLoadingTiposEstabelecimentos} width={widthLoadingTiposEstabelecimentos} className='m-0' rounded />
                                    <ShimmerThumbnail height={widthLoadingTiposEstabelecimentos} width={widthLoadingTiposEstabelecimentos} className='m-0' rounded />
                                    <ShimmerThumbnail height={widthLoadingTiposEstabelecimentos} width={widthLoadingTiposEstabelecimentos} className='m-0' rounded />
                                </React.Fragment>
                            )}

                            {/* Lista de tipos de estabelecimentos filtrados por categoria OU input filtro */}
                            {(!isCategoriaSelecionaTodosSelecionado) && (categoriasSelecionadas.length > 0) && (tiposEstabelecimentos.length > 0) && (
                                tiposEstabelecimentos.map((tipo) => (
                                    <React.Fragment key={tipo.estabelecimentoTipoId} >
                                        {
                                            (categoriasSelecionadas.findIndex(c => c.categoriaId === tipo.estabelecimentoCategorias.estabelecimentoCategoriaId) > -1)
                                            && (
                                                <React.Fragment>
                                                    {/* Verificação do campo de filtro */}
                                                    {
                                                        (inputFiltro.length === 0) ? (
                                                            <Item id={tipo.estabelecimentoTipoId}
                                                                thumbnail={tipo.thumbnail}
                                                                href={`/estabelecimento/tipo/${tipo.estabelecimentoTipoId}`}
                                                                titulo={tipo.tipo}
                                                                descricao={tipo.descricao}
                                                                icone={tipo.estabelecimentoCategorias.icone}
                                                                iconeDesc={tipo.estabelecimentoCategorias.categoria} />
                                                        ) : (
                                                            ((tipo.tipo.toLowerCase().includes(inputFiltro.toLowerCase()) || tipo.descricao.toLowerCase().includes(inputFiltro.toLowerCase())) && (
                                                                <Item id={tipo.estabelecimentoTipoId}
                                                                    thumbnail={tipo.thumbnail}
                                                                    href={`/estabelecimento/tipo/${tipo.estabelecimentoTipoId}`}
                                                                    titulo={tipo.tipo}
                                                                    descricao={tipo.descricao}
                                                                    icone={tipo.estabelecimentoCategorias.icone}
                                                                    iconeDesc={tipo.estabelecimentoCategorias.categoria} />
                                                            ))
                                                        )
                                                    }
                                                </React.Fragment>
                                            )
                                        }
                                    </React.Fragment>
                                ))
                            )}

                            {/* Lista de todos os tipos de estabelecimentos com a opção de todas as categorias ativas*/}
                            {(isCategoriaSelecionaTodosSelecionado) && (tiposEstabelecimentos.length > 0) && (
                                tiposEstabelecimentos.map((tipo) => (
                                    <React.Fragment key={tipo.estabelecimentoTipoId} >
                                        {/* Verificação do campo de filtro */}
                                        {
                                            (inputFiltro.length === 0) ? (
                                                <Item id={tipo.estabelecimentoTipoId}
                                                    thumbnail={tipo.thumbnail}
                                                    href={`/estabelecimento/tipo/${tipo.estabelecimentoTipoId}`}
                                                    titulo={tipo.tipo}
                                                    descricao={tipo.descricao}
                                                    icone={tipo.estabelecimentoCategorias.icone}
                                                    iconeDesc={tipo.estabelecimentoCategorias.categoria} />
                                            ) : (
                                                ((tipo.tipo.toLowerCase().includes(inputFiltro.toLowerCase()) || tipo.descricao.toLowerCase().includes(inputFiltro.toLowerCase())) && (
                                                    <Item id={tipo.estabelecimentoTipoId}
                                                        thumbnail={tipo.thumbnail}
                                                        href={`/estabelecimento/tipo/${tipo.estabelecimentoTipoId}`}
                                                        titulo={tipo.tipo}
                                                        descricao={tipo.descricao}
                                                        icone={tipo.estabelecimentoCategorias.icone}
                                                        iconeDesc={tipo.estabelecimentoCategorias.categoria} />
                                                ))
                                            )
                                        }
                                    </React.Fragment>
                                ))
                            )}
                        </div>
                    </div>
                </section>
            </section>
        </React.Fragment >
    );
}




