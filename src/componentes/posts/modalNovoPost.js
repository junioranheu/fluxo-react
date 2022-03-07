import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import BotaoUparMidia from '../outros/botaoUparMidia';

export default function ModalNovoPost(props) {
    // console.log(props);
    const refTitulo = useRef();
    const refConteudo = useRef();
    const refBtn = useRef();

    function fecharModal() {
        props.propsModalAberto(false);
    }

    // Ao alterar os valores dos inputs, insira os valores nas variaveis do formData;
    const [formData, setFormData] = useState(null);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Ao clicar no botão para entrar;
    async function handleSubmit(e) {

    };

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            refBtn.current.click();
        }
    }

    const [arquivo, setArquivo] = useState();
    function salvarTemporariamenteArquivo(arq) {
        setArquivo(arq);
    }

    useEffect(() => {
      console.log(arquivo);
    }, [arquivo]);

    return ReactDOM.createPortal(
        <div className='modal is-active sem-highlight'>
            {/* <div className='modal-background' onClick={() => fecharModal()}></div> */}
            <div className='modal-background'></div>

            <div className='modal-content' style={{ maxWidth: '80vh' }}>
                <section className='modal-card-body'>
                    <div className='modal-padding'>
                        <div>
                            <h3 className='image-name medium has-text-centered cor-principal'>Novo post</h3>
                            <hr />
                            <div className='pt-1 pb-1'>
                                <div className='field'>
                                    <label className='label'>Título</label>
                                    <div className='control has-icons-right'>
                                        <input className='input' type='text' name='titulo' placeholder='Título do novo post'
                                            onChange={handleChange} onKeyPress={handleKeyPress} ref={refTitulo}
                                        />
                                        <span className='icon is-small is-right'>
                                            <i className='fas fa-signature'></i>
                                        </span>
                                    </div>
                                </div>

                                <div className='field'>
                                    <label className='label'>Conteúdo</label>
                                    <textarea ref={refConteudo} name='conteudo' onChange={handleChange}
                                        className='textarea' placeholder={'Conteúdo do novo post'}
                                        style={{ resize: 'none', borderRadius: '10px' }}></textarea>
                                </div>

                                <div className='field'>
                                    <label className='label'>Mídia</label>
                                    <BotaoUparMidia handleArquivo={salvarTemporariamenteArquivo} />
                                </div>

                                <div className='has-text-centered mt-5'>
                                    <input ref={refBtn} onClick={handleSubmit} type='button' className='button is-vcentered is-primary is-fullwidth' value='Criar post' />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <button className='modal-close is-large' aria-label='close' onClick={() => fecharModal()}></button>
        </div>,
        document.getElementById('rootModal') // React portals: https://www.pluralsight.com/guides/how-to-get-a-component-from-anywhere-in-an-app-using-react
    );
}

