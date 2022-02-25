import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import Typewriter from 'typewriter-effect';
import '../../css/landingPage/default.css';
import '../../css/landingPage/style.css';
import Hamburguer from '../../static/gifs/hamburguer.webp';
import Pikachu from '../../static/gifs/pikachu.webp';
import Poze from '../../static/gifs/poze.webp';
import Procurando from '../../static/gifs/procurando.webp';
import Relaxando from '../../static/gifs/relaxando.webp';
import Top from '../../static/gifs/top.webp';

export default function Fluxo() {
    // require('bootstrap/dist/css/bootstrap.min.css'); //Importar CSS apenas para esse componente (scoped);
    const [nomeApp] = useState('Fluxo');
    const [sloganApp] = useState('Conheça sua cidade!');

    useEffect(() => {
        document.title = 'Fluxo — Bem-vindo!';
    }, []);

    const configuracaoSlider = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000
    };

    function gerarTituloAleatorio() {
        var items = [
            'descobrir um novo bar',
            'encontrar uma nova hambúrgueria',
            'ir à uma nova balada',
            'encontrar uma sorveteria',
            'saber o que tem de bom no centro',
            'descobrir onde !importantomprar o beck maneiro'
        ];
        var item = items[Math.floor(Math.random() * items.length)];
        return item;
    }

    return (
        <React.Fragment>
            <section className='slider-area pt-100 pb-30'>
                {/* <!-- Primeiro slide --> */}
                <Slider {...configuracaoSlider}>
                    <div className='slider-bg'>
                        <div className='row no-gutters align-items-center'>
                            <div className='col-lg-4 col-md-5'>
                                <div className='slider-product-image d-none d-md-block'>
                                    <img src={Hamburguer} className='borda' alt='' />
                                </div>
                            </div>

                            <div className='col-lg-8 col-md-7'>
                                <div className='slider-product-content'>
                                    <h1 className='titulo-gigante slider-title mb-25 animate__animated animate__fadeInUp delay03'>Bem-vindo ao <span>{nomeApp}!</span></h1>
                                    <a className='main-btn mt-2 animate__animated animate__fadeInUp delay15' href='/criar-conta'>Crie sua conta <i className='lni-chevron-right'></i></a>
                                    <a className='main-btn main-btn-2 mt-2 ml-3 animate__animated animate__fadeInUp delay19' href='/entrar'>Entre agora <i className='lni-chevron-right'></i></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Segundo slide --> */}
                    <div className='slider-bg'>
                        <div className='row no-gutters align-items-center'>
                            <div className='col-lg-4 col-md-5'>
                                <div className='slider-product-image d-none d-md-block'>
                                    <img src={Pikachu} className='borda' alt='' />
                                </div>
                            </div>

                            <div className='col-lg-8 col-md-7'>
                                <div className='slider-product-content'>
                                    <h1 className='titulo-gigante slider-title mb-10'>Talvez, <span>você</span>...</h1>
                                    <p className='subtitle is-5 mb-25'>queira {gerarTituloAleatorio()}... tá esperando o quê?</p>
                                    <a className='main-btn' href='/'>{sloganApp} <i className='lni-chevron-right'></i></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Terceiro slide --> */}
                    <div className='slider-bg'>
                        <div className='row no-gutters align-items-center'>
                            <div className='col-lg-4 col-md-5'>
                                <div className='slider-product-image d-none d-md-block'>
                                    <img src={Relaxando} className='borda' alt='' />
                                </div>
                            </div>

                            <div className='col-lg-8 col-md-7'>
                                <div className='slider-product-content'>
                                    <h1 className='titulo-gigante slider-title mb-10'><span>{nomeApp}</span> & <span>relaxamento</span></h1>
                                    <p className='subtitle is-5 mb-25'>Clique aqui embaixo e entre agora mesmo!</p>
                                    <a className='main-btn' href='/'>{sloganApp} <i className='lni-chevron-right'></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Slider>
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

                                <div className='product-content sem-highlight'>
                                    <h4 className='content-title mb-15 fundo-texto'>Imagine um texto bem legal aqui!</h4>

                                    <a className='fundo-texto' href='/'>
                                        <span className='fundo-text-span'>Ver mais <i className='lni-chevron-right'></i></span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className='col-lg-6'>
                            <div className='single-discount-product mt-30'>
                                <div className='product-image'>
                                    <img src={Poze} className='borda' loading='lazy' width='1' height='1' alt='' />
                                </div>

                                <div className='product-content sem-highlight'>
                                    <h4 className='content-title mb-15 fundo-texto'>Testando essa bagaça... 1, 2, 3...</h4>

                                    <a className='fundo-texto' href='/'>
                                        <span className='fundo-text-span'>Ver mais <i className='lni-chevron-right'></i></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='services-area pt-100 pb-200xxx'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <div className='section-title'>
                                <h5 className='mb-15 sem-highlight'>!!!</h5>
                                <h3 className='title mb-15'>Está perdido?</h3>

                                Conheça sua cidade usando o {nomeApp}<br />

                                <Typewriter
                                    options={{
                                        strings: ['Descubra novas hamburguerias', 'Descubra novos bares',
                                            'Descubra novas sorveterias', 'Descubra novas cafeterias'],
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-lg-6'>
                            <div className='services-left mt-45'>
                                <div className='services'>
                                    <img src={Procurando} className='borda' alt='' />
                                    <a href='/' className='main-btn mt-30'>{sloganApp} <i className='lni-chevron-right'></i></a>
                                </div>
                            </div>
                        </div>

                        <div className='col-lg-6 sem-highlight'>
                            <div className='services-right mt-15'>
                                <div className='row justify-content-center'>
                                    <div className='col-md-6 col-sm-8'>
                                        <div className='single-services text-center mt-30 borda'>
                                            <div className='services-icon'>
                                                <i className='fas fa-smile-wink'></i>
                                            </div>

                                            <div className='services-content mt-20'>
                                                <h5 className='title mb-10'>Praticidade</h5>
                                                <p>Plataforma simples e intuítiva.</p>
                                            </div>
                                        </div>

                                        <div className='single-services text-center mt-30 borda'>
                                            <div className='services-icon'>
                                                <i className='fas fa-users'></i>
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
                                                <i className='fas fa-dollar-sign'></i>
                                            </div>

                                            <div className='services-content mt-20'>
                                                <h5 className='title mb-10'>De graça</h5>
                                                <p>Paga nada. Quer mais o quê?</p>
                                            </div>
                                        </div>

                                        <div className='single-services text-center mt-30 borda'>
                                            <div className='services-icon'>
                                                <i className='fas fa-question'></i>
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

