import React from 'react';
import { useTheme } from '../../ThemeContext';

const ChatMessage = () => {
  const { theme } = useTheme();
  console.log('ChatMessage theme:', theme);

  return (
    <div className="relative flex justify-center items-center">
      <div
        className="w-[300px] min-h-[80px] rounded-[50px] flex items-center text-sm p-8"
        style={{ backgroundColor: theme.chatMessageBg }}
      >
        <p className="text-base leading-relaxed">
        미쳤냐곰 말도 안되는 소리 하지 말라곰 그러다 망한다곰
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
