import React, { useEffect } from 'react';
import welcomeBackground from "../../assets/images/welcomeBackground.svg";
import '../../index.css';
import { useState } from 'react';
import 'animate.css'; // yarn add animate.css 실행
import './WelcomePage.css';

const WelcomePage: React.FC = () => {

    const [position, setPosition] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    function onScroll() {
        setPosition(window.scrollY);
        // 스크롤 위치에 따라 애니메이션 효과
        if (window.scrollY > 700 && window.scrollY < 1600) {
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
                backgroundImage: `url(${welcomeBackground})`,
                width: '100%',
                height: '1000px',
                zIndex: -1,
                backgroundSize: 'cover',
                objectFit: 'cover',
                position: 'relative'
            }}>
            
            
                <div>
                    <div 
                        className={`animate__animated ${isVisible ? 'animate__flash' : ''}`}
                        style={{
                            zIndex: 1, 
                            transform: 'translate(-50%, -50%)',
                            top: '50%',
                            left: '50%',
                            position: 'absolute',
                            background: 'rgba(255, 255, 255, 0.5)',
                            textAlign: 'center'
                        }}>
                        <h1 style={{fontSize: '70px', width: '1000px', height: '100px', margin:0}}>고민의 숲에 오신 것을 환영합니다!</h1>
                    </div>
                </div>
            
            
            
        </div>
    );
};

export default WelcomePage;
