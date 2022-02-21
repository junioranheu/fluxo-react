
import React, { useEffect } from 'react';
import DivCentralizada from '../../componentes/outros/divCentralizada';

export default function RecuperarSenha() {
    useEffect(() => {
        document.title = 'Fluxo — Recuperar senha';
    }, []);

    function handleChangeFormDadosFluxo() {

    }

    return (
        <DivCentralizada>
            <div className='has-text-centered mb-6'>
                <h1 className='title mt-2'><span className='grifar'>Esqueceu sua senha?</span></h1>
                <h1 className='subtitle'><span className='efeito-texto'>Recupere-a aqui</span></h1>
            </div>

            <div className='field'>
                <label className='label'>E-mail</label>
                <div className='control has-icons-right'>
                    <input onChange={(e) => handleChangeFormDadosFluxo(e)}
                        type='email' name='email' className='input' placeholder='Seu melhor e-mail' disabled />

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
        </DivCentralizada>
    );
}

