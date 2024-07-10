import React from 'react';
import ChatContainer from '../../components/chat/ChatContainer';
import backgroundOh from '../../assets/images/backgroundOh.svg';
import characterOh from '../../assets/images/oh.svg';

const ChattingPageOh: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundOh})` }}
    >
      <div className="flex items-center justify-center w-full max-w-5xl p-4 bg-gray-100 bg-opacity-90 rounded-lg shadow-md">
        <div className="flex items-center space-x-28 p-8">
          <img src={characterOh} alt="Oh" className="w-1/3 h-auto" />
          <ChatContainer mentorBgColor="bg-[#FFF9DD]" myBgColor="bg-[#FDF2BB]" />
        </div>
      </div>
    </div>
  );
};

export default ChattingPageOh;
