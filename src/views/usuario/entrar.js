import Moment from 'moment';
import NProgress from 'nprogress';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Aviso } from '../../componentes/outros/aviso';
import DivCentralizada from '../../componentes/outros/divCentralizada';
import '../../css/entrar.css';
import Logo from '../../static/outro/fluxo.webp';
import CONSTANTS from '../../utilidades/const/constUsuarios';
import { Auth, UsuarioContext } from '../../utilidades/context/usuarioContext';
import { Fetch } from '../../utilidades/utils/fetch';
import horarioBrasilia from '../../utilidades/utils/horarioBrasilia';

export default function Index() {
    const refTxtNomeUsuario = useRef();
    const refTxtSenha = useRef();
    const refBtnEntrar = useRef();

    const [isAuth, setIsAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const [formData, setFormData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Fluxo — Entrar';

        // Verificar se o usuário está logado;
        // Se estiver, redirecione-o;
        if (isAuth) {
            navigate('/', { replace: true });
        }
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
        refBtnEntrar.current.disabled = true;
        e.preventDefault();

        if (!formData || !formData.usuario || !formData.senha) {
            NProgress.done();
            Aviso.error('O nome de usuário e/ou e-mail estão vazios!', 5000);
            refTxtSenha.current.value = '';
            refTxtNomeUsuario.current.select();
            refBtnEntrar.current.disabled = false;
            return false;
        }

        const url = `${CONSTANTS.API_URL_GET_VERIFICAR_EMAIL_E_SENHA}?nomeUsuarioSistema=${formData.usuario}&senha=${formData.senha}`;
        // console.log(url);

        // Verificar se o login e a senha estão corretos;
        let resposta = await Fetch.getApi(url);
        if (!resposta) {
            NProgress.done();
            refTxtSenha.current.value = '';
            formData.senha = '';
            refTxtNomeUsuario.current.select();
            refBtnEntrar.current.disabled = false;
            Aviso.error('Algo deu errado<br/>Provavelmente o usuário e/ou a senha estão errados!', 5000);
            return false;
        }

        // Verificar se o usuário já está logado;
        const horaAgora = horarioBrasilia();
        const horaOnlineUsuario = resposta.dataOnline;
        var duracao = Moment.duration(horaAgora.diff(horaOnlineUsuario));
        var diferencaSegundos = duracao.asSeconds();     
        // console.log(diferencaSegundos);
        if (diferencaSegundos < 5) {
            NProgress.done();
            refTxtSenha.current.value = '';
            formData.senha = '';
            refTxtNomeUsuario.current.select();
            refBtnEntrar.current.disabled = false;
            Aviso.error('Erro ao iniciar sessão<br/>Essa conta já está logada no sistema!', 5000);
            return false;
        }

        // Gerar token e autenticar/entrar;
        getToken(formData.usuario, formData.senha, resposta);
    };

    async function getToken(nomeUsuario, senha, dadosUsuarioVerificado) {
        const url = `${CONSTANTS.API_URL_GET_AUTENTICAR}?nomeUsuarioSistema=${nomeUsuario}&senha=${senha}`;

        // Gerar token;
        let resposta = await Fetch.getApi(url);
        if (resposta) {
            // Inserir o token no json final para gravar localmente a sessão do login;
            dadosUsuarioVerificado.token = resposta;
            Auth.setUsuarioLogado(dadosUsuarioVerificado);

            // Atribuir autenticação ao contexto de usuário;
            setIsAuth(true);

            // Voltar à tela principal;
            navigate('/', { replace: true });
        } else {
            Aviso.error('Algo deu errado ao se autenticar!', 5000);
        }
    }

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            refBtnEntrar.current.click();
        }
    }

    return (
        <DivCentralizada isCentralizar={true}>
            <div className='has-text-centered mb-6'>
                <div>
                    <img className='login-logo' src={Logo} alt='Erro...' />
                </div>

                <h1 className='title mt-2'>Entre no <span className='grifar'>Fluxo</span></h1>
                <h1 className='subtitle'><span className='efeito-texto'>Conheça a sua cidade!</span></h1>
            </div>

            <div className='field mt-5'>
                <label className='label'>Nome de usuário ou e-mail</label>
                <div className='control has-icons-right'>
                    <input type='email' name='usuario' className='input' placeholder='Seu nome de usuário ou e-mail'
                        onChange={handleChange} ref={refTxtNomeUsuario} onKeyPress={handleKeyPress}
                    />
                    <span className='icon is-small is-right'>
                        <i className='fa fa-user'></i>
                    </span>
                </div>
            </div>

            <div className='field'>
                <label className='label'>Senha</label>
                <div className='control has-icons-right'>
                    <input type='password' name='senha' className='input' placeholder='Sua senha'
                        onChange={handleChange} ref={refTxtSenha} onKeyPress={handleKeyPress} />
                    <span className='icon is-small is-right'>
                        <i className='fa fa-key'></i>
                    </span>
                </div>
            </div>

            <div className='has-text-centered mt-5'>
                <input ref={refBtnEntrar} onClick={handleSubmit} type='button' className='button is-vcentered is-primary is-fullwidth' value='Entrar' />
            </div>

            <div className='has-text-centered mt-4'>
                <small>
                    <span>Ao entrar você automaticamente concorda com os <a className='cor-principal' target='_blank' href='/politica-e-termos-de-uso'>termos de uso</a></span>
                    <br />
                    <span>Não tem uma conta? <a className='cor-principal' href='/criar-conta'> Registre-se agora!</a></span>
                    <br />
                    <span>Esqueceu sua senha? <a className='cor-principal' href='/recuperar-senha'>Clique aqui!</a></span>
                </small>
            </div>
        </DivCentralizada>
    );
}