import { createContext, useState } from "react";

// Criar o contexto para usar no providar abaixo;
export const UsuarioContext = createContext();

// Provider: para "segurar" uma informação e passar para todos os componentes "child";
export const UsuarioProvider = props => {
    const [isAuth, setIsAuth] = useState(localStorage.getItem('usuarioAutenticado') !== null ? true : false);

    return (
        <UsuarioContext.Provider value={[isAuth, setIsAuth]}>
            {props.children}
        </UsuarioContext.Provider>
    );
}

// Funções referentes à autenticação do usuário;
export const Auth = {
    // Função para salar o usuário logado (local storage);
    setUsuarioLogado(data) {
        // console.log(data);
        const dadosUsuario = {
            nome: data.nomeCompleto,
            nomeUsuarioSistema: data.nomeUsuarioSistema,
            usuarioTipoId: data.usuarioTipoId,
            cidadeId: data.usuariosInformacoes.cidadeId,
            cidadeNome: data.usuariosInformacoes.cidades.nome,
            token: data.token
        };
        // console.log(dadosUsuario);

        let parsedData = JSON.stringify(dadosUsuario);
        localStorage.setItem('usuarioAutenticado', parsedData);
    },

    // Função responsável por recuperar os dados do usuário logado (local storage);
    getUsuarioLogado() {
        let data = localStorage.getItem('usuarioAutenticado');

        if (!data) {
            return null;
        }

        let dataJson = JSON.parse(data);
        // console.log(dataJson);
        return dataJson;
    },

    // "Deslogar" usuário;
    deleteUsuarioLogado() {
        localStorage.clear();
        // console.log('deslogado');
        // window.location.reload();
    }
}
