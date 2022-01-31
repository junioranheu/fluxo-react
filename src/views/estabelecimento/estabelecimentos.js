import NProgress from 'nprogress';
import React, { useEffect, useRef, useState } from 'react';
import { ShimmerThumbnail } from 'react-shimmer-effects';
import { Aviso } from '../../componentes/outros/aviso';
import InputFiltroPrincipal from '../../componentes/outros/inputFiltroPrincipal';
import CONSTANTS_ESTABELECIMENTOS from '../../utilidades/const/constEstabelecimentos';
import CONSTANTS_TIPOS_ESTABELECIMENTOS from '../../utilidades/const/constTiposEstabelecimentos';
import { Auth } from '../../utilidades/context/usuarioContext';

export default function Estabelecimento() {
    // Import dinâmico;
    // const imagemDinamica = require('../../' + (prop.imagem));

    const [urlPagina] = useState(window.location.pathname);
    const [parametroTipoEstabelecimentoId] = useState(urlPagina.substring(urlPagina.lastIndexOf('/') + 1));
    const [cidadeNome] = useState(Auth.getUsuarioLogado().cidadeNome);
    const [titulo, setTitulo] = useState(null);

    function getDetalheTipoEstabelecimento() {
        NProgress.start();

        // Pegar o parâmetro da URL;
        const url = `${CONSTANTS_TIPOS_ESTABELECIMENTOS.API_URL_GET_POR_ID}/${parametroTipoEstabelecimentoId}`;
        // console.log(url);

        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(data => data.json())
            .then(data => {
                // console.log(data);
                const titulo = `Encontre ${data.genero} ${data.tipo.toLowerCase()} perfeit${data.genero}`;
                setTitulo(!cidadeNome ? titulo : (`${titulo} em <span class='grifar'>${cidadeNome}</span>`));

                NProgress.done();
            })
            .catch((error) => {
                console.log(error);
                Aviso.error('Algo deu errado<br/>Consulte o F12!', 5000);
            });
    }

    // Get estabelecimentos por tipo de estabelecimento;
    const [estabelecimentos, setEstabelecimentos] = useState([]);
    function getEstabelecimentos() {
        NProgress.start();
        setLoadingEstabelecimentos(true);

        const cidadeIdUsuarioLogado = Auth.getUsuarioLogado().cidadeId;

        const url = `${CONSTANTS_ESTABELECIMENTOS.API_URL_GET_POR_TIPO_ID_MAIS_SIGLA_ESTADO_USUARIO}?id=${parametroTipoEstabelecimentoId}&cidadeIdUsuarioLogado=${cidadeIdUsuarioLogado}`;
        // console.log(url);

        fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(data => data.json())
            .then(data => {
                // console.log(data);
                // console.log(cidadeIdUsuarioLogado);
                if (!data.length && cidadeIdUsuarioLogado > 0) {
                    console.log('NÃO TEM ESTABELECIMENTO NA CIDADE ' + cidadeIdUsuarioLogado);
                }

                if (!data.length && cidadeIdUsuarioLogado === 0) {
                    console.log('NÃO TEM ESTABELECIMENTO NO TIPO ' + parametroTipoEstabelecimentoId);
                }

                setEstabelecimentos(data);
                setLoadingEstabelecimentos(false);
                NProgress.done();
            })
            .catch((error) => {
                console.log(error);
                Aviso.error('Algo deu errado<br/>Consulte o F12!', 5000);
            });
    }

    // Ao carregar página;
    useEffect(() => {
        // Pegar os detalhes do tipo de estabelecimento buscado;
        getDetalheTipoEstabelecimento();

        // Pegar todos os estabelecimentos;
        getEstabelecimentos();
    }, [])

    // Filtro de busca (input);
    const [inputFiltro, setInputFiltro] = useState('');
    function handleInputFiltro(e) {
        setInputFiltro(e);
    }

    // Pegar o width do #ref={divLoadingTiposEstabelecimentos} para saber o width dos ShimmerThumbnail;
    const [loadingEstabelecimentos, setLoadingEstabelecimentos] = useState(false);
    const divLoadingEstabelecimentos = useRef(null);
    const [widthLoadingTiposEstabelecimentos, setWidthLoadingEstabelecimentos] = useState(0);
    useEffect(() => {
        // Pegar o width da div pai do loading dos tipos de estabelecimentos;
        const widthdivLoadingEstabelecimentos = divLoadingEstabelecimentos.current ? divLoadingEstabelecimentos.current.offsetWidth : 0;
        const qtdDivsMostradas = 4;
        const widthRespaldo = 15;
        const widthLoading = (widthdivLoadingEstabelecimentos / qtdDivsMostradas) - widthRespaldo;
        // console.log(widthLoading);
        setWidthLoadingEstabelecimentos(widthLoading);
    }, []);

    return (
        <section className='mt-6'>
            {/* Título */}
            <section className='content-section mt-4'>
                <h1 className='titulo' dangerouslySetInnerHTML={{ __html: titulo }}></h1>
            </section>

            {/* Campo de busca */}
            <div className='main-area-header mt-3'>
                <InputFiltroPrincipal onInput={handleInputFiltro} placeholder='Filtre os tipos de estabelecimentos aqui também...' />
            </div>

            {/* Estabelecimentos */}
            <section className='content-section mt-6'>
                <div className='section-part mt-3'>
                    <div className='content-part-line' ref={divLoadingEstabelecimentos}>
                        {/* Loading */}
                        {loadingEstabelecimentos && (
                            <React.Fragment>
                                <ShimmerThumbnail height={widthLoadingTiposEstabelecimentos} width={widthLoadingTiposEstabelecimentos} className='m-0' rounded />
                                <ShimmerThumbnail height={widthLoadingTiposEstabelecimentos} width={widthLoadingTiposEstabelecimentos} className='m-0' rounded />
                                <ShimmerThumbnail height={widthLoadingTiposEstabelecimentos} width={widthLoadingTiposEstabelecimentos} className='m-0' rounded />
                                <ShimmerThumbnail height={widthLoadingTiposEstabelecimentos} width={widthLoadingTiposEstabelecimentos} className='m-0' rounded />
                            </React.Fragment>
                        )}

                        {/* @{
                        if (Model.Count() > 0)
                        {
                            foreach(var e in Model.Where(a => a.IsAtivo == 1))
                        {
                            string thumbnail = '/static/' + e.Thumbnail;
                        string caminhoEstabelecimento = '/estabelecimento/' + e.EstabelecimentoId;

                        <a className='image-wrapper' data-nome='@e.Nome' data-desc='@e.Descricao' href='@caminhoEstabelecimento'>
                            <div className='image-overlay'>
                                <div className='image-info'>
                                    <div className='image-info-text'>
                                        <h5 className='image-name medium cor-principal'>@e.Nome</h5>
                                        <p className='image-subtext tiny'>@e.Descricao</p>
                                    </div>
                                    @* <button className='btn-play'></button>*@
                                </div>
                            </div>

                            @{
                                string avaliacao = (e.Avaliacao > 0) ? e.Avaliacao.ToString() : 'Sem avaliação';
                                        string tituloAvaliacao = (e.Avaliacao > 0) ? 'Nota ' + e.Avaliacao + ' de 5' : 'Sem avaliação';
                                    }

                            <img src='@thumbnail' loading='lazy' width='1' height='1' onerror='this.src='/static/outro/sem-imagem.webp';' />
                            <span className='image-icone'>
                                <span title='@tituloAvaliacao'>
                                    <i className='fas fa-star'></i>&nbsp;@avaliacao
                                </span>
                            </span>
                        </a>
                            }
                        }
                    } */}
                    </div>
                </div>
            </section>
        </section>
    );
}

