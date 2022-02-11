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
import HorarioBrasilia from '../../utilidades/utils/horarioBrasilia';
import VerificarDadosFluxo from '../../utilidades/utils/verificarDadosFluxo';
import verificarEmailENomeUsuario from '../../utilidades/utils/verificarEmailENomeUsuario';

export default function CriarConta() {
    const refNomeCompleto = useRef();
    const refEmail = useRef();
    const refNomeUsuario = useRef();
    const refSenha = useRef();
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

    function padronizarNomeCompletoUsuario(nome) {
        // Trim o nome, já que o usuário pode colocar espaços a mais;
        nome = nome.replace(/\s+/g, ' ').trim();

        // Colocar letra maiúscula apenas nas primeiras letras, no nome;
        nome = nome.toLowerCase().replace(/\b[a-z]/g, function (letter) {
            return letter.toUpperCase();
        });

        // Colocar todas as palavras do nome em um array;
        var palavrasNome = nome.split(' ');

        // Todas palavras que tiverem < 4 caracteres, faça toLowerCase();
        // Por causa dos nomes "do, dos, da, das" e etc;
        var nomeFormatado = '';
        for (var i = 0; i < palavrasNome.length; i++) {
            if (i === 0) {
                if (palavrasNome[i].length < 4 && i > 0) {
                    nomeFormatado = palavrasNome[i].toLowerCase();
                } else {
                    nomeFormatado = palavrasNome[i];
                }
            } else {
                if (palavrasNome[i].length < 4 && i > 0) {
                    nomeFormatado = nomeFormatado + ' ' + palavrasNome[i].toLowerCase();
                } else {
                    nomeFormatado = nomeFormatado + ' ' + palavrasNome[i];
                }
            }
        }

        nome = nomeFormatado;
        return nome;
    }

    // Ao clicar no botão para entrar;
    async function handleSubmit(e) {
        NProgress.start();
        e.preventDefault();

        // Verificações;
        let isContinuarUm = VerificarDadosFluxo(formData, refNomeCompleto, refEmail, refNomeUsuario, refSenha);
        if (!isContinuarUm) {
            return false;
        }

        // Atribuir o nome formatado para a variavel nome, novamente;
        formData.nomeCompleto = padronizarNomeCompletoUsuario(formData.nomeCompleto);

        // Verificar se o processo deve continuar, caso e-mail e senha estejam disponíveis para uso;
        const isNovoEmail = true;
        const isNovoNomeUsuario = true;
        let isContinuarDois = await verificarEmailENomeUsuario(formData, refEmail, refNomeUsuario, refSenha, isNovoEmail, isNovoNomeUsuario);
        if (!isContinuarDois) {
            return false;
        }

        // Criar conta;
        const urlCriarConta = CONSTANTS.API_URL_POST_CRIAR;
        const usuario_a_ser_criado = {
            'nomeCompleto': formData.nomeCompleto,
            'email': formData.email,
            'nomeUsuarioSistema': formData.nomeUsuario,
            'senha': formData.senha,
            'usuarioTipoId': 2, // Usuário comum;
            'dataCriacao': HorarioBrasilia.format('YYYY-MM-DD HH:mm:ss'),
            'foto': '',
            'isAtivo': 1,
            'isPremium': 0
        };

        let resposta = await Fetch.postApi(urlCriarConta, usuario_a_ser_criado);
        if (resposta) {
            // console.log('Ok: ' + resposta);
            await getToken(formData.nomeUsuario, formData.senha);
        } else {
            Aviso.error('Algo deu errado ao criar sua nova conta<br/>Consulte o F12!', 5000);
        }
    };

    async function getToken(nomeUsuario, senha) {
        const urlDados = `${CONSTANTS.API_URL_GET_VERIFICAR_EMAIL_E_SENHA}?nomeUsuarioSistema=${nomeUsuario}&senha=${senha}`;
        let dadosUsuarioVerificado = await Fetch.getApi(urlDados);

        // Gerar token;
        const urlAutenticar = `${CONSTANTS.API_URL_GET_AUTENTICAR}?nomeUsuarioSistema=${nomeUsuario}&senha=${senha}`;
        let resposta = await Fetch.getApi(urlAutenticar);

        if (resposta) {
            // Inserir o token no json final para gravar localmente a sessão do login;
            dadosUsuarioVerificado.token = resposta;
            Auth.setUsuarioLogado(dadosUsuarioVerificado);

            // Voltar à tela principal;
            navigate('/', { replace: true });

            // Atribuir autenticação ao contexto de usuário;
            setIsAuth(true);
        } else {
            Aviso.error('Algo deu errado ao se autenticar!', 5000);
        }
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

                <h1 className='title'>Crie sua conta no <span className='grifar'>Fluxo</span></h1>
                <h1 className='subtitle'><span className='efeito-texto'>Feito com React</span></h1>
            </div>

            <div className='field mt-5'>
                <label className='label'>Nome completo</label>
                <div className='control has-icons-right'>
                    <input className='input' type='text' name='nomeCompleto' placeholder='Seu nome completo' autoComplete='weon'
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
                    <input className='input' type='email' name='email' placeholder='Seu melhor e-mail' autoComplete='weon'
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
                    <input className='input' type='text' name='nomeUsuario' placeholder='Seu nome de usuário no Fluxo' autoComplete='weon'
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
                    <input className='input' type='password' name='senha' placeholder='Sua senha' autoComplete='weon'
                        onChange={handleChange} onKeyPress={handleKeyPress} ref={refSenha}
                    />
                    <span className='icon is-small is-right'>
                        <i className='fa fa-key'></i>
                    </span>
                </div>
            </div>

            <div className='has-text-centered mt-5'>
                <input ref={refBtnCriar} onClick={handleSubmit} type='button' className='button is-vcentered is-primary is-fullwidth' value='Entrar' />
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