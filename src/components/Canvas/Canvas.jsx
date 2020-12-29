import React, { useState, useEffect } from "react";
import {
  Input,
  Divider,
  Segment,
  Header,
  Button,
  Icon,
} from "semantic-ui-react";
import { CirclePicker } from "react-color";

const Canvas = React.forwardRef(({ getActions }, canvasRef) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState("#000000");
  const [thickness, setThickness] = useState(3);
  const [canvasSize, setCanvasSize] = useState({ height: 100, width: 100 });
  const [isErasing, setIsErasing] = useState(false);
  const [points, setPoints] = useState([]);
  const [triggerRedraw, setTriggerRedraw] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.height = canvas.parentElement.clientHeight * 0.75;
    canvas.width = canvas.parentElement.clientWidth * 0.75;
    setCanvasSize({
      height: canvas.parentElement.clientHeight,
      width: canvas.parentElement.clientWidth,
    });
    setTriggerRedraw(true);
  }, [canvasRef, canvasSize.height, canvasSize.width]);

  const redrawAll = React.useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (points.length === 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    points.forEach((point, idx) => {
      ctx.lineWidth = point.lineWidth;
      ctx.strokeStyle = point.strokeStyle;

      if (point.mode === "begin") {
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
      }

      ctx.lineTo(point.x, point.y);
      if (point.mode === "end" || idx === points.length - 1) {
        ctx.stroke();
      }
    });
    ctx.stroke();
    setTriggerRedraw(false);
  }, [canvasRef, points]);

  useEffect(() => {
    if (triggerRedraw) {
      redrawAll();
    }
  }, [triggerRedraw, setTriggerRedraw, redrawAll]);

  const handleUndo = () => {
    setPoints((last) => {
      let lastBeginIndex;
      for (let pointIdx = last.length - 1; pointIdx >= 0; pointIdx--) {
        const point = last[pointIdx];
        if (point.mode === "begin") {
          lastBeginIndex = pointIdx;
          break;
        }
      }
      return last.slice(0, lastBeginIndex);
    });
    setTriggerRedraw(true);
  };

  const getPosition = (e) => {
    const bounds = canvasRef.current.getBoundingClientRect();

    let x = e.pageX - bounds.left - window.scrollX;
    x /= bounds.width;
    x *= canvasRef.current.width;

    let y = e.pageY - bounds.top - window.scrollY;
    y /= bounds.height;
    y *= canvasRef.current.height;

    return { x, y };
  };

  const handleMouseMove = (e) => {
    if (isDrawing) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      context.beginPath();
      context.lineCap = "round";
      context.lineWidth = isErasing ? thickness * 2 : thickness;
      context.strokeStyle = isErasing ? "#FFF" : color;

      context.moveTo(position.x, position.y);

      const { x, y } = getPosition(e);
      setPosition({ x, y });

      setPoints((last) => [
        ...last,
        {
          x,
          y,
          lineWidth: context.lineWidth,
          strokeStyle: context.strokeStyle,
          mode: "draw",
        },
      ]);

      context.lineTo(x, y);
      context.stroke();
    }
  };

  // TODO: try to use base loader instead!
  return (
    <div className="Canvas">
      <Segment.Group className="canvas-wrapper" horizontal>
        <Segment>
          <Header>Controls</Header>
          <CirclePicker
            onChangeComplete={(color) => {
              setColor(color.hex);
              setIsErasing(false);
            }}
            color={isErasing ? "#FFF" : color}
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
          <Button
            icon
            labelPosition="right"
            toggle
            color="red"
            active={isErasing}
            onClick={() => setIsErasing((last) => !last)}
          >
            Erase
            <Icon name="eraser" />
          </Button>
          <Divider horizontal />
          <Button
            icon
            labelPosition="right"
            color="red"
            onClick={handleUndo}
            disabled={!points.length}
          >
            Undo
            <Icon name="undo" />
          </Button>
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
              setPoints([]);
            }}
          >
            Clear
            <Icon name="trash" />
          </Button>
          <Divider horizontal section>
            Actions
          </Divider>
          {getActions()}
          <Divider horizontal />
        </Segment>
        <Segment>
          <canvas
            className="paint-area"
            ref={canvasRef}
            onMouseDown={(e) => {
              setIsDrawing(true);
              const { x, y } = getPosition(e);
              setPosition({ x, y });
              setPoints((last) => [
                ...last,
                {
                  x,
                  y,
                  strokeStyle: isErasing ? "#FFF" : color,
                  lineWidth: isErasing ? thickness * 2 : thickness,
                  mode: "begin",
                },
              ]);
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
              setIsDrawing(false);
            }}
            onMouseUp={(e) => {
              setIsDrawing(false);
              const { x, y } = getPosition(e);
              setPoints((last) => [
                ...last,
                {
                  x,
                  y,
                  strokeStyle: isErasing ? "#FFF" : color,
                  lineWidth: isErasing ? thickness * 2 : thickness,
                  mode: "end",
                },
              ]);
            }}
            width="100"
            height="100"
          />
        </Segment>
      </Segment.Group>
    </div>
  );
});

export default Canvas;
