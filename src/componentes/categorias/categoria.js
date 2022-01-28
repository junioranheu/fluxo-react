import React, { useState } from 'react';
import '../../css/tagCategoria.css';

export default function Categoria(props) {
    const [prop] = useState(props['props']);
    // console.log(props);
    const [isSelecionado, setIsSelecionado] = useState(false);

    function selecionarCategoria(props) {
        if (isSelecionado) {
            setIsSelecionado(false);
        } else {
            setIsSelecionado(true);
        }

        const selecionar = [{ 'categoriaId': prop.estabelecimentoCategoriaId, 'isSelecionado': !isSelecionado }];
        if (!isSelecionado) {
            props.onAdicionarCategoria((prevState) => [...prevState, ...selecionar]);
        } else {
            props.onRemoverCategoria(selecionar);
        }
    }

    return (
        <div onClick={() => selecionarCategoria(props)} className='categoria pointer' title={`Filtrar por ${prop.categoria.toLowerCase()}`} >
            <div className='access-icon' style={{ backgroundColor: (isSelecionado ? 'var(--cor-principal)' : 'var(--light-font)'), transition: 'background-color 0.5s ease' }}>
                <i className={prop.icone}></i>
            </div>

            <span className='access-text'>{prop.categoria}</span>
        </div>
    );
}

