import React from 'react';

export default function SemAcesso() {
    return (
        <div className='container'>
            <div className='row min-vh-100'>
                <div className='col d-flex flex-column justify-content-center align-items-center'>
                    <div>
                        <h1 className='text-center'>Algo deu errado</h1>
                        <a href='/entrar'>Entrar</a><br />
                    </div>
                </div>
            </div>
        </div>
    );
}