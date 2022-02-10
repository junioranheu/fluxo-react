import HorarioBrasilia from '../../utilidades/utils/horarioBrasilia';

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
            const e = {
                'url': url,
                'token': token,
                'erro': erro.message,
                'data': HorarioBrasilia.format('YYYY-MM-DD HH:mm:ss')
            }

            console.table(e);
            // Aviso.error('Houve uma falha na requisição GET ao servidor!', 5000);
        }

        return respostaJson;
    },

    async postApi(url, body, token) {
        let respostaJson = '';
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        try {
            let resposta = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            });

            respostaJson = await resposta.json();
            // console.log(respostaJson);
        } catch (erro) {
            const e = {
                'url': url,
                'body': body,
                'token': token,
                'erro': erro.message,
                'data': HorarioBrasilia.format('YYYY-MM-DD HH:mm:ss')
            }

            console.table(e);
            // Aviso.error('Houve uma falha na requisição POST ao servidor!', 5000);
        }

        return respostaJson;
    }
}
