import React from 'react';
import LoadingCircle from "./LoadingCircle"
import OpenGLcanvas from './openGL/OpenGLcanvas';

const Introduction = () => {
    const script = [
        "Hello,",
        "my name is Halston.",
        "I tinker with computers."
    ]
    return (
        <>
            {/*<LoadingCircle script={script} />*/}
            <OpenGLcanvas />
        </>
    )
}

export default Introduction;