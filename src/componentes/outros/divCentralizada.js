import React, { useState } from 'react';
import HeroZika from './heroZika';

export default function DivCentralizada(props) {
    // console.log(props.isCentralizar);
    const [classe] = useState(props.isCentralizar ? 'is-medium' : 'is-small mt-6');
    // console.log(classe);

    return (
        <React.Fragment>
            <HeroZika />

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