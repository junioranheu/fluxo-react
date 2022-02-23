
import NProgress from 'nprogress';
import React, { useEffect, useRef, useState } from 'react';
import { Aviso } from '../../componentes/outros/aviso';
import DivCentralizada from '../../componentes/outros/divCentralizada';
import CONSTANTS_URL_TEMPORARIA from '../../utilidades/const/constUrlTemporaria';
import CONSTANTS from '../../utilidades/const/constUsuarios';
import { Fetch } from '../../utilidades/utils/fetch';

export default function RecuperarSenha() {
    const refEmailOuNomeUsuario = useRef();
    const refBtn = useRef();

    useEffect(() => {
        document.title = 'Fluxo — Recuperar senha';
    }, []);

    const formInicial = {
        emailOuNomeUsuario: ''
    }
    const [formData, setFormData] = useState(formInicial);
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            refBtn.current.click();
        }
    }

    async function handleSubmit(e) {
        NProgress.start();
        refBtn.current.disabled = true;
        e.preventDefault();

        if (!formData || !formData.emailOuNomeUsuario) {
            resetarCampos();
            Aviso.error('Preencha o campo com seu e-mail ou nome de usuário!', 5000);
            return false;
        }

        const url = `${CONSTANTS.API_URL_GET_EMAIL_POR_EMAIL_OU_NOME_USUARIO}?emailOuNomeUsuario=${formData.emailOuNomeUsuario}`;
        // console.log(url);

        // Verificar o e-mail com base no e-mail ou nome de usuário inserido;
        let emailCadastrado = await Fetch.getApi(url);
        if (!emailCadastrado) {
            resetarCampos();
            Aviso.error('Esse e-mail/nome de usuário não está registrado na nossa base de dados!', 5000);
            return false;
        }

        // Gerar uma url temporária;
        const urlTipo = 'Recuperar senha';
        const urlGerarUrlTemporaria = `${CONSTANTS_URL_TEMPORARIA.API_URL_GET_POR_TIPO_URL_E_ID_DINAMICA}?urlTipo=${urlTipo}&chaveDinamico=${emailCadastrado}`;
        let urlTemporaria = await Fetch.postApi(urlGerarUrlTemporaria);
        if (!urlTemporaria) {
            resetarCampos();
            Aviso.error('Houve um erro ao gerar uma url temporária!', 5000);
            return false;
        }

        console.log(urlTemporaria);
        return false;

        // Disparar e-mail para o e-mail que está na variavel "resposta";
        const urlEnviarEmail = `${CONSTANTS.API_URL_POST_ENVIAR_EMAIL_RECUPERACAO_SENHA}?email=${emailCadastrado}`;
        let respostaEnviarEmail = await Fetch.postApi(urlEnviarEmail);
        if (!respostaEnviarEmail) {
            resetarCampos();
            Aviso.error('Houve um erro ao enviar o e-mail de recuperação de senha!', 5000);
            return false;
        }

        Aviso.success('E-mail de recuperação de senha enviado com sucesso!', 10000);
        NProgress.done();
    }

    function resetarCampos() {
        NProgress.done();
        refEmailOuNomeUsuario.current.value = '';
        refEmailOuNomeUsuario.current.select();
        refBtn.current.disabled = false;
        formData.emailOuNomeUsuario = '';
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
                    <input ref={refEmailOuNomeUsuario} onChange={(e) => handleChange(e)} onKeyPress={handleKeyPress}
                        type='text' name='emailOuNomeUsuario' className='input' placeholder='Seu e-mail ou nome de usuário previamente registrado' />

                    <span className='icon is-small is-right'>
                        <i className='fas fa-at'></i>
                    </span>
                </div>
            </div>

            <div className='has-text-centered mt-5'>
                <input ref={refBtn} onClick={(e) => handleSubmit(e)} type='button'
                    className='button is-vcentered is-primary is-fullwidth' value='Recuperar senha' />
            </div>
        </DivCentralizada>
    );
}

