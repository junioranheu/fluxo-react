import React from 'react';
import ImagemErro from '../../static/svg/erro.svg';
import Auth from '../../utilidades/servicoAutenticacao';

export default function SemAcesso() {
    return (
        <section className='hero is-medium mt-6'>
            <div className='hero-body'>
                <div className='container'>
                    <div className='columns is-centered has-text-centered'>
                        <div className='column is-12-mobile is-10-tablet is-8-desktop is-8-widescreen'>
                            <h1 className='title titled is-1 has-text-centered sem-highlight'>
                                <span>Ops...</span>
                            </h1>

                            <div className='columns mt-2 is-vcentered'>
                                <div className='column'>
                                    <p className='subtitle is-3 sem-highlight'>Algo deu errado</p>
                                    <span className='has-text-weight-semibold is-size-5 cor-principal'>Você provavelmente não tem acesso para a ação requisitada</span>
                                </div>

                                <div className='column'>
                                    <figure className='image is-256x256 has-image-centered sem-highlight'>
                                        <img src={ImagemErro} />
                                    </figure>
                                </div>
                            </div>

                            <div className='buttons is-centered'>
                                <a className='button is-text' href='/'>Início</a>

                                {Auth.isAuth() && (
                                    <React.Fragment>
                                        <a className='button is-text' href='/entrar'>Entre</a>
                                        <a className='button is-text' href='/'>Crie sua conta</a>
                                    </React.Fragment>
                                )}

                                <a className='button is-text' href='/'>Reportar problema</a>
                            </div>

                            <p className='mt-3 text-muted small sem-highlight'>Ref: @codigoAleatorio @dt</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}