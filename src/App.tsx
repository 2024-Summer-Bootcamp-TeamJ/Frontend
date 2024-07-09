
import "./App.css";
import FirstPage from "./pages/FirstPage";
import MentorPage from "./pages/MentorPage";
import "./index.css";

import React from 'react';
import ChatBubble from './components/ChatBubble/ChatBubble';
import FirstPage from './pages/FirstPage';


const App = () => {
  return (
    <div className="App">

      <header className="App-header">

        <MentorPage />

      </header>

    </div>
  );
};

export default App;
