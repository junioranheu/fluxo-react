import React, { useState } from 'react';
import CONSTANTS from './utilidades/ConstEstabelecimentos';
import FormularioNovoEstabelecimento from './componentes/FormularioNovoEstabelecimento';
import FormularioAtualizarEstabelecimento from './componentes/FormularioAtualizarEstabelecimento';
// import './App.css';

export default function App() {
  const [estabelecimentos, setEstabelecimentos] = useState([]);
  const [showingCreateNewEstabelecimento, setShowingCreateNewEstabelecimento] = useState(false);
  const [postCurrentlyBeingUpdated, setPostCurrentlyBeingUpdated] = useState(null);

  function getEstabelecimentos() {
    const url = CONSTANTS.API_URL_GET_TODOS;

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

  function deletarEstabelecimento(props) {
    const estabelecimentoId = props.estabelecimentoId;
    const estabelecimentoNome = props.nome;

    let resposta = window.confirm(`Você tem certeza que deseja deletar o estabelecimento "${estabelecimentoNome}"?`);
    if (!resposta) {
      return false;
    }

    const url = `${CONSTANTS.API_URL_POST_DELETAR}?id=${estabelecimentoId}`;
    console.log(url);

    // Post;
    fetch(url, {
      method: 'POST'
    })
      .then(data => data.json())
      .then(data => {
        console.log(data);
        onPostDeleted(estabelecimentoId);
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
          {(showingCreateNewEstabelecimento === false && postCurrentlyBeingUpdated === null) && (
            <div>
              <h1 className='text-center'>Estabelecimentos do Fluxo</h1>

              <div className='mt-5'>
                <button onClick={getEstabelecimentos} className='btn btn-dark btn-lg w-100'>Trazer estabelecimentos</button>
                <button onClick={() => setShowingCreateNewEstabelecimento(true)} className='btn btn-secondary btn-lg w-100 mt-4'>Criar novo estabelecimento</button>
              </div>
            </div>
          )}

          {(estabelecimentos.length > 0 && showingCreateNewEstabelecimento === false && postCurrentlyBeingUpdated === null) && renderizarTabela()}

          {showingCreateNewEstabelecimento && <FormularioNovoEstabelecimento onEstabelecimentoCriado={onEstabelecimentoCriado} />}

          {postCurrentlyBeingUpdated !== null && <FormularioAtualizarEstabelecimento estabelecimento={postCurrentlyBeingUpdated} onPostUpdated={onPostUpdated} />}
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
                    <button onClick={() => setPostCurrentlyBeingUpdated(e)} className='btn btn-dark btn-sm mx-3 my-3'>Atualizar</button>
                    <button onClick={() => deletarEstabelecimento(e)} className='btn btn-secondary btn-sm'>Deletar</button>
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
    setShowingCreateNewEstabelecimento(false);

    if (estabelecimentoCriado === null) {
      return;
    }

    alert(`Estabelecimento criado com sucesso. Após apertar ok, o estabelecimento "${estabelecimentoCriado.nome}" será exibido na lista`);
    getEstabelecimentos();
  }

  function onPostUpdated(updatedPost) {
    setPostCurrentlyBeingUpdated(null);

    if (updatedPost === null) {
      return;
    }

    let estabelecimentosCopy = [...estabelecimentos];

    const index = estabelecimentosCopy.findIndex((estabelecimentosCopyEstabelecimento, currentIndex) => {
      if (estabelecimentosCopyEstabelecimento.estabelecimentoId === updatedPost.estabelecimentoId) {
        return true;
      }
    });

    if (index !== -1) {
      estabelecimentosCopy[index] = updatedPost;
    }

    setEstabelecimentos(estabelecimentosCopy);

    alert(`Estabelecimento atualizado com sucesso. Após apertar ok, o estabelecimento "${updatedPost.nome}" será exibido atualizado na lista`);
  }

  function onPostDeleted(estabelecimentoId) {
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



