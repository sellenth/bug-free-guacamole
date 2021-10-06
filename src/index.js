import React from 'react';
import ReactDOM from 'react-dom';
import theme from './theme'
import App from './App';

import { ChakraProvider, Box, Heading } from "@chakra-ui/react"

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Box h="110vh" position="absolute" textAlign="center" w="100%">
        <Heading textAlign="center" size="4xl" variant="blended">HALSTON SELLENTIN</Heading>
      </Box>
      <App/>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);