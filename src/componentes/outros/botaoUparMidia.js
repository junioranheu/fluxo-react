import React, { useState } from 'react';

// https://sankhadip.medium.com/how-to-upload-files-in-net-core-web-api-and-react-36a8fbf5c9e8
// https://thewebdev.info/2021/11/07/how-to-read-and-upload-a-file-in-react-using-custom-button/
export default function BotaoUparMidia(props) {
    const [nomeArquivo, setnomeArquivo] = useState();
    function salvarTemporariamenteArquivo(e) {
        const arq = e.target.files[0];
        setnomeArquivo(arq.name);
        props.handleArquivo(arq);
    }

    return (
        <div class='file has-name is-fullwidth'>
            <label class='file-label'>
                <input class='file-input' type='file' accept='image/*' multiple={false} onChange={salvarTemporariamenteArquivo} />

                <span class='file-cta'>
                    <span class='file-icon'>
                        <i class='fas fa-upload'></i>
                    </span>

                    <span class='file-label'>
                        Subir imagem
                    </span>
                </span>
                <span class='file-name'>
                    {nomeArquivo ? nomeArquivo : '...'}
                </span>
            </label>
        </div>
    );
}

