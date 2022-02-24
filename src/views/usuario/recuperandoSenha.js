
import Moment from 'moment';
import NProgress from 'nprogress';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Aviso } from '../../componentes/outros/aviso';
import DivCentralizada from '../../componentes/outros/divCentralizada';
import CONSTANTS_URL_TEMPORARIA from '../../utilidades/const/constUrlTemporaria';
import CONSTANTS from '../../utilidades/const/constUsuarios';
import { Fetch } from '../../utilidades/utils/fetch';

export default function RecuperandoSenha() {
    const [urlPagina] = useState(window.location.pathname);
    const [urlTemporaria] = useState(urlPagina.substring(urlPagina.lastIndexOf('/') + 1));

    const navigate = useNavigate();
    const refEmail = useRef();
    const refSenha = useRef();
    const refConfirmarSenha = useRef();
    const refBtn = useRef();

    const formInicial = {
        email: '',
        senha: '',
        confirmarSenha: ''
    }
    const [formData, setFormData] = useState(formInicial);
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const [infoUrl, setInfoUrl] = useState(null);
    useEffect(() => {
        document.title = 'Fluxo — Recuperar senha';

        async function verificarUrlTemporaria() {
            NProgress.start();
            const urlTipo = 'Recuperar senha';
            const url = `${CONSTANTS_URL_TEMPORARIA.API_URL_GET_POR_TIPO_URL_E_ID_DINAMICA}?urlTipo=${urlTipo}&urlTemporaria=${urlTemporaria}`;
            let resposta = await Fetch.getApi(url);
            // console.log(resposta);
            if (!resposta) {
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
                Aviso.error('Solicitação de recuperação de senha expirada!', 5000);
                navigate('/sem-acesso', { replace: true });
                return false;
            }

            // Exibir e-mail na tela;
            formData.email = resposta.chaveDinamica;
            refEmail.current.value = resposta.chaveDinamica;

            NProgress.done();
        }

        verificarUrlTemporaria();
    }, [urlTemporaria, navigate]);

    function resetarCampos() {
        refConfirmarSenha.current.value = '';
        refSenha.current.value = '';
        refSenha.current.select();
        refBtn.current.disabled = false;
        NProgress.done();
    }

    async function handleSubmit(e) {
        NProgress.start();
        refBtn.current.disabled = true;
        e.preventDefault();

        if (!formData || !formData.senha || !formData.confirmarSenha) {
            Aviso.error('Preencha os campos para prosseguir!', 5000);
            resetarCampos();
            return false;
        }

        // Checar se os dois campos coincidem;
        if (formData.senha !== formData.confirmarSenha) {
            Aviso.error('As senhas não estão idênticas! Tente novamente', 5000);
            resetarCampos();
            return false;
        }

        // Verificar se a senha está complexa o suficiente;
        if (checarSenha(formData.senha) === false) {
            return false;
        }

        // Alterar senha;
        const jsonAlterarSenha = {
            email: formData.email,
            senha: formData.senha
        };
        const url = `${CONSTANTS.API_URL_POST_ALTERAR_SENHA}`;
        // console.log(url);

        let resposta = await Fetch.postApi(url, jsonAlterarSenha);
        if (!resposta) {
            Aviso.error('Algo deu errado ao tentar alterar sua senha!', 5000);
            resetarCampos();
            return false;
        }

        NProgress.done();
        Aviso.success('Senha alterada com sucesso!', 10000);
        navigate('/entrar', { replace: true });
    }

    function checarSenha(senha, form, refSenha) {
        var number = /([0-9])/;
        var alphabets = /([a-zA-Z])/;
        // var special_characters = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;

        if (senha.length < 6) {
            Aviso.warn('Sua senha deve ter pelo menos 06 caracteres', 6000);
            resetarCampos();
            return false;
        } else {
            if (senha.match(number) && senha.match(alphabets)) { // && senha.match(special_characters)
                return true;
            } else {
                Aviso.warn('Sua senha não é forte o suficiente<br/>Lembre-se de usar: letras e números!', 6000);
                resetarCampos();
                return false;
            }
        }
    }

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            refBtn.current.click();
        }
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
                <label className='label'>E-mail</label>
                <div className='control has-icons-right'>
                    <input ref={refEmail} value={formData.email}
                        type='email' className='input' placeholder='Seu e-mail previamente registrado' disabled />

                    <span className='icon is-small is-right'>
                        <i className='fas fa-at'></i>
                    </span>
                </div>
            </div>

            <div className='field'>
                <label className='label'>Nova senha</label>
                <div className='control has-icons-right'>
                    <input onChange={(e) => handleChange(e)} onKeyPress={handleKeyPress} ref={refSenha}
                        type='password' name='senha' className='input' placeholder='Sua senha' autoComplete='weon' />

                    <span className='icon is-small is-right'>
                        <i className='fa fa-key'></i>
                    </span>
                </div>
            </div>

            <div className='field'>
                <label className='label'>Confirme sua nova senha</label>
                <div className='control has-icons-right'>
                    <input onChange={(e) => handleChange(e)} onKeyPress={handleKeyPress} ref={refConfirmarSenha}
                        type='password' name='confirmarSenha' className='input' placeholder='Confirme sua nova senha' autoComplete='weon' />

                    <span className='icon is-small is-right'>
                        <i className='fa fa-key'></i>
                    </span>
                </div>
            </div>

            <div className='has-text-centered mt-5'>
                <input ref={refBtn} onClick={handleSubmit} disabled={(infoUrl === null)}
                    type='button' className='button is-vcentered is-primary is-fullwidth' value='Recuperar senha' />
            </div>
        </DivCentralizada>
    );
}

