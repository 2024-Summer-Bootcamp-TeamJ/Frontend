import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate  } from "react-router-dom";
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
import { useStore } from "../../store";


const MyPage: React.FC = () => {
  const navigate = useNavigate(); // useHistory 훅 사용

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [selectedMentor, setSelectedMentor] = useState<number | null>(null);

  const { nickname, userId, setNickname } = useStore();

  useEffect(() => {
    // 페이지 초기 로드 시 redButtonAll을 선택된 상태로 설정
    setSelectedButton("All");
    fetchPrescriptions(null);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId !== null) {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/users/${userId}`
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
    fetchPrescriptions(); // 페이지 로드 시 전체 처방전 리스트를 불러옴
  }, [userId]);

  const fetchPrescriptions = async (mentorId: number | null = null) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/prescriptions",
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
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  const handleClick = (buttonName: string, mentorId: number | null) => {
    fetchPrescriptions(mentorId);
    setSelectedButton(buttonName);
  };

  const handleMouseEnter = (buttonName: string) => {
    setHoveredButton(buttonName);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-blue-100 relative"
      style={{
        backgroundImage: `url(${MyPageBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute top-4 left-4">
        <Link to="/mentor" state={{ userId }}>
          <img
            src={IconToHome}
            alt="To Home Icon"
            className="w-14 cursor-pointer"
            draggable="false"
          />
        </Link>
      </div>
      <div className="flex space-x-6">
        <div className="flex flex-col justify-end relative">
          <img
            src={PostBox}
            alt="PostBox"
            className="w-96 mb-10"
            draggable="false"
          />
          <div className="absolute inset-0 flex items-center justify-center mt-44">
            <span className="text-4xl text-postboxNameColor font-MoonFlower">
              {nickname}'s
            </span>
          </div>
        </div>
        <div
          style={{ width: "48rem", height: "36rem" }}
          className="bg-lettersColor p-6 rounded-100px shadow-lg "
        >
          <div className="flex justify-center mb-4 space-x-[-15px]">
            <div
              onMouseEnter={() => handleMouseEnter("All")}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick("All", null)}
              className="relative cursor-pointer"
            >
              <img
                src={redButtonAll}
                alt="RedButtonAll"
                className="w-20"
                draggable="false"
              />
              {(hoveredButton === "All" ||
                (selectedButton === "All" && !hoveredButton)) && (
                <img
                  src={AllLetter}
                  alt="From All"
                  className="absolute top-[-15px] left-0 w-24 transition-transform transform scale-125"
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
                className="w-20"
                draggable="false"
              />
              {(hoveredButton === "Oh" ||
                (selectedButton === "Oh" && !hoveredButton)) && (
                <img
                  src={fromOh}
                  alt="From Oh"
                  className="absolute top-[-15px] left-0 w-24 transition-transform transform scale-125"
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
                className="w-20"
                draggable="false"
              />
              {(hoveredButton === "Baek" ||
                (selectedButton === "Baek" && !hoveredButton)) && (
                <img
                  src={fromBaek}
                  alt="From Baek"
                  className="absolute top-[-15px] left-0 w-24 transition-transform transform scale-125"
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
                className="w-20"
                draggable="false"
              />
              {(hoveredButton === "Shin" ||
                (selectedButton === "Shin" && !hoveredButton)) && (
                <img
                  src={fromShin}
                  alt="From Shin"
                  className="absolute top-[-15px] left-0 w-24 transition-transform transform scale-125"
                  draggable="false"
                />
              )}
            </div>
          </div>

          <div
            className="flex flex-col items-center space-y-4 overflow-y-auto scrollbar"
            style={{ maxHeight: "24rem", overflowX: "hidden" }} // 이 높이 설정을 조정할 수 있습니다.
          >
            {(selectedMentor === null || selectedMentor !== null) &&
              prescriptions.length > 0 &&
              prescriptions.map((prescription, index) => (
                <div
                  key={prescription.id}
                  className="flex items-center p-2 bg-dateColor rounded-3xl w-168 h-16 hover:bg-dateHoverColor transition-colors duration-300"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => navigate(`/prescription/${prescription.id}`)} // useNavigate로 변경
                >
                  {hoveredIndex === index && (
                    <img
                      src={IconMouse}
                      alt="Mouse Icon"
                      className="w-16"
                      draggable="false"
                    />
                  )}
                  <img
                    src={IconLetter}
                    alt="Letter Icon"
                    className="w-16 transform translate-y-1"
                    draggable="false"
                  />
                  <span className="text-dateTextColor font-['NoticiaText'] text-2xl">
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

export default MyPage;
