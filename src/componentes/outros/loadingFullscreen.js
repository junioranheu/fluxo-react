import React from 'react';
import ReactDOM from 'react-dom';
import Loading from 'react-fullscreen-loading';

// https://codesandbox.io/s/v6z782xow7?file=/src/index.js:0-302
export default function LoadingFullScreen(props) {
    return ReactDOM.createPortal(
        <Loading loading={props.isLoading} background='rgba(0, 0, 0, 0.5)' loaderColor='#FEBA35' />,
        document.getElementById('rootLoading') // React portals: https://www.pluralsight.com/guides/how-to-get-a-component-from-anywhere-in-an-app-using-react
    );
}


