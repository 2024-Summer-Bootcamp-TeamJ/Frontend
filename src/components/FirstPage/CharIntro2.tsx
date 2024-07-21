import React, { useEffect } from 'react';
import backgroundForest from "../../assets/images/backgroundForest.svg";
import RectIntro from "../../assets/images/RectIntro.svg";
import yellowDog from "../../assets/images/yellowDog.svg";
import '../../index.css';
import { useState } from 'react';
import './CharIntro2.css';
import 'animate.css'; // yarn add animate.css 실행

const CharIntro2: React.FC = () => {

    const [position, setPosition] = useState(0);
    const [isVisible, setIsVisible] = useState(false);


    function onScroll() {
        setPosition(window.scrollY);
        // 스크롤 위치에 따라 애니메이션 효과
        if (window.scrollY >= 3000) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);


    return (
        <div 
            className="relative w-screen h-[1000px] -z-10 bg-cover iphone:h-[852px]"
            style={{ 
                backgroundImage: `url(${backgroundForest})`
            }}>
            
            <img
                src="src/assets/images/yellowDog.svg"
                className={`animate__animated ${isVisible ? 'animate__slideInRight' : ''} absolute z-10 top-[50%] right-[20%] w-[300px] h-[400px] ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            />
            
            
            <img 
                src="src/assets/images/RectIntro.svg" 
                className="absolute z-0 w-[600px] h-[600px] top-[8%] left-[16%]"
            />
            
            
            <div className='jua-regular absolute top-[17%] left-[18%] z-10 text-center leading-[1.7] text-[30px]'>
                <p style={{ opacity: (position - 2400) / 600 }}>여러분의 고민을 들어줄</p>
                <br />
                <p style={{ opacity: (position - 2550) / 600 }}>3명의 멘토들이 기다리고 있어요!</p>
                <br />
                <p style={{ opacity: (position - 2700) / 600 }}>원하는 분야에 따라서 멘토를 선택하실 수 있어요</p>
                <br />
                <p style={{ opacity: (position - 2850) / 400 }}>먼저 닉네임을 만들고 시작하기 버튼을 누르세요</p>
            </div>
            
            
            
        </div>
    );
};

export default CharIntro2;
