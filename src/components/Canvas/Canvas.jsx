import React, { useRef, useState, useEffect } from "react";

const Canvas = ({ color = "#000000" }) => {
  const canvasRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (position.x - rect.left) * scaleX;
    const y = (position.y - rect.top) * scaleY;

    if (isDrawing) {
      context.beginPath();
      context.moveTo(x, y);
      context.lineCap = "round";
      context.lineWidth = 3;
      context.lineTo(x, y);
      context.strokeStyle = color;
      context.stroke();
    }
  }, [position, isDrawing, color]);

  const handleMouseMove = (e) => {
    setPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <canvas
      className="Canvas"
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseDown={() => setIsDrawing(true)}
      onMouseLeave={() => setIsDrawing(false)}
      onMouseUp={() => setIsDrawing(false)}
    />
  );
};

export default Canvas;
