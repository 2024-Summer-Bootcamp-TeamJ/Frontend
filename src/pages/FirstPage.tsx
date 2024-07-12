import React from 'react';
import { useState } from 'react';
import '../index.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import Button from './../components/FirstPage/Button';
import Input from './../components/FirstPage/Input';
import StartButton from './../components/FirstPage/StartButton';

const FirstPage: React.FC = () => {
    const [nickname, setNickname] = useState('');
    

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNickname(event.target.value);
    }

    const handleButtonClick = async() => {
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


  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'center', 
        justifyContent: 'center',
        overflow: 'hidden',
        width: '100vw',
        height: '100vh'
      }}>
      
      <img 
        src="src/assets/images/backgroundGreen.svg" 
        alt="background"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
          backgroundSize: 'cover'
      }}/>

      <img 
        src="src/assets/images/groupLogo.svg" 
        alt="logo"
        style={{
          position: 'absolute',
          justifyContent: 'center',
          width: '60%',
          height: '75%',
          marginTop: '-240px', marginLeft: '43px',
          zIndex: 1
      }}/>
      
      <div className='absolute z-10 flex gap-3 mt-72'>
        <Input value={nickname} onChange={handleInputChange}/>
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

export default FirstPage;
