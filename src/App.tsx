import "./App.css";
import FirstPage from "./pages/FirstPage";
import MentorPage from "./pages/MentorPage";
import MyPage from "./pages/MyPage";
import PrescriptionPage from "./pages/PrescriptionPage";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import React from "react";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MyPage />} />
        <Route path="/mentor" element={<MentorPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/prescription" element={<PrescriptionPage />} />
      </Routes>
    </Router>
  );
};

export default App;
