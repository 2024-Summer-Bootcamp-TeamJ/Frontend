import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';

const ChatInput: React.FC = () => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    // 채팅 메시지 로직 추가
    console.log('Message sent:', message);
    setMessage('');
  };

  return (
    <div className="flex items-center p-2 bg-white bg-opacity-70 rounded-full shadow-md">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-grow p-2 bg-transparent outline-none rounded-l-full"
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
