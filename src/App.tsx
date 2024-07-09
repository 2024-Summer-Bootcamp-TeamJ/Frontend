import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ChattingPageBaek from './pages/ChattingPage/ChattingPage_Baek';
import ChattingPageOh from './pages/ChattingPage/ChattingPage_Oh';
import ChattingPageShin from './pages/ChattingPage/ChattingPage_Shin';

const App = () => {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/baek">Baek</Link>
            </li>
            <li>
              <Link to="/oh">Oh</Link>
            </li>
            <li>
              <Link to="/shin">Shin</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/baek" element={<ChattingPageBaek />} />
          <Route path="/oh" element={<ChattingPageOh />} />
          <Route path="/shin" element={<ChattingPageShin />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
