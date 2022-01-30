import '@fortawesome/fontawesome-free/css/all.min.css';
import 'animate.css/animate.min.css';
import 'bulma/css/bulma.min.css';
import 'nprogress/nprogress.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import Footer from './componentes/outros/footer';
import Navbar from './componentes/outros/navbar';
import './css/site.css';
import './fonts/poppins.css';
import { UsuarioProvider } from './utilidades/context/usuarioContext';

ReactDOM.render(
    <React.StrictMode>
        <UsuarioProvider>
            <BrowserRouter>
                <Navbar />

                <div className='container'>
                    <main role='main' className='conteudo animate__animated animate__fadeIn'>
                        <App />
                    </main>
                </div>

                <Footer />
            </BrowserRouter>
        </UsuarioProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

