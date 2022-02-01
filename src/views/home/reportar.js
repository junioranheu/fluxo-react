import React, { useEffect } from 'react';
import SemImagem from '../../static/outro/sem-imagem.webp';

export default function Reportar() {
    // Ao carregar página;
    useEffect(() => {
        document.title = 'Fluxo — Reportar um problema'
    }, []);

    return (
        <React.Fragment>
            <div className='hero-zika'>
                <svg className='secao-diagonal' preserveAspectRatio='none' viewBox='0 0 1438 620' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M0 620V0h1438v240L0 620z' />
                </svg>
            </div>

            <section className='section mt-6'>
                <div className='container'>
                    <div className='columns'>
                        <div className='column is-12'>
                            <div className='card article box'>
                                <div className='card-content'>
                                    <div className='media'>
                                        <div className='media-center'>
                                            <img src='' className='author-image' onError={(event) => event.target.src = SemImagem} />
                                        </div>

                                        <div className='media-content has-text-centered'>
                                            <h2 className='mt-4 title is-3'>Problemas, falhas ou bugs</h2>

                                            <p className='subtitle is-6 article-subtitle mt-1'>
                                                <a href='/perfil/@adm' className='cor-principal'>@adm</a> em 01 de fevereiro, 2022
                                            </p>
                                        </div>
                                    </div>

                                    <hr />

                                    <div className='content article-body mt-6'>
                                        <div className='has-text-centered mt-6'>
                                            <p className='title article-title'>Como reportar um problema?</p>
                                        </div>

                                        <div className='mt-4'>
                                            <h3 className=' is-size-5'>Por que reportar?</h3>
                                            <p>In molestie magna nibh, at blandit diam vestibulum efficitur. Aliquam mattis justo congue metus hendrerit efficitur. Duis vehicula lobortis enim in faucibus. Vestibulum iaculis urna at pharetra venenatis. Donec in accumsan metus. Suspendisse vel tellus non metus rhoncus molestie at id mauris. Quisque vel augue nisl. Suspendisse viverra egestas imperdiet. Donec sit amet justo libero. Aenean vitae eros non nunc tincidunt sodales.</p>
                                        </div>

                                        <div className='mt-5'>
                                            <h3 className='is-size-5'>Como reportar?</h3>
                                            <p>Utilize o formulário abaixo para reportar qualquer erro encontrado na plataforma.</p>
                                        </div>

                                        <div className='mt-5'>
                                            <div className='field'>
                                                <div className='control'>
                                                    <textarea className='textarea' placeholder='Reporte seu problema aqui...' style={{ resize: 'none' }} ></textarea>
                                                </div>
                                            </div>

                                            <div className='field'>
                                                <div className='control'>
                                                    <label className='checkbox'>
                                                        <input type='checkbox' />
                                                        <span> Eu concordo com os <a href='/politica' target='_blank' className='cor-principal'>termos e condições de uso</a></span>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className='field is-grouped'>
                                                <div className='control'>
                                                    <button className='button'>Cancelar</button>
                                                </div>

                                                <div className='control'>
                                                    <button className='button is-primary'>Enviar reclamação</button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='mt-6'>
                                            <hr />
                                        </div>

                                        <div className='has-text-centered'>
                                            <a className='button is-primary' href='/'>Voltar ao início</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}