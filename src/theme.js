import { extendTheme } from "@chakra-ui/react"

const Heading = {
    variants: {
        "blended": {
            mixBlendMode: "difference",
            color: "coral",
            position: "sticky",
            top: "50px",
            width: "100%",
        },
    },
}

const theme = extendTheme({
    components: {
        Heading
    },
})


export default theme