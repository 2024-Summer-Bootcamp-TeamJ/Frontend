import React from "react";

interface ButtonProps {
  text: string;
  color: string;
  onClick?: () => void;
  width?: string;
  height?: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  color,
  onClick,
  width,
  height,
}) => {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-4 text-white ${color} rounded-md`}
      style={{
        width: width || "10vw", // 기본 너비를 뷰포트 너비의 10%로 설정
        height: height || "7vh", // 기본 높이를 뷰포트 높이의 5%로 설정
        fontSize: "clamp(0.5rem, 2vw + 1rem, 1.2rem)", // 텍스트 크기를 반응형으로 설정
        cursor: "none",
      }}
    >
      {text}
    </button>
  );
};

export default Button;
