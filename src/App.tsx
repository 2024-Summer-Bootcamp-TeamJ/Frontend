import React from 'react';
import MentorChatBubble from './components/MentorChatBubble/ChatBubble';
import MyChatBubble from './components/MyChatBubble/MyChatBubble';
import { ThemeProvider, useTheme } from './ThemeContext';
import { themes } from './theme';

const ThemeSelector = () => {
  const { setTheme, theme } = useTheme();

  const handleThemeChange = (newTheme: typeof themes.beak) => {
    console.log('Changing theme to:', newTheme);
    setTheme(newTheme);
    console.log('Current theme:', theme);
  };

  return (
    <div>
      <button onClick={() => handleThemeChange(themes.oh)}>oh</button>
      <button onClick={() => handleThemeChange(themes.beak)}>beak</button>
      <button onClick={() => handleThemeChange(themes.shin)}>shin</button>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <div className="App">
        <header className="App-header">
          <ThemeSelector />
          <MentorChatBubble />
          <MyChatBubble />
        </header>
      </div>
    </ThemeProvider>
  );
};

export default App;
