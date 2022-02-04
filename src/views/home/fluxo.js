import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import '../../css/landingPage/landingPage.css';
import Hamburguer from '../../static/gifs/hamburguer.webp';
import Pikachu from '../../static/gifs/pikachu.webp';
import Poze from '../../static/gifs/poze.webp';
import Procurando from '../../static/gifs/procurando.webp';
import Relaxando from '../../static/gifs/relaxando.webp';
import Top from '../../static/gifs/top.webp';

export default function Fluxo() {
    return (
        <React.Fragment>
            <section id='home' className='slider-area pt-180 pb-30'>
                <div className='container-fluid position-relative'>
                    <div className='slider-active'>
                        {/* <!-- Primeiro slide --> */}
                        <div className='single-slider'>
                            <div className='slider-bg'>
                                <div className='row no-gutters align-items-center'>
                                    <div className='col-lg-4 col-md-5'>
                                        <div className='slider-product-image d-none d-md-block'>
                                            <img src={Hamburguer} className='borda' alt='' />
                                        </div>
                                    </div>

                                    <div className='col-lg-8 col-md-7'>
                                        <div className='slider-product-content'>
                                            <h1 className='slider-title mb-25' data-animation='fadeInUp' data-delay='0.3s'>Bem-vindo ao <span>Fluxo</span></h1>
                                            <a className='main-btn mt-2' href='/criar-conta' data-animation='fadeInUp' data-delay='1.5s'>Crie sua conta <i className='lni-chevron-right'></i></a>
                                            <a className='main-btn main-btn-2 mt-2' href='/entrar' data-animation='fadeInUp' data-delay='1.9s'>Entre agora <i className='lni-chevron-right'></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Segundo slide --> */}
                        <div className='single-slider'>
                            <div className='slider-bg'>
                                <div className='row no-gutters align-items-center'>
                                    <div className='col-lg-4 col-md-5'>
                                        <div className='slider-product-image d-none d-md-block'>
                                            <img src={Pikachu} className='borda' alt='' />

                                            <div className='slider-discount-tag'>
                                                <p>Oi, né?</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-lg-8 col-md-7'>
                                        <div className='slider-product-content'>
                                            <h1 className='slider-title mb-10' data-animation='fadeInUp' data-delay='0.3s'>Talvez, <span>você</span>...</h1>
                                            <p className='mb-25' data-animation='fadeInUp' data-delay='0.9s'>queira @titulo... tá esperando o quê?</p>
                                            <a className='main-btn' href='/' data-animation='fadeInUp' data-delay='1.5s'>@sloganApp <i className='lni-chevron-right'></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Terceiro slide --> */}
                        <div className='single-slider'>
                            <div className='slider-bg'>
                                <div className='row no-gutters align-items-center'>
                                    <div className='col-lg-4 col-md-5'>
                                        <div className='slider-product-image d-none d-md-block'>
                                            <img src={Relaxando} className='borda' alt='' />
                                        </div>
                                    </div>

                                    <div className='col-lg-8 col-md-7'>
                                        <div className='slider-product-content'>
                                            <h1 className='slider-title mb-10' data-animation='fadeInUp' data-delay='0.3s'><span>Fluxo</span> & <span>relaxamento</span></h1>
                                            <p className='mb-25' data-animation='fadeInUp' data-delay='0.9s'>Clique aqui embaixo e entre agora mesmo!</p>
                                            <a className='main-btn' href='/' data-animation='fadeInUp' data-delay='1.5s'>@sloganApp <i className='lni-chevron-right'></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='slider-social'>
                        <div className='row justify-content-end'>
                            <div className='col-lg-7 col-md-6'>
                                <ul className='social text-right'>
                                    <li><a href='#' target='_blank'><i className='lni-facebook-filled'></i></a></li>
                                    <li><a href='#' target='_blank'><i className='lni-instagram'></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!--====== FIM DA PRIMEIRA PARTE ======-->
            <!--====== DUAS DIVS BONITAS + SOBRE ======--> */}

            <section className='discount-product pt-100'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <div className='single-discount-product mt-30'>
                                <div className='product-image'>
                                    <img src={Top} className='borda' loading='lazy' width='1' height='1' alt='' />
                                </div>

                                <div className='product-content'>
                                    <h4 className='content-title mb-15 fundo-texto'>Imagine um texto bem legal aqui!</h4>

                                    <a className='fundo-texto' href='/' style={{ color: '#211F24 !important' }}>
                                        Ver mais <i className='lni-chevron-right'></i>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className='col-lg-6'>
                            <div className='single-discount-product mt-30'>
                                <div className='product-image'>
                                    <img src={Poze} className='borda' loading='lazy' width='1' height='1' alt='' />
                                </div>

                                <div className='product-content'>
                                    <h4 className='content-title mb-15 fundo-texto'>Testando essa bagaça...<br />1, 2, 3</h4>

                                    <a className='fundo-texto' href='/' style={{ color: '#211F24 !important' }}>
                                        Ver mais <i className='lni-chevron-right'></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id='sobre' className='services-area pt-100 pb-200'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <div className='section-title pb-30'>
                                <h5 className='mb-15 sem-highlight'>!!!</h5>
                                <h3 className='title mb-15'>Está perdido?</h3>
                                <p>
                                    Conheça sua cidade usando o Fluxo<br />
                                    Descubra nov<span id='spanTypeWriter'><span className='Typewriter__wrapper'>ex</span><span className='Typewriter__cursor'>|</span></span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-lg-6'>
                            <div className='services-left mt-45'>
                                <div className='services'>
                                    <img src={Procurando} className='borda' alt='' />
                                    <a href='/' className='main-btn mt-30'>@sloganApp <i className='lni-chevron-right'></i></a>
                                </div>
                            </div>
                        </div>

                        <div className='col-lg-6 sem-highlight'>
                            <div className='services-right mt-15'>
                                <div className='row justify-content-center'>
                                    <div className='col-md-6 col-sm-8'>
                                        <div className='single-services text-center mt-30 borda'>
                                            <div className='services-icon'>
                                                <i className='lni-customer'></i>
                                            </div>

                                            <div className='services-content mt-20'>
                                                <h5 className='title mb-10'>Praticidade</h5>
                                                <p>Plataforma simples e intuítiva.</p>
                                            </div>
                                        </div>

                                        <div className='single-services text-center mt-30 borda'>
                                            <div className='services-icon'>
                                                <i className='lni-grid-alt'></i>
                                            </div>

                                            <div className='services-content mt-20'>
                                                <h5 className='title mb-10'>Comunidade</h5>
                                                <p>Gente para conversar.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='col-md-6 col-sm-8'>
                                        <div className='single-services text-center mt-30 borda'>
                                            <div className='services-icon'>
                                                <i className='lni-ruler-pencil'></i>
                                            </div>

                                            <div className='services-content mt-20'>
                                                <h5 className='title mb-10'>De graça</h5>
                                                <p>Paga nada. Quer mais o quê?</p>
                                            </div>
                                        </div>

                                        <div className='single-services text-center mt-30 borda'>
                                            <div className='services-icon'>
                                                <i className='lni-support'></i>
                                            </div>

                                            <div className='services-content mt-20'>
                                                <h5 className='title mb-10'>Dúvidas?</h5>
                                                <p>Chama no zipzop.</p>
                                            </div>
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

