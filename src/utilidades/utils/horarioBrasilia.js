import Moment from 'moment-timezone';

const timezone = 'America/Sao_Paulo';
const horarioBrasilia = Moment.tz(Moment(), timezone);
// console.log(horarioBrasilia);

export default horarioBrasilia;