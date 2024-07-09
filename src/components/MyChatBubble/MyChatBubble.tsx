import React from 'react';
import MyName from './MyName';
import MyChatMessage from './MyChatMessage';

const MyChatBubble = () => {
  return (
    <div className="relative flex items-center justify-end">
      <div className="relative flex flex-col items-center top-24 z-20 mr-[100px] left-20">
        <MyChatMessage />
      </div>
      <div className="absolute top-22 right-2 z-30">
        <MyName />
      </div>
    </div>
  );
};

export default MyChatBubble;
