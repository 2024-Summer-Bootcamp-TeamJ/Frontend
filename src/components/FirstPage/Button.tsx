import React from 'react';

interface ButtonProps {
  text: string;
  color: string;
  onClick?: () => void; 
}

const Button: React.FC<ButtonProps> = ({ text, color, onClick }) => {
  return (
    <button onClick={onClick} className={`py-2 px-4 ${color} rounded`}>
      {text}
    </button>
  );
};

export default Button;
