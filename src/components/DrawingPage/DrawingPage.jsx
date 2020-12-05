import React, { useState } from "react";
import { Container, Segment, Button, Icon, Header } from "semantic-ui-react";
import { privateRoutes } from "utils/routes";
import { useHistory } from "react-router-dom";
import nouns from "utils/nouns.json";
import adjectives from "utils/adjectives.json";
import getRandomFromArray from "utils/getRandomFromArray";
import Canvas from "components/Canvas";
import { TwitterPicker } from "react-color";

const DrawingPage = () => {
  const history = useHistory();
  const [nounOptions, setNounOptions] = useState([]);
  const [activeNoun, setActiveNoun] = useState();

  const [adjectiveOptions, setAdjectiveOptions] = useState([]);
  const [activeAdjective, setActiveAdjective] = useState();

  const [promptConfirmed, setPromptConfirmed] = useState(false);
  const [color, setColor] = useState();

  const handleRandomize = () => {
    setPromptConfirmed(false);
    setActiveNoun();
    setActiveAdjective();

    const newNounOptions = [];
    while (newNounOptions.length < 3) {
      const option = getRandomFromArray(nouns);
      if (newNounOptions.indexOf(option) < 0) {
        newNounOptions.push(option);
      }
    }
    setNounOptions(newNounOptions);

    const newAdjectiveOptions = [];
    while (newAdjectiveOptions.length < 3) {
      const option = getRandomFromArray(adjectives);
      if (newAdjectiveOptions.indexOf(option) < 0) {
        newAdjectiveOptions.push(option);
      }
    }
    setAdjectiveOptions(newAdjectiveOptions);
  };

  return (
    <Container className="DrawingPage">
      <Button
        className="return-button"
        icon
        onClick={() => history.push(privateRoutes.home.path)}
      >
        <Icon name="arrow left" />
      </Button>
      <Segment.Group className="prompt-controls">
        <Segment color="blue">
          <div className="randomize-button-wrapper">
            <Button onClick={handleRandomize} color="green">
              Randomize
            </Button>
            <Button
              color="blue"
              disabled={!activeNoun || !activeAdjective || promptConfirmed}
              onClick={() => setPromptConfirmed(true)}
            >
              Confirm Selections
            </Button>
          </div>
        </Segment>
        <Segment.Group horizontal>
          <Segment>
            <Header as="h2">Adjectives</Header>
            {adjectiveOptions.map((adjectiveOption, idx) => {
              if (promptConfirmed && adjectiveOption !== activeAdjective) {
                return null;
              }
              return (
                <Button
                  color={adjectiveOption === activeAdjective ? "blue" : "grey"}
                  onClick={() => setActiveAdjective(adjectiveOption)}
                  key={idx}
                  basic={adjectiveOption !== activeAdjective}
                  disabled={promptConfirmed}
                >
                  {adjectiveOption}
                </Button>
              );
            })}
          </Segment>
          <Segment>
            <Header as="h2">Nouns</Header>
            {nounOptions.map((nounOption, idx) => {
              if (promptConfirmed && nounOption !== activeNoun) {
                return null;
              }
              return (
                <Button
                  color={nounOption === activeNoun ? "blue" : "grey"}
                  onClick={() => setActiveNoun(nounOption)}
                  key={idx}
                  basic={nounOption !== activeNoun}
                  disabled={promptConfirmed}
                >
                  {nounOption}
                </Button>
              );
            })}
          </Segment>
        </Segment.Group>
      </Segment.Group>
      <Segment.Group className="canvas-wrapper" horizontal>
        {promptConfirmed && (
          <>
            <Segment>
              <Header>Controls</Header>
              <TwitterPicker
                onChangeComplete={(color) => setColor(color.hex)}
              />
            </Segment>
            <Segment>
              <Canvas color={color} />
            </Segment>
          </>
        )}
      </Segment.Group>
    </Container>
  );
};

export default DrawingPage;
