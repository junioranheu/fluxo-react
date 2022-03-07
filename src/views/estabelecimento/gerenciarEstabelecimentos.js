import React, { useEffect, useState } from 'react';
import FormularioAtualizarEstabelecimento from '../../componentes/estabelecimentos/formularioAtualizarEstabelecimento';
import FormularioNovoEstabelecimento from '../../componentes/estabelecimentos/formularioNovoEstabelecimento';
import { Aviso } from '../../componentes/outros/aviso';
import CONSTANTS_ESTABELECIMENTOS from '../../utilidades/const/constEstabelecimentos';
import { Auth } from '../../utilidades/context/usuarioContext';
import { Fetch } from '../../utilidades/utils/fetch';

export default function Index() {
    const [estabelecimentos, setEstabelecimentos] = useState([]);
    const [showFormularioNovoEstabelecimento, setShowFormularioNovoEstabelecimento] = useState(false);
    const [estabelecimentoSendoAtualizado, setEstabelecimentoSendoAtualizado] = useState(null);
 
    async function getEstabelecimentos() {
        const url = CONSTANTS_ESTABELECIMENTOS.API_URL_GET_TODOS;

        let resposta = await Fetch.getApi(url);
        if (resposta) {
            setEstabelecimentos(resposta);
        } else {
            Aviso.error('Algo deu errado<br/>Consulte o F12!', 5000);
        }
    }

    async function deleteEstabelecimento(props) {
        const estabelecimentoId = props.estabelecimentoId;
        const estabelecimentoNome = props.nome;

        let respUsuario = window.confirm(`Você tem certeza que deseja deletar o estabelecimento '${estabelecimentoNome}'?`);
        if (!respUsuario) {
            return false;
        }

        const url = `${CONSTANTS_ESTABELECIMENTOS.API_URL_POST_DELETAR}?id=${estabelecimentoId}`;
        const token = Auth.getUsuarioLogado().token;

        let resposta = await Fetch.postApi(url, '', token);
        if (resposta) {
            // console.log('Ok: ' + resposta);
            onEstabelecimentoDeleted(estabelecimentoId);
        } else {
            Aviso.error('Algo deu errado<br/>Consulte o F12!', 5000);
        }
    }

    // Ao carregar página;
    useEffect(() => {
        document.title = 'Fluxo — Gerenciar estabelecimentos'
    }, [])

    return (
        <div className='container mt-6'>
            {(showFormularioNovoEstabelecimento === false && estabelecimentoSendoAtualizado === null) && (
                <div className='has-text-centered'>
                    <h2>Estabelecimentos</h2>
                    {/* <h2>{jwt}</h2> */}

                    <div className='mt-5'>
                        <a onClick={getEstabelecimentos} className='button is-primary' href={() => false}>Trazer estabelecimentos</a>
                        <a onClick={() => setShowFormularioNovoEstabelecimento(true)} className='button is-primary ml-4' href={() => false}>Criar novo estabelecimento</a>
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
                                        <a onClick={() => setEstabelecimentoSendoAtualizado(e)} className='button is-primary is-small' href={() => false}>Atualizar</a>
                                        <a onClick={() => deleteEstabelecimento(e)} className='button is-secondary ml-4 is-small' href={() => false}>Deletar</a>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                <a onClick={() => setEstabelecimentos([])} className='button is-primary is-fullwidth ml-3' href={() => false}>Voltar</a>
            </div>
        );
    }

    function onEstabelecimentoCriado(estabelecimentoCriado) {
        setShowFormularioNovoEstabelecimento(false);

        if (estabelecimentoCriado === null) {
            return;
        }

        Aviso.success(`Estabelecimento criado com sucesso<br/>Após apertar ok, o estabelecimento '${estabelecimentoCriado.nome}' será exibido na lista`, 5000);
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

            return false;
        });

        if (index !== -1) {
            estabelecimentosCopy[index] = estabelecimentoAtualizado;
        }

        setEstabelecimentos(estabelecimentosCopy);

        Aviso.success(`Estabelecimento atualizado com sucesso<br/>Após apertar ok, o estabelecimento '${estabelecimentoAtualizado.nome}' será exibido atualizado na lista`, 5000);
    }

    function onEstabelecimentoDeleted(estabelecimentoId) {
        let estabelecimentosCopy = [...estabelecimentos];

        const index = estabelecimentosCopy.findIndex((estabelecimentosCopyEstabelecimento, currentIndex) => {
            if (estabelecimentosCopyEstabelecimento.estabelecimentoId === estabelecimentoId) {
                return true;
            }

            return false;
        });

        if (index !== -1) {
            estabelecimentosCopy.splice(index, 1);
        }

        setEstabelecimentos(estabelecimentosCopy);

        Aviso.success('Estabelecimento deletado com sucesso', 5000);
    }
}



