import React from 'react';
import { useState, useEffect } from 'react';
import '../index.css';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Button from './../components/FirstPage/Button';
import Input from './../components/FirstPage/Input';
import StartButton from './../components/FirstPage/StartButton';
import EveningSky from './../components/FirstPage/EveningSky';
import WelcomePage from '@components/FirstPage/WelcomePage';
import CharIntro1 from '@components/FirstPage/CharIntro1';
import CharIntro2 from '@components/FirstPage/CharIntro2';
import LoginPage from '@components/FirstPage/LoginPage';
import { useStore } from "../store/store";
import Swal from 'sweetalert2';

const FirstPage: React.FC = () => {
  return (
    <div className='wrapper' style={{ height: '5000px', display: 'flex', flexDirection: 'column'}}>
      
      <EveningSky />

      <WelcomePage />

      <CharIntro1 />

      <CharIntro2 />

      <LoginPage />
      
    </div>
  );
};

export default FirstPage;
