import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MentorPage from "./pages/MentorPage";
import ChattingPage_Baek from "./pages/ChattingPage/ChattingPage_Baek";
import ChattingPage_Oh from "./pages/ChattingPage/ChattingPage_Oh";
import ChattingPage_Shin from "./pages/ChattingPage/ChattingPage_Shin";
import MyPage from "./pages/MyPage";
import PrescriptionPage from "./pages/PrescriptionPage"; // 추가한 페이지

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MentorPage />} />
        <Route path="/chat/baek" element={<ChattingPage_Baek />} />
        <Route path="/chat/oh" element={<ChattingPage_Oh />} />
        <Route path="/chat/shin" element={<ChattingPage_Shin />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/prescription" element={<PrescriptionPage />} /> {/* 추가한 경로 */}
      </Routes>
    </Router>
  );
}

export default App;
