import React, { useEffect } from 'react';
import backgroundBeach from "../../assets/images/backgroundBeach.svg";
import RectIntro from "../../assets/images/RectIntro.svg";
import '../../index.css';
import { useState } from 'react';
import './CharIntro1.css';
import 'animate.css'; // yarn add animate.css 실행

const CharIntro1: React.FC = () => {

    const [position, setPosition] = useState(0);
    const [isVisible, setIsVisible] = useState(false);


    function onScroll() {
        setPosition(window.scrollY);
        // 스크롤 위치에 따라 애니메이션 효과
        if (window.scrollY >= 2015) {
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
                backgroundImage: `url(${backgroundBeach})`,
                width: '100%',
                height: '1000px',
                zIndex: -1,
                backgroundSize: 'cover',
                objectFit: 'cover',
                position: 'relative'
            }}>
            
            <img
                src="src/assets/images/Racoon.svg"
                className={`animate__animated ${isVisible ? 'animate__slideInLeft' : ''}`}
                style={{
                    zIndex: 1,
                    position: 'absolute',
                    // transform: 'translate(-50%, -50%)',
                    top: '45%',
                    left: '17%',
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
                    right: '18%',
                }}/>
            
            
            <div 
                className='jua-regular'
                style={{
                    position: 'absolute', 
                    top:'17%', 
                    right: '20%', 
                    zIndex: 1,
                    textAlign: 'center',
                    lineHeight: '1.7',
                    fontSize: '30px'
                }}>
                <p style={{ opacity: (position - 1400) / 600 }}>안녕하세요!</p>
                <br />
                <p style={{ opacity: (position - 1550) / 600 }}>고민의 숲에 오신 것을 환영해요</p>
                <br />
                <p style={{ opacity: (position - 1700) / 600 }}>여기서 평소에 말하기 힘든 고민들 이야기해봐요</p>
                <br />
                <p style={{ opacity: (position - 1850) / 400 }}>창업? 심리? 육아? 어떤 것이 고민인가요?</p>
            </div>
            
            
            
        </div>
    );
};

export default CharIntro1;
