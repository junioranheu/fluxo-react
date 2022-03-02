import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import UrlImagemApi from '../../utilidades/utils/urlImagemApi';

export default function ModalPost(props) {
    // console.log(props);
    const [prop] = useState(props['props']);

    // Import dinâmico;
    let imagemDinamica = '';
    try {
        if (prop.midia) {
            imagemDinamica = `${UrlImagemApi}/${prop.midia}`;
        }

        // console.log(imagemDinamica);
    } catch (err) {
        // console.log('Imagem não existe');        
        // console.log(err);
    }

    function fecharModal() {
        props.propsModalAberto([]);
    }

    return ReactDOM.createPortal(
        <div className='modal is-active sem-highlight'>
            <div className='modal-background' onClick={() => fecharModal()}></div>

            <div className='modal-content' style={{ maxWidth: '80vh' }}>
                <section className='modal-card-body'>
                    <div className='modal-padding'>
                        <div>
                            <h3 className='image-name medium has-text-centered cor-principal'><span dangerouslySetInnerHTML={{ __html: prop.titulo }}></span></h3>
                            <hr />
                            <div className='pt-1 pb-1'>
                                <h5 className='image-subtext cor-preto medium'><span dangerouslySetInnerHTML={{ __html: prop.conteudo }}></span></h5>
                            </div>
                        </div>

                        {
                            imagemDinamica.length > 0 && (
                                <React.Fragment>
                                    <hr />
                                    <div className='imagem-modal'>
                                        {/* <img src={imagemDinamica} loading='lazy' onError={(event) => event.target.src = SemImagemSmile} alt='' /> */}
                                        <img src={imagemDinamica} loading='lazy' alt='' />
                                    </div>
                                </React.Fragment>
                            )
                        }
                    </div>
                </section>
            </div>

            <button className='modal-close is-large' aria-label='close' onClick={() => fecharModal()}></button>
        </div>,
        document.getElementById('rootModal') // React portals: https://www.pluralsight.com/guides/how-to-get-a-component-from-anywhere-in-an-app-using-react
    );
}

