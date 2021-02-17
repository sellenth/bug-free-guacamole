import { extendTheme } from "@chakra-ui/react"

const Heading = {
    variants: {
        "blended": {
            mixBlendMode: "difference",
            color: "coral",
            position: "absolute",
            top: "50%",
            left: "0px"
        },
    },
}

const theme = extendTheme({
    components: {
        Heading
    },
})


export default theme