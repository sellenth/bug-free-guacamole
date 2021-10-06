import React from 'react';
import Introduction from './introduction/Introduction'
import BlogPost from './BlogPost'
import { Grid, GridItem, Heading } from "@chakra-ui/react"

const App = () => {
  return (
    <Grid templateRows="100vh minmax(100vh, auto)" bg="white">
      <GridItem justifySelf="center" alignSelf="center">
        <Introduction />
      </GridItem>
      <GridItem>
        <Heading marginTop="50px" whiteSpace="pre-wrap" size="4xl" visibility="hidden">Halston Sellentin</Heading>
        <BlogPost />
      </GridItem>

    </Grid>
  );
}

export default App;
