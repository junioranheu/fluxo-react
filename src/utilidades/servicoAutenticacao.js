
const servicoAutenticacao = {

    // Função para salar o usuário logado no local storage
    setUsuarioLogado(data) {
        const dadosUsuario = {
            nome: data.nomeCompleto,
            nomeUsuarioSistema: data.nomeUsuarioSistema,
            token: data.token
        };

        let parsedData = JSON.stringify(dadosUsuario);
        localStorage.setItem('user', parsedData);
    },

    // Função responsável por recuperar o usuário logado do local storage
    getUsuarioLogado() {
        let data = localStorage.getItem('user');

        if (!data) {
            return null
        }

        let dataJson = JSON.parse(data);
        // console.log(dataJson);
        return dataJson;
    }
}

export default servicoAutenticacao;