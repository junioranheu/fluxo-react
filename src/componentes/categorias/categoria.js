import React, { useRef, useState } from 'react';
import '../../css/itens.css';

export default function Categoria(props) {
    const [prop] = useState(props['props']);
    // console.log(props);
    const [isSelecionado, setIsSelecionado] = useState(false);

    // Scroll categorias;
    const executeScroll = () => referenciaScroll.current.scrollIntoView({ behavior: 'smooth', });
    const referenciaScroll = useRef(null);

    function selecionarCategoria(props) {
        if (isSelecionado) {
            setIsSelecionado(false);
        } else {
            setIsSelecionado(true);
        }

        const selecionar = [{ 'categoriaId': prop.estabelecimentoCategoriaId }];
        if (!isSelecionado) {
            props.onAdicionarCategoria((prevState) => [...prevState, ...selecionar]);
        } else {
            props.onRemoverCategoria(selecionar);
        }

        // Scrollar;
        executeScroll();
    }

    return (
        <div ref={referenciaScroll} onClick={() => selecionarCategoria(props)} className='categoria pointer animate__animated animate__fadeIn sem-highlight' title={`Filtrar por ${prop.categoria.toLowerCase()}`} >
            <div className='access-icon' style={{ backgroundColor: (isSelecionado ? 'var(--cor-principal)' : 'var(--light-font)'), transition: 'background-color 0.5s ease' }}>
                <i className={prop.icone}></i>
            </div>

            <span className='access-text'>{prop.categoria}</span>
        </div>
    );
}

