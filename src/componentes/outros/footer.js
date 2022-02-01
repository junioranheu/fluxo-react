import React from 'react';
import '../../css/footer.css';

export default function Footer() {
    return (
        <React.Fragment>
            {/* Espaço pro footer */}
            <div id="divEspacoFooter"></div>

            <div id='divEfeitoFooter' className='pl-6 pr-6 mt-6'></div>

            {/* Foter */}
            <footer className='site-footer sem-highlight'>
                <div className='container'>
                    <div className='columns'>
                        <div className='column is-6-tablet is-6-desktop padding-right-50'>
                            <h6>SOBRE</h6>
                            <p className='text-justify'>
                                Fluxo é uma plataforma para você conhecer sua cidade. Descubra todos os fluxos.
                                At maxime excepturi est incidunt pariatur reprehenderit repellendus est exercitationem atque. Et quaerat perspiciatis ut facere explicabo et minima nesciunt est distinctio esse et dolor dolore.
                            </p>
                        </div>

                        <div className='column is-6-mobile is-3-desktop'>
                            <h6>RECURSOS</h6>
                            <ul className='footer-links'>
                                <li><a href={() => false}>Isso é um teste</a></li>
                                <li><a href={() => false}>xxx</a></li>
                                <li><a href={() => false}>xxx</a></li>
                                <li><a href={() => false}>xxx</a></li>
                            </ul>
                        </div>

                        <div className='column is-6-mobile is-3-desktop'>
                            <h6>OUTROS</h6>
                            <ul className='footer-links'>
                                <li><a href='/sobre'>Sobre</a></li>
                                <li><a href='/politica-e-termos-de-uso'>Politica de privacidade</a></li>
                                <li><a href='/reportar-problema'>Reportar um problema</a></li>
                            </ul>
                        </div>
                    </div>

                    <hr className='mt-6' />
                </div>

                <div className='container'>
                    <div className='row columns'>
                        <div className='column'>
                            <p className='copyright-text'>
                                Copyright &copy; {new Date().getFullYear()} —

                                Feito com o 💛 por <a href='https://www.instagram.com/junioranheu/' target='_blank' rel='noreferrer'>@junioranheu</a>
                            </p>
                        </div>

                        <div className='column'>
                            <ul className='social-icons'>
                                <li><a className='twitter' href={() => false} target='_blank' rel='noreferrer'><i className='fab fa-twitter'></i></a></li>
                                <li><a className='instagram' href={() => false} target='_blank' rel='noreferrer'><i className='fab fa-instagram'></i></a></li>
                                <li><a className='facebook' href={() => false} target='_blank' rel='noreferrer'><i className='fab fa-facebook'></i></a></li>
                                <li><a className='youtube' href={() => false} target='_blank' rel='noreferrer'><i className='fab fa-youtube'></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </React.Fragment>
    );
}

