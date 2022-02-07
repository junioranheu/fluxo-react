import { API_BASE_URL_DEV, API_BASE_URL_PROD } from '../../utilidades/utils/urlApi';

const ENDPOINTS = {
    GET_TODOS: 'ReportsApi/todos',
    GET_POR_ID: 'ReportsApi/',
    POST_CRIAR: 'ReportsApi/criar',
};

const DEV = {
    API_URL_GET_TODOS: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_TODOS}`,
    API_URL_GET_POR_ID: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_POR_ID}`,
    API_URL_POST_CRIAR: `${API_BASE_URL_DEV}/${ENDPOINTS.POST_CRIAR}`
};

const PROD = {
    API_URL_GET_TODOS: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_TODOS}`,
    API_URL_GET_POR_ID: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_POR_ID}`,
    API_URL_POST_CRIAR: `${API_BASE_URL_PROD}/${ENDPOINTS.POST_CRIAR}`
};

// Definir se as constantes para a API é DEV ou PROD;
const CONSTANTS = process.env.NODE_ENV === 'development' ? DEV : PROD;

export default CONSTANTS;