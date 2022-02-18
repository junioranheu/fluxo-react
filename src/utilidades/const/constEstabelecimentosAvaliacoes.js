import { API_BASE_URL_DEV, API_BASE_URL_PROD } from '../../utilidades/utils/urlApi';

const ENDPOINTS = {
    GET_AVALIACOES_POR_ID: 'EstabelecimentosAvaliacoesApi/getAvaliacoesPorEstabelecimentoId',
    POST_CRIAR: 'EstabelecimentosAvaliacoesApi/criar',
    GET_AVALIACOES_POR_ID_USUARIO: 'EstabelecimentosAvaliacoesApi/getAvaliacoesPorUsuarioId',
};

const DEV = {
    API_URL_GET_AVALIACOES_POR_ID: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_AVALIACOES_POR_ID}`,
    API_URL_POST_AVALIAR: `${API_BASE_URL_DEV}/${ENDPOINTS.POST_CRIAR}`,
    API_URL_GET_AVALIACOES_POR_ID_USUARIO: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_AVALIACOES_POR_ID_USUARIO}`,
};

const PROD = {
    API_URL_GET_AVALIACOES_POR_ID: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_AVALIACOES_POR_ID}`,
    API_URL_POST_AVALIAR: `${API_BASE_URL_PROD}/${ENDPOINTS.POST_CRIAR}`,
    API_URL_GET_AVALIACOES_POR_ID_USUARIO: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_AVALIACOES_POR_ID_USUARIO}`,
};

// Definir se as constantes para a API é DEV ou PROD;
const CONSTANTS = process.env.NODE_ENV === 'development' ? DEV : PROD;

export default CONSTANTS;