import React from 'react';
import { Center, Box, Text, Heading } from "@chakra-ui/react"

const BlogPost = () => {
    return (
        <Center h="max-content">
            <Box mt="10%" mx={{sm: "10%", lg: "27%"}}  fontSize={{ sm: "5xl", lg: 25}} sx={{ ".chakra-text": { "margin": "0% 2% 4% 2%"} }}>
                <Heading fontSize={{sm: "6xl", lg: 40}} mb="15px" color="#0080af">October 5, 2021</Heading>
                <Text>
                    In the popular game Splitgate there is a mode called Oddball which pits two teams against eachother in a battle to hold onto the ball for a given time period. With the extreme mobility of Splitgate's jetpack and portaling systems, 
                    one will quickly realize how unneccesarily heavy the ball feels. I kept finding myself in mid-air pickles where I wanted to throw the ball through a portal or Hail Mary pass it to a teammate before the enemy caught me. Sadly, all the game 
                    allows players to do is drop the ball straight to the floor.
                </Text>
                <Text>I started to imagine a multiplayer game with guns and jetpacks and football-like throwing mechanics. Ever since then (a few weeks ago) I've been tinkering to find out if I might be able to bring the idea to life.</Text>
                <Text>The first choice was whether to use a pre-existing engine or go with a more homebrew approach. In the spirit of rapid-prototyping I decided that using an engine would much better suit my needs. Next I chose which engine to use, there are a few
                    popular ones that most people seem to use: Unity, Unreal, and Godot. Unreal seems to be the choice for multiplayer games since it has built in support for dedicated servers.
                </Text>
            </Box>
        </Center>
    )
}

export default BlogPost;