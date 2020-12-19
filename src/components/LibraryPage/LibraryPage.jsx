import React from "react";
import { Container, Segment, Button, Icon } from "semantic-ui-react";
import { privateRoutes } from "utils/routes";
import { useHistory } from "react-router-dom";
import { useAuth } from "hooks/useAuth";
import { useDrawings } from "hooks/useDrawings";

const LibraryPage = () => {
  const history = useHistory();
  const { user } = useAuth();
  const { drawings } = useDrawings(user);

  return (
    <Container className="LibraryPage">
      <Button
        className="return-button"
        icon
        onClick={() => history.push(privateRoutes.home.path)}
      >
        <Icon name="arrow left" />
      </Button>
      <Segment.Group>
        {drawings.map((drawing, idx) => {
          const prompt = `${drawing.adjective} ${drawing.noun}`;
          return (
            <div key={idx}>
              <div>{prompt}</div>
              <img src={drawing.imageUrl} alt={prompt} />
            </div>
          );
        })}
      </Segment.Group>
    </Container>
  );
};

export default LibraryPage;
