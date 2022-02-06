const API_BASE_URL_DEV = 'https://localhost:7131/api';
const API_BASE_URL_PROD = 'https://fluxoapi.azurewebsites.net/api';

const ENDPOINTS = {
    GET_POR_ID: 'PostsApi',
    GET_POR_USUARIO_E_TIPO_POST_ID: 'PostsApi/getTodosPorUsuarioIdTipoPostId'
};

const DEV = {
    API_URL_GET_POR_ID: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_POR_ID}`,
    API_URL_GET_POR_USUARIO_E_TIPO_POST_ID: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_POR_USUARIO_E_TIPO_POST_ID}`
};

const PROD = {
    API_URL_GET_POR_ID: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_POR_ID}`,
    API_URL_GET_POR_USUARIO_E_TIPO_POST_ID: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_POR_USUARIO_E_TIPO_POST_ID}`
};

// Definir se as constantes para a API é DEV ou PROD;
const CONSTANTS = process.env.NODE_ENV === 'development' ? DEV : PROD;

export default CONSTANTS;