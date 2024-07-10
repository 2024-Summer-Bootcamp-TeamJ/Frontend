import React from 'react';
import ChatContainer from '../../components/chat/ChatContainer';
import backgroundShin from '../../assets/images/backgroundShin.svg';
import characterShin from '../../assets/images/shin.svg';

const ChattingPageShin: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundShin})` }}
    >
      <div className="flex items-center justify-center w-full max-w-5xl p-4 bg-gray-100 bg-opacity-80 rounded-lg shadow-md">
        <div className="flex items-center space-x-28 p-8">
          <img src={characterShin} alt="Shin" className="w-1/3 h-auto" />
          <ChatContainer mentorBgColor="bg-[#CCE8FF]" myBgColor="bg-[#A3D4FD]" />
        </div>
      </div>
    </div>
  );
};

export default ChattingPageShin;
