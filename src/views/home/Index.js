import React from 'react';

export default function Index() {
    return (
        <div className='container'>
            <div className='row min-vh-100'>
                <div className='col d-flex flex-column justify-content-center align-items-center'>
                    <div>
                        <h1 className='text-center'>Olá, mundo</h1>
                        <a href='/entrar'>Entrar</a><br />
                        <a href='/estabelecimentos'>Estabelecimentos</a>
                    </div>
                </div>
            </div>
        </div>
    );
}