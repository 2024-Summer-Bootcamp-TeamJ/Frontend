import React, { useState, useEffect } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "./../components/FirstPage/Button";
import Input from "./../components/FirstPage/Input";
import StartButton from "./../components/FirstPage/StartButton";
import { useStore } from "../../store";

const FirstPage: React.FC = () => {
  const [nickname, setNickname] = useState("");
  const setUserId = useStore((state) => state.setUserId);
  const userId = useStore((state) => state.userId);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Updated user_id:", userId);
  }, [userId]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
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
      if (response.status === 201) {
        console.log("Response:", response.data);
        const message = `User created: ${response.data.nickname}`;
        alert(message);
        setUserId(response.data.id);
        console.log("Stored user_id:", userId);
        console.log("리스폰스데이타", response.data);
        console.log("리스폰스데이타.아이디", response.data.id);
      } else if (response.status === 200) {
        const message = `User created: ${response.data.nickname}`;
        alert(message);
        setUserId(response.data.id);
        console.log("Stored user_id:", userId);
        console.log("리스폰스데이타", response.data);
        console.log("리스폰스데이타.아이디", response.data.id);
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
    <div 
            className="relative flex items-center justify-center overflow-hidden w-screen h-screen"
        >
            <img 
                src="src/assets/images/backgroundGreen.svg" 
                alt="background"
                className="absolute inset-0 w-full h-full object-cover z-[-1] bg-cover"
            />

            <img 
                src="src/assets/images/groupLogo.svg" 
                alt="logo"
                className="absolute justify-center w-3/5 h-3/4 mt-[-240px] ml-[43px] z-1"
            />
            <div className='absolute bottom-48 flex gap-3 z-10'>
                <Input value={nickname} onChange={handleInputChange} />
                <Button 
                  text="확인" 
                  color="bg-gray-500" 
                  onClick={handleButtonClick} 
                  width="80px"
                  height="56px"
                />
            </div>

            <div className='absolute bottom-32 z-10'>
                <StartButton onClick={handleStartButtonClick} />
            </div>
        </div>
  );
};

export default FirstPage;
