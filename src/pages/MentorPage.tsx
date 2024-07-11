import ProfileFrontShin from "../assets/images/ProfileFrontShin.svg";
import ProfileFrontBaek from "../assets/images/ProfileFrontBaek.svg";
import ProfileFrontOh from "../assets/images/ProfileFrontOh.svg";
import ProfileBackBaek from "../assets/images/ProfileBackBaek.svg";
import ProfileBackOh from "../assets/images/ProfileBackOh.svg";
import ProfileBackShin from "../assets/images/ProfileBackShin.svg";
import IconToMyPage from "../assets/images/IconToMyPage.svg";
import backgroundGreen from "../assets/images/backgroundGreen.svg";
import ChoosingButtonBaek from "../assets/images/ChoosingButtonBaek.svg";
import ChoosingButtonOh from "../assets/images/ChoosingButtonOh.svg";
import ChoosingButtonShin from "../assets/images/ChoosingButtonShin.svg";
import { Link } from "react-router-dom";
import "../index.css";

import React, { useState } from "react";

const MentorPage: React.FC = () => {
  const [isBaekBack, setIsBaekBack] = useState(false);
  const [isOhBack, setIsOhBack] = useState(false);
  const [isShinBack, setIsShinBack] = useState(false);

  const toggleBaekImage = () => {
    setIsBaekBack(!isBaekBack);
  };

  const toggleOhImage = () => {
    setIsOhBack(!isOhBack);
  };

  const toggleShinImage = () => {
    setIsShinBack(!isShinBack);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundGreen})` }} // 인라인 스타일로 배경 이미지 설정
    >
      <div className="flex flex-row justify-center items-center gap-4">
        <div
          className={`relative flex items-center p-4 cursor-pointer flip-card ${
            isBaekBack ? "flip" : ""
          }`}
          onClick={toggleBaekImage}
        >
          <img
            src={ProfileFrontBaek}
            alt="백곰원"
            className={`w-100 flip-card-front ${isBaekBack ? "hidden" : ""}`}
            draggable="false"
          />
          <img
            src={ProfileBackBaek}
            alt="백곰원 뒷면"
            className={`w-100 flip-card-back ${isBaekBack ? "" : "hidden"}`}
            draggable="false"
          />
          {isBaekBack && (
            <img
              src={ChoosingButtonBaek}
              alt="선택하기 버튼 백곰원"
              className="absolute inset-0 mt-136 mx-auto w-50"
              draggable="false"
            />
          )}
        </div>

        <div
          className={`relative flex items-center p-4 cursor-pointer flip-card ${
            isOhBack ? "flip" : ""
          }`}
          onClick={toggleOhImage}
        >
          <img
            src={ProfileFrontOh}
            alt="오은양"
            className={`w-100 flip-card-front ${isOhBack ? "hidden" : ""}`}
            draggable="false"
          />
          <img
            src={ProfileBackOh}
            alt="오은양 뒷면"
            className={`w-100 flip-card-back ${isOhBack ? "" : "hidden"}`}
            draggable="false"
          />
          {isOhBack && (
            <img
              src={ChoosingButtonOh}
              alt="선택하기 버튼 오은양"
              className="absolute inset-0 mt-136 mx-auto w-50"
              draggable="false"
            />
          )}
        </div>

        <div
          className={`relative flex items-center p-4 cursor-pointer flip-card ${
            isShinBack ? "flip" : ""
          }`}
          onClick={toggleShinImage}
        >
          <img
            src={ProfileFrontShin}
            alt="신문엽"
            className={`w-100 flip-card-front ${isShinBack ? "hidden" : ""}`}
            draggable="false"
          />
          <img
            src={ProfileBackShin}
            alt="신문엽 뒷면"
            className={`w-100 flip-card-back ${isShinBack ? "" : "hidden"}`}
            draggable="false"
          />
          {isShinBack && (
            <img
              src={ChoosingButtonShin}
              alt="선택하기 버튼 "
              className="absolute inset-0 mt-136 mx-auto w-50"
              draggable="false"
            />
          )}
        </div>
      </div>
      <div className="absolute bottom-4 right-4">
        <Link to="/mypage">
          <img
            src={IconToMyPage}
            alt="마이페이지 이동 아이콘"
            className="w-12 h-12 cursor-pointer"
            draggable="false"
          />
        </Link>
      </div>
    </div>
  );
};

export default MentorPage;
