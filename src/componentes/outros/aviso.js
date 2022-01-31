// https://fkhadra.github.io/react-toastify/positioning-toast
import { toast } from 'react-toastify';

export const Aviso = {
    info(texto, milisegundos) {
        toast.info(<div dangerouslySetInnerHTML={{ __html: texto }}></div>, {
            // position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: milisegundos
        });
    },

    success(texto, milisegundos) {
        toast.success(<div dangerouslySetInnerHTML={{ __html: texto }}></div>, {
            // position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: milisegundos
        });
    },

    error(texto, milisegundos) {
        toast.error(<div dangerouslySetInnerHTML={{ __html: texto }}></div>, {
            // position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: milisegundos
        });
    },

    warn(texto, milisegundos) {
        toast.warn(<div dangerouslySetInnerHTML={{ __html: texto }}></div>, {
            // position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: milisegundos
        });
    },

    info(texto, milisegundos) {
        toast.info(<div dangerouslySetInnerHTML={{ __html: texto }}></div>, {
            // position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: milisegundos
        });
    }
}
