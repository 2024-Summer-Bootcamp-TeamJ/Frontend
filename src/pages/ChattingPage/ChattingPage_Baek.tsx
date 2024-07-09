import React from 'react';
import MentorChatBubble from '../../components/MentorChatBubble/ChatBubble';
import MyChatBubble from '../../components/MyChatBubble/MyChatBubble';
import { ThemeProvider } from '../../ThemeContext';
import { themes } from '../../theme';
import backgroundBeak from '../../assets/images/backgroundBeak.svg';

const ChattingPageBaek = () => {
  return (
    <ThemeProvider initialTheme={themes.beak}>
      <div 
        className="min-h-screen bg-cover bg-center" 
        style={{ backgroundImage: `url(${backgroundBeak})` }}
      >
        <header className="App-header">
          <MentorChatBubble />
          <MyChatBubble />
          <MentorChatBubble />
          <MyChatBubble />
          <MentorChatBubble />
          <MyChatBubble />
        </header>
      </div>
    </ThemeProvider>
  );
};

export default ChattingPageBaek;
