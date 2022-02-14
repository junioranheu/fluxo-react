import '../../css/itens.css';
import SemImagem from '../../static/outro/cinza.webp';
import urlImagemApi from '../../utilidades/utils/urlImagemApi';

export default function Item(props) {
    // console.log(props);

    // Import dinâmico;
    let imagemDinamica = '';
    try {
        imagemDinamica = `${urlImagemApi}/${props.thumbnail}`;
    } catch (err) {
        // console.log('Imagem não existe');        
        // console.log(err);
    }

    return (
        <a className='image-wrapper animate__animated animate__fadeIn sem-highlight' href={props.href}>
            <div className='image-overlay'>
                <div className='image-info'>
                    <div className='image-info-text'>
                        <h5 className='image-name medium cor-principal'>{props.titulo}</h5>
                        <p className='image-subtext tiny'>{props.descricao}</p>
                    </div>
                </div>
            </div>

            <img src={imagemDinamica} loading='lazy' width='1' height='1' onError={(event) => event.target.src = SemImagem} alt='Erro' />
            <span className='image-icone'>
                {!props.avaliacao && (
                    <i className={props.icone} title={props.iconeDesc}></i>
                )}

                {props.avaliacao && (
                    <span>
                        <i className='fas fa-star'></i>&nbsp;{props.avaliacao >= 0 ? props.avaliacao : 'Sem avaliação'}
                    </span>
                )}
            </span>
        </a>
    );
}

