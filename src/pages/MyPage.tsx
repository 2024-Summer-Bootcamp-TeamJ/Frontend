import IconMouse from "../assets/images/IconMouse.svg";
import IconLetter from "../assets/images/IconLetter.svg";
import IconToHome from "../assets/images/IconToHome.svg";
import PostBox from "../assets/images/PostBox.svg";
import MyPageBackground from "../assets/images/MyPageBackground.svg";
import letterButton from "../assets/images/letterButton.svg";

import React, { useState } from "react";

const MyPage: React.FC = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-blue-100 relative"
      style={{
        backgroundImage: `url(${MyPageBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute top-4 left-4">
        <img src={IconToHome} alt="To Home Icon" className="w-14" />
      </div>
      <div className="flex space-x-6">
        <div className="flex flex-col justify-end">
          <img src={PostBox} alt="PostBox" className="w-96 mb-10" />
        </div>{" "}
        <div
          style={{ width: "48rem", height: "36rem" }}
          className="bg-lettersColor p-6 rounded-100px shadow-lg "
        >
          {/* 여기 안에 필요한 내용을 추가하세요 */}
          <div className="flex justify-center mb-4">
            <img src={letterButton} alt="Letter Button" className="w-60" />
          </div>
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2 p-2 bg-gray-100 rounded-md w-full">
              <img src={IconMouse} alt="Mouse Icon" className="w-6 h-6" />
              <img src={IconLetter} alt="Letter Icon" className="w-6 h-6" />
              <span className="text-gray-700">2024.07.06</span>
            </div>
            {/* 동일한 요소들을 여러 개 추가 */}
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 p-2 bg-gray-100 rounded-md w-full"
              >
                <img src={IconLetter} alt="Letter Icon" className="w-6 h-6" />
                <span className="text-gray-700 font-['NoticiaText']">
                  2024.07.06
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyPage;
