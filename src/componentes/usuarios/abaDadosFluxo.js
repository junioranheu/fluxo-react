import NProgress from 'nprogress';
import React, { useRef, useState } from 'react';
import VerificarDadosFluxo from '../../utilidades/utils/verificarDadosFluxo';
import VerificarEmailENomeUsuario from '../../utilidades/utils/verificarEmailENomeUsuario';

export default function AbaDadosFluxo(props) {
    const [prop] = useState(props['props']);
    // console.log(prop);
    const nomeApp = 'Fluxo';

    // Refs;
    const refNomeCompleto = useRef();
    const refEmail = useRef();
    const refNomeUsuario = useRef();
    const refSenha = useRef();

    // formDadosFluxo;
    const formDadosFluxoJsonInicial = {
        nomeCompleto: prop.nomeCompleto,
        email: prop.email,
        nomeUsuario: prop.nomeUsuarioSistema,
        senha: ''
    }
    const [formDadosFluxo, setFormDadosFluxo] = useState(formDadosFluxoJsonInicial);
    function handleChangeFormDadosFluxo(e) {
        setFormDadosFluxo({
            ...formDadosFluxo,
            [e.target.name]: e.target.value
        });
    }

    // Verificações da foto de perfil e import dinâmico;
    let fotoPerfilDinamica = '';
    try {
        fotoPerfilDinamica = require('../../upload/usuario/' + prop.foto);
    } catch (err) {
        fotoPerfilDinamica = require('../../static/outro/sem-imagem.webp');
    }

    async function handleSubmit() {
        NProgress.start();

        // Verificações;
        let isContinuarUm = VerificarDadosFluxo(formDadosFluxo, refNomeCompleto, refEmail, refNomeUsuario, refSenha);
        if (!isContinuarUm) {
            return false;
        }

        // Verificar se o processo deve continuar, caso e-mail e senha estejam disponíveis para uso;
        if (prop.email !== formDadosFluxo.email || prop.nomeUsuarioSistema !== formDadosFluxo.nomeUsuario) {
            const isNovoEmail = (prop.email !== formDadosFluxo.email);
            const isNovoNomeUsuario = (prop.nomeUsuarioSistema !== formDadosFluxo.nomeUsuario);
            let isContinuarDois = await VerificarEmailENomeUsuario(formDadosFluxo, refEmail, refNomeUsuario, refSenha, isNovoEmail, isNovoNomeUsuario);
            if (!isContinuarDois) {
                return false;
            }
        }

        console.log('ok');

        // // Criar conta;
        // const urlCriarConta = CONSTANTS.API_URL_POST_CRIAR;
        // const usuario_a_ser_criado = {
        //     'nomeCompleto': formData.nomeCompleto,
        //     'email': formData.email,
        //     'nomeUsuarioSistema': formData.nomeUsuario,
        //     'senha': formData.senha,
        //     'usuarioTipoId': 2, // Usuário comum;
        //     'dataCriacao': HorarioBrasilia.format('YYYY-MM-DD HH:mm:ss'),
        //     'foto': '',
        //     'isAtivo': 1,
        //     'isPremium': 0
        // };

        // let resposta = await Fetch.postApi(urlCriarConta, usuario_a_ser_criado);
        // if (resposta) {
        //     // console.log('Ok: ' + resposta);
        //     await getToken(formData.nomeUsuario, formData.senha);
        // } else {
        //     Aviso.error('Algo deu errado ao criar sua nova conta<br/>Consulte o F12!', 5000);
        // }
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
                        type='text' name='nomeUsuario' className='input' value={formDadosFluxo.nomeUsuario} placeholder={`Seu nome de usuário no ${nomeApp}`} />

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
                <input type='submit' className='button is-primary' value='Salvar alterações' onClick={() => handleSubmit()} />
            </div>
        </React.Fragment>
    );
}

