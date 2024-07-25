import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import IconMouse from "../assets/images/IconMouse.svg";
import IconLetter from "../assets/images/IconLetter.svg";
import IconToHome from "../assets/images/IconToHome.svg";
import PostBox from "../assets/images/PostBox.svg";
import MyPageBackground from "../assets/images/MyPageBackground.svg";
import redButtonBaek from "../assets/images/redButtonBaek.svg";
import fromBaek from "../assets/images/fromBaek.svg";
import fromShin from "../assets/images/fromShin.svg";
import redButtonShin from "../assets/images/redButtonShin.svg";
import fromOh from "../assets/images/fromOh.svg";
import redButtonOh from "../assets/images/redButtonOh.svg";
import redButtonAll from "../assets/images/redButtonAll.svg";
import AllLetter from "../assets/images/AllLetter.svg";
import mouse from "../assets/audios/mouse.mp3";
import ui_click from "../assets/audios/ui_click.mp3";
import { useStore } from "../store/store";
import useSound from "use-sound";
import PostOfficeAudio from "../assets/audios/PostOffice.mp3";

const Mobile_MyPage: React.FC = () => {
  const navigate = useNavigate();

  const [audio] = useState(new Audio(PostOfficeAudio));
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [selectedMentor, setSelectedMentor] = useState<number | null>(null);

  const { nickname, userId, setNickname } = useStore();
  const [play, { stop }] = useSound(mouse);

  useEffect(() => {
    setSelectedButton("All");
    fetchPrescriptions(null);

    audio.play().catch((error) => {
      console.error("Failed to play audio:", error);
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId !== null) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/users/${userId}`
          );
          setNickname(response.data.nickname);
          console.log(
            "닉네임은",
            response.data.nickname,
            "유저아이디는",
            userId
          );
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [userId, setNickname]);

  useEffect(() => {
    fetchPrescriptions();
  }, [userId]);

  const fetchPrescriptions = async (mentorId: number | null = null) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/prescriptions`,
        {
          params: {
            user_id: userId,
            mentor_id: mentorId || undefined,
          },
        }
      );

      const prescriptions = mentorId
        ? response.data.filter(
            (prescription: { mentor_id: number }) =>
              prescription.mentor_id === mentorId
          )
        : response.data;

      setPrescriptions(prescriptions);
      setSelectedMentor(mentorId);

      console.log(
        "유저아이디는(fetchPrescriptions)",
        userId,
        "멘토아이디는(fetchPrescriptions)",
        mentorId
      );
      console.log("response.data", prescriptions);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    }
  };

  const handleMouseEnter = (buttonName: string) => {
    setHoveredButton(buttonName);
    play();
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
    stop();
  };

  const handleClick = useCallback(
    (buttonName: string, mentorId: number | null) => {
      fetchPrescriptions(mentorId);
      setSelectedButton(buttonName);
    },
    []
  );

  const handleIconClick = useCallback(() => {
    play();
  }, [play]);

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-blue-100"
      style={{
        backgroundImage: `url(${MyPageBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div onClick={handleIconClick} className="absolute top-4 left-4">
        <Link to="/mentor" state={{ userId }}>
          <img
            src={IconToHome}
            alt="To Home Icon"
            className="cursor-pointer w-14"
            draggable="false"
          />
        </Link>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-6">
        <div
          style={{ width: "100%", maxWidth: "70rem", height: "36rem" }}
          className="p-4 md:p-6 shadow-lg bg-lettersColor rounded-4xl md:rounded-100px"
        >
          <div className="flex justify-center mb-4 space-x-2 md:space-x-[-15px]">
            <div
              onMouseEnter={() => handleMouseEnter("All")}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick("All", null)}
              className="relative cursor-pointer"
            >
              <img
                src={redButtonAll}
                alt="RedButtonAll"
                className="w-14 md:w-20"
                draggable="false"
              />
              {(hoveredButton === "All" ||
                (selectedButton === "All" && !hoveredButton)) && (
                <img
                  src={AllLetter}
                  alt="From All"
                  className="absolute top-[-15px] left-0 w-20 md:w-24 transition-transform transform scale-125"
                  draggable="false"
                />
              )}
            </div>
            <div
              onMouseEnter={() => handleMouseEnter("Oh")}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick("Oh", 2)}
              className="relative cursor-pointer"
            >
              <img
                src={redButtonOh}
                alt="RedButtonOh"
                className="w-14 md:w-20"
                draggable="false"
              />
              {(hoveredButton === "Oh" ||
                (selectedButton === "Oh" && !hoveredButton)) && (
                <img
                  src={fromOh}
                  alt="From Oh"
                  className="absolute top-[-15px] left-0 w-20 md:w-24 transition-transform transform scale-125"
                  draggable="false"
                />
              )}
            </div>
            <div
              onMouseEnter={() => handleMouseEnter("Baek")}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick("Baek", 1)}
              className="relative cursor-pointer"
            >
              <img
                src={redButtonBaek}
                alt="RedButtonBaek"
                className="w-14 md:w-20"
                draggable="false"
              />
              {(hoveredButton === "Baek" ||
                (selectedButton === "Baek" && !hoveredButton)) && (
                <img
                  src={fromBaek}
                  alt="From Baek"
                  className="absolute top-[-15px] left-0 w-20 md:w-24 transition-transform transform scale-125"
                  draggable="false"
                />
              )}
            </div>
            <div
              onMouseEnter={() => handleMouseEnter("Shin")}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick("Shin", 3)}
              className="relative cursor-pointer"
            >
              <img
                src={redButtonShin}
                alt="RedButtonShin"
                className="w-14 md:w-20"
                draggable="false"
              />
              {(hoveredButton === "Shin" ||
                (selectedButton === "Shin" && !hoveredButton)) && (
                <img
                  src={fromShin}
                  alt="From Shin"
                  className="absolute top-[-15px] left-0 w-20 md:w-24 transition-transform transform scale-125"
                  draggable="false"
                />
              )}
            </div>
          </div>

          <div
            className="flex flex-col items-center space-y-4 overflow-y-auto scrollbar"
            style={{ maxHeight: "24rem", overflowX: "hidden" }}
          >
            {(selectedMentor === null || selectedMentor !== null) &&
              prescriptions.length > 0 &&
              prescriptions.map((prescription, index) => (
                <div
                  key={prescription.id}
                  className="flex items-center h-12 md:h-16 p-2 transition-colors duration-300 bg-dateColor rounded-xl md:rounded-3xl w-full max-w-lg hover:bg-dateHoverColor"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => navigate(`/prescription/${prescription.id}`)}
                >
                  {hoveredIndex === index && (
                    <img
                      src={IconMouse}
                      alt="Mouse Icon"
                      className="w-12 md:w-16"
                      draggable="false"
                    />
                  )}
                  <img
                    src={IconLetter}
                    alt="Letter Icon"
                    className="w-12 md:w-16 transform translate-y-1"
                    draggable="false"
                  />
                  <span className="text-dateTextColor font-['NoticiaText'] text-lg md:text-2xl">
                    {new Date(prescription.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mobile_MyPage;
