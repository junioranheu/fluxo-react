import React, { useState } from 'react';
import CONSTANTS from '../utilidades/ConstEstabelecimentos';

export default function FormularioNovoEstabelecimento(props) {
    const initialFormData = {
        nome: 'Nome xxx',
        descricao: 'Isso é apenas um teste'
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
            descricao: formData.descricao
        }

        const url = CONSTANTS.API_URL_POST_CRIAR;

        // console.log(estabelecimento_a_ser_criado);   
        // console.log(url);

        // Post;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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

            <button onClick={handleSubmit} className='btn btn-dark btn-lg w-100 mt-5'>Criar estabelecimento</button>
            <button onClick={() => props.onEstabelecimentoCriado(null)} className='btn btn-secondary btn-lg w-100 mt-3'>Cancelar</button>
        </form>
    )
}