
const API_BASE_URL_IMAGEM_DEV = 'https://localhost:7131/Upload';
const API_BASE_URL_IMAGEM_PROD = 'https://fluxoapi.azurewebsites.net/Upload';

// Definir se a url para as imagens da API é DEV ou PROD;
const urlImagemApi = process.env.NODE_ENV === 'development' ? API_BASE_URL_IMAGEM_DEV : API_BASE_URL_IMAGEM_PROD;

export default urlImagemApi;

