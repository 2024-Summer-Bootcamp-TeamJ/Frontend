import React from 'react';
import { useTheme } from '../../ThemeContext';

const MyChatMessage = () => {
  const { theme } = useTheme();
  console.log('MyChatMessage theme:', theme);

  return (
    <div className="relative flex justify-center items-center">
      <div
        className="w-[300px] min-h-[80px] rounded-[50px] flex items-center text-sm p-6"
        style={{ backgroundColor: theme.chatMessageBg }}
      >
        <p className="text-base leading-relaxed">
        I've been thinkin' 'bout you, for quite a while You're on my mind every day and every night My every thought is you, the things you do Seem so satisfying to me, I must confess it, girl
        </p>
      </div>
    </div>
  );
};

export default MyChatMessage;
