import { extendTheme } from "@chakra-ui/react"

const Heading = {
    variants: {
        "blended": {
            mixBlendMode: "difference"
        },
    },
}

const theme = extendTheme({
    components: {
        Heading
    },
})


export default theme