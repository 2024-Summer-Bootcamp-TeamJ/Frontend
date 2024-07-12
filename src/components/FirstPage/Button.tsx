import React from 'react';

interface ButtonProps {
  text?: string;
  color?: string;
  onClick?: () => void; 
}

const Button: React.FC<ButtonProps> = ({ text = '확인', color = 'bg-gray-500' }) => {
  return (
    <button className={`px-6 py-2 text-white ${color} rounded-md`}>
      {text}
    </button>
  );
};

export default Button;