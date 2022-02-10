import React, { useContext } from 'react';
import { Auth, UsuarioContext } from '../../utilidades/context/usuarioContext';

export default function InfoUsuario() {
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;

    return (
        <code className='mt-4' style={{ borderRadius: 10, padding: 20 }}>
            <span>
                Logado? {isAuth ? '👍' : '👎'}
            </span>

            {(isAuth) && (
                <div>
                    <span>Nome: {Auth.getUsuarioLogado().nome}</span>
                    <br />
                    <span>Usuário: {Auth.getUsuarioLogado().nomeUsuarioSistema}</span>
                    <br />
                    <span>Tipo: {Auth.getUsuarioLogado().usuarioTipoId}</span>
                    <br />
                    <span>Foto de perfil: {Auth.getUsuarioLogado().foto}</span>
                    <br />
                    <span>CidadeId: {Auth.getUsuarioLogado().cidadeId}</span>
                    <br />
                    <span>Cidade: {Auth.getUsuarioLogado().cidadeNome}</span>
                    <br />
                    <span>Token: {Auth.getUsuarioLogado().token.substring(0, 30)}...</span>
                </div>
            )}
        </code>
    );
}

