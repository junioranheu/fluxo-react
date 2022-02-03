import { Aviso } from '../../componentes/outros/aviso';

export const Fetch = {
    async getApi(url, token) {
        let respostaJson = '';
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        try {
            let resposta = await fetch(url, {
                method: 'GET',
                headers: headers
            });

            respostaJson = await resposta.json();
            // console.log(respostaJson);
        } catch (erro) {
            console.log(erro);
            Aviso.error('Houve uma falha na requisição ao servidor!', 5000);
        }

        return respostaJson;
    },

    postApi(props) {

    }
}
