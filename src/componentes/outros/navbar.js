import NProgress from 'nprogress';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SemImagem from '../../static/outro/sem-imagem.webp';
import { Auth, UsuarioContext } from '../../utilidades/context/usuarioContext';
import NumeroAleatorio from '../../utilidades/utils/numeroAleatorio';
import UrlImagemApi from '../../utilidades/utils/urlImagemApi';
import LoadingFullScreen from './loadingFullscreen';

export default function Navbar() {
    const [isAuth, setIsAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const [isNavbarExpandido, setIsNavbarExpandido] = useState(false);
    const caminhoPerfil = isAuth ? ('/perfil/@' + Auth.getUsuarioLogado().nomeUsuarioSistema) : '';
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Verificações da foto de perfil e import dinâmico;
    let fotoPerfilDinamica = '';
    if (isAuth) {
        fotoPerfilDinamica = UrlImagemApi; // Padrão;

        const foto = Auth.getUsuarioLogado().foto;
        if (foto) {
            fotoPerfilDinamica = `${UrlImagemApi}/usuario/${foto}`;
        }
    }

    function deslogar() {
        NProgress.start();
        setIsLoading(true);

        setTimeout(function () {
            setIsLoading(false);

            // Desatribuir autenticação ao contexto de usuário;
            setIsAuth(false);

            // Deslogar;
            Auth.deleteUsuarioLogado();
            NProgress.done();

            // Voltar à tela principal;
            navigate('/', { replace: true });
        }, NumeroAleatorio(1000, 1500));
    }

    function expandirNavbar() {
        if (isNavbarExpandido) {
            setIsNavbarExpandido(false);
        } else {
            setIsNavbarExpandido(true);
        }
    }

    return (
        <React.Fragment>
            <LoadingFullScreen isLoading={isLoading} />

            <nav className='navbar is-white has-centered-menu margem-desktop sem-highlight' role='navigation' aria-label='main navigation'>
                <div className='navbar-brand'>
                    <a className='navbar-item' href='/'>
                        <span>Fluxo</span>
                    </a>

                    <a onClick={expandirNavbar} role='button' className='navbar-burger burger' aria-label='menu' aria-expanded='false' href={() => false}>
                        <span aria-hidden='true'></span>
                        <span aria-hidden='true'></span>
                        <span aria-hidden='true'></span>
                    </a>
                </div>

                <div className={`navbar-menu ` + (isNavbarExpandido ? 'is-active' : '')}>
                    <div className='navbar-start'>
                        <a className='navbar-item efeito-texto' href='/'>Início</a>

                        <div className='navbar-item has-dropdown is-hoverable'>
                            <a className='navbar-link' href={() => false}>Mais</a>

                            <div className='navbar-dropdown is-boxed'>
                                <a className='navbar-item' href='/politica-e-termos-de-uso'>Política e termos de uso</a>
                                <a className='navbar-item' href='/reportar-problema'>Reportar um problema</a>
                            </div>
                        </div>

                        {/* usuarioTipoId = 1 = adm  */}
                        {(isAuth) && (Auth.getUsuarioLogado().usuarioTipoId === 1) && (
                            <div className='navbar-item has-dropdown is-hoverable'>
                                <a className='navbar-link' href={() => false}>
                                    Administrador
                                </a>

                                <div className='navbar-dropdown is-boxed'>
                                    <a className='navbar-item' href='/adm/gerenciar-reports'>
                                        Gerenciar reports
                                    </a>

                                    <a className='navbar-item' href='/'>
                                        Gerenciar armazenamento
                                    </a>

                                    <a className='navbar-item' href='/gerenciar-estabelecimentos'>
                                        Estabelecimentos
                                    </a>
                                </div>
                            </div>
                        )
                        }
                    </div>

                    <div className='navbar-end'>
                        <a className='navbar-item' title='Reportar um problema' href='/reportar-problema'>
                            <i className='fas fa-bug'></i><span className='is-hidden-desktop ml-2'>Reportar problema</span>
                        </a>

                        <a className='navbar-item' title='xxx' href='/'>
                            <i className='fa fa-search'></i><span className='is-hidden-desktop ml-2'>xxx</span>
                        </a>

                        {/* Usuário logado */}
                        {isAuth && (
                            <React.Fragment>
                                {/* Perfil  */}
                                <div className='is-hidden-tablet-only is-hidden-mobile ml-1'>
                                    <div className='ajustar-div-imagem-navbar navbar-item has-dropdown is-hoverable'>
                                        <img src={fotoPerfilDinamica} className='ajustar-imagem-navbar pointer' alt=''
                                            onClick={() => window.location.href = caminhoPerfil} onError={(event) => event.target.src = SemImagem} title='Meu perfil' />
                                    </div>
                                </div>

                                <div className='is-hidden-desktop'>
                                    <a className='navbar-item' href={caminhoPerfil}>
                                        <i className='fas fa-user-alt'></i><span className='ml-2'>Meu perfil</span>
                                    </a>
                                </div>

                                {/* Logica para mostrar o 'Sair' em botão ou em texto normal, dependendo se é mobile ou desktop  */}
                                <a className='navbar-item is-hidden-desktop is-hidden-tablet' onClick={deslogar} href={() => false}>Sair</a>
                                <div className='navbar-item is-hidden-mobile'>
                                    <a className='button is-small is-white-bis is-rounded' onClick={deslogar} href={() => false}>Sair</a>
                                </div>
                            </React.Fragment>
                        )}

                        {/* Usuário deslogado */}
                        {!isAuth && (
                            <React.Fragment>
                                <a className='navbar-item' href='/criar-conta'>Criar conta</a>

                                {/* Logica para mostrar o 'Entrar' em botão ou em texto normal, dependendo se é mobile ou desktop; */}
                                <a className='navbar-item is-hidden-desktop is-hidden-tablet' href='/entrar'>Entrar</a>
                                <div className='navbar-item is-hidden-mobile'>
                                    <a className='button is-small is-primary is-rounded' href='/entrar'>Entrar</a>
                                </div>
                            </React.Fragment>
                        )}
                    </div>
                </div>
            </nav>
        </React.Fragment>
    );
}

