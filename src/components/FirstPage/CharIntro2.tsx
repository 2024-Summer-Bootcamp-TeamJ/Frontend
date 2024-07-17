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
            style={{ 
                backgroundImage: `url(${backgroundForest})`,
                width: '100%',
                height: '1000px',
                zIndex: -1,
                backgroundSize: 'cover',
                objectFit: 'cover',
                position: 'relative'
            }}>
            
            <img
                src="src/assets/images/yellowDog.svg"
                className={`animate__animated ${isVisible ? 'animate__slideInRight' : ''}`}
                style={{
                    zIndex: 1,
                    position: 'absolute',
                    // transform: 'translate(-50%, -50%)',
                    top: '50%',
                    right: '20%',
                    width: '300px',
                    height: '400px',
                    opacity: isVisible ? 1 : 0
                }} />
            
            
            <img 
                src="src/assets/images/RectIntro.svg" 
                style={{
                    position: 'absolute',
                    zIndex: 0,
                    width: '600px',
                    height: '600px',
                    top: '8%',
                    left: '16%',
                }}/>
            
            
            <div 
                className='jua-regular'
                style={{
                    position: 'absolute', 
                    top:'17%', 
                    left: '18%', 
                    zIndex: 1,
                    textAlign: 'center',
                    lineHeight: '1.7',
                    fontSize: '30px'
                }}>
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
