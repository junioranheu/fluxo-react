import React, { useState } from 'react';
import '../../css/card.css';

export default function Card(props) {
    const [prop, setProp] = useState(props['props']);
    // console.log(prop);

    // Import dinâmico;
    const ImagemDinamica = require('../../' + (prop.imagem));

    return (
        // style={{ backgroundImage: 'url(' + prop.imagem + ')' }}
        <div className='card-ui pequeno' style={{ backgroundImage: `url(${ImagemDinamica})` }}>
            <div className='card-ui__overlay'></div>
            <span className='card-ui__icon'>
                <i className={prop.icone}></i>
            </span>

            <div className='card-ui__content'>
                <div>
                    <h1 className='titulo cor-branco'>
                        {prop.titulo}
                    </h1>
                </div>

                <div>
                    <p className='card-ui__desc'>
                        {prop.descricao}
                    </p>
                </div>

                <a className='button is-primary is-fullwidth' href={prop.url}>
                    {prop.mensagemBotao}
                </a>
            </div>
        </div>
    );
}

