import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import axios from 'axios';
import Button from './../components/FirstPage/Button';
import Input from './../components/FirstPage/Input';
import StartButton from './../components/FirstPage/StartButton';
import EveningSky from './../components/FirstPage/EveningSky';
import WelcomePage from './../components/FirstPage/WelcomePage';
import { useStore } from '../../store';  // Zustand store import 경로 확인 필요

const FirstPage: React.FC = () => {
  const [nickname, setNicknameState] = useState<string>("");
  const setNickname = useStore((state) => state.setNickname);
  const setUserId = useStore((state) => state.setUserId);
  const userId = useStore((state) => state.userId);
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNicknameState(event.target.value);
  };

  const handleButtonClick = async () => {
    try {
      const payload = { nickname: nickname };
      const response = await axios.post(
        "http://localhost:8000/api/users",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201 || response.status === 200) {
        const message = `User created: ${response.data.nickname}`;
        alert(message);
        setUserId(response.data.id);
        setNickname(response.data.nickname);
        console.log("Stored user_id:", response.data.id);
      }
    } catch (error: any) {
      let message = "An error occurred";
      if (error.response) {
        if (error.response.status === 422) {
          message = "Unprocessable Entity";
        } else if (error.response.status === 404) {
          message = "Not Found";
        }
      }
      alert(message);
      console.error("Error:", error);
    }
  };

  const handleStartButtonClick = () => {
    console.log("Stored user_id:", userId);
    navigate("/mentor");
  };

  return (
    <div className="relative flex items-center justify-center overflow-hidden w-screen h-screen">
      <img
        src="src/assets/images/backgroundGreen.svg"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover z-[-1] bg-cover"
        draggable="false"
      />
      <img
        src="src/assets/images/groupLogo.svg"
        alt="logo"
        className="absolute justify-center w-3/5 h-3/4 mt-[-240px] ml-[43px] z-1"
        draggable="false"
      />
      <div className="absolute bottom-48 flex gap-3 z-10">
        <Input value={nickname} onChange={handleInputChange} />
        <Button
          text="확인"
          color="bg-gray-500"
          onClick={handleButtonClick}
          width="80px"
          height="56px"
        />
      </div>
      <div className="absolute bottom-32 z-10">
        <StartButton onClick={handleStartButtonClick} />
      </div>
      {/* <EveningSky />
      <WelcomePage /> */}
    </div>
  );
};

export default FirstPage;
