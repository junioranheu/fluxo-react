import React, { useEffect } from 'react';
import Artigo from '../../componentes/outros/artigo';

const nomeUsuarioPostador = '@adm';
const dataPost = 'em 30 de janeiro, 2022';

const conteudo = [
    {
        'titulo': 'Sobre o Fluxo',
        'cont': `<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.</p>
            <p>Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.</p>
            <p>Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui.</p>
            <p>Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat.</p>
            <p>Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>`
    },
    {
        'titulo': 'Sobre os criadores',
        'cont': `
                    <div class='mt-3'>
                        <h3 class='is-size-5'>Quem são?</h3>
                        <p>Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat.</p>
                    </div>

                    <div class='mt-5'>
                        <h3 class='is-size-5'>xxx</h3>
                        <p>Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat.</p>
                    </div>

                    <div class='mt-5'>
                        <h3 class='is-size-5'>xxx</h3>
                        <p>Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat.</p>
                    </div>`
    }
];

export default function Sobre() {
    // Ao carregar página;
    useEffect(() => {
        document.title = 'Fluxo — Sobre'
    }, []);

    return (
        <div>
            <Artigo
                nomeUsuarioPostador={nomeUsuarioPostador}
                dataPost={dataPost}
                conteudo={conteudo}
            />
        </div>
    );
}