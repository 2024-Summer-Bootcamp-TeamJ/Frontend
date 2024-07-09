import React from 'react';
import MentorName from './MentorName';
import ChatMessage from './ChatMessage';
import CharacterImage from './CharacterImage';

const ChatBubble = () => {
  return (
    <div className="relative flex items-center">
      <div className="absolute top-20 z-30">
        <MentorName />
      </div>
      <div className="relative top-20 z-20">
        <ChatMessage />
      </div>
      <div className="relative right-24 top-5 z-10">
        <CharacterImage />
      </div>
    </div>
  );
};

export default ChatBubble;
