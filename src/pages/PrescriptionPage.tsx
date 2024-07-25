import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import "../index.css";
import ImageWithText from "@components/PostText/ImageWithText";
import IconToMyPage from "../assets/images/IconToMyPage.svg";
import backgroundGreen from "../assets/images/backgroundGreen.svg";
import prescriptionimg from "../assets/images/prescriptionimg.svg";
import mobile_prescriptionimg from "../assets/images/mobile_prescriptionimg.svg";
import mailBack from "../assets/images/mailback.svg";
import mailFront from "../assets/images/mailfront.svg";

const PrescriptionPage: React.FC = () => {
  const location = useLocation();
  const { chatroomId, userId } = location.state || {};
  const [prescription, setPrescription] = useState<any>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    console.log("Prescription ID:", chatroomId);
    console.log("User ID:", userId);

    if (!chatroomId || !userId) {
      console.error("No chatroom ID or user ID provided");
      return;
    }

    const fetchPrescription = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/prescriptions/${chatroomId}?user_id=${userId}`
        );
        setPrescription(response.data);
      } catch (error) {
        console.error("Error fetching prescription:", error);
      }
    };

    fetchPrescription();
  }, [chatroomId, userId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center overflow-hidden w-screen h-screen relative">
      <img
        src={backgroundGreen}
        alt="배경"
        className="absolute w-full h-full object-cover z-[-1]"
      />
      {/* 모바일버전 mailBack */}
      <img
        src={mailBack}
        alt="mail back"
        className="block md:hidden absolute w-[90vw] h-auto max-h-[120vh] z-0 mb-28 bottom-0" // `bottom-[-8]`을 사용하여 이미지가 더 아래로 이동
        draggable="false"
      />
      {/* 데스크탑버전 mailBack */}
      <img
        src={mailBack}
        alt="mail back"
        className=" hidden md:block absolute w-[90vw] md:w-[55vw] h-auto md:h-[120vh]  max-h-[120vh] md:max-h-[120vh]-none z-0 mb-28 md:bottom-none"
        draggable="false"
      />
      <div
        className={`absolute w-[85vw] md:w-[50vw] h-[78vh] flex items-center justify-center ml-1 ${animate ? "slide-up-animation" : "top-[22%] z-1"}`}
        style={{ transition: "top 2s ease-in-out" }}
      >
        <img
          src={mobile_prescriptionimg}
          alt="모바일 엽서이미지"
          className="block md:hidden"
          style={{ width: "80%", height: "auto" }} // 원하는 크기로 조절
          draggable="false"
        />

        {/* 데스크탑 이미지 */}
        <img
          src={prescriptionimg}
          alt="엽서이미지"
          className="hidden md:block w-full h-full"
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
        className="absolute bottom-0  mb-15 md:bottom-auto w-[100vw] md:w-[63vw] h-auto max-h-[85vh] md:h-[85vh] z-2 mt-36 md:mt-1 md:top-56"
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
