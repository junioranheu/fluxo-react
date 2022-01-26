import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import Footer from './componentes/outros/footer';
import Navbar from './componentes/outros/navbar';
import './css/index.css';

ReactDOM.render(
    <BrowserRouter>
        <Navbar />
        <App />
        <Footer />
    </BrowserRouter>,
    document.getElementById('root')
);

