import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/entrar.css';
import CONSTANTS from '../../utilidades/constUsuarios';
import servicoAutenticacao from '../../utilidades/servicoAutenticacao';

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
                servicoAutenticacao.setUsuarioLogado(dadosUsuarioVerificado);

                // Voltar à tela principal;
                navigate('/', { replace: true });
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
                alert('Algo deu errado. Provavelmente o usuário e/ou a senha estão errados');
            });
    }

    return (
        <div className='container'>
            <div className='row min-vh-100'>
                <div className='col d-flex flex-column justify-content-center align-items-center'>
                    <div className='card login-form box'>
                        <div className='card-body'>
                            <h3 className='card-title text-center'>Entre no Fluxo (React)</h3>

                            <div className='card-text'>
                                <form>
                                    <div className='form-group'>
                                        <label>Nome de usuário ou e-mail</label>
                                        <input type='email' name='usuario' className='form-control form-control-sm' onChange={handleChange} />
                                    </div>

                                    <br />

                                    <div className='form-group'>
                                        <label>Senha</label>
                                        <input type='password' name='senha' className='form-control form-control-sm' onChange={handleChange} />
                                    </div>

                                    <button onClick={handleSubmit} type='submit' className='btn btn-primary btn-block w-100 mt-4'>Entrar</button>

                                    {/* <div className='sign-up'>
                                        Don't have an account? <a href='#'>Create One</a>
                                    </div> */}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}