import React, { useEffect, useRef, useState, CSSProperties } from "react";
import MentorChatBubble from "./MentorChatBubble";
import MyChatBubble from "./MyChatBubble";
import ChatInput from "./ChatInput";
import useSound from "use-sound";
import button_pressed from "../../assets/audios/button_pressed.mp3";

interface ChatContainerProps {
  mentorBgColor: string;
  myBgColor: string;
  scrollbarColor: string; // 스크롤바 색상을 위한 새로운 prop 추가
  messages: string[];
  onSendMessage: (message: string) => void;
  mentorType: "baek" | "shin" | "oh"; // mentorType prop 추가
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
  mentorType,
}) => {
  const [messageList, setMessageList] = useState<string[]>(messages);
  const [play] = useSound(button_pressed); // useSound 훅을 사용하여 효과음 로드
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    setMessageList(messages); // messages prop이 변경될 때 messageList를 업데이트
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (message: string) => {
    play(); // 메시지를 보내기 전에 효과음 재생
    setMessageList((prevMessages) => [...prevMessages, `Client: ${message}`]);
    onSendMessage(message);
  };

  return (
    <div>
      <div>
        {/* 데스크탑 버전 끝 */}
        <div className="hidden md:block relative w-full max-w-3xl mx-auto">
          <div className="relative bg-white bg-opacity-80 rounded-3xl p-8 w-[60vh] h-[80vh] flex flex-col justify-between">
            <div
              className="flex-grow overflow-y-scroll font-syndinaroo text-red-500"
              style={
                { "--scrollbar-color": scrollbarColor } as CustomCSSProperties
              }
            >
              {messageList.map((message, index) => (
                <div key={index} className="mb-4">
                  {" "}
                  {/* 간격을 위한 클래스 추가 */}
                  {message.startsWith("Client:") ? (
                    <MyChatBubble
                      chatMessage={message.replace("Client: ", "")}
                      bgColor={myBgColor}
                    />
                  ) : (
                    <MentorChatBubble
                      chatMessage={message}
                      bgColor={mentorBgColor}
                      mentorType={mentorType} // mentorType prop 전달
                    />
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <ChatInput onSend={handleSendMessage} />
          </div>
        </div>
        {/* 데스크탑 버전 끝 */}

        {/* 모바일버전 시작 */}
        <div className="block md:hidden relative items-center overflow-visible w-full max-w-md h-[70vh] p-2">
          <div className="relative flex flex-col w-full h-full bg-white bg-opacity-80 rounded-3xl p-2 shadow-lg">
            <div
              className="flex-grow overflow-y-scroll font-syndinaroo text-red-500"
              style={
                { "--scrollbar-color": scrollbarColor } as CustomCSSProperties
              }
            >
              {messageList.map((message, index) => (
                <div key={index} className="mb-4">
                  {" "}
                  {/* 간격을 위한 클래스 추가 */}
                  {message.startsWith("Client:") ? (
                    <MyChatBubble
                      chatMessage={message.replace("Client: ", "")}
                      bgColor={myBgColor}
                    />
                  ) : (
                    <MentorChatBubble
                      chatMessage={message}
                      bgColor={mentorBgColor}
                      mentorType={mentorType} // mentorType prop 전달
                    />
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <ChatInput onSend={handleSendMessage} />
          </div>
        </div>
      </div>
      {/* 모바일버전 끝 */}
    </div>
  );
};

export default ChatContainer;
