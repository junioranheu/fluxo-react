import UploadButton from '@rpldy/upload-button';
import Uploady from '@rpldy/uploady';
import React from 'react';

// https://github.com/rpldy/react-uploady
// https://react-uploady.netlify.app/docs/
// https://www.npmjs.com/package/@rpldy/upload-button
const botaoUpload = () => (
    <Uploady
        destination={{ url: 'https://my-server/upload' }}>
        <UploadButton className='button is-primary' />
    </Uploady>
);

export default botaoUpload;