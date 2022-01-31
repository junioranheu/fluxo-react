import { useState } from 'react';
import '../../css/itens.css';
import SemImagem from '../../static/outro/sem-imagem.webp';

export default function TipoEstabelecimento(props) {
    // console.log(props);
    const [thumbnailFinal] = useState('static/' + props.thumbnail);

    // Import dinâmico;
    const imagemDinamica = require('../../' + (thumbnailFinal));

    return (
        <a className='image-wrapper animate__animated animate__fadeIn sem-highlight' href={props.href}>
            <div className='image-overlay'>
                <div className='image-info'>
                    <div className='image-info-text'>
                        <h5 className='image-name medium cor-principal'>{props.titulo}</h5>
                        <p className='image-subtext tiny'>{props.descricao}</p>
                    </div>
                </div>
            </div>

            <img src={imagemDinamica} loading='lazy' width='1' height='1' onError={(event) => event.target.src = SemImagem} alt='Erro' />
            <span className='image-icone'>
                <i className={props.icone} title={props.iconeDesc}></i>
            </span>
        </a>
    );
}

