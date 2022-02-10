import moment from 'moment-timezone';

const timezone = 'America/Sao_Paulo';
const horarioBrasilia = moment.tz(moment(), timezone);
// console.log(horarioBrasilia);

export default horarioBrasilia;