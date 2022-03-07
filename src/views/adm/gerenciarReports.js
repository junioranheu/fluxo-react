import React, { useEffect, useState } from 'react';
import { Aviso } from '../../componentes/outros/aviso';
import CONSTANTS from '../../utilidades/const/constReports';
import { Auth } from '../../utilidades/context/usuarioContext';
import { Fetch } from '../../utilidades/utils/fetch';

export default function GerenciarReports() {

    async function getReports() {
        const url = CONSTANTS.API_URL_GET_TODOS;
        const token = Auth.getUsuarioLogado().token;

        let resposta = await Fetch.getApi(url, token);
        if (!resposta) {
            Aviso.error('Algo deu errado ao consultar os reports', 5000);
            return false;
        }

        console.log(resposta);
        setReports(resposta);
    }

    const [reports, setReports] = useState({});
    useEffect(() => {
        document.title = 'Fluxo — Gerenciar reports'

        getReports();
    }, []);

    function renderizarTabela() {
        return (
            <div className='box mt-5'>
                <table className='table is-striped is-hoverable is-fullwidth'>
                    <thead>
                        <tr>
                            <th scope='col'>ID</th>
                            <th scope='col'>Reclamação</th>
                            <th scope='col'>Usuário</th>
                            <th scope='col'>Data</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            reports.map((e) => (
                                <tr key={e.reportId}>
                                    <th scope='row'>{e.reportId}</th>
                                    <td>{e.reclamacao}</td>
                                    <td>{(e.usuarioId > 0 ? e.usuario.nomeUsuarioSistema : 'Anônimo')}</td>
                                    <td>{e.data}</td>
                                    {/* <td>
                                        <a onClick={() => setEstabelecimentoSendoAtualizado(e)} className='button is-primary is-small' href={() => false}>Atualizar</a>
                                        <a onClick={() => deleteEstabelecimento(e)} className='button is-secondary ml-4 is-small' href={() => false}>Deletar</a>
                                    </td> */}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        );
    }


    return (
        <div className='container mt-6'>
            <div className='has-text-centered'>
                <h2>Gerenciar reports</h2>
            </div>

            {reports.length > 0 && renderizarTabela()}
            {reports.length <= 0 && (<div>Sem reports no momento</div>)}
        </div>
    );
}



