import Moment from 'moment';
import React, { useState } from 'react';
import '../../css/ultimasAvaliacoes.css';

export default function Avaliacao(props) {
    // console.log(props);
    const [prop] = useState(props['props']);
    const [perfilUsuarioComentario] = useState(`/perfil/@${prop.usuarios.nomeUsuarioSistema}`);

    function segundosParaDHMS(seconds) {
        seconds = Number(seconds);
        var d = Math.floor(seconds / (3600 * 24));
        var h = Math.floor(seconds % (3600 * 24) / 3600);
        var m = Math.floor(seconds % 3600 / 60);
        var s = Math.floor(seconds % 60);

        var dDisplay = d > 0 ? d + (d === 1 ? ' dia' : ' dias') : '';
        var hDisplay = h > 0 ? h + (h === 1 ? ' hora' : ' horas') : '';
        var mDisplay = m > 0 ? m + (m === 1 ? ' minuto' : ' minutos') : '';
        var sDisplay = s > 0 ? s + (s === 1 ? ' segundo' : ' segundos') : '';

        var retorno = '';
        if (dDisplay) {
            retorno = dDisplay;
        } else if (hDisplay) {
            retorno = hDisplay;
        } else if (mDisplay) {
            retorno = mDisplay;
        } else if (sDisplay) {
            retorno = sDisplay;
        }

        // return seconds + ' - ' + dDisplay + hDisplay + mDisplay + sDisplay;
        return 'há ' + retorno;
    }

    var currentDate = Moment();
    var dataAjustadaPost = prop.data;
    var diferencaAgoraEDataComentario = Moment.duration(currentDate.diff(dataAjustadaPost));
    var diferencaEmSegundos = diferencaAgoraEDataComentario.asSeconds();
    const [dataAvaliacaoFinal] = useState(segundosParaDHMS(diferencaEmSegundos));

    return (
        <div className='comment-wrapper mt-1'>
            <div className='media-comment'>
                <div className='media-comment-body'>
                    <div className='media-option'>
                        <a className='ripple-grow' href={() => false}>
                            <svg className='ripple-icon' width='28' height='28' xmlns='http://www.w3.org/2000/svg' version='1.1' viewBox='0 0 24 24'>
                                <g fill='currentColor'>
                                    <circle cx='5' cy='12' r='2'></circle>
                                    <circle cx='12' cy='12' r='2'></circle>
                                    <circle cx='19' cy='12' r='2'></circle>
                                </g>
                            </svg>
                        </a>
                    </div>

                    <div className='media-comment-data-person'>
                        <a className='media-comment-name' href={perfilUsuarioComentario} target='_blank' rel='noreferrer'>
                            @{prop.usuarios.nomeUsuarioSistema}
                        </a>
                        <span className='text-muted'>Nota {prop.avaliacao}, {dataAvaliacaoFinal}</span>
                    </div>

                    <div className='media-comment-text'>{prop.comentario}</div>
                </div>
            </div>
        </div>
    );
}

