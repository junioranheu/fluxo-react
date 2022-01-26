import React, { useState } from 'react';
import InfoUsuario from '../../componentes/outros/infoUsuario';
import Auth from '../../utilidades/servicoAutenticacao';

export default function Index() {
    const [nomeUsuario, setNomeUsuario] = useState(Auth.isAuth() ? Auth.getUsuarioLogado().nomeUsuarioSistema : 'mundo');

    return (
        <div className='container'>
            <div className=''>
                <div className=''>
                    <div>
                        <h1 className=''>Olá, {nomeUsuario}</h1>
                    </div>

                    <InfoUsuario />
                </div>
            </div>
        </div>
    );
}