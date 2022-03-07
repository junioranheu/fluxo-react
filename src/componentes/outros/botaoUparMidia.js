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
        <div className='file has-name is-fullwidth'>
            <label className='file-label'>
                <input className='file-input' type='file' accept='image/*' multiple={false} onChange={salvarTemporariamenteArquivo} />

                <span className='file-cta'>
                    <span className='file-icon'>
                        <i className='fas fa-upload'></i>
                    </span>

                    <span className='file-label'>
                        Subir imagem
                    </span>
                </span>
                <span className='file-name'>
                    {nomeArquivo ? nomeArquivo : '...'}
                </span>
            </label>
        </div>
    );
}

