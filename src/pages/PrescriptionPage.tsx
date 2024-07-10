import React from "react";
import "../index.css";
import ImageWithText from "@components/PostText/ImageWithText";
import { Link } from "react-router-dom";
import IconToMyPage from "../assets/images/IconToMyPage.svg";

const PrescriptionPage: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        width: "100vw",
        height: "100vh",
      }}
    >
      <img
        src="src/assets/images/backgroundGreen.svg"
        alt="prescription"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
          backgroundSize: "cover",
        }}
      />

      <img
        src="src/assets/images/prescription.svg"
        alt="postcard"
        style={{
          position: "absolute",
          width: "100%",
          height: "80%",
          zIndex: 1,
        }}
      />

      <ImageWithText />

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
