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
          className="relative flex items-center p-4 cursor-pointer"
          onClick={toggleBaekImage}
        >
          <img
            src={isBaekBack ? ProfileBackBaek : ProfileFrontBaek}
            alt="백곰원"
            className="w-100"
          />
          {isBaekBack && (
            <img
              src={ChoosingButtonBaek}
              alt="선택하기 버튼 백곰원"
              className="absolute inset-0 mt-152 mx-auto  w-50"
            />
          )}
        </div>
        <div
          className="relative flex items-center p-4 cursor-pointer"
          onClick={toggleOhImage}
        >
          <img
            src={isOhBack ? ProfileBackOh : ProfileFrontOh}
            alt="오은양"
            className="w-100"
          />
          {isOhBack && (
            <img
              src={ChoosingButtonOh}
              alt="선택하기 버튼 오은양"
              className="absolute inset-0 mt-152 mx-auto  w-50"
            />
          )}
        </div>
        <div
          className="relative flex items-center p-4 cursor-pointer"
          onClick={toggleShinImage}
        >
          <img
            src={isShinBack ? ProfileBackShin : ProfileFrontShin}
            alt="신문엽"
            className="w-100"
          />
          {isShinBack && (
            <img
              src={ChoosingButtonShin}
              alt="선택하기 버튼 신문엽"
              className="absolute inset-0 mt-152 mx-auto  w-50"
            />
          )}
        </div>
      </div>
      <div className="absolute bottom-4 right-4">
        <img
          src={IconToMyPage}
          alt="마이페이지 이동 아이콘"
          className="w-12 h-12 cursor-pointer"
        />
      </div>
    </div>
  );
};
export default MentorPage;
