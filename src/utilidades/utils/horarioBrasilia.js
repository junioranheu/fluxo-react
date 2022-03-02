import Moment from 'moment-timezone';

function horarioBrasilia() {
    const timezone = 'America/Sao_Paulo';
    Moment.tz.setDefault(timezone);
    const horarioBrasilia = moment().tz();
    // console.log(horarioBrasilia);
    return horarioBrasilia;
}

export default horarioBrasilia;