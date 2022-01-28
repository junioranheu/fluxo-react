import React, { useState } from 'react';
import '../../css/tagCategoria.css';

export default function Categoria(props) {
    const [prop] = useState(props['props']);
    // console.log(prop);
    const [isSelecionado, setIsSelecionado] = useState(false);

    function selecionarCategoria() {
        if (isSelecionado) {
            setIsSelecionado(false);
        } else {
            setIsSelecionado(true);
        }
    }

    return (
        <div onClick={() => selecionarCategoria()} className='categoria pointer' title={`Filtrar por ${prop.categoria.toLowerCase()}`} data-is-selecionado={isSelecionado} >
            <div className='access-icon' style={{ backgroundColor: (isSelecionado ? 'var(--cor-principal)' : 'var(--light-font)'), transition: 'background-color 0.5s ease' }}>
                <i className={prop.icone}></i>
            </div>

            <span className='access-text'>{prop.categoria}</span>
        </div>
    );
}

