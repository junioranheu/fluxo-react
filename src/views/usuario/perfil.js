import NProgress from 'nprogress';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Aviso } from '../../componentes/outros/aviso';
import '../../css/perfilEstabelecimento.css';
import CONSTANTS_USUARIOS from '../../utilidades/const/constUsuarios';
import { Fetch } from '../../utilidades/utils/fetch';

export default function Perfil() {
    const navigate = useNavigate();
    const [urlPagina] = useState(window.location.pathname);
    const [parametroPerfilUsuario] = useState(urlPagina.substring(urlPagina.lastIndexOf('@') + 1));

    const [detalhesPerfil, setDetalhesPerfil] = useState([]);
    useEffect(() => {
        async function getDetalhesPerfilUsuario() {
            NProgress.start();

            // Pegar o parâmetro da URL;
            const url = `${CONSTANTS_USUARIOS.GET_POR_NOME_USUARIO_SISTEMA}?nomeUsuarioSistema=${parametroPerfilUsuario}`;
            // console.log(url);

            let resposta = await Fetch.getApi(url);
            // console.log(resposta);
            if (resposta) {
                setDetalhesPerfil(resposta);
                NProgress.done();
            } else {
                Aviso.error(`Algo deu errado ao consultar os detalhes do usuário @${parametroPerfilUsuario}!`, 5000);
                navigate('/sem-acesso', { replace: true });
            }
        }

        // Pegar os detalhes do usuário em questão;
        getDetalhesPerfilUsuario();
    }, []);
    // console.log(detalhesPerfil);

    if (detalhesPerfil.length < 1) {
        return null;
    }

    return (
        <div className='mt-4'>
            <span>
                dataCriacao: {detalhesPerfil.dataCriacao}<br />
                dataOnline: {detalhesPerfil.dataOnline}<br />
                email: {detalhesPerfil.email}<br />
                foto: {detalhesPerfil.foto}<br />
                isAtivo: {detalhesPerfil.isAtivo}<br />
                isPremium: {detalhesPerfil.isPremium}<br />
                nomeCompleto: {detalhesPerfil.nomeCompleto}<br />
                nomeUsuarioSistema: {detalhesPerfil.nomeUsuarioSistema}<br />
                usuarioId: {detalhesPerfil.usuarioId}<br />
                usuarioTipoId: {detalhesPerfil.usuarioTipoId}<br />
                usuarioTipos.tipo: {detalhesPerfil.usuarioTipos.tipo}<br />
                usuarioTipos.descricao: {detalhesPerfil.usuarioTipos.descricao}<br />

                {
                    detalhesPerfil.usuariosInformacoes && (
                        <React.Fragment>
                            usuariosInformacoes.bairro: {detalhesPerfil.usuariosInformacoes.bairro}<br />
                            usuariosInformacoes.cep: {detalhesPerfil.usuariosInformacoes.cep}<br />
                            usuariosInformacoes.cidadeId: {detalhesPerfil.usuariosInformacoes.cidadeId}<br />
                            usuariosInformacoes.cpf: {detalhesPerfil.usuariosInformacoes.cpf}<br />
                            usuariosInformacoes.dataAniversario: {detalhesPerfil.usuariosInformacoes.dataAniversario}<br />
                            usuariosInformacoes.genero: {detalhesPerfil.usuariosInformacoes.genero}<br />
                            usuariosInformacoes.numeroResidencia: {detalhesPerfil.usuariosInformacoes.numeroResidencia}<br />
                            usuariosInformacoes.rua: {detalhesPerfil.usuariosInformacoes.rua}<br />
                            usuariosInformacoes.telefone: {detalhesPerfil.usuariosInformacoes.telefone}
                        </React.Fragment>
                    )
                }
            </span>
        </div>
    );
}


