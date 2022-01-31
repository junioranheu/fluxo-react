const API_BASE_URL_DEV = 'https://localhost:7131/api';
const API_BASE_URL_PROD = 'https://fluxoapi.azurewebsites.net/api';

const ENDPOINTS = {
    GET_TODOS: 'EstabelecimentosTiposApi/todos',
    GET_POR_ID: 'EstabelecimentosTiposApi',
};

const DEV = {
    API_URL_GET_TODOS: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_TODOS}`,
    API_URL_GET_POR_ID: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_POR_ID}`
};

const PROD = {
    API_URL_GET_TODOS: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_TODOS}`,
    API_URL_GET_POR_ID: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_POR_ID}`
};

// Definir se as constantes para a API é DEV ou PROD;
const CONSTANTS = process.env.NODE_ENV === 'development' ? DEV : PROD;

export default CONSTANTS;