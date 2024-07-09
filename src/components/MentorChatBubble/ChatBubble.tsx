import React from 'react';
import MentorName from './MentorName';
import ChatMessage from './ChatMessage';
import CharacterImage from './CharacterImage';

const ChatBubble = () => {
  return (
    <div className="relative flex items-center">
      <div className="absolute top-32 z-30 left-40">
        <MentorName />
      </div>
      <div className="relative flex flex-col items-center top-36 z-20 ml-[100px] left-20">
        <ChatMessage />
      </div>
      <div className="relative flex -left-10 z-10">
        <CharacterImage />
      </div>
    </div>
  );
};

export default ChatBubble;
