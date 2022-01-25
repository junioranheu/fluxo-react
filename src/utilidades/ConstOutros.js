const API_BASE_URL_DEV = 'https://localhost:7131/api';
const API_BASE_URL_PROD = 'https://fluxoapi.azurewebsites.net/api';

const ENDPOINTS = {
    GET_AUTENTICAR: 'UsuariosApi/autenticar'
};

const DEV = {
    API_URL_GET_AUTENTICAR: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_AUTENTICAR}`
};

const PROD = {
    API_URL_GET_AUTENTICAR: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_AUTENTICAR}`
};

// Definir se as constantes para a API é DEV ou PROD;
const CONSTANTS = process.env.NODE_ENV === 'development' ? DEV : PROD;

export default CONSTANTS;