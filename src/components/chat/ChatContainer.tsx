import React, { useState, useEffect, useRef } from 'react';
import MentorChatBubble from './MentorChatBubble';
import MyChatBubble from './MyChatBubble';
import ChatInput from './ChatInput';

interface ChatContainerProps {
  mentorBgColor: string;
  myBgColor: string;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ mentorBgColor, myBgColor }) => {
  const [messages, setMessages] = useState<string[]>([
    "어떤 상담이 필요하냐곰",
    "백곰원님 제가 일식당을 차리려고 하는데 메뉴를 50개 정도 하고싶어요. 괜찮을까요?",
    "미쳤냐곰 말도 안되는 소리 하지 말라곰 그러다 망한다곰",
    "허거덩 진짜요? 우짜죠 이미 개업했는디"
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (message: string) => {
    setMessages([...messages, message]);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="relative bg-white bg-opacity-80 rounded-3xl p-8 w-[60vh] h-[80vh] flex flex-col justify-between">
        <div className="flex-grow overflow-y-scroll font-syndinaroo text-red-500 space-y-4"> {/* overflow-y-scroll 클래스 추가 */}
          <MentorChatBubble chatMessage="어떤 상담이 필요하냐곰" bgColor={mentorBgColor} />
          <MyChatBubble chatMessage="백곰원님 제가 일식당을 차리려고 하는데 메뉴를 50개 정도 하고싶어요. 괜찮을까요?" bgColor={myBgColor} />
          <MentorChatBubble chatMessage="미쳤냐곰 말도 안되는 소리 하지 말라곰 그러다 망한다곰" bgColor={mentorBgColor} />
          <MyChatBubble chatMessage="허거덩 진짜요? 우짜죠 이미 개업했는디" bgColor={myBgColor} />
          {messages.map((message, index) => (
            <MyChatBubble key={index} chatMessage={message} bgColor={myBgColor} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <ChatInput onSend={addMessage} />
      </div>
    </div>
  );
};

export default ChatContainer;
