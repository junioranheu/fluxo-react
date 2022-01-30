import React, { useContext } from 'react';
import { Auth, UsuarioContext } from '../../utilidades/context/usuarioContext';

export default function InfoUsuario() {
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;

    return (
        <code className='mt-6' style={{ borderRadius: 10, padding: 20 }}>
            <span>
                isLogado: {isAuth.toString()}
            </span>

            {(isAuth) && (
                <div>
                    <span>Nome: {Auth.getUsuarioLogado().nome}</span>
                    <br />
                    <span>Usuário: {Auth.getUsuarioLogado().nomeUsuarioSistema}</span>
                    <br />
                    <span>Tipo: {Auth.getUsuarioLogado().usuarioTipoId}</span>
                    <br />
                    <span>Token: {Auth.getUsuarioLogado().token.substring(0, 15)}...</span>
                </div>
            )}
        </code>
    );
}

