import NProgress from 'nprogress';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ShimmerThumbnail } from 'react-shimmer-effects';
import { Aviso } from '../../componentes/outros/aviso';
import AvisoNenhumRegistro from '../../componentes/outros/avisoNenhumRegistro';
import InputFiltroPrincipal from '../../componentes/outros/inputFiltroPrincipal';
import Item from '../../componentes/outros/item';
import CONSTANTS_ESTABELECIMENTOS from '../../utilidades/const/constEstabelecimentos';
import CONSTANTS_TIPOS_ESTABELECIMENTOS from '../../utilidades/const/constTiposEstabelecimentos';
import { Auth, UsuarioContext } from '../../utilidades/context/usuarioContext';
import { Fetch } from '../../utilidades/fetch/fetch';

export default function Estabelecimento() {
    const [isAuth] = useContext(UsuarioContext); // Contexto do usuário;
    const [urlPagina] = useState(window.location.pathname);
    const [parametroTipoEstabelecimentoId] = useState(urlPagina.substring(urlPagina.lastIndexOf('/') + 1));
    const [cidadeNome] = useState(isAuth ? Auth.getUsuarioLogado().cidadeNome : '');
    const [titulo, setTitulo] = useState(null);

    // Refs;
    const divLoadingEstabelecimentos = useRef(null);

    // Get estabelecimentos por tipo de estabelecimento;
    const [estabelecimentos, setEstabelecimentos] = useState([]);

    // Verificar se a busca do usuário encontrou algo;
    const [isMostrarNaoEncontrouResultados, setIsMostrarNaoEncontrouResultados] = useState(false);
    useEffect(() => {
        if (estabelecimentos.length > 0) {
            const itens = divLoadingEstabelecimentos.current?.innerText;
            // console.log(itens.length);

            if (!itens) {
                // console.log('NOPE');
                setIsMostrarNaoEncontrouResultados(true);
            }
            else {
                // console.log('YES');
                setIsMostrarNaoEncontrouResultados(false);
            }
        }
    });

    // Ao carregar página;
    useEffect(() => {
        async function getDetalheTipoEstabelecimento() {
            NProgress.start();

            // Pegar o parâmetro da URL;
            const url = `${CONSTANTS_TIPOS_ESTABELECIMENTOS.API_URL_GET_POR_ID}/${parametroTipoEstabelecimentoId}`;
            // console.log(url);

            let resposta = await Fetch.getApi(url);
            if (resposta) {
                const titulo = `Encontre ${resposta.genero} <span class='grifar'>${resposta.tipo.toLowerCase()}</span> perfeit${resposta.genero}`;
                setTitulo(!cidadeNome ? titulo : (`${titulo} em <span class='grifar'>${cidadeNome}</span>`));
                document.title = 'Fluxo — ' + resposta.tipo;

                NProgress.done();
            } else {
                Aviso.error('Algo deu errado<br/>Consulte o F12!', 5000);
            }
        }

        async function getEstabelecimentos() {
            NProgress.start();
            setLoadingEstabelecimentos(true);

            const cidadeIdUsuarioLogado = (isAuth ? Auth.getUsuarioLogado().cidadeId : 0);

            const url = `${CONSTANTS_ESTABELECIMENTOS.API_URL_GET_POR_TIPO_ID_MAIS_SIGLA_ESTADO_USUARIO}?id=${parametroTipoEstabelecimentoId}&cidadeIdUsuarioLogado=${cidadeIdUsuarioLogado}`;
            // console.log(url);

            let resposta = await Fetch.getApi(url);
            if (resposta) {
                // console.log(resposta);
                // console.log(cidadeIdUsuarioLogado);
                if (!resposta.length && cidadeIdUsuarioLogado > 0) {
                    Aviso.error('Algo deu errado<br/>Não existe um estabelecimento desse tipo na sua cidade!', 8000);
                    setIsMostrarNaoEncontrouResultados(true);
                }

                if (!resposta.length && cidadeIdUsuarioLogado === 0) {
                    Aviso.error('Algo deu errado<br/>Nenhum estabelecimento foi vinculado a esse tipo de estabelecimento ainda!', 8000);
                    setIsMostrarNaoEncontrouResultados(true);
                }

                setEstabelecimentos(resposta);
                setLoadingEstabelecimentos(false);
                NProgress.done();
            } else {
                Aviso.error('Algo deu errado<br/>Consulte o F12!', 5000);
            }
        }

        // Pegar os detalhes do tipo de estabelecimento buscado;
        getDetalheTipoEstabelecimento();

        // Pegar todos os estabelecimentos;
        getEstabelecimentos();
    }, [cidadeNome, isAuth, parametroTipoEstabelecimentoId])

    // Filtro de busca (input);
    const [inputFiltro, setInputFiltro] = useState('');
    function handleInputFiltro(e) {
        setInputFiltro(e);
    }

    // Pegar o width do #ref={divLoadingTiposEstabelecimentos} para saber o width dos ShimmerThumbnail;
    const [loadingEstabelecimentos, setLoadingEstabelecimentos] = useState(false);
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
                {isMostrarNaoEncontrouResultados && (
                    <AvisoNenhumRegistro />
                )}

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

                        {estabelecimentos.map((estabelecimento) => (
                            <React.Fragment key={estabelecimento.estabelecimentoId} >
                                {
                                    (inputFiltro.length === 0) ? (
                                        <Item id={estabelecimento.estabelecimentoId} thumbnail={estabelecimento.thumbnail}
                                            href={`/estabelecimento/${estabelecimento.estabelecimentoId}`}
                                            titulo={estabelecimento.nome} descricao={estabelecimento.descricao}
                                            avaliacao={estabelecimento.avaliacao}
                                        />
                                    ) : (
                                        ((estabelecimento.nome.toLowerCase().includes(inputFiltro.toLowerCase()) || estabelecimento.descricao.toLowerCase().includes(inputFiltro.toLowerCase())) && (
                                            <Item id={estabelecimento.estabelecimentoId} thumbnail={estabelecimento.thumbnail}
                                                href={`/estabelecimento/${estabelecimento.estabelecimentoId}`}
                                                titulo={estabelecimento.nome} descricao={estabelecimento.descricao}
                                                avaliacao={estabelecimento.avaliacao} />
                                        ))
                                    )
                                }
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </section>
        </section>
    );
}

