import NProgress from 'nprogress';
import React, { useEffect, useRef, useState } from 'react';
import { Aviso } from '../../componentes/outros/aviso';
import CONSTANTS from '../../utilidades/const/constUsuarios';
import { Auth } from '../../utilidades/context/usuarioContext';
import { Fetch } from '../../utilidades/utils/fetch';

// https://sankhadip.medium.com/how-to-upload-files-in-net-core-web-api-and-react-36a8fbf5c9e8
// https://thewebdev.info/2021/11/07/how-to-read-and-upload-a-file-in-react-using-custom-button/
export default function BotaoUparImagem(props) {
    console.log(props);
    const [usuarioId] = useState(props['props']);

    const refBtnUpar = useRef();
    const [arquivo, setArquivo] = useState();
    const [formPastaInfo] = useState('usuario');
    const [caminhoImagem, setCaminhoImagem] = useState('');

    // Dar trigger na em refBtnUpar para abrir prompt para escolher imagem; 
    useEffect(() => {
        if (props.submitAlterarFotoClicado) {
            refBtnUpar.current.click();
            props.handleClickAlterarFoto(false);
        }
    }, [props.submitAlterarFotoClicado]);

    function salvarTemporariamenteArquivo(e) {
        const arq = e.target.files[0];
        setArquivo(arq);

        // setar a variavel
        const caminhoNomeFinalVar = (formPastaInfo + '-' + usuarioId.toString() + '.' + arq.name.split('.').pop());
        setCaminhoImagem(caminhoNomeFinalVar);

        // Alterar o preview;
        props.onAlterar(arq, caminhoNomeFinalVar);
    }

    // Ao upar um arquivo;
    useEffect(() => {
        async function postUparImagem() {
            NProgress.start();
            // console.log(arquivo);
            const formData = new FormData();
            formData.append('formPasta', formPastaInfo);
            formData.append('formId', usuarioId.toString());
            formData.append('formFile', arquivo);

            // Upar imagem;
            const urlUparImagem = CONSTANTS.API_URL_POST_UPAR_IMAGEM;
            const token = Auth.getUsuarioLogado().token;
            let respostaNovoCaminho = await Fetch.postUparImagemApi(urlUparImagem, formData, token);
            if (!respostaNovoCaminho) {
                Aviso.error('Algo deu errado ao upar esse arquivo!', 5000);
                NProgress.done();
                return false;
            }

            // Atualizar caminho no banco, na tabela de usuários;
            // const caminhoImagem = (formPastaInfo + '-' + usuarioId.toString() + '.' + arquivo.name.split('.').pop()); // Montar o nome do arquivo atual (igual ao back-end);
            // console.log(caminhoImagem);
            const url = `${CONSTANTS.API_URL_POST_ATUALIZAR_FOTO_PERFIL}?usuarioId=${usuarioId.toString()}&caminhoImagem=${caminhoImagem}`;
            let resposta = await Fetch.postApi(url, '', token);
            if (resposta) {
                Aviso.success('Foto de perfil atualizada com sucesso', 5000);
                NProgress.done();
            } else {
                Aviso.error('Algo deu errado ao salvar o caminho do novo arquivo na base de dados!', 5000);
                NProgress.done();
            }
        }

        if (arquivo) {
            // console.log(file);
            postUparImagem();
        }
    }, [arquivo, usuarioId, formPastaInfo, caminhoImagem]);

    return (
        <React.Fragment>
            <input type='button' className={`button is-primary is-fullwidth ${props.className}`}
                value='Upar imagem' onClick={() => refBtnUpar.current.click()} />

            <input
                ref={refBtnUpar}
                onChange={salvarTemporariamenteArquivo}
                multiple={false}
                type='file'
                accept='image/*'
                hidden
            />
        </React.Fragment>
    );
}

