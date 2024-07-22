import React from "react";
import baek_mentorChatBubble from "../../assets/images/baek_mentorChatBubble.svg";

interface MentorChatBubbleProps {
  chatMessage: string | undefined;
  bgColor: string;
}

const MentorChatBubble: React.FC<MentorChatBubbleProps> = ({
  chatMessage,
  bgColor,
}) => {
  return (
    <div>
      {/* 데스크탑 버전 시작 */}

      <div className="hidden md:block flex flex-col w-full mb-2.5 pl-7 box-border md:mb-1.5 md:pl-5">
        <div
          className={`flex flex-1 p-3 flex-col mr-auto max-w-[16rem] rounded-t-xl rounded-br-xl ${bgColor} text-dateTextColor break-words overflow-wrap text-[1.25rem] md:text-[1rem] border border-gray-200`}
        >
          {chatMessage}
        </div>
      </div>
      {/* 데스크탑 버전 끝 */}

      {/* 모바일 버전 시작 */}
      <div className="block md:hidden flex-col w-full mb-2.5 pl-7 box-border md:mb-1.5 md:pl-5 relative">
        <img
          src={baek_mentorChatBubble}
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
