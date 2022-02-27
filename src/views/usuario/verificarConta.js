import Moment from 'moment';
import NProgress from 'nprogress';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Aviso } from '../../componentes/outros/aviso';
import DivCentralizada from '../../componentes/outros/divCentralizada';
import CONSTANTS_URL_TEMPORARIA from '../../utilidades/const/constUrlTemporaria';
import { Fetch } from '../../utilidades/utils/fetch';

export default function VerificarConta() {
    const [urlPagina] = useState(window.location.pathname);
    const [urlTemporaria] = useState(urlPagina.substring(urlPagina.lastIndexOf('/') + 1));

    const navigate = useNavigate();
    const refBtn = useRef();

    const [infoUrl, setInfoUrl] = useState(null);
    useEffect(() => {
        document.title = 'Fluxo — Verificar conta';

        async function verificarUrlTemporaria() {
            NProgress.start();
            const urlTipo = 'Verificar conta';
            const url = `${CONSTANTS_URL_TEMPORARIA.API_URL_GET_POR_TIPO_URL_E_ID_DINAMICA}?urlTipo=${urlTipo}&urlTemporaria=${urlTemporaria}`;
            let resposta = await Fetch.getApi(url);
            // console.log(resposta);
            if (!resposta) {
                NProgress.done();
                Aviso.error('Solicitação de recuperação de senha inválida ou expirada!', 5000);
                navigate('/sem-acesso', { replace: true });
                return false;
            }

            // Informações url ok;
            setInfoUrl(resposta);

            // Verificar se a url ainda é válida;
            const horaParaExpirar = 1;
            const diferencaUrlGeradaEHoraExpirar = Moment.duration(Moment().diff(resposta.dataGeracaoUrl));
            const diferencaHoras = diferencaUrlGeradaEHoraExpirar.asHours();
            if (diferencaHoras > horaParaExpirar) {
                NProgress.done();
                Aviso.error('Solicitação de recuperação de senha expirada!', 5000);
                navigate('/sem-acesso', { replace: true });
                return false;
            }

            NProgress.done();
        }

        console.log(urlTemporaria);
        // verificarUrlTemporaria();
    }, [urlTemporaria, navigate]);

    async function handleSubmit(e) {
        NProgress.start();
        refBtn.current.disabled = true;
        e.preventDefault();

        let resposta = await Fetch.postApi(url, jsonVerificarConta);
        if (!resposta) {
            Aviso.error('Algo deu errado ao verificar sua conta!', 5000);
            return false;
        }

        NProgress.done();
        Aviso.success('Senha alterada com sucesso!', 10000);
        navigate('/entrar', { replace: true });
    }

    return (
        <DivCentralizada isCentralizar={true}>
            <div className='has-text-centered'>
                <h1 className='title mt-2'>Esqueceu sua <span className='grifar'>senha?</span></h1>
                <h1 className='subtitle'><span className='efeito-texto'>Recupere-a aqui</span></h1>
            </div>

            <div className='notification mt-5'>
                <p>Verificar sua conta é um passo importante para nos mostrar que você realmente é uma pessoa</p>
            </div>

            <div className='has-text-centered mt-5'>
                <input ref={refBtn} onClick={handleSubmit} disabled={(infoUrl === null)}
                    type='button' className='button is-vcentered is-primary is-fullwidth' value='Recuperar senha' />
            </div>
        </DivCentralizada>
    );
}

