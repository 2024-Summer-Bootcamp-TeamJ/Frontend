import React from 'react';
import MentorChatBubble from '../../components/MentorChatBubble/ChatBubble';
import MyChatBubble from '../../components/MyChatBubble/MyChatBubble';
import { ThemeProvider } from '../../ThemeContext';
import { themes } from '../../theme';
import backgroundOh from '../../assets/images/backgroundOh.svg';

const ChattingPageOh = () => {
  return (
    <ThemeProvider initialTheme={themes.oh}>
      <div 
        className="min-h-screen bg-cover bg-center" 
        style={{ backgroundImage: `url(${backgroundOh})` }}
      >
        <header className="App-header">
          <MentorChatBubble />
          <MyChatBubble />
        </header>
      </div>
    </ThemeProvider>
  );
};

export default ChattingPageOh;
