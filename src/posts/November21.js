import { Heading, Text, Divider } from "@chakra-ui/react"
import { CustomizedLink } from "../BlogPost"

export const November21 = () => {
    return (
        <>
            <Heading fontSize={{ sm: "6xl", lg: 40 }} mb="15px" color="#0080af">November Musings</Heading>
            <Text>
                Last year I decided to build a helpful little chrome extension to make my life easier. The problem I was having resulted from living in two ecosystems: iOS for mobile, and Windows/Linux for desktop. I would frequently be viewing something on my desktop that I wanted to share with my phone in order to continue viewing on the go or to text to a friend.
            </Text>
            <Text>
                Back when I used an Android phone I would use an app called <CustomizedLink href="https://www.pushbullet.com/" content="Pushbullet" /> which worked wonders for this workflow but isn't compatible with iOS. From what I can tell, the macOS iMessage app also has the functionality I wanted but I don't have a macOS machine. The problem with both these solutions (and all others I could find) is that they are platform restrictive. They just wouldn't work with iOS-Windows, let alone iOS-Linux.
            </Text>
            <Text>
                This brings the story back to last year when I made the helpful little chrome extension. It was something I hacked together in a few days and turned out to work exactly as a wanted. Whenever I wanted to share my current webpage from my desktop to my phone, I would just click the extension icon in chrome and click the share button. It was two clicks and within a few seconds I'd get the link texted to my phone. Sweet!
            </Text>
            <Text>
                It worked so well for me that I wanted to share it with others. Well, due to the quick-and-dirty nature of a prototype I resorted to some bad software practices. In this case: hardcoding in my Twilio API key. If such an API were tied to my credit card details, that could be a quick way for some bad actor to spend lots of my money or masquerade as me to my users. I was just on a free-tier account however, so the financial problem wasn't of concern.
            </Text>
            <Text>
                I figured I could still share it with some of my friends who thought it sounded useful but then more problems arose. Due to the free account I was using, I couldn't just text any phone number I wanted. There were one or two "developer" numbers I could text and they required some manual setup. So much for letting my friends use the cool new tool I made for myself :(
            </Text>
            <Divider mb="4%" />
            <Text>
                Now we're finally caught up back in 2021. I had continued using my Link-2-Phone tool myself but still imagined sharing it with others because it was so useful for me. It was time to build this thing right! Over the span of a week I managed to create a nodeJS API which created and managed users in a SQL database. This solved the problem of having the API key visible in my browser extension and turned the tool into more of a product. Now I had saved users and could rate-limit the amount of requests they made to avoid overbudgeting myself (or to monetize the product in the future.)
            </Text>
            <Text>
                I paired the backend with a shiny new landing page that would introduce users to the product and tweaked the extension to use the new password system. All these new servers and webpages needed to live somewhere though, so I deployed them using AWS Elastic Beanstalk. This was really my first time putting ALL the puzzle pieces together for a software project. I even wrote a <CustomizedLink href="https://github.com/sellenth/Link-To-Phone" content="README with a diagram!!" />
            </Text>
            <Text>
                Going the full length with this particular project taught me an important lesson in the end that I wouldn't have known otherwise: hosting is expensive. My resource usage bill after for less than a month of developing and using the product was more than $40. My toy project which I made by hand was now bleeding me the equivalent of five netflix subscriptions a month!
            </Text>
            <Text>
                Tragically, within a week of getting the bill, I shut down my servers and retired the project for the time being. It was a great burst of motivation and I'm happy about the time I spent on Link-2-Phone. Maybe next year I'll come back and try to build a userbase that's willing to offset the server costs. Time will tell.
            </Text>
        </>
    )
}