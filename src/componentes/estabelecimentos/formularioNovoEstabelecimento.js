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
        <form className='is-fullwidth'>
            <h2>Criar novo estabelecimento</h2>

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
                    <a onClick={handleSubmit} className="button is-primary" href={() => false}>Criar estabelecimento</a>
                    <a onClick={() => props.onEstabelecimentoCriado(null)} className="button is-secondary ml-4" href={() => false}>Cancelar e voltar</a>
                </div>
            </div>
        </form>
    )
}