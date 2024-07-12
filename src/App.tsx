import "./App.css";
import FirstPage from "./pages/FirstPage";
import MentorPage from "./pages/MentorPage";
import MyPage from "./pages/MyPage";
import PrescriptionPage from "./pages/PrescriptionPage";
import ChattingPageBaek from "./pages/ChattingPage/ChattingPage_Baek"
import ChattingPageOh from "./pages/ChattingPage/ChattingPage_Oh"
import ChattingPageShin from "./pages/ChattingPage/ChattingPage_Shin"

import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import React from "react";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/mentor" element={<MentorPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/prescription" element={<PrescriptionPage />} />
        <Route path="/first" element={<FirstPage />} />
        <Route path="/chat/baek" element={<ChattingPageBaek />} />
        <Route path="/chat/oh" element={<ChattingPageOh />} />
        <Route path="/chat/Shin" element={<ChattingPageShin />} />
      </Routes>
    </Router>
  );
};

export default App;
