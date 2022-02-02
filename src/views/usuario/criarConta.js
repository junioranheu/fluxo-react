import NProgress from 'nprogress';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Aviso } from '../../componentes/outros/aviso';
import DivCentralizada from '../../componentes/outros/divCentralizada';
import '../../css/entrar.css';
import Logo from '../../static/outro/fluxo.webp';
import CONSTANTS from '../../utilidades/const/constUsuarios';
import { Auth, UsuarioContext } from '../../utilidades/context/usuarioContext';

export default function CriarConta() {
    const refNomeCompleto = useRef();
    const refEmail = useRef();
    const refNomeUsuario = useRef();
    const refSenha = useRef();

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
    const handleSubmit = (e) => {
        NProgress.start();
        e.preventDefault();

        if (!formData.nomeCompleto) {
            NProgress.done();
            Aviso.error('Você deve preencher seu nome completo!', 5000);
            refNomeCompleto.current.value = '';
            refNomeCompleto.current.select();
            return false;
        }

        if (!formData.email) {
            NProgress.done();
            Aviso.error('Você deve preencher seu e-mail!', 5000);
            refEmail.current.value = '';
            refEmail.current.select();
            return false;
        }

        if (!formData.nomeUsuario) {
            NProgress.done();
            Aviso.error('Você deve preencher seu nome de usuário!', 5000);
            refNomeUsuario.current.value = '';
            refNomeUsuario.current.select();
            return false;
        }

        if (!formData.senha) {
            NProgress.done();
            Aviso.error('Você deve preencher com uma senha', 5000);
            refSenha.current.value = '';
            refSenha.current.select();
            return false;
        }

        const url = `${CONSTANTS.API_URL_GET_VERIFICAR_EMAIL_E_SENHA}?nomeUsuarioSistema=${formData.usuario}&senha=${formData.senha}`;
        // console.log(url);

        // Verificar se o login e a senha estão corretos;
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(data => data.json())
            .then(data => {
                // Após ser verificado, se estiver ok, continue o processo de login e geração de token;
                // console.log(data);
                getToken(formData.usuario, formData.senha, data);
            })
            .catch((error) => {
                NProgress.done();
                console.log(error);
                refSenha.current.value = '';
                Aviso.error('Algo deu errado ao criar sua conta!', 5000);
            });
    };

    function getToken(nomeUsuario, senha, dadosUsuarioVerificado) {
        const url = `${CONSTANTS.API_URL_GET_AUTENTICAR}?nomeUsuarioSistema=${nomeUsuario}&senha=${senha}`;

        // Gerar token;
        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(data => data.json())
            .then(data => {
                // Inserir o token no json final para gravar localmente a sessão do login;
                dadosUsuarioVerificado.token = data;
                Auth.setUsuarioLogado(dadosUsuarioVerificado);

                // Atribuir autenticação ao contexto de usuário;
                setIsAuth(true);

                // Voltar à tela principal;
                navigate('/', { replace: true });
            })
            .catch((error) => {
                console.log(error);
                Aviso.error('Algo deu errado<br/>Provavelmente o usuário e/ou a senha estão errados!', 5000);
            });
    }

    return (
        <DivCentralizada isCentralizar={false}>
            <div className='has-text-centered mb-6'>
                <div>
                    <img className='login-logo' src={Logo} alt='Erro...' />
                </div>

                <h1 className='title'>Crie sua conta no <span className='grifar'>Fluxo</span></h1>
                <h1 className='subtitle'><span className='efeito-texto'>Feito com React</span></h1>
            </div>

            <div className='field mt-5'>
                <label className='label'>Nome completo</label>
                <div className='control has-icons-right'>
                    <input className='input' type='text' name='nomeCompleto' onChange={handleChange} ref={refNomeCompleto} />
                    <span className='icon is-small is-right'>
                        <i className='fas fa-signature'></i>
                    </span>
                </div>
            </div>

            <div className='field'>
                <label className='label'>E-mail</label>
                <div className='control has-icons-right'>
                    <input className='input' type='email' name='email' onChange={handleChange} ref={refEmail}/>
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
                    <input className='input' type='text' name='nomeUsuario' onChange={handleChange} ref={refNomeUsuario} />
                    <span className='icon is-small is-right'>
                        <i className='fa fa-user'></i>
                    </span>
                </div>
            </div>

            <div className='field'>
                <label className='label'>Senha</label>
                <div className='control has-icons-right'>
                    <input className='input' type='password' name='senha' onChange={handleChange} ref={refSenha} />
                    <span className='icon is-small is-right'>
                        <i className='fa fa-key'></i>
                    </span>
                </div>
            </div>

            <div className='has-text-centered mt-5'>
                <input onClick={handleSubmit} type='button' className='button is-vcentered is-primary is-fullwidth' value='Entrar' />
            </div>

            <div className='has-text-centered mt-4'>
                <small>
                    <span>Ao entrar você automaticamente concorda com os <a className='cor-principal' target='_blank' href='/politica-e-termos-de-uso'>termos de uso</a></span>
                    <br />
                    <a className='cor-principal' href='/entrar'>Já tem uma conta? Entre aqui!</a>
                </small>
            </div>
        </DivCentralizada>
    );
}