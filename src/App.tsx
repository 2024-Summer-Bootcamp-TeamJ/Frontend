import "./App.css";
import FirstPage from "./pages/FirstPage";
import MentorPage from "./pages/MentorPage";
import MyPage from "./pages/MyPage";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import React from "react";
import ChatBubble from "./components/ChatBubble/ChatBubble";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MyPage />} />
        <Route path="/mentor" element={<MentorPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Router>
  );
};

export default App;
