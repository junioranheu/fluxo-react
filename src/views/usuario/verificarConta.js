import Moment from 'moment';
import NProgress from 'nprogress';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Aviso } from '../../componentes/outros/aviso';
import DivCentralizada from '../../componentes/outros/divCentralizada';
import CONSTANTS_URL_TEMPORARIA from '../../utilidades/const/constUrlTemporaria';
import CONSTANTS from '../../utilidades/const/constUsuarios';
import { Auth, UsuarioContext } from '../../utilidades/context/usuarioContext';
import { Fetch } from '../../utilidades/utils/fetch';

export default function VerificarConta() {
    const [urlPagina] = useState(window.location.pathname);
    const [urlTemporaria] = useState(urlPagina.substring(urlPagina.lastIndexOf('/') + 1));

    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const [usuarioId] = useState(isAuth ? Auth.getUsuarioLogado().usuarioId : null);

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
                Aviso.error('Solicitação de verificação de conta inválida ou expirada!', 5000);
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
                Aviso.error('Solicitação de verificação de conta expirada!', 5000);
                navigate('/sem-acesso', { replace: true });
                return false;
            }

            NProgress.done();
        }

        verificarUrlTemporaria();
    }, [urlTemporaria, navigate]);

    async function handleSubmit(e) {
        NProgress.start();
        refBtn.current.disabled = true;
        e.preventDefault();

        // Verificar conta;
        const url = `${CONSTANTS.API_URL_POST_VERIFICAR_CONTA}?usuarioId=${usuarioId}`;
        const token = Auth.getUsuarioLogado().token;
        let resposta = await Fetch.postApi(url, '', token);
        if (!resposta) {
            Aviso.error('Algo deu errado ao verificar sua conta!', 5000);
            return false;
        }

        NProgress.done();
        Aviso.success('Conta verificada com sucesso!', 10000);
        navigate('/', { replace: true });
    }

    return (
        <DivCentralizada isCentralizar={true}>
            <div className='has-text-centered'>
                <h1 className='title mt-2'>Verifique sua <span className='grifar'>conta</span>!</h1>
                {/* <h1 className='subtitle'><span className='efeito-texto'>xxx</span></h1> */}
            </div>

            <div className='notification mt-5'>
                <p>Verificar sua conta é um passo importante para nos mostrar que você é uma pessoa de verdade, e não um... robô 🤖</p>
            </div>

            <div className='has-text-centered mt-5'>
                <input ref={refBtn} onClick={handleSubmit} disabled={(infoUrl === null)}
                    type='button' className='button is-vcentered is-primary is-fullwidth' value='Verificar conta' />
            </div>
        </DivCentralizada>
    );
}

