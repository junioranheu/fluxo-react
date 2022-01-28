import React, { useEffect, useState } from 'react';
import Categoria from '../../componentes/categorias/categoria';
import TipoEstabelecimento from '../../componentes/estabelecimentosTipos/tipoEstabelecimento';
import Card from '../../componentes/outros/card';
import InfoUsuario from '../../componentes/outros/infoUsuario';
import Auth from '../../utilidades/auth/servicoAutenticacao';
import CONSTANTS_CATEGORIAS from '../../utilidades/const/constCategorias';
import CONSTANTS_TIPOS_ESTABELECIMENTOS from '../../utilidades/const/constTiposEstabelecimentos';

export default function Index() {
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
            'titulo': 'aaaaa',
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
        var hoje = new Date();
        var hora = hoje.getHours();
        var msg = '';

        if (hora < 12) {
            msg = 'Bom dia';
        } else if (hora < 18) {
            msg = 'Boa tarde';
        } else {
            msg = 'Boa noite';
        }

        if (Auth.isAuth()) {
            msg += ', @' + Auth.getUsuarioLogado().nomeUsuarioSistema + '!';
        } else {
            msg += '!<br/>Bem-vindo ao Fluxo';
        }

        return msg;
    }
    const [className] = useState(ola());

    // Get categorias;
    const [categorias, setCategorias] = useState([]);
    function getCategorias() {
        const url = CONSTANTS_CATEGORIAS.API_URL_GET_TODOS;
        // console.log(url);

        fetch(url, {
            method: 'GET'
        })
            .then(data => data.json())
            .then(data => {
                // console.log(data);
                setCategorias(data);
            })
            .catch((error) => {
                console.log(error);
                // alert('Erro, consulte F12');
            });
    }

    // Get tipos de estabelecimentos;
    const [tiposEstabelecimentos, setTiposEstabelecimentos] = useState([]);
    function getTiposEstabelecimentos() {
        const url = CONSTANTS_TIPOS_ESTABELECIMENTOS.API_URL_GET_TODOS;
        // console.log(url);

        fetch(url, {
            method: 'GET'
        })
            .then(data => data.json())
            .then(data => {
                // console.log(data);
                setTiposEstabelecimentos(data);
            })
            .catch((error) => {
                console.log(error);
                // alert('Erro, consulte F12');
            });
    }

    // Ao carregar página;
    useEffect(() => {
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

    // Ao mudar o "categoriasSelecionadas";
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
        // setCategoriasSelecionadas([]);
        setCategorias([])
        getCategorias();
        setTiposEstabelecimentos([]);
        getTiposEstabelecimentos();
        setCategoriasSelecionadas([]);
    }

    return (
        <React.Fragment>
            {/* Cards */}
            <section className='content-section mt-6'>
                <div className='card-ui-wrapper'>
                    {cards.map((card) => (
                        <Card props={card} key={card.id} />
                    ))}
                </div>
            </section>

            <section className='mt-6'>
                {/* Olá */}
                <section className='content-section mt-4'>
                    <h1 className='titulo'><span dangerouslySetInnerHTML={{ __html: className }}></span></h1>
                </section>

                {/* Campo de busca */}
                <div className='main-area-header mt-3'>
                    <div className='search-wrapper'>
                        <input className='search-input' type='text' placeholder='Filtre os tipos de estabelecimentos aqui também...' />

                        <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' className='feather feather-search' viewBox='0 0 24 24'>
                            <defs />
                            <circle cx='11' cy='11' r='8' />
                            <path d='M21 21l-4.35-4.35' />
                        </svg>
                    </div>
                </div>

                {/* Categorias */}
                <section className='content-section mt-6' id='divCategorias'>
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

                        {categorias.length > 0 && (
                            categorias.map((categoria) => (
                                <Categoria props={categoria} key={categoria.estabelecimentoCategoriaId} onAdicionarCategoria={handleAdicionarCategoria} onRemoverCategoria={handleRemoverCategoria} />
                            ))
                        )}
                    </div>
                </section>

                {/* Tipos de estabelecimentos */}
                <section className='content-section mt-6'>
                    <div className='titulo-wrapper'>
                        <h1 className='titulo'>
                            Tipos de estabelecimentos
                        </h1>
                    </div>

                    <div className='section-part mt-3'>
                        <div className='content-part-line'>
                            {(!isCategoriaSelecionaTodosSelecionado) && (categoriasSelecionadas.length > 0) && (tiposEstabelecimentos.length > 0) && (
                                tiposEstabelecimentos.map((tipo) => (
                                    <React.Fragment key={tipo.estabelecimentoTipoId} >
                                        {(categoriasSelecionadas.findIndex(c => c.categoriaId === tipo.estabelecimentoCategorias.estabelecimentoCategoriaId) > -1) && (
                                            <TipoEstabelecimento props={tipo} />
                                        )}
                                    </React.Fragment>
                                ))
                            )}

                            {(isCategoriaSelecionaTodosSelecionado) && (categoriasSelecionadas.length === 0) && (tiposEstabelecimentos.length > 0) && (
                                tiposEstabelecimentos.map((tipo) => (
                                    <TipoEstabelecimento props={tipo} key={tipo.estabelecimentoTipoId} />
                                ))
                            )}
                        </div>
                    </div>
                </section>
            </section>

            {/* Info usuário */}
            <InfoUsuario />
        </React.Fragment >
    );
}