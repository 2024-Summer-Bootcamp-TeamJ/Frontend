import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MentorPage from "./pages/MentorPage";
import ChattingPage_Baek from "./pages/ChattingPage/ChattingPage_Baek";
import ChattingPage_Oh from "./pages/ChattingPage/ChattingPage_Oh";
import ChattingPage_Shin from "./pages/ChattingPage/ChattingPage_Shin";
import MyPage from "./pages/MyPage";
import Mobile_MyPage from "./pages/Mobile_MyPage";
import PrescriptionPage from "./pages/PrescriptionPage";
import Mobile_PrescriptionPage from "./pages/Mobile_PrescriptionPage";
import FirstPage from "./pages/FirstPage";
import NotFoundPage from "./pages/NotFoundPage";

import "./index.css";
import CustomCursor from "./components/CustomCursor";
import React from "react";

function App() {
  return (
    <Router>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/mentor" element={<MentorPage />} />
        <Route path="/chat/baek" element={<ChattingPage_Baek />} />
        <Route path="/chat/oh" element={<ChattingPage_Oh />} />
        <Route path="/chat/shin" element={<ChattingPage_Shin />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/prescription" element={<PrescriptionPage />} />
        <Route path="/first" element={<FirstPage />} />
        <Route path="/mobile_mypage" element={<Mobile_MyPage />} />
        <Route
          path="/mobile_prescription"
          element={<Mobile_PrescriptionPage />}
        />
        <Route
          path="/prescription/:prescription_id"
          element={<PrescriptionPage />}
        />
        <Route path="*" element={<NotFoundPage />} />{" "}
        {/* 모든 경로에 대해 404 페이지 설정 */}
      </Routes>
    </Router>
  );
}

export default App;
