import React from 'react';
import '../../css/artigo.css';
import SemImagem from '../../static/outro/sem-imagem.webp';
import HeroZika from './heroZika';

export default function Artigo(props) {
    function renderizarDivArtigo(props) {
        // https://dev.to/duomly/how-to-use-loop-in-react-js-ael
        const list = [];

        Object.keys(props.conteudo).forEach((key) => {
            const cont = props.conteudo[key].cont;
            const titulo = props.conteudo[key].titulo;

            list.push(
                <React.Fragment key={key}>
                    <div className='has-text-centered mt-6'>
                        <p className='title article-title'>
                            <span dangerouslySetInnerHTML={{ __html: titulo }}></span></p>
                    </div>

                    <div className='mt-3' dangerouslySetInnerHTML={{ __html: cont }}></div>
                </React.Fragment>
            );
        });

        return (
            <div>
                {list}
            </div>
        );
    }

    return (
        <React.Fragment>
            <HeroZika />

            <section className='section mt-6'>
                <div className='container'>
                    <div className='columns'>
                        <div className='column is-12'>
                            <div className='card article box'>
                                <div className='card-content'>
                                    <div className='media'>
                                        <div className='media-center'>
                                            <img src='' className='author-image' onError={(event) => event.target.src = SemImagem} alt='Erro' />
                                        </div>

                                        <div className='media-content has-text-centered mt-4'>
                                            <h2 className='mt-4 title is-3'>.</h2>

                                            <p className='subtitle is-6 article-subtitle mt-1'>
                                                <a href={`/perfil/${props.nomeUsuarioPostador}`} className='cor-principal'>{props.nomeUsuarioPostador}</a> {props.dataPost}
                                            </p>
                                        </div>
                                    </div>

                                    <hr />

                                    <div className='content article-body'>
                                        {/* Conte??do do artigo */}
                                        {props && renderizarDivArtigo(props)}

                                        <div className='mt-6'>
                                            <hr />
                                        </div>

                                        <div className='has-text-centered mt-6'>
                                            <a className='button is-primary' href='/'>Voltar</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}