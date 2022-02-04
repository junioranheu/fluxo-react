import NProgress from 'nprogress';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Aviso } from '../../componentes/outros/aviso';
import DivCentralizada from '../../componentes/outros/divCentralizada';
import '../../css/entrar.css';
import Logo from '../../static/outro/fluxo.webp';
import CONSTANTS from '../../utilidades/const/constUsuarios';
import { Auth, UsuarioContext } from '../../utilidades/context/usuarioContext';
import { Fetch } from '../../utilidades/fetch/fetch';

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

    function checarSenha(senha) {
        var number = /([0-9])/;
        var alphabets = /([a-zA-Z])/;
        // var special_characters = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;

        if (senha.length < 6) {
            Aviso.warn('Sua senha deve ter pelo menos 06 caracteres', 6000);
            refSenha.current.select();
            refSenha.current.value = '';
            formData.senha = '';
            return false;
        } else {
            if (senha.match(number) && senha.match(alphabets)) { // && senha.match(special_characters)
                // Aviso.success('Sua senha é bem forte!', 6000);
                return true;
            } else {
                Aviso.warn('Sua senha não é forte o suficiente<br/>Lembre-se de usar: letras e números!', 6000);
                refSenha.current.select();
                refSenha.current.value = '';
                formData.senha = '';
                return false;
            }
        }
    }

    function checarEmail(email) {
        //var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var regex = /^([a-zA-Z0-9_.\-+])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (!regex.test(email)) {
            return false;
        } else {
            return true;
        }
    }

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

    function verificarCampos() {
        // Verificação 0;
        if (!formData) {
            NProgress.done();
            Aviso.warn('Preencha os dados para criar sua conta', 5000);
            refNomeCompleto.current.select();
            return false;
        }

        // Verificação do nome #1: nome preenchido?;
        if (!formData.nomeCompleto) {
            NProgress.done();
            Aviso.warn('Parece que você esqueceu de colocar o seu nome', 5000);
            refNomeCompleto.current.select();
            return false;
        }

        // Verificação do nome #2: pelo menos 03 caracteres?;
        if (formData.nomeCompleto.length < 3) {
            NProgress.done();
            Aviso.warn('Seu nome não pode ter menos de 03 caracteres!', 5000);
            refNomeCompleto.current.select();
            return false;
        }

        // Verificação do nome #3: se existe pelo menos um espaço (dois nomes), false = não;
        var reg = new RegExp("(\\w+)(\\s+)(\\w+)");
        if (reg.test(formData.nomeCompleto) === false) {
            NProgress.done();
            Aviso.warn(formData.nomeCompleto + ' é um belo nome, mas cadê seu sobrenome?', 5000);
            refNomeCompleto.current.select();
            return false;
        }

        // Verificação de e-mail #1: e-mail preenchido?;
        if (!formData.email) {
            NProgress.done();
            Aviso.warn('Parece que você esqueceu de colocar o seu e-mail', 5000);
            refEmail.current.select();
            return false;
        }

        // Verificação de e-mail #2: e-mail válido?;
        if (checarEmail(formData.email) === false) {
            NProgress.done();
            Aviso.warn('Parece que esse e-mail não é válido...', 5000);
            refEmail.current.select();
            return false;
        }

        // Verificação de nome de usuário #1: nome de usuário preenchido?;
        if (!formData.nomeUsuario) {
            NProgress.done();
            Aviso.warn('Parece que você esqueceu de colocar um nome de usuário (apelido que será utilizado no sistema)', 5000);
            refNomeUsuario.current.select();
            return false;
        }

        // Verificação de nome de usuário #2: pelo menos 03 caracteres?;
        if (formData.nomeUsuario.length > 20 || formData.nomeUsuario.length < 4) {
            NProgress.done();
            Aviso.warn('O nome de usuário não pode ter não pode ter menos de 4 e nem mais de 10 caracteres, e agora está com ' + formData.nomeUsuario.length + '!', 5000);
            refNomeUsuario.current.select();
            return false;
        }

        // Verificação de senha #1: senha preenchida?;
        if (!formData.senha) {
            NProgress.done();
            Aviso.warn('Parece que você esqueceu de colocar sua senha', 5000);
            refSenha.current.select();
            return false;
        }

        // Verificação da senha #2: realizar uma série de verificações, se alguma retornar falso, aborte;
        if (checarSenha(formData.senha) === false) {
            return false;
        }

        return true;
    }

    async function verificarEmailENomeUsuario(email, nomeUsuario) {
        const urlIsExisteEmail = `${CONSTANTS.API_URL_GET_IS_EXISTE_EMAIL}?email=${email}`;
        const urlIsExisteNomeUsuario = `${CONSTANTS.API_URL_GET_IS_EXISTE_NOME_USUARIO}?nomeUsuarioSistema=${nomeUsuario}`;
        let isContinuar = true;

        // Verificar e-mail;
        let isJaExiste = await Fetch.getApi(urlIsExisteEmail);

        if (isJaExiste) {
            NProgress.done();
            Aviso.warn('Existe outro usuário que já está usando este e-mail!', 5000);
            refEmail.current.select();
            refSenha.current.value = '';
            formData.senha = '';

            isContinuar = false;
        }

        // Verificar nome de usuário;
        if (isContinuar) {
            isJaExiste = await Fetch.getApi(urlIsExisteNomeUsuario);

            if (isJaExiste) {
                NProgress.done();
                Aviso.warn('Existe outro usuário que já está usando este nome de usuário!', 5000);
                refNomeUsuario.current.select();
                refSenha.current.value = '';
                formData.senha = '';

                isContinuar = false;
            }
        }

        return isContinuar;
    }

    // Ao clicar no botão para entrar;
    async function handleSubmit(e) {
        NProgress.start();
        e.preventDefault();

        // Verificações;
        let isContinuarUm = verificarCampos();
        if (!isContinuarUm) {
            return false;
        }

        // Atribuir o nome formatado para a variavel nome, novamente;
        formData.nomeCompleto = padronizarNomeCompletoUsuario(formData.nomeCompleto);

        // Verificar se o processo deve continuar, caso e-mail e senha estejam disponíveis para uso;
        let isContinuarDois = await verificarEmailENomeUsuario(formData.email, formData.nomeUsuario);
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
            'dataCriacao': new Date().toLocaleString(),
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
                    <input className='input' type='text' name='nomeCompleto' onChange={handleChange} ref={refNomeCompleto} />
                    <span className='icon is-small is-right'>
                        <i className='fas fa-signature'></i>
                    </span>
                </div>
            </div>

            <div className='field'>
                <label className='label'>E-mail</label>
                <div className='control has-icons-right'>
                    <input className='input' type='email' name='email' onChange={handleChange} ref={refEmail} />
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
                    <input className='input' type='password' name='senha' onChange={handleChange} onKeyPress={handleKeyPress} ref={refSenha} />
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