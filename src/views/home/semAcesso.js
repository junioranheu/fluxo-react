import React from 'react';
import ImagemErro from '../../static/svg/erro.svg';
import Auth from '../../utilidades/servicoAutenticacao';

export default function SemAcesso() {
    return (
        <section class='hero is-medium mt-6'>
            <div class='hero-body'>
                <div class='container'>
                    <div class='columns is-centered has-text-centered'>
                        <div class='column is-12-mobile is-10-tablet is-8-desktop is-8-widescreen'>
                            <h1 class='title titled is-1 has-text-centered sem-highlight'>
                                <span>Ops...</span>
                            </h1>

                            <div class='columns mt-2 is-vcentered'>
                                <div class='column'>
                                    <p class='subtitle is-3 sem-highlight'>Algo deu errado</p>
                                    <span class='has-text-weight-semibold is-size-5 cor-principal'>Você provavelmente não tem acesso para a ação requisitada</span>
                                </div>

                                <div class='column'>
                                    <figure class='image is-256x256 has-image-centered sem-highlight'>
                                        <img src={ImagemErro} />
                                    </figure>
                                </div>
                            </div>

                            <div class='buttons is-centered'>
                                <a class='button is-text' href='/'>Início</a>

                                {Auth.isAuth() && (
                                    <React.Fragment>
                                        <a class='button is-text' href='/entrar'>Entre</a>
                                        <a class='button is-text' href='/'>Crie sua conta</a>
                                    </React.Fragment>
                                )}

                                <a class='button is-text' href='/'>Reportar problema</a>
                            </div>

                            <p class='mt-3 text-muted small sem-highlight'>Ref: @codigoAleatorio @dt</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}