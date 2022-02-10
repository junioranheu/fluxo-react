import moment from 'moment-timezone';

const format = 'YYYY-M-D HH:mm:ss';
const timezone = 'America/Sao_Paulo';
// const horarioBrasilia = moment.tz(moment(), format, timezone);
const horarioBrasilia = moment.tz(moment(), timezone).format(format);
// console.log(horarioBrasilia);

export default horarioBrasilia;