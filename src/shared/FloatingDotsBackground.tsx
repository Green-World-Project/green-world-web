import { useState, useEffect } from "react";
import GreenDot from "./GreenDot";

interface DotPosition {
  top: string;
  left: string;
  y: number;
  x: number;
  duration: number;
}

const FloatingDotsBackground = ({ numberOfDots }: { numberOfDots: number }) => {
  const [dotPositions, setDotPositions] = useState<DotPosition[]>([]);

  // Generate random positions and animations
  const generateRandomAnimation = () => {
    const y = Math.random() * 100 - 50; // Random vertical movement (-50 to 50)
    const x = Math.random() * 100 - 50; // Random horizontal movement (-50 to 50)
    const duration = 6 + Math.random() * 6; // Random duration between 6 and 12 seconds (slower)
    return { y, x, duration };
  };

  // Constrain positions within the viewport
  const generateRandomPosition = () => {
    const dotSize = 20; // Size of each dot (width/height in pixels)
    const maxTop = window.innerHeight - dotSize; // Maximum top position
    const maxLeft = window.innerWidth - dotSize; // Maximum left position

    const top = Math.random() * maxTop; // Random top position within bounds
    const left = Math.random() * maxLeft; // Random left position within bounds

    return {
      top: `${top}px`,
      left: `${left}px`,
    };
  };

  // Initialize dot positions on mount
  useEffect(() => {
    const positions = Array.from({ length: numberOfDots }).map(() => ({
      ...generateRandomPosition(),
      ...generateRandomAnimation(),
    }));

    setDotPositions(positions);
  }, [numberOfDots]);

  // Update dot positions on window resize
  useEffect(() => {
    const handleResize = () => {
      const positions = dotPositions.map((position) => ({
        ...position,
        ...generateRandomPosition(),
      }));
      setDotPositions(positions);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dotPositions]);

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {dotPositions.map((position, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            top: position.top,
            left: position.left,
          }}
        >
          <GreenDot
            y={position.y}
            x={position.x}
            duration={position.duration}
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingDotsBackground;
