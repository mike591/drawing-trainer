import React, { forwardRef, useState } from "react";

const Canvas = forwardRef(({ color = "#000000", thickness = 3 }, canvasRef) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

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
    <canvas
      className="Canvas"
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseDown={(e) => {
        setIsDrawing(true);
        handleSetPosition(e);
      }}
      onMouseLeave={() => setIsDrawing(false)}
      onMouseUp={() => setIsDrawing(false)}
    />
  );
});

export default Canvas;
