import React, { forwardRef } from 'react';

interface InputProps {
    value: string;
    className?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps> (({ value, onChange }, ref) => {
    return (
        
        <input 
            type="text" 
            placeholder="닉네임을 입력해주세요" 
            className="px-4 py-3 border border-gray-400 rounded-md w-80 h-14 focus: outline-3 outline-black-500"
            style={{marginBottom: '15px'}}
            value={value}
            onChange={onChange}
            ref={ref}
        />
            
    );
});

export default Input;