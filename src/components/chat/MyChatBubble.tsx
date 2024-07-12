import React from 'react';

interface MyChatBubbleProps {
  chatMessage: string | undefined;
  bgColor: string;
}

const MyChatBubble: React.FC<MyChatBubbleProps> = ({ chatMessage, bgColor }) => {
  return (
    <div className="flex flex-col w-full mb-2.5 pr-7 box-border md:mb-1.5 md:pr-5">
      <div className={`flex p-3 flex-col ml-auto max-w-[16rem] rounded-t-xl rounded-bl-xl ${bgColor} text-dateTextColor break-words overflow-wrap text-[1.25rem] md:text-[1rem] border border-gray-200`}>
        {chatMessage}
      </div>
    </div>
  );
};

export default MyChatBubble;
