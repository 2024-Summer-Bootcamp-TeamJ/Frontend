import React from 'react';

interface MentorChatBubbleProps {
  chatMessage: string | undefined;
  bgColor: string;
}

const MentorChatBubble: React.FC<MentorChatBubbleProps> = ({ chatMessage, bgColor }) => {
  return (
    <div className="flex flex-col w-full mb-2.5 pl-7 box-border md:mb-1.5 md:pl-5">
      <div className={`flex flex-1 p-3 flex-col mr-auto max-w-[15rem] rounded-t-xl rounded-br-xl ${bgColor} text-black break-words overflow-wrap text-[1.25rem] md:text-[1rem] border border-gray-200`}>
        {chatMessage}
      </div>
    </div>
  );
};

export default MentorChatBubble;
