import React from 'react';
import '../index.css';
import { Link } from "react-router-dom";
import Button from './../components/FirstPage/Button';
import Input from './../components/FirstPage/Input';
import StartButton from './../components/FirstPage/StartButton';

const FirstPage: React.FC = () => {
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
        <Input />
        <Button text="확인" color="x-6 py-2 text-white bg-gray-500 rounded-md" />
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
