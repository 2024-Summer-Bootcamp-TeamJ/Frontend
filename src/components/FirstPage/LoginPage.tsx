import React, { useEffect } from 'react';
import backgroundGreen from "../../assets/images/backgroundGreen.svg";
import '../../index.css';
import { useState, useRef } from 'react';
import 'animate.css'; // yarn add animate.css 실행
import { Link, useNavigate } from "react-router-dom";
import Button from './Button';
import Input from './Input';
import StartButton from './StartButton';
import axios from 'axios';
import { useStore } from '../../store/store';
import Swal from 'sweetalert2';
import { Howl } from 'howler';   

const LoginPage: React.FC = () => {

    
    const [position, setPosition] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [nickname, setNicknameState] = useState("");
    
    const setNickname = useStore((state) => state.setNickname);
    const setUserId = useStore((state) => state.setUserId);
    const userId = useStore((state) => state.userId);
    const navigate = useNavigate();

    const inputRef =useRef<HTMLInputElement>(null);

    useEffect(() => {
      console.log("Updated user_id:", userId);
    }, [userId]);


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNicknameState(event.target.value);
    }


    const handleButtonClick = async() => {
        if (inputRef.current && nickname.trim() === '') {
          inputRef.current.focus();
        }
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
            const message = Swal.fire({
              text: '이 이름은 사용할 수 있습니다.',
              title: '이 닉네임으로 하시겠습니까?',
              icon: 'question',
              showCancelButton: true,
              confirmButtonText: '확인',
              cancelButtonText: '취소',
              width: 500,
              customClass: {
                title: 'text-2xl font-extrabold', 
                confirmButton: 'bg-blue-500 text-white py-2 px-4 rounded-md w-24 h-12 mr-5 text-lg font-bold',
                cancelButton: 'bg-red-500 text-white py-2 px-4 rounded-md w-24 h-12 text-lg font-bold'
              },
              buttonsStyling: false,
              showClass: {
                popup: `
                  animate__animated
                  animate__fadeInUp
                  animate__faster
                `
              },
              hideClass: {
                popup: `
                  animate__animated
                  animate__fadeOutDown
                  animate__faster
                `
              }
            }).then((result) => {
                if (result.isConfirmed) {
                  const successfulMessage = Swal.fire({
                    title: '닉네임이 생성됬어요!', 
                    text: `${response.data.nickname}님 축하합니다!`, 
                    icon: 'success', 
                    confirmButtonText: '확인', 
                    customClass: {title: 'text-2xl font-extrabold', 
                    confirmButton: 'w-24 h-12 text-lg font-bold bg-purple-600'},
                    showClass: {
                      popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                    },
                    hideClass: {
                      popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                    }
                  });
                  console.log(successfulMessage);
                }
            });
            console.log(message);
            setUserId(response.data.id);
            setNickname(response.data.nickname);
            console.log("Stored user_id:", response.data.id);
          }
        } catch (error: any) {
          // let message = "An error occurred"; 
          // 닉네임을 길게 입력했을 경우 - error 500
          let errorMessage = Swal.fire({
            title: '이 닉네임은 생성할 수 없습니다.',
            text: '다시 입력해주세요!',
            icon: 'error',
            confirmButtonText: '확인',
            width: 500,
            customClass: {
              title: 'text-2xl font-extrabold',
              confirmButton: 'bg-purple-600 text-white py-2 px-4 rounded-md w-24 h-12 mr-5 text-lg font-bold'
            }
          })
          if (error.response) {
            if (error.response.status === 422) {
              //message = "Unprocessable Entity";
              errorMessage = Swal.fire({
                title: '요청 처리 실패!',
                html: '요청을 처리할 수 없습니다.<br>입력한 내용을 다시 확인해 주세요.',
                icon: 'error',
                confirmButtonText: '확인',
                width: 500,
                customClass: {
                  confirmButton: 'bg-purple-600 text-white py-2 px-4 rounded-md w-24 h-12 mr-5 text-lg font-bold'
                }
              })
            } else if (error.response.status === 404) {
              //message = "Not Found";
              errorMessage = Swal.fire({
                title: '해당 닉네임은 생성할 수 없습니다!',
                html: '닉네임을 다시 확인해 주세요.',
                icon: 'error',
                confirmButtonText: '확인',
                width: 500,
                customClass: {
                  confirmButton: 'bg-purple-600 text-white py-2 px-4 rounded-md w-24 h-12 mr-5 text-lg font-bold'
                }
              })
            }
          }
          // alert(message);
          console.log(errorMessage);
          // console.error("Error:", error);
        }
    };


    const playClickSound = () => {
      const sound = new Howl({ 
        src: ['src/assets/audios/click_effect.mp3']
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
        // 스크롤 애니메이션 효과
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


    return (
      <div className="relative flex items-center justify-center overflow-hidden" style={{width: '100wh'}}>
        <img
          src="src/assets/images/backgroundGreen.svg"
          alt="background"
          style={{
            position: 'relative',
            width: '100%',
            height: '1000px',
            objectFit: 'cover',         
            zIndex: -1,
            backgroundSize: 'cover'
          }}/>

        <img
          src="src/assets/images/groupLogo.svg"
          alt="logo"
          className={`animate__animated ${isVisible ? 'animate__bounceInDown' : ''}`}
          style={{
            position: 'absolute',
            justifyContent: 'center' ,              
            width: '60%',
            height: '75%',
            marginTop: '-240px', marginLeft: '43px',
            zIndex: 1
          }}/>

          
        <div className="absolute z-10 flex gap-3 mt-96">
          <Input value={nickname} onChange={handleInputChange} ref={inputRef} />
          <Button
            text="확인"
            color="bg-gray-500"
            onClick={handleButtonClick}
            width="80px"
            height="56px"
          />
        </div>

        <div className="absolute z-10 transform -translate-y-2 mt-128">
          <StartButton onClick={handleStartButtonClick} />
        </div>
      </div>
    );
};

export default LoginPage;
