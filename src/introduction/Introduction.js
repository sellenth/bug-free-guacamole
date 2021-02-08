import React from 'react';
import { Center } from "@chakra-ui/react"
import LoadingCircle from "./LoadingCircle"
import TitleText from "./TitleText"

const Introduction = () => {
    const script = [
        "Hello,", 
        "my name is Halston.",
        "I tinker with computers."
    ]
    return (
        <LoadingCircle script={script}/>
    )
}

export default Introduction;