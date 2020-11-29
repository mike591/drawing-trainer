import React from "react";
import Logo from "components/Logo";
import { Container, Card, Button } from "semantic-ui-react";
import { useAuth } from "hooks/useAuth";
import { Redirect } from "react-router-dom";
import { privateRoutes } from "utils/routes";

const LoginPage = () => {
  const { user, handleLogin } = useAuth();
  if (user) {
    return <Redirect to={privateRoutes.home.path} />;
  }

  return (
    <Container className="LoginPage">
      <Logo />
      <Card>
        <Card.Content>
          <Card.Header as="h2">
            <div className="card-title">Login</div>
          </Card.Header>
          <Card.Description>
            Login into the app using Google Auth.
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="login-button-wrapper">
            <Button basic color="green" onClick={handleLogin}>
              Login
            </Button>
          </div>
        </Card.Content>
      </Card>
    </Container>
  );
};

export default LoginPage;
