import React from "react";

interface MyChatBubbleProps {
  chatMessage: string | undefined;
  bgColor: string;
}

const MyChatBubble: React.FC<MyChatBubbleProps> = ({
  chatMessage,
  bgColor,
}) => {
  return (
    <div>
      <div>
        {/* 데스크탑 버전 시작 */}
        <div className="hidden md:flex flex-col w-full mb-2.5 pr-7 box-border md:mb-1.5 md:pr-5">
          <div
            className={`flex p-3 flex-col ml-auto max-w-full rounded-t-xl rounded-bl-xl ${bgColor} text-dateTextColor break-words overflow-wrap text-[1.25rem] md:text-[1rem] border border-gray-200`}
          >
            {chatMessage}
          </div>
        </div>
        {/* 데스크탑 버전 끝 */}

        {/* 모바일 버전 시작 */}
        <div className="block md:hidden flex flex-col w-full mb-5 pr-7 box-border md:mb-1.5 md:pr-5">
          <div
            className={`flex p-3 flex-col ml-auto max-w-full rounded-t-xl rounded-bl-xl ${bgColor} text-dateTextColor break-words overflow-wrap text-[0.9rem] border border-gray-200`}
          >
            {chatMessage}
          </div>
        </div>
        {/* 모바일 버전 끝 */}
      </div>
    </div>
  );
};

export default MyChatBubble;
