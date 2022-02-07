import React, { useEffect } from 'react';

export default function SemAcesso() {
    // Ao carregar página;
    useEffect(() => {
        document.title = 'Fluxo — Teste'
    }, []);

    return (
        <section className='hero is-medium mt-6'>
            <h2>Teste</h2>
        </section>
    );
}