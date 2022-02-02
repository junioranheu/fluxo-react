import React, { useState } from 'react';

export default function DivCentralizada(props) {
    // console.log(props.isCentralizar);
    const [classe] = useState(props.isCentralizar ? 'is-medium' : 'is-small mt-6');
    // console.log(classe);

    return (
        <React.Fragment>
            {/* Efeito */}
            <div className='hero-zika'>
                <svg className='secao-diagonal' preserveAspectRatio='none' viewBox='0 0 1438 620' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M0 620V0h1438v240L0 620z' />
                </svg>
            </div>

            {/* Seção */}
            <section className={`hero sem-highlight ${classe}`}>
                <div className='hero-body'>
                    <div className='container'>
                        <div className='columns is-centered'>
                            <div className='column is-12-mobile is-10-tablet is-8-desktop is-6-widescreen'>
                                <div className='box'>
                                    {props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}