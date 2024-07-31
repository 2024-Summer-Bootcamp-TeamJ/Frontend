import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import backgroundGreen from "../../assets/images/backgroundGreen.svg";
import leaf from "../../assets/images/leaf.svg";
import groupLogo from "../../assets/images/groupLogo.svg";
import clickEffect from "../../assets/audios/click_effect.mp3";
import backgroundMusic1 from "../../assets/audios/bakcgroundMusic2.mp3";
import backgroundMusic2 from "../../assets/audios/mainMusic.mp3";
import "../../index.css";
import "./LoginPage.css";
import "animate.css"; // yarn add animate.css 실행
import Button from "./Button";
import Input from "./Input";
import axios from "axios";
import { useStore } from "../../store/store";
import Swal from "sweetalert2";
import { Howl } from "howler";
import _ from "lodash";

const LoginPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);
  const [position, setPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [nickname, setNicknameState] = useState("");

  const setNickname = useStore((state) => state.setNickname);
  const setUserId = useStore((state) => state.setUserId);
  const userId = useStore((state) => state.userId);
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log("Updated user_id:", userId);
  }, [userId]);

  const debounceHandleInputChange = useCallback(
    _.debounce((value) => {
      console.log("Debounced setNicknameState called with value:", value);
      setNicknameState(value);
    }, 500),
    []
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
    debounceHandleInputChange(value);
  };

  function getSwalWidth() {
    // 알림창 너비 변경 함수
    if (window.innerWidth <= 450) {
      return 350;
    }
    return 500;
  }

  useEffect(() => {
    const sound = new Howl({
      src: [backgroundMusic1],
      loop: true,
      volume: 0.5,
      onloaderror: (id, err) => console.error("Error loading sound:", err),
    });
    sound.play();

    return () => {
      sound.unload();
    };
  }, []);

  const handleButtonClick = useCallback(
    _.throttle(async () => {
      console.log("Throttled handleButtonClick called"); // Throttle 적용 확인 로그

      if (inputRef.current && inputValue.trim() === "") {
        inputRef.current.focus();
      }
      try {
        const payload = { nickname: nickname };
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/users`,
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 201 || response.status === 200) {
          const message = Swal.fire({
            title: "이 닉네임으로 하시겠습니까?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "확인",
            cancelButtonText: "취소",
            width: getSwalWidth(),
            customClass: {
              title: "text-2xl font-extrabold",
              confirmButton:
                "bg-blue-500 text-white py-2 px-4 rounded-md w-24 h-12 mr-5 text-lg font-bold cursor-none",
              cancelButton:
                "bg-red-500 text-white py-2 px-4 rounded-md w-24 h-12 text-lg font-bold cursor-none",
            },
            buttonsStyling: false,
            showClass: {
              popup: `
                  animate__animated
                  animate__fadeInUp
                  animate__faster
                `,
            },
            hideClass: {
              popup: `
                  animate__animated
                  animate__fadeOutDown
                  animate__faster
                `,
            },
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                html: `
                      <div class="relative w-[260px] h-[260px] left-[20%] iphone:w-[200px] iphone:h-[200px] iphone:left-[15%] bg-cover bg-center flex items-center justify-center">
                        <img src="${leaf}" alt="leaf" class="absolute w-full h-full object-cover">
                        <p class="absolute text-3xl font-extrabold text-black px-4 py-2 rounded top-[43%] left-[22%] iphone:text-[25px] iphone:left-[17%] iphone:top-[41%]">가입 완료!</p>
                      </div>`,
                width: getSwalWidth(),
                confirmButtonText: "시작하기",
                customClass: {
                  title: "text-2xl font-extrabold",
                  confirmButton:
                    "w-64 h-12 text-lg font-bold bg-green-500 iphone:w-[250px] iphone:bg-green-600 iphone:h-[55px] iphone:rounded-xl iphone:text-xl cursor-none",
                },
                preConfirm: () => {
                  playClickSound();
                },
                showClass: {
                  popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `,
                },
                hideClass: {
                  popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `,
                },
              }).then(() => {
                handleStartButtonClick(); // '시작하기' 버튼을 클릭했을 때 실행
              });
            }
          });
          console.log(message);
          setUserId(response.data.id);
          setNickname(response.data.nickname);
          console.log("Stored user_id:", response.data.id);
        }
      } catch (error: any) {
        let errorMessage = Swal.fire({
          title: "닉네임을 생성할 수 없습니다.",
          text: "다시 입력해주세요!",
          icon: "error",
          confirmButtonText: "확인",
          width: getSwalWidth(),
          customClass: {
            title: "text-2xl font-extrabold",
            confirmButton:
              "bg-purple-600 text-white py-2 px-4 rounded-md w-24 h-12 mr-5 text-lg font-bold cursor-none",
          },
        });
        if (error.response) {
          if (error.response.status === 422) {
            errorMessage = Swal.fire({
              title: "요청 처리 실패!",
              html: "요청을 처리할 수 없습니다.<br>입력한 내용을 다시 확인해 주세요.",
              icon: "error",
              confirmButtonText: "확인",
              width: 500,
              customClass: {
                confirmButton:
                  "bg-purple-600 text-white py-2 px-4 rounded-md w-24 h-12 mr-5 text-lg font-bold cursor-none",
              },
            });
          } else if (error.response.status === 404) {
            errorMessage = Swal.fire({
              title: "해당 닉네임은 생성할 수 없습니다!",
              html: "닉네임을 다시 확인해 주세요.",
              icon: "error",
              confirmButtonText: "확인",
              width: 500,
              customClass: {
                confirmButton:
                  "bg-purple-600 text-white py-2 px-4 rounded-md w-24 h-12 mr-5 text-lg font-bold cursor-none",
              },
            });
          }
        }
        console.log(errorMessage);
      }
    }, 3000),
    [nickname]
  );

  const playClickSound = () => {
    const sound = new Howl({
      src: [clickEffect],
    });
    sound.play();
  };

  const handleStartButtonClick = () => {
    playClickSound();
    console.log("Stored user_id:", userId);
    navigate("/mentor");
  };

  function onScroll() {
    setPosition(window.scrollY);
    if (window.scrollY >= 4000) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleButtonClick();
    }
  };

  return (
    <div className="relative flex items-center justify-center w-screen h-screen overflow-hidden">
      <img
        src={backgroundGreen}
        alt="background"
        className="absolute w-full h-full object-cover -z-10"
      />
      <img
        src={groupLogo}
        alt="logo"
        className={`animate__animated animate__bounceInDown 
            absolute w-[60%] h-[75%] -mt-[240px] ml-[43px] z-10 iphone:w-[360px] iphone:h-[70%] iphone:top-[20%] iphone:-mt-[200px] iphone:justify-center iphone:flex-col iphone:items-center iphone:ml-0`}
        style={{ cursor: "none" }}
      />
      <div className="absolute z-10 flex gap-3 mt-96 iphone:bg-white iphone:rounded-4xl iphone:w-[330px] iphone:h-[170px] iphone:flex-col iphone:justify-center iphone:items-center iphone:mt-20 iphone:gap-2 iphone:top-[40%]">
        <Input
          value={inputValue}
          onChange={handleInputChange}
          ref={inputRef}
          onKeyDown={handleKeyDown}
        />
        <Button text="확인" color="bg-gray-500" onClick={handleButtonClick} />
      </div>
    </div>
  );
};

export default LoginPage;
