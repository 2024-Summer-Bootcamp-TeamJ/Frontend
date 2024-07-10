import React from 'react';
import ChatContainer from '../../components/chat/ChatContainer';
import backgroundBaek from '../../assets/images/backgroundBeak.svg';
import characterBaek from '../../assets/images/beak.svg';

const ChattingPageBaek: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundBaek})` }}
    >
      <div className="flex items-center justify-center w-full max-w-5xl p-4 bg-gray-100 bg-opacity-90 rounded-3xl shadow-md">
        <div className="flex items-center space-x-28 p-8">
          <img src={characterBaek} alt="Baek" className="w-1/3 h-auto" />
          <ChatContainer mentorBgColor="bg-[#F0FDDE]" myBgColor="bg-[#DEFFB2]" />
        </div>
      </div>
    </div>
  );
};

export default ChattingPageBaek;
