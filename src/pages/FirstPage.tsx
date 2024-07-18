import React, { useState, useEffect } from "react";
import {  Link,useNavigate } from "react-router-dom";
import "../index.css";
import axios from "axios";
import Button from "./../components/FirstPage/Button";
import Input from "./../components/FirstPage/Input";
import StartButton from "./../components/FirstPage/StartButton";
import EveningSky from "./../components/FirstPage/EveningSky";
import WelcomePage from "./../components/FirstPage/WelcomePage";
import { useStore } from "../store/store";
import CharIntro1 from '@components/FirstPage/CharIntro1';
import CharIntro2 from '@components/FirstPage/CharIntro2';
import LoginPage from '@components/FirstPage/LoginPage';
import Swal from 'sweetalert2';


const FirstPage: React.FC = () => {
  return (
    <div className='wrapper' style={{ height: '5000px', display: 'flex', flexDirection: 'column'}}>
      
      <EveningSky />

      <WelcomePage />


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

     // <CharIntro1 />

     // <CharIntro2 />


      <LoginPage />
 
    </div>
  );
};

export default FirstPage;
