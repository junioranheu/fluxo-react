import React, { useEffect, useState } from 'react';
import '../../css/avaliar.css';
import ImgAvaliacao from '../../static/svg/avaliacao.svg';

export default function Avaliar() {
    const [valorSlider, setValorSlider] = useState(60);
    const [isMostrarAvaliar, setIsMostrarAvaliar] = useState(false);
    const [classeRange, setClasseRange] = useState('good');
    const [gradientGrey, setGradientGrey] = useState('0');
    const [gradientStop, setGradientStop] = useState('');

    let colorBad = '#ff5722';
    let colorOk = '#3f51b5';
    let colorGood = '#36d896';
    let colorGreat = 'var(--cor-principal)';

    useEffect(() => {
        checkSliderValue();
    }, []);

    function handleChangeSlider(e) {
        let valorSlider = e.target.value;

        if (valorSlider >= 0 && valorSlider <= 100) {
            setValorSlider(valorSlider);
            setIsMostrarAvaliar(true);
            checkSliderValue();
        }
    }

    function checkSliderValue() {
        setGradientGrey((100 - valorSlider));

        if (valorSlider > 0 && valorSlider <= 25) {
            setClasseRange('bad');
            setGradientStop(colorBad);
        }

        if (valorSlider > 25 && valorSlider <= 50) {
            setClasseRange('ok');
            setGradientStop(colorOk);
        }

        if (valorSlider > 50 && valorSlider <= 75) {
            setClasseRange('good');
            setGradientStop(colorGood);
        }

        if (valorSlider > 75 && valorSlider <= 100) {
            setClasseRange('great');
            setGradientStop(colorGreat);
        }
    }

    function hadleCancelarAvaliacao() {
        setValorSlider(60);
        setIsMostrarAvaliar(false);
    }

    return (
        <div className='card-avaliacao sem-highlight'>
            <div className='columns'>
                <div className='column is-half'>
                    <div className={`row ${classeRange}`}>
                        <div className='icon'>
                            <svg id='icon-bad' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 103.696 103.695'>
                                <path d='M75.835,72.818c0.656,1.521-0.043,3.287-1.563,3.945s-3.286-0.043-3.944-1.563c-2.894-6.688-9.729-11.013-17.42-11.013 c-7.869,0-14.748,4.32-17.523,11.006c-0.48,1.152-1.596,1.85-2.771,1.852c-0.385,0-0.773-0.074-1.15-0.23 c-1.531-0.637-2.256-2.393-1.619-3.922c3.709-8.933,12.764-14.703,23.064-14.703C62.993,58.189,71.993,63.932,75.835,72.818z M28.452,36.484c-0.676-1.176-0.27-2.676,0.906-3.351l9.045-5.196c1.176-0.674,2.676-0.268,3.352,0.907 c0.676,1.176,0.27,2.676-0.906,3.351l-9.045,5.194C30.626,38.065,29.126,37.66,28.452,36.484z M42.487,36.59 c1.688,1.689,1.688,4.429,0,6.115c-1.688,1.688-4.426,1.688-6.117-0.002c-1.688-1.688-1.688-4.426,0-6.113 C38.059,34.901,40.797,34.901,42.487,36.59z M57.188,21.907c0.121-1.35,1.312-2.347,2.662-2.226l10.391,0.934 c1.35,0.121,2.348,1.313,2.225,2.664c-0.121,1.351-1.312,2.347-2.664,2.225l-10.389-0.933 C58.063,24.45,57.065,23.256,57.188,21.907z M68.28,36.519c1.688,1.688,1.688,4.426,0,6.113c-1.691,1.69-4.43,1.69-6.117,0.002 c-1.688-1.687-1.688-4.426,0-6.115C63.852,34.829,66.59,34.829,68.28,36.519z M85.465,103.695H18.23 C8.178,103.695,0,95.518,0,85.465V18.23C0,8.177,8.179,0,18.23,0h67.235c10.053,0,18.229,8.178,18.229,18.23v67.235 C103.696,95.518,95.518,103.695,85.465,103.695z M18.23,8.577c-5.322,0-9.652,4.33-9.652,9.652v67.234 c0,5.322,4.33,9.652,9.652,9.652h67.235c5.321,0,9.651-4.33,9.651-9.652V18.23c0-5.322-4.33-9.652-9.651-9.652L18.23,8.577 L18.23,8.577z' />
                            </svg>

                            <svg id='icon-ok' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 103.696 103.695'>
                                <path d='M50.803,71.848c0-2.482,1.305-4.496,2.913-4.496h24.27c1.607,0,2.91,2.014,2.91,4.496c0,2.481-1.303,4.496-2.91,4.496 h-24.27C52.108,76.344,50.803,74.329,50.803,71.848z M30.559,29.488c0-4.113,3.12-7.451,6.965-7.451 c3.846,0,6.966,3.338,6.966,7.451c0,4.117-3.12,7.453-6.966,7.453C33.679,36.941,30.559,33.605,30.559,29.488z M60.145,29.488 c0-4.113,3.123-7.451,6.969-7.451c3.845,0,6.965,3.338,6.965,7.451c0,4.117-3.12,7.453-6.965,7.453 C63.268,36.941,60.145,33.605,60.145,29.488z M85.465,103.695H18.23C8.178,103.695,0,95.518,0,85.465V18.23 C0,8.177,8.179,0,18.23,0h67.235c10.053,0,18.229,8.178,18.229,18.23v67.235C103.696,95.518,95.518,103.695,85.465,103.695z M18.23,8.577c-5.322,0-9.652,4.33-9.652,9.652v67.234c0,5.322,4.33,9.652,9.652,9.652h67.235c5.321,0,9.651-4.33,9.651-9.652 V18.23c0-5.322-4.33-9.652-9.651-9.652L18.23,8.577L18.23,8.577z' />
                            </svg>

                            <svg version='1.1' id='icon-good' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 103.696 103.696'>
                                <path d='M32.06,37.489c0-3.423,2.777-6.201,6.201-6.201c3.423,0,6.2,2.777,6.2,6.201c0,3.426-2.777,6.203-6.2,6.203 C34.836,43.692,32.06,40.915,32.06,37.489z M60.176,37.489c0-3.423,2.78-6.201,6.203-6.201c3.424,0,6.201,2.777,6.201,6.201 c0,3.426-2.777,6.203-6.201,6.203C62.957,43.692,60.176,40.915,60.176,37.489z M74.836,62.887 c-3.843,8.887-12.843,14.629-22.928,14.629c-10.301,0-19.354-5.771-23.064-14.703c-0.636-1.529,0.089-3.285,1.62-3.92 c0.376-0.156,0.766-0.23,1.15-0.23c1.176,0,2.292,0.695,2.771,1.85c2.777,6.686,9.655,11.004,17.523,11.004 c7.689,0,14.527-4.321,17.421-11.01c0.658-1.521,2.424-2.223,3.944-1.564S75.495,61.366,74.836,62.887z M85.467,103.696H18.23 C8.179,103.696,0,95.518,0,85.467V18.23C0,8.178,8.179,0,18.23,0h67.235c10.053,0,18.23,8.178,18.23,18.23v67.235 C103.697,95.518,95.518,103.696,85.467,103.696z M18.23,8.579c-5.321,0-9.651,4.33-9.651,9.651v67.235 c0,5.321,4.33,9.651,9.651,9.651h67.235c5.321,0,9.651-4.33,9.651-9.651V18.23c0-5.321-4.33-9.651-9.651-9.651H18.23z' />
                            </svg>

                            <svg version='1.1' id='icon-great' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 103.696 103.696'>
                                <path d='M30.557,36.281c-0.185-0.189-0.248-0.465-0.164-0.715s0.301-0.432,0.561-0.472l4.604-0.703l2.065-4.4 c0.116-0.247,0.364-0.404,0.637-0.404s0.521,0.157,0.637,0.404l2.065,4.4l4.604,0.703c0.26,0.04,0.477,0.222,0.561,0.472 s0.021,0.525-0.164,0.714l-3.352,3.437l0.794,4.857c0.043,0.266-0.068,0.533-0.289,0.688c-0.121,0.085-0.263,0.128-0.405,0.128 c-0.117,0-0.234-0.029-0.34-0.087l-4.11-2.271l-4.108,2.271c-0.234,0.131-0.524,0.115-0.745-0.041 c-0.22-0.155-0.332-0.422-0.289-0.688l0.791-4.857L30.557,36.281z M58.675,36.281c-0.185-0.189-0.248-0.465-0.164-0.715 s0.301-0.432,0.562-0.472l4.604-0.703l2.064-4.4c0.115-0.247,0.363-0.404,0.637-0.404s0.521,0.157,0.637,0.404l2.065,4.4 l4.604,0.703c0.26,0.04,0.477,0.222,0.561,0.472s0.021,0.525-0.164,0.714l-3.354,3.438l0.795,4.857 c0.043,0.266-0.068,0.533-0.289,0.688c-0.121,0.085-0.264,0.128-0.405,0.128c-0.117,0-0.233-0.029-0.34-0.087l-4.11-2.271 l-4.107,2.271c-0.234,0.131-0.524,0.115-0.746-0.041c-0.219-0.155-0.331-0.422-0.288-0.688l0.791-4.857L58.675,36.281z M77.365,59.885c0.265,0.402,0.31,0.912,0.118,1.355c-4.285,9.904-14.318,16.304-25.563,16.304 c-11.486,0-21.58-6.431-25.714-16.382c-0.185-0.443-0.135-0.949,0.131-1.348c0.267-0.397,0.714-0.637,1.192-0.637 c0.001,0,0.001,0,0.002,0l48.638,0.061C76.651,59.238,77.101,59.48,77.365,59.885z M85.466,103.696H18.231 c-10.053,0-18.23-8.179-18.23-18.229V18.23C0.001,8.178,8.179,0,18.231,0h67.235c10.053,0,18.229,8.178,18.229,18.23v67.235 C103.696,95.518,95.519,103.696,85.466,103.696z M18.231,8.579c-5.322,0-9.652,4.33-9.652,9.651v67.235 c0,5.321,4.33,9.651,9.652,9.651h67.235c5.321,0,9.651-4.33,9.651-9.651V18.23c0-5.321-4.33-9.651-9.651-9.651H18.231z' />
                            </svg>
                        </div>

                        <div className='range'>
                            <svg width='360' height='15' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <defs>
                                    <linearGradient id='gradient' x1='1' y1='0' x2='0' y2='0'>
                                        <stop offset={`${gradientGrey}%`} stopColor='#EAEEF4' />
                                        <stop offset='0%' stopColor={`${gradientStop}`} />
                                    </linearGradient>
                                </defs>

                                <path d='M0 7.65377C0 6.22069 1.1207 5.01982 2.5 5L177.5 2.5L352.776 0.000723075C356.75 -0.0563631 360 3.27402 360 7.40212C360 11.5262 356.756 14.855 352.786 14.8037L177.5 13L2.5 10.5C1.11931 10.4821 0 9.08826 0 7.65377Z' fill='url(#gradient)' />
                            </svg>

                            <input type='range' value={valorSlider} className='slider' onChange={(e) => handleChangeSlider(e)} />
                            <p className='teste'>Nota {(valorSlider / 20)}</p>
                        </div>
                    </div>

                    <div className={`mt-6 ${isMostrarAvaliar ? '' : 'esconder'}`} id='divAvaliacaoComentario'>
                        <div className='field'>
                            <div className='control'>
                                <textarea className='textarea' placeholder='Avalieeeeeeeeeeeeeeeeee' style={{ resize: 'none' }}></textarea>
                            </div>
                        </div>

                        <div className='has-text-centered'>
                            <input type='button' className='button' value='Cancelar' onClick={() => hadleCancelarAvaliacao()} />
                            <input type='button' className='button is-primary ml-2' value='Enviar avaliação' />
                        </div>
                    </div>
                </div>

                <div className={`column is-hidden-mobile sem-drag ${isMostrarAvaliar ? '' : 'esconder'}`}>
                    <figure className='image is-256x256 has-image-centered sem-highlight'>
                        <img src={ImgAvaliacao} alt='' />
                    </figure>
                </div>
            </div>
        </div>
    );
}

