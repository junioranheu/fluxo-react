import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/entrar.css';
import Logo from '../../static/outro/fluxo.webp';
import CONSTANTS from '../../utilidades/constUsuarios';
import Auth from '../../utilidades/servicoAutenticacao';

export default function Index() {
    const [formData, setFormData] = useState(null);
    const navigate = useNavigate();

    // Ao alterar os valores dos inputs, insira os valores nas variaveis do formData;
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Ao clicar no botão para entrar;
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData || !formData.usuario || !formData.senha) {
            alert('O nome de usuário e/ou e-mail estão vazios!');
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
            },
        })
            .then(data => data.json())
            .then(data => {
                // Após ser verificado, se estiver ok, continue o processo de login e geração de token;
                // console.log(data);
                getToken(formData.usuario, formData.senha, data);
            })
            .catch((error) => {
                console.log(error);
                alert('Algo deu errado. Provavelmente o usuário e/ou a senha estão errados');
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

                // Voltar à tela principal;
                navigate('/', { replace: true }); 
                window.location.reload(false);
            })
            .catch((error) => {
                console.log(error);
                alert('Algo deu errado. Provavelmente o usuário e/ou a senha estão errados');
            });
    }

    return (
        <React.Fragment>
            {/* Efeito */}
            <div class="hero-zika">
                <svg class="secao-diagonal" preserveAspectRatio="none" viewBox="0 0 1438 620" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 620V0h1438v240L0 620z" />
                </svg>
            </div>

            {/* Seção  */}
            <section class="hero is-medium sem-highlight">
                <div class="hero-body">
                    <div class="container">
                        <div class="columns is-centered">
                            <div class="column is-12-mobile is-10-tablet is-8-desktop is-6-widescreen">
                                <div class="box">
                                    <div class="has-text-centered animate__animated animate__@(efeito) mb-6">
                                        <div>
                                            <img class="login-logo" src={Logo} />
                                        </div>

                                        <h1 class="title">Entre no <span class="grifar">Fluxo</span></h1>
                                        <h1 class="subtitle"><span class="efeito-texto">Feito com React</span></h1>
                                    </div>

                                    <div class="field mt-5">
                                        <label class="label">Nome de usuário ou e-mail</label>
                                        <div class="control has-icons-right">
                                            <input type='email' name='usuario' className='input' onChange={handleChange} />
                                            <span class="icon is-small is-right">
                                                <i class="fa fa-user"></i>
                                            </span>
                                        </div>
                                    </div>

                                    <div class="field">
                                        <label class="label">Senha</label>
                                        <div class="control has-icons-right">
                                            <input type='password' name='senha' className='input' onChange={handleChange} />
                                            <span class="icon is-small is-right">
                                                <i class="fa fa-key"></i>
                                            </span>
                                        </div>
                                    </div>

                                    <div class="has-text-centered mt-5">
                                        <input onClick={handleSubmit} type="button" class="button is-vcentered is-primary is-fullwidth" value="Entrar" />
                                    </div>

                                    <div class="has-text-centered mt-4">
                                        <small>
                                            <span>Ao entrar você automaticamente concorda com os <a asp-controller="Home" asp-action="TermosUso" class="cor-principal" target="_blank">termos de uso</a></span>
                                            <br />
                                            <a asp-controller="Home" asp-action="CriarConta" class="cor-principal">Não tem uma conta? Registre-se agora!</a>
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}