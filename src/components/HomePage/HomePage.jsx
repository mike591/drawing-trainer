import React from "react";
import Logo from "components/Logo";
import { Container, Button, Segment } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { privateRoutes, publicRoutes } from "utils/routes";

const HomePage = () => {
  const history = useHistory();

  return (
    <Container className="HomePage">
      <Logo />
      <Segment className="navigation">
        <Button
          color="blue"
          basic
          onClick={() => history.push(privateRoutes.draw.path)}
          fluid
          size="large"
        >
          Draw
        </Button>
        <Button
          color="blue"
          basic
          onClick={() => history.push(privateRoutes.library.path)}
          fluid
          size="large"
        >
          Library
        </Button>
        <Button
          color="red"
          basic
          onClick={() => history.push(publicRoutes.logout.path)}
          fluid
          size="large"
        >
          Exit
        </Button>
      </Segment>
    </Container>
  );
};

export default HomePage;
