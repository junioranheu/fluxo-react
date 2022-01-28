import React, { useState } from 'react';
import '../../css/tagCategoria.css';

export default function Categoria(props) {
    const [prop, setProp] = useState(props['props']);
    // console.log(prop);

    return (
        <div className='categoria pointer' title={`Filtrar por ${prop.categoria.toLowerCase()}`} data-is-selecionado='0'>
            <div className='access-icon'>
                <i className={prop.icone}></i>
            </div>

            <span className='access-text'>{prop.categoria}</span>
        </div>
    );
}

