import React from 'react';

interface ButtonProps {
  text?: string;
  color?: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text = '확인', color = 'bg-gray-500', onClick }) => {
  return (
    <button onClick={onClick} className={`px-6 py-2 text-white ${color} rounded-md`} style={{height: '50px'}}>
      {text}
    </button>
  );
};

export default Button;