import React, { useState } from 'react';
import CONSTANTS from '../../utilidades/constEstabelecimentos';
import Auth from '../../utilidades/servicoAutenticacao';

export default function FormularioNovoEstabelecimento(props) {
    const initialFormData = {
        nome: 'Nome teste',
        descricao: 'Isso é apenas um teste',
        thumbnail: 'Thumb teste',
        rua: 'Rua teste',
        numeroEndereco: 'Número de endereço teste',
        cep: 'CEP teste',
        bairro: 'Bairro teste',
        cidadeId: '1',
        estabelecimentoTipoId: '1'
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

        const estabelecimento_a_ser_criado = {
            // estabelecimentoId: 0,
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

        const url = CONSTANTS.API_URL_POST_CRIAR;
        const token = Auth.getUsuarioLogado().token;

        // console.log(token);
        // console.log(estabelecimento_a_ser_criado);
        // console.log(url);

        // Post;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(estabelecimento_a_ser_criado)
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
        props.onEstabelecimentoCriado(estabelecimento_a_ser_criado);
    };

    return (
        <form className='w-100 px-5'>
            <h1 className='mt-5 text-center'>Criar novo estabelecimento</h1>

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

            <button onClick={handleSubmit} className='btn btn-dark btn-lg w-100 mt-5'>Criar estabelecimento</button>
            <button onClick={() => props.onEstabelecimentoCriado(null)} className='btn btn-secondary btn-lg w-100 mt-3'>Cancelar</button>
        </form>
    )
}