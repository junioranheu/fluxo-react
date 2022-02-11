import NProgress from 'nprogress';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Aviso } from '../../componentes/outros/aviso';
import HeroZika from '../../componentes/outros/heroZika';
import '../../css/perfilAtualizar.css';
import CONSTANTS_USUARIOS from '../../utilidades/const/constUsuarios';
import { Auth, UsuarioContext } from '../../utilidades/context/usuarioContext';
import { Fetch } from '../../utilidades/utils/fetch';

export default function Atualizar() {
    const navigate = useNavigate();
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const [usuarioId] = useState(isAuth ? Auth.getUsuarioLogado().usuarioId : null);
    const [nomeUsuarioSistema] = useState(isAuth ? Auth.getUsuarioLogado().nomeUsuarioSistema : null);
    const nomeApp = 'Fluxo';

    const [detalhesPerfil, setDetalhesPerfil] = useState([]);
    useEffect(() => {
        async function getDetalhesPerfilUsuario() {
            NProgress.start();

            // Pegar o parâmetro da URL;
            const url = `${CONSTANTS_USUARIOS.API_URL_GET_POR_ID}/${usuarioId}`;
            // console.log(url);

            let resposta = await Fetch.getApi(url);
            // console.log(resposta);
            if (resposta) {
                setDetalhesPerfil(resposta);
                NProgress.done();
            } else {
                Aviso.error(`Algo deu errado ao consultar suas informações!`, 5000);
                navigate('/sem-acesso', { replace: true });
            }
        }

        // Pegar os detalhes do usuário em questão;
        getDetalhesPerfilUsuario();
    }, [navigate, usuarioId]);

    const [faltaCompletarPerfil, setFaltaCompletarPerfil] = useState(false);
    const [isHomem, setIsHomem] = useState('');
    const [isMulher, setIsMulher] = useState('');
    useEffect(() => {
        // console.log(detalhesPerfil);
        // console.log(detalhesPerfil.usuariosInformacoes);

        if (!detalhesPerfil.usuariosInformacoes) {
            setFaltaCompletarPerfil(true);
        }

        if (detalhesPerfil.usuariosInformacoes) {
            setFaltaCompletarPerfil(false);

            if (detalhesPerfil.usuariosInformacoes.genero === 1) {
                setIsHomem('checked');
            } else if (detalhesPerfil.usuariosInformacoes.genero === 2) {
                setIsMulher('checked');
            }
        }
    }, [detalhesPerfil]);

    const [isAbaDadosFluxoSelecionada, setIsAbaDadosFluxoSelecionada] = useState(true);
    const [isAbaDadosPessoaisSelecionada, setIsAbaDadosPessoaisSelecionada] = useState(false);
    function handleClickAbaFluxo() {
        setIsAbaDadosFluxoSelecionada(true);
        setIsAbaDadosPessoaisSelecionada(false);
    }

    function handleClickAbaPessoal() {
        setIsAbaDadosPessoaisSelecionada(true);
        setIsAbaDadosFluxoSelecionada(false);
    }

    // Verificações da foto de perfil e import dinâmico;
    let fotoPerfilDinamica = '';
    try {
        // console.log(detalhesPerfil);
        fotoPerfilDinamica = require('../../upload/usuario/' + detalhesPerfil.foto);
    } catch (err) {
        fotoPerfilDinamica = require('../../static/outro/sem-imagem.webp');
    }

    if (detalhesPerfil.length < 1) {
        return null;
    }

    return (
        <React.Fragment>
            <HeroZika />

            <section className='hero is-medium sem-highlight'>
                <div className='hero-body'>
                    <div className='container'>
                        <div className='columns is-centered'>
                            <div className='column is-12-mobile is-10-tablet is-8-desktop is-7-widescreen'>
                                <div className='box'>
                                    <div className='has-text-centered'>
                                        <h1 className='title'>Seus dados no <span className='grifar'>{nomeApp}</span></h1>
                                    </div>

                                    <hr />

                                    {
                                        faltaCompletarPerfil && (
                                            <div className='notification mt-4'>
                                                <p>Ei, {nomeUsuarioSistema}, <span className='grifar'>parado aí</span> ✋</p>
                                                <p>Preencha seus dados antes de sair por aí usando o sistema 😎</p>
                                                <p>Juramos que manteremos sua privacidade 🤠</p>
                                            </div>
                                        )
                                    }

                                    {/* <!-- #0 - Tabs --> */}
                                    <div className='tabs is-boxed mt-4'>
                                        <ul>
                                            <li onClick={() => handleClickAbaFluxo()} className={isAbaDadosFluxoSelecionada ? 'is-active' : ''}>
                                                <a className='cor-preto'>
                                                    <span className='icon is-small'><i className='fas fa-mobile-alt' aria-hidden='true'></i></span>
                                                    <span>Dados do {nomeApp}</span>
                                                </a>
                                            </li>

                                            <li onClick={() => handleClickAbaPessoal()} className={isAbaDadosPessoaisSelecionada ? 'is-active' : ''}>
                                                <a className='cor-preto'>
                                                    <span className='icon is-small'><i className='fas fa-user-lock' aria-hidden='true'></i></span>
                                                    <span>Dados pessoais</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* <!-- #1 - Dados app --> */}
                                    <div className={isAbaDadosFluxoSelecionada ? '' : 'esconder'}>
                                        <div className='field has-image-centered texto-sem-highlight' id='div-imagem-perfil'>
                                            <label className='label'>Foto de perfil</label>

                                            {/* style='background-image: url(@usuarioFotoPerfil);' */}
                                            <div className='profile-pic has-image-centered' id='div-imagem-upload' style={{ backgroundImage: `url(${fotoPerfilDinamica})` }}>
                                                <span className='fas fa-camera'></span>
                                                <span className='ml-2'>Alterar</span>
                                            </div>

                                            <input type='file' id='inputFileUpload' accept='image/*' />
                                        </div>

                                        <div className='field'>
                                            <label className='label'>Nome completo</label>
                                            <div className='control has-icons-right'>
                                                <input type='text' id='txtNome' className='input' value={detalhesPerfil.nomeCompleto} placeholder='Seu nome completo' />
                                                <span className='icon is-small is-right'>
                                                    <i className='fas fa-signature'></i>
                                                </span>
                                            </div>
                                        </div>

                                        <div className='field'>
                                            <label className='label'>E-mail</label>
                                            <div className='control has-icons-right'>
                                                <input type='email' id='txtEmail' className='input' value={detalhesPerfil.email} placeholder='Seu melhor e-mail' />
                                                <span className='icon is-small is-right'>
                                                    <i className='fas fa-at'></i>
                                                </span>
                                            </div>
                                        </div>

                                        <div className='field'>
                                            <label className='label'>Nome de usuário</label>
                                            <div className='control has-icons-right'>
                                                <input type='text' id='txtNomeUsuario' className='input' value={detalhesPerfil.nomeUsuarioSistema} placeholder={`Seu nome de usuário no ${nomeApp}`} />
                                                <span className='icon is-small is-right'>
                                                    <i className='fas fa-user'></i>
                                                </span>
                                            </div>
                                        </div>

                                        <div className='field'>
                                            <label className='label'>Senha</label>
                                            <div className='control has-icons-right'>
                                                <input type='password' id='txtSenha' className='input' value='' placeholder='Sua senha' autoComplete='weon' />
                                                <span className='icon is-small is-right'>
                                                    <i className='fa fa-key'></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <!-- #2 - Dados pessoais --> */}
                                    <div className={isAbaDadosPessoaisSelecionada ? '' : 'esconder'}>
                                        <div className='columns'>
                                            <div className='column'>
                                                <div className='field'>
                                                    <label className='label'>CPF</label>
                                                    <div className='control has-icons-right'>
                                                        <input type='text' id='txtCPF' className='input' value={detalhesPerfil.usuariosInformacoes.cpf} placeholder='Seu CPF' />
                                                        <span className='icon is-small is-right'>
                                                            <i className='fas fa-id-card'></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='column'>
                                                <div className='field'>
                                                    <label className='label'>Telefone</label>
                                                    <div className='control has-icons-right'>
                                                        <input type='text' id='txtTelefone' className='input' value={detalhesPerfil.usuariosInformacoes.telefone} placeholder='Seu número de telefone' />
                                                        <span className='icon is-small is-right'>
                                                            <i className='fas fa-mobile-alt'></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='columns'>
                                            <div className='column'>
                                                <div className='field'>
                                                    <label className='label'>Data de aniversário</label>
                                                    <div className='control has-icons-right'>
                                                        <input type='text' id='txtDataAniversario' className='input' value={detalhesPerfil.usuariosInformacoes.dataAniversario} placeholder='Sua data de aniversário' />
                                                        <span className='icon is-small is-right'>
                                                            <i className='fas fa-birthday-cake'></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='column'>
                                                <div className='field'>

                                                    <label className='label'>Gênero</label>

                                                    <div className='control'>
                                                        <label className='radio'>
                                                            <input type='radio' value='1' name='rbGenero' checked={isHomem} />
                                                            <span className='ml-2'>Masculino</span>
                                                        </label>

                                                        <label className='radio'>
                                                            <input type='radio' value='2' name='rbGenero' checked={isMulher} />
                                                            <span className='ml-2'>Feminino</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='columns'>
                                            <div className='column'>
                                                <div className='field'>
                                                    <label className='label'>CEP</label>
                                                    <div className='control has-icons-right'>
                                                        <input type='text' id='txtCEP' className='input' value={detalhesPerfil.usuariosInformacoes.cep} placeholder='Seu CEP atual' />
                                                        <span className='icon is-small is-right'>
                                                            <i className='fas fa-globe-americas'></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='column'>
                                                <div className='field'>
                                                    <label className='label'>Número da residência</label>
                                                    <div className='control has-icons-right'>
                                                        <input type='text' id='txtNumeroResidencia' className='input' value={detalhesPerfil.usuariosInformacoes.numeroResidencia} placeholder='O número da sua residência' />
                                                        <span className='icon is-small is-right'>
                                                            <i className='fas fa-home'></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='columns'>
                                            <div className='column'>
                                                <div className='field'>
                                                    <label className='label'>Rua</label>
                                                    <div className='control has-icons-right'>
                                                        <input type='text' id='txtRua' className='input' value={detalhesPerfil.usuariosInformacoes.rua} placeholder='A rua em que você vive' disabled />
                                                        <span className='icon is-small is-right'>
                                                            <i className='fas fa-road'></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='column'>
                                                <div className='field'>
                                                    <label className='label'>Bairro</label>
                                                    <div className='control has-icons-right'>
                                                        <input type='text' id='txtBairro' className='input' value={detalhesPerfil.usuariosInformacoes.bairro} placeholder='O bairro em que você vive' disabled />
                                                        <span className='icon is-small is-right'>
                                                            <i className='fas fa-map-marker-alt'></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='columns'>
                                            <div className='column'>
                                                <div className='field'>
                                                    <label className='label'>Estado</label>
                                                    <div className='control has-icons-right'>
                                                        <input type='text' id='txtEstado' className='input' value={detalhesPerfil.usuariosInformacoes.cidades.estados.sigla} placeholder='O estado em que você vive' disabled />
                                                        <span className='icon is-small is-right'>
                                                            <i className='fas fa-map-marked-alt'></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='column'>
                                                {/* @*                @{
                                                var estadosBd = (List<Estado>)ViewData['EstadosBd'];
                                                    <div className='field'>
                                                        <label className='label'><i className='fas fa-home'></i> Estado</label>
                                                        <div className='control'>
                                                            <div className='select is-fullwidth'>
                                                                <select id='selectEstado' disabled>
                                                                    <option>Qual estado você vive?</option>
                                                                    @{
                                                                        foreach(var e in estadosBd)
                                                                    {
                                                                        <option value='@e.EstadoId'>@e.Sigla</option>
                                                                    }
                                                }
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }*@ */}

                                                <div className='field'>
                                                    <label className='label'>Cidade</label>
                                                    <div className='control has-icons-right'>
                                                        <input type='text' id='txtCidade' className='input' value={detalhesPerfil.usuariosInformacoes.cidades.nome} placeholder='A cidade em que você vive' disabled />
                                                        <span className='icon is-small is-right'>
                                                            <i className='fas fa-city'></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <hr className='mt-4' />

                                    <div className='has-text-centered mt-4'>
                                        <input type='submit' className='button is-primary' value='Salvar alterações' id='btnSalvarAlteracao' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className='mt-4'>
                <h2>Atualizar perfil de @{detalhesPerfil.nomeUsuarioSistema}</h2>

                <span className='mt-2'>
                    dataCriacao: {detalhesPerfil.dataCriacao}<br />
                    dataOnline: {detalhesPerfil.dataOnline}<br />
                    email: {detalhesPerfil.email}<br />
                    foto: {detalhesPerfil.foto}<br />
                    isAtivo: {detalhesPerfil.isAtivo}<br />
                    isPremium: {detalhesPerfil.isPremium}<br />
                    nomeCompleto: {detalhesPerfil.nomeCompleto}<br />
                    nomeUsuarioSistema: {detalhesPerfil.nomeUsuarioSistema}<br />
                    usuarioId: {detalhesPerfil.usuarioId}<br />
                    usuarioTipoId: {detalhesPerfil.usuarioTipoId}<br />
                    usuarioTipos.tipo: {detalhesPerfil.usuarioTipos.tipo}<br />
                    usuarioTipos.descricao: {detalhesPerfil.usuarioTipos.descricao}<br />

                    {
                        detalhesPerfil.usuariosInformacoes && (
                            <React.Fragment>
                                usuariosInformacoes.bairro: {detalhesPerfil.usuariosInformacoes.bairro}<br />
                                usuariosInformacoes.cep: {detalhesPerfil.usuariosInformacoes.cep}<br />
                                usuariosInformacoes.cidadeId: {detalhesPerfil.usuariosInformacoes.cidadeId}<br />
                                usuariosInformacoes.cpf: {detalhesPerfil.usuariosInformacoes.cpf}<br />
                                usuariosInformacoes.dataAniversario: {detalhesPerfil.usuariosInformacoes.dataAniversario}<br />
                                usuariosInformacoes.genero: {detalhesPerfil.usuariosInformacoes.genero}<br />
                                usuariosInformacoes.numeroResidencia: {detalhesPerfil.usuariosInformacoes.numeroResidencia}<br />
                                usuariosInformacoes.rua: {detalhesPerfil.usuariosInformacoes.rua}<br />
                                usuariosInformacoes.telefone: {detalhesPerfil.usuariosInformacoes.telefone}
                            </React.Fragment>
                        )
                    }
                </span>
            </div>
        </React.Fragment>
    );
}



