import React, { useState } from 'react';
import Card from '../../componentes/outros/card';
import InfoUsuario from '../../componentes/outros/infoUsuario';
import Auth from '../../utilidades/servicoAutenticacao';

export default function Index() {
    const [nomeUsuario, setNomeUsuario] = useState(Auth.isAuth() ? Auth.getUsuarioLogado().nomeUsuarioSistema : 'mundo');

    const listaCards = [
        {
            'id': 1,
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

    return (
        <div className='container'>
            <div className=''>
                <div className=''>
                    <div>
                        <h1 className=''>Olá, {nomeUsuario}</h1>
                    </div>

                    <InfoUsuario />

                    {cards.map((card) => (
                        <Card props={card} key={card.id} />
                    ))}
                </div>
            </div>
        </div>
    );
}