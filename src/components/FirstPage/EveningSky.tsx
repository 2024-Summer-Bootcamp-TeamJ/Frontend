import React, { useEffect, useRef } from 'react';
import eveningSky from "../../assets/images/eveningSky.svg";
import '../../index.css';
import { useState } from 'react';
import './EveningSky.css';
import 'animate.css'; // yarn add animate.css 실행


const EveningSky: React.FC = () => {

    const [position, setPosition] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);


    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.play().catch(error => {
                console.error("Failed to play audio:", error);
            });
        }
    }, []);


    function onScroll() {
        setPosition(window.scrollY);
    }
    
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
                backgroundImage: `url(${eveningSky})`,
                backgroundPositionX: position / -7
            }}>
            
            <div className="absolute z-20">
                <audio ref={audioRef} src="src/assets/music/backgroundMusic.mp3" loop/>
            </div>


            <img
                src="src/assets/images/welcomeLogo.svg"
                className="animate__animated animate__backInDown absolute z-10 top-[17%] left-[20%] w-[900px] h-auto"
            />
            
            <img
                src="src/assets/images/scrollMessage.svg"
                className="blinking-image absolute z-10 top-[65%] left-[49%] w-[500px] h-auto transform -translate-x-1/2 -translate-y-1/2"
            />
            
        </div>
    );
};

export default EveningSky;
