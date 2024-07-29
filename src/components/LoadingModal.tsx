import React, { useEffect, useState } from 'react';
import loadingImage from '../assets/images/loading.png';
import mudImage from '../assets/images/mud.jpg'; // 이미지 경로를 import

const LoadingModal: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isErasing, setIsErasing] = useState(false);
  const fullTextArray = ['쪼', '매', ' ', '기', '다', '려', ' ', '보', '소', '!'];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDisplayText((prev) => {
        if (!isErasing) {
          const nextChar = fullTextArray[currentIndex];
          if (currentIndex < fullTextArray.length - 1) {
            setCurrentIndex(currentIndex + 1);
          } else {
            setIsErasing(true);
          }
          return prev + nextChar;
        } else {
          if (prev.length === 0) {
            setIsErasing(false);
            setCurrentIndex(0);
            return '';
          }
          setCurrentIndex(currentIndex - 1);
          return prev.slice(0, -1);
        }
      });
    }, 300); // 글자가 천천히 나오도록 인터벌 시간을 300ms로 설정

    return () => clearInterval(intervalId);
  }, [currentIndex, isErasing]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"> {/* 배경 투명도를 높이려면 bg-opacity-75를 bg-opacity-50으로 변경 */}
      <div
        className="flex flex-col items-center justify-center rounded-2xl pt-16 relative"
        style={{
          width: "350px", // 고정된 너비
          height: "350px", // 고정된 높이
          backgroundImage: `url(${mudImage})`, // 모달의 배경 이미지 추가
          backgroundSize: "cover", // 배경 이미지 크기 조정
          backgroundPosition: "center", // 배경 이미지 위치 조정
          backgroundColor: "rgba(255, 255, 255, 0.8)", // 배경 투명도 높임
        }}
      >
        {/* 이미지 위치를 조정한 부분 */}
        <div className="absolute bottom-8 mb-16 bounce-animation">
          <img src={loadingImage} alt="Loading" className="w-20 h-20 md:w-52 md:h-48" />
        </div>
        <div className="relative mt-20 md:mt-32">
          <div
            className="absolute flex items-center justify-center w-full h-full top-4 left-0"
            style={{ width: "100%", height: "100%" }}
          >
            <p
              className="text-center font-syndinaroo whitespace-nowrap"
              style={{ transform: "scale(1)", fontSize: "2rem", color: "#ff0000" }} // 글씨 색상 변경 (예: 빨간색)
            >
              {displayText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;
