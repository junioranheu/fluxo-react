import React from 'react';

export default function InputFiltroPrincipal(props) {
    return (
        <div className='search-wrapper'>
            <input onInput={e => props.onInput(e.target.value)} className='search-input' type='text' placeholder={props.placeholder} />

            <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' className='feather feather-search' viewBox='0 0 24 24'>
                <defs />
                <circle cx='11' cy='11' r='8' />
                <path d='M21 21l-4.35-4.35' />
            </svg>
        </div>
    );
}

