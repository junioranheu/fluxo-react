import React, { useContext, useState } from 'react';
import '../../css/card.css';
import { Auth, UsuarioContext } from '../../utilidades/context/usuarioContext';

export default function Card(props) {
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const [usuarioTipoId] = useState(isAuth ? Auth.getUsuarioLogado().usuarioTipoId : null);
    const [prop] = useState(props['props']);
    // console.log(prop);

    // Import dinâmico;
    const imagemDinamica = require('../../' + (prop.imagem));

    return (
        <React.Fragment>
            {(
                (usuarioTipoId && prop.usuarioTipoId === usuarioTipoId && prop.mostrarApenasAutenticado === isAuth) || // Se o usuário está logado, se tem privilégio (perfil) para ver o tipo de card e se ele pode ver o card (prop.mostrarApenasAutenticado));
                (prop.usuarioTipoId === null && prop.mostrarApenasAutenticado === isAuth) // Se o usuário está deslogado e se o card pode ser visto por ele por questão de visualização do card (prop.mostrarApenasAutenticado);
            ) && (
                    <div className='card-ui pequeno sem-highlight' style={{ backgroundImage: `url(${imagemDinamica})` }}>
                        <div className='card-ui__overlay'></div>
                        <span className='card-ui__icon'>
                            <i className={prop.icone}></i>
                        </span>

                        <div className='card-ui__content'>
                            <div>
                                <h1 className='titulo cor-branco'>
                                    {prop.titulo}
                                </h1>
                            </div>

                            <div>
                                <p className='card-ui__desc'>
                                    <span dangerouslySetInnerHTML={{ __html: prop.descricao }}></span>
                                </p>
                            </div>

                            <a className='button is-primary is-fullwidth' href={prop.url}>
                                {prop.mensagemBotao}
                            </a>
                        </div>
                    </div>
                )}
        </React.Fragment>
    );
}

