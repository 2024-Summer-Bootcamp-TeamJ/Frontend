import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
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
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/mentors`);
        const mentorsData = response.data
          .filter((mentor: any) => mentor.id >= 1 && mentor.id <= 3)
          .map((mentor: any) => ({
            ...mentor,
            ...mentorImages[mentor.id],
          }));
        setMentors(mentorsData);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };

    fetchMentors();
  }, [setMentors]);

  const toggleMentorImage = (mentorId: number) => {
    playFlipcard(); // flipcard 효과음 재생
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

    console.log("Payload(왜 여기선..)userId:", userId, "멘토아이디:", mentorId);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/chatrooms`, {
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
      // 채팅방 생성 후 choose 사운드 효과 재생
      playChoose();
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        console.error("User not found. Please ensure the user ID is correct.");
        console.error(
          "(createChatroom)User 아이디는 ",
          userId,
          "멘토 아이디는 ",
          mentorId
        );
      } else {
        console.error("Error creating chatroom:", error);
      }
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundGreen})` }}
    >
      <div className="flex flex-row justify-center items-center gap-4">
        {mentors.map((mentor) => (
          <div
            key={mentor.id}
            className={`relative flex items-center p-4 cursor-pointer flip-card ${
              flippedMentorId === mentor.id ? "flip" : ""
            }`}
            onClick={() => toggleMentorImage(mentor.id)}
          >
            <div className="front-card-container">
              <img
                src={mentor.frontCardImage}
                alt={mentor.name}
                className={`w-100 flip-card-front ${flippedMentorId === mentor.id ? "hidden" : ""}`}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                draggable="false"
              />
              <img
                src={mentor.frontCharImage}
                alt={mentor.name}
                className={`front-char-image ${flippedMentorId === mentor.id ? "hidden" : ""}`}
                draggable="false"
              />
            </div>
            <img
              src={mentor.backImage}
              alt={`${mentor.name} 뒷면`}
              className={`w-100 flip-card-back ${
                flippedMentorId === mentor.id ? "" : "hidden"
              }`}
              draggable="false"
            />
            {flippedMentorId === mentor.id && (
              <img
                src={mentor.choosingButtonImage}
                alt={`선택하기 버튼 ${mentor.name}`}
                className="absolute inset-0 mt-136 mx-auto w-50"
                draggable="false"
                onClick={() => createChatroom(mentor.id)}
                style={{ zIndex: 10 }} // 원하는 z-index 값으로 설정
              />
            )}
          </div>
        ))}
      </div>
      <div onClick={handleIconClick} className="absolute bottom-4 right-4">
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
