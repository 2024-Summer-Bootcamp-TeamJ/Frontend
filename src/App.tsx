import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChattingPageBaek from './pages/ChattingPage/ChattingPage_Baek';
import ChattingPageOh from './pages/ChattingPage/ChattingPage_Oh';
import ChattingPageShin from './pages/ChattingPage/ChattingPage_Shin';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/chatting/baek" element={<ChattingPageBaek />} />
        <Route path="/chatting/oh" element={<ChattingPageOh />} />
        <Route path="/chatting/shin" element={<ChattingPageShin />} />
        <Route path="/" element={
          <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">Select a Chat</h1>
            <div className="w-full max-w-md">
              <a href="/chatting/baek" className="block mb-2 p-2 bg-red-500 text-white rounded">Chat with Baek</a>
              <a href="/chatting/oh" className="block mb-2 p-2 bg-green-500 text-white rounded">Chat with Oh</a>
              <a href="/chatting/shin" className="block p-2 bg-yellow-500 text-white rounded">Chat with Shin</a>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;
