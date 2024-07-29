import React, { useEffect, useRef, useState, CSSProperties } from "react";
import MentorChatBubble from "./MentorChatBubble";
import MyChatBubble from "./MyChatBubble";
import ChatInput from "./ChatInput";
import useSound from "use-sound";
import button_pressed from "../../assets/audios/button_pressed.mp3";
import "../../index.css";

interface ChatContainerProps {
  mentorBgColor: string;
  myBgColor: string;
  scrollbarColor: string; // 스크롤바 색상을 위한 새로운 prop 추가
  messages: string[];
  onSendMessage: (message: string) => void;
  mentorType: "baek" | "shin" | "oh"; // mentorType prop 추가
  setIsLoading_chat: (isLoading_chat: boolean) => void; // 로딩 상태 설정 함수 prop 추가
}

// CSSProperties 타입 확장
interface CustomCSSProperties extends CSSProperties {
  "--scrollbar-color"?: string;
}

const splitIntoSentences = (text: string) => {
  return (
    text.match(/[^\.!\?]+[\.!\?]+/g)?.map((sentence) => sentence.trim()) || []
  );
};

const ChatContainer: React.FC<ChatContainerProps> = ({
  mentorBgColor,
  myBgColor,
  scrollbarColor,
  messages,
  onSendMessage,
  mentorType,
  setIsLoading_chat, // 로딩 상태 설정 함수 prop 추가
}) => {
  const [messageList, setMessageList] = useState<string[]>(messages);
  const [play] = useSound(button_pressed); // useSound 훅을 사용하여 효과음 로드
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const previousMessagesRef = useRef<string[]>([]);

  const scrollToBottom = () => {
    console.log("scrollToBottom called");

    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const newMessages = messages.filter(
      (msg) => !previousMessagesRef.current.includes(msg)
    );
    if (newMessages.length > 0) {
      let index = 0;
      const sentences = newMessages.flatMap((msg) => splitIntoSentences(msg));

      const interval = setInterval(() => {
        if (index < sentences.length) {
          const sentence = sentences[index];
          if (sentence) {
            setMessageList((prevMessages) => {
              if (!prevMessages.includes(sentence)) {
                return [...prevMessages, sentence];
              }
              return prevMessages;
            });
            scrollToBottom();
            index++;
          }
        } else {
          clearInterval(interval);
        }
      }, 1500);

      previousMessagesRef.current = [
        ...previousMessagesRef.current,
        ...newMessages,
      ];
      return () => clearInterval(interval);
    }
  }, [messages]);

  useEffect(() => {
    console.log("메세지 리스트 : useEffect triggered");
    scrollToBottom();
  }, [messageList]);

  const handleSendMessage = (message: string) => {
    play(); // 메시지를 보내기 전에 효과음 재생
    setMessageList((prevMessages) => [...prevMessages, `Client: ${message}`]);
    onSendMessage(message);
    setIsLoading_chat(true); // 로딩 상태 설정
  };

  return (
    <div>
      <div>
        {/* 데스크탑 버전 끝 */}
        <div className="relative hidden w-full max-w-3xl mx-auto md:block">
          <div className="relative bg-white bg-opacity-80 rounded-3xl p-8 w-[60vh] h-[80vh] flex flex-col justify-between">
            <div
              className="flex-grow overflow-y-scroll scrollbar2 text-red-500 font-syndinaroo"
              style={
                { "--scrollbar-color": scrollbarColor } as CustomCSSProperties
              }
            >
              {messageList.map((message, index) => (
                <div key={index} className="mb-4">
                  {" "}
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
          <div className="relative flex flex-col w-full h-full p-2 bg-white shadow-lg bg-opacity-80 rounded-3xl">
            <div
              className="flex-grow overflow-y-scroll scrollbar2 text-red-500 font-syndinaroo"
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
