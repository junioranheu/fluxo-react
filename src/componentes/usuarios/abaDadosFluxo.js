import NProgress from 'nprogress';
import React, { useContext, useRef, useState } from 'react';
import { Aviso } from '../../componentes/outros/aviso';
import SemImagem from '../../static/outro/sem-imagem.webp';
import CONSTANTS from '../../utilidades/const/constUsuarios';
import { Auth, UsuarioContext } from '../../utilidades/context/usuarioContext';
import { Fetch } from '../../utilidades/utils/fetch';
import padronizarNomeCompletoUsuario from '../../utilidades/utils/padronizarNomeCompletoUsuario';
import UrlImagemApi from '../../utilidades/utils/urlImagemApi';
import VerificarDadosFluxo from '../../utilidades/utils/verificarDadosFluxo';
import VerificarEmailENomeUsuario from '../../utilidades/utils/verificarEmailENomeUsuario';
import BotaoUparImagem from '../outros/botaoUparImagem';

export default function AbaDadosFluxo(props) {
    const nomeApp = 'Fluxo';
    const [prop] = useState(props['props']);
    // console.log(prop);

    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const [usuarioId] = useState(isAuth ? Auth.getUsuarioLogado().usuarioId : null);

    // Refs;
    const refNomeCompleto = useRef();
    const refEmail = useRef();
    const refNomeUsuario = useRef();
    const refSenha = useRef();

    // formDadosFluxo;
    const formDadosFluxoJsonInicial = {
        usuarioId: prop.usuarioId,
        nomeCompleto: prop.nomeCompleto,
        email: prop.email,
        nomeUsuarioSistema: prop.nomeUsuarioSistema,
        senha: '',
        // Padrão;
        dataCriacao: prop.dataCriacao,
        dataOnline: prop.dataOnline,
        foto: prop.foto,
        isAtivo: prop.isAtivo,
        isPremium: prop.isPremium,
        usuarioTipoId: prop.usuarioTipoId
    }
    const [formDadosFluxo, setFormDadosFluxo] = useState(formDadosFluxoJsonInicial);
    function handleChangeFormDadosFluxo(e) {
        setFormDadosFluxo({
            ...formDadosFluxo,
            [e.target.name]: e.target.value
        });
    }

    // Verificações da foto de perfil e import dinâmico;
    const [fotoPerfilDinamica, setFotoPerfilDinamica] = useState(prop.foto ? `${UrlImagemApi}/usuario/${prop.foto}` : SemImagem);

    function exibirFotoPerfilAlterada(arq, caminhoImagem) {
        // console.log(arq);
        setFotoPerfilDinamica(URL.createObjectURL(arq));

        // Atualizar os dados que estão em usuarioContext.js/Auth;
        // Atualizar a foto de perfil;
        const dadosUsuario = {
            usuarioId: Auth.getUsuarioLogado().usuarioId,
            nomeCompleto: Auth.getUsuarioLogado().nome,
            nomeUsuarioSistema: Auth.getUsuarioLogado().nomeUsuarioSistema,
            usuarioTipoId: Auth.getUsuarioLogado().usuarioTipoId,
            foto: caminhoImagem, // Alterar;
            usuariosInformacoes: {
                cidadeId: Auth.getUsuarioLogado().cidadeId,
                cidades: {
                    nome: Auth.getUsuarioLogado().cidadeNome
                }
            },
            token: Auth.getUsuarioLogado().token
        };

        Auth.setUsuarioLogado(dadosUsuario);
    }

    async function handleSubmitDadosFluxo() {
        NProgress.start();

        // Verificações;
        const isTrocouSenha = prop.senha !== formDadosFluxo.senha;
        let isContinuarUm = VerificarDadosFluxo(formDadosFluxo, refNomeCompleto, refEmail, refNomeUsuario, refSenha, isTrocouSenha);
        if (!isContinuarUm) {
            return false;
        }

        // Verificar se o processo deve continuar, caso e-mail e senha estejam disponíveis para uso;
        if (prop.email !== formDadosFluxo.email || prop.nomeUsuarioSistema !== formDadosFluxo.nomeUsuarioSistema) {
            const isNovoEmail = (prop.email !== formDadosFluxo.email);
            const isNovoNomeUsuario = (prop.nomeUsuarioSistema !== formDadosFluxo.nomeUsuarioSistema);
            let isContinuarDois = await VerificarEmailENomeUsuario(formDadosFluxo, refEmail, refNomeUsuario, refSenha, isNovoEmail, isNovoNomeUsuario);
            if (!isContinuarDois) {
                return false;
            }
        }

        // Atribuir o nome formatado para a variavel nome, novamente;
        formDadosFluxo.nomeCompleto = padronizarNomeCompletoUsuario(formDadosFluxo.nomeCompleto);

        // Criptografar a senha;
        if (formDadosFluxo.senha) {
            const urlCriptografar = `${CONSTANTS.API_URL_GET_CRIPTOGRAFAR}?senha=${formDadosFluxo.senha}`;
            // console.log(urlCriptografar);
            const senhaCriptografada = await Fetch.getApi(urlCriptografar);
            if (!senhaCriptografada) {
                Aviso.error('Algo deu errado ao criptografar sua senha!', 5000);
                return false;
            }

            // Atribuir a senha criptografada;
            formDadosFluxo.senha = senhaCriptografada;
        }

        // Atualizar informações;
        const url = CONSTANTS.API_URL_POST_ATUALIZAR;
        const token = Auth.getUsuarioLogado().token;
        let resposta = await Fetch.postApi(url, formDadosFluxo, token);
        if (resposta) {
            Aviso.success('Informações atualizadas com sucesso', 5000);
            NProgress.done();

            // Atualizar os dados que estão em usuarioContext.js/Auth;
            // Atualizar o nomeCompleto e nomeUsuarioSistema;
            const dadosUsuario = {
                usuarioId: Auth.getUsuarioLogado().usuarioId,
                nomeCompleto: formDadosFluxo.nomeCompleto, // Alterar;
                nomeUsuarioSistema: formDadosFluxo.nomeUsuarioSistema, // Alterar;
                usuarioTipoId: Auth.getUsuarioLogado().usuarioTipoId,
                foto: Auth.getUsuarioLogado().foto,
                usuariosInformacoes: {
                    cidadeId: Auth.getUsuarioLogado().cidadeId,
                    cidades: {
                        nome: Auth.getUsuarioLogado().cidadeNome
                    }
                },
                token: Auth.getUsuarioLogado().token
            };

            Auth.setUsuarioLogado(dadosUsuario);
        } else {
            Aviso.error('Algo deu errado ao atualizar suas informações<br/>Consulte o F12!', 5000);
        }
    }

    if (!prop) {
        return null;
    }

    return (
        <React.Fragment>
            <div className='field has-image-centered texto-sem-highlight' id='div-imagem-perfil'>
                <label className='label'>Foto de perfil</label>

                <div className='profile-pic has-image-centered' style={{ backgroundImage: `url(${fotoPerfilDinamica})` }}>
                    <span className='fas fa-camera'></span>
                    <span className='ml-2'>Alterar</span>
                </div>

                <input type='file' accept='image/*' />

                {
                    usuarioId && (
                        <BotaoUparImagem props={usuarioId} onAlterar={exibirFotoPerfilAlterada} />
                    )
                }
            </div>

            <div className='field'>
                <label className='label'>Nome completo</label>
                <div className='control has-icons-right'>
                    <input onChange={(e) => handleChangeFormDadosFluxo(e)} ref={refNomeCompleto}
                        type='text' name='nomeCompleto' className='input' value={formDadosFluxo.nomeCompleto} placeholder='Seu nome completo' />
                    <span className='icon is-small is-right'>
                        <i className='fas fa-signature'></i>
                    </span>
                </div>
            </div>

            <div className='field'>
                <label className='label'>E-mail</label>
                <div className='control has-icons-right'>
                    <input onChange={(e) => handleChangeFormDadosFluxo(e)} ref={refEmail}
                        type='email' name='email' className='input' value={formDadosFluxo.email} placeholder='Seu melhor e-mail' />

                    <span className='icon is-small is-right'>
                        <i className='fas fa-at'></i>
                    </span>
                </div>
            </div>

            <div className='field'>
                <label className='label'>Nome de usuário</label>
                <div className='control has-icons-right'>
                    <input onChange={(e) => handleChangeFormDadosFluxo(e)} ref={refNomeUsuario}
                        type='text' name='nomeUsuarioSistema' className='input' value={formDadosFluxo.nomeUsuarioSistema} placeholder={`Seu nome de usuário no ${nomeApp}`} />

                    <span className='icon is-small is-right'>
                        <i className='fas fa-user'></i>
                    </span>
                </div>
            </div>

            <div className='field'>
                <label className='label'>Senha</label>
                <div className='control has-icons-right'>
                    <input onChange={(e) => handleChangeFormDadosFluxo(e)} ref={refSenha}
                        type='password' name='senha' className='input' value={formDadosFluxo.senha} placeholder='Sua senha' autoComplete='weon' />

                    <span className='icon is-small is-right'>
                        <i className='fa fa-key'></i>
                    </span>
                </div>
            </div>

            <hr className='mt-4' />
            <div className='has-text-centered mt-4'>
                <input type='submit' className='button is-primary' value='Salvar alterações' onClick={() => handleSubmitDadosFluxo()} />
            </div>
        </React.Fragment>
    );
}

