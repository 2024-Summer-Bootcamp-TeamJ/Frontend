import React from 'react';

interface StartButtonProps {
    onClick: () => void;
}

const StartButton: React.FC<StartButtonProps> = ({ onClick }) => {
    return (
        <button 
            onClick={onClick}
            className='px-4 py-2 text-white bg-green-700 rounded-md'
            style={{marginTop: '15px', width: '300px', height: '56px', fontWeight: 'bold', fontSize: '20px'}}
        >
            시작하기
        </button>
    );
};

export default StartButton;
