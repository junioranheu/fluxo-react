
import React, { useEffect, useRef } from 'react';
import DivCentralizada from '../../componentes/outros/divCentralizada';

export default function RecuperandoSenha() {
    const refEmailOuNomeUsuario = useRef();
    const refBtn = useRef();

    useEffect(() => {
        document.title = 'Fluxo — Recuperar senha';
    }, []);

    function handleChangeFormDadosFluxo() {

    }

    function handleSubmit() {

    }

    return (
        <DivCentralizada>
            <div className='has-text-centered'>
                <h1 className='title mt-2'>Esqueceu sua <span className='grifar'>senha?</span></h1>
                <h1 className='subtitle'><span className='efeito-texto'>Recupere-a aqui</span></h1>
            </div>

            <div className='notification mt-5'>
                <p>É fácil recuperar sua <span className='grifar'>senha</span>! 😎</p>
                <p>Preencha o campo com seu e-mail ou nome de usuário e verifique sua caixa de e-mail!</p>
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

