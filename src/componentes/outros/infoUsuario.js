import React from 'react';
import Auth from '../../utilidades/auth/servicoAutenticacao';

export default function InfoUsuario() {
    return (
        <div className='box mt-5'>
            <span>
                isLogado: {Auth.isAuth().toString()}
            </span>

            {(Auth.isAuth()) && (
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
        </div>
    );
}

