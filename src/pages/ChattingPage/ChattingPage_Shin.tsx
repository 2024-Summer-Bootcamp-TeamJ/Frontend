import React from 'react';
import MentorChatBubble from '../../components/MentorChatBubble/ChatBubble';
import MyChatBubble from '../../components/MyChatBubble/MyChatBubble';
import { ThemeProvider } from '../../ThemeContext';
import { themes } from '../../theme';
import backgroundShin from '../../assets/images/backgroundShin.svg';

const ChattingPageShin = () => {
  return (
    <ThemeProvider initialTheme={themes.shin}>
      <div 
        className="min-h-screen bg-cover bg-center" 
        style={{ backgroundImage: `url(${backgroundShin})` }}
      >
        <header className="App-header">
          <MentorChatBubble />
          <MyChatBubble />
        </header>
      </div>
    </ThemeProvider>
  );
};

export default ChattingPageShin;
