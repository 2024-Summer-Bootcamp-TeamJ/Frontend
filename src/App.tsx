import "./App.css";
import FirstPage from "./pages/FirstPage";
import MentorPage from "./pages/MentorPage";
import MyPage from "./pages/MyPage";
import "./index.css";

import React from "react";
import ChatBubble from "./components/ChatBubble/ChatBubble";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <MyPage />
      </header>
    </div>
  );
};

export default App;
