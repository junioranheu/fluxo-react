import moment from 'moment';
import React, { useState } from 'react';
import SemImagemSmile from '../../static/outro/smile.webp';

export default function Post(props) {
    // console.log(props);
    const [prop] = useState(props['props']);

    // Import dinâmico;
    let imagemDinamica = '';
    try {
        imagemDinamica = require('../../static/' + prop.midia);
    } catch (err) {
        // console.log('Imagem não existe');        
        // console.log(err);
    }

    return (
        <a className='image-wrapper sem-highlight' href={() => false} onClick={() => props.onClicarPost()}>
            <div className='image-overlay'>
                <div className='image-info'>
                    <div className='image-info-text'>
                        <h5 className='image-name medium cor-principal'><span dangerouslySetInnerHTML={{ __html: prop.titulo }}></span></h5>
                        <p className='image-subtext tiny'><span dangerouslySetInnerHTML={{ __html: prop.conteudo }}></span></p>
                    </div>
                </div>
            </div>

            <img src={imagemDinamica} loading='lazy' width='1' height='1' onError={(event) => event.target.src = SemImagemSmile} alt='' />
            <span className='image-icone'>
                <i className='far fa-smile' title={`Post #${prop.postId}`}></i>
            </span>

            <span className='image-icone-esquerda'>
                Postado em {moment(prop.dataPost).format('DD/MM/YYYY')}
            </span>
        </a>
    );
}

