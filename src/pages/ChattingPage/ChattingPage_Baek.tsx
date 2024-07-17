import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import ChatContainer from '../../components/chat/ChatContainer';
import backgroundBaek from '../../assets/images/backgroundBaek.svg';
import characterBaek from '../../assets/images/Baek.svg';
import chatBubbleImage from '../../assets/images/chatbubble.png';
import Button from '../../components/FirstPage/Button';
import { useStore } from '../../store/store'; // Zustand store import

const ChattingPageBaek: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const chatroomId = location.state?.chatroomId;
  const userId = useStore(state => state.userId);

  const deleteChatroom = useStore((state) => state.deleteChatroom); // Zustand store의 deleteChatroom 액션 가져오기
  const [messages, setMessages] = useState<string[]>([]);
  const [latestServerMessage, setLatestServerMessage] = useState<string>('고민이 많아서 힘들었겠구나. 그렇다면 내가 하는 말을 잘 들어봐.');
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    console.log('chatroomId:', chatroomId);
    console.log('userId:', userId);

    if (!chatroomId || !userId) {
      console.error('chatroomId or userId is not defined');
      return;
    }

    const ws = new WebSocket(`ws://localhost:8000/api/ws/chatrooms/${chatroomId}?user_id=${userId}`);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('Connected to the WebSocket');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const eventType = data.event;
      console.log(eventType);
      if (eventType === 'connect' || eventType === 'server_message') {
        setMessages((prevMessages) => [...prevMessages, data.message]);
        if (eventType === 'server_message') {
          setLatestServerMessage(data.message);
        }
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from the WebSocket');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error', error);
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [chatroomId, userId]);

  const sendMessage = (message: string) => {
    if (wsRef.current) {
      wsRef.current.send(message);
      setMessages((prevMessages) => [...prevMessages, `Client: ${message}`]);
    }
  };

  const endChatAndGoToPrescription = async () => {
    try {
      if (!chatroomId) {
        console.error('chatroomId is not defined');
        return;
      }

      if (wsRef.current) {
        wsRef.current.close();
      }

      // console.log(`Deleting chatroom with id: ${chatroomId}`); // Chatroom ID 출력
      // const response = await axios.delete(`http://localhost:8000/api/chatrooms/${chatroomId}`);
      // console.log('Chatroom deleted successfully', response);
      // deleteChatroom(chatroomId); // Zustand store에서 chatroom 삭제
      navigate("/prescription", { state: { chatroomId } });
    } catch (error) {
      // if (axios.isAxiosError(error)) {
      //   console.error('Error deleting chatroom:', error.response ? error.response.data : error.message);
      // } else {
      //   console.error('Unexpected error:', error);
      // }
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundBaek})` }}
    >
      <div className="absolute top-4 right-4">
        <Button text="대화 종료하기" color="bg-green-700 pt-3 pb-3" onClick={endChatAndGoToPrescription} />
      </div>
      <div className="relative flex items-center justify-center w-full max-w-6xl px-2 py-4 bg-green-50 bg-opacity-90 rounded-3xl shadow-md">
        <div className="relative flex items-center space-x-40 px-0 py-8 overflow-visible">
          <div className="relative ml-16 mb-12">
            <img src={characterBaek} alt="Baek" className="w-72 ml-16 h-auto relative" />
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
                  {latestServerMessage}
                </p>
              </div>
            </div>
          </div>
          <div className="ml-0 overflow-visible">
            <ChatContainer mentorBgColor="bg-[#F0FDDE]" myBgColor="bg-[#DEFFB2]" messages={messages} onSendMessage={sendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChattingPageBaek;
