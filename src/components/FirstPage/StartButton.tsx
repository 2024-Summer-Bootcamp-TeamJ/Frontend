import React from 'react';

const StartButton: React.FC = () => {
    return (
        <button 
            className='px-6 py-2 text-white bg-green-700 rounded-md'
            style={{marginTop: '50px', width: '300px', height: '50px', fontWeight: 'bold', fontSize: '20px'}}
        >
            시작하기
        </button>
    );
};

export default StartButton;