import React, { useState } from 'react';
import FormularioAtualizarEstabelecimento from '../../componentes/estabelecimento/formularioAtualizarEstabelecimento2';
import FormularioNovoEstabelecimento from '../../componentes/estabelecimento/formularioNovoEstabelecimento2';
import CONSTANTS_ESTABELECIMENTOS from '../../utilidades/constEstabelecimentos2';
// import './App.css';

export default function Index() {
    const [estabelecimentos, setEstabelecimentos] = useState([]);
    const [showFormularioNovoEstabelecimento, setShowFormularioNovoEstabelecimento] = useState(false);
    const [estabelecimentoSendoAtualizado, setEstabelecimentoSendoAtualizado] = useState(null);

    function getEstabelecimentos() {
        const url = CONSTANTS_ESTABELECIMENTOS.API_URL_GET_TODOS;

        fetch(url, {
            method: 'GET'
        })
            .then(data => data.json())
            .then(data => {
                // console.log(data);
                setEstabelecimentos(data);
            })
            .catch((error) => {
                console.log(error);
                alert('Erro, consulte F12');
            });
    }

    function deleteEstabelecimento(props) {
        const estabelecimentoId = props.estabelecimentoId;
        const estabelecimentoNome = props.nome;

        let resposta = window.confirm(`Você tem certeza que deseja deletar o estabelecimento "${estabelecimentoNome}"?`);
        if (!resposta) {
            return false;
        }

        const url = `${CONSTANTS_ESTABELECIMENTOS.API_URL_POST_DELETAR}?id=${estabelecimentoId}`;
        console.log(url);

        // Post;
        fetch(url, {
            method: 'POST'
        })
            .then(data => data.json())
            .then(data => {
                // console.log(data);
                onEstabelecimentoDeleted(estabelecimentoId);
            })
            .catch((error) => {
                console.log(error);
                alert('Erro, consulte F12');
            });
    }

    return (
        <div className='container'>
            <div className='row min-vh-100'>
                <div className='col d-flex flex-column justify-content-center align-items-center'>
                    {(showFormularioNovoEstabelecimento === false && estabelecimentoSendoAtualizado === null) && (
                        <div>
                            <h1 className='text-center'>Estabelecimentos do Fluxo</h1>
                            {/* <h2>{jwt}</h2> */}

                            <div className='mt-5'>
                                <button onClick={getEstabelecimentos} className='btn btn-dark btn-lg w-100'>Trazer estabelecimentos</button>
                                <button onClick={() => setShowFormularioNovoEstabelecimento(true)} className='btn btn-secondary btn-lg w-100 mt-4'>Criar novo estabelecimento</button>
                            </div>
                        </div>
                    )}

                    {(estabelecimentos.length > 0 && showFormularioNovoEstabelecimento === false && estabelecimentoSendoAtualizado === null) && renderizarTabela()}

                    {showFormularioNovoEstabelecimento && <FormularioNovoEstabelecimento onEstabelecimentoCriado={onEstabelecimentoCriado} />}

                    {estabelecimentoSendoAtualizado !== null && <FormularioAtualizarEstabelecimento propsEstabelecimento={estabelecimentoSendoAtualizado} onEstabelecimentoUpdated={onEstabelecimentoUpdated} />}
                </div>
            </div>
        </div>
    );

    function renderizarTabela() {
        return (
            <div className='table-responsive mt-5'>
                <table className='table table-bordered border-dark'>
                    <thead>
                        <tr>
                            <th scope='col'>ID</th>
                            <th scope='col'>Nome</th>
                            <th scope='col'>Descrição</th>
                            <th scope='col'>Opção</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            estabelecimentos.map((e) => (
                                <tr key={e.estabelecimentoId}>
                                    <th scope='row'>{e.estabelecimentoId}</th>
                                    <td>{e.nome}</td>
                                    <td>{e.descricao}</td>
                                    <td>
                                        <button onClick={() => setEstabelecimentoSendoAtualizado(e)} className='btn btn-dark btn-sm mx-3 my-3'>Atualizar</button>
                                        <button onClick={() => deleteEstabelecimento(e)} className='btn btn-secondary btn-sm'>Deletar</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                <button onClick={() => { setEstabelecimentos([]) }} className='btn btn-secondary btn-lg w-100 mt-4'>
                    Resetar informações
                </button>
            </div>
        );
    }

    function onEstabelecimentoCriado(estabelecimentoCriado) {
        setShowFormularioNovoEstabelecimento(false);

        if (estabelecimentoCriado === null) {
            return;
        }

        alert(`Estabelecimento criado com sucesso. Após apertar ok, o estabelecimento "${estabelecimentoCriado.nome}" será exibido na lista`);
        getEstabelecimentos();
    }

    function onEstabelecimentoUpdated(estabelecimentoAtualizado) {
        setEstabelecimentoSendoAtualizado(null);

        if (estabelecimentoAtualizado === null) {
            return;
        }

        let estabelecimentosCopy = [...estabelecimentos];

        const index = estabelecimentosCopy.findIndex((estabelecimentosCopyEstabelecimento, currentIndex) => {
            if (estabelecimentosCopyEstabelecimento.estabelecimentoId === estabelecimentoAtualizado.estabelecimentoId) {
                return true;
            }
        });

        if (index !== -1) {
            estabelecimentosCopy[index] = estabelecimentoAtualizado;
        }

        setEstabelecimentos(estabelecimentosCopy);

        alert(`Estabelecimento atualizado com sucesso. Após apertar ok, o estabelecimento "${estabelecimentoAtualizado.nome}" será exibido atualizado na lista`);
    }

    function onEstabelecimentoDeleted(estabelecimentoId) {
        let estabelecimentosCopy = [...estabelecimentos];

        const index = estabelecimentosCopy.findIndex((estabelecimentosCopyEstabelecimento, currentIndex) => {
            if (estabelecimentosCopyEstabelecimento.estabelecimentoId === estabelecimentoId) {
                return true;
            }
        });

        if (index !== -1) {
            estabelecimentosCopy.splice(index, 1);
        }

        setEstabelecimentos(estabelecimentosCopy);

        alert(`Estabelecimento deletado com sucesso`);
    }
}



