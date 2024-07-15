import React, { useEffect } from 'react';
import backgroundGreen from "../../assets/images/backgroundGreen.svg";
import '../../index.css';
import { useState, useRef } from 'react';
import 'animate.css'; // yarn add animate.css 실행
import { Link } from "react-router-dom";
import Button from './Button';
import Input from './Input';
import StartButton from './StartButton';
import axios from 'axios';



const LoginPage: React.FC = () => {

    const [nickname, setNickname] = useState('');
    const [position, setPosition] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    const inputRef =useRef<HTMLInputElement>(null);


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(event.target.value);
    }


    const handleButtonClick = async() => {
        if (inputRef.current && nickname.trim() === '') {
          inputRef.current.focus();
        }
        try {
          const payload = { "nickname": nickname };
          const response = await axios.post('http://localhost:8000/api/users', payload, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.status === 201) {
            console.log('Response:', response.data);
            const message = `User created: ${response.data.nickname}`;
            alert(message);
          } else if (response.status === 200) {
             const message = `User created: ${response.data.nickname}`;
             alert(message);
          }    
        } catch (error: any) {
          let message = 'An error occurred';
          if (error.response) {
            if (error.response.status === 422) {
              message = 'Unprocessable Entity';
            } else if (error.response.status === 404) {
              message = 'Not Found'
            } 
          
          } 
          alert(message);
          console.error('Error:', error);
        }
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
        <div 
        style={{
          display: 'flex',
          alignItems: 'center', 
          justifyContent: 'center',
          overflow: 'hidden',
          width: '100wh'
        }}>
            
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
                    justifyContent: 'center',
                    width: '60%',
                    height: '75%',
                    marginTop: '-240px', marginLeft: '43px',
                    zIndex: 1
            }}/>
            
            <div className='absolute z-10 flex gap-3 mt-72'>
                <Input value={nickname} onChange={handleInputChange} ref={inputRef} />
                <Button text="확인" color="x-6 py-2 text-white bg-gray-500 rounded-md" onClick={handleButtonClick}/>
            </div>

            <div className='absolute z-10 flex mt-96'>
                <Link to="/mentor">
                    <StartButton />
                </Link>
            </div>
      
        </div>
    );
};

export default LoginPage;
