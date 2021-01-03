import React from "react";
import { Container, Button, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { privateRoutes } from "utils/routes";

const GamePage = () => {
  const history = useHistory();

  return (
    <Container className="GamePage">
      <Button
        className="return-button"
        icon
        onClick={() => history.push(privateRoutes.home.path)}
      >
        <Icon name="arrow left" />
      </Button>
      <h1>The Game</h1>
    </Container>
  );
};

export default GamePage;
