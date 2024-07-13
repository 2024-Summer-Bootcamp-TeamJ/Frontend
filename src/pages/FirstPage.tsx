import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../index.css';
import Button from './../components/FirstPage/Button';
import Input from './../components/FirstPage/Input';
import StartButton from './../components/FirstPage/StartButton';

const FirstPage: React.FC = () => {
    const [nickname, setNickname] = useState('');
    const [userId, setUserId] = useState<number | null>(null);
    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(event.target.value);
    };

    const handleButtonClick = async () => {
        try {
            const payload = { "nickname": nickname };
            const response = await axios.post('http://localhost:8000/api/users', payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 201 || response.status === 200) {
                console.log('Response:', response.data);
                setUserId(response.data.id);
                const message = `User created: ${response.data.nickname}`;
                alert(message);
            }
        } catch (error: any) {
            let message = 'An error occurred';
            if (error.response) {
                if (error.response.status === 422) {
                    message = 'Unprocessable Entity';
                } else if (error.response.status === 404) {
                    message = 'Not Found';
                }
            }
            alert(message);
            console.error('Error:', error);
        }
    };

    const handleStartButtonClick = () => {
        console.log('Start button clicked. userId:', userId); // 디버깅용 콘솔 로그
        if (userId) {
            navigate('/mentor', { state: { userId } });
        } else {
            alert('Please create a user first.');
        }
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
