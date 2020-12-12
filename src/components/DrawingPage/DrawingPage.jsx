import React, { useState, createRef } from "react";
import {
  Container,
  Segment,
  Button,
  Icon,
  Header,
  Input,
  Divider,
} from "semantic-ui-react";
import { privateRoutes } from "utils/routes";
import { useHistory } from "react-router-dom";
import nouns from "utils/nouns.json";
import adjectives from "utils/adjectives.json";
import getRandomFromArray from "utils/getRandomFromArray";
import Canvas from "components/Canvas";
import { CirclePicker } from "react-color";

const DrawingPage = () => {
  const history = useHistory();
  const [nounOptions, setNounOptions] = useState([]);
  const [activeNoun, setActiveNoun] = useState();

  const [adjectiveOptions, setAdjectiveOptions] = useState([]);
  const [activeAdjective, setActiveAdjective] = useState();

  const [promptConfirmed, setPromptConfirmed] = useState(false);

  const canvasRef = createRef(null);
  const [color, setColor] = useState("#000000");
  const [thickness, setThickness] = useState(3);

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
          <div className="center-button">
            <Button onClick={handleRandomize} color="green">
              Randomize
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
      <Segment.Group className="canvas-wrapper" horizontal>
        {promptConfirmed && (
          <>
            <Segment>
              <Header>Controls</Header>
              <CirclePicker
                onChangeComplete={(color) => setColor(color.hex)}
                color={color}
                colors={[
                  "#f44336",
                  "#e91e63",
                  "#9c27b0",
                  "#673ab7",
                  "#3f51b5",
                  "#2196f3",
                  "#03a9f4",
                  "#00bcd4",
                  "#009688",
                  "#4caf50",
                  "#8bc34a",
                  "#cddc39",
                  "#ffeb3b",
                  "#ffc107",
                  "#ff9800",
                  "#ff5722",
                  "#795548",
                  "#607d8b",
                  "#000000",
                ]}
                width="auto"
              />
              <Divider horizontal />
              <div className="_input --vertical">
                <div>{`Thickness: ${thickness} `}</div>
                <Input
                  min={1}
                  max={9}
                  name="thickness"
                  onChange={(e) => setThickness(e.currentTarget.value)}
                  step={1}
                  type="range"
                  value={thickness}
                />
              </div>

              <Divider horizontal />
              <Button
                icon
                labelPosition="right"
                onClick={() => {
                  const canvas = canvasRef.current;
                  const context = canvas.getContext("2d");
                  context.clearRect(0, 0, canvas.width, canvas.height);
                }}
              >
                Clear
                <Icon name="eraser" />
              </Button>
              <Divider horizontal />
              <Button icon labelPosition="right" disabled>
                Save
                <Icon name="save" />
              </Button>
            </Segment>
            <Segment>
              <Canvas color={color} thickness={thickness} ref={canvasRef} />
            </Segment>
          </>
        )}
      </Segment.Group>
    </Container>
  );
};

export default DrawingPage;
