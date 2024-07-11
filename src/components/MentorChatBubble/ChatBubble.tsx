import React from 'react';
import MentorName from './MentorName';
import ChatMessage from './ChatMessage';

const ChatBubble = () => {
  return (
    <div className="relative flex items-center">
      <div className="absolute top-10 left-10 z-30">
        <MentorName />
      </div>
      <div className="relative flex flex-col items-center top-16 z-20">
        <ChatMessage />
      </div>
    </div>
  );
};

export default ChatBubble;
