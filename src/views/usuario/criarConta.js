import NProgress from 'nprogress';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Aviso } from '../../componentes/outros/aviso';
import DivCentralizada from '../../componentes/outros/divCentralizada';
import '../../css/entrar.css';
import Logo from '../../static/outro/fluxo.webp';
import CONSTANTS_URL_TEMPORARIA from '../../utilidades/const/constUrlTemporaria';
import CONSTANTS from '../../utilidades/const/constUsuarios';
import { Auth, UsuarioContext } from '../../utilidades/context/usuarioContext';
import { Fetch } from '../../utilidades/utils/fetch';
import HorarioBrasilia from '../../utilidades/utils/horarioBrasilia';
import PadronizarNomeCompletoUsuario from '../../utilidades/utils/padronizarNomeCompletoUsuario';
import VerificarDadosFluxo from '../../utilidades/utils/verificarDadosFluxo';
import VerificarEmailENomeUsuario from '../../utilidades/utils/verificarEmailENomeUsuario';

export default function CriarConta() {
    const refNomeCompleto = useRef();
    const refEmail = useRef();
    const refNomeUsuario = useRef();
    const refSenha = useRef();
    const refConfirmarSenha = useRef();
    const refBtnCriar = useRef();

    const [isAuth, setIsAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const [formData, setFormData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Fluxo — Criar conta';
    }, [isAuth, navigate]);

    // Ao alterar os valores dos inputs, insira os valores nas variaveis do formData;
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Ao clicar no botão para entrar;
    async function handleSubmit(e) {
        NProgress.start();
        refBtnCriar.current.disabled = true;
        e.preventDefault();

        // Verificações;
        const isTrocouSenha = true;
        let isContinuarUm = VerificarDadosFluxo(formData, refNomeCompleto, refEmail, refNomeUsuario, refSenha, refConfirmarSenha, isTrocouSenha);
        if (!isContinuarUm) {
            refBtnCriar.current.disabled = false;
            return false;
        }

        // Atribuir o nome formatado para a variavel nome, novamente;
        formData.nomeCompleto = PadronizarNomeCompletoUsuario(formData.nomeCompleto);

        // Verificar se o processo deve continuar, caso e-mail e senha estejam disponíveis para uso;
        const isNovoEmail = true;
        const isNovoNomeUsuario = true;
        let isContinuarDois = await VerificarEmailENomeUsuario(formData, refEmail, refNomeUsuario, refSenha, isNovoEmail, isNovoNomeUsuario);
        if (!isContinuarDois) {
            refBtnCriar.current.disabled = false;
            return false;
        }

        // Criar conta;
        const urlCriarConta = CONSTANTS.API_URL_POST_CRIAR;
        const usuario_a_ser_criado = {
            nomeCompleto: formData.nomeCompleto,
            email: formData.email,
            nomeUsuarioSistema: formData.nomeUsuarioSistema,
            senha: formData.senha,
            usuarioTipoId: 2, // Usuário comum;
            dataCriacao: HorarioBrasilia().format('YYYY-MM-DD HH:mm:ss'),
            foto: '',
            isAtivo: 1,
            isPremium: 0,
            IsVerificado: 0
        };

        let resposta = await Fetch.postApi(urlCriarConta, usuario_a_ser_criado);
        if (resposta) {
            // console.log('Ok: ' + resposta);
            await getToken(formData.nomeUsuarioSistema, formData.senha, formData.email, formData.nomeCompleto);
        } else {
            refBtnCriar.current.disabled = false;
            Aviso.error('Algo deu errado ao criar sua nova conta<br/>Consulte o F12!', 5000);
        }
    };

    async function getToken(nomeUsuarioSistema, senha, email, nomeCompleto) {
        const urlDados = `${CONSTANTS.API_URL_GET_VERIFICAR_EMAIL_E_SENHA}?nomeUsuarioSistema=${nomeUsuarioSistema}&senha=${senha}`;
        let dadosUsuarioVerificado = await Fetch.getApi(urlDados);

        // Gerar token;
        const urlAutenticar = `${CONSTANTS.API_URL_GET_AUTENTICAR}?nomeUsuarioSistema=${nomeUsuarioSistema}&senha=${senha}`;
        let resposta = await Fetch.getApi(urlAutenticar);

        if (resposta) {
            // Inserir o token no json final para gravar localmente a sessão do login;
            dadosUsuarioVerificado.token = resposta;
            Auth.setUsuarioLogado(dadosUsuarioVerificado);

            // Enviar e-mail de "bem-vindo";
            const isEmailEnviado = await enviarEmail(email, nomeCompleto);
            if (!isEmailEnviado) {
                Aviso.error('Houve um erro ao disparar um e-mail para você! Tente logar no sistema novamente mais tarde', 5000);
                return false;
            }

            // Voltar à tela principal;
            navigate('/', { replace: true });

            // Atribuir autenticação ao contexto de usuário;
            setIsAuth(true);
        } else {
            Aviso.error('Algo deu errado ao se autenticar!', 5000);
        }
    }

    async function enviarEmail(email, nomeCompleto) {
        // Gerar uma url temporária;
        const urlTipo = 'Verificar conta';
        const jsonGerarUrlTemporaria = {
            chaveDinamica: email,
            dataGeracaoUrl: HorarioBrasilia().format('YYYY-MM-DD HH:mm:ss'),
            isAtivo: 1
        };
        const urlGerarUrlTemporaria = `${CONSTANTS_URL_TEMPORARIA.API_URL_POST_CRIAR}?urlTipo=${urlTipo}`;
        let urlTemporaria = await Fetch.postApi(urlGerarUrlTemporaria, jsonGerarUrlTemporaria);
        if (!urlTemporaria) {
            // Aviso.error('Houve um erro ao gerar uma url temporária!', 5000);
            return false;
        }
        
        // Disparar e-mail;
        const urlEnviarEmail = `${CONSTANTS.API_URL_POST_ENVIAR_EMAIL_BEM_VINDO}?email=${email}&nomeUsuario=${nomeCompleto}&urlTemporaria=${urlTemporaria}`;
        const enviarEmail = await Fetch.postApi(urlEnviarEmail);
        if (!enviarEmail) {
            // Aviso.error('Houve um erro ao disparar um e-mail para você!', 5000);
            return false;
        }

        return true;
    }

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            refBtnCriar.current.click();
        }
    }

    return (
        <DivCentralizada isCentralizar={false}>
            <div className='has-text-centered mb-6'>
                <div>
                    <img className='login-logo' src={Logo} alt='Erro...' />
                </div>

                <h1 className='title mt-2'>Crie sua conta no <span className='grifar'>Fluxo</span></h1>
                <h1 className='subtitle'><span className='efeito-texto'>Conheça a sua cidade!</span></h1>
            </div>

            <div className='field mt-5'>
                <label className='label'>Nome completo</label>
                <div className='control has-icons-right'>
                    <input className='input' type='text' name='nomeCompleto' placeholder='Seu nome completo'
                        onChange={handleChange} onKeyPress={handleKeyPress} ref={refNomeCompleto}
                    />
                    <span className='icon is-small is-right'>
                        <i className='fas fa-signature'></i>
                    </span>
                </div>
            </div>

            <div className='field'>
                <label className='label'>E-mail</label>
                <div className='control has-icons-right'>
                    <input className='input' type='email' name='email' placeholder='Seu melhor e-mail'
                        onChange={handleChange} onKeyPress={handleKeyPress} ref={refEmail}
                    />
                    <span className='icon is-small is-right'>
                        <i className='fas fa-envelope'></i>
                    </span>
                </div>
            </div>

            <div className='field'>
                <label className='label'>Nome de usuário</label>
                <div className='control has-icons-right has-icons-left'>
                    <span className='icon is-small is-left'>
                        <i className='fas fa-at'></i>
                    </span>
                    <input className='input' type='text' name='nomeUsuarioSistema' placeholder='Seu nome de usuário no Fluxo'
                        onChange={handleChange} onKeyPress={handleKeyPress} ref={refNomeUsuario}
                    />
                    <span className='icon is-small is-right'>
                        <i className='fa fa-user'></i>
                    </span>
                </div>
            </div>

            <div className='field'>
                <label className='label'>Senha</label>
                <div className='control has-icons-right'>
                    <input className='input' type='password' name='senha' placeholder='Sua senha' autoComplete='new-password'
                        onChange={handleChange} onKeyPress={handleKeyPress} ref={refSenha}
                    />
                    <span className='icon is-small is-right'>
                        <i className='fa fa-key'></i>
                    </span>
                </div>
            </div>

            <div className='field'>
                <label className='label'>Confirmar senha</label>
                <div className='control has-icons-right'>
                    <input className='input' type='password' name='confirmarSenha' placeholder='Confirme sua senha'
                        onChange={handleChange} onKeyPress={handleKeyPress} ref={refConfirmarSenha}
                    />
                    <span className='icon is-small is-right'>
                        <i className='fa fa-key'></i>
                    </span>
                </div>
            </div>

            <div className='notification mt-5'>
                <p>Sua senha deve ter pelo menos 06 caracteres — números e letras</p>
            </div>

            <div className='has-text-centered mt-5'>
                <input ref={refBtnCriar} onClick={handleSubmit} type='button' className='button is-vcentered is-primary is-fullwidth' value='Entrar' />
            </div>

            <div className='has-text-centered mt-4'>
                <small>
                    <span>Ao entrar você automaticamente concorda com os <a className='cor-principal' target='_blank' href='/politica-e-termos-de-uso'>termos de uso</a></span>
                    <br />
                    <span>Já tem uma conta? <a className='cor-principal' href='/entrar'>Entre aqui!</a></span>
                </small>
            </div>
        </DivCentralizada>
    );
}