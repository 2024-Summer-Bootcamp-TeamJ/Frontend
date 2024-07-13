import React from 'react';

interface InputProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ value, onChange }) => {
    return (
        
        <input 
            type="text" 
            placeholder="닉네임을 입력해주세요" 
            className="px-4 py-3 border border-gray-400 rounded-md w-80 h-14 focus:outline-none"
            style={{marginBottom: '15px'}}
            value={value}
            onChange={onChange}
        />
            
    );
};

export default Input;