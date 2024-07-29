import React, { forwardRef } from 'react';

interface InputProps {
    value: string;
    className?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps> (({ value, onChange, onKeyDown, className }, ref) => {
    return (
        <input 
            type="text" 
            placeholder="닉네임을 입력해주세요" 
            className={`px-4 py-3 border border-gray-400 rounded-md w-80 h-14 iphone:w-[273px] iphone:h-[55px] iphone:rounded-2xl iphone:mt-4 iphone:bg-gray-400 iphone:bg-opacity-[0.2] iphone:border-none focus:outline-none ${className}`}
            style={{ marginBottom: '15px', outline: 'none' }}
            value={value}
            onChange={onChange}
            ref={ref}
            onKeyDown={onKeyDown}
        />
    );
});

export default Input;
