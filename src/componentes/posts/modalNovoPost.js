import NProgress from 'nprogress';
import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import CONSTANTS from '../../utilidades/const/constPosts';
import { Auth } from '../../utilidades/context/usuarioContext';
import { Fetch } from '../../utilidades/utils/fetch';
import { Aviso } from '../outros/aviso';
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
    const formIniciar = {
        titulo: '',
        conteudo: ''
    }
    const [formData, setFormData] = useState(formIniciar);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const [arquivo, setArquivo] = useState();
    function salvarTemporariamenteArquivo(arq) {
        setArquivo(arq);
    }

    // Ao clicar no botão para criar post;
    async function handleSubmit(e) {
        NProgress.start();
        refBtn.current.disabled = true;
        e.preventDefault();

        if (!formData || !formData.titulo || !formData.conteudo) {
            NProgress.done();
            Aviso.error('Você deve preencher o título e o conteúdo do seu novo post!', 5000);
            refBtn.current.disabled = false;
            return false;
        }

        // console.log(arquivo);
        const formNovoPost = new FormData();
        formNovoPost.append('formPasta', 'posts');
        formNovoPost.append('formUsuarioId', props['props'].usuarioId.toString());
        formNovoPost.append('formFile', arquivo);

        // Upar imagem;
        const urlNovoPost = CONSTANTS.API_URL_POST_NOVO_POST;
        const token = Auth.getUsuarioLogado().token;
        let respostaNovoCaminho = await Fetch.postUparImagemApi(urlNovoPost, formNovoPost, token);
        if (!respostaNovoCaminho) {
            Aviso.error('Algo deu errado ao criar seu novo post!', 5000);
            NProgress.done();
            return false;
        }

        Aviso.success('Novo post criado com sucesso', 5000);
        NProgress.done();
    };

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            refBtn.current.click();
        }
    }

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
                                    <textarea className='textarea' name='conteudo' placeholder={'Conteúdo do novo post'}
                                        ref={refConteudo} onChange={handleChange}
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

