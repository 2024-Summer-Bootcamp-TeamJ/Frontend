import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import ProfileFrontShin from "../assets/images/ProfileFrontShin.svg";
import ProfileFrontBaek from "../assets/images/ProfileFrontBaek.svg";
import ProfileFrontOh from "../assets/images/ProfileFrontOh.svg";
import ProfileBackBaek from "../assets/images/ProfileBackBaek.svg";
import ProfileBackOh from "../assets/images/ProfileBackOh.svg";
import ProfileBackShin from "../assets/images/ProfileBackShin.svg";
import IconToMyPage from "../assets/images/IconToMyPage.svg";
import backgroundGreen from "../assets/images/backgroundGreen.svg";
import ChoosingButtonBaek from "../assets/images/ChoosingButtonBaek.svg";
import ChoosingButtonOh from "../assets/images/ChoosingButtonOh.svg";
import ChoosingButtonShin from "../assets/images/ChoosingButtonShin.svg";
import "../index.css";
import { useStore } from "../../store";

interface Mentor {
  id: number;
  name: string;
  description: string;
  frontImage: string;
  backImage: string;
  choosingButtonImage: string;
}

const mentorImages: { [key: number]: any } = {
  1: {
    frontImage: ProfileFrontBaek,
    backImage: ProfileBackBaek,
    choosingButtonImage: ChoosingButtonBaek,
    name: "baek"
  },
  2: {
    frontImage: ProfileFrontOh,
    backImage: ProfileBackOh,
    choosingButtonImage: ChoosingButtonOh,
    name: "oh"
  },
  3: {
    frontImage: ProfileFrontShin,
    backImage: ProfileBackShin,
    choosingButtonImage: ChoosingButtonShin,
    name: "shin"
  }
};

const MentorPage: React.FC = () => {
  const [flippedMentorId, setFlippedMentorId] = useState<number | null>(null);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const location = useLocation();
  const userId = location.state?.userId;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/mentors');
        const mentorsData = response.data
          .filter((mentor: any) => mentor.id >= 1 && mentor.id <= 3)
          .map((mentor: any) => ({
            ...mentor,
            ...mentorImages[mentor.id]
          }));
        setMentors(mentorsData);
      } catch (error) {
        console.error('Error fetching mentors:', error);
      }
    };

    fetchMentors();
  }, []);

  const toggleMentorImage = (mentorId: number) => {
    if (flippedMentorId === mentorId) {
      setFlippedMentorId(null);
    } else {
      setFlippedMentorId(mentorId);
    }
  };

  const createChatroom = async (mentorId: number) => {
    console.log("Creating chatroom with mentorId:", mentorId);

    if (!userId) {
      console.error("User ID is not set");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/chatrooms", {
        user_id: userId,
        mentor_id: mentorId,
      });

      console.log("Response from server:", response);

      if (response.status === 200 || response.status === 201) {
        console.log("Chatroom created successfully");
        const chatroomId = response.data.id;
        const mentor = mentors.find((mentor) => mentor.id === mentorId);
        if (mentor) {
          navigate(`/chat/${mentorImages[mentor.id].name}`, { state: { chatroomId } });
        } else {
          console.error('Invalid mentor ID');
          throw new Error('Chatroom creation failed');
        }
      } else {
        console.error("Unexpected response status:", response.status);
        throw new Error("Chatroom creation failed");
      }
    } catch (error) {
      console.error("Error creating chatroom:", error);
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
            <img
              src={mentor.frontImage}
              alt={mentor.name}
              className={`w-100 flip-card-front ${
                flippedMentorId === mentor.id ? "hidden" : ""
              }`}
              draggable="false"
            />
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
              />
            )}
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 right-4">
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
