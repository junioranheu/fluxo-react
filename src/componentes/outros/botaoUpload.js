import UploadButton from '@rpldy/upload-button';
import UploadPreview from '@rpldy/upload-preview';
import Uploady from '@rpldy/uploady';
import React from 'react';

// https://github.com/rpldy/react-uploady
// https://react-uploady.netlify.app/docs/
// https://www.npmjs.com/package/@rpldy/upload-button
export default function BotaoUpload(props) {
    console.log(props.texto);
    console.log(props.pathUpload);

    const filterBySize = (file) => {
        //filter out images larger than 5MB
        return file.size <= 5242880;
    };

    return (
        <Uploady destination={{ url: props.pathUpload }} fileFilter={filterBySize} accept='image/*'>
            <UploadButton className='button is-primary' text={props.texto} />
            <UploadPreview />
        </Uploady>
    );
}
