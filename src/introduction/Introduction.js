import React from 'react';
import LoadingCircle from "./LoadingCircle"
import OpenGLcanvas from './openGL/OpenGLcanvas';
import { Heading } from '@chakra-ui/react'

const Introduction = () => {
    const script = [
        "Hello,",
        "my name is Halston.",
        "I tinker with computers."
    ]
    return (
        <div style={{position: "relative"}}>
            {/*<LoadingCircle script={script} />*/}
            <Heading textAlign="center" size="4xl" variant="blended">HALSTON SELLENTIN</Heading>
            <OpenGLcanvas />
        </div>
    )
}

export default Introduction;