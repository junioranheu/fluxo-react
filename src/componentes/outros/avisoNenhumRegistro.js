import React from 'react';
import ImagemErro from '../../static/svg/triste-1.svg';

export default function AvisoNenhumRegistro() {
    return (
        <div className='animate__animated animate__fadeIn mt-4'>
            <div className='has-text-centered'>
                <span>
                    Nenhum registro foi encontrado com o filtro utilizado
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

