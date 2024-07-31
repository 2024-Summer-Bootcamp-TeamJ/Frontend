// src/components/CustomCursor.tsx
import React, { useEffect, useState } from "react";
import "../index.css"; // CustomCursor에 대한 스타일이 index.css에 있으므로 import

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", onMouseMove);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      className="custom-cursor"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      😊
    </div>
  );
};

export default CustomCursor;
