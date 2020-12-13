import React, { useState, createRef, useEffect } from "react";
import {
  Input,
  Divider,
  Segment,
  Header,
  Button,
  Icon,
} from "semantic-ui-react";
import { CirclePicker } from "react-color";

const Canvas = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState("#000000");
  const [thickness, setThickness] = useState(3);
  const [canvasSize, setCanvasSize] = useState({ height: 100, width: 100 });

  const canvasRef = createRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const heightDiff = canvas.parentElement.clientHeight !== canvasSize.height;
    const widthDiff = canvas.parentElement.clientWidth !== canvasSize.width;

    if (heightDiff || widthDiff) {
      canvas.height = canvas.parentElement.clientHeight * 0.75;
      canvas.width = canvas.parentElement.clientWidth * 0.75;
      setCanvasSize({
        height: canvas.parentElement.clientHeight,
        width: canvas.parentElement.clientWidth,
      });
      // TODO: redraw here
    }
  }, [canvasRef, canvasSize.height, canvasSize.width]);

  const handleSetPosition = (e) => {
    const bounds = canvasRef.current.getBoundingClientRect();

    let x = e.pageX - bounds.left - window.scrollX;
    x /= bounds.width;
    x *= canvasRef.current.width;

    let y = e.pageY - bounds.top - window.scrollY;
    y /= bounds.height;
    y *= canvasRef.current.height;

    setPosition({ x, y });
    return { x, y };
  };

  const handleMouseMove = (e) => {
    if (isDrawing) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      context.beginPath();
      context.lineCap = "round";
      context.lineWidth = thickness;
      context.strokeStyle = color;

      context.moveTo(position.x, position.y);
      const { x, y } = handleSetPosition(e);

      context.lineTo(x, y);
      context.stroke();
    }
  };

  return (
    <div className="Canvas">
      <Segment.Group className="canvas-wrapper" horizontal>
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
          <canvas
            className="paint-area"
            ref={canvasRef}
            onMouseDown={(e) => {
              setIsDrawing(true);
              handleSetPosition(e);
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setIsDrawing(false)}
            onMouseUp={() => setIsDrawing(false)}
            width="100"
            height="100"
          />
        </Segment>
      </Segment.Group>
    </div>
  );
};

export default Canvas;
