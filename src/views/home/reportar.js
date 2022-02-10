import React, { useContext, useEffect, useRef, useState } from 'react';
import { Aviso } from '../../componentes/outros/aviso';
import SemImagem from '../../static/outro/sem-imagem.webp';
import CONSTANTS from '../../utilidades/const/constReports';
import { Auth, UsuarioContext } from '../../utilidades/context/usuarioContext';
import { Fetch } from '../../utilidades/utils/fetch';
import HorarioBrasilia from '../../utilidades/utils/horarioBrasilia';

export default function Reportar() {
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;

    const refTextArea = useRef();
    const refBtnEnviarReclamacao = useRef();

    const [isCheckChecado, setIsCheckChecado] = useState(false);
    const [textProblema, setTextProblema] = useState('');

    function handleOnChangeCheckBox() {
        setIsCheckChecado(!isCheckChecado);
    }

    function handleOnChangeTextArea(e) {
        setTextProblema(e.target.value);
    }

    function handleClickCancelar() {
        setIsCheckChecado(false);
        setTextProblema('');
    }

    async function handleClickReclamacao() {
        if (!isCheckChecado) {
            Aviso.warn('Você esqueceu de concordar com os termos!', 5000);
            return false;
        }

        if (!textProblema) {
            Aviso.warn('Você esqueceu de preencher sua reclamação!', 5000);
            refTextArea.current.select();
            return false;
        }

        if (textProblema.length < 10) {
            Aviso.warn('Sua reclamação está muito curta!', 5000);
            refTextArea.current.select();
            return false;
        }

        const usuarioId = isAuth ? Auth.getUsuarioLogado().usuarioId : null;
        const report = {
            'reclamacao': textProblema,
            'data': HorarioBrasilia.format('YYYY-MM-DD HH:mm:ss'),
            'usuarioId': usuarioId
        };

        const url = CONSTANTS.API_URL_POST_CRIAR;

        let resposta = await Fetch.postApi(url, report);
        if (resposta) {
            // console.log('Ok: ' + resposta);
            Aviso.success('Reclamação enviada com sucesso', 5000);
            refBtnEnviarReclamacao.current.disabled = true;
            setTextProblema('');
        } else {
            Aviso.error('Algo deu errado ao enviar sua reclamação<br/>Consulte o F12!', 5000);
        }
    }

    // Ao carregar página;
    useEffect(() => {
        document.title = 'Fluxo — Reportar um problema'
    }, []);

    return (
        <React.Fragment>
            <div className='hero-zika'>
                <svg className='secao-diagonal' preserveAspectRatio='none' viewBox='0 0 1438 620' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M0 620V0h1438v240L0 620z' />
                </svg>
            </div>

            <section className='section mt-6'>
                <div className='container'>
                    <div className='columns'>
                        <div className='column is-12'>
                            <div className='card article box'>
                                <div className='card-content'>
                                    <div className='media'>
                                        <div className='media-center'>
                                            <img src='' className='author-image' onError={(event) => event.target.src = SemImagem} alt='' />
                                        </div>

                                        <div className='media-content has-text-centered'>
                                            <h2 className='mt-4 title is-3'>Problemas, falhas ou bugs</h2>

                                            <p className='subtitle is-6 article-subtitle mt-1'>
                                                <a href='/perfil/@adm' className='cor-principal'>@adm</a> em 01 de fevereiro, 2022
                                            </p>
                                        </div>
                                    </div>

                                    <hr />

                                    <div className='content article-body mt-6'>
                                        <div className='has-text-centered mt-6'>
                                            <p className='title article-title'>Como reportar um problema?</p>
                                        </div>

                                        <div className='mt-4'>
                                            <h3 className=' is-size-5'>Por que reportar?</h3>
                                            <p>In molestie magna nibh, at blandit diam vestibulum efficitur. Aliquam mattis justo congue metus hendrerit efficitur. Duis vehicula lobortis enim in faucibus. Vestibulum iaculis urna at pharetra venenatis. Donec in accumsan metus. Suspendisse vel tellus non metus rhoncus molestie at id mauris. Quisque vel augue nisl. Suspendisse viverra egestas imperdiet. Donec sit amet justo libero. Aenean vitae eros non nunc tincidunt sodales.</p>
                                        </div>

                                        <div className='mt-5'>
                                            <h3 className='is-size-5'>Como reportar?</h3>
                                            <p>Utilize o formulário abaixo para reportar qualquer erro encontrado na plataforma.</p>
                                        </div>

                                        <div className='mt-5'>
                                            <div className='field'>
                                                <div className='control'>
                                                    <textarea ref={refTextArea} onChange={handleOnChangeTextArea} value={textProblema} className='textarea' placeholder='Reporte seu problema aqui...' style={{ resize: 'none' }} ></textarea>
                                                </div>
                                            </div>

                                            <div className='field sem-highlight'>
                                                <div className='control'>
                                                    <label className='checkbox'>
                                                        <input type='checkbox' onChange={handleOnChangeCheckBox} checked={isCheckChecado} />
                                                        <span>&nbsp;Eu concordo com os <a href='/politica-e-termos-de-uso' target='_blank' className='cor-principal'>termos e condições de uso</a></span>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className='field is-grouped'>
                                                <div className='control'>
                                                    <button onClick={handleClickCancelar} className='button'>Cancelar</button>
                                                </div>

                                                <div className='control'>
                                                    <button ref={refBtnEnviarReclamacao} onClick={handleClickReclamacao} className='button is-primary'>Enviar reclamação</button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='mt-6'>
                                            <hr />
                                        </div>

                                        <div className='has-text-centered mt-6'>
                                            <a className='button is-primary' href='/'>Voltar ao início</a>
                                        </div>
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