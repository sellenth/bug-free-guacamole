import React from 'react';
import { Heading } from "@chakra-ui/react"

const TitleText = ({text}) => {
    return (
        <Heading whiteSpace="pre-wrap" size="4xl" variant="blended">{text}</Heading>
    )
}

export default TitleText;