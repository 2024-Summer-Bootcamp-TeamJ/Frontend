import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import "../index.css";
import ImageWithText from "@components/PostText/ImageWithText";
import IconToMyPage from "../assets/images/IconToMyPage.svg";
import backgroundGreen from "../assets/images/backgroundGreen.svg";
import prescriptionimg from "../assets/images/prescriptionimg.svg";
import mailBack from "../assets/images/mailback.svg";
import mailFront from "../assets/images/mailfront.svg";

const PrescriptionPage: React.FC = () => {
  const location = useLocation();
  const { chatroomId, userId } = location.state || {};
  const [prescription, setPrescription] = useState<any>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    console.log("Prescription ID:", chatroomId); // Prescription ID가 제대로 전달되는지 확인
    if (!chatroomId || !userId) {
      console.error("No chatroom ID or user ID provided");
      return;
    }

    const fetchPrescription = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/prescriptions/${chatroomId}?user_id=${userId}`
        );
        setPrescription(response.data);
      } catch (error) {
        console.error("Error fetching prescription:", error);
      }
    };

    fetchPrescription();
  }, [chatroomId, userId]);

  useEffect(() => {
    // 애니메이션을 트리거하는 타이머 설정
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 500); // 0.5초 후에 애니메이션 시작

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
  }, []);

  return (
    <div className="flex items-center justify-center overflow-hidden w-screen h-screen relative">
      <img
        src={backgroundGreen}
        alt="배경"
        className="absolute w-full h-full object-cover z-[-1]"
      />
      <img
        src={mailBack}
        alt="mail back"
        className="absolute w-[55vw] h-[120vh] z-0 mb-28"
        draggable="false"
      />
      <div
        className={`absolute w-[50vw] h-[78vh] ml-1 ${animate ? "slide-up-animation" : "top-[22%] z-1"}`}
        style={{ transition: "top 2s ease-in-out" }}
      >
        <img
          src={prescriptionimg}
          alt="엽서이미지"
          className="w-full h-full"
          draggable="false"
        />
        {prescription && (
          <div className="absolute inset-0 z-3 flex items-center justify-center">
            <ImageWithText prescriptionId={Number(chatroomId)} />
          </div>
        )}
      </div>
      <img
        src={mailFront}
        alt="mail front"
        className="absolute w-[63vw] h-[85vh] z-2 top-56 mt-1"
        draggable="false"
      />
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

export default PrescriptionPage;
