import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ChatContainer from "../../components/chat/ChatContainer";
import backgroundOh from "../../assets/images/backgroundOh.svg";
import characterOh from "../../assets/images/oh.svg";
import chatBubbleImage from "../../assets/images/chatbubble.png";
import Button from "../../components/FirstPage/Button";
import { useStore } from "../../store/store"; // Zustand store import
import LoadingModal from "../../components/LoadingModal"; // LoadingModal import

const ChattingPageOh: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const chatroomId = location.state?.chatroomId;
  const userId = useStore((state) => state.userId);

  const [messages, setMessages] = useState<string[]>([]);
  const [latestServerMessage, setLatestServerMessage] = useState<string>(
    "고민이 많아서 힘들었겠구나. 그렇다면 내가 하는 말을 잘 들어봐."
  );
  const wsRef = useRef<WebSocket | null>(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  const splitIntoSentences = (text: string) => {
    return text.match(/[^\.!\?]+[\.!\?]+/g)?.map(sentence => sentence.trim()) || [];
  };

  const connectWebSocket = () => {
    if (!chatroomId || !userId) {
      console.error("chatroomId or userId is not defined");
      return;
    }

    if (
      wsRef.current &&
      (wsRef.current.readyState === WebSocket.OPEN ||
        wsRef.current.readyState === WebSocket.CONNECTING)
    ) {
      console.log("WebSocket is already connected or connecting");
      return;
    }

    const ws = new WebSocket(
      `${import.meta.env.VITE_API_URL.replace(/^http/, "ws")}/ws/chatrooms/${chatroomId}?user_id=${userId}`
    );
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("Connected to the WebSocket");
      setSocketConnected(true);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const eventType = data.event;
      console.log("WebSocket message received:", data);

      if (eventType === "server_message") {
        setMessages((prevMessages) => [...prevMessages, data.message]);

        const messages = data.message.split(/(?<=[.!?])\s*/); // !, ? 또는 . 뒤에 공백으로 문장 분리
        let index = 0;

        // 문장 표시 함수
        const displayNextMessage = () => {
          if (index < messages.length) {
            setLatestServerMessage(messages[index]);

            index++;
            // 다음 문장을 1초 후에 표시
            setTimeout(displayNextMessage, 2000);
          }
        };

        // 문장 표시 시작
        displayNextMessage();
    
        
        if (data.audio) {
          const audio = new Audio(`data:audio/mp3;base64,${data.audio}`);
          audio
            .play()
            .catch((error) => console.error("Error playing audio:", error));
        }
      }
    };

    ws.onclose = (event) => {
      console.log("Disconnected from the WebSocket", event);
      setSocketConnected(false);
      if (!event.wasClean) {
        console.log("Connection died, reconnecting...");
        setTimeout(connectWebSocket, 1000); // 1초 후에 재연결 시도
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error", error);
    };
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [chatroomId, userId]);

  const sendMessage = (message: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(message);
      setMessages((prevMessages) => [...prevMessages, `Client: ${message}`]);
    } else {
      console.error("WebSocket is not open");
    }
  };

  const endChatAndGoToPrescription = async () => {
    try {
      if (!chatroomId) {
        console.error("chatroomId is not defined");
        return;
      }

      // 대화 종료 요청을 서버에 보냄
      if (wsRef.current) {
        wsRef.current.send(JSON.stringify({ event: "end_chat" }));
        wsRef.current.close();
      }

      // 로딩 상태 설정
      setIsLoading(true);

      // 3초 동안 대기
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // 처방전 정보를 새로 받아옴
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/prescriptions?user_id=${userId}`
      );
      const prescriptions = await response.json();

      if (prescriptions.length > 0) {
        const latestPrescription = prescriptions[prescriptions.length - 1];
        navigate("/prescription", {
          state: { chatroomId: latestPrescription.id, userId },
        });
      } else {
        console.error("No prescriptions found for the user");
      }
    } catch (error) {
      console.error("Error navigating to prescription page:", error);
    } finally {
      // 로딩 상태 해제
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div
        className="relative flex items-center justify-center min-h-screen bg-center bg-cover"
        style={{ backgroundImage: `url(${backgroundOh})` }}
      >
        <div className="absolute top-4 right-4">
          <Button
            text="대화 종료하기"
            color="bg-pink-500 w-32 pt-3 pb-3 font-bold"
            onClick={endChatAndGoToPrescription}
          />
        </div>
        {/* 데스크탑 버전 시작 */}
        <div className="relative items-center justify-center hidden w-full max-w-6xl px-2 py-4 bg-gray-100 shadow-md md:block bg-opacity-90 rounded-3xl">
          <div className="relative flex items-center px-0 py-8 space-x-40 overflow-visible">
            <div className="relative mb-12 ml-16">
              <img
                src={characterOh}
                alt="Oh"
                className="relative h-auto ml-16 w-72 bounce-animation"
                style={{ transform: "scale(2.5)" }}
                draggable="false"
              />
              <div className="absolute transform -translate-x-1/2 -translate-y-16 top-18 left-1/2">
                <img
                  src={chatBubbleImage}
                  alt="Chat Bubble"
                  className="z-20 h-auto ml-4 -mt-4 w-60"
                  style={{ transform: "scale(2.5)" }}
                  draggable="false"
                />
                <div
                  className="absolute flex items-center justify-center w-full h-full bottom-4 -left-12"
                  style={{ width: "180%", height: "100%" }}
                >
                  <p
                    className="text-3xl text-center text-dateTextColor font-syndinaroo"
                    style={{ transform: "scale(1)" }}
                  >
                    {latestServerMessage}
                  </p>
                </div>
              </div>
            </div>
            <div className="ml-0 overflow-visible">
              <ChatContainer
                mentorBgColor="bg-[#FFF9DD]"
                myBgColor="bg-[#FDF2BB]"
                scrollbarColor="#FDA5FE"
                messages={messages}
                onSendMessage={sendMessage}
                mentorType="oh" // mentorType을 oh로 설정
              />
            </div>
          </div>
        </div>
        {/* 데스크탑 버전 끝 */}
        {/* 모바일버전 시작 */}
        <div className="relative flex items-center justify-center py-4 bg-gray-100 shadow-md md:hidden bg-opacity-90 rounded-3xl">
          <div className="relative flex items-center w-full max-w-md overflow-visible">
            <div className="w-full mx-4 overflow-visible">
              <ChatContainer
                mentorBgColor="bg-[#FFF9DD]"
                myBgColor="bg-[#FDF2BB]"
                scrollbarColor="#FDA5FE"
                messages={messages}
                onSendMessage={sendMessage}
                mentorType="oh" // mentorType을 oh로 설정
              />
            </div>
          </div>
        </div>
        {/* 모바일버전 끝 */}
      </div>
      {isLoading && <LoadingModal />} {/* 로딩 모달 조건부 렌더링 */}
    </div>
  );
};

export default ChattingPageOh;
