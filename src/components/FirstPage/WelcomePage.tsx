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
            className="relative w-screen h-[1000px] -z-10 bg-cover iphone:h-[852px]"
            style={{ 
                backgroundImage: `url(${welcomeBackground})`
            }}>
            
            
                <div>
                    <div className={`animate__animated ${isVisible ? 'animate__flash' : ''} absolute z-10 bg-white bg-opacity-50 text-center top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2`}>
                        <h1 className="text-[70px] w-[1000px] h-[100px] m-0">고민의 숲에 오신 것을 환영합니다!</h1>
                    </div>
                </div>
            
            
            
        </div>
    );
};

export default WelcomePage;
