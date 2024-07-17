import React from "react";



const StartButton: React.FC = () => {
    return (
        <button 
            
            className='px-4 py-2 text-white bg-green-700 rounded-md'
            style={{marginTop: '30px', width: '300px', height: '56px', fontWeight: 'bold', fontSize: '20px'}}
        >
            시작하기
        </button>
    );
};

export default StartButton;
