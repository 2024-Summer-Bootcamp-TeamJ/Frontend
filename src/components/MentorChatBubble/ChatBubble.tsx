import React from 'react';
import MentorName from './MentorName';
import ChatMessage from './ChatMessage';
import CharacterImage from './CharacterImage';

const ChatBubble = () => {
  return (
    <div className="relative flex items-center">
      <div className="absolute top-16 z-30 left-2">
        <MentorName />
      </div>
      <div className="relative flex flex-col items-center top-20 z-20 ml-[100px] right-20">
        <ChatMessage />
      </div>
      <div className="absolute left-60 top-5 z-10">
        <CharacterImage />
      </div>
    </div>
  );
};

export default ChatBubble;
