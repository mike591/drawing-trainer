import React, { createRef } from "react";
import { Container, Button, Icon, Segment, Header } from "semantic-ui-react";
import Canvas from "components/Canvas";
import { useHistory } from "react-router-dom";
import { privateRoutes } from "utils/routes";

const AIGuessPage = () => {
  const history = useHistory();
  const canvasRef = createRef(null);

  const handleAIGuess = () => {
    console.warn(canvasRef.current);
    const classifier = window.ml5.imageClassifier("MobileNet", () => {
      return classifier.classify(canvasRef.current, (error, results) => {
        if (error) {
          console.log(error);
        }
        console.log(results);
      });
    });
  };

  const getActions = () => {
    return (
      <>
        <Button color="orange" onClick={handleAIGuess}>
          AI Guess
        </Button>
      </>
    );
  };

  return (
    <Container className="AIGuessPage">
      <Button
        className="return-button"
        icon
        onClick={() => history.push(privateRoutes.home.path)}
      >
        <Icon name="arrow left" />
      </Button>
      <Header>Let the AI guess your drawing!</Header>

      <Segment.Group>
        <Segment>
          <Canvas ref={canvasRef} getActions={getActions} />
        </Segment>
      </Segment.Group>
    </Container>
  );
};

export default AIGuessPage;
