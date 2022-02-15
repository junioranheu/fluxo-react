import moment from 'moment';
import NProgress from 'nprogress';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Aviso } from '../../componentes/outros/aviso';
import CONSTANTS_CIDADES from '../../utilidades/const/constCidades';
import CONSTANTS from '../../utilidades/const/constUsuarios';
import { Auth, UsuarioContext } from '../../utilidades/context/usuarioContext';
import { Fetch } from '../../utilidades/utils/fetch';
import horarioBrasilia from '../../utilidades/utils/horarioBrasilia';
import { Validacao } from '../../utilidades/utils/validacao';
import InputMascara from '../outros/inputMascara';

export default function AbaDadosPessoais(props) {
    const [prop] = useState(props['props']);
    // console.log(prop);

    // Auth;
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const [usuarioId] = useState(isAuth ? Auth.getUsuarioLogado().usuarioId : null);

    // Refs;
    const refCpf = useRef(null);
    const refTelefone = useRef(null);
    const refDataAniversario = useRef(null);
    const refCep = useRef(null);
    const refNumeroResidencia = useRef(null);

    const [rua, setRua] = useState(prop.usuariosInformacoes?.rua);
    const [bairro, setBairro] = useState(prop.usuariosInformacoes?.bairro);
    const [estadoSigla, setEstadoSigla] = useState(prop.usuariosInformacoes?.cidades.estados.sigla);
    const [cidadeNome, setCidadeNome] = useState(prop.usuariosInformacoes?.cidades.nome);

    // formDadosPessoais;
    const dataAniversarioFormatada = (prop.usuariosInformacoes?.dataAniversario ? moment(prop.usuariosInformacoes?.dataAniversario).format('DD/MM/YYYY') : '');
    const formDadosPessoaisJsonInicial = {
        cpf: prop.usuariosInformacoes?.cpf,
        telefone: prop.usuariosInformacoes?.telefone,
        dataAniversario: dataAniversarioFormatada,
        genero: prop.usuariosInformacoes?.genero,
        cep: prop.usuariosInformacoes?.cep,
        numeroResidencia: prop.usuariosInformacoes?.numeroResidencia
    }
    const [formDadosPessoais, setFormDadosPessoais] = useState(formDadosPessoaisJsonInicial);
    function handleChangeFormDadosPessoais(e) {
        setFormDadosPessoais({
            ...formDadosPessoais,
            [e.target.name]: e.target.value
        });
    }

    const [isHomem, setIsHomem] = useState('');
    const [isMulher, setIsMulher] = useState('');
    useEffect(() => {
        if (formDadosPessoais.genero === '1' || formDadosPessoais.genero === 1) {
            setIsHomem('checked');
            setIsMulher('');
        } else if (formDadosPessoais.genero === '2' || formDadosPessoais.genero === 2) {
            setIsMulher('checked');
            setIsHomem('');
        }

        // console.log(formDadosPessoais);
    }, [formDadosPessoais]);

    async function handleBuscarCEP(e) {
        const cep = e.target.value;

        if (cep.length === 9) {
            const cepFormato = cep.replace(/\D/g, '');
            const urlViaCep = `https://viacep.com.br/ws/${cepFormato}/json/`;
            // console.log(urlViaCep);

            // https://pt.stackoverflow.com/questions/494932/buscar-cep-react
            fetch(urlViaCep, { mode: 'cors' })
                .then((res) => res.json())
                .then((data) => {
                    if (data.hasOwnProperty('erro')) {
                        Aviso.warn(`O cep ${cep} não existe!`, 5000);

                        setRua('');
                        setBairro('');
                        setEstadoSigla('');
                        setCidadeNome('');
                    } else {
                        // Ok;
                        // console.log(data);
                        setRua(data.logradouro);
                        setBairro(data.bairro);
                        setEstadoSigla(data.uf);
                        setCidadeNome(data.localidade);

                        formDadosPessoais.rua = data.logradouro;
                        formDadosPessoais.bairro = data.bairro;
                        formDadosPessoais.estadoSigla = data.uf;
                        formDadosPessoais.cidadeNome = data.localidade;
                    }
                })
                .catch(err => Aviso.error(`Houve um erro ao encontrar as informações do cep ${cep}!`, 5000));
        }
    }

    function verificarDadosPessoais() {
        // console.log(formDadosPessoais);

        // Verificação 0;
        if (!formDadosPessoais) {
            NProgress.done();
            Aviso.warn('Preencha os campos com seus dados pessoais para atualizar as informações', 5000);
            return false;
        }

        // Verificação do cpf #1: cpf preenchido?;
        if (!formDadosPessoais.cpf) {
            NProgress.done();
            Aviso.warn('Parece que você esqueceu de colocar o seu CPF', 5000);
            refCpf.current.select();
            return false;
        }

        // Verificação do cpf #2: cpf válido?;
        if (!Validacao.validarCPF(formDadosPessoais.cpf)) {
            NProgress.done();
            Aviso.warn('Parece que esse CPF não é válido', 5000);
            refCpf.current.select();
            return false;
        }

        // Verificação do telefone #1: telefone preenchido?;
        if (!formDadosPessoais.telefone) {
            NProgress.done();
            Aviso.warn('Parece que você esqueceu de colocar o seu número de telefone', 5000);
            refTelefone.current.select();
            return false;
        }

        // Verificação do telefone #2: telefone preenchido completamente?;
        if (formDadosPessoais.telefone.length < 13) {
            NProgress.done();
            Aviso.warn('Parece que esse número de telefone não é válido', 5000);
            refTelefone.current.select();
            return false;
        }

        // Verificação de aniversário #1: dataAniversario preenchido?;
        if (!formDadosPessoais.dataAniversario) {
            NProgress.done();
            Aviso.warn('Parece que você esqueceu de colocar sua data de nascimento', 5000);
            refDataAniversario.current.select();
            return false;
        }

        // Verificação de aniversário #2: dataAniversario válida?;
        if (!Validacao.validarData(formDadosPessoais.dataAniversario)) {
            NProgress.done();
            Aviso.warn('Parece que essa data não é válida', 5000);
            refDataAniversario.current.select();
            return false;
        }

        // Verificação de gênero #1: cep selecionado?;
        if (!formDadosPessoais.genero) {
            NProgress.done();
            Aviso.warn('Parece que você esqueceu de selecionar seu gênero', 5000);
            return false;
        }

        // Verificação de cep #1: cep preenchido?;
        if (!formDadosPessoais.cep) {
            NProgress.done();
            Aviso.warn('Parece que você esqueceu de colocar seu CEP', 5000);
            refCep.current.select();
            return false;
        }

        // Verificação de cep #1: cep válido?;
        if (formDadosPessoais.cep.length < 9) {
            NProgress.done();
            Aviso.warn('Parece que esse CEP não é válido', 5000);
            refCep.current.select();
            return false;
        }


        // Verificação de número de residência #1: numeroResidencia preenchido?;
        if (!formDadosPessoais.numeroResidencia) {
            NProgress.done();
            Aviso.warn('Parece que você esqueceu de colocar o número da sua residência', 5000);
            refNumeroResidencia.current.select();
            return false;
        }

        return true;
    }

    async function handleSubmitDadosPessoais() {
        NProgress.start();

        // Verificações;
        let isContinuar = verificarDadosPessoais();
        if (!isContinuar) {
            return false;
        }

        // Pegar o id da cidade, caso necessário que seja atualizado;
        const urlCidade = `${CONSTANTS_CIDADES.API_URL_GET_POR_NOME_MAIS_SIGLA_ESTADO}?nomeCidade=${cidadeNome}&siglaEstado=${estadoSigla}`;
        // console.log(urlCidade);
        let respostaCidade = await Fetch.getApi(urlCidade);
        if (!respostaCidade) {
            NProgress.done();
            Aviso.error('Houve um erro ao buscar a identicação da sua cidade com base no nome dela e a sigla do seu estado!', 5000);
            return false;
        }

        // Atualizar informações do logradouro com base nos hooks + cidadeId da resposta respostaCidade;
        formDadosPessoais.rua = rua;
        formDadosPessoais.bairro = bairro;
        formDadosPessoais.estadoSigla = estadoSigla;
        formDadosPessoais.cidadeNome = cidadeNome;
        formDadosPessoais.cidadeId = respostaCidade.cidadeId;

        // Montar o json para atualizar infos;
        const usuarioInformacoesJson = {
            usuariosInformacoes: {
                // usuarioInformacaoId: 1,
                usuarioId: usuarioId,
                genero: formDadosPessoais.genero,
                dataAniversario: formDadosPessoais.dataAniversario,
                cpf: formDadosPessoais.cpf,
                telefone: formDadosPessoais.telefone,
                rua: rua,
                numeroResidencia: formDadosPessoais.numeroResidencia,
                cep: formDadosPessoais.cep,
                bairro: bairro,
                cidadeId: respostaCidade.cidadeId,
                dataUltimaAlteracao: horarioBrasilia.format('YYYY-MM-DD HH:mm:ss')
            }
        };
        // console.log(usuarioInformacoesJson);
  
        // Atualizar informações;
        const url = CONSTANTS.API_URL_POST_ATUALIZAR;
        const token = Auth.getUsuarioLogado().token;
        let resposta = await Fetch.postApi(url, formDadosPessoais, token);
        if (resposta) {
            Aviso.success('Informações atualizadas com sucesso', 5000);
            NProgress.done();

            // Atualizar os dados que estão em usuarioContext.js/Auth;
            // Atualizar cidadeId e cidadeNome;
            const dadosUsuarioAtualizar = {
                cidadeId: formDadosPessoais.cidadeId,// ????????????????????????
                cidadeNome: formDadosPessoais.cidadeNome
            };
            Auth.updateUsuarioLogado(dadosUsuarioAtualizar);
        } else {
            Aviso.error('Algo deu errado ao atualizar suas informações<br/>Consulte o F12!', 5000);
        }
    }

    if (!prop) {
        return null;
    }

    return (
        <React.Fragment>
            <div className='columns'>
                <div className='column'>
                    <div className='field'>
                        <label className='label'>CPF</label>
                        <div className='control has-icons-right'>
                            <InputMascara mask='999.999.999-99' onChange={(e) => handleChangeFormDadosPessoais(e)} innerRef={refCpf}
                                type='text' name='cpf' className='input' value={formDadosPessoais.cpf} placeholder='Seu CPF' />

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
                            <InputMascara mask='99 99999-9999' onChange={(e) => handleChangeFormDadosPessoais(e)} innerRef={refTelefone}
                                type='text' name='telefone' className='input' value={formDadosPessoais.telefone} placeholder='Seu número de telefone' />

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
                            <InputMascara mask='99/99/9999' onChange={(e) => handleChangeFormDadosPessoais(e)} innerRef={refDataAniversario}
                                type='text' name='dataAniversario' className='input' value={formDadosPessoais.dataAniversario} placeholder='Sua data de aniversário' />

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
                                <input type='radio' value='1' name='genero' checked={isHomem} onChange={(e) => handleChangeFormDadosPessoais(e)} />
                                <span className='ml-2'>Masculino</span>
                            </label>

                            <label className='radio'>
                                <input type='radio' value='2' name='genero' checked={isMulher} onChange={(e) => handleChangeFormDadosPessoais(e)} />
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
                            <InputMascara mask='99999-999' onChange={(e) => { handleChangeFormDadosPessoais(e); handleBuscarCEP(e); }} innerRef={refCep}
                                type='text' name='cep' className='input' value={formDadosPessoais.cep} placeholder='Seu CEP atual' />

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
                            <InputMascara mask='9999' onChange={(e) => handleChangeFormDadosPessoais(e)} innerRef={refNumeroResidencia}
                                type='text' name='numeroResidencia' className='input' value={formDadosPessoais.numeroResidencia} placeholder='O número da sua residência' />

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
                            <input type='text' className='input' value={rua} placeholder='A rua em que você vive' disabled />

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
                            <input type='text' className='input' value={bairro} placeholder='O bairro em que você vive' disabled />

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
                            <input type='text' className='input' value={estadoSigla} placeholder='O estado em que você vive' disabled />

                            <span className='icon is-small is-right'>
                                <i className='fas fa-map-marked-alt'></i>
                            </span>
                        </div>
                    </div>
                </div>

                <div className='column'>
                    <div className='field'>
                        <label className='label'>Cidade</label>
                        <div className='control has-icons-right'>
                            <input type='text' className='input' value={cidadeNome} placeholder='A cidade em que você vive' disabled />

                            <span className='icon is-small is-right'>
                                <i className='fas fa-city'></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <hr className='mt-4' />
            <div className='has-text-centered mt-4'>
                <input type='submit' className='button is-primary' value='Salvar alterações' onClick={() => handleSubmitDadosPessoais()} />
            </div>
        </React.Fragment>
    );
}

