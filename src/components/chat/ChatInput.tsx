import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import _ from 'lodash';

interface ChatInputProps {
  onSend: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSend = _.throttle(() => {
    if (message.trim() !== '') {
      console.log('Throttled handleSend called');
      onSend(message);
      setMessage('');
    }
  }, 1000);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex items-center p-2 bg-white rounded-full shadow-md bg-opacity-70">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="메시지를 입력하세요..."
        className="flex-grow p-2 bg-transparent rounded-l-full outline-none"
      />
      <button
        onClick={handleSend}
        className="flex items-center justify-center p-2 text-gray-600 rounded-r-full hover:bg-gray-200"
      >
        <FiSend className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ChatInput;
