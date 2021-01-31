import React from "react";
import { Container, Button, Icon, Segment, Header } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { privateRoutes } from "utils/routes";
import { useDrawings } from "hooks/useDrawings";
import { useReviews } from "hooks/useReviews";
import nouns from "utils/nouns.json";
import adjectives from "utils/adjectives.json";
import getSeededRandomFromArray from "utils/getSeededRandomFromArray";
import { useAuth } from "hooks/useAuth";

const GamePage = () => {
  const history = useHistory();
  const { user } = useAuth();

  const { getDrawingsForReview } = useDrawings({ user });
  const { addReview } = useReviews();
  const [drawingsToReview, setDrawingsToReview] = React.useState();
  const [currentlyViewing, setCurrentlyViewing] = React.useState(0);
  const [guessSubmitted, setGuessSubmitted] = React.useState(false);

  const [selectedAdjective, setSelectedAdjective] = React.useState();
  const [selectedNoun, setSelectedNoun] = React.useState();

  const getDidGuessCorrect = () => {
    const currentDrawing = drawingsToReview[currentlyViewing];
    return (
      selectedNoun === currentDrawing.noun &&
      selectedAdjective === currentDrawing.adjective
    );
  };

  const handleInitGame = async () => {
    const drawings = await getDrawingsForReview({ user });
    setDrawingsToReview(drawings);
  };

  const handleContinue = () => {
    setSelectedAdjective();
    setSelectedNoun();
    setGuessSubmitted(false);
    setCurrentlyViewing((last) => last + 1);
  };

  const handleSave = async () => {
    const endOfGame = currentlyViewing === drawingsToReview.length - 1;
    const didGuessCorrect = getDidGuessCorrect();
    await addReview({
      drawingId: drawingsToReview[currentlyViewing].id,
      userId: user.uid,
      didGuessCorrect,
    });

    if (endOfGame) {
      window.alert("Finished! There are no more drawings to review.");
      history.push(privateRoutes.home.path);
    } else {
      setGuessSubmitted(true);
    }
  };

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
          {!guessSubmitted && (
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
                      color={
                        selectedAdjective === adjective ? "blue" : undefined
                      }
                      onClick={() => setSelectedAdjective(adjective)}
                      disabled={guessSubmitted}
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
                      disabled={guessSubmitted}
                    >
                      {noun}
                    </Button>
                  );
                })}
              </Segment>
            </Segment.Group>
          )}
          <div className="__actions">
            {guessSubmitted ? (
              <div className="__results">
                <Header as="h3">
                  You've answered{" "}
                  {getDidGuessCorrect() ? "correctly" : "incorrectly"}!
                </Header>
                <div as="h4">
                  Guessed: {`${selectedAdjective} ${selectedNoun}`}
                </div>
                <div as="h4">
                  Actual:{" "}
                  {`${drawingsToReview[currentlyViewing].adjective} ${drawingsToReview[currentlyViewing].noun}`}
                </div>
                <Button primary onClick={handleContinue} className="__continue">
                  Continue
                </Button>
              </div>
            ) : (
              <Button
                primary
                onClick={handleSave}
                disabled={!selectedAdjective || !selectedNoun}
              >
                Submit
              </Button>
            )}
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
