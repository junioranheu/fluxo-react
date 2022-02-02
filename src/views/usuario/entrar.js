import NProgress from 'nprogress';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Aviso } from '../../componentes/outros/aviso';
import DivCentralizada from '../../componentes/outros/divCentralizada';
import '../../css/entrar.css';
import Logo from '../../static/outro/fluxo.webp';
import CONSTANTS from '../../utilidades/const/constUsuarios';
import { Auth, UsuarioContext } from '../../utilidades/context/usuarioContext';

export default function Index() {
    const refTxtNomeUsuario = useRef();
    const refTxtSenha = useRef();

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
    const handleSubmit = (e) => {
        NProgress.start();
        e.preventDefault();

        if (!formData || !formData.usuario || !formData.senha) {
            NProgress.done();
            Aviso.error('O nome de usuário e/ou e-mail estão vazios!', 5000);
            refTxtSenha.current.value = '';
            refTxtNomeUsuario.current.select();
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
                refTxtSenha.current.value = '';
                refTxtNomeUsuario.current.select();
                Aviso.error('Algo deu errado<br/>Provavelmente o usuário e/ou a senha estão errados!', 5000);
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
        <DivCentralizada isCentralizar={true}>
            <div className='has-text-centered mb-6'>
                <div>
                    <img className='login-logo' src={Logo} alt='Erro...' />
                </div>

                <h1 className='title'>Entre no <span className='grifar'>Fluxo</span></h1>
                <h1 className='subtitle'><span className='efeito-texto'>Feito com React</span></h1>
            </div>

            <div className='field mt-5'>
                <label className='label'>Nome de usuário ou e-mail</label>
                <div className='control has-icons-right'>
                    <input type='email' name='usuario' className='input' onChange={handleChange} ref={refTxtNomeUsuario} />
                    <span className='icon is-small is-right'>
                        <i className='fa fa-user'></i>
                    </span>
                </div>
            </div>

            <div className='field'>
                <label className='label'>Senha</label>
                <div className='control has-icons-right'>
                    <input type='password' name='senha' className='input' onChange={handleChange} ref={refTxtSenha} />
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
                    <a className='cor-principal' href='/criar-conta'>Não tem uma conta? Registre-se agora!</a>
                </small>
            </div>
        </DivCentralizada>
    );
}