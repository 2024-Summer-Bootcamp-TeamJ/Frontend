import React from 'react';

interface ButtonProps {
  text: string;
  color: string;
  onClick?: () => void;
  width?: string; 
  height?: string; 
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, color, onClick, width, height }) => {
  return (
    <button 
      onClick={onClick} 
      className={`py-2 px-4 text-white ${color} rounded-md h-14 w-20 iphone:w-[180px] iphone:h-12 iphone:bg-amber-900 iphone:rounded-2xl iphone:font-bold iphone:text-xl`} 
      style={{ width, height}}
    >
      {text}
    </button>
  );
};

export default Button;
