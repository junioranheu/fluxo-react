import React, { useState } from 'react';
import SemImagem from '../../static/outro/sem-imagem.webp';

export default function TipoEstabelecimento(props) {
    const [prop] = useState(props['props']);
    // console.log(prop);
    const [thumbnail] = useState('static/' + prop.thumbnail);
    const [caminhoEstabelecimento] = useState('/estabelecimento/tipo/' + prop.estabelecimentoTipoId);

    // Import dinâmico;
    const imagemDinamica = require('../../' + (thumbnail));

    return (
        <a className='image-wrapper' href={caminhoEstabelecimento} data-categoria-id={prop.estabelecimentoCategorias.estabelecimentoCategoriaId} data-tipo={prop.tipo} data-desc={prop.descricao}>
            <div className='image-overlay'>
                <div className='image-info'>
                    <div className='image-info-text'>
                        <h5 className='image-name medium cor-principal'>{prop.tipo}</h5>
                        <p className='image-subtext tiny'>{prop.descricao}</p>
                    </div>
                </div>
            </div>

            {/* onerror='this.src='/static/outro/imagem-indisponivel.webp';' */}
            <img src={imagemDinamica} loading='lazy' width='1' height='1' onError={(event) => event.target.src = SemImagem} alt='Erro...' />
            <span className='image-icone'>
                <i className={prop.estabelecimentoCategorias.icone} title={prop.estabelecimentoCategorias.categoria}></i>
            </span>
        </a>
    );
}

