import React, { useState } from 'react';
import CONSTANTS from '../../utilidades/constEstabelecimentos';
import Auth from '../../utilidades/servicoAutenticacao';

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
    const handleSubmit = (e) => {
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

        console.log(estabelecimento_a_ser_atualizado);
        // console.log(url);

        // Post;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(estabelecimento_a_ser_atualizado)
        })
            .then(data => data.json())
            .then(data => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
                alert('Erro, consulte F12');
            });

        // Encerra o componente;
        props.onEstabelecimentoUpdated(estabelecimento_a_ser_atualizado);
    };

    return (
        <form className='w-100 px-5'>
            <h1 className='mt-5 text-center'>Atualizar estabelecimento "{prop.nome}"</h1>

            <div className='mt-5'>
                <label className='h3 form-label'>Nome do estabelecimento</label>
                <input value={formData.nome} name='nome' type='text' className='form-control' onChange={handleChange} />
            </div>

            <div className='mt-4'>
                <label className='h3 form-label'>Descrição</label>
                <input value={formData.descricao} name='descricao' type='text' className='form-control' onChange={handleChange} />
            </div>

            <div className='mt-4'>
                <label className='h3 form-label'>Thumbnail</label>
                <input value={formData.thumbnail} name='thumbnail' type='text' className='form-control' onChange={handleChange} />
            </div>

            <div className='mt-4'>
                <label className='h3 form-label'>Rua</label>
                <input value={formData.rua} name='rua' type='text' className='form-control' onChange={handleChange} />
            </div>

            <div className='mt-4'>
                <label className='h3 form-label'>Nº de endereço</label>
                <input value={formData.numeroEndereco} name='numeroEndereco' type='text' className='form-control' onChange={handleChange} />
            </div>

            <div className='mt-4'>
                <label className='h3 form-label'>CEP</label>
                <input value={formData.cep} name='cep' type='text' className='form-control' onChange={handleChange} />
            </div>

            <div className='mt-4'>
                <label className='h3 form-label'>Bairro</label>
                <input value={formData.bairro} name='bairro' type='text' className='form-control' onChange={handleChange} />
            </div>

            <div className='mt-4'>
                <label className='h3 form-label'>CidadeId</label>
                <input value={formData.cidadeId} name='cidadeId' type='text' className='form-control' onChange={handleChange} />
            </div>

            <div className='mt-4'>
                <label className='h3 form-label'>EstabelecimentoTipoId</label>
                <input value={formData.estabelecimentoTipoId} name='estabelecimentoTipoId' type='text' className='form-control' onChange={handleChange} />
            </div>

            <a onClick={handleSubmit} className="button is-primary" href={() => false}>Atualizar estabelecimento</a>
            <a onClick={() => props.onEstabelecimentoUpdated(null)} className="button is-secondary ml-4" href={() => false}>Cancelar e voltar</a>
        </form>
    )
}