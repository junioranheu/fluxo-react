import React, { useState } from 'react';

export default function AbaDadosFluxo(props) {
    const [prop] = useState(props['props']);
    // console.log(prop);
    const nomeApp = 'Fluxo';

    // formDadosFluxo;
    const formDadosFluxoJsonInicial = {
        nomeCompleto: prop.nomeCompleto,
        email: prop.email,
        nomeUsuarioSistema: prop.nomeUsuarioSistema,
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
                    <input onChange={(e) => handleChangeFormDadosFluxo(e)}
                        type='text' name='nomeCompleto' className='input' value={formDadosFluxo.nomeCompleto} placeholder='Seu nome completo'
                    />
                    <span className='icon is-small is-right'>
                        <i className='fas fa-signature'></i>
                    </span>
                </div>
            </div>

            <div className='field'>
                <label className='label'>E-mail</label>
                <div className='control has-icons-right'>
                    <input onChange={(e) => handleChangeFormDadosFluxo(e)}
                        type='email' name='email' className='input' value={formDadosFluxo.email} placeholder='Seu melhor e-mail'
                    />
                    <span className='icon is-small is-right'>
                        <i className='fas fa-at'></i>
                    </span>
                </div>
            </div>

            <div className='field'>
                <label className='label'>Nome de usuário</label>
                <div className='control has-icons-right'>
                    <input onChange={(e) => handleChangeFormDadosFluxo(e)}
                        type='text' name='nomeUsuarioSistema' className='input' value={formDadosFluxo.nomeUsuarioSistema} placeholder={`Seu nome de usuário no ${nomeApp}`}
                    />
                    <span className='icon is-small is-right'>
                        <i className='fas fa-user'></i>
                    </span>
                </div>
            </div>

            <div className='field'>
                <label className='label'>Senha</label>
                <div className='control has-icons-right'>
                    <input onChange={(e) => handleChangeFormDadosFluxo(e)}
                        type='password' name='senha' className='input' value='' placeholder='Sua senha' autoComplete='weon'
                    />
                    <span className='icon is-small is-right'>
                        <i className='fa fa-key'></i>
                    </span>
                </div>
            </div>
        </React.Fragment>
    );
}

