import React from 'react';
import servicoAutenticacao from '../../utilidades/servicoAutenticacao';

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
                        <span onClick={() => servicoAutenticacao.deleteUsuarioLogado()}>isLogado: {servicoAutenticacao.isUsuarioLogado().toString()}</span>

                        {(servicoAutenticacao.isUsuarioLogado()) && (
                            <div>
                                <span>Nome: {servicoAutenticacao.getUsuarioLogado().nome}</span>
                                <br />
                                <span>Usuário: {servicoAutenticacao.getUsuarioLogado().nomeUsuarioSistema}</span>
                                <br />
                                <span>Tipo: {servicoAutenticacao.getUsuarioLogado().usuarioTipoId}</span>
                                <br />
                                <span>Token: {servicoAutenticacao.getUsuarioLogado().token}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}