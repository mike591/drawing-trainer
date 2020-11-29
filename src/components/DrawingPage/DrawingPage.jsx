import React, { useState } from "react";
import { Container, Segment, Button, Icon, Header } from "semantic-ui-react";
import { privateRoutes } from "utils/routes";
import { useHistory } from "react-router-dom";
import nouns from "utils/nouns.json";
import adjectives from "utils/adjectives.json";
import getRandomFromArray from "utils/getRandomFromArray";

const DrawingPage = () => {
  const history = useHistory();
  const [nounOptions, setNounOptions] = useState([]);
  const [adjectiveOptions, setAdjectiveOptions] = useState([]);

  const [activeNoun, setActiveNoun] = useState();
  const [activeAdjective, setActiveAdjective] = useState();

  const handleRandomize = () => {
    setNounOptions([
      getRandomFromArray(nouns),
      getRandomFromArray(nouns),
      getRandomFromArray(nouns),
    ]);

    setAdjectiveOptions([
      getRandomFromArray(adjectives),
      getRandomFromArray(adjectives),
      getRandomFromArray(adjectives),
    ]);
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
          </div>
        </Segment>
        <Segment.Group horizontal>
          <Segment>
            <Header as="h2">Adjectives</Header>
            {adjectiveOptions.map((adjectiveOption, idx) => (
              <Button
                active={adjectiveOption === activeAdjective}
                onClick={() => setActiveAdjective(adjectiveOption)}
                key={idx}
                basic
              >
                {adjectiveOption}
              </Button>
            ))}
          </Segment>
          <Segment>
            <Header as="h2">Nouns</Header>
            {nounOptions.map((nounOption, idx) => (
              <Button
                active={nounOption === activeNoun}
                onClick={() => setActiveNoun(nounOption)}
                key={idx}
                basic
              >
                {nounOption}
              </Button>
            ))}
          </Segment>
        </Segment.Group>
      </Segment.Group>
    </Container>
  );
};

export default DrawingPage;
