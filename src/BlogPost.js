import React from 'react';
import { Link, Center, Box, Text, Heading, Divider } from "@chakra-ui/react"
import { November21 } from "./posts/November21"

export const CustomizedLink = (props) => {
    return (
        <Link textDecor="underline" fontWeight="600" href={props.href}>{props.content}</Link>
    )
}

const BlogPost = () => {
    return (
        <Center h="max-content">
            <Box mt="10%" mx={{ sm: "10%", lg: "27%" }} fontSize={{ sm: "5xl", lg: 25 }} sx={{ ".chakra-text": { "margin": "0% 2% 4% 2%" } }}>
                <November21 />
            </Box>
        </Center>
    )
}

export default BlogPost;