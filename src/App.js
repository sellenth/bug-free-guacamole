import React from 'react';
import { Heading } from "@chakra-ui/react"

function oscillate(currText, stateFunc) {
  let count = 0;
  let intervalId = setInterval(function () {
    if (count === 0) {
      stateFunc(<>{currText}<span style={{opacity: "0"}}>.</span><span style={{opacity: "0"}}>.</span><span style={{opacity: "0"}}>.</span></>);
    } else if (count === 1) {
      stateFunc(<>{currText}<span style={{opacity: "1"}}>.</span><span style={{opacity: "0"}}>.</span><span style={{opacity: "0"}}>.</span></>);
    } else if (count === 2) {
      stateFunc(<>{currText}<span style={{opacity: "1"}}>.</span><span style={{opacity: "1"}}>.</span><span style={{opacity: "0"}}>.</span></>);
    } else if (count === 3) {
      stateFunc(<>{currText}<span style={{opacity: "1"}}>.</span><span style={{opacity: "1"}}>.</span><span style={{opacity: "1"}}>.</span></>);
    } else if (count === 4) {
      clearInterval(intervalId);
    }
    count += 1
  }, 500);
}

const App = () => {
  const [headingText, setHeadingText] = React.useState();
  React.useEffect(() => {
    oscillate('Hi', setHeadingText)
  }, []);

  return (
    <Heading whiteSpace="pre-wrap" size="4xl">{headingText}</Heading>
  );
}

export default App;
