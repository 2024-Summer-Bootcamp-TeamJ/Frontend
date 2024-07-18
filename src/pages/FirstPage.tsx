import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import axios from "axios";
import { useStore } from "../store/store";
import LoginPage from './../components/FirstPage/LoginPage';

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
        console.log("방금생성된 userID:", response.data.id);
        console.log("전역에 저장된 userID:", userId);
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

  useEffect(() => {
    console.log("전역에 저장된 userID:", userId);
  }, [userId]);

  const handleStartButtonClick = () => {
    const currentUserId = useStore.getState().userId; // 최신 userId 가져오기
    console.log("Current user_id:", currentUserId);
    console.log(" user_id:", userId);
    navigate("/mentor");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen overflow-hidden">
      {/* <EveningSky />
      <WelcomePage />
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
      <CharIntro1 />
      <CharIntro2 /> */}
      <LoginPage />
    </div>
  );
};

export default FirstPage;
