import React from "react";
import { Container, Button, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { privateRoutes } from "utils/routes";
import { useDrawings } from "hooks/useDrawings";
import { useReviews } from "hooks/useReviews";

const GamePage = () => {
  const history = useHistory();
  const { getDrawingsForReview } = useDrawings();
  const { subscribeToReviews } = useReviews();
  const [drawingsToReview, setDrawingsToReview] = React.useState();
  const [currentlyViewing, setCurrentlyViewing] = React.useState(0);

  const handleInitGame = async () => {
    const drawings = await getDrawingsForReview();
    setDrawingsToReview(drawings);
  };

  return (
    <Container className="GamePage">
      <Button
        className="return-button"
        icon
        onClick={() => history.push(privateRoutes.home.path)}
      >
        <Icon name="arrow left" />
      </Button>
      {drawingsToReview ? (
        <>
          <img
            src={drawingsToReview[currentlyViewing]?.imageUrl}
            alt="drawing to review"
            className="__drawing"
          />
          <div className="__nav">
            <Button
              disabled={currentlyViewing === 0}
              onClick={() => setCurrentlyViewing((last) => last - 1)}
            >
              Previous
            </Button>
            <Button
              disabled={currentlyViewing === drawingsToReview.length - 1}
              onClick={() => setCurrentlyViewing((last) => last + 1)}
            >
              Next
            </Button>
          </div>
        </>
      ) : (
        <Button onClick={handleInitGame}>Start</Button>
      )}
    </Container>
  );
};

export default GamePage;
