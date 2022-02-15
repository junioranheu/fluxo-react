import moment from 'moment';

export const Validacao = {
    validarCPF(cpf) {
        // https://www.devmedia.com.br/validar-cpf-com-javascript/23916
        // https://pt.stackoverflow.com/questions/51340/como-validar-cpf-no-lado-do-cliente-com-script
        cpf = cpf.replace(/\D/g, '');
        let Resto;
        let i;
        let Soma = 0;
        if (cpf === '00000000000' || cpf === '11111111111' || cpf === '22222222222' ||
            cpf === '33333333333' || cpf === '44444444444' || cpf === '55555555555' ||
            cpf === '66666666666' || cpf === '77777777777' || cpf === '88888888888' ||
            cpf === '99999999999') {
            return false;
        }

        for (i = 1; i <= 9; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto === 10) || (Resto === 11)) Resto = 0;
        if (Resto !== parseInt(cpf.substring(9, 10))) return false;

        Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto === 10) || (Resto === 11)) Resto = 0;
        if (Resto !== parseInt(cpf.substring(10, 11))) return false;

        return true;
    },

    validarData(data) {
        let result = moment(data, 'DD/MM/YYYY', true).isValid();
        return result;
    },
}
