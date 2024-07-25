import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import ProfileBackBaek from "../assets/images/ProfileBackBaek.svg";
import ProfileBackOh from "../assets/images/ProfileBackOh.svg";
import ProfileBackShin from "../assets/images/ProfileBackShin.svg";
import IconToMyPage from "../assets/images/IconToMyPage.svg";
import backgroundGreen from "../assets/images/backgroundGreen.svg";
import ChoosingButtonBaek from "../assets/images/ChoosingButtonBaek.svg";
import ChoosingButtonOh from "../assets/images/ChoosingButtonOh.svg";
import ChoosingButtonShin from "../assets/images/ChoosingButtonShin.svg";
import CharOh from "../assets/images/CharOh.svg";
import CharBaek from "../assets/images/CharBaek.svg";
import CharShin from "../assets/images/CharShin.svg";
import CardOh from "../assets/images/CardOh.svg";
import CardShin from "../assets/images/CardShin.svg";
import CardBaek from "../assets/images/CardBaek.svg";
import "../index.css";
import { useStore } from "../store/store";
import useSound from "use-sound";
import flipcard from "../assets/audios/flipcard.mp3";
import choose from "../assets/audios/choose.mp3";
import mouse from "../assets/audios/mouse.mp3";
import leftArrow from "../assets/images/leftArrow.svg";
import rightArrow from "../assets/images/rightArrow.svg";
import { useSwipeable } from "react-swipeable";

const mentorImages: { [key: number]: any } = {
  1: {
    frontCardImage: CardBaek,
    frontCharImage: CharBaek,
    backImage: ProfileBackBaek,
    choosingButtonImage: ChoosingButtonBaek,
    name: "baek",
  },
  2: {
    frontCardImage: CardOh,
    frontCharImage: CharOh,
    backImage: ProfileBackOh,
    choosingButtonImage: ChoosingButtonOh,
    name: "oh",
  },
  3: {
    frontCardImage: CardShin,
    frontCharImage: CharShin,
    backImage: ProfileBackShin,
    choosingButtonImage: ChoosingButtonShin,
    name: "shin",
  },
};

