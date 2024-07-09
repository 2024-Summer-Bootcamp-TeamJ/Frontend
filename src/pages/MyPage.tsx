import IconMouse from "../assets/images/IconMouse.svg";
import IconLetter from "../assets/images/IconLetter.svg";
import IconToHome from "../assets/images/IconToHome.svg";
import PostBox from "../assets/images/PostBox.svg";
import MyPageBackground from "../assets/images/MyPageBackground.svg";

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
        </div>
      </div>
    </div>
  );
};
export default MyPage;
