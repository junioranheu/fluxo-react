import React from 'react';
import Auth from '../../utilidades/servicoAutenticacao';

export default function Index() {
    return (
        <div className='container'>
            <div className=''>
                <div className=''>
                    <div>
                        <h1 className=''>Olá, mundo</h1>
                        <a href='/entrar'>Entrar</a><br />
                        <a href='/estabelecimentos'>Estabelecimentos</a>
                    </div>

                    <div>
                        <span onClick={() => Auth.deleteUsuarioLogado()}>
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
                                <span>Token: {Auth.getUsuarioLogado().token}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}