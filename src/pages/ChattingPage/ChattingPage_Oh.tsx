import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import ChatContainer from "../../components/chat/ChatContainer";
import backgroundOh from "../../assets/images/backgroundOh.svg";
import characterOh from "../../assets/images/oh.svg";
import chatBubbleImage from "../../assets/images/chatbubble.png";
import Button from "../../components/FirstPage/Button";

const ChattingPageOh: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const chatroomId = location.state?.chatroomId;

  const endChatAndGoToPrescription = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/chatrooms/${chatroomId}`);
      console.log("Chatroom deleted successfully");
      navigate("/prescription");
    } catch (error) {
      console.error("Error deleting chatroom:", error);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundOh})` }}
    >
      <div className="absolute top-4 right-4">
        <Button
          text="대화 종료하기"
          color="bg-pink-500 pt-3 pb-3"
          onClick={endChatAndGoToPrescription}
        />
      </div>
      <div className="relative flex items-center justify-center w-full max-w-6xl px-2 py-4 bg-gray-100 bg-opacity-90 rounded-3xl shadow-md">
        <div className="relative flex items-center space-x-40 px-0 py-8 overflow-visible">
          <div className="relative ml-16 mb-12">
            <img
              src={characterOh}
              alt="Oh"
              className="w-80 ml-8 h-auto relative"
            />
            <div className="absolute top-18 left-1/2 transform -translate-x-1/2 -translate-y-16">
              <img
                src={chatBubbleImage}
                alt="Chat Bubble"
                className="w-60 h-auto z-20 ml-4 -mt-4"
                style={{ transform: "scale(2.5)" }}
              />
              <div
                className="absolute bottom-4 -left-12 w-full h-full flex items-center justify-center"
                style={{ width: "180%", height: "100%" }}
              >
                <p
                  className="text-center text-3xl text-dateTextColor font-syndinaroo"
                  style={{ transform: "scale(1)" }}
                >
                  고민이 많아서 힘들었겠구나. 그렇다면 내가 하는 말을 잘 들어봐.
                </p>
              </div>
            </div>
          </div>
          <div className="ml-0 overflow-visible">
            <ChatContainer
              mentorBgColor="bg-[#FFF9DD]"
              myBgColor="bg-[#FDF2BB]"
              scrollbarColor="#FDA5FE"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChattingPageOh;
