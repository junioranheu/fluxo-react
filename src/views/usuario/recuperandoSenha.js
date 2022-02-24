
import NProgress from 'nprogress';
import React, { useEffect, useRef, useState } from 'react';
import { Aviso } from '../../componentes/outros/aviso';
import DivCentralizada from '../../componentes/outros/divCentralizada';
import CONSTANTS_URL_TEMPORARIA from '../../utilidades/const/constUrlTemporaria';
import { Fetch } from '../../utilidades/utils/fetch';

export default function RecuperandoSenha() {
    const [urlPagina] = useState(window.location.pathname);
    const [urlTemporaria] = useState(urlPagina.substring(urlPagina.lastIndexOf('/') + 1));

    const refEmailOuNomeUsuario = useRef();
    const refBtn = useRef();

    useEffect(() => {
        document.title = 'Fluxo — Recuperar senha';

        async function verificarUrlTemporaria() {
            NProgress.start();
            const urlTipo = 'Recuperar senha';
            const url = `${CONSTANTS_URL_TEMPORARIA.API_URL_GET_POR_TIPO_URL_E_ID_DINAMICA}?urlTipo=${urlTipo}&urlTemporaria=${urlTemporaria}`;
            let resposta = await Fetch.getApi(url);
            if (!resposta) {
                Aviso.error('Solicitação de recuperação de senha inválida!', 5000);
                NProgress.done();
                return false;
            }

            Aviso.success('xxxxxxxxxxxxxxxxxx!', 10000);
            NProgress.done();

            console.log(urlTemporaria);
        }

        verificarUrlTemporaria();
    }, [urlTemporaria]);

    function handleChangeFormDadosFluxo() {

    }

    function handleSubmit() {

    }

    return (
        <DivCentralizada isCentralizar={true}>
            <div className='has-text-centered'>
                <h1 className='title mt-2'>Esqueceu sua <span className='grifar'>senha?</span></h1>
                <h1 className='subtitle'><span className='efeito-texto'>Recupere-a aqui</span></h1>
            </div>

            <div className='notification mt-5'>
                <p>É fácil recuperar sua <span className='grifar'>senha</span>! 😎</p>
                <p>Preencha corretamente os campos abaixo e pronto!</p>
            </div>

            <div className='field'>
                <label className='label'>E-mail ou nome de usuário</label>
                <div className='control has-icons-right'>
                    <input ref={refEmailOuNomeUsuario} onChange={(e) => handleChangeFormDadosFluxo(e)}
                        type='email' name='email' className='input' placeholder='Seu e-mail ou nome de usuário previamente registrado' />

                    <span className='icon is-small is-right'>
                        <i className='fas fa-at'></i>
                    </span>
                </div>
            </div>

            <div className='field'>
                <label className='label'>Nova senha</label>
                <div className='control has-icons-right'>
                    <input onChange={(e) => handleChangeFormDadosFluxo(e)}
                        type='password' name='senha' className='input' value='' placeholder='Sua senha' autoComplete='weon' />

                    <span className='icon is-small is-right'>
                        <i className='fa fa-key'></i>
                    </span>
                </div>
            </div>

            <div className='field'>
                <label className='label'>Confirme sua nova senha</label>
                <div className='control has-icons-right'>
                    <input onChange={(e) => handleChangeFormDadosFluxo(e)}
                        type='password' name='senha' className='input' value='' placeholder='Confirme sua nova senha' autoComplete='weon' />

                    <span className='icon is-small is-right'>
                        <i className='fa fa-key'></i>
                    </span>
                </div>
            </div>

            <div className='has-text-centered mt-5'>
                <input ref={refBtn} onClick={handleSubmit} type='button' className='button is-vcentered is-primary is-fullwidth' value='Recuperar senha' />
            </div>
        </DivCentralizada>
    );
}

