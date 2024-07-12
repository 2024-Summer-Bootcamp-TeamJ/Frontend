import React from 'react';
import { Link } from "react-router-dom";
import ChatContainer from '../../components/chat/ChatContainer';
import backgroundShin from '../../assets/images/backgroundShin.svg';
import characterShin from '../../assets/images/shin.svg';
import chatBubbleImage from '../../assets/images/chatbubble.png';
import Button from '../../components/FirstPage/Button';

const ChattingPageShin: React.FC = () => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundShin})` }}
    >
      <div className="absolute top-4 right-4">
      <Link to="/prescription">
        <Button text="대화 종료하기" color="bg-blue-700 pt-3 pb-3" />
      </Link>
      </div>
      <div className="relative flex items-center justify-center w-full max-w-6xl px-2 py-4 bg-gray-100 bg-opacity-90 rounded-3xl shadow-md">
        <div className="relative flex items-center space-x-40 px-0 py-8 overflow-visible">
          <div className="relative ml-16 mb-12">
            <img src={characterShin} alt="Shin" className="w-72 ml-16 h-auto relative" />
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
                <p className="text-center text-3xl text-dateTextColor font-syndinaroo" style={{ transform: 'scale(1)' }}>
                  고민이 많아서 힘들었겠구나. 그렇다면 내가 하는 말을 잘 들어봐.
                </p>
              </div>
            </div>
          </div>
          <div className="ml-0 overflow-visible">
            <ChatContainer mentorBgColor="bg-[#CCE8FF]" myBgColor="bg-[#A3D4FD]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChattingPageShin;
