import { Heading, Text, Link } from "@chakra-ui/react"

export const October21 = () => {
    return (
        <>
            <Heading fontSize={{ sm: "6xl", lg: 40 }} mb="15px" color="#0080af">October Musings</Heading>
            <Text>
                I've been playing <Link textDecor="underline" fontWeight="600" href="https://www.splitgate.com">Splitgate</Link> which has a gamemode called Oddball that pits two teams against eachother in a battle to hold onto the ball for a given time period. With the extreme mobility of Splitgate's jetpack and portaling systems,
                one quickly realizes how unneccesarily heavy the ball feels. I kept finding myself in mid-air chases where I wanted to throw the ball through a portal or Hail Mary pass it to a teammate before the enemy caught me. Sadly, all the game
                allows players to do is drop the ball straight to the floor.
            </Text>
            <Text>I started to imagine a multiplayer game with guns and jetpacks and football-like throwing mechanics. Ever since then (a few weeks ago) I've been tinkering to find out if I might be able to bring the idea to life.</Text>
            <Text>The first choice was whether to use a pre-existing engine or go with a more homebrew approach. In the spirit of rapid-prototyping, I decided that using an engine would much better suit my needs. Next I chose which engine to use, there are a few
                popular ones that most people seem to use: Unity, Unreal, and Godot. I figured that Unreal has built in support for dedicated servers and it's what Splitgate uses so it should do just fine.
            </Text>
        </>
    )
}