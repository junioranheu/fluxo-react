
const servicoAutenticacao = {
    // Função para salar o usuário logado (local storage);
    setUsuarioLogado(data) {
        // console.log(data);
        const dadosUsuario = {
            nome: data.nomeCompleto,
            nomeUsuarioSistema: data.nomeUsuarioSistema,
            usuarioTipoId: data.usuarioTipoId,
            token: data.token
        };

        let parsedData = JSON.stringify(dadosUsuario);
        localStorage.setItem('usuarioAutenticado', parsedData);
    },

    isUsuarioLogado() {
        let data = localStorage.getItem('usuarioAutenticado');

        if (!data) {
            return false;
        }

        return true;
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
        console.log('deslogado');
        window.location.reload();
    }
}

export default servicoAutenticacao;