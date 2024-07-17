import React, { useEffect, useRef } from 'react';
import MentorChatBubble from './MentorChatBubble';
import MyChatBubble from './MyChatBubble';
import ChatInput from './ChatInput';

interface ChatContainerProps {
  mentorBgColor: string;
  myBgColor: string;
  messages: string[];
  onSendMessage: (message: string) => void;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ mentorBgColor, myBgColor, messages, onSendMessage }) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="relative bg-white bg-opacity-80 rounded-3xl p-8 w-[60vh] h-[80vh] flex flex-col justify-between">
        <div className="flex-grow overflow-y-scroll font-syndinaroo text-red-500 space-y-4">
          {messages.map((message, index) => (
            <div key={index}>
              {message.startsWith('Client:') ? (
                <MyChatBubble chatMessage={message.replace('Client: ', '')} bgColor={myBgColor} />
              ) : (
                <MentorChatBubble chatMessage={message} bgColor={mentorBgColor} />
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <ChatInput onSend={onSendMessage} />
      </div>
    </div>
  );
};

export default ChatContainer;
