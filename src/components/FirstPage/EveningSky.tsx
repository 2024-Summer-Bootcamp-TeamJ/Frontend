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
            style={{ 
                backgroundImage: `url(${eveningSky})`,
                width: '100%',
                height: '1000px',
                zIndex: -1,
                backgroundSize: 'cover',
                objectFit: 'cover',
                position: 'relative',
                backgroundPositionX: position / -7
            }}>
            
            <div style={{position: 'absolute', zIndex: 2}}>
                <audio ref={audioRef} src="src/assets/music/backgroundMusic.mp3" loop/>
            </div>


            <img
                src="src/assets/images/welcomeLogo.svg"
                className="animate__animated animate__backInDown"
                style={{
                    zIndex: 1,
                    position: 'absolute',
                    // transform: 'translate(-50%, -50%)',
                    top: '17%',
                    left: '19%',
                    width: '900px',
                    height: 'auto'
                }} />
            
            <img
                src="src/assets/images/scrollMessage.svg"
                className="blinking-image"
                style={{
                    zIndex: 1,
                    position: 'absolute',
                    transform: 'translate(-50%, -50%)',
                    top: '65%',
                    left: '49%',
                    width: '500px',
                    height: 'auto'
                }} />
            
        </div>
    );
};

export default EveningSky;
