import React, { useState, createRef } from "react";
import {
  Container,
  Segment,
  Button,
  Icon,
  Header,
  Loader,
  Dimmer,
} from "semantic-ui-react";
import { privateRoutes } from "utils/routes";
import { useHistory } from "react-router-dom";
import nouns from "utils/nouns.json";
import adjectives from "utils/adjectives.json";
import getRandomFromArray from "utils/getRandomFromArray";
import Canvas from "components/Canvas";

import { useAuth } from "hooks/useAuth";
import { useDrawings } from "hooks/useDrawings";

const DrawingPage = () => {
  const history = useHistory();
  const [nounOptions, setNounOptions] = useState([]);
  const [activeNoun, setActiveNoun] = useState();

  const [adjectiveOptions, setAdjectiveOptions] = useState([]);
  const [activeAdjective, setActiveAdjective] = useState();

  const [promptConfirmed, setPromptConfirmed] = useState(false);

  const canvasRef = createRef(null);

  const [isSaving, setIsSaving] = React.useState();

  const { user } = useAuth();
  const { saveDrawing } = useDrawings(user);

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

  const handleSave = React.useCallback(() => {
    const doSave = async () => {
      const canvas = canvasRef.current;
      setIsSaving(() => true);
      try {
        await canvas.toBlob(async (blob) => {
          await saveDrawing({
            blob,
            adjective: activeAdjective,
            noun: activeNoun,
          });
          history.push(privateRoutes.library.path);
        });
      } catch (err) {
        setIsSaving(() => false);
      }
    };

    doSave();
  }, [activeAdjective, activeNoun, canvasRef, history, saveDrawing]);

  const getActions = React.useCallback(() => {
    return (
      <>
        <Button
          icon
          labelPosition="right"
          color="green"
          onClick={handleSave}
          loading={isSaving}
        >
          Save
          <Icon name="save" />
        </Button>
      </>
    );
  }, [handleSave, isSaving]);

  return (
    <Container className="DrawingPage">
      {isSaving && (
        <Dimmer active page>
          <Loader />
        </Dimmer>
      )}
      <Button
        className="return-button"
        icon
        onClick={() => history.push(privateRoutes.home.path)}
      >
        <Icon name="arrow left" />
      </Button>
      <Segment.Group className="prompt-controls">
        {!promptConfirmed && (
          <Segment color="blue">
            <div className="center-button">
              <Button onClick={handleRandomize} color="green">
                Randomize
              </Button>
            </div>
          </Segment>
        )}
        <Segment.Group horizontal>
          {promptConfirmed ? (
            <Segment>
              <Header as="h2" className="prompt">
                {activeAdjective} {activeNoun}
              </Header>
            </Segment>
          ) : (
            <>
              <Segment>
                <Header as="h2">Adjectives</Header>
                {adjectiveOptions.map((adjectiveOption, idx) => {
                  return (
                    <Button
                      color={
                        adjectiveOption === activeAdjective ? "blue" : "grey"
                      }
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
            </>
          )}
        </Segment.Group>
        {!promptConfirmed && (
          <Segment>
            <div className="center-button">
              <Button
                color="blue"
                disabled={!activeNoun || !activeAdjective || promptConfirmed}
                onClick={() => setPromptConfirmed(true)}
              >
                Confirm Selections
              </Button>
            </div>
          </Segment>
        )}
      </Segment.Group>
      {promptConfirmed && (
        <Canvas
          noun={activeNoun}
          adjective={activeAdjective}
          getActions={getActions}
          ref={canvasRef}
        />
      )}
    </Container>
  );
};

export default DrawingPage;