const MentorPage: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 450);
  const [currentMentorIndex, setCurrentMentorIndex] = useState<number>(0);
  const [flippedMentorId, setFlippedMentorId] = useState<number | null>(null);
  const mentors = useStore((state) => state.mentors);
  const setMentors = useStore((state) => state.setMentors);
  const userId = useStore((state) => state.userId);
  const navigate = useNavigate();
  const [playFlipcard] = useSound(flipcard);
  const [playChoose] = useSound(choose);
  const [playMouse] = useSound(mouse);

  const handleIconClick = useCallback(() => {
    playMouse();
  }, [playMouse]);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        console.log("Fetching mentors...");
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/mentors`);
        console.log("Server response:", response.data);
        const mentorsData = response.data
          .filter((mentor: any) => mentor.id >= 1 && mentor.id <= 3)
          .map((mentor: any) => ({
            ...mentor,
            ...mentorImages[mentor.id],
          }));
        console.log("Filtered mentors data:", mentorsData);
        setMentors(mentorsData);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error fetching mentors:", error.message);
          if (error.response) {
            console.error("Error response data:", error.response.data);
            console.error("Error response status:", error.response.status);
            console.error("Error response headers:", error.response.headers);
          }
        } else {
          console.error("Unknown error:", error);
        }
      }
    };

    fetchMentors();
  }, [setMentors]);

  const toggleMentorImage = (mentorId: number) => {
    playFlipcard();
    if (flippedMentorId === mentorId) {
      setFlippedMentorId(null);
    } else {
      setFlippedMentorId(mentorId);
    }
  };

  const createChatroom = async (mentorId: number) => {
    const currentUserId = useStore.getState().userId;

    console.log("멘토 ID로 채팅방 생성, mentorId:", mentorId);

    if (!userId) {
      console.error("사용자 ID가 설정되지 않았습니다.");
      return;
    }

    console.log("Payload(왜 여기선..)userId:", userId, "멘토 아이디:", mentorId);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/chatrooms`, {
        user_id: userId,
        mentor_id: mentorId,
      });

      console.log("서버 응답:", response);

      if (response.status === 200 || response.status === 201) {
        console.log("채팅방 생성 성공");
        const chatroomId = response.data.id;
        const mentor = mentors.find((mentor) => mentor.id === mentorId);
        if (mentor) {
          navigate(`/chat/${mentorImages[mentor.id].name}`, {
            state: { chatroomId, userId: currentUserId },
          });
        } else {
          console.error("유효하지 않은 멘토 ID입니다.");
          throw new Error("채팅방 생성 실패");
        }
      } else {
        console.error("예상치 못한 응답 상태:", response.status);
        throw new Error("채팅방 생성 실패");
      }
      playChoose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error creating chatroom:", error.message);
        if (error.response) {
          console.error("Error response data:", error.response.data);
          console.error("Error response status:", error.response.status);
          console.error("Error response headers:", error.response.headers);
        }
      } else {
        console.error("Unknown error:", error);
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 450);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrevClick = () => {
    setCurrentMentorIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : mentors.length - 1));
  };

  const handleNextClick = () => {
    setCurrentMentorIndex((prevIndex) => (prevIndex < mentors.length - 1 ? prevIndex + 1 : 0));
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (window.innerWidth <= 450) {
        handleNextClick();
      }
    },
    onSwipedRight: () => {
      if (window.innerWidth <= 450) {
        handlePrevClick();
      }
    },
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: true
  });

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-center bg-cover iphone:w-screen iphone:h-screen iphone:overflow-hidden"
      style={{ backgroundImage: `url(${backgroundGreen})` }}
    >
      <div
        {...(isMobile ? swipeHandlers : {})} 
        className="flex flex-row items-center justify-center gap-4">
        <img
          src={leftArrow}
          alt="arrowleft"
          className="absolute z-10 hidden cursor-pointer left-4 iphone:block"
          onClick={handlePrevClick}
        />
        {mentors.map((mentor, index) => (
          <div
            key={mentor.id}
            className={`relative flex items-center p-4 cursor-pointer flip-card ${
              flippedMentorId === mentor.id ? "flip" : ""
            } ${index === currentMentorIndex ? "iphone:block" : "iphone:hidden"}`}
            onClick={() => toggleMentorImage(mentor.id)}
          >
            <div className="front-card-container iphone:w-[280px] iphone:left-[73px] iphone:h-full">
              <img
                src={mentor.frontCardImage}
                alt={mentor.name}
                className={`absolute top-0 left-0 w-full h-full flip-card-front ${flippedMentorId === mentor.id ? "hidden" : ""}`}
                draggable="false"
              />
              <img
                src={mentor.frontCharImage}
                alt={mentor.name}
                className={`front-char-image ${flippedMentorId === mentor.id ? "hidden" : ""} iphone:h-[280px] iphone:top-[45%]`}
                draggable="false"
              />
            </div>
            
            <img
              src={mentor.backImage}
              alt={`${mentor.name} 뒷면`}
              className={`absolute top-0 left-0 w-full h-full iphone:w-[290px] iphone:left-[77px] iphone:h-full flip-card-back-rotation ${
                flippedMentorId === mentor.id ? "" : "hidden"
              }`}
              draggable="false"
            />
            {flippedMentorId === mentor.id && (
              <img
                src={mentor.choosingButtonImage}
                alt={`선택하기 버튼 ${mentor.name}`}
                className="absolute inset-0 mx-auto mt-136 w-50 iphone:w-40 iphone:mt-[490px] iphone:mx-[142px]"
                draggable="false"
                onClick={() => createChatroom(mentor.id)}
                style={{ zIndex: 10 }}
              />
            )}
          </div>
        ))}
        <img
          src={rightArrow}
          alt="arrowright"
          className="absolute z-10 hidden cursor-pointer right-3 iphone:block"
          onClick={handleNextClick}
        />  
      </div>
      <div onClick={handleIconClick} className="absolute bottom-4 right-4 iphone:top-5 iphone:right-5">
        <Link to="/mypage">
          <img
            src={IconToMyPage}
            alt="마이페이지 이동 아이콘"
            className="w-12 h-12 cursor-pointer"
            draggable="false"
          />
        </Link>
      </div>
    </div>
  );
};

export default MentorPage;
