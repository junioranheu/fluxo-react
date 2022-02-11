import React, { useEffect, useState } from 'react';
import InputMascara from '../outros/inputMascara';

export default function AbaDadosPessoais(props) {
    const [prop] = useState(props['props']);
    // console.log(prop);

    // formDadosPessoais;
    const formDadosPessoaisJsonInicial = {
        cpf: prop.usuariosInformacoes?.cpf,
        telefone: prop.usuariosInformacoes?.telefone,
        dataAniversario: prop.usuariosInformacoes?.dataAniversario,
        genero: prop.usuariosInformacoes?.genero,
        cep: prop.usuariosInformacoes?.cep,
        numeroResidencia: prop.usuariosInformacoes?.numeroResidencia,
        rua: prop.usuariosInformacoes?.rua,
        bairro: prop.usuariosInformacoes?.bairro,
        estadoSigla: prop.usuariosInformacoes?.cidades.estados.sigla,
        cidadeNome: prop.usuariosInformacoes?.cidades.nome
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
        if (formDadosPessoais.genero === '1') {
            setIsHomem('checked');
            setIsMulher('');
        } else if (formDadosPessoais.genero === '2') {
            setIsMulher('checked');
            setIsHomem('');
        }

        console.log(formDadosPessoais);
    }, [formDadosPessoais]);

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
                            <InputMascara mask='999.999.999-99' onChange={(e) => handleChangeFormDadosPessoais(e)}
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
                            <InputMascara mask='99 99999-9999' onChange={(e) => handleChangeFormDadosPessoais(e)}
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
                            <InputMascara mask='99/99/9999' onChange={(e) => handleChangeFormDadosPessoais(e)}
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
                            <InputMascara mask='99999-999' onChange={(e) => handleChangeFormDadosPessoais(e)}
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
                            <InputMascara mask='9999' onChange={(e) => handleChangeFormDadosPessoais(e)}
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
                            <input onChange={(e) => handleChangeFormDadosPessoais(e)}
                                type='text' name='rua' className='input' value={formDadosPessoais.rua} placeholder='A rua em que você vive' disabled
                            />

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
                            <input onChange={(e) => handleChangeFormDadosPessoais(e)}
                                type='text' name='bairro' className='input' value={formDadosPessoais.bairro} placeholder='O bairro em que você vive' disabled
                            />

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
                            <input onChange={(e) => handleChangeFormDadosPessoais(e)}
                                type='text' name='estadoSigla' className='input' value={formDadosPessoais.estadoSigla} placeholder='O estado em que você vive' disabled
                            />

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
                            <input onChange={(e) => handleChangeFormDadosPessoais(e)}
                                type='text' name='cidadeNome' className='input' value={formDadosPessoais.cidadeNome} placeholder='A cidade em que você vive' disabled
                            />
                            
                            <span className='icon is-small is-right'>
                                <i className='fas fa-city'></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

