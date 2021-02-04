import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ChakraProvider, Center } from "@chakra-ui/react"

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <Center h="100%">
        <App />
      </Center>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);