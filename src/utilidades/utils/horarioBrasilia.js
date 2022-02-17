import Moment from 'moment-timezone';

function horarioBrasilia() {
    const timezone = 'America/Sao_Paulo';
    const horarioBrasilia = Moment.tz(Moment(), timezone);
    // console.log(horarioBrasilia);
    return horarioBrasilia;
}

export default horarioBrasilia;