import React, { useState } from 'react';
import CONSTANTS from '../../utilidades/const/constEstabelecimentos';
import { Auth } from '../../utilidades/context/usuarioContext';
import { Fetch } from '../../utilidades/utils/fetch';
import { Aviso } from '../outros/aviso';

export default function FormularioAtualizarEstabelecimento(props) {
    var prop = props['propsEstabelecimento'];
    // console.log(prop);

    const initialFormData = {
        nome: prop.nome,
        descricao: prop.descricao,
        thumbnail: prop.thumbnail,
        rua: prop.rua,
        numeroEndereco: prop.numeroEndereco,
        cep: prop.cep,
        bairro: prop.bairro,
        cidadeId: prop.cidadeId,
        estabelecimentoTipoId: prop.estabelecimentoTipoId
    };

    const [formData, setFormData] = useState(initialFormData);

    // Ao alterar os valores dos inputs, insira os valores nas variaveis do formData;
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Ao clicar no botão para criar;
    async function handleSubmit(e) {
        e.preventDefault();

        const estabelecimento_a_ser_atualizado = {
            estabelecimentoId: prop.estabelecimentoId,
            nome: formData.nome,
            descricao: formData.descricao,
            thumbnail: formData.thumbnail,
            rua: formData.rua,
            numeroEndereco: formData.numeroEndereco,
            cep: formData.cep,
            bairro: formData.bairro,
            cidadeId: formData.cidadeId,
            estabelecimentoTipoId: formData.estabelecimentoTipoId,

            //
            isAtivo: 1,
            usuarioId: 1,
            // dataCriacao: Date.now()
        }

        const url = CONSTANTS.API_URL_POST_ATUALIZAR;
        const token = Auth.getUsuarioLogado().token;

        // Post;
        let resposta = await Fetch.postApi(url, estabelecimento_a_ser_atualizado, token);
        if (resposta) {
            // console.log('Ok: ' + resposta);
        } else {
            Aviso.error('Algo deu errado<br/>Consulte o F12!', 5000);
        }

        // Encerra o componente;
        props.onEstabelecimentoUpdated(estabelecimento_a_ser_atualizado);
    };

    return (
        <form className='is-fullwidth'>
            <h2>Atualizar estabelecimento "{prop.nome}"</h2>

            <div className='box mt-4'>
                <div>
                    <label className='label'>Nome do estabelecimento</label>
                    <input value={formData.nome} name='nome' type='text' className='input' onChange={handleChange} />
                </div>

                <div className='mt-4'>
                    <label className='label'>Descrição</label>
                    <input value={formData.descricao} name='descricao' type='text' className='input' onChange={handleChange} />
                </div>

                <div className='mt-4'>
                    <label className='label'>Thumbnail</label>
                    <input value={formData.thumbnail} name='thumbnail' type='text' className='input' onChange={handleChange} />
                </div>

                <div className='mt-4'>
                    <label className='label'>Rua</label>
                    <input value={formData.rua} name='rua' type='text' className='input' onChange={handleChange} />
                </div>

                <div className='mt-4'>
                    <label className='label'>Nº de endereço</label>
                    <input value={formData.numeroEndereco} name='numeroEndereco' type='text' className='input' onChange={handleChange} />
                </div>

                <div className='mt-4'>
                    <label className='label'>CEP</label>
                    <input value={formData.cep} name='cep' type='text' className='input' onChange={handleChange} />
                </div>

                <div className='mt-4'>
                    <label className='label'>Bairro</label>
                    <input value={formData.bairro} name='bairro' type='text' className='input' onChange={handleChange} />
                </div>

                <div className='mt-4'>
                    <label className='label'>CidadeId</label>
                    <input value={formData.cidadeId} name='cidadeId' type='text' className='input' onChange={handleChange} />
                </div>

                <div className='mt-4'>
                    <label className='label'>EstabelecimentoTipoId</label>
                    <input value={formData.estabelecimentoTipoId} name='estabelecimentoTipoId' type='text' className='input' onChange={handleChange} />
                </div>

                <div className='mt-5'>
                    <a onClick={handleSubmit} className="button is-primary" href={() => false}>Atualizar estabelecimento</a>
                    <a onClick={() => props.onEstabelecimentoUpdated(null)} className="button is-secondary ml-4" href={() => false}>Cancelar e voltar</a>
                </div>
            </div>
        </form>
    )
}