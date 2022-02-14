import React, { useEffect, useRef, useState } from 'react';
import { Aviso } from '../../componentes/outros/aviso';
import CONSTANTS from '../../utilidades/const/constUsuarios';

// https://sankhadip.medium.com/how-to-upload-files-in-net-core-web-api-and-react-36a8fbf5c9e8
// https://thewebdev.info/2021/11/07/how-to-read-and-upload-a-file-in-react-using-custom-button/
export default function BotaoUparImagem() {
    const refBtnUpar = useRef();
    const [arquivo, setArquivo] = useState();

    function salvarTemporariamenteArquivo(e) {
        // console.log(e.target.files[0]);
        setArquivo(e.target.files[0]);
        // setFileName(e.target.files[0].name);
    }

    // Ao upar um arquivo;
    useEffect(() => {
        async function postUparImagem() {
            console.log(arquivo);
            const formData = new FormData();
            formData.append('formPasta', 'usuario');
            // formData.append('formId', '111');
            formData.append('fileName', arquivo);

            // Upar;
            const url = CONSTANTS.API_URL_POST_UPAR_IMAGEM;
            // Fetch para formData: https://stackoverflow.com/questions/41610811/react-js-how-to-send-a-multipart-form-data-to-server
            await fetch(url, {
                // mode: 'no-cors',
                method: 'POST',
                body: formData
            }).then(function (res) {
                console.log(res);

                if (res.ok) {
                    Aviso.success('Foto de perfil atualizada com sucesso', 5000);
                } else if (res.status === 401) {
                    Aviso.error('Erro 401!', 5000);
                }
            }, function (e) {
                console.log(e);
                Aviso.error('Algo deu errado ao upar esse arquivo!', 5000);
            });
        }

        if (arquivo) {
            // console.log(file);
            postUparImagem();
        }
    }, [arquivo]);

    return (
        <React.Fragment>
            <input type='button' value='Upar imagem' onClick={() => refBtnUpar.current.click()} />

            <input
                ref={refBtnUpar}
                onChange={salvarTemporariamenteArquivo}
                multiple={false}
                type='file'
                hidden
            />
        </React.Fragment>
    );
}

