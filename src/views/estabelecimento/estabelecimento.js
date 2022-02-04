import React, { useState } from 'react';

export default function Estabelecimento() {
    const [urlPagina] = useState(window.location.pathname);
    const [parametroTipoEstabelecimentoId] = useState(urlPagina.substring(urlPagina.lastIndexOf('/') + 1));

    return (
        <div>
            <h2>Estabelecimento {parametroTipoEstabelecimentoId}</h2>
        </div>
    );
}

