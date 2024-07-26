import React from "react";
import baek_mentorChatBubble from "../../assets/images/baek_mentorChatBubble.svg";
import shin_mentorChatBubble from "../../assets/images/shin_mentorChatBubble.svg";
import oh_mentorChatBubble from "../../assets/images/oh_mentorChatBubble.svg";

interface MentorChatBubbleProps {
  chatMessage: string | undefined;
  bgColor: string;
  mentorType: "baek" | "shin" | "oh"; // mentorType prop 추가
}

const MentorChatBubble: React.FC<MentorChatBubbleProps> = ({
  chatMessage,
  bgColor,
  mentorType,
}) => {
  const getImageSrc = (type: "baek" | "shin" | "oh") => {
    switch (type) {
      case "shin":
        return shin_mentorChatBubble;
      case "oh":
        return oh_mentorChatBubble;
      case "baek":
      default:
        return baek_mentorChatBubble;
    }
  };

  return (
    <div>
      {/* 데스크탑 버전 시작 */}
      <div className="hidden md:flex flex-col w-full mb-2.5 pl-7 box-border md:mb-1.5 md:pl-5">
        <div
          className={`flex p-3 flex-col mr-auto max-w-[16rem] rounded-t-xl rounded-br-xl ${bgColor} text-dateTextColor break-words overflow-wrap text-[1.25rem] md:text-[1rem] border border-gray-200`}
        >
          {chatMessage}
        </div>
      </div>
      {/* 데스크탑 버전 끝 */}

      {/* 모바일 버전 시작 */}
      <div className="block md:hidden flex-col w-full mb-5 pl-7 box-border relative">
        <img
          src={getImageSrc(mentorType)} // mentorType에 따라 이미지 선택
          alt="Mentor"
          className="w-16 absolute top-0 left-1 transform -translate-y-2/3 z-10"
        />
        <div
          className={`flex flex-1 p-3 flex-col mr-auto max-w-[16rem] rounded-t-xl rounded-br-xl ${bgColor} text-dateTextColor break-words overflow-wrap text-[0.9rem] md:text-[1rem] border border-gray-200 relative z-20`}
        >
          {chatMessage}
        </div>
      </div>
      {/* 모바일 버전 끝 */}
    </div>
  );
};

export default MentorChatBubble;
