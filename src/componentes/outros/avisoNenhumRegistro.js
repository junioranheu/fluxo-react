import React from 'react';
import ImagemErro from '../../static/svg/triste-1.svg';

export default function AvisoNenhumRegistro() {
    return (
        <div className='mt-4 animate__animated animate__fadeIn'>
            <div className='has-text-centered'>
                <span>
                    {/* Nenhum registro foi encontrado com o filtro utilizado */}
                    Nenhum registro foi encontrado
                </span>
            </div>

            <div className='mt-4'>
                <figure className='image is-256x256 has-image-centered sem-highlight'>
                    <img src={ImagemErro} alt='Erro' />
                </figure>
            </div>
        </div>
    );
}

