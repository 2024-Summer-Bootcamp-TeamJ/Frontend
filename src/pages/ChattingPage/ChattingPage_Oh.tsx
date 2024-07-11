import React from 'react';
import ChatContainer from '../../components/chat/ChatContainer';
import backgroundOh from '../../assets/images/backgroundOh.svg';
import characterOh from '../../assets/images/oh.svg';
import chatBubbleImage from '../../assets/images/chatbubble.png';

const ChattingPageOh: React.FC = () => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundOh})` }}
    >
      <div className="relative flex items-center justify-center w-full max-w-6xl px-2 py-4 bg-gray-100 bg-opacity-90 rounded-3xl shadow-md">
        <div className="relative flex items-center space-x-48 px-0 py-8 overflow-visible">
          <div className="relative">
            <img src={characterOh} alt="Oh" className="w-80 ml-16 h-auto relative" />
            <div className="absolute top-18 left-1/2 transform -translate-x-1/2 -translate-y-16">
              <img
                src={chatBubbleImage}
                alt="Chat Bubble"
                className="w-60 h-auto z-20 ml-8 -mt-4"
                style={{ transform: 'scale(2.5)' }}
              />
              <div
                className="absolute bottom-4 -left-8 w-full h-full flex items-center justify-center"
                style={{ width: '180%', height: '100%' }}
              >
                <p className="text-center text-2xl font-bold" style={{ transform: 'scale(1)' }}>
                  하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하하
                </p>
              </div>
            </div>
          </div>
          <div className="ml-0 overflow-visible">
            <ChatContainer mentorBgColor="bg-[#FFF9DD]" myBgColor="bg-[#FDF2BB]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChattingPageOh;
