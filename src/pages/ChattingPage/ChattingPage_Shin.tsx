import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ChatContainer from "../../components/chat/ChatContainer";
import backgroundShin from "../../assets/images/backgroundShin.svg";
import characterShin from "../../assets/images/shin.svg";
import chatBubbleImage from "../../assets/images/chatbubble.png";
import button from "../../assets/audios/button.mp3";
import Button from "../../components/FirstPage/Button";
import { useStore } from "../../store/store"; // Zustand store import

const ChattingPageShin: React.FC = () => {
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
      `${import.meta.env.VITE_API_URL.replace(/^http/, "ws")}/api/ws/chatrooms/${chatroomId}?user_id=${userId}`
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
        setLatestServerMessage(data.message);
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

      if (wsRef.current) {
        wsRef.current.close();
      }

      navigate("/prescription", {
        state: { chatroomId: chatroomId, userId },
      }); // userId를 포함하여 navigate
    } catch (error) {
      console.error("Error navigating to prescription page:", error);
    }
  };

  return (
    <div>
      <div
        className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${backgroundShin})` }}
      >
        <div className="absolute top-4 right-4">
          <Button
            text="대화 종료하기"
            color="bg-pink-500 w-32 pt-3 pb-3 font-bold"
            onClick={endChatAndGoToPrescription}
          />
        </div>
        {/* 데스크탑 버전 시작 */}
        <div className="hidden md:block relative items-center justify-center w-full max-w-6xl px-2 py-4 bg-gray-100 bg-opacity-90 rounded-3xl shadow-md">
          <div className="relative flex items-center space-x-40 px-0 py-8 overflow-visible">
            <div className="relative ml-16 mb-12">
              <img
                src={characterShin}
                alt="Shin"
                className="w-72 ml-16 h-auto relative bounce-animation"
                draggable="false"
                style={{ transform: "scale(2.5)" }}
              />
              <div className="absolute top-18 left-1/2 transform -translate-x-1/2 -translate-y-16">
                <img
                  src={chatBubbleImage}
                  alt="Chat Bubble"
                  className="w-60 h-auto z-20 ml-4 -mt-4"
                  style={{ transform: "scale(2.5)" }}
                  draggable="false"
                />
                <div
                  className="absolute bottom-4 -left-12 w-full h-full flex items-center justify-center"
                  style={{ width: "180%", height: "100%" }}
                >
                  <p
                    className="text-center text-3xl text-dateTextColor font-syndinaroo"
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
                mentorType="shin" // mentorType을 shin으로 설정
              />
            </div>
          </div>
        </div>
        {/* 데스크탑 버전 끝 */}
        {/* 모바일버전 시작 */}
        <div className="md:hidden relative flex items-center justify-center py-4 bg-gray-100 bg-opacity-90 rounded-3xl shadow-md">
          <div className="relative flex items-center overflow-visible w-full max-w-md">
            <div className="overflow-visible w-full mx-4">
              <ChatContainer
                mentorBgColor="bg-[#FFF9DD]"
                myBgColor="bg-[#FDF2BB]"
                scrollbarColor="#FDA5FE"
                messages={messages}
                onSendMessage={sendMessage}
                mentorType="shin" // mentorType을 shin으로 설정
              />
            </div>
          </div>
        </div>
        {/* 모바일버전 끝 */}
      </div>
    </div>
  );
};

export default ChattingPageShin;
