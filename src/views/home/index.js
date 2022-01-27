import React, { useEffect, useState } from 'react';
import Card from '../../componentes/outros/card';
import InfoUsuario from '../../componentes/outros/infoUsuario';
import '../../css/card.css';
import '../../css/itens.css';
import Auth from '../../utilidades/servicoAutenticacao';

export default function Index() {
    const [nomeUsuario, setNomeUsuario] = useState(Auth.isAuth() ? Auth.getUsuarioLogado().nomeUsuarioSistema : 'mundo');

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
    const [cards, setCards] = useState(listaCards);

    const [saudacao, setSaudacao] = useState('');

    useEffect(() => {
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

        if (Auth.isAuth()){
            msg += ', @' + Auth.getUsuarioLogado().nomeUsuarioSistema + '!';
        } else {
            msg += '!<br/>Bem-vindo ao Fluxo';
        }
      
        setSaudacao(msg);
    }, [])

    return (
        <React.Fragment>
            {/* Cards */}
            <section className='mt-6'>
                <div className='card-ui-wrapper'>
                    {cards.map((card) => (
                        <Card props={card} key={card.id} />
                    ))}
                </div>
            </section>

            <section className='mt-6'>
                {/* Olá */}
                <section className='content-section mt-4'>
                    <h1 className='titulo'><span dangerouslySetInnerHTML={{ __html: saudacao }}></span></h1>
                </section>

                {/* Campo de busca  */}
                <div className='main-area-header mt-3'>
                    <div className='search-wrapper'>
                        <input className='search-input' type='text' placeholder='Filtre os tipos de estabelecimentos aqui também...' />

                        <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' className='feather feather-search' viewBox='0 0 24 24'>
                            <defs />
                            <circle cx='11' cy='11' r='8' />
                            <path d='M21 21l-4.35-4.35' />
                        </svg>
                    </div>
                </div>
            </section>

            <div className='mt-6'>
                <h1>Olá, {nomeUsuario}</h1>
            </div>

            <InfoUsuario />
        </React.Fragment>
    );
}