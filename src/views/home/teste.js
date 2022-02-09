import NProgress from 'nprogress';
import React, { useEffect, useState } from 'react';
import { Aviso } from '../../componentes/outros/aviso';
import CONSTANTS_ESTABELECIMENTOS from '../../utilidades/const/constEstabelecimentos';
import { Fetch } from '../../utilidades/utils/fetch';

export default function SemAcesso() {
    // Ao carregar página;
    useEffect(() => {
        document.title = 'Fluxo — Teste'
    }, []);

    async function getDetalheEstabelecimento() {
        NProgress.start();

        // Pegar o parâmetro da URL;
        const url = `${CONSTANTS_ESTABELECIMENTOS.API_URL_GET_POR_ID}/49`;

        let resposta = await Fetch.getApi(url);
        if (resposta) {
            setTeste(resposta);
            NProgress.done();
        } else {
            Aviso.error('Algo deu errado ao consultar o estabelecimento em questão!', 5000);
        }
    }

    const [teste, setTeste] = useState([]);
    useEffect(() => {
        // Pegar os detalhes do estabelecimento;
        getDetalheEstabelecimento();
    }, []);

    useEffect(() => {
        if (teste.usuarioId > 0) {
            console.log('a');
        }
    }, [teste]);

    return (
        <section className='hero is-medium mt-6'>
            <h2>Teste</h2>
        </section>
    );
}