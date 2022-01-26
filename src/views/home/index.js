import React from 'react';
import auth from '../../utilidades/servicoAutenticacao';

export default function Index() {
    return (
        <div className='container'>
            <div className='row min-vh-100'>
                <div className='col d-flex flex-column justify-content-center align-items-center'>
                    <div>
                        <h1 className='text-center'>Olá, mundo</h1>
                        <a href='/entrar'>Entrar</a><br />
                        <a href='/estabelecimentos'>Estabelecimentos</a>
                    </div>

                    <div>
                        <span onClick={() => auth.deleteUsuarioLogado()}>
                            isLogado: {auth.isAuth().toString()}
                        </span>

                        {(auth.isAuth()) && (
                            <div>
                                <span>Nome: {auth.getUsuarioLogado().nome}</span>
                                <br />
                                <span>Usuário: {auth.getUsuarioLogado().nomeUsuarioSistema}</span>
                                <br />
                                <span>Tipo: {auth.getUsuarioLogado().usuarioTipoId}</span>
                                <br />
                                <span>Token: {auth.getUsuarioLogado().token}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}