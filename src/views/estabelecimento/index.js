import React, { useState } from 'react';
import FormularioAtualizarEstabelecimento from '../../componentes/estabelecimento/formularioAtualizarEstabelecimento';
import FormularioNovoEstabelecimento from '../../componentes/estabelecimento/formularioNovoEstabelecimento';
import CONSTANTS_ESTABELECIMENTOS from '../../utilidades/constEstabelecimentos';
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
        <div className='container mt-5'>
            {(showFormularioNovoEstabelecimento === false && estabelecimentoSendoAtualizado === null) && (
                <div className='has-text-centered'>
                    <h2>Estabelecimentos</h2>
                    {/* <h2>{jwt}</h2> */}

                    <div className='mt-5'>
                        <a onClick={getEstabelecimentos} className="button is-primary">Trazer estabelecimentos</a>
                        <a onClick={() => setShowFormularioNovoEstabelecimento(true)} className="button is-primary ml-4">Criar novo estabelecimento</a>
                    </div>
                </div>
            )}

            {(estabelecimentos.length > 0 && showFormularioNovoEstabelecimento === false && estabelecimentoSendoAtualizado === null) && renderizarTabela()}

            {showFormularioNovoEstabelecimento && <FormularioNovoEstabelecimento onEstabelecimentoCriado={onEstabelecimentoCriado} />}

            {estabelecimentoSendoAtualizado !== null && <FormularioAtualizarEstabelecimento propsEstabelecimento={estabelecimentoSendoAtualizado} onEstabelecimentoUpdated={onEstabelecimentoUpdated} />}
        </div>
    );

    function renderizarTabela() {
        return (
            <div className='box mt-5'>
                <table className='table is-striped is-hoverable is-fullwidth mt-5'>
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

                <a onClick={() => setEstabelecimentos([])} className="button is-primary is-fullwidth ml-3">Voltar</a>
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



