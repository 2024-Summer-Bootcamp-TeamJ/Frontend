import React, { useEffect, useRef, useState, CSSProperties } from "react";
import MentorChatBubble from "./MentorChatBubble";
import MyChatBubble from "./MyChatBubble";
import ChatInput from "./ChatInput";

interface ChatContainerProps {
  mentorBgColor: string;
  myBgColor: string;
  scrollbarColor: string; // 스크롤바 색상을 위한 새로운 prop 추가
  messages: string[];
  onSendMessage: (message: string) => void;
}

// CSSProperties 타입 확장
interface CustomCSSProperties extends CSSProperties {
  "--scrollbar-color"?: string;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  mentorBgColor,
  myBgColor,
  scrollbarColor,
  messages,
  onSendMessage,
}) => {
  const [messageList, setMessageList] = useState<string[]>(messages);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="relative bg-white bg-opacity-80 rounded-3xl p-8 w-[60vh] h-[80vh] flex flex-col justify-between">
        <div
          className="flex-grow overflow-y-scroll font-syndinaroo text-red-500 space-y-4"
          style={{ "--scrollbar-color": scrollbarColor } as CustomCSSProperties}
        >
          {messageList.map((message, index) => (
            <div key={index}>
              {message.startsWith("Client:") ? (
                <MyChatBubble
                  chatMessage={message.replace("Client: ", "")}
                  bgColor={myBgColor}
                />
              ) : (
                <MentorChatBubble
                  chatMessage={message}
                  bgColor={mentorBgColor}
                />
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
