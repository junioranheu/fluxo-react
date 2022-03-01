import { useHealthCheck } from '@webscopeio/react-health-check';
import React, { useContext, useState } from 'react';
import { Auth, UsuarioContext } from '../../utilidades/context/usuarioContext';

export default function InfoUsuario() {
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const [esconderDiv, setEsconderDiv] = useState(false);

    // Health da API;
    const { available } = useHealthCheck({
        service: {
            name: 'fluxo_api',
            url: 'https://fluxoapi.azurewebsites.net/status',
        },
        onSuccess: ({ service }) => {
            console.log(`API "${service.name}" está disponível 🎉`);
        },
        onError: ({ service }) => {
            console.log(`API "${service.name}" não está disponível no momento 😔`);
        },
    });

    function fecharDiv() {
        setEsconderDiv(true);
    }

    return (
        <React.Fragment>
            {esconderDiv ? (
                <span></span>
            ) : (
                <code className={`mt-4 ${esconderDiv}`} style={{ borderRadius: 10, padding: 20 }}>
                    <span>
                        isApiHealthy? {available ? '👍' : '👎'}
                    </span>
                    <br />
                    <span>
                        Logado? {isAuth ? '👍' : '👎'}
                    </span>

                    {(isAuth) && (
                        <div>
                            <span>Nome: {Auth.getUsuarioLogado().nome}</span>
                            <br />
                            <span>Usuário: {Auth.getUsuarioLogado().nomeUsuarioSistema}</span>
                            <br />
                            <span>E-mail: {Auth.getUsuarioLogado().email}</span>
                            <br />
                            <span>Tipo: {Auth.getUsuarioLogado().usuarioTipoId}</span>
                            <br />
                            <span>Foto de perfil: {Auth.getUsuarioLogado().foto}</span>
                            <br />
                            <span>CidadeId: {Auth.getUsuarioLogado().cidadeId}</span>
                            <br />
                            <span>Cidade: {Auth.getUsuarioLogado().cidadeNome}</span>
                            <br />
                            <span>IsVerificado: {Auth.getUsuarioLogado().isVerificado}</span>
                            <br />
                            <span>Token: {Auth.getUsuarioLogado().token.substring(0, 30)}...</span>
                            <br />
                            <span>Data de autenticação: {Auth.getUsuarioLogado().dataAutenticacao}</span>
                        </div>
                    )}

                    <span className='btn-canto-direito pointer' title='Fechar' onClick={() => fecharDiv()}>
                        <span>&times;</span>
                    </span>
                </code>
            )}
        </React.Fragment>
    );
}

