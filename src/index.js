import 'bulma/css/bulma.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import Footer from './componentes/outros/footer';
import Navbar from './componentes/outros/navbar';
import './css/site.css';
import './fonts/poppins.css';

ReactDOM.render(
    <BrowserRouter>
        <Navbar />
        <App />
        <Footer />
    </BrowserRouter>,
    document.getElementById('root')
);

