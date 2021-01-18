import React from "react";
import { Container, Button, Icon, Segment, Header } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { privateRoutes } from "utils/routes";
import { useDrawings } from "hooks/useDrawings";
import { useReviews } from "hooks/useReviews";
import nouns from "utils/nouns.json";
import adjectives from "utils/adjectives.json";
import getSeededRandomFromArray from "utils/getSeededRandomFromArray";

const GamePage = () => {
  const history = useHistory();
  const { getDrawingsForReview } = useDrawings();
  const { subscribeToReviews } = useReviews();
  const [drawingsToReview, setDrawingsToReview] = React.useState();
  const [currentlyViewing, setCurrentlyViewing] = React.useState(0);

  const [selectedAdjective, setSelectedAdjective] = React.useState();
  const [selectedNoun, setSelectedNoun] = React.useState();

  const handleInitGame = async () => {
    const drawings = await getDrawingsForReview();
    setDrawingsToReview(drawings);
  };

  const reviews = subscribeToReviews();

  const handleSave = () => {};

  const getMixedChoices = (correctAnswer, isAdjectives = false) => {
    const list = isAdjectives ? adjectives : nouns;
    const choices = getSeededRandomFromArray(
      list.filter((item) => item !== correctAnswer),
      correctAnswer,
      4
    );
    choices.push(correctAnswer);

    return choices.sort();
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
          <Segment.Group horizontal className="_choices">
            <Segment>
              <Header as="h2">Adjectives</Header>
              {getMixedChoices(
                drawingsToReview[currentlyViewing].adjective,
                true
              ).map((adjective) => {
                return (
                  <Button
                    key={adjective}
                    color={selectedAdjective === adjective ? "blue" : undefined}
                    onClick={() => setSelectedAdjective(adjective)}
                  >
                    {adjective}
                  </Button>
                );
              })}
            </Segment>
            <Segment>
              <Header as="h2">Nouns</Header>
              {getMixedChoices(
                drawingsToReview[currentlyViewing].noun,
                false
              ).map((noun) => {
                return (
                  <Button
                    key={noun}
                    color={selectedNoun === noun ? "blue" : undefined}
                    onClick={() => setSelectedNoun(noun)}
                  >
                    {noun}
                  </Button>
                );
              })}
            </Segment>
          </Segment.Group>
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
        <Button onClick={handleInitGame} color="green" size="large">
          Start
        </Button>
      )}
    </Container>
  );
};

export default GamePage;
