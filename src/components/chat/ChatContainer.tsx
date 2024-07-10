import React from 'react';
import MentorChatBubble from './MentorChatBubble';
import MyChatBubble from './MyChatBubble';
import ChatInput from './ChatInput';

interface ChatContainerProps {
  mentorBgColor: string;
  myBgColor: string;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ mentorBgColor, myBgColor }) => {
  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="absolute inset-0 bg-gray-200 bg-opacity-50 rounded-lg transform translate-x-2 translate-y-2 "></div>
      <div className="relative bg-white bg-opacity-70 rounded-lg p-4 w-[60vh] h-[80vh] flex flex-col justify-between ">
        <div className="flex-grow overflow-y-auto">
          <MentorChatBubble chatMessage="어떤 상담이 필요하냐곰" bgColor={mentorBgColor} />
          <MyChatBubble chatMessage="백곰원님 제가 일식당을 차리려고 하는데 메뉴를 50개 정도 하고싶어요. 괜찮을까요?" bgColor={myBgColor} />
          <MentorChatBubble chatMessage="미쳤냐곰 말도 안되는 소리 하지 말라곰 그러다 망한다곰" bgColor={mentorBgColor} />
          <MyChatBubble chatMessage="허거덩 진짜요? 우짜죠 이미 개업했는디" bgColor={myBgColor} />
        </div>
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatContainer;
